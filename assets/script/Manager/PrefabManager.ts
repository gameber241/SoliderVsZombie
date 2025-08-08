import { _decorator, Component, Node, Prefab } from 'cc';
import { BaseSingleton } from '../Base/BaseSingleton';
import { ESOLIDER } from '../Enum/ESOLIDER';
import { DataEnemy } from '../Data/DataEnemy';
import { DataEnemies } from '../Data/DataEnemies';
const { ccclass, property } = _decorator;

@ccclass('PrefabManager')
export class PrefabManager extends BaseSingleton<PrefabManager> {

    //#region DATA
    @property({ type: Prefab, group: { name: "Data" } })
    dataBoss: Prefab = null;


    @property({ type: Prefab, group: { name: "Data" } })
    dataSoliders: Prefab = null;

    @property({ type: Prefab, group: { name: "Data" } })
    dataEnemies: Prefab = null;


    GetSoliderPrefabById(id: ESOLIDER) {
        let list: DataEnemy[] = []
        list = this.dataSoliders.data.getComponent(DataEnemies).EnemiesPrefab
        for (let i = 0; i < list.length; i++) {
            if (list[i].type == id) return list[i].EmenyPrefab
        }

        return null
    }

    //#endregion

}


