---
title: CSS选择器之nth-child
date: 2016-05-05T10:58:55+08:00
category: css
tags: [css]
---

在我们对一组相同元素作不同表现形式的操作时，在还没有选择器`:nth-child`与`:nth-of-type`时，我们常用到的方法可能是利用 JS 来控制表现形式，或者采用 CSS 选择器类处理这类问题。

我们需要在 HTML 中加入一些类属性，如果数量非常大时，又或者我们只给奇数或偶数或其它规则的元素定义不同样式呢，这样我们代码就非常不容易维护，或许你会说通过 JS 脚本就容易多了，但是脚本它也是通过改变元素节点的 style 属性或类属性来达到需要的。相对来说，当数据量大了时，都不太容易维护。

以 CSS 类选择器示例，如下：

```html
<ul class="example">
  <li class="example-red">Red.</li>
  <li class="example-orange">Orange.</li>
  <li class="example-yellow">Yellow.</li>
  <li class="example-green">Green.</li>
  <li class="example-blue">Blue.</li>
</ul>
```

```css
.example {
}
.example-red {
  color: red;
}
.example-orange {
  color: orange;
}
.example-yellow {
  color: yellow;
}
.example-green {
  color: green;
}
.example-blue {
  color: blue;
}
```

从上面例子我们已经看出，html 与 css 相对已经变得复杂。所幸现在我们可以用 CSS3 子选择器:nth-child 与:nth-of-type 来实现这类需求。

---

### CSS3 选择器 :nth-child

**解释**

* :nth-child：选择所有子节点中的元素（包括各种不同元素）
* :nth-of-type：选择所有子节点中的同种元素

**用法**

* :nth-child(an+b)
* :nth-of-type(an+b)

**解释**

还记得高中我们所学的数列知识吗？此处 an+b 就是我们高中所学数列公式，可以是等比、等差、差比等，不过此处 a、b 为整数常量，n 为自增倍数，通过组合不同 an+b 可以达到不同的子元素的筛选。


### 常用方式简介

**简单数字序号写法**  
:nth-child(number)：直接匹配第 number 个元素。参数 number 必须为大于 0 的整数。

```css
li:nth-child(5) {
  color: red;
} /* 选择第5个元素 */
```

**倍数写法**  
:nth-child(an)：匹配所有倍数为 a 的元素。其中参数 an 中的字母 n 不可缺省，它是倍数写法的标志，如 2n、3n、5n

```css
li:nth-child(5n) {
  color: red;
} /* 选择5的倍数的元素 */
```

**倍数分组**  
:nth-child(an+b)：a、b 为常量，其中字母 n 和加号+不可缺省，位置不可调换，这是该写法的标志，其中 a,b 均为整数（0、正整数、负整数）。如 3n+1、5n+1、2n-1。

* 当 a、b 均为正整数，或 b 为负时，是我们常见的写法。

  ```css
  li:nth-child(3n + 1) {
    background: #00f;
  } /*匹配第1、第4、第7、…、每3个为一组的第1个LI*/

  li:nth-child(3n + 5) {
    background: #00f;
  } /*匹配第5、第8、第11、…、从第5个开始每3个为一组的第1个LI*/

  li:nth-child(5n-1) {
    background: #00f;
  } /*匹配第5-1=4、第10-1=9、…、第5的倍数减1个LI*/

  li:nth-child(3n±0) {
    background: #00f;
  } /*相当于(3n)*/

  li:nth-child(±0n + 3) {
    background: #00f;
  } /*相当于(3)*/
  ```

* 当 a 为负，b 为正时，是比较特别的一种分组我们称之为 反向倍数分组。此处一负一正，均不可缺省，否则无意义。此时与:nth-child(an+1)相似，都是匹配第 1 个，但不同的是它是倒着算的，即从第 b 个开始往回算，固它所匹配的最多也不会超过 b 个。

  ```css
  li:nth-child(-3n + 8) {
    background: #00f;
  } /*匹配第8、第5和第2个LI*/
  li:nth-child(-n + 8) {
    background: #00f;
  } /*匹配前8个（包括第8个）LI*/
  ```

**奇偶匹配**

* :nth-child(odd)：匹配序号为奇数的元素，等同于(2n+1)。
* :nth-child(even)：匹配序号为偶数的元素，等同于(2n+0)及(2n)。

---

### 技巧示例

* 选择第 5 个元素

  ```css
  li:nth-child(5) {
    background: #00f;
  }
  ```

* 选择大于 5 的元素

  ```css
  li:nth-child(n + 6) {
    background: #00f;
  }
  ```

* 选择前 5 个元素

  ```css
  li:nth-child(-n + 5) {
    background: #00f;
  }
  ```

* 从第一个开始，选择每第四个

  ```css
  li:nth-child(4n-7) {
    /* or 4n+1 */
    background: #00f;
  }
  ```

* 选择奇数或者偶数

  ```css
  li:nth-child(odd) {
    background: #00f;
  } /* or 2n+1 */
  li:nth-child(even) {
    background: #00f;
  } /* or 2n */
  ```

**扩展**

* :nth-last-child(n)
* :nth-last-of-type(n)
* :nth-of-type(n)

上述三种选择器使用方法与规则类似:nth-child(n),此处就不过多赘述。
