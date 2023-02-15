// 装饰器模式-AOP动态更改函数参数
Function.prototype.before = function (beforeFn) {
  const _self = this;
  return function () {
    beforeFn.apply(this, arguments);
    return _self.apply(this, arguments);
  }
};

let ajax = function (type, url, param) {
  console.log(param);
};

const getToken = function () {
  return 'Token';
};

ajax = ajax.before(function (type, url, param) {
  param.Token = getToken();
});

ajax('get', 'http:// xxx.com/userinfo', { name: 'elvis' });
