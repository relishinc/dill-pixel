import { IPopup, IPopupToken } from '../popup';
import { Signals } from '../signals';

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
