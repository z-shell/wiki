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
---

<!-- @format -->

:::info

Exécutez `zi analytics` pour voir les sous-commandes Zi disponibles pour les statistiques et les informations.

:::

## <i class="fa-solid fa-gauge-high"></i> Plugins de profilage

```shell title="~/.zshrc" showLineNumbers
zi ice atinit'zmodload zsh/zprof' \
  atload'zprof | head -n 20; zmodload -u zsh/zprof'
zi light z-shell/F-Sy-H
```

| Syntaxe     | Description                                                                                                                                   |
| ----------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `atinit'…'` | loads the`zsh/zprof` module, shipped with Zsh, before loading the plugin – this starts the profiling.                                         |
| `atload'…'` | fonctionne après le chargement du plugin - montre les résultats du profilage `zprof / head`, décharge `zsh/zprof` - ceci arrête le profilage. |

Lorsqu'il est en vigueur, seul un seul plugin, dans ce cas, `z-shell/F-Sy-H`, sera profilé.

Les autres plugins se dérouleront tout à fait normalement, comme lorsque les plugins sont chargés avec `light` - le reporting est désactivé.

Less code is being run in the background, the automatic data gathering, during loading of a plugin, for the reports and the possibility to unload the plugin will be activated and the functions will not appear in the `zprof` report.

- Exemple de rapport `zprof`:

```shell {3} title="zprof" showLineNumbers
num calls    time                self                 name
---------------------------------------------------------------------------
 1)  1 57,76 57,76 57,91%  57,76 57,76 57,91% _zsh_highlight_bind_widgets
 2)  1 25,81 25,81 25,88%  25,81 25,81 25,88% compinit
 3)  4 10,71  2,68 10,74%   8,71  2,18  8,73% --zi-shadow-autoload
 4) 43  2,06  0,05  2,07%   2,06  0,05  2,07% -zi-add-report
 5)  8  1,98  0,25  1,98%   1,98  0,25  1,98% compdef
 6)  1  2,85  2,85  2,85%   0,87  0,87  0,87% -zi-compdef-replay
 7)  1  0,68  0,68  0,68%   0,68  0,68  0,68% -zi-shadow-off
 8)  1  0,79  0,79  0,79%   0,49  0,49  0,49% add-zsh-hook
 9)  1  0,47  0,47  0,47%   0,47  0,47  0,47% -zi-shadow-on
1)   3  0,34  0,11  0,35%   0,34  0,11  0,35% (anon)
2)   4 10,91  2,73 10,94%   0,20  0,05  0,20% autoload
3)   1  0,19  0,19  0,19%   0,19  0,19  0,19% -fast-highlight-fill-option-variables
4)   1 25,98 25,98 26,05%   0,17  0,17  0,17% zpcompinit
5)   1  2,88  2,88  2,89%   0,03  0,03  0,03% zpcdreplay
6)   1  0,00  0,00  0,00%   0,00  0,00  0,00% -zi-load-plugin
-----------------------------------------------------------------------------------
```

- La première colonne est le temps en millisecondes:

  - Il indique le temps total passé dans une fonction.
  - Par exemple, `--zi-shadow-autoload` a consommé 10,71 ms du temps d'exécution,

- La quatrième colonne est également un temps en millisecondes, mais elle indique le temps passé à exécuter uniquement le propre code**de la fonction **, elle ne compte pas le temps passé dans **fonctions descendantes** qui sont appelées depuis la fonction;

  - Par exemple, `--zi-shadow-autoload` a dépensé 8,71 ms pour exécuter uniquement son code.

- The table is sorted in the **self-time** column.

## <i class="fas fa-spinner fa-spin"></i> Profilage du démarrage de `.zshrc`

### Méthode 1

> `PROFILE_STARTUP=true` pour activer le profilage.

Placez le snippet ci-dessous en haut de `.zshrc`.

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
# Définir la variable
typeset -Ag ZLOGS
# Message à stocker
zmsg() { ZLOGS+=( "\n[$1] : ${(M)$(( SECONDS * 1000 ))#*.?} ms" ) ; } }

# Démarrer le profilage
typeset -F4 SECONDS=0

# <RUN SOME FUNCTIONS TO MEASURE>

zmsg "Loaded functions"

# <RUN SOMETHING ELSE>

zmsg "Loaded something else"

# <THE FINAL CODEBLOCK HERE>

zmsg "Done"
```

Then use the `$ZLOGS` variable to retrieve:

```shell showLineNumbers
❯ echo $ZLOGS

[Loaded functions]: 0.0 ms
[Loaded something else]: 0.0 ms
[Done]: 0.1 ms
```

[prompt expansion]: https://zsh.sourceforge.net/Doc/Release/Prompt-Expansion.html
