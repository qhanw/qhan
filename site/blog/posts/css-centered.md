---
title: '元素居中排版'
date: '2017-05-05 10:55:00'
tags:
- 'CSS'
category: 'CSS'
---

在前端开发切片布局中我们常常会遇到各种元素 **水平**、**垂直**、**水平垂直**居中显示的的场景，其中 **水平居中** 是相对简单，而 **垂直居中**则相应要麻烦些。

---

### 水平居中

对于行类元素如 span、label、em,small 等元素来说水平居中一般采用方式为：`text-align: center;`，的方式来解决。而块级如：div、main、header、table、section 等元素则采用`margin: auto`;

> 注意：不标准做法，块级元素与行内元素可相互转换，因此上述两种方法在块级与行内元素都适用，只是在用时需作适当的转换

### 垂直居中

**适用场景：现代浏览器 IE9+**

**适用场景：IE8+**

#### 表格布局法

#### 行内块法

#### 基于绝对定位的解决方案

HTML:

```html
<main>
  <h1>Center?</h1>
</mian>
```

CSS:
前行条件：元素具有固定的宽度和高度
适用场景：IE7+

```css
main {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -3em; /* 6/2 = 3 */
  margin-left: -9em; /* 18/2 = 9 */
  width: 18em;
  height: 6em;
}
```

当我们采用*CSS3*`calc()`函数时刚可以删掉 margin-top、margin-left 两条属性：前行条件：元素具有固定的宽度和高度
适用场景：IE9+

```css
main {
  position: absolute;
  top: calc(50% - 3em);
  left: calc(50% - 9em);
  width: 18em;
  height: 6em;
}
```

前行条件：元素不定高、定宽（同样适用于定宽、定高）适用场景：IE9+

```css
main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```
