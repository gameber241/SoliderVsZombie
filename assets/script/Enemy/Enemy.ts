import { _decorator, Component, Node } from 'cc';
import { Enemy_Ui } from './Enemy.Ui';
import { ESTATEENEMY } from '../Enum/ESTATEENEMY';
import { EENEMY } from '../Enum/EENEMY';
import { PoolManager } from '../Manager/PoolManager';
import { PrefabManager } from '../Manager/PrefabManager';
import { InGameManager } from '../Manager/InGameManager';
import { EnemyMovement } from './EnemyMovement';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy {
    enemyUI: Enemy_Ui = null

    stateCurrent: ESTATEENEMY = ESTATEENEMY.WALK
    enemiId: EENEMY = EENEMY.enemy0
    enemyMovement: EnemyMovement = null

    constructor() {
        this.CreateEnemy()

    }

    GetNode() {
        return this.enemyUI.node
    }

    CreateEnemy() {
        let enemy = PoolManager.getInstance().Spawn(PrefabManager.getInstance().GetRandomEnemyrefab(), InGameManager.getInstance().node)
        if (enemy == null) return
        this.enemyUI = enemy.getComponent(Enemy_Ui)
        let enemyMovement = this.enemyUI.node.addComponent(EnemyMovement)
        this.setState(ESTATEENEMY.WALK)
    }

    attack() {
        this.enemyUI.PlayAnimation(ESTATEENEMY.ATTACK, 0.05, false)

    }


    walk() {
        this.enemyUI.PlayAnimation(ESTATEENEMY.WALK, 0.05, true)
    }


    setState(state: ESTATEENEMY) {
        this.stateCurrent = state
        switch (state) {
            case ESTATEENEMY.ATTACK:
                this.attack()
                break;

            case ESTATEENEMY.WALK:
                this.walk()
                break
        }
    }
}


