interface Env {
  R2_STORE: R2Bucket;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const obj = await context.env.BUCKET.get("some-key");
  if (obj === null) {
    return new Response("Not found", {status: 404});
  }
  return new Response(obj.body);
};
