import { Container, ITextStyle, TextStyle } from "pixi.js";
export declare class AddFactory {
    private defaultContainer;
    private _make;
    constructor(defaultContainer: Container);
    sprite(pAsset: string, pSheet?: string | string[] | undefined, alpha?: number, x?: number, y?: number, anchorX?: number, anchorY?: number, scaleX?: number, scaleY?: number): import("pixi.js").Sprite;
    text(pText?: string, pStyle?: Partial<ITextStyle> | TextStyle, alpha?: number, x?: number, y?: number, anchorX?: number, anchorY?: number, scaleX?: number, scaleY?: number): import("pixi.js").Text;
}
//# sourceMappingURL=Add.d.ts.map