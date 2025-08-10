import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, RigidBody2D, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletMovement')
export class BulletMovement extends Component {
    speed: number = 3000; // px/giây
    screenWidth: number = 1920; // sẽ set từ Spawner
    _colider: BoxCollider2D = null
    protected start(): void {
        this._colider = this.node.getComponent(BoxCollider2D)
        this._colider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.scheduleOnce(() => {
            this.node.active = false
        }, 0.01)

    }


    update(deltaTime: number) {
        if (this.node.active == false) return
        this.node.position = this.node.position.add3f(this.speed * deltaTime, 0, 0);
        this._colider.apply()
        if (this.node.position.x > this.screenWidth / 2 + 50) {
            this.node.active = false
        }
    }
}


