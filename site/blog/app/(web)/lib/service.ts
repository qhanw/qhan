import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { env } from "node:process";

import matter from "gray-matter";
import readingTime from "reading-time";

import { getGitLastUpdatedTimeStamp } from "./utils";

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

const getFullPath = (dir: string) => join(process.cwd(), `md/${dir}`);

async function getArticle(dir: string, slug: string) {
  const realSlug = slug.replace(/\.md$/, "");

  const fullPath = join(getFullPath(dir), `${realSlug}.md`);

  const fileContents = await readFile(fullPath, { encoding: "utf8" });

  const { data, content, excerpt } = matter(fileContents, { excerpt: true });

  const lastModified = getGitLastUpdatedTimeStamp(fullPath);
  const readTime = readingTime(content);

  const meta = { ...data, readingTime: readTime, lastModified } as MetaData;

  return { slug: realSlug, meta, content, excerpt };
}

async function getAllArticles(dir: string) {
  const slugs = await readdir(getFullPath(dir));

  const isProd = env.NODE_ENV === "production";

  const postsList = slugs.map((slug) => getArticle(dir, slug));

  const posts = [];

  for await (const p of postsList) {
    // 排除草稿文件
    if (!(isProd && (p.meta.draft || /\.draft$/.test(p.slug)))) {
      posts.push(p);
    }
  }

  return posts.sort((a, b) => +b.meta.date - +a.meta.date);
}

//
const dir_ps = "posts";
export const getAllPosts = () => getAllArticles(dir_ps);
export const getPost = (slug: string) => getArticle(dir_ps, slug);

const dir_cs = "code-snippets";
export const getAllCodeSnippets = () => getAllArticles(dir_cs);
export const getCodeSnippet = (slug: string) => getArticle(dir_cs, slug);
