"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieStorage = void 0;
const typescript_collections_1 = require("typescript-collections");
const Utils_1 = require("../Utils");
class CookieStorage {
    constructor() {
        this._debug = false;
        this._storedCookies = new typescript_collections_1.Dictionary();
        this.EXPIRE_DATE = new Date(1970, 1);
        CookieStorage.FUTURE_DATE = new Date(2050, 1);
        this.readAllValues();
    }
    static get NEVER_EXPIRE_DATE() {
        return this.FUTURE_DATE;
    }
    get hasUserData() {
        const keys = this._storedCookies.keys();
        return keys.length > 0;
    }
    set debug(pValue) {
        this._debug = pValue;
    }
    //#region Bool Storage
    /**
     * Stores a Bool
     * @param pID The ID to store the bool
     * @param pValue The stored bool value
     * @param pExpiryDate The expiry date at which this saved data will be deleted
     */
    storeBool(pID, pValue, pExpiryDate) {
        const value = pValue ? "true" : "false";
        this.log("STORING BOOL: %s at value: %s", pID, value);
        this.storeValue(pID, value, pExpiryDate);
    }
    /**
     * Reads a Bool
     * @param pID The ID to read the bool
     * @param pDefault The default value of the returned bool
     * @param returns Returns the stored bool if it can find it. If not, will return pDefault
     */
    readBool(pID, pDefault = false) {
        const storedBool = this._storedCookies.getValue(pID);
        if (storedBool !== undefined) {
            const boolValue = storedBool === "true" ? true : false;
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
     * @param pExpiryDate The expiry date at which this saved data will be deleted
     */
    storeNumber(pID, pValue, pExpiryDate) {
        const value = pValue.toString();
        this.log("STORING NUMBER: %s at value: %s", pID, value);
        this.storeValue(pID, value, pExpiryDate);
    }
    /**
     * Reads a Number
     * @param pID The ID to read the number
     * @param pDefault The default value of the returned number
     * @param returns Returns the stored number if it can find it. If not, will return pDefault
     */
    readNumber(pID, pDefault = 0) {
        const stringValue = this._storedCookies.getValue(pID);
        if (stringValue !== undefined) {
            const value = +stringValue;
            return value;
        }
        return pDefault;
    }
    //#endregion
    //#region String Storage
    /**
     * Stores a String
     * @param pID The ID to store the string
     * @param pValue The stored string value
     * @param pExpiryDate The expiry date at which this saved data will be deleted
     */
    storeString(pID, pValue, pExpiryDate) {
        this.log("STORING STRING: %s at value: %s", pID, pValue);
        this.storeValue(pID, pValue, pExpiryDate);
    }
    /**
     * Reads a String
     * @param pID The ID to read the string
     * @param pDefault The default value of the returned string
     * @param returns Returns the stored string if it can find it. If not, will return pDefault
     */
    readString(pID, pDefault = "") {
        const stringValue = this._storedCookies.getValue(pID);
        if (stringValue !== undefined) {
            return stringValue;
        }
        return pDefault;
    }
    //#endregion
    deleteItem(pID) {
        const value = this._storedCookies.getValue(pID);
        if (value !== undefined) {
            this.storeValue(pID, value, this.EXPIRE_DATE);
            this._storedCookies.remove(pID);
        }
    }
    /**
     * Prints all values stored in cookies
     */
    printAll() {
        this._storedCookies.forEach((pKey, pValue) => {
            Utils_1.LogUtils.log("Key: %s | Value: %s", { className: "CookieManager", color: "blue" }, pKey, pValue);
        });
    }
    /**
     * Sets the Expiration date of a cookie
     * @param pID The ID of the cookie
     * @param pExpiryDate The expiry date at which this saved data will be deleted
     */
    setCookieExpiration(pID, pExpiryDate) {
        const value = this.readString(pID);
        if (value !== undefined) {
            this.storeValue(pID, value, pExpiryDate);
        }
        else {
            Utils_1.LogUtils.logError("Trying to set expiration date of ID: %s when it doesn't exist!", {
                className: "CookieManager",
                color: "red",
            }, pID);
        }
    }
    /**
     * Deletes all data saved in the cookies
     */
    deleteAllData() {
        this._storedCookies.forEach((pID) => {
            this.deleteItem(pID);
        });
        this._storedCookies.clear();
    }
    /**
     * stores a value
     * @param pID The ID to store
     * @param pValue The value to store
     * @param pExpiryDate The expiry date at which this saved data will be deleted
     */
    storeValue(pID, pValue, pExpiryDate) {
        this._storedCookies.setValue(pID, pValue);
        let cookie = `${pID}=${pValue}`;
        if (pExpiryDate !== undefined) {
            cookie += `;expires=${pExpiryDate.toUTCString()}`;
        }
        if (Utils_1.PlatformUtils.isHTTPS()) {
            cookie += `;secure`;
        }
        cookie += `;samesite=lax`;
        cookie += `;path=/`;
        document.cookie = cookie;
    }
    readAllValues() {
        const fullData = decodeURIComponent(document.cookie);
        const data = fullData.split(";");
        let splitData;
        for (let i = 0; i < data.length; ++i) {
            splitData = data[i].split("=");
            if (splitData.length < 2) {
                continue;
            }
            const key = splitData[0].trim();
            const value = splitData[1];
            this._storedCookies.setValue(key, value);
        }
    }
    log(pText, ...pParams) {
        if (this._debug) {
            Utils_1.LogUtils.log(pText, { className: "CookieStorage", color: "orange" }, ...pParams);
        }
    }
}
exports.CookieStorage = CookieStorage;
//# sourceMappingURL=CookieStorage.js.map