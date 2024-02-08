import { Container as PIXIContainer, DisplayObject, IDestroyOptions, IPoint } from 'pixi.js';
import { Signal } from 'typed-signals';
import { Container } from '../gameobjects';
import { ContainerLike, PointLike } from '../utils';
export interface FlexContainerSettings {
    width: number;
    height: number;
    bindTo: ContainerLike;
    bindToAppSize: boolean;
    gap: number;
    flexWrap: 'wrap' | 'nowrap';
    flexDirection: 'row' | 'column';
    alignItems: 'center' | 'flex-start' | 'flex-end';
    justifyContent: 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end';
}
export declare class FlexContainer extends Container {
    onLayoutComplete: Signal<() => void>;
    debug: boolean;
    protected paddingLeft: number;
    protected paddingRight: number;
    protected paddingTop: number;
    protected paddingBottom: number;
    protected _settings: FlexContainerSettings;
    protected _childMap: Map<PIXIContainer<DisplayObject>, PIXIContainer<DisplayObject>>;
    protected _flexChildren: DisplayObject[];
    private _reparentAddedChild;
    constructor(settings?: Partial<FlexContainerSettings>);
    get gap(): number;
    set gap(value: number);
    get flexWrap(): 'wrap' | 'nowrap';
    set flexWrap(value: 'wrap' | 'nowrap');
    get flexDirection(): 'row' | 'column';
    set flexDirection(value: 'row' | 'column');
    get alignItems(): 'center' | 'flex-start' | 'flex-end';
    set alignItems(value: 'center' | 'flex-start' | 'flex-end');
    get justifyContent(): 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end';
    set justifyContent(value: 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end');
    get containerHeight(): number;
    set containerHeight(value: number);
    get containerWidth(): number;
    set containerWidth(value: number);
    get size(): {
        width: number;
        height: number;
    };
    set size(size: PointLike);
    get flexChildren(): DisplayObject[];
    destroy(_options?: IDestroyOptions | boolean): void;
    onResize(_size: IPoint): void;
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
    /**
     * Public method to manually trigger a layout
     */
    layout(): void;
    /**
     * Ensures we delete the child from the map when it's removed
     * @param {DisplayObject} child
     * @protected
     */
    protected handleChildRemoved(child: DisplayObject): void;
    /**
     * Deletes a child from the map
     * @param {DisplayObject} child
     * @returns {boolean}
     * @protected
     */
    protected deleteChild(child: DisplayObject): boolean;
    /**
     * Sorts the children in the container
     * Needed because we need to ensure re-parented children are sorted by their actual index in the container
     * @protected
     */
    protected setFlexChildren(): void;
    /**
     * Ensure we don't leave empty containers after setting child indices or adding / removing children
     * @protected
     */
    protected cleanup(): void;
    /**
     * Re-parent a child to account for e.g. sprite that are added with anchors
     * @param child
     * @protected
     */
    protected handleChildAdded(child: any): void;
    /**
     * Lay out the children according to the settings
     * Tries to follow the CSS Flexbox model as closely as possible
     * @private
     */
    private _layout;
}
//# sourceMappingURL=FlexContainer.d.ts.map