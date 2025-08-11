import { _decorator, Component, Label, Node, Tween } from 'cc';
import { InGameManager } from '../Manager/InGameManager';
import { BestScore } from './BestScore';
import { BaseSingleton } from '../Base/BaseSingleton';
import { SoliderVsMonsterManager } from '../Manager/SoliderVsMonsterManager';
import { LobbyManager } from '../Manager/LobbyManager';
import { SoundManager } from '../Manager/SoundManager';

const { ccclass, property } = _decorator;

@ccclass('GameOver')
export class GameOver extends BaseSingleton<GameOver> {
    @property(Label)
    score: Label = null;

    @property(Label)
    bestScore: Label = null;

    protected onEnable(): void {

        this.score.string = `Score: ${InGameManager.getInstance()._scoreCurrent}`;
        this.bestScore.string = `Best Score: ${BestScore.getInstance()._bestScore}`;
    }

    BtnHome() {
        SoundManager.getInstance().playClick()
        Tween.stopAll();
        SoliderVsMonsterManager.getInstance().ClearGame();
        InGameManager.getInstance().Hide()
        LobbyManager.getInstance().Show();
        this.node.active = false
    }

    BtnReplay() {
        SoundManager.getInstance().playClick()
        Tween.stopAll();
        SoliderVsMonsterManager.getInstance().ClearGame();
        InGameManager.getInstance().PLayGame()
        this.node.active = false
    }
}


