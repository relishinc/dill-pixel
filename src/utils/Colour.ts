export class Colour {
    public static readonly WHITE: Colour = new Colour(255, 255, 255);
    public static readonly BLACK: Colour = new Colour(0, 0, 0);
    public static readonly GREY: Colour = new Colour(127, 127, 127);
    public static readonly RED: Colour = new Colour(255, 0, 0);
    public static readonly GREEN: Colour = new Colour(0, 255, 0);
    public static readonly BLUE: Colour = new Colour(0, 0, 255);
    public static readonly YELLOW: Colour = new Colour(255, 255, 0);
    public static readonly MAGENTA: Colour = new Colour(255, 0, 255);
    public static readonly CYAN: Colour = new Colour(0, 255, 255);

    public r: number;
    public g: number;
    public b: number;

    /**
     * A colour represented by a red, green and blue component.
     * @param pR The red component of the colour OR the full colour in HEX.
     * @param pG The green component of the colour.
     * @param pB The blue component of the colour.
     */
    constructor(pR?: number, pG?: number, pB?: number) {
        if (pR !== undefined && pG === undefined) {
            // tslint:disable-next-line no-bitwise
            this.r = (pR & (255 << 16)) >> 16;
            // tslint:disable-next-line no-bitwise
            this.g = (pR & (255 << 8)) >> 8;
            // tslint:disable-next-line no-bitwise
            this.b = pR & (255);
        }
        else {
            this.r = pR || 0;
            this.g = pG || 0;
            this.b = pB || 0;
        }
    }

    /**
     * Creates a random colour.
     * @returns The new colour.
     */
    public static random(): Colour {
        return new Colour(
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 255,
        );
    }

    /**
     * Converts the rgb values passed in to hex.
     * @param pR The red component to convert.
     * @param pG The green component to convert.
     * @param pB The blue component to convert.
     * @returns The hex value.
     */
    public static rgbToHex(pR: number, pG: number, pB: number): number {
        // tslint:disable-next-line no-bitwise
        return pR << 16 | pG << 8 | pB;
    }

    public static rgbToHexString(pNumber: number): string {
        let hex = Number(pNumber).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }

        return hex;
    }

    public static rgbToFullHexString(pR: number, pG: number, pB: number): string {
        const r: string = Colour.rgbToHexString(pR);
        const g: string = Colour.rgbToHexString(pG);
        const b: string = Colour.rgbToHexString(pB);

        return r + g + b;
    }

    /**
     * Creates a new colour that is linearly interpolated from @var pA to @var pB .
     * @param pA The start colour.
     * @param pB The end colour.
     * @param pPerc The percentage on the path from @var pA to @var pB .
     * @returns The new colour.
     */
    public static lerp(pA: Colour, pB: Colour, pPerc: number): Colour {
        return new Colour(
            pA.r + pPerc * (pB.r - pA.r),
            pA.g + pPerc * (pB.g - pA.g),
            pA.b + pPerc * (pB.b - pA.b),
        );
    }

    /**
     * Creates a new hex colour that is linearly interpolated from @var pA to @var pB .
     * @param pA The first colour hex.
     * @param pB The second colour hex.
     * @param pPerc The percentage along the path from @var pA to @var pB .
     * @returns The new hex colour.
     */
    public static lerpHex(pA: number, pB: number, pPerc: number): number {
        const colorA: Colour = new Colour(pA);
        const colorB: Colour = new Colour(pB);
        return Colour.lerp(colorA, colorB, pPerc).toHex();
    }

    /**
     * Convert this colour to hex.
     * @returns The colour in hex format.
     */
    public toHex(): number {
        return Colour.rgbToHex(this.r, this.g, this.b);
    }

    public toHexString(): string {
        return Colour.rgbToFullHexString(this.r, this.g, this.b);
    }

    /**
     * Converts the colour components to the 0...1 range.
     * @returns The new colour.
     */
    public toWebGL(): number[] {
        return [ this.r / 255, this.g / 255, this.b / 255 ];
    }
}
