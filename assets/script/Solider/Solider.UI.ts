import { _decorator, Component, Node, SpriteAtlas } from 'cc';
import { SpriteFrameAnimator } from '../Utils/SpriteFrameAnimator';
const { ccclass, property } = _decorator;

@ccclass('Solider_UI')
export class Solider_UI extends Component {
    @property(SpriteAtlas)
    public attackRunAtlas: SpriteAtlas = null;

    @property(SpriteFrameAnimator)
    animation: SpriteFrameAnimator = null;


    PlayAnimation() {
        this.animation.PlayAnimation(this.attackRunAtlas, 0.05, true);
    }

}


