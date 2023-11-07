import { Texture } from 'pixi.js';
import { Make } from './Make';
export class Add {
    constructor(defaultContainer) {
        this.defaultContainer = defaultContainer;
    }
    set container(value) {
        this.defaultContainer = value;
    }
    get make() {
        return Make;
    }
    physicsSprite(settingsOrAsset, sheet, size, bodyType, alpha = 1, position = 0, scale = 1) {
        const mfs = typeof settingsOrAsset === 'string' || settingsOrAsset instanceof Texture
            ? this.make.physicsSprite(settingsOrAsset, sheet, size, bodyType, alpha, position, scale)
            : this.make.physicsSprite(settingsOrAsset);
        return this.defaultContainer.addChild(mfs);
    }
    existing(pObject) {
        return this.defaultContainer.addChild(pObject);
    }
}
//# sourceMappingURL=Add.js.map