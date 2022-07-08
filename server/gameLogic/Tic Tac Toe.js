class TicTacToe {
    currentTurn = 0;
    currentPlayerSymbol = '';
    sizeField = 9;
    field = Array(this.sizeField).fill(null);
    symbol = '';
    players = [
        {name: 'Sergei', userId: 1}, // игрок 1
        {name: 'Alex', userId: 2} // игрок 2
    ];
    winPositions = [
        [0, 1, 2], 
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    turnColor = true;
    isDraw = false;
    isWin = false;

    onConnection(socket) {

        socket.on("game:player-move", position => {
            const currentPosition = position.currentFieldPosition

            if (!this.isPossibleMove(currentPosition)){
                socket.emit('game:error', 'Клетка уже занята');
            } else {
                try {
                    this.getSymbol(this.currentTurn);

                    this.makeMove(currentPosition, this.symbol);
    
                    this.highlightTurn(this.turn);

                    socket.emit(
                        'game:move-made', 
                        {
                            symbol: this.symbol, 
                            position: currentPosition, 
                            userId: this.getPlayer(this.currentTurn % 2).userId,
                        }
                    );

                    this.currentTurn++;

                    if(this.checkResult(this.symbol)) {
                        if (this.isWin) {
                            socket.emit(
                                'game:result', 
                                {
                                    result: `win`,
                                    winner: this.getPlayer(this.currentTurn % 2).name,
                                }
                            );
                            
                        } else if (this.isDraw) {
                            socket.emit(
                                'game:result', 
                                {
                                    result: 'draw',
                                }
                            )
                        }
                    }
                } catch(e) {
                    return socket.emit('game:error', 'Что-то пошло не так');
                }
            }
        });

        socket.emit('game-chat:connection', {userId: 'server', text: 'Чат активен'});

        socket.on("game-chat:send-message", (message) => {

            if (message.userId && message.text) {
                console.log(message);
                socket.emit('game-chat:response-message', message);
            }
        });
    }


    checkResult(symbol) {
        let isWin = true;
        if (this.checkIsWin(symbol, isWin)) {
            return this.isWin;
        }
        
        let isDraw = true
        if (this.checkIsDraw(isDraw)) {
            return this.isDraw;
        }
    }

    checkIsWin(symbol, win) {
        for (const position of this.winPositions) {
            win = true;
    
            for (const cell of position) {
                win = win && this.field[cell] === symbol;
            }

            if (win) {
                this.isWin = win;
                return win;
            }
        }
    }

    checkIsDraw(draw) {
        for (let idx = 0; idx < this.field.length; idx++) {
            draw = draw && this.field[idx] !== null;
        }
        this.isDraw = draw
        return draw;
    }

    highlightTurn(turn) {
        this.turn = !turn;
    }

    getSymbol(currentTurn) {
        this.symbol = currentTurn % 2 ? 'O' : 'X';
    }

    getPlayer(idx) {
        return this.players[idx];
    }

    makeMove(position, symbol) {
        this.field[position] = symbol;
    }

    isPossibleMove(position) {
        return position >= 0 && position < this.field.length && this.field[position] === null;
    }

    calculateVertAndHorizPositions(number) {
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
                this.winPositions[num] = [];
                this.winPositions[num+number] = [];
                for(let j=0; j < number; j++) {
                    this.winPositions[num][j] = allWinHorizontalPosition[j];
                    this.winPositions[num+number][j] = allWinVerticalPosition[j];
                }
                num++;
            }
        }
    }
    
    calculateLeftDiagonalWinPosition(number) { // вычисляет левую диагональ
        let allWinLeftDiagonalPosition = [0];
        let leftDiagonalPosition = 0;
    
        for (let idx = 0; idx < number-1; idx++) { 
            leftDiagonalPosition += number + 1;
            allWinLeftDiagonalPosition.push(leftDiagonalPosition);
        }
        this.winPositions.splice(0, 0, allWinLeftDiagonalPosition);
    }
    
    calculateRightDiagonalWinPosition(number) { // вычисляет правую диагональ
        let allWinRightDiagonalPosition = [];
        let rightDiagonalPosition = 0;
    
        for (let idx = 0; idx < number; idx++) { 
            rightDiagonalPosition += number - 1;
            allWinRightDiagonalPosition.push(rightDiagonalPosition);
        }
        this.winPositions.splice(0, 0, allWinRightDiagonalPosition);
    }
}


module.exports.TicTacToe = TicTacToe;