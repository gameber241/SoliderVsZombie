import { _decorator, CCInteger, Component, Enum, Node, Prefab } from 'cc';
import { EBOSS } from '../Enum/EBOSS';
const { ccclass, property } = _decorator;


@ccclass('DataEnemy')
export class DataEnemy {
    @property({ type: CCInteger })
    type: number = 0

    @property(Prefab)
    EmenyPrefab: Prefab = null;


}


