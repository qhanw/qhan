"use client";
import { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

type PicGalleryProps = {
  id: string;
  images: { url: string; thumbnail: string; width: number; height: number }[];
};

export default function PicGallery(props: PicGalleryProps) {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#" + props.id,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();

      // @ts-ignore
      lightbox = null;
    };
  }, []);

  return (
    <div className="pswp-gallery grid grid-cols-3 gap-4" id={props.id}>
      {props.images.map((image, index) => (
        <a
          href={image.url}
          data-pswp-width={image.width}
          data-pswp-height={image.height}
          data-cropped="true"
          key={props.id + "-" + index}
          target="_blank"
          rel="noreferrer"
        >
          <img src={image.thumbnail} alt="" />
        </a>
      ))}
    </div>
  );
}
