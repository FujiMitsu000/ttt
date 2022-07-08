import { createContext } from "react";
import { io } from "socket.io-client";
import ActivePlayersStore from "./ActivePlayersStore";
import AdminStore from "./AdminStore";
import AuthStore from "./AuthStore";
import ChatStore from "./ChatStore";
import GameStore from "./GameStore";
import NavbarStore from "./NavbarStore";
import RouterStore from "./RouterStore";


export const StoreContext = createContext(null);
export class Store {
    socket;
    server;
    AuthStore;
    RatingStore;
    UsersStore;
    GameStore;
    AdminStore;
    ActivePlayersStore;

    constructor() {
        this.server = 'http://localhost:8000';
        this.AuthStore = new AuthStore(this.server);
        this.ActivePlayersStore = new ActivePlayersStore(this.server, this.AuthStore);
        this.NavbarStore = new NavbarStore();
        this.RouterStore = new RouterStore();
        this.AdminStore = new AdminStore(this.server, this.AuthStore);
        
        this.socket = io("ws://localhost:8000", 
            {
                query: {
                    token: this.AuthStore.token
                }
            }
        );



        const user = {
            username: localStorage.getItem('username'),
            userid: localStorage.getItem('userId')
        }

        this.socket.emit("user:get", user);

        
        this.ChatStore = new ChatStore(this.socket, this.AuthStore);
        this.GameStore = new GameStore(this.socket, this.AuthStore);
    }
}