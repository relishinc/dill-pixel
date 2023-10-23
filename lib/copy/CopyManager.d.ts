import { Application } from '../core';
/**
 * Alias for the function signature of callbacks. Easier on the eyes than (() => void)[] :)
 */
export declare class CopyManager {
    private app;
    onCopyChanged: import("typed-signals").Signal<(languageId: string) => void>;
    /**
     * Id for English Canada. This is the default.
     */
    static readonly EN_CA: string;
    /**
     * The copy data. Expected to be a json object.
     */
    private _data;
    /**
     * The current language id.
     */
    private _languageId;
    /**
     * Creates a manager to hold all copy data.
     * @default _languageId Set to "en_ca".
     */
    constructor(app: Application);
    /**
     * A getter for the current set language.
     * @returns The current set language id.
     */
    get currentLanguage(): string;
    /**
     * Sets the data object and, optionally, the language of the CopyManager. This should be a JSON object.
     * @param pData The JSON data object.
     * @param [pLanguage] The language code to use.
     */
    setData(pData: any, pLanguage?: string): void;
    /**
     * Gets a line of copy.
     * @param pID The id of the copy.
     * @returns The found copy, or an error string.
     */
    getCopy(pID: string): string;
    /**
     * Updates the current language and calls all registered callbacks.
     * @param pNewLanguage The new language id.
     */
    changeLanguage(pNewLanguage: string): void;
    private logError;
}
//# sourceMappingURL=CopyManager.d.ts.map