---
id: patch-dl
title: "🌀 Patch DL"
image: img/logo/320x320.png
description: Annexe - Documentation Patch DL
keywords:
  - annex,
  - patch-dl
---

<!-- @format -->

## <i class="fa-brands fa-github"></i> [z-shell/z-a-patch-dl][]

Une annexe télécharge des fichiers et applique des correctifs et ajoute deux modificateurs de glace:

D'abord:

```shell
zi ice dl'{URL} [-> {optional-output-file-name}]; …' …
```

Ensuite:

```shell
zi ice patch'{file-name-with-the-patch-to-apply}; …' …
```

L'annexe (ex. Une extension Zi) téléchargera le `{URL}` donné sous le chemin `{optional-output-file-name}` (si aucun nom de fichier n'est donné, il est extrait du dernier segment de l'URL) dans le cas du modificateur de glace `dl'…'` , et applique un patch donné par le `{file-name-with-the-patch-to-apply}` dans le cas du `patch'…'` ice-modfier.

Vous pouvez utiliser cette fonctionnalité pour télécharger et appliquer des correctifs. Par exemple, pour installer `fbterm`, deux correctifs sont nécessaires, l'un pour corriger l'opération, l'autre pour corriger la génération:

```shell showLineNumbers
zi ice as"command" pick"$ZPFX/bin/fbterm" \
  dl"https://bugs.archlinux.org/task/46860?getfile=13513 -> ins.patch" \
  dl"https://aur.archlinux.org/cgit/aur.git/plain/0001-Fix-build-with-gcc-6.patch?h=fbterm-git" \
    patch"ins.patch; 0001-Fix-build-with-gcc-6.patch" \
      atclone"./configure --prefix=$ZPFX" \
      atpull"%atclone" make"install" reset
zi load izmntuk/fbterm
```

Cette commande aura pour résultat:

![exemple fbterm](https://raw.githubusercontent.com/z-shell/z-a-patch-dl/main/docs/images/fbterm-ex.png#center)

## Installer Patch DL

Chargez simplement comme un plugin, c.-à-d.:

```shell
zi light z-shell/z-a-patch-dl
```

Après avoir exécuté cette commande, vous pouvez ensuite utiliser les modules de glace `dl'…'` et `patch'…'`.

[z-shell/z-a-patch-dl]: https://github.com/z-shell/z-a-patch-dl
