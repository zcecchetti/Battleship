/* eslint-disable no-continue */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
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

// factory function for gameboard object
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
  const isValidPlacement = function (shipObject, direction, i, j) {
    const { length } = shipObject.returnArray();
    // ship does not fit within gameboardArray
    if (direction === 'h') {
      if (length + i > 9) {
        throw 'Not enough spaces';
      }
    } else if (direction === 'v') {
      if (length + j > 9) {
        throw 'Not enough spaces';
      }
    }
    // ship placed over pre-existing ship
    for (let n = 0; n < length; n++) {
      if (direction === 'h') {
        if (typeof (gameboardArray[j][i + n]) === 'object') {
          throw 'Cannot place over other ship';
        }
      } else if (typeof (gameboardArray[j + n][i]) === 'object') {
        throw 'Cannot place over other ship';
      }
    }
  };

  // array to hold all shipObjects after they have been placed in gameboardArray
  const shipObjectArray = [];

  // check if user selected placement is valid and add ship to gameboardArray
  const placeShip = function (shipObject, direction, i, j) {
    try {
      isValidPlacement(shipObject, direction, i, j);
      shipObjectArray.push(shipObject);
      const { length } = shipObject.returnArray();

      // place boat either horizontally or vertically in gameboardArray
      for (let n = 0; n < length; n++) {
        if (direction === 'h') {
          gameboardArray[j][i + n] = { object: shipObject, index: n, direction };
        } else if (direction === 'v') {
          gameboardArray[j + n][i] = { object: shipObject, index: n, direction };
        }
      }
      return gameboardArray;
    } catch (err) {
      return err;
    }
  };

  // check if attack location has already been selected
  const isValidAttack = function (i, j) {
    if ((gameboardArray[j][i] === 'M') || (Object.values(gameboardArray[j][i])[1] === 'H')) {
      throw 'Cannot attack already targeted space';
    }
  };

  // check if ship isSunk attribute is true or false
  const isShipSunk = function (shipObject) {
    const isSunk = shipObject.isSunk();
    return isSunk;
  };

  // check if all ship objects have been sunk
  const isLoser = function () {
    for (const ship in shipObjectArray) {
      if (shipObjectArray[ship].isSunk()) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  };

  const receiveAttack = function (i, j) {
    try {
      isValidAttack(i, j);
      if (typeof (gameboardArray[j][i]) === 'object') {
        const shipIndex = gameboardArray[j][i].index;
        const shipObject = gameboardArray[j][i].object;
        shipObject.hit(shipIndex);
        if (isShipSunk(shipObject) === true) {
          const { direction } = gameboardArray[j][i];
          for (let n = 0; n < 9; n++) {
            if (direction === 'h') {
              if (gameboardArray[j][n].object === shipObject) {
                gameboardArray[j][n].index = 'S';
              }
            } else if (direction === 'v') {
              if (gameboardArray[n][i] === shipObject) {
                gameboardArray[n][i].index = 'S';
              }
            }
          }
        } else {
          gameboardArray[j][i].index = 'H';
        }
      } else if (gameboardArray[j][i] === 'x') {
        gameboardArray[j][i] = 'M';
      }
      return gameboardArray;
    } catch (err) {
      return err;
    }
  };

  return {
    createBoard, returnBoard, isValidPlacement, placeShip, isValidAttack, receiveAttack, isLoser,
  };
}

export { createShip, gameboard };
