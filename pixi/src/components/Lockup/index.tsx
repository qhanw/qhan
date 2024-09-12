import { useMemo } from 'react';
import { useDebounceEffect } from 'ahooks';

import { Result } from 'antd';
import { PageLoading } from '@ant-design/pro-components';

import { useWss, useWssStore } from '@/store/wss';
import type { WssSendMessage } from '@/store/wss';

type LockupProps = Pick<WssSendMessage, 'query'> & {
  description?: string;
  children?: React.ReactNode;
  unwatch?: number[];
};

export default function Lockup({ query, unwatch, children, description }: LockupProps) {
  const { sendMessage, readyState } = useWss();
  const { data: store, set } = useWssStore();

  useDebounceEffect(
    () => {
      if (readyState === 1) {
        set({ key: 1002, value: undefined }); // 将置为初始状态
        sendMessage({ type: 1002, query });
      }

      return () => {
        // 卸载当前页面时解锁页面
        if (readyState === 1) {
          sendMessage({ type: 1003, query });
          if (unwatch) sendMessage({ type: 1004, query: { unwatch } });
        }
      };
    },
    [sendMessage, readyState, query, unwatch, set],
    { wait: 50 },
  );

  const lockStatus = useMemo(() => store.get(1002), [store]);

  if (lockStatus === undefined) return <PageLoading />;

  return lockStatus?.length ? (
    <Result title={`${description}：${lockStatus?.join(',') || '-'}`} />
  ) : (
    children
  );
}
