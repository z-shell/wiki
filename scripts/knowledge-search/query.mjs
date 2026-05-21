import {pathToFileURL} from "node:url";
import process from "node:process";

const REQUIRED_ENV = ["SUPABASE_URL", "SUPABASE_SECRET_KEY"];

export function validateQueryEnv(env = process.env) {
  for (const name of REQUIRED_ENV) {
    if (!env[name]) {
      throw new Error(`${name} is required`);
    }
  }
}

export function formatResult(result) {
  const score = Math.round(Number(result.similarity) * 100);
  const excerpt = String(result.content).slice(0, 240).replace(/\s+/g, " ").trim();
  return `${score}% ${result.title} > ${result.heading}\n${result.url}\n${excerpt}`;
}

export async function runQuery(query, env = process.env) {
  if (!query) {
    throw new Error('Usage: pnpm knowledge-search:query "your query"');
  }

  validateQueryEnv(env);

  const response = await fetch(`${env.SUPABASE_URL}/functions/v1/knowledge-search`, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SECRET_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({query, matchCount: 8}),
  });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(payload));
  }

  for (const result of payload.results) {
    console.log(`${formatResult(result)}\n`);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [query] = process.argv.slice(2);
  runQuery(query).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
