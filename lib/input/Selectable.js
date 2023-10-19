import { OutlineFilter } from '@pixi/filter-outline';
import { Container, Point, Rectangle, settings as pixiSettings } from 'pixi.js';
import { AudioToken } from '../audio';
import * as AudioCategory from '../audio/AudioCategory';
import { playAudio } from '../signals';
import * as PixiUtils from '../utils/PixiUtils';
import * as RectUtils from '../utils/RectUtils';
/**
 * Selectable
 */
export class Selectable extends Container {
    constructor() {
        super();
        this._isFocussed = false;
        this._isSelected = false;
        this._visuals = new Container();
        this.addChild(this._visuals);
        this._outlineFilter = new OutlineFilter();
        if (pixiSettings.FILTER_RESOLUTION !== undefined) {
            this._outlineFilter.resolution = pixiSettings.FILTER_RESOLUTION;
        }
        this._outlineFilter.uniforms.thickness = [0.025, 0.025];
        this._outlineFilter.uniforms.outlineColor = [70 / 255, 130 / 255, 210 / 255, 1];
        this._outlineFilter.uniforms.filterClamp = [0, 0, 1, 1];
        this.onSelected = [];
        this.onDeselected = [];
        this.on('pointerover', this.onPointerOver);
        this.on('pointerdown', this.onPointerDown);
        this.on('pointerup', this.onPointerUp);
        this.on('pointerupoutside', this.onPointerUpOutside);
        this.on('pointerout', this.onPointerOut);
        this.interactive = true;
        this.cursor = 'pointer';
        this.hitArea = new Rectangle(-25, -25, 50, 50);
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
        if (this.hitArea instanceof Rectangle) {
            return new Point().copyFrom(this.toGlobal(RectUtils.center(this.hitArea)));
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
        if (this.hitArea instanceof Rectangle) {
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
            playAudio(new AudioToken(this._hoverVo, 1, false, AudioCategory.VO.toString()));
        }
    }
    /**
     * playClickedSFX
     */
    playClickedSFX() {
        if (this._clickedSfx !== undefined) {
            playAudio(new AudioToken(this._clickedSfx, 1, false, AudioCategory.SFX.toString()));
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
    onPointerUpOutside(_event) {
        this._eventData = undefined;
    }
    /**
     * onPointerOut
     */
    onPointerOut() {
        this._visuals.scale.set(1.0);
    }
}
//# sourceMappingURL=Selectable.js.map