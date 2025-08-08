import { _decorator, Component, Node, Prefab } from 'cc';
import { BaseSingleton } from '../Base/BaseSingleton';
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

    //#endregion

}


