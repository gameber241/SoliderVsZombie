import { _decorator, Component, Node } from 'cc';
import { Enemy } from '../Enemy/Enemy';
const { ccclass, property } = _decorator;

@ccclass('EnemiesCollection')
export class EnemiesCollection extends Array<Enemy> {
    CreateEnemy(enemiesData) {
        let enemy = new Enemy(enemiesData)
        this.push(enemy)
        return enemy
    }
}


