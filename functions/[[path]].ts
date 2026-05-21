import type {PagesFunction} from "@cloudflare/workers-types";

interface Env {
  ASSETS_BUCKET: R2Bucket;
}

export const onRequest: PagesFunction<Env> = async (context) => {
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

  return new Response(object.body, {headers});
};
