/* eslint-disable no-undef */

import { smallShip } from '../src/components';

test('Calls createShip and returns ship array', () => {
  expect(smallShip.returnArray()).toEqual(['0', '0', '0']);
});

test('Calls hit method and returns ship array with hit marker in correct location', () => {
  expect(smallShip.hit(2)).toEqual(['0', '0', 'h']);
});

test('Calls isSunk and fails because ship has unmarked spaces', () => {
  expect(smallShip.isSunk()).toBe(false);
});

test('Calls isSunk and fails because shipArray is full of hit markers', () => {
  smallShip.hit(0);
  smallShip.hit(1);
  expect(smallShip.isSunk()).toBe(true);
});
