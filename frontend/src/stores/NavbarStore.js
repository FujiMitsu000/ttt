import {action, computed, flow, makeAutoObservable, observable, runInAction } from 'mobx';

export default class NavbarStore {
    menuActive = false;

    constructor() {
        makeAutoObservable(this);
    }

    changeActive() {
        this.menuActive = !this.menuActive;
    }
}