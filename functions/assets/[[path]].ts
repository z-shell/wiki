interface Env {
  ASSETS_BUCKET: R2Bucket;
}

const EXTENSION_TYPES: Record<string, string> = {
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".cast": "application/json",
};

/**
 * Fallback handler: serves build assets (fonts, etc.) from R2 when no static
 * asset exists in the Pages build output.
 */
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const key = new URL(context.request.url).pathname.slice(1);
  if (!key || key === "assets" || key === "assets/") {
    return new Response("Not Found", {status: 404});
  }

  const object = await context.env.ASSETS_BUCKET.get(key);
  if (!object) {
    return new Response("Not Found", {status: 404});
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  if (!headers.has("content-type")) {
    const ext = key.substring(key.lastIndexOf("."));
    const contentType = EXTENSION_TYPES[ext];
    if (contentType) {
      headers.set("content-type", contentType);
    }
  }

  return new Response(object.body, {headers});
};
