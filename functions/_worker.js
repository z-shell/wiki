const countryMap = {
  FR: 'https://wiki.zshell.dev/fr/',
};

function redirect(request) {
  const {country} = request.cf;

  if (country != null && country in countryMap) {
    const url = countryMap[country];
    return Response.redirect(url);
  }
    return fetch(request);
}

export default {
  async fetch(request, env, context) {
    context.respondWith(redirect(context.request));
  },
};
