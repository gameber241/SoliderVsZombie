import { _decorator, Component, Node, SpriteAtlas } from 'cc';
import { SpriteFrameAnimator } from '../Utils/SpriteFrameAnimator';
import { ESTATEENEMY } from '../Enum/ESTATEENEMY';
const { ccclass, property } = _decorator;

@ccclass('Enemy_Ui')
export class Enemy_Ui extends Component {
    @property(SpriteAtlas)
    attackAtlas: SpriteAtlas = null

    @property(SpriteAtlas)
    walkAtlas: SpriteAtlas = null



    @property(SpriteFrameAnimator)
    animationBoss: SpriteFrameAnimator = null

    Fire: Node = null

    protected start(): void {
        this.Fire = this.node.getChildByName("Fire")
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


