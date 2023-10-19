---
title: NextJS 13 中创建 MDX 博客
date: 2023-10-10T18:28:32+08:00
category: nextjs
tags: [nextjs, markdown, mdx, contentlayer, next-mdx-remote]
draft: true
description: 使用 @next/mdx、next-mdx-remote、contentlayer 在 NextJS 13 中创建 MDX 博客。
---

### TOC


### 基本概念

在正式使用nextjs搭建mdx博客网站应用前，我们先来了解一些基本的概念，这样有助于我们后续对内容的创作，以及对文章内容渲染有一个预期的结果。
#### Markdown

[Markdown](https://daringfireball.net/projects/markdown/syntax)是一种用于格式化文本的轻量级标记语言。它允许您使用纯文本语法进行编写并将其转换为结构有效的 HTML。它通常用于在网站和博客上编写内容。

输入：
```markdown
这是**我**的个人[网站](https://qhan.wang/)。
```

输出：
```html
<p>这是<strong>我</strong>的个人<a href="https://qhan.wang/">网站</a>。</p>
```

#### MDX

[MDX][1]是 Markdown 的超集，允许您在 Markdown 内容中使用 [JSX](https://react.dev/learn/writing-markup-with-jsx)。这是在内容中添加动态交互性和嵌入 React 组件的强大方法。

---

### 开始

在这里，我们将分别介绍三种搭建MDX博客网站应用的方法，分别是[@next/mdx][2]、[next-mdx-remote][3]、[contentlayer][4]他们有各自的优缺点，可以根据自身情况选择使用那一种方式。

当然，我更推荐使用 **Contentlayer** 的方式，因为他更轻量、更简单、高性能等优点。以下为三种方式差异，可以根据自身情况，自由选择，接下来我们也将分别介绍三种方式的搭建流程。

| 名称                                | 差异描述                                                                                                                                                                |
| :---------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@next/mdx](#@next/mdx)             | nextjs官方提供的markdown 和 MDX解决方案，它从本地文件获取数据，允许您直接在`/pages`或`/app`目录中创建带有扩展名`.mdx`的页面。对于简单内容页面来说相对实用。             |
| [next-mdx-remote](#next-mdx-remote) | 不处理从源加载内容，无论是本地还是远程，因此需要我们自己编写代码实现，但也因此相对灵活，在处理过程中需要配合相关插件来实现内容转换处理，如：`gray-matter`等。           |
| [contentlayer](#contentlayer)       | 具有重量轻，易于使用、 出色的开发体验以及快速的构建能力和高性能页面的优点的。它从源文件加载内容，并自动生成 TypeScript 类型定义，以确保正在处理的内容符合您期望的形状。 |




好了，让我们开始真正的博客搭建之旅吧！首先确保您已经使用`create-next-app`创建了一个博客应用，若没有请运行如下代码创建项目应用：

```
pnpm dlx create-next-app@latest
```

> 详细的安装教程请查看 nextjs 文档：[自动安装](https://nextjs.org/docs/getting-started/installation)

#### @next/mdx

安装渲染MDX所需的软件包

```bash
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

创建一个`mdx-components.tsx`文件，在您应用的根目录下(`/app`或者`/src`目录下面)：   
> 注意：没有这个文件在`App Router`模式下将无法正常运行。如果使用`Pages Router`则可忽略这一步。
```ts
import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {...components }
}
```

更新项目根目录下的next.config.js文件，将其配置为使用MDX

```ts
const withMDX = require('@next/mdx')()
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}
 
module.exports = withMDX(nextConfig)
```

然后，在您项目的`/app`目录下创建一个MDX页面：
```html
your-project
├── app
│   └── my-mdx-page
│       └── page.mdx
└── package.json
```
现在你可以直接在MDX页面中使用markdown和导入React组件
```markdown
import { MyComponent } from 'my-components'
 
# Welcome to my MDX page!
 
This is some **bold** and _italics_ text.
 
This is a list in markdown:
 
- One
- Two
- Three
 
Checkout my React component:
 
<MyComponent />
```

导航到`/my-mdx-page`路由，将显示您渲染的MDX。

以上即为`@next/mdx`实现方式，有没有很简单。但相对也有一定局限情，因为他只处理本地的MDX页面，如果我们的MDX在其它地方呢，接下来两种方式专门解决这类问题。

#### Next mdx remote

[next-mdx-remote][3]允许您在其它地方动态加载`markdown`或`MDX`内容文件，并在客户端上正确渲染的轻型实用程序。

![next-mdx-remote](/images/posts/next-mdx-remote.png)


首先，在`posts`目录中创建几个markdown文件，并向这些文件添加一些内容。

这是一个`posts/post-01.md`示例：
```markdown
---
title: My First Post
date: 2022-02-22T22:22:22+0800
---

Ullamco et nostrud magna commodo nostrud ...
````
在此结构中有三个帖子示例：
```
posts/
├── post-01.md
├── post-02.md
└── post-03.md
```

然后，创建 posts 资源获取`/lib/posts.ts`文件：
在这里我们需要使用[gray-matter](https://github.com/jonschlinkert/gray-matter)插件来解析 markdown 内容。
```ts
import fs from "fs";
import { join } from "path";

import matter from "gray-matter";
const postsDir = join(process.cwd(), "posts");

type MetaData = {
  title: string;
  date: Date;
  category: string;
  tags?: string[];
  description?: string;
  draft?: boolean;
};

// 根据文件名读取 markdown 文档内容
export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");

  const fullPath = join(postsDir, `${realSlug}.md`);

  const fileContents = fs.readFileSync(fullPath, "utf8");

  // 解析 markdown 元数据
  const { data, content, excerpt } = matter(fileContents, {
    excerpt: true,
  });

  // 配置文章元数据
  const meta = { ...data } as MetaData;

  return { slug: realSlug, meta, content, excerpt };
}

// 获取 /posts文件夹下所用markdown文档
export function getAllPosts() {
  const slugs = fs.readdirSync(postsDir);

  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // 排除草稿文件
    .filter((c) => !/\.draft$/.test(c.slug));
    // .filter((c) => !c.meta.draft);
  return posts.sort((a, b) => +b.meta.date - +a.meta.date);
}

```



安装所需的软件包

```bash
pnpm add next-mdx-remote
```

创建文章呈现页面`/app/posts/[slug]/page.tsx`
```tsx
```

创建一个`/app/posts/[slug]/mdx/Button.tsx`MDX使用的组件。
```tsx
"use client";

import { useState } from "react";

export default function Button({ text }: { text: string }) {
  const [toggle, setToggle] = useState(false);

  return (
    <button
      className="bg-slate-700 text-white rounded-md px-4 py-2"
      onClick={() => setToggle(!toggle)}
    >
      {toggle ? text : "Click Me"}
    </button>
  );
}
```
> 注意：在[App Router](https://nextjs.org/docs/app/building-your-application/routing#the-app-router)中，需对客户端渲染组件添加`use client`;




#### Contentlayer  

[Contentlayer][4] 是一个内容 SDK，可验证您的内容并将其转换为类型安全的 JSON 数据，您可以轻松地import将其添加到应用程序的页面中。

> **⚠️ Contentlayer 目前处于测试阶段。在即将发布的 1.0 版本之前，可能仍会发生重大更改。**

![next-mdx-contentlayer](/images/posts/next-mdx-contentlayer.webp)




<Button text="my button"/>


### 内容优化&异常处理

在解决MDX内容呈现后，我们可能还需要对MDX文档内容的`frontmatter`数据提取、表格、目录、阅读时间、字数统计以及代码内容美化等操作。此时，我们需要用到[remark][5]、[rehype][6]生态中的一些插件，使用方式也很简单。参见如下配置：

#### @next/mdx
```ts
// next.config.js
const withMDX = require('@next/mdx')({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
module.exports = withMDX()
```

#### next-mdx-remote

#### contentlayer

#### 代码高亮

#### Table of Content


#### 时间格式化
因为我们使用nextjs来搭建博客，并采用服务端渲染方式，因此，在文章内容的发布时间与编辑时间上，需要带上时区信息。否则，在渲染时会出现服务器与客户端时区不一致，导致时间错误问题。对于时间的格式化处理，我们统一采用**客户端渲染**方式。具体请查看[SSR Timezone](https://qhan.wang/posts/ssr-timezone)。

#### 插件异常

主要为`remark-gfm`插件错误。

撰写本示例时，正值`remarkjs`相关插件升级中，因些，在使用`next-mdx-remote`、`contentlayer`时出现渲染错误，此时，我们只需回退`remark-gfm`到上一个大版本即可。


### 相关链接

- [MDX][1]
- [@next/mdx][2]
- [next-mdx-remote][3]
- [contentlayer][4]
- [remark][5]
- [rehype][6]


### 参考

- [How to install Contentlayer in nextjs](https://medium.com/frontendweb/how-to-install-contentlayer-in-nextjs-4a08fb37c87d)
- [使用 Contentlayer 和 Next 构建基于 MDX 的博客](https://devpress.csdn.net/react/62eda913c6770329307f2a85.html)


[1]: https://mdxjs.com/
[2]: https://www.npmjs.com/package/@next/mdx
[3]: https://github.com/hashicorp/next-mdx-remote
[4]: https://contentlayer.dev/
[5]: https://github.com/remarkjs/remark
[6]: https://github.com/rehypejs/rehype