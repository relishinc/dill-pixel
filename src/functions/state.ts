import { AssetMapAudioData, LoadToken } from '../load';
import { Signals } from '../signals';

// export convenience methods for all the state manager signals
import { StateToken } from '../state';

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
