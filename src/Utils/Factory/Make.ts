import {Geometry, State} from "@pixi/core";
import {
	Assets,
	BitmapText,
	Container,
	DRAW_MODES,
	Graphics,
	IBitmapTextStyle,
	ITextStyle,
	Mesh,
	ObservablePoint,
	Point,
	Resource,
	Shader,
	SimpleMesh,
	SimplePlane,
	SimpleRope,
	Sprite,
	Text,
	TextStyle,
	Texture,
	TilingSprite
} from "pixi.js";
import {SpritesheetLike} from "../Types";

/**
 * Gets a `PIXI.Texture` asset.
 * @param pAsset The name of the texture to get.
 * @param pSheet (optional) The spritesheet(s) that the texture is in. You can leave this out unless you have two textures with the same name in different spritesheets
 */

export class MakeFactory {
	texture(pAsset: string, pSheet: SpritesheetLike): Texture {
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

	sprite(pAsset: string, pSheet?: string | string[] | undefined): Sprite {
		let sprite: Sprite | undefined;
		sprite = new Sprite(this.texture(pAsset, pSheet));
		return sprite;
	}

	text(pText: string = ``, pStyle?: Partial<ITextStyle> | TextStyle): Text {
		let text: Text | undefined;
		text = new Text(pText, pStyle);
		return text;
	}

	bitmapText(pText: string = ``, pStyle?: IBitmapTextStyle): BitmapText {
		let bitmapText: BitmapText | undefined;
		bitmapText = new BitmapText(pText, pStyle);
		return bitmapText;
	}

	container(): Container {
		let container: Container | undefined;
		container = new Container();
		return container;
	}

	graphics(): Graphics {
		let graphics: Graphics | undefined;
		graphics = new Graphics();
		return graphics;
	}

	tiledSprite(pTexture: string, pSheet: string | string[] | undefined, pWidth: number, pHeight: number, pTilePosition?: ObservablePoint): TilingSprite {
		let tilingSprite: TilingSprite | undefined;
		tilingSprite = new TilingSprite(this.texture(pTexture, pSheet), pWidth, pHeight);
		if (pTilePosition) {
			tilingSprite.tilePosition = pTilePosition;
		}
		return tilingSprite;
	}

	mesh(pGeometry: Geometry, pShader: Shader, pState?: State, pDrawMode?: DRAW_MODES): Mesh<Shader> {
		let mesh: Mesh<Shader> | undefined;
		mesh = new Mesh<Shader>(pGeometry, pShader, pState, pDrawMode);
		return mesh;
	}

	simpleRope(pTexture: string, pSheet: string | string[] | undefined, pPoints: (Point | ObservablePoint)[], pAutoUpdate?: boolean): SimpleRope {
		let simpleRope: SimpleRope | undefined;
		simpleRope = new SimpleRope(this.texture(pTexture, pSheet), pPoints);
		simpleRope.autoUpdate = pAutoUpdate !== false;
		return simpleRope;
	}

	simplePlane(pTexture: string, pSheet: string | string[] | undefined, pVertsWidth: number, pVertsHeight: number): SimplePlane {
		let simplePlane: SimplePlane | undefined;
		simplePlane = new SimplePlane(this.texture(pTexture, pSheet), pVertsWidth, pVertsHeight);
		return simplePlane;
	}

	simpleMesh(pTexture: string, pSheet: string | string[] | undefined, pVertices?: Float32Array, pUvs?: Float32Array, pIndices?: Uint16Array, pDrawMode?: number): SimpleMesh {
		let simpleMesh: SimpleMesh | undefined;
		simpleMesh = new SimpleMesh(this.texture(pTexture, pSheet), pVertices, pUvs, pIndices, pDrawMode);
		return simpleMesh;
	}
}
