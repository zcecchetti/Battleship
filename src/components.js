/* eslint-disable no-throw-literal */
/* eslint-disable no-undef */
/* eslint-disable no-unreachable-loop */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */

function createShip(length) {
  const shipArray = [];
  for (let i = 0; i < length; i++) {
    shipArray.push('0');
  }

  const returnArray = () => shipArray;

  const hit = function (index) {
    shipArray[index] = 'h';
    return shipArray;
  };

  const isSunk = function () {
    for (let i = 0; i < length; i++) {
      if (shipArray[i] === '0') {
        return false;
      }
    }
    return true;
  };

  return { returnArray, hit, isSunk };
}

function gameboard() {
  const gameboardArray = [];

  const createBoard = function () {
    const gameRow = ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'];
    for (let i = 0; i < 10; i++) {
      gameboardArray[i] = gameRow;
    }
    return gameboardArray;
  };

  const returnBoard = () => gameboardArray;

  const isValidPlacement = function (length, direction, i, j) {
    if (direction === 'h') {
      if (length + i > 9) {
        throw 'Not enough spaces';
      }
    } else if (direction === 'v') {
      if (length + j > 9) {
        throw 'Not enough spaces';
      }
    }
  };

  const newShip = function (length, direction, i, j) {
    try {
      isValidPlacement(length, direction, i, j);
      const ship = createShip(length);
      if (direction === 'h') {
        const row = gameboardArray[j];
        for (let shipIndex = 0; shipIndex < length; shipIndex++) {
          row[i + shipIndex] = '0';
        }
      }
      return gameboardArray;
    } catch (err) {
      return err.message;
    }
  };

  return {
    createBoard, returnBoard, isValidPlacement, newShip,
  };
}

export { createShip, gameboard };
