const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;
let winningCells = [];

function updateStatus(message) {
  statusText.textContent = message;
}

function markCell(index, value) {
  board[index] = value;
  const cell = cells[index];
  cell.textContent = value;
  cell.classList.add(value.toLowerCase());
  cell.disabled = true;
}

function checkWinner() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winningCells = combo;
      gameActive = false;
      combo.forEach((index) => {
        cells[index].classList.add('win');
      });
      updateStatus(`Player ${board[a]} wins!`);
      return true;
    }
  }

  if (board.every((cell) => cell !== '')) {
    gameActive = false;
    updateStatus("It's a draw!");
    return true;
  }

  return false;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(`Player ${currentPlayer}'s turn`);
}

function handleCellClick(event) {
  const cell = event.target;
  const index = Number(cell.dataset.index);

  if (!gameActive || board[index]) {
    return;
  }

  markCell(index, currentPlayer);

  if (checkWinner()) {
    return;
  }

  switchPlayer();
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  winningCells = [];

  cells.forEach((cell) => {
    cell.textContent = '';
    cell.disabled = false;
    cell.classList.remove('x', 'o', 'win');
  });

  updateStatus(`Player ${currentPlayer}'s turn`);
}

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', resetGame);

updateStatus(`Player ${currentPlayer}'s turn`);
