import { _decorator, Component, Node } from 'cc';
import { Solider_UI } from './Solider.UI';
import { PoolManager } from '../Manager/PoolManager';
import { ESOLIDER } from '../Enum/ESOLIDER';
import { PrefabManager } from '../Manager/PrefabManager';
import { InGameManager } from '../Manager/InGameManager';
import { BULEET_ID } from '../Bullet/DataBullet';
const { ccclass, property } = _decorator;

@ccclass('Solider')
export class Solider {
    soliderUI: Solider_UI = null


    constructor(id: ESOLIDER) {
        let ui = PoolManager.getInstance().Spawn(PrefabManager.getInstance().GetSoliderPrefabById(id), InGameManager.getInstance().node)
        if (ui == null) return;
        this.soliderUI = ui.getComponent(Solider_UI)
        this.soliderUI.PlayAnimation()
        this.startAutoFire()
    }

    GetNode() {
        return this.soliderUI.node
    }


    public Shoot() {
        let bullet = PoolManager.getInstance().Spawn(PrefabManager.getInstance().GetBulletPrefabById(BULEET_ID.Bullet_Solider), InGameManager.getInstance().node)
        if (bullet == null) return
        bullet.setWorldPosition(this.soliderUI.fire.worldPosition.clone())
    }

    fireDelay: number = 0.1; // Thời gian giữa 2 viên (giây)
    private fireIntervalId: any = null;
    startAutoFire() {
        if (this.fireIntervalId) return; // tránh gọi trùng
        this.fireIntervalId = setInterval(() => {
            this.Shoot();
        }, this.fireDelay * 1000);
    }

    stopAutoFire() {
        if (this.fireIntervalId) {
            clearInterval(this.fireIntervalId);
            this.fireIntervalId = null;
        }
    }



}


