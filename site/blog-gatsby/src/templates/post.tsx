import { useEffect } from "react";
import { graphql, Link } from "gatsby";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import ScrollReveal from "scrollreveal";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

import "prism-themes/themes/prism-one-light.css";

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
        className="prose prose-slate max-w-full"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <div className="flex justify-between my-12">
        {prev && (
          <Link to={prev.fields.slug} className="inline-flex items-center">
            <ChevronLeftIcon className=" mr-2 h-5 w-5 group-hover:text-gray-500" />
            {prev.frontmatter.title}
          </Link>
        )}
        {next && (
          <Link to={next.fields.slug} className="inline-flex items-center">
            {next.frontmatter.title}
            <ChevronRightIcon className=" ml-2 h-5 w-5 group-hover:text-gray-500" />
          </Link>
        )}
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
