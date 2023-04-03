import Head from "next/head";
import { siteMetadata } from "@/config";

type SeoProps = {
  title?: string;
  description?: string;
  lang?: string;
  children?: React.ReactNode;
};

export default function Seo({ description, title }: SeoProps) {
  const metaDescription = description || siteMetadata.description;

  return (
    <Head>
      <title>
        {title ? `${title} | ${siteMetadata?.title}` : siteMetadata?.title}
      </title>
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:site_name" content={siteMetadata.siteTitle} />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURI(
          siteMetadata.siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={siteMetadata?.social?.twitter} />
      <meta name="twitter:title" content={siteMetadata?.title} />
      <meta name="twitter:description" content={metaDescription} />
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
}
