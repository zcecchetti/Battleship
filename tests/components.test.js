/* eslint-disable no-undef */

import { createShip, gameboard } from '../src/components';

describe('Tests for createShip factory function and methods', () => {
  const smallShip = createShip(3);
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
});

describe('Tests gameboard factory function and methods', () => {
  const gameboardArray = gameboard();
  test('Calls createGameboard function and returns 10x10 gameboardArray', () => {
    expect(gameboardArray.createBoard()).toEqual([
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']]);
  });

  test('Tests validity of selected ship placement in horizontal direction', () => {
    expect(() => { gameboardArray.isValidPlacement(4, 'h', 8, 7); }).toThrow('Not enough spaces');
  });

  test('Tests validity of selected ship placement in vertical direction', () => {
    expect(() => { gameboardArray.isValidPlacement(4, 'v', 8, 7); }).toThrow('Not enough spaces');
  });

  test('Creates a new ship and places it horizontally on gameboardArray', () => {
    const shipOne = createShip(3);
    expect(gameboardArray.placeShip(shipOne, 'h', 3, 4)).toEqual([
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', { shipObject: 0 }, { shipObject: 1 }, { shipObject: 2 }, 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']]);
  });

  test('Creates a new ship and places it vertically on gameboardArray', () => {
    const shipTwo = createShip(4);
    expect(gameboardArray.placeShip(shipTwo, 'v', 7, 4)).toEqual([
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', { shipObject: 0 }, { shipObject: 1 }, { shipObject: 2 }, 'x', { shipObject: 0 }, 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', { shipObject: 1 }, 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', { shipObject: 2 }, 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', { shipObject: 3 }, 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']]);
  });
});
