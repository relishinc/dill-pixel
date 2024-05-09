import { DestroyOptions, Ticker } from 'pixi.js';
import { Application } from '../core/Application';
import { Size } from '../utils/types';
declare const _Container: (new () => import("../mixins/factory").IFactoryContainer<{
    existing: <TEntity>(entity: TEntity, props?: Partial<import("src/mixins/factory/props").ExistingProps> | undefined) => TEntity;
    texture: typeof import("src/mixins/factory/utils").resolveTexture;
    container: (props?: Partial<import("src/mixins/factory/props").ContainerProps> | undefined) => Container<Application<import("pixi.js").Renderer>>;
    sprite: (props?: Partial<import("src/mixins/factory/props").SpriteProps> | undefined) => import("pixi.js").Sprite;
    graphics: (props?: Partial<import("src/mixins/factory/props").GraphicsProps> | undefined) => import("pixi.js").Graphics;
    text: (props?: Partial<import("src/mixins/factory/props").TextProps> | undefined) => import("pixi.js").Text;
    bitmapText: (props?: Partial<import("src/mixins/factory/props").TextProps> | undefined) => import("pixi.js").BitmapText;
    button: (props?: Partial<import("src/mixins/factory/props").ButtonProps> | undefined) => import("src").Button;
    flexContainer: (props?: Partial<import("src/mixins/factory/props").FlexContainerProps> | undefined) => import("src").FlexContainer<Application<import("pixi.js").Renderer>>;
    uiCanvas: (props?: Partial<import("src/mixins/factory/props").UICanvasFactoryProps> | undefined) => import("src").UICanvas<Application<import("pixi.js").Renderer>>;
    spine: (props?: Partial<import("src/mixins/factory/props").SpineProps> | undefined) => import("src/plugins/spine/pixi-spine").Spine;
    spineAnimation: (props?: Partial<import("src/mixins/factory/props").SpineProps> | undefined) => import("src").ISpineAnimation;
}>) & import("../utils/types").Constructor<import("../mixins/signals").ISignalContainer> & import("../utils/types").Constructor<import("../mixins/animated").IAnimated>;
/**
 * Interface for the Container class.
 */
export interface IContainer {
    app: Application;
    destroy(options?: DestroyOptions): void;
    added(): Promise<void> | void;
    resize(size?: Size): void;
    update(ticker?: Ticker | number): void;
}
/**
 * Configuration for the Container class.
 */
type ContainerConfig = {
    autoResize: boolean;
    autoUpdate: boolean;
    priority: number;
};
/**
 * The Container class extends the _Container class (which includes the Animated and Factory mixins) and implements the IContainer interface.
 * It represents a container for PIXI.js display objects.
 */
export declare class Container<A extends Application = Application> extends _Container implements IContainer {
    private __config;
    /**
     * The constructor for the Container class.
     * @param __config - The configuration for the container.
     */
    constructor(__config?: ContainerConfig);
    /**
     * Get the application instance.
     */
    get app(): A;
    /**
     * Update the container. This method is meant to be overridden by subclasses.
     * @param _ticker
     */
    update(_ticker: Ticker | number): void;
    /**
     * Resize the container. This method is meant to be overridden by subclasses.
     * @param _size
     */
    resize(_size?: Size): void;
    /**
     * This method is called when the container is added to the stage. It is meant to be overridden by subclasses.
     */
    added(): void;
    destroy(options?: DestroyOptions): void;
    removed(): void;
    /**
     * This method is called when the container is added to the stage. It sets up auto-resizing and auto-updating if enabled.
     */
    private _added;
    private _removed;
}
export {};
