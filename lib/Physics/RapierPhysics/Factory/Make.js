import { RapierPhysicsSprite } from "../GameObjects";
export class Make {
    static physicsSprite(pTexture, pSheet, pSize, pBodyType) {
        return new RapierPhysicsSprite(pTexture, pSheet, pSize, pBodyType);
    }
}
//# sourceMappingURL=Make.js.map