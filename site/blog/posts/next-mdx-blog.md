---
title: NextJS 中创建 MDX 博客
date: 2023-10-10T18:28:32+08:00
category: nextjs
tags: [nextjs, markdown, mdx, contentlayer, next-mdx-remote]
draft: true
description: 使用 @next/mdx、next-mdx-remote、contentlayer 在 NextJS 13 中创建 MDX 博客。
---

## TOC

## 前言

在这里，我们将分别介绍三种搭建MDX博客网站应用的方法，分别是[@next/mdx][2]、[next-mdx-remote][3]、[contentlayer][4]他们有各自的优缺点，可以根据自身情况选择使用那一种方式。

当然，我更推荐使用 **Contentlayer** 的方式，因为他更轻量、更简单、高性能等优点。以下为三种方式差异，可以根据自身情况，自由选择，接下来我们也将分别介绍三种方式的搭建流程。

| 名称                                | 差异描述                                                                                                                                                                |
| :---------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@next/mdx](#@next/mdx)             | nextjs官方提供的markdown 和 MDX解决方案，它从本地文件获取数据，允许您直接在`/pages`或`/app`目录中创建带有扩展名`.mdx`的页面。对于简单内容页面来说相对实用。             |
| [next-mdx-remote](#next-mdx-remote) | 不处理从源加载内容，无论是本地还是远程，因此需要我们自己编写代码实现，但也因此相对灵活，在处理过程中需要配合相关插件来实现内容转换处理，如：`gray-matter`等。           |
| [contentlayer](#contentlayer)       | 具有重量轻，易于使用、 出色的开发体验以及快速的构建能力和高性能页面的优点的。它从源文件加载内容，并自动生成 TypeScript 类型定义，以确保正在处理的内容符合您期望的形状。 |


好了，让我们开始真正的博客搭建之旅吧！

## @next/mdx

首先，确保您已经使用[create-next-app](https://nextjs.org/docs/getting-started/installation)创建了一个博客应用，若没有请运行如下代码创建项目应用：

``` bash
pnpm dlx create-next-app@latest
```

然后，安装渲染MDX所需的软件包

```bash
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

创建一个`mdx-components.tsx`文件，在您应用的根目录下(`/app`或`/src`目录的父级目录)：   
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



以上即为[@next/mdx](https://nextjs.org/docs/app/building-your-application/configuring/mdx#nextmdx)官方实现方式，非常简单。但相对也有一定局限情，因为它只处理本地的MDX页面，我们需要编写对应的元素数组件来承载这些内容，如果我们的MDX内容在其它地方呢，接下来两种方式专门解决这类问题。

---

## Next mdx remote

[next-mdx-remote][3]允许您在其它地方动态加载`markdown`或`MDX`内容文件，并在客户端上正确渲染的轻型实用程序。

![next-mdx-remote](/images/posts/next-mdx-remote.png)

首先，确保您已经使用[create-next-app](https://nextjs.org/docs/getting-started/installation)创建了一个博客应用，若没有请运行如下代码创建项目应用：

``` bash
pnpm dlx create-next-app@latest
```

然后，在`/posts`目录中创建几个markdown文件，并向这些文件添加一些内容。

这是一个`posts/post-01.md`示例：
```markdown
---
title: My First Post
date: 2022-02-22T22:22:22+0800
---

This is my first post ...
````
在此结构中有三个帖子示例：
```plaintext
posts/
├── post-01.md
├── post-02.md
└── post-03.md
```

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

创建文章呈现页面`/app/posts/[slug]/page.tsx`
```tsx
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";

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

export default async ({ params }: Props) => {
  const { post } = await getPost(params);

  return (
    <>
      <h1>{post.meta.title}</h1>
      <time>{post.meta?.date.toString()}</time>
      <MDXRemote source={post.content} components={{}} options={{}} />
    </>
  );
};

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
> 注意：在[App Router](https://nextjs.org/docs/app/building-your-application/routing#the-app-router)中，需对客户端渲染组件添加`use client`;

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

然后，在`post`文章中使用定义的`Button`组件
```diff
---
title: My First Post
date: 2022-02-22T22:22:22+0800
---

This is my first post ...

+ <Button text="Button" />
```

现在，导航到`/posts/post-01`，将看到一个带有一个按钮的可交互的Markdown文档。🎉🎉🎉🎉🎉

---

## Contentlayer  

[Contentlayer][4] 是一个内容 SDK，可验证您的内容并将其转换为类型安全的 JSON 数据，您可以轻松地import将其添加到应用程序的页面中。

> **⚠️ Contentlayer 目前处于测试阶段。在即将发布的 1.0 版本之前，可能仍会发生重大更改。**

![next-mdx-contentlayer](/images/posts/next-mdx-contentlayer.webp)

### 开始

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

### 忽略构建输出

将`.contentlayer`目录添加到你的`.gitignore`文件中，以确保你的应用程序的每个构建都有最新生成的数据，并且你不会遇到Git问题。
```plaintext
# .gitignore

# ...

# contentlayer
.contentlayer
```

### 定义内容模式
现在定义内容模式并向站点添加一些内容

#### 添加 Contentlayer 配置

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


#### 添加博客内容

在`/posts`目录中创建几个markdown文件，并向这些文件添加一些内容。

这是一个`/posts/post-01.md`示例：
```markdown
---
title: My First Post
date: 2022-02-22T22:22:22+0800
---

This is my first post ...
````
在此结构中有三个帖子示例：

```plaintext
posts/
├── post-01.md
├── post-02.md
└── post-03.md
```

#### 添加网站代码

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

运行Next.js开发服务，并访问localhost:3000查看文章列表。
```bash
pnpm dev
```

#### 添加Post布局

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

export default PostLayout

```

现在，点击文章列表上的链接，将进入一文章阅读页面。

#### 开启MDX

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
> 注意：在[App Router](https://nextjs.org/docs/app/building-your-application/routing#the-app-router)中，需对客户端渲染组件添加`use client`;


然后，在`app/posts/[slug]/page.tsx`文件中作如下调整

```diff
...
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

## 扩展&异常处理

在解决MDX内容呈现后，我们可能还需要对MDX文档内容的`frontmatter`数据提取、表格、目录、阅读时间、字数统计以及代码内容美化等操作。此时，我们需要用到[remark][5]、[rehype][6]生态中的一些插件，使用方式也很简单。参见如下配置：

### @next/mdx

#### Remark and Rehype Plugins

在`@next/mdx`可以通过`remark`插件`rehype`来转换 MDX 内容。例如，使用`remark-gfm`来实现 GitHub Flavored Markdown 来支持。

注意：由于remark和rehype生态系统仅是 ESM，因此，需要将配置文件`next.config.js`改为`next.config.mjs`。插件配置如下：

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

#### 布局

在`@next/mdx`中处理MDX页面布局与常规`next`页面[布局](https://nextjs.org/docs/app/api-reference/file-conventions/layout)一样，在当前页面目录下（或其父目录下）创建一个`layout.tsx`文件，然后编写布局代码即可。

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


### next-mdx-remote

### contentlayer

### 代码高亮

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

```


### 时间格式化
因为我们使用nextjs来搭建博客，并采用服务端渲染方式，因此，在文章内容的发布时间与编辑时间上，需要带上时区信息。否则，在渲染时会出现服务器与客户端时区不一致，导致时间错误问题。对于时间的格式化处理，此处统一采用**客户端渲染**方式。具体请查看[SSR Timezone](https://qhan.wang/posts/ssr-timezone)。

### 插件异常

主要为`remark-gfm`插件错误。撰写本示例时，正值`remarkjs`相关插件升级中，因些，在使用`next-mdx-remote`、`contentlayer`时出现渲染错误，此时，我们只需回退`remark-gfm`到上一个大版本即可。

### VS Code TS错误
表现为`@next/mdx`下，`page.mdx`出现ts检查错误，重启编辑器即可。


## 相关链接

- [MDX][1]
- [@next/mdx][2]
- [next-mdx-remote][3]
- [contentlayer][4]
- [remark][5]
- [rehype][6]


## 参考

- [How to install Contentlayer in nextjs](https://medium.com/frontendweb/how-to-install-contentlayer-in-nextjs-4a08fb37c87d)
- [使用 Contentlayer 和 Next 构建基于 MDX 的博客](https://devpress.csdn.net/react/62eda913c6770329307f2a85.html)


[1]: https://mdxjs.com/
[2]: https://www.npmjs.com/package/@next/mdx
[3]: https://github.com/hashicorp/next-mdx-remote
[4]: https://contentlayer.dev/
[5]: https://github.com/remarkjs/remark
[6]: https://github.com/rehypejs/rehype