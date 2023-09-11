import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import ShikiRemarkPlugin from "remark-shiki-plugin";

import { Icon } from "@/app/components/Icons";

import Layout from "@/app/components/Layout";
import seo from "@/app/utils/seo";

import { getPostBySlug, getAllPosts } from "@/lib/posts";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getPost(params: Props["params"]) {
  const post = getPostBySlug(params.slug);
  const markdown = await remark()
    .use(html, { sanitize: false })
    .use(remarkGfm)
    .use(ShikiRemarkPlugin, {
      theme: "nord",
      themes: ["nord", "nord"],
      generateMultiCode: true,
    })
    .process(post.content || "");

  //

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

  return (
    <Layout>
      <div className="prose prose-default mx-auto">
        <header className="text-3xl pb-6 font-extrabold">
          {post.frontmatter.title}
        </header>
        <article dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className="flex justify-between my-12 text-sm">
          <span>
            {prev && (
              <Link
                href={prev.slug}
                className="inline-flex items-center min-w-0"
              >
                <Icon
                  icon="heroicons:chevron-left"
                  className="mr-1 h-4 w-4 group-hover:text-gray-500"
                />
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
                className="inline-flex items-center min-w-0"
              >
                <span className="break-all whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {next.title}
                </span>

                <Icon
                  icon="heroicons:chevron-right"
                  className=" ml-1 h-4 w-4 group-hover:text-gray-500"
                />
              </Link>
            )}
          </span>
        </div>
      </div>
    </Layout>
  );
};
