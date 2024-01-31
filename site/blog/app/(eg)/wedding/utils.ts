import wx from "weixin-js-sdk";

export const navigationWx = (addressInfo: any) => {
  const { lat, lng, name, address } = addressInfo;

  alert(1);
  wx.ready(function () {
    alert(2);
    wx.openLocation({
      //infoUrl: "fw",
      // @ts-ignore
      type: "gcj02",
      latitude: Number(lat),
      longitude: Number(lng),
      name: name,
      scale: 18,
      address: address || "",
      complete(...args) {
        alert(JSON.stringify(args));
      },
    });
  });
};

export const navToMap = (addressInfo: any, type: Number) => {
  const { lat, lng, name, address } = addressInfo;
  const addressStr = address || "";

  let url;
  const u = navigator.userAgent;

  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;

  if (!isIOS && !isAndroid) {
    return alert("此设备暂不支持");
  }

  switch (type) {
    case 1:
      url = `baidumap://map/walknavi?destination=${lat},${lng}&title=${name}&content=${addressStr}&output=html&coord type=gcj02&src=test`;
      break;

    case 2:
      url = `qqmap://map/marker?marker=coord:${lat},${lng};title:${name};addr:${addressStr}&referer=腾讯地图Key`;
      break;

    default:
      url = `${
        isIOS ? "iosamap" : "androidamap"
      }://navi?sourceApplication=qhan_wedding&poiname=${name}&poiid=B0JR1RTFUJ&lon=${lng}&lat=${lat}&dev=1&style=2`;

      // 'iosamap://navi?sourceApplication=qhan&poiname=${name}&lat=${lat}&&lon=${lng}&dev=0&t=2'
      // 'androidamap://viewMap?sourceApplication=qhan&poiname=${name}&lat=${lat}&lon=${lng}&dev=0&t=2'
      break;
  }

  if (url) window.location.href = url;
};

export const isWx = () => {
  const u = navigator.userAgent.toLowerCase();

  if (/micromessenger/.test(u)) {
    return new Promise((resolve) => {
      wx.miniProgram.getEnv(function (res) {
        if (res.miniProgram) {
          resolve("mini-wx");
        } else {
          resolve("wx");
        }
      });
    });
  } else {
    return new Promise((resolve) => {
      resolve("no-wx");
    });
  }
};

export function jsSdkConfig(cfg: any) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: "wx710dc9a208086c41", // 必填，企业号的唯一标识，此处填写企业号corpid
    timestamp: cfg.timestamp, // 必填，生成签名的时间戳（10位）
    nonceStr: cfg.nonceStr, // 必填，生成签名的随机串,注意大小写
    signature: cfg.signature, // 必填，签名，见附录1（通过https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign 验证）
    jsApiList: ["getLocation", "openLocation"], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
}
