import { Container as PIXIContainer, DisplayObject, Graphics, Rectangle } from 'pixi.js';
import { Container } from '../gameobjects';
import { PointLike } from '../utils';
export type UICanvasEdge = 'top right' | 'top left' | 'top center' | 'top' | 'bottom right' | 'bottom left' | 'bottom center' | 'bottom' | 'left top' | 'left bottom' | 'left center' | 'left' | 'right top' | 'right bottom' | 'right center' | 'right' | 'center';
export interface UICanvasChildSettings {
    align: UICanvasEdge;
    padding: number;
}
export type UICanvasSettings = {
    debug: boolean;
    padding: UICanvasPadding;
    size: PointLike;
    isBoundToStage: boolean;
};
export type UICanvasProps = {
    debug: boolean;
    padding: Partial<UICanvasPadding> | {
        x: number;
        y: number;
    } | number;
    size?: PointLike;
};
export type UICanvasPadding = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
export declare class UICanvas extends Container {
    protected _outerBounds: Rectangle;
    protected _displayBounds: Rectangle;
    protected settingsMap: Map<PIXIContainer<DisplayObject>, UICanvasChildSettings>;
    protected _settings: UICanvasSettings;
    protected _childMap: Map<PIXIContainer<DisplayObject>, PIXIContainer<DisplayObject>>;
    protected _canvasChildren: DisplayObject[];
    protected _debugGraphics: Graphics;
    private _reparentAddedChild;
    private _disableAddChildError;
    constructor(settings?: Partial<UICanvasProps>);
    get canvasChildren(): DisplayObject[];
    get bounds(): import("pixi.js").Bounds;
    set size(value: PointLike);
    set padding(value: Partial<UICanvasPadding> | {
        x: number;
        y: number;
    } | number);
    onResize(): void;
    update(): void;
    addChild<U extends DisplayObject[]>(...children: DisplayObject[]): U[0];
    /**
     * Removes a child from the container at the specified index
     * Override because we need to remove from the inner container
     * @param {number} index
     * @returns {DisplayObject}
     */
    removeChildAt(index: number): DisplayObject;
    /**
     * Removes all the children from the container
     * Override because we need to ensure it returns the proper re-parented children
     * @returns {DisplayObject[]}
     */
    removeChildren(): DisplayObject[];
    /**
     * Removes one or more children from the container
     * Override because we need to ensure it returns the proper re-parented children
     * @param {DisplayObject} children
     * @returns {DisplayObject}
     */
    removeChild(...children: DisplayObject[]): DisplayObject;
    /**
     * Adds a child to the container at the specified index
     * Override because we need to ensure it sets the child index properly
     * @param {DisplayObject} child
     * @param {number} index
     * @returns {U}
     */
    addChildAt<U extends DisplayObject = DisplayObject>(child: DisplayObject, index: number): U;
    /**
     * Sets the index of the child in the container
     * Override because we need to ensure it targets the parent container that we added
     * @param {DisplayObject} child
     * @param {number} index
     * @returns {U}
     */
    setChildIndex(child: DisplayObject, index: number): void;
    /**
     * Gets the index of a child in the container
     * Override because we need to ensure it targets the parent container that we added
     * @param {DisplayObject} child
     * @param {number} index
     * @returns {U}
     */
    getChildIndex(child: DisplayObject): number;
    /**
     * Gets the child at the specified index
     * Override due to re-parenting
     * @param {number} index
     * @returns {DisplayObject}
     */
    getChildAt(index: number): DisplayObject;
    layout(): void;
    addElement<U extends PIXIContainer = PIXIContainer>(child: PIXIContainer, settings?: Partial<UICanvasChildSettings>): U;
    reAlign(child: PIXIContainer<DisplayObject>, settings: Partial<UICanvasChildSettings> | UICanvasEdge): void;
    protected setPosition(): void;
    protected __calculateBounds(_size: PointLike): Rectangle;
    protected __calculateOuterBounds(_size: PointLike): Rectangle;
    protected handleChildRemoved(child: any): void;
    /**
     * Sorts the children in the container
     * Needed because we need to ensure re-parented children are sorted by their actual index in the container
     * @protected
     */
    protected setCanvasChildren(): void;
    /**
     * Ensure we don't leave empty containers after setting child indices or adding / removing children
     * @protected
     */
    protected cleanup(): void;
    private applySettings;
    private drawDebug;
}
//# sourceMappingURL=UICanvas.d.ts.map