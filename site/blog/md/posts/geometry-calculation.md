---
title: 多边形几何图形计算
date: 2024-05-25T20:08:56+08:00
category: canvas
tags: [canvas, js]
draft: true
---
利用CANVAS生成缩略图方法总结
---

[clipper-lib](https://github.com/junmer/clipper-lib)


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
- [Clipper库中文文档详解](https://www.cnblogs.com/zhigu/p/11943118.html)
- [JavaScript-Clipper.js](https://www.cnblogs.com/zhigu/p/11928492.html)
- [多边形计算库jsclipper的用法](https://www.sofineday.com/jsclipper.html)
```
