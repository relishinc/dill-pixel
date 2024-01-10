import { AssetMapAudioData, LoadToken } from '../load';
import { StateToken } from '../state';
export declare function loadState(token: StateToken): void;
export declare function initState(data?: any): void;
export declare function showLoadScreen(data: {
    callback: () => void;
    loadScreen: string;
    stateData: any;
    firstLoad: boolean;
}): void;
export declare function hideLoadScreen(data: {
    callback: () => void;
    loadScreen: string;
}): void;
export declare function stateTransitionHalted(token: StateToken | undefined): void;
export declare function loadAssets(token: LoadToken): void;
export declare function unloadAssets(token: LoadToken): void;
export declare function loadAudioFromAssetMap(opts: {
    assets: AssetMapAudioData[];
    progressCallback: (progress: number) => void;
    callback: () => void;
}): void;
export declare function loadComplete(): void;
export declare function loadScreenHidden(): void;
//# sourceMappingURL=state.d.ts.map