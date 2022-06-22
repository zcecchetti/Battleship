/* eslint-disable no-throw-literal */
/* eslint-disable no-undef */
/* eslint-disable no-unreachable-loop */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */

// factory function to create new ship objects
function createShip(length) {
  const shipArray = [];
  for (let i = 0; i < length; i++) {
    shipArray.push('0');
  }

  const returnArray = () => shipArray;

  // add hit marker to space in ship
  const hit = function (index) {
    shipArray[index] = 'h';
    return shipArray;
  };

  // check to see if all spaces on ship have been hit
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

// factory function to create new gameboard object
function gameboard() {
  // array to hold gameboard
  const gameboardArray = [];

  const createBoard = function () {
    for (let i = 0; i < 10; i++) {
      gameboardArray[i] = ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'];
    }
    return gameboardArray;
  };

  const returnBoard = () => gameboardArray;

  // check if user selected ship placement is valid selection
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

  // call check if userSelected space is valid and call createShip to place new ship
  const placeShip = function (shipObject, direction, i, j) {
    try {
      const { length } = shipObject.returnArray();
      isValidPlacement(length, direction, i, j);

      // place boat either horizontally or vertically in gameboardArray
      for (let n = 0; n < length; n++) {
        if (direction === 'h') {
          gameboardArray[j][i + n] = { shipObject: n };
        } else if (direction === 'v') {
          gameboardArray[j + n][i] = { shipObject: n };
        }
      }
      return gameboardArray;
    } catch (err) {
      return err.message;
    }
  };

  return {
    createBoard, returnBoard, isValidPlacement, placeShip,
  };
}

export { createShip, gameboard };
