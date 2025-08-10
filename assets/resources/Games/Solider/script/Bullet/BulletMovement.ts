import { _decorator, BoxCollider2D, CCInteger, Collider2D, Component, Contact2DType, Enum, IPhysics2DContact, Node, RigidBody2D, Vec3 } from 'cc';
import { BULEET_ID } from './DataBullet';
import { Solider_UI } from '../Solider/Solider.UI';
import { Enemy_Ui } from '../Enemy/Enemy.Ui';
const { ccclass, property } = _decorator;
Enum(BULEET_ID)
@ccclass('BulletMovement')
export class BulletMovement extends Component {
    @property(CCInteger)
    speed: number = 3000; // px/giây
    screenWidth: number = 1920; // sẽ set từ Spawner
    _colider: BoxCollider2D = null
    @property({ type: BULEET_ID })
    bulletId: BULEET_ID = BULEET_ID.Bullet_Enemy
    protected start(): void {
        this._colider = this.node.getComponent(BoxCollider2D)

    }

    ShotSolider(otherCollider: Collider2D) {
        let solider = otherCollider.node
        solider.getComponent(Solider_UI).solider.Dispose()
    }

    ShotEnemy(otherCollider: Collider2D) {
        let enemy = otherCollider.node
        enemy.getComponent(Enemy_Ui).enemy.stopShooting()
        enemy.destroy()
    }


    update(deltaTime: number) {
        if (this.node.active == false) return
        this.node.position = this.node.position.add3f(this.speed * deltaTime, 0, 0);
        this._colider.apply()
        if (this.node.position.x > this.screenWidth / 2 + 50 || (this.node.position.x < -this.screenWidth / 2 - 50)) {
            this.node.active = false
        }
    }
}


