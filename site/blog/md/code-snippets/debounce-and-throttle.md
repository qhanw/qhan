---
title: 函数防抖节流
date: 2024-05-15T22:08:56+08:00
category: js
tags: [js]
---

- 防抖
```ts
function debounce(fn, wait = 50, immediate) {
  let timer;
  return function () {
    if (immediate) {
      fn.apply(this, arguments);
    }
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  };
}
```

- 节流
```ts
function throttle(fn, wait) {
  let prev = new Date();
  return function() {
    const args = arguments;
    const now = new Date();
    if (now - prev > wait) {
      fn.apply(this, args);
      prev = new Date();
    }
  };
}
```

