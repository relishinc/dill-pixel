import { Assets, Sprite, Texture } from 'pixi.js';
import { Logger } from '../../utils/console/Logger';
import { resolvePointLike } from '../../utils/functions';
export function resolveUnknownKeys(props, entity) {
    for (const key in props) {
        try {
            entity[key] = props[key];
        }
        catch (e) {
            Logger.error(`Error setting property ${key}`, e);
        }
    }
}
export function resolveTexture(props) {
    let texture;
    const asset = props?.asset;
    const assetAsString = asset;
    const sheet = props?.sheet;
    if (asset instanceof Texture) {
        texture = asset;
    }
    else if (!sheet || sheet?.length === 0) {
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
export function resolvePosition(props, entity) {
    const pos = resolvePointLike(props.position, false, props.x, props.y);
    entity.x = pos.x;
    entity.y = pos.y;
}
export function resolveScale(props, entity) {
    if (!props) {
        return;
    }
    if (props.scale === undefined) {
        if (props.scaleX === undefined && props.scaleY === undefined) {
            return;
        }
        if (props.scaleX === undefined) {
            props.scaleX = 1;
        }
        if (props.scaleY === undefined) {
            props.scaleY = 1;
        }
    }
    const scale = resolvePointLike(props.scale, false, props.scaleX, props.scaleY);
    entity.scale.set(scale.x, scale.y);
}
export function resolveAnchor(anchor, entity) {
    if (anchor !== undefined) {
        const anchorPoint = resolvePointLike(anchor);
        entity.anchor.set(anchorPoint.x, anchorPoint.y);
    }
}
export function resolvePivot(pivot, entity) {
    if (pivot !== undefined) {
        const pivotPoint = resolvePointLike(pivot);
        entity.pivot.set(pivotPoint.x, pivotPoint.y);
    }
}
