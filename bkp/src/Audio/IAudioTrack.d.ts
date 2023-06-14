/**
 * All audio track implementations need to implement this interface to function with the framework.
 */
export interface IAudioTrack {
    readonly id: string;
    /**
     * Plays the track.
     */
    play(): void;
    /**
     * Pauses the track.
     */
    pause(): void;
    /**
     * Stops the track.
     */
    stop(): void;
    /**
     * Fades this track from it's current volume over time.
     * @param pVolume The volume to fade to.
     * @param pMilliseconds The time in milliseconds the fade should take finish.
     */
    fadeTo(pVolume: number, pMilliseconds: number): void;
    /**
     * Loads the source file into memory. Must be called before play() is called.
     */
    loadSource(): void;
    /**
     * Unloads the source file.
     */
    unloadSource(): void;
    /**
     * Gets whether the track is muted.
     * @returns true if the track is muted, false otherwise.
     */
    isMuted(): boolean;
    /**
     * Set the muted flag for this track.
     * @param pMute true to mute and false to unmute.
     */
    setMuted(pMute: boolean): void;
    /**
     * Gets whether the track is set to loop.
     * @returns true if the track is set to loop, false otherwise.
     */
    isLooped(): boolean;
    /**
     * Sets the loop flag for this track.
     * @param pLoop true to loop and false to play once.
     */
    setLooped(pLoop: boolean): void;
    /**
     * Gets the base volume of this track. This will be used to calculate the appropriate source volume.
     * @returns the base volume of this track.
     */
    getVolume(): number;
    /**
     * Sets the base volume of this track. This will be used to calculate the appropriate source volume.
     * @param pVolume The new volume of this track.
     */
    setVolume(pVolume: number): void;
    /**
     * Sets the base volume of this track and then applies modifiers to get the final output volume.
     * @param pVolume The new volume of this track.
     * @param pMasterVolume The current master volume level.
     * @param pCategoryVolume The current volume of this track's category.
     */
    setVolumeWithModifiers(pVolume: number, pMasterVolume: number, pCategoryVolume: number): void;
    /**
     * Gets the current time position within the track timeline.
     * @returns the time position
     */
    getTimePos(): number;
    /**
     * Sets the current time position within the track timeline.
     * @param pPos The time position to set the track to.
     */
    setTimePos(pPos: number): void;
    /**
     * Gets the length of the track.
     * @returns the length of the track.
     */
    getDuration(): number;
    /**
     * Gets whether the track is currently playing.
     * @returns true if currently playing, false otherwise.
     */
    isPlaying(): boolean;
    /**
     * Register a callback to an event.
     * @param pEvent The event to listen for.
     * @param pCallback The callback to call when the event occurs.
     */
    on(pEvent: string, pCallback: () => void): void;
    /**
     * Unregister a callback from an event.
     * @param pEvent The event that was listened for.
     * @param pCallback The callback to call when the event occured. Omit this to remove all events of type.
     */
    off(pEvent: string, pCallback?: () => void): void;
    /**
     * Shortcut to register a callback to an event and have it only be called once.
     * @param pEvent The event to listen for.
     * @param pCallback The callback to call when the event occurs.
     */
    once(pEvent: string, pCallback: () => void): void;
}
//# sourceMappingURL=IAudioTrack.d.ts.map