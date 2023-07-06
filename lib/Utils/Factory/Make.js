import { Assets, BitmapText, Container, Graphics, Mesh, SimpleMesh, SimplePlane, SimpleRope, Sprite, Text, TilingSprite } from "pixi.js";
import { Application } from "../../Application";
import { resolveXYFromObjectOrArray, setObjectName } from "./utils";
/**
 * Gets a `PIXI.Texture` asset.
 * @param pAsset The name of the texture to get.
 * @param pSheet (optional) The spritesheet(s) that the texture is in. You can leave this out unless you have two textures with the same name in different spritesheets
 */
export class MakeFactory {
    texture(pAsset, pSheet) {
        // tslint:disable-next-line:no-shadowed-variable
        let texture;
        if (!pSheet || (pSheet === null || pSheet === void 0 ? void 0 : pSheet.length) === 0) {
            if (Assets.cache.has(pAsset)) {
                texture = Assets.get(pAsset);
            }
            else if (Assets.get(pAsset)) {
                texture = Assets.get(pAsset).texture;
            }
            else {
                throw new Error("Asset \"" + pAsset + "\" not loaded into Pixi cache");
            }
        }
        else if (pSheet instanceof Array) {
            const numSheets = pSheet.length;
            for (let i = 0; i < numSheets; i++) {
                const sheet = pSheet[i];
                if (!Assets.get(pAsset)) {
                    throw new Error("Spritesheet \"" + sheet + "\" not loaded into Pixi cache");
                }
                else {
                    const textures = Assets.get(pAsset).textures;
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
            if (!Assets.get(pSheet)) {
                throw new Error("Spritesheet \"" + pSheet + "\" not loaded into Pixi cache");
            }
            else {
                const textures = Assets.get(pSheet).textures;
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
        return texture || new Sprite().texture;
    }
    coloredSprite(color = 0x0, size = { x: 1, y: 1 }, shape = "rectangle") {
        const gfx = new Graphics();
        const resolvedSize = resolveXYFromObjectOrArray(size);
        gfx.beginFill(color, 1);
        switch (shape) {
            case "circle":
                gfx.drawCircle(0, 0, resolvedSize.x);
                break;
            case "rectangle":
            default:
                gfx.drawRect(0, 0, resolvedSize.x, resolvedSize.y);
                break;
        }
        gfx.endFill();
        return this.sprite(Application.instance.renderer.generateTexture(gfx));
    }
    sprite(pTexture, pSheet) {
        let sprite;
        sprite = new Sprite(typeof pTexture === 'string' ? this.texture(pTexture, pSheet) : pTexture);
        setObjectName(sprite, pTexture, pSheet);
        return sprite;
    }
    text(pText = ``, pStyle) {
        let text;
        text = new Text(pText, pStyle);
        return text;
    }
    bitmapText(pText = ``, pStyle) {
        let bitmapText;
        bitmapText = new BitmapText(pText, pStyle);
        return bitmapText;
    }
    container() {
        let container;
        container = new Container();
        return container;
    }
    graphics() {
        let graphics;
        graphics = new Graphics();
        return graphics;
    }
    tiledSprite(pTexture, pSheet, pWidth, pHeight, pTilePosition) {
        let tilingSprite;
        tilingSprite = new TilingSprite(this.texture(pTexture, pSheet), pWidth, pHeight);
        setObjectName(tilingSprite, pTexture, pSheet);
        if (pTilePosition) {
            tilingSprite.tilePosition = pTilePosition;
        }
        return tilingSprite;
    }
    mesh(pGeometry, pShader, pState, pDrawMode) {
        let mesh;
        mesh = new Mesh(pGeometry, pShader, pState, pDrawMode);
        return mesh;
    }
    simpleRope(pTexture, pSheet, pPoints, pAutoUpdate) {
        let simpleRope;
        simpleRope = new SimpleRope(this.texture(pTexture, pSheet), pPoints);
        setObjectName(simpleRope, pTexture, pSheet);
        simpleRope.autoUpdate = pAutoUpdate !== false;
        return simpleRope;
    }
    simplePlane(pTexture, pSheet, pVertsWidth, pVertsHeight) {
        let simplePlane;
        simplePlane = new SimplePlane(this.texture(pTexture, pSheet), pVertsWidth, pVertsHeight);
        setObjectName(simplePlane, pTexture, pSheet);
        return simplePlane;
    }
    simpleMesh(pTexture, pSheet, pVertices, pUvs, pIndices, pDrawMode) {
        let simpleMesh;
        simpleMesh = new SimpleMesh(this.texture(pTexture, pSheet), pVertices, pUvs, pIndices, pDrawMode);
        setObjectName(simpleMesh, pTexture, pSheet);
        return simpleMesh;
    }
}
//# sourceMappingURL=Make.js.map