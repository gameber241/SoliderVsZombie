import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, SpriteAtlas } from 'cc';
import { SpriteFrameAnimator } from '../Utils/SpriteFrameAnimator';
import { PoolManager } from '../Manager/PoolManager';
import { PrefabManager } from '../Manager/PrefabManager';
import { BULEET_ID } from '../Bullet/DataBullet';
import { SoundManager } from '../Manager/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('Solider_UI')
export class Solider_UI extends Component {
    @property(SpriteAtlas)
    public attackRunAtlas: SpriteAtlas = null;

    @property(SpriteFrameAnimator)
    animation: SpriteFrameAnimator = null;

    @property(Node)
    fire: Node = null

    solider = null
    _colider: BoxCollider2D = null
    protected start(): void {
        this._colider = this.node.getComponent(BoxCollider2D)
        this._colider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

        let x = otherCollider.node
        if (x.name.includes("Enemy")) {
            SoundManager.getInstance().playHit()
            if (x.name === "bulletEnemy") {
                PoolManager.getInstance().Despawn(PrefabManager.getInstance().GetBulletPrefabById(BULEET_ID.Bullet_Enemy), x)
            }
            this.solider.Dispose()
        }

    }

    PlayAnimation() {
        this.animation.PlayAnimation(this.attackRunAtlas, 0.05, true);
    }
    protected update(dt: number): void {
        this.node.getComponent(BoxCollider2D).apply()
    }
}


