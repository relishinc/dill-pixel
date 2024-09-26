import { Cursor, Point, Sprite } from 'pixi.js';
import { IFocusable } from '../input';
import { Signal } from '../signals';
import { SpritesheetLike, TextureLike } from '../utils';
import { Container } from './Container';
type ButtonConfig = {
    textures: {
        default: TextureLike;
        hover?: TextureLike;
        active?: TextureLike;
        disabled?: TextureLike;
    };
    sheet: SpritesheetLike;
    enabled: boolean;
    focusable: boolean;
    cursor: Cursor | string;
};
/**
 * @class
 * @extends {Container}
 * @implements {IFocusable}
 * @description A class representing a button.
 */
export declare class Button extends Container implements IFocusable {
    onDown: Signal<() => void>;
    onUp: Signal<() => void>;
    onOut: Signal<() => void>;
    onOver: Signal<() => void>;
    onPress: Signal<() => void>;
    view: Sprite;
    isDown: boolean;
    protected config: ButtonConfig;
    protected _enabled: boolean;
    /**
     * @constructor
     * @param {Partial<ButtonConfig>} config - The configuration for the button.
     */
    constructor(config: Partial<ButtonConfig>);
    /**
     * @description Sets the enabled state of the button.
     * @param {boolean} enabled - Whether the button is enabled.
     */
    set enabled(enabled: boolean);
    /**
     * @description Handles the focus begin event.
     */
    onFocusBegin(): void;
    /**
     * @description Handles the focus activated event.
     */
    onFocusActivated(): void;
    /**
     * @description Handles the focus end event.
     */
    onFocusEnd(): void;
    /**
     * @description Gets the focus size of the button.
     * @returns {Point} The focus size.
     */
    getFocusSize(): Point;
    /**
     * @description Adds the event listeners for the button.
     */
    protected addListeners(): void;
    /**
     * @description Removes the event listeners for the button.
     */
    protected removeListeners(): void;
    /**
     * @description Handles the pointer over event.
     * Sets the texture of the button to the hover texture and emits the onOver event.
     */
    protected handlePointerOver(): void;
    /**
     * @description Handles the pointer out event.
     * Sets the texture of the button to the default texture and emits the onOut event.
     */
    protected handlePointerOut(): void;
    /**
     * @description Handles the pointer down event.
     * Sets the isDown property to true and changes the texture of the button.
     */
    protected handlePointerDown(): void;
    /**
     * @description Handles the pointer up event.
     * Removes the keyup event listener and emits the onPress and onUp events.
     */
    protected handlePointerUp(): void;
    /**
     * @description Handles the key up event.
     * checks if the key is the enter or space key and calls handlePointerUp.
     * @param {KeyboardEvent} e - The keyboard event.
     */
    protected handleKeyUp(e: KeyboardEvent): void;
}
export {};
//# sourceMappingURL=Button.d.ts.map