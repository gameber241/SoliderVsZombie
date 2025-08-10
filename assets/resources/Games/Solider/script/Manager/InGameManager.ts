import { _decorator, Component, EventTouch, Node, tween, UIOpacity, UITransform, Vec3, Prefab, instantiate, math, BoxCollider2D } from 'cc';
import { BaseSingleton } from '../Base/BaseSingleton';
import { ESOLIDER } from '../Enum/ESOLIDER';
import { SoliderVsMonsterManager } from './SoliderVsMonsterManager';
import { Solider } from '../Solider/Solider';
import { EENEMY } from '../Enum/EENEMY';
import { PrefabManager } from './PrefabManager';
import { DataEnemy } from '../Data/DataEnemy';
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
        // this.PlayTurn()
        this.CreateBoss()
    }

    SetIdSolider(id: ESOLIDER) {
        this.idSolider = id
        this.solider = SoliderVsMonsterManager.getInstance().soliderCollection.createSolider(id)
        this.solider.GetNode().setWorldPosition(this.posSolider.getWorldPosition().clone())
        this.solider.GetNode().getComponent(BoxCollider2D).apply()
    }

    onTouchStart(event: EventTouch) {
        // Không cần xử lý ở đây nếu chỉ kéo
    }

    onTouchMove(event: EventTouch) {

        const delta = event.getDelta();
        const soldierNode = this.solider.GetNode();
        if (soldierNode) {
            let newY = soldierNode.position.y + delta.y * 2;
            if (newY > this.minY && newY < this.maxY) {
                soldierNode.setPosition(soldierNode.position.x, newY);
                soldierNode.getComponent(BoxCollider2D).apply()
            }

        }
    }
    wa
    PlayTurn() {
        for (let i = 0; i < 5; i++) {
            this.scheduleOnce(() => {
                this.StartEnemyWave()
                if (i == 4) {
                    console.log("last Wave")
                    this.scheduleOnce(() => {
                        this.CreateBoss()
                    }, 12)

                }
            }, 5 * i)
        }
    }

    StartEnemyWave() {
        const rowCount = 5;
        const gapY = 120;
        const startX = this.posStartEnemy.x;
        const startY = 200;

        const SPECIAL_IDS = [
            EENEMY.enemy3,
            EENEMY.enemy4,
            EENEMY.enemy5,
            EENEMY.enemy9,
            EENEMY.enemy10,
            EENEMY.enemy11
        ];

        const chosenEnemies: EENEMY[] = [];
        let specialCount = 0; // đếm số enemy thuộc nhóm SPECIAL_IDS

        for (let row = 0; row < rowCount; row++) {
            let enemiesData: DataEnemy;

            do {
                enemiesData = PrefabManager.getInstance().GetRandomEnemyrefab();

                // Nếu đã chọn 4 enemy thuộc nhóm SPECIAL rồi
                // thì enemy cuối cùng bắt buộc phải ngoài nhóm này
                if (specialCount >= 4 && SPECIAL_IDS.includes(enemiesData.type)) {
                    continue; // random lại
                }

                // Không chọn trùng loại trong cùng wave
                if (chosenEnemies.includes(enemiesData.type)) {
                    continue;
                }

                break; // enemy hợp lệ thì thoát vòng do-while
            } while (true);

            chosenEnemies.push(enemiesData.type);
            if (SPECIAL_IDS.includes(enemiesData.type)) {
                specialCount++;
            }

            // Tạo enemy
            let enemy = SoliderVsMonsterManager.getInstance().enemiesCollection.CreateEnemy(enemiesData);
            const yPos = startY - row * gapY;
            enemy.GetNode().setPosition(new Vec3(startX, yPos, 0));
            enemy.GetNode().getComponent(BoxCollider2D).enabled = true;

        }
    }


    CreateBoss() {
        let boss = SoliderVsMonsterManager.getInstance().bossCollection.CreateBoss()
        boss.GetNode().setWorldPosition(this.posBossIns.worldPosition.clone())
    }

}
