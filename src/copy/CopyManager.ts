import {Application} from '../core';
import {Signals} from '../signals';
import {LogUtils} from '../utils';

/**
 * Alias for the function signature of callbacks. Easier on the eyes than (() => void)[] :)
 */

export class CopyManager {
  onCopyChanged = Signals.onLanguageChanged;
  /**
   * Id for English Canada. This is the default.
   */
  public static readonly EN_CA: string = 'en_ca';
  /**
   * The copy data. Expected to be a json object.
   */
  private _data: any;
  /**
   * The current language id.
   */
  private _languageId: string;

  /**
   * Creates a manager to hold all copy data.
   * @default _languageId Set to "en_ca".
   */
  constructor(private app: Application) {
    this._languageId = CopyManager.EN_CA;
    this.changeLanguage = this.changeLanguage.bind(this);
    Signals.changeLanguage.connect(this.changeLanguage);
  }

  /**
   * A getter for the current set language.
   * @returns The current set language id.
   */
  public get currentLanguage(): string {
    return this._languageId;
  }

  /**
   * Sets the data object and, optionally, the language of the CopyManager. This should be a JSON object.
   * @param pData The JSON data object.
   * @param [pLanguage] The language code to use.
   */
  public setData(pData: any, pLanguage?: string): void {
    if (pLanguage !== undefined) {
      this._languageId = pLanguage;
    }
    this._data = pData;
  }

  /**
   * Gets a line of copy.
   * @param pID The id of the copy.
   * @returns The found copy, or an error string.
   */
  public getCopy(pID: string): string {
    if (this._data === undefined) {
      this.logError('Set the copy data first.');
      return 'No data set.';
    }
    if (this._data[pID] === undefined) {
      this.logError('%s not found.', pID);
      return 'Missing key.';
    }
    if (this._data[pID][this._languageId] === undefined) {
      this.logError('No %s data for %s was found', this._languageId, pID);
      return 'No data found.';
    }

    return this._data[pID][this._languageId];
  }

  /**
   * Updates the current language and calls all registered callbacks.
   * @param pNewLanguage The new language id.
   */
  public changeLanguage(pNewLanguage: string): void {
    this._languageId = pNewLanguage;
    this.onCopyChanged.emit(this._languageId);
  }

  private logError(pText: string, ...pParams: any[]) {
    LogUtils.logError(pText, { className: 'CopyManager', color: 'DarkViolet' }, ...pParams);
  }
}
