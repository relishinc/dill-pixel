import { IMediaInstance } from '@pixi/sound';
import { Signal } from '../../signals';
import { IAudioChannel } from './AudioChannel';
import { IAudioManagerPlugin } from './AudioManagerPlugin';

export interface IAudioInstance {
    volume: number;
    media: IMediaInstance;
    channel: IAudioChannel;
    muted: boolean;
    id: string;
    manager: IAudioManagerPlugin;
    onStart: Signal<(instance: IAudioInstance) => void>;
    onStop: Signal<(instance: IAudioInstance) => void>;
    onEnd: Signal<(instance: IAudioInstance) => void>;
    onPaused: Signal<(instance: IAudioInstance) => void>;
    onResumed: Signal<(instance: IAudioInstance) => void>;
    isPlaying: boolean;
    fadeTo(volume: number, duration: number): gsap.core.Tween;
    stop(): void;
    destroy(): void;
    remove(): void;
    updateVolume(): void;
    addListeners(): void;
    removeListeners(): void;
    pause(): void;
    play(): void;
    resume(): void;
}
export declare class AudioInstance implements IAudioInstance {
    id: string;
    channel: IAudioChannel;
    manager: IAudioManagerPlugin;
    onStart: Signal<(instance: IAudioInstance) => void>;
    onStop: Signal<(instance: IAudioInstance) => void>;
    onEnd: Signal<(instance: IAudioInstance) => void>;
    onPaused: Signal<(instance: IAudioInstance) => void>;
    onResumed: Signal<(instance: IAudioInstance) => void>;
    onProgress: Signal<(instance: IAudioInstance) => void>;
    constructor(id: string, channel: IAudioChannel, manager: IAudioManagerPlugin);
    private _media;
    get media(): IMediaInstance;
    set media(value: IMediaInstance);
    private _volume;
    get volume(): number;
    set volume(value: number);
    private _muted;
    get muted(): boolean;
    set muted(value: boolean);
    private _isPlaying;
    get isPlaying(): boolean;
    pause(): void;
    resume(): void;
    remove(): void;
    stop(): void;
    updateVolume(): void;
    addListeners(): void;
    removeListeners(): void;
    destroy(): void;
    fadeTo(volume: number, duration: number): gsap.core.Tween;
    play(time?: number): void;
    private _handleMediaEnded;
    private _handleMediaStarted;
    private _handleMediaStopped;
    private _handleMediaPaused;
    private _handleMediaProgress;
    private _handleMediaResumed;
}
//# sourceMappingURL=AudioInstance.d.ts.map