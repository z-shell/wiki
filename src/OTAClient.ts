import otaClient, {ClientConfig} from '@crowdin/ota-client';

const config: ClientConfig = {
  disableManifestCache: true,
  languageCode: 'en',
  disableStringsCache: true,
  disableJsonDeepMerge: true,
  enterpriseOrganizationDomain: crowdin.digitalclouds.dev,
};

const hash = 'e-fb044b4ddbd7ca7159bc3b30oa';

const client = new otaClient(hash, config);
