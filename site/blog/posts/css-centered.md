---
title: CSS元素居中布局
date: 2018-12-18T10:55:00+08:00
category: css
tags: [css]
description: 几种常用的纯CSS实现元素居中展示方案，包含了水平居中、垂直居中、水平垂直居中。不同方案适用于不同场景，可根据具体场景选择合适的方案，主要用到flex、position、transform等css属性。
---

在前端开发中，我们经常会遇到各种上不同场景的关于居中的布局，一般水平居中是相对简单，而 垂直居中与水平垂直则相应要麻烦些。在下来我们对各种场景一一列出解决方案。
### 水平居中
水平居中相对于其它几中居中排列要简单的多，按标签元素可分为行内元素与块级元素居中：

#### 1、行内元素
> 如：`a` `img` `span` `em` `b` `small` 此类标签元素及文本

```css
    .center { text-align: center; }
```
#### 2、块级元素
> 如：`div` `section` `header` `p`此类标签元素，需要设置宽度

```css
    .center { margin: 0 auto; }
```

### 垂直居中

#### 1、line-height
针对有且仅有一行内容时可行。将line-height值设为相对应高度即可。

#### 2、vertical-align
针对行内元素如`img` `span`等元素，其对齐相对于文本基线。达不到完美的垂直居中，不常用。

#### 3、其它
关于垂直居中其它方式参考水平垂直居中。

---


### 水平垂直居中
在水平垂直居中的场景中，可分为定宽定高、不定宽不定高，按不同应用场景可分如下几种方式，在布局中实际情况而定。

#### 1、Flex方式
> 适用场景：IE9+、现代浏览器、响应式、不定宽不定高

```html
<section class="center">
    <div>水平垂直居中</div>
</section>
```

```css
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

#### 2、绝对定位方式
> 适用场景：IE8+、及现代浏览器、响应式

```html
<section class="center">
    水平垂直居中
</section>
```

```css
.center {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}
```

#### 3、绝对定位+transform方式
> 适用场景：IE9+、及现代浏览器、响应式、不定宽不定高

```html
<section class="center">
    水平垂直居中
</section>
```

```css
.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}
```

#### 4、绝对定位+calc函数
> 适用场景：IE9+、及现代浏览器、定宽定高

```html
<section class="center">
    水平垂直居中
</section>
```

```css
.center {
  width: 200px;
  height: 200px;
  position: absolute;
  top: calc(50% - 100px);
  left: calc(50% - 100px);
  
   
}
```

#### 5、绝对定位+margin负属性
> 适用场景：IE6+、及现代浏览器、定宽定高

```html
<section class="center">
    水平垂直居中
</section>
```

```css
.center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    margin-left: -100px;
    margin-top: -100px;
}
```
#### 6、Table-cell方式
> 适用场景：IE8+、及现代浏览器、不定宽不定高

```html
<div class="table">
  <div class="table-cell">
    <div class="center-content">
      水垂直居中
    </div>
  </div>
</div>
```

```css
.table{ display: table; }
.table-cell {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.center-content{
  width: 50%;
  margin: 0 auto;
}
```