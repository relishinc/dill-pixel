import { IAudioInstance } from './AudioInstance';
import { IAudioManagerPlugin } from './AudioManagerPlugin';

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
    manager: IAudioManagerPlugin;
    private _sounds;
    constructor(name: string, manager: IAudioManagerPlugin);
    private _muted;
    get muted(): boolean;
    set muted(value: boolean);
    private _volume;
    get volume(): number;
    set volume(value: number);
    add(id: string, instance: IAudioInstance): IAudioInstance;
    get(id: string): IAudioInstance | undefined;
    remove(id: string): IAudioInstance | undefined;
    _setMuted(): void;
    updateVolume(): void;
    destroy(): void;
}
//# sourceMappingURL=AudioChannel.d.ts.map