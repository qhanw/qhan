import { useEffect, useCallback, useState, useRef } from 'react';
import { useRequest } from 'ahooks';

import { getToken } from '@/utils/store';
import { queryServerTime } from '@/services/common';
import { useServerTime, useTimeCalibration } from '@/store/common';

export const useFetchServerTime = () => {
  const token = getToken();
  const timer = useRef<NodeJS.Timeout>();

  const { unix: time, set: setTime } = useServerTime();
  const { set: setCalibration, calibration } = useTimeCalibration();

  // 当前时间
  const [unix, setUnix] = useState<number>();

  useRequest(queryServerTime, {
    retryCount: -10,
    manual: !token,
    onSuccess: (res) => {
      if (res) {
        setCalibration(res - +new Date());
        run();
      }
    },
  });

  const run = useCallback(function fn() {
    setUnix(+new Date());
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(fn, 1000);
  }, []);

  useEffect(() => {
    if (unix) setTime(unix + calibration);
  }, [unix, calibration, setTime]);

  return { unix: time };
};
