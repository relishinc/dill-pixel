import {IPoint} from 'pixi.js';
import {Signal} from 'typed-signals';
import {AudioToken} from '../audio';
import {Draggable, IFocusable, IKeyboardStatus, KeyboardMapToken} from '../input';
import {AssetMapAudioData, LoadToken} from '../load';
import {IPopup, IPopupToken} from '../popup';
import {StateToken} from '../state';

// export convenience methods for all the popup signals
export function showPopup(token: IPopupToken): void {
  Signals.showPopup.emit(token);
}

export function hidePopup(id: string): void {
  Signals.hidePopup.emit(id);
}

export function hideTopMostPopup(): void {
  Signals.hideTopMostPopup.emit();
}

export function hideAllPopups(): void {
  Signals.hideAllPopups.emit();
}

export function hidePopupComplete(popup: IPopup): void {
  Signals.hidePopupComplete.emit(popup);
}

// export convenience methods for all the keyboard signals
export function registerFocusable(focusable: IFocusable): void {
  Signals.registerFocusable.emit(focusable);
}

export function registerFocusables(focusables: IFocusable[]): void {
  Signals.registerFocusables.emit(focusables);
}

export function unregisterFocusable(focusable: IFocusable | ((it: IFocusable) => boolean)): void {
  Signals.unregisterFocusable.emit(focusable);
}

export function unregisterFocusables(focusables: (IFocusable | ((it: IFocusable) => boolean))[]): void {
  Signals.unregisterFocusables.emit(focusables);
}

export function unregisterAllFocusables(): void {
  Signals.unregisterAllFocusables.emit();
}

export function clearFocus(): void {
  Signals.clearFocus.emit();
}

export function forceFocus(focusable: IFocusable): void {
  Signals.forceFocus.emit(focusable);
}

export function forceNeighbours(token: KeyboardMapToken | KeyboardMapToken[]): void {
  Signals.forceNeighbours.emit(token);
}

export function clearNeighbours(): void {
  Signals.clearNeighbours.emit();
}

export function pushKeyboardLayer(): void {
  Signals.pushKeyboardLayer.emit();
}

export function popKeyboardLayer(): void {
  Signals.popKeyboardLayer.emit();
}

export function setKeyboardEnabled(enabled: boolean): void {
  Signals.setKeyboardEnabled.emit(enabled);
}

export function getKeyboardStatus(handler: (status: IKeyboardStatus) => void): void {
  Signals.getKeyboardStatus.emit(handler);
}

export function keyboardReFocus(): void {
  Signals.keyboardReFocus.emit();
}

export function keyboardFocusBegin(focusable: IFocusable): void {
  Signals.keyboardFocusBegin.emit(focusable);
}

export function keyboardFocusEnd(focusable: IFocusable): void {
  Signals.keyboardFocusEnd.emit(focusable);
}

// export convenience methods for all the state manager signals
export function loadState(token: StateToken): void {
  Signals.loadState.emit(token);
}

export function initState(data?: any): void {
  Signals.initState.emit(data);
}

export function showLoadScreen(data: {
  callback: () => void;
  loadScreen: string;
  stateData: any;
  firstLoad: boolean;
}): void {
  Signals.showLoadScreen.emit(data);
}

export function hideLoadScreen(data: { callback: () => void; loadScreen: string }): void {
  Signals.hideLoadScreen.emit(data);
}

export function stateTransitionHalted(token: StateToken | undefined): void {
  Signals.stateTransitionHalted.emit(token);
}

// export convenience methods for all the load manager signals
export function loadAssets(token: LoadToken): void {
  Signals.loadAssets.emit(token);
}

export function unloadAssets(token: LoadToken): void {
  Signals.unloadAssets.emit(token);
}

export function loadAudioFromAssetMap(opts: {
  assets: AssetMapAudioData[];
  progressCallback: (progress: number) => void;
  callback: () => void;
}): void {
  Signals.loadAudioFromAssetMap.emit(opts);
}

export function loadComplete(): void {
  Signals.loadComplete.emit();
}

export function loadScreenHidden(): void {
  Signals.loadScreenHidden.emit();
}

// convenience methods for all the orientation manager signals
export function orientationPortrait(): void {
  Signals.orientationPortrait.emit();
}

export function orientationLandscape(): void {
  Signals.orientationLandscape.emit();
}

// convenience methods for all the audio manager signals
export function playAudio(token: AudioToken): void {
  Signals.playAudio.emit(token);
}

export function loadAudio(opts: { assets: string[]; category: string; callback: () => void }): void {
  Signals.loadAudio.emit(opts);
}

export function stopAudio(id: string): void {
  Signals.stopAudio.emit(id);
}

export function audioLoadError(opts: {
  id: string;
  category: string;
  src: string;
  fallback: string[];
  error: any;
}): void {
  Signals.audioLoadError.emit(opts);
}

// convenience methods for caption / voiceover signals
export function playCaption(opts: { id: string; args?: any }): void {
  Signals.playCaption.emit(opts);
}

