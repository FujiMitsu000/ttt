const responses = await Promise.all([
    fetch('/assets/svg/cross.svg'),
    fetch('/assets/svg/circle.svg'),
]);

const [cross, circle] = await Promise.all(responses.map((response) => response.text()));

const circleTemplate = document.createElement('template');
circleTemplate.innerHTML = circle;

const crossTemplate = document.createElement('template');
crossTemplate.innerHTML = cross;

const gameField = document.querySelector("#game-field");
const cells = document.querySelectorAll('.game-field_cell');
const textSocket = document.querySelector('#text');
const text = document.querySelector('#textWindow');
const modal = document.querySelector('#modalWindow');
const overlay = document.querySelector('#overlay');
const resultWnd = document.querySelector('#resultWindow');
const modalResetBtn = document.querySelector('#modal-reset-button');
const windowResetBtn = document.querySelector('#window-reset-button');
const playerOneBorderTurnColor = document.querySelector('.current-turn-color_0');
const playerTwoBorderTurnColor = document.querySelector('.current-turn-color_1');

const socket = io('http://localhost:3000');

const playerOne = {
    name: 'Sergei', 
    email: 'нет почты'
};
const playerTwo = {
    name: 'Alex', 
    email: 'нет почты'
};

let currentFieldPosition = 0;
let currentTurn = 0;


class Observer {

    handleEvent(clickBlock) {

        game.checkCells(clickBlock.target);

        app.onConnectionMovePlayer(socket, currentFieldPosition);

        this.movePlayer(currentFieldPosition, clickBlock.target);
    }

    movePlayer(Position, clickBlock = Position) {
        
        let currentPlayerSymbol = game.getSymbol(currentTurn % 2);

        game.makeMove(Position, currentPlayerSymbol);

        props.highlightTurn(currentTurn % 2);

        game.printSymbol(currentTurn, clickBlock);

        if (game.checkResultGame(currentPlayerSymbol)) {

            props.highlightWinningPlayer(currentTurn % 2);

            props.showResult(currentTurn % 2);
        }

        currentTurn++;
    }
}

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

    constructor(playerOne, playerTwo) {
        this.players.push(playerOne);
        this.players.push(playerTwo);
    }

    getSymbol(idx) {
        return this.symbols[idx];
    }

    getPlayer(idx) {
        return this.players[idx];
    }

    checkCells(cell) {
        for (let idx = 0; idx < this.field.length; idx++) {
            if (cell === cells[idx]){
                currentFieldPosition = idx;
                break
            }
        }
    }

    makeMove(position, symbol) {
        if (!this.isPossibleMove(position)) {
            throw console.log("Клетка уже занята!");
        }
        this.field[position] = symbol;
    }

    isPossibleMove(position){
        for (let idx = 0; idx < this.field.length; idx++) 
        return position < this.field.length && this.field[position] === null;
    }

    printSymbol(idx, clickBlock) {
        if (typeof(clickBlock) === 'number') {
                clickBlock = cells[clickBlock];
        }
        
        (idx % 2) === 0 ? clickBlock.innerHTML = crossTemplate.content.firstChild.outerHTML : clickBlock.innerHTML = circleTemplate.content.firstChild.outerHTML;
    }

    checkResultGame(symbol) {
        let isWin = true;
    
        for (const position of this.winPositions) {
            isWin = true;
    
            for (const cell of position) {
                isWin = isWin && this.field[cell] === symbol;
            }

            if (isWin) {
                props.highlightCells(position);
                return true;
            }
        }
        let draw = true;
        if (game.checkIsDraw(draw)) {
            props.showResult(currentTurn % 2, draw);
        }
    }

    checkIsDraw(draw) {
        for (let idx = 0; idx < this.field.length; idx++) {
            draw = draw && this.field[idx] !== null;
        }
        return draw;
    }
}

class Props {

    highlightCells(position) {
        for (const cell of position) {
            cells[cell].style.backgroundColor = '#FFCC73';
        }
    }
    
    showResult(idx, draw) {
        if (draw) {
            text.innerHTML = 'Ничья!';
            resultWnd.style.display = 'block';
            this.clickOnModalResetBtn();
        } else {
            text.innerHTML = `${game.getPlayer(idx).name}\nпобедил!`;
            resultWnd.style.display = 'block';
            this.clickOnModalResetBtn();
        }

        
    }

