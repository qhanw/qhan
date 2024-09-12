import type { RechargeItem } from '../typings';

/**
 * 动态计算档位ID
 * @param data 全部档位数据源
 * @param type 当前需要插入的数据平台类型
 * @returns 返回一个档位ID
 */
export function getGradeId(data: RechargeItem[], type: 'Windows' | 'IOS' | 'Android') {
  const ids = data.filter((c) => c.platform === type).map((c) => c.id!);

  // Android的商品ID在 1-100
  // IOS的商品ID在 101-200
  // PC的商品ID在 201-300

  if (ids.length) return Math.max(...ids) + 1;

  // 如果尚未添加档位返回默认ID
  return type === 'Android' ? 1 : type === 'IOS' ? 101 : 201;
}

type GradeErr = {
  type: RechargeItem['platform'];
  message: string;
};

// 校验ID全法性
export const validateGradeId = (v: RechargeItem[]) => {
  return new Promise<RechargeItem[]>((resolve, reject) => {
    const err = v.reduce((prev, curr) => {
      if (curr.platform === 'Android' && curr.id && !(curr.id >= 1 && curr.id <= 100)) {
        prev.push({ type: curr.platform, message: 'ID不存在或不在1-100之间' });
      }
      if (curr.platform === 'IOS' && curr.id && !(curr.id >= 101 && curr.id <= 200)) {
        prev.push({ type: curr.platform, message: 'ID不存在或不在101-200之间' });
      }
      if (curr.platform === 'Windows' && curr.id && !(curr.id >= 201 && curr.id <= 300)) {
        prev.push({ type: curr.platform, message: 'ID不存在或不在201-300之间' });
      }

      return prev;
    }, [] as GradeErr[]);

    if (err.length) return reject(err);

    return resolve(v);
  });
};
