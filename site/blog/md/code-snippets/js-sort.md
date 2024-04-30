---
title: JavaScript版几种常见排序算法
date: 2024-04-08T20:08:56+08:00
category: js
tags: [js]
---

 * 系统方法：在`firefox`下系统的这个方法非常快
```ts
const systemSort = (arr: number[]) => arr.sort((a, b) => a - b);
```

 * 冒泡排序：最简单，也最慢，貌似长度小于7最优
```ts
const bubbleSort = (arr: number[]) => {
  var i = arr.length,
    j,
    tempExchangeVal;
  while (i > 0) {
    for (j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        tempExchangeVal = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tempExchangeVal;
      }
    }
    i--;
  }
  return arr;
};
```


 * 插入排序：比冒泡快，比快速排序和希尔排序慢，较小数据有优势
```ts
const insertSort = (arr: number[]) => {
  let i = 1,
    j,
    len = arr.length,
    key;
  for (; i < len; i++) {
    j = i;
    key = arr[j];
    while (--j > -1) {
      if (arr[j] > key) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }
    arr[j + 1] = key;
  }
  return arr;
};
```

 * 快速排序：这是一个非常快的排序方式，V8的sort方法就使用快速排序和插入排序的结合
```ts
const quickSort = (arr: number[]) => {
  function sort(prev: number, numSize: number) {
    var nonius = prev;
    var j = numSize - 1;
    var flag = arr[prev];
    if (numSize - prev > 1) {
      while (nonius < j) {
        for (; nonius < j; j--) {
          if (arr[j] < flag) {
            arr[nonius++] = arr[j]; //a[i] = a[j]; i += 1;
            break;
          }
        }
        for (; nonius < j; nonius++) {
          if (arr[nonius] > flag) {
            arr[j--] = arr[nonius];
            break;
          }
        }
      }
      arr[nonius] = flag;
      sort(0, nonius);
      sort(nonius + 1, numSize);
    }
  }

  sort(0, arr.length);
  return arr;
};
```

 * 希尔排序：在非chrome下数组长度小于1000，希尔排序比快速更快

```ts
const shellSort = (arr: number[]) => {
  let len = arr.length;
  for (
    let fraction = Math.floor(len / 2);
    fraction > 0;
    fraction = Math.floor(fraction / 2)
  ) {
    for (let i = fraction; i < len; i++) {
      for (
        let j = i - fraction;
        j >= 0 && arr[j] > arr[fraction + j];
        j -= fraction
      ) {
        let temp = arr[j];
        arr[j] = arr[fraction + j];
        arr[fraction + j] = temp;
      }
    }
  }

  return arr;
};
```
