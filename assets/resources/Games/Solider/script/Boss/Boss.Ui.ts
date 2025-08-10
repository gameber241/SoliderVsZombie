import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, SpriteAtlas } from 'cc';
import { SpriteFrameAnimator } from '../Utils/SpriteFrameAnimator';
import { ESTATEBOSS } from '../Enum/ESTATEBOSS';
import { GameConfig } from '../Utils/GameConfig';
import { InGameManager } from '../Manager/InGameManager';
const { ccclass, property } = _decorator;

@ccclass('Boss_Ui')
export class Boss_Ui extends Component {
    @property(SpriteAtlas)
    idleAtlas: SpriteAtlas = null

    @property(SpriteAtlas)
    deadAtlas: SpriteAtlas = null

    @property(SpriteAtlas)
    attackAtlas: SpriteAtlas = null

    @property(SpriteAtlas)
    walkAtlas: SpriteAtlas = null

    @property(SpriteFrameAnimator)
    animationBoss: SpriteFrameAnimator = null

    boss = null
    hp: number = 20

    Fire: Node = null
    _colider: BoxCollider2D = null
    protected start(): void {
        this.Fire = this.node.getChildByName("Fire")
        this._colider = this.node.getComponent(BoxCollider2D)
        this._colider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.hp = GameConfig.HP_BOSS
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

        let x = otherCollider.node
        if (x.name.includes("bulletSolider")) {
            // this.ShotSolider(otherCollider)
            x.destroy()
            this.hp -= 1
            if (this.hp == 0) {
                this.node.destroy()
                InGameManager.getInstance().PlayTurn()
            }
        }


    }
    PlayAnimation(state: ESTATEBOSS, frame: number, loop: boolean) {
        let atlas: SpriteAtlas = null
        switch (state) {
            case ESTATEBOSS.IDLE:
                atlas = this.idleAtlas
                break;
            case ESTATEBOSS.ATTACK:
                atlas = this.attackAtlas
                break;
            case ESTATEBOSS.DEAD:
                atlas = this.deadAtlas
                break;
            case ESTATEBOSS.WALK:
                atlas = this.walkAtlas
                break
        }


        this.animationBoss.PlayAnimation(atlas, frame, loop)

    }
}


