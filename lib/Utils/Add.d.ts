import { Container, ITextStyle, TextStyle } from "pixi.js";
export declare class AddFactory {
    private defaultContainer;
    private _make;
    constructor(defaultContainer: Container);
    sprite(pAsset: string, pSheet?: string | string[], x?: number, y?: number, anchorX?: number, anchorY?: number, scale?: number): import("pixi.js").Sprite;
    text(pText?: string, pStyle?: Partial<ITextStyle> | TextStyle, x?: number, y?: number, anchorX?: number, anchorY?: number, scale?: number): import("pixi.js").Text;
}
//# sourceMappingURL=Add.d.ts.map