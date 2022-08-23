import { useEffect } from "react";
import { graphql, Link } from "gatsby";
import ScrollReveal from "scrollreveal";
import { CalendarIcon } from "@heroicons/react/outline";

import Seo from "../components/Seo";
import Layout from "../components/Layout";
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
  return "jsx";
};

const Index = ({ data }: any) => {
  useEffect(() => {
    ScrollReveal().reveal(".posts>section", {
      delay: 500,
      useDelay: "onload",
      reset: true,
      origin: "right",
      distance: "120px",
    });
    ScrollReveal().reveal(".posts>section", {
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
        <div className="uppercase py-1 mb-4 text-sm border-b border-gray-200 font-medium tracking-widest text-gray-400">
          Total {data.allMarkdownRemark.totalCount} Posts
        </div>

        {data.allMarkdownRemark.edges.map(({ node }: any) => (
          <section className="mb-8" key={node.id}>
            <header className="post-header">
              <h2 className="text-2xl overflow-hidden overflow-ellipsis break-all whitespace-nowrap">
                <Link to={node.fields.slug}> {node.frontmatter.title}</Link>
              </h2>
              <p className="text-gray-400 text-sm leading-none">
                <time className="post-time inline-flex items-center my-2">
                  <CalendarIcon
                    className="mr-1 w-3.5 h-3.5"
                    style={{ color: "#f1af38" }}
                  />
                  {node.frontmatter.date}
                </time>
              </p>
            </header>
            <div className="text-gray-600 leading-7">{node.excerpt}</div>
            <footer className="mt-2">
              <p className="text-gray-400">
                <Category
                  type={filterCategory(node.frontmatter.category) as any}
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
