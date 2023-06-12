"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeFactory = void 0;
const pixi_js_1 = require("pixi.js");
/**
 * Gets a `PIXI.Texture` asset.
 * @param pAsset The name of the texture to get.
 * @param pSheet (optional) The spritesheet(s) that the texture is in. You can leave this out unless you have two textures with the same name in different spritesheets
 */
class MakeFactory {
    texture(pAsset, pSheet) {
        // tslint:disable-next-line:no-shadowed-variable
        let texture;
        if (!pSheet || (pSheet === null || pSheet === void 0 ? void 0 : pSheet.length) === 0) {
            if (pixi_js_1.Assets.cache.has(pAsset)) {
                texture = pixi_js_1.Assets.get(pAsset);
            }
            else if (pixi_js_1.Assets.get(pAsset)) {
                texture = pixi_js_1.Assets.get(pAsset).texture;
            }
            else {
                throw new Error("Asset \"" + pAsset + "\" not loaded into Pixi cache");
            }
        }
        else if (pSheet instanceof Array) {
            const numSheets = pSheet.length;
            for (let i = 0; i < numSheets; i++) {
                const sheet = pSheet[i];
                if (!pixi_js_1.Assets.get(pAsset)) {
                    throw new Error("Spritesheet \"" + sheet + "\" not loaded into Pixi cache");
                }
                else {
                    const textures = pixi_js_1.Assets.get(pAsset).textures;
                    if (textures !== undefined) {
                        texture = textures[pAsset];
                        if (texture !== undefined) {
                            break;
                        }
                    }
                    else {
                        throw new Error("Spritesheet \"" + sheet + "\" loaded but textures arent!");
                    }
                }
            }
            if (texture === undefined) {
                throw new Error("Asset \"" + pAsset + "\" not found inside spritesheets \"" + pSheet.toString() + "\'");
            }
        }
        else {
            if (!pixi_js_1.Assets.get(pSheet)) {
                throw new Error("Spritesheet \"" + pSheet + "\" not loaded into Pixi cache");
            }
            else {
                const textures = pixi_js_1.Assets.get(pSheet).textures;
                if (textures !== undefined) {
                    if (!textures.hasOwnProperty(pAsset)) {
                        throw new Error("Asset \"" + pAsset + "\" not found inside spritesheet \"" + pSheet + "\'");
                    }
                    texture = textures[pAsset];
                }
                else {
                    throw new Error("Spritesheet \"" + pSheet + "\" loaded but textures arent?!");
                }
            }
        }
        return texture || new pixi_js_1.Sprite().texture;
    }
    sprite(pAsset, pSheet) {
        let sprite;
        sprite = new pixi_js_1.Sprite(this.texture(pAsset, pSheet));
        return sprite;
    }
    text(pText = ``, pStyle) {
        let text;
        text = new pixi_js_1.Text(pText, pStyle);
        return text;
    }
}
exports.MakeFactory = MakeFactory;
//# sourceMappingURL=Make.js.map