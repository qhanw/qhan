---
title: Next.js(v13+) 使用 Contentlayer 创建 MDX 博客
date: 2023-10-22T22:36:58+08:00
category: nextjs
tags: [nextjs, contentlayer, markdown, mdx]
description: Next.js(v13+) 使用 contentlayer 创建 MDX 博客应用，Contentlayer 是一个内容SDK，可验证您的内容并将其转换为类型安全的 JSON 数据，您可以轻松地import将其添加到应用程序的页面中，其具有重量轻，易于使用、 出色的开发体验以及快速的构建能力和高性能页面的优点的。
---

## TOC

## 简介

在本文中，我们将额外介绍一种新工具[contentlayer][1]，在Next.js(v13+)搭建MDX博客应用的方法，它因具有重量轻，易于使用、 出色的开发体验以及快速的构建能力和高性能页面的优点的，以及从源文件加载内容，并自动生成 TypeScript 类型定义，确保正在处理的内容符合您期望的形状，而深受广大用户喜爱。

[Contentlayer][1] 是一个内容 SDK，可验证您的内容并将其转换为类型安全的 JSON 数据，您可以轻松地import将其添加到应用程序的页面中。

>[!IMPORTANT]
> **⚠️ Contentlayer 目前处于测试阶段。在即将发布的 1.0 版本之前，可能仍会发生重大更改。**  

> [!CAUTION]
> **⚠️ 同时由于某些原因该项目已长时间未维护，请慎重考虑后再使用** **[详情](https://github.com/contentlayerdev/contentlayer/issues/429)**

![next-mdx-contentlayer](/images/posts/next-mdx-contentlayer.webp)

## 准备

如上篇文章[Next.js(v13+) 创建 MDX 博客](https://qhan.wang/posts/next-mdx)一样，我们需先确保已经使用[create-next-app](https://nextjs.org/docs/getting-started/installation)创建了一个基础应用，若没有，请先运行以下代码进行创建：

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
选择[Tailwind CSS](https://tailwindcss.com/)是为了方便后续页面排版，当然也可以根据您的喜好不选择。

## 开始

安装 Contentlayer 和 Next.js 插件
```bash
pnpm add contentlayer next-contentlayer
```

使用`withContentlayer`方法包裹Next.js配置，以便将`ContentLayer`钩子挂接到`next dev`和`next build`过程中。

```js
// next.config.js
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true, swcMinify: true }

module.exports = withContentlayer(nextConfig)
```

然后，添加下面行中的代码到`tsconfig.json`或`jsconfig.json`文件中。

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    //  ^^^^^^^^^^^
    "paths": {
      "contentlayer/generated": ["./.contentlayer/generated"]
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".contentlayer/generated"
    // ^^^^^^^^^^^^^^^^^^^^^^
  ]
}
```
这些配置将使告诉Next.js构建过程和你的编辑器在哪里寻找生成的文件，并让它们在你的代码更容易导入。

## 忽略构建输出

将`.contentlayer`目录添加到你的`.gitignore`文件中，以确保你的应用程序的每个构建都有最新生成的数据，并且你不会遇到Git问题。
```plaintext
# .gitignore

# ...

# contentlayer
.contentlayer
```

## 添加配置

在项目的根部创建文件`contentlayer.config.ts`，然后添加以下内容。
```ts
// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

// 文档类型
export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
  },
}))

export default makeSource({ contentDirPath: 'posts', documentTypes: [Post] })
```
该配置指定了一个名为`Post`的文档类型。这些文档是位于项目中的`posts`目录中的Markdown文件。

从这些文件生成的任何数据对象都将包含上面指定的字段，以及包含文件的原始内容和HTML内容的正文字段。`url`字段是一个特殊的计算字段，它会根据源文件中的元属性自动添加到所有发布文档中。


## 添加文章内容

在`/posts`目录中创建几个markdown文件，并向这些文件添加一些内容。如下是一个`/posts/post-01.md`示例：

```markdown
---
title: My First Post
date: 2022-02-22T22:22:22+0800
---

