export declare class Colour {
    static readonly WHITE: Colour;
    static readonly BLACK: Colour;
    static readonly GREY: Colour;
    static readonly RED: Colour;
    static readonly GREEN: Colour;
    static readonly BLUE: Colour;
    static readonly YELLOW: Colour;
    static readonly MAGENTA: Colour;
    static readonly CYAN: Colour;
    r: number;
    g: number;
    b: number;
    /**
     * A colour represented by a red, green and blue component.
     * @param pR The red component of the colour OR the full colour in HEX.
     * @param pG The green component of the colour.
     * @param pB The blue component of the colour.
     */
    constructor(pR?: number, pG?: number, pB?: number);
    /**
     * Creates a random colour.
     * @returns The new colour.
     */
    static random(): Colour;
    /**
     * Converts the rgb values passed in to hex.
     * @param pR The red component to convert.
     * @param pG The green component to convert.
     * @param pB The blue component to convert.
     * @returns The hex value.
     */
    static rgbToHex(pR: number, pG: number, pB: number): number;
    static rgbToHexString(pNumber: number): string;
    static rgbToFullHexString(pR: number, pG: number, pB: number): string;
    /**
     * Creates a new colour that is linearly interpolated from @var pA to @var pB .
     * @param pA The start colour.
     * @param pB The end colour.
     * @param pPerc The percentage on the path from @var pA to @var pB .
     * @returns The new colour.
     */
    static lerp(pA: Colour, pB: Colour, pPerc: number): Colour;
    /**
     * Creates a new hex colour that is linearly interpolated from @var pA to @var pB .
     * @param pA The first colour hex.
     * @param pB The second colour hex.
     * @param pPerc The percentage along the path from @var pA to @var pB .
     * @returns The new hex colour.
     */
    static lerpHex(pA: number, pB: number, pPerc: number): number;
    /**
     * Convert this colour to hex.
     * @returns The colour in hex format.
     */
    toHex(): number;
    toHexString(): string;
    /**
     * Converts the colour components to the 0...1 range.
     * @returns The new colour.
     */
    toWebGL(): number[];
}
//# sourceMappingURL=Colour.d.ts.map