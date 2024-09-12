import { expect, test } from 'vitest';
import { findPos } from './findPos';

import { toMap } from './toMap';
import { data } from './data';

const map = toMap(data);

test('find pos {257, 83}', () => {
  expect(findPos(map, [257, 83])).toBe('257_83');
});

test('find pos {257, 257}', () => {
  expect(findPos(map, [257, 257])).toBe(undefined);
});
