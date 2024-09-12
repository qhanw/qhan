import type { Graph } from './map/typings';

/** 将数据转换为地图可用数据
 * @param [data=[]] 地块列表数据
 * @param filter 是否过滤掉已结束地块
 */
export function toMap(data: any[] = [], filter?: boolean) {
  if (filter) {
    return data?.reduce((prev, curr) => {
      if (filter && curr.status !== 'ended') {
        prev.set(curr.id, {
          id: curr.id,
          label: curr.projectName!,
          coordinates: curr.coordinates!,
        });
      }
      return prev;
    }, new Map<string, Graph>());
  } else {
    return data?.reduce((prev, curr) => {
      prev.set(curr.id, {
        id: curr.id,
        label: curr.projectName!,
        coordinates: curr.coordinates!,
      });

      return prev;
    }, new Map<string, Graph>());
  }
}

export function getLimit(data?: any) {
  if (!data) return;
  return new Map([[data.id, { id: data.id, label: data.label, coordinates: data.coordinates! }]]);
}
