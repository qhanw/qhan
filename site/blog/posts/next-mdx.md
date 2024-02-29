---
title: Next.js(v13+) 创建 MDX 博客
date: 2023-10-10T18:28:32+08:00
category: nextjs
tags: [nextjs, markdown, mdx, next-mdx-remote]
description: Next.js(v13+) 使用 @next/mdx、next-mdx-remote 创建 MDX 博客应用。本文中主要描述使用 next-mdx-remote 加载远端 markdown 文章内容的处理过程，以及过程中的一些优化及异常处理。
---

## TOC

## 简介

在本文中，我们将基于Next.js(v13+)分别介绍两种搭建MDX博客应用的方法，分别是[@next/mdx][2]、[next-mdx-remote][3]他们有各自的优缺点，可以根据自身情况选择使用那一种方式。

| 名称                                | 差异描述                                                                                                                                                      |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [@next/mdx](#@next/mdx)             | Next.js官方提供的markdown 和 MDX解决方案，它从本地文件获取数据，允许您直接在`/pages`或`/app`目录中创建带有扩展名`.mdx`的页面。对于简单内容页面来说相对实用。  |
| [next-mdx-remote](#next-mdx-remote) | 不处理从源加载内容，无论是本地还是远程，因此需要我们自己编写代码实现，但也因此相对灵活，在处理过程中需要配合相关插件来实现内容转换处理，如：`gray-matter`等。 |


好了，让我们开始真正的MDX应用搭建之旅吧！

## 准备

确保已经使用[create-next-app](https://nextjs.org/docs/getting-started/installation)创建了一个基础应用，若没有，请先运行以下代码进行创建：

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

快捷浏览：[Next mdx](#next-mdx)、[Next mdx remote](#next-mdx-remote)

## Next mdx

安装渲染MDX所需的软件包

```bash
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

在您应用的根目录下(`/app`或`/src`目录的父级目录)，创建一个`mdx-components.tsx`文件：  

> [!NOTE]
> 没有这个文件在`App Router`模式下将无法正常运行。如果使用`Pages Router`则可忽略这一步。

```ts
import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {...components }
}
```

更新项目根目录下的`next.config.js`文件，将其配置为使用MDX

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
```plaintext
your-project
├── app
│   └── my-mdx-page
│       └── page.mdx
└── package.json
```
现在，在其它地方创建一个react组件`my-components.tsx`，然后就可以直接在`my-mdx-page/page.mdx`文件中直接使用markdown和导入创建的react组件
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

导航到`/my-mdx-page`路由，将看到您所创建的MDX页面了。



以上即为[@next/mdx](https://nextjs.org/docs/app/building-your-application/configuring/mdx#nextmdx)官方实现方式，非常简单。但相对也有一定局限情，因为它只处理本地的MDX页面，需要以Next.js路由的方式来管理MDX文章内容。


## Next mdx remote

[next-mdx-remote][3]允许您在其它地方动态加载`markdown`或`MDX`内容文件，并在客户端上正确渲染的轻型实用程序。

![next-mdx-remote](/images/posts/next-mdx-remote.png)


### 添加文章内容

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

### 解析内容

安装`MDX`解析所需的软件包

```bash
pnpm add next-mdx-remote gray-matter
```

创建 posts 资源获取`/lib/posts.ts`文件：
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
### 添加网站代码
创建`/app/posts/page.tsx`用于展示所有Post文章列表。
```tsx
import Link from "next/link";

import { getAllPosts } from "@/lib/posts";

export default async function Posts() {
  const posts = await getAllPosts();

  return (
    <div className="prose grid gap-9 m-auto">
      {posts?.map((post: any) => (
        <Link
          href={`/posts/${post.slug}`}
          className="group font-normal overflow-hidden cursor-pointer no-underline transition fade-in-up "
          key={post.slug}
        >
          <div className="text-xl text-gray-600 group-hover:text-brand truncate ease-in duration-300">
            {post.meta?.title}
          </div>
          <time className="text-gray-400 text-sm leading-none flex items-center">
            {post.meta?.date?.toString()}
          </time>
        </Link>
      ))}
    </div>
  );
}
```
运行Next.js开发服务，并访问localhost:3000/posts查看文章列表。
```bash
pnpm dev
```

### 添加Post布局
创建文章呈现页面`/app/posts/[slug]/page.tsx`
```tsx
import { MDXRemote } from "next-mdx-remote/rsc";

import { getPostBySlug, getAllPosts } from "@/lib/posts";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getPost(params: Props["params"]) {
  const post = getPostBySlug(params.slug);
  return { post };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Post({ params }: Props) {
  const { post } = await getPost(params);

  return (
    <>
      <h1 className="text-2xl">{post.meta.title}</h1>
      <time className="text-gray-600">{post.meta?.date.toString()}</time>
      <MDXRemote source={post.content} components={{}} options={{}} />
    </>
  );
}

```

### 引用组件
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

在文章呈现页面`/app/posts/[slug]/page.tsx`中引入创建的组件
```diff
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";

import { getPostBySlug, getAllPosts } from "@/lib/posts";

+ import Button from "./mdx/Button";

...

export default async ({ params }: Props) => {
  const { post } = await getPost(params);

  return (
    <>
      ...
+     <MDXRemote source={post.content} components={{Button}} options={{}} />
    </>
  );
};
```

然后，在`/posts`文件夹中的文章中使用定义的`Button`组件
```diff
---
title: My First Post
date: 2022-02-22T22:22:22+0800
---

This is my first post ...

+ <Button text="Button" />
```

现在，导航到`/posts/post-01`，将看到一个带有一个按钮的可交互的Markdown文档。🎉🎉🎉🎉🎉

## 扩展

在解决MDX内容呈现后，我们可能还需要对MDX文档内容的`frontmatter`数据提取、表格、目录、阅读时间、字数统计以及代码内容美化等操作。此时，我们需要用到[remark][4]、[rehype][5]生态中的一些插件，使用方式也很简单。参见如下配置：

### Next mdx

#### 布局

在`@next/mdx`中处理MDX页面布局与常规Next.js页面[布局](https://nextjs.org/docs/app/api-reference/file-conventions/layout)一样，在当前页面目录下（或其父目录下）创建一个`layout.tsx`文件，然后编写布局代码即可。

#### 元数据
在`@next/mdx`中处理页面元数据时，我们需要自己创建一个相对应的元数据处理组件例如：
```tsx
type FrontmatterProps = {
  date: string;
  author: string;
  // 其它元数据，如分类、标签、来源、阅读时长等
};

export default function Frontmatter({ date, author }: FrontmatterProps) {
  return (
    <div className="frontmatter">
      date: <time>{date}</time>
      author: {author}
    </div>
  );
}
```

然后，在`page.mdx`页面中合适的位置放入该组件，并配置上元数据即可。例如：

```diff
import MyComponent from './my-components'
+ import Frontmatter from './frontmatter'

# Welcome to my MDX page!

+ <Frontmatter date="2023-12-12 12:12:12" author="Qhan W"/>
 
This is some **bold** and _italics_ text.
 
This is a list in markdown:
...
```

> 官方元数据处理：[frontmatter](https://nextjs.org/docs/app/building-your-application/configuring/mdx#frontmatter)



### MDX插件配置

在`@next/mdx`、`next-mdx-remote`中都可以通过`remark`插件`rehype`来转换 MDX 内容。例如，使用`remark-gfm`来实现 GitHub Flavored Markdown 来支持。

#### @next/mdx
> [!NOTE]
> 由于remark和rehype生态系统仅是 ESM，因此，需要将配置文件`next.config.js`改为`next.config.mjs`。插件配置如下：

```js
// next.config.mjs
import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}
 
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)
```

#### next-mdx-remote

```ts
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";

import remarkToc from "remark-toc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const options: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [[remarkToc, { maxDepth: 4 }], remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
};

export default function MDXContent(props: Pick<MDXRemoteProps, "source">) {
  return (
    <article className="fade-in-up-content prose prose-gray">
      <MDXRemote source={props.source} options={options} />
    </article>
  );
}
```

### 代码高亮
在作为技术开发为主的博客中，常常会用到代码示例，这里推荐使用`Anthony Fu`的`@shikijs/rehype`插件，按[插件配置](#mdx插件配置)配置即可。其它优秀的代码高亮插件如下：
- [@shikijs/rehype](https://github.com/shikijs/shiki/tree/main/packages/rehype)
- [rehype-highlight](https://github.com/rehypejs/rehype-highlight)
- [rehype-pretty-code](https://github.com/atomiks/rehype-pretty-code)

### 阅读时间

通过[reading-time](https://github.com/ngryman/reading-time)可以为我们的文章添加阅读时间、文章字数元数据。在`/lib/posts.ts`文件中作如下修改也可为`next-mdx-remote`添加文章阅读时长数据：
```diff
...
+ import readingTime from "reading-time";

const postsDir = join(process.cwd(), "posts");

+ type ReadingTime = {
+  text: string;
+  minutes: number;
+  time: number;
+  words: number;
+ };

type MetaData = {
...
+  readingTime?: ReadingTime;
};

export function getPostBySlug(slug: string) {
...
  const { data, content, excerpt } = matter(fileContents, {
    excerpt: true,
  });

+ const readTime = readingTime(content);
+ const meta = { ...data, readingTime: readTime } as MetaData;
  ...
}

...
```

### Table of Content

在本文介绍的三个方法中，我们可以通[remark-toc](https://www.npmjs.com/package/remark-toc)插件得到文章的目录。但目录的位置在文章中配置的地方显示，这可能不符合我们预期，在此情况下，可通过样式将目录放置合适合的位置，如：
> 该样式将目录放在文章右侧，并在小屏幕中隐藏。
```css
#toc {
  display: none;
}

