import { Signal } from '../../signals';
import { IPlugin, Plugin } from '../Plugin';
import { IAudioInstance } from './AudioInstance';

export type PlayMode = 'append' | 'override' | 'new';
export type VoCallback = (didPlay: boolean) => void;
export type VoKey = string | number;
export type Caption = {
    id: string;
    args?: {
        [key: string]: string;
    };
};
export interface IPlayVoiceOverOptions {
    mode?: PlayMode;
    priority?: number;
    callback?: VoCallback;
    localized?: boolean;
}
export interface IVoiceOverPlugin extends IPlugin {
    fadeOutDuration: number;
    debug: boolean;
    onVoiceOverStart: Signal<(instance: IAudioInstance) => void>;
    onVoiceOverPaused: Signal<(instance: IAudioInstance) => void>;
    onVoiceOverResumed: Signal<(instance: IAudioInstance) => void>;
    onVoiceOverComplete: Signal<(instance: IAudioInstance) => void>;
    onVoiceOverStopped: Signal<(instance?: IAudioInstance) => void>;
    paused: boolean;
    playVO(key: VoKey | VoKey[], mode?: PlayMode, callback?: VoCallback): Promise<IAudioInstance>;
    playVO(key: VoKey | VoKey[], callback?: VoCallback): Promise<IAudioInstance>;
    playVO(key: VoKey | VoKey[], options?: IPlayVoiceOverOptions): Promise<IAudioInstance>;
    stopVO(): Promise<void>;
    pauseVO(): void;
    resumeVO(): void;
}
export declare class VoiceOverPlugin extends Plugin implements IVoiceOverPlugin {
    readonly id = "voiceover";
    fadeOutDuration: number;
    debug: boolean;
    onVoiceOverStart: Signal<(instance: IAudioInstance) => void>;
    onVoiceOverPaused: Signal<(instance: IAudioInstance) => void>;
    onVoiceOverComplete: Signal<(instance: IAudioInstance) => void>;
    onVoiceOverResumed: Signal<(instance: IAudioInstance) => void>;
    onVoiceOverStopped: Signal<(instance?: IAudioInstance) => void>;
    private readonly _queue;
    private readonly _pausedQueue;
    private _paused;
    get paused(): boolean;
    get activeTimeout(): gsap.core.Tween | undefined;
    get activeVO(): IAudioInstance | undefined;
    initialize(): Promise<void>;
    playVO(key: VoKey | VoKey[], mode?: PlayMode, callback?: VoCallback): Promise<IAudioInstance>;
    playVO(key: VoKey | VoKey[], callback?: VoCallback): Promise<IAudioInstance>;
    playVO(key: VoKey | VoKey[], options?: IPlayVoiceOverOptions): Promise<IAudioInstance>;
    stopVO(): Promise<void>;
    pauseVO(): void;
    resumeVO(): void;
    protected getCoreSignals(): string[];
    private addToQueue;
    private playNext;
    private _handleActiveVOStarted;
    private _handleActiveVOPaused;
    private _handleActiveVOResumed;
    private _handleActiveVOEndedWithoutPlaying;
    private _handleActiveVOEnded;
    private _currentItemCallback;
    private onPause;
    private onResume;
}
//# sourceMappingURL=VoiceOverPlugin.d.ts.map