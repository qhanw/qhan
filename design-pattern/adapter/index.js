// 适配器模式

// 新数据结构
const guangdongCity = {
  shenzhen: 11,
  guangzhou: 12,
  zhuhai: 13,
};
// 旧数据结构
const getGuangdongCity = function () {
  const guangdongCity = [
    {
      name: "shenzhen",
      id: 11,
    },
    {
      name: "guangzhou",
      id: 12,
    },
  ];
  return guangdongCity;
};
const render = function (fn) {
  console.log("开始渲染广东省地图");
  console.info(
    JSON.stringify({
      ...guangdongCity,
      ...fn(),
    })
  );
};
const addressAdapter = function (oldAddressfn) {
  const address = {},
    oldAddress = oldAddressfn();
  for (let i = 0, c; (c = oldAddress[i++]);) {
    address[c.name] = c.id;
  }
  return function () {
    return address;
  };
};
render(addressAdapter(getGuangdongCity));

// --------------------------------------------
// 方法修正
const googleMap = {
  show: function () {
    console.log("开始渲染谷歌地图");
  },
};
const baiduMap = {
  display: function () {
    console.log("开始渲染百度地图");
  },
};
const baiduMapAdapter = {
  show: function () {
    return baiduMap.display();
  },
};

const renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show();
  }
};
renderMap(googleMap); // 输出：开始渲染谷歌地图
renderMap(baiduMapAdapter); // 输出：开始渲染百度地图
