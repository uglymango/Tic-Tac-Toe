const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

const xSymbol = '×';
const oSymbol = '○';

let gameIsLive = true;
let xIsNext = true;

const letterToSymbol = (letter) => (letter === 'x' ? xSymbol : oSymbol);

const handleWin = (letter) => {
  gameIsLive = false;
  statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
  document.querySelectorAll(`.${letter}`).forEach((cell) => cell.classList.add('won'));
};

const checkGameStatus = () => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (cellDivs[a].classList.contains('x') && cellDivs[b].classList.contains('x') && cellDivs[c].classList.contains('x')) {
      handleWin('x');
      return;
    } else if (cellDivs[a].classList.contains('o') && cellDivs[b].classList.contains('o') && cellDivs[c].classList.contains('o')) {
      handleWin('o');
      return;
    }
  }

  const isTied = [...cellDivs].every((cell) => cell.classList.contains('x') || cell.classList.contains('o'));
  if (isTied) {
    gameIsLive = false;
    statusDiv.textContent = 'Game is tied!';
  } else {
    xIsNext = !xIsNext;
    statusDiv.innerHTML = `<span>${letterToSymbol(xIsNext ? 'x' : 'o')} is next</span>`;
  }
};

const handleReset = () => {
  xIsNext = true;
  statusDiv.innerHTML = `${xSymbol} is next`;
  cellDivs.forEach((cell) => {
    cell.classList.remove('x', 'o', 'won');
  });
  gameIsLive = true;
};

const handleCellClick = (e) => {
  const cell = e.target;
  if (!gameIsLive || cell.classList.contains('x') || cell.classList.contains('o')) {
    return;
  }

  const currentSymbol = xIsNext ? 'x' : 'o';
  cell.classList.add(currentSymbol);
  checkGameStatus();
};

resetDiv.addEventListener('click', handleReset);

cellDivs.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});
