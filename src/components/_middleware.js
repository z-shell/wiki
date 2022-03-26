import {getAssetFromKV} from '@cloudflare/kv-asset-handler';

addEventListener('fetch', (event) => {
  event.respondWith(handleEvent(event));
});

async function errorHandler(context) {
  try {
    // wait for the next function to finish
    return await context.next();
  } catch (err) {
    // catch and report and errors when running the next function
    return new Response(`${err.message}\n${err.stack}`, {status: 500});
  }
}
export const onRequest = errorHandler;

/**async function handleEvent(event) {
  try {
    return await getAssetFromKV(event);
  } catch (e) {
    let pathname = new URL(event.request.url).pathname;
    return new Response(`"${pathname}" not found`, {
      status: 404,
      statusText: 'not found',
    });
  }
}

export const onRequest = handleEvent;

export default function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
}*/
