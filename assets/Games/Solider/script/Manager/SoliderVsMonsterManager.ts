import { _decorator, Component, director, Node } from 'cc';

import { BaseSingleton } from '../Base/BaseSingleton';
import { SoliderCollection } from '../Collection/SoliderCollection';
import { BossCollection } from '../Collection/BossCollection';
import { EnemiesCollection } from '../Collection/EnemiesCollection';
const { ccclass, property } = _decorator;

@ccclass('SoliderVsMonsterManager')
export class SoliderVsMonsterManager extends BaseSingleton<SoliderVsMonsterManager> {
    public bossCollection: BossCollection = null
    public soliderCollection: SoliderCollection = null;
    public enemiesCollection: EnemiesCollection = null;
    protected start(): void {
        this.Init()
    }


    Init() {
        this.bossCollection = new BossCollection();
        this.soliderCollection = new SoliderCollection();
        this.enemiesCollection = new EnemiesCollection();
    }

    ClearGame() {
        this.bossCollection.Clear();
        this.soliderCollection.Clear();
        this.enemiesCollection.Clear();
        director.emit("DISPOSE_BULLET")
    }
}