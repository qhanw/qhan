import matter from "gray-matter";
import fs from "fs";
import { join } from "path";

import { getGitLastUpdatedTimeStamp } from "./utils";

const postsDir = join(process.cwd(), "posts");

type Frontmatter = {
  title?: string;
  description?: string;
  tags?: string[];
  date: Date;
  lastModified?: Date;
};

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDir, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const lastModified = getGitLastUpdatedTimeStamp(fullPath);

  const { data, content, excerpt } = matter(fileContents, {
    excerpt: true,
  });

  const frontmatter = { ...data, lastModified } as Frontmatter;

  return { slug: realSlug, frontmatter, content, excerpt };
}

export function getAllPosts() {
  const slugs = fs.readdirSync(postsDir);
  const posts = slugs.map((slug) => getPostBySlug(slug));

  return posts.sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1
  );
}
