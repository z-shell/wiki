interface Env {
  R2_STORE: R2Bucket;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  try {
    const url = new URL(context.request.url);
    const cacheKey = new Request(url.toString(), context.request);
    const cache = caches.default;

    let response = await cache.match(cacheKey);

    if (response) {
      return response;
    }

    response = await fetch(context.request);
    response = new Response(response.body, response);
    response.headers.append("Cache-Control", "s-maxage=30");

    context.waitUntil(cache.put(cacheKey, response.clone()));

    return response;
  } catch (err) {
    return new Response(`Error thrown ${err.message}`);
  }
};
