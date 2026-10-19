const board = document.getElementById('board');
const ctx = board.getContext('2d');

const title = document.querySelector('h1');
const msg1 = document.getElementById('msg1');
const msg2 = document.getElementById('msg2');
const totalOffsetHeight = title.offsetHeight + msg1.offsetHeight + msg2.offsetHeight + 40;
const gridLineWidth = 5;

board.width = Math.floor((window.innerWidth*0.8 - 2*gridLineWidth)/3)*3 + 10;
board.height = Math.floor((window.innerHeight*0.8 - 2*gridLineWidth - totalOffsetHeight)/3)*3 + 10;
if (board.width > board.height) {
    board.width = board.height;
}
else {
    board.height = board.width;
}
const cellSize = (board.width - 2*gridLineWidth)/3;

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
    ctx.lineWidth = gridLineWidth;
    ctx.strokeStyle = 'White';

    ctx.beginPath();
    ctx.moveTo(cellSize + gridLineWidth/2, 0);
    ctx.lineTo(cellSize + gridLineWidth/2, board.height);
    ctx.moveTo(2*cellSize + gridLineWidth + gridLineWidth/2, 0);
    ctx.lineTo(2*cellSize + gridLineWidth + gridLineWidth/2, board.height);

    ctx.moveTo(0, cellSize + gridLineWidth/2);
    ctx.lineTo(board.width, cellSize + gridLineWidth/2);
    ctx.moveTo(0, 2*cellSize + gridLineWidth + gridLineWidth/2);
    ctx.lineTo(board.width, 2*cellSize + gridLineWidth + gridLineWidth/2);
    ctx.stroke();
}

function drawXO(row, col) {
    ctx.lineWidth = 10;
    if (gameState[row][col] === 'X') {
        ctx.strokeStyle = 'LightCoral';
        ctx.beginPath();
        ctx.moveTo(col*(cellSize + gridLineWidth) + ctx.lineWidth/2, row*(cellSize + gridLineWidth) + ctx.lineWidth/2);
        ctx.lineTo((col + 1)*cellSize + col*gridLineWidth - ctx.lineWidth/2, (row + 1)*cellSize + row*gridLineWidth - ctx.lineWidth/2);

        ctx.moveTo((col + 1)*cellSize + col*gridLineWidth - ctx.lineWidth/2, row*(cellSize + gridLineWidth) + ctx.lineWidth/2);
        ctx.lineTo(col*(cellSize + gridLineWidth) + ctx.lineWidth/2, (row + 1)*cellSize + row*gridLineWidth - ctx.lineWidth/2);
        ctx.stroke();
    }
    else if (gameState[row][col] === 'O') {
        ctx.strokeStyle = 'LightSkyBlue';
        ctx.beginPath();
        ctx.arc(col*(cellSize + gridLineWidth) + cellSize/2, row*(cellSize + gridLineWidth) + cellSize/2, cellSize/2 - ctx.lineWidth/2, 0, Math.PI*2);
        ctx.stroke();
    }
}

function drawWinLine(row1, col1, row2, col2) {
    ctx.strokeStyle = 'LightGreen';
    ctx.lineWidth = 10;
    ctx.beginPath();
    if (row1 === row2) {
        ctx.moveTo(col1*(cellSize + gridLineWidth), row1*(cellSize + gridLineWidth) + cellSize/2);
        ctx.lineTo((col2 + 1)*(cellSize + gridLineWidth), row2*(cellSize + gridLineWidth) + cellSize/2);
    }
    else if (col1 === col2) {
        ctx.moveTo(col1*(cellSize + gridLineWidth) + cellSize/2, row1*(cellSize + gridLineWidth));
        ctx.lineTo(col2*(cellSize + gridLineWidth) + cellSize/2, (row2 + 1)*(cellSize + gridLineWidth));
    }
    else if (row1 < row2 && col1 < col2) {
        ctx.moveTo(col1*(cellSize + gridLineWidth), row1*(cellSize + gridLineWidth));
        ctx.lineTo((col2 + 1)*cellSize + col2*gridLineWidth, (row2 + 1)*cellSize + row2*gridLineWidth);
    }
    else if (row1 < row2 && col1 > col2) {
        ctx.moveTo((col1 + 1)*cellSize + col1*gridLineWidth, row1*cellSize + row1*gridLineWidth);
        ctx.lineTo(col2*(cellSize + gridLineWidth), (row2 + 1)*cellSize + row2*gridLineWidth);
    }
    ctx.stroke();
}

const winConditions = [
    [0, 0, 0, 1, 0, 2], [1, 0, 1, 1, 1, 2], [2, 0, 2, 1, 2, 2],
    [0, 0, 1, 0, 2, 0], [0, 1, 1, 1, 2, 1], [0, 2, 1, 2, 2, 2],
    [0, 0, 1, 1, 2, 2], [0, 2, 1, 1, 2, 0]
];

function checks() {
    for(let condition of winConditions) {
        let a = gameState[condition[0]][condition[1]];
        let b = gameState[condition[2]][condition[3]];
        let c = gameState[condition[4]][condition[5]];

        if (a && a === b && b === c) {
            drawWinLine(condition[0], condition[1], condition[4], condition[5]);
            msg2.textContent = 'Player ' + currentPlayer + ' wins! Refresh the page to play again!';
            gameOver = true;
            return;
        }
    }
    if (gameState.flat().every(cell => cell !== '')) {
        msg2.textContent = 'It\'s a tie! Refresh the page to play again!';
        gameOver = true;
    }
}

drawBoard();

board.addEventListener('click', function(event) {
    if (gameOver) return;

    const square = board.getBoundingClientRect();
    const x = event.clientX - square.left;
    const y = event.clientY - square.top;

    const row = Math.floor(y/(cellSize + gridLineWidth));
    const col = Math.floor(x/(cellSize + gridLineWidth));

    if (gameState[row][col] === '') {
        gameState[row][col] = currentPlayer;
        drawXO(row, col);
        checks();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
});