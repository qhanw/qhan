import { useEffect } from "react";
import { graphql, Link } from "gatsby";
import ScrollReveal from "scrollreveal";
import { CalendarIcon } from "@heroicons/react/24/outline";

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

const Cases = ({ data }: any) => {
  useEffect(() => {
    ScrollReveal().reveal(".section", {
      delay: 500,
      useDelay: "onload",
      reset: true,
      origin: "right",
      distance: "120px",
    });
    ScrollReveal().reveal(".section", {
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
      <div className="posts grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {/* <div className="uppercase py-1 mb-4 text-sm border-b border-gray-200 font-medium tracking-widest text-gray-400">
          Total {data.allMarkdownRemark.totalCount} Posts
        </div> */}

        {data.allMarkdownRemark.edges.map(({ node }: any) => (
          <section
            className="section rounded-lg overflow-hidden shadow-lg"
            key={node.id}
          >
            <div className="w-full aspect-video bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="p-6">
              <header className="post-header">
                <h2 className="text-xl overflow-hidden overflow-ellipsis break-all whitespace-nowrap">
                  <Link
                    to={node.fields.slug}
                    className="inline-flex items-center text-gray-700 hover:text-gray-900"
                  >
                    {node.frontmatter.title}
                  </Link>
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
              <div className="text-gray-600 leading-7 line-clamp-3">
                {node.excerpt}
              </div>
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
            </div>
          </section>
        ))}
      </div>
    </Layout>
  );
};

export default Cases;

export const Head = () => <Seo title="主页" />;

export const query = graphql`
  query CasesQuery {
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
