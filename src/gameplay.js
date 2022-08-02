/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */

import { createShip, gameboard } from './components';

// create array to hold both player objects
const playerArray = [];

// create player objects
const Player = function (playerName) {
  // store a player's name
  const userName = playerName;

  // add player to playerArray
  playerArray.push(Player);

  // create gameboard array for player
  const playerBoard = gameboard();
  const playerBoardArray = playerBoard.createBoard();
  const shipObjectArray = [];

  // create ships for player
  function createPlayerShips() {
    const destroyer = createShip(2, 'Destroyer');
    const submarine = createShip(3, 'Submarine');
    const cruiser = createShip(3, 'Cruiser');
    const battleship = createShip(4, 'Battleship');
    const carrier = createShip(5, 'Carrier');
    shipObjectArray.push(destroyer);
    shipObjectArray.push(submarine);
    shipObjectArray.push(cruiser);
    shipObjectArray.push(battleship);
    shipObjectArray.push(carrier);
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

  const computerShipSet = function () {
    let placedShips = false;
    createPlayerShips();
    for (const ship in shipObjectArray) {
      const currentShip = shipObjectArray[ship];
      let randomi;
      let randomj;
      let randomDirection;
      let placedShip = false;
      while (placedShip === false) {
        randomi = Math.floor(Math.random() * 10);
        randomj = Math.floor(Math.random() * 10);
        randomDirection = Math.floor(Math.random() * 2);
        if (randomDirection > 0) {
          randomDirection = 'h';
        } else {
          randomDirection = 'v';
        }
        try {
          playerBoard.isValidPlacement(currentShip, randomDirection, randomi, randomj);
          playerBoard.placeShip(currentShip, randomDirection, randomi, randomj);
          placedShip = true;
        } catch {
          continue;
        }
      }
    }
    placedShips = true;
    return placedShips;
  };
  return {
    userName,
    playerBoard,
    shipObjectArray,
    isLoser,
    createPlayerShips,
    showPlayerBoard,
    showOpponentView,
    computerHit,
    computerShipSet,
  };
};

export { Player };
