---
title: CSS实现渐变圆角边框
date: 2023-08-25T20:22:22+08:00
category: css
tags: [css, gradient]
description: 利用 css 的属性 mask、mask-composite，实现带有圆角、渐变、且内容背景透明的边框。解决高度个性化网站应用中大量使用图片问题，减少图片请求提升网站整体性能。
---

### TOC

### 背景

让我们先看如下一个场景，在这里我们给出了一个圆角且带有渐变边框的按钮示例。当然根据你的业务场景也可以是其它元素，在这里我们使用按钮来作为切入点。

<CssGradientBtn />

有没有发现在现如今的网站应用中，我们大量的使用到这类场景。在解决这类问题时，我们通常想到的是用`border-image`但很不幸的是该元素并不支持圆角属性。为了更确切的还原设计稿我们不得不直接使用图片来处理，那么有没有办法只用css来解决呢？答案是有的，就是利用css的`mask`与`mask-composite`属性。


### css mask and mask-composite
[mask](https://developer.mozilla.org/en-US/docs/Web/CSS/mask)：通过遮罩或在特定点剪切图像来隐藏部分或全部元素。  
[mask-composite](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-composite)：表示对当前蒙版层与其下面的蒙版层使用的合成操作。  

使用css`mask-composite`、`mask`属性实现圆边框渐角变，不需要复杂的代码、SVG 或多个元素，只需几行行 CSS 代码即可。同时该方式能实现边框内背景透明，满足我们高度定制化网站。但仍需要注意的是，该属性目前兼容性还不是很好，请慎用，查看兼容性：[CanIUse](https://caniuse.com/?search=mask-composite)

> 因为目前这两个CSS属性兼容性问题，因此在使用这两个属性时都需要加上`-webkit-`前缀。当然这也是目前最简单的不使用图片、支持圆角、渐变、背景透明的最佳解决方案。
```css
.css {
  padding: 5px 8px;
  cursor: pointer;
  position: relative;

  &::before {
    /* 1 */
    display: block;
    content: "";
    border-radius: 6px;
    border: 2px solid transparent;
    background: linear-gradient(90deg, #8f41e9, #578aef) border-box; /* 2 */
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0); /* 3 */
    -webkit-mask-composite: xor; /* 4 */
    mask-composite: exclude;
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
```
**解释：**
- 1: 这里需要用到伪元素的原因在于，如果直接在当前元素层实现该css会导致该层内内容显示为白色，因此我们需要一个单独的层来实现渐变圆角边框。
- 2: 使用渐变作为背景，并将其原点设为边框（默认情况下为填充框）。
- 3: 使用该mask属性，我们应用两个不透明层。底部一层将覆盖整个元素，顶部一层仅覆盖填充框（因此不会覆盖边框区域）
- 4: 我们从底部一层中排除顶层，以便仅显示边框区域
- -webkit-: 有些浏览器仍然不支持该属性，所以我们使用带前缀的版本

> 注意：在某些情况下，你可能还需对伪元素增加`z-index:-1`属性。那么此时你面要对当前元素添加值大于等于0的`z-index`属性。

### 其它渐变边框解决方案

> 以下几种解决方案除第一个外，其它都不支持背景透明

#### border-image
与`background-image`类似，在css中已提供`border-image`属性用来专门处理复杂边框样式，我们可以在border中展示`image`和`linear-gradient`。
```css
.css {
  border: 2px solid;
  border-image: linear-gradient(to right, #8f41e9, #578aef) 1;
}
/* or */
.css {
  border: 2px solid;
  border-image-source: linear-gradient(to right, #8f41e9, #578aef);
  border-image-slice: 1;
}
```
> 注意：该方法不支持设置 border-radius，因此只能适用于直角矩形边框。

#### 伪元素 background-image clip
使用一个单独的元素作为渐变色背景放在最下层，上层设置一个透明的 border 和纯色的背景（需要设置 background-clip: padding-box 以避免盖住下层元素的 border）, 上下两层设置相同的 border-radius。
> 当然也可以用其它标签元素代替伪元素，原理一样。
```css
.css {
  border: 2px solid transparent;
  border-radius: 6px;
  position: relative;
  background-color: #fff;
  background-clip: padding-box; 
}

.css::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
  margin: -2px;
  border-radius: inherit;
  background: linear-gradient(to right, #8F41E9, #578AEF);
}
```

#### background-image clip

只需要用到单层元素，为其分别设置 background-clip、background-origin、background-image 这三个属性，每个属性设置两组值，第一组用于设置border内的单色背景，第二组用于设置border上的渐变色。
```css
.css {
  border: 2px solid transparent;
  border-radius: 6px;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #fff, #fff),
    linear-gradient(90deg, #8f41e9, #578aef);
}
```

### 参考
- [Border with gradient and radius](https://dev.to/afif/border-with-gradient-and-radius-387f)
- [Rounded gradient borders in CSS](https://medium.com/@jonas_wolfram/rounded-gradient-borders-in-css-6cfefd754281)
- [-webkit-mask-composite](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-mask-composite)
- [mask-composite](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-composite)
- [5种CSS实现渐变色边框](https://mp.weixin.qq.com/s?__biz=MjM5MDA2MTI1MA==&mid=2649115656&idx=2&sn=3e5739a25b4ba5e89529dac5590b7681&chksm=be586ba5892fe2b34d26580224acf7842a99a73d7ea87bcc33aa231238154685379e03df76e6&scene=27)
- [css实现带圆角的渐变0.5像素border](https://cloud.tencent.com/developer/article/2074149)






