import { CookieStorage } from './CookieStorage';
import { LocalStorage } from './LocalStorage';
export var Storage;
(function (Storage) {
    Storage[Storage["Cookie"] = 0] = "Cookie";
    Storage[Storage["Local"] = 1] = "Local";
})(Storage || (Storage = {}));
export class SaveManager {
    constructor(app) {
        this.app = app;
        this._debug = false;
        this._cookieStorage = new CookieStorage();
        this._localStorage = new LocalStorage();
    }
    get hasLocalStorageData() {
        return this._localStorage.hasUserData;
    }
    get hasCookieData() {
        return this._cookieStorage.hasUserData;
    }
    set debug(pValue) {
        this._debug = pValue;
        this._cookieStorage.debug = pValue;
        this._localStorage.debug = pValue;
    }
    //#region Bool Storage
    /**
     * Stores a Bool
     * @param pID The ID to store the bool
     * @param pValue The stored bool value
     * @param pStorage Where the bool should be stored
     */
    storeBool(pID, pValue, pStorage = Storage.Cookie) {
        switch (pStorage) {
            case Storage.Cookie:
                this._cookieStorage.storeBool(pID, pValue, CookieStorage.NEVER_EXPIRE_DATE);
                break;
            case Storage.Local:
                this._localStorage.storeBool(pID, pValue);
                break;
        }
    }
    /**
     * Reads a Bool
     * @param pID The ID to read the bool
     * @param pDefault The default value of the returned bool
     * @param pStorage Where the bool should be stored
     * @param returns Returns the stored bool if it can find it. If not, will return pDefault
     */
    readBool(pID, pDefault = false, pStorage = Storage.Cookie) {
        switch (pStorage) {
            case Storage.Cookie:
                return this._cookieStorage.readBool(pID, pDefault);
            case Storage.Local:
                return this._localStorage.readBool(pID, pDefault);
        }
    }
    //#endregion
    //#region Number Storage
    /**
     * Stores a Number
     * @param pID The ID to store the number
     * @param pValue The stored number value
     * @param pStorage Where the number should be stored
     */
    storeNumber(pID, pValue, pStorage = Storage.Cookie) {
        switch (pStorage) {
            case Storage.Cookie:
                this._cookieStorage.storeNumber(pID, pValue, CookieStorage.NEVER_EXPIRE_DATE);
                break;
            case Storage.Local:
                this._localStorage.storeNumber(pID, pValue);
                break;
        }
    }
    /**
     * Reads a Number
     * @param pID The ID to read the number
     * @param pDefault The default value of the returned number
     * @param pStorage Where the number should be stored
     * @param returns Returns the stored number if it can find it. If not, will return pDefault
     */
    readNumber(pID, pDefault = 0, pStorage = Storage.Cookie) {
        switch (pStorage) {
            case Storage.Cookie:
                return this._cookieStorage.readNumber(pID, pDefault);
            case Storage.Local:
                return this._localStorage.readNumber(pID, pDefault);
        }
    }
    //#endregion
    //#region String Storage
    /**
     * Stores a String
     * @param pID The ID to store the string
     * @param pValue The stored string value
     * @param pStorage Where the string should be stored
     */
    storeString(pID, pValue, pStorage = Storage.Cookie) {
        switch (pStorage) {
            case Storage.Cookie:
                this._cookieStorage.storeString(pID, pValue, CookieStorage.NEVER_EXPIRE_DATE);
                break;
            case Storage.Local:
                this._localStorage.storeString(pID, pValue);
                break;
        }
    }
    /**
     * Reads a String
     * @param pID The ID to read the string
     * @param pDefault The default value of the returned string
     * @param pStorage Where the string should be stored
     * @param returns Returns the stored string if it can find it. If not, will return pDefault
     */
    readString(pID, pDefault = '', pStorage = Storage.Cookie) {
        switch (pStorage) {
            case Storage.Cookie:
                return this._cookieStorage.readString(pID, pDefault);
            case Storage.Local:
                return this._localStorage.readString(pID, pDefault);
        }
    }
    //#endregion
    /**
     * Deletes an Item
     * @param pID The ID to delete
     * @param pStorage Where the item is stored
     */
    deleteItem(pID, pStorage = Storage.Cookie) {
        switch (pStorage) {
            case Storage.Cookie:
                this._cookieStorage.deleteItem(pID);
                break;
            case Storage.Local:
                this._localStorage.deleteItem(pID);
                break;
        }
    }
    /**
     * Sets the Expiration date of a cookie
     * @param pID The ID of the cookie
     * @param pExpiryDate The expiry date at which this saved data will be deleted
     */
    setCookieExpiration(pID, pExpiryDate) {
        this._cookieStorage.setCookieExpiration(pID, pExpiryDate);
    }
    /**
     * Prints all values of the Storage type passed in
     * @param pStorage What storage to print all values from
     */
    printAll(pStorage) {
        switch (pStorage) {
            case Storage.Cookie:
                this._cookieStorage.printAll();
                break;
            case Storage.Local:
                this._localStorage.printAll();
                break;
        }
    }
    /**
     * Deletes all data saved in both the cookies and local storage
     */
    deleteAllData() {
        this._cookieStorage.deleteAllData();
        this._localStorage.deleteAllData();
    }
}
//# sourceMappingURL=SaveManager.js.map