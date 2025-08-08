import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { BaseSingleton } from '../Base/BaseSingleton';
const { ccclass, property } = _decorator;

@ccclass('PoolManager')
export class PoolManager extends BaseSingleton<PoolManager> {
    public listPool: Map<Prefab, [Node]> = new Map<Prefab, [Node]>()


    public Spawn(prefab: Prefab, parent) {
        let list = this.listPool.get(prefab)
        let newNode: Node = null
        if (list && list.length > 0) {
            newNode = list.splice(0, 1)[0]
        }
        if (newNode == null) {
            newNode = instantiate(prefab)
        }
        newNode.setParent(parent)
        newNode.active = true
        return newNode

    }
}


