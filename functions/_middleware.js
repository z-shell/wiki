/** @format */

const CacheAPI = async ({ request, context }) => {
  try {
    const cacheUrl = new URL(request.url);
    const cacheKey = new Request(cacheUrl.toString(), request);
    const cache = caches.default;

    let response = await cache.match(cacheKey);

    if (!response) {
      response = await fetch(request);
      response = new Response(response.body, response);
      response.headers.append("Cache-Control", "s-maxage=10");
      context.waitUntil(cache.put(cacheKey, response.clone()));
    }
    return response;
  } catch (e) {
    return new Response(`Error thrown ${e.message}`);
  }
};

export const onRequest = [CacheAPI];
