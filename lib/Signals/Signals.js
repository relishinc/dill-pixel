import { Signal } from "typed-signals";
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
export function registerFocusables(focusables) {
    Signals.registerFocusables.emit(focusables);
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
export class Signals {
}
// resize signal
Signals.onResize = new Signal();
// popup signals
Signals.showPopup = new Signal();
Signals.hidePopup = new Signal();
Signals.hideTopMostPopup = new Signal();
Signals.hideAllPopups = new Signal();
Signals.hidePopupComplete = new Signal();
// keyboard signals
Signals.registerFocusable = new Signal();
Signals.registerFocusables = new Signal();
Signals.unregisterFocusable = new Signal();
Signals.unregisterFocusables = new Signal();
Signals.unregisterAllFocusables = new Signal();
Signals.clearFocus = new Signal();
Signals.forceFocus = new Signal();
Signals.forceNeighbours = new Signal();
Signals.clearNeighbours = new Signal();
Signals.pushKeyboardLayer = new Signal();
Signals.popKeyboardLayer = new Signal();
Signals.setKeyboardEnabled = new Signal();
Signals.getKeyboardStatus = new Signal();
Signals.keyboardReFocus = new Signal();
Signals.keyboardFocusBegin = new Signal();
Signals.keyboardFocusEnd = new Signal();
// state manager signals
Signals.loadState = new Signal();
Signals.initState = new Signal();
Signals.showLoadScreen = new Signal();
Signals.hideLoadScreen = new Signal();
Signals.stateTransitionHalted = new Signal();
// load manager signals
Signals.loadAssets = new Signal();
Signals.unloadAssets = new Signal();
Signals.loadAudioFromAssetMap = new Signal();
Signals.loadScreenHidden = new Signal();
Signals.loadComplete = new Signal();
// orientation manager signals
Signals.orientationPortrait = new Signal();
Signals.orientationLandscape = new Signal();
// audio manager signals
Signals.playAudio = new Signal();
Signals.loadAudio = new Signal();
Signals.stopAudio = new Signal();
Signals.audioLoadError = new Signal();
// caption / voiceover signals
Signals.playCaption = new Signal();
Signals.stopCaption = new Signal();
Signals.voiceoverStarted = new Signal();
Signals.voiceoverEnded = new Signal();
// draggable signals
Signals.draggableSelected = new Signal();
Signals.draggableDeselected = new Signal();
Signals.dragBegin = new Signal();
Signals.dragEnd = new Signal();
// pause / unpause
Signals.pause = new Signal();
Signals.unpause = new Signal();
//# sourceMappingURL=Signals.js.map