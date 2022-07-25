---
id: test
title: '🌀 Test'
image: img/logo/320x320.png
description: Annexe - Documentation des tests
keywords:
  - annex
  - test
  - zsh
---

<!-- @format -->

## <i class="fa-brands fa-github"></i> [z-shell/z-a-test][]

Une annexe exécute des tests (par exemple `make test``) - si elle est trouvée, elle sera exécutée automatiquement après l'installation et la mise à jour d'un plugin ou d'un snippet.

Il suffit de le charger comme n'importe quel autre plugin pour le rendre actif :

```shell
zi light z-shell/z-a-test
```

## Configuration

Pour exécuter les tests en mode verbeux, exécutez:

```shell
zstyle :zi:annex:test quiet 0
```

avant d'installer ou de mettre à jour le plugin. Pour sauter les tests d'un seul plugin, ajoutez la glace `notest`:

```shell showLineNumbers
zi ice notest
zi load …
```

### Démonstration de l'annexe

Exemple d'activation en mode silencieux par défaut :

![z-p-test-1][2]

Exemple d'activation en mode non silencieux :

![z-p-test-2][3]

![z-a-test][4]

[3]: https://raw.githubusercontent.com/z-shell/z-a-test/main/docs/images/z-p-test-2.png#center
[2]: https://raw.githubusercontent.com/z-shell/z-a-test/main/docs/images/z-p-test-1.png#center
[4]: https://user-images.githubusercontent.com/59910950/162143845-c44ead50-b21a-46c0-8372-18325eb1f33a.gif#center
[z-shell/z-a-test]: https://github.com/z-shell/z-a-test
