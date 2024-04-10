import { IMediaInstance } from '@pixi/sound';
import { IAudioChannel } from './AudioChannel';
import { IAudioManager } from './AudioManager';
export interface IAudioInstance {
    volume: number;
    media: IMediaInstance;
    channel: IAudioChannel;
    muted: boolean;
    updateVolume(): void;
}
export declare class AudioInstance implements IAudioInstance {
    id: string;
    media: IMediaInstance;
    channel: IAudioChannel;
    manager: IAudioManager;
    private _volume;
    private _muted;
    constructor(id: string, media: IMediaInstance, channel: IAudioChannel, manager: IAudioManager);
    get muted(): boolean;
    set muted(value: boolean);
    get volume(): number;
    set volume(value: number);
    updateVolume(): void;
}
//# sourceMappingURL=AudioInstance.d.ts.map