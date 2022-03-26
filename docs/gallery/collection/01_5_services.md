---
id: services
title: '🔺 Services'
description: The Collection of Services
keywords: [collection, services]
---

### ZS: [z-shell/redis](https://github.com/z-shell/redis)

```shell
zi ice wait lucid service"redis"
zi light z-shell/redis
```

### ZS: [z-shell/zsh-github-issues](https://github.com/z-shell/zsh-github-issues)

```shell
GIT_SLEEP_TIME=700
GIT_PROJECTS=z-shell/zsh-github-issues:z-shell/zi

zi ice wait lucid service"GIT" pick"zsh-github-issues.service.zsh"
zi light z-shell/zsh-github-issues
```
