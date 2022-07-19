/* eslint-disable no-continue */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-empty */
/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */

import { Player } from './gameplay';

// type text on screen to introduce game to user
function typeText(i, message, nextFunction) {
  const greeting = document.getElementById('greeting');
  if (i < message.length) {
    greeting.textContent += message.charAt(i);
    i++;
    if ((message.charAt(i) === '.') || (message.charAt(i) === '!')) {
      setTimeout(() => { typeText(i, message, nextFunction); }, 150);
    } else {
      setTimeout(() => { typeText(i, message, nextFunction); }, 50);
    }
  }
  if (i === message.length) {
    setTimeout(nextFunction, 250);
    i++;
  }
}

// create game form
function createGameForm() {
  const formContainer = document.getElementById('greetingContainer');
  const newGameForm = document.createElement('form');
  newGameForm.setAttribute('id', 'gameForm');
  newGameForm.setAttribute('onsubmit', 'startGameplay(); return false');

  // create choice between player vs player and player vs computer
  const opponentSelectDiv = document.createElement('div');
  const opponentFieldset = document.createElement('fieldset');
  opponentSelectDiv.appendChild(opponentFieldset);

  const opponentLegend = document.createElement('legend');
  opponentLegend.textContent = 'Choose your opponent';
  opponentFieldset.appendChild(opponentLegend);

  const playerVsPlayer = document.createElement('input');
  const labelpvp = document.createElement('label');
  playerVsPlayer.setAttribute('type', 'radio');
  playerVsPlayer.setAttribute('id', 'pvp');
  labelpvp.setAttribute('for', 'pvp');
  playerVsPlayer.setAttribute('name', 'opponentType');
  playerVsPlayer.setAttribute('value', true);
  playerVsPlayer.setAttribute('required', '');
  labelpvp.textContent = 'Player 2';
  const pvpDiv = document.createElement('div');
  pvpDiv.classList.add('opponentOption');
  pvpDiv.appendChild(labelpvp);
  pvpDiv.appendChild(playerVsPlayer);
  opponentFieldset.appendChild(pvpDiv);

  const playerVsComp = document.createElement('input');
  const labelpvc = document.createElement('label');
  playerVsComp.setAttribute('type', 'radio');
  playerVsComp.setAttribute('id', 'pvc');
  labelpvc.setAttribute('for', 'pvc');
  playerVsComp.setAttribute('name', 'opponentType');
  playerVsComp.setAttribute('value', false);
  labelpvc.textContent = 'Computer';
  const pvcDiv = document.createElement('div');
  pvcDiv.classList.add('opponentOption');
  pvcDiv.appendChild(labelpvc);
  pvcDiv.appendChild(playerVsComp);
  opponentFieldset.appendChild(pvcDiv);

  // check if user selected an opponent type
  playerVsPlayer.addEventListener('input', () => {
    playerVsPlayer.setCustomValidity('');
    playerVsPlayer.checkValidity();
  });

  playerVsPlayer.addEventListener('invalid', () => {
    if (!playerVsPlayer.checkValidity()) {
      playerVsPlayer.setCustomValidity('Please select an opponent type');
    }
  });

  newGameForm.appendChild(opponentSelectDiv);
  formContainer.appendChild(newGameForm);

  const startGame = document.createElement('button');
  startGame.setAttribute('type', 'submit');
  startGame.textContent = 'Start Game';
  newGameForm.appendChild(startGame);
}

function addGameContainers() {
  const greetingContainer = document.getElementById('greetingContainer');
  const contentContainer = document.getElementById('contentContainer');
  contentContainer.removeChild(greetingContainer);

  const boardContainer = document.createElement('div');
  boardContainer.setAttribute('id', 'boardContainer');
  contentContainer.appendChild(boardContainer);

  const playerBoard = document.createElement('div');
  playerBoard.setAttribute('id', 'playerBoard');
  playerBoard.classList.add('boards');
  boardContainer.appendChild(playerBoard);

  const opponentBoard = document.createElement('div');
  opponentBoard.setAttribute('id', 'opponentBoard');
  opponentBoard.classList.add('boards');
  boardContainer.appendChild(opponentBoard);
}

// check spaceDiv for value other than empty
function checkSpaceInfo(currentSpace, spaceDiv, whichPlayer) {
  if (whichPlayer === 'self') {
    if ((typeof (currentSpace) === 'object') && (typeof (currentSpace.index) !== 'string')) {
      spaceDiv.classList.add('B');
    }
  }
  if (currentSpace === 'M') {
    spaceDiv.classList.add('M');
  } else if (currentSpace.index === 'H') {
    spaceDiv.classList.add('H');
  } else if (currentSpace.index === 'S') {
    spaceDiv.classList.add('S');
  }
}

// delete player boards
function removeBoard(whichPlayer) {
  try {
    if (whichPlayer === 'self') {
      const playerBoard = document.getElementById('playerBoard');
      const playerBoardContainer = document.getElementById('playerBoardContainer');
      playerBoard.removeChild(playerBoardContainer);

      const playerNames = document.getElementsByClassName('playerNames');
      const playerName = playerNames[0];
      playerBoard.removeChild(playerName);
    } else {
      const opponentBoard = document.getElementById('opponentBoard');
      const opponentBoardContainer = document.getElementById('opponentBoardContainer');
      opponentBoard.removeChild(opponentBoardContainer);

      const playerNames = document.getElementsByClassName('playerNames');
      const playerName = playerNames[1];
      opponentBoard.removeChild(playerName);
    }
  } catch {
  }
}

