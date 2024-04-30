import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";

import remarkToc from "remark-toc";
import remarkGfm from "remark-gfm";
import remarkGithubAlerts from "remark-gh-alerts";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";

// mdx components
import Button from "@/md/posts-mdx/next-mdx/button";
import CssGradientBtn from "@/md/posts-mdx/css-gradient/GradientBtn";

import "remark-gh-alerts/styles/github-base.css";
import "remark-gh-alerts/styles/github-colors-light.css";

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
      [rehypeShiki, { theme: "vitesse-light" }],
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
