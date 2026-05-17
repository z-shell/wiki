import prismIncludeLanguagesOriginal from "@theme-original/prism-include-languages";

import {registerZShellLanguages} from "../prism/z-shell-languages";
import type * as PrismNamespace from "prismjs";

export default function prismIncludeLanguages(PrismObject: typeof PrismNamespace): void {
  (prismIncludeLanguagesOriginal as (p: typeof PrismNamespace) => void)(PrismObject);
  registerZShellLanguages(PrismObject);
}
