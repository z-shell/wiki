import prismIncludeLanguagesOriginal from "@theme-original/prism-include-languages";

import {registerZShellLanguages} from "../prism/z-shell-languages";
import type * as PrismNamespace from "prismjs";

type PrismIncludeLanguagesFn = (p: typeof PrismNamespace) => void;
const prismIncludeLanguagesOriginalTyped: PrismIncludeLanguagesFn = prismIncludeLanguagesOriginal;

export default function prismIncludeLanguages(PrismObject: typeof PrismNamespace): void {
  prismIncludeLanguagesOriginalTyped(PrismObject);
  registerZShellLanguages(PrismObject);
}
