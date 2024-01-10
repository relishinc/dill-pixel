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
   * @param volume The volume to fade to.
   * @param milliseconds The time in milliseconds the fade should take finish.
   */
  fadeTo(volume: number, milliseconds: number): void;

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
   * @param mute true to mute and false to unmute.
   */
  setMuted(mute: boolean): void;

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
   * @param volume The new volume of this track.
   */
  setVolume(volume: number): void;

  getPitch(): number;

  setPitch(pitch?: number): void;

  /**
   * Sets the base volume of this track and then applies modifiers to get the final output volume.
   * @param volume The new volume of this track.
   * @param masterVolume The current master volume level.
   * @param categoryVolume The current volume of this track's category.
   */
  setVolumeWithModifiers(volume: number, masterVolume: number, categoryVolume: number): void;

  /**
   * Gets the current time position within the track timeline.
   * @returns the time position
   */
  getTimePos(): number;

  /**
   * Sets the current time position within the track timeline.
   * @param pos The time position to set the track to.
   */
  setTimePos(pos: number): void;

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
   * @param eventName The event to listen for.
   * @param callback The callback to call when the event occurs.
   */
  on(eventName: string, callback: () => void): void;

  /**
   * Unregister a callback from an event.
   * @param eventName The event that was listened for.
   * @param callback The callback to call when the event occured. Omit this to remove all events of type.
   */
  off(eventName: string, callback?: () => void): void;

  /**
   * Shortcut to register a callback to an event and have it only be called once.
   * @param eventName The event to listen for.
   * @param callback The callback to call when the event occurs.
   */
  once(eventName: string, callback: () => void): void;
}
