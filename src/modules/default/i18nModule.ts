import { Assets } from 'pixi.js';
import { IApplication } from '../../core/Application';
import { Signal } from '../../signals';
import { Logger } from '../../utils/console/Logger';
import { getDynamicModuleFromImportListItem } from '../../utils/framework';
import { Constructor, ImportListItem } from '../../utils/types';
import { IModule, Module } from '../Module';

export type i18nDict = Record<string, any>;
type i18nTParams = { variant?: number | 'random' } & Record<string, any>;

type i18nImportListItem<T> = {
  id: string;
  namedExport?: string;
  options?: any;
  module?: (() => Promise<any>) | Promise<any> | Constructor<T> | T;
} & {
  json?: string;
};

export type i18nOptions = {
  defaultLocale: string;
  locales: string[];
  loadAll: boolean;
  files: i18nImportListItem<i18nDict>[];
};

const defaultOptions: i18nOptions = {
  defaultLocale: 'en',
  locales: ['en'],
  loadAll: false,
  files: [],
};

export interface Ii18nModule extends IModule {
  readonly locale: string;
  onLocaleChanged: Signal<(locale: string) => void>;

  setLocale(localeId: string): Promise<string>;

  loadLocale(localeId: string): Promise<void>;

  t(key: string, params?: i18nTParams, locale?: string): string;

  parse(input: string, locale?: string): string;
}

export class i18nModule extends Module implements Ii18nModule {
  public readonly id = 'i18n';
  public onLocaleChanged = new Signal<(locale: string) => void>();

  private _dicts: Record<string, i18nDict> = {};
  private _dict: i18nDict = {};
  private _locale: string;
  private _options: i18nOptions;

  get locale(): string {
    return this._locale;
  }

  async setLocale(localeId: string) {
    this._locale = localeId;
    await this._loadAndSetLocale(localeId);
    return this._locale;
  }

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
    this._dict = this._dicts[this._locale];
  }

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
   * parse the input string and replace anything in between {} braces, assuming it is a key in the dictionary
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

  async loadLocale(localeId: string) {
    const file = this._options.files.find((file) => localeId === file.id);
    if (!file) {
      Logger.error(`i18n:: Could not find locale file for ${localeId}`);
      return;
    }
    console.log('loading file for ', localeId, file);
    this._dicts[localeId] = file.json
      ? await Assets.load(file.json)
      : await getDynamicModuleFromImportListItem(file as ImportListItem<i18nDict>);
  }

  private async _loadAndSetLocale(localeId: string) {
    if (!this._dicts[localeId]) {
      await this.loadLocale(localeId);
    }
    this._dict = this._dicts[localeId];
    this.onLocaleChanged.emit(localeId);
  }
}
