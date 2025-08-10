import { _decorator, Component, Node, Prefab, randomRangeInt } from 'cc';
import { BaseSingleton } from '../Base/BaseSingleton';
import { ESOLIDER } from '../Enum/ESOLIDER';
import { DataEnemy } from '../Data/DataEnemy';
import { DataEnemies } from '../Data/DataEnemies';
import { BULEET_ID, DataBullet } from '../Bullet/DataBullet';
import { DataBullets } from '../Bullet/DataBullets';
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


    @property({ type: Prefab, group: { name: "Data" } })
    dataBullet: Prefab = null;


    GetSoliderPrefabById(id: ESOLIDER) {
        let list: DataEnemy[] = []
        list = this.dataSoliders.data.getComponent(DataEnemies).EnemiesPrefab
        for (let i = 0; i < list.length; i++) {
            if (list[i].type == id) return list[i].EmenyPrefab
        }

        return null
    }

    GetBulletPrefabById(id: BULEET_ID) {
        let list: DataBullet[] = []
        list = this.dataBullet.data.getComponent(DataBullets).databullets
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) return list[i].prefabBullet
        }

        return null
    }

    GetRandomEnemyrefab() {
        let list: DataEnemy[] = []
        list = this.dataEnemies.data.getComponent(DataEnemies).EnemiesPrefab
        let random = randomRangeInt(0, list.length)
        return list[random].EmenyPrefab
    }

    GetBossEnemyrefab() {
        let list: DataEnemy[] = []
        list = this.dataEnemies.data.getComponent(DataEnemies).EnemiesPrefab
        let random = randomRangeInt(0, list.length)
        return list[random].EmenyPrefab
    }



    //#endregion

}


