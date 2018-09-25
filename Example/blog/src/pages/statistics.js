import React from "react";
import Layout from "../components/Layout";

const SecondPage = ({ data }) => {
  return (
    <Layout>
      <h1>My Site's Files</h1>
      <table>
        <thead>
          <tr>
            <th>relativePath</th>
            <th>prettySize</th>
            <th>extension</th>
            <th>birthTime</th>
          </tr>
        </thead>
        <tbody>
          {data.allFile.edges.map(({ node }, index) => (
            <tr key={index}>
              <td>{node.relativePath}</td>
              <td>{node.prettySize}</td>
              <td>{node.extension}</td>
              <td>{node.birthTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default SecondPage;

export const query = graphql`
  query MyFilesQuery {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`;
