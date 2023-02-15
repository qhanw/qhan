// 迭代器模式-倒序迭代器
// 倒序迭代器
const reverseEach = function (ary, callback) {
  for (let l = ary.length - 1; l >= 0; l--) {
    callback(l, ary[l]);
  }
};

reverseEach([0, 1, 2], function (i, n) {
  console.log(n)
});


// 中止迭代器
const each = function (ary, callback) {
  for (let i = 0, l = ary.length; i < l; i++) {
    if (callback(i, ary[i]) === false) {
      break;
    }
  }
};

each([1, 2, 3, 4, 5], (i, n) => {
  if (n > 3) return false;
  console.log(n)
})
