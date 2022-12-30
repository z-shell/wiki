interface Env {
  R2_STORE: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    try {
      const url = new URL(request.url);
      const cacheKey = new Request(url.toString(), request);
      const cache = caches.default;

      let response = await cache.match(cacheKey);

      if (response) {
        console.log(`Cache hit for: ${request.url}.`);
        return response;
      }

      response = await fetch(request);
      response = new Response(response.body, response);
      response.headers.append("Cache-Control", "s-maxage=10");

      ctx.waitUntil(cache.put(cacheKey, response.clone()));

      return response;
    } catch (e) {
      return new Response(`Error thrown ${e.message}`);
    }
  },
};
