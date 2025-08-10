import { _decorator, Component, Sprite, SpriteAtlas, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpriteFrameAnimatorTest')
export class SpriteFrameAnimatorTest extends Component {
    @property(SpriteAtlas)
    atlas: SpriteAtlas = null;
    frameTime: number = 0.1; // Thời gian mỗi frame
    loop: boolean = true;

    private _sprite: Sprite = null;
    private _frames: SpriteFrame[] = [];
    private _currentFrameIndex: number = 0;
    private _timer: number = 0;

    start() {
        this.PlayAnimation(this.atlas, 0.1, true)
    }


    PlayAnimation(atlas: SpriteAtlas, frameTime: number, loop: boolean) {
        this.atlas = atlas
        this.frameTime = frameTime
        this.loop = loop
        this._sprite = this.getComponent(Sprite);
        this._currentFrameIndex = 0;
        this._timer = 0;

        if (!this.atlas) {
            console.warn("Atlas chưa được gán!");
            return;
        }

        // Lấy và sắp xếp danh sách SpriteFrame theo tên
        const framesMap = this.atlas.getSpriteFrames();
        this._frames = Object.values(framesMap).sort((a, b) => {
            return a.name.localeCompare(b.name, undefined, { numeric: true });
        });

        if (this._frames.length === 0) {
            console.warn("Atlas không có sprite frame nào!");
            return;
        }

        // Gán frame đầu tiên
        this._sprite.spriteFrame = this._frames[0];
    }


    GetDuration() {
        return this.frameTime * this._frames.length
    }

    update(dt: number) {
        if (this._frames.length === 0) return;

        this._timer += dt;
        if (this._timer >= this.frameTime) {
            this._timer -= this.frameTime;
            this._currentFrameIndex++;

            if (this._currentFrameIndex >= this._frames.length) {
                if (this.loop) {
                    this._currentFrameIndex = 0;
                } else {
                    this._currentFrameIndex = this._frames.length - 1;
                    return;
                }
            }

            this._sprite.spriteFrame = this._frames[this._currentFrameIndex];
        }
    }
}
