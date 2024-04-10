import { Cursor, Sprite } from 'pixi.js';
import { Application } from '../core/Application';
import { Signal } from '../signals';
import { SpriteSheetLike, TextureLike } from '../utils/types';
export type ButtonConfig = {
    textures: {
        default: TextureLike;
        hover?: TextureLike;
        active?: TextureLike;
        disabled?: TextureLike;
    };
    cursor: Cursor;
    disabledCursor: Cursor;
    sheet: SpriteSheetLike;
    enabled: boolean;
};
export declare const ButtonConfigKeys: (keyof ButtonConfig)[];
declare const _Button: (new () => import("../mixins/factory").IFactoryContainer<{
    existing: <TEntity>(entity: TEntity, props?: Partial<import("../mixins/factory/props").ExistingProps> | undefined) => TEntity;
    texture: typeof import("../mixins/factory/utils").resolveTexture;
    container: (props?: Partial<import("../mixins/factory/props").ContainerProps> | undefined) => import("./Container").Container<Application<import("pixi.js").Renderer>>;
    sprite: (props?: Partial<import("../mixins/factory/props").SpriteProps> | undefined) => Sprite;
    graphics: (props?: Partial<import("../mixins/factory/props").GraphicsProps> | undefined) => import("pixi.js").Graphics;
    text: (props?: Partial<import("../mixins/factory/props").TextProps> | undefined) => import("pixi.js").Text;
    button: (props?: Partial<import("../mixins/factory/props").ButtonProps> | undefined) => Button;
    flexContainer: (props?: Partial<import("../mixins/factory/props").FlexContainerProps> | undefined) => import("./FlexContainer").FlexContainer<Application<import("pixi.js").Renderer>>;
    uiCanvas: (props?: Partial<import("../mixins/factory/props").UICanvasFactoryProps> | undefined) => import("./UICanvas").UICanvas<Application<import("pixi.js").Renderer>>;
    spine: (props?: Partial<import("../mixins/factory/props").SpineProps> | undefined) => import("@pixi/spine-pixi").Spine;
}>) & import("../utils/types").Constructor<import("../mixins/signals").ISignalContainer> & import("../utils/types").Constructor<import("../mixins/interaction").IInteractive> & import("../utils/types").Constructor<import("..").IFocusable>;
/**
 * @class
 * @extends {Container}
 * @implements {IFocusable}
 * @description A class representing a button.
 */
export declare class Button extends _Button {
    onDown: Signal<() => void>;
    onUp: Signal<() => void>;
    onUpOutside: Signal<() => void>;
    onOut: Signal<() => void>;
    onOver: Signal<() => void>;
    onClick: Signal<() => void>;
    onEnabled: Signal<() => void>;
    onDisabled: Signal<() => void>;
    onKeyboardEvent: Signal<(key: string) => void>;
    view: Sprite;
    isDown: boolean;
    isOver: boolean;
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
    get app(): Application<import("pixi.js").Renderer>;
    focusOut(): void;
    blur(): void;
    getFocusArea(): import("pixi.js").Bounds;
    getFocusPosition(): number[];
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
    protected handleClick(): void;
    /**
     * @description Handles the pointer up event.
     */
    protected handlePointerUpOutside(): void;
}
export {};
//# sourceMappingURL=Button.d.ts.map