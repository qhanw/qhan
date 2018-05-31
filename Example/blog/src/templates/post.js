import React from "react";
import classNames from "classnames";
import Link from "gatsby-link";
import path from "ramda/src/path";
import "prismjs/themes/prism.css";
import styles from "./post.module.scss";

const getPost = path(["data", "markdownRemark"]);
const getContext = path(["pathContext"]);

const PostNav = ({ prev, next }) => (
  <div className={styles["post-nav"]}>
    {prev && <Link to={`/${prev.fields.slug}`}>上一篇：{prev.frontmatter.title}</Link>}
    {next && <Link to={`/${next.fields.slug}`}>下一篇：{next.frontmatter.title}</Link>}
  </div>
);

export default props => {
  const post = getPost(props);
  const { next, prev } = getContext(props); // Not to be confused with react context...
  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <PostNav prev={prev} next={next} />
    </div>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
