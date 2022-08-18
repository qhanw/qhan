import { useEffect } from "react";
import { graphql, Link } from "gatsby";
import ScrollReveal from "scrollreveal";

import Seo from "../components/Seo";
import Layout from "../components/Layout";
import IconCalendar from "../components/Icons/calendar";
import PostLabel from "../components/PostLabel";
import Category from "../components/Category";

const filterCategory = (name: string) => {
  const types = {
    css: ["css", "css3", "scss", "less"],
    js: ["javascript", "ecmaScript", "js", "jsx", "ts", "typescript", "node"],
    md: ["md", "markdown"],
    jsx: ["jsx", "tsx", "react"],
  };

  for (let [key, value] of Object.entries(types)) {
    if (value.find((type) => type.toUpperCase() === name.toUpperCase())) {
      return key;
    }
  }
  return "other";
};

const Index = ({ data }: any) => {
  useEffect(() => {
    ScrollReveal().reveal(".post", {
      delay: 500,
      useDelay: "onload",
      reset: true,
      origin: "right",
      distance: "120px",
    });
    ScrollReveal().reveal(".post", {
      delay: 500,
      useDelay: "onload",
      reset: true,
      origin: "right",
      distance: "120px",
    });
    return () => {
      ScrollReveal().destroy();
    };
  }, []);

  return (
    <Layout>
      <div className="posts">
        <h1 className="content-subhead">
          Total {data.allMarkdownRemark.totalCount} Posts
        </h1>

        {data.allMarkdownRemark.edges.map(({ node }: any) => (
          <section className="post" key={node.id}>
            <header className="post-header">
              {/* <img
            width="48"
            height="48"
            alt="Tilo Mitra&#x27;s avatar"
            className="post-avatar"
            src="img/common/tilo-avatar.png"
           /> */}
              <h2 className="post-title">
                <Link to={node.fields.slug}> {node.frontmatter.title}</Link>
              </h2>
              <p className="post-meta">
                <time className="post-time inline-flex items-center my-2">
                  <IconCalendar className="mr-1" />
                  {node.frontmatter.date}
                </time>
              </p>
            </header>
            <div className="post-description">{node.excerpt}</div>
            <footer className="mt-2">
              <p className="post-meta">
                <Category
                  type={filterCategory(node.frontmatter.category)}
                  title={node.frontmatter.category}
                />

                {node.frontmatter.tags.map((tag: string) => (
                  <PostLabel title={tag} key={tag} />
                ))}
              </p>
            </footer>
          </section>
        ))}
      </div>
    </Layout>
  );
};

export default Index;

export const Head = () => <Seo title="主页" />;

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            category
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
