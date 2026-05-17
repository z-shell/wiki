// Custom Prism language definition for ZSH.
// Extends Prism's bash grammar with ZSH-specific builtins and project commands.
(function (Prism) {
  // Clone bash grammar as the base
  Prism.languages.zsh = Prism.languages.extend('bash', {});

  // Insert ZSH builtins and project commands BEFORE bash's 'function' token
  // so they take priority over generic identifier matching.
  Prism.languages.insertBefore('zsh', 'function', {
    // ZSH plugin manager — highlight as keyword for distinct color
    'zi-command': {
      pattern: /(^|[\s;|&])zi(?=\s|$)/,
      lookbehind: true,
      alias: 'keyword',
    },

    // ZSH unit testing framework
    'zunit-command': {
      pattern: /(^|[\s;|&])zunit(?=\s|$)/,
      lookbehind: true,
      alias: 'keyword',
    },

    // ZSH-specific builtins not present (or not highlighted) in bash
    'zsh-builtin': {
      pattern:
        /(^|[\s;|&])(?:autoload|bindkey|builtin|compctl|compdump|compinit|compdef|compfiles|compgroups|compquote|comptags|comptry|compvalues|declare|dirs|disable|disown|emulate|enable|fc|float|functions|getcap|getln|getopts|history|integer|jobs|let|limit|local|log|noglob|popd|print|printf|pushd|pushln|pwd|read|readonly|sched|set|setcap|setopt|shift|source|stat|suspend|ttyctl|type|typeset|ulimit|umask|unalias|unfunction|unhash|unlimit|unset|unsetopt|vared|wait|whence|where|which|zcompile|zformat|zle|zmodload|zparseopts|zpty|zregexparse|zsocket|zstyle|ztcp)(?=\s|$)/,
      lookbehind: true,
      alias: 'builtin',
    },
  });

  // ZSH parameter expansion flags: ${(U)var}, ${(f)var}, ${(P)var}, etc.
  // Insert before 'variable' so flag notation gets its own token.
  Prism.languages.insertBefore('zsh', 'variable', {
    'zsh-expansion-flag': {
      pattern: /\$\{\([^)]*\)/,
      alias: 'attr-value',
    },
  });
})(Prism);