// unselect space
function unselectSpace() {
  try {
    const spacesSelected = document.getElementsByClassName('selected');
    const space = spacesSelected[0];
    space.classList.remove('selected');
  } catch {
  }
}

// allow user to select space
function selectSpace(space) {
  unselectSpace();

  // prevent already attacked spaces from being selected
  if ((space.classList.contains('M')) || (space.classList.contains('H')) || (space.classList.contains('S'))) {
    return;
  }
  space.classList.add('selected');
}

// check if space is selected
function checkSelected(space) {
  const spacesSelected = document.getElementsByClassName('selected');
  const checkElementAgainst = spacesSelected[0];
  if (space === checkElementAgainst) {
    return true;
  }
  return false;
}

// check column and row of space in array
function checkSpaceLocation(space) {
  const spaceID = space.id;
  const spaceLocation = spaceID.split('+');
  return spaceLocation;
}

// attack space if selected
function attackSpace(player, space, whichPlayer) {
  const { playerBoard } = player;
  const attackLocation = checkSpaceLocation(space);
  const attackI = attackLocation[0];
  const attackJ = attackLocation[1];
  if (whichPlayer === 'self') {
    return;
  }
  try {
    playerBoard.receiveAttack(attackI, attackJ);
    removeBoard(whichPlayer);
    addPlayerBoards(player, whichPlayer);
    const hasLost = player.isLoser();
    if (hasLost) {
      alert(`${player.userName} Loses!`);
    }
  } catch {
  }
}

// add event listener to select space
function addSelectorListener(player, space, whichPlayer) {
  space.addEventListener('click', () => {
    const selected = checkSelected(space);
    if (selected) {
      attackSpace(player, space, whichPlayer);
    } else {
      selectSpace(space);
    }
  });
}

// get ship array details from dragged item
function getShipDirection(shipElement) {
  if (shipElement.classList.contains('horizontal')) {
    const direction = 'h';
    return direction;
  }
  const direction = 'v';
  return direction;
}

// allow drop onto playerBoardArray
window.allowDrop = function (ev) {
  ev.preventDefault();
};

// create drag protocol
window.drag = function (ev) {
  ev.dataTransfer.setData('text/plain', ev.target.id);
};

// create drop protocol
window.drop = function (ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData('text/plain');
  ev.target.appendChild(document.getElementById(data));
};

// get locations and data on all ships placed by user
function placeShips(player) {
  const boatContainers = document.getElementsByClassName('boatContainerArray');
  const { shipObjectArray } = player;

  // iterate over boatContainers
  for (let i = 0; i < 5; i++) {
    const currentContainer = boatContainers[0];
    const containerParent = currentContainer.parentElement;
    const spaceLocation = checkSpaceLocation(containerParent);
    const placeI = parseInt(spaceLocation[0], 10);
    const placeJ = parseInt(spaceLocation[1], 10);
    const direction = getShipDirection(currentContainer);

    const shipName = currentContainer.id;
    for (const ship in shipObjectArray) {
      const currentShip = shipObjectArray[ship];
      if (shipName === currentShip.shipName) {
        try {
          player.playerBoard.isValidPlacement(currentShip, direction, placeI, placeJ);
        //   console.log(currentShip);
        } catch (err) {
          console.log(err);
          return;
        }
      }
    }
    for (const ship in shipObjectArray) {
      const currentShip = shipObjectArray[ship];
      if (shipName === currentShip.shipName) {
        player.playerBoard.placeShip(currentShip, direction, placeI, placeJ);
        containerParent.removeChild(currentContainer);
      }
    }
  }
  removeBoard('self');
  addPlayerBoards(player, 'self');
}

// add playerboards to DOM
function addPlayerBoards(player, whichPlayer) {
  const playerArray = player.showPlayerBoard();
  const playerBoardDiv = document.createElement('div');

  for (const row in playerArray) {
    const currentRow = playerArray[row];
    const currentRowDiv = document.createElement('div');
    currentRowDiv.classList.add('boardRow');
    for (let i = 0; i < currentRow.length; i++) {
      const spaceDiv = document.createElement('div');
      const currentSpace = currentRow[i];
      spaceDiv.classList.add('spaceDiv');
      spaceDiv.setAttribute('ondrop', 'drop(event)');
      spaceDiv.setAttribute('ondragover', 'allowDrop(event)');
      checkSpaceInfo(currentSpace, spaceDiv, whichPlayer);
      spaceDiv.setAttribute('id', `${i}+${row}`);
      addSelectorListener(player, spaceDiv, whichPlayer);
      currentRowDiv.appendChild(spaceDiv);
    }
    playerBoardDiv.appendChild(currentRowDiv);
  }

  if (whichPlayer === 'self') {
    const playerBoard = document.getElementById('playerBoard');
    playerBoardDiv.setAttribute('id', 'playerBoardContainer');

    const playerName = document.createElement('div');
    playerName.textContent = 'Your Board';
    playerName.classList.add('playerNames');

    playerBoard.appendChild(playerName);
    playerBoard.appendChild(playerBoardDiv);
  } else {
    const playerBoard = document.getElementById('opponentBoard');
    playerBoardDiv.setAttribute('id', 'opponentBoardContainer');
    const playerName = document.createElement('div');
    const boardTitle = player.userName;
    playerName.textContent = `${boardTitle}'s Board`;
    playerName.classList.add('playerNames');

    playerBoard.appendChild(playerName);
    playerBoard.appendChild(playerBoardDiv);
  }
}