#toc + ul {
  display: none;
  position: fixed;
  right: 16px;
  top: 115px;
  margin: 0;
  padding: 0;
  max-width: 160px;
  max-height: 480px;
  overflow: auto;

  &::before {
    display: table;
    content: "Table of Contents";
    color: rgba(42, 46, 54, 0.45);
    font-weight: bold;
  }
}

#toc + ul,
#toc + ul ul {
  list-style-type: none;
  font-size: 14px;
  margin: 0;

  > li > a {
    text-decoration: none;
    color: rgb(55, 65, 81);
    font-weight: normal;
  }
}

@media (min-width: 1024px) {
  #toc + ul {
    display: block !important;
  }
}

.prose .shiki {
  font-family: DM Mono, Input Mono, Fira Code, monospace;
  font-size: 0.92em;
  line-height: 1.4;
  // margin: 0.5em 0;
}

// TODO: shikiji 未对纯文本样式做适配
.prose .shiki.nord[lang=plaintext] :where(code) {
  color: #d8dee9ff;
}
```

## 异常处理

### 时间格式化
因为我们使用Next.js来搭建博客，并采用服务端渲染方式，因此，在文章内容的发布时间与编辑时间上，需要带上时区信息。否则，在渲染时会出现服务器与客户端时区不一致，导致时间错误问题。对于时间的格式化处理，此处统一采用**客户端渲染**方式。具体请查看[SSR Timezone](https://qhan.wang/posts/ssr-timezone)。

### 插件异常

主要为`remark-gfm`插件错误。撰写本示例时，正值`remarkjs`相关插件升级中，因些，在使用`next-mdx-remote`时出现渲染错误，此时，我们只需回退`remark-gfm`到上一个大版本即可，即: v3.x。

### VS Code TS错误
表现为`@next/mdx`下，`page.mdx`出现ts检查错误，重启编辑器即可。


## 相关链接

- [MDX][1]
- [@next/mdx][2]
- [next-mdx-remote][3]
- [remark][4]
- [rehype][5]


[1]: https://mdxjs.com/
[2]: https://www.npmjs.com/package/@next/mdx
[3]: https://github.com/hashicorp/next-mdx-remote
[4]: https://github.com/remarkjs/remark
[5]: https://github.com/rehypejs/rehype