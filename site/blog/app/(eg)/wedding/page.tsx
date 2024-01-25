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
      <div className="text-xl text-center">王麒涵 & 付云英</div>
      <div>2024/02/13｜甲辰年正明初四｜星期二</div>

      <div>锦宴</div>
      <div>四川省广元市利州区宝轮镇富丽东方天顺大厦</div>

      <Amap />
    </>
  );
}
