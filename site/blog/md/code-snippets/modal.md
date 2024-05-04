---
title: Ant Design 弹窗优化示例
date: 2024-04-30T20:08:56+08:00
category: antd
tags: [antd]
---

由于开发中常涉及大量弹窗运用，通常情况下，需维护至少两个状态，即：控制显示的`open`，与涉及操作的数据源`data`。如果在一个页面中，同时有多个弹窗时，则需要维护的状态数据为2n。在此背景下，我们以`Ant design`组件库的`Modal`和`Drawer`组件为例，提供两种状态管理方式以达到对性能的优化，减少组件的渲染。


### 方式一

根据JS的一些隐式转换规则我们可以优化`open`与`data`两个状态优化为一个，以`Modal`组件示例，具体代码如下：

```tsx
import { useEffect } from 'react';
import { Modal } from 'antd';

type ModalProps = { data: any; onCancel: () => void; onConfirm: () => void };

export default function CustomModal({ data, onCancel }: ModalProps) {
  useEffect(() => {
    if (data) {
      // 根据传值，进行处理
    }
  }, [data]);

  return (
    <Modal title="Modal" open={!!data} onCancel={onCancel}>
      // modal content
    </Modal>
  );
}
```
```tsx
// Usage
type ModalData = { id: number; name: string };

export default function Test() {
  const [data, setData] = useState<ModalData | false>();

  return <CustomModal data={data} onCancel={() => setData(false)} onConfirm={() => {}} />;
}
```
### 方式二
在方式一中，如涉及到深层次跨组件传递状态则非常的麻烦，在父组件中维护一个或多个状态需多次逐级传递，当然也可以使用状态管理库来实现相同效果。不过在React中还可以利用`useRef`与`useImperativeHandle`实现将状态维护在自身中，在某种意义上来说反而是弹窗状态管理的最优解，彻底做到了代码解耦。

```tsx
import { useState, useImperativeHandle, forwardRef } from 'react';
import { Modal } from 'antd';

type ModalProps = { fn?: () => void };
type ModalData = { id: number; name: string };

export type CustomModalType = { open?: (v: any) => void } | undefined;

const CustomModal = forwardRef<CustomModalType, ModalProps>(({ fn }, ref) => {
  const [data, setData] = useState<ModalData | false>();

  useImperativeHandle(ref, () => ({
    open: (v) => setData(v),
  }));

  return (
    <Modal title="Modal" open={!!data} onCancel={() => setData(false)}>
      // modal content
    </Modal>
  );
});
```
```tsx
// Usage
import { useRef } from 'react';

export default function Test() {
  const ref = useRef<CustomModalType>();

  return <CustomModal ref={ref} />;
}
```
