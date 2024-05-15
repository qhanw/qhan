---
title: 递归查找
date: 2024-05-15T18:08:56+08:00
category: js
tags: [js]
---


```ts
const findNode = function f(data: TreeDataNode[], key: string | number): TreeDataNode | undefined {
  if (!data || !key) return undefined;
  for (let i = 0, len = data.length; i < len; i++) {
    const curr = data[i];
    if (curr.key === key) return curr;
    if (curr.children) {
      const node = f(curr.children, key);
      if (node) return node;
    }
  }
  return undefined;
};
```

