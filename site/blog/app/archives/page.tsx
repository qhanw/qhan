import seo from "@/utils/seo";

export async function generateMetadata() {
  return seo({ title: "归档" });
}

export default async function Archives() {
  // const data = await getAllPosts();

  // 计算出年段区间
  // const years = Array.from(
  //   new Set(
  //     edges.map(({ node }: any) => {
  //       return node.frontmatter.date.split("-")[0];
  //     })
  //   )
  // );
  // const nextData = years.map((year) => {
  //   return {
  //     year,
  //     edges: edges.filter(({ node }: any) =>
  //       node.frontmatter.date.includes(year)
  //     ),
  //   };
  // });

  return (
    <>
      {/* {nextData.map(({ year, edges }: any) => (
        <Fragment key={year}>
          <dl id="archive-item" className="mb-8">
            <dt className="text-3xl mb-4">{year}</dt>
            {edges.map(({ node }: any) => (
              <dd key={node.id} className="ml-8 mb-4">
                <span style={{ marginRight: 8 }}>{node.frontmatter.date}</span>
                <Link href={node.fields.slug}>{node.frontmatter.title}</Link>
              </dd>
            ))}
          </dl>
        </Fragment>
      ))} */}
    </>
  );
}

// export const query = graphql`
//   query ArchivesPage {
//     allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
//       edges {
//         node {
//           id
//           frontmatter {
//             title
//             date(formatString: "YYYY-MM-DD")
//           }
//           fields {
//             slug
//           }
//         }
//       }
//     }
//   }
// `;
