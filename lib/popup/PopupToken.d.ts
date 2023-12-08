export interface IPopupToken {
    readonly id: string;
    readonly callback?: (() => void) | undefined;
    readonly backdrop?: boolean | 'static';
    readonly keyboard?: boolean;
    readonly data?: any;
}
/** This is the data struct that gets passed to the showPopup signal */
export declare class PopupToken implements IPopupToken {
    readonly id: string;
    readonly callback?: ((...pParams: any[]) => void) | undefined;
    readonly backdrop: boolean | 'static';
    readonly keyboard: boolean;
    readonly data?: any;
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
    constructor(id: string, callback?: ((...pParams: any[]) => void) | undefined, backdrop?: boolean | 'static', keyboard?: boolean, data?: any);
}
//# sourceMappingURL=PopupToken.d.ts.map