---
title: 数组求交集、并集、差集、补集
date: 2024-05-14T20:08:56+08:00
category: js
tags: [js]
---

#### 集合概念

- 并集（Union）：两个或多个集合中所有元素组成的集合，记作 A ∪ B。
- 交集（Intersection）：两个或多个集合中共有的元素组成的集合，记作 A ∩ B。
- 差集（Difference）：属于第一个集合而不属于第二个集合的所有元素组成的集合，记作 A - B 或 A \ B。
- 补集（Complement）：在某个固定的全集 U 中，不属于某个特定集合的所有元素组成的集合，记作 CuA 或 A'。
- 对称差集（Symmetric Difference）：两个集合中仅属于其中一个集合的元素组成的集合，记作 A △ B=(A ∖B ) ∪ (B ∖ A)。

#### 交集

- 方式一
```ts
const a = [1, 2, 3, 4];
const b = [2, 3, 4, 5];

// => [2, 3, 4]
const result = a.filter((item) => b.includes(item));
```

- 方式二
```ts
const a = [1, 2, 3, 4];
const b = [2, 3, 4, 5];

// => [2, 3, 4]
const result = a.filter((item) => b.indexOf(item) > -1);
```

- 方式三
> [!NOTE]
> 该方式可用到复杂对象数据求交集，根据判断指定项是否相同即可，也可指定多个项。
```ts
const a = [1, 2, 3, 4];
const b = [2, 3, 4, 5];

// => [2, 3, 4]
const result = a.filter((item) => b.find((child) => child === item));
```

#### 并集

- 方式一
```ts
const a = [1, 2, 3, 4];
const b = [2, 3, 4, 5];

// => [1, 2, 3, 4, 5]
const result = [...new Set([...a, ...b])];

// or
//const result = Array.from(new Set(a.concat(b)));
```

- 方式二
```ts
const a = [1, 2, 3, 4];
const b = [2, 3, 4, 5];

// => [1, 2, 3, 4, 5]
const result = a.concat(b.filter((item) => !a.includes(item)));
```

- 方式三 数组对象

```ts
const a = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Anna' },
  { id: 3, name: 'Ais' },
];
const b = [
  { id: 2, name: 'Anna' },
  { id: 3, name: 'Ais' },
];

// 此处也可用对象建立 hash 表
const map = new Map();

// => [{id: 1, name: 'Alice'}, {id: 2, name: 'Anna'}, {id: 3, name: 'Ais'}]
const result = a.concat(b).filter((item) => !map.has(item.id) && map.set(item.id, 1));

```

#### 差集

- 方式一

```ts
const a = [1, 2, 3, 4];
const b = [2, 3, 4, 5];

// =>  [1]
const result = a.filter((item) => !b.includes(item));
```

- 方式二

```ts
const a = [1, 2, 3, 4];
const b = [2, 3, 4, 5];

// =>  [1]
const result = a.filter((item) => !new Set(b).has(item));
```

- 方式三
> [!NOTE]
> 该方式可用到复杂对象数据求差集，根据判断指定项是否相同即可，也可指定多个项。
```ts
const a = [1, 2, 3, 4];
const b = [2, 3, 4, 5];

// => [1]
const result = a.reduce((pre, cur) => {
  if (!b.some((item) => item === cur)) {
    pre.push(cur);
  }
  return pre;
}, [] as any);

```

#### 对称差集

- 方式一
```ts
const a = [1, 2, 3, 4];
const b = [2, 3, 4, 5];

// => [1, 5]
const result = [...a.filter((item) => !b.includes(item)), ...b.filter((item) => !a.includes(item))];
```

- 方式二
```ts
const a = [1, 2, 3, 4];
const b = [2, 3, 4, 5];

// => [1, 5]
const result = [...a.filter((item) => !new Set(b).has(item)), ...b.filter((item) => !new Set(a).has(item))];
```

- 方式三
```ts
const a = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Ais' },
  { id: 3, name: 'Amy' },
];
const b = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Ais' },
  { id: 4, name: 'Anna' },
];

// => [{id: 3, name: 'Amy'}, {id: 4, name: 'Anna'}]
const result = [
  ...a.filter((item) => !b.find((child) => item.id == child.id)),
  ...b.filter((item) => !a.find((child) => item.id == child.id))
];
```
