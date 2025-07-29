import { MetadataRoute } from "next";

import { getAllPosts } from "@/app/(web)/lib/service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 远程获取博客列表
  const posts = await getAllPosts();

  const domain = `https://qhan.wang`;

  // 转换为博客的 sitemap
  const posts_maps: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${domain}/posts/${post.slug}`,
    lastModified: post.meta.lastModified?.toISOString(),
    // changeFrequency: "daily",
    // priority: +(0.8 * 0.8).toFixed(2),
  }));

  // 加入本地的其他路由页面
  const route_maps: MetadataRoute.Sitemap = ["", "/posts"].map((route) => ({
    url: domain + route,
    lastModified: new Date().toISOString(),
    // changeFrequency: "weekly",
    // priority: !route || route === "/" ? 1 : 0.8,
  }));

  return [...route_maps, ...posts_maps];
}
