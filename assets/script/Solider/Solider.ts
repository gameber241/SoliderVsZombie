import { _decorator, Component, Node } from 'cc';
import { Solider_UI } from './Solider.UI';
import { PoolManager } from '../Manager/PoolManager';
import { ESOLIDER } from '../Enum/ESOLIDER';
import { PrefabManager } from '../Manager/PrefabManager';
import { InGameManager } from '../Manager/InGameManager';
const { ccclass, property } = _decorator;

@ccclass('Solider')
export class Solider {
    soliderUI: Solider_UI = null


    constructor(id: ESOLIDER) {
        let ui = PoolManager.getInstance().Spawn(PrefabManager.getInstance().GetSoliderPrefabById(id), InGameManager.getInstance().node)
        if (ui == null) return;
        this.soliderUI = ui.getComponent(Solider_UI)
        this.soliderUI.PlayAnimation()
    }

    GetNode() {
        return this.soliderUI.node
    }
}


