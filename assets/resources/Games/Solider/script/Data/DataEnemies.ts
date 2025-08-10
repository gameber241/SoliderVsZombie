import { _decorator, Component, Node, Prefab } from 'cc';
import { DataEnemy } from './DataEnemy';
const { ccclass, property } = _decorator;

@ccclass('DataEnemies')
export class DataEnemies extends Component {
    @property([DataEnemy])
    EnemiesPrefab: DataEnemy[] = [];
}


