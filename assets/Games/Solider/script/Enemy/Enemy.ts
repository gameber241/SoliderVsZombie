import { _decorator, Component, Node } from 'cc';
import { Enemy_Ui } from './Enemy.Ui';
import { ESTATEENEMY } from '../Enum/ESTATEENEMY';
import { EENEMY } from '../Enum/EENEMY';
import { PoolManager } from '../Manager/PoolManager';
import { PrefabManager } from '../Manager/PrefabManager';
import { InGameManager } from '../Manager/InGameManager';
import { EnemyMovement } from './EnemyMovement';
import { DataEnemy } from '../Data/DataEnemy';
import { BULEET_ID } from '../Bullet/DataBullet';
import { SoundManager } from '../Manager/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy {
    enemyUI: Enemy_Ui = null

    stateCurrent: ESTATEENEMY = ESTATEENEMY.WALK
    dataEnemy: DataEnemy
    enemyMovement: EnemyMovement = null

    constructor(enemiesData) {
        this.CreateEnemy(enemiesData)
        this.Shot()

    }

    GetNode() {
        return this.enemyUI.node
    }

    CreateEnemy(enemiesData) {
        this.dataEnemy = enemiesData
        if (this.dataEnemy == null) return
        let enemy = PoolManager.getInstance().Spawn(this.dataEnemy.EmenyPrefab, InGameManager.getInstance().node)
        if (enemy == null) return
        this.enemyUI = enemy.getComponent(Enemy_Ui)
        this.enemyUI.enemy = this
        if (this.enemyUI.node.getComponent(EnemyMovement) == null)
            this.enemyUI.node.addComponent(EnemyMovement)
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


    Shot() {
        switch (this.dataEnemy.type) {
            case EENEMY.enemy3:
            case EENEMY.enemy4:
            case EENEMY.enemy5:
            case EENEMY.enemy9:
            case EENEMY.enemy10:
            case EENEMY.enemy11:
                this.startShooting()
                break
        }
    }
    private _intervalId: any = null;

    startShooting() {
        if (this._intervalId) return; // tránh tạo trùng interval

        this._intervalId = setInterval(() => {
            this.attack()

            setTimeout(() => {
                if (this.enemyUI.node.active == true) {
                    this.spawnBullet();
                    this.walk()
                }

            }, this.enemyUI.animationBoss.GetDuration() * 1000 / 2)
        }, 2000); // 2000 ms = 2s
    }

    stopShooting() {
        if (this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = null;
        }
    }

    spawnBullet() {
        SoundManager.getInstance().playShot()
        const bullet = PoolManager.getInstance().Spawn(PrefabManager.getInstance().GetBulletPrefabById(BULEET_ID.Bullet_Enemy), InGameManager.getInstance().node)
        bullet.setWorldPosition(this.enemyUI.Fire.worldPosition.clone());
    }
    Dispose() {
        SoundManager.getInstance().playEnemyDie()
        this.stopShooting()
        PoolManager.getInstance().Despawn(this.dataEnemy.EmenyPrefab, this.enemyUI.node)
    }
}


