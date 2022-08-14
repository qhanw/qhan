import React, { Fragment, useEffect } from "react";

import ScrollReveal from "scrollreveal";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";

export default ({
  data: {
    allMarkdownRemark: { edges },
  },
}: any) => {
  useEffect(() => {
    ScrollReveal().reveal(".archive-caption, .archive-content>li", {
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

  // 计算出年段区间
  const years = Array.from(
    new Set(
      edges.map(({ node }: any) => {
        return node.frontmatter.date.split("-")[0];
      })
    )
  );
  const nextData = years.map((year) => {
    return {
      year,
      edges: edges.filter(({ node }: any) =>
        node.frontmatter.date.includes(year)
      ),
    };
  });

  return (
    <Layout>
      {nextData.map(({ year, edges }: any) => (
        <Fragment key={year}>
          <h2 className="archive-caption">{year}</h2>
          <ul className="archive-content">
            {edges.map(({ node }: any) => (
              <li key={node.id}>
                <span style={{ marginRight: 8 }}>{node.frontmatter.date}</span>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query ArchivesQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
