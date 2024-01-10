import { Howl } from 'howler';
import { IAudioManager } from './IAudioManager';
import { IAudioTrack } from './IAudioTrack';
export declare class HowlerTrack implements IAudioTrack {
    /** Howler will attempt to load audio files with these extensions, in this order.
     * @default ["webm", "mp3", "ogg", "m4a"]
     */
    static FILE_EXTENSIONS: string[];
    private _id;
    private _source;
    private _volume;
    private _category;
    private _audioManager;
    private _urls;
    private static getDefaultUrls;
    constructor(trackId: string, category: string, audioManager: IAudioManager, volume?: number, loop?: boolean);
    get id(): string;
    play(): void;
    pause(): void;
    stop(): void;
    fadeTo(volume: number, milliseconds: number): void;
    unloadSource(): void;
    loadSource(): void;
    isMuted(): boolean;
    setMuted(value: boolean): void;
    isLooped(): boolean;
    setLooped(pLoop: boolean): void;
    getVolume(): number;
    setVolume(volume: number): void;
    setVolumeWithModifiers(volume: number, masterVolume: number, categoryVolume: number): void;
    setPitch(pitch?: number): void;
    getPitch(): number;
    getTimePos(): number;
    setTimePos(pPos: number): void;
    getDuration(): number;
    isPlaying(): boolean;
    on(eventName: string, callback: () => void): void;
    off(eventName: string, callback?: () => void): void;
    once(eventName: string, callback: () => void): void;
    getSource(): Howl;
    private onLoadError;
}
//# sourceMappingURL=HowlerTrack.d.ts.map