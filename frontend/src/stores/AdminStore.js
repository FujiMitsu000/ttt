import {action, computed, reaction, makeAutoObservable, observable} from 'mobx';

class AdminStore {
    text = '';

    constructor(server, AuthStore) {
        makeAutoObservable(this) 

        this.server = server;
        this.AuthStore = AuthStore;
    }

    setText(text) {
        this.text = text;

    }

    blockUser() {
        console.log(this.AuthStore.token);
        const user = fetch (`${this.server}/api/players/delete`, {
            method: 'DELETE',
            body: JSON.stringify(
                {
                    username: this.text,
                }
            ),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.AuthStore.token}`,
            }
        })
    }
}   

export default AdminStore;