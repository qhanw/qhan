// 迭代器模式-简单迭代器
  const Iterator = function (obj) {
    let current = 0;
    const next = function () {
      current += 1;
    };
    const isDone = function () {
      return current >= obj.length;
    };

    const getCurrItem = function () {
      return obj[current];
    };

    return {
      next: next,
      isDone: isDone,
      getCurrItem: getCurrItem
    }
  };

  const compare = function (iterator1, iterator2) {
    while (!iterator1.isDone() && !iterator2.isDone()) {
      if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
        throw new Error('iterator1与iterator2不相等！');
      }
      iterator1.next();
      iterator2.next();
    }
    console.log('iterator1与iterator2相等');
  };

  const iterator1 = Iterator([1, 2, 3, 4]);
  const iterator2 = Iterator([1, 2, 3, 4]);

  compare(iterator1, iterator2);
