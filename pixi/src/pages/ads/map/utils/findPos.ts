import type { AdsMapData } from '../typings';

const findPos = function f(data: AdsMapData, pos: [number, number]) {
  if (data.size === 0 || pos?.length !== 2) return undefined;

  for (const [k, v] of data) {
    if (v.find(({ position }) => position[0] === pos[0] && position[1] === pos[1])) return k;
  }

  return undefined;
};

export { findPos };
