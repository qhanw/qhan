import React, { Fragment, PureComponent } from "react";
import Link from "gatsby-link";
import ScrollReveal from "scrollreveal";
import { StaticQuery, graphql } from "gatsby";
import Layout from "../components/Layout";

class ArchivesPage extends PureComponent {
  componentDidMount() {
    ScrollReveal().reveal(".archive-caption, .archive-content>li", {
      delay: 500,
      useDelay: "onload",
      reset: true,
      origin: "right",
      distance: "120px"
    });
  }
  componentWillUnmount() {
    //this.c.destroy();
    ScrollReveal().destroy();
  }
  render() {
    const {
      data: {
        allMarkdownRemark: { edges }
      }
    } = this.props;

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
      <Layout>
        {nextData.map(({ year, edges }) => (
          <Fragment key={year}>
            <h2 className="archive-caption">{year}</h2>
            <ul className="archive-content">
              {edges.map(({ node }) => (
                <li key={node.id}>
                  <span style={{ marginRight: 8 }}>
                    {node.frontmatter.date}
                  </span>
                  <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </Layout>
    );
  }
}

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
