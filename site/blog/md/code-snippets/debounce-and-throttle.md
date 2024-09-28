---
title: 函数防抖节流
date: 2024-05-15T22:08:56+08:00
category: js
tags: [js]
---

- 防抖
```ts
// js 版本
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

// ts 版本
export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  fn: F,
  wait = 50,
  immediate = false,
) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>) => {
    if (immediate) fn(...args);

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}
```

- 节流
```ts
// js 版本
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

// ts 版本
export function throttle<F extends (...args: Parameters<F>) => ReturnType<F>>(fn: F, wait = 50) {
  let prev = Date.now();
  return (...args: Parameters<F>) => {
    const now = Date.now();
    if (now - prev > wait) {
      fn(...args);
      prev = Date.now();
    }
  };
}

// ts 版本 2
export function throttle<F extends (...args: Parameters<F>) => ReturnType<F>>(fn: F, wait = 50) {
  let inThrottle = false;

  return function (...args: Parameters<F>) {
    if (!inThrottle) {
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);

      fn(...args);
    }
  };
}
```

