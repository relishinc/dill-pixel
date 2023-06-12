"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hitAreaFromSprite = exports.Events = void 0;
const PIXI = __importStar(require("pixi.js"));
/**
 * eNum Events
 */
var Events;
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
})(Events = exports.Events || (exports.Events = {}));
/**
 * Hits area from sprite
 * @param pSprite
 * @returns area from sprite
 */
function hitAreaFromSprite(pSprite) {
    return new PIXI.Rectangle(pSprite.width * -pSprite.anchor.x, pSprite.height * -pSprite.anchor.y, pSprite.width, pSprite.height);
}
exports.hitAreaFromSprite = hitAreaFromSprite;
//# sourceMappingURL=InputUtils.js.map