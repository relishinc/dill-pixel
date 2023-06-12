"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeFactory = void 0;
const pixi_js_1 = require("pixi.js");
const PhysicsSprite_1 = require("../../GameObjects/PhysicsSprite");
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
    sprite(pTexture, pSheet) {
        let sprite;
        sprite = new pixi_js_1.Sprite(typeof pTexture === 'string' ? this.texture(pTexture, pSheet) : pTexture);
        return sprite;
    }
    text(pText = ``, pStyle) {
        let text;
        text = new pixi_js_1.Text(pText, pStyle);
        return text;
    }
    bitmapText(pText = ``, pStyle) {
        let bitmapText;
        bitmapText = new pixi_js_1.BitmapText(pText, pStyle);
        return bitmapText;
    }
    container() {
        let container;
        container = new pixi_js_1.Container();
        return container;
    }
    graphics() {
        let graphics;
        graphics = new pixi_js_1.Graphics();
        return graphics;
    }
    tiledSprite(pTexture, pSheet, pWidth, pHeight, pTilePosition) {
        let tilingSprite;
        tilingSprite = new pixi_js_1.TilingSprite(this.texture(pTexture, pSheet), pWidth, pHeight);
        if (pTilePosition) {
            tilingSprite.tilePosition = pTilePosition;
        }
        return tilingSprite;
    }
    mesh(pGeometry, pShader, pState, pDrawMode) {
        let mesh;
        mesh = new pixi_js_1.Mesh(pGeometry, pShader, pState, pDrawMode);
        return mesh;
    }
    simpleRope(pTexture, pSheet, pPoints, pAutoUpdate) {
        let simpleRope;
        simpleRope = new pixi_js_1.SimpleRope(this.texture(pTexture, pSheet), pPoints);
        simpleRope.autoUpdate = pAutoUpdate !== false;
        return simpleRope;
    }
    simplePlane(pTexture, pSheet, pVertsWidth, pVertsHeight) {
        let simplePlane;
        simplePlane = new pixi_js_1.SimplePlane(this.texture(pTexture, pSheet), pVertsWidth, pVertsHeight);
        return simplePlane;
    }
    simpleMesh(pTexture, pSheet, pVertices, pUvs, pIndices, pDrawMode) {
        let simpleMesh;
        simpleMesh = new pixi_js_1.SimpleMesh(this.texture(pTexture, pSheet), pVertices, pUvs, pIndices, pDrawMode);
        return simpleMesh;
    }
    physicsSprite(pTexture, pSheet, pSize, pBodyType = PhysicsSprite_1.BodyType.RECTANGLE) {
        let physicsSprite;
        physicsSprite = new PhysicsSprite_1.PhysicsSprite(pTexture, pSheet, pSize, pBodyType);
        return physicsSprite;
    }
}
exports.MakeFactory = MakeFactory;
//# sourceMappingURL=Make.js.map