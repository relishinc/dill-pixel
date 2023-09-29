import {OutlineFilter} from '@pixi/filter-outline';
import {Container, FederatedPointerEvent, IPoint, Point, Rectangle, settings as pixiSettings} from 'pixi.js';
import {AudioToken} from '../Audio';
import * as AudioCategory from '../Audio/AudioCategory';
import {playAudio} from '../Signals';
import * as PixiUtils from '../Utils/PixiUtils';
import * as RectUtils from '../Utils/RectUtils';
import {IFocusable} from './IFocusable';
import {ISelectable} from './ISelectable';

/**
 * Selectable
 */
export abstract class Selectable extends Container implements ISelectable, IFocusable {
  public readonly onSelected: ((p: ISelectable) => void)[];
  public readonly onDeselected: ((p: ISelectable) => void)[];

  protected _isSelected: boolean;
  protected _visuals: Container;
  protected _eventData: FederatedPointerEvent | undefined;
  protected _outlineFilter: OutlineFilter;
  protected _isFocussed: boolean;
  protected _hoverVo: string | undefined;
  protected _clickedSfx: string | undefined;

  protected constructor() {
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
  public getFocusPosition(): Point {
    if (this.hitArea instanceof Rectangle) {
      return new Point().copyFrom(this.toGlobal(RectUtils.center(this.hitArea)));
    } else {
      return this.getGlobalPosition();
    }
  }

  /**
   * Gets focus size
   * @returns PIXI.Point
   */
  public getFocusSize(): IPoint {
    let bounds: Rectangle;
    if (this.hitArea instanceof Rectangle) {
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
      playAudio(new AudioToken(this._hoverVo, 1, false, AudioCategory.VO.toString()));
    }
  }

  /**
   * playClickedSFX
   */
  protected playClickedSFX(): void {
    if (this._clickedSfx !== undefined) {
      playAudio(new AudioToken(this._clickedSfx, 1, false, AudioCategory.SFX.toString()));
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
  protected onPointerDown(pEvent: FederatedPointerEvent): void {
    this._eventData = pEvent;
    this._visuals.scale.set(0.95);
  }

  /**
   * onPointerUp
   */
  protected onPointerUp(pEvent: FederatedPointerEvent): void {
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
  protected onPointerUpOutside(pEvent: FederatedPointerEvent): void {
    this._eventData = undefined;
  }

  /**
   * onPointerOut
   */
  protected onPointerOut(): void {
    this._visuals.scale.set(1.0);
  }
}
