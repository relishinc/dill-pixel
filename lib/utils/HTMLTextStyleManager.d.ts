import { HTMLTextStyle, TextStyleFontWeight } from 'pixi.js';
/**
 * Type for HTML text variant.
 */
type HTMLTextVariant = {
    url: string;
    weight: TextStyleFontWeight;
}[] | {
    url: string;
    weight: TextStyleFontWeight;
};
/**
 * Class for managing HTML text styles.
 */
export declare class HTMLTextStyleManager {
    /**
     * Object for storing styles.
     */
    private static _styles;
    /**
     * Adds a new style.
     * @param {string | number} id - The ID of the style.
     * @param {HTMLTextStyle} pTextStyle - The text style to add.
     */
    static add(id: string | number, pTextStyle: HTMLTextStyle): void;
    /**
     * Gets a style by ID.
     * @param {string | number} id - The ID of the style.
     * @returns {HTMLTextStyle} - The text style.
     */
    static get(id: string | number): HTMLTextStyle;
    /**
     * Loads a style.
     * @param {string} family - The font family.
     * @param {Partial<HTMLTextStyle>} style - The style to load.
     * @param {HTMLTextVariant} variants - The variants of the style.
     * @returns {Promise<HTMLTextStyle>} - The loaded text style.
     */
    static load(family: string, style: Partial<HTMLTextStyle>, variants: HTMLTextVariant): Promise<HTMLTextStyle>;
}
/**
 * Adds a new HTML text style.
 * @param {string | number} pId - The ID of the style.
 * @param {HTMLTextStyle} pTextStyle - The text style to add.
 */
export declare function addHTMLTextStyle(pId: string | number, pTextStyle: HTMLTextStyle): void;
/**
 * Gets an HTML text style by ID.
 * @param {string | number} pId - The ID of the style.
 * @returns {HTMLTextStyle} - The text style.
 */
export declare function getHTMLTextStyle(pId: string | number): HTMLTextStyle;
/**
 * Loads an HTML text style.
 * @param {string} family - The font family.
 * @param {Partial<HTMLTextStyle>} style - The style to load.
 * @param {HTMLTextVariant} variants - The variants of the style.
 * @returns {Promise<HTMLTextStyle>} - The loaded text style.
 */
export declare function loadHTMLTextStyle(family: string, style: Partial<HTMLTextStyle>, variants: HTMLTextVariant): Promise<HTMLTextStyle>;
/**
 * Loads and adds an HTML text style.
 * @param {string | number} id - The ID of the style.
 * @param {string} family - The font family.
 * @param {Partial<HTMLTextStyle>} style - The style to load.
 * @param {HTMLTextVariant} variants - The variants of the style.
 */
export declare function loadAndAddHTMLTextStyle(id: string | number, family: string, style: Partial<HTMLTextStyle>, variants: HTMLTextVariant): Promise<void>;
export {};
//# sourceMappingURL=HTMLTextStyleManager.d.ts.map