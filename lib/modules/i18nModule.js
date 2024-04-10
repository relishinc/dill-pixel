import { Assets } from 'pixi.js';
import { Signal } from '../signals';
import { Logger } from '../utils/console/Logger';
import { getDynamicModuleFromImportListItem } from '../utils/framework';
import { Module } from './Module';
/**
 * Default options for i18n module.
 */
const defaultOptions = {
    defaultLocale: 'en',
    locales: ['en'],
    loadAll: false,
    files: [],
};
/**
 * i18n module class.
 */
export class i18nModule extends Module {
    constructor() {
        super(...arguments);
        this.id = 'i18n';
        this.onLocaleChanged = new Signal();
        this._dicts = {};
        this._dict = {};
    }
    /**
     * Getter for locale.
     */
    get locale() {
        return this._locale;
    }
    /**
     * Sets the locale.
     * If the locale is not loaded, it will load it first.
     * @param localeId The locale id to set.
     * @returns Promise<string>
     */
    async setLocale(localeId) {
        this._locale = localeId;
        await this._loadAndSetLocale(localeId);
        return this._locale;
    }
    /**
     * Initializes the i18n module.
     * sets the default locale and loads the locale files.
     * @param app The application instance.
     * @param options The i18n options.
     * @returns Promise<void>
     */
    async initialize(app, options) {
        super.initialize(app);
        this._options = { ...defaultOptions, ...options };
        this._locale = this._options.defaultLocale;
        if (this._options.loadAll && this._options.files.length > 0) {
            const files = this._options.files.filter((file) => this._options.locales.includes(file.id));
            for (const file of files) {
                await this.loadLocale(file.id);
            }
        }
        else if (this._options.files.length > 0) {
            await this.loadLocale(this._locale);
        }
        this._dict = this._dicts[this._locale];
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
    t(key, params, locale = this._locale) {
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
    parse(input, locale = this._locale) {
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
    async loadLocale(localeId) {
        const file = this._options.files.find((file) => localeId === file.id);
        if (!file) {
            Logger.error(`i18n:: Could not find locale file for ${localeId}`);
            return;
        }
        this._dicts[localeId] = file.json
            ? await Assets.load(file.json)
            : await getDynamicModuleFromImportListItem(file);
    }
    /**
     * Loads and sets a locale.
     * If the locale is not loaded, it will load it first.
     * @param localeId The locale id to load and set.
     */
    async _loadAndSetLocale(localeId) {
        if (!this._dicts[localeId]) {
            await this.loadLocale(localeId);
        }
        this._dict = this._dicts[localeId];
        this.onLocaleChanged.emit(localeId);
    }
}
//# sourceMappingURL=i18nModule.js.map