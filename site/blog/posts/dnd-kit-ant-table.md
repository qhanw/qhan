---
title: 基于dnd-kit实现Antd Table组件拖拽排序
date: 2022-11-05T10:58:55+08:00
category: js
tags: [react, antd]
---

### 背景
最近业务需求上要求对表格加入拖拽排序功能，由于我们UI组件库基于[antd][1]，根据组件库官方文档给出的基于[react-dnd][3]、[react-sortable-hoc][4]示例，与我们自身业务需求的调研，最后选择[react-sortable-hoc][4]库作为接入拖拽排序接入。在查阅该库相关文档的过程中其作者明确定不再积极维护，并强烈建议采用[dnd-kit][2]替换。本着~~学习的态度~~一步到位想法（偷懒)，因此最终决定直接使用[dnd-kit][2]库来实现拖拽排序功能。

---

### TOC

### 如何使用
要了解如何开始使用**dnd kit**，请访问[官方文档][5]网站。您会找到深入的 API 文档、提示和指南，以帮助您构建拖放界面。在本文档中，我们只针对**antd**的**table**组件如何成功接入**dnd-kit**排序功能说明。本文档也不会对各类拖拽组件作对比说明，若有需要请参阅: [React拖拽排序组件库对比研究][6]。

### 演示示例

