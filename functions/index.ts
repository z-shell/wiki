interface Env {
  R2_STORE: R2Bucket;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  try {
    const {request, env} = context;
    const url = new URL(request.url);
    const cacheKey = new Request(url.toString(), request);
    const cache = caches.default;

    let response = await cache.match(cacheKey);

    if (response) {
      console.log(`Cache hit for: ${request.url}.`);
      return response;
    }

    console.log(`Response for request url: ${request.url} not present in cache. Fetching and caching request.`);

    // If not in cache, get it from R2
    const objectKey = url.pathname.slice(1);
    const object = await env.R2_STORE.get(objectKey);
    if (object === null) {
      return new Response("Object Not Found", {status: 404});
    }

    // Set the appropriate object headers
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.append("Cache-Control", "s-maxage=30");

    response = new Response(object.body, {
      headers,
    });

    context.waitUntil(cache.put(cacheKey, response.clone()));

    return response;
  } catch (err) {
    return new Response(`Error thrown ${err.message}`);
  }
};
