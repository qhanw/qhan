import Link from "next/link";

// import { remark } from "remark";
// import html from "remark-html";

import PostLabel from "@/app/components/PostLabel";
import seo from "@/app/utils/seo";

import { getAllPosts } from "@/lib/posts";

export async function generateMetadata() {
  return seo({ title: "Blog" });
}

export default async function Posts() {
  const posts = await getAllPosts();

  return (
    <>
      <div className="uppercase py-1 mb-8 -mt-8 text-sm text-center font-medium tracking-widest text-gray-400">
        Total {posts?.length} Posts
      </div>
      <div className="prose grid gap-9 m-auto">
        {posts?.map((node: any) => (
          <Link
            href={`/posts/${node.slug}`}
            className="group font-normal overflow-hidden cursor-pointer no-underline transition fade-in-up"
            key={node.slug}
          >
            <div className="text-xl text-gray-600 group-hover:text-brand break-all whitespace-nowrap overflow-hidden overflow-ellipsis ease-in duration-300">
              {node.frontmatter?.title}
            </div>
            <div className="text-gray-400 text-sm leading-none flex items-center">
              <time className="my-3 inline-flex items-center">
                <span className="i-heroicons:calendar mr-1 w-4 h-4 text-brand" />
                {node.frontmatter?.date}
              </time>
              <span className="mx-2 w-0.5 h-0.5 bg-gray-400" />
              {/* {node.frontmatter.category} */}
              {node.frontmatter?.tags.map((tag: string) => (
                <PostLabel title={tag} key={tag} />
              ))}
            </div>

            <div className="text-gray-500 line-clamp-3">{node.excerpt}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
