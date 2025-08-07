import { _decorator, Component, Node, SpriteAtlas } from 'cc';
import { SpriteFrameAnimator } from '../Utils/SpriteFrameAnimator';
import { ESTATEBOSS } from '../Enum/ESTATEBOSS';
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


