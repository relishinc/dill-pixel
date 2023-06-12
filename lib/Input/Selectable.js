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
exports.Selectable = void 0;
const filter_outline_1 = require("@pixi/filter-outline");
const PIXI = __importStar(require("pixi.js"));
const AudioCategory = __importStar(require("../Audio/AudioCategory"));
const Audio_1 = require("../Audio");
const Topics = __importStar(require("../Data/Topics"));
const InputUtils = __importStar(require("../Input/InputUtils"));
const PixiUtils = __importStar(require("../Utils/PixiUtils"));
const RectUtils = __importStar(require("../Utils/RectUtils"));
/**
 * Selectable
 */
class Selectable extends PIXI.Container {
    constructor() {
        super();
        this._isFocussed = false;
        this._isSelected = false;
        this._visuals = new PIXI.Container();
        this.addChild(this._visuals);
        this._outlineFilter = new filter_outline_1.OutlineFilter();
        if (PIXI.settings.FILTER_RESOLUTION !== undefined) {
            this._outlineFilter.resolution = PIXI.settings.FILTER_RESOLUTION;
        }
        this._outlineFilter.uniforms.thickness = [0.025, 0.025];
        this._outlineFilter.uniforms.outlineColor = [70 / 255, 130 / 255, 210 / 255, 1];
        this._outlineFilter.uniforms.filterClamp = [0, 0, 1, 1];
        this.onSelected = [];
        this.onDeselected = [];
        this.on(InputUtils.Events.POINTER_OVER, this.onPointerOver);
        this.on(InputUtils.Events.POINTER_DOWN, this.onPointerDown);
        this.on(InputUtils.Events.POINTER_UP, this.onPointerUp);
        this.on(InputUtils.Events.POINTER_UP_OUTSIDE, this.onPointerUpOutside);
        this.on(InputUtils.Events.POINTER_OUT, this.onPointerOut);
        this.interactive = true;
        this.cursor = "pointer";
        this.hitArea = new PIXI.Rectangle(-25, -25, 50, 50);
    }
    /**
     * Gets whether is selected
     */
    get isSelected() {
        return this._isSelected;
    }
    /**
     * Selects selectable
     */
    select() {
        this._isSelected = true;
        this._visuals.filters = [this._outlineFilter];
        for (let i = 0; i < this.onSelected.length; ++i) {
            this.onSelected[i](this);
        }
    }
    /**
     * Deselects selectable
     */
    deselect() {
        this._isSelected = false;
        this._visuals.filters = [];
        for (let i = 0; i < this.onDeselected.length; ++i) {
            this.onDeselected[i](this);
        }
    }
    /**
     * Toggles selected
     */
    toggleSelected() {
        if (this.isSelected) {
            this.deselect();
        }
        else {
            this.select();
        }
    }
    /**
     * onFocusBegin
     */
    onFocusBegin() {
        this.playHoverVo();
    }
    /**
     * onFocusEnd
     */
    onFocusEnd() {
        // unused
    }
    /**
     * onFocusActivated
     */
    onFocusActivated() {
        this.toggleSelected();
        this.playClickedSFX();
    }
    /**
     * Gets focus position
     * @returns PIXI.Point
     */
    getFocusPosition() {
        if (this.hitArea instanceof PIXI.Rectangle) {
            return new PIXI.Point().copyFrom(this.toGlobal(RectUtils.center(this.hitArea)));
        }
        else {
            return this.getGlobalPosition();
        }
    }
    /**
     * Gets focus size
     * @returns PIXI.Point
     */
    getFocusSize() {
        let bounds;
        if (this.hitArea instanceof PIXI.Rectangle) {
            bounds = PixiUtils.getGlobalBounds(this, this.hitArea.clone());
        }
        else {
            bounds = PixiUtils.getGlobalBounds(this);
        }
        return RectUtils.size(bounds);
    }
    /**
     * Plays hover vo
     */
    playHoverVo() {
        if (this._hoverVo !== undefined) {
            PubSub.publishSync(Topics.PLAY_AUDIO, new Audio_1.AudioToken(this._hoverVo, 1, false, AudioCategory.VO.toString()));
        }
    }
    /**
     * playClickedSFX
     */
    playClickedSFX() {
        if (this._clickedSfx !== undefined) {
            PubSub.publishSync(Topics.PLAY_AUDIO, new Audio_1.AudioToken(this._clickedSfx, 1, false, AudioCategory.SFX.toString()));
        }
    }
    /**
     * onPointerOver
     */
    onPointerOver() {
        this._visuals.scale.set(1.05);
        this.playHoverVo();
    }
    /**
     * onPointerDown
     */
    onPointerDown(pEvent) {
        this._eventData = pEvent;
        this._visuals.scale.set(0.95);
    }
    /**
     * onPointerUp
     */
    onPointerUp(pEvent) {
        if (this._eventData !== undefined && this._eventData.pointerId === pEvent.pointerId) {
            this.toggleSelected();
            this._eventData = undefined;
            this._visuals.scale.set(1.05);
            this.playClickedSFX();
        }
    }
    /**
     * onPointerUpOutside
     */
    onPointerUpOutside(pEvent) {
        this._eventData = undefined;
    }
    /**
     * onPointerOut
     */
    onPointerOut() {
        this._visuals.scale.set(1.0);
    }
}
exports.Selectable = Selectable;
//# sourceMappingURL=Selectable.js.map