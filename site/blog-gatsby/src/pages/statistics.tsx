import { StaticQuery, graphql } from "gatsby";
import Layout from "../components/Layout";

export default () => (
  <StaticQuery
    query={graphql`
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
    `}
    render={(data) => (
      <Layout>
        <h1>My Site's Files</h1>
        <div style={{ overflow: "auto" }}>
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
              {data.allFile.edges.map(({ node }: any, idx: number) => (
                <tr key={idx}>
                  <td>{node.relativePath}</td>
                  <td>{node.prettySize}</td>
                  <td>{node.extension}</td>
                  <td>{node.birthTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    )}
  />
);
