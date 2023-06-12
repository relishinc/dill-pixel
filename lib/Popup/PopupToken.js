"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupToken = void 0;
/** This is the data struct that gets passed to SHOW_POPUP PubSub calls */
class PopupToken {
    /**
     * Create a new {@link PopupToken}
     * @param pId Note that IDs are, for now, shared among all instances of the same type of popup.
     * @param pCallback This gets called when the popup is closed
     * @param pBackdrop Whether to include a backdrop element. (Also variously referred to as "blackout" or "overlay")
     * Alternatively, specify `"static"` for a backdrop which doesn't close the popup on click.
     * @param pKeyboard Whether to close the popup when the escape key (or Android back button) is pressed.
     * @param pData Custom data sent to the popup
     */
    constructor(pId, pCallback, pBackdrop = true, pKeyboard = true, pData) {
        this.id = pId;
        this.callback = pCallback;
        this.backdrop = pBackdrop;
        this.keyboard = pKeyboard;
        this.data = pData;
    }
}
exports.PopupToken = PopupToken;
//# sourceMappingURL=PopupToken.js.map