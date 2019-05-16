const playerX = {
  coin: 0,
  mark: 'X',
  board: [],
  name: 'Karl Karlson'
};
const playerO = {
  coin: 1,
  mark: 'O',
  board: [],
  name: 'Lenny Leonard'
};
let currentPlayer = {};
const winCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

const gameField = document.querySelector('.container2'); 

loadEventListeners();

function loadEventListeners() {

  gameField.addEventListener('click', makePick);

}

// Pick who is first.  Random number 0 or 1
function coinFlip() {
  const result = Math.floor(Math.random() * 2);
  const winner = result ? 0 : 1;
  return winner
}

function matchPlayer(cp) {
  // Match currentPlayer coin to object
  if (playerX.coin === cp) {
    return playerX
  } else {
    return playerO
  }
}

function startPlay() {
  let firstPlayer = coinFlip();
  currentPlayer = matchPlayer(firstPlayer);
}

function makePick(e) {
  console.log('target', e)
  if (e.target.innerHTML) {
    displayMessage('Please click on an appropriate space', 'message', 3000)
  } else {
    e.target.innerHTML = currentPlayer.mark;
    addToPlayer(currentPlayer, Number(e.target.id));
    checkForWin(winCombos, currentPlayer.board)
    changePlayer();
  }
}


function addToPlayer(cp, value) {
  cp.board.push(value);
  console.log('board', cp.board);
}

function checkForWin(wc, cpb) {
  // Need to handle no winner
  for (let i = 0; i < wc.length; i++) {
    let result = [];
    for (let j = 0; j < cpb.length; j++) {
      // console.log('wc[i]', wc[i]);
      wc[i].indexOf(cpb[j]) > -1 ? result.push(cpb[j]) : console.log('cpb[j]', cpb[j])
      // console.log('innerArray', result)
      result.length === 3 ?  endGame() : console.log('No winner yet');
    }
  }
}

function endGame() {
  gameField.removeEventListener('click', makePick);
  displayMessage('The game has been won!  Congrats to the victor!', 'message', 10000)
}

function changePlayer() {
  if (currentPlayer === playerX) {
    currentPlayer = playerO
  } else {
    currentPlayer = playerX
  }
}

function displayMessage(message, className, time) {
  const div = document.createElement('div');
  div.className = className;
  div.appendChild(document.createTextNode(message));
  const footer = document.querySelector('.footer');
  footer.appendChild(div);

  setTimeout(() => {
    this.removeMessage();
  }, time);
}

function removeMessage() {
  const messageDiv = document.querySelector('.message');
  if(messageDiv) {
    messageDiv.remove();
  }
}

startPlay();

