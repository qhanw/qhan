import { Fragment, useEffect } from "react";

import ScrollReveal from "scrollreveal";
import Link from "next/link";
import Seo from "../components/Seo";
import Layout from "../components/Layout";

export default ({
  data: {
    allMarkdownRemark: { edges },
  },
}: any) => {
  // useEffect(() => {
  //   ScrollReveal().reveal("#archive-item", {
  //     delay: 500,
  //     useDelay: "onload",
  //     reset: true,
  //     origin: "right",
  //     distance: "120px",
  //   });
  //   return () => {
  //     ScrollReveal().destroy();
  //   };
  // }, []);

  // 计算出年段区间
  const years = Array.from(
    new Set(
      edges.map(({ node }: any) => {
        return node.frontmatter.date.split("-")[0];
      })
    )
  );
  const nextData = years.map((year) => {
    return {
      year,
      edges: edges.filter(({ node }: any) =>
        node.frontmatter.date.includes(year)
      ),
    };
  });

  return (
    <Layout>
      <Seo title="归档" />
      {nextData.map(({ year, edges }: any) => (
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
      ))}
    </Layout>
  );
};

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
