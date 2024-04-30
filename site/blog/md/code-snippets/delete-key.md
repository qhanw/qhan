---
title: 删除对像中的键值对
date: 2024-04-10T20:08:56+08:00
category: js
tags: [js]
---

```tsx
const obj = { name: 'Amy',  age: '18', sex: 'fem' }
// ES5方式, 在原对象处理
delete obj.name

// ES6 Reflect 在原对象处理
Reflect.deleteProperty(obj, 'name')

// ES6 解构 新生成一个对象
const {name, ...rest} = obj;
console.log(rest)
```