This is my first post ...
```

在此目录中将有三个帖子示例：
```plaintext
posts/
├── post-01.md
├── post-02.md
└── post-03.md
```

## 添加网站代码

创建`/app/posts/page.tsx`用于展示所有Post文章列表。请注意，在尝试从`contentlayer/regenerated`导入时会出现错误，这是正常的，稍后将通过运行开发服务器来修复它。
```tsx
// app/page.tsx
import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";

function PostCard(post: Post) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link
          href={post.url}
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
        >
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
      <div
        className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0"
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      />
    </div>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="mx-auto max-w-xl py-8">
      {posts.map((post, idx) => (<PostCard key={idx} {...post} />))}
    </div>
  );
}
```

运行Next.js开发服务，并访问localhost:3000/posts查看文章列表。
```bash
pnpm dev
```

## 添加Post布局

现在创建`app/posts/[slug]/page.tsx`页面，并添加以下代码
```tsx
// app/posts/[slug]/page.tsx
import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  return { title: post.title }
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <div className="[&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </article>
  )
}

export default PostLayout;
```

现在，点击文章列表上的链接，将进入一文章阅读页面。

## 开启MDX

在`Contentlayer`中使用MDX只需在配置文件`contentlayer.config.ts`中添加如下代码即可

```diff
...
export const Post = defineDocumentType(() => ({
...
+ contentType: 'mdx',
...
}));
...
```

创建一个`MDX`使用的组件`/app/posts/[slug]/mdx/Button.tsx`。
```tsx
"use client";

import { useState } from "react";

export default function Button({ text }: { text: string }) {
  const [toggle, setToggle] = useState(false);

  return (
    <button onClick={() => setToggle(!toggle)}>
      {toggle ? text : "Click Me"}
    </button>
  );
}
```
> [!NOTE]
> 在[App Router](https://nextjs.org/docs/app/building-your-application/routing#the-app-router)中，需对客户端渲染组件添加`use client`;


然后，在`app/posts/[slug]/page.tsx`文件中作如下调整

```diff
...
+ import { useMDXComponent } from "next-contentlayer/hooks"；
+ import Button from "./mdx/Button";
...
const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

+  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="mx-auto max-w-xl py-8">
 ...
-     <div className="[&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: post.body.html }} />

+     <div className="[&>*]:mb-3 [&>*:last-child]:mb-0">
+       <MDXContent components={{ Button }} />
+     </div>
    </article>
  );
};

...
```

最后删除`/app/posts/page.tsx`文件中如下代码
```diff
- <div
-   className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0"
-   dangerouslySetInnerHTML={{ __html: post.body.html }}
-  />
```
此时，带交互功能的文件文章配置就完成啦。

## 扩展

这里仅介绍关于contentlayer的一些特殊的扩展配置，其它的参考[Next.js(v13+) 创建 MDX 博客](https://qhan.wang/posts/next-mdx#%E6%89%A9%E5%B1%95)文章中的扩展，其原理一样，这里不再赘述。**异常处理解决方式也同样。**

### MDX插件配置

可以通过[remark][2]、[rehype][3]来转换 MDX 内容。例如，使用`remark-gfm`来实现 GitHub Flavored Markdown 来支持。

```ts
// contentlayer.config.ts
import { makeSource } from '@contentlayer/source-files'
import highlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

export default makeSource({
  // ...
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [highlight],
  },
})
```

### 阅读时间

通过[reading-time](https://github.com/ngryman/reading-time)可以为我们的文章添加阅读时间、文章字数元数据。

在配置文件`contentlayer.config.ts`中添加以下代码可为`contentlayer`添加文章阅读时长
```diff
...
+ import readingTime from "reading-time";

// 文档类型
export const Post = defineDocumentType(() => ({
...
  computedFields: {
    ...
+   readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
  },
}));
...
```

## 相关链接

- [Contentlayer][1]
- [remark][2]
- [rehype][3]
- [Next.js(v13+) 创建 MDX 博客][4]

[1]: https://contentlayer.dev/
[2]: https://github.com/remarkjs/remark
[3]: https://github.com/rehypejs/rehype
[4]: https://qhan.wang/posts/next-mdx