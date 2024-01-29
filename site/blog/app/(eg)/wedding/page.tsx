import type { Metadata } from "next";
import Link from "next/link";
import Video from "./video";
import Amap from "./amap";

import "./styles.scss";

export const metadata: Metadata = {
  metadataBase: new URL("https://qhan.wang"),
  title: "W & F 的婚礼请柬",
  description: "W & F 的婚礼请柬",
  icons: { icon: "https://qhan.wang/favicon.png" },

  openGraph: {
    type: "website",
    title: "W & F 的婚礼请柬",
    description: "诚邀请您参加我们的婚礼，见证我们的爱情之路，共享美好时刻！",
    images: "https://qhan.wang/images/wedding/poster.jpg",
    // siteName:'Qhan W',
    // url:''
  },
};

export default function Wedding() {
  return (
    <>
      <Video
        // src={
        //   "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
        // }
        src="http://s7ujthtod.hn-bkt.clouddn.com/1%E6%9C%8826%E6%97%A5.mp4"
      />
      <div className="text-center px-4 py-8 text-yellow-600">
        <div>爱如长途跋涉</div>
        <div>我们必将步履不停</div>
        <div>诚邀请您一同见证</div>

        <div className="text-3xl my-4">王麒涵 & 付云英</div>

        <div className="flex items-center justify-center">
          新婚之喜
          <span className="inline-block rounded-full w-1 h-1 bg-yellow-600 mx-1" />
          敬备喜酌
        </div>
        <div className="my-4">
          <div className="text-xl">锦宴</div>
          <div>广元市利州区宝轮镇清江大道东段118号</div>
        </div>

        <div className="my-4">2024/02/13｜甲辰年正月初四｜星期二</div>

        <Amap />
        <footer className="flex items-center justify-center py-8">
          <Link className="text-yellow-600" href="/">
            <span className="i-logos-sakura w-4 h-4 logo-rotate" />
          </Link>

          <div className="text-sm opacity-50 ml-1">
            ©2022-2023 Qhan W. All Rights Reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
