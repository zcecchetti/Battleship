/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */

import { Player } from './gameplay';

// create game form
function createGameForm() {
  const formContainer = document.getElementById('greetingContainer');
  const newGameForm = document.createElement('form');
  newGameForm.setAttribute('id', 'gameForm');
  newGameForm.setAttribute('onsubmit', 'startGameplay(); return false');

  const opponentSelectDiv = document.createElement('div');
  const opponentFieldset = document.createElement('fieldset');
  opponentSelectDiv.appendChild(opponentFieldset);

  const opponentLegend = document.createElement('legend');
  opponentLegend.textContent = 'Play versus...';
  opponentFieldset.appendChild(opponentLegend);

  // create choice between player vs player and player vs computer
  const playerVsPlayer = document.createElement('input');
  const labelpvp = document.createElement('label');
  playerVsPlayer.setAttribute('type', 'radio');
  playerVsPlayer.setAttribute('id', 'pvp');
  labelpvp.setAttribute('for', 'pvp');
  playerVsPlayer.setAttribute('name', 'opponentType');
  playerVsPlayer.setAttribute('value', true);
  playerVsPlayer.setAttribute('required', '');
  labelpvp.textContent = 'Player';
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

  // show which option is selected

  // check if user selected an opponent type
  playerVsPlayer.addEventListener('input', () => {
    playerVsPlayer.setCustomValidity('');
    playerVsPlayer.checkValidity();
  });

  playerVsPlayer.addEventListener('invalid', () => {
    if (!playerVsPlayer.checkValidity()) {
      playerVsPlayer.setCustomValidity('Please select an opponent type...');
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
function checkSpace(currentSpace, spaceDiv, whichPlayer) {
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
// function removeBoards() {
//   try {
//     const playerBoard = document.getElementById('playerBoard');
//     const playerBoardContainer = document.getElementById('playerBoardContainer');

//     const opponentBoard = document.getElementById('opponentBoard');
//     const opponentBoardContainer = document.getElementById('opponentBoardContainer');

//     playerBoard.removeChild(playerBoardContainer);
//     opponentBoard.removeChild(opponentBoardContainer);
//   } catch {
//     return false;
//   }
// }

// unselect space
function unselectSpace() {
  const space = document.getElementById('selected');
  space.removeAttribute('id', 'selected');
}

// allow user to select space
function selectSpace(element) {
  try {
    unselectSpace();
    element.setAttribute('id', 'selected');
  } catch {
    element.setAttribute('id', 'selected');
  }
}

// add event listener to select space
function addSelectorListener(space) {
  space.addEventListener('click', () => {
    selectSpace(space);
  });
}

// add playerboards to DOM
function addPlayerBoards(playerArray, whichPlayer) {
  const playerBoardDiv = document.createElement('div');

  for (const row in playerArray) {
    const currentRow = playerArray[row];
    const currentRowDiv = document.createElement('div');
    currentRowDiv.classList.add('boardRow');
    currentRowDiv.classList.add(`${row}`);
    for (let i = 0; i < currentRow.length; i++) {
      const spaceDiv = document.createElement('div');
      const currentSpace = currentRow[i];
      spaceDiv.classList.add('spaceDiv');
      checkSpace(currentSpace, spaceDiv, whichPlayer);
      spaceDiv.classList.add(`${i}`);
      addSelectorListener(spaceDiv);
      currentRowDiv.appendChild(spaceDiv);
    }
    playerBoardDiv.appendChild(currentRowDiv);
  }

  if (whichPlayer === 'self') {
    const playerBoard = document.getElementById('playerBoard');
    playerBoardDiv.setAttribute('id', 'playerBoardContainer');
    playerBoard.appendChild(playerBoardDiv);
  } else {
    const playerBoard = document.getElementById('opponentBoard');
    playerBoardDiv.setAttribute('id', 'opponentBoardContainer');
    playerBoard.appendChild(playerBoardDiv);
  }
}

// get opponent type from form
function getOpponent() {
  const opponentType = document.querySelector("input[name='opponentType']:checked").value;
  if (opponentType === true) {
    const humanPlayer = new Player();
    return humanPlayer;
  }
  const computerPlayer = new Player();
  return computerPlayer;
}

// eslint-disable-next-line no-unused-vars
window.startGameplay = function () {
  const playerOne = Player();
  const playerBoardOne = playerOne.playerBoard;
  const playerTwo = getOpponent();
  const playerBoardTwo = playerTwo.playerBoard;

  addGameContainers();
  playerOne.createPlayerShips();
  playerTwo.createPlayerShips();
  const playerOneShips = playerOne.shipObjectArray;
  const playerTwoShips = playerTwo.shipObjectArray;
  const smallShip = playerOneShips[0];
  const shortShip = playerTwoShips[0];
  const longShip = playerOneShips[2];
  const bigShip = playerTwoShips[2];
  playerBoardOne.placeShip(smallShip, 'h', 4, 5);
  playerBoardOne.placeShip(longShip, 'v', 7, 3);
  playerBoardTwo.placeShip(shortShip, 'h', 4, 5);
  playerBoardTwo.placeShip(bigShip, 'h', 7, 3);
  playerBoardOne.receiveAttack(1, 5);
  playerBoardOne.receiveAttack(4, 5);
  playerBoardOne.receiveAttack(5, 5);
  playerBoardOne.receiveAttack(3, 4);
  playerBoardTwo.receiveAttack(1, 5);
  playerBoardTwo.receiveAttack(4, 5);
  playerBoardTwo.receiveAttack(5, 5);
  playerBoardTwo.receiveAttack(3, 4);
  addPlayerBoards(playerOne.showPlayerBoard(), 'self');
  addPlayerBoards(playerTwo.showPlayerBoard(), 'opponent');
};

export { createGameForm };
