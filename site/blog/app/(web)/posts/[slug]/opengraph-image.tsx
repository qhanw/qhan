import { ImageResponse } from "next/og";
import { default as ImageIcon } from "next/image";

import { getPostBySlug } from "@/app/(web)/lib/posts";

// export const runtime = "edge";

export const alt = "Qhan W";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 120,
        }}
      >
        <ImageIcon
          sizes="100vw"
          style={{ borderRadius: 64, width: 72, height: "auto" }}
          width={72}
          height={72}
          alt="avatar"
          src={`https://qhan.wang/favicon.png`}
          //style={{ borderRadius: 64, width: 72 }}
        />
        <div
          style={{ display: "flex", marginLeft: 60, flexDirection: "column" }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: "rgba(156,163,175)",
              marginBottom: 16,
            }}
          >
            {alt}
          </div>
          <div style={{ fontSize: 48, color: "rgba(75,85,99)" }}>
            {post.meta.title}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
