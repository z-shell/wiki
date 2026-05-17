// Swizzled Docusaurus prism-include-languages.
// Delegates standard additionalLanguages loading to the original implementation,
// then registers the custom ZSH grammar.
import prismIncludeLanguagesOriginal from '@theme-original/prism-include-languages';

export default function prismIncludeLanguages(PrismObject) {
  prismIncludeLanguagesOriginal(PrismObject);

  // Register custom ZSH grammar (must load after bash, which is in additionalLanguages)
  const PrismBefore = globalThis.Prism;
  globalThis.Prism = PrismObject;
  require('../prism/prism-zsh.js');

  // Restore globalThis.Prism
  delete globalThis.Prism;
  if (typeof PrismBefore !== 'undefined') {
    globalThis.Prism = PrismBefore;
  }
}
