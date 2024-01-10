import { Signals } from '../signals';
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
//# sourceMappingURL=popups.js.map