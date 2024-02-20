import { AudioToken } from '../audio';
export declare function playAudio(data: AudioToken): void;
export declare function loadAudio(opts: {
    assets: string[];
    category: string;
    callback: () => void;
}): void;
export declare function stopAudio(id: string): void;
export declare function audioLoadError(opts: {
    id: string;
    category: string;
    src: string;
    fallback: string[];
    error: any;
}): void;
export declare function playCaption(opts: {
    id: string;
    args?: any;
    data?: any;
}): void;
export declare function stopCaption(opts: {
    id: string;
}): void;
export declare function voiceoverStarted(key: string): void;
export declare function voiceoverEnded(key: string): void;
//# sourceMappingURL=audio.d.ts.map