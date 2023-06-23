import { MatterPhysicsSprite } from "../../../GameObjects";
export default class MakeFactory {
    physicsSprite(pTexture, pSheet, pSize, pBodyType) {
        return new MatterPhysicsSprite(pTexture, pSheet, pSize, pBodyType);
    }
}
//# sourceMappingURL=MakeFactory.js.map