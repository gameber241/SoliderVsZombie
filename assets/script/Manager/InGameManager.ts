import { _decorator, Component, EventTouch, Node, tween, UIOpacity, UITransform, Vec3 } from 'cc';
import { BaseSingleton } from '../Base/BaseSingleton';
import { ESOLIDER } from '../Enum/ESOLIDER';
import { SoliderVsMonsterManager } from './SoliderVsMonsterManager';
import { Solider } from '../Solider/Solider';
const { ccclass, property } = _decorator;

@ccclass('InGameManager')
export class InGameManager extends BaseSingleton<InGameManager> {
    @property(Node)
    posSolider: Node = null


    idSolider: ESOLIDER = ESOLIDER.SOLIDER_0
    solider: Solider = null

    protected onEnable(): void {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        console.log("12313123123")
    }
    protected onDisable(): void {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    maxY = 250
    minY = -250
    private _startTouchY: number = 0;
    private _startPosY: number = 0;

    Show() {
        let opacity = this.node.getComponent(UIOpacity)
        opacity.opacity = 0
        this.node.active = true

        tween(opacity).to(1, { opacity: 255 }).start()
    }


    SetIdSolider(id: ESOLIDER) {
        this.idSolider = id
        this.solider = SoliderVsMonsterManager.getInstance().soliderCollection.createSolider(id)
        this.solider.GetNode().setWorldPosition(this.posSolider.getWorldPosition().clone())

    }

    // onTouchStart(event: EventTouch) {
    //     const worldPos = event.getLocation();
    //     const localPos = this.node.parent!.getComponent(UITransform)!.convertToNodeSpaceAR(new Vec3(worldPos.x, worldPos.y, 0));

    //     this._startTouchY = localPos.y;
    //     this._startPosY = this.solider.GetNode().position.y;
    // }

    // onTouchMove(event: EventTouch) {
    //     const worldPos = event.getLocation();
    //     const localPos = this.node.parent!.getComponent(UITransform)!.convertToNodeSpaceAR(new Vec3(worldPos.x, worldPos.y, 0));
    //     const deltaY = localPos.y - this._startTouchY;
    //     let newY = this._startPosY + deltaY;
    //     if (newY > this.minY && newY < this.maxY) {
    //         this.solider.GetNode().setPosition(this.solider.GetNode().position.x, newY);
    //         // this._startPosY = newY
    //     }

    // }

    onTouchStart(event: EventTouch) {
        // Không cần chuyển tọa độ nữa nếu dùng getDelta()
    }

    onTouchMove(event: EventTouch) {
        const delta = event.getDelta(); // delta theo world, nhưng chính xác với chuyển động tay

        // Lấy node nhân vật
        const soldierNode = this.solider.GetNode();

        // Tính vị trí mới theo trục Y
        let newY = soldierNode.position.y + delta.y * 2;

        // Giới hạn vị trí trong khoảng cho phép
        if (newY > this.minY && newY < this.maxY) {
            soldierNode.setPosition(soldierNode.position.x, newY);
        }
    }

}


