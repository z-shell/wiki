---
id: benchmark
title: "⏲ Analyse comparative"
sidebar_position: 3
image: /img/logo/320x320.png
description: Analyse comparative, profilage & Statistiques
keywords:
  - statistics
  - benchmark
  - profiling
  - reporting
---

<!-- @format -->

import APITable from '@site/src/components/APITable';
import ReportZprofExample from '@site/src/components/Markdown/\_report_zprof_example.mdx';

:::info

Run `zi analytics` to see the available commands for statistics and reporting.

:::

## <i class="fa-solid fa-gauge-high"></i> Plugins de profilage

```shell title="~/.zshrc" showLineNumbers
zi ice atinit'zmodload zsh/zprof' \
  atload'zprof | head -n 20; zmodload -u zsh/zprof'
zi light z-shell/F-Sy-H
```

```mdx-code-block
<APITable>
```

| Syntaxe     | Description                                                                                                                                   |
| ----------- |:--------------------------------------------------------------------------------------------------------------------------------------------- |
| `atinit'…'` | loads the `zsh/zprof` module, shipped with Zsh, before loading the plugin – this starts the profiling.                                        |
| `atload'…'` | fonctionne après le chargement du plugin - montre les résultats du profilage `zprof / head`, décharge `zsh/zprof` - ceci arrête le profilage. |

```mdx-code-block
</APITable>
```

Lorsqu'il est en vigueur, seul un seul plugin, dans ce cas, `z-shell/F-Sy-H`, sera profilé.

Les autres plugins se dérouleront tout à fait normalement, comme lorsque les plugins sont chargés avec `light` - le reporting est désactivé.

Less code is being run in the background, the automatic data gathering, during loading of a plugin, for the reports and the possibility to unload the plugin will be activated and the functions will not appear in the `zprof` report.

Exemple de rapport `zprof`:

<ReportZprofExample/>

La première colonne est le temps en millisecondes:

- It denotes the amount of time spent in a function in total
- For example, `--zi-shadow-autoload` consumed 10.71 ms of the execution time

The fourth column is also a time in milliseconds, but it denotes the amount of time spent on executing only of function's **own code**, it doesn't count the time spent in **descendant functions** that is called from the function:

- For example, `--zi-shadow-autoload` spent 8.71 ms on executing only its code

The table is sorted in the **self-time** column.

## <i class="fas fa-spinner fa-spin"></i> Profilage du démarrage de `.zshrc`

### Méthode 1

> `PROFILE_STARTUP=true` pour activer le profilage.

Place the snippet below at the top of `.zshrc`.

```shell title="~/.zshrc" showLineNumbers
PROFILE_STARTUP=false

if [[ "$PROFILE_STARTUP" == true ]]; then
  zmodload zsh/zprof
  PS4=$'%D{%M%S%.} %N:%i> '
  exec 3>&2 2>$HOME/startlog.$$
  setopt xtrace prompt_subst
fi
```

:::info Extension d'invite PS4

Zsh Sourceforge docs: [Prompt Expansion][]

:::

Placez au bas de `.zshrc`

```shell title="~/.zshrc" showLineNumbers
if [[ "$PROFILE_STARTUP" == true ]]; then
  unsetopt xtrace
  exec 2>&3 3>&-; zprof > ~/zshprofile$(date +'%s')
fi
```

La prochaine fois, votre `.zshrc` sera exécuté, il générera 2 fichiers dans le répertoire `$HOME`.

### Méthode 2

Store multiple values to a variable:

```shell title="~/.zshrc" showLineNumbers
# Set variable
typeset -Ag ZLOGS
# Message to store
zmsg() { ZLOGS+=( "\n[$1]: ${(M)$(( SECONDS * 1000 ))#*.?} ms" ); }

# Start profiling
typeset -F4 SECONDS=0

# <RUN SOME FUNCTIONS TO MEASURE>

zmsg "Loaded functions"

# <RUN SOMETHING ELSE>

zmsg "Loaded something else"

# <THE FINAL CODE BLOCK HERE>

zmsg "Done"
```

Then use the `$ZLOGS` variable to retrieve:

```shell showLineNumbers
❯ echo $ZLOGS

[Loaded functions]: 0.0 ms
[Loaded something else]: 0.0 ms
[Done]: 0.1 ms
```

[Prompt Expansion]: https://zsh.sourceforge.net/Doc/Release/Prompt-Expansion.html
