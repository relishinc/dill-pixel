import { BodyType } from "../../../GameObjects";
import { resolveXYFromObjectOrArray } from "../../../Utils";
import MakeFactory from "./MakeFactory";
export default class AddFactory {
    constructor(defaultContainer) {
        this.defaultContainer = defaultContainer;
        this._make = new MakeFactory();
    }
    set container(value) {
        this.defaultContainer = value;
    }
    get make() {
        return this._make;
    }
    // add physics sprite
    physicsSprite(pTexture, pSheet, pSize, pType = BodyType.RECTANGLE, pAlpha = 1, pPosition = { x: 0, y: 0 }) {
        const sprite = this._make.physicsSprite(pTexture, pSheet, pSize, pType);
        sprite.alpha = pAlpha;
        const resolvedPosition = resolveXYFromObjectOrArray(pPosition);
        sprite.x = resolvedPosition.x;
        sprite.y = resolvedPosition.y;
        return this.defaultContainer.addChild(sprite);
    }
    existing(pObject) {
        return this.defaultContainer.addChild(pObject);
    }
}
//# sourceMappingURL=AddFactory.js.map