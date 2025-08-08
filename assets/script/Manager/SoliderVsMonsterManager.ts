import { _decorator, Component, Node } from 'cc';
import { BossCollection } from '../Collection/BossCollection';
import { SoliderCollection } from '../Collection/SoliderCollection';
import { EnemiesCollection } from '../Collection/EnemiesCollection';
import { BaseSingleton } from '../Base/BaseSingleton';
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
}