---
title: Ant Design 弹窗简化代码示例
date: 2024-04-30T20:08:56+08:00
category: antd
tags: [antd]
---

### Modal&Drawer
由于在开发中常涉及大量弹窗运用，在之前常规则方式中，我们需要维护至少两个状态，即：控制显示的visible，与涉及操作的数据源:data。如果在一个页面中有多个弹窗时则维护的状态数据至少为2n。因些根据JS的一些隐式转换规则我们可以优化为一个，我们以Modal示例，具体代码如下：

### 方式一
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

#### 使用
```tsx
type ModalData = { id: number; name: string };

export default function Test() {
  const [data, setData] = useState<ModalData | false>();

  return <CustomModal data={data} onCancel={() => setData(false)} onConfirm={() => {}} />;
}
```
### 方式二
在如上示例中，如涉及到深层次跨组件时，我们除了目前UMI 中的page-model 外，还可以使用React 的context API, 两种方式各有利弊。基于上述示例代码还还可以利用 useRef 与 useImperativeHandle，两API实现, 不同之片在于前者将状态维护在父组件中, 后者维护在自身。

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

#### 使用
```tsx
import { useRef } from 'react';

export default function Test() {
  const ref = useRef<CustomModalType>();

  return <CustomModal ref={ref} />;
}
```
