---
title: Next.js 中使用 UnoCSS 及其图标样式方案
date: 2023-12-12T18:28:32+08:00
category: nextjs
tags: [nextjs, unocss]
# draft: true
description: Next.js 中使用 UnoCSS 原子 css 解决方案，并使用 UnoCSS icons 纯 css 图标方案替代传统 svg 图标，实现样式与 html 的分离。
---

## TOC

## 前言
前端css方案有很多，从最早的bootstrap到tailwind，中间经历了各种解决方案，如scss、less、css module、style-components、emotion等。到现在风靡整个前端的tailwindcss，它们在不同的场景中具有各自的优点，我们在使用中应结合项目选择合适解决方案。

[UnoCSS](https://unocss.dev/)：一个最新的css方案，它是一个即时原子CSS引擎，设计为灵活和可扩展。在本文中我们将介绍如何在`nextjs`中集成`UnoCSS`，并使用`UnoCSS icon`方案替换传统的`icon`方案实现图标样式的极致的优化。

## 准备
确保已经使用[create-next-app](https://nextjs.org/docs/getting-started/installation)创建了一个基础应用：

``` bash
pnpm dlx create-next-app@latest
```

根据命令行提示，选择您喜欢的配置，在本示例流程中我们选择如下：
```plaintext
What is your project named? next-mdx-app
Would you like to use TypeScript? No / Yes√
Would you like to use ESLint? No / Yes√
Would you like to use Tailwind CSS? No / Yes√
Would you like to use `src/` directory? No√ / Yes
Would you like to use App Router? (recommended) No / Yes√
Would you like to customize the default import alias (@/*)? No / Yes√
What import alias would you like configured? @/*
```
> [!NOTE]
>  选择[Tailwind CSS](https://tailwindcss.com/)是为了方便后续使用`UnoCSS`直接进行替换，当然也可以不选择，直接集成`UnoCSS`，原理都一样，操作上只是少了移除`tailwindcss`的流程。

## 开始

首先移除`tailwindcss`依赖 
```bash
pnpm remove tailwindcss
```

安装`UnoCSS`相关依赖
```bash
pnpm add -D unocss @unocss/postcss
```

创建 `uno.config.ts`文件，并配置样式预设

```ts
// uno.config.ts
import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  // ...UnoCSS options
  presets: [presetUno()],
});
```

在 `globals.css` 移除`tainwindcss`相关代码，然后导入重置浏览器默认样式行为文件，这里选择 `tailwindcss` 样式重置文件，同时导入`unocss` 样式

```diff
+ @import "@unocss/reset/tailwind.css";
+ @unocss all;
- @tailwind base;
- @tailwind components;
- @tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

- @layer utilities {
-  .text-balance {
-    text-wrap: balance;
-  }
- }
```

修改`postcss.config.js`配置，移除`tailwindcss`配置
```diff
module.exports = {
  plugins: {
-    tailwindcss: {},
-    autoprefixer: {},
+    '@unocss/postcss': {
+      content: [
+        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
+        "./components/**/*.{js,ts,jsx,tsx,mdx}",
+        "./app/**/*.{js,ts,jsx,tsx,mdx}",
+      ],
+    },
  },
}
```
到此时我们已经完成了使用`UnoCSS`替换`tailwindcss`全部流程，现在我们来看看最终效果
```bash
pnpm dev
```
在浏览器中访问`http://localhost:3000`，发现没有，此时的页面和初始时使用`tainwindcss`样式一样，我们可以使用`UnoCSS`无缝替换`tailwindcss`。

这里，细心的朋友会发现，我们在`globals.css`中删除了`tailwindcss`的部分代码，以及在`tailwind.config.ts`文件中的主题扩展还未迁移，为什么样式上没有差异呢？这是因为这两处样式本就是`tailwindcss`的样式预置之一，这里是为了作为示例展示给我们。当然在`UnoCSS`也有对应的配置方式，即在`uno.config.ts`文件中作如下处理：
```ts
// uno.config.ts
import { defineConfig, presetUno, presetAttributify } from "unocss";

export default defineConfig({
  // ...UnoCSS options
  presets: [presetUno(), presetAttributify()],

  // 迁移 tailwindcss 的主题配置
  theme: {
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
  },
  // 迁移 globals.css 的工具类配置
  rules: [["text-balance", { "text-wrap": "balance" }]],
});
```

最后，删除`tailwind.config.ts`文件，此时就完成了`tailwindcss`的替换。

> [!NOTE]
> 这里添加了一个[presetAttributify](https://unocss.dev/presets/attributify)预置配置，是为了启用属性模式。这样可以更方便在代码中使用样式，并在主题配置中使用驼峰命令。

> [!TIP]
> 在这里您也可以作其它主题属性进行扩展，也可以定义其它的额外样式，具体请参阅[UnoCSS配置](https://unocss.dev/config/)。



## UnoCSS 图标

> [!TIP]
> 推荐阅读：[聊聊纯 CSS 图标](https://antfu.me/posts/icons-in-pure-css-zh)

一个可以使用任意的，纯CSS的，并集成于`UnoCSS`的图标解决方案，它遵循以下使用约定：
- `<prefix><collection>-<icon>`
- `<prefix><collection>:<icon>`

例如：
```html
<!-- A basic anchor icon from Phosphor icons -->
<div class="i-ph-anchor-simple-thin" />
<!-- An orange alarm from Material Design Icons -->
<div class="i-mdi-alarm text-orange-400" />
<!-- A large Vue logo -->
<div class="i-logos-vue text-3xl" />
<!-- Sun in light mode, Moon in dark mode, from Carbon -->
<button class="i-carbon-sun dark:i-carbon-moon" />
<!-- Twemoji of laugh, turns to tear on hovering -->
<div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
```
除了命名规则外，其使用方式与`tailwindcss`的样式规则使用方式一样。

### 安装

由于在`unocss`包中已经包括了图标的预设，这里只需安装相应的图标库即可：

```bash
pnpm add -D @iconify-json/[the-collection-you-want]
```

`[the-collection-you-want]`为[Iconify](https://iconify.design/)图标的数据源的名称占位。例如，@iconify-json/ri对于Remix Icon、@iconify-json/heroicons对于heroicons。您可以参考[Icones](https://icones.js.org/)或[Iconify](https://icon-sets.iconify.design/)了解所有可用的集合。


然后在`uno.config.ts`文件中添加图标预设
```ts
// uno.config.ts
import { defineConfig, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetIcons({ /* options */ }),
    // ...other presets
  ],
})
```

### 额外属性

配置图标额外属性，使其在实际样式应用中水平居中显示。
```ts
presetIcons({
  extraProperties: {
    'display': 'inline-block',
    "vertical-align": "-.125em",
    // ...
  },
})
```

### 自定义图标

在图标预设中添加自定义图标，如下配置，然后，你可以在你的 html 上使用它：`<span class="i-custom:circle"></span>`

```ts
presetIcons({
  collections: {
    custom: {
      circle: '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"></circle></svg>',
      /* ... */
    },
  }
})
```

完成上述配置后，我们就可以在`html`中的任何地方自由的使用图标样式啦，不同于传统的图标使用方式，使用`UnoCSS icon`只需在标签上写上对应图标的样式名，而不用在从图标包中导入后再使用。

## 参考
- [UnoCSS](https://unocss.dev)
- [tailwindcss](https://tailwindcss.com/)
- [UnoCSS图标预设](https://unocss.dev/presets/icons#configuring-collections-and-icons-resolvers)
- [Next.js UnoCSS](https://github.com/unocss/unocss/tree/main/examples/next)

> [!TIP]
> 如果希望结合使用`sass`预编译样式，另需修改`globals.css`为`globals.scss`，并安装`sass`依赖即可。