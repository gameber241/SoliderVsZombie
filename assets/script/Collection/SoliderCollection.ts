import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoliderCollection')
export class SoliderCollection extends Array<SoliderCollection> {

}


