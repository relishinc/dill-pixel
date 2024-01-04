import { Signal } from 'typed-signals';
// export convenience methods for all the popup signals
export function showPopup(token) {
    Signals.showPopup.emit(token);
}
export function hidePopup(id) {
    Signals.hidePopup.emit(id);
}
export function hideTopMostPopup() {
    Signals.hideTopMostPopup.emit();
}
export function hideAllPopups() {
    Signals.hideAllPopups.emit();
}
export function hidePopupComplete(popup) {
    Signals.hidePopupComplete.emit(popup);
}
// export convenience methods for all the keyboard signals
export function registerFocusable(focusable) {
    Signals.registerFocusable.emit(focusable);
}
// Actual function implementation
export function registerFocusables(...focusables) {
    let focusablesArray;
    // If the first argument is an array, use it directly. Otherwise, use the whole arguments array.
    if (focusables.length === 1 && Array.isArray(focusables[0])) {
        // If the first (and only) argument is an array, use it directly.
        focusablesArray = focusables[0];
    }
    else {
        // Otherwise, treat it as a spread of IFocusable objects.
        focusablesArray = focusables;
    }
    Signals.registerFocusables.emit(focusablesArray);
}
export function unregisterFocusable(focusable) {
    Signals.unregisterFocusable.emit(focusable);
}
export function unregisterFocusables(focusables) {
    Signals.unregisterFocusables.emit(focusables);
}
export function unregisterAllFocusables() {
    Signals.unregisterAllFocusables.emit();
}
export function clearFocus() {
    Signals.clearFocus.emit();
}
export function forceFocus(focusable) {
    Signals.forceFocus.emit(focusable);
}
export function forceNeighbours(token) {
    Signals.forceNeighbours.emit(token);
}
export function clearNeighbours() {
    Signals.clearNeighbours.emit();
}
export function pushKeyboardLayer() {
    Signals.pushKeyboardLayer.emit();
}
export function popKeyboardLayer() {
    Signals.popKeyboardLayer.emit();
}
export function setKeyboardEnabled(enabled) {
    Signals.setKeyboardEnabled.emit(enabled);
}
export function getKeyboardStatus(handler) {
    Signals.getKeyboardStatus.emit(handler);
}
export function keyboardReFocus() {
    Signals.keyboardReFocus.emit();
}
export function keyboardFocusBegin(focusable) {
    Signals.keyboardFocusBegin.emit(focusable);
}
export function keyboardFocusEnd(focusable) {
    Signals.keyboardFocusEnd.emit(focusable);
}
// export convenience methods for all the state manager signals
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
// convenience methods for all the orientation manager signals
export function orientationPortrait() {
    Signals.orientationPortrait.emit();
}
export function orientationLandscape() {
    Signals.orientationLandscape.emit();
}
// convenience methods for all the audio manager signals
export function playAudio(token) {
    Signals.playAudio.emit(token);
}
export function loadAudio(opts) {
    Signals.loadAudio.emit(opts);
}
export function stopAudio(id) {
    Signals.stopAudio.emit(id);
}
export function audioLoadError(opts) {
    Signals.audioLoadError.emit(opts);
}
// convenience methods for caption / voiceover signals
export function playCaption(opts) {
    Signals.playCaption.emit(opts);
}
export function stopCaption(opts) {
    Signals.stopCaption.emit(opts);
}
export function voiceoverStarted(key) {
    Signals.voiceoverStarted.emit(key);
}
export function voiceoverEnded(key) {
    Signals.voiceoverEnded.emit(key);
}
// convenience methods for all the draggable signals
export function draggableSelected(draggable) {
    Signals.draggableSelected.emit(draggable);
}
export function draggableDeselected(draggable) {
    Signals.draggableDeselected.emit(draggable);
}
export function dragBegin(draggable) {
    Signals.dragBegin.emit(draggable);
}
export function dragEnd(draggable) {
    Signals.dragEnd.emit(draggable);
}
// convenience pause / unpause signals
export function pause() {
    Signals.pause.emit();
}
export function unpause() {
    Signals.unpause.emit();
}
export function changeLanguage(languageId) {
    Signals.changeLanguage.emit(languageId);
}
export class Signals {
    // resize signal
    static { this.onResize = new Signal(); }
    // popup signals
    static { this.showPopup = new Signal(); }
    static { this.hidePopup = new Signal(); }
    static { this.hideTopMostPopup = new Signal(); }
    static { this.hideAllPopups = new Signal(); }
    static { this.hidePopupComplete = new Signal(); }
    // keyboard signals
    static { this.registerFocusable = new Signal(); }
    static { this.registerFocusables = new Signal(); }
    static { this.unregisterFocusable = new Signal(); }
    static { this.unregisterFocusables = new Signal(); }
    static { this.unregisterAllFocusables = new Signal(); }
    static { this.clearFocus = new Signal(); }
    static { this.forceFocus = new Signal(); }
    static { this.forceNeighbours = new Signal(); }
    static { this.clearNeighbours = new Signal(); }
    static { this.pushKeyboardLayer = new Signal(); }
    static { this.popKeyboardLayer = new Signal(); }
    static { this.setKeyboardEnabled = new Signal(); }
    static { this.getKeyboardStatus = new Signal(); }
    static { this.keyboardReFocus = new Signal(); }
    static { this.keyboardFocusBegin = new Signal(); }
    static { this.keyboardFocusEnd = new Signal(); }
    // state manager signals
    static { this.loadState = new Signal(); }
    static { this.initState = new Signal(); }
    static { this.showLoadScreen = new Signal(); }
    static { this.hideLoadScreen = new Signal(); }
    static { this.stateTransitionHalted = new Signal(); }
    // load manager signals
    static { this.loadAssets = new Signal(); }
    static { this.unloadAssets = new Signal(); }
    static { this.loadAudioFromAssetMap = new Signal(); }
    static { this.loadScreenHidden = new Signal(); }
    static { this.loadComplete = new Signal(); }
    // orientation manager signals
    static { this.orientationPortrait = new Signal(); }
    static { this.orientationLandscape = new Signal(); }
    // audio manager signals
    static { this.playAudio = new Signal(); }
    static { this.loadAudio = new Signal(); }
    static { this.stopAudio = new Signal(); }
    static { this.audioLoadError = new Signal(); }
    // caption / voiceover signals
    static { this.playCaption = new Signal(); }
    static { this.stopCaption = new Signal(); }
    static { this.voiceoverStarted = new Signal(); }
    static { this.voiceoverEnded = new Signal(); }
    // draggable signals
    static { this.draggableSelected = new Signal(); }
    static { this.draggableDeselected = new Signal(); }
    static { this.dragBegin = new Signal(); }
    static { this.dragEnd = new Signal(); }
    // pause / unpause
    static { this.pause = new Signal(); }
    static { this.unpause = new Signal(); }
    // language signals
    static { this.changeLanguage = new Signal(); }
    static { this.onLanguageChanged = new Signal(); }
}
//# sourceMappingURL=Signals.js.map