import { RapierPhysicsSprite } from "../GameObjects/RapierPhysicsSprite";
export default class MakeFactory {
    physicsSprite(pTexture, pSheet, pSize, pBodyType) {
        return new RapierPhysicsSprite(pTexture, pSheet, pSize, pBodyType);
    }
}
//# sourceMappingURL=MakeFactory.js.map