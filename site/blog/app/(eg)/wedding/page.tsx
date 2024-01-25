import Video from "./video";
import Amap from "./amap";

export default function Wedding() {
  return (
    <>
      <Video
        src={
          "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
        }
      />
      <div className="text-center px-4 py-8 text-yellow-600">
        <div>爱如长途跋涉</div>
        <div>我们必将步骤不停</div>
        <div>诚邀您一同见证</div>

        <div className="text-3xl my-4">王麒涵 & 付云英</div>

        <div className="flex items-center justify-center">
          新婚之喜
          <span className="inline-block rounded-full w-1 h-1 bg-yellow-600 mx-1" />
          敬备喜酌
        </div>
        <div className="my-4">
          <div className="text-xl">锦宴</div>
          <div>四川省广元市利州区宝轮镇清江大道东段118号</div>
        </div>

        <div className="my-4">2024/02/13｜甲辰年正明初四｜星期二</div>

        <Amap />
      </div>
    </>
  );
}
