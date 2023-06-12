import { Geometry, State } from "@pixi/core";
import { BitmapText, Container, DRAW_MODES, Graphics, IBitmapTextStyle, ITextStyle, Mesh, ObservablePoint, Point, Shader, SimpleMesh, SimplePlane, SimpleRope, Sprite, Text, TextStyle, Texture, TilingSprite } from "pixi.js";
import { BodyType, PhysicsSprite } from "../../GameObjects/PhysicsSprite";
import { SpritesheetLike } from "../Types";
/**
 * Gets a `PIXI.Texture` asset.
 * @param pAsset The name of the texture to get.
 * @param pSheet (optional) The spritesheet(s) that the texture is in. You can leave this out unless you have two textures with the same name in different spritesheets
 */
export declare class MakeFactory {
    texture(pAsset: string, pSheet: SpritesheetLike): Texture;
    sprite(pTexture: string | Texture, pSheet?: string | string[] | undefined): Sprite;
    text(pText?: string, pStyle?: Partial<ITextStyle> | TextStyle): Text;
    bitmapText(pText?: string, pStyle?: IBitmapTextStyle): BitmapText;
    container(): Container;
    graphics(): Graphics;
    tiledSprite(pTexture: string, pSheet: string | string[] | undefined, pWidth: number, pHeight: number, pTilePosition?: ObservablePoint): TilingSprite;
    mesh(pGeometry: Geometry, pShader: Shader, pState?: State, pDrawMode?: DRAW_MODES): Mesh<Shader>;
    simpleRope(pTexture: string, pSheet: string | string[] | undefined, pPoints: (Point | ObservablePoint)[], pAutoUpdate?: boolean): SimpleRope;
    simplePlane(pTexture: string, pSheet: string | string[] | undefined, pVertsWidth: number, pVertsHeight: number): SimplePlane;
    simpleMesh(pTexture: string, pSheet: string | string[] | undefined, pVertices?: Float32Array, pUvs?: Float32Array, pIndices?: Uint16Array, pDrawMode?: number): SimpleMesh;
    physicsSprite(pTexture: string | Texture, pSheet?: SpritesheetLike, pSize?: {
        x: number;
        y: number;
    } | [number, number?] | number, pBodyType?: BodyType): PhysicsSprite;
}
//# sourceMappingURL=Make.d.ts.map