const playerOne = {name: 'Sergei'};
const playerTwo = {name: 'Alex'};

const myURL = 'http://localhost:8080/api/users';


class TicTacToe {
    field = [null, null, null, null, null, null, null, null, null]
    winPositions = [
        [0, 1, 2], 
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    players = []
    symbols = ["X", "O"]

    constructor(playerOne,playerTwo, field, winPositions) {
        this.players.push(playerOne);
        this.players.push(playerTwo);
    }

    getSymbol(idx) {
        return this.symbols[idx];
    }

    getPlayer(idx) {
        return this.players[idx];
    }

    checkCells(Block) {
        for (let idx = 0; idx < this.field.length; idx++) {
            if (Block === cells[idx]){
                currentFieldPosition = idx;
                gameTurns.push(idx);
            }     
        }
    }

    makeMove(position, symbol) {
        if (!this.isPossibleMove(position)) {
            throw alert("Клетка уже занята!");
        }
        checkRollback = 0;
        this.field[position] = symbol;
    }

    isPossibleMove(position){
        for (let idx = 0; idx < gameTurns.length; idx++) 
        return position < this.field.length && this.field[position] === null;
    }

    printSymbol(idx, clickBlock) {
        (idx % 2) === 0 ? clickBlock.innerHTML = cross.outerHTML : clickBlock.innerHTML = circle.outerHTML;
    }

    checkIsWim(symbol) {
        let isWin = true;
    
        for (const position of this.winPositions) {
            isWin = true;
    
            for (const cell of position) {
                isWin = isWin && this.field[cell] === symbol;
            }

            if (isWin) {
                game.coloringCells(position);
                return true;
            }
        }
        game.checkIsDraw();
    }

    coloringCells(position) {
        for (const cell of position) {
            cells[cell].style.backgroundColor = '#FFCC73';
        }
    }

    checkIsDraw() {
        let draw = true;
        for (let idx = 0; idx < this.field.length; idx++) {
            draw = draw && this.field[idx] !== null;
        }

        if (draw) {
            text.innerHTML = "Ничья!";
            resultWnd.style.display = 'block';
            game.resetGame();
        }
    }

    showResult(idx) {
        text.innerHTML = `${game.getPlayer(idx % 2).name}\nпобедил!`;
        resultWnd.style.display = 'block';
        game.resetGame();
    }

    resetGame() {
        resetBtn.onclick = () => {
            location.reload(true);
        }
    }

    recoilBtn(clickBlock, position) {
        for (let idx = 0; idx < this.field.length; idx++) {
            if (clickBlock === gameField.querySelectorAll('.element')[idx]) {
                cells[position].removeChild(gameField.querySelectorAll('.element')[idx]);
            }
        }

        gameTurns.pop();

        for (let idx = 0; idx < gameTurns.length; idx++) {
            currentFieldPosition = gameTurns[idx];
        }

        this.field[position] = null;
        checkRollback = 1;
    }
}

const gameField = document.querySelector("#game-field");
let cells = document.querySelectorAll('.game-field_cell');
const cross = document.querySelector('#cross');
const circle = document.querySelector('#circle');
const text = document.querySelector('#textWindow');
const modal = document.querySelector('#modalWindow');
const overlay = document.querySelector('#overlay');
const resetBtn = document.querySelector('#modal-reset-button');
const resultWnd = document.querySelector('#resultWindow');
const button = document.querySelector('#button');
const input = document.querySelector('#input');

let field = [];
let winPositions = [];

button.addEventListener("click", resize => { 
    let inputNumber = parseInt(Number(input.value));
    if (inputNumber > 2 && inputNumber < 9) {
        field.length = 0;
        winPositions.length = 0;
        calculateField(inputNumber);
        
        calculateVertAndHorizPositions(inputNumber);
    
        calculateLeftDiagonalWinPosition(inputNumber);
        
        calculateRightDiagonalWinPosition(inputNumber);
    
        addDiv(field, inputNumber);

        cells = document.querySelectorAll('.game-field_cell');
        game.field = field;
        game.winPositions = winPositions;
        idx = 0;
    } else {
        alert('Введите число от 3 до 8');
    }
});

const newElement = document.createElement("input");
document.querySelector("#rollback").appendChild(newElement);
newElement.type = "button";
newElement.value = "Отменить ход";
newElement.classList.add('rollback');

const bodyPlayerOne = {
    name: playerOne.name
}
const bodyPlayerTwo = {
    name: playerTwo.name
}

const gameTurns = []; 
let currentFieldPosition = 0;
let idx = 0;
let checkRollback = 0;

const game = new TicTacToe(playerOne,playerTwo);

try {
    gameField.addEventListener("mouseup", clickBlock => {
        if(clickBlock.target.className = 'game-field_cell') {
            
            let currentPlayerSymbol = game.getSymbol(idx % 2);
            
            game.checkCells(clickBlock.target);

            game.makeMove(currentFieldPosition, currentPlayerSymbol);

            game.printSymbol(idx, clickBlock.target);

            if (game.checkIsWim(currentPlayerSymbol)) {
                getUsers(myURL);
                postUsers("POST", myURL, bodyPlayerOne);
                postUsers("POST", myURL, bodyPlayerTwo);
                game.showResult(idx, currentFieldPosition);
            }

            idx++;

            newElement.onclick = function() {
                if (checkRollback == 0) {
                    game.recoilBtn(clickBlock.target.firstChild, currentFieldPosition);
                    idx--;
                }
            }
        }
    });
} catch {
    console.log(exc);
}

function getUsers(url) {
    return fetch(url)
    .then(response => response.json())
    .then(result => console.log(result));
}

function postUsers(method, url, body) {
    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => console.log(result));
}