// get opponent type from form
// function getOpponent() {
//   const opponentType = document.querySelector("input[name='opponentType']:checked").value;
//   if (opponentType === 'true') {
//     const humanPlayer = new Player('Player 2');
//     return humanPlayer;
//   }
//   const computerPlayer = new Player('Computer');
//   return computerPlayer;
// }

// change direction of boat selection on click
function changeDirection(boatContainerArray) {
  if (boatContainerArray.classList.contains('horizontal')) {
    boatContainerArray.classList.remove('horizontal');
    boatContainerArray.classList.add('vertical');
  } else {
    boatContainerArray.classList.remove('vertical');
    boatContainerArray.classList.add('horizontal');
  }
}

// add boat selection for player
function addBoatSelection(player) {
  // create ships for player
  player.createPlayerShips();
  const playerShips = player.shipObjectArray;

  // add ships to DOM
  const contentContainer = document.getElementById('contentContainer');
  const boatSelection = document.createElement('div');
  boatSelection.setAttribute('id', 'boatSelection');
  contentContainer.appendChild(boatSelection);
  for (const boat in playerShips) {
    const currentBoat = playerShips[boat];
    const boatArray = currentBoat.returnArray();
    const { shipName } = currentBoat;

    const boatDiv = document.createElement('div');
    boatDiv.classList.add('boatSelectionContainer');
    const boatArrayContainer = document.createElement('div');
    boatArrayContainer.classList.add('boatContainerArray');
    boatArrayContainer.classList.add('horizontal');
    boatArrayContainer.setAttribute('draggable', 'true');
    boatArrayContainer.setAttribute('ondragstart', 'drag(event)');
    boatArrayContainer.setAttribute('id', `${shipName}`);

    boatArrayContainer.addEventListener('click', () => {
      changeDirection(boatArrayContainer);
    });

    for (let i = 0; i < boatArray.length; i++) {
      const spaceDiv = document.createElement('div');
      spaceDiv.classList.add('boatSelectionSpace');
      boatArrayContainer.appendChild(spaceDiv);
    }
    const boatName = document.createElement('div');
    boatName.textContent = shipName;
    boatDiv.appendChild(boatArrayContainer);
    boatDiv.appendChild(boatName);
    boatSelection.appendChild(boatDiv);
  }

  // add button to set ships
  const placeShipsButton = document.createElement('button');
  placeShipsButton.addEventListener('click', () => {
    placeShips(player);
  });
  placeShipsButton.textContent = 'Set Ships';
  contentContainer.appendChild(placeShipsButton);
}

// eslint-disable-next-line no-unused-vars
window.startGameplay = function () {
  const playerOne = Player('Player 1');
  //   const playerBoardOne = playerOne.playerBoard;
  //   const playerTwo = getOpponent();
  //   const playerBoardTwo = playerTwo.playerBoard;

  addGameContainers();
  addPlayerBoards(playerOne, 'self');
  addBoatSelection(playerOne);

  //   playerOne.createPlayerShips();
  //   playerTwo.createPlayerShips();
  //   const playerOneShips = playerOne.shipObjectArray;
  //   const playerTwoShips = playerTwo.shipObjectArray;
  //   const smallShip = playerOneShips[0];
  //   const shortShip = playerTwoShips[0];
  //   const longShip = playerOneShips[2];
  //   const bigShip = playerTwoShips[2];
  //   const medShip = playerTwoShips[1];
  //   playerBoardOne.placeShip(smallShip, 'h', 4, 5);
  //   playerBoardOne.placeShip(longShip, 'v', 7, 3);
  //   playerBoardTwo.placeShip(shortShip, 'h', 4, 5);
  //   playerBoardTwo.placeShip(bigShip, 'h', 3, 3);
  //   playerBoardTwo.placeShip(medShip, 'v', 0, 0);
  //   playerBoardOne.receiveAttack(1, 5);
  //   playerBoardOne.receiveAttack(4, 5);
  //   playerBoardOne.receiveAttack(5, 5);
  //   playerBoardOne.receiveAttack(3, 4);
  //   playerBoardTwo.receiveAttack(1, 5);
  //   playerBoardTwo.receiveAttack(4, 5);
  //   playerBoardTwo.receiveAttack(5, 5);
  //   playerBoardTwo.receiveAttack(3, 4);
//   addPlayerBoards(playerTwo, 'opponent');
};

export { createGameForm, typeText };
