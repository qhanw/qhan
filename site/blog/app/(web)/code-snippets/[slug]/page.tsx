import { Metadata /** ResolvingMetadata */ } from "next";
import Link from "next/link";

// import { remark } from "remark";
// import remarkToc from "remark-toc";
// import remarkGfm from "remark-gfm";
// import remarkRehype from "remark-rehype";

// import rehypeSlug from "rehype-slug";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";
// import rehypePrettyCode from "rehype-pretty-code";
// import rehypeStringify from "rehype-stringify";

import DateFormat from "@/app/(web)/components/DateFormat";

import seo from "@/utils/seo";
import { getAllCodeSnippets, getCodeSnippet } from "@/app/(web)/lib/service";

import MDXContent from "./MDXContent";

import "./styles.scss";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function fetchCodeSnippet(params: Props["params"]) {
  const slug = (await params).slug;
  const post = getCodeSnippet(slug);
  // const markdown = await remark()
  //   .use(remarkToc, { maxDepth: 4 })
  //   .use(remarkGfm)
  //   .use(remarkRehype)
  //   .use(rehypeSlug)
  //   .use(rehypeAutolinkHeadings)
  //   .use(rehypePrettyCode, { theme: "nord" })
  //   .use(rehypeStringify)
  //   .process(post.content || "");

  const posts = getAllCodeSnippets();
  const idx = posts.findIndex((c) => c.slug === slug);

  const next = posts[idx + 1];
  const prev = posts[idx - 1];

  return {
    // post: { ...post, html: markdown.toString() },
    post,
    prev: prev ? { title: prev.meta.title, slug: prev.slug } : null,
    next: next ? { title: next.meta.title, slug: next.slug } : null,
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllCodeSnippets();

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: Props
  // parent: ResolvingMetadata
): Promise<Metadata> {
  const { post } = await fetchCodeSnippet(props.params);
  return seo({
    title: post?.meta?.title || "",
    description: post?.meta?.description || post?.excerpt || "",
  });
}

export default async ({ params }: Props) => {
  const { post, prev, next } = await fetchCodeSnippet(params);

  // const message = await new Promise<string>((resolve) => {
  //   console.log("in executing sleep!");
  //   setTimeout(() => resolve("after 3000 ms!"), 300000);
  // });

  return (
    <>
      <header className="mb-8 prose prose-slate dark:prose-invert">
        <h1 className="slide-enter-50">{post.meta.title}</h1>

        <div className="slide-enter-50 opacity-50 -mt-2 flex items-center text-sm">
          {post.meta.draft ? (
            <span className="border border-orange-300 bg-orange-200 text-orange-600 rounded-sm px-1 mr-2">
              Draft
            </span>
          ) : null}
          <time className="inline-flex items-center">
            <span className="i-heroicons:calendar mr-1 w-4 h-4 text-brand" />
            <DateFormat value={post.meta?.date} />
          </time>
          {/* <span className="mx-2 w-0.5 h-0.5 bg-slate-500" /> */}
          <time className="inline-flex items-center ml-2">
            <span className="i-heroicons:clock mr-1 w-4 h-4 text-brand" />
            阅读
            {Math.ceil(post.meta?.readingTime?.minutes ?? 0)}
            分钟
          </time>
        </div>
      </header>
      {/* <article
        className="fade-in-up-content prose prose-slate"
        dangerouslySetInnerHTML={{ __html: post.html }}
      /> */}
      <MDXContent source={post.content} />
      <div className="text-sm text-right text-slate-600">
        最近修改时间：
        <DateFormat value={post.meta.lastModified} />
      </div>
      <div className="flex my-12 text-sm gap-4">
        <span className="w-1/2 overflow-hidden flex">
          {prev && (
            <Link
              href={prev.slug}
              className="inline-flex items-center min-w-0 no-underline text-slate-600 hover:text-slate-800 dark:hover:text-slate-300 ease-out"
            >
              <span className="i-heroicons:chevron-left mr-1 h-4 w-4" />
              <span className="truncate flex-1">{prev.title}</span>
            </Link>
          )}
        </span>
        <span className="w-1/2 overflow-hidden flex justify-end">
          {next && (
            <Link
              href={next.slug}
              className="inline-flex items-center min-w-0 no-underline text-slate-600 hover:text-slate-800 dark:hover:text-slate-300 ease-out"
            >
              <span className="truncate flex-1">{next.title}</span>

              <span className="i-heroicons:chevron-right ml-1 h-4 w-4" />
            </Link>
          )}
        </span>
      </div>
    </>
  );
};
