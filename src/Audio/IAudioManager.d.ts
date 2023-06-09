import { IAudioTrack } from "./IAudioTrack";
/**
 * All audio manager implementations need to implement this interface to function with the framework.
 */
export interface IAudioManager {
    /**
     * Enabling this will print all debug logs.
     */
    debug: boolean;
    /**
     * The master value that affects all audio.
     */
    masterVolume: number;
    /**
     * Sets up any listeners that need the entire Application construction to be complete.
     */
    init(): void;
    /**
     * Gets the volume of a specific category.
     * @param pCategory The category to check.
     * @returns The volume of the category.
     */
    getCategoryVolume(pCategory: string): number;
    /**
     * Sets the volume of a specific category.
     * @param pCategory The category to set.
     * @param pVolume The volume to set.
     */
    setCategoryVolume(pCategory: string, pVolume: number): void;
    /**
     * Gets the length of an IAudioTrack.
     * @param pId The id of the track to check.
     * @param pCategory The category that the track belongs to.
     * @returns The length of the track or `undefined` if the track doesn't exist.
     */
    getDuration(pId: string, pCategory: string): number | undefined;
    /**
     * Plays a track. If the track does not exist, this function will create it.
     * @param pId The id of the track to play.
     * @param pVolume The volume to play the track at. If this function creates the track, this will be the base volume.
     * @param pLoop Should the track loop or not.
     * @param pCategory The category that the track belongs to.
     * @returns The track playing.
     */
    play(pId: string, pVolume?: number, pLoop?: boolean, pCategory?: string): void;
    /**
     * Pauses a track.
     * @param pId The id of the track.
     * @param pCategory The category that the track belongs to.
     */
    pause(pId: string, pCategory: string): void;
    /**
     * Stops a track.
     * @param pId The id of the track.
     * @param pCategory The category that the track belongs to.
     */
    stop(pId: string, pCategory: string): void;
    /**
     * Loads one or more tracks.
     * @param pIds The ids of the tracks to load.
     * @param pCategory The category that the track belongs to.
     * @param pOnLoad The callback to be called when loading is finished.
     */
    load(pIds: string | string[], pCategory: string, pOnLoad?: () => void): void;
    /**
     * Unloads a track's source from memory.
     * @param pId The id of the track.
     * @param pCategory The category that the track belongs to.
     * @param pRemoveTrack Whether the IAudioTrack should be removed and destroyed too.
     */
    unload(pId: string, pCategory: string, pRemoveTrack: boolean): void;
    /**
     * Fades a track from it's current volume over time.
     * @param pId The id of the track.
     * @param pCategory The category that the track belongs to.
     * @param pVolume The volume to fade to.
     * @param pMilliseconds The time in milliseconds it should take to fade.
     */
    fadeTo(pId: string, pCategory: string, pVolume: number, pMilliseconds: number): void;
    /**
     * Creates an IAudioTrack.
     * @param pId The id of the track.
     * @param pCategory The category that the track belongs to.
     * @returns The created IAudioTrack.
     */
    createAudioTrack(pId: string, pCategory: string): IAudioTrack;
    /**
     * Gets a track.
     * @param pId The id of the track.
     * @param pCategory The category that the track belongs to.
     * @returns The IAudioTrack created or undefined if not able to create track.
     * This could happen if the source file could not be found.
     */
    getAudioTrack(pId: string, pCategory: string): IAudioTrack | undefined;
}
//# sourceMappingURL=IAudioManager.d.ts.map