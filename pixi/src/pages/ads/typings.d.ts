/** 地区 */
export type RegionOptions = { id: string; name: string; children: RegionOptions[] }[];

export type QsSelectAdBoard = { type: number; board: string; spec: string; region2: number };

export type AdBoardOption = {
  id: number;
  name: string;
  position: number[];
  adType?: number[];
  region1Id: ?number;
  region2Id?: number;
  region1Name?: string;
  region2Name?: string;
  number?: number;
  coord?: { x: number; y: number; z: number };
  count?: number;
  board?: string;
  spec?: string;
};

export type AdsLocales = { language_list: { label: number; desc: string }[] };

export type SubmitAdBoard = {
  updateId?: number;
  notes: string;
  interval: number;
  ts: number[];
  adIds: number[];
  resources: {
    resourceType?: number;
    resources: { [propName: string]: { [propName: string]: string } };
  }[];
  resourceType?: number;
  isJump?: boolean;
  jumpValue?: string;
  jumpType?: number;
};

export type AdListItem = {
  id: number;
  notes: string;
  status: number;
};
