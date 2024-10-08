// Grab necessary elements
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle each cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    // If the cell is already filled or the game is over, do nothing
    if (board[index] !== "" || !gameActive) return;

    // Place the current player's mark (X or O)
    board[index] = currentPlayer;
    cell.innerHTML = currentPlayer;

    // Check if the current player has won
    checkWinner();

    // Switch player if the game is still active
    if (gameActive) {
        switchPlayer();
    }
}

// Switch between players
function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.innerHTML = Player ${currentPlayer}'s turn;
}

// Check for a winner or draw
function checkWinner() {
    let roundWon = false;

    // Loop through all winning combinations
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] === "" || board[b] === "" || board[c] === "") {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.innerHTML = Player ${currentPlayer} wins!;
        gameActive = false;
        return;
    }

    // Check for a draw
    if (!board.includes("")) {
        message.innerHTML = "It's a draw!";
        gameActive = false;
    }
}

// Reset the game
function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    cells.forEach(cell => {
        cell.innerHTML = "";
    });
    message.innerHTML = Player ${currentPlayer}'s turn;
}

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

// Initialize the game message
message.innerHTML = Player ${currentPlayer}'s turn;