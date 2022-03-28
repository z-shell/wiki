import {getAssetFromKV, NotFoundError, MethodNotAllowedError} from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';
const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request, env, ctx) {
    const headers = {'Content-Type': 'text/html;charset=UTF-8'};
    let cache = caches.default;
    await cache.match(request);
    if (request.url.includes()) {
      try {
        return await getAssetFromKV(
          {
            request,
            waitUntil(promise) {
              return ctx.waitUntil(promise);
            },
          },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: assetManifest,
          },
        );
      } catch (e) {
        if (e instanceof NotFoundError) {
          // ...
        } else if (e instanceof MethodNotAllowedError) {
          // ...
        } else {
          return new Response('An unexpected error occurred', {status: 500});
        }
      }
    } else return fetch(request, {headers});
  },
};
