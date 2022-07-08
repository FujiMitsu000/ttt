import { makeAutoObservable, action, computed, flow, observable } from 'mobx';
import React, { useState } from 'react';
import { io } from "socket.io-client";
import GameStore from './GameStore';


export default class SocketStore {



    socket = io("ws://localhost:8000");

    constructor(GameStore, ChatStore) {
        makeAutoObservable(this, {
            
            

        });

        this.ChatStore = ChatStore;
        this.GameStore = GameStore;

        
        
    }

    

    


}



// const [users, setUsers] = useState([])
// const [messages, setMessages] = useState([])

// // send a message to the server
// socket.emit("hello", 5, "6", { 7: Uint8Array.from([8]) });

// // receive a message from the server
// socket.on("hello from server", (...args) => {
//   // ...
// });

// socket.on('users', (users) => {
//     // обновляем массив пользователей
    

//     setUsers(users)
// })

// class Network {
//     messages = []
//     message = ''
//     visibleMessage = false


//     constructor() {
//         makeAutoObservable(this);
//     }

//     onConnectionMovePlayer(socket, currentFieldPosition){
//         socket.emit('playerMove', {currentFieldPosition});
//     }

//     onConnectionChat(socket) {
//         socket.on('connect', () => {

//             textSocket.innerHTML = "Подключение прошло успешно<br>"
    
//         });
//         socket.on('hello', data => {
//             textSocket.innerHTML += "Сервер: " + data + "<br>"
//         });
//     }
// }

// const app = new Network();

// app.onConnectionChat(socket);