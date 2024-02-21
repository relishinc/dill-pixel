import { IPoint } from 'pixi.js';
import { Signal } from 'typed-signals';
import { AudioToken } from '../audio';
import { Draggable, IFocusable, IKeyboardStatus, KeyboardMapToken } from '../input';
import { AssetMapAudioData, LoadToken } from '../load';
import { IPopup, IPopupToken } from '../popup';
import { StateToken } from '../state';

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
  public static unregisterFocusable = new Signal<(focusable: IFocusable) => void>();
  public static unregisterFocusables = new Signal<(focusables: IFocusable[]) => void>();
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
  public static stateTransitionStart = new Signal<(id: string) => void>();
  public static stateTransitionComplete = new Signal<(id: string) => void>();

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
  public static audioContextSuspendedError = new Signal<() => void>();
  public static audioLoadError = new Signal<
    (opts: { id: string; category: string; src: string; fallback: string[]; error: any }) => void
  >();
  public static onAudioCategoryVolumeChanged = new Signal<
    (detail: { category: string; volume: number; masterVolume: number }) => void
  >();

  // caption / voiceover signals
  public static playCaption = new Signal<(opts: { id: string; args?: any; data?: any }) => void>();
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

  // language signals
  public static changeLanguage = new Signal<(languageId: string) => void>();
  public static onLanguageChanged = new Signal<(languageId: string) => void>();
}
