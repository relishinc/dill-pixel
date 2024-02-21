import { IPoint } from 'pixi.js';
import { Signal } from 'typed-signals';
import { AudioToken } from '../audio';
import { Draggable, IFocusable, IKeyboardStatus, KeyboardMapToken } from '../input';
import { AssetMapAudioData, LoadToken } from '../load';
import { IPopup, IPopupToken } from '../popup';
import { StateToken } from '../state';
export declare class Signals {
    static onResize: Signal<(size: IPoint) => void>;
    static showPopup: Signal<(token: IPopupToken) => void>;
    static hidePopup: Signal<(id: string) => void>;
    static hideTopMostPopup: Signal<() => void>;
    static hideAllPopups: Signal<() => void>;
    static hidePopupComplete: Signal<(popup: IPopup) => void>;
    static registerFocusable: Signal<(focusable: IFocusable) => void>;
    static registerFocusables: Signal<(focusables: IFocusable[]) => void>;
    static unregisterFocusable: Signal<(focusable: IFocusable) => void>;
    static unregisterFocusables: Signal<(focusables: IFocusable[]) => void>;
    static unregisterAllFocusables: Signal<() => void>;
    static clearFocus: Signal<() => void>;
    static forceFocus: Signal<(focusable: IFocusable) => void>;
    static forceNeighbours: Signal<(token: KeyboardMapToken | KeyboardMapToken[]) => void>;
    static clearNeighbours: Signal<() => void>;
    static pushKeyboardLayer: Signal<() => void>;
    static popKeyboardLayer: Signal<() => void>;
    static setKeyboardEnabled: Signal<(enabled: boolean) => void>;
    static getKeyboardStatus: Signal<(handler: (status: IKeyboardStatus) => void) => void>;
    static keyboardReFocus: Signal<() => void>;
    static keyboardFocusBegin: Signal<(focusable: IFocusable) => void>;
    static keyboardFocusEnd: Signal<(focusable: IFocusable) => void>;
    static loadState: Signal<(token: StateToken) => void>;
    static initState: Signal<(data?: any) => void>;
    static showLoadScreen: Signal<(opts: {
        callback: () => void;
        loadScreen: string;
        stateData: any;
        firstLoad?: boolean;
    }) => void>;
    static hideLoadScreen: Signal<(data: {
        callback: () => void;
        loadScreen: string;
    }) => void>;
    static stateTransitionHalted: Signal<(token: StateToken | undefined) => void>;
    static stateTransitionStart: Signal<(id: string) => void>;
    static stateTransitionComplete: Signal<(id: string) => void>;
    static loadAssets: Signal<(token: LoadToken) => void>;
    static unloadAssets: Signal<(token: LoadToken) => void>;
    static loadAudioFromAssetMap: Signal<(opts: {
        assets: AssetMapAudioData[];
        progressCallback: (progress: number) => void;
        callback: () => void;
    }) => void>;
    static loadScreenHidden: Signal<() => void>;
    static loadComplete: Signal<() => void>;
    static orientationPortrait: Signal<() => void>;
    static orientationLandscape: Signal<() => void>;
    static playAudio: Signal<(token: AudioToken) => void>;
    static loadAudio: Signal<(opts: {
        assets: string[];
        category: string;
        callback: () => void;
    }) => void>;
    static stopAudio: Signal<(id: string) => void>;
    static audioContextSuspendedError: Signal<() => void>;
    static audioLoadError: Signal<(opts: {
        id: string;
        category: string;
        src: string;
        fallback: string[];
        error: any;
    }) => void>;
    static onAudioCategoryVolumeChanged: Signal<(detail: {
        category: string;
        volume: number;
        masterVolume: number;
    }) => void>;
    static playCaption: Signal<(opts: {
        id: string;
        args?: any;
        data?: any;
    }) => void>;
    static stopCaption: Signal<(opts: {
        id: string;
    }) => void>;
    static voiceoverStarted: Signal<(key: string) => void>;
    static voiceoverEnded: Signal<(key: string) => void>;
    static draggableSelected: Signal<(draggable: Draggable) => void>;
    static draggableDeselected: Signal<(draggable: Draggable) => void>;
    static dragBegin: Signal<(draggable: Draggable) => void>;
    static dragEnd: Signal<(draggable: Draggable) => void>;
    static pause: Signal<() => void>;
    static unpause: Signal<() => void>;
    static changeLanguage: Signal<(languageId: string) => void>;
    static onLanguageChanged: Signal<(languageId: string) => void>;
}
//# sourceMappingURL=Signals.d.ts.map