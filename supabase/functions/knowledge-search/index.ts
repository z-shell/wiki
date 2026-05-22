/* eslint-disable import-x/no-unresolved -- Supabase Edge Functions resolve jsr: imports in Deno. */
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import OpenAI from "jsr:@openai/openai";
import {createClient} from "jsr:@supabase/supabase-js@2";

const openai = new OpenAI({apiKey: Deno.env.get("OPENAI_API_KEY")});
const supabaseSecretKey = Deno.env.get("SB_SECRET_KEY")!;
const supabase = createClient(Deno.env.get("SUPABASE_URL")!, supabaseSecretKey);

Deno.serve(async (request) => {
  try {
    if (request.method !== "POST") {
      return json({error: "method_not_allowed"}, 405);
    }

    if (request.headers.get("apikey") !== supabaseSecretKey) {
      return json({error: "unauthorized"}, 401);
    }

    const body = await request.json().catch(() => null);
    const query = typeof body?.query === "string" ? body.query.trim() : "";
    const matchCount = Number.isInteger(body?.matchCount) ? body.matchCount : 8;

    if (query.length < 3 || query.length > 500) {
      return json({error: "query_length_invalid"}, 400);
    }

    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
    });

    const {data, error} = await supabase.rpc("match_public_docs", {
      query_embedding: embeddingResponse.data[0].embedding,
      match_count: matchCount,
      match_threshold: 0.72,
    });

    if (error) {
      return json({error: "search_failed", detail: error.message}, 500);
    }

    return json({query, results: data});
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return json({error: "internal_error", detail: message}, 500);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {"content-type": "application/json; charset=utf-8"},
  });
}
