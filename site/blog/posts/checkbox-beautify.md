---
title: 表单元素复选框与单选框视觉优化
date: 2018-03-05 10:58:55
tags: 
- css
- js
category: css
---

谈起表单元素在各浏览器上的表现形式，相信各位前端开发者与 UI 设计师都比较头疼，尤其是 checkBox、radio 以及 select 这三种表单元素展现各异。有时候我们为了效率不得不牺牲 UI 效果，那么有什么方法可以在保障效率的情况下，实现功能并达到与 UI 原稿同样的效果呢？相信大家也都或听过，或用过以下两种方法。

---

### 利用 CSS3 伪类:checked

适用场景：IE9+、现代浏览器

借助该伪类实现复选框与单选框自定义，我们还需要用到与其息息相关的元素`<label>`。因为当其与复选框与单选框关联后，可以起到触发开关的作用。这样我们就可以利用样式给`<lable>`添加我们需要的复选框与单选框样式，然后把真正的复选框与单选框隐藏起来，从而达到自定义的效果。示例代码如下：(示例以复选框为例，单选框与其一致)

```html
<input type="checkbox" id="awesome" />
<label for="awesome">Awesome!</label>
```

```css
input[type="checkbox"] + label::before {
  content: "\a0"; /* 不换行空格 */
  display: inline-block;
  vertical-align: 0.2em;
  width: 0.8em;
  height: 0.8em;
  margin-right: 0.2em;
  border-radius: 0.2em;
  background: silver;
  text-indent: 0.15em;
  line-height: 0.65;
}

/* 选中时 */
input[type="checkbox"]:checked + label::before {
  content: "\2713";
  background: yellowgreen;
}

/* 隐藏复选框 */
input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}

/* 获得焦点时*/
input[type="checkbox"]:focus + label::before {
  box-shadow: 0 0 0.1em 0.1em #58a;
}
/* 禁用时 */
input[type="checkbox"]:disabled + label::before {
  background: gray;
  box-shadow: none;
  color: #555;
}
```

### Switch 开关

开关式按钮在 Web 开发中用到的场景不多，但确实是一个不错的功能，原生表单并没有对其做任何方式来生成，不过我们可能得利用筛选框的模式来模拟出其效果。如下：

```html
<input type="checkbox" id="awesome" />
<label for="awesome">Awesome!</label>
```

```css
input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
input[type="checkbox"] + label {
  display: inline-block;
  background: #ccc;
  border-radius: 0.2em;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  width: 5em;
  height: 2em;
  position: relative;
}

input[type="checkbox"] + label:before {
  display: block;
  content: "";
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: blue;
  transition: all 0.2s;
}
input[type="checkbox"]:checked + label,
input[type="checkbox"]:active + label {
  left: 50%;
}
```

#### iCheck 插件

在现如今，各浏览器对 CSS3 的支持已达到相对完美的情况下，使用 JS 插件来处理复选框这类的表单元素场景也越来越少，基本是为了作低版本浏览器兼容对会考虑。在此处也简单介绍下。插件特点：

* 在不同浏览器和设备上都有相同的表现 — 包括 桌面和移动设备
* 支持触摸设备 — iOS、Android、BlackBerry、Windows Phone
* 支持键盘导航 — Tab、Spacebar、Arrow up/down 和其它快捷键
* 方便定制 — 用 HTML 和 CSS 即可为其设置样式 (试试 6 套针对 Retina 屏幕的皮肤吧)
* 支持 jQuery 和 Zepto JavaScript 工具库
* 体积小巧 — gzip 压缩后只有 1 kb
* 32 种参数 用来定制复选框（checkbox）和单选按钮（radio button）
* 11 个回调事件 用来监听输入框的状态
* 9 个方法 用来通过编程方式控制输入框的状态
* 能够将输入框的状态变化同步回原始输入框中， 支持所有选择器

下载地址：[iCheck](http://icheck.fronteed.com/)  
适用场景：IE8+  
使用方式：

HTML:

```html
<label>
  <input type="checkbox" name="quux[1]" disabled>
  Foo
</label>

<label for="baz[1]">Bar</label>
<input type="radio" name="quux[2]" id="baz[1]" checked>

<label for="baz[2]">Bar</label>
<input type="radio" name="quux[2]" id="baz[2]">
```

JS:

```js
// customize all inputs (will search for checkboxes and radio buttons)
$("input").iCheck();

// handle inputs only inside $('.block')
$(".block input").iCheck();

// handle only checkboxes inside $('.test')
$(".test input").iCheck({
  handle: "checkbox"
});

// handle .vote class elements (will search inside the element, if it's not an input)
$(".vote").iCheck();

// you can also change options after inputs are customized
$("input.some").iCheck({
  // different options
});
```

更多详细配置请查看[官方文档](http://icheck.fronteed.com/)

该插件提供了 6 套样式，一般来说能满足大多场景，若需要个性化，需要自行制图，并调整相关样式，或自定义一套样式文件。

### 开关式按钮钮插件

关于开关式按钮插件有两个个人喜欢的，感兴趣的朋友可以查看下。

* [Switchery](http://abpetkov.github.io/switchery/)
* [bootstrap-switch](http://bootstrapswitch.com/)
