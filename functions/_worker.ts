addEventListener('fetch', (event) => {
  event.respondWith(fetchAndApply(event.request));
});

async function fetchAndApply(request) {
  let url = new URL(request.url);

  // Only use the path for the cache key, removing query strings
  // e.g. https://www.example.com/some-form.html
  let cacheKey = `${url.protocol}//${url.hostname}${url.pathname}`;

  // Force response to be cached for 1 month
  return fetch(url, {
    cf: {
      cacheTtl: 2419200,
      cacheKey: cacheKey,
    },
  });
}
