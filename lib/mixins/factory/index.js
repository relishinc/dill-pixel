import { Assets, Graphics, Sprite } from 'pixi.js';
import { Container } from '../../display';
import { Logger, resolvePointLike } from '../../utils';
// Default factory methods
export const defaultFactoryMethods = {
    texture: (props) => {
        return resolveTexture(props);
    },
    container: (props) => {
        const entity = new Container();
        if (!props) {
            return entity;
        }
        const { position, x, y, pivot, ...rest } = props;
        resolvePosition({ position, x, y }, entity);
        resolvePivot(pivot, entity);
        resolveUnknownKeys(rest, entity);
        return entity;
    },
    sprite: (props) => {
        if (!props) {
            return new Sprite();
        }
        const entity = new Sprite(resolveTexture(props));
        const { position, x, y, anchor, pivot, ...rest } = props;
        resolvePosition({ position, x, y }, entity);
        resolveAnchor(anchor, entity);
        resolvePivot(pivot, entity);
        resolveUnknownKeys(rest, entity);
        return entity;
    },
    graphics: (props) => {
        const entity = new Graphics();
        if (!props) {
            return entity;
        }
        const { position, x, y, pivot, ...rest } = props;
        resolvePosition({ position, x, y }, entity);
        resolvePivot(pivot, entity);
        resolveUnknownKeys(rest, entity);
        return entity;
    },
};
function resolveUnknownKeys(props, entity) {
    for (const key in props) {
        try {
            entity[key] = props[key];
        }
        catch (e) {
            Logger.error(`Error setting property ${key}`, e);
        }
    }
}
function resolveTexture(props) {
    let texture;
    const asset = props?.asset;
    const assetAsString = asset;
    const sheet = props?.sheet;
    if (!sheet || sheet?.length === 0) {
        if (Assets.cache.has(assetAsString)) {
            texture = Assets.get(assetAsString);
        }
        else if (Assets.get(assetAsString)) {
            texture = Assets.get(assetAsString).texture;
        }
        else {
            throw new Error('Asset "' + asset + '" not loaded into Pixi cache');
        }
    }
    else {
        if (!Assets.get(sheet)) {
            throw new Error('Spritesheet "' + sheet + '" not loaded into Pixi cache');
        }
        else {
            const spriteSheet = Assets.get(sheet);
            const textures = spriteSheet.textures;
            if (textures !== undefined) {
                // eslint-disable-next-line no-prototype-builtins
                if (textures.hasOwnProperty(assetAsString)) {
                    texture = textures[assetAsString];
                }
                else if (spriteSheet.linkedSheets !== undefined && spriteSheet.linkedSheets.length > 0) {
                    for (const linkedSheet of spriteSheet.linkedSheets) {
                        // eslint-disable-next-line no-prototype-builtins
                        if (linkedSheet.textures !== undefined && linkedSheet.textures.hasOwnProperty(assetAsString)) {
                            texture = linkedSheet.textures[assetAsString];
                            break;
                        }
                    }
                    if (texture === undefined) {
                        throw new Error('Asset "' + asset + '" not found inside spritesheet "' + asset + "' or any of its linked sheets");
                    }
                }
                else {
                    throw new Error('Asset "' + asset + '" not found inside spritesheet "' + sheet + "'");
                }
            }
            else {
                throw new Error('Spritesheet "' + sheet + '" loaded but textures arent?!');
            }
        }
    }
    return texture || new Sprite().texture;
}
function resolvePosition(props, entity) {
    const pos = resolvePointLike(props.position, false, props.x, props.y);
    entity.x = pos.x;
    entity.y = pos.y;
}
function resolveAnchor(anchor, entity) {
    if (anchor !== undefined) {
        const anchorPoint = resolvePointLike(anchor);
        entity.anchor.set(anchorPoint.x, anchorPoint.y);
    }
}
function resolvePivot(pivot, entity) {
    if (pivot !== undefined) {
        const pivotPoint = resolvePointLike(pivot);
        entity.pivot.set(pivotPoint.x, pivotPoint.y);
    }
}
export { Factory } from './mixin';
/*
// Example of extending the factory methods
export interface IPhysicsFactoryMethods {
  physicsSprite: () => Sprite;
}
const PhysicsContainer = extendContainer<IFactoryMethods & IPhysicsFactoryMethods>({
  ...defaultFactoryMethods,
  physicsSprite: () => {
    return new Sprite();
  },
});
 */
//# sourceMappingURL=index.js.map