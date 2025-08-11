import { _decorator, Component, Label, Node } from 'cc';
import { DataLocale } from '../Utils/DataLocale';
import { BaseSingleton } from '../Base/BaseSingleton';
const { ccclass, property } = _decorator;

@ccclass('BestScore')
export class BestScore extends BaseSingleton<BestScore> {
    @property(Label)
    bestScore: Label = null

    _bestScore
    protected start(): void {
        this._bestScore = DataLocale.getInstance().GetDataLocale("BESTSCORE")
        if (this._bestScore == null) {
            this._bestScore = 0
        }
        this.SetLB(this._bestScore)

    }

    SetLB(scoreCurrent) {
        this._bestScore = scoreCurrent
        DataLocale.getInstance().SaveDataLocale("BESTSCORE", this._bestScore)
        this.bestScore.string = "BESTSCORE:" + scoreCurrent
    }

}


