---
title: 常用GIT操作命令
date: 2024-05-10T20:08:56+08:00
category: git
tags: [git, bash]
description: 收集并整理日常工作中频繁用到的一些git操作命令。
---

- 合并分支
```bash
# 先切到需要合并到的分支
git checkout target-branch-name
git merge --no-ff feature/branch-name
```

- 查看提交记录
```bash
# 查看分支记录
git reflog

# 图形查看分支记录
git reflog --graph
```

- 同步远程分支
```bash
# 同步远程分支
git remote prune origin
```
- 获取远程分支
```bash
# 获取远程分支推送(-a 为全部推送)
git fetch -a

# 弃本地所有修改同步最新的远端代码
git fetch --all
git reset --hard origin/main #这里 main 为对应的分支名
git pull

# or
# git pull --force <远程主机名> <远程分支名>:<本地分支名>
git pull --force origin main:main
```
