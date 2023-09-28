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
    title: title ? `${title} - ${siteMetadata?.title}` : siteMetadata?.title,
    description: metaDescription,
    icons: { icon: "/favicon.png" },

    openGraph: {
      type: "website",
      title: title,
      description: metaDescription,
      siteName: siteMetadata.siteTitle,
      images: `https://og-image.vercel.app/${encodeURI(
        siteMetadata.siteTitle
      )}.png?theme=light&md=0&fontSize=75px`,
    },
    twitter: {
      card: "summary",
      creator: siteMetadata?.social?.twitter,
      title: siteMetadata?.title,
      description: metaDescription,
    },
  };
}
