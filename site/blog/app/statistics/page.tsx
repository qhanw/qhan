import Layout from "../components/Layout";

export default () => {
  // const data = useStaticQuery(graphql`
  //   query MyFilesPage {
  //     allFile {
  //       edges {
  //         node {
  //           relativePath
  //           prettySize
  //           extension
  //           birthTime(fromNow: true)
  //         }
  //       }
  //     }
  //   }
  // `);

  return (
    <Layout>
      <h1 className="text-2xl mb-6">My Site Files</h1>
      <div style={{ overflow: "auto" }}>
        <table className="w-full table-auto border border-solid border-gray-200 rounded-md overflow-hidden">
          <thead>
            <tr className="text-left bg-gray-200 text-xl">
              <th className="px-6 py-3 font-medium text-gray-600">
                RelativePath
              </th>
              <th className="px-6 py-3 font-medium text-gray-600">
                PrettySize
              </th>
              <th className="px-6 py-3 font-medium text-gray-600">Extension</th>
              <th className="px-6 py-3 font-medium text-gray-600">BirthTime</th>
            </tr>
          </thead>
          <tbody>
            {/* {data.allFile.edges.map(({ node }: any, idx: number) => (
              <tr
                key={idx}
                className={`text-left ${
                  idx % 2 === 0 ? "bg-gray-200/10" : "bg-gray-200/50"
                }`}
              >
                <td className="px-6 py-3 text-gray-500">{node.relativePath}</td>
                <td className="px-6 py-3 text-gray-500">{node.prettySize}</td>
                <td className="px-6 py-3 text-gray-500">{node.extension}</td>
                <td className="px-6 py-3 text-gray-500">{node.birthTime}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};
