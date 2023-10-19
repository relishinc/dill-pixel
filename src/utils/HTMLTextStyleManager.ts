import { HTMLTextStyle, TextStyleFontWeight } from 'pixi.js';

type HTMLTextVariant =
  | {
      url: string;
      weight: TextStyleFontWeight;
    }[]
  | {
      url: string;
      weight: TextStyleFontWeight;
    };

export class HTMLTextStyleManager {
  private static _styles: { [styleId: string | number]: HTMLTextStyle };

  public static add(id: string | number, pTextStyle: HTMLTextStyle): void {
    if (HTMLTextStyleManager._styles === undefined) {
      HTMLTextStyleManager._styles = {};
    }
    HTMLTextStyleManager._styles[id] = pTextStyle;
  }

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

export function addHTMLTextStyle(pId: string | number, pTextStyle: HTMLTextStyle): void {
  HTMLTextStyleManager.add(pId, pTextStyle);
}

export function getHTMLTextStyle(pId: string | number): HTMLTextStyle {
  return HTMLTextStyleManager.get(pId);
}

export function loadHTMLTextStyle(family: string, style: Partial<HTMLTextStyle>, variants: HTMLTextVariant) {
  return HTMLTextStyleManager.load(family, style, variants);
}

export async function loadAndAddHTMLTextStyle(
  id: string | number,
  family: string,
  style: Partial<HTMLTextStyle>,
  variants: HTMLTextVariant,
) {
  const loadedStyle = await loadHTMLTextStyle(family, style, variants);
  addHTMLTextStyle(id, loadedStyle);
}
