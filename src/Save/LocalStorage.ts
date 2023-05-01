import * as LogUtils from "../Utils/LogUtils";
import * as StringUtils from "../Utils/StringUtils";

export class LocalStorage {
    private _debug: boolean = false;

    get hasUserData(): boolean {
        return localStorage.length > 0;
    }

    set debug(pValue: boolean) {
        this._debug = pValue;
    }

    constructor() {
        // constructor
    }

    //#region Bool Storage
    /**
     * Stores a Bool
     * @param pID The ID to store the bool
     * @param pValue The stored bool value
     */
    public storeBool(pID: string, pValue: boolean): void {
        const value = pValue ? "true" : "false";
        this.log("STORING BOOL: %s at value: %s", pID, value);
        localStorage.setItem(pID, value);
    }

    /**
     * Reads a Bool
     * @param pID The ID to read the bool
     * @param pDefault The default value of the returned bool
     * @param returns Returns the stored bool if it can find it. If not, will return pDefault
     */
    public readBool(pID: string, pDefault: boolean = false): boolean {
        const item = localStorage.getItem(pID);
        if (item !== null) {
            const boolValue = item === "true" ? true : false;
            return boolValue;
        }
        return pDefault;
    }
    //#endregion

    //#region Number Storage
    /**
     * Stores a Number
     * @param pID The ID to store the number
     * @param pValue The stored number value
     */
    public storeNumber(pID: string, pValue: number): void {
        const value = pValue.toString();
        this.log("STORING NUMBER: %s at value: %s", pID, value);
        localStorage.setItem(pID, value);
    }

    /**
     * Reads a Number
     * @param pID The ID to read the number
     * @param pDefault The default value of the returned number
     * @param returns Returns the stored number if it can find it. If not, will return pDefault
     */
    public readNumber(pID: string, pDefault: number = 0): number {
        const item = localStorage.getItem(pID);
        if (item !== null) {
            const numberValue = +item;
            return numberValue;
        }
        return pDefault;
    }
    //#endregion

    //#region String Storage
    /**
     * Stores a String
     * @param pID The ID to store the string
     * @param pValue The stored string value
     */
    public storeString(pID: string, pValue: string): void {
        this.log("STORING STRING: %s at value: %s", pID, pValue);
        localStorage.setItem(pID, pValue);
    }

    /**
     * Reads a String
     * @param pID The ID to read the string
     * @param pDefault The default value of the returned string
     * @param returns Returns the stored string if it can find it. If not, will return pDefault
     */
    public readString(pID: string, pDefault: string = ""): string {
        const item = localStorage.getItem(pID);
        if (item !== null) {
            return item;
        }
        return pDefault;
    }
    //#endregion

    /**
     * Deletes an item
     * @param pID The ID of the item to delete
     * @param returns Returns a bool based on if the value was removed or not
     */
    public deleteItem(pID: string): boolean {
        const item = localStorage.getItem(pID);
        if (item !== null) {
            localStorage.removeItem(pID);
            return true;
        }
        this.log("Trying to delete %s when it doesn't exist!", pID);
        return false;
    }

    /**
     * Prints all values stored in local storage
     */
    public printAll(): void {
        for (let i = 0; i < localStorage.length; ++i) {
            const key = localStorage.key(i);
            if (key !== null) {
                const value = localStorage.getItem(key);
                if (value !== null) {
                    LogUtils.log("Key: %s | Value: %s", { className: "LocalStorage", color: "blue" }, key, value);
                }
            }
        }
    }

    /**
     * Deletes all data saved in local storage
     */
    public deleteAllData(): void {
        localStorage.clear();
    }

    private log(pText: string, ...pParams: any[]): void {
        if (this._debug) {
            LogUtils.log(pText, { className: "LocalStorageManager", color: "orange" }, ...pParams);
        }
    }
}
