---
title: React 组件生命周期
date: 2018-07-12 17:28:32
category: react
tags: [react, js]
---

每个组件都有几个“生命周期方法”，您可以覆盖这些方法以在流程中的特定时间运行代码。您可以将此生命周期图用作备忘单。在下面的列表中，常用的生命周期方法被标记为粗体。它们中的其余部分存在于相对罕见的用例中。

---


- 装载<small>(首次实例化)</small>
  - [constructor()](#constructor)
  - [static getDerivedStateFromProps()](#getDerivedStateFromProps)
  - [render()](#render)
  - [componentDidMount()](#componentDidMount)
- 更新<small>(组件已存在时的状态改变)</small>
  - [static getDerivedStateFromProps()](#getDerivedStateFromProps)
  - [shouldComponentUpdate()](#shouldComponentUpdate)
  - [render()](#render)
  - [getSnapshotBeforeUpdate()](#getSnapshotBeforeUpdate)
  - [componentDidUpdate()](#componentDidUpdate)
- 销毁<small>(清理期)</small>
  - [componentWillUnmount()](#componentWillUnmount)
- 错误
  - [componentDidCatch()](#componentDidCatch)
- 其它
  - [setState()](#setState)
  - [forceUpdate()](#forceUpdate)
- 类属性
  - [defaultProps](#defaultProps)
  - [displayName](#displayName)
- 实例属性
  - [props](#props)
  - [state](#state)


<h3 id="constructor">constructor()</h3>

**如果不初始化状态与绑定方法，则不需要为你的组件实现构造函数**

通常在 React 构造函数中只用于两个目的：

- 初始化本地状态，并赋值到`this.state`
- 绑定事件处理程序到方法实例

**不能在`constructor`中调用 setState()**, 如果你的组件需要用到本地状态， 在构造函数中直接将初始状态赋值到 this.state

避免在构造函数中引入任何副作用或订阅。对于这些用例，使用 componentDidMount()代替。

提示

避免将 props 复制到 state！这是一个常见和错误：

```javascript
   constructor(props){
     super(props);
     // Don't do this
     this.state = {color: props.color}
   }
```

这样做完全没有必要（你可以用`this.props.color`来替代），并且会引起组件创建的缺陷（在`color`更新时不能及时反应到状态上）
如果你故意想忽略 prop 更新，那么可以采用此模式

---

<h3 id="getDerivedStateFromProps">static getDerivedStateFromProps()</h3>

在调用呈现方法之前，在初始挂载和后续更新中调用该方法。它应该返回一个要更新状态的对象，或者返回 null 不更新任何内容。

---

<h3 id="render">render()</h3>

该方法是类组件中唯一必需的方法。

当调用时，它会检测`this.props`和`this.state`,并且返回一个以下的类型：

- **React 元素**：通常为 JSX
- **数组或 fragment**：让你一次渲染多个节点。[详细介绍](https://reactjs.org/docs/fragments.html)
- **Portals**： 让你在不同的节点渲染子元素。[详细介绍](https://reactjs.org/docs/portals.html)
- **字符串或数字**： 渲染文本节点
- **布尔值或 null**： 什么都不渲染

并且具有以下规则

- 只能通过 this.props 和 this.state 访问数据
- 只能出现一个顶级组件
- 不能改变组件的状态
- 不能修改 DOM 的输出

---

<h3 id="componentDidMount">componentDidMount()</h3>

真实的 DOM 被渲染出来后调用，在该方法中可通过 this.getDOMNode()访问到真实的 DOM 元素。此时已可以使用其他类库来操作这个 DOM。

在服务端中，该方法不会被调用。

---

<h3 id="shouldComponentUpdate">shouldComponentUpdate()</h3>

组件是否应当渲染新的 props 或 state，返回 false 表示跳过后续的生命周期方法，通常不需要使用以避免出现 bug。在出现应用的瓶颈时，可通过该方法进行适当的优化。

在首次渲染期间或者调用了 forceUpdate 方法后，该方法不会被调用

---

<h3 id="getSnapshotBeforeUpdate">getSnapshotBeforeUpdate()</h3>

getSnapshotBeforeUpdate

---

<h3 id="componentDidUpdate">componentDidUpdate()</h3>

完成渲染新的 props 或者 state 后调用，此时可以访问到新的 DOM 元素。

---

<h3 id="componentWillUnmount">componentWillUnmount()</h3>

组件被移除之前被调用，可以用于做一些清理工作，在 componentDidMount 方法中添加的所有任务都需要在该方法中撤销，比如创建的定时器或添加的事件监听器。

---

<h3 id="componentDidCatch">componentDidCatch()</h3>

错误边界是指在子组件树的任何地方捕获 JavaScript 错误的响应组件，记录这些错误，并显示回退的 UI，而不是崩溃的组件树。错误边界在呈现期间、在生命周期方法中以及在它们下面的整个树的构造函数中捕获错误。

如果一个类组件定义了这个生命周期方法，它将成为一个错误边界。在其中调用 setState()可以在下面的树中捕获未处理的 JavaScript 错误并显示回退 UI。仅使用错误边界从意外异常中恢复;不要试图将它们用于控制流。

---

<h3 id="setState">setState</h3>

setState

---

<h3 id="forceUpdate">forceUpdate</h3>

forceUpdate

---

<h3 id="defaultProps">defaultProps</h3>

作用于组件类，只调用一次，返回对象用于设置默认的 props，对于引用值，会在实例中共享。

---

<h3 id="displayName">displayName</h3>

displayName 字符串用于调试消息。通常，您不需要显式地设置它，因为它是从定义组件的函数或类的名称中推断出来的。如果您希望为调试目的显示不同的名称，或者当您创建高阶组件时，您可能希望显式地设置它，请参阅包装显示名称，以便进行详细的调试。

---

<h3 id="props">props</h3>

props

---

<h3 id="state">state</h3>

状态包含特定于此组件的数据，这些数据可能随时间而改变。状态是用户定义的，它应该是一个普通的 JavaScript 对象。

### 参考

- [官方文档][1]
- [React 组件生命周期过程说明][2]

[1]: https://reactjs.org/docs/react-component.html "React官方文档"
[2]: http://react-china.org/t/react/1740 "React组件生命周期过程说明"
