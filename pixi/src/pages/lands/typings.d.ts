export type RsAddrNames = { label: string; value: string }[];

export type PointTuple = [number, number];

export type RqFormProject = {
  id?: string;
  projectName?: string;
  name?: string;
  total?: number;
  addressName?: string;
  // 地图区域坐标集合
  coordinates?: PointTuple[];
  // params: x1, x2, y1, y2, z ,toward
  transPoint?: [number, number, number, number, number, number];
};

export type RqFormArea = {
  id?: string;
  pid?: string;
  projectName?: string;
  name?: string;
  number?: string;
  phase?: string;
  total?: number;
  houseNumber?: number;
  // 地图区域坐标集合
  coordinates?: PointTuple[];
};

export type RqFormSell = {
  id?: string;
  presaleTime?: number[];
  saleTime?: number[];
  price?: number;
  ad?: number;
  markup?: number;
  fixedPrice?: number;
};

type FormProject = {
  id: string;
  projectName?: string;
  name?: string; //地块名称
  total?: number;
  addressName?: string;
  // 地图区域坐标集合
  coordinates?: [number, number][];
  // params: x1, x2, y1, y2, z ,toward
  transPoint?: [number, number, number, number, number, number];

  // 地块字段
  // 地块编号
  number?: number;
  // 地块期数
  phase?: number;
  // 门牌号码
  houseNumber?: number;

  // 售卖字段
  ad?: any;
  price?: number;
  presaleStartTime?: number;
  presaleEndTime?: number;
  saleStartTime?: number;
  saleEndTime?: number;
  relSaleEndTime?: number;
};

export type ProjectType = FormProject & {
  id?: string;
  pid?: string;
  label: string; // 等同于 projectName
  status?: string;
};

export type PlanStatus = {
  tab?: string;
  checked?: ProjectType; // 选中的对象，用于图交互及级别数据添加
  selected?: ProjectType; // 编辑对象
  editable?: boolean;
  selProj?: ProjectType; // 列表中，选中的项目，用于筛选查询
};

export type Opts = Map<string, PlanStatus>;
