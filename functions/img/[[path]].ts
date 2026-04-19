interface Env {
  ASSETS_BUCKET: R2Bucket;
}

const EXTENSION_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".webm": "video/webm",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

/**
 * Fallback handler: serves images from R2 when no static asset exists in the
 * Pages build output. This allows large or future-added assets to live only
 * in R2 without bloating the deployment.
 */
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const key = new URL(context.request.url).pathname.slice(1);
  if (!key || key === "img" || key === "img/") {
    return new Response("Not Found", {status: 404});
  }

  const ifNoneMatch = context.request.headers.get("if-none-match");

  try {
    const object = await context.env.ASSETS_BUCKET.get(key, {
      onlyIf: ifNoneMatch ? {etagDoesNotMatch: ifNoneMatch} : undefined,
    });
    if (!object) {
      return new Response("Not Found", {status: 404});
    }

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
