---
title: 服务端渲染中如何让时间正确的显示到用户界面
date: 2023-10-05T22:35:35+08:00
category: next
tags: [next, js, ssr]
---

在习惯了`csr`渲染的今天，我们在处理时间时通常采用时间格式化插件如：`dayjs`、`moment`(已停止维护)、`date-fns`等时间库来解决，由于是在客户端，因此很少出现时间不正确的问题，因为这些时间插件已经在基于客户端时区环境帮我们处理好了。但在服务端渲染时，由于服务器一般会统一个时区标准，通常为零时区（也称中时区），以此为标准存储、处理时间，因此在服服器渲染时间数据后，呈现给用户的都是以服务器时区为标准的时间。由于不同用户访问所在时区不同，但时间返回又是服务器时间，不符合生活上直观的时间，因此我们该如何解决这类问题呢？

> 跳过前置概念：[解决方案](#前置处理)

---

### TOC

### 背景

最近在处理`nextjs`服务端渲染时，遇到时间格式化后在，客户端展示晚上8小时的问题，刚开始想着是如何处理服务器时区问题，因此查找了很多关于修服务器配置，以及更改`nodejs`环境配置的资料，但收效甚微。后来在与做后端的朋友聊及此问题时，发现从一开始我的方向都错了。因此在这里总结一下，以供需要的同学处理类似问题。


### 时间基本概念

#### 时间标准

- `GMT`（Greenwich Mean Time）全名是格林威治平时（也称格林威治标准时间），于1884年确立。它规定太阳每天经过位于英国伦敦郊区的皇家格林威治天文台的时间为中午12点。1972年之前`GMT`一直是世界时间的标准。

- `UT`：Universal Time 世界时。根据原子钟计算出来的时间。

- `UTC`：Coordinated Universal Time 协调世界时。因为地球自转越来越慢，每年都会比前一年多出零点几秒，每隔几年协调世界时组织都会给世界时+1秒，让基于原子钟的世界时和基于天文学（人类感知）的格林尼治标准时间相差不至于太大。并将得到的时间称为UTC，这是现在使用的世界标准时间。

> 协调世界时不与任何地区位置相关，也不代表此刻某地的时间，所以在说明某地时间时要加上时区，也就是说GMT并不等于UTC，而是等于UTC+0，只是格林尼治刚好在0时区上。即：GMT = UTC+0  
> 详细介绍请查看：[参考](#参考)

#### 时区

随着火车铁路与其他交通和通讯工具的发展，以及全球化贸易的推动，各地使用各自的当地太阳时间带来了时间不统一的问题，在19世纪催生了统一时间标准的需求，时区由此诞生。

从格林威治本初子午线起，经度每向东或者向西间隔15°，就划分一个时区，在这个区域内，大家使用同样的标准时间。但实际上，为了照顾到行政上的方便，常将1个国家或1个省份划在一起。所以时区并不严格按南北直线来划分，而是按自然条件来划分。另外：由于目前，国际上并没有一个批准各国更改时区的机构。一些国家会由于特定原因改变自己的时区。全球共分为24个标准时区，相邻时区的时间相差一个小时。

![timezome](https://s2.loli.net/2023/10/08/9DS2BdCLiWhkKXR.png)

### 前置处理

搞明白时间时区的关系，那么在处理时间是也就变得相对简单的多了。为了计算方便，首先，我们需要将服务器时间统一为零时区（当然也可以其它时区）。后续在做服务端渲染时会传入客户端所在时区参数。且数据库存储数据时存的为世界标准时间，而非本地时间，除非在存储时，已格式化为本地时间字符串。

### 客户端处理

此处以`nextjs`为例，其它服务端渲染方案可参考此解决方案。封装一个客户端渲染的时间格式化组件，用来替换时间格式化部分。原理是交由客户端渲染后，时间插件处理在格式化时间时，默认采用的是客户端时区来格式化处理。**此方案最为简单**。

```js
"use client";
import dayjs from "dayjs";

type Format = "YYYY-MM-DD HH:mm:ss" | "YYYY-MM-DD";

type DateFormatProps = {
  value?: Date | string | number;
  format?: Format;
  short?: boolean;
};

export default function DateFormat({ short, value, format }: DateFormatProps) {
  const f: Format = short ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss";

  return value ? dayjs(value).format(format || f) : "-";
}
```

### 服务端处理

> 该方案未经验证，此处提供一个解决方案。方案相对于交由客户端渲染来说较为复杂。


#### 获取客户端访问时区

##### Header
服务端可以通过客户端发送的 HTTP 请求头中的 "Accept-Timezone" 字段获取客户端的时区信息。这个字段是由客户端的浏览器自动生成并发送的，通常是形如 "GMT+08:00" 的字符串。

> 注意：不是所有的浏览器都会发送这个字段，因此服务端需要特判是否存在该字段，并在必要时采取其他方法获取客户端时区信息。



### 参考
 
- [GMT、UTC、 时区、JavaScript Date总结](https://juejin.cn/post/7063118893115670536)  
- [Js中的GMT标准时间、UTC调和时间和北京时间](https://juejin.cn/post/7039698747822964766)
- [hydration-mismatch](https://vuejs.org/guide/scaling-up/ssr.html#hydration-mismatch)  
- [客户端、服务器、数据库之间的时区转换](https://developer.aliyun.com/article/890133) 