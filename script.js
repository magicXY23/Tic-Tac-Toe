const board = document.getElementById('board');
const ctx = board.getContext('2d');

const title = document.querySelector('h1');
const msg1 = document.getElementById('msg1');
const msg2 = document.getElementById('msg2');
const totalOffsetHeight = title.offsetHeight + msg1.offsetHeight + msg2.offsetHeight + 40;

board.width = Math.floor((window.innerWidth*0.8 - 10)/3)*3 + 10;
board.height = Math.floor((window.innerHeight*0.8 - 10 - totalOffsetHeight)/3)*3 + 10;
if (board.width > board.height) {
    board.width = board.height;
}
else {
    board.height = board.width;
}
const cellSize = (board.width-10) / 3;

let gameState = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let currentPlayer = 'X';
let gameOver = false;

msg2.textContent = 'Current player: ' + currentPlayer;

function drawBoard() {
    ctx.clearRect(0, 0, board.width, board.height);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'White';

    ctx.beginPath();
    ctx.moveTo(cellSize+2.5, 0);
    ctx.lineTo(cellSize+2.5, board.height);
    ctx.moveTo(2*cellSize+5+2.5, 0);
    ctx.lineTo(2*cellSize+5+2.5, board.height);

    ctx.moveTo(0, cellSize+2.5);
    ctx.lineTo(board.width, cellSize+2.5);
    ctx.moveTo(0, 2*cellSize+5+2.5);
    ctx.lineTo(board.width, 2*cellSize+5+2.5);
    ctx.stroke();
}

// function drawXO() {
// }

// function checks() {
// }

board.addEventListener('click', function(event) {
    if (gameOver) return;

    const square = board.getBoundingClientRect();
    const x = event.clientX - square.left;
    const y = event.clientY - square.top;

    const row = Math.floor(y / (cellSize + 5));
    const col = Math.floor(x / (cellSize + 5));

    if (gameState[row][col] === '') {
        gameState[row][col] = currentPlayer;
        drawXO();
        checks();
    }
});

drawBoard();