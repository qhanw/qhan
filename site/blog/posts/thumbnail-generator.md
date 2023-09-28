---
title: 利用CANVAS生成缩略图
date: 2018-05-10 20:08:56
category: canvas
tags: [canvas, js]
---
利用CANVAS生成缩略图方法总结
---

**HTML**

```html
<body class="dragdrop">
  <header><h1>Thumbnail generator</h1></header>
  <section>Drop images here</section>
  <output><p>Thumbnails</p></output>
</body>
```

**CSS**

```css
* {
  margin: 0;
  padding: 0;
  font-size: 15px;
  font-family: helvetica, arial, sans-serif;
}
body {
  padding: 2em;
}
footer,
section,
header,
aside,
figure {
  display: block;
}
canvas {
  border: 1px solid #000;
}
h1 {
  font-size: 24px;
  padding-bottom: 10px;
}
.dragdrop section {
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
.dragdrop section.active {
  background: #cfc;
}
.dragdrop output {
  width: 500px;
  display: block;
  float: left;
}
output img {
  padding: 5px;
}
footer {
  clear: both;
}
```

**JS**

```js
if (
  window.FileReader &&
  ("draggable" in document.body ||
    ("ondragstart" in document.body && "ondrop" in document.body))
) {
  var s = document.querySelector("section"),
    o = document.querySelector("output"),
    c = document.createElement("canvas"),
    cx = c.getContext("2d"),
    thumbsize = 100;
  c.width = c.height = thumbsize;
  document.body.classList.add("dragdrop");
  s.innerHTML = "Drop images here";

  s.addEventListener(
    "dragover",
    function(evt) {
      s.classList.add("active");
      evt.preventDefault();
    },
    false
  );

  s.addEventListener(
    "dragleave",
    function(evt) {
      s.classList.remove("active");
      evt.preventDefault();
    },
    false
  );

  s.addEventListener(
    "drop",
    function(ev) {
      s.classList.remove("active");
      var files = ev.dataTransfer.files;
      if (files.length > 0) {
        var i = files.length;
        while (i--) {
          var file = files[i];
          if (file.type.indexOf("image") !== -1) {
            createthumb(file);
          }
        }
      }
      ev.preventDefault();
    },
    false
  );

  function createthumb(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(ev) {
      var img = new Image();
      img.src = ev.target.result;
      img.onload = function() {
        cx.clearRect(0, 0, thumbsize, thumbsize);
        var thumbgeometry = resize(
          this.width,
          this.height,
          thumbsize,
          thumbsize
        );
        cx.drawImage(
          img,
          thumbgeometry.x,
          thumbgeometry.y,
          thumbgeometry.w,
          thumbgeometry.h
        );
        var thumb = new Image();
        thumb.src = c.toDataURL();
        o.appendChild(thumb);
      };
    };
  }

  function resize(imagewidth, imageheight, thumbwidth, thumbheight) {
    var w = 0,
      h = 0,
      x = 0,
      y = 0,
      widthratio = imagewidth / thumbwidth,
      heightratio = imageheight / thumbheight,
      maxratio = Math.max(widthratio, heightratio);
    if (maxratio > 1) {
      w = imagewidth / maxratio;
      h = imageheight / maxratio;
    } else {
      w = imagewidth;
      h = imageheight;
    }
    x = (thumbwidth - w) / 2;
    y = (thumbheight - h) / 2;
    return { w: w, h: h, x: x, y: y };
  }
}
```
