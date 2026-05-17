import type * as PrismNamespace from "prismjs";

export function registerZShellLanguages(Prism: typeof PrismNamespace): void {
  Prism.languages.zsh = Prism.languages.extend("bash", {});

  // ZSH-specific builtins — inserted before 'function' so they take priority
  Prism.languages.insertBefore("zsh", "function", {
    "zsh-builtin": {
      pattern:
        /(?<lb>^|[\s;|&])(?:autoload|bindkey|builtin|compctl|compdump|compinit|compdef|compfiles|compgroups|compquote|comptags|comptry|compvalues|declare|dirs|disable|disown|emulate|enable|fc|float|functions|getcap|getln|getopts|history|integer|jobs|let|limit|local|log|noglob|popd|print|printf|pushd|pushln|pwd|read|readonly|sched|set|setcap|setopt|shift|source|stat|suspend|ttyctl|type|typeset|ulimit|umask|unalias|unfunction|unhash|unlimit|unset|unsetopt|vared|wait|whence|where|which|zcompile|zformat|zle|zmodload|zparseopts|zpty|zregexparse|zsocket|zstyle|ztcp)(?=\s|;|$)/,
      lookbehind: true,
      alias: "builtin",
    },
  });

  // Expansion flags and parameter tokens — inserted before 'variable' for priority
  Prism.languages.insertBefore("zsh", "variable", {
    "zsh-expansion-flag": {
      pattern: /\$\{\([^)]*\)/,
      alias: "attr-value",
    },
    "zsh-special-parameter": {
      pattern: /\$(?:[#*@?!$]|[A-Za-z_][\w-]*|\{[^}\n]+\})/,
      alias: "variable",
    },
    "zsh-glob-qualifier": {
      pattern: /(?<lb>^|[^\w])(?:\*\*\/)?\*[^ \n]*(?:\([^)]+\))/,
      lookbehind: true,
      alias: "operator",
    },
  });

  Prism.languages.zi = Prism.languages.extend("zsh", {});
  Prism.languages.insertBefore("zi", "function", {
    "zi-command": {
      pattern:
        /\b(?:zi|zinit)\s+(?:annex|bindkey|cdclear|cdlist|cdreplay|compile|delete|ice|light(?:-mode)?|load|module|pack|self-update|snippet|source|status|update)\b/,
      inside: {
        keyword: /\b(?:zi|zinit)\b/,
        function:
          /\b(?:annex|bindkey|cdclear|cdlist|cdreplay|compile|delete|ice|light(?:-mode)?|load|module|pack|self-update|snippet|source|status|update)\b/,
      },
    },
    "zi-ice": {
      pattern:
        /\b(?:as|atclone|atinit|atload|atpull|blockf|cloneonly|compile|depth|eval|extract|from|has|id-as|if|lucid|mv|nocd|nocompile|pick|proto|sbin|src|svn|trigger-load|wait)\b(?=(?:["'\s]|$))/,
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
      pattern: /(?<lb>^|[\s;|&])zunit(?=[\s;|&]|$)/,
      lookbehind: true,
      alias: "builtin",
    },
  });
}
