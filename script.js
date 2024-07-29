const board = document.getElementById('board');
const status = document.getElementById('status');
const cells = [];
let currentPlayer = 'X';
let winner = null;

function createCell(row, col) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.addEventListener('click', () => makeMove(row, col));
    cells.push(cell);
    board.appendChild(cell);
}

function initializeBoard() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            createCell(row, col);
        }
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            winner = cells[a].textContent;
            return true;
        }
    }

    if ([...cells].every(cell => cell.textContent !== '')) {
        winner = 'Draw';
        return true;
    }

    return false;
}

function makeMove(row, col) {
    if (cells[row * 3 + col].textContent || winner) return;

    cells[row * 3 + col].textContent = currentPlayer;

    if (checkWinner()) {
        if (winner === 'Draw') {
            result.textContent = 'It\'s a Draw!';
        } else {
            result.textContent = `Player ${winner} wins!`;
        }
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        result.textContent = `Current Player: ${currentPlayer}`;
    }
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    winner = null;
    status.textContent = 'Current Player: X';
}

initializeBoard();
