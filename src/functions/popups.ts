import { IPopup } from '../popup/IPopup';
import { PopupConfig, RequiredPopupConfig } from '../popup/Popup';
import { IPopupToken } from '../popup/PopupToken';
import { Signals } from '../signals/Signals';

export function showPopup(data: PopupConfig): void;
export function showPopup(data: IPopupToken | RequiredPopupConfig): void {
  if (data.constructor) {
    // it is a PopupToken
    Signals.showPopup.emit(data);
    return;
  }
  // it is a PopupConfig
  const token = new PopupToken(data.id, data.callback, data.backdrop, data.keyboard, data.data);
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
