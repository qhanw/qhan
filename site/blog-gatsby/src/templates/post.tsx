import { useEffect } from "react";
import { graphql, Link } from "gatsby";

import ScrollReveal from "scrollreveal";
import Layout from "../components/Layout";

import "prismjs/themes/prism.css";

export default ({ data }: any) => {
  const { previous: prev, next, site, markdownRemark: post } = data;
  useEffect(() => {
    ScrollReveal().reveal("#article-header", {
      delay: 500,
      useDelay: "onload",
      reset: true,
      origin: "top",
      distance: "120px",
    });
    ScrollReveal().reveal("#article-content", {
      delay: 500,
      useDelay: "onload",
      reset: true,
      origin: "bottom",
      distance: "120px",
    });

    return () => {
      ScrollReveal().destroy();
    };
  }, []);

  return (
    <Layout>
      <header
        id="article-header"
        className="text-3xl pb-6 mb-6 border-b border-gray-200"
      >
        {post.frontmatter.title}
      </header>

      <article
        id="article-content"
        className="prose prose-slate max-w-max"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <div className="flex justify-between my-12">
        {prev && (
          <Link to={`/${prev.fields.slug}`}>
            上一篇：
            {prev.frontmatter.title}
          </Link>
        )}
        {next && (
          <Link to={`/${next.fields.slug}`}>
            下一篇：
            {next.frontmatter.title}
          </Link>
        )}
      </div>
    </Layout>
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