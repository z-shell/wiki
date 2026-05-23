import crypto from "node:crypto";
import {pathToFileURL} from "node:url";
import process from "node:process";

import {collectDocs} from "./collect-docs.mjs";

const REQUIRED_ENV = ["SUPABASE_DB_URL", "OPENAI_API_KEY"];
const EMBEDDING_MODEL = "text-embedding-3-small";

export function validateRequiredEnv(env = process.env, names = REQUIRED_ENV) {
  for (const name of names) {
    if (!env[name]) {
      throw new Error(`${name} is required`);
    }
  }
}

export function hash(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export async function runIndexer(env = process.env) {
  validateRequiredEnv(env);

  const [{default: OpenAI}, {default: postgres}] = await Promise.all([import("openai"), import("postgres")]);
  const openai = new OpenAI({apiKey: env.OPENAI_API_KEY});
  const sql = postgres(env.SUPABASE_DB_URL, {
    ssl: env.SUPABASE_DB_SSL === "disable" ? false : "require",
    family: 4,
  });
  let runId;

  try {
    const docs = await collectDocs();
    const [run] = await sql`
      insert into docs_search.ingestion_runs (status)
      values ('running')
      returning id
    `;
    runId = run.id;

    let chunkCount = 0;
    let skippedCount = 0;
    for (const doc of docs) {
      const contentHash = hash(JSON.stringify(doc.chunks.map((chunk) => chunk.content)));

      const [existing] = await sql`
        select content_hash from docs_search.sources where source_key = ${doc.sourceKey}
      `;

      const [source] = await sql`
        insert into docs_search.sources
          (source_key, repo, path, url, title, visibility, content_hash, indexed_at)
        values
          (${doc.sourceKey}, ${doc.repo}, ${doc.path}, ${doc.url}, ${doc.title}, ${doc.visibility}, ${contentHash}, now())
        on conflict (source_key) do update set
          repo = excluded.repo,
          path = excluded.path,
          url = excluded.url,
          title = excluded.title,
          visibility = excluded.visibility,
          content_hash = excluded.content_hash,
          indexed_at = now()
        returning id
      `;

      // Skip re-embedding when the chunk content is unchanged since the last run;
      // metadata (title, url, visibility) is still refreshed by the upsert above.
      if (existing && existing.content_hash === contentHash) {
        skippedCount += 1;
        continue;
      }

      await sql`delete from docs_search.chunks where source_id = ${source.id}`;

      // One embeddings request per document instead of one per chunk.
      const embeddings = await embedBatch(
        openai,
        doc.chunks.map((chunk) => chunk.content),
      );

      for (const [index, chunk] of doc.chunks.entries()) {
        await sql`
          insert into docs_search.chunks
            (source_id, chunk_index, heading, content, token_estimate, embedding)
          values
            (
              ${source.id},
              ${chunk.chunkIndex},
              ${chunk.heading},
              ${chunk.content},
              ${chunk.tokenEstimate},
              ${JSON.stringify(embeddings[index])}::extensions.vector
            )
        `;
        chunkCount += 1;
      }
    }

    await sql`
      update docs_search.ingestion_runs
      set status = 'succeeded', finished_at = now(), source_count = ${docs.length}, chunk_count = ${chunkCount}
      where id = ${runId}
    `;
    console.log(`Indexed ${docs.length} sources (${skippedCount} unchanged) and ${chunkCount} chunks`);
  } catch (error) {
    if (runId) {
      await sql`
        update docs_search.ingestion_runs
        set status = 'failed', finished_at = now(), error = ${error instanceof Error ? error.message : String(error)}
        where id = ${runId}
      `;
    }
    throw error;
  } finally {
    await sql.end({timeout: 5});
  }
}

async function embedBatch(openai, inputs) {
  if (inputs.length === 0) {
    return [];
  }
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: inputs,
  });
  return response.data.map((item) => item.embedding);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runIndexer().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
