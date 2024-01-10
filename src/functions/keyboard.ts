import { Application } from '../core';

// export convenience methods for all the keyboard signals
import { IFocusable, IKeyboardStatus, KeyboardMapToken } from '../input';
import { Signals } from '../signals';

export function registerFocusable(focusable: IFocusable): void {
  Signals.registerFocusable.emit(focusable);
}

// Function overloads
export function registerFocusables(focusables: IFocusable[]): void;
export function registerFocusables(...focusables: IFocusable[]): void;
// Actual function implementation
export function registerFocusables(...focusables: IFocusable[] | [IFocusable[]]): void {
  let focusablesArray: IFocusable[];
  // If the first argument is an array, use it directly. Otherwise, use the whole arguments array.
  if (focusables.length === 1 && Array.isArray(focusables[0])) {
    // If the first (and only) argument is an array, use it directly.
    focusablesArray = focusables[0];
  } else {
    // Otherwise, treat it as a spread of IFocusable objects.
    focusablesArray = focusables as IFocusable[];
  }
  Signals.registerFocusables.emit(focusablesArray);
}

export function unregisterFocusable(focusable: IFocusable): void {
  Signals.unregisterFocusable.emit(focusable);
}

// Function overloads
export function unregisterFocusables(focusables: IFocusable[]): void;
export function unregisterFocusables(...focusables: IFocusable[]): void;
// Actual function implementation
export function unregisterFocusables(...focusables: IFocusable[] | [IFocusable[]]): void {
  let focusablesArray: IFocusable[];
  // If the first argument is an array, use it directly. Otherwise, use the whole arguments array.
  if (focusables.length === 1 && Array.isArray(focusables[0])) {
    // If the first (and only) argument is an array, use it directly.
    focusablesArray = focusables[0];
  } else {
    // Otherwise, treat it as a spread of IFocusable objects.
    focusablesArray = focusables as IFocusable[];
  }
  Signals.unregisterFocusables.emit(focusablesArray);
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

export function getNumKeyboardLayers(): number {
  return Application.instance.keyboard.numLayers;
}

export function addKeyboardLayer(): void {
  Signals.pushKeyboardLayer.emit();
}

export function pushKeyboardLayer(): void {
  Signals.pushKeyboardLayer.emit();
}

export function removeKeyboardLayer(): void {
  Signals.popKeyboardLayer.emit();
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

export function updateFocus() {
  Signals.keyboardReFocus.emit();
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
