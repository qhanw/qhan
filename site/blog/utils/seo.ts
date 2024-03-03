import { Metadata } from "next";
import { siteMetadata } from "./config";

type SeoProps = {
  title?: string;
  description?: string;
  lang?: string;
  children?: React.ReactNode;
};

export default function seo({ description, title }: SeoProps): Metadata {
  const metaDescription = description || siteMetadata.description;

  return {
    metadataBase: new URL("https://qhan.wang"),
    title: title ? `${title} - ${siteMetadata?.title}` : siteMetadata?.title,
    description: metaDescription,
    icons: { icon: "/favicon.png" },

    openGraph: {
      type: "website",
      title: title,
      description: metaDescription,
      siteName: siteMetadata.siteTitle,

      // 仅文章列表配置该属性，使用 opengraph-image 自动生成
      // https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx
      // images: `https://og-image.vercel.app/${encodeURI(
      //   siteMetadata.siteTitle
      // )}.png?theme=light&md=0&fontSize=75px`,
      // images: "/favicon.png",
      // images: "https://qhan.wang/images/wedding/poster.jpg",
    },
    twitter: {
      card: "summary_large_image",
      // site: siteMetadata.siteTitle,
      creator: siteMetadata?.social?.twitter,
      title: title,
      description: metaDescription,
    },
  };
}
