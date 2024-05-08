import { Assets } from 'pixi.js';
import { IApplication } from '../core/Application';
import { CoreFunction, CorePlugin } from '../core/decorators';
import { Signal } from '../signals';
import { Logger } from '../utils/console/Logger';
import { getDynamicModuleFromImportListItem } from '../utils/framework';
import { ImportListItem, ImportListItemModule } from '../utils/types';
import { IPlugin, Plugin } from './Plugin';

/**
 * Type definition for i18n dictionary.
 */
export type i18nDict = Record<string, any>;

/**
 * Type definition for i18n translation parameters.
 */
type i18nTParams = { variant?: number | 'random' } & Record<string, any>;

/**
 * Type definition for i18n import list item.
 */
type i18nImportListItem<T> = {
  id: string;
  namedExport?: string;
  options?: any;
  module?: ImportListItemModule<T>;
} & {
  json?: string;
};

/**
 * Type definition for i18n options.
 */
export type i18nOptions = {
  defaultLocale: string;
  locales: string[];
  loadAll: boolean;
  files: i18nImportListItem<i18nDict>[];
};

/**
 * Default options for i18n module.
 */
const defaultOptions: i18nOptions = {
  defaultLocale: 'en',
  locales: ['en'],
  loadAll: false,
  files: [],
};

/**
 * Interface for i18n module.
 */
export interface Ii18nPlugin extends IPlugin {
  readonly locale: string;
  readonly locales: string[];
  onLocaleChanged: Signal<(locale: string) => void>;

  setLocale(localeId: string): Promise<string>;

  loadLocale(localeId: string): Promise<void>;

  t(key: string, params?: i18nTParams, locale?: string): string;

  parse(input: string, locale?: string): string;
}

/**
 * i18n module class.
 */
@CorePlugin
export class i18nPlugin extends Plugin implements Ii18nPlugin {
  public readonly id = 'i18n';
  public onLocaleChanged: Signal<(locale: string) => void> = new Signal<(locale: string) => void>();

  private _dicts: Record<string, i18nDict> = {};
  private _locale: string;
  private _options: i18nOptions;

  /**
   * Getter for locale.
   */
  get locale(): string {
    return this._locale;
  }

  get locales(): string[] {
    return this._options.locales;
  }

  /**
   * Initializes the i18n module.
   * sets the default locale and loads the locale files.
   * @param app The application instance.
   * @param options The i18n options.
   * @returns Promise<void>
   */
  public async initialize(app: IApplication, options: Partial<i18nOptions>): Promise<void> {
    super.initialize(app);
    this._options = { ...defaultOptions, ...options };
    this._locale = this._options.defaultLocale;
    if (this._options.loadAll && this._options.files.length > 0) {
      const files = this._options.files.filter((file) => this._options.locales.includes(file.id));
      for (const file of files) {
        await this.loadLocale(file.id);
      }
    } else if (this._options.files.length > 0) {
      await this.loadLocale(this._locale);
    }
  }

  /**
   * Sets the locale.
   * If the locale is not loaded, it will load it first.
   * @param localeId The locale id to set.
   * @returns Promise<string>
   */
  @CoreFunction
  async setLocale(localeId: string) {
    this._locale = localeId;
    await this._loadAndSetLocale(localeId);
    return this._locale;
  }

  /**
   * Translates a key into a string.
   * If the key is not found, it will return an empty string.
   * If the key is found, it will replace any placeholders in the string with the values from the params object.
   * If the key contains a variant, it will select a random variant if the variant param is set to 'random'.
   * If the key contains a number variant, it will select the variant based on the variant param.
   * @param key The key to translate.
   * @param params The parameters to replace in the string.
   * @param locale The locale to use for translation.
   * @returns The translated string.
   */
  @CoreFunction
  t(key: string, params?: i18nTParams, locale: string = this._locale): string {
    const dict = this._dicts[locale];
    if (!dict) {
      Logger.error(`i18n:: No dictionary loaded for current locale: ${locale}`);
      return '';
    }
    let str = dict[key];

    if (!str) {
      Logger.error(`i18n:: No result found for the key ${key} in the locale: ${this._locale}`);
      return '';
    }

    if (params) {
      if (typeof params.variant === 'number' || params.variant === 'random') {
        const match = /\[(.*?)\]/.exec(str);
        if (match) {
          // Split the string by the "|" character to get an array of variations.
          const items = match[1].split('|');

          // Get the selected variant based on the "variation" param.
          const num = params.variant === 'random' ? Math.floor(Math.random() * items.length) : params.variant;

          // Replace the original string with the selected variant
          str = str.replace(match[0], items[num]);
        }
      }

      // Iterate over all params to replace placeholders in the string.
      for (const f in params) {
        // Create a regular expression to match the placeholder for the current param.
        const re = new RegExp(`{${f}}`, 'g');

        //Replace all occurences of the placeholder with the value of the param.
        str = str.replace(re, String(params[f]));
      }
    }

    /**
     * Return the final translated string.
     */
    return str;
  }

  /**
   * Parses the input string and replaces anything in between {} braces, assuming it is a key in the dictionary.
   * @param {string} input
   * @param locale
   * @returns {string}
   */
  parse(input: string, locale: string = this._locale): string {
    const dict = this._dicts[locale];
    if (!dict) {
      Logger.error(`i18n:: No dictionary loaded for current locale: ${this._locale}`);
      return '';
    }
    let str = input;
    const matches = str.match(/{(.*?)}/g);
    if (matches) {
      matches.forEach((match) => {
        const key = match.slice(1, -1);
        if (dict[key]) {
          str = str.replace(match, dict[key]);
        }
      });
    }
    return str;
  }

  /**
   * Loads a locale.
   * @param localeId The locale id to load.
   * @returns Promise<void>
   */
  async loadLocale(localeId: string) {
    const file = this._options.files.find((file) => localeId === file.id);
    if (!file) {
      Logger.error(`i18n:: Could not find locale file for ${localeId}`);
      return;
    }
    this._dicts[localeId] = file.json
      ? await Assets.load(file.json)
      : await getDynamicModuleFromImportListItem(file as ImportListItem<i18nDict>);
  }

  /**
   * Loads and sets a locale.
   * If the locale is not loaded, it will load it first.
   * @param localeId The locale id to load and set.
   */
  private async _loadAndSetLocale(localeId: string) {
    if (!this._dicts[localeId]) {
      await this.loadLocale(localeId);
    }
    this.onLocaleChanged.emit(localeId);
  }
}
