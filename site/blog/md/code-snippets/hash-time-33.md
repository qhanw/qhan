---
title: 哈希time33
date: 2024-05-12T20:08:56+08:00
category: js
tags: [js]
---

```ts
function time33(str){
    for(var i = 0, len = str.length,hash = 5381; i < len; ++i){
       hash += (hash << 5) + str.charAt(i).charCodeAt();
    };
    return hash & 0x7fffffff;
};
```
