import { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 远程获取博客列表
  const posts = await getAllPosts();

  // 转换为博客的 sitemap
  const maps: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://qhan.wang/posts/${post.slug}`,
    lastModified: post.frontmatter.lastModified,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // // 加入本地的其他路由页面
  // const routes = ["", "/about", "/blog"].map((route) => ({
  //   url: `https://xxx.com${route}`,
  //   lastModified: new Date().toISOString(),
  // }));

  return [
    {
      url: "https://qhan.wang",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://qhan.wang/posts",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://qhan.wang.com/projects",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...maps,
  ];
}
