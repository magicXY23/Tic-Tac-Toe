const board = document.getElementById('board');
const ctx = board.getContext('2d');

board.width = window.innerWidth*0.7;
board.height = window.innerHeight*0.7;
if (board.width > board.height) {
    board.width = board.height;
}
else {
    board.height = board.width;
}

const cellSize = board.width / 3;

function drawBoard() {
    ctx.clearRect(0, 0, board.width, board.height);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'White';

    ctx.beginPath();
    ctx.moveTo(cellSize, 0);
    ctx.lineTo(cellSize, board.height);
    ctx.moveTo(2 * cellSize, 0);
    ctx.lineTo(2 * cellSize, board.height);

    ctx.moveTo(0, cellSize);
    ctx.lineTo(board.width, cellSize);
    ctx.moveTo(0, 2 * cellSize);
    ctx.lineTo(board.width, 2 * cellSize);
    ctx.stroke();
}

drawBoard();