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
I **love** using [Next.js](https://nextjs.org/)
```

输出：
```html
<p>I <strong>love</strong> using <a href="https://nextjs.org/">Next.js</a></p>
```

#### MDX

[MDX](https://mdxjs.com/)是 Markdown 的超集，可让您编写[JSX](https://react.dev/learn/writing-markup-with-jsx)直接在您的 Markdown 文件中。这是在内容中添加动态交互性和嵌入 React 组件的强大方法。

---

### 开始搭建

在这里，我们将分别介绍三种搭建MDX博客网站应用的方法，他们有各自的优缺点，可以根据自身情况选择使用那一种方式。当然，我更推荐使用`Contentlayer`的方式，因为他更轻量、更简单、高性能等优点。  

好了，让我们开始真正的博客搭建之旅吧！

#### @next/mdx

#### Next mdx remote

允许您在其它地方动态加载`markdown`或`MDX`内容文件，并在客户端上正确渲染的轻型实用程序。

[![next-mdx-remote](/images/posts/next-mdx-remote.png)](https://github.com/hashicorp/next-mdx-remote)

当前插件官方介绍基于`nextjs`的`Pages Router`模式，但请不要担忧，目前它同样适用于`App Router`模式，只是获取数据资源方式不同，详细请参考：[App Router Data fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)。在接下来的示例中，我们也将使用`App Router`的模式来搭建渲染blog内容。


#### Contentlayer  

[Contentlayer](https://contentlayer.dev/) 是一个内容 SDK，可验证您的内容并将其转换为类型安全的 JSON 数据，您可以轻松地import将其添加到应用程序的页面中。

[![Video Thumbnail](https://i.imgur.com/y3p4hDN.png)](https://www.youtube.com/watch?v=58Pj4a4Us7A)

**⚠️ Contentlayer 目前处于测试阶段。在即将发布的 1.0 版本之前，可能仍会发生重大更改。**


<Button text="my button"/>


### 相关链接

- [MDX](https://mdxjs.com/)
- [@next/mdx](https://www.npmjs.com/package/@next/mdx)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- [contentlayer](https://contentlayer.dev/)
- [remark](https://github.com/remarkjs/remark)
- [rehype](https://github.com/rehypejs/rehype)


### 参考

- [How to install Contentlayer in nextjs](https://medium.com/frontendweb/how-to-install-contentlayer-in-nextjs-4a08fb37c87d)
- [使用 Contentlayer 和 Next 构建基于 MDX 的博客](https://devpress.csdn.net/react/62eda913c6770329307f2a85.html)