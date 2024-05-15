---
title: 数组转树
date: 2024-05-15T20:08:56+08:00
category: js
tags: [js]
---

- 方式一 性能最好
```ts
// reference: https://juejin.cn/post/6983904373508145189
export function arrayToTree(items: any) {
  const result = []; // 存放结果集
  const itemMap: any = {};
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;

    if (!itemMap[id]) {
      itemMap[id] = { children: [] };
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children'],
    };

    const treeItem = itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = { children: [] };
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}
```

- 方式二
```ts
// Reference: https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/139
export function convert(
  list: any[],
  { id = 'id', pid = 'pid' }: { id: string | number; pid: string | number },
) {
  const res = [];
  const map = list.reduce((res, v) => ((res[v[id]] = v), res), {});
  for (const item of list) {
    if (!item[pid]) {
      res.push(item);
      continue;
    }
    if (item[pid] in map) {
      const parent = map[item[pid]];
      parent.children = parent.children || [];
      parent.children.push(item);
    }
  }
  return res;
}
```

- 方式三
```ts
// Reference: https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript
export function arrayToTree(list: any[]) {
  let map = {},
    roots = [],
    node,
    i;
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId !== '0') {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
```


