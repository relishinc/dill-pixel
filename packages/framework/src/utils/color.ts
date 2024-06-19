export function toHex(color: number): string {
  return `#${color.toString(16)}`;
}

// return a uint color from a hex string
export function toRgb(hex: string): number {
  return parseInt(hex.replace(/^#/, ''), 16);
}

export class Color {
  public static readonly WHITE: Color = new Color(255, 255, 255);
  public static readonly BLACK: Color = new Color(0, 0, 0);
  public static readonly GREY: Color = new Color(127, 127, 127);
  public static readonly RED: Color = new Color(255, 0, 0);
  public static readonly GREEN: Color = new Color(0, 255, 0);
  public static readonly BLUE: Color = new Color(0, 0, 255);
  public static readonly YELLOW: Color = new Color(255, 255, 0);
  public static readonly MAGENTA: Color = new Color(255, 0, 255);
  public static readonly CYAN: Color = new Color(0, 255, 255);

  public r: number;
  public g: number;
  public b: number;

  /**
   * A Color reresented by a red, green and blue component.
   * @param r The red component of the Color OR the full Color in HEX.
   * @param g The green component of the Color.
   * @param b The blue component of the Color.
   */
  constructor(r?: number, g?: number, b?: number) {
    if (r !== undefined && g === undefined) {
      // tslint:disable-next-line no-bitwise
      this.r = (r & (255 << 16)) >> 16;
      // tslint:disable-next-line no-bitwise
      this.g = (r & (255 << 8)) >> 8;
      // tslint:disable-next-line no-bitwise
      this.b = r & 255;
    } else {
      this.r = r || 0;
      this.g = g || 0;
      this.b = b || 0;
    }
  }

  /**
   * Creates a random Color.
   * @returns The new Color.
   */
  public static random(): Color {
    return new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
  }

  /**
   * Converts the rgb values passed in to hex.
   * @param r The red component to convert.
   * @param g The green component to convert.
   * @param b The blue component to convert.
   * @returns The hex value.
   */
  public static rgbToHex(r: number, g: number, b: number): number {
    // tslint:disable-next-line no-bitwise
    return (r << 16) | (g << 8) | b;
  }

  public static rgbToHexString(pNumber: number): string {
    let hex = Number(pNumber).toString(16);
    if (hex.length < 2) {
      hex = '0' + hex;
    }

    return hex;
  }

  public static rgbToFullHexString(r: number, g: number, b: number): string {
    const rStr: string = Color.rgbToHexString(r);
    const gStr: string = Color.rgbToHexString(g);
    const bStr: string = Color.rgbToHexString(b);

    return rStr + gStr + bStr;
  }

  /**
   * Creates a new Color that is linearly interpolated from @var pA to @var b .
   * @param pA The start Color.
   * @param b The end Color.
   * @param pPerc The percentage on the path from @var pA to @var b .
   * @returns The new Color.
   */
  public static lerp(pA: Color, b: Color, pPerc: number): Color {
    return new Color(pA.r + pPerc * (b.r - pA.r), pA.g + pPerc * (b.g - pA.g), pA.b + pPerc * (b.b - pA.b));
  }

  /**
   * Creates a new hex Color that is linearly interpolated from @var pA to @var b .
   * @param pA The first Color hex.
   * @param b The second Color hex.
   * @param pPerc The percentage along the path from @var pA to @var b .
   * @returns The new hex Color.
   */
  public static lerpHex(pA: number, b: number, pPerc: number): number {
    const colorA: Color = new Color(pA);
    const colorB: Color = new Color(b);
    return Color.lerp(colorA, colorB, pPerc).toHex();
  }

  /**
   * Convert this Color to hex.
   * @returns The Color in hex format.
   */
  public toHex(): number {
    return Color.rgbToHex(this.r, this.g, this.b);
  }

  public toHexString(): string {
    return Color.rgbToFullHexString(this.r, this.g, this.b);
  }

  /**
   * Converts the Color components to the 0...1 range.
   * @returns The new Color.
   */
  public toWebGL(): number[] {
    return [this.r / 255, this.g / 255, this.b / 255];
  }
}
