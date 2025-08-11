import { _decorator, Component, Node } from 'cc';
import { Boss_Ui } from './Boss.Ui';
import { ESTATEBOSS } from '../Enum/ESTATEBOSS';
import { DataEnemy } from '../Data/DataEnemy';
import { PrefabManager } from '../Manager/PrefabManager';
import { PoolManager } from '../Manager/PoolManager';
import { InGameManager } from '../Manager/InGameManager';
import { SoundManager } from '../Manager/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('Boss')
export class Boss {
    bossUI: Boss_Ui = null

    stateCurrent: ESTATEBOSS = ESTATEBOSS.IDLE
    dataBoss: DataEnemy = null

    constructor() {
        this.CreateUi()


    }


    CreateUi() {
        this.dataBoss = PrefabManager.getInstance().GetBossEnemyrefab()
        if (this.dataBoss == null) return
        let boss = PoolManager.getInstance().Spawn(this.dataBoss.EmenyPrefab, InGameManager.getInstance().node)
        console.log(boss)
        if (boss == null) return
        this.bossUI = boss.getComponent(Boss_Ui)

        this.bossUI.boss = this
        // this.bossUI.node.addComponent(Boss)
        this.setState(ESTATEBOSS.IDLE)
    }

    idle() {
        this.bossUI.PlayAnimation(ESTATEBOSS.IDLE, 0.05, true)
    }


    attack() {
        this.bossUI.PlayAnimation(ESTATEBOSS.ATTACK, 0.02, false)

    }


    dead() {
        this.bossUI.PlayAnimation(ESTATEBOSS.DEAD, 0.05, false)

    }

    walk() {
        this.bossUI.PlayAnimation(ESTATEBOSS.WALK, 0.05, true)
    }


    setState(state: ESTATEBOSS) {
        this.stateCurrent = state
        switch (state) {
            case ESTATEBOSS.IDLE:
                this.idle()
                break;
            case ESTATEBOSS.ATTACK:
                this.attack()
                break;
            case ESTATEBOSS.DEAD:
                this.dead()
                break;
            case ESTATEBOSS.WALK:
                this.walk()
                break
        }
    }


    GetNode() {
        return this.bossUI.node
    }

    Dispose() {
        SoundManager.getInstance().playEnemyDie()
        PoolManager.getInstance().Despawn(this.dataBoss.EmenyPrefab, this.bossUI.node)
    }
}


