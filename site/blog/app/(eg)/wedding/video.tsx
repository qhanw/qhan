"use client";
import { useEffect } from "react";
// issue: https://github.com/vercel/next.js/issues/60862
// import Plyr from "plyr";
import "plyr/dist/plyr.css";

type VideoProps = {
  src: string;
};

export default function Video({ src }: VideoProps) {
  useEffect(() => {
    let player: any = null;

    // issue: https://github.com/vercel/next.js/issues/60862
    (async () => {
      const Plyr = (await import("plyr")).default;
      player = new Plyr("#player");
    })();

    return () => {
      player?.destroy();
    };
  }, []);
  return (
    <video
      className="w-full aspect-video"
      id="player"
      // play-inline="true"
      controls
      loop
      muted
      autoPlay
      preload="auto"
      data-poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
    >
      <source src={src} type="video/mp4" />
      {/* <source src="/path/to/video.webm" type="video/webm" /> */}
      {/* <track
        kind="captions"
        label="English captions"
        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
        src-lang="en"
        default
      /> */}
    </video>
  );
}
