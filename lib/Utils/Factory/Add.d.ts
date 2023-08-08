import { Container, IBitmapTextStyle, ITextStyle, TextStyle } from "pixi.js";
import { MakeFactory } from "./Make";
export declare class AddFactory {
    private defaultContainer;
    private readonly _make;
    constructor(defaultContainer: Container);
    get makeFactory(): MakeFactory;
    existing(pObject: any): any;
    coloredSprite(color?: number, size?: {
        x: number;
        y: number;
    } | [number, number?] | number, shape?: "rectangle" | "rounded_rectangle" | "circle", alpha?: number, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, anchor?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number, opts?: {
        [key: string]: string | number;
    }): import("pixi.js").Sprite;
    sprite(pAsset: string, pSheet?: string | string[] | undefined, alpha?: number, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, anchor?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number): import("pixi.js").Sprite;
    text(pText?: string, pStyle?: Partial<ITextStyle> | TextStyle, alpha?: number, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, anchor?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number): import("pixi.js").Text;
    bitmapText(pText: string, pStyle?: IBitmapTextStyle, alpha?: number, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, anchor?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number): import("pixi.js").BitmapText;
    container(alpha?: number, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number): Container<import("pixi.js").DisplayObject>;
    graphics(alpha?: number, position?: {
        x: number;
        y: number;
    } | [number, number?] | number, scale?: {
        x: number;
        y: number;
    } | [number, number?] | number): import("pixi.js").Graphics;
}
//# sourceMappingURL=Add.d.ts.map