---
title: 根据名称获取查询字段值
date: 2024-05-12T20:08:56+08:00
category: js
tags: [js]
---

```ts
export function searchParamName(attr: string, search?: string) {
  const match = new RegExp(`[?&]${attr}=([^&]*)`).exec(search || window.location.href);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
```
