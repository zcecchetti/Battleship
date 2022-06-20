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

const smallShip = createShip(3);

export { smallShip };
