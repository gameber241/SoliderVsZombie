import { _decorator, BoxCollider2D, CCInteger, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, SpriteAtlas } from 'cc';
import { SpriteFrameAnimator } from '../Utils/SpriteFrameAnimator';
import { ESTATEENEMY } from '../Enum/ESTATEENEMY';
import { GameConfig } from '../Utils/GameConfig';
import { InGameManager } from '../Manager/InGameManager';
const { ccclass, property } = _decorator;

@ccclass('Enemy_Ui')
export class Enemy_Ui extends Component {
    @property(SpriteAtlas)
    attackAtlas: SpriteAtlas = null

    @property(SpriteAtlas)
    walkAtlas: SpriteAtlas = null


    @property(SpriteFrameAnimator)
    animationBoss: SpriteFrameAnimator = null

    hp: number = 20

    Fire: Node = null

    enemy = null
    _colider: BoxCollider2D = null
    protected start(): void {
        this.Fire = this.node.getChildByName("Fire")
        this._colider = this.node.getComponent(BoxCollider2D)
        this._colider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.hp = GameConfig.HP_ENEMY
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

        let x = otherCollider.node
        if (x.name.includes("bulletSolider")) {
            // this.ShotSolider(otherCollider)
            x.destroy()
            this.hp -= 1
            console.log(this.hp)
            if (this.hp == 0) {
                this.enemy.stopShooting()
                InGameManager.getInstance().UpdateScore(GameConfig.SCORE_ENEMY)
                this.node.destroy()

            }
        }


    }
    PlayAnimation(state: ESTATEENEMY, frame: number, loop: boolean) {
        let atlas: SpriteAtlas = null
        switch (state) {

            case ESTATEENEMY.ATTACK:
                atlas = this.attackAtlas
                break;

            case ESTATEENEMY.WALK:
                atlas = this.walkAtlas
                break
        }


        this.animationBoss.PlayAnimation(atlas, frame, loop)

    }
}


