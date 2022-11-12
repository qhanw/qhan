import { useEffect } from "react";
import { graphql, Link, PageProps } from "gatsby";
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

const Index = ({ data }: PageProps<any>) => {
  useEffect(() => {
    ScrollReveal().reveal(".section", {
      delay: 500,
      useDelay: "onload",
      reset: true,
      // origin: "right",
      distance: "120px",
    });
    return () => {
      ScrollReveal().destroy();
    };
  }, []);

  return (
    <Layout>
      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {/* <div className="uppercase py-1 mb-4 text-sm border-b border-gray-200 font-medium tracking-widest text-gray-400">
          Total {data.allMarkdownRemark.totalCount} Posts
        </div> */}

        {data.allMarkdownRemark.edges.map(({ node }: any) => (
          <figure
            className="section rounded-lg overflow-hidden bg-slate-50 text-sm hover:shadow-xl"
            key={node.id}
          >
            <figcaption className="flex items-center space-x-4 p-6 pb-0">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex-none object-cover overflow-hidden inline-flex items-center justify-center text-white">
                {node.frontmatter.category}
                {/* <Category
                  type={filterCategory(node.frontmatter.category) as any}
                  title={node.frontmatter.category}
                /> */}
              </div>
              <div className="flex-auto min-w-0">
                <h2 className="text-xl break-all whitespace-nowrap overflow-hidden overflow-ellipsis">
                  <Link
                    to={node.fields.slug}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    {node.frontmatter.title}
                  </Link>
                </h2>
                <p className="text-gray-400 text-sm leading-none">
                  <time className="post-time inline-flex items-center my-2">
                    <CalendarIcon
                      className="mr-1 w-4 h-4"
                      style={{ color: "#f1af38" }}
                    />
                    {node.frontmatter.date}
                  </time>
                </p>
                {/* <p className="text-slate-700 leading-none">
                  {node.frontmatter.tags.map((tag: string) => (
                    <PostLabel title={tag} key={tag} />
                  ))}
                </p> */}
              </div>
            </figcaption>

            <blockquote className="p-6 pt-6 text-slate-700">
              <p className="text-gray-600 line-clamp-3">{node.excerpt}</p>
            </blockquote>
          </figure>
        ))}
      </div>
    </Layout>
  );
};

export default Index;

export const Head = () => <Seo title="主页" />;

export const query = graphql`
  query IndexPage {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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
