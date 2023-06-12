import * as PIXI from "pixi.js";
/**
 * eNum Events
 */
export var Events;
(function (Events) {
    Events["CLICK"] = "click";
    Events["MOUSE_DOWN"] = "mousedown";
    Events["MOUSE_MOVE"] = "mousemove";
    Events["MOUSE_OUT"] = "mouseout";
    Events["MOUSE_OVER"] = "mouseover";
    Events["MOUSE_UP"] = "mouseup";
    Events["MOUSE_UP_OUTSIDE"] = "mouseupoutside";
    Events["POINTER_CANCEL"] = "pointercancel";
    Events["POINTER_DOWN"] = "pointerdown";
    Events["POINTER_MOVE"] = "pointermove";
    Events["POINTER_OUT"] = "pointerout";
    Events["POINTER_OVER"] = "pointerover";
    Events["POINTER_TAP"] = "pointertap";
    Events["POINTER_UP"] = "pointerup";
    Events["POINTER_UP_OUTSIDE"] = "pointerupoutside";
    Events["RIGHT_CLICK"] = "rightclick";
    Events["RIGHT_DOWN"] = "rightdown";
    Events["RIGHT_UP"] = "rightup";
    Events["RIGHT_UP_OUTSIDE"] = "rightupoutside";
    Events["TAP"] = "tap";
    Events["TOUCH_CANCEL"] = "touchcancel";
    Events["TOUCH_END"] = "touchend";
    Events["TOUCH_END_OUTSIDE"] = "touchendoutside";
    Events["TOUCH_MOVE"] = "touchmove";
    Events["TOUCH_START"] = "touchstart";
    Events["FOCUS"] = "focus";
    Events["BLUR"] = "blur";
    Events["KEY_DOWN"] = "keydown";
    Events["KEY_PRESS"] = "keypress";
    Events["KEY_UP"] = "keyup";
})(Events || (Events = {}));
/**
 * Hits area from sprite
 * @param pSprite
 * @returns area from sprite
 */
export function hitAreaFromSprite(pSprite) {
    return new PIXI.Rectangle(pSprite.width * -pSprite.anchor.x, pSprite.height * -pSprite.anchor.y, pSprite.width, pSprite.height);
}
//# sourceMappingURL=InputUtils.js.map