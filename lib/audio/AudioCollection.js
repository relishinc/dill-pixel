import { Dictionary } from 'typescript-collections';
import * as MathUtils from '../utils/MathUtils';
/**
 * Class for managing a collection of audio tracks.
 */
export class AudioCollection {
    /**
     * Constructor for AudioCollection.
     */
    constructor() {
        this._tracks = new Dictionary();
        this._volume = 1;
    }
    /**
     * Getter for volume.
     * @returns {number} - The volume of the audio collection.
     */
    get volume() {
        return this._volume;
    }
    /**
     * Setter for volume.
     * @param {number} pValue - The new volume for the audio collection.
     */
    set volume(pValue) {
        this._volume = MathUtils.clamp(pValue, 0, 1);
    }
    /**
     * Getter for tracks.
     * @returns {Dictionary<string, IAudioTrack>} - The tracks in the audio collection.
     */
    get tracks() {
        return this._tracks;
    }
}
//# sourceMappingURL=AudioCollection.js.map