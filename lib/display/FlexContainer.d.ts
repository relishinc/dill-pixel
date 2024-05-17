import { DestroyOptions } from 'pixi.js';
import { Application } from '../core/Application';
import { PIXIContainer } from '../pixi';
import { Signal } from '../signals';
import { ContainerLike, PointLike } from '../utils/types';
declare const _FlexContainer: (new () => import("../mixins/factory").IFactoryContainer<{
    existing: <TEntity>(entity: TEntity, props?: Partial<import("src/mixins/factory/props").ExistingProps> | undefined) => TEntity;
    texture: typeof import("src/mixins/factory/utils").resolveTexture;
    container: (props?: Partial<import("src/mixins/factory/props").ContainerProps> | undefined) => import("src").Container<Application<import("pixi.js").Renderer>>;
    sprite: (props?: Partial<import("src/mixins/factory/props").SpriteProps> | undefined) => import("pixi.js").Sprite;
    graphics: (props?: Partial<import("src/mixins/factory/props").GraphicsProps> | undefined) => import("pixi.js").Graphics;
    text: (props?: Partial<import("src/mixins/factory/props").TextProps> | undefined) => import("pixi.js").Text;
    bitmapText: (props?: Partial<import("src/mixins/factory/props").TextProps> | undefined) => import("pixi.js").BitmapText;
    button: (props?: Partial<import("src/mixins/factory/props").ButtonProps> | undefined) => import("src").Button;
    flexContainer: (props?: Partial<import("src/mixins/factory/props").FlexContainerProps> | undefined) => FlexContainer<Application<import("pixi.js").Renderer>>;
    uiCanvas: (props?: Partial<import("src/mixins/factory/props").UICanvasFactoryProps> | undefined) => import("src").UICanvas<Application<import("pixi.js").Renderer>>;
    spine: (props?: Partial<import("src/mixins/factory/props").SpineProps> | undefined) => import("src/plugins/spine/pixi-spine").Spine;
    spineAnimation: (props?: Partial<import("src/mixins/factory/props").SpineProps> | undefined) => import("src").ISpineAnimation;
}>) & import("../utils/types").Constructor<import("../mixins/signals").ISignalContainer>;
export interface FlexContainerConfig {
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
export declare const FlexContainerConfigKeys: (keyof FlexContainerConfig)[];
export interface IFlexContainer {
    onLayoutComplete: Signal<() => void>;
    debug: boolean;
    config: FlexContainerConfig;
    removeChildren<U extends PIXIContainer>(): U[];
    removeChildAt<U extends PIXIContainer>(index: number): U;
    addChildAt<U extends PIXIContainer>(child: U, index: number): U;
    setChildIndex<U extends PIXIContainer>(child: U, index: number): void;
    getChildIndex<U extends PIXIContainer>(child: U): number;
    getChildAt<U extends PIXIContainer>(index: number): U;
    setFlexChildren(): void;
    cleanup(): void;
    handleChildAdded(child: any): void;
    deleteChild(child: PIXIContainer): boolean;
    layout(): void;
    added(): void;
}
export type FlexWrap = 'wrap' | 'nowrap';
export type FlexDirection = 'row' | 'column';
export type AlignItems = 'center' | 'flex-start' | 'flex-end';
export type JustifyContent = 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end';
export declare class FlexContainer<T extends Application = Application> extends _FlexContainer {
    onLayoutComplete: Signal<() => void>;
    debug: boolean;
    config: FlexContainerConfig;
    protected paddingLeft: number;
    protected paddingRight: number;
    protected paddingTop: number;
    protected paddingBottom: number;
    protected _childMap: Map<PIXIContainer<import("pixi.js").ContainerChild>, PIXIContainer<import("pixi.js").ContainerChild>>;
    private _reparentAddedChild;
    constructor(config?: Partial<FlexContainerConfig>);
    protected _flexChildren: PIXIContainer[];
    get flexChildren(): PIXIContainer<import("pixi.js").ContainerChild>[];
    get gap(): number;
    set gap(value: number);
    get flexWrap(): FlexWrap;
    set flexWrap(value: FlexWrap);
    get flexDirection(): FlexDirection;
    set flexDirection(value: FlexDirection);
    get alignItems(): AlignItems;
    set alignItems(value: AlignItems);
    get justifyContent(): JustifyContent;
    set justifyContent(value: JustifyContent);
    get containerHeight(): number;
    set containerHeight(value: number);
    get containerWidth(): number;
    set containerWidth(value: number);
    get size(): {
        width: number;
        height: number;
    };
    set size(size: PointLike);
    /**
     * Get the application instance.
     */
    get app(): T;
    /**
     * Removes all the children from the container
     * Override because we need to ensure it returns the proper re-parented children
     */
    removeChildren: <U extends PIXIContainer<import("pixi.js").ContainerChild>>() => U[];
    /**
     * Removes a child from the container at the specified index
     * Override because we need to remove from the inner container
     */
    removeChildAt: <U extends PIXIContainer<import("pixi.js").ContainerChild>>(index: number) => U;
    /**
     * Adds a child to the container at the specified index
     * Override because we need to ensure it sets the child index properly
     */
    addChildAt: <U extends PIXIContainer<import("pixi.js").ContainerChild>>(child: U, index: number) => U;
    /**
     * Sets the index of the child in the container
     * Override because we need to ensure it targets the parent container that we added
     */
    setChildIndex: <U extends PIXIContainer<import("pixi.js").ContainerChild>>(child: U, index: number) => void;
    /**
     * Gets the index of a child in the container
     * Override because we need to ensure it targets the parent container that we added
     * @param {DisplayObject} child
     * @param {number} index
     * @returns {U}
     */
    getChildIndex: <U extends PIXIContainer<import("pixi.js").ContainerChild>>(child: U) => number;
    /**
     * Gets the child at the specified index
     * Override due to re-parenting
     */
    getChildAt: <U extends PIXIContainer<import("pixi.js").ContainerChild>>(index: number) => U;
    destroy(_options?: DestroyOptions | boolean): void;
    /**
     * Removes one or more children from the container
     * Override because we need to ensure it returns the proper re-parented children
     * @param children
     */
    removeChild(...children: PIXIContainer[]): PIXIContainer;
    /**
     * Public method to manually trigger a layout
     */
    layout(): void;
    resize(): void;
    update(): void;
    added(): void;
    /**
     * Ensures we delete the child from the map when it's removed
     * @protected
     */
    protected handleChildRemoved(child: PIXIContainer): void;
    /**
     * Deletes a child from the map
     * @param {PIXIContainer} child
     * @returns {boolean}
     * @protected
     */
    protected deleteChild(child: PIXIContainer): boolean;
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
    private _added;
}
export {};
