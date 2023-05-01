import {Assets, Resource, Sprite, Texture, Text, TextFormat,ITextStyle,TextStyle} from "pixi.js";

/**
 * Gets a `PIXI.Texture` asset.
 * @param pAsset The name of the texture to get.
 * @param pSheet (optional) The spritesheet(s) that the texture is in. You can leave this out unless you have two textures with the same name in different spritesheets
 */

export class MakeFactory {
    texture(pAsset: string, pSheet?: string | string[]): Texture {
        // tslint:disable-next-line:no-shadowed-variable
        let texture: Texture<Resource> | undefined;

        if (!pSheet || pSheet?.length === 0) {
            if (Assets.cache.has(pAsset)) {
                texture = Assets.get(pAsset)!;
            } else if (Assets.get(pAsset)) {
                texture = Assets.get(pAsset).texture!;
            } else {
                throw new Error("Asset \"" + pAsset + "\" not loaded into Pixi cache");
            }
        } else if (pSheet instanceof Array) {
            const numSheets = pSheet.length;
            for (let i = 0; i < numSheets; i++) {
                const sheet = pSheet[i];
                if (!Assets.get(pAsset)) {
                    throw new Error("Spritesheet \"" + sheet + "\" not loaded into Pixi cache");
                } else {
                    const textures = Assets.get(pAsset).textures;
                    if (textures !== undefined) {
                        texture = textures[pAsset];
                        if (texture !== undefined) {
                            break;
                        }
                    } else {
                        throw new Error("Spritesheet \"" + sheet + "\" loaded but textures arent!");
                    }
                }
            }
            if (texture === undefined) {
                throw new Error("Asset \"" + pAsset + "\" not found inside spritesheets \"" + pSheet.toString() + "\'");
            }
        } else {
            if (!Assets.get(pSheet)) {
                throw new Error("Spritesheet \"" + pSheet + "\" not loaded into Pixi cache");
            } else {
                const textures = Assets.get(pSheet).textures;
                if (textures !== undefined) {
                    if (!textures.hasOwnProperty(pAsset)) {
                        throw new Error("Asset \"" + pAsset + "\" not found inside spritesheet \"" + pSheet + "\'");
                    }
                    texture = textures[pAsset];
                } else {
                    throw new Error("Spritesheet \"" + pSheet + "\" loaded but textures arent?!");
                }
            }
        }

        return texture || new Sprite().texture;
    }

    sprite(pAsset: string, pSheet?: string | string[]): Sprite {
        let sprite: Sprite | undefined;
        sprite = new Sprite(this.texture(pAsset, pSheet));
        return sprite;
    }

    text(pText:string = ``, pStyle?: Partial<ITextStyle> | TextStyle):Text  {
        let text: Text | undefined;
        text = new Text(pText, pStyle);
        return text;
    }
}
