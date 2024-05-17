import { HTMLTextStyle } from 'pixi.js';
/**
 * Class for managing HTML text styles.
 */
export class HTMLTextStyleManager {
    /**
     * Adds a new style.
     * @param {string | number} id - The ID of the style.
     * @param {HTMLTextStyle} pTextStyle - The text style to add.
     */
    static add(id, pTextStyle) {
        if (HTMLTextStyleManager._styles === undefined) {
            HTMLTextStyleManager._styles = {};
        }
        HTMLTextStyleManager._styles[id] = pTextStyle;
    }
    /**
     * Gets a style by ID.
     * @param {string | number} id - The ID of the style.
     * @returns {HTMLTextStyle} - The text style.
     */
    static get(id) {
        if (HTMLTextStyleManager._styles === undefined) {
            HTMLTextStyleManager._styles = {};
        }
        if (HTMLTextStyleManager._styles[id] === undefined) {
            console.warn(`HTMLTextStyleManager.get('${id}'): style '${id}' is not defined. Returning default style.`);
            return new HTMLTextStyle();
        }
        return HTMLTextStyleManager._styles[id];
    }
    /**
     * Loads a style.
     * @param {string} family - The font family.
     * @param {Partial<HTMLTextStyle>} style - The style to load.
     * @param {HTMLTextVariant} variants - The variants of the style.
     * @returns {Promise<HTMLTextStyle>} - The loaded text style.
     */
    static async load(family, style, variants) {
        if (!Array.isArray(variants)) {
            variants = [variants];
        }
        const loadingStyle = new HTMLTextStyle(style);
        const promises = variants.map((variant) => {
            return loadingStyle.loadFont(variant.url, { family, weight: variant.weight });
        });
        await Promise.all(promises);
        return loadingStyle;
    }
}
/**
 * Adds a new HTML text style.
 * @param {string | number} pId - The ID of the style.
 * @param {HTMLTextStyle} pTextStyle - The text style to add.
 */
export function addHTMLTextStyle(pId, pTextStyle) {
    HTMLTextStyleManager.add(pId, pTextStyle);
}
/**
 * Gets an HTML text style by ID.
 * @param {string | number} pId - The ID of the style.
 * @returns {HTMLTextStyle} - The text style.
 */
export function getHTMLTextStyle(pId) {
    return HTMLTextStyleManager.get(pId);
}
/**
 * Loads an HTML text style.
 * @param {string} family - The font family.
 * @param {Partial<HTMLTextStyle>} style - The style to load.
 * @param {HTMLTextVariant} variants - The variants of the style.
 * @returns {Promise<HTMLTextStyle>} - The loaded text style.
 */
export function loadHTMLTextStyle(family, style, variants) {
    return HTMLTextStyleManager.load(family, style, variants);
}
/**
 * Loads and adds an HTML text style.
 * @param {string | number} id - The ID of the style.
 * @param {string} family - The font family.
 * @param {Partial<HTMLTextStyle>} style - The style to load.
 * @param {HTMLTextVariant} variants - The variants of the style.
 */
export async function loadAndAddHTMLTextStyle(id, family, style, variants) {
    const loadedStyle = await loadHTMLTextStyle(family, style, variants);
    addHTMLTextStyle(id, loadedStyle);
}
//# sourceMappingURL=HTMLTextStyleManager.js.map