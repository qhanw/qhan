"use client";
import { useEffect } from "react";
import Image from "next/image";

import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

const placeholder = "/images/projects/placeholder.jpg";

type PicGalleryProps = {
  id: string;
  images: { url: string; thumbnail: string; width: number; height: number }[];
};

export default function PicGallery({ id, images }: PicGalleryProps) {
  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
      gallery: "#" + id,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox?.destroy();

      lightbox = null;
    };
  }, [id]);

  return (
    <div className="pswp-gallery grid grid-cols-2 md:grid-cols-3 gap-4" id={id}>
      {images.map((image, index) => (
        <a
          href={image.url}
          data-pswp-width={image.width}
          data-pswp-height={image.height}
          data-cropped="true"
          key={id + "-" + index}
          target="_blank"
          rel="noreferrer"
          className="relative aspect-[1/0.618]"
        >
          <Image
            className="rounded"
            fill
            // 根据响应式选择合适的图片
            // https://tailwindcss.com/docs/responsive-design
            // 640 768 1024 1280 1536
            sizes="(max-width: 768px) 192px, 128px"
            src={image.thumbnail || placeholder}
            alt={id + "-" + index}
            style={{ objectFit: "cover" }}
          />
        </a>
      ))}
    </div>
  );
}
