---
title: CSS渐变圆角边框
date: 2023-08-25T20:20:55+08:00
category: css
tags: [css, gradient]
---

### TOC

### 背景



### 解决方案

```css
 .css{
  padding: 5px 8px;
  cursor: pointer;
  position: relative;
  justify-content: center;

  &:before {
    display: block;
    content: '';
    border-radius: 6px;
    border: 1px solid transparent;
    background: linear-gradient(
        90deg,
        rgba(222, 23, 213, 1),
        rgba(174, 26, 235, 1),
        rgba(215, 93, 74, 1),
        rgba(253, 215, 51, 1)
      )
      border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    position: absolute;
    width: 100%;
    height: 100%;
    }
```


### 参考
- [Border with gradient and radius](https://dev.to/afif/border-with-gradient-and-radius-387f)
- [Rounded gradient borders in CSS](https://medium.com/@jonas_wolfram/rounded-gradient-borders-in-css-6cfefd754281)
- [-webkit-mask-composite](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-mask-composite)
- [5种CSS实现渐变色边框](https://mp.weixin.qq.com/s?__biz=MjM5MDA2MTI1MA==&mid=2649115656&idx=2&sn=3e5739a25b4ba5e89529dac5590b7681&chksm=be586ba5892fe2b34d26580224acf7842a99a73d7ea87bcc33aa231238154685379e03df76e6&scene=27)
- [css实现带圆角的渐变0.5像素border](https://cloud.tencent.com/developer/article/2074149)






