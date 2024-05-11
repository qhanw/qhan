---
title: 点击弹窗元素自身外时隐藏自身
date: 2024-05-10T22:35:56+08:00
category: js
tags: [js]
---

```tsx
import { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';

const Header = () => {
  const ref = useRef<HTMLSpanElement>(null);
  const [showNav, setShowNav] = useState(false);

  // 核心逻辑 点击元素之外隐藏元素
  useEffect(() => {
    const fn = (event: MouseEvent) => {
      if (ref && !ref.current?.contains(event.target as HTMLElement)) {
        setShowNav(false);
      }
    };
    document.addEventListener('click', fn);

    return () => {
      document.removeEventListener('click', fn);
    };
  }, []);

  return (
    <>
      <span
        ref={ref}
        onClick={() => setShowNav((state) => !state)}
        className={clsx(
          'group w-6 h-6 mr-2 inline-flex items-center justify-center text-2xl text-gray-500 cursor-pointer',
          { open: showNav, hide: !showNav },
        )}
      >
        <i className="hidden group-[.open]:block i-gg-close" />
        <i className="hidden group-[.hide]:block i-gg-menu-left-alt" />
      </span>
      <Nav className={showNav ? 'block' : 'hidden'} onClick={() => setShowNav((state) => !state)} />
    </>
  );
};

export default Header;
```
