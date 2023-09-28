---
title: CSS之宽高比例布局
date: 2019-04-08 18:55:00
category: css
tags: [css]
---

在某些特定的场景中，如视频播放、可视化图表占位等一些高宽需要固定的比例。如果占位区间是由固定值确定，那么我们皆大欢喜，但在目前的的应用发展中宽高自适应的方式才能满足我们的需求，那么我们该如何这种自适应的**宽高比布局**呢？

### 什么是宽高比？
宽高比也称纵横比，元素的纵横比描述了其宽度和高度之间的比例关系。两种常见的视频宽高比为4：3和16：9。要保持div的宽高比，通过为`padding-top`/`padding-bottom`添加一个百分比值。不同的宽高比具有不同的百分比值。或采用视窗单位`vw`/`vh`设置相应高宽。其中一些如下所示：
| aspect ratio | padding-bottom/top value | vw/vh(width\|height) |
| ------------ | ------------------------ | -------------------- |
| 16:9         | 56.25%                   | 100vw \| 56.25vw     |
| 4:3          | 75%                      | 100vw \| 75vw        |
| 3:2          | 66.66%                   | 100vw \| 66.66vw     |
| 8:5          | 62.5%                    | 100vw \| 62.5vw      |
| 2:1          | 50%                      | 100vw \| 50vw        |


### 利用padding-top/bottom适配
在CSS中`margin`与`padding`的百分比值是根据容器的width来计算，利用这一性质我们可以通过设置`padding-top/bottom`的百分比值实现。  采用这种方法，需要把容器的height设置为0，最终容器实际高度由padding撑出。在此基础上又可分为**伪元素**与**内容绝对定位**两种方案。这也是目前最佳的处理方式。具体实现如下：

> Note: 示例均采用2:1的关系

#### 1、伪元素
> 适用场景：IE8+ 、现代浏览器  
> 优点: DOM节点少、可响应式、需精确到像素  
```html
  <div class="aspect-ration"></div>
```
```css
  .aspect-ration { background-color: #f00; }
  .aspect-ration::before {
    content: "";
    float: left;
    padding-bottom: 50%;
  }
 .aspect-ration::after {
    clear: both;
    content: "";
    display: table;
  }
```

#### 2、内容绝对定位
> 适用场景：IE8+ 、现代浏览器
> 优点: 可响应式、精确到像素 
```html
  <div class="aspect-ration">
    <div class="content"></div>
  </div>
```
```css
.aspect-ratio {
  height: 0;
  overflow: hidden;
  padding-top: 50%;
  background: #f00;
  position: relative;
}
.content {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  /* 或者 */
  /* position: absolute; top: 0; left: 0; width: 100%; height: 100%; */
}
```


### 视窗单位 vw/vh

利用视窗单位是一种相对于屏幕大小的计算方式，同理我们也也可用用`rem`来达到相同的效果。具体实现与视窗单位一样。

> 适用场景：IE10+ 、现代浏览器  
> 优点: DOM节点少、可响应式 

```html
<div class="aspect-ratio"></div>
```
#### 1、固定值
值的计算可参考文章头部表格
```css
/* vw */
.aspect-ratio{ width: 100vw; height: 50vw; }

/*vh */
.aspect-ratio{ width: 100vh; height: 50vh; }
```
#### 2、calc()
> 利用`calc()`可以动态计算相应值，我们只需要知晓相应比值与高宽中一个值，该方式也可以延用到padding适配中。

```css
/* vw */
.aspect-ratio{ width: 100vw; height: calc(100vw * 1 / 2); }

/*vh */
.aspect-ratio{ width: 100vh; height: calc(100vw * 1 / 2); }
```

以上两种方法四种实现方式可根据不同场景选用不同的方式。不过有部分情况下采用padding与伪元素的方式相对更佳。

### 结合居中
在些基础上，我们可能会涉及相关的对宽高比元素进行居中排版，相关细节可参考我上篇文章
[CSS之居中布局](https://juejin.im/post/6844903742198956040)

### 参考
[Aspect Ratio Boxes][1]  
[Maintain the aspect ratio of a div with CSS][2]   
[Padding][3]  
[The-padding][4]  

[1]:https://css-tricks.com/aspect-ratio-boxes/
[2]:https://stackoverflow.com/questions/1495407/maintain-the-aspect-ratio-of-a-div-with-css
[3]:https://developer.mozilla.org/en-US/docs/Web/CSS/padding
[4]:https://www.w3.org/TR/css-box-3/#the-padding