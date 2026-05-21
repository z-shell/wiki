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
  const sql = postgres(env.SUPABASE_DB_URL, {ssl: env.SUPABASE_DB_SSL === "disable" ? false : "require"});
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
    for (const doc of docs) {
      const contentHash = hash(JSON.stringify(doc.chunks.map((chunk) => chunk.content)));
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

      await sql`delete from docs_search.chunks where source_id = ${source.id}`;

      for (const chunk of doc.chunks) {
        const embedding = await embed(openai, chunk.content);
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
              ${JSON.stringify(embedding)}::extensions.vector
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
    console.log(`Indexed ${docs.length} sources and ${chunkCount} chunks`);
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

async function embed(openai, input) {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input,
  });
  return response.data[0].embedding;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runIndexer().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
