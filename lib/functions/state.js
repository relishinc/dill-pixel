import { Application } from '../core';
import { Signals } from '../signals';
export function registerState(stateIdOrClass, creationMethod, autoAddAssets = true) {
    Application.getInstance().state.register(stateIdOrClass, creationMethod, autoAddAssets);
}
export function loadState(token) {
    Signals.loadState.emit(token);
}
export function initState(data) {
    Signals.initState.emit(data);
}
export function showLoadScreen(data) {
    Signals.showLoadScreen.emit(data);
}
export function hideLoadScreen(data) {
    Signals.hideLoadScreen.emit(data);
}
export function stateTransitionHalted(token) {
    Signals.stateTransitionHalted.emit(token);
}
// export convenience methods for all the load manager signals
export function loadAssets(token) {
    Signals.loadAssets.emit(token);
}
export function unloadAssets(token) {
    Signals.unloadAssets.emit(token);
}
export function loadAudioFromAssetMap(opts) {
    Signals.loadAudioFromAssetMap.emit(opts);
}
export function loadComplete() {
    Signals.loadComplete.emit();
}
export function loadScreenHidden() {
    Signals.loadScreenHidden.emit();
}
//# sourceMappingURL=state.js.map