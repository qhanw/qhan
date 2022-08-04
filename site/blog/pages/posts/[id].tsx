import Head from "next/head";

import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export default function Post({ postData }: any) {
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <div>
        {postData.title}
        <br />
        {postData.id}
        <br />
        {postData.date}
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const postData = await getPostData(params.id);
  return { props: { postData } };
}
