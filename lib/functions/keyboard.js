import { Application } from '../core';
import { Signals } from '../signals';
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
// Actual function implementation
export function unregisterFocusables(...focusables) {
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
    Signals.unregisterFocusables.emit(focusablesArray);
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
export function getNumKeyboardLayers() {
    return Application.instance.keyboard.numLayers;
}
export function addKeyboardLayer() {
    Signals.pushKeyboardLayer.emit();
}
export function pushKeyboardLayer() {
    Signals.pushKeyboardLayer.emit();
}
export function removeKeyboardLayer() {
    Signals.popKeyboardLayer.emit();
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
export function updateFocus() {
    Signals.keyboardReFocus.emit();
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
//# sourceMappingURL=keyboard.js.map