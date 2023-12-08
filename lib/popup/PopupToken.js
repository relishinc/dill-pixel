/** This is the data struct that gets passed to the showPopup signal */
export class PopupToken {
    /**
     * Make sure to register the ID in {@link Application.registerPopups}
     * Note that IDs are, for now, shared among all instances of the same type of popup.
     */
    /**
     * Create a new {@link PopupToken}
     * Alternatively, specify `"static"` for a backdrop which doesn't close the popup on click.
     * @param id
     * @param callback
     * @param backdrop
     * @param keyboard
     * @param data
     */
    constructor(id, callback, backdrop = true, keyboard = true, data) {
        this.id = id;
        this.callback = callback;
        this.backdrop = backdrop;
        this.keyboard = keyboard;
        this.data = data;
    }
}
//# sourceMappingURL=PopupToken.js.map