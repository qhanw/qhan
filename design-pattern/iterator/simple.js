
// 迭代器模式-简单迭代器
// 简单遍历实现
const each = function (ary, callback) {
  for (let i = 0, l = ary.length; i < l; i++) {
    callback.call(ary[i], i, ary[i]);
  }
};

each([1, 2, 3, 4, 5], (i, n) => console.log(i, n));

// --------------------------------------------------
// 简单对比，可引申至对象对比
const compare = function (ary1, ary2) {
  if (ary1.length !== ary2.length) {
    throw new Error('ary1与ary2不相等');
  }
  each(ary1, function (i, n) {
    if (n !== ary2[i]) {
      throw new Error('ary1与ary2不相等');
    }
  });
  console.log('ary1与ary2相等');
};

compare([1, 2, 3], [1, 2, 4])
