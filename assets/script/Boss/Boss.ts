import { _decorator, Component, Node } from 'cc';
import { Boss_Ui } from './Boss.Ui';
import { ESTATEBOSS } from '../Enum/ESTATEBOSS';
const { ccclass, property } = _decorator;

@ccclass('Boss')
export class Boss {
    bossUI: Boss_Ui = null

    stateCurrent: ESTATEBOSS = ESTATEBOSS.IDLE


    constructor() {
        this.setState(ESTATEBOSS.IDLE)
    }

    idle() {
        this.bossUI.PlayAnimation(ESTATEBOSS.IDLE, 0.05, true)
    }


    attack() {
        this.bossUI.PlayAnimation(ESTATEBOSS.ATTACK, 0.05, false)

    }


    dead() {
        this.bossUI.PlayAnimation(ESTATEBOSS.DEAD, 0.05, false)

    }

    walk() {
        this.bossUI.PlayAnimation(ESTATEBOSS.WALK, 0.05, true)
    }


    setState(state: ESTATEBOSS) {
        this.stateCurrent = state
        switch (state) {
            case ESTATEBOSS.IDLE:
                this.idle()
                break;
            case ESTATEBOSS.ATTACK:
                this.attack()
                break;
            case ESTATEBOSS.DEAD:
                this.dead()
                break;
            case ESTATEBOSS.WALK:
                this.walk()
                break
        }
    }
}


