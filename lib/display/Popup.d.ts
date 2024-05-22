import { ColorSource, DestroyOptions, Texture } from 'pixi.js';
import { IFocusable } from '../plugins/focus/FocusManagerPlugin';
import { Container, IContainer } from './Container';

/**
 * Interface for Popup
 */
export interface IPopup<T = any> extends IContainer {
    readonly id: string | number;
    config: PopupConfig<T>;
    view: Container;
    backing?: any;
    isShowing: boolean;
    firstFocusableEntity?: IFocusable;
    data: T;
    close(): void;
    initialize(): void;
    show(): void | Promise<any>;
    afterShow(): void;
    beforeHide(): void;
    hide(): void | Promise<any>;
    start(): void | Promise<any>;
    end(): void;
}
export type PopupConstructor<T = any> = new (id: string | number, config?: Partial<PopupConfig<T>>) => IPopup<T>;
/**
 * Configuration for the backing of the popup
 */
export type BackingConfig = {
    color: ColorSource;
    alpha: number;
};
/**
 * Configuration for the popup
 */
export type PopupConfig<T = any> = {
    id: string | number;
    closeOnEscape: boolean;
    closeOnPointerDownOutside: boolean;
    backing: boolean | Partial<BackingConfig>;
    data?: T;
};
/**
 * Class representing a Popup
 */
export declare class Popup<T = any> extends Container implements IPopup<T> {
    readonly id: string | number;
    static BACKING_TEXTURE: Texture;
    isShowing: boolean;
    firstFocusableEntity: IFocusable;
    view: Container;
    backing?: Container;
    config: PopupConfig<T>;
    /**
     * Create a new Popup
     * @param id - The unique identifier for the popup
     * @param config - The configuration for the popup
     */
    constructor(id: string | number, config?: Partial<PopupConfig>);
    get data(): T;
    /**
     * Create a backing for the popup
     * @param config - The configuration for the backing
     * @param size - The size of the backing
     * @returns The backing container
     */
    private static makeBacking;
    initialize(): void;
    beforeHide(): void;
    destroy(options?: boolean | DestroyOptions): void;
    /**
     * Hide the popup
     * @returns A promise that resolves when the popup is hidden
     */
    hide(): void | any | Promise<any>;
    /**
     * Show the popup
     * @returns A promise that resolves when the popup is shown
     */
    show(): void | Promise<any>;
    /**
     * Start the popup
     */
    start(): void | Promise<any>;
    afterShow(): void;
    /**
     * End the popup
     */
    end(): void;
    close(): void | Promise<void>;
    /**
     * Initialize the popup
     * @private
     */
    private _initialize;
}
//# sourceMappingURL=Popup.d.ts.map