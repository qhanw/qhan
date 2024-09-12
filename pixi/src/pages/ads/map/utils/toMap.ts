import type { AdBoardOption } from '../typings';

// TODO: 数据聚合算法未完成，解决在图层上层叠问题
export const toMap = (data: AdBoardOption[]) => {
  return data.reduce((prev, curr) => {
    if (!curr.position) return prev;
    const mark = `${curr.position[0]}_${curr.position[1]}`;

    const aim = prev.get(mark);

    prev.set(mark, [...(aim ?? []), curr]);

    return prev;
  }, new Map<string, AdBoardOption[]>());
};
