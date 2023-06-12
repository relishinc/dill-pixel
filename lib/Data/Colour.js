class Colour {
    /**
     * A colour represented by a red, green and blue component.
     * @param pR The red component of the colour OR the full colour in HEX.
     * @param pG The green component of the colour.
     * @param pB The blue component of the colour.
     */
    constructor(pR, pG, pB) {
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
    static random() {
        return new Colour(Math.random() * 255, Math.random() * 255, Math.random() * 255);
    }
    /**
     * Converts the rgb values passed in to hex.
     * @param pR The red component to convert.
     * @param pG The green component to convert.
     * @param pB The blue component to convert.
     * @returns The hex value.
     */
    static rgbToHex(pR, pG, pB) {
        // tslint:disable-next-line no-bitwise
        return pR << 16 | pG << 8 | pB;
    }
    static rgbToHexString(pNumber) {
        let hex = Number(pNumber).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    }
    static rgbToFullHexString(pR, pG, pB) {
        const r = Colour.rgbToHexString(pR);
        const g = Colour.rgbToHexString(pG);
        const b = Colour.rgbToHexString(pB);
        return r + g + b;
    }
    /**
     * Creates a new colour that is linearly interpolated from @var pA to @var pB .
     * @param pA The start colour.
     * @param pB The end colour.
     * @param pPerc The percentage on the path from @var pA to @var pB .
     * @returns The new colour.
     */
    static lerp(pA, pB, pPerc) {
        return new Colour(pA.r + pPerc * (pB.r - pA.r), pA.g + pPerc * (pB.g - pA.g), pA.b + pPerc * (pB.b - pA.b));
    }
    /**
     * Creates a new hex colour that is linearly interpolated from @var pA to @var pB .
     * @param pA The first colour hex.
     * @param pB The second colour hex.
     * @param pPerc The percentage along the path from @var pA to @var pB .
     * @returns The new hex colour.
     */
    static lerpHex(pA, pB, pPerc) {
        const colorA = new Colour(pA);
        const colorB = new Colour(pB);
        return Colour.lerp(colorA, colorB, pPerc).toHex();
    }
    /**
     * Convert this colour to hex.
     * @returns The colour in hex format.
     */
    toHex() {
        return Colour.rgbToHex(this.r, this.g, this.b);
    }
    toHexString() {
        return Colour.rgbToFullHexString(this.r, this.g, this.b);
    }
    /**
     * Converts the colour components to the 0...1 range.
     * @returns The new colour.
     */
    toWebGL() {
        return [this.r / 255, this.g / 255, this.b / 255];
    }
}
Colour.WHITE = new Colour(255, 255, 255);
Colour.BLACK = new Colour(0, 0, 0);
Colour.GREY = new Colour(127, 127, 127);
Colour.RED = new Colour(255, 0, 0);
Colour.GREEN = new Colour(0, 255, 0);
Colour.BLUE = new Colour(0, 0, 255);
Colour.YELLOW = new Colour(255, 255, 0);
Colour.MAGENTA = new Colour(255, 0, 255);
Colour.CYAN = new Colour(0, 255, 255);
export { Colour };
//# sourceMappingURL=Colour.js.map