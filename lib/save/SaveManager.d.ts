import { Application } from '../core';
export declare enum Storage {
    Cookie = 0,
    Local = 1
}
export declare class SaveManager {
    private app;
    private _debug;
    private _cookieStorage;
    private _localStorage;
    constructor(app: Application);
    get hasLocalStorageData(): boolean;
    get hasCookieData(): boolean;
    set debug(pValue: boolean);
    /**
     * Stores a Bool
     * @param pID The ID to store the bool
     * @param pValue The stored bool value
     * @param pStorage Where the bool should be stored
     */
    storeBool(pID: string, pValue: boolean, pStorage?: Storage): void;
    /**
     * Reads a Bool
     * @param pID The ID to read the bool
     * @param pDefault The default value of the returned bool
     * @param pStorage Where the bool should be stored
     * @param returns Returns the stored bool if it can find it. If not, will return pDefault
     */
    readBool(pID: string, pDefault?: boolean, pStorage?: Storage): boolean;
    /**
     * Stores a Number
     * @param pID The ID to store the number
     * @param pValue The stored number value
     * @param pStorage Where the number should be stored
     */
    storeNumber(pID: string, pValue: number, pStorage?: Storage): void;
    /**
     * Reads a Number
     * @param pID The ID to read the number
     * @param pDefault The default value of the returned number
     * @param pStorage Where the number should be stored
     * @param returns Returns the stored number if it can find it. If not, will return pDefault
     */
    readNumber(pID: string, pDefault?: number, pStorage?: Storage): number;
    /**
     * Stores a String
     * @param pID The ID to store the string
     * @param pValue The stored string value
     * @param pStorage Where the string should be stored
     */
    storeString(pID: string, pValue: string, pStorage?: Storage): void;
    /**
     * Reads a String
     * @param pID The ID to read the string
     * @param pDefault The default value of the returned string
     * @param pStorage Where the string should be stored
     * @param returns Returns the stored string if it can find it. If not, will return pDefault
     */
    readString(pID: string, pDefault?: string, pStorage?: Storage): string;
    /**
     * Deletes an Item
     * @param pID The ID to delete
     * @param pStorage Where the item is stored
     */
    deleteItem(pID: string, pStorage?: Storage): void;
    /**
     * Sets the Expiration date of a cookie
     * @param pID The ID of the cookie
     * @param pExpiryDate The expiry date at which this saved data will be deleted
     */
    setCookieExpiration(pID: string, pExpiryDate: Date): void;
    /**
     * Prints all values of the Storage type passed in
     * @param pStorage What storage to print all values from
     */
    printAll(pStorage: Storage): void;
    /**
     * Deletes all data saved in both the cookies and local storage
     */
    deleteAllData(): void;
}
//# sourceMappingURL=SaveManager.d.ts.map