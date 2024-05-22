import { IApplication } from '../core/Application';
import { Signal } from '../signals';
import { ImportListItemModule } from '../utils/types';
import { IPlugin, Plugin } from './Plugin';

/**
 * Type definition for i18n dictionary.
 */
export type i18nDict = Record<string, any>;
/**
 * Type definition for i18n translation parameters.
 */
export type i18nTParams = {
    variant?: number | 'random';
} & Record<string, any>;
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
export declare class i18nPlugin extends Plugin implements Ii18nPlugin {
    readonly id = "i18n";
    onLocaleChanged: Signal<(locale: string) => void>;
    private _dicts;
    private _options;
    private _locale;
    /**
     * Getter for locale.
     */
    get locale(): string;
    get locales(): string[];
    /**
     * Initializes the i18n module.
     * sets the default locale and loads the locale files.
     * @param app The application instance.
     * @param options The i18n options.
     * @returns Promise<void>
     */
    initialize(app: IApplication, options: Partial<i18nOptions>): Promise<void>;
    /**
     * Sets the locale.
     * If the locale is not loaded, it will load it first.
     * @param localeId The locale id to set.
     * @returns Promise<string>
     */
    setLocale(localeId: string): Promise<string>;
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
    t(key: string, params?: i18nTParams, locale?: string): string;
    /**
     * Parses the input string and replaces anything in between {} braces, assuming it is a key in the dictionary.
     * @param {string} input
     * @param locale
     * @returns {string}
     */
    parse(input: string, locale?: string): string;
    /**
     * Loads a locale.
     * @param localeId The locale id to load.
     * @returns Promise<void>
     */
    loadLocale(localeId: string): Promise<void>;
    protected getCoreFunctions(): string[];
    protected getCoreSignals(): string[];
    /**
     * Loads and sets a locale.
     * If the locale is not loaded, it will load it first.
     * @param localeId The locale id to load and set.
     */
    private _loadAndSetLocale;
}
export {};
//# sourceMappingURL=i18nPlugin.d.ts.map