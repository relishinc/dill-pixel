import {OutlineFilter} from "@pixi/filter-outline";
import * as PIXI from "pixi.js";
import {AudioToken} from "../Audio";
import * as AudioCategory from "../Audio/AudioCategory";
import * as Topics from "../Data/Topics";
import * as InputUtils from "../Input/InputUtils";
import {broadcast} from "../Utils";
import * as PixiUtils from "../Utils/PixiUtils";
import * as RectUtils from "../Utils/RectUtils";
import {IFocusable} from "./IFocusable";
import {ISelectable} from "./ISelectable";

/**
 * Selectable
 */
export abstract class Selectable extends PIXI.Container implements ISelectable, IFocusable {
	public readonly onSelected: ((p: ISelectable) => void)[];
	public readonly onDeselected: ((p: ISelectable) => void)[];

	protected _isSelected: boolean;
	protected _visuals: PIXI.Container;
	protected _eventData: PIXI.FederatedPointerEvent | undefined;
	protected _outlineFilter: OutlineFilter;
	protected _isFocussed: boolean;
	protected _hoverVo: string | undefined;
	protected _clickedSfx: string | undefined;

	protected constructor() {
		super();

		this._isFocussed = false;
		this._isSelected = false;

		this._visuals = new PIXI.Container();
		this.addChild(this._visuals);

		this._outlineFilter = new OutlineFilter();

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
	public get isSelected(): boolean {
		return this._isSelected;
	}

	/**
	 * Selects selectable
	 */
	public select(): void {
		this._isSelected = true;
		this._visuals.filters = [this._outlineFilter];
		for (let i = 0; i < this.onSelected.length; ++i) {
			this.onSelected[i](this);
		}
	}

	/**
	 * Deselects selectable
	 */
	public deselect(): void {
		this._isSelected = false;
		this._visuals.filters = [];
		for (let i = 0; i < this.onDeselected.length; ++i) {
			this.onDeselected[i](this);
		}
	}

	/**
	 * Toggles selected
	 */
	public toggleSelected(): void {
		if (this.isSelected) {
			this.deselect();
		} else {
			this.select();
		}
	}

	/**
	 * onFocusBegin
	 */
	public onFocusBegin(): void {
		this.playHoverVo();
	}

	/**
	 * onFocusEnd
	 */
	public onFocusEnd(): void {
		// unused
	}

	/**
	 * onFocusActivated
	 */
	public onFocusActivated(): void {
		this.toggleSelected();
		this.playClickedSFX();
	}

	/**
	 * Gets focus position
	 * @returns PIXI.Point
	 */
	public getFocusPosition(): PIXI.Point {
		if (this.hitArea instanceof PIXI.Rectangle) {
			return new PIXI.Point().copyFrom(this.toGlobal(RectUtils.center(this.hitArea)));
		} else {
			return this.getGlobalPosition();
		}
	}

	/**
	 * Gets focus size
	 * @returns PIXI.Point
	 */
	public getFocusSize(): PIXI.IPoint {
		let bounds: PIXI.Rectangle;
		if (this.hitArea instanceof PIXI.Rectangle) {
			bounds = PixiUtils.getGlobalBounds(this, this.hitArea.clone());
		} else {
			bounds = PixiUtils.getGlobalBounds(this);
		}
		return RectUtils.size(bounds);
	}

	/**
	 * Plays hover vo
	 */
	protected playHoverVo(): void {
		if (this._hoverVo !== undefined) {
			broadcast(Topics.PLAY_AUDIO, new AudioToken(
				this._hoverVo, 1, false, AudioCategory.VO.toString(),
			));
		}
	}

	/**
	 * playClickedSFX
	 */
	protected playClickedSFX(): void {
		if (this._clickedSfx !== undefined) {
			broadcast(Topics.PLAY_AUDIO, new AudioToken(
				this._clickedSfx, 1, false, AudioCategory.SFX.toString(),
			));
		}
	}

	/**
	 * onPointerOver
	 */
	protected onPointerOver(): void {
		this._visuals.scale.set(1.05);
		this.playHoverVo();
	}

	/**
	 * onPointerDown
	 */
	protected onPointerDown(pEvent: PIXI.FederatedPointerEvent): void {
		this._eventData = pEvent;
		this._visuals.scale.set(0.95);
	}

	/**
	 * onPointerUp
	 */
	protected onPointerUp(pEvent: PIXI.FederatedPointerEvent): void {
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
	protected onPointerUpOutside(pEvent: PIXI.FederatedPointerEvent): void {
		this._eventData = undefined;
	}

	/**
	 * onPointerOut
	 */
	protected onPointerOut(): void {
		this._visuals.scale.set(1.0);
	}
}
