import { OutlineFilter } from "@pixi/filter-outline";
import * as PIXI from "pixi.js";
import { IFocusable } from "./IFocusable";
import { ISelectable } from "./ISelectable";
/**
 * Selectable
 */
export declare abstract class Selectable extends PIXI.Container implements ISelectable, IFocusable {
    readonly onSelected: ((p: ISelectable) => void)[];
    readonly onDeselected: ((p: ISelectable) => void)[];
    protected _isSelected: boolean;
    protected _visuals: PIXI.Container;
    protected _eventData: PIXI.FederatedPointerEvent | undefined;
    protected _outlineFilter: OutlineFilter;
    protected _isFocussed: boolean;
    protected _hoverVo: string | undefined;
    protected _clickedSfx: string | undefined;
    protected constructor();
    /**
     * Gets whether is selected
     */
    get isSelected(): boolean;
    /**
     * Selects selectable
     */
    select(): void;
    /**
     * Deselects selectable
     */
    deselect(): void;
    /**
     * Toggles selected
     */
    toggleSelected(): void;
    /**
     * onFocusBegin
     */
    onFocusBegin(): void;
    /**
     * onFocusEnd
     */
    onFocusEnd(): void;
    /**
     * onFocusActivated
     */
    onFocusActivated(): void;
    /**
     * Gets focus position
     * @returns PIXI.Point
     */
    getFocusPosition(): PIXI.Point;
    /**
     * Gets focus size
     * @returns PIXI.Point
     */
    getFocusSize(): PIXI.IPoint;
    /**
     * Plays hover vo
     */
    protected playHoverVo(): void;
    /**
     * playClickedSFX
     */
    protected playClickedSFX(): void;
    /**
     * onPointerOver
     */
    protected onPointerOver(): void;
    /**
     * onPointerDown
     */
    protected onPointerDown(pEvent: PIXI.FederatedPointerEvent): void;
    /**
     * onPointerUp
     */
    protected onPointerUp(pEvent: PIXI.FederatedPointerEvent): void;
    /**
     * onPointerUpOutside
     */
    protected onPointerUpOutside(pEvent: PIXI.FederatedPointerEvent): void;
    /**
     * onPointerOut
     */
    protected onPointerOut(): void;
}
//# sourceMappingURL=Selectable.d.ts.map