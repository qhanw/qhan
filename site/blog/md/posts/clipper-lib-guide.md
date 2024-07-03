---
title: ClipperLib使用手册
date: 2024-06-22T10:55:00+08:00
category: Graphics
tags: [Graphics, Algorithms]
description: Clipper lib 库对直线和多边形执行裁剪和偏移。支持所有四种布尔裁剪操作——交集、并并、差和异或。多边形可以是任何形状，包括自相交多边形。
draft: true
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

---

#### ClipperLib.Clipper.ClosedPathsFromPolyTree()

> [Paths](#clipperlibpaths) ClosedPathsFromPolyTree([PolyTree](#clipperlibpolytree) polytree)

This function filters out open paths from the PolyTree structure and returns only closed paths in a Paths structure.

**Usage:**
```js
// ... polytree is populated automatically by Execute()
const polygons = ClipperLib.Clipper.ClosedPathsFromPolyTree(polytree);
```
**See also:** [PolyTree](#clipperlibpolytree), [Paths](#clipperlibpaths)

### ClipperLib.Clipper.Execute()

> Boolean Execute([ClipType](#clipperlibcliptype) clipType,
> [Paths](#clipperlibpaths) solution,
> [PolyFillType](#clipperlibpolyfilltype) subjFillType,
> [PolyFillType](#clipperlibpolyfilltype) clipFillType);

> Boolean Execute([ClipType](#clipperlibcliptype) clipType,
> [PolyTree](#clipperlibpolytree) solution,
> [PolyFillType](#clipperlibpolyfilltype) subjFillType,
> [PolyFillType](#clipperlibpolyfilltype) clipFillType);

Once subject and clip paths have been assigned (via [AddPath](#clipperbaseaddpath) and/or [AddPaths](#clipperbaseaddpaths)), Execute can then perform the clipping operation (intersection, union, difference or XOR) specified by the [clipType](#clipperlibcliptype) parameter.

The solution parameter can be either a [Paths](#clipperlibpaths) or [PolyTree](#clipperlibpolytree) structure. The Paths structure is simpler and faster (roughly 10%) than the PolyTree stucture. PolyTree holds information of parent-child relationchips of paths and also whether they are open or closed.

When a PolyTree object is used in a clipping operation on open paths, two ancilliary functions have been provided to quickly separate out open and closed paths from the solution - [OpenPathsFromPolyTree](#clipperlibclipperopenpathsfrompolytree) and [ClosedPathsFromPolyTree](#clipperlibclipperclosedpathsfrompolytree). [PolyTreeToPaths](#clipperlibclipperpolytreetopaths) is also available to convert path data to a Paths structure (irrespective of whether they're open or closed).

There are several things to note about the solution paths returned:

* they aren't in any specific order
* they should never overlap or be self-intersecting (but see notes on [rounding](#rounding))
* holes will be oriented opposite outer polygons
* the solution fill type can be considered either EvenOdd or NonZero since it will comply with either filling rule
* polygons may rarely share a common edge (though this is now very rare as of version 6)

The subjFillType and clipFillType parameters define the polygon [fill rule](#clipperlibpolyfilltype) to be applied to the polygons (ie closed paths) in the subject and clip paths respectively. (It's usual though obviously not essential that both sets of polygons use the same fill rule.)

Execute can be called multiple times without reassigning subject and clip polygons (ie when different clipping operations are required on the same polygon sets).

![common_edges](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/common_edges.png)

**Usage:**
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
**See also:** [Rounding](#rounding), [ClipperBase.AddPath](#clipperbaseaddpath), [ClipperBase.AddPaths](#clipperbaseaddpaths), [PolyNode.IsOpen](#clipperlibpolynodeisopen), [PolyTree](#clipperlibpolytree), [ClosedPathsFromPolyTree](#clipperlibclipperclosedpathsfrompolytree), [OpenPathsFromPolyTree](#clipperlibclipperopenpathsfrompolytree), [PolyTreeToPaths](#clipperlibclipperpolytreetopaths), [ClipType](#clipperlibcliptype), [Path](#clipperlibpath), [Paths](#clipperlibpaths), [PolyFillType](#clipperlibpolyfilltype)

### ClipperLib.Clipper.GetBounds()
> [IntRect](#clipperlibintrect) GetBounds [Paths](#clipperlibpaths) paths);

This method returns the axis-aligned bounding rectangle of paths.

**Usage:**
```js
const paths = [[{"X":10,"Y":10},{"X":110,"Y":10},{"X":110,"Y":110},{"X":10,"Y":110}]];
const bounds = ClipperLib.Clipper.GetBounds(paths);
// bounds is {"left":10,"top":10,"right":110,"bottom":110}
```
**See also:** [Example](#example), [IntRect](#clipperlibintrect)

### ClipperLib.Clipper.MinkowskiDiff()

> [Paths](#clipperlibpaths) MinkowskiDiff([Path](#clipperlibpath) poly, [Path](#clipperlibpath) path, Boolean isClosed)

Minkowski Difference is performed by subtracting each point in a polygon from the set of points in an open or closed path. A key feature of Minkowski Difference is that when it's applied to two polygons, the resulting polygon will contain the coordinate space origin whenever the two polygons touch or overlap. (This function is often used to determine when polygons collide.)

**See also:** [MinkowskiSum](#clipperlibclipperminkowskisum), [Path](#clipperlibpath), [Paths](#clipperlibpaths)

### ClipperLib.Clipper.MinkowskiSum()

> [Paths](#clipperlibpaths) MinkowskiSum([Path](#clipperlibpath) pattern, [Path](#clipperlibpath) path, Boolean pathIsClosed)

> [Paths](#clipperlibpaths) MinkowskiSum([Path](#clipperlibpath) pattern, [Paths](#clipperlibpaths) paths, [PolyFillType](#clipperlibpolyfilltype) pathFillType, Boolean pathIsClosed)

Minkowski Addition is performed by adding each point in a polygon 'pattern' to the set of points in an open or closed path. The resulting polygon (or polygons) defines the region that the 'pattern' would pass over in moving from the beginning to the end of the 'path'.

**Usage:**
```js
// Star shape ...
const path = [{"X":89.85,"Y":355.85},{"X":131.72,"Y":227.13},{"X":22.1,"Y":147.57},{"X":157.6,"Y":147.57},{"X":199.47,"Y":18.85},{"X":241.34,"Y":147.57},{"X":376.84,"Y":147.57},{"X":267.22,"Y":227.13},{"X":309.09,"Y":355.85},{"X":199.47,"Y":276.29}];
// Diagonal brush shape ...
const shape = [{"X":4,"Y":-6},{"X":6,"Y":-6},{"X":-4,"Y":6},{"X":-6,"Y":6}];
const solution = ClipperLib.Clipper.MinkowskiSum(shape, path, true);
```
**See also:** [MinkowskiDiff](#clipperlibclipperminkowskidiff), [Path](#clipperlibpath), [Paths](#clipperlibpaths)

### ClipperLib.Clipper.OffsetPaths()

> [Paths](#clipperlibpaths) OffsetPaths([Paths](#clipperlibpaths) polys, Number delta, [JoinType](#clipperlibjointype) jointype = JoinType.jtSquare, [EndType](#clipperlibendtype) endtype = EndType.etClosed, Number limit)

**Deprecated.** (See [ClipperOffset](#clipperlibclipperoffset).)

This function offsets the 'polys' parameter by the 'delta' amount. 'polys' may be open or closed paths. With closed paths (polygons), positive delta values 'expand' outer contours and 'shrink' inner 'hole' contours. Negative deltas do the reverse. With open paths (lines), the sign of the delta value is ignored since it's not possible to 'shrink' open paths.

Edge joins may be one of three [jointypes](#clipperlibclipperoffsetjointype) - jtMiter, jtSquare or jtRound. (See the image below for examples.)

![jointypes](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/jointypes.png)

The meaning and use of the limit parameter depends on jointype:

* jtMiter: limit sets the maximum distance in multiples of delta that vertices can be offset from their original positions before squaring is applied. **The default value is 2** (ie twice delta) which is also the smallest allowed value. If the angle is acute enough to require squaring, then squaring will occur at 1 times delta. If offsetting was allowed without any limits (ie without squaring), then offsetting at very acute angles would produce unacceptably long 'spikes'.

* jtRound: limit sets the maximum distance that rounded joins can deviate from their true arcs (since it would require an infinite number of vertices to perfectly represent an arc). **The default limit is 0.25 units** though realistically precision can never be better than 0.5 since arc coordinates will still be rounded to integer values. When offsetting polygons with very large coordinate values (typically as a result of scaling), it's advisable to increase limit to maintain consistent precisions at all joins because the maximum number of vertices allowed in any arc is 222. (This hard coded upper limit has been chosen because the imprecision in a circle constructed with 222 vertices will be only 1/10000th its radius and, not only is creating very large numbers of arc vertices computationally expensive, it can cause out-of-memory problems.)

* jtSquare: The limit parameter is ignored since squaring will be applied uniformally at 1 times delta.

Self-intersections in closed paths must be removed before the paths are passed to OffsetPaths.


**Usage:**
```js
const paths = [[{"X":224,"Y":146},{"X":224,"Y":213},{"X":201,"Y":191},{"X":179,"Y":235},{"X":134,"Y":191},{"X":179,"Y":168},{"X":157,"Y":146}]];
const offset_paths = ClipperLib.Clipper.OffsetPaths(paths, 10, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etClosed, 0.25);
```
**See also:** [ClipperOffset](#clipperlibclipperoffset), [ClipperOffset.JoinType](#clipperlibclipperoffsetjointype), [Path](#clipperlibpath)

### ClipperLib.Clipper.OpenPathsFromPolyTree()

> [Paths](#clipperlibpaths) OpenPathsFromPolyTree([PolyTree](#clipperlibpolytree) polytree)

This function filters out closed paths from the PolyTree structure and returns only open paths in a Paths structure.

**Usage:**
```js
// ... polytree is populated automatically by Execute()
const lines = ClipperLib.Clipper.OpenPathsFromPolyTree(polytree);
```
**See also:** [PolyTree](#clipperlibpolytree), [Paths](#clipperlibpaths)

### ClipperLib.Clipper.Orientation()

> Boolean Orientation([Path](#clipperlibpath) poly)

Returns true, if polygon area is >=0.

Orientation is only important to closed paths. Given that vertices are declared in a specific order, orientation refers to the direction (clockwise or counter-clockwise) that these vertices progress around a closed path.

Orientation is also dependent on axis direction:

* On Y-axis positive upward displays, Orientation will return true if the polygon's orientation is counter-clockwise.

* On Y-axis positive downward displays, Orientation will return true if the polygon's orientation is clockwise.

![orientation](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/orientation.png)

**Notes:**

* Self-intersecting polygons have indeterminate orientations in which case this function won't return a meaningful value.
* The majority of 2D graphic display libraries (eg GDI, GDI+, XLib, Cairo, AGG, Graphics32) and even the SVG file format have their coordinate origins at the top-left corner of their respective viewports with their Y axes increasing downward. However, some display libraries (eg Quartz, OpenGL) have their coordinate origins undefined or in the classic bottom-left position with their Y axes increasing upward.
* For Non-Zero filled polygons, the orientation of [holes](#terminology) must be opposite that of [outer](#terminology) polygons.
* For closed paths (polygons) in the solution returned by Clipper's Execute method, their orientations will always be true for outer polygons and false for hole polygons (unless the [ReverseSolution](#clipperlibclipperreversesolution) property has been enabled).

**Usage:**
```js
const orientation = ClipperLib.Clipper.Orientation(polygon);
```
**See also:** [Area](#clipperlibclipperarea), [Clipper.ReverseSolution](#clipperlibclipperreversesolution), [Path](#clipperlibpath)

### ClipperLib.Clipper.PointInPolygon()

> Number PointInPolygon([IntPoint](#clipperlibintpoint) pt, [Path](#clipperlibpath) poly)

Returns 0 if false, -1 if pt is **on** poly and +1 if pt is **in** poly.

**Usage:**
```js
const poly = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
const pt = new ClipperLib.IntPoint(50,50);
const inpoly = ClipperLib.Clipper.PointInPolygon(pt, poly);
// inpoly is 1, which means that pt is in polygon
```
**See also:** [IntPoint](#clipperlibintpoint), [Path](#clipperlibpath)

### ClipperLib.Clipper.PolyTreeToPaths()

> [Paths](#clipperlibpaths) PolyTreeToPaths([PolyTree](#clipperlibpolytree) polytree)

This function converts a [PolyTree](#clipperlibpolytree) structure into a [Paths](#clipperlibpaths) structure (whether they are open or closed). To differentiate open and closed paths, use [OpenPathsFromPolyTree](#clipperlibclipperopenpathsfrompolytree) or [ClosedPathsFromPolyTree](#clipperlibclipperclosedpathsfrompolytree).

**Usage:**
```js
// ... polytree is populated automatically by Execute()
const paths = ClipperLib.Clipper.PolyTreeToPaths(polytree);
```
**See also:** [PolyTree](#clipperlibpolytree), [Paths](#clipperlibpaths)

### ClipperLib.Clipper.ReversePath()

```plaintext
Call Path.reverse().
```
Reverses the vertex order (and hence orientation) in a path.

**Usage:**
```js
const path = [{"X":10,"Y":10},{"X":110,"Y":10},{"X":110,"Y":110},{"X":10,"Y":110}];
path.reverse();
// path is now [[{"X":10,"Y":110},{"X":110,"Y":110},{"X":110,"Y":10},{"X":10,"Y":10}]]
```
### ClipperLib.Clipper.ReversePaths()

> void ReversePaths([Paths](#clipperlibpaths) p)

Reverses the vertex order (and hence orientation) in each contained path.

**Usage:**
```js
const paths = [[{"X":10,"Y":10},{"X":110,"Y":10},{"X":110,"Y":110},{"X":10,"Y":110}]];
ClipperLib.Clipper.ReversePaths(paths);
// paths is now [[{"X":10,"Y":110},{"X":110,"Y":110},{"X":110,"Y":10},{"X":10,"Y":10}]]
```
### ClipperLib.Clipper.SimplifyPolygon()

> [Paths](#clipperlibpaths) SimplifyPolygon([Path](#clipperlibpath) poly, [PolyFillType](#clipperlibpolyfilltype) fillType = PolyFillType.pftEvenOdd)
Removes self-intersections from the supplied polygon (by performing a boolean union operation using the nominated [PolyFillType](#clipperlibpolyfilltype)).

Polygons with non-contiguous duplicate vertices (ie 'touching') will be split into two polygons.

![simplify](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/simplify.png)
![simplify2](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/simplify2.png)
![simplify3](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/simplify3.png)

**Usage:**
```js
// five-pointed star with self-intersections...
const five_pointed_star = [{"X":147,"Y":313},{"X":247,"Y":34},{"X":338,"Y":312},{"X":86,"Y":123},{"X":404,"Y":124}];
const ten_pointed_star = ClipperLib.Clipper.SimplifyPolygon(five_pointed_star, ClipperLib.PolyFillType.pftNonZero);
// ten_pointed_star is a ten-pointed star with no self-intersections
const fifteen_pointed_star = ClipperLib.Clipper.SimplifyPolygon(five_pointed_star, ClipperLib.PolyFillType.pftEvenOdd);
// fifteen_pointed_star is a fifteen-pointed star with no self-intersections
```

**See also:** [Clipper.StrictlySimple](#clipperlibclipperstrictlysimple), [CleanPolygon](#clipperlibclippercleanpolygon), [Path](#clipperlibpath), [PolyFillType](#clipperlibpolyfilltype)

### ClipperLib.Clipper.SimplifyPolygons()

> [Paths](#clipperlibpaths) SimplifyPolygons([Paths](#clipperlibpaths) polys, [PolyFillType](#clipperlibpolyfilltype) fillType = PolyFillType.pftEvenOdd)

The same functionality as in [SimplifyPolygon](#clipperlibclippersimplifypolygon), but the parameter is of type [Paths](#clipperlibpaths).

**Usage:**
```js
// five-pointed star with self-intersections...
const five_pointed_star = [[{"X":147,"Y":313},{"X":247,"Y":34},{"X":338,"Y":312},{"X":86,"Y":123},{"X":404,"Y":124}]];
const ten_pointed_star = ClipperLib.Clipper.SimplifyPolygons(five_pointed_star, ClipperLib.PolyFillType.pftNonZero);
// ten_pointed_star is a ten-pointed star with no self-intersections
const fifteen_pointed_star = ClipperLib.Clipper.SimplifyPolygon(five_pointed_star, ClipperLib.PolyFillType.pftEvenOdd);
// fifteen_pointed_star is a fifteen-pointed star with no self-intersections
```
**See also:** [Clipper.StrictlySimple](#clipperlibclipperstrictlysimple), [CleanPolygons](#clipperlibclippercleanpolygons), [PolyFillType](#clipperlibpolyfilltype)

### Clipper Properties

### ClipperLib.Clipper.PreserveCollinear

```plaintext
Boolean PreserveCollinear;
```

By default, when three or more vertices are collinear in input polygons (subject or clip), the Clipper object removes the 'inner' vertices before clipping. When enabled the PreserveCollinear property prevents this default behavior to allow these inner vertices to appear in the solution.

**Usage:**
```js
const cpr = new ClipperLib.Clipper();
cpr.PreserveCollinear = true;
```
**See also:** [ClipperLib.Clipper()](#clipperlibclipper)

### ClipperLib.Clipper.ReverseSolution

```plaintext
Boolean ReverseSolution;
```

When this property is set to true, polygons returned in the solution parameter of the [Execute()](#clipperlibclipperexecute) method will have orientations opposite to their normal orientations.

**Usage:**
```js
const cpr = new ClipperLib.Clipper();
cpr.ReverseSolution = true;
```
**See also:** [Execute](#clipperlibclipperexecute), [Orientation](#clipperlibclipperorientation)

### ClipperLib.Clipper.StrictlySimple

```
Boolean StrictlySimple;
```

Terminology:
* A simple polygon is one that does not self-intersect.
* A weakly simple polygon is a simple polygon that contains 'touching' vertices, or 'touching' edges.
* A strictly simple polygon is a simple polygon that does not contain 'touching' vertices, or 'touching' edges.

Vertices 'touch' if they share the same coordinates (and are not adjacent). An edge touches another if one of its end vertices touches another edge excluding its adjacent edges, or if they are co-linear and overlapping (including adjacent edges).

Polygons returned by clipping operations (see [Clipper.Execute()](#clipperlibclipperexecute)) should always be simple polygons. When the StrictlySimply property is enabled, polygons returned will be strictly simple, otherwise they may be weakly simple. It's computationally expensive ensuring polygons are strictly simple and so this property is disabled by default.

![simplify3](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/simplify3.png)
![simplify2](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/simplify2.png)

In the image above, the two examples show weakly simple polygons being broken into two strictly simple polygons. (The outlines with arrows are intended to aid visualizing vertex order.)

See also the article on [Simple Polygon](http://en.wikipedia.org/wiki/Simple_polygon) on Wikipedia.

**Usage:**
```js
const cpr = new ClipperLib.Clipper();
cpr.StrictlySimple = true;
```
**See also:** [Execute](#clipperlibclipperexecute), [SimplifyPolygons](#clipperlibclippersimplifypolygons)

### ClipperLib.Clipper.ZFillFunction

> void [ZFillCallback](#clipperlibclipperzfillcallback) ZFillFunction;

This property is only exposed if the Preprocessor directive [use_xyz](#preprocessor-defines) has been defined. (If it is defined, a Z member will be added to the [IntPoint](#clipperlibintpoint) structure.) When a custom callback function is assigned it will be called during clipping operations so custom Z values can be assigned intersection vertices.

Vertices in the solution of clipping operations more often than not correspond to input (subject or clip) vertices, but those vertices created at edge intersections do not. While the X and Y coordinates for these 'intersection' vertices are obviously defined by the points of intersection, there's no obvious way to assign their Z values. It really depends on the needs of the library user. While there are 4 vertices directly influencing an intersection vertex (ie the vertices on each end of the 2 intersecting edges), in an attempt to keep things simple only the vertices bounding one edge will be passed to the callback function.

The CurvesDemo application in the Curves directory in the distribution zip package shows how the Z member together with the callback function can be used to flatten curved paths (defined by control points) and after clipping, to 'de-flatten' or reconstruct curved paths in the clipping solution.

**Usage:**

```js
const cpr = new ClipperLib.Clipper();
cpr.ZFillFunction = function (vert1, vert2, intersectPt) { /* function body */ };
// or
const ClipCallback = function (vert1, vert2, intersectPt) { /* function body */ };
cpr.ZFillFunction = ClipCallback;
```

**See also:** [Defines](#preprocessor-defines), [IntPoint](#clipperlibintpoint), [ZFillCallback](#clipperlibclipperzfillcallback)

## Types

### ClipperLib.ClipType()

```plaintext
Number ClipType {ctIntersection: 0, ctUnion: 1, ctDifference: 2, ctXor: 3};
```
There are four boolean operations - AND, OR, NOT & XOR.

Given that subject and clip polygon brush 'filling' is defined both by their vertices and their respective [filling rules](#clipperlibpolyfilltype), the four boolean operations can be applied to polygons to define new filling regions:

* AND (intersection) - create regions where both subject and clip polygons are filled
* OR (union) - create regions where either subject or clip polygons (or both) are filled
* NOT (difference) - create regions where subject polygons are filled except where clip * polygons are filled
* XOR (exclusive or) - create regions where either subject or clip polygons are filled but not where both are filled

![cliptype](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/cliptype.png)

![intersection](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/intersection.png)
![union](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/union.png)
![difference](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/difference.png)
![xor](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/xor.png)


All polygon clipping is performed with a [Clipper](#clipperlibclipper) object with the specific boolean operation indicated by the ClipType parameter passed in its [Execute](#clipperlibclipperexecute) method.

With regard to open paths (polylines), clipping rules generally match those of closed paths (polygons).

However, when there are both polyline and polygon subjects, the following clipping rules apply:

* union operations - polylines will be clipped by any overlapping polygons so that non-overlapped portions will be returned in the solution together with the union-ed polygons
* intersection, difference and xor operations - polylines will be clipped only by 'clip' polygons and there will be not interaction between polylines and subject polygons.

Example of clipping behaviour when mixing polyline and polygon subjects:

![line_clipping2](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/line_clipping2.png)

**Usage:**
```js
const cliptype = ClipperLib.ClipType.ctIntersection;
const cliptype = ClipperLib.ClipType.ctUnion;
const cliptype = ClipperLib.ClipType.ctDifference;
const cliptype = ClipperLib.ClipType.ctXor;
```
**See also:** [Clipper](#clipperlibclipper), [Clipper.Execute](#clipperlibclipperexecute), [PolyFillType](#clipperlibpolyfilltype)

### ClipperLib.EndType

```plaintext
ClipperLib.EndType = {etOpenSquare: 0, etOpenRound: 1, etOpenButt: 2, etClosedLine: 3,  etClosedPolygon: 4 };
```
The EndType enumerator has 5 values:

* **etOpenSquare:** Ends are squared off and extended delta units
* **etOpenRound:** Ends are rounded off and extended delta units
* **etOpenButt:** Ends are squared off with no extension.
* **etClosedLine:** Ends are joined using the JoinType value and the path filled as a polyline
* **etClosedPolygon:** Ends are joined using the JoinType value and the path filled as a polygon
* **etOpenSingle:** Offsets an open path in a single direction. Planned for a future update.

Note: With etClosedPolygon and etClosedLine types, the path closure will be the same regardless of whether or not the first and last vertices in the path match.

![endtypes1](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/endtypes1.png)
![endtypes2](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/endtypes2.png)

**Usage:**
```js
const endtype = ClipperLib.EndType.etOpenSquare;
const endtype = ClipperLib.EndType.etOpenRound;
const endtype = ClipperLib.EndType.etOpenButt;
const endtype = ClipperLib.EndType.etClosedLine;
const endtype = ClipperLib.EndType.etClosedPolygon;
```
**See also:** [ClipperOffset.AddPath](#clipperlibclipperoffsetaddpath), [ClipperOffset.AddPaths](#clipperlibclipperoffsetaddpaths)

### ClipperLib.EndType_

```js
if (use_deprecated) ClipperLib.EndType_ = {etSquare: 0, etRound: 1, etButt: 2, etClosed: 3};
```

**Deprecated.** See [ClipperOffset](#clipperoffset) and [EndType](#clipperlibendtype).

The EndType_ enumerator has 4 values:

* etSquare: Ends are squared off at exactly delta units
* etRound: Ends are rounded off at exactly delta units
* etButt: Ends are squared off abruptly
* etClosed: Ends are joined using the JoinType value and the path filled as a polygon.

![endtypes](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/endtypes.png)

**Usage:**
```js
const endtype = ClipperLib.EndType_.etSquare;
const endtype = ClipperLib.EndType_.etRound;
const endtype = ClipperLib.EndType_.etButt;
const endtype = ClipperLib.EndType_.etClosed;
```

### ClipperLib.ExPolygon()

```plaintext
ExPolygon ExPolygon();
```

Creates an instance of ExPolygon object.

This is not anymore in the original Clipper, but in JS version we provide it to ensure backward compatibility.

**Usage:**
```js
cont expolygon = new ClipperLib.ExPolygon();
```

**See also:** [PolyTreeToExPolygons](#clipperlibjspolytreetoexpolygons), [ExPolygonsToPaths](#clipperlibjsexpolygonstopaths)

### ClipperLib.ExPolygons()

```plaintext
ExPolygons ExPolygons();
```
Creates an instance of ExPolygons object ie array.

This is not anymore in the original Clipper, but in JS version we provide it to ensure backward compatibility.

**Usage:**
```js
const expolygons = new ClipperLib.ExPolygons();
```
**See also:** [PolyTreeToExPolygons](#clipperlibjspolytreetoexpolygons), [ExPolygonsToPaths](#clipperlibjsexpolygonstopaths)

### InitOptions

```plaintext
Number ioReverseSolution = 1;
Number ioStrictlySimple = 2;
Number ioPreserveCollinear = 4;
```
**Usage:**
```js
const cpr = new ClipperLib.Clipper(ClipperLib.Clipper.ioStrictlySimple | ClipperLib.Clipper.ioPreserveCollinear);
// or
const cpr = new ClipperLib.Clipper(2 | 4);
```

**See also:** [Constructor](#clipperlibclipper), [Clipper.PreserveCollinear](#clipperlibclipperpreservecollinear), [Clipper.ReverseSolution](#clipperlibclipperreversesolution), [Clipper.StrictlySimple](#clipperlibclipperstrictlysimple)

### ClipperLib.IntPoint()

```plaintext
IntPoint IntPoint(Number X, Number Y)
IntPoint IntPoint()
IntPoint IntPoint(IntPoint point)
```

The IntPoint structure is used to represent all vertices in the Clipper Library. An "integer" storage type has been deliberately chosen to preserve [numerical robustness](http://www.mpi-inf.mpg.de/~kettner/pub/nonrobust_cgta_06.pdf). (Early versions of the library used floating point coordinates, but it became apparent that floating point imprecision would always cause occasional errors.)

A sequence of IntPoints are contained within a [Path](#clipperlibpath) structure to represent a single contour.

As of version 6, IntPoint now has an optional third member 'Z'. This can be enabled by exposing (ie uncommenting) the PreProcessor define [use_xyz](#preprocessor-defines). When the Z member is used, its values will be copied to corresponding verticies in solutions to clipping operations. However, at points of intersection where there's no corresponding Z value, the value will be assigned zero unless a new value is provided by a user supplied [callback function](#clipperlibclipperzfillfunction).

Users wishing to clip or offset polygons containing floating point coordinates need to use appropriate scaling when converting these values to and from IntPoints.

See also the notes on [rounding](#rounding).

**Usage:**
```js
const point1 = new ClipperLib.IntPoint(10,20); // Creates object {"X":10,"Y":20}
const point2 = new ClipperLib.IntPoint(); // Creates object {"X":0,"Y":0}
const point3 = new ClipperLib.IntPoint(point); // Creates clone of point
```

**See also:** [Rounding](#rounding), [Clipper.ZFillFunction](#clipperlibclipperzfillfunction), [Defines](#preprocessor-defines), [Path](#clipperlibpath), [Paths](#clipperlibpaths)

### ClipperLib.IntRect()

```plaintext
IntRect IntRect(Number left, Number top, Number right, Number bottom);
IntRect IntRect(IntRect intRect);
IntRect IntRect();
```

Structure returned by Clipper's [GetBounds](#clipperlibclippergetbounds) method.

**See also:** [GetBounds](#clipperlibclippergetbounds)

### ClipperLib.JoinType

```plaintext
ClipperLib.JoinType = {jtSquare: 0, jtRound: 1, jtMiter: 2};
```

When adding paths to a [ClipperOffset](#clipperoffset) object via the [AddPaths](#clipperlibclipperoffsetaddpaths) method, the joinType parameter may be one of three types - jtMiter, jtSquare or jtRound.

![jointypes](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/86de/attachment/jointypes.png)

* **jtMiter:** There's a necessary limit to mitered joins since offsetting edges that join at very acute angles will produce excessively long and narrow 'spikes'. To contain these potential spikes, the ClipperOffset object's [MiterLimit](#clipperlibclipperoffsetmiterlimit) property specifies a maximum distance that vertices will be offset (in multiples of delta). For any given edge join, when miter offsetting would exceed that maximum distance, 'square' joining is applied.
* **jtRound:** While flattened paths can never perfectly trace an arc, they are approximated by a series of arc chords (see ClipperObject's [ArcTolerance](#clipperlibclipperoffsetarctolerance) property).
* **jtSquare:** Squaring is applied uniformally at all convex edge joins at 1 × delta.

**Usage:**

```js
const jointype = ClipperLib.JoinType.jtSquare;
const jointype = ClipperLib.JoinType.jtRound;
const jointype = ClipperLib.JoinType.jtMiter;
```

**See also:** [ClipperOffset](#clipperoffset), [AddPaths](#clipperlibclipperoffsetaddpaths), [ArcTolerance](#clipperlibclipperoffsetarctolerance), [MiterLimit](#clipperlibclipperoffsetmiterlimit)

### ClipperLib.Path()

```plaintext
Path Path()
```

This structure contains a sequence of [IntPoint](#clipperlibintpoint) vertices defining a single contour (see also [terminology](#terminology)). Paths may be open and represent line segments bounded by 2 or more vertices, or they may be closed and represent polygons.

Multiple paths can be grouped into a [Paths](#clipperlibpaths) structure.

**Usage:**
```js
const path = new ClipperLib.Path(); // Creates an empty array []
// or
const path = new Array();
// or
const path = [];
```

**See also:** [overview](#overview), [Example](#example), [ClipperBase.AddPath](#clipperbaseaddpath), [PolyTree](#clipperlibpolytree), [Orientation](#clipperlibclipperorientation), [IntPoint](#clipperlibintpoint), [Paths](#clipperlibpaths)

### ClipperLib.Paths()

```plaintext
Paths Paths()
```

This structure is fundamental to the Clipper Library. It's an array of one or more [Path](#clipperlibpath) structures. (The Path structure contains an ordered array of vertices that make a single contour.)

Paths may open (lines), or they may closed (polygons).

**Usage:**
```js
const paths = new ClipperLib.Paths(); // Creates an empty array []
// or
const paths = new Array();
// or
const paths = [];
```
**See also:** [Clipper.Execute](#clipperlibclipperexecute), [ClipperBase.AddPath](#clipperbaseaddpath), [ClipperBase.AddPaths](#clipperbaseaddpaths), [OffsetPaths](#clipperlibclipperoffsetpaths), [IntPoint](#clipperlibintpoint), [Path](#clipperlibpath)

### ClipperLib.PolyFillType

```plaintext
ClipperLib.PolyFillType = {pftEvenOdd: 0, pftNonZero: 1, pftPositive: 2, pftNegative: 3};
```

Filling indicates regions that are inside a polygon (ie 'filled' with a brush color or pattern in a graphical display), and non-filling indicates regions outside polygons. The Clipper Library supports 4 filling rules: Even-Odd, Non-Zero, Positive and Negative.

The simplest filling rule is Even-Odd filling. Given a group of polygons and starting from a point outside, whenever a contour is crossed either filling starts if it had stopped or it stops if it had started. For example, given a single rectangular polygon, when its first (eg left) edge is crossed filling starts and we're inside the polygon. Filling stops again when the next (eg right) edge is crossed.

With the exception of Even-Odd filling, all other filling rules rely on edge direction and winding numbers to determine filling. Edge direction is determined by the order in which vertices are declared when constructing a polygon. Edge direction is used to determine the winding numbers of polygon regions and subregions.

![wn](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/wn.png) The winding number for any given polygon sub-region can be derived by:

1. starting with a winding number of zero
2. from a point (P1) that's outside all polygons, draw an imaginary line to a point that's inside a given sub-region (P2)
3. while traversing the line from P1 to P2, for each polygon edge that crosses the line from right to left increment the winding number, and for each polygon edge that crosses the line from left to right decrement the winding number.
4. Once you arrive at the given sub-region you have its winding number.

![winding_number](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/winding_number.png)

**Even-Odd (Alternate)**: Odd numbered sub-regions are filled, while even numbered sub-regions are not.
**Non-Zero (Winding)**: All non-zero sub-regions are filled.
**Positive**: All sub-regions with winding counts > 0 are filled.
**Negative**: All sub-regions with winding counts < 0 are filled.

![evenodd](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/evenodd.png)
![nonzero](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/nonzero.png)
![positive](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/positive.png)
![negative](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/negative.png)

By far the most widely used fill rules are Even-Odd (aka Alternate) and Non-Zero (aka Winding). Most graphics rendering libraries ([AGG](http://www.antigrain.com/__code/include/agg_basics.h.html#filling_rule_e), [Android Graphics](http://developer.android.com/reference/android/graphics/Path.FillType.html), [Cairo](http://cairographics.org/manual/cairo-cairo-t.html#cairo-fill-rule-t), [GDI+](http://msdn.microsoft.com/en-us/library/windows/desktop/ms534120(v=vs.85).aspx), [OpenGL](http://www.glprogramming.com/red/chapter11.html), [Quartz 2D](http://developer.apple.com/library/ios/#documentation/GraphicsImaging/Conceptual/drawingwithquartz2d/dq_paths/dq_paths.html#//apple_ref/doc/uid/TP30001066-CH211-TPXREF101) etc) and vector graphics storage formats ([SVG](http://www.w3.org/TR/SVG/painting.html#FillRuleProperty), Postscript, [Photoshop](http://www.adobe.com/devnet-apps/photoshop/fileformatashtml/PhotoshopFileFormats.htm#50577409_17587) etc) support both these rules. However some libraries (eg Java's [Graphics2D](http://docs.oracle.com/javase/6/docs/api/java/awt/Graphics.html#fillPolygon(int[], int[], int))) only support one fill rule. *Android Graphics* and *OpenGL* are the only libraries (that I'm aware of) that support multiple filling rules.

It's useful to note that *edge direction* has no affect on a winding number's odd-ness or even-ness. (This is why [orientation](#clipperlibclipperorientation) is ignored when the *Even-Odd* rule is employed.)

The direction of the Y-axis does affect polygon orientation and *edge direction*. However, changing Y-axis orientation will only change the *sign* of winding numbers, not their magnitudes, and has no effect on either *Even-Odd* or *Non-Zero* filling.

**Usage:**
```js
const polyfilltype = ClipperLib.PolyFillType.pftEvenOdd;
const polyfilltype = ClipperLib.PolyFillType.pftNonZero;
const polyfilltype = ClipperLib.PolyFillType.pftPositive;
const polyfilltype = ClipperLib.PolyFillType.pftNegative;
```

**See also:** [Clipper.Execute](#clipperlibclipperexecute), [Orientation](#clipperlibclipperorientation)

### ClipperLib.PolyType

```plaintext
Number ClipperLib.PolyType = {ptSubject: 0, ptClip: 1};
```

Boolean (clipping) operations are mostly applied to two sets of Polygons, represented in this library as subject and clip polygons. Whenever Polygons are added to the Clipper object, they must be assigned to either subject or clip polygons.

UNION operations can be performed on one set or both sets of polygons, but all other boolean operations require both sets of polygons to derive meaningful solutions.

**Usage:**
```js
const polytype = ClipperLib.PolyType.ptSubject;
const polytype = ClipperLib.PolyType.ptClip;
```

**See also:** [ClipperBase.AddPath](#clipperbaseaddpath), [ClipperBase.AddPaths](#clipperbaseaddpaths), [ClipType](#clipperlibcliptype)

### ClipperLib.Clipper.ZFillCallback()

> void ZFillCallback([IntPoint](#clipperlibintpoint) Z1, [IntPoint](#clipperlibintpoint) Z2, [IntPoint](#clipperlibintpoint) pt);
>
**See also:** [Clipper.ZFillFunction](#clipperlibclipperzfillfunction)

## PolyTree

PolyTree is intended as a read-only data structure that should only be used to receive solutions from polygon clipping operations. It's an alternative data structure the Paths structure which can also receive clipping solutions. Its major advantages over the [Paths](#clipperlibpaths) structure is that it properly represents the parent-child relationships of the returned polygons, and that it also differentiates between open and closed paths. However, since a PolyTree is more complex than a Paths structure, and because it's more computationally expensive to process (the Execute method being roughly 5-10% slower), it should only be used when parent-child polygon relationships are needed, or when open paths are being 'clipped'.

An empty PolyTree object can be passed as the solution parameter to a [Clipper](#clipper) object's [Execute](#clipperlibclipperexecute) method. Once the clipping operation is completed, this method returns with the PolyTree structure filled with data representing the solution.

A PolyTree object is a container for any number of [PolyNode](#polynode) children, with each contained PolyNode representing a single polygon contour (either an [outer](#terminology) or [hole](#terminology) polygon). PolyTree itself is a specialized PolyNode whose immediate children represent the top-level outer polygons of the solution. (Its own [Contour](#clipperlibpolynodecontour) property is always empty.) The contained top-level PolyNodes may contain their own PolyNode children representing hole polygons that may also contain children representing nested outer polygons etc. Children of outers will always be holes, and children of holes will always be outers.

PolyTrees can also contain open paths. Open paths will always be represented by top level PolyNodes. Two functions are provided to quickly separate out open and closed paths from a polytree - [ClosedPathsFromPolyTree](#clipperlibclipperclosedpathsfrompolytree) and [OpenPathsFromPolyTree](#clipperlibclipperopenpathsfrompolytree).


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

**See also:** [Overview](#overview), [Clipper](#clipper), [Clipper.Execute](#clipperlibclipperexecute), [PolyNode](#clipperlibpolynode), [ClosedPathsFromPolyTree](#clipperlibclipperclosedpathsfrompolytree), [OpenPathsFromPolyTree](#clipperlibclipperopenpathsfrompolytree), [Paths](#clipperlibpaths)

### --- PolyTree methods ---

### ClipperLib.PolyTree()

> [PolyTree](#clipperlibpolytree) PolyTree()

Returns new PolyTree object.

**Usage:**
```js
const polytree = new ClipperLib.PolyTree(); // creates PolyTree object
// cpr.Execute ...
```

**See also:** [Clipper.Execute](#clipperlibclipperexecute), [PolyNode](#clipperlibpolynode), [ClosedPathsFromPolyTree](#clipperlibclipperclosedpathsfrompolytree), [OpenPathsFromPolyTree](#clipperlibclipperopenpathsfrompolytree), [Paths](#clipperlibpaths)

### ClipperLib.PolyTree.Clear()

```plaintext
void polytree.Clear()
```

This method clears any PolyNode children contained by PolyTree the object.

Clear does not need to be called explicitly. The [Clipper.Execute](#clipperlibclipperexecute) method that accepts a PolyTree parameter will automatically clear the PolyTree object before propagating it with new PolyNodes. Likewise, PolyTree's destructor will also automatically clear any contained PolyNodes.

**See also:** [Clipper.Execute](#clipperlibclipperexecute)

### ClipperLib.PolyTree.GetFirst()

> [PolyNode](#clipperlibpolynode) GetFirst()

This method returns the first outer polygon contour if any, otherwise a null pointer.

This function is almost equivalent to calling Childs\[0\] except that when a PolyTree object is empty (has no children), calling Childs\[0\] would raise an out of range exception.

**Usage:**
```js
const polynode = polytree.GetFirst();
```
**See also:** [PolyNode.GetNext](#clipperlibpolynodegetnext), [PolyNode.ChildCount](#clipperlibpolynodechildcount), [PolyNode.Childs](#clipperlibpolynodechilds)

### ClipperLib.PolyTree.Total()

```plaintext
Number Total() // read only
```

Returns the total number of PolyNodes (polygons) contained within the PolyTree. This value is not to be confused with [ChildCount](#clipperlibpolynodechildcount) which returns the number of immediate children only ([Childs](#clipperlibpolynodechilds)) contained by PolyTree.

```js
const total = polytree.Total();
```

**See also:** [PolyNode.ChildCount](#clipperlibpolynodechildcount), [PolyNode.Childs](#clipperlibpolynodechilds)

## PolyNode

PolyNodes are encapsulated within a [PolyTree](#polytree) container, and together provide a data structure representing the parent-child relationships of polygon contours returned by Clipper's [Execute](#clipperlibclipperexecute) method.

A PolyNode object represents a single polygon. Its [IsHole](#clipperlibpolynodeishole) property indicates whether it's an [outer](#terminology) or a [hole](#terminology). PolyNodes may own any number of PolyNode children ([Childs](#clipperlibpolynodechilds)), where children of outer polygons are holes, and children of holes are (nested) outer polygons.

**See also:**
[Overview](#overview), [Clipper.Execute](#clipperlibclipperexecute), [PolyTree](#clipperlibpolytree)

### --- PolyNode methods ---

### ClipperLib.PolyNode()

> [PolyNode](#clipperlibpolynode) PolyNode() // read only
Creates new PolyNode object.

**Usage:**
```js
const polynode = new ClipperLib.PolyNode();
```

**See also:** [Clipper.Execute](#clipperlibclipperexecute), [PolyTree](#clipperlibpolytree)

### ClipperLib.PolyNode.ChildCount()

```plaintext
Number ChildCount() // read only
```
Returns the number of PolyNode [Childs](#clipperlibpolynodechilds) directly owned by the PolyNode object.

**Usage:**
```js
const count = polynode.ChildCount();
```
**See also:** [Childs](#clipperlibpolynodechilds)

### ClipperLib.PolyNode.Childs()

> Array [PolyNode](#clipperlibpolynode) Childs() // read only

Array of PolyNode. Outer PolyNode childs contain hole PolyNodes, and hole PolyNode childs contain nested outer PolyNodes.

**Usage:**

```js
const childs = polynode.Childs();
```
**See also:** [ChildCount](#clipperlibpolynodechildcount)

### ClipperLib.PolyNode.Contour()

> [Path](#clipperlibpath) Contour() // read only

Returns a path list which contains any number of vertices.

**Usage:**
```js
const contour = polynode.Contour();
```

### ClipperLib.PolyNode.GetNext()

> [PolyNode](#clipperlibpolynode) GetNext()

The returned Polynode will be the first child if any, otherwise the next sibling, otherwise the next sibling of the Parent etc.

A PolyTree can be traversed very easily by calling GetFirst() followed by GetNext() in a loop until the returned object is a null pointer ...

**Usage:**
```js
const polytree = new ClipperLib.PolyTree();
//call to Clipper.Execute method here which fills 'polytree'

const polynode = polytree.GetFirst();
while (polynode) {
  //do stuff with polynode here
  polynode = polynode.GetNext();
}
```
**See also:** [PolyTree.GetFirst](#clipperlibpolytreegetfirst)

### ClipperLib.PolyNode.IsHole()

```plaintext
Boolean IsHole() // read only
```
Returns true when the PolyNode's polygon ([Contour](#clipperlibpolynodecontour)) is a [hole](#terminology).

Children of outer polygons are always holes, and children of holes are always (nested) outer polygons.

The IsHole property of a [PolyTree](#clipperlibpolytree) object is undefined but its children are always top-level outer polygons.

**Usage:**
```js
const ishole = polynode.IsHole();
```
**See also:** [Contour](#clipperlibpolynodecontour), [PolyTree](#clipperlibpolytree)

### ClipperLib.PolyNode.Parent()

> [PolyNode](#clipperlibpolynode) Parent(); read only

Returns the parent PolyNode.

The PolyTree object (which is also a PolyNode) does not have a parent and will return a null pointer.

**Usage:**
```js
const parent = polynode.Parent();
```
### --- PolyNode properties ---

### ClipperLib.PolyNode.IsOpen

```plaintext
Boolean IsOpen // read only property
```

Returns true when the PolyNode's [Contour](#clipperlibpolynodecontour) results from a clipping operation on an open contour (path). Only top-level PolyNodes can contain open contours.

**Usage:**
```js
const isopen = polynode.IsOpen;
```
**See also:** [Contour](#clipperlibpolynodecontour)

## ClipperOffset

The ClipperOffset class encapsulates the process of offsetting (inflating/deflating) both open and closed paths.

This class replaces the now deprecated OffsetPaths function which is/was less flexible. The Execute method can be called multiple times using different offsets (deltas) without having to reassign paths. Offsetting can now be performed on a mixture of open and closed paths in a single operation. Also, the dual functionality of OffsetPaths' Limit parameter was not only confusing some users, but it also prevented a custom RoundPrecision being assigned when EndType was etRound and JoinType was jtMiter.

When offsetting closed paths (polygons), it's important that:

1. their orientations are consistent such that outer polygons share the same orientation while holes have the opposite orientation
2. they do not self-intersect.

### --- ClipperOffset methods ---

### ClipperLib.ClipperOffset()

```plaintext
ClipperOffset ClipperOffset(Number miterLimit = 2.0, Number roundPrecision = 0.25);
```

The ClipperOffset constructor takes 2 optional parameters: [MiterLimit](#clipperlibclipperoffsetmiterlimit) and [ArcTolerance](#clipperlibclipperoffsetarctolerance). These two parameters corresponds to properties of the same name. MiterLimit is only relevant when JoinType is jtMiter, and ArcTolerance is only relevant when JoinType is jtRound or when EndType is etOpenRound.

**Usage:**
```js
const co = new ClipperLib.ClipperOffset(2.0, 0.25);
```

**See also:** [ArcTolerance](#clipperlibclipperoffsetarctolerance), [MiterLimit](#clipperlibclipperoffsetmiterlimit)

### ClipperLib.ClipperOffset.AddPath()

> void AddPath([Path](#clipperlibpath) path, [JoinType](#clipperlibjointype) jointype, [EndType](#clipperlibendtype) endtype);

Adds a path to a ClipperOffset object in preparation for offsetting. This method can be called multiple times.

**Usage:**
```js
const path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
const co = new ClipperLib.ClipperOffset(2, 0.25);
co.AddPath(path, ClipperLib.JoinType.jtMiter, ClipperLib.EndType.etClosedPolygon);
```

**See also:** [JoinType](#clipperlibjointype), [EndType](#clipperlibendtype)

### ClipperLib.ClipperOffset.AddPaths()

> void AddPaths([Paths](#clipperlibpaths) paths, [JoinType](#clipperlibjointype) jointype, [EndType](#clipperlibendtype) endtype);

Adds paths to a ClipperOffset object in preparation for offsetting. This method can be called multiple times.

**Usage:**
```js
const paths = [
  [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
  [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]
];
const co = new ClipperLib.ClipperOffset(2, 0.25);
co.AddPaths(paths, ClipperLib.JoinType.jtMiter, ClipperLib.EndType.etClosedPolygon);
```
**See also:** [JoinType](#clipperlibjointype), [EndType](#clipperlibendtype)

### ClipperLib.ClipperOffset.Clear()

```plaintext
void Clear();
```

This method clears all paths from the ClipperOffset object, allowing new paths to be assigned.

**Usage:**
```js
const path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
const co = new ClipperLib.ClipperOffset();
co.AddPath(path, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etClosedPolygon);
co.Clear();
```

### ClipperLib.ClipperOffset.Execute()

> void Execute([Paths](#clipperlibpaths) solution, Number delta);

> void Execute([PolyTree](#clipperlibpolytree) polytree, Number delta);

This method takes two parameters. The first is the structure (either PolyTree or Paths) that will receive the result of the offset operation. The second parameter is the amount to which the supplied paths will be offset - negative delta values to shrink polygons and positive delta to expand them.

This method can be called multiple times, offsetting the same paths by different amounts (ie using different deltas).

**A note about scaling:**

Because ClipperOffset uses integer coordinates, you have to scale coordinates to maintain precision and make arcs smooth - also in the case of integer input.

Javascript Clipper provides four functions for this purpose: [ScaleUpPath](#clipperlibjsscaleuppath), [ScaleUpPaths](#clipperlibjsscaleuppaths), [ScaleDownPath](#clipperlibjsscaledownpath) and [ScaleDownPaths](#clipperlibjsscaledownpaths).

Scaling is highly recommended if JoinType is jtRound or EndType is etRound.

**Usage:**
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
####

**See also:** [ScaleUpPath](#clipperlibjsscaleuppath), [ScaleUpPaths](#clipperlibjsscaleuppaths), [ScaleDownPath](#clipperlibjsscaledownpath), [ScaleDownPaths](#clipperlibjsscaledownpaths).

### --- ClipperOffset properties ---

### ClipperLib.ClipperOffset.ArcTolerance

```plaintext
Number ArcTolerance
```

Firstly, this field/property is only relevant when JoinType = jtRound and/or EndType = etRound.

Since flattened paths can never perfectly represent arcs, this field/property specifies a maximum acceptable imprecision ('tolerance') when arcs are approximated in an offsetting operation. Smaller values will increase 'smoothness' up to a point though at a cost of performance and in creating more vertices to construct the arc.

The default ArcTolerance is 0.25 units. This means that the maximum distance the flattened path will deviate from the 'true' arc will be no more than 0.25 units (before rounding).

Reducing tolerances below 0.25 will **not** improve smoothness since vertex coordinates will still be rounded to integer values. The only way to achieve sub-integer precision is through coordinate scaling before and after offsetting (see example below).

It's important to make ArcTolerance a sensible fraction of the offset delta (arc radius). Large tolerances relative to the offset delta will produce poor arc approximations but, just as importantly, very small tolerances will substantially slow offsetting performance while providing unnecessary degrees of precision. This is most likely to be an issue when offsetting polygons whose coordinates have been scaled to preserve floating point precision.

**Example:** Imagine a set of polygons (defined in floating point coordinates) that is to be offset by 10 units using round joins, and the solution is to retain floating point precision up to at least 6 decimal places.
To preserve this degree of floating point precision, and given that Clipper and ClipperOffset both operate on integer coordinates, the polygon coordinates will be scaled up by 108 (and rounded to integers) prior to offsetting. Both offset delta and ArcTolerance will also need to be scaled by this same factor. If ArcTolerance was left unscaled at the default 0.25 units, every arc in the solution would contain a fraction of 44 THOUSAND vertices while the final arc imprecision would be 0.25 × 10-8 units (ie once scaling was reversed). However, if 0.1 units was an acceptable imprecision in the final unscaled solution, then ArcTolerance should be set to 0.1 × scaling_factor (0.1 × 108 ). Now if scaling is applied equally to both ArcTolerance and to Delta Offset, then in this example the number of vertices (steps) defining each arc would be a fraction of 23.

> The formula for the number of steps in a full circular arc is ... Pi / acos(1 - arc_tolerance / abs(delta))

**Usage:**
```js
const co = new ClipperLib.ClipperOffset();
co.ArcTolerance = 1.23;
```

### ClipperLib.ClipperOffset.MiterLimit

```plaintext
Number MiterLimit
```

This property sets the maximum distance in multiples of delta that vertices can be offset from their original positions before squaring is applied. (Squaring truncates a miter by 'cutting it off' at 1 × delta distance from the original vertex.)

**The default value for MiterLimit is 2** (ie twice delta). This is also the smallest MiterLimit that's allowed. If mitering was unrestricted (ie without any squaring), then offsets at very acute angles would generate unacceptably long 'spikes'.

An example of an offsetting 'spike' at a narrow angle that's a consequence of using a large MiterLimit (25) ...

![miterlimit](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/miterlimit.png)

**Usage:**
```js
const co = new ClipperLib.ClipperOffset();
co.MiterLimit = 4.1;
```

**See also:** [JoinType](#clipperlibjointype)

## Rounding

By using an integer type for polygon coordinates, the Clipper Library has been able to avoid problems of numerical robustness that can cause havoc with geometric computations. Problems associated with integer rounding and their possible solutions are discussed [in the original documentation](http://www.angusj.com/delphi/clipper/documentation/Docs/Overview/Rounding.htm).

## JS

JS is a special object to ensure backward compatibility and make it easier to run frequent tasks.

It is not available in original Clipper.

### --- JS methods ---

### ClipperLib.JS.AreaOfPolygon()

> Number AreaOfPolygon([Path](#clipperlibpath) poly, Number scale = 1);

Returns the area of a closed Path. If the path is already scaled up, you can set scale value to force function to return downscaled area.

**Usage:**
```js
const path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
const area = ClipperLib.JS.AreaOfPolygon (path, 1);
// area is 10000
```

### ClipperLib.JS.AreaOfPolygons()

> Number AreaOfPolygons [Paths](#clipperlibpaths) polys, Number scale = 1);

Returns the area of a closed Paths. If it is already scaled up, you can set scale value to force function to return downscaled area.

**Usage:**

```js
const paths = [
  [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
  [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]
];
const area = ClipperLib.JS.AreaOfPolygons (paths, 1);
// area is now 3600
```

### ClipperLib.JS.BoundsOfPath()

> [IntRect](#clipperlibintrect) BoundsOfPath([Path](#clipperlibpath) path, Number scale = 1);

Returns an IntRect object which describes the bounding box of a Path. If the path is already scaled up, you can set scale value to force function to return downscaled bounds.

**Usage:**
```js
const path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
const bounds = ClipperLib.JS.BoundsOfPath (path, 1);
// bounds is {"left":10,"top":10,"right":110,"bottom":110}
```

### ClipperLib.JS.BoundsOfPaths()

> [IntRect](#clipperlibintrect) BoundsOfPaths([Paths](#clipperlibpaths) paths, Number scale = 1);

Returns an IntRect object which describes the bounding box of a Paths. If it is already scaled up, you can set scale value to force function to return downscaled bounds.

**Usage:**
```js
const paths = [
  [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
  [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]
];
const bounds = ClipperLib.JS.BoundsOfPaths (paths, 1);
// bounds is {"left":10,"top":10,"right":110,"bottom":110}
```

### ClipperLib.JS.Clone()

> [Path](#clipperlibpath) Clone([Path](#clipperlibpath) path);

> [Paths](#clipperlibpaths) Clone([Paths](#clipperlibpaths) paths);

Makes a deep copy of Path or Paths so that also IntPoint objects are cloned and not only referenced.

**Usage:**
```js
const cloned_path = ClipperLib.JS.Clone(path);
// or
const cloned_paths = ClipperLib.JS.Clone(paths);
```

### ClipperLib.JS.Clean()

> [Path](#clipperlibpath) Clean([Path](#clipperlibpath) path);

> [Paths](#clipperlibpaths) Clean([Paths](#clipperlibpaths) paths);

Joins vertices that are too near each other and would cause distortion in offsetting without cleaning.

This function differs from CleanPolygon and CleanPolygons, which clean also collinear vertices.

Ideal for situations where you need to prevent distortion and not do anything else.

**Usage:**
```js
const cleaned_path = ClipperLib.JS.Clean (path, delta);
// or
const cleaned_paths = ClipperLib.JS.Clean (paths, delta);
```

### ClipperLib.JS.Lighten()

> [Path](#clipperlibpath) Lighten([Path](#clipperlibpath) path, Number tolerance);

> [Paths](#clipperlibpaths) Lighten([Paths](#clipperlibpaths) paths, Number tolerance);

Removes points that doesn't affect much to the visual appearance. If middle point is at or under certain distance (tolerance) of the line segment between start and end point, the middle point is removed.

Helps to speedup calculations and rendering.

**Usage:**
```js
const scale = 100;
const lightened_path = ClipperLib.JS.Lighten(path, 0.1 * scale);
// or
const lightened_paths = ClipperLib.JS.Lighten(paths, 0.1 * scale);
```

### ClipperLib.JS.PerimeterOfPath()

> Number PerimeterOfPath([Path](#clipperlibpath) path, Boolean closed, Number scale = 1);

Returns the perimeter of a Path. If the Path is closed (ie polygon), a clone of the first vertex is added to the end of the Path and removed after calculation to ensure that whole ("polygonal") perimeter is taken into account.

Open paths (ie lines) are measured by taking into account only the existing vertices.

If the path goes back the same way, every line segment is calculated, which means that the returned perimeter is longer than the visual perimeter.

If coordinates are upscaled beforehand by some scaling factor (eg. 100), and scale parameter is provided to the function, the downscaled, real perimeter is returned.

**Usage:**

```js
const path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
const polygonal_perimeter = ClipperLib.JS.PerimeterOfPath(path, true, 1);
// polygonal_perimeter is 400

// But...
const line_perimeter = ClipperLib.JS.PerimeterOfPath(path, false, 1);
// line_perimeter is 300
```

### ClipperLib.JS.PerimeterOfPaths()

> Number PerimeterOfPaths([Paths](#clipperlibpaths) paths, Boolean closed, Number scale = 1);

Returns the sum of perimeters of individual paths contained in the paths. See also [PerimeterOfPath](#clipperlibjsperimeterofpath).

**Usage:**
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

### ClipperLib.JS.ScaleDownPath()

> void ScaleDownPath([Path](#clipperlibpath) path, Number scale = 1);

Divides each coordinate of Path by scale value.

**Usage:**

```js
const path = [{X:1000,Y:1000},{X:11000,Y:1000},{X:11000,Y:11000},{X:1000,Y:11000}];
ClipperLib.JS.ScaleDownPath (path, 100);
// path is [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
```

### ClipperLib.JS.ScaleDownPaths()

> void ScaleDownPaths([Paths](#clipperlibpaths) paths, Number scale = 1);

Divides each coordinate of Paths by scale value.

**Usage:**
```js
const paths = [
  [{X:1000,Y:1000},{X:11000,Y:1000},{X:11000,Y:11000},{X:1000,Y:11000}],
  [{X:2000,Y:2000},{X:2000,Y:10000},{X:10000,Y:10000},{X:10000,Y:2000}]
];
ClipperLib.JS.ScaleDownPaths (path, 100);
// path is [[{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
//          [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]];
```

### ClipperLib.JS.ScaleUpPath()

> void ScaleUpPath([Path](#clipperlibpath) path, Number scale = 1);

Multiplies each coordinate of a Path by scaling coefficient and rounds to the nearest integer using Math.round().

**Usage:**

```js
const path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
ClipperLib.JS.ScaleUpPath (path, 100);
// path is now [{X:1000,Y:1000},{X:11000,Y:1000},{X:11000,Y:11000},{X:1000,Y:11000}];
```

### ClipperLib.JS.ScaleUpPaths()

> void ScaleUpPaths([Paths](#clipperlibpaths) paths, Number scale = 1);

Multiplies each coordinate of Paths by scaling coefficient and rounds to the nearest integer using Math.round().

**Usage:**

```js
const paths = [
  [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
  [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]
];
ClipperLib.JS.ScaleUpPaths (path, 100);
// path is now [[{X:1000,Y:1000},{X:11000,Y:1000},{X:11000,Y:11000},{X:1000,Y:11000}],
//              [{X:2000,Y:2000},{X:2000,Y:10000},{X:10000,Y:10000},{X:10000,Y:2000}]];
```

### ClipperLib.JS.PolyTreeToExPolygons()

> [ExPolygons](#clipperlibexpolygons) PolyTreeToExPolygons([PolyTree](#clipperlibpolytree) polytree)

Converts PolyTree to ExPolygons.

**Usage:**

```js
const expolygons = ClipperLib.JS.PolyTreeToExPolygons(polytree);
```

### ClipperLib.JS.ExPolygonsToPaths()

> [Paths](#clipperlibpaths) ExPolygonsToPaths([ExPolygons](#clipperlibexpolygons) expolygons)

Converts ExPolygons to Paths.

**Usage:**
```js
const paths = ClipperLib.JS.ExPolygonsToPaths(expolygons);
```

### 参考

[Clipper 6 文档](https://github.com/junmer/clipper-lib/blob/master/Documentation.md)
