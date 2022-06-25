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
  const shipOne = createShip(3);
  const shipTwo = createShip(4);
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
    const rejectShip1 = createShip(4);
    expect(() => { gameboardArray.isValidPlacement(rejectShip1, 'h', 7, 4); }).toThrow('Not enough spaces');
  });

  test('Tests validity of selected ship placement in vertical direction', () => {
    const rejectShip2 = createShip(4);
    expect(() => { gameboardArray.isValidPlacement(rejectShip2, 'v', 8, 7); }).toThrow('Not enough spaces');
  });

  test('Creates a new ship and places it horizontally on gameboardArray', () => {
    expect(gameboardArray.placeShip(shipOne, 'h', 3, 4)).toEqual([
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', { object: shipOne, index: 0 }, { object: shipOne, index: 1 }, { object: shipOne, index: 2 }, 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']]);
  });

  test('Creates a new ship and places it vertically on gameboardArray', () => {
    expect(gameboardArray.placeShip(shipTwo, 'v', 7, 4)).toEqual([
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', { object: shipOne, index: 0 }, { object: shipOne, index: 1 }, { object: shipOne, index: 2 }, 'x', { object: shipTwo, index: 0 }, 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', { object: shipTwo, index: 1 }, 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', { object: shipTwo, index: 2 }, 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', { object: shipTwo, index: 3 }, 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']]);
  });

  test('Throws error if user selected horizontal placement is over another ship', () => {
    const shipThree = createShip(2);
    expect(() => { gameboardArray.isValidPlacement(shipThree, 'h', 2, 4); }).toThrow('Cannot place over other ship');
  });

  test('Throws error if user selected vertical placement is over another ship', () => {
    const shipFour = createShip(2);
    expect(() => { gameboardArray.isValidPlacement(shipFour, 'v', 4, 3); }).toThrow('Cannot place over other ship');
  });
});

describe('Tests attack methods and interactions between ship objects and gameboard object', () => {
  const gameboardArray = gameboard();
  gameboardArray.createBoard();
  const shipOne = createShip(3);
  const shipTwo = createShip(4);
  gameboardArray.placeShip(shipOne, 'h', 1, 3);
  gameboardArray.placeShip(shipTwo, 'v', 7, 4);
  test('Checks that receiveAttack method will place a missed point on the gameboard in the correct space', () => {
    expect(gameboardArray.receiveAttack(1, 5)).toEqual([
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', { object: shipOne, index: 0 }, { object: shipOne, index: 1 }, { object: shipOne, index: 2 }, 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', { object: shipTwo, index: 0 }, 'x', 'x'],
      ['x', 'M', 'x', 'x', 'x', 'x', 'x', { object: shipTwo, index: 1 }, 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', { object: shipTwo, index: 2 }, 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', { object: shipTwo, index: 3 }, 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']]);
  });

  test('Checks that isValidAttack will throw error if user selects already targeted space', () => {
    expect(() => { gameboardArray.isValidAttack(1, 5); }).toThrow('Cannot attack already targeted space');
  });

  test('Checks that receiveAttack method updates gameboard with hit marker in correct space', () => {
    expect(gameboardArray.receiveAttack(1, 3)).toEqual([
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', { object: shipOne, index: 'H' }, { object: shipOne, index: 1 }, { object: shipOne, index: 2 }, 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', { object: shipTwo, index: 0 }, 'x', 'x'],
      ['x', 'M', 'x', 'x', 'x', 'x', 'x', { object: shipTwo, index: 1 }, 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', { object: shipTwo, index: 2 }, 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', { object: shipTwo, index: 3 }, 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']]);
  });

  test('Checks that receiveAttack method places hit marker on correct shipArray space', () => {
    expect(shipOne.returnArray()).toEqual(['h', '0', '0']);
  });

  test('Checks that isSunk attribute will be true after ship receives attack on all spaces', () => {
    gameboardArray.receiveAttack(2, 3);
    gameboardArray.receiveAttack(3, 3);
    expect(shipOne.isSunk()).toBe(true);
  });

  test('Checks that gameboardArray will update hit markers with sunk markers if isSunk is true', () => {
    expect(gameboardArray.returnBoard()).toEqual([
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', { object: shipOne, index: 'S' }, { object: shipOne, index: 'S' }, { object: shipOne, index: 'S' }, 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', { object: shipTwo, index: 0 }, 'x', 'x'],
      ['x', 'M', 'x', 'x', 'x', 'x', 'x', { object: shipTwo, index: 1 }, 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', { object: shipTwo, index: 2 }, 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', { object: shipTwo, index: 3 }, 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']]);
  });
});
