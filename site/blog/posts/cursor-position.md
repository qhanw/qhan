---
title: "文本域光标定位"
date: "2018-06-10"
category: js
tags:
- js
---

在应用中某些场景下，我们会涉及到对表单元素`input`与`textarea`或者是带有属性`contenteditable="true"`的元素，设置自动获取焦点。在这些元素没有内容的情况下那么设置焦点非常容易，然而现实情况往往总是与众不同。那么在遇到这些需求我们该如何做呢？

---

### Input&TextArea


### Contenteditable


```js
placeCaretAtEnd = function(el) {
  el.focus();
  if (
    typeof window.getSelection != "undefined" &&
    typeof document.createRange != "undefined"
  ) {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
};

// 调用方式
placeCaretAtEnd(review.show().find(".textarea")[0]);
```
