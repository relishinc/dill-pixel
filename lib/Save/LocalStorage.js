import * as LogUtils from "../Utils/LogUtils";
export class LocalStorage {
    constructor() {
        this._debug = false;
    }
    get hasUserData() {
        return localStorage.length > 0;
    }
    set debug(pValue) {
        this._debug = pValue;
    }
    //#region Bool Storage
    /**
     * Stores a Bool
     * @param pID The ID to store the bool
     * @param pValue The stored bool value
     */
    storeBool(pID, pValue) {
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
    readBool(pID, pDefault = false) {
        const item = localStorage.getItem(pID);
        if (item !== null) {
            return item === "true";
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
    storeNumber(pID, pValue) {
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
    readNumber(pID, pDefault = 0) {
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
    storeString(pID, pValue) {
        this.log("STORING STRING: %s at value: %s", pID, pValue);
        localStorage.setItem(pID, pValue);
    }
    /**
     * Reads a String
     * @param pID The ID to read the string
     * @param pDefault The default value of the returned string
     * @param returns Returns the stored string if it can find it. If not, will return pDefault
     */
    readString(pID, pDefault = "") {
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
    deleteItem(pID) {
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
    printAll() {
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
    deleteAllData() {
        localStorage.clear();
    }
    log(pText, ...pParams) {
        if (this._debug) {
            LogUtils.log(pText, { className: "LocalStorageManager", color: "orange" }, ...pParams);
        }
    }
}
//# sourceMappingURL=LocalStorage.js.map