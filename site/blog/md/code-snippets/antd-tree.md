---
title: Ant Design 树组件父子关联分离
date: 2024-06-06T20:08:56+08:00
category: js
tags: [js]
---

```ts
// 点击父节点关联子节点，子节点不关联父节点
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd/es/tree-select';
import { useState } from 'react';

type TreeSelectNodeAssociationProps = TreeSelectProps;

const treeToArray = (source: TreeSelectProps['treeData']) => {
  if (!source?.length) return [];
  const result: any = [];
  function f(data: any) {
    for (let i = 0, len = data.length; i < len; i += 1) {
      const { children, isLeaf, ...rest } = data[i];
      result.push(rest);
      if (children?.length) f(children);
    }
  }
  f(source);
  return result;
};

export default ({ value, onChange, treeData, ...otherProps }: TreeSelectNodeAssociationProps) => {
  const [val, setVal] = useState<any[]>(value);

  const onInnerChange: TreeSelectProps['onChange'] = (v, labelList, extra) => {
    setVal(v);
    onChange?.(v, labelList, extra);
  };

  const onInnerSelect: any = (_: string, node: any, extra: any) => {
    const { children, isLeaf, ...rest } = node;
    if (children) {
      const result = treeToArray(node.children); // 当前节点下的所有子节点

      // 过滤重复节点数据
      const resultIds = result.map((c: any) => c.value);
      const next = val?.filter((c) => !resultIds.includes(c.value)) || [];

      // 最终结果
      const final = [...next, rest, ...result];

      setVal(final);
      onChange?.(final, node, extra);
    }
  };

  return (
    <TreeSelect
      value={val || value}
      treeCheckStrictly
      labelInValue
      treeDefaultExpandAll
      showCheckedStrategy={TreeSelect.SHOW_ALL}
      maxTagCount={1}
      treeData={treeData}
      treeCheckable
      placeholder="请选择"
      dropdownMatchSelectWidth={false}
      onChange={onInnerChange}
      onSelect={onInnerSelect}
      {...otherProps}
    />
  );
};
```
