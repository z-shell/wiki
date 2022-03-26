import {getAssetFromKV, NotFoundError, MethodNotAllowedError, mapRequestToAsset} from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';
const assetManifest = JSON.parse(manifestJSON);

const customKeyModifier = (request) => {
  let url = request.url;
  //custom key mapping optional
  url = url.replace('/docs', '').replace(/^\/+/, '');
  return mapRequestToAsset(new Request(url, request));
};

export default {
  async fetch(request, env, ctx) {
    if (request.url.includes('/docs')) {
      let asset = await getAssetFromKV(event, {mapRequestToAsset: customKeyModifier});
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
    } else return fetch(request);
  },
};
