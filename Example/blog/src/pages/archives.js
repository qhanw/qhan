import React from "react";
import Link from "gatsby-link";

const ArchivesPage = ({ data }) => {
  console.log(data)
  const {
    allMarkdownRemark: { edges }
  } = data;

  // 计算出年段区间
  const years = Array.from(
    new Set(
      edges.map(({ node }) => {
        return node.frontmatter.date.split("-")[0];
      })
    )
  );
  const nextData = years.map(year => {
    return {
      year,
      edges: edges.filter(({ node }) => node.frontmatter.date.includes(year))
    };
  });

  return (
    <div>
      {nextData.map(({ year, edges }) => (
        <div key={year}>
          <h2>{year}</h2>
          <ul>
            {edges.map(({ node }) => (
              <li key={node.id}>
                <span style={{ marginRight: 8 }}>{node.frontmatter.date}</span>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ArchivesPage;

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
