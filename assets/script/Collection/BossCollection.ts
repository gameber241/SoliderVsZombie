import { _decorator, Component, Node } from 'cc';
import { Boss } from '../Boss/Boss';
const { ccclass, property } = _decorator;

@ccclass('BossCollection')
export class BossCollection extends Array<Boss> {
    
}


