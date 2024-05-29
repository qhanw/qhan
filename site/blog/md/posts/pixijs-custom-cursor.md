---
title: PixiJS定义鼠标样式
date: 2024-05-20T20:22:38+08:00
category: canvas
tags: [canvas, PixiJS]
description: 定义以PixiJS开发的游戏、图形编辑器等应用中的鼠标样式，实现鼠标样式个性化，增强人机交互的直观性、趣味性，提升游戏、编辑器中鼠标交互操作的用户体验。
---

在`PixiJS`开发中，处理鼠标样式的方式非常简单，其本质上仍然是采用`CSS`的`cursor`属性的配置方式。因此，只需熟悉`cursor`属性便可很好的在`PixiJS`处理样式。

先让我们复习一样`CSS`的`cursor`属性：

### CSS cursor

`cursor` 属性为零个或多个`<url>`值，它们之间用逗号分隔，最后必填一个关键字值（**当然也可只写一个关键值，指定具体样式**）。

- 每个`<url>`指向一个图像文件，浏览器将尝试加载指定的第一个图像，如果无法加载则返回下一个图像，如果无法加载图像或未指定图像，则使用关键字值代表的指针类型。

- 每个`<url>`后面都可选跟一对空格分隔的数字`<x><y>`表示偏移。它们用来设置指针的热点 (即自定义图标的实际点击位置)，位置相对于图标的左上角。

- `<url>`： url(…)或者逗号分隔的url(…), url(…), …，指向图片文件。用大于一个`<url>()`值提供后备，以防某些指针图片类型不被支持。最后必须提供一个非 URL 后备值。

- `<x><y>`：可选 x，y 坐标。两个小于 32 的无单位非负数。

如下示例：`<url>`值指定两个图像，为第二个图像提供`<x><y>`坐标，如果两个图像都无法加载，则返回progress关键字值：

```css
cursor: url(one.svg), url(two.svg) 5 5, progress;
```

`cursor`样式属性值：
```css
cursor: [
  [<url> [<x> <y>]?,]*
  [
    auto | default | none | context-menu | help | pointer |
    progress | wait | cell | crosshair | text | vertical-text |
    alias | copy | move | no-drop | not-allowed | grab | grabbing |
    e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize |
    sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize |
    col-resize | row-resize | all-scroll | zoom-in | zoom-out |
  ]
]
```

**综上，`CSS`的`cursor`属性值即为PixiJS的鼠标样式，我们也可以对`cursor`属性值，在`PixiJS`中使用`url(...)`资源进行全部重写。**



### 全局定义

在项目初始化位置，可以通过定义全局鼠标样式，达到在`PixiJS`应用内通用，此时，只需在需要改变鼠标样式的地方使用定义的名称即可。如下示例中，按钮使用了`hover`自定义样式，此处`hover`也可配置成其它任意名称。
```ts
import { Application, Sprite, Texture } from 'pixi.js';

(async () =>
{
    const app = new Application();
    await app.init({ background: '#1099bb', resizeTo: window });
    document.body.appendChild(app.canvas);

    // CSS style for icons
    const defaultIcon = 'url(\'https://pixijs.com/assets/bunny.png\'),auto';
    const hoverIcon = 'url(\'https://pixijs.com/assets/bunny_saturated.png\'),auto';

    // Add custom cursor styles
    app.renderer.events.cursorStyles.default = defaultIcon;
    app.renderer.events.cursorStyles.hover = hoverIcon;

    // Create some textures from an image path
    const textureButton = Texture.from('https://pixijs.com/assets/button.png');
    const button = new Sprite(textureButton);

    button.eventMode = 'static';
    // 使用所定义样式
    button.cursor = 'hover';

    app.stage.addChild(button);
})();
```
在上面例子中`cursorStyles`可单个属性配置，也可一次性批量配置，如下：
```ts
// 一次情配置多种鼠标自定义样式
app.renderer.events.cursorStyles = {
  default: defaultIcon,
  hover: hoverIcon,
  myPointer: myPointerIcon
}
```

>  cursorStyles[mode]还可设成一个自定义函数，这样就可以在函数里边设置canvas的style，来实现自定义光标。


### 局部配置

局部配置方式是指在，程序中需要使用的地方直接改变鼠标样式，如下，我们将自定义样式地址直接赋值给了按钮。
```ts
...
button.eventMode = 'static';
button.cursor = 'url(\'https://pixijs.com/assets/bunny.png\'),auto';
...
```

### 通过修改`canvas`元素样式

该方式是直接找到根节点`canvas`元素，通过原生js的能力来实现鼠标样式自定义，值的方式与上面配置方式一样，其本质就是`CSS`的`cursor`。
```ts
app.canvas.style.cursor = 'url(\'https://pixijs.com/assets/bunny.png\'),auto';
```









### 参考

- [cursor](https://css-tricks.com/almanac/properties/c/cursor/)
- [CSS Basic User Interface Module Level 3 (CSS3 UI)](https://www.w3.org/TR/css-ui-3/#cursor)<br/>
- [MDN cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)

