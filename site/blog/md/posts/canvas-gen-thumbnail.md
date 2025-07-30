---
title: HTML5 Canvas 与拖拽生成图片缩略图
description: 教你如何使用 HTML5 Canvas 与拖拽方式，在前端生成图片缩略图，适用于上传预览、封面生成、图片压缩等场景。附完整代码与常见注意事项。
date: 2018-05-10T20:08:56+08:00
category: canvas
tags: [Canvas, 缩略图, 前端图片处理, HTML5, 拖拽]
---

### TOC

###

在日常 Web 开发中，我们经常需要对用户上传的图片生成缩略图，以实现图片预览、压缩上传、生成封面等功能。相比传统的后端处理方式，前端直接使用 `HTML5 Canvas` 即可高效完成这项任务。

本文将手把手教你如何使用 Canvas 生成图片缩略图，并附带实战代码。

## 为什么选择 Canvas 生成缩略图？

- **无需上传服务器，前端即完成缩图**
- **实时反馈，提升用户体验**
- **兼容性强，主流浏览器都支持**
- **可灵活控制缩略图尺寸、质量和比例**

## 基本原理

### Canvas

> [Canvas_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

Canvas 提供了 `drawImage` 方法，我们可以将图片绘制到画布上，然后通过 `toDataURL` 或 `toBlob` 导出缩略图数据。

### 拖拽事件
常用事件有：`drop`、`dragenter`、`dragover`、`dragleave`四个事件。（本示例中未到`dragenter`事件）。详细介绍参见[HTML 拖放 API](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)。

- `drop`: 当元素或选中的文本在可释放目标上被释放时触发。
- `dragenter`：当拖拽元素或选中的文本到一个可释放目标时触发。
- `dragover`：当元素或选中的文本被拖到一个可释放目标上时触发（每 100 毫秒触发一次）。
- `dragleave`：当拖拽元素或选中的文本离开一个可释放目标时触发。


### 基本流程如下：

- 读取图片，拖拽图片文件到指定区域。（这里也可以使用`<input type="file">`的方式加载图片）
- 加载为 Image 对象
- 用 `canvas.drawImage` 按比例绘制
- 使用 `canvas.toDataURL()` 获取缩略图


## 完整代码

新建一个html文件，复制下面代码，并替换新建的html文件内容，然后双击文件即可预览效果。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thumbnail Generator</title>
    <style>
      .drag-drop section {
        width: 300px;
        height: 300px;
        border-radius: 10px;
        border: 2px dotted #999;
        background: #ccc;
        color: #999;
        text-align: center;
        line-height: 300px;
        float: left;
        margin-right: 10px;
      }
      .drag-drop section.active {
        background: #cfc;
      }
      .drag-drop output {
        width: 500px;
        display: block;
        float: left;
      }
      output img {
        padding: 5px;
      }
    </style>
  </head>
  <script>
    window.onload = () => {
      const s = document.querySelector("section"),
        o = document.querySelector("output"),
        c = document.createElement("canvas"),
        cx = c.getContext("2d"),
        thumbSize = 100;

      c.width = c.height = thumbSize;

      document.body.classList.add("drag-drop");

      s.innerHTML = "Drop images here";

      // 拖放事件处理
      s.addEventListener("dragover", (e) => {
        s.classList.add("active");
        e.preventDefault();
      });

      s.addEventListener("dragleave", (e) => {
        s.classList.remove("active");
        e.preventDefault();
      });

      s.addEventListener("drop", (e) => {
        s.classList.remove("active");
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          let i = files.length;
          while (i--) {
            const file = files[i];
            if (file.type.indexOf("image") !== -1) {
              createThumb(file);
            }
          }
        }
        e.preventDefault();
      });

      // 缩略图生成
      function createThumb(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;
          img.onload = function () {
            cx.clearRect(0, 0, thumbSize, thumbSize);
            const thumbGeometry = resize(
              this.width,
              this.height,
              thumbSize,
              thumbSize
            );
            cx.drawImage(
              img,
              thumbGeometry.x,
              thumbGeometry.y,
              thumbGeometry.w,
              thumbGeometry.h
            );
            const thumb = new Image();
            thumb.src = c.toDataURL();
            o.appendChild(thumb);
          };
        };
      }

      function resize(imgWidth, imgHeight, thumbWidth, thumbHeight) {
        let w = 0,
          h = 0,
          x = 0,
          y = 0,
          widthRatio = imgWidth / thumbWidth,
          heightRatio = imgHeight / thumbHeight,
          maxRatio = Math.max(widthRatio, heightRatio);

        if (maxRatio > 1) {
          w = imgWidth / maxRatio;
          h = imgHeight / maxRatio;
        } else {
          w = imgWidth;
          h = imgHeight;
        }
        x = (thumbWidth - w) / 2;
        y = (thumbHeight - h) / 2;

        return { w: w, h: h, x: x, y: y };
      }
    };
  </script>
  <body class="drag-drop">
    <header><h1>Thumbnail generator</h1></header>
    <section>Drop images here</section>
    <output><p>Thumbnails</p></output>
  </body>
</html>
```


## 补充技巧：保持原图比例、压缩质量

若只指定宽或高，另一边可以自动按比例缩放；

`canvas.toDataURL(type, quality)` 可控制导出格式和压缩质量（quality 取值 0~1）；

`canvas.toBlob` 更适合上传文件，避免 base64 编码体积大。

## 安全与性能提示

建议设置最大文件尺寸与最大像素限制，避免生成大图占用内存；

对于用户上传的文件，不要盲目信任，应加验证；

在移动端使用时，注意图片 `EXIF` 方向问题，可结合 `exif-js` 或 `browser-image-compression` 处理。

## 总结

使用 HTML5 Canvas 生成缩略图是一种简单、高效、用户友好的前端图片处理方式。它不仅能提升上传体验，还可以有效减轻服务器压力。
不论你在开发博客、CMS 还是电商系统，都值得尝试使用这项技术优化你的图片处理流程。

## 引用

- [Canvas_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
- [HTML 拖放 API](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)

