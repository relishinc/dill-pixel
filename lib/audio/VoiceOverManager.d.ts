import { Application } from '../core';
import { HowlerTrack } from './HowlerTrack';
type Callback = (pDidPlay: boolean) => void;
export declare enum PlayMode {
    /** Play immediately if nothing else is playing, otherwise add to end of queue */
    Append = "append",
    /** Interrupt currently playing and queued VOs. This is the default PlayMode */
    Override = "override",
    /** Play immediately if nothing else is playing, otherwise don't play */
    New = "new"
}
export interface IPlayOptions {
    /** If true, do not trigger the {@link Signals.playCaption} signal */
    skipCC?: boolean;
    /** Override the data that is sent to the {@link Signals.playCaption} signal */
    caption?: {
        id: string;
        args: {
            [key: string]: string;
        };
    };
    /** Audio interruption behaviour */
    mode?: PlayMode;
    /** For fine-grained control, higher priority VOs will interrupt lower-priority ones */
    priority?: number;
    /** Callback when the voiceover completes playing or if the play request is rejected.
     * Not called, however, when the VO is stopped or interrupted by another VO.
     */
    callback?: Callback;
    data?: any;
}
export declare function playVO(key: string | (string | number)[], mode?: PlayMode | Callback | Partial<IPlayOptions>, callback?: Callback): void;
export declare function stopVO(): void;
export interface IVoiceOverManager {
    /** Duration, in milliseconds, of the fade out when stopping voiceovers. Must be greater than or equal to zero */
    FADE_OUT_DURATION: number;
    debug: boolean;
    /**
     * Whether a voiceover is currently playing
     */
    isPlaying: boolean;
    /**
     * Number of voiceovers in the queue
     */
    numInQueue: number;
    /**
     * Ids of voiceovers in the queue
     */
    queueIds: string[];
    /**
     * The currently playing voiceover
     */
    activeVO: HowlerTrack | undefined;
    /**
     * Play a Voiceover or sequence of voiceovers
     * @param key Id or array of voiceover Ids
     */
    playVO(key: string | (string | number)[]): void;
    /**
     * Play a Voiceover or sequence of voiceovers
     * @param key Id or array of voiceover Ids
     * @param mode Audio interruption behaviour. Default is {@link PlayMode.Override}
     */
    playVO(key: string | (string | number)[], mode: PlayMode): void;
    /**
     * Play a Voiceover or sequence of voiceovers
     * @param key Id or array of voiceover Ids
     * @param callback Called after the last voiceover finishes playing, or immediately if no playback occurs
     */
    playVO(key: string | (string | number)[], callback: Callback): void;
    /**
     * Play a Voiceover or sequence of voiceovers
     * @param key Id or array of voiceover Ids
     * @param options
     * @param options.mode Audio interruption behaviour. Default is {@link PlayMode.Override}
     * @param options.cb Called after the last voiceover finishes playing, or immediately if no playback occurs
     */
    playVO(key: string | (string | number)[], options: Partial<IPlayOptions>): void;
    /**
     * Play a Voiceover or sequence of voiceovers
     * @param key Id or array of voiceover Ids
     * @param mode Audio interruption behaviour. Default is {@link PlayMode.Override}
     * @param callback Called after the last voiceover finishes playing, or immediately if no playback occurs
     */
    playVO(key: string | (string | number)[], mode: PlayMode, callback: Callback): void;
    /**
     * Stop any currently playing VOs, and cancel any queued VOs.
     * Any callbacks (from {@link playVO}) will not be called.
     */
    stopVO(): void;
}
/**
 * Voiceover Manager controls voiceover audio playback and guarantees that only one voiceover will ever be playing at a time
 */
export declare class VoiceOverManager implements IVoiceOverManager {
    private app;
    FADE_OUT_DURATION: number;
    debug: boolean;
    private readonly _queue;
    private _activeTimeout?;
    private log;
    private warn;
    private error;
    constructor(app: Application);
    get activeVO(): HowlerTrack | undefined;
    get isPlaying(): boolean;
    get numInQueue(): number;
    get queueIds(): string[];
    playVO(key: string | (string | number)[], mode?: PlayMode | Callback | IPlayOptions, callback?: Callback): void;
    stopVO(): void;
    private playCaptionForSkippedVO;
    private addToQueue;
    private playNext;
    private onPause;
    private onResume;
}
export {};
//# sourceMappingURL=VoiceOverManager.d.ts.map