import { Dictionary } from "typescript-collections";
import { LogUtils, PlatformUtils } from "../Utils";

export class CookieStorage {
  private static FUTURE_DATE: Date;
  private _debug: boolean = false;
  private readonly EXPIRE_DATE: Date;
  private _storedCookies: Dictionary<string, string>;

  constructor() {
    this._storedCookies = new Dictionary<string, string>();
    this.EXPIRE_DATE = new Date(1970, 1);
    CookieStorage.FUTURE_DATE = new Date(2050, 1);
    this.readAllValues();
  }

  public static get NEVER_EXPIRE_DATE() {
    return this.FUTURE_DATE;
  }

  get hasUserData(): boolean {
    const keys = this._storedCookies.keys();
    return keys.length > 0;
  }

  set debug(pValue: boolean) {
    this._debug = pValue;
  }

  //#region Bool Storage
  /**
   * Stores a Bool
   * @param pID The ID to store the bool
   * @param pValue The stored bool value
   * @param pExpiryDate The expiry date at which this saved data will be deleted
   */
  public storeBool(pID: string, pValue: boolean, pExpiryDate?: Date): void {
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
  public readBool(pID: string, pDefault: boolean = false): boolean {
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
  public storeNumber(pID: string, pValue: number, pExpiryDate?: Date): void {
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
  public readNumber(pID: string, pDefault: number = 0): number {
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
  public storeString(pID: string, pValue: string, pExpiryDate?: Date): void {
    this.log("STORING STRING: %s at value: %s", pID, pValue);
    this.storeValue(pID, pValue, pExpiryDate);
  }

  /**
   * Reads a String
   * @param pID The ID to read the string
   * @param pDefault The default value of the returned string
   * @param returns Returns the stored string if it can find it. If not, will return pDefault
   */
  public readString(pID: string, pDefault: string = ""): string {
    const stringValue = this._storedCookies.getValue(pID);
    if (stringValue !== undefined) {
      return stringValue;
    }
    return pDefault;
  }

  //#endregion

  public deleteItem(pID: string): void {
    const value = this._storedCookies.getValue(pID);
    if (value !== undefined) {
      this.storeValue(pID, value, this.EXPIRE_DATE);
      this._storedCookies.remove(pID);
    }
  }

  /**
   * Prints all values stored in cookies
   */
  public printAll(): void {
    this._storedCookies.forEach((pKey, pValue) => {
      LogUtils.log(
        "Key: %s | Value: %s",
        { className: "CookieManager", color: "blue" },
        pKey,
        pValue
      );
    });
  }

  /**
   * Sets the Expiration date of a cookie
   * @param pID The ID of the cookie
   * @param pExpiryDate The expiry date at which this saved data will be deleted
   */
  public setCookieExpiration(pID: string, pExpiryDate: Date): void {
    const value = this.readString(pID);
    if (value !== undefined) {
      this.storeValue(pID, value, pExpiryDate);
    } else {
      LogUtils.logError(
        "Trying to set expiration date of ID: %s when it doesn't exist!",
        {
          className: "CookieManager",
          color: "red",
        },
        pID
      );
    }
  }

  /**
   * Deletes all data saved in the cookies
   */
  public deleteAllData(): void {
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
  private storeValue(pID: string, pValue: string, pExpiryDate?: Date): void {
    this._storedCookies.setValue(pID, pValue);
    let cookie = `${pID}=${pValue}`;
    if (pExpiryDate !== undefined) {
      cookie += `;expires=${pExpiryDate.toUTCString()}`;
    }
    if (PlatformUtils.isHTTPS()) {
      cookie += `;secure`;
    }
    cookie += `;samesite=lax`;
    cookie += `;path=/`;
    document.cookie = cookie;
  }

  private readAllValues(): void {
    const fullData: string = decodeURIComponent(document.cookie);
    const data: string[] = fullData.split(";");
    let splitData: string[];
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

  private log(pText: string, ...pParams: any[]): void {
    if (this._debug) {
      LogUtils.log(
        pText,
        { className: "CookieStorage", color: "orange" },
        ...pParams
      );
    }
  }
}
