import { useWebSocket, useDebounceEffect } from 'ahooks';

import { getToken } from '@/utils/store';

import { useWss, useWssStore } from '@/store/wss';

export function useSocketInit() {
  const { set } = useWss();
  const { set: setWssStore } = useWssStore();

  const { connect, disconnect, readyState, sendMessage } = useWebSocket(
    `ws://${window.location.host}/wss/landWsConnect`,
    {
      protocols: [getToken()],
      onError: (e) => console.log(e),
      onMessage: (message) => {
        const result = message?.data ? JSON.parse(message.data) : undefined;
        const { type, data: d } = result || {};

        // const qs = query ? Object.values(query).join('_') : undefined;

        if (type) setWssStore({ key: type, value: d });
      },
    },
  );

  useDebounceEffect(
    () => {
      set({ connect, disconnect, readyState, sendMessage });
    },
    [set, connect, disconnect, readyState, sendMessage],
    { wait: 300 },
  );
}
