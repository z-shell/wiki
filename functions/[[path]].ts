import type {PagesFunction} from "@cloudflare/workers-types";

interface Env {
  ASSETS_BUCKET: R2Bucket;
}

const immutableAssetPrefixes = ["/assets/", "/cdn/", "/img/"];

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
        "Access-Control-Allow-Headers": "Range, If-None-Match",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  const response = await context.next();
  if (response.status !== 404) {
    return response;
  }

  if (context.request.method !== "GET" && context.request.method !== "HEAD") {
    return response;
  }

  const url = new URL(context.request.url);
  const key = url.pathname.slice(1);

  if (!key) {
    return response;
  }

  // Honor the conditional (If-None-Match) and Range request headers advertised
  // in the OPTIONS preflight by forwarding them to R2.
  const object = await context.env.ASSETS_BUCKET.get(key, {
    onlyIf: context.request.headers,
    range: context.request.headers,
  });

  if (!object) {
    return response;
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  if (immutableAssetPrefixes.some((prefix) => url.pathname.startsWith(prefix))) {
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else if (!headers.has("Cache-Control")) {
    headers.set("Cache-Control", "public, max-age=300");
  }
  headers.set("ETag", object.httpEtag);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Accept-Ranges", "bytes");
  if (url.pathname.startsWith("/cdn/")) {
    headers.set("X-Robots-Tag", "noindex, noarchive");
  }

  // No body means the If-None-Match precondition was satisfied: nothing changed.
  if (!("body" in object)) {
    return new Response(null, {status: 304, headers});
  }

  const isHead = context.request.method === "HEAD";

  // A returned range means the client sent a satisfiable Range header.
  const {range} = object;
  if (range) {
    const length = "suffix" in range ? range.suffix : (range.length ?? object.size - (range.offset ?? 0));
    const offset = "suffix" in range ? object.size - length : (range.offset ?? 0);
    headers.set("Content-Range", `bytes ${offset}-${offset + length - 1}/${object.size}`);
    headers.set("Content-Length", String(length));
    return new Response(isHead ? null : object.body, {status: 206, headers});
  }

  headers.set("Content-Length", String(object.size));
  return new Response(isHead ? null : object.body, {headers});
};
