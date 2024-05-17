import { Howl } from 'howler';
import { WithRequiredProps } from '../utils';
import { IAudioManager } from './IAudioManager';
import { IAudioTrack } from './IAudioTrack';
/**
 * Type for audio track configuration.
 */
export type AudioTrackConfig = {
    id: string;
    category: string;
    volume?: number;
    loop?: boolean;
};
/**
 * Type for required audio track configuration.
 */
export type RequiredAudioTrackConfig = WithRequiredProps<AudioTrackConfig, 'id'>;
/**
 * Class representing a Howler audio track.
 */
export declare class HowlerTrack implements IAudioTrack {
    /**
     * File extensions that Howler will attempt to load audio files with, in this order.
     * @default ["webm", "mp3", "ogg", "m4a"]
     */
    static FILE_EXTENSIONS: string[];
    private _id;
    private _source;
    private _volume;
    private _category;
    private _audioManager;
    private _urls;
    /**
     * Get default URLs for the audio track.
     * @param _id - The ID of the audio track.
     * @returns An array of URLs.
     */
    private static getDefaultUrls;
    /**
     * Create a new Howler audio track.
     * @param trackId - The ID of the audio track.
     * @param category - The category of the audio track.
     * @param audioManager - The audio manager for the audio track.
     * @param volume - The volume of the audio track.
     * @param loop - Whether the audio track should loop.
     */
    constructor(trackId: string, category: string, audioManager: IAudioManager, volume?: number, loop?: boolean);
    /**
     * Get the ID of the audio track.
     * @returns The ID of the audio track.
     */
    get id(): string;
    /**
     * Play the audio track.
     */
    play(): void;
    /**
     * Pause the audio track.
     */
    pause(): void;
    /**
     * Stop the audio track.
     */
    stop(): void;
    /**
     * Fade the audio track to a specified volume over a specified duration.
     * @param volume - The target volume.
     * @param milliseconds - The duration of the fade.
     */
    fadeTo(volume: number, milliseconds: number): void;
    /**
     * Unload the source of the audio track.
     */
    unloadSource(): void;
    /**
     * Load the source of the audio track.
     */
    loadSource(): void;
    /**
     * Check if the audio track is muted.
     * @returns Whether the audio track is muted.
     */
    isMuted(): boolean;
    /**
     * Set whether the audio track is muted.
     * @param value - Whether the audio track should be muted.
     */
    setMuted(value: boolean): void;
    /**
     * Check if the audio track is looped.
     * @returns Whether the audio track is looped.
     */
    isLooped(): boolean;
    /**
     * Set whether the audio track is looped.
     * @param pLoop - Whether the audio track should be looped.
     */
    setLooped(pLoop: boolean): void;
    /**
     * Get the volume of the audio track.
     * @returns The volume of the audio track.
     */
    getVolume(): number;
    /**
     * Set the volume of the audio track.
     * @param volume - The volume of the audio track.
     */
    setVolume(volume: number): void;
    /**
     * Set the volume of the audio track with modifiers.
     * @param volume - The volume of the audio track.
     * @param masterVolume - The master volume.
     * @param categoryVolume - The category volume.
     */
    setVolumeWithModifiers(volume: number, masterVolume: number, categoryVolume: number): void;
    /**
     * Set the pitch of the audio track.
     * @param pitch - The pitch of the audio track.
     */
    setPitch(pitch?: number): void;
    /**
     * Get the pitch of the audio track.
     * @returns The pitch of the audio track.
     */
    getPitch(): number;
    /**
     * Get the time position of the audio track.
     * @returns The time position of the audio track.
     */
    getTimePos(): number;
    /**
     * Set the time position of the audio track.
     * @param pPos - The time position of the audio track.
     */
    setTimePos(pPos: number): void;
    /**
     * Get the duration of the audio track.
     * @returns The duration of the audio track.
     */
    getDuration(): number;
    /**
     * Check if the audio track is playing.
     * @returns Whether the audio track is playing.
     */
    isPlaying(): boolean;
    /**
     * Add an event listener to the audio track.
     * @param eventName - The name of the event.
     * @param callback - The callback function.
     */
    on(eventName: string, callback: () => void): void;
    /**
     * Remove an event listener from the audio track.
     * @param eventName - The name of the event.
     * @param callback - The callback function.
     */
    off(eventName: string, callback?: () => void): void;
    /**
     * Add an event listener to the audio track that will be called once.
     * @param eventName - The name of the event.
     * @param callback - The callback function.
     */
    once(eventName: string, callback: () => void): void;
    /**
     * Get the source of the audio track.
     * @returns The source of the audio track.
     */
    getSource(): Howl;
    /**
     * Handle an error when loading the audio track.
     * @param pID - The ID of the audio track.
     * @param pError - The error.
     */
    private onLoadError;
}
//# sourceMappingURL=HowlerTrack.d.ts.map