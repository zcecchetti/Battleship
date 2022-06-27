/* eslint-disable no-undef */

import { player } from '../src/gameplay';

describe('Tests the player factory function methods and attributes', () => {
  const playerOne = player();
  const playerBoardOne = playerOne.playerBoard;
  playerOne.createPlayerShips();
  const playerShipsOne = playerOne.shipObjectArray;

  //   const playerTwo = player();
  //   const playerBoardTwo = playerTwo.playerBoard;
  //   playerTwo.createPlayerShips();
  //   const playerShipsTwo = playerTwo.shipObjectArray;

  test('Checks that placing ship on player one and returning gameboard will show correct array', () => {
    playerOne.createPlayerShips();
    const shipOne = playerShipsOne[0];
    expect(playerBoardOne.placeShip(shipOne, 'h', 2, 3)).toEqual([
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', { object: shipOne, index: 0, direction: 'h' }, { object: shipOne, index: 1, direction: 'h' }, { object: shipOne, index: 2, direction: 'h' }, 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']]);
  });
});
