import { IAudioTrack } from './IAudioTrack';
/**
 * All audio manager implementations need to implement this interface to function with the framework.
 */
export interface IAudioManager {
    autoMuteOnVisibilityChange: boolean;
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
     * @param category The category to check.
     * @returns The volume of the category.
     */
    getCategoryVolume(category: string): number;
    /**
     * Sets the volume of a specific category.
     * @param category The category to set.
     * @param volume The volume to set.
     */
    setCategoryVolume(category: string, volume: number): void;
    /**
     * Gets the length of an IAudioTrack.
     * @param trackId The id of the track to check.
     * @param category The category that the track belongs to.
     * @returns The length of the track or `undefined` if the track doesn't exist.
     */
    getDuration(trackId: string, category: string): number | undefined;
    /**
     * Plays a track. If the track does not exist, this function will create it.
     * @param trackId The id of the track to play.
     * @param volume The volume to play the track at. If this function creates the track, this will be the base volume.
     * @param loop Should the track loop or not.
     * @param category The category that the track belongs to.
     * @param pitch the pitch of the track
     * @returns The track playing.
     */
    play(trackId: string, volume?: number, loop?: boolean, category?: string, pitch?: number): IAudioTrack | undefined;
    /**
     * Pauses a track.
     * @param trackId The id of the track.
     * @param category The category that the track belongs to.
     */
    pause(trackId: string, category: string): IAudioTrack | undefined;
    /**
     * Stops a track.
     * @param trackId The id of the track.
     * @param category The category that the track belongs to.
     */
    stop(trackId: string, category: string): IAudioTrack | undefined;
    /**
     * Loads one or more tracks.
     * @param trackIds The ids of the tracks to load.
     * @param category The category that the track belongs to.
     * @param onLoadCallback The callback to be called when loading is finished.
     */
    load(trackIds: string | string[], category: string, onLoadCallback?: () => void): void;
    /**
     * Unloads a track's source from memory.
     * @param trackId The id of the track.
     * @param category The category that the track belongs to.
     * @param removeTrack Whether the IAudioTrack should be removed and destroyed too.
     */
    unload(trackId: string, category: string, removeTrack: boolean): void;
    /**
     * Fades a track from it's current volume over time.
     * @param trackId The id of the track.
     * @param category The category that the track belongs to.
     * @param volume The volume to fade to.
     * @param milliseconds The time in milliseconds it should take to fade.
     */
    fadeTo(trackId: string, category: string, volume: number, milliseconds: number): void;
    /**
     * Creates an IAudioTrack.
     * @param trackId The id of the track.
     * @param category The category that the track belongs to.
     * @returns The created IAudioTrack.
     */
    createAudioTrack(trackId: string, category: string): IAudioTrack;
    /**
     * Gets a track.
     * @param trackId The id of the track.
     * @param category The category that the track belongs to.
     * @returns The IAudioTrack created or undefined if not able to create track.
     * This could happen if the source file could not be found.
     */
    getAudioTrack(trackId: string, category: string): IAudioTrack | undefined;
}
//# sourceMappingURL=IAudioManager.d.ts.map