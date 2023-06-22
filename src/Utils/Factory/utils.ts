import {Texture} from "pixi.js";
import {SpritesheetLike} from "../Types";

export function resolveXYFromObjectOrArray(position: { x: number; y: number } | [number, number?] | number) {
	let x = 0;
	let y = 0;

	if (Array.isArray(position)) {
		x = position[0];
		y = position[1] || position[0];
	} else if (typeof position === 'object') {
		// cast as an object
		const obj = position as { x: number; y: number };
		x = obj.x || 0;
		y = obj.y || 0;
	} else {
		x = position;
		y = position;
	}

	return {x, y};
}

export function getSheetLikeString(pSheet: SpritesheetLike) {
	if (Array.isArray(pSheet)) {
		return pSheet.join("/");
	} else {
		return pSheet;
	}
}

export function setObjectName(object: any, pTexture: string | Texture, pSheet: SpritesheetLike) {
	if (pSheet && pTexture) {
		object.name = `${getSheetLikeString(pSheet)}/${pTexture}`
	} else if (typeof pTexture === 'string') {
		object.name = `${pTexture}`
	}
	if (typeof pTexture === "string") {
		object.__textureString = pTexture;
	}
	if (Array.isArray(pSheet)) {
		object.__textureSheetArray = pSheet;
	} else if (pSheet) {
		object.__textureSheet = pSheet;
	}
}
