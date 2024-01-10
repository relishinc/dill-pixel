import { OutlineFilter } from '@pixi/filter-outline';
import { FederatedPointerEvent, IPoint, Point } from 'pixi.js';
import { Container } from '../gameobjects';
import { IFocusable } from './IFocusable';
import { ISelectable } from './ISelectable';
/**
 * Selectable
 */
export declare abstract class Selectable extends Container implements ISelectable, IFocusable {
    readonly onSelected: ((p: ISelectable) => void)[];
    readonly onDeselected: ((p: ISelectable) => void)[];
    protected _isSelected: boolean;
    protected _visuals: Container;
    protected _eventData: FederatedPointerEvent | undefined;
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
    getFocusPosition(): Point;
    /**
     * Gets focus size
     * @returns PIXI.Point
     */
    getFocusSize(): IPoint;
    protected removeEventListeners(): void;
    protected addEventListeners(): void;
    protected setHitArea(): void;
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
    protected onPointerDown(pEvent: FederatedPointerEvent): void;
    /**
     * onPointerUp
     */
    protected onPointerUp(pEvent: FederatedPointerEvent): void;
    /**
     * onPointerUpOutside
     */
    protected onPointerUpOutside(_event: FederatedPointerEvent): void;
    /**
     * onPointerOut
     */
    protected onPointerOut(): void;
}
//# sourceMappingURL=Selectable.d.ts.map