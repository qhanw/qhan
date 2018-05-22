import React from "react";
import Link from "gatsby-link";
import IconCalendar from "../components/Icons/calendar";
import IconTags from "../components/Icons/tags";
import IconTag from "../components/Icons/tag";
import IconFolder from "../components/Icons/folder";
const IndexPage = ({ data }) => (
  <div>
    <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id} className="article-box">
        <header className="article-header">
          <h3>
            <Link to={node.fields.slug}> {node.frontmatter.title}</Link>
          </h3>
          <div className="article-meta">
            <time className="time label">
              <IconCalendar />
              {node.frontmatter.date}
            </time>
          </div>
        </header>
        <div className="article-excerpt">{node.excerpt}</div>
        <footer className="article-footer article-meta">
          <a href="#" className="label">
            <IconFolder />
            {node.frontmatter.category}
          </a>
          {node.frontmatter.tags.map(tag => (
            <a href="#" key={tag} className="label">
              <IconTag />
              {tag}
            </a>
          ))}
        </footer>
      </div>
    ))}
  </div>
);

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
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
