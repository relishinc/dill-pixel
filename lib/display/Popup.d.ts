import { ColorSource, Texture } from 'pixi.js';
import { IFocusable } from '../modules/focus/FocusManager';
import { Container, IContainer } from './Container';
/**
 * Interface for Popup
 */
export interface IPopup extends IContainer {
    readonly id: string | number;
    config: PopupConfig;
    view: Container;
    backing?: any;
    isShowing: boolean;
    firstFocusableEntity?: IFocusable;
    initialize(): void;
    show(): void | Promise<any>;
    afterShow(): void;
    beforeHide(): void;
    hide(): void | Promise<any>;
    start(): void | Promise<any>;
    end(): void;
}
export type PopupConstructor = new (id: string | number, config?: Partial<PopupConfig>) => IPopup;
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
export type PopupConfig = {
    closeOnEscape: boolean;
    closeOnPointerDownOutside: boolean;
    backing: boolean | Partial<BackingConfig>;
    data?: any;
};
/**
 * Class representing a Popup
 */
export declare class Popup extends Container implements IPopup {
    readonly id: string | number;
    isShowing: boolean;
    firstFocusableEntity: IFocusable;
    view: Container;
    backing?: Container;
    config: PopupConfig;
    static BACKING_TEXTURE: Texture;
    /**
     * Create a backing for the popup
     * @param config - The configuration for the backing
     * @param size - The size of the backing
     * @returns The backing container
     */
    private static makeBacking;
    /**
     * Create a new Popup
     * @param id - The unique identifier for the popup
     * @param config - The configuration for the popup
     */
    constructor(id: string | number, config?: Partial<PopupConfig>);
    initialize(): void;
    beforeHide(): void;
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
    /**
     * Initialize the popup
     * @private
     */
    private _initialize;
    /**
     * Handle pointer up event
     * @private
     */
    private _handlePointerUp;
}
//# sourceMappingURL=Popup.d.ts.map