export function stopCaption(opts: { id: string }): void {
  Signals.stopCaption.emit(opts);
}

export function voiceoverStarted(key: string): void {
  Signals.voiceoverStarted.emit(key);
}

export function voiceoverEnded(key: string): void {
  Signals.voiceoverEnded.emit(key);
}

// convenience methods for all the draggable signals
export function draggableSelected(draggable: Draggable): void {
  Signals.draggableSelected.emit(draggable);
}

export function draggableDeselected(draggable: Draggable): void {
  Signals.draggableDeselected.emit(draggable);
}

export function dragBegin(draggable: Draggable): void {
  Signals.dragBegin.emit(draggable);
}

export function dragEnd(draggable: Draggable): void {
  Signals.dragEnd.emit(draggable);
}

// convenience pause / unpause signals
export function pause(): void {
  Signals.pause.emit();
}

export function unpause(): void {
  Signals.unpause.emit();
}

export class Signals {
  // resize signal
  public static onResize = new Signal<(size: IPoint) => void>();

  // popup signals
  public static showPopup = new Signal<(token: IPopupToken) => void>();
  public static hidePopup = new Signal<(id: string) => void>();
  public static hideTopMostPopup = new Signal<() => void>();
  public static hideAllPopups = new Signal<() => void>();
  public static hidePopupComplete = new Signal<(popup: IPopup) => void>();

  // keyboard signals
  public static registerFocusable = new Signal<(focusable: IFocusable) => void>();
  public static registerFocusables = new Signal<(focusables: IFocusable[]) => void>();
  public static unregisterFocusable = new Signal<(focusable: IFocusable | ((it: IFocusable) => boolean)) => void>();
  public static unregisterFocusables = new Signal<
    (focusables: (IFocusable | ((it: IFocusable) => boolean))[]) => void
  >();
  public static unregisterAllFocusables = new Signal<() => void>();
  public static clearFocus = new Signal<() => void>();
  public static forceFocus = new Signal<(focusable: IFocusable) => void>();
  public static forceNeighbours = new Signal<(token: KeyboardMapToken | KeyboardMapToken[]) => void>();
  public static clearNeighbours = new Signal<() => void>();
  public static pushKeyboardLayer = new Signal<() => void>();
  public static popKeyboardLayer = new Signal<() => void>();
  public static setKeyboardEnabled = new Signal<(enabled: boolean) => void>();
  public static getKeyboardStatus = new Signal<(handler: (status: IKeyboardStatus) => void) => void>();
  public static keyboardReFocus = new Signal<() => void>();
  public static keyboardFocusBegin = new Signal<(focusable: IFocusable) => void>();
  public static keyboardFocusEnd = new Signal<(focusable: IFocusable) => void>();

  // state manager signals
  public static loadState = new Signal<(token: StateToken) => void>();
  public static initState = new Signal<(data?: any) => void>();
  public static showLoadScreen = new Signal<
    (opts: { callback: () => void; loadScreen: string; stateData: any; firstLoad?: boolean }) => void
  >();

  public static hideLoadScreen = new Signal<(data: { callback: () => void; loadScreen: string }) => void>();

  public static stateTransitionHalted = new Signal<(token: StateToken | undefined) => void>();

  // load manager signals
  public static loadAssets = new Signal<(token: LoadToken) => void>();
  public static unloadAssets = new Signal<(token: LoadToken) => void>();
  public static loadAudioFromAssetMap = new Signal<
    (opts: { assets: AssetMapAudioData[]; progressCallback: (progress: number) => void; callback: () => void }) => void
  >();
  public static loadScreenHidden = new Signal<() => void>();
  public static loadComplete = new Signal<() => void>();

  // orientation manager signals
  public static orientationPortrait = new Signal<() => void>();
  public static orientationLandscape = new Signal<() => void>();

  // audio manager signals
  public static playAudio = new Signal<(token: AudioToken) => void>();
  public static loadAudio = new Signal<(opts: { assets: string[]; category: string; callback: () => void }) => void>();
  public static stopAudio = new Signal<(id: string) => void>();
  public static audioLoadError = new Signal<
    (opts: { id: string; category: string; src: string; fallback: string[]; error: any }) => void
  >();

  // caption / voiceover signals
  public static playCaption = new Signal<(opts: { id: string; args?: any }) => void>();
  public static stopCaption = new Signal<(opts: { id: string }) => void>();
  public static voiceoverStarted = new Signal<(key: string) => void>();
  public static voiceoverEnded = new Signal<(key: string) => void>();

  // draggable signals
  public static draggableSelected = new Signal<(draggable: Draggable) => void>();
  public static draggableDeselected = new Signal<(draggable: Draggable) => void>();
  public static dragBegin = new Signal<(draggable: Draggable) => void>();
  public static dragEnd = new Signal<(draggable: Draggable) => void>();

  // pause / unpause
  public static pause = new Signal<() => void>();
  public static unpause = new Signal<() => void>();
}
