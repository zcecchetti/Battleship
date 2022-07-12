/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-empty */
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
    } else {
      const opponentBoard = document.getElementById('opponentBoard');
      const opponentBoardContainer = document.getElementById('opponentBoardContainer');
      opponentBoard.removeChild(opponentBoardContainer);
    }
  } catch {
    console.log('did not remove boards');
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
  } catch {
    console.log('attack did not work');
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
    playerBoardDiv.classList.add();
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
  playerBoardTwo.placeShip(bigShip, 'h', 3, 3);
  playerBoardOne.receiveAttack(1, 5);
  playerBoardOne.receiveAttack(4, 5);
  playerBoardOne.receiveAttack(5, 5);
  playerBoardOne.receiveAttack(3, 4);
  playerBoardTwo.receiveAttack(1, 5);
  playerBoardTwo.receiveAttack(4, 5);
  playerBoardTwo.receiveAttack(5, 5);
  playerBoardTwo.receiveAttack(3, 4);
  addPlayerBoards(playerOne, 'self');
  addPlayerBoards(playerTwo, 'opponent');
};

export { createGameForm };
