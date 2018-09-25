/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
//import {format, compareAsc} from 'date-fns/esm'

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const format = require(`date-fns/format`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `source` });
    createNodeField({
      node,
      name: `slug`,
      value: format(node.frontmatter.date, "YYYY/MM/DD") + slug
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              fields {
                slug
              }
            }
            next {
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
            prev: previous {
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node, next, prev }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/post.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
            next: next, // See NOTE
            prev: prev
          }
        });
      });

      resolve();
    });
  });
};
