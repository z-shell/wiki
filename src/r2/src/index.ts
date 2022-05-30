export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);

    switch (request.method) {
      /** case "PUT":
        await env.R2_BUCKET.put(key, request.body);
        return new Response(`Put ${key} successfully!`); */
      case 'GET':
        const object = await env.R2_BUCKET.get(key);

        if (!object) {
          return new Response('Object Not Found', { status: 404 });
        }

        return new Response(object.body);
      /** case "DELETE":
        await env.R2_BUCKET.delete(key);
        return new Response("Deleted!", { status: 200 }); */

      default:
        return new Response('Method Not Allowed', { status: 405 });
    }
  },
};
