import { _decorator, Component, EventTouch, Node, tween, UIOpacity, UITransform, Vec3, Prefab, instantiate, math } from 'cc';
import { BaseSingleton } from '../Base/BaseSingleton';
import { ESOLIDER } from '../Enum/ESOLIDER';
import { SoliderVsMonsterManager } from './SoliderVsMonsterManager';
import { Solider } from '../Solider/Solider';
const { ccclass, property } = _decorator;

@ccclass('InGameManager')
export class InGameManager extends BaseSingleton<InGameManager> {
    @property(Node)
    posSolider: Node = null

    @property(Node)
    posStartEnemy: Node = null

    @property(Prefab)
    enemyPrefab: Prefab = null; // prefab quái

    @property(Node)
    enemyParent: Node = null; // node cha chứa quái

    @property(Node)
    posBossIns: Node = null

    idSolider: ESOLIDER = ESOLIDER.SOLIDER_0
    solider: Solider = null

    maxY = 250
    minY = -250


    protected onEnable(): void {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }
    protected onDisable(): void {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    Show() {
        let opacity = this.node.getComponent(UIOpacity)
        opacity.opacity = 0
        this.node.active = true

        tween(opacity).to(1, { opacity: 255 }).start()
        this.PlayTurn()
    }

    SetIdSolider(id: ESOLIDER) {
        this.idSolider = id
        this.solider = SoliderVsMonsterManager.getInstance().soliderCollection.createSolider(id)
        this.solider.GetNode().setWorldPosition(this.posSolider.getWorldPosition().clone())
    }

    onTouchStart(event: EventTouch) {
        // Không cần xử lý ở đây nếu chỉ kéo
    }

    onTouchMove(event: EventTouch) {
        const delta = event.getDelta();
        const soldierNode = this.solider.GetNode();
        let newY = soldierNode.position.y + delta.y * 2;
        if (newY > this.minY && newY < this.maxY) {
            soldierNode.setPosition(soldierNode.position.x, newY);
        }
    }




    // ==========================
    // CODE SPAWN ENEMY HÀNG NGANG
    // ==========================

    wave = 5
    PlayTurn() {
        for (let i = 0; i < 5; i++) {
            this.scheduleOnce((index) => {
                this.StartEnemyWave()
                if (index == 4) {
                    console.log("last Wave")
                }
            }, 5 * i)
        }
    }
    StartEnemyWave() {
        const rowCount = 5;
        const gapY = 120;
        const startX = this.posStartEnemy.x;
        const startY = 200;

        for (let row = 0; row < rowCount; row++) {
            // const enemy = instantiate(this.enemyPrefab);
            // this.enemyParent.addChild(enemy);
            let enemy = SoliderVsMonsterManager.getInstance().enemiesCollection.CreateEnemy()

            const yPos = startY - row * gapY;
            enemy.GetNode().setPosition(new Vec3(startX, yPos, 0));

            // Tween cho quái bay từ phải sang trái
            // tween(enemy.GetNode())
            //     .to(5, { position: new Vec3(-startX, yPos, 0) })
            //     .call(() => {
            //         enemy.GetNode().destroy()
            //     })
            //     .start();
        }
    }

    CreateBoss() {
        let boss = SoliderVsMonsterManager.getInstance().bossCollection.CreateBoss()
        boss.GetNode().setWorldPosition(this.posBossIns.worldPosition.clone())

    }

}
