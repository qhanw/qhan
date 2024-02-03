"use client";
import { useEffect, useState } from "react";
// import AMapLoader from "@amap/amap-jsapi-loader";

// reference: https://blog.csdn.net/TanHao8/article/details/132019181
function isEnv() {
  const ua = window.navigator.userAgent;

  return {
    ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    wx: !!/micromessenger/.test(ua.toLowerCase()),
  };
}

type Env = { ios: boolean; wx: boolean };

export default function MapContainer() {
  const [env, setEnv] = useState<Env>();
  useEffect(() => {
    let map: any;
    // issue: https://github.com/vercel/next.js/issues/60862
    (async () => {
      const AMapLoader = (await import("@amap/amap-jsapi-loader")).default;
      AMapLoader.load({
        key: "5ffcb88a9d059f2b26f39122669061ff", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          map = new AMap.Map("container", {
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 17, // 初始化地图级别
            center: [105.65175, 32.377996], // 初始化地图中心点位置
          });

          const marker = new AMap.Marker({
            position: new AMap.LngLat(105.65175, 32.377996), // 经纬度对象，也可以是经纬度构成的一维数组[119.920486,30.245285]
            title: "锦宴",
          });

          map.add(marker);

          marker.on("click", openInfo); //鼠标点击标记事件 - 打开信息窗体

          //在指定位置打开信息窗体
          function openInfo() {
            //构建信息窗体中显示的内容
            const infoWindow = new AMap.InfoWindow({
              //   content: `<div>
              //   <div>四川省广元市利州区宝轮镇清江大道东段118号</div>
              //   <div>点击此处使用高德地图导航</div>
              //   </div>
              //   `,
              content: `广元市利州区宝轮镇清江大道东段118号`,
              //使用默认信息窗体框样式，显示信息内容
            });

            infoWindow.open(map, map.getCenter()); //原文是open(map, map.getCenter());
          }
        })
        .catch((e) => {
          console.log(e);
        });
    })();

    // 环境判断
    setEnv(isEnv());

    return () => {
      map?.destroy();
    };
  }, []);

  return (
    <div className="relative" onClick={() => console.log(3)}>
      <a
        className="block absolute top-0 left-0 h-full w-full z-10"
        // href={`${
        //   env?.ios ? "iosamap" : "androidamap"
        // }://navi?sourceApplication=qhan_wedding&poiname=锦宴&poiid=B0JR1RTFUJ&lon=105.65175&lat=32.377996&dev=1&style=2`}

        href={`${
          env?.ios
            ? "iosamap://path?sourceApplication=qhan&"
            : "amapuri://route/plan/?"
        }sid=&slat=&slon=&sname=&did=B0JR1RTFUJ&dlat=32.377996&dlon=105.65175&dname=锦宴&dev=0&t=0`}
        {...(env?.wx
          ? {
              onClick: () =>
                alert(
                  "点击微信右上角，在浏览器里打开当前页面，然后点击地图可进行导航！"
                ),
            }
          : {})}
      />
      <div id="container" className="w-full aspect-video rounded-sm" />
    </div>
  );
}
