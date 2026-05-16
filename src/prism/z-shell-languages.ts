import type * as PrismNamespace from "prismjs";

export function registerZShellLanguages(Prism: typeof PrismNamespace): void {
  Prism.languages.zsh = Prism.languages.extend("bash", {});

  Prism.languages.insertBefore("zsh", "keyword", {
    "zsh-keyword": {
      pattern:
        /(^|[\s;|&()])(?:autoload|bindkey|compdef|emulate|functions|local|print|setopt|typeset|unsetopt|zcompile|zmodload|zparseopts|zstyle)\b/,
      lookbehind: true,
      alias: "keyword",
    },
    "zsh-special-parameter": {
      pattern: /\$(?:[#*@?!$]|[A-Za-z_][\w-]*|\{[^}\n]+\})/,
      alias: "variable",
    },
    "zsh-glob-qualifier": {
      pattern: /(^|[^\w])(?:\*\*\/)?\*[^ \n]*(?:\([^)]+\))/,
      lookbehind: true,
      alias: "operator",
    },
  });

  Prism.languages.zi = Prism.languages.extend("zsh", {});
  Prism.languages.insertBefore("zi", "function", {
    "zi-command": {
      pattern:
        /\b(?:zi|zinit)\s+(?:annex|bindkey|cdclear|compile|delete|ice|light|load|module|pack|snippet|source|update)\b/,
      inside: {
        keyword: /\b(?:zi|zinit)\b/,
        function: /\b(?:annex|bindkey|cdclear|compile|delete|ice|light|load|module|pack|snippet|source|update)\b/,
      },
    },
    "zi-ice": {
      pattern:
        /\b(?:as|atclone|atinit|atload|atpull|blockf|cloneonly|depth|from|id-as|lucid|mv|nocompile|pick|proto|src|trigger-load|wait)\b(?=(?:["'\s]|$))/,
      alias: "builtin",
    },
  });

  Prism.languages.zunit = Prism.languages.extend("zsh", {});
  Prism.languages.insertBefore("zunit", "function", {
    "zunit-directive": {
      pattern: /@\b(?:setup|teardown|test)\b/,
      alias: "keyword",
    },
    "zunit-assertion": {
      pattern:
        /\b(?:assert|assert_contains|assert_empty|assert_equal|assert_false|assert_match|assert_not_contains|assert_not_empty|assert_not_equal|assert_not_match|assert_status|assert_true)\b/,
      alias: "function",
    },
    "zunit-command": {
      pattern: /\bzunit\b(?=\s+(?:init|run)|$)/,
      alias: "builtin",
    },
  });
}
