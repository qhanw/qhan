---
title: ClipperLib使用手册
date: 2024-06-22T10:55:00+08:00
category: Graphics
tags: [Graphics, Algorithms]
description: Clipper lib 库对直线和多边形执行裁剪和偏移。支持所有四种布尔裁剪操作——交集、并并、差和异或。多边形可以是任何形状，包括自相交多边形。
draft: true
---

### 简介
ClipperLib fork 自[Javascript Clipper](http://sourceforge.net/projects/jsclipper/)，是对直线和多边形执行裁剪和偏移操作。支持所有四种布尔裁剪操作：交集、并集、差集和异或。多边形可以是任何形状，包括自相交多边形。

[Javascript Clipper](http://sourceforge.net/projects/jsclipper/)是对`Angus Johnson`的[Clipper](https://sourceforge.net/projects/polyclipping/)库的移植。

- [在线示例](http://jsclipper.sourceforge.net/6.2.1.0/main_demo.html)
- [资讯与示例](http://jsclipper.sourceforge.net/6.2.1.0/)

> [!WARNING]
> `Clipper`库的现版本已过时且不再维护，它已被该作者的[Clipper2](https://github.com/AngusJohnson/Clipper2)库取代，但目前还未有对应版本的`Javascript`库。目前存在`wasm`的移植版[Clipper2-WASM](https://github.com/ErikSom/Clipper2-WASM/)，但在项目使用中计算不够准确。




### 特征
- 线和多边形裁剪 - 交集，并集，差集和异或集
- 线和多边形偏移，有 3 种连接方式 - 斜接、方形和圆形
- 支持多种多边形填充规则（EvenOdd、NonZero、Positive、Negative）
- 多边形可以是任意形状，包括自相交多边形
- 包含 Minkowski 加法与减法函数
- 相较于其他库效率极高
- 使用 Tom Wu 的快速大整数库
- 它在数值上是稳健的
- 无论是免费软件还是商用都可以免费使用

### 术语


### 参考

[Clipper 6 文档](https://github.com/junmer/clipper-lib/blob/master/Documentation.md)

