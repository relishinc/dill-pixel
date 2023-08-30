import { ILineStyleOptions } from "@pixi/graphics/lib/Graphics";
import { Graphics, Sprite } from "pixi.js";
import { IFocusable } from "./IFocusable";
import { IKeyboardFocus } from "./IKeyboardFocus";
export declare class DefaultKeyboardFocusManagerSprite extends Sprite implements IKeyboardFocus {
    private padding;
    private outlineOptions;
    static COLOR: number;
    static PADDING: number;
    static LINE_WIDTH: number;
    protected _target: IFocusable | undefined;
    protected _gfx: Graphics;
    constructor(padding?: number, outlineOptions?: ILineStyleOptions);
    get target(): IFocusable | undefined;
    show(pFocusable: IFocusable): void;
    hide(pOnComplete?: () => void, pInstantly?: boolean): void;
    redraw(): void;
}
//# sourceMappingURL=DefaultKeyboardFocusManagerSprite.d.ts.map