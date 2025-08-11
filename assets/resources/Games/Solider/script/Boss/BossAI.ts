import { _decorator, Component, Node, Vec3, Animation } from 'cc';
import { InGameManager } from '../Manager/InGameManager';
import { Boss_Ui } from './Boss.Ui';
import { ESTATEBOSS } from '../Enum/ESTATEBOSS';
const { ccclass, property } = _decorator;

enum BossState {
    MOVE,
    ATTACK
}

@ccclass('BossAI')
export class BossAI extends Component {

    player: Node = null!;
    moveSpeed: number = 300;
    attackRange: number = 100;
    attackCooldown: number = 1.5;

    private _tempDir: Vec3 = new Vec3();
    private _tempPos: Vec3 = new Vec3();
    private _state: BossState = BossState.MOVE;
    private _cooldownTimer: number = 0;
    bossUI: Boss_Ui;
    private _currentAnim: ESTATEBOSS = null; // animation hiện tại

    onLoad() {
        this.player = InGameManager.getInstance().solider.GetNode();
        this.bossUI = this.node.getComponent(Boss_Ui)!;
    }

    update(dt: number) {
        if (!this.player) return;

        if (this._state === BossState.MOVE) {
            this.playBossAnim(ESTATEBOSS.WALK, 0.05, true);
            this.moveTowardsPlayer(dt);
            if (this.getDistanceToPlayer() <= this.attackRange) {
                this.startAttack();
            }
        }
        else if (this._state === BossState.ATTACK) {
            this.playBossAnim(ESTATEBOSS.ATTACK, 0.05, true);
            this._cooldownTimer -= dt;
            if (this._cooldownTimer <= 0) {
                if (this.getDistanceToPlayer() <= this.attackRange) {
                    if (this.isAttack == true) return
                    this.startAttack();
                } else {
                    this.changeState(BossState.MOVE);
                }
            }
        }
    }

    moveTowardsPlayer(dt: number) {
        if (this.player == null) return
        const bossPos = this.node.worldPosition.clone();
        const playerPos = this.player.worldPosition.clone();
        Vec3.subtract(this._tempDir, playerPos, bossPos);
        this._tempDir.normalize();
        Vec3.multiplyScalar(this._tempDir, this._tempDir, this.moveSpeed * dt);
        Vec3.add(this._tempPos, bossPos, this._tempDir);
        this.node.setWorldPosition(this._tempPos);
    }
    isAttack = false
    startAttack() {
        this.isAttack = true
        this.changeState(BossState.ATTACK);
        this._cooldownTimer = this.attackCooldown;
        this.scheduleOnce(() => {
            if (this.getDistanceToPlayer() <= this.attackRange) {
                this.dealDamage()
            }
        }, this.bossUI.animationBoss.GetDuration() / 2)
        this.scheduleOnce(() => {
            this.isAttack = false
        }, this.bossUI.animationBoss.GetDuration())
    }

    changeState(newState: BossState) {
        if (this._state !== newState) {
            this._state = newState;
        }
    }

    playBossAnim(anim: ESTATEBOSS, speed: number, loop: boolean) {
        if (this._currentAnim === anim) return; // tránh trùng lặp
        this._currentAnim = anim;
        this.bossUI.PlayAnimation(anim, speed, loop);
    }

    getDistanceToPlayer(): number {
        if (this.player == null) return
        return Vec3.distance(this.node.worldPosition.clone(), this.player.worldPosition.clone());
    }

    dealDamage() {
        console.log("Boss đánh trúng player");
        // Gọi hàm trừ máu Player ở đây
        InGameManager.getInstance().solider.Dispose()
        this.player = null
    }
}
