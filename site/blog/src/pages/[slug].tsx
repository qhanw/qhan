import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { remark } from "remark";
import html from "remark-html";
import prism from "remark-prism";
import { getPostBySlug, getAllPosts } from "@/../lib/posts";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

import "prism-themes/themes/prism-one-light.css";

export default (props: any) => {
  const { post, prev, next } = props;

  return (
    <Layout>
      <Seo
        title={post?.frontmatter?.title || ""}
        description={post?.frontmatter?.description || post?.excerpt || ""}
      />
      <div className="prose prose-slate mx-auto">
        <header className="text-3xl pb-6 font-extrabold">
          {post.frontmatter.title}
        </header>
        <article dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className="flex justify-between my-12 text-sm">
          {prev && (
            <Link href={prev.slug} className="inline-flex items-center min-w-0">
              <ChevronLeftIcon className="mr-1 h-4 w-4 group-hover:text-gray-500" />
              <span className="break-all whitespace-nowrap overflow-hidden overflow-ellipsis">
                {prev.title}
              </span>
            </Link>
          )}
          {next && (
            <Link href={next.slug} className="inline-flex items-center min-w-0">
              <span className="break-all whitespace-nowrap overflow-hidden overflow-ellipsis">
                {next.title}
              </span>

              <ChevronRightIcon className=" ml-1 h-4 w-4 group-hover:text-gray-500" />
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ params }: any) {
  const post = getPostBySlug(params.slug);
  const markdown = await remark()
    .use(html, { sanitize: false })
    .use(prism)
    .process(post.content || "");

  return {
    props: {
      post: { ...post, html: markdown.toString() },
      prev: { title: "xxx", slug: "xxx" },
      next: { title: "zzz", slug: "zzz" },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

// export const pageQuery = graphql`
//   query BlogPostBySlug(
//     $id: String!
//     $previousPostId: String
//     $nextPostId: String
//   ) {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     markdownRemark(id: { eq: $id }) {
//       id
//       excerpt(pruneLength: 160)
//       html
//       frontmatter {
//         title
//         date(formatString: "MMMM DD, YYYY")
//         description
//       }
//     }
//     previous: markdownRemark(id: { eq: $previousPostId }) {
//       fields {
//         slug
//       }
//       frontmatter {
//         title
//       }
//     }
//     next: markdownRemark(id: { eq: $nextPostId }) {
//       fields {
//         slug
//       }
//       frontmatter {
//         title
//       }
//     }
//   }
// `;
