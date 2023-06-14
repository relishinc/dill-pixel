export declare class LocalStorage {
    private _debug;
    get hasUserData(): boolean;
    set debug(pValue: boolean);
    /**
     * Stores a Bool
     * @param pID The ID to store the bool
     * @param pValue The stored bool value
     */
    storeBool(pID: string, pValue: boolean): void;
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
     */
    storeNumber(pID: string, pValue: number): void;
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
     */
    storeString(pID: string, pValue: string): void;
    /**
     * Reads a String
     * @param pID The ID to read the string
     * @param pDefault The default value of the returned string
     * @param returns Returns the stored string if it can find it. If not, will return pDefault
     */
    readString(pID: string, pDefault?: string): string;
    /**
     * Deletes an item
     * @param pID The ID of the item to delete
     * @param returns Returns a bool based on if the value was removed or not
     */
    deleteItem(pID: string): boolean;
    /**
     * Prints all values stored in local storage
     */
    printAll(): void;
    /**
     * Deletes all data saved in local storage
     */
    deleteAllData(): void;
    private log;
}
//# sourceMappingURL=LocalStorage.d.ts.map