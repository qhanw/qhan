---
title: 多边形几何图形计算
date: 2024-05-25T20:08:56+08:00
category: canvas
tags: [canvas, js]
draft: true
---

### 思考

1. 图形透明区域算法计算出图形边界
2. 创建多个Container来存放多次绘制的图形数据最后通过计算Container的边界来计算绘制图形的边界
3. 检测绘制图形的边界是否临近某一元素，临近则加入临近元素的Container，否则新建一个Container并加入绘制元素。
4. 图形顶点计算：
   + 定义两个数组A、B，循环XY坐标，每次延X轴方向遇到的第一个点使用unshift推入数组A，后续其它点使用push推入数组B，依次循环到最后一个点，然后合并数组AB即可得到所有顶点
   + 定义两个数组A，循环XY坐标，每次延X轴方向遇到的第一个点使用unshift推入数组A，后续其它点使用push推入数组A，依次循环到最后一个点，然后合并数组AB即可得到所有顶点，最后一个点即为开始点和结束点
   + 注意：顶点计算规则为，当获取到一个点后，判断当前点的周围8个方向的点是否存在当前图形范围内，部分点存在则表示该点为边上的点，然后再移除这部分点中的有且只有一个同一方向存在两个的临近点的点，即为图形全部顶点坐标。

再多的思考还是不如一个好用的工具，在死去活来的折腾了好几天后，终于在万能的AI引导下，找到了[clipper-lib](https://github.com/junmer/clipper-lib)这个非常好用的图形计算工具库。算法是事，还是交给专业大佬们研究吧，还是做好工具的使用者就OK啦。


```html
<html>
  <head>
    <title>Javascript Clipper Library / Boolean operations / SVG example</title>
    <script src="http://jsclipper.sourceforge.net/6.4.2.2/clipper_unminified.js"></script>
    <script>
      function draw() {
        var subj_paths = [
          [
            { X: 2328, Y: 2249 },
            { X: 2329, Y: 2249 },
            { X: 2329, Y: 2250 },
            { X: 2328, Y: 2250 },
          ],
        ];

        var clip_paths = [
          [
            { X: 2329, Y: 2249 },
            { X: 2330, Y: 2249 },
            { X: 2330, Y: 2250 },
            { X: 2329, Y: 2250 },
          ],
        ];
        //  var scale = 100;

        // ClipperLib.JS.ScaleUpPaths(subj_paths, scale);
        // ClipperLib.JS.ScaleUpPaths(clip_paths, scale);

        // [2328, 2249, 2329, 2249, 2329, 2250, 2328, 2250];
        // [2329, 2249, 2330, 2249, 2330, 2250, 2329, 2250];

        // ClipperLib.JS.makePath();

        var cpr = new ClipperLib.Clipper();
        cpr.AddPaths(subj_paths, ClipperLib.PolyType.ptSubject, true);
        cpr.AddPaths(clip_paths, ClipperLib.PolyType.ptClip, true);

        var subject_fillType = ClipperLib.PolyFillType.pftNonZero;
        var clip_fillType = ClipperLib.PolyFillType.pftNonZero;

        var solution_paths = new ClipperLib.Paths();
        console.log("运算前: ", solution_paths);
        cpr.Execute(
          ClipperLib.ClipType.ctUnion,
          solution_paths,
          subject_fillType,
          clip_fillType
        );
        console.log("运算后: ", solution_paths);
      }
    </script>
  </head>
  <body onload="draw()">
    <div id="svgcontainer"></div>
  </body>
</html>
```


### 参考
- [ClipperLib使用手册](/posts/clipper-lib-guide)
- [Clipper 6 文档](https://github.com/junmer/clipper-lib/blob/master/Documentation.md)
- [JavaScript-Clipper.js](https://www.cnblogs.com/zhigu/p/11928492.html)
- [多边形计算库jsclipper的用法](https://www.sofineday.com/jsclipper.html)
```
