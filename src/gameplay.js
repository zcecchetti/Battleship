/* eslint-disable import/prefer-default-export */
/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */

import { createShip, gameboard } from './components';

// create array to hold both player objects
const playerArray = [];

// create player objects
const player = function () {
  // add player to playerArray
  playerArray.push(player);

  // create gameboard array for player
  const playerBoard = gameboard();
  const playerBoardArray = playerBoard.createBoard();
  const shipObjectArray = [];

  // create 3 ships for player
  function createPlayerShips() {
    const smallShip = createShip(3);
    const mediumShip = createShip(4);
    const largeShip = createShip(6);
    shipObjectArray.push(smallShip);
    shipObjectArray.push(mediumShip);
    shipObjectArray.push(largeShip);
    return shipObjectArray;
  }

  // check if all of player's ships have been sunk
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

  const showPlayerBoard = function () {
    return playerBoardArray;
  };

  const showOpponentView = function () {
    return playerBoard.opponentView();
  };

  const computerHit = function () {
    let attackMade = false;
    let randomi;
    let randomj;
    while (attackMade === false) {
      randomi = Math.floor(Math.random() * 10);
      randomj = Math.floor(Math.random() * 10);
      try {
        playerBoard.receiveAttack(randomi, randomj);
        attackMade = true;
      } catch {
        continue;
      }
    }
    return true;
  };
  return {
    playerBoard,
    shipObjectArray,
    isLoser,
    createPlayerShips,
    showPlayerBoard,
    showOpponentView,
    computerHit,
  };
};

export { player };
