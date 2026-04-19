interface Env {
  ASSETS_BUCKET: R2Bucket;
}

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

  const object = await context.env.ASSETS_BUCKET.get(key);
  if (!object) {
    return new Response("Not Found", {status: 404});
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");
  headers.set("access-control-allow-origin", "*");

  return new Response(object.body, {headers});
};
