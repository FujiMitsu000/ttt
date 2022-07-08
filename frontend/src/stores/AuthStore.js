import {action, computed, reaction, makeAutoObservable, observable} from 'mobx';

class AuthStore {
    thisUser = {userId: '', username: '', password: ''};
    token = null;
    warningsMessage = '';
    displayWarningMsg = false;
    colorWarningMsg = false;
    Authorized = false;

    constructor(server) {
        makeAutoObservable(this, {
            Authorized: observable,
            token: observable,
        });

        this.server = server;

        reaction(
            () => this.token,
            (token) => {
                if (token) {
                    console.log('токен в локалке');
                    localStorage.setItem('token', token);
                    this.getUser();
                } else {
                    localStorage.removeItem('token');
                }
            }
        );
        reaction(
            () => [this.thisUser.userId, this.thisUser.username],
            (thisUser) => {
                if (thisUser[0]) {
                    console.log('id в локалке');
                    localStorage.setItem('userId', thisUser[0]);
                } else {
                    localStorage.removeItem('userId');
                }
                if (thisUser[1]) {
                    console.log('имя в локалке');
                    localStorage.setItem('username', thisUser[1]);
                } else {
                    localStorage.removeItem('username');
                }
            }
        );
    }

    setLogin(text) {
        this.thisUser.username = text;
    }

    setPassword(text) {
        this.thisUser.password = text;
    }

    clearInput() {
        this.thisUser.password = '';
    }

    getToken() {
        const login = fetch (`${this.server}/login`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    username: this.thisUser.username,
                    password: this.thisUser.password
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((user) => {
            if (user) {
                this.token = user.token;
            }
        });
        this.clearInput();
    }

    registration() {
        const registration = fetch (`${this.server}/registration`, {
            method: 'POST',
            body: JSON.stringify(
                {
                username: this.thisUser.username,
                password: this.thisUser.password
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((warning) => {
            if(warning[0]?.msg) {
                return (
                    console.log(warning),
                    this.displayWarningMsg = true,
                    this.colorWarningMsg = true,
                    this.warningsMessage = warning
                )
            } else {
                this.displayWarningMsg = true;
                this.colorWarningMsg = false;
                this.warningsMessage = warning.registrationErrors.errors;
            }   
        })
    }

    getUser() {
        console.log(this.token);
        if (!this.token) {
            return this.Authorized = false;
        }

        const [, payload,] = this.token.split('.');

        if (!payload) {
            return this.Authorized = false;
        }

        try {
            const tokenUser = JSON.parse(window.atob(payload)).sub;
            console.log(tokenUser);
            this.thisUser.userId = tokenUser.id;
            this.thisUser.username = tokenUser.username;
            return this.Authorized = true;
        } catch (error) {
            return this.Authorized = false
        }
    }

    isAuthorized() {
        this.Authorized = Boolean(this.getUser);
    }

    logout() {
        this.token = null;
    }
}

export default AuthStore;