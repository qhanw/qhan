import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";

import remarkToc from "remark-toc";
import remarkGfm from "remark-gfm";
import remarkGithubAlerts from "remark-github-alerts";

import rehypeRaw from "rehype-raw";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";

// mdx components
import Button from "@/posts-mdx/next-mdx/button";
import CssGradientBtn from "@/posts-mdx/css-gradient/GradientBtn";

import "remark-github-alerts/styles/github-base.css";
import "remark-github-alerts/styles/github-colors-light.css"



const options: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [
      [remarkToc, { maxDepth: 4 }],
      remarkGfm,
      // @ts-ignore
      remarkGithubAlerts,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,

      // @ts-ignore
      [rehypeShiki, { theme: "nord" }],
      // @ts-ignore
      [rehypeRaw, { passThrough: ["mdxjsEsm", "mdxJsxFlowElement"] }],
    ],
  },
};

export default function MDXContent(props: Pick<MDXRemoteProps, "source">) {
  return (
    <article className="fade-in-up-content prose prose-gray">
      <MDXRemote
        source={props.source}
        components={{ Button, CssGradientBtn }}
        options={options}
      />
    </article>
  );
}