![dnd-kit.gif](https://s2.loli.net/2023/09/19/RSNthKPCmHif5bD.webp)

### 开始
> dnd-kit 预置了专用于排序操作的sortable组件，因此接下来我们也仅针对antd table组件排序方面的流程做 详细说明。在这里我们也认为你当前环境已经基于antd的开发环境

首先，我们需要先安装**dnd-kit**相关依赖
```bash
pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/modifiers
```
2、创建一个名为`DndKitSortable.tsx`的文件，并编写基本的表格数据模板，表格需要关闭分页功能，因为拖拽排序不支持跨页。
```tsx
import { useState } from 'react';
import { DragOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import type { TableColumnProps } from 'antd';

const data = [
  { id: '1', name: '孔艳', age: 33, sex: '女' },
  { id: '2', name: '江艳', age: 90, sex: '男' },
  { id: '3', name: '姚娜', age: 17, sex: '女' },
  { id: '4', name: '何洋', age: 77, sex: '女' },
  { id: '5', name: '卢静', age: 47, sex: '男' },
];

type TableItem = {
  id: string;
  name?: string;
  sex?: string;
  age?: number;
  address?: string;
};

export default () => {
  const [dataSource, setDataSource] = useState<any[]>(data);

  const columns: TableColumnProps<TableItem>[] = [
    {
      title: '排序',
      dataIndex: 'sort',
      width: 60,
      render: () => <DragOutlined />,
      align: 'center',
    },
    { title: '姓名', dataIndex: 'name' },
    { title: '性别', dataIndex: 'sex' },
    { title: '年龄', dataIndex: 'age' },
    { title: '地址', dataIndex: 'address' },
  ];

  return <Table rowKey="id" dataSource={dataSource} columns={columns} pagination={false} />;
};
```

3、在文件`SortableItem.tsx`中引入**dnd-kit**相关依赖，并用组件`DndContext`与`SortableContext` 包裹`Table`组件
```diff
...
+ import { DndContext } from '@dnd-kit/core';
+ import { SortableContext } from '@dnd-kit/sortable';
...

export default () => {
...
  return (
+    <DndContext>
+      <SortableContext items={[]}>
        <Table rowKey="id" dataSource={dataSource} columns={columns} pagination={false} />
+      </SortableContext>
+    </DndContext>
  );
};
```

4、定义拖拽排序方向，及拖拽strategy策略。

在顶层组件`DndContext`中您可以定义拖拽的修饰方式。在本示例中我们将采用`restrictToVerticalAxis`修饰方式来限制拖拽排序保持在垂直方向。当然在其它场景中您也可以配置为水平方向。`DndContext`组件也内置了一些其修饰方式：
- `restrictToHorizontalAxis`：将移动限制在水平轴上。
- `restrictToVerticalAxis`：将移动限制在垂直轴上。
- `restrictToWindowEdges`：限制移动到窗口的边缘。防止将元素移出窗口边界。

更多修饰方式请查阅：[dnd-kit修饰符](https://docs.dndkit.com/api-documentation/modifiers)

`SortableContext`组件要求您将唯一标识符的排序数组传递给它，这些唯一标识符与在其中使用`useSortable`的元素相关联。即下面所定义`SortableItem.tsx`组件中`useSortable`的配置`id`。

`SortableContext`组件接受不同的排序策略来计算`useSortable`转换。内置策略包括：
- `rectSortingStrategy`：默认值，适用于大多数用例。不支持虚拟化列表。
- `verticalListSortingStrategy`：此策略针对垂直列表进行了优化，并支持虚拟化列表。
- `horizontalListSortingStrategy`：此策略针对水平列表进行了优化，并支持虚拟化列表。
- `rectSwappingStrategy`：使用此策略实现可交换功能。

在本示例中我们做垂直方向拖拽排序，因此我们使用`verticalListSortingStrategy`排序策略。

```diff
...
+ import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
+ import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
...
export default () => {
...
  return (
+    <DndContext modifiers={[restrictToVerticalAxis]}>
+      <SortableContext items={dataSource.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <Table rowKey="id" dataSource={dataSource} columns={columns} pagination={false} />
+      </SortableContext>
+    </DndContext>
  );
};
```

到此时，我们已经定义排序的最基本配置，接下来才是真正的对`Table`组件改造。首先我们需要使用`Table`组件的`components`属性对表格行元素进行重写。
```diff
...
+  <Table rowKey="id" dataSource={dataSource} columns={columns} pagination={false} components={{ body: { row: SortableItem } }}/>
...
```
> `Table`组件的`components`的详细说明，请查看文档：https://ant.design/components/table-cn/#API

此时，我们的程序会提示找不到**SortableItem**，是因为我们还未编写该组件，接下来我们将开始自定义表格行元素。

5、重写`Table`组件行元素，新建组件`SortableItem.tsx`, 并编写程序

在此处我们需要通过`useSortable`与列表元素的唯一标识符来建立绑定关系，在此处我们采用的是`Table`表格行元素内置属性`data-row-key`（即数据ID）来建立关系，即先取出`data-row-key`值，并分别传递给`useSortable`以及`tr`标签的`id`属性。

通过`useSortable`可以得到`attributes`, `listeners`, `setNodeRef`三个值，在这里，我们将这个值一并赋给`tr`标签。

```tsx
import { useSortable } from '@dnd-kit/sortable';

export function SortableItem(props: any) {
  const id = props['data-row-key'];

  const { attributes, listeners, setNodeRef } = useSortable({ id });

  return (
    <tr id={id} ref={setNodeRef} {...attributes} {...listeners} {...props} data-cypress="draggable-item" />
  );
}
```
6、添加拖动交互事件

为`DndContext`组件添加拖拽方法，在这里我们使用`onDragEnd`即可。同时需要用到`sortable`提供的`arrayMove`方法来处理排序后生成新的数据。到此时一个正常的基于**dnd-kit**可以拖动排序的antd表格就实现啦。
```diff
...
+ import type { DragEndEvent } from '@dnd-kit/core';
+ import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
...

export default () => {
+  const handleDragEnd = (event: DragEndEvent) => {
+    const { active, over } = event;
+    if (active.id !== over?.id) {
+      const oldIndex = dataSource.findIndex((item) => item.id === active.id);
+      const newIndex = dataSource.findIndex((item) => item.id === over?.id);
+      const next = arrayMove(dataSource, oldIndex, newIndex);
+      setDataSource(next);
+    }
+  };

  return (
+    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
...
    </DndContext>
  );
};

```


7、为排序添加交互样式  

在上一步，我们仅实现了基本的排序操作，在视觉上看着不是那么的丝滑，让我们为它添加一些视觉交互吧。

首先，通过`useSortable`得到`transform`, `transition`, `isDragging`三个属性。定义拖动样式。并为`tr`无素添加样式类。

```tsx
import { useSortable } from '@dnd-kit/sortable';
import './styles.less';

export function SortableItem(props: any) {
  const id = props['data-row-key'];
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const dragStyle = {
    transition,
    // transform: CSS.Translate.toString(transform),
    '--translate-x': `${transform?.x ?? 0}px`,
    '--translate-y': `${transform?.y ?? 0}px`,
  };

  const { style, className, ...rest } = props;

  const cls = [className, 'dragItem', isDragging ? 'dragOverlay' : null].filter((c) => c).join(' ');

  return (
    <tr
      id={props['data-row-key']}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cls}
      style={{ ...style, ...dragStyle }}
      {...rest}
      data-cypress="draggable-item"
    />
  );
}
```

新建`styles.scss`并编拖拽的交互样式。

```scss
@keyframes pop {
  0% {
    transform: translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scale(1);
    box-shadow: var(--box-shadow-picked-up);
  }
  100% {
    transform: translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scale(var(--scale));
    box-shadow: var(--box-shadow-picked-up);
  }
}

// 元素拖动样式
.dragItem {
  position: relative;
  touch-action: none;

  transform: translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scale(var(--scale, 1));
  transition: box-shadow 200ms ease;
}

.dragOverlay {
  --scale: 1.02;
  --box-shadow-picked-up: 0 0 0 calc(1px / var(--scale-x, 1)) rgba(63, 63, 68, 0.05),
    -1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25);

  animation: pop 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22);
  box-shadow: var(--box-shadow-picked-up);
  z-index: 1;

  // 禁止表格单无格元素的一些默认行为
  > td {
    border-color: transparent !important;
    > span {
      pointer-events: none;
    }
  }
}
```

8、定义表格拖拽把手

现在我们表格拖拽时是针对表格的整行操作，很多时候我们其实希望通过点击表格单元格的拖拽按钮进行排序。我们再对`SortableItem.tsx`组件进行改造一下。

找出表格`columns`定义时，排序按钮所在列的单元格（通过定义的`key`值，本示例中`key`为`sort`），对该单元格绑定监听，即将`listeners`绑定到该单元格。在这里最重要的知识点是对`react`的`children`元素赋予额外属性，需要用到两个react原生API：`React.Children`、`React.cloneElement`
```diff
+ import React from 'react';
...
export function SortableItem(props: any) {
+  const { style, className, children, ...rest } = props;
  return (
    <tr
      id={props['data-row-key']}
      ref={setNodeRef}
      {...attributes}
-     {...listeners}
      className={cls}
      style={{ ...style, ...dragStyle }}
      {...rest}
      data-cypress="draggable-item"
    >
+      {React.Children.map(children, (child) => {
+        if (child.key === 'sort') {
+          return React.cloneElement(child, {
+            additionalProps: { ...listeners, 'data-cypress': 'draggable-handle' },
+          });
+        }

+        return child;
+      })}
+    </tr>
  );
}
```
到此处，一个完整的丝滑的基于**dnd-kit**的antd表格组件排序就完成啦！～～～撒花


### 完整代码
`DndKitTable.tsx`
```tsx
import { useState } from 'react';
import { DragOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import type { TableColumnProps } from 'antd';

import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import { SortableItem } from './SortableItem';
import './styles.scss';

const data = [
  { id: '1', name: '孔艳', age: 33, sex: '女' },
  { id: '2', name: '江艳', age: 90, sex: '男' },
  { id: '3', name: '姚娜', age: 17, sex: '女' },
  { id: '4', name: '何洋', age: 77, sex: '女' },
  { id: '5', name: '卢静', age: 47, sex: '男' },
];

type TableItem = {
  id: string;
  name?: string;
  sex?: string;
  age?: number;
  address?: string;
};

export default () => {
  const [dataSource, setDataSource] = useState<any[]>(data);

  const columns: TableColumnProps<TableItem>[] = [
    {
      title: '排序',
      dataIndex: 'sort',
      width: 60,
      render: () => <DragOutlined />,
      align: 'center',
    },
    { title: '姓名', dataIndex: 'name' },
    { title: '性别', dataIndex: 'sex' },
    { title: '年龄', dataIndex: 'age' },
    { title: '地址', dataIndex: 'address' },
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = dataSource.findIndex((item) => item.id === active.id);
      const newIndex = dataSource.findIndex((item) => item.id === over?.id);

      const next = arrayMove(dataSource, oldIndex, newIndex);

      setDataSource(next);
    }
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
      <SortableContext items={dataSource.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <Table
          rowKey="id"
          className="dnd"
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          components={{ body: { row: SortableItem } }}
        />
      </SortableContext>
    </DndContext>
  );
};
```

`SortableItem.tsx`
```tsx
import React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import './styles.scss';

export function SortableItem(props: any) {
  const id = props['data-row-key'];
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const dragStyle = {
    transition,
    // transform: CSS.Translate.toString(transform),
    '--translate-x': `${transform?.x ?? 0}px`,
    '--translate-y': `${transform?.y ?? 0}px`,
  };

  const { style, className, children, ...rest } = props;

  const cls = [className, 'dragItem', isDragging ? 'dragOverlay' : null].filter((c) => c).join(' ');

  return (
    <tr
      id={id}
      ref={setNodeRef}
      {...attributes}
      // {...listeners}
      className={cls}
      style={{ ...style, ...dragStyle }}
      {...rest}
      data-cypress="draggable-item"
    >
      {React.Children.map(children, (child) => {
        if (child.key === 'sort') {
          return React.cloneElement(child, {
            additionalProps: { ...listeners, 'data-cypress': 'draggable-handle' },
          });
        }

        return child;
      })}
    </tr>
  );
}
```
`styles.scss`
```scss
@keyframes pop {
  0% {
    transform: translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scale(1);
    box-shadow: var(--box-shadow-picked-up);
  }
  100% {
    transform: translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scale(var(--scale));
    box-shadow: var(--box-shadow-picked-up);
  }
}

.dnd {
  .ant-table-tbody td[data-cypress='draggable-handle'] {
    cursor: pointer;
  }
}

// 元素拖动样式
.dragItem {
  position: relative;
  touch-action: none;

  transform: translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scale(var(--scale, 1));
  transition: box-shadow 200ms ease;
}

.dragOverlay {
  --scale: 1.02;
  --box-shadow-picked-up: 0 0 0 calc(1px / var(--scale-x, 1)) rgba(63, 63, 68, 0.05),
    -1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25);

  animation: pop 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22);
  box-shadow: var(--box-shadow-picked-up);
  z-index: 1;

  // 禁用单元格元素默认行为
  > td {
    border-color: transparent !important;
    > span {
      pointer-events: none;
    }
  }
}

```

### 参考
- [dnd-kit sortable](https://docs.dndkit.com/presets/sortable/sortable-context)
- [Antd Table 拖拽手柄列](https://ant.design/components/table-cn/#components-table-demo-drag-sorting-handler)
- [dnd-kit示例](https://master--5fc05e08a4a65d0021ae0bf2.chromatic.com/?path=/story/presets-sortable-vertical--drag-handle&globals=backgrounds.grid:false)


[1]: https://ant.design/
[2]: https://github.com/clauderic/dnd-kit
[3]: https://github.com/react-dnd/react-dnd
[4]: https://github.com/clauderic/react-sortable-hoc
[5]: https://dndkit.com/
[6]: https://zhuanlan.zhihu.com/p/430177180