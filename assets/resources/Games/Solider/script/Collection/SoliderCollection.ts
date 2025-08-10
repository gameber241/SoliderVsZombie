import { _decorator, Component, Node } from 'cc';
import { Solider } from '../Solider/Solider';
import { ESOLIDER } from '../Enum/ESOLIDER';
const { ccclass, property } = _decorator;

@ccclass('SoliderCollection')
export class SoliderCollection extends Array<Solider> {
    createSolider(id: ESOLIDER) {
        let solider = new Solider(id)
        this.push(solider)
        return solider
    }
}


