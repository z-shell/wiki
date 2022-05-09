async function generateSignedUrl(url) {
  // You will need some super-secret data to use as a symmetric key.
  const encoder = new TextEncoder();
  const secretKeyData = encoder.encode('my secret symmetric key');
  const key = await crypto.subtle.importKey(
    'raw',
    secretKeyData,
    {name: 'HMAC', hash: 'SHA-256'},
    false,
    ['sign'],
  );

  // Signed requests expire after one minute. Note that you could choose
  // expiration durations dynamically, depending on, for example, the path or a query
  // parameter.
  const expirationMs = 60000;
  const expiry = Date.now() + expirationMs;
  // The signature will be computed for the pathname and the expiry timestamp.
  // The two fields must be separated or padded to ensure that an attacker
  // will not be able to use the same signature for other pathname/expiry pairs.
  // The @ symbol is guaranteed not to appear in expiry, which is a (decimal)
  // number, so you can safely use it as a separator here. When combining more
  // fields, consider JSON.stringify-ing an array of the fields instead of
  // concatenating the values.
  const dataToAuthenticate = `${url.pathname}@${expiry}`;

  const mac = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(dataToAuthenticate),
  );

  // `mac` is an ArrayBuffer, so you need to make a few changes to get
  // it into a ByteString, and then a Base64-encoded string.
  const base64Mac = btoa(String.fromCharCode(...new Uint8Array(mac)));

  url.searchParams.set('mac', base64Mac);
  url.searchParams.set('expiry', expiry);

  return new Response(url);
}

addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const prefix = '/generate/';
  if (url.pathname.startsWith(prefix)) {
    // Replace the "/generate/" path prefix with "/verify/", which we
    // use in the first example to recognize authenticated paths.
    url.pathname = `/verify/${url.pathname.slice(prefix.length)}`;
    event.respondWith(generateSignedUrl(url));
  } else {
    event.respondWith(fetch(event.request));
  }
});
