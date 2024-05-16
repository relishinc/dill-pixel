import {HTMLTextStyle, TextStyleFontWeight} from 'pixi.js';

/**
 * Type for HTML text variant.
 */
type HTMLTextVariant =
  | {
      url: string;
      weight: TextStyleFontWeight;
    }[]
  | {
      url: string;
      weight: TextStyleFontWeight;
    };

/**
 * Class for managing HTML text styles.
 */
export class HTMLTextStyleManager {
  /**
   * Object for storing styles.
   */
  private static _styles: { [styleId: string | number]: HTMLTextStyle };

  /**
   * Adds a new style.
   * @param {string | number} id - The ID of the style.
   * @param {HTMLTextStyle} pTextStyle - The text style to add.
   */
  public static add(id: string | number, pTextStyle: HTMLTextStyle): void {
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
  public static get(id: string | number): HTMLTextStyle {
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
  public static async load(
    family: string,
    style: Partial<HTMLTextStyle>,
    variants: HTMLTextVariant,
  ): Promise<HTMLTextStyle> {
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
export function addHTMLTextStyle(pId: string | number, pTextStyle: HTMLTextStyle): void {
  HTMLTextStyleManager.add(pId, pTextStyle);
}

/**
 * Gets an HTML text style by ID.
 * @param {string | number} pId - The ID of the style.
 * @returns {HTMLTextStyle} - The text style.
 */
export function getHTMLTextStyle(pId: string | number): HTMLTextStyle {
  return HTMLTextStyleManager.get(pId);
}

/**
 * Loads an HTML text style.
 * @param {string} family - The font family.
 * @param {Partial<HTMLTextStyle>} style - The style to load.
 * @param {HTMLTextVariant} variants - The variants of the style.
 * @returns {Promise<HTMLTextStyle>} - The loaded text style.
 */
export function loadHTMLTextStyle(family: string, style: Partial<HTMLTextStyle>, variants: HTMLTextVariant) {
  return HTMLTextStyleManager.load(family, style, variants);
}

/**
 * Loads and adds an HTML text style.
 * @param {string | number} id - The ID of the style.
 * @param {string} family - The font family.
 * @param {Partial<HTMLTextStyle>} style - The style to load.
 * @param {HTMLTextVariant} variants - The variants of the style.
 */
export async function loadAndAddHTMLTextStyle(
  id: string | number,
  family: string,
  style: Partial<HTMLTextStyle>,
  variants: HTMLTextVariant,
) {
  const loadedStyle = await loadHTMLTextStyle(family, style, variants);
  addHTMLTextStyle(id, loadedStyle);
}
