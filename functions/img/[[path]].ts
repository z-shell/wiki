interface Env {
  R2_STORE: R2Bucket;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const {request, env} = context;
  const url = new URL(request.url);
  const key = url.pathname.slice(1);

  const object = await env.R2_STORE.get(key);

  if (object === null) {
    return new Response("Object Not Found", {status: 404});
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);

  return new Response(object.body, {
    headers,
  });
};
