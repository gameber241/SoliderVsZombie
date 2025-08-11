import { _decorator, Component, Sprite, SpriteAtlas, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpriteFrameAnimator')
export class SpriteFrameAnimator extends Component {
    private _sprite: Sprite = null;
    private _frames: SpriteFrame[] = [];
    private _frameTime: number = 0.1;
    private _loop: boolean = true;
    private _isPlaying: boolean = false;

    private _startTime: number = 0; // thời điểm animation bắt đầu
    private _lastFrameIndex: number = -1;

    onLoad() {

    }

    PlayAnimation(atlas: SpriteAtlas, frameTime: number, loop: boolean) {
        if (!atlas) {
            console.warn("Atlas chưa được gán!");
            return;
        }
        this._sprite = this.getComponent(Sprite);
        this._frames = atlas.getSpriteFrames().sort((a, b) =>
            a.name.localeCompare(b.name, undefined, { numeric: true })
        );

        if (this._frames.length === 0) {
            console.warn("Atlas không có sprite frame nào!");
            return;
        }

        this._frameTime = frameTime;
        this._loop = loop;
        this._isPlaying = true;
        this._startTime = performance.now() / 1000; // giây
        this._lastFrameIndex = -1;
    }

    StopAnimation() {
        this._isPlaying = false;
    }

    GetDuration(): number {
        return this._frames.length * this._frameTime;
    }

    update() {
        if (!this._isPlaying) return;

        const elapsed = (performance.now() / 1000) - this._startTime;
        let frameIndex = Math.floor(elapsed / this._frameTime);

        if (!this._loop && frameIndex >= this._frames.length) {
            frameIndex = this._frames.length - 1;
            this._isPlaying = false;
        } else if (this._loop) {
            frameIndex = frameIndex % this._frames.length;
        }

        if (frameIndex !== this._lastFrameIndex) {
            this._sprite.spriteFrame = this._frames[frameIndex];
            this._lastFrameIndex = frameIndex;
        }
    }
}
