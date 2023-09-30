export declare class CookieStorage {
    private static FUTURE_DATE;
    private _debug;
    private readonly EXPIRE_DATE;
    private _storedCookies;
    constructor();
    static get NEVER_EXPIRE_DATE(): Date;
    get hasUserData(): boolean;
    set debug(pValue: boolean);
    /**
     * Stores a Bool
     * @param pID The ID to store the bool
     * @param pValue The stored bool value
     * @param pExpiryDate The expiry date at which this saved data will be deleted
     */
    storeBool(pID: string, pValue: boolean, pExpiryDate?: Date): void;
    /**
     * Reads a Bool
     * @param pID The ID to read the bool
     * @param pDefault The default value of the returned bool
     * @param returns Returns the stored bool if it can find it. If not, will return pDefault
     */
    readBool(pID: string, pDefault?: boolean): boolean;
    /**
     * Stores a Number
     * @param pID The ID to store the number
     * @param pValue The stored number value
     * @param pExpiryDate The expiry date at which this saved data will be deleted
     */
    storeNumber(pID: string, pValue: number, pExpiryDate?: Date): void;
    /**
     * Reads a Number
     * @param pID The ID to read the number
     * @param pDefault The default value of the returned number
     * @param returns Returns the stored number if it can find it. If not, will return pDefault
     */
    readNumber(pID: string, pDefault?: number): number;
    /**
     * Stores a String
     * @param pID The ID to store the string
     * @param pValue The stored string value
     * @param pExpiryDate The expiry date at which this saved data will be deleted
     */
    storeString(pID: string, pValue: string, pExpiryDate?: Date): void;
    /**
     * Reads a String
     * @param pID The ID to read the string
     * @param pDefault The default value of the returned string
     * @param returns Returns the stored string if it can find it. If not, will return pDefault
     */
    readString(pID: string, pDefault?: string): string;
    deleteItem(pID: string): void;
    /**
     * Prints all values stored in cookies
     */
    printAll(): void;
    /**
     * Sets the Expiration date of a cookie
     * @param pID The ID of the cookie
     * @param pExpiryDate The expiry date at which this saved data will be deleted
     */
    setCookieExpiration(pID: string, pExpiryDate: Date): void;
    /**
     * Deletes all data saved in the cookies
     */
    deleteAllData(): void;
    /**
     * stores a value
     * @param pID The ID to store
     * @param pValue The value to store
     * @param pExpiryDate The expiry date at which this saved data will be deleted
     */
    private storeValue;
    private readAllValues;
    private log;
}
//# sourceMappingURL=CookieStorage.d.ts.map