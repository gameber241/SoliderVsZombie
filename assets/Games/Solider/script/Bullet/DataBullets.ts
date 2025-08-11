import { _decorator, Component, Node } from 'cc';
import { DataBullet } from './DataBullet';
const { ccclass, property } = _decorator;

@ccclass('DataBullets')
export class DataBullets extends Component {
    @property([DataBullet])
    databullets: DataBullet[] = []
}


