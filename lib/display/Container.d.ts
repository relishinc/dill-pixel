import { DestroyOptions, Ticker } from 'pixi.js';
import { Application } from '../core/Application';
import { Size } from '../utils/types';
declare const _Container: (new () => import("../mixins/factory").IFactoryContainer<{
    existing: <TEntity>(entity: TEntity, props?: Partial<import("../mixins/factory/props").ExistingProps> | undefined) => TEntity;
    texture: typeof import("../mixins/factory/utils").resolveTexture;
    container: (props?: Partial<import("../mixins/factory/props").ContainerProps> | undefined) => Container<Application<import("pixi.js").Renderer>>;
    sprite: (props?: Partial<import("../mixins/factory/props").SpriteProps> | undefined) => import("pixi.js").Sprite;
    graphics: (props?: Partial<import("../mixins/factory/props").GraphicsProps> | undefined) => import("pixi.js").Graphics;
    text: (props?: Partial<import("../mixins/factory/props").TextProps> | undefined) => import("pixi.js").Text;
    button: (props?: Partial<import("../mixins/factory/props").ButtonProps> | undefined) => import("./Button").Button;
    flexContainer: (props?: Partial<import("../mixins/factory/props").FlexContainerProps> | undefined) => import("./FlexContainer").FlexContainer<Application<import("pixi.js").Renderer>>;
    uiCanvas: (props?: Partial<import("../mixins/factory/props").UICanvasFactoryProps> | undefined) => import("./UICanvas").UICanvas<Application<import("pixi.js").Renderer>>;
    spine: (props?: Partial<import("../mixins/factory/props").SpineProps> | undefined) => import("@pixi/spine-pixi").Spine;
}>) & import("../utils/types").Constructor<import("../mixins/signals").ISignalContainer> & import("../utils/types").Constructor<import("../mixins/animated").IAnimated>;
/**
 * Interface for the Container class.
 */
export interface IContainer {
    app: Application;
    destroy(options?: DestroyOptions): void;
    added(): Promise<void> | void;
    resize(size?: Size): void;
    update(ticker?: Ticker): void;
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
export declare class Container<T extends Application = Application> extends _Container implements IContainer {
    private __config;
    /**
     * The constructor for the Container class.
     * @param __config - The configuration for the container.
     */
    constructor(__config?: ContainerConfig);
    /**
     * Get the application instance.
     */
    get app(): T;
    /**
     * Update the container. This method is meant to be overridden by subclasses.
     * @param ticker - The PIXI.js ticker.
     */
    update(ticker: Ticker): void;
    /**
     * Resize the container. This method is meant to be overridden by subclasses.
     * @param size - The new size of the parent application.
     */
    resize(size?: Size): void;
    /**
     * This method is called when the container is added to the stage. It is meant to be overridden by subclasses.
     */
    added(): void;
    destroy(): void;
    /**
     * This method is called when the container is added to the stage. It sets up auto-resizing and auto-updating if enabled.
     */
    private _added;
}
export {};
//# sourceMappingURL=Container.d.ts.map