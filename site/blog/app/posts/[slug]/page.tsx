import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";

import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

import PostLabel from "@/app/components/PostLabel";

import seo from "@/app/utils/seo";

import { getPostBySlug, getAllPosts } from "@/lib/posts";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getPost(params: Props["params"]) {
  const post = getPostBySlug(params.slug);
  const markdown = await remark()
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypePrettyCode, { theme: "nord" })
    .use(rehypeStringify)
    .process(post.content || "");

  const posts = getAllPosts();
  const idx = posts.findIndex((c) => c.slug === params.slug);

  const next = posts[idx + 1];
  const prev = posts[idx - 1];

  return {
    post: { ...post, html: markdown.toString() },
    prev: prev ? { title: prev.frontmatter.title, slug: prev.slug } : null,
    next: next ? { title: next.frontmatter.title, slug: next.slug } : null,
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { post } = await getPost(params);
  return seo({
    title: post?.frontmatter?.title || "",
    description: post?.frontmatter?.description || post?.excerpt || "",
  });
}

export default async ({ params }: Props) => {
  const { post, prev, next } = await getPost(params);

  // const message = await new Promise<string>((resolve) => {
  //   console.log("in executing sleep!");
  //   setTimeout(() => resolve("after 3000 ms!"), 300000);
  // });

  return (
    <>
      <header className="mb-8">
        <h1 className="slide-enter-50 text-gray-800">
          {post.frontmatter.title}
        </h1>

        <div className="slide-enter-50 opacity-50 -mt-2 flex items-center">
          <time className="inline-flex items-center">
            <span className="i-heroicons:calendar mr-1 w-4 h-4 text-brand" />
            {post.frontmatter?.date}
          </time>
          <span className="mx-2 w-0.5 h-0.5 bg-gray-500" />
          {post.frontmatter?.tags.map((tag: string) => (
            <PostLabel title={tag} key={tag} />
          ))}
        </div>
      </header>
      <article
        className="fade-in-up-content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <div className="flex justify-between my-12 text-sm">
        <span>
          {prev && (
            <Link
              href={prev.slug}
              className="inline-flex items-center min-w-0 no-underline"
            >
              <span className="i-heroicons:chevron-left mr-1 h-4 w-4 group-hover:text-gray-500" />
              <span className="break-all whitespace-nowrap overflow-hidden overflow-ellipsis">
                {prev.title}
              </span>
            </Link>
          )}
        </span>
        <span>
          {next && (
            <Link
              href={next.slug}
              className="inline-flex items-center min-w-0 no-underline"
            >
              <span className="break-all whitespace-nowrap overflow-hidden overflow-ellipsis">
                {next.title}
              </span>

              <span className="i-heroicons:chevron-right ml-1 h-4 w-4 group-hover:text-gray-500" />
            </Link>
          )}
        </span>
      </div>
    </>
  );
};
