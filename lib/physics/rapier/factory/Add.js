import { resolvePointLike } from '../../../utils';
import { PhysicsBodyType } from '../../types';
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
    // add physics sprite
    physicsSprite(pTexture, pSheet, pSize, pType = PhysicsBodyType.RECTANGLE, pAlpha = 1, pPosition = { x: 0, y: 0 }) {
        const sprite = this.make.physicsSprite(pTexture, pSheet, pSize, pType);
        sprite.alpha = pAlpha;
        const resolvedPosition = resolvePointLike(pPosition);
        sprite.x = resolvedPosition.x;
        sprite.y = resolvedPosition.y;
        return this.defaultContainer.addChild(sprite);
    }
    existing(pObject) {
        return this.defaultContainer.addChild(pObject);
    }
}
//# sourceMappingURL=Add.js.map