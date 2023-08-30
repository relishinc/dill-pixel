import {Spine} from "@pixi-spine/runtime-4.1";
import {
	Assets,
	BitmapText,
	Circle,
	Container,
	DisplayObject,
	Ellipse,
	IHitArea,
	Point,
	Polygon,
	Rectangle,
	Resource,
	RoundedRectangle,
	Sprite,
	Texture
} from "pixi.js";

import * as PointUtils from "../Utils/PointUtils";

export type PixiSimpleShape = Rectangle | Circle | Ellipse | RoundedRectangle;
export type PixiShape = PixiSimpleShape | Polygon;

// TODO:SH: Look into a better solution for this
/**
 * Clone Hit Area
 * @param pHitArea
 */
export function cloneHitArea(pHitArea: IHitArea): IHitArea | undefined {
	if (
		pHitArea instanceof Rectangle ||
		pHitArea instanceof Circle ||
		pHitArea instanceof Ellipse ||
		pHitArea instanceof Polygon ||
		pHitArea instanceof RoundedRectangle
	) {
		return pHitArea.clone();
	} else {
		console.log("PixiUtils.cloneHitArea: Clone failed. Can only clone PIXI geometry primitives");
		return undefined;
	}
}

// TODO:SH: Find more descriptive names for these functions
// TODO:SH: Look at: https://github.com/pixijs/js/wiki/v4-Gotchas for possible optimization

/**
 * Reassigns the displays object parent while maintaing it's world position
 * @todo SH: Look at: https://github.com/pixijs/js/wiki/v4-Gotchas for possible optimization
 * @param pChild
 * @param pParent
 */
export function setParent(pChild: DisplayObject, pParent: Container): void {
	pChild.parent.worldTransform.apply(pChild.position as Point, pChild.position as Point);
	pParent.worldTransform.applyInverse(pChild.position as Point, pChild.position as Point);
	pChild.parent.removeChild(pChild);
	pParent.addChild(pChild);
}

/**
 *
 * @param pObject
 * @param pAnchor
 */
export function setAnchor(pObject: Sprite, pAnchor: Point): void {
	PointUtils.addToPoint(pObject.position, new Point(
		(pAnchor.x - pObject.anchor.x) * pObject.width,
		(pAnchor.y - pObject.anchor.y) * pObject.height,
	));
	pObject.anchor.copyFrom(pAnchor);
}

/**
 *
 * @param pObject
 */
export function objectDiagonal(pObject: Container): number {
	return Math.sqrt(pObject.width * pObject.width + pObject.height * pObject.height);
}

/**
 * Removes provided object from its parent and re-adds it.
 * @param pObject The object to send to the back.
 */
export function sendToFront(pObject: Container): void {
	const parent: Container = pObject.parent;
	parent.removeChild(pObject);
	parent.addChild(pObject);
}

/**
 * Removes provided object from its parent and re-adds it at index 0.
 * @param pObject The object to send to the back.
 */
export function sendToBack(pObject: Container): void {
	const parent: Container = pObject.parent;
	parent.removeChild(pObject);
	parent.addChildAt(pObject, 0);
}

/**
 *
 * @param pShape
 * @param pDelta
 */
export function offsetShape(pShape: PixiShape, pDelta: Point): PixiShape {
	if (pShape instanceof Polygon) {
		for (let i = 0; i < pShape.points.length; i += 2) {
			pShape.points[i] += pDelta.x;
			pShape.points[i + 1] += pDelta.y;
		}
		return pShape;
	} else {
		pShape.x += pDelta.x;
		pShape.y += pDelta.y;
		return pShape;
	}
}

/**
 *
 * @param pShape
 * @param pDelta
 */
export function offsetSimpleShape(pShape: PixiSimpleShape, pDelta: Point): PixiSimpleShape {
	pShape.x += pDelta.x;
	pShape.y += pDelta.y;
	return pShape;
}

