import { Texture } from 'pixi.js';
import { resolvePointLike } from '../../../utils';
import { PhysicsBodyType } from '../../types';
import { MatterPhysicsSprite } from '../gameobjects';
export class Make {
    static physicsSprite(settingsOrAsset, sheet, size = 1, bodyType = PhysicsBodyType.RECTANGLE, alpha = 1, position = 0, scale = 1) {
        let visible = true;
        let asset = settingsOrAsset;
        if (typeof settingsOrAsset === 'object' && !(settingsOrAsset instanceof Texture)) {
            const settings = settingsOrAsset;
            asset = settings?.asset;
            sheet = settings?.sheet;
            size = settings?.size ?? 1;
            bodyType = settings?.bodyType ?? PhysicsBodyType.RECTANGLE;
            alpha = settings?.alpha ?? 1;
            position = settings?.position ?? 0;
            scale = settings?.scale ?? 1;
            visible = settings?.visible !== false;
        }
        if (!asset) {
            asset = Texture.WHITE;
        }
        const sprite = new MatterPhysicsSprite(asset, sheet, size, bodyType);
        sprite.alpha = alpha;
        if (position) {
            const resolvedPosition = resolvePointLike(position);
            sprite.position.set(resolvedPosition.x, resolvedPosition.y);
        }
        if (scale) {
            const resolvedScale = resolvePointLike(scale);
            sprite.scale.set(resolvedScale.x, resolvedScale.y);
        }
        sprite.visible = visible;
        return sprite;
    }
}
//# sourceMappingURL=Make.js.map