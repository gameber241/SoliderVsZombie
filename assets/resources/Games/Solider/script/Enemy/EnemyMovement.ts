import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyMovement')
export class EnemyMovement extends Component {
    speed: number = 200; // px/giây
    screenWidth: number = 1920; // sẽ set từ Spawner
    _colider: BoxCollider2D = null
    protected start(): void {
        this._colider = this.node.getComponent(BoxCollider2D)
    }

    update(deltaTime: number) {
        if (this.node.active == false) return
        this.node.position = this.node.position.add3f(-this.speed * deltaTime, 0, 0);
        this._colider.apply()
        if (this.node.position.x < -(this.screenWidth / 2 + 50)) {
            this.node.active = false
        }
    }
}


