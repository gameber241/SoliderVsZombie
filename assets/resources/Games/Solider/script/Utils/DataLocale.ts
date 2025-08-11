import { _decorator, Component, Node } from 'cc';
import { BaseSingleton } from '../Base/BaseSingleton';
const { ccclass, property } = _decorator;

@ccclass('DataLocale')
export class DataLocale extends BaseSingleton<DataLocale> {
    GetDataLocale(key) {
        return JSON.parse(localStorage.getItem(key))
    }


    SaveDataLocale(key, value) {
        return localStorage.setItem(key, JSON.stringify(value))
    }
}


