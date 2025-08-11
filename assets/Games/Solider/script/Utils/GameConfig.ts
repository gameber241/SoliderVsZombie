import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameConfig')
export class GameConfig extends Component {
    public static HP_ENEMY = 10
    public static HP_BOSS = 100
    public static SCORE_ENEMY = 10
    public static SCORE_BOSS = 100
}


