import * as AudioCategory from './AudioCategory';
/**
 * Class representing an audio token.
 */
export class AudioToken {
    /**
     * Create a new audio token.
     * @param {string} pId - The ID of the audio token.
     * @param {number} pVolume - The volume of the audio token.
     * @param {boolean} pLoop - Whether the audio token should loop.
     * @param {string} pCategory - The category of the audio token.
     */
    constructor(pId, pVolume = 1, pLoop = false, pCategory = AudioCategory.DEFAULT) {
        this.id = pId;
        this.volume = pVolume;
        this.loop = pLoop;
        this.category = pCategory;
    }
}
//# sourceMappingURL=AudioToken.js.map