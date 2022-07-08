import {action, computed, flow, makeAutoObservable, observable, runInAction } from 'mobx';

export default class ChatStore {
    messageText = '';
    messages = [];
    chatMessage = '';

    
    constructor(socket, AuthStore) {
        makeAutoObservable(this, {
            // messages: observable,
            // chatMessage: observable,
            // messageText: observable,
            // setMessage: action,
            // handleChangeText: action,
            // clearInput: action,
            // handleSendMessage: action,
            // sendMessage: action,
            // onConnectionChat: action,
        });
        

        this.socket = socket;
        this.AuthStore = AuthStore;

        this.chatMessage = this.socket.on('game-chat:response-message', responseMsg => {
            this.setMessage(responseMsg);
        });
    }

    // @action setThisUserId() {
    //     this.thisUserId = 
    // }

    onConnectionChat() {
        this.socket.on('game-chat:connection', data => {
            runInAction(() => this.messages.push({id: Date.now(), userId: data.userId, text: data.text}))
        });
    }

    sendMessage({ userId, text }) {
        if (userId && text) {
            this.socket.emit("game-chat:send-message", { userId, text });
        }
    }

    setMessage(responseMsg) {
        this.messages.push({id: Date.now(), userId: responseMsg.userId, text: responseMsg.text})
    }

    handleChangeText = (text) => {
        this.messageText = text;
    }

    handleSendMessage = () => {
        this.sendMessage({ userId: this.AuthStore.thisUser.userId, text: this.messageText})
        
        this.clearInput();
        // console.log(text);
    }

    clearInput = () => {
        this.messageText = '';
    }
}
