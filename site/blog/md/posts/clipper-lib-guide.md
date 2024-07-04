---
title: ClipperLib使用手册
date: 2024-06-22T10:55:00+08:00
category: Graphics
tags: [Graphics, Algorithms]
description: Clipper lib 库对直线和多边形执行裁剪和偏移。支持所有四种布尔裁剪操作——交集、并并、差和异或。多边形可以是任何形状，包括自相交多边形。
---

### TOC

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
- 使用 Tom Wu 的快速大整数库[JSBN](http://www-cs-students.stanford.edu/~tjw/jsbn/)
- 它在数值上是稳健的
- 无论是免费软件还是商用都可以免费使用

### 术语

- **裁剪（Clipping）：** 通常指从一组二维几何形状中移除（切除）矩形“裁剪”窗口之外的部分的过程。这可以通过将主题路径（线和多边形）与裁剪矩形相交来实现。从更一般的意义上讲，裁剪窗口不必是矩形，而可以是任何类型的多边形，甚至是多个多边形。此外，虽然裁剪通常指交集运算，但在本文档中，它将指[四个布尔运算](#clipperlibcliptype)（交集、并集、差集和异或）中的任何一个。
- **路径（Path）：** 是定义单个几何轮廓的顶点的有序序列，该轮廓可以是一条线（开放路径）或一个多边形（封闭路径）。
- **轮廓（Contour）：** 与路径同义。
- **线（Line）：** 或折线是包含 2 个或更多顶点的开放路径。
- **多边形（Polygon）：** 一般意义上是指由外部闭合[路径](#clipperlibpath)界定且包含零到多个“洞”的二维区域。然而，在本文档中，多边形是指已知闭合的路径。
- **洞（Hole）：** 是多边形内部不属于该多边形的封闭区域。构成​​洞外边界的多边形称为洞多边形。
- **多边形填充规则（Polygon Filling Rule）：** [填充规则](#clipperlibpolyfilltype)与路径列表一起定义多边形内部（即在图形显示中“填充”）和外部路径所包围的区域。


**分发包内容：**

ZIP 包包含 Clipper 库的源代码，包括已压缩和未压缩版本。该库最初是用 Delphi Pascal 编写的，但后来也用 C++、C# 和 Python 编写。每种语言的库源代码大约有 5000 行。由于 JSBN 库和一些辅助函数，JavaScript 实现更长，大约有 6200 行。

演示应用程序和示例不包含在分发包中。它们可以在[此处](http://jsclipper.sourceforge.net/6.1.3.2/)访问。示例应用程序展示了如何将 Clipper 与**SVG**和**Canvas**一起使用。

**下载链接：** [SourceForge](https://sourceforge.net/projects/jsclipper/files/)

**参考：** 阅读有关剪辑和偏移算法的[参考资料](http://www.angusj.com/delphi/clipper/documentation/Docs/Overview/_Body.htm)。

**另请参阅：** [OffsetPaths](#clipperlibclipperoffsetpaths), [ClipType](#clipperlibcliptype), [Path](#clipperlibpath), [PolyFillType](#clipperlibpolyfilltype)


### 预处理器定义

```plaintext
Boolean use_int32
Boolean use_xyz
Boolean use_lines
Boolean use_deprecated
```
- **use_int32**： 未在 Javascript 中实现。
- **use_xyz**：向[IntPoint](#clipperlibintpoint) 添加“Z”成员，对性能的影响很小。有关更多详细信息，请参阅 Clipper 的[Clipper.ZFillFunction](#clipperlibclipperzfillfunction)属性。（默认情况下禁用）
- **use_lines**： 启用开放路径（线）剪辑。如果禁用线剪辑，性能通常会有很小的提升（即约 5%）。（默认启用）
- **use_deprecated**： 允许使用 Clipper 6 之前的版本开发的代码无需更改即可编译。这会公开将在未来更新中删除的兼容性代码。（默认启用）



**用法：**
```js
const use_xyz = true;
const use_lines = true;
const use_deprecated = true;
```

**另请参阅**：[Clipper.ZFillFunction](#clipperlibclipperzfillfunction), [IntPoint](#clipperlibintpoint)


### ClipperBase
ClipperBase 是[Clipper](#clipper)的抽象基类。ClipperBase 对象不应直接实例化。


#### ClipperBase.AddPath()

> Boolean AddPath([Path](#clipperlibpath) pg, [PolyType](#clipperlibpolytype) polyType, Boolean closed);

可以将任意数量的主题和剪辑路径添加到剪辑任务中，可以通过 AddPath() 方法单独添加，也可以通过 AddPaths() 方法作为组添加，甚至可以同时使用这两种方法。

“主体”路径可以是开放的（线）或封闭的（多边形），甚至可以是两者的混合，但“剪切”路径必须始终是封闭的。Clipper 允许多边形剪切线和其他多边形，但不允许线剪切线或多边形。

对于封闭路径，[方向](#clipperlibclipperorientation)应符合通过 Clipper 的[Execute](#clipperlibclipperexecute)方法传递的[填充规则](#clipperlibpolyfilltype)。

**路径坐标范围**：路径坐标必须在 ± 4503599627370495 (sqrt(2^106 -1)/2) 之间，否则在尝试将路径添加到 Clipper 对象时会抛出范围错误。如果坐标可以保持在 ± 47453132 (sqrt(2^53 -1)/2) 之间，则可以通过避免大整数数学运算来实现更大范围内的性能提升（约 40-50%）。

**返回值**：如果路径为空或几乎为空，则函数将返回 false。以下情况路径几乎为空：

- 其顶点数少于 2 个。
- 它有 2 个顶点，但不是开放路径
- 所有顶点都是共线的，并且不是开放路径

**用法：**
```js
const cpr = new ClipperLib.Clipper();
const path = [{"X":10,"Y":10},{"X":110,"Y":10},{"X":110,"Y":110},{"X":10,"Y":110}];
cpr.AddPath(path, ClipperLib.PolyType.ptSubject, true);
```
**另请参阅：** [Example](#example), [Clipper.Execute](#clipperlibclipperexecute), [AddPaths](#clipperbaseaddpaths), [Orientation](#clipperlibclipperorientation), [Defines](#preprocessor-defines), [Path](#clipperlibpath), [PolyFillType](#clipperlibpolyfilltype), [PolyType](#clipperlibpolytype)


#### ClipperBase.AddPaths()

> Boolean AddPaths([Paths](#clipperlibpaths) ppg, [PolyType](#clipperlibpolytype) polyType, Boolean closed);

功能与[AddPath()](#clipperbaseaddpath)相同，但参数是[Paths](#clipperlibpaths)。

**用法：**
```js
const cpr = new ClipperLib.Clipper();
const paths = [
  [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
  [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]
];
cpr.AddPaths(paths, ClipperLib.PolyType.ptSubject, true);
```

**另请参阅：** [Example](#example), [Clipper.Execute](#clipperlibclipperexecute), [AddPath](#clipperbaseaddpath), [Orientation](#clipperlibclipperorientation), [Defines](#preprocessor-defines), [Paths](#clipperlibpaths), [PolyFillType](#clipperlibpolyfilltype), [PolyType](#clipperlibpolytype)


#### ClipperBase.Clear()
```plaintext
void Clear();
```

Clear 方法会删除任何现有的主题和剪辑多边形，从而允许 Clipper 对象被重新用于对不同的多边形集进行剪辑操作。

**用法：**
```js
cpr.Clear();
```
---

### Clipper

Clipper 类封装了对多边形的[布尔运算]((#clipperlibcliptype))（交、并、差、异或），又称[多边形裁剪](#terminology)。

输入多边形（主体集和裁剪集）通过其[AddPath](#clipperbaseaddpath)和[AddPaths](#clipperbaseaddpaths)方法传递给 Clipper 对象，并通过调用其[Execute](#clipperlibclipperexecute)方法执行裁剪操作。通过重复调用 Execute，可以对相同的输入多边形集执行多个布尔操作。

**另请参阅：** [Overview](#overview), [ClipType](#clipperlibcliptype)


#### ClipperLib.Clipper()
> Clipper Clipper [InitOptions](#initoptions) initOptions = 0);

Clipper 构造函数创建 Clipper 类的一个实例。可以传递一个或多个[InitOptions](#initoptions)作为参数来设置相应的属性。（构造后仍可设置或重置这些属性。）

**用法：**
```js
const cpr = new ClipperLib.Clipper();
// or
const cpr = new ClipperLib.Clipper(ClipperLib.Clipper.ioStrictlySimple | ClipperLib.Clipper.ioPreserveCollinear);
// or
const cpr = new ClipperLib.Clipper(2 | 4);
```
**另请参阅：** [PreserveCollinear](#clipperlibclipperpreservecollinear), [ReverseSolution](#clipperlibclipperreversesolution), [StrictlySimple](#clipperlibclipperstrictlysimple), [InitOptions](#initoptions)


#### ClipperLib.Clipper.Area()

> Number Area([Path](#clipperlibpath) poly)

此函数返回所提供多边形的面积。（假设路径是闭合的。）根据[方向](#clipperlibclipperorientation)，此值可能是正数或负数。如果方向为真，则面积为正数，反之，如果方向为假，则面积为负数。

**用法：**
```js
const area = ClipperLib.Clipper.Area(polygon);
```

**另请参阅：** [Orientation](#clipperlibclipperorientation), [Path](#clipperlibpath)


#### ClipperLib.Clipper.CleanPolygon()

> [Path](#clipperlibpath) CleanPolygon([Path](#clipperlibpath) path, Number distance)

需要此功能以防止由于顶点太近和/或微自相交而引起的扭曲。

删除顶点：

- 连接共线边，或连接几乎共线的边（这样，如果顶点移动的距离不超过指定的距离，边将是共线的）
- 位于相邻顶点指定距离内的
- 在半相邻顶点及其外围顶点的指定距离范围内

当顶点被单个（外部）顶点分隔时，它们就是半相邻的。

距离参数的默认值约为 √2，因此当相邻或半相邻顶点的相应 X 和 Y 坐标相差不超过 1 个单位时，将删除该顶点。（如果边是半相邻的，则也会删除外围顶点。）

Timo：根据测试，偏移前去除伪影的最合适的距离值是 0.1 * scale。

![CleanPolygon01](/images/posts/clipper/01.png)
![CleanPolygon02](/images/posts/clipper/02.png)

**用法：**
```js
const  path = [{"X":10,"Y":10},{"X":11,"Y":11},{"X":110,"Y":10},{"X":110,"Y":110},{"X":10,"Y":110}];
var cleaned_path = ClipperLib.Clipper.CleanPolygon(path, 1.1);
// point {"X":11,"Y":11} is now removed
```
**另请参阅：** [CleanPolygons](#clipperlibclippercleanpolygons), [SimplifyPolygon](#clipperlibclippersimplifypolygon), [Path](#clipperlibpath)

#### ClipperLib.Clipper.CleanPolygons()

> [Paths](#clipperlibpaths) CleanPolygons([Paths](#clipperlibpaths) polys, Number distance)

功能与 CleanPolygon 相同，但参数为 Paths 类型。

经过测试，偏移前去除伪影最合适的距离值为 0.1 * scale

在[CleanPolygon](#clipperlibclippercleanpolygon)中了解更多内容。

**用法：**
```js
const paths = [
  [{X:10,Y:10},{X:11,Y:11},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
  [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]
];
const cleaned_paths = ClipperLib.Clipper.CleanPolygons(paths, 1.1);
// point {"X":11,"Y":11} is removed
```
**另请参阅：** [CleanPolygon](#clipperlibclippercleanpolygon), [SimplifyPolygons](#clipperlibclippersimplifypolygons)


#### ClipperLib.Clipper.ClosedPathsFromPolyTree()

> [Paths](#clipperlibpaths) ClosedPathsFromPolyTree([PolyTree](#clipperlibpolytree) polytree)

此函数从 PolyTree 结构中过滤出开放路径，并仅返回 Paths 结构中的封闭路径。

**用法：**
```js
// ... polytree 由 Execute() 自动填充
const polygons = ClipperLib.Clipper.ClosedPathsFromPolyTree(polytree);
```
**另请参阅：** [PolyTree](#clipperlibpolytree), [Paths](#clipperlibpaths)

#### ClipperLib.Clipper.Execute()

> Boolean Execute([ClipType](#clipperlibcliptype) clipType,
> [Paths](#clipperlibpaths) solution,
> [PolyFillType](#clipperlibpolyfilltype) subjFillType,
> [PolyFillType](#clipperlibpolyfilltype) clipFillType);

> Boolean Execute([ClipType](#clipperlibcliptype) clipType,
> [PolyTree](#clipperlibpolytree) solution,
> [PolyFillType](#clipperlibpolyfilltype) subjFillType,
> [PolyFillType](#clipperlibpolyfilltype) clipFillType);

一旦分配了主题和剪辑路径（通过[AddPath](#clipperbaseaddpath)和/或[AddPaths](#clipperbaseaddpaths) ），Execute 就可以执行[clipType](#clipperlibcliptype)参数指定的剪辑操作（交集、并集、差集或 XOR）。

解决方案参数可以是[Paths](#clipperlibpaths)或[PolyTree](#clipperlibpolytree)结构。Paths 结构比 PolyTree 结构更简单、更快（大约快 10%）。PolyTree 保存路径的父子关系信息，以及路径是开放的还是封闭的。

当在开放路径上执行裁剪操作时，提供了两个辅助函数来快速从解决方案中分离出开放路径和封闭路径 - [OpenPathsFromPolyTree](#clipperlibclipperopenpathsfrompolytree)和[ClosedPathsFromPolyTree](#clipperlibclipperclosedpathsfrompolytree)。[PolyTreeToPaths](#clipperlibclipperpolytreetopaths)也可用于将路径数据转换为 Paths 结构（无论它们是开放的还是封闭的）。

关于返回的解决方案路径，有几点需要注意：

- 它们没有任何特定的顺序
- 它们不应该重叠或自相交（但请参阅有关[舍入](#rounding)的注释）
- 孔将朝向外部多边形的对面
- 解决方案填充类型可以被视为 EvenOdd 或 NonZero，因为它符合填充规则
- 多边形很少会共享一条共同边（尽管从版本 6 开始这种情况已经非常罕见）

subjFillType 和 clipFillType 参数分别定义应用于主题路径和剪辑路径中的多边形（即封闭路径）的多边形[填充规则](#clipperlibpolyfilltype)。（两组多边形通常使用相同的填充规则，但显然不是必需的。）

可以多次调用执行，而无需重新分配主题和剪辑多边形（即当在相同的多边形集上需要不同的剪辑操作时）。

![common_edges](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/common_edges.png)

**用法：**
```js
function DrawPolygons(paths, color) {/* ... */}

function Main(args) {
  const subj = [
    [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
    [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]
  ];
  const clip = [
    [{X:50,Y:50},{X:150,Y:50},{X:150,Y:150},{X:50,Y:150}],
    [{X:60,Y:60},{X:60,Y:140},{X:140,Y:140},{X:140,Y:60}]
  ];
  DrawPolygons(subj, 0x8033FFFF);
  DrawPolygons(clip, 0x80FFFF33);

  const solution = new ClipperLib.Paths();
  const c = new ClipperLib.Clipper();
  c.AddPaths(subj, ClipperLib.PolyType.ptSubject, true);
  c.AddPaths(clips, ClipperLib.PolyType.ptClip, true);
  c.Execute(ClipperLib.ClipType.ctIntersection, solution);

  DrawPolygons(solution, 0x40808080);
}
Main();
```
**另请参阅：** [Rounding](#rounding), [ClipperBase.AddPath](#clipperbaseaddpath), [ClipperBase.AddPaths](#clipperbaseaddpaths), [PolyNode.IsOpen](#clipperlibpolynodeisopen), [PolyTree](#clipperlibpolytree), [ClosedPathsFromPolyTree](#clipperlibclipperclosedpathsfrompolytree), [OpenPathsFromPolyTree](#clipperlibclipperopenpathsfrompolytree), [PolyTreeToPaths](#clipperlibclipperpolytreetopaths), [ClipType](#clipperlibcliptype), [Path](#clipperlibpath), [Paths](#clipperlibpaths), [PolyFillType](#clipperlibpolyfilltype)


#### ClipperLib.Clipper.GetBounds()
> [IntRect](#clipperlibintrect) GetBounds [Paths](#clipperlibpaths) paths);

该方法返回路径的轴对齐边界矩形。

**用法：**
```js
const paths = [[{"X":10,"Y":10},{"X":110,"Y":10},{"X":110,"Y":110},{"X":10,"Y":110}]];
const bounds = ClipperLib.Clipper.GetBounds(paths);
// bounds is {"left":10,"top":10,"right":110,"bottom":110}
```
**另请参阅：** [Example](#example), [IntRect](#clipperlibintrect)

#### ClipperLib.Clipper.MinkowskiDiff()

> [Paths](#clipperlibpaths) MinkowskiDiff([Path](#clipperlibpath) poly, [Path](#clipperlibpath) path, Boolean isClosed)

明可夫斯基差分是通过从开放或封闭路径中的点集减去多边形中的每个点来执行的。明可夫斯基差分的一个关键特性是，当它应用于两个多边形时，只要两个多边形接触或重叠，生成的多边形就会包含坐标空间原点。（此功能通常用于确定多边形何时发生碰撞。）

**另请参阅：** [MinkowskiSum](#clipperlibclipperminkowskisum), [Path](#clipperlibpath), [Paths](#clipperlibpaths)

#### ClipperLib.Clipper.MinkowskiSum()

> [Paths](#clipperlibpaths) MinkowskiSum([Path](#clipperlibpath) pattern, [Path](#clipperlibpath) path, Boolean pathIsClosed)

> [Paths](#clipperlibpaths) MinkowskiSum([Path](#clipperlibpath) pattern, [Paths](#clipperlibpaths) paths, [PolyFillType](#clipperlibpolyfilltype) pathFillType, Boolean pathIsClosed)

明可夫斯基加法是通过将多边形“图案”中的每个点添加到开放或封闭路径中的点集来执行的。生成的多边形（或多个多边形）定义了“图案”从“路径”的起点移动到终点时将经过的区域。

**用法：**
```js
// Star shape ...
const path = [{"X":89.85,"Y":355.85},{"X":131.72,"Y":227.13},{"X":22.1,"Y":147.57},{"X":157.6,"Y":147.57},{"X":199.47,"Y":18.85},{"X":241.34,"Y":147.57},{"X":376.84,"Y":147.57},{"X":267.22,"Y":227.13},{"X":309.09,"Y":355.85},{"X":199.47,"Y":276.29}];
// Diagonal brush shape ...
const shape = [{"X":4,"Y":-6},{"X":6,"Y":-6},{"X":-4,"Y":6},{"X":-6,"Y":6}];
const solution = ClipperLib.Clipper.MinkowskiSum(shape, path, true);
```
**另请参阅：** [MinkowskiDiff](#clipperlibclipperminkowskidiff), [Path](#clipperlibpath), [Paths](#clipperlibpaths)

#### ~~ClipperLib.Clipper.OffsetPaths()~~

> [Paths](#clipperlibpaths) OffsetPaths([Paths](#clipperlibpaths) polys, Number delta, [JoinType](#clipperlibjointype) jointype = JoinType.jtSquare, [EndType](#clipperlibendtype) endtype = EndType.etClosed, Number limit)

**Deprecated.** (See [ClipperOffset](#clipperlibclipperoffset).)

**已弃用。**（请参阅[ClipperOffset](#clipperlibclipperoffset)。）

此函数将“polys”参数偏移“delta”量。“polys”可以是开放路径或封闭路径。对于封闭路径（多边形），正 delta 值会“扩大”外部轮廓并“缩小”内部“孔”轮廓。负 delta 则相反。对于开放路径（线），delta 值的符号将被忽略，因为无法“缩小”开放路径。

边缘连接可以是三种[连接类型](#clipperlibclipperoffsetjointype)之一 - jtMiter、jtSquare 或 jtRound。（请参见下图中的示例。）

![jointypes](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/jointypes.png)

limit 参数的含义和用法取决于jointype：

- jtMiter：限制设置顶点在应用平方之前可以偏离其原始位置的最大距离（以 delta 的倍数表示）。默认值为 2（即 delta 的两倍），这也是允许的最小值。如果角度足够锐利以致需要平方，则平方将发生在 1 倍 delta 处。如果允许偏移而没有任何限制（即不进行平方），那么在非常锐利的角度处偏移会产生不可接受的长“尖峰”。

- jtRound：限制设置圆角连接偏离其真实圆弧的最大距离（因为需要无限数量的顶点才能完美地表示圆弧）。默认限制为 0.25 个单位，但实际上精度永远不会超过 0.5，因为圆弧坐标仍将四舍五入为整数值。当偏移具有非常大坐标值的多边形时（通常是由于缩放），建议增加限制以保持所有连接的一致精度，因为任何圆弧中允许的最大顶点数为 222。（选择此硬编码上限是因为用 222 个顶点构造的圆的不精度仅为其半径的 1/10000，并且创建大量圆弧顶点不仅计算成本高昂，还会导致内存不足问题。）

- jtSquare：由于平方将以 1 倍 delta 统一应用，因此限制参数被忽略。

在将路径传递给 OffsetPaths 之前，必须先删除封闭路径中的自相交。

**用法：**
```js
const paths = [[{"X":224,"Y":146},{"X":224,"Y":213},{"X":201,"Y":191},{"X":179,"Y":235},{"X":134,"Y":191},{"X":179,"Y":168},{"X":157,"Y":146}]];
const offset_paths = ClipperLib.Clipper.OffsetPaths(paths, 10, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etClosed, 0.25);
```
**另请参阅：** [ClipperOffset](#clipperlibclipperoffset), [ClipperOffset.JoinType](#clipperlibclipperoffsetjointype), [Path](#clipperlibpath)

#### ClipperLib.Clipper.OpenPathsFromPolyTree()

> [Paths](#clipperlibpaths) OpenPathsFromPolyTree([PolyTree](#clipperlibpolytree) polytree)

此函数从 PolyTree 结构中过滤掉封闭路径，并仅返回 Paths 结构中的开放路径。

**用法：**
```js
// ... polytree is populated automatically by Execute()
const lines = ClipperLib.Clipper.OpenPathsFromPolyTree(polytree);
```
**另请参阅：** [PolyTree](#clipperlibpolytree), [Paths](#clipperlibpaths)

#### ClipperLib.Clipper.Orientation()

> Boolean Orientation([Path](#clipperlibpath) poly)

如果多边形面积 >=0，则返回 true。

方向仅对封闭路径很重要。鉴于顶点是按特定顺序声明的，方向是指这些顶点围绕封闭路径行进的方向（顺时针或逆时针）。

方向也取决于轴方向：

- 在 Y 轴正向上显示时，如果多边形的方向是逆时针，Orientation 将返回 true。

- 在 Y 轴正向下显示时，如果多边形的方向是顺时针，则 Orientation 将返回 true。

![orientation](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/orientation.png)


**注意：**

- 自相交多边形具有不确定的方向，在这种情况下该函数不会返回有意义的值。
- 大多数 2D 图形显示库（例如 GDI、GDI+、XLib、Cairo、AGG、Graphics32）甚至 SVG 文件格式的坐标原点都位于各自视口的左上角，Y 轴向下增加。但是，有些显示库（例如 Quartz、OpenGL）的坐标原点未定义或位于经典的左下角，Y 轴向上增加。
- 对于非零填充的多边形，[孔洞](#terminology)的方向必须与[外部](#terminology)多边形的方向相反。
- 对于 Clipper 的 Execute 方法返回的解决方案中的封闭路径（多边形），它们的方向对于外部多边形始终为 true，对于孔多边形始终为 false（除非已启用[ReverseSolution](#clipperlibclipperreversesolution)属性）。

**用法：**
```js
const orientation = ClipperLib.Clipper.Orientation(polygon);
```
**另请参阅：** [Area](#clipperlibclipperarea), [Clipper.ReverseSolution](#clipperlibclipperreversesolution), [Path](#clipperlibpath)

#### ClipperLib.Clipper.PointInPolygon()

> Number PointInPolygon([IntPoint](#clipperlibintpoint) pt, [Path](#clipperlibpath) poly)

如果为假则返回 0，如果点在多边形上则返回 -1 ，如果点在多边形内则返回 +1 。

**用法：**
```js
const poly = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
const pt = new ClipperLib.IntPoint(50,50);
const inpoly = ClipperLib.Clipper.PointInPolygon(pt, poly);
// inpoly is 1, which means that pt is in polygon
```
**另请参阅：** [IntPoint](#clipperlibintpoint), [Path](#clipperlibpath)

#### ClipperLib.Clipper.PolyTreeToPaths()

> [Paths](#clipperlibpaths) PolyTreeToPaths([PolyTree](#clipperlibpolytree) polytree)

此函数将[PolyTree](#clipperlibpolytree)结构转换为[Paths](#clipperlibpaths)结构（无论它们是开放的还是封闭的）。要区分开放路径和封闭路径，请使用[OpenPathsFromPolyTree](#clipperlibclipperopenpathsfrompolytree)或[ClosedPathsFromPolyTree](#clipperlibclipperclosedpathsfrompolytree)。

**用法：**
```js
// ... polytree is populated automatically by Execute()
const paths = ClipperLib.Clipper.PolyTreeToPaths(polytree);
```
**另请参阅：** [PolyTree](#clipperlibpolytree), [Paths](#clipperlibpaths)

#### ClipperLib.Clipper.ReversePath()

```plaintext
Call Path.reverse().
```
反转路径中的顶点顺序（以及方向）。

**用法：**
```js
const path = [{"X":10,"Y":10},{"X":110,"Y":10},{"X":110,"Y":110},{"X":10,"Y":110}];
path.reverse();
// path is now [[{"X":10,"Y":110},{"X":110,"Y":110},{"X":110,"Y":10},{"X":10,"Y":10}]]
```
#### ClipperLib.Clipper.ReversePaths()

> void ReversePaths([Paths](#clipperlibpaths) p)

反转每个包含路径中的顶点顺序（以及方向）。

**用法：**
```js
const paths = [[{"X":10,"Y":10},{"X":110,"Y":10},{"X":110,"Y":110},{"X":10,"Y":110}]];
ClipperLib.Clipper.ReversePaths(paths);
// paths is now [[{"X":10,"Y":110},{"X":110,"Y":110},{"X":110,"Y":10},{"X":10,"Y":10}]]
```
#### ClipperLib.Clipper.SimplifyPolygon()

> [Paths](#clipperlibpaths) SimplifyPolygon([Path](#clipperlibpath) poly, [PolyFillType](#clipperlibpolyfilltype) fillType = PolyFillType.pftEvenOdd)

从所提供的多边形中删除自相交（通过使用指定的[PolyFillType](#clipperlibpolyfilltype)执行布尔联合运算）。

具有不连续重复顶点（即“接触”）的多边形将被分成两个多边形。

![simplify](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/simplify.png)
![simplify2](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/simplify2.png)
![simplify3](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/simplify3.png)

**用法：**
```js
// five-pointed star with self-intersections...
const five_pointed_star = [{"X":147,"Y":313},{"X":247,"Y":34},{"X":338,"Y":312},{"X":86,"Y":123},{"X":404,"Y":124}];
const ten_pointed_star = ClipperLib.Clipper.SimplifyPolygon(five_pointed_star, ClipperLib.PolyFillType.pftNonZero);
// ten_pointed_star is a ten-pointed star with no self-intersections
const fifteen_pointed_star = ClipperLib.Clipper.SimplifyPolygon(five_pointed_star, ClipperLib.PolyFillType.pftEvenOdd);
// fifteen_pointed_star is a fifteen-pointed star with no self-intersections
```

**另请参阅：** [Clipper.StrictlySimple](#clipperlibclipperstrictlysimple), [CleanPolygon](#clipperlibclippercleanpolygon), [Path](#clipperlibpath), [PolyFillType](#clipperlibpolyfilltype)

#### ClipperLib.Clipper.SimplifyPolygons()

> [Paths](#clipperlibpaths) SimplifyPolygons([Paths](#clipperlibpaths) polys, [PolyFillType](#clipperlibpolyfilltype) fillType = PolyFillType.pftEvenOdd)

与[SimplifyPolygon](#clipperlibclippersimplifypolygon)中的功能相同，但参数属于[Paths](#clipperlibpaths)类型。

**用法：**
```js
// five-pointed star with self-intersections...
const five_pointed_star = [[{"X":147,"Y":313},{"X":247,"Y":34},{"X":338,"Y":312},{"X":86,"Y":123},{"X":404,"Y":124}]];
const ten_pointed_star = ClipperLib.Clipper.SimplifyPolygons(five_pointed_star, ClipperLib.PolyFillType.pftNonZero);
// ten_pointed_star is a ten-pointed star with no self-intersections
const fifteen_pointed_star = ClipperLib.Clipper.SimplifyPolygon(five_pointed_star, ClipperLib.PolyFillType.pftEvenOdd);
// fifteen_pointed_star is a fifteen-pointed star with no self-intersections
```
**另请参阅：** [Clipper.StrictlySimple](#clipperlibclipperstrictlysimple), [CleanPolygons](#clipperlibclippercleanpolygons), [PolyFillType](#clipperlibpolyfilltype)

#### ClipperLib.Clipper.PreserveCollinear

```plaintext
Boolean PreserveCollinear;
```

默认情况下，当输入多边形（主体或剪辑）中三个或更多顶点共线时，Clipper 对象会在剪辑之前删除“内部”顶点。启用 PreserveCollinear 属性后，可阻止此默认行为，以允许这些内部顶点出现在解决方案中。

**用法：**
```js
const cpr = new ClipperLib.Clipper();
cpr.PreserveCollinear = true;
```
**另请参阅：** [ClipperLib.Clipper()](#clipperlibclipper)

#### ClipperLib.Clipper.ReverseSolution

```plaintext
Boolean ReverseSolution;
```
当此属性设置为 true 时，[Execute()](#clipperlibclipperexecute)方法的解决方案参数中返回的多边形将具有与其正常方向相反的方向。

**用法：**
```js
const cpr = new ClipperLib.Clipper();
cpr.ReverseSolution = true;
```
**另请参阅：** [Execute](#clipperlibclipperexecute), [Orientation](#clipperlibclipperorientation)

#### ClipperLib.Clipper.StrictlySimple

```
Boolean StrictlySimple;
```

术语：
- 简单多边形是不自相交的多边形。
- 弱简单多边形是包含“接触”顶点或“接触”边的简单多边形。
- 严格简单多边形是不包含“接触”顶点或“接触”边的简单多边形。

如果顶点共享相同的坐标（且不相邻），则顶点“接触”。如果一条边的其中一个端点接触另一条边（不包括其相邻边），或者它们共线且重叠（包括相邻边），则该边与另一边接触。

裁剪操作（参见[Clipper.Execute()](#clipperlibclipperexecute)）返回的多边形应始终为简单多边形。启用 StrictlySimply 属性时，返回的多边形将严格简单，否则它们可能较弱简单。确保多边形严格简单需要耗费大量计算资源，因此默认情况下禁用此属性。

![simplify3](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/simplify3.png)
![simplify2](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/simplify2.png)

在上图中，两个示例显示了弱简单多边形被分解为两个严格简单多边形。（带箭头的轮廓旨在帮助可视化顶点顺序。）

另请参阅维基百科上有关[简单多边形](http://en.wikipedia.org/wiki/Simple_polygon)的文章。

**用法：**
```js
const cpr = new ClipperLib.Clipper();
cpr.StrictlySimple = true;
```
**另请参阅：** [Execute](#clipperlibclipperexecute), [SimplifyPolygons](#clipperlibclippersimplifypolygons)

#### ClipperLib.Clipper.ZFillFunction

> void [ZFillCallback](#clipperlibclipperzfillcallback) ZFillFunction;

仅当定义了预处理器指令[use_xyz](#preprocessor-defines)时，才会显示此属性。（如果已定义，则会将 Z 成员添加到[IntPoint](#clipperlibintpoint)结构中。）分配自定义回调函数时，将在裁剪操作期间调用该函数，以便可以为交叉顶点分配自定义 Z 值。

裁剪操作解决方案中的顶点通常与输入（主体或裁剪）顶点相对应，但在边交叉点处创建的顶点则不然。虽然这些“交叉点”顶点的 X 和 Y 坐标显然由交叉点定义，但没有明显的方式来分配它们的 Z 值。这实际上取决于库用户的需求。虽然有 4 个顶点直接影响交叉点顶点（即 2 个相交边两端的顶点），但为了保持简单，只有限制一条边的顶点才会传递给回调函数。

分发 zip 包中 Curves 目录中的 CurvesDemo 应用程序展示了如何使用 Z 成员与回调函数来展平曲线路径（由控制点定义），以及在剪切后在剪切解决方案中“去展平”或重建曲线路径。

**用法：**

```js
const cpr = new ClipperLib.Clipper();
cpr.ZFillFunction = function (vert1, vert2, intersectPt) { /* function body */ };
// or
const ClipCallback = function (vert1, vert2, intersectPt) { /* function body */ };
cpr.ZFillFunction = ClipCallback;
```

**另请参阅：** [Defines](#preprocessor-defines), [IntPoint](#clipperlibintpoint), [ZFillCallback](#clipperlibclipperzfillcallback)

---

### 类型

#### ClipperLib.ClipType()

```plaintext
Number ClipType {ctIntersection: 0, ctUnion: 1, ctDifference: 2, ctXor: 3};
```

布尔运算有四种：AND、OR、NOT 和 XOR。

鉴于主题和剪辑多边形画笔“填充”由它们的顶点和各自的[填充规则](#clipperlibpolyfilltype)定义，可以将四个布尔运算应用于多边形以定义新的填充区域：

- AND（交集）- 创建主题和剪辑多边形均被填充的区域
- OR（联合）- 创建填充主题或剪辑多边形（或两者）的区域
- NOT（差异）- 创建填充了主题多边形的区域，但填充了剪辑*多边形的区域除外
- XOR（异或）- 创建填充了主题或剪辑多边形的区域，但不填充两者的区域

![cliptype](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/cliptype.png)
![intersection](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/intersection.png)
![union](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/union.png)
![difference](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/difference.png)
![xor](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/xor.png)


所有多边形裁剪都是通过[Clipper](#clipperlibclipper)对象执行的，其[Execute](#clipperlibclipperexecute)方法中传递的 ClipType 参数指示特定的布尔运算。

对于开放路径（折线），裁剪规则通常与封闭路径（多边形）的裁剪规则相匹配。

然而，当同时存在折线和多边形主题时，适用以下裁剪规则：

- 联合操作 - 折线将被任何重叠的多边形剪裁，以便非重叠部分将与联合的多边形一起返回到解决方案中
- 交集，差集和异或运算 - 折线将仅被“剪辑”多边形剪辑，并且折线和主题多边形之间不会发生相互作用。

混合折线和多边形主题时的剪辑行为示例：

![line_clipping2](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/line_clipping2.png)

**用法：**
```js
const cliptype = ClipperLib.ClipType.ctIntersection;
const cliptype = ClipperLib.ClipType.ctUnion;
const cliptype = ClipperLib.ClipType.ctDifference;
const cliptype = ClipperLib.ClipType.ctXor;
```
**另请参阅：** [Clipper](#clipperlibclipper), [Clipper.Execute](#clipperlibclipperexecute), [PolyFillType](#clipperlibpolyfilltype)

#### ClipperLib.EndType

```plaintext
ClipperLib.EndType = {etOpenSquare: 0, etOpenRound: 1, etOpenButt: 2, etClosedLine: 3,  etClosedPolygon: 4 };
```
EndType 枚举器有 5 个值：

- **etOpenSquare：** 末端呈方形，并延伸出增量单元
- **etOpenRound：** 末端四舍五入，并扩展增量单位
- **etOpenButt：** 末端呈方形，没有延伸。
- **etClosedLine：** 使用 JoinType 值连接端点，并将路径填充为折线
- **etClosedPolygon：** 使用 JoinType 值连接端点，路径填充为多边形 etOpenSingle：在单个方向上偏移开放路径。计划在未来更新。

注意：对于 etClosedPolygon 和 etClosedLine 类型，无论路径中的第一个和最后一个顶点是否匹配，路径闭合都将相同。

![endtypes1](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/endtypes1.png)
![endtypes2](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/endtypes2.png)

**用法：**
```js
const endtype = ClipperLib.EndType.etOpenSquare;
const endtype = ClipperLib.EndType.etOpenRound;
const endtype = ClipperLib.EndType.etOpenButt;
const endtype = ClipperLib.EndType.etClosedLine;
const endtype = ClipperLib.EndType.etClosedPolygon;
```
**另请参阅：** [ClipperOffset.AddPath](#clipperlibclipperoffsetaddpath), [ClipperOffset.AddPaths](#clipperlibclipperoffsetaddpaths)

#### ~~ClipperLib.EndType_~~

```js
if (use_deprecated) ClipperLib.EndType_ = {etSquare: 0, etRound: 1, etButt: 2, etClosed: 3};
```

**已弃用。** 请参阅[ClipperOffset](#clipperoffset)和[EndType](#clipperlibendtype)。

EndType_ 枚举器有 4 个值：

- etSquare：两端以精确的 delta 单位对齐
- etRound：末端以精确的增量单位进行四舍五入
- etButt：末端突然变方
- etClosed：使用 JoinType 值连接端点并将路径填充为多边形。

![endtypes](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/endtypes.png)

**用法：**
```js
const endtype = ClipperLib.EndType_.etSquare;
const endtype = ClipperLib.EndType_.etRound;
const endtype = ClipperLib.EndType_.etButt;
const endtype = ClipperLib.EndType_.etClosed;
```

#### ClipperLib.ExPolygon()

```plaintext
ExPolygon ExPolygon();
```

创建 ExPolygon 对象的实例。

原始 Clipper 中不再有此功能，但在 JS 版本中我们提供它以确保向后兼容性。

**用法：**
```js
cont expolygon = new ClipperLib.ExPolygon();
```

**另请参阅：** [PolyTreeToExPolygons](#clipperlibjspolytreetoexpolygons), [ExPolygonsToPaths](#clipperlibjsexpolygonstopaths)

#### ClipperLib.ExPolygons()

```plaintext
ExPolygons ExPolygons();
```
创建 ExPolygons 对象即数组的实例。

原始 Clipper 中不再有此功能，但在 JS 版本中我们提供它以确保向后兼容性。

**用法：**
```js
const expolygons = new ClipperLib.ExPolygons();
```
**另请参阅：** [PolyTreeToExPolygons](#clipperlibjspolytreetoexpolygons), [ExPolygonsToPaths](#clipperlibjsexpolygonstopaths)

#### InitOptions

```plaintext
Number ioReverseSolution = 1;
Number ioStrictlySimple = 2;
Number ioPreserveCollinear = 4;
```
**用法：**
```js
const cpr = new ClipperLib.Clipper(ClipperLib.Clipper.ioStrictlySimple | ClipperLib.Clipper.ioPreserveCollinear);
// or
const cpr = new ClipperLib.Clipper(2 | 4);
```

**另请参阅：** [Constructor](#clipperlibclipper), [Clipper.PreserveCollinear](#clipperlibclipperpreservecollinear), [Clipper.ReverseSolution](#clipperlibclipperreversesolution), [Clipper.StrictlySimple](#clipperlibclipperstrictlysimple)

#### ClipperLib.IntPoint()

```plaintext
IntPoint IntPoint(Number X, Number Y)
IntPoint IntPoint()
IntPoint IntPoint(IntPoint point)
```

IntPoint 结构用于表示 Clipper 库中的所有顶点。我们特意选择了“整数”存储类型以保持[数值稳健性](http://www.mpi-inf.mpg.de/~kettner/pub/nonrobust_cgta_06.pdf)。（该库的早期版本使用浮点坐标，但很明显浮点不精确总是会导致偶尔的错误。）

[Path](#clipperlibpath)结构中包含一系列 IntPoints，用于表示单个轮廓。

从版本 6 开始，IntPoint 现在具有可选的第三个成员“Z”。这可以通过公开（即取消注释）预处理器定义[use_xyz](#preprocessor-defines)来启用。当使用 Z 成员时，其值将被复制到裁剪操作解决方案中的相应顶点。但是，在没有相应 Z 值的交点处，除非用户提供的[回调函数](#clipperlibclipperzfillfunction)提供新值，否则该值将被分配为零。

希望剪切或偏移包含浮点坐标的多边形的用户需要在将这些值转换为 IntPoints 时使用适当的缩放。

另请参阅有关[舍入](#rounding)的注释。

**用法：**
```js
const point1 = new ClipperLib.IntPoint(10,20); // Creates object {"X":10,"Y":20}
const point2 = new ClipperLib.IntPoint(); // Creates object {"X":0,"Y":0}
const point3 = new ClipperLib.IntPoint(point); // Creates clone of point
```

**另请参阅：** [Rounding](#rounding), [Clipper.ZFillFunction](#clipperlibclipperzfillfunction), [Defines](#preprocessor-defines), [Path](#clipperlibpath), [Paths](#clipperlibpaths)

#### ClipperLib.IntRect()

```plaintext
IntRect IntRect(Number left, Number top, Number right, Number bottom);
IntRect IntRect(IntRect intRect);
IntRect IntRect();
```

Clipper 的[GetBounds](#clipperlibclippergetbounds)方法返回的结构。

**另请参阅：** [GetBounds](#clipperlibclippergetbounds)

#### ClipperLib.JoinType

```plaintext
ClipperLib.JoinType = {jtSquare: 0, jtRound: 1, jtMiter: 2};
```

通过[AddPaths](#clipperlibclipperoffsetaddpaths)方法向[ClipperOffset](#clipperoffset)对象添加路径时，joinType 参数可以是以下三种类型之一 - jtMiter、jtSquare 或 jtRound。

![jointypes](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/86de/attachment/jointypes.png)

- **jtMiter：** 斜接连接必须有一个限制，因为以非常锐角连接的偏移边缘会产生过长且窄的“尖刺”。为了包含这些潜在的尖刺，ClipperOffset 对象的[MiterLimit](#clipperlibclipperoffsetmiterlimit)属性指定了顶点偏移的最大距离（以 delta 的倍数为单位）。对于任何给定的边缘连接，当斜接偏移超过该最大距离时，将应用“方形”连接。
- **jtRound：** 虽然扁平路径永远无法完美地追踪圆弧，但它们可以通过一系列圆弧弦来近似（参见 ClipperObject 的[ArcTolerance](#clipperlibclipperoffsetarctolerance)属性）。
- **jtSquare：** 以 1 × delta 在所有凸边连接处均匀应用平方。

**用法：**

```js
const jointype = ClipperLib.JoinType.jtSquare;
const jointype = ClipperLib.JoinType.jtRound;
const jointype = ClipperLib.JoinType.jtMiter;
```

**另请参阅：** [ClipperOffset](#clipperoffset), [AddPaths](#clipperlibclipperoffsetaddpaths), [ArcTolerance](#clipperlibclipperoffsetarctolerance), [MiterLimit](#clipperlibclipperoffsetmiterlimit)

#### ClipperLib.Path()

```plaintext
Path Path()
```

此结构包含定义单个轮廓的一系列[IntPoint](#clipperlibintpoint)顶点（另请参阅[术语](#terminology)）。路径可能是开放的，表示由 2 个或更多顶点界定的线段，也可能是封闭的，表示多边形。

多条路径可以分组为一个[路径](#clipperlibpaths)结构。

**用法：**
```js
const path = new ClipperLib.Path(); // Creates an empty array []
// or
const path = new Array();
// or
const path = [];
```

**另请参阅：** [overview](#overview), [Example](#example), [ClipperBase.AddPath](#clipperbaseaddpath), [PolyTree](#clipperlibpolytree), [Orientation](#clipperlibclipperorientation), [IntPoint](#clipperlibintpoint), [Paths](#clipperlibpaths)

#### ClipperLib.Paths()

```plaintext
Paths Paths()
```

此结构是 Clipper 库的基础。它是一个或多个[Path](#clipperlibpath)结构的数组。（Path 结构包含构成单个轮廓的有序顶点数组。）

路径可能是开放的（线），也可能是封闭的（多边形）。

**用法：**
```js
const paths = new ClipperLib.Paths(); // Creates an empty array []
// or
const paths = new Array();
// or
const paths = [];
```
**另请参阅：** [Clipper.Execute](#clipperlibclipperexecute), [ClipperBase.AddPath](#clipperbaseaddpath), [ClipperBase.AddPaths](#clipperbaseaddpaths), [OffsetPaths](#clipperlibclipperoffsetpaths), [IntPoint](#clipperlibintpoint), [Path](#clipperlibpath)

#### ClipperLib.PolyFillType

```plaintext
ClipperLib.PolyFillType = {pftEvenOdd: 0, pftNonZero: 1, pftPositive: 2, pftNegative: 3};
```

填充表示区域位于多边形内部（即在图形显示中用画笔颜色或图案“填充”），非填充表示区域位于多边形外部。Clipper 库支持 4 种填充规则：奇偶、非零、正和负。

最简单的填充规则是奇偶填充。给定一组多边形并从外部的点开始，每当轮廓线交叉时，如果已停止则开始填充，如果已开始则停止填充。例如，给定一个矩形多边形，当其第一个（例如左）边被交叉时，填充开始并且我们位于多边形内。当下一个（例如右）边被交叉时，填充再次停止。

除奇偶填充外，所有其他填充规则都依赖于边方向和绕数来确定填充。边方向由构造多边形时声明顶点的顺序决定。边方向用于确定多边形区域和子区域的绕数。

❎ 任何给定多边形子区域的绕数可以通过以下公式得出：

- 从零开始绕数
- 从所有多边形外部的点 (P1) 画一条假想线到给定子区域内的点 (P2)
- 遍历从 P1 到 P2 的线时，对于从右到左与线相交的每个多边形边，增加绕组数，对于从左到右与线相交的每个多边形边，减少绕组数。
- 一旦到达给定的子区域，您就会得到其绕线编号。

![winding_number](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/winding_number.png)

- **Even-Odd (Alternate)**: 奇数子区域被填充，偶数子区域不被填充。
- **Non-Zero (Winding)**: 所有非零子区域都被填充。
- **Positive**: 所有缠绕数 > 0 的子区域都被填充。
- **Negative**: 所有缠绕数 < 0 的子区域都被填充。

![evenodd](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/evenodd.png)
![nonzero](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/nonzero.png)
![positive](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/positive.png)
![negative](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/negative.png)

By far the most widely used fill rules are Even-Odd (aka Alternate) and Non-Zero (aka Winding). Most graphics rendering libraries () and vector graphics storage formats ([SVG](http://www.w3.org/TR/SVG/painting.html#FillRuleProperty), Postscript,  etc) support both these rules. However some libraries (eg Java's [Graphics2D]()) only support one fill rule. *Android Graphics* and *OpenGL* are the only libraries (that I'm aware of) that support multiple filling rules.


目前最广泛使用的填充规则是奇偶（又名交替）和非零（又名缠绕）。大多数图形渲染库（[AGG](http://www.antigrain.com/__code/include/agg_basics.h.html#filling_rule_e), [Android Graphics](http://developer.android.com/reference/android/graphics/Path.FillType.html), [Cairo](http://cairographics.org/manual/cairo-cairo-t.html#cairo-fill-rule-t), [GDI+](http://msdn.microsoft.com/en-us/library/windows/desktop/ms534120(v=vs.85).aspx), [OpenGL](http://www.glprogramming.com/red/chapter11.html), [Quartz 2D](http://developer.apple.com/library/ios/#documentation/GraphicsImaging/Conceptual/drawingwithquartz2d/dq_paths/dq_paths.html#//apple_ref/doc/uid/TP30001066-CH211-TPXREF101)等）和矢量图形存储格式（[SVG](http://www.w3.org/TR/SVG/painting.html#FillRuleProperty)、Postscript、[Photoshop](http://www.adobe.com/devnet-apps/photoshop/fileformatashtml/PhotoshopFileFormats.htm#50577409_17587)等）都支持这两种规则。但是有些库（例如 Java 的[Graphics2D](http://docs.oracle.com/javase/6/docs/api/java/awt/Graphics.html#fillPolygon(int%5B%5D,%20int%5B%5D,%20int))）仅支持一种填充规则。*Android Graphics*和*OpenGL*是（据我所知）唯一支持多种填充规则的库。

值得注意的是，*边缘方向(edge direction)* 对绕数的奇数或偶数没有影响。（这就是为什么在使用*Even-Odd*规则时会忽略[方向](#clipperlibclipperorientation)的原因。）

Y 轴的方向确实会影响多边形方向和 *边缘方向(edge direction)* 。但是，改变 Y 轴方向只会改变绕组数的符号，而不会改变其大小，并且对 *奇偶(Even-Odd)* 或 *非零(Non-Zero)* 填充没有影响。

**用法：**
```js
const polyfilltype = ClipperLib.PolyFillType.pftEvenOdd;
const polyfilltype = ClipperLib.PolyFillType.pftNonZero;
const polyfilltype = ClipperLib.PolyFillType.pftPositive;
const polyfilltype = ClipperLib.PolyFillType.pftNegative;
```

**另请参阅：** [Clipper.Execute](#clipperlibclipperexecute), [Orientation](#clipperlibclipperorientation)

#### ClipperLib.PolyType

```plaintext
Number ClipperLib.PolyType = {ptSubject: 0, ptClip: 1};
```

布尔（裁剪）操作主要应用于两组多边形，在本库中表示为主体多边形和裁剪多边形。每当将多边形添加到 Clipper 对象时，必须将它们分配给主体多边形或裁剪多边形。

UNION 运算可以在一组或两组多边形上执行，但所有其他布尔运算都需要两组多边形才能得出有意义的解。

**用法：**
```js
const polytype = ClipperLib.PolyType.ptSubject;
const polytype = ClipperLib.PolyType.ptClip;
```

**另请参阅：** [ClipperBase.AddPath](#clipperbaseaddpath), [ClipperBase.AddPaths](#clipperbaseaddpaths), [ClipType](#clipperlibcliptype)

#### ClipperLib.Clipper.ZFillCallback()

> void ZFillCallback([IntPoint](#clipperlibintpoint) Z1, [IntPoint](#clipperlibintpoint) Z2, [IntPoint](#clipperlibintpoint) pt);
>
**另请参阅：** [Clipper.ZFillFunction](#clipperlibclipperzfillfunction)

---

### PolyTree

PolyTree 旨在用作只读数据结构，仅用于接收多边形裁剪操作的解决方案。它是 [Paths](#clipperlibpaths) 结构的替代数据结构，也可以接收裁剪解决方案。与 Paths 结构相比，它的主要优势在于它正确地表示了返回多边形的父子关系，并且还区分了开放路径和封闭路径。但是，由于 PolyTree 比 Paths 结构更复杂，并且处理起来计算成本更高（Execute 方法大约慢 5-10%），因此它只应在需要父子多边形关系或“裁剪”开放路径时使用。

可以将空的 PolyTree 对象作为解决方案参数传递给[Clipper](#clipper)对象的[Execute](#clipperlibclipperexecute)方法。一旦裁剪操作完成，此方法将返回填充有代表解决方案的数据的 PolyTree 结构。

PolyTree 对象是任意数量的[PolyNode](#polynode)子节点的容器，其中每个包含的 PolyNode 代表单个多边形轮廓（[外部](#terminology)或[孔](#terminology)多边形）。PolyTree 本身是一个专门的 PolyNode，其直接子节点代表解决方案的顶层外部多边形。（其自身的[Contour](#clipperlibpolynodecontour)属性始终为空。）所包含的顶层 PolyNode 可能包含其自己的 PolyNode 子节点，这些子节点代表孔多边形，这些孔多边形也可能包含代表嵌套外部多边形的子节点等。外部的子节点始终是孔，孔的子节点始终是外部。

PolyTrees 也可以包含开放路径。开放路径始终由顶层 PolyNodes 表示。提供了两个函数来快速从 polytree 中分离出开放路径和封闭路径 - [ClosedPathsFromPolyTree](#clipperlibclipperclosedpathsfrompolytree)和[OpenPathsFromPolyTree](#clipperlibclipperopenpathsfrompolytree)。

![polytree](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/polytree.png)

```plaintext
<b>polytree:</b>
Contour = <b>()</b>
ChildCount = <b>1</b>
Childs[0]:
  Contour = ((10,10),(100,10),(100,100),(10,100))
  IsHole = <b>False</b>
  ChildCount = <b>1</b>
  Childs[0]:
    Contour = ((20,20),(20,90),(90,90),(90,20))
    IsHole = <b>True</b>
    ChildCount = <b>2</b>
    Childs[0]:
      Contour = ((30,30),(50,30),(50,50),(30,50))
      IsHole = <b>False</b>
      ChildCount = <b>0</b>
    Childs[1]:
      Contour = ((60,60),(80,60),(80,80),(60,80))
      IsHole = <b>False</b>
      ChildCount = <b>0</b>
```

**另请参阅：** [Overview](#overview), [Clipper](#clipper), [Clipper.Execute](#clipperlibclipperexecute), [PolyNode](#clipperlibpolynode), [ClosedPathsFromPolyTree](#clipperlibclipperclosedpathsfrompolytree), [OpenPathsFromPolyTree](#clipperlibclipperopenpathsfrompolytree), [Paths](#clipperlibpaths)


#### ClipperLib.PolyTree()

> [PolyTree](#clipperlibpolytree) PolyTree()

返回新的 PolyTree 对象。

**用法：**
```js
const polytree = new ClipperLib.PolyTree(); // creates PolyTree object
// cpr.Execute ...
```

**另请参阅：** [Clipper.Execute](#clipperlibclipperexecute), [PolyNode](#clipperlibpolynode), [ClosedPathsFromPolyTree](#clipperlibclipperclosedpathsfrompolytree), [OpenPathsFromPolyTree](#clipperlibclipperopenpathsfrompolytree), [Paths](#clipperlibpaths)

#### ClipperLib.PolyTree.Clear()

```plaintext
void polytree.Clear()
```

该方法清除 PolyTree 对象所包含的所有 PolyNode 子对象。

无需显式调用 Clear。接受 PolyTree 参数的[Clipper.Execute](#clipperlibclipperexecute)方法将在用新的 PolyNodes 传播 PolyTree 对象之前自动清除该对象。同样，PolyTree 的析构函数也将自动清除任何包含的 PolyNodes。

**另请参阅：** [Clipper.Execute](#clipperlibclipperexecute)

#### ClipperLib.PolyTree.GetFirst()

> [PolyNode](#clipperlibpolynode) GetFirst()

如果有的话，此方法返回第一个外多边形轮廓，否则返回空指针。

此函数几乎等同于调用 Childs[0]，不同之处在于，当 PolyTree 对象为空（没有子对象）时，调用 Childs[0] 会引发超出范围的异常。

**用法：**
```js
const polynode = polytree.GetFirst();
```
**另请参阅：** [PolyNode.GetNext](#clipperlibpolynodegetnext), [PolyNode.ChildCount](#clipperlibpolynodechildcount), [PolyNode.Childs](#clipperlibpolynodechilds)

#### ClipperLib.PolyTree.Total()

```plaintext
Number Total() // read only
```
返回 PolyTree 中包含的 PolyNodes（多边形）总数。此值不要与[ChildCount](#clipperlibpolynodechildcount)混淆，后者仅返回PolyTree 所包含的直接子节点（[Childs](#clipperlibpolynodechilds)）的数量。

```js
const total = polytree.Total();
```

**另请参阅：** [PolyNode.ChildCount](#clipperlibpolynodechildcount), [PolyNode.Childs](#clipperlibpolynodechilds)

### PolyNode

PolyNodes 封装在[PolyTree](#polytree)容器内，并共同提供表示 Clipper 的[Execute](#clipperlibclipperexecute)方法返回的多边形轮廓的父子关系的数据结构。

一个 PolyNode 对象表示一个多边形。其[IsHole](#clipperlibpolynodeishole)属性指示它是[外多边形](#terminology)还是[洞多边形](#terminology)。PolyNodes 可以拥有任意数量的 PolyNode 子代 ([Childs](#clipperlibpolynodechilds))，其中外多边形的子代是洞多边形，而洞多边形的子代是（嵌套的）外多边形。

**另请参阅：**
[Overview](#overview), [Clipper.Execute](#clipperlibclipperexecute), [PolyTree](#clipperlibpolytree)

#### ClipperLib.PolyNode()

> [PolyNode](#clipperlibpolynode) PolyNode() // read only

创建新的 PolyNode 对象。

**用法：**
```js
const polynode = new ClipperLib.PolyNode();
```

**另请参阅：** [Clipper.Execute](#clipperlibclipperexecute), [PolyTree](#clipperlibpolytree)

#### ClipperLib.PolyNode.ChildCount()

```plaintext
Number ChildCount() // read only
```

返回PolyNode 对象直接拥有的PolyNode [Childs](#clipperlibpolynodechilds)的数量。

**用法：**
```js
const count = polynode.ChildCount();
```
**另请参阅：** [Childs](#clipperlibpolynodechilds)

#### ClipperLib.PolyNode.Childs()

> Array [PolyNode](#clipperlibpolynode) Childs() // read only

PolyNode 数组。外部 PolyNode 子节点包含孔 PolyNode，而孔 PolyNode 子节点包含嵌套的外部 PolyNode。

**用法：**

```js
const childs = polynode.Childs();
```
**另请参阅：** [ChildCount](#clipperlibpolynodechildcount)

#### ClipperLib.PolyNode.Contour()

> [Path](#clipperlibpath) Contour() // read only

返回包含任意数量顶点的路径列表。

**用法：**
```js
const contour = polynode.Contour();
```

#### ClipperLib.PolyNode.GetNext()

> [PolyNode](#clipperlibpolynode) GetNext()

如果有的话，返回的 Polynode 将是第一个子节点，否则为下一个兄弟节点，否则为父节点的下一个兄弟节点，等等。

可以通过循环调用 GetFirst() 然后调用 GetNext() 来轻松遍历 PolyTree 直到返回的对象为空指针……

**用法：**
```js
const polytree = new ClipperLib.PolyTree();
//call to Clipper.Execute method here which fills 'polytree'

const polynode = polytree.GetFirst();
while (polynode) {
  //do stuff with polynode here
  polynode = polynode.GetNext();
}
```
**另请参阅：** [PolyTree.GetFirst](#clipperlibpolytreegetfirst)

#### ClipperLib.PolyNode.IsHole()

```plaintext
Boolean IsHole() // read only
```

当 PolyNode 的多边形（[轮廓](#clipperlibpolynodecontour)）是一个[洞](#terminology)时返回 true 。

外部多边形的子节点始终是洞，而洞的子节点始终是（嵌套的）外部多边形。

[PolyTree](#clipperlibpolytree)对象的 IsHole 属性未定义，但其子对象始终是顶层外部多边形。

**用法：**
```js
const ishole = polynode.IsHole();
```
**另请参阅：** [Contour](#clipperlibpolynodecontour), [PolyTree](#clipperlibpolytree)

#### ClipperLib.PolyNode.Parent()

> [PolyNode](#clipperlibpolynode) Parent(); read only

返回父级 PolyNode。

PolyTree 对象（也是一个 PolyNode）没有父对象并且将返回空指针。

**用法：**
```js
const parent = polynode.Parent();
```

#### ClipperLib.PolyNode.IsOpen

```plaintext
Boolean IsOpen // read only property
```

当 PolyNode 的[轮廓](#clipperlibpolynodecontour)由开放轮廓（路径）上的裁剪操作产生时，返回 true。只有顶级 PolyNode 可以包含开放轮廓。

**用法：**
```js
const isopen = polynode.IsOpen;
```
**另请参阅：** [Contour](#clipperlibpolynodecontour)

---

### ClipperOffset

ClipperOffset 类封装了偏移（膨胀/收缩）开放和封闭路径的过程。

此类取代了现已弃用的 OffsetPaths 函数，该函数灵活性较差。可以使用不同的偏移量（增量）多次调用 Execute 方法，而无需重新分配路径。现在可以在单个操作中对开放和封闭路径的混合执行偏移。此外，OffsetPaths 的 Limit 参数的双重功能不仅让一些用户感到困惑，而且还阻止在 EndType 为 etRound 且 JoinType 为 jtMiter 时分配自定义 RoundPrecision。

偏移封闭路径（多边形）时，重要的是：

- 它们的方向是一致的，因此外部多边形具有相同的方向，而孔具有相反的方向
- 它们不会自相交。

#### ClipperLib.ClipperOffset()

```plaintext
ClipperOffset ClipperOffset(Number miterLimit = 2.0, Number roundPrecision = 0.25);
```
ClipperOffset 构造函数有 2 个可选参数：[MiterLimit](#clipperlibclipperoffsetmiterlimit)和[ArcTolerance](#clipperlibclipperoffsetarctolerance)。这两个参数对应于同名的属性。MiterLimit 仅在 JoinType 为 jtMiter 时相关，而 ArcTolerance 仅在 JoinType 为 jtRound 或 EndType 为 etOpenRound 时相关。

**用法：**
```js
const co = new ClipperLib.ClipperOffset(2.0, 0.25);
```

**另请参阅：** [ArcTolerance](#clipperlibclipperoffsetarctolerance), [MiterLimit](#clipperlibclipperoffsetmiterlimit)

#### ClipperLib.ClipperOffset.AddPath()

> void AddPath([Path](#clipperlibpath) path, [JoinType](#clipperlibjointype) jointype, [EndType](#clipperlibendtype) endtype);

将路径添加到 ClipperOffset 对象以准备偏移。此方法可以多次调用。

**用法：**
```js
const path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
const co = new ClipperLib.ClipperOffset(2, 0.25);
co.AddPath(path, ClipperLib.JoinType.jtMiter, ClipperLib.EndType.etClosedPolygon);
```

**另请参阅：** [JoinType](#clipperlibjointype), [EndType](#clipperlibendtype)

#### ClipperLib.ClipperOffset.AddPaths()

> void AddPaths([Paths](#clipperlibpaths) paths, [JoinType](#clipperlibjointype) jointype, [EndType](#clipperlibendtype) endtype);

将路径添加到 ClipperOffset 对象以准备偏移。此方法可以多次调用。

**用法：**
```js
const paths = [
  [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
  [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]
];
const co = new ClipperLib.ClipperOffset(2, 0.25);
co.AddPaths(paths, ClipperLib.JoinType.jtMiter, ClipperLib.EndType.etClosedPolygon);
```
**另请参阅：** [JoinType](#clipperlibjointype), [EndType](#clipperlibendtype)

#### ClipperLib.ClipperOffset.Clear()

```plaintext
void Clear();
```

此方法清除 ClipperOffset 对象的所有路径，以便分配新的路径。

**用法：**
```js
const path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
const co = new ClipperLib.ClipperOffset();
co.AddPath(path, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etClosedPolygon);
co.Clear();
```

#### ClipperLib.ClipperOffset.Execute()

> void Execute([Paths](#clipperlibpaths) solution, Number delta);

> void Execute([PolyTree](#clipperlibpolytree) polytree, Number delta);

此方法采用两个参数。第一个参数是接收偏移操作结果的结构（PolyTree 或 Paths）。第二个参数是提供的路径偏移的量 - 负增量值用于缩小多边形，正增量值用于扩大多边形。

该方法可以被调用多次，以不同的量偏移相同的路径（即使用不同的增量）。

**关于缩放的说明：**

因为 ClipperOffset 使用整数坐标，所以您必须缩放坐标以保持精度并使弧线平滑 - 在整数输入的情况下也是如此。

Javascript Clipper 为此提供了四个函数：[ScaleUpPath](#clipperlibjsscaleuppath)、[ScaleUpPaths](#clipperlibjsscaleuppaths)、[ScaleDownPath](#clipperlibjsscaledownpath)和[ScaleDownPaths](#clipperlibjsscaledownpaths)。

如果 JoinType 是 jtRound 或 EndType 是 etRound，则强烈建议进行缩放。

**用法：**
```js
const subj = new ClipperLib.Paths();
const solution = new ClipperLib.Paths();

subj[0] = [{"X":348,"Y":257},{"X":364,"Y":148},{"X":362,"Y":148},{"X":326,"Y":241},{"X":295,"Y":219},{"X":258,"Y":88},{"X":440,"Y":129},{"X":370,"Y":196},{"X":372,"Y":275}];

const scale = 100;
ClipperLib.JS.ScaleUpPaths(subj, scale);

const co = new ClipperLib.ClipperOffset(2, 0.25);
co.AddPaths(subj, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etClosedPolygon);
co.Execute(solution, -7.0);
ClipperLib.JS.ScaleDownPaths(subj, scale);
//draw solution with your own drawing function...
DrawPolygons(solution, 0x4000FF00, 0xFF009900);
```

**另请参阅：** [ScaleUpPath](#clipperlibjsscaleuppath), [ScaleUpPaths](#clipperlibjsscaleuppaths), [ScaleDownPath](#clipperlibjsscaledownpath), [ScaleDownPaths](#clipperlibjsscaledownpaths).


#### ClipperLib.ClipperOffset.ArcTolerance

```plaintext
Number ArcTolerance
```

首先，仅当 JoinType = jtRound 和/或 EndType = etRound 时，此字段/属性才相关。

由于扁平路径永远无法完美地表示弧线，因此此字段/属性指定在偏移操作中近似弧线时可接受的最大不精确度（“公差”）。较小的值将在一定程度上增加“平滑度”，但会以牺牲性能和创建更多顶点来构造弧线为代价。

默认的 ArcTolerance 为 0.25 个单位。这意味着扁平路径偏离“真实”圆弧的最大距离不超过 0.25 个单位（舍入前）。

将公差降低到 0.25 以下**不会**提高平滑度，因为顶点坐标仍将四舍五入为整数值。实现亚整数精度的唯一方法是通过偏移前后的坐标缩放（见下面的示例）。

重要的是使 ArcTolerance 成为偏移增量（圆弧半径）的合理分数。相对于偏移增量，较大的公差将产生较差的圆弧近似值，但同样重要的是，非常小的公差将大大降低偏移性能，同时提供不必要的精度。当偏移已缩放坐标以保留浮点精度的多边形时，这很可能是一个问题。

**示例：** 想象一组多边形（以浮点坐标定义），它们将使用圆连接偏移 10 个单位，解决方案是保留至少 6 位小数的浮点精度。
为了保持这种浮点精度，并且考虑到 Clipper 和 ClipperOffset 都对整数坐标进行操作，多边形坐标将在偏移之前放大 108（并四舍五入为整数）。偏移量 delta 和 ArcTolerance 也需要按相同的因子缩放。如果 ArcTolerance 未缩放为默认的 0.25 个单位，则解决方案中的每个弧将包含 44 千个顶点的一部分，而最终弧的不精度将为 0.25 × 10-8 单位（即一旦缩放被逆转）。但是，如果 0.1 单位是最终未缩放解决方案中可以接受的不精度，则 ArcTolerance 应设置为 0.1 × scaling_factor（0.1 × 108）。现在，如果对 ArcTolerance 和 Delta Offset 均等地应用缩放，那么在这个例子中，定义每个弧的顶点（步数）的数量将是 23 的一部分。

> The formula for the number of steps in a full circular arc is ... Pi / acos(1 - arc_tolerance / abs(delta))

**用法：**
```js
const co = new ClipperLib.ClipperOffset();
co.ArcTolerance = 1.23;
```

#### ClipperLib.ClipperOffset.MiterLimit

```plaintext
Number MiterLimit
```

此属性设置在应用平方之前顶点可以偏离其原始位置的最大距离（以 delta 的倍数表示）。（平方通过在距原始顶点 1 × delta 距离处“切断”来截断斜接。）

**MiterLimit 的默认值为 2**（即 delta 的两倍）。这也是允许的最小 MiterLimit。如果斜接不受限制（即没有任何平方），那么非常锐角的偏移将产生不可接受的长“尖峰”。

使用较大的 MiterLimit (25) 会导致在窄角度处出现偏移“尖峰”的示例...

![miterlimit](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/miterlimit.png)

**用法：**
```js
const co = new ClipperLib.ClipperOffset();
co.MiterLimit = 4.1;
```

**另请参阅：** [JoinType](#clipperlibjointype)

### Rounding

通过使用整数类型表示多边形坐标，Clipper 库能够避免数值鲁棒性问题，因为该问题可能会对几何计算造成严重破坏。[原始文档](http://www.angusj.com/delphi/clipper/documentation/Docs/Overview/Rounding.htm)中讨论了与整数舍入相关的问题及其可能的解决方案。

### JS

JS 是一个特殊的对象，以确保向后兼容性并使其更容易运行频繁任务。原始 Clipper 中不提供此功能。


#### ClipperLib.JS.AreaOfPolygon()

> Number AreaOfPolygon([Path](#clipperlibpath) poly, Number scale = 1);

返回封闭路径的面积。如果路径已经按比例放大，则可以设置比例值以强制函数返回缩小的面积。

**用法：**
```js
const path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
const area = ClipperLib.JS.AreaOfPolygon (path, 1);
// area is 10000
```

#### ClipperLib.JS.AreaOfPolygons()

> Number AreaOfPolygons [Paths](#clipperlibpaths) polys, Number scale = 1);

返回封闭路径的面积。如果已经按比例放大，您可以设置比例值以强制函数返回缩小的面积。

**用法：**

```js
const paths = [
  [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
  [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]
];
const area = ClipperLib.JS.AreaOfPolygons (paths, 1);
// area is now 3600
```

#### ClipperLib.JS.BoundsOfPath()

> [IntRect](#clipperlibintrect) BoundsOfPath([Path](#clipperlibpath) path, Number scale = 1);

返回一个 IntRect 对象，该对象描述 Path 的边界框。如果路径已按比例放大，则可以设置比例值以强制函数返回缩小的边界。

**用法：**
```js
const path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
const bounds = ClipperLib.JS.BoundsOfPath (path, 1);
// bounds is {"left":10,"top":10,"right":110,"bottom":110}
```

#### ClipperLib.JS.BoundsOfPaths()

> [IntRect](#clipperlibintrect) BoundsOfPaths([Paths](#clipperlibpaths) paths, Number scale = 1);

返回一个 IntRect 对象，该对象描述路径的边界框。如果已按比例放大，您可以设置比例值以强制函数返回缩小的边界。

**用法：**
```js
const paths = [
  [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
  [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]
];
const bounds = ClipperLib.JS.BoundsOfPaths (paths, 1);
// bounds is {"left":10,"top":10,"right":110,"bottom":110}
```

#### ClipperLib.JS.Clone()

> [Path](#clipperlibpath) Clone([Path](#clipperlibpath) path);

> [Paths](#clipperlibpaths) Clone([Paths](#clipperlibpaths) paths);

对 Path 或 Paths 进行深层复制，以便 IntPoint 对象也被克隆而不仅仅是被引用。

**用法：**
```js
const cloned_path = ClipperLib.JS.Clone(path);
// or
const cloned_paths = ClipperLib.JS.Clone(paths);
```

#### ClipperLib.JS.Clean()

> [Path](#clipperlibpath) Clean([Path](#clipperlibpath) path);

> [Paths](#clipperlibpaths) Clean([Paths](#clipperlibpaths) paths);

连接彼此太近的顶点，如果不进行清理，会导致偏移变形。

此函数不同于 CleanPolygon 和 CleanPolygons，后两者还可清理共线顶点。

非常适合您需要防止失真而不执行任何其他操作的情况。

**用法：**
```js
const cleaned_path = ClipperLib.JS.Clean (path, delta);
// or
const cleaned_paths = ClipperLib.JS.Clean (paths, delta);
```

#### ClipperLib.JS.Lighten()

> [Path](#clipperlibpath) Lighten([Path](#clipperlibpath) path, Number tolerance);

> [Paths](#clipperlibpaths) Lighten([Paths](#clipperlibpaths) paths, Number tolerance);

删除对视觉外观影响不大的点。如果中间点位于起点和终点之间的线段的某个距离（公差）或以下，则删除中间点。

有助于加速计算和渲染。

**用法：**
```js
const scale = 100;
const lightened_path = ClipperLib.JS.Lighten(path, 0.1 * scale);
// or
const lightened_paths = ClipperLib.JS.Lighten(paths, 0.1 * scale);
```

#### ClipperLib.JS.PerimeterOfPath()

> Number PerimeterOfPath([Path](#clipperlibpath) path, Boolean closed, Number scale = 1);

返回路径的周长。如果路径是封闭的（即多边形），则将第一个顶点的克隆添加到路径的末尾，并在计算后删除，以确保考虑到整个（“多边形”）周长。

开放路径（即线）的测量仅考虑现有的顶点。

如果路径沿原路返回，则每个线段都会被计算，这意味着返回的周长比视觉周长要长。

如果事先通过某个缩放因子（例如 100）将坐标放大，并且向函数提供比例参数，则会返回缩小后的实际周长。

**用法：**

```js
const path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
const polygonal_perimeter = ClipperLib.JS.PerimeterOfPath(path, true, 1);
// polygonal_perimeter is 400

// But...
const line_perimeter = ClipperLib.JS.PerimeterOfPath(path, false, 1);
// line_perimeter is 300
```

#### ClipperLib.JS.PerimeterOfPaths()

> Number PerimeterOfPaths([Paths](#clipperlibpaths) paths, Boolean closed, Number scale = 1);

返回路径中包含的各个路径的周长总和。另请参阅[PerimeterOfPath](#clipperlibjsperimeterofpath)。

**用法：**
```js
const paths = [
  [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
  [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]
];
const polygonal_perimeter = ClipperLib.JS.PerimeterOfPaths (paths, true, 1);
// polygonal_perimeter is 720

const line_perimeter = ClipperLib.JS.PerimeterOfPaths (paths, false, 1);
// line_perimeter is 540
```

#### ClipperLib.JS.ScaleDownPath()

> void ScaleDownPath([Path](#clipperlibpath) path, Number scale = 1);

将路径的每个坐标除以比例值。

**用法：**

```js
const path = [{X:1000,Y:1000},{X:11000,Y:1000},{X:11000,Y:11000},{X:1000,Y:11000}];
ClipperLib.JS.ScaleDownPath (path, 100);
// path is [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
```

#### ClipperLib.JS.ScaleDownPaths()

> void ScaleDownPaths([Paths](#clipperlibpaths) paths, Number scale = 1);

将路径的每个坐标除以比例值。

**用法：**
```js
const paths = [
  [{X:1000,Y:1000},{X:11000,Y:1000},{X:11000,Y:11000},{X:1000,Y:11000}],
  [{X:2000,Y:2000},{X:2000,Y:10000},{X:10000,Y:10000},{X:10000,Y:2000}]
];
ClipperLib.JS.ScaleDownPaths (path, 100);
// path is [[{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
//          [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]];
```

#### ClipperLib.JS.ScaleUpPath()

> void ScaleUpPath([Path](#clipperlibpath) path, Number scale = 1);

将路径的每个坐标乘以缩放系数，然后使用 Math.round() 四舍五入为最接近的整数。

**用法：**

```js
const path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
ClipperLib.JS.ScaleUpPath (path, 100);
// path is now [{X:1000,Y:1000},{X:11000,Y:1000},{X:11000,Y:11000},{X:1000,Y:11000}];
```

#### ClipperLib.JS.ScaleUpPaths()

> void ScaleUpPaths([Paths](#clipperlibpaths) paths, Number scale = 1);

将路径的每个坐标乘以缩放系数，然后使用 Math.round() 四舍五入为最接近的整数。

**用法：**

```js
const paths = [
  [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
  [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]
];
ClipperLib.JS.ScaleUpPaths (path, 100);
// path is now [[{X:1000,Y:1000},{X:11000,Y:1000},{X:11000,Y:11000},{X:1000,Y:11000}],
//              [{X:2000,Y:2000},{X:2000,Y:10000},{X:10000,Y:10000},{X:10000,Y:2000}]];
```

#### ClipperLib.JS.PolyTreeToExPolygons()

> [ExPolygons](#clipperlibexpolygons) PolyTreeToExPolygons([PolyTree](#clipperlibpolytree) polytree)

将 PolyTree 转换为 ExPolygons。

**用法：**

```js
const expolygons = ClipperLib.JS.PolyTreeToExPolygons(polytree);
```

#### ClipperLib.JS.ExPolygonsToPaths()

> [Paths](#clipperlibpaths) ExPolygonsToPaths([ExPolygons](#clipperlibexpolygons) expolygons)

将 ExPolygons 转换为路径。

**用法：**
```js
const paths = ClipperLib.JS.ExPolygonsToPaths(expolygons);
```

### 参考

[Clipper 6 文档](https://github.com/junmer/clipper-lib/blob/master/Documentation.md)
