import Link from "next/link";
import { Icon } from "@/app/components/Icons";

// import { remark } from "remark";
// import html from "remark-html";

import PostLabel from "../components/PostLabel";

import { getAllPosts } from "@/lib/posts";
import seo from "@/app/utils/seo";

// const filterCategory = (name: string) => {
//   const types = {
//     css: ["css", "css3", "scss", "less"],
//     js: ["javascript", "ecmaScript", "js", "jsx", "ts", "typescript", "node"],
//     md: ["md", "markdown"],
//     jsx: ["jsx", "tsx", "react"],
//   };

//   for (let [key, value] of Object.entries(types)) {
//     if (value.find((type) => type.toUpperCase() === name.toUpperCase())) {
//       return key;
//     }
//   }
//   return "jsx";
// };

// async function formatExcerpt(content: string) {
//   const excerpt = await remark()
//     .use(html, { sanitize: false })
//     .process(content || "");

//   return excerpt.toString();
// }

// export async function getPosts() {
//   return getAllPosts();
// }

export async function generateMetadata() {
  return seo({ title: "Stories" });
}

export default async function Posts() {
  const posts = await getAllPosts();

  return (
    <>
      <div className="uppercase py-1 mb-8 -mt-8 text-sm text-center font-medium tracking-widest text-slate-400">
        Total {posts?.length} Posts
      </div>
      <div className="prose grid gap-9 m-auto">
        {posts?.map((node: any) => (
          <Link
            href={`/posts/${node.slug}`}
            className="group font-normal overflow-hidden cursor-pointer no-underline transition fade-in-up"
            key={node.slug}
          >
            <div className="text-2xl text-slate-600 group-hover:text-brand break-all whitespace-nowrap overflow-hidden overflow-ellipsis ease-in duration-300">
              {node.frontmatter?.title}
            </div>
            <div className="text-slate-400 text-sm leading-none flex items-center">
              <time className="my-3 inline-flex items-center">
                <Icon
                  icon="heroicons:calendar"
                  className="mr-1 w-4 h-4 text-brand"
                />
                {node.frontmatter?.date}
              </time>
              <span className="mx-2 w-0.5 h-0.5 bg-slate-400" />
              {/* {node.frontmatter.category} */}
              {node.frontmatter?.tags.map((tag: string) => (
                <PostLabel title={tag} key={tag} />
              ))}
            </div>

            <div className="text-slate-500 line-clamp-3">{node.excerpt}</div>
          </Link>
        ))}
      </div>
    </>
  );
}



