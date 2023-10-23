import { IPoint } from 'pixi.js';
import { Signal } from 'typed-signals';
import { AudioToken } from '../audio';
import { Draggable, IFocusable, IKeyboardStatus, KeyboardMapToken } from '../input';
import { AssetMapAudioData, LoadToken } from '../load';
import { IPopup, IPopupToken } from '../popup';
import { StateToken } from '../state';
export declare function showPopup(token: IPopupToken): void;
export declare function hidePopup(id: string): void;
export declare function hideTopMostPopup(): void;
export declare function hideAllPopups(): void;
export declare function hidePopupComplete(popup: IPopup): void;
export declare function registerFocusable(focusable: IFocusable): void;
export declare function registerFocusables(focusables: IFocusable[]): void;
export declare function unregisterFocusable(focusable: IFocusable | ((it: IFocusable) => boolean)): void;
export declare function unregisterFocusables(focusables: (IFocusable | ((it: IFocusable) => boolean))[]): void;
export declare function unregisterAllFocusables(): void;
export declare function clearFocus(): void;
export declare function forceFocus(focusable: IFocusable): void;
export declare function forceNeighbours(token: KeyboardMapToken | KeyboardMapToken[]): void;
export declare function clearNeighbours(): void;
export declare function pushKeyboardLayer(): void;
export declare function popKeyboardLayer(): void;
export declare function setKeyboardEnabled(enabled: boolean): void;
export declare function getKeyboardStatus(handler: (status: IKeyboardStatus) => void): void;
export declare function keyboardReFocus(): void;
export declare function keyboardFocusBegin(focusable: IFocusable): void;
export declare function keyboardFocusEnd(focusable: IFocusable): void;
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
export declare function orientationPortrait(): void;
export declare function orientationLandscape(): void;
export declare function playAudio(token: AudioToken): void;
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
}): void;
export declare function stopCaption(opts: {
    id: string;
}): void;
export declare function voiceoverStarted(key: string): void;
export declare function voiceoverEnded(key: string): void;
export declare function draggableSelected(draggable: Draggable): void;
export declare function draggableDeselected(draggable: Draggable): void;
export declare function dragBegin(draggable: Draggable): void;
export declare function dragEnd(draggable: Draggable): void;
export declare function pause(): void;
export declare function unpause(): void;
export declare function changeLanguage(languageId: string): void;
export declare class Signals {
    static onResize: Signal<(size: IPoint) => void>;
    static showPopup: Signal<(token: IPopupToken) => void>;
    static hidePopup: Signal<(id: string) => void>;
    static hideTopMostPopup: Signal<() => void>;
    static hideAllPopups: Signal<() => void>;
    static hidePopupComplete: Signal<(popup: IPopup) => void>;
    static registerFocusable: Signal<(focusable: IFocusable) => void>;
    static registerFocusables: Signal<(focusables: IFocusable[]) => void>;
    static unregisterFocusable: Signal<(focusable: IFocusable | ((it: IFocusable) => boolean)) => void>;
    static unregisterFocusables: Signal<(focusables: (IFocusable | ((it: IFocusable) => boolean))[]) => void>;
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
    static audioLoadError: Signal<(opts: {
        id: string;
        category: string;
        src: string;
        fallback: string[];
        error: any;
    }) => void>;
    static playCaption: Signal<(opts: {
        id: string;
        args?: any;
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