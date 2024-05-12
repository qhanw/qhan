import Link from "next/link";
import seo from "@/utils/seo";

import { getAllCodeSnippets } from "@/app/(web)/lib/service";

export async function generateMetadata() {
  return seo({
    title: "Code Snippets",
    description: "常用的代码及算法代码片段。",
  });
}

export default async function Projects() {
  const posts = await getAllCodeSnippets();

  return (
    <>
      <div className="prose grid gap-2 m-auto">
        <div className="uppercase py-1 mb-8 -mt-8 text-sm font-medium tracking-widest text-gray-400">
          Total {posts?.length} Code Snippets
        </div>
        {posts?.map((post: any) => (
          <Link
            href={`/code-snippets/${post.slug}`}
            className="group font-normal overflow-hidden cursor-pointer no-underline transition fade-in-up "
            key={post.slug}
          >
            <div className=" text-gray-600 group-hover:text-brand truncate ease-in duration-300">
              {post.meta?.title}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
