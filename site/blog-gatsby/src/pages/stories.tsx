import { useEffect } from "react";
import { graphql, Link } from "gatsby";
import type { PageProps } from "gatsby";
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

const Index = ({ data }: PageProps<Queries.IndexPageQuery>) => {
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
      <div className="uppercase py-1 mb-4 -mt-8 text-sm text-center font-medium tracking-widest text-slate-400">
        Total {data.allMarkdownRemark.totalCount} Posts
      </div>
      <div className="grid gap-8 max-w-screen-lg m-auto">
        {data.allMarkdownRemark.edges.map(({ node }: any) => (
          <Link
            to={node.fields.slug}
            className="p-6 section rounded-lg overflow-hidden cursor-pointer bg-slate-50 text-sm transition hover:shadow-lg hover:transition"
            key={node.id}
          >
            <div className="text-slate-400 text-sm leading-none flex items-center">
              <time className="post-time inline-flex items-center my-2">
                <CalendarIcon
                  className="mr-1 w-4 h-4"
                  style={{ color: "#f1af38" }}
                />
                {node.frontmatter.date}
              </time>
              <span className="mx-2 w-0.5 h-0.5 rounded-full bg-slate-400" />
              {/* {node.frontmatter.category} */}
              {node.frontmatter.tags.map((tag: string) => (
                <PostLabel title={tag} key={tag} />
              ))}
            </div>
            <h2 className="pt-1 pb-2 text-xl text-slate-700 hover:text-indigo-800 break-all whitespace-nowrap overflow-hidden overflow-ellipsis">
              {node.frontmatter.title}
            </h2>

            <p className="text-slate-500 line-clamp-3">{node.excerpt}</p>
          </Link>
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
