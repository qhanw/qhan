---
title: NextJS 13 中创建 MDX 博客
date: 2023-10-10T18:28:32+08:00
category: nextjs
tags: [nextjs, markdown, mdx, contentlayer, next-mdx-remote]
# draft: true
description: 使用 @next/mdx、next-mdx-remote、contentlayer 在 NextJS 13 中创建 MDX 博客。
---

### TOC

### Markdown

[Markdown](https://daringfireball.net/projects/markdown/syntax)是一种用于格式化文本的轻量级标记语言。它允许您使用纯文本语法进行编写并将其转换为结构有效的 HTML。它通常用于在网站和博客上编写内容。

输入：
```markdown
I **love** using [Next.js](https://nextjs.org/)
```

输出：
```html
<p>I <strong>love</strong> using <a href="https://nextjs.org/">Next.js</a></p>
```

### MDX

[MDX](https://mdxjs.com/)是 Markdown 的超集，可让您编写[JSX](https://react.dev/learn/writing-markup-with-jsx)直接在您的 Markdown 文件中。这是在内容中添加动态交互性和嵌入 React 组件的强大方法。


### @next/mdx

### next-mdx-remote


### contentlayer


<Button text="my button"/>


### 相关链接

- [MDX](https://mdxjs.com/)
- [@next/mdx](https://www.npmjs.com/package/@next/mdx)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- [contentlayer](https://contentlayer.dev/)
- [remark](https://github.com/remarkjs/remark)
- [rehype](https://github.com/rehypejs/rehype)


### 参考

- https://medium.com/frontendweb/how-to-install-contentlayer-in-nextjs-4a08fb37c87d

- https://devpress.csdn.net/react/62eda913c6770329307f2a85.html