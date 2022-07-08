import {action, computed, flow, makeAutoObservable, observable, runInAction } from 'mobx';


export default class GameStore {
    currentFieldPosition = '';
    field = Array(9).fill(null);
    colorPlayerOne = '';
    colorPlayerTwo = '';
    currentPlayerId = '';
    secondPlayer = '';
    modalWindow = '';
    gameResult = '';
    modalActive = false;
    game = {rival: '', result: '', props: {}}
    error = '';

    constructor(socket, AuthStore) {
        makeAutoObservable(this, {
            // gameResult: observable,
            // gameProps: observable,
            // currentFieldPosition: observable,
            // field: observable,
            // currentPlayerId: observable,
            // gameColor: observable,
            // gameRival: observable,
            // checkCells: action,
            // setSymbol: action,
            // changeColorTurn: action,
            // setPlayerId: action,
            // playerMove: action,
        });

        
        this.socket = socket;
        this.AuthStore = AuthStore;

        this.currentPlayerId = this.AuthStore.thisUser.userId;

        this.game.props = this.socket.on('game:move-made', gameProps => {
            this.setSymbol(gameProps.position, gameProps.symbol);
            this.setPlayerId(gameProps.userId);
            this.changeColorTurnNew()

        });
        this.error = this.socket.on('game:error', gameError => {
            console.log(gameError);
        });
        this.game.result = this.socket.on('game:result', result => {
            this.winner = result.winner;
            this.changeColorTurnNew(result.result);
            this.showGameResult(result.result);
        });
        this.game.rival = this.socket.on('second-player', rival => {
            this.setSecondPlayer(rival);
        });
    }

    connection() {

    }

    playerMove(currentFieldPosition){
        this.socket.emit("game:player-move", {currentFieldPosition});
        this.connection();
        // this.socket.id = this.AuthStore.thisUser.username;
        console.log(this.socket);
    }

    checkCells = (cell, cells) => {
        for (let idx = 0; idx < cells.length; idx++) {
            if (cell === cells[idx]){
                this.currentFieldPosition = idx;
                break;
            }
        }
    }

    setSymbol(position, symbol) {
        this.field[position] = symbol;
    }

    showGameResult(result) {
        if(result === 'win') {
            this.gameResult = 
                this.currentPlayerId === this.AuthStore.thisUser.userId
                ?
                this.AuthStore.thisUser.username
                :
                this.secondPlayer.name;
            this.modalActive = !this.modalActive;
            // this.modalWindow = 'display_resultWindow';
        } else if (result === 'draw') {
            this.gameResult = 'Ничья!';
            this.modalActive = !this.modalActive;
            // this.modalWindow = 'display_resultWindow';
        }
        console.log(this.gameResult, this.modalWindow);
    }

    // перенести на бэк
    changeColorTurnNew(result) {
        if(result === 'win') {
            this.colorPlayerOne = this.AuthStore.thisUser.userId === this.currentPlayerId ? 
                `background_winner` : '';
            this.colorPlayerTwo = this.AuthStore.thisUser.userId === this.currentPlayerId ? 
                `` : 'background_winner';
        } else if (result === 'draw') {
            this.colorPlayerOne = 'background_draw';
            this.colorPlayerTwo = 'background_draw';
        } else {
            this.colorPlayerOne = this.AuthStore.thisUser.userId === this.currentPlayerId ? 
                `` : 'background_current_move';
            this.colorPlayerTwo = this.AuthStore.thisUser.userId === this.currentPlayerId ? 
                `background_current_move` : '';
        }
    }

    setPlayerId(id) {
        this.currentPlayerId = id;
    }

    setSecondPlayer(rival) {
        this.secondPlayer = rival;
    }

    closeModalWindow() {
        this.modalWindow = '';
    }
}