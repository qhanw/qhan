import React, { PureComponent } from "react";
import Link from "gatsby-link";
import ScrollReveal from "scrollreveal";
import IconCalendar from "../components/Icons/calendar";
import Layout from "../components/Layout";
import IconTag from "../components/Icons/tag";
import IconFolder from "../components/Icons/folder";

const filterCategory = name => {
  const types = {
    css: ["css", "css3", "scss", "less"],
    js: ["javascript", "ecmaScript", "js", "jsx", "ts", "typescript", "node"],
    md: ["md", "markdown"],
    jsx: ["jsx", "tsx", "react"]
  };

  for (let [key, value] of Object.entries(types)) {
    if (value.find(type => type.toUpperCase() === name.toUpperCase())) {
      return key;
    }
  }
  return "other";
};

class IndexPage extends PureComponent {
  componentDidMount() {
    ScrollReveal().reveal(".post", {
      delay: 500,
      useDelay: "onload",
      reset: true,
      origin: "right",
      distance: "120px"
    });
    // ScrollReveal().reveal(".post:first-child", {
    //   delay: 0,
    //   interval: 80
    // });
  }
  componentWillUnmount() {
    //this.c.destroy();
    ScrollReveal().destroy();
  }
  render() {
    const { data } = this.props;
    return (
      <Layout>
        <div className="posts">
          <h1 className="content-subhead">
            Total {data.allMarkdownRemark.totalCount} Posts
          </h1>

          {data.allMarkdownRemark.edges.map(({ node }) => (
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
                  <time className="post-time post-label">
                    <IconCalendar />
                    {node.frontmatter.date}
                  </time>
                </p>
              </header>
              <div className="post-description">{node.excerpt}</div>
              <footer className="post-footer">
                <p className="post-meta">
                  <a
                    href="#"
                    className={`post-label post-category post-category-${filterCategory(
                      node.frontmatter.category
                    )}`}
                  >
                    <IconFolder />
                    {node.frontmatter.category}
                  </a>
                  {node.frontmatter.tags.map(tag => (
                    <a href="#" key={tag} className="post-label">
                      <IconTag />
                      {tag}
                    </a>
                  ))}
                </p>
              </footer>
            </section>
          ))}
        </div>
      </Layout>
    );
  }
}

export default IndexPage;

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
