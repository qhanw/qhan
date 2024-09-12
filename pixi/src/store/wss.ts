import { create } from 'zustand';

import type { Result } from 'ahooks/es/useWebSocket';

export type WssSendMessage = {
  /**
   * @augments 1 项目列表
   * @augments 2 地块列表
   * @augments 3 售卖列表
   * @augments 4 已售卖列表
   * @augments 1001 心跳
   * @augments 1002 加锁
   * @augments 1003 解锁
   * @augments 1004 取消数据监听
   */
  type: 1 | 2 | 3 | 4 | 1001 | 1002 | 1003 | 1004;
  /**
   * 查询参数，与 type 绑定
   * @augments id 土地地块列表、售卖列表参数
   * @augments function 解锁加锁的功能标识
   */
  query?: {
    id?: string;

    /**
     * @augments 1 土地管理
     * @augments 2 广告管理
     * @augments 3 剧场管理(直播管理)（原活动管理）
     * @augments 4 公告（登录公告）
     * @augments 5 拍脸图
     *
     * @augments 6 跑马灯
     * @augments 7 邮件管理
     * @augments 8 封禁管理
     * @augments 9 签到广告位
     * @augments 10 兑换码管理
     * @augments 11 花车巡游
     * @augments 12 活动管理
     */
    function?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

    /** 解除监听的数据功能 */
    unwatch?: number[];
  };
};

type WssState = Result & {
  set: (wss: Result) => void;
  sendMessage: (data: WssSendMessage) => void;
};

const loop = () => console.warn('未建立websocket实例');

/** WebSocket */
export const useWss = create<WssState>((set) => ({
  sendMessage: loop,
  disconnect: loop,
  connect: loop,
  readyState: 3,
  set: (wss: Result) =>
    set((state) => ({
      ...state,
      ...wss,
      sendMessage: (data) => {
        try {
          wss.sendMessage(data instanceof Object ? JSON.stringify(data) : data);
        } catch (error) {
          console.error(error);
        }
      },
    })),
}));

// --- socket 返回数据存储 ---

type DataMap = Map<WssSendMessage['type'] | string, any>;

type WssStoreState = {
  data: DataMap;
  set: (data: { key: WssSendMessage['type'] | string; value: any }) => void;
};
export const useWssStore = create<WssStoreState>((set) => ({
  data: new Map(),
  set: (data) => {
    set((state) => {
      if (data.value === undefined) {
        state.data.delete(data.key);
      } else {
        state.data.set(data.key, data.value);
      }

      return { data: new Map([...state.data]) };
    });
  },
}));
