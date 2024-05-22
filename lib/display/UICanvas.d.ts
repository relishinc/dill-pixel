import { Bounds, Container as PIXIContainer, Graphics, Rectangle } from 'pixi.js';
import { Application } from '../core/Application';
import { Padding, PointLike, Size, SizeLike } from '../utils/types';
import { Container } from './Container';
import { FlexContainer } from './FlexContainer';

export type UICanvasEdge = 'top right' | 'top left' | 'top center' | 'top' | 'bottom right' | 'bottom left' | 'bottom center' | 'bottom' | 'left top' | 'left bottom' | 'left center' | 'left' | 'right top' | 'right bottom' | 'right center' | 'right' | 'center';
export interface UICanvasChildSettings {
    align: UICanvasEdge;
    padding: Padding;
}
export interface UICanvasChildProps {
    align: UICanvasEdge;
    padding: Partial<Padding> | PointLike;
}
export type UICanvasConfig = {
    debug: boolean;
    padding: Padding;
    size: Size;
    useAppSize: boolean;
};
export declare const UICanvasConfigKeys: (keyof UICanvasConfig)[];
export type UICanvasProps = {
    debug: boolean;
    padding: Partial<Padding> | PointLike;
    size?: SizeLike;
    useAppSize?: boolean;
};
declare const _UICanvas: (new () => import('../mixins/factory').IFactoryContainer<{
    existing: <TEntity>(entity: TEntity, props?: Partial<import('../mixins/factory/props').ExistingProps> | undefined) => TEntity;
    texture: typeof import('../mixins/factory/utils').resolveTexture;
    container: (props?: Partial<import('../mixins/factory/props').ContainerProps> | undefined) => Container<Application<import('pixi.js').Renderer>>;
    sprite: (props?: Partial<import('../mixins/factory/props').SpriteProps> | undefined) => import('pixi.js').Sprite;
    graphics: (props?: Partial<import('../mixins/factory/props').GraphicsProps> | undefined) => Graphics;
    text: (props?: Partial<import('../mixins/factory/props').TextProps> | undefined) => import('pixi.js').Text;
    bitmapText: (props?: Partial<import('../mixins/factory/props').TextProps> | undefined) => import('pixi.js').BitmapText;
    button: (props?: Partial<import('../mixins/factory/props').ButtonProps> | undefined) => import('./Button').Button;
    flexContainer: (props?: Partial<import('../mixins/factory/props').FlexContainerProps> | undefined) => FlexContainer<Application<import('pixi.js').Renderer>>;
    uiCanvas: (props?: Partial<import('../mixins/factory/props').UICanvasFactoryProps> | undefined) => UICanvas<Application<import('pixi.js').Renderer>>;
    spine: (props?: Partial<import('../mixins/factory/props').SpineProps> | undefined) => import('..').Spine;
    spineAnimation: (props?: Partial<import('../mixins/factory/props').SpineProps> | undefined) => import('./SpineAnimation').ISpineAnimation;
}>) & import('../utils/types').Constructor<import('../mixins/signals').ISignalContainer>;
export declare class UICanvas<T extends Application = Application> extends _UICanvas {
    config: UICanvasConfig;
    /**
     * Removes all the children from the container
     * Override because we need to ensure it returns the proper re-parented children
     */
    removeChildren: (beginIndex?: number, endIndex?: number) => import('pixi.js').ContainerChild[];
    /**
     * Removes a child from the container at the specified index
     * Override because we need to remove from the inner container
     */
    removeChildAt: <U extends PIXIContainer<import('pixi.js').ContainerChild>>(index: number) => U;
    /**
     * Adds a child to the container at the specified index
     * Override because we need to ensure it sets the child index properly
     */
    addChildAt: <U extends PIXIContainer<import('pixi.js').ContainerChild>>(child: U, index: number) => U;
    /**
     * Sets the index of the child in the container
     * Override because we need to ensure it targets the parent container that we added
     */
    setChildIndex: <U extends PIXIContainer<import('pixi.js').ContainerChild>>(child: U, index: number) => void;
    /**
     * Gets the index of a child in the container
     * Override because we need to ensure it targets the parent container that we added
     */
    getChildIndex: <U extends PIXIContainer<import('pixi.js').ContainerChild>>(child: U) => number;
    /**
     * Gets the child at the specified index
     * Override due to re-parenting
     */
    getChildAt: <U extends PIXIContainer<import('pixi.js').ContainerChild>>(index: number) => U;
    protected _bounds: Bounds;
    protected _outerBounds: Rectangle;
    protected _displayBounds: Rectangle;
    protected settingsMap: Map<PIXIContainer<import('pixi.js').ContainerChild>, UICanvasChildSettings>;
    protected _childMap: Map<PIXIContainer<import('pixi.js').ContainerChild>, PIXIContainer<import('pixi.js').ContainerChild>>;
    protected _canvasChildren: PIXIContainer[];
    protected _debugGraphics: Graphics;
    protected _inner: Container;
    private _reparentAddedChild;
    private _disableAddChildError;
    constructor(config: Partial<UICanvasProps>);
    /**
     * Get the application instance.
     */
    get app(): T;
    get canvasChildren(): PIXIContainer[];
    get bounds(): Bounds;
    set size(value: SizeLike);
    set padding(value: Partial<Padding> | PointLike);
    addChild<U extends PIXIContainer[]>(...children: PIXIContainer[]): U[0];
    /**
     * Removes one or more children from the container
     * Override because we need to ensure it returns the proper re-parented children
     */
    removeChild(...children: PIXIContainer[]): PIXIContainer;
    resize(): void;
    layout(): void;
    addElement<U extends PIXIContainer = PIXIContainer>(child: PIXIContainer, settings?: Partial<UICanvasChildProps>): U;
    /**
     * Ensure we don't leave empty containers after setting child indices or adding / removing children
     * @protected
     */
    protected cleanup(): void;
    private __calculateBounds;
    private __calculateOuterBounds;
    private _childRemoved;
    private _added;
    private applySettings;
    private drawDebug;
}
export {};
//# sourceMappingURL=UICanvas.d.ts.map