/**
 * Creates and returns a `Sprite` object.
 * This uses {@link getTexture} internally
 * @param pAsset The asset of the sprite to create.
 * @param pSheet (optional) The spritesheet(s) that the texture is in. You can leave this out unless you have two textures with the same name in different spritesheets
 */
export function makeSprite(pAsset: string, pSheet?: string | string[]): Sprite {
	let sprite: Sprite | undefined;
	sprite = new Sprite(getTexture(pAsset, pSheet));
	sprite.anchor.set(0.5);
	return sprite;
}

/**
 * Gets a `Texture` asset.
 * @param pAsset The name of the texture to get.
 * @param pSheet (optional) The spritesheet(s) that the texture is in. You can leave this out unless you have two textures with the same name in different spritesheets
 */
export function getTexture(pAsset: string, pSheet?: string | string[]): Texture {
	let texture: Texture<Resource> | undefined;

	if (pSheet === undefined || pSheet.length === 0) {
		if (Assets.cache.has(pAsset)) {
			texture = Assets.cache.get(pAsset)!;
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

/**
 * Creates and returns a `BitmapText` object.
 * @param pText The text to display.
 * @param pFont The font to use.
 * @param pSize The size of the font.
 * @param pColour The colour of the font.
 * @default pColour 0x000000
 */
export function makeText(pText: string, pFont: string, pSize: number, pColour: number = 0x000000): BitmapText {
	const text = new BitmapText(pText, {
		fontName: pFont,
		fontSize: pSize,
		align: "center",
		tint: pColour,
	});

	text.anchor.set(0.5);
	return text;
}

/**
 * Standard tracks for spine characters.
 */
export enum SpineTrack {
	Body,
	Eyes,
	Mouth,
	NumElements,
}

/**
 * Creates and returns a `spine.Spine` object.
 * @param pName The name of the spine file.
 */
export function makeSpine(pName: string): Spine {
	let spine: Spine;
	spine = new Spine(Assets.get(pName).spineData!);
	spine.skeleton.setToSetupPose();
	spine.update(0);
	spine.autoUpdate = false;
	return spine;
}

/**
 * Calculates bounding box in global coordinate space
 * @param pTarget - local coordinate space
 * @param pRect - optional rectangle in local coordinate space, defaults to pTarget.getLocalBounds()
 */
export function getGlobalBounds(pTarget: DisplayObject, pRect?: Rectangle): Rectangle {
	const bounds = pRect || pTarget.getLocalBounds();
	let minX = Number.MAX_VALUE;
	let minY = Number.MAX_VALUE;
	let maxX = Number.MIN_VALUE;
	let maxY = Number.MIN_VALUE;
	const localPoint = new Point();
	const globalPoint = new Point();
	for (let i = 0; i < 2; i++) {
		for (let j = 0; j < 2; j++) {
			localPoint.x = bounds.x + i * bounds.width;
			localPoint.y = bounds.y + j * bounds.height;
			pTarget.toGlobal(localPoint, globalPoint, i > 0);
			minX = Math.min(minX, globalPoint.x);
			minY = Math.min(minY, globalPoint.y);
			maxX = Math.max(maxX, globalPoint.x);
			maxY = Math.max(maxY, globalPoint.y);
		}
	}
	bounds.x = minX;
	bounds.y = minY;
	bounds.width = maxX - minX;
	bounds.height = maxY - minY;
	return bounds;
}

export function scaleUniform(obj: any, scaleNum: number, scaleProp: "width" | "height" = "width") {
	const scaleVal: "x" | "y" = scaleProp === "width" ? "y" : "x";
	const otherScaleVal: "x" | "y" = scaleProp === "width" ? "x" : "y";
	obj[scaleProp] = scaleNum;
	obj.scale[scaleVal] = obj.scale[otherScaleVal]
}

export function scaleToWidth(obj: Container, width: number) {
	scaleUniform(obj, width, "width")
}

export function scaleToHeight(obj: Container, height: number) {
	scaleUniform(obj, height, "height")
}
