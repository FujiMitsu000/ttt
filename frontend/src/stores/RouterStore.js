import {action, computed, flow, makeAutoObservable, observable, runInAction } from 'mobx';

export default class RouterStore {
    location = null;

    constructor() {
        makeAutoObservable(this);
    }

    
}