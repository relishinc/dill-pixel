import { Dictionary } from 'typescript-collections';
import { IAudioTrack } from './IAudioTrack';
/**
 * Class for managing a collection of audio tracks.
 */
export declare class AudioCollection {
    /**
     * Dictionary of audio tracks.
     */
    private _tracks;
    /**
     * Volume of the audio collection.
     */
    private _volume;
    /**
     * Constructor for AudioCollection.
     */
    constructor();
    /**
     * Getter for volume.
     * @returns {number} - The volume of the audio collection.
     */
    get volume(): number;
    /**
     * Setter for volume.
     * @param {number} pValue - The new volume for the audio collection.
     */
    set volume(pValue: number);
    /**
     * Getter for tracks.
     * @returns {Dictionary<string, IAudioTrack>} - The tracks in the audio collection.
     */
    get tracks(): Dictionary<string, IAudioTrack>;
}
//# sourceMappingURL=AudioCollection.d.ts.map