export interface IPopupToken {
    readonly id: string;
    readonly callback?: (() => void) | undefined;
    readonly backdrop?: boolean | "static";
    readonly keyboard?: boolean;
    readonly data?: any;
}
/** This is the data struct that gets passed to the showPopup signal */
export declare class PopupToken implements IPopupToken {
    /**
     * Make sure to register the ID in {@link Application.registerPopups}
     * Note that IDs are, for now, shared among all instances of the same type of popup.
     */
    readonly id: string;
    /** This gets called when the popup is closed. */
    readonly callback: ((...pParams: any[]) => void) | undefined;
    /** Whether to include a backdrop element. (Also variously referred to as "blackout" or "overlay") */
    readonly backdrop: boolean | "static";
    /** Whether to close the popup when the escape key (or Android back button) is pressed. */
    readonly keyboard: boolean;
    /** Custom data sent to the popup */
    readonly data: any;
    /**
     * Create a new {@link PopupToken}
     * @param pId Note that IDs are, for now, shared among all instances of the same type of popup.
     * @param pCallback This gets called when the popup is closed
     * @param pBackdrop Whether to include a backdrop element. (Also variously referred to as "blackout" or "overlay")
     * Alternatively, specify `"static"` for a backdrop which doesn't close the popup on click.
     * @param pKeyboard Whether to close the popup when the escape key (or Android back button) is pressed.
     * @param pData Custom data sent to the popup
     */
    constructor(pId: string, pCallback?: (...pParams: any[]) => void, pBackdrop?: boolean | "static", pKeyboard?: boolean, pData?: any);
}
//# sourceMappingURL=PopupToken.d.ts.map