---
title: 浏览器滚动条美化（包括CSS3纯样式定义）
date: 2017-05-05 10:55:58
tags: CSS CSS3 JavaScript Plugs
category: CSS
---

由于平台不同，或用户采用的浏览器不同，或因同浏览器版本不同，都或多或少存在一定的差别，造成与UI设计图有一定的差别，影响用户视觉体验。那么目前这类问题常采用的方法都有那些嗯？

### 纯CSS样式

由CSS样式来定义浏览器滚动条涉及到几条CSS3样式规则，当然其兼容性相对来说也不是太好，适用于对兼容性要求不高的场景。

- `::-webkit-scrollbar`: 滚动条整体部分
- `::-webkit-scrollbar-thumb`: 滚动条里面的小方块，能上下左右移动（取决于是垂直滚动条还是水平滚动条）
- `::-webkit-scrollbar-track`: 滚动条的轨道（里面装有thumb）
- `::-webkit-scrollbar-button`: 滚动条轨道两端的按钮，允许通过点击微调小方块的位置
- `::-webkit-scrollbar-track-piece`: 内层轨道，滚动条中间部分（除去）
- `::-webkit-scrollbar-corner`: 边角，及两个滚动条的交汇处
- `::-webkit-resizer`: 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件

#### 示例

如下：一个简单的自定义滚动条，若要更多的自定义，分别对其扩展即可，写法与常规CSS一样。

```css
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar{
    width: 8px;
    height: 8px;
    background-color: #eee;
}

/*定义滚动条轨道 */
::-webkit-scrollbar-track{ background-color: #eee; }

/*定义滑块 */
::-webkit-scrollbar-thumb{ background-color: #ddd; }
```

### JavaScript实现

JavaScript实现相对其兼容性都比较高，现下浏览器基本都支持，依赖JQuery，以下三款插件也是目前比较常用的解决方案，其优先级（文件重量级）为：SlimScroll > Nicescroll > mCustomScrollbar

- [SlimScroll](//rocha.la/jQuery-slimScroll)：非常小巧的一款滚动插件
- [Nicescroll](//nicescroll.areaaperta.com/)：较小的一款，带有一定的视觉动画效果
- [mCustomScrollbar](//manos.malihu.gr/jquery-custom-content-scroller/)：比较重量级，支持多种自己定义

#### SlimScroll示例：

```javascript
$(function(){
  $('#inner-content-div').slimScroll({
    height: '250px'
  });
});
```

#### Nicescroll示例：

```javascript
$(function() {
  $("html").niceScroll();
});
```

#### mCustomScrollbar示例：

通过JavaScript初始化：

```javascript
(function($){
  $(window).on("load", function(){
    $(".content").mCustomScrollbar();
  });
})(jQuery);
```

通过html初始化：

```html
<div class="mCustomScrollbar" data-mcs-theme="dark">
  <!-- your content -->
</div>
```
