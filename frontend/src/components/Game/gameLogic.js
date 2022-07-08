import { makeAutoObservable } from 'mobx'
// import Cross from '../../assets/svg/cross'
// import Circle from '../../assets/svg/circle'



class TicTacToe {
    field = Array(9).fill(null);
    currentFieldPosition = null;
    currentTurn = 0;
    currentPlayerSymbol = '';
    nextSymbol = true;
    players = ['Sergei', 'Alex'];
    draw = true;
    cells = [
        {id: 0}, 
        {id: 1}, 
        {id: 2}, 
        {id: 3}, 
        {id: 4}, 
        {id: 5}, 
        {id: 6}, 
        {id: 7}, 
        {id: 8} 
    ]
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

    constructor() {
        makeAutoObservable(this);
    }

    checkCells = (cell, cells) => {
        for (let idx = 0; idx < cells.length; idx++) {
            if (cell === cells[idx]){
                this.currentFieldPosition = idx;
                break;
            }
        }
    }

    printSymbol = () => {
        this.currentPlayerSymbol = this.currentTurn % 2 ? 'O' : 'X';
    }

    isPossibleMove(position) {
        return position >= 0 && position < this.field.length && this.field[position] === null;
    }

    makeMove = () => {
        if (!this.isPossibleMove(this.currentFieldPosition)) {
            throw console.log("Клетка уже занята!");
        }
        this.field[this.currentFieldPosition] = this.currentPlayerSymbol;
    }

    checkResultGame(symbol) {
        let isWin = true;
    
        for (const position of this.winPositions) {
            isWin = true;
    
            for (const cell of position) {
                isWin = isWin && this.field[cell] === symbol;
            }

            if (isWin) {
                // props.highlightCells(position);
                return true;
            }
        }
        let draw = true;
        if (this.checkIsDraw(draw)) {
            // props.showResult(currentTurn % 2, draw);
            return console.log('ничья')
        }
    }

    checkIsDraw(draw) {
        for (let idx = 0; idx < this.field.length; idx++) {
            draw = draw && this.field[idx] !== null;
        }
        return draw;
    }

    getPlayer(idx) {
        return this.players[idx];
    }
}




export default new TicTacToe();

// const socket = io('http://localhost:8000');


// class Network {

//     onConnectionMovePlayer(socket, currentFieldPosition){
//         socket.emit('playerMove', {currentFieldPosition});
//     }
// }

// const app = new Network();

// app.onConnectionChat(socket);