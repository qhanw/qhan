---
title: 对象深度克隆
date: 2024-04-10T20:08:56+08:00
category: js
tags: [js]
---

```ts
function clone(obj) {
  let buf;
  switch (Object.prototype.toString.call(obj)) {
    case "[object Array]":
      buf = [];
      let i = obj.length;
      while (i--) {
        buf[i] = clone(obj[i]);
      }
      break;
    case "[object JSON]":
      if (window.JSON) {
        buf = {};
        for (let i in obj) {
          buf[i] = clone(obj[i]);
        }
        return buf;
      }
      break;
    default:
      return obj;
      break;
  }

  /*  if(obj instanceof Array){
        buf = [];
        let i = obj.length;
        while (i--){
            buf[i] = clone(obj[i]);
        }
        return buf;
    }else if(obj instanceof Object){
        buf = {};
        for (let k in obj){
            buf[k] = clone(obj[k]);
        }
        return buf;
    }else{
        return obj;
    }*/
}

```
