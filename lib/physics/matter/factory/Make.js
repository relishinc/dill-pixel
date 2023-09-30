import { MatterPhysicsSprite } from '../gameobjects/MatterPhysicsSprite';
export class Make {
    static physicsSprite(pTexture, pSheet, pSize, pBodyType) {
        return new MatterPhysicsSprite(pTexture, pSheet, pSize, pBodyType);
    }
}
//# sourceMappingURL=Make.js.map