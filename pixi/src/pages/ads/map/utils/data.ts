import type { AdBoardOption } from '../typings';

export const data: AdBoardOption[] = [
  [-159, 187],
  [-159, 186],
  [-159, 186],
  [-105, -275],
  [259, -202],
  [-217, -72],
  [130, 185],
  [331, -2],
  [257, 83],
  [0, 0],
  [-55, -28],
  [-20, 53],
  [122, -54],
  [-123, -45],
].map((c, i) => {
  const number = (i += 1);
  return {
    id: number,
    name: `广告位${number}`,
    position: c,
    number: number,
  } as AdBoardOption;
});
