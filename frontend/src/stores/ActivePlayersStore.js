import {action, computed, reaction, makeAutoObservable, observable} from 'mobx';

class ActivePlayersStore {
    activePlayers = [
        {user: 'Сергей', status: true}, 
        {user: 'Алекс', status: true}, 
        {user: 'Павел', status: false}, 
        {user: 'Андрей', status: true},
    ];

    users = [
        {
            id: 1,
            username: 'qwerty',
            status: 'blocked',
            createdAt: '2022-05-19T11:25:23.642Z',
            updatedAt: '2022-07-08T07:48:24.090Z'
        },
        {
            id: 2,
            username: 'qwerty1',
            status: 'active',
            createdAt: '2022-05-19T12:06:09.386Z',
            updatedAt: '2022-05-19T12:06:09.386Z'
        },
        {
            id: 3,
            username: 'qwerty2',
            status: 'active',
            createdAt: '2022-05-19T12:06:29.148Z',
            updatedAt: '2022-05-19T12:06:29.148Z'
        },
        {
            id: 4,
            username: 'qwerty3',
            status: 'active',
            createdAt: '2022-05-19T12:06:46.654Z',
            updatedAt: '2022-05-19T12:06:46.654Z'
        },
        {
            id: 5,
            username: 'qwerty43',
            status: 'active',
            createdAt: '2022-05-19T12:07:03.980Z',
            updatedAt: '2022-05-19T12:07:03.980Z'
        },
    ]

    constructor(server, AuthStore) {
        makeAutoObservable(this) 

        this.AuthStore = AuthStore;
        this.server = server;

        
    }

    getUsers() {
        console.log(this.AuthStore.token);
        this.users = fetch (`${this.server}/api/players`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.AuthStore.token}`,
            }
        });
    }
}   

export default ActivePlayersStore;