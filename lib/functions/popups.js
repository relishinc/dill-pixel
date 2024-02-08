import { PopupToken } from '../popup';
import { Signals } from '../signals';
export function showPopup(data) {
    if (data.constructor) {
        // it is a PopupToken
        Signals.showPopup.emit(data);
    }
    // it is a PopupConfig
    const token = new PopupToken(data.id, data.callback, data.backdrop, data.keyboard, data.data);
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
//# sourceMappingURL=popups.js.map