/**
 * Shared R2 asset handler for Pages Functions.
 *
 * Files prefixed with `_` are ignored by Pages routing, so this module
 * is only imported — never exposed as an endpoint.
 */

interface Env {
  ASSETS_BUCKET: R2Bucket;
}

const EXTENSION_TYPES: Record<string, string> = {
  // Images
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  // Video
  ".webm": "video/webm",
  // Fonts
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  // Code / data
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".cast": "application/json",
};

/**
 * Creates a Pages Function handler that serves assets from R2.
 *
 * Pages first checks its own build output for a matching file. This handler
 * only runs when no static asset exists, allowing large or future-added
 * files to live exclusively in R2 without bloating the deployment.
 *
 * @param prefix - The URL path prefix this handler owns (e.g. `"img"`).
 *                 Requests to the bare prefix are rejected with 404.
 */
export function createR2Handler(prefix: string): PagesFunction<Env> {
  return async (context) => {
    const key = new URL(context.request.url).pathname.slice(1);
    if (!key || key === prefix || key === `${prefix}/`) {
      return new Response("Not Found", {status: 404});
    }

    const ifNoneMatch = context.request.headers.get("if-none-match");

    try {
      const object = await context.env.ASSETS_BUCKET.get(key, {
        onlyIf: ifNoneMatch ? {etagDoesNotMatch: ifNoneMatch} : undefined,
      });
      if (!object) {
        return context.next();
      }

      // Conditional request matched — client already has this version
      if (!object.body) {
        return new Response(null, {status: 304, headers: {etag: object.httpEtag}});
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);
      headers.set("cache-control", "public, max-age=31536000, immutable");
      headers.set("x-content-type-options", "nosniff");

      if (!headers.has("content-type")) {
        const ext = key.substring(key.lastIndexOf("."));
        const contentType = EXTENSION_TYPES[ext];
        if (contentType) {
          headers.set("content-type", contentType);
        }
      }

      if (!headers.has("content-type")) {
        headers.set("content-type", "application/octet-stream");
      }

      return new Response(object.body, {headers});
    } catch {
      return new Response("Internal Server Error", {status: 500});
    }
  };
}
