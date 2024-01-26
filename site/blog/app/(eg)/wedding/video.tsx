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
      player = new Plyr("#player", {
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "captions",
          "pip",
          "airplay",
          "fullscreen",
        ],
      });
    })();

    return () => {
      player?.destroy();
    };
  }, []);
  return (
    <video
      className="w-full aspect-video"
      id="player"
      loop
      // muted
      // autoPlay
      playsInline
      poster="/images/wedding/poster.jpg"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
