import {Rectangle, Sprite} from "pixi.js";

/**
 * eNum Events
 */
export enum Events {
	CLICK = "click",
	MOUSE_DOWN = "mousedown",
	MOUSE_MOVE = "mousemove",
	MOUSE_OUT = "mouseout",
	MOUSE_OVER = "mouseover",
	MOUSE_UP = "mouseup",
	MOUSE_UP_OUTSIDE = "mouseupoutside",
	POINTER_CANCEL = "pointercancel",
	POINTER_DOWN = "pointerdown",
	POINTER_MOVE = "pointermove",
	POINTER_OUT = "pointerout",
	POINTER_OVER = "pointerover",
	POINTER_TAP = "pointertap",
	POINTER_UP = "pointerup",
	POINTER_UP_OUTSIDE = "pointerupoutside",
	RIGHT_CLICK = "rightclick",
	RIGHT_DOWN = "rightdown",
	RIGHT_UP = "rightup",
	RIGHT_UP_OUTSIDE = "rightupoutside",
	TAP = "tap",
	TOUCH_CANCEL = "touchcancel",
	TOUCH_END = "touchend",
	TOUCH_END_OUTSIDE = "touchendoutside",
	TOUCH_MOVE = "touchmove",
	TOUCH_START = "touchstart",
	FOCUS = "focus",
	BLUR = "blur",
	KEY_DOWN = "keydown",
	KEY_PRESS = "keypress",
	KEY_UP = "keyup",
}

/**
 * Hits area from sprite
 * @param pSprite
 * @returns area from sprite
 */
export function hitAreaFromSprite(pSprite: Sprite): Rectangle {
	return new Rectangle(
		pSprite.width * -pSprite.anchor.x,
		pSprite.height * -pSprite.anchor.y,
		pSprite.width,
		pSprite.height,
	);
}
