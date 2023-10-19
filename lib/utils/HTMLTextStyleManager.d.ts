import { HTMLTextStyle, TextStyleFontWeight } from 'pixi.js';
type HTMLTextVariant = {
    url: string;
    weight: TextStyleFontWeight;
}[] | {
    url: string;
    weight: TextStyleFontWeight;
};
export declare class HTMLTextStyleManager {
    private static _styles;
    static add(id: string | number, pTextStyle: HTMLTextStyle): void;
    static get(id: string | number): HTMLTextStyle;
    static load(family: string, style: Partial<HTMLTextStyle>, variants: HTMLTextVariant): Promise<HTMLTextStyle>;
}
export declare function addHTMLTextStyle(pId: string | number, pTextStyle: HTMLTextStyle): void;
export declare function getHTMLTextStyle(pId: string | number): HTMLTextStyle;
export declare function loadHTMLTextStyle(family: string, style: Partial<HTMLTextStyle>, variants: HTMLTextVariant): Promise<HTMLTextStyle>;
export declare function loadAndAddHTMLTextStyle(id: string | number, family: string, style: Partial<HTMLTextStyle>, variants: HTMLTextVariant): Promise<void>;
export {};
//# sourceMappingURL=HTMLTextStyleManager.d.ts.map