/**
 * Class representing an audio token.
 */
export declare class AudioToken {
    /**
     * The ID of the audio token.
     */
    id: string;
    /**
     * The volume of the audio token.
     */
    volume: number;
    /**
     * Whether the audio token should loop.
     */
    loop: boolean;
    /**
     * The category of the audio token.
     */
    category: string;
    /**
     * Create a new audio token.
     * @param {string} pId - The ID of the audio token.
     * @param {number} pVolume - The volume of the audio token.
     * @param {boolean} pLoop - Whether the audio token should loop.
     * @param {string} pCategory - The category of the audio token.
     */
    constructor(pId: string, pVolume?: number, pLoop?: boolean, pCategory?: string);
}
//# sourceMappingURL=AudioToken.d.ts.map