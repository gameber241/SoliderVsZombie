import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
import { BaseSingleton } from '../Base/BaseSingleton';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends BaseSingleton<SoundManager> {
    @property(AudioSource)
    soliderSource: AudioSource = null;

    @property(AudioSource)
    enemySouce: AudioSource = null;

    @property(AudioClip)
    enemyDie: AudioClip = null;

    @property(AudioClip)
    clickAudio: AudioClip = null;

    @property([AudioClip])
    hitAudio: AudioClip[] = [];

    @property([AudioClip])
    shot: AudioClip[] = [];


    playEnemyDie() {
        // this.enemySouce.stop();
        this.enemySouce.clip = this.enemyDie;
        this.enemySouce.play();
    }

    playClick() {
        // this.soliderSource.stop();
        this.soliderSource.clip = this.clickAudio;
        this.soliderSource.play();
    }

    playHit() {
        // this.soliderSource.stop();
        this.soliderSource.clip = this.hitAudio[Math.floor(Math.random() * this.hitAudio.length)];
        this.soliderSource.play();
    }

    playShot() {
        // this.soliderSource.stop();
        this.soliderSource.clip = this.shot[Math.floor(Math.random() * this.shot.length)];
        this.soliderSource.play();
    }

}


