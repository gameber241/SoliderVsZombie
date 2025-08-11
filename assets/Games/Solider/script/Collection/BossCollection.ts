import { _decorator, Component, Node } from 'cc';
import { Boss } from '../Boss/Boss';

const { ccclass, property } = _decorator;

@ccclass('BossCollection')
export class BossCollection extends Array<Boss> {
    CreateBoss() {
        let boss = new Boss()
        this.push(boss)
        return boss
    }

    Clear() {
        for (let i = 0; i < this.length; i++) {
            this[i].Dispose()
        }
        this.length = 0
    }
}


