import fs from "fs";
import { join } from "path";

import matter from "gray-matter";
import readingTime from "reading-time";

import { getGitLastUpdatedTimeStamp } from "./utils";

const postsDir = join(process.cwd(), "posts");

type ReadingTime = {
  text: string;
  minutes: number;
  time: number;
  words: number;
};

type MetaData = {
  title: string;
  date: Date;
  category: string;
  tags?: string[];
  description?: string;
  lastModified?: Date;
  readingTime?: ReadingTime;
  draft?: boolean;
};

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");

  const fullPath = join(postsDir, `${realSlug}.md`);

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content, excerpt } = matter(fileContents, {
    excerpt: true,
  });

  const lastModified = getGitLastUpdatedTimeStamp(fullPath);
  const readTime = readingTime(content);

  const meta = { ...data, readingTime: readTime, lastModified } as MetaData;

  return { slug: realSlug, meta, content, excerpt };
}

export function getAllPosts() {
  const slugs = fs.readdirSync(postsDir);

  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // 排除草稿文件
    .filter((c) => !c.meta.draft);

  return posts.sort((a, b) => +b.meta.date - +a.meta.date);
}