    clickOnModalResetBtn() {
        modalResetBtn.onclick = () => {
            this.resetGame();
            resultWnd.style.display = 'none';
        }
    }
    
    resetGame() {
        game = new TicTacToe(playerOne, playerTwo);

        for (const cell of cells) {
            cell.innerHTML = '';
        };
        currentTurn = 0;
        playerOneBorderTurnColor.style.backgroundColor = '#ff0000';
        playerOneBorderTurnColor.style.boxShadow = '0 0 3px 1px #ff0000';
        playerTwoBorderTurnColor.style.backgroundColor = 'white';
        playerTwoBorderTurnColor.style.boxShadow = '0 0 3px 1px white';
        for (const cell of cells) {
            if (cell.style.backgroundColor = '#FFCC73') {
                cell.style.backgroundColor = 'white';
            };
        };
    }

    highlightWinningPlayer(idx) {
        if (idx === 1) {
            playerOneBorderTurnColor.style.backgroundColor = 'white';
            playerOneBorderTurnColor.style.boxShadow = '0 0 3px 1px white';
            playerTwoBorderTurnColor.style.backgroundColor = '#FFCC73';
            playerTwoBorderTurnColor.style.boxShadow = '0 0 3px 1px #FFCC73';
            
        }
        else if (idx === 0) {
            playerOneBorderTurnColor.style.backgroundColor = '#FFCC73';
            playerOneBorderTurnColor.style.boxShadow = '0 0 3px 1px #FFCC73';
            playerTwoBorderTurnColor.style.backgroundColor = 'white';
            playerTwoBorderTurnColor.style.boxShadow = '0 0 3px 1px white';
        }
    }
    
    highlightTurn(idx) {
        if (idx === 1) {
            playerOneBorderTurnColor.style.backgroundColor = '#ff0000';
            playerOneBorderTurnColor.style.boxShadow = '0 0 3px 1px #ff0000';
            playerTwoBorderTurnColor.style.backgroundColor = 'white';
            playerTwoBorderTurnColor.style.boxShadow = '0 0 3px 1px white';
        }
        else if (idx === 0) {
            playerOneBorderTurnColor.style.backgroundColor = 'white';
            playerOneBorderTurnColor.style.boxShadow = '0 0 3px 1px white';
            playerTwoBorderTurnColor.style.backgroundColor = '#ff0000';
            playerTwoBorderTurnColor.style.boxShadow = '0 0 3px 1px #ff0000';
        }
    }
}

class Network {

    onConnectionMovePlayer(socket, currentFieldPosition){
        socket.emit('playerMove', {currentFieldPosition});
    }

    onConnectionChat(socket) {
        socket.on('connect', () => {

            textSocket.innerHTML = "Подключение прошло успешно<br>"
    
        });
        socket.on('hello', data => {
            textSocket.innerHTML += "Сервер: " + data + "<br>"
        });
    }

    
}


let game = new TicTacToe(playerOne, playerTwo);
const app = new Network();
const props = new Props();

app.onConnectionChat(socket);

gameField.addEventListener("mouseup", new Observer());

windowResetBtn.onclick = () => {
    props.resetGame();
}

socket.on('aaa', Position => {

    const logic = new Observer();

    logic.movePlayer(Position.currentFieldPosition, Position.currentFieldPosition);

});


// socket.emit("update item", "1", { name: "updated" }, (response) => {
//     console.log(response.status); // ok
// });

    // socket.on('connect', () => {
    //     textSocket.innerHTML = "Подключение прошло успешно<br>"
    //     socket.on('hello', data => {
    //         console.log(data);
    //         textSocket.innerHTML += "Сервер: " + data + "<br>"
    //     });
    // });

// function socketsTrack(socket, clickBlock) {
    
// }
    



    // socket.on('connect', () => {
    //     textSocket.innerHTML = "Подключение прошло успешно<br>"
    //     socket.on('hello', data => {
    //         textSocket.innerHTML += "Сервер: " + data + "<br>"
    //     });
    // });


    // function aaa(socket, currentFieldPosition){
    //     socket.emit('playerMove', {currentFieldPosition});
    // }