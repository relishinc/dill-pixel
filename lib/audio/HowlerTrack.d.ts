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
    constructor(pId: string, pCategory: string, pAudioManager: IAudioManager, pVolume?: number, pLoop?: boolean);
    private static getDefaultUrls;
    get id(): string;
    getSource(): Howl;
    play(): void;
    pause(): void;
    stop(): void;
    fadeTo(pVolume: number, pMilliseconds: number): void;
    unloadSource(): void;
    loadSource(): void;
    isMuted(): boolean;
    setMuted(pMute: boolean): void;
    isLooped(): boolean;
    setLooped(pLoop: boolean): void;
    getVolume(): number;
    setVolume(pVolume: number): void;
    setVolumeWithModifiers(pVolume: number, pMasterVolume: number, pCategoryVolume: number): void;
    getTimePos(): number;
    setTimePos(pPos: number): void;
    getDuration(): number;
    isPlaying(): boolean;
    on(pEvent: string, pCallback: () => void): void;
    off(pEvent: string, pCallback?: () => void): void;
    once(pEvent: string, pCallback: () => void): void;
    private onLoadError;
}
//# sourceMappingURL=HowlerTrack.d.ts.map