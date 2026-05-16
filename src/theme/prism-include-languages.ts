import siteConfig from "@generated/docusaurus.config";
import type * as PrismNamespace from "prismjs";
import {registerZShellLanguages} from "../prism/z-shell-languages";

export default function prismIncludeLanguages(PrismObject: typeof PrismNamespace): void {
  const {
    themeConfig: {prism},
  } = siteConfig;
  const {additionalLanguages} = prism as {additionalLanguages: string[]};

  const PrismBefore = globalThis.Prism;
  globalThis.Prism = PrismObject;

  additionalLanguages.forEach((lang) => {
    if (lang === "php") {
      require("prismjs/components/prism-markup-templating.js");
    }
    require(`prismjs/components/prism-${lang}`);
  });

  registerZShellLanguages(PrismObject);

  if (typeof PrismBefore === "undefined") {
    delete (globalThis as Record<string, unknown>).Prism;
  } else {
    globalThis.Prism = PrismObject;
  }
}
