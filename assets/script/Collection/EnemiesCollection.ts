import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemiesCollection')
export class EnemiesCollection extends Array<EnemiesCollection> {

}


