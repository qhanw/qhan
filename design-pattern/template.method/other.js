// 模板方法模式
const Beverage = function (param) {
  const boilWater = () => console.log('把水煮沸');
  const brew = param.brew || function () {
    throw new Error('子类必须重写brew方法');
  };
  const poUrInCup = param.poUrInCup || function () {
    throw new Error('子类必须重写poUrInCup方法');
  };

  const addCondiments = param.addCondiments || function () {
    throw new Error('子类必须重写addCondiments 方法');
  };

  const F = function () { };
  F.prototype.init = function () {
    boilWater();
    brew();
    poUrInCup();
    addCondiments();

  }
  return F;
};

const Coffee = Beverage({
  brew: () => console.log('用沸水冲泡咖啡'),
  poUrInCup: () => console.log('把咖啡倒进杯子'),
  addCondiments: () => console.log('加糖和牛奶')
});

const Tea = Beverage({
  brew: () => console.log('用沸水浸泡茶叶'),
  poUrInCup: () => console.log('把茶倒进杯子'),
  addCondiments: () => console.log('加柠檬')
});

const coffee = new Coffee();
coffee.init();

console.log('------------------------------------------------------');

const tea = new Tea();
tea.init();
