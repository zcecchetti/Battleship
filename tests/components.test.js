/* eslint-disable no-undef */

import { hellothere } from '../src/components';

test('Says the master jedis name', () => {
  expect(hellothere()).toBe('kenobi');
});
