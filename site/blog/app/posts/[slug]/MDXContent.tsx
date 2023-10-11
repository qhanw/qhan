import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";

import remarkToc from "remark-toc";
import remarkGfm from "remark-gfm";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

// mdx components
import Button from "@/posts-assets/mdx/next-mdx/button";

const options: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [[remarkToc, { maxDepth: 4 }], remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,

      // @ts-ignore
      [rehypePrettyCode, { theme: "nord" }],
    ],
  },
};

export default function MDXContent(props: Pick<MDXRemoteProps, "source">) {
  return (
    <article className="fade-in-up-content prose prose-gray">
      <MDXRemote
        source={props.source}
        components={{ Button }}
        options={options}
      />
    </article>
  );
}
