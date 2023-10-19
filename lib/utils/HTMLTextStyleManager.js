import { HTMLTextStyle } from 'pixi.js';
export class HTMLTextStyleManager {
    static add(id, pTextStyle) {
        if (HTMLTextStyleManager._styles === undefined) {
            HTMLTextStyleManager._styles = {};
        }
        HTMLTextStyleManager._styles[id] = pTextStyle;
    }
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
export function addHTMLTextStyle(pId, pTextStyle) {
    HTMLTextStyleManager.add(pId, pTextStyle);
}
export function getHTMLTextStyle(pId) {
    return HTMLTextStyleManager.get(pId);
}
export function loadHTMLTextStyle(family, style, variants) {
    return HTMLTextStyleManager.load(family, style, variants);
}
export async function loadAndAddHTMLTextStyle(id, family, style, variants) {
    const loadedStyle = await loadHTMLTextStyle(family, style, variants);
    addHTMLTextStyle(id, loadedStyle);
}
//# sourceMappingURL=HTMLTextStyleManager.js.map