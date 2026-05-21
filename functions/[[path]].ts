import type {PagesFunction} from "@cloudflare/workers-types";

interface Env {
  ASSETS_BUCKET: R2Bucket;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  const response = await context.next();
  if (response.status !== 404) {
    return response;
  }

  const url = new URL(context.request.url);
  const key = url.pathname.slice(1);

  if (!key) {
    return response;
  }

  const object = await context.env.ASSETS_BUCKET.get(key);

  if (!object) {
    return response;
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  headers.set("ETag", object.httpEtag);
  headers.set("Access-Control-Allow-Origin", "*");
  if (url.pathname.startsWith("/cdn/")) {
    headers.set("X-Robots-Tag", "noindex, noarchive");
  }

  return new Response(object.body, {headers});
};
