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

// function getOpponentType() {
//   const inputPlayer = document.querySelector("input[name='opponentType']:checked").value;
//   return inputPlayer;
// }

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

function addPlayerBoards(playerOne) {
  const playerOneArray = playerOne.playerBoardArray;

  const playerOneBoardDiv = document.createElement('div');

  for (const row in playerOneArray) {
    const currentRow = playerOneArray[row];
    const currentRowDiv = document.createElement('div');
    for (let i = 0; i < currentRow.length; i++) {
      const spaceDiv = document.createElement('div');
      spaceDiv.classList.add(spaceDiv);
      currentRowDiv.appendChild(spaceDiv);
    }
    playerOneBoardDiv.appendChild(currentRowDiv);
  }
}

// eslint-disable-next-line no-unused-vars
window.startGameplay = function () {
//   const opponentType = getOpponentType();

  const playerOne = new Player();
  //   if (opponentType === true) {
  //     const playerTwo = new Player();
  //   } else {
  //     const computerPlayer = new Player();
  //   }

  addGameContainers();
  addPlayerBoards(playerOne);
};

export { createGameForm };
