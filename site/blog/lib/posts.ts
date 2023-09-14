import matter from "gray-matter";
import dayjs from "dayjs";
import fs from "fs";
import { join } from "path";

const postsDir = join(process.cwd(), "posts");

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDir, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content, excerpt } = matter(fileContents, {
    excerpt: true,
  });

  const date = dayjs(data.date).format("YYYY-MM-DD");

  return {
    slug: realSlug,
    frontmatter: {
      ...data,
      title: data.title,
      description: data.description,
      tags: data.tags,
      date,
    },
    content,
    excerpt,
  };
}

export function getAllPosts() {
  const slugs = fs.readdirSync(postsDir);
  const posts = slugs.map((slug) => getPostBySlug(slug));

  return posts.sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1
  );
}
