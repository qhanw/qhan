type PlatForm = 'Windows' | 'IOS' | 'Android';
export type RechargeItem = {
  id?: number;
  platform?: PlatForm;
  currency?: number;
  price?: number;
  reward?: Reward;
  picture?: string;
  multiple?: number;
  extraReward?: Reward;
  quota?: number;
  buyLimit?: number;
  recommend?: boolean;
  // startTime?: number;
  // endTime?: number;
  time?: number[];
  platforms?: [PlatForm];
  pictures?: any[];

  // 1新增 2 删除 3修改
  actType?: number;
};

type Reward = {
  itemId: number;
  itemNum: number;
};
export type RechargeInfo = {
  banners?: Record<string, string>;
  goodsModels?: RechargeItem[];
};

export type RechargeHistoryItem = {
  id?: number;
  createTime?: number;
  actName?: string;
  list?: RechargeItem[];
};

export type RechargeLocales = { language_list: { label: number; desc: string }[] };

export type RechargeProp = {
  value: string;
  label: string;
  children?: RechargeProp[];
};
