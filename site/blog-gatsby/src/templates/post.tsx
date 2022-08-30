import { graphql, Link } from "gatsby";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

import "prism-themes/themes/prism-one-light.css";

export default ({ data }: any) => {
  const { previous: prev, next, site, markdownRemark: post } = data;

  return (
    <Layout>
      <div className="prose prose-slate mx-auto">
        <header className="text-3xl pb-6">{post.frontmatter.title}</header>

        <article dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className="flex justify-between my-12 text-sm">
          {prev && (
            <Link
              to={prev.fields.slug}
              className="inline-flex items-center min-w-0"
            >
              <ChevronLeftIcon className="mr-1 h-4 w-4 group-hover:text-gray-500" />
              <span className="break-all whitespace-nowrap overflow-hidden overflow-ellipsis">
                {prev.frontmatter.title}
              </span>
            </Link>
          )}
          {next && (
            <Link
              to={next.fields.slug}
              className="inline-flex items-center min-w-0"
            >
              <span className="break-all whitespace-nowrap overflow-hidden overflow-ellipsis">
                {next.frontmatter.title}
              </span>

              <ChevronRightIcon className=" ml-1 h-4 w-4 group-hover:text-gray-500" />
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const Head = ({ data: { markdownRemark: post } }: any) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