function deleteDiv(number) {
    gameField.style.gridTemplateColumns = `repeat( ${number}, auto)`;

    while (gameField.firstChild) {
        gameField.removeChild(gameField.firstChild);
    }
}

function addDiv(field, number) {
    deleteDiv(number);
    for (let idx = 0; idx < field.length; idx++) {
        const newDiv = document.createElement('div');

        newDiv.classList.add('game-field_cell');
    
        gameField.appendChild(newDiv)[idx];
    }
        
}

function calculateField(number) {
    for (let idx = 0; idx < number**2; idx++) {
        field[idx] = null;
    }
}

function calculateVertAndHorizPositions(number) {
    let num = 0;
    let horizontalPosition = 0;
    let allWinHorizontalPosition = [];
    let allWinVerticalPosition = [];

    for(let idx = 0; idx < number; idx++) {
        for(let j = 0; j < number; j++) {
            allWinHorizontalPosition[j] = horizontalPosition + j; // вычисляет выигрышные позиции по горизонтали
            allWinVerticalPosition[j] = number * j + idx; // вычисляет выигрышные позиции по вертикали
        }
        horizontalPosition += number;

        for (let idx = 0; idx < 1; idx++) {
            winPositions[num] = [];
            winPositions[num+number] = [];
            for(let j=0; j < number; j++) {
                winPositions[num][j] = allWinHorizontalPosition[j];
                winPositions[num+number][j] = allWinVerticalPosition[j];
            }
            num++;
        }
    }
}

function calculateLeftDiagonalWinPosition(number) { // вычисляет левую диагональ
    let allWinLeftDiagonalPosition = [0];
    let leftDiagonalPosition = 0;

    for (let idx = 0; idx < number-1; idx++) { 
        leftDiagonalPosition += number + 1;
        allWinLeftDiagonalPosition.push(leftDiagonalPosition);
    }
    winPositions.splice(0, 0, allWinLeftDiagonalPosition);
}

function calculateRightDiagonalWinPosition(number) { // вычисляет правую диагональ
    let allWinRightDiagonalPosition = [];
    let rightDiagonalPosition = 0;

    for (let idx = 0; idx < number; idx++) { 
        rightDiagonalPosition += number - 1;
        allWinRightDiagonalPosition.push(rightDiagonalPosition);
    }
    winPositions.splice(0, 0, allWinRightDiagonalPosition);
}
