import { _decorator, Component, Enum, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;
export enum BULEET_ID {
    Bullet_Solider = 0,
    Bullet_Enemy = 1
}

Enum(BULEET_ID)

@ccclass('DataBullet')
export class DataBullet {
    @property({ type: BULEET_ID })
    id: BULEET_ID = BULEET_ID.Bullet_Solider

    @property(Prefab)
    prefabBullet: Prefab = null
}


