import { _decorator, Button, Component, Node, tween, UIOpacity, v3 } from 'cc';
import { BaseSingleton } from '../Base/BaseSingleton';
import { InGameManager } from './InGameManager';
import { ESOLIDER } from '../Enum/ESOLIDER';
const { ccclass, property } = _decorator;

@ccclass('LobbyManager')
export class LobbyManager extends BaseSingleton<InGameManager> {
    @property(Node)
    solider_0: Node = null

    @property(Node)
    solider_1: Node = null

    soliderCurrent: Node = null

    protected start(): void {
        this.soliderCurrent = this.solider_0
    }

    isChangeSolider = false
    OnClickBtnLeft() {
        if (this.isChangeSolider == true) return
        this.isChangeSolider = true
        let solider = this.soliderCurrent == this.solider_0 ? this.solider_1 : this.solider_0
        solider.setPosition(500, 0, 0)
        tween(solider).to(0.5, { position: v3(0, 0, 0) })
            .call(() => {
                this.soliderCurrent = solider
                this.isChangeSolider = false
            })
            .start()
        tween(this.soliderCurrent).to(0.5, { position: v3(-500, 0, 0) })
            .start()
    }

    OnClickBtnRight() {
        if (this.isChangeSolider == true) return
        this.isChangeSolider = true
        let solider = this.soliderCurrent == this.solider_0 ? this.solider_1 : this.solider_0
        solider.setPosition(-500, 0, 0)
        tween(solider).to(0.5, { position: v3(0, 0, 0) })
            .call(() => {
                this.soliderCurrent = solider
                this.isChangeSolider = false
            })
            .start()
        tween(this.soliderCurrent).to(0.5, { position: v3(500, 0, 0) })
            .start()
    }


    BtnPlay() {
        InGameManager.getInstance().SetIdSolider(this.soliderCurrent == this.solider_0 ? ESOLIDER.SOLIDER_0 : ESOLIDER.SOLIDER_1)
        this.node.setScale(1, 1, 0)
        tween(this.node.getComponent(UIOpacity)).to(0.5, { opacity: 0 })
            .call(() => {
                this.node.active = false
                this.node.setScale(1, 1, 1)
            })
            .start()
        InGameManager.getInstance().Show()
    }
}


