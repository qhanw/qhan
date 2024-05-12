---
title: 时间自动更新
date: 2024-05-12T20:08:56+08:00
category: js
tags: [js]
---

```tsx
import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';

const useShowTime = () => {
  const getCurrTime = () => dayjs().format('YYYY-MM-DD HH:mm:ss');

  const [time, setTime] = useState(getCurrTime());

  const showTime = useCallback(() => {
    let timer: NodeJS.Timeout;
    const fn = () => {
      setTime(getCurrTime());
      if (timer) clearTimeout(timer);
      setTimeout(fn, 1000);
    };
    fn();
  }, []);

  useEffect(() => {
    showTime();
  }, [showTime]);

  return time;
};

export { useShowTime };
```
