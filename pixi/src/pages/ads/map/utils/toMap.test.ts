import { expect, test } from 'vitest';

import { toMap } from './toMap';
import { data } from './data';

test('to map data', () => {
  expect(toMap(data).get('257_83')).toBeTruthy();
});
