import otaClient from '@crowdin/ota-client';
const hash = '{distribution_hash}';
const client = new otaClient(hash);

client
  .listFiles()
  .then((file) => console.log(file))
  .catch((error) => console.error(error));

const languageCode = 'en';
const file = 'file';
client
  .getFileTranslations(file, languageCode)
  .then((translations) => console.log(translations))
  .catch((error) => console.error(error));
