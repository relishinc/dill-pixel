import { IAudioInstance } from './AudioInstance';
import { IAudioManager } from './AudioManager';
export interface IAudioChannel {
    name: string;
    muted: boolean;
    volume: number;
    add(id: string, instance: IAudioInstance): IAudioInstance;
    get(id: string): IAudioInstance | undefined;
    remove(id: string): IAudioInstance | undefined;
    updateVolume(): void;
    destroy(): void;
}
export declare class AudioChannel {
    name: string;
    manager: IAudioManager;
    private _muted;
    private _volume;
    private _sounds;
    constructor(name: string, manager: IAudioManager);
    get muted(): boolean;
    set muted(value: boolean);
    get volume(): number;
    set volume(value: number);
    add(id: string, instance: IAudioInstance): IAudioInstance;
    get(id: string): IAudioInstance | undefined;
    remove(id: string): IAudioInstance | undefined;
    _setMuted(): void;
    updateVolume(): void;
    destroy(): void;
}
