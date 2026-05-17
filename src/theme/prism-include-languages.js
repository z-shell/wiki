// Swizzled Docusaurus prism-include-languages.
// Loads standard additionalLanguages from prismjs, then registers the custom ZSH grammar.
import siteConfig from '@generated/docusaurus.config';

export default function prismIncludeLanguages(PrismObject) {
  const {
    themeConfig: {prism},
  } = siteConfig;
  const {additionalLanguages} = prism;

  // Mount PrismObject on globalThis temporarily — prismjs components expect it there.
  const PrismBefore = globalThis.Prism;
  globalThis.Prism = PrismObject;

  additionalLanguages.forEach((lang) => {
    if (lang === 'php') {
      require('prismjs/components/prism-markup-templating.js');
    }
    require(`prismjs/components/prism-${lang}`);
  });

  // Register custom ZSH grammar (must load after bash, which is in additionalLanguages)
  require('../prism/prism-zsh.js');

  // Restore globalThis.Prism
  delete globalThis.Prism;
  if (typeof PrismBefore !== 'undefined') {
    globalThis.Prism = PrismBefore;
  }
}
