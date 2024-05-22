import { Container, Ticker } from 'pixi.js';
import { IApplication } from '../../core/Application';
import { ImportListItemModule, Padding, PointLike } from '../../utils/types';
import { IPlugin, Plugin } from '../Plugin';
import { ICaptionRenderer } from './CaptionsRenderer';

/**
 * Type definition for i18n dictionary.
 */
type CaptionsDict = Record<string, any>;
/**
 * Type definition for i18n import list item.
 */
type CaptionsImportListItem<T> = {
    id: string;
    namedExport?: string;
    options?: any;
    module?: ImportListItemModule<T>;
} & {
    json?: string;
};
type CaptionRendererConstructor = new (owner: CaptionsPlugin) => ICaptionRenderer;
/**
 * Type definition for i18n options.
 */
export type CaptionsOptions = {
    renderer: CaptionRendererConstructor;
    defaultLocale: string;
    files: CaptionsImportListItem<CaptionsDict>[];
    fontFile: string;
    fontName: string;
    fontSizeMultiplier: number;
    maxWidth: number;
    textColor: number;
    backgroundColor: number;
    backgroundAlpha: number;
    enabled: boolean;
    floating: boolean;
    distance: number;
    padding: Padding;
    position: 'top' | 'bottom';
};
/**
 * Interface for i18n module.
 */
export interface ICaptionsPlugin extends IPlugin {
    readonly locale: string;
    view: Container;
    enabled: boolean;
    floating: boolean;
    distance: number;
    padding: Padding;
    position: 'top' | 'bottom';
    backgroundColor: number;
    textColor: number;
    backgroundAlpha: number;
    fontSizeMultiplier: number;
    maxWidth: number;
    options: Partial<CaptionsOptions>;
    setLocale(localeId: string): Promise<string>;
    loadLocale(localeId: string): Promise<void>;
    render(): void;
}
/**
 * i18n module class.
 */
export declare class CaptionsPlugin extends Plugin implements ICaptionsPlugin {
    readonly id = "captions";
    view: Container;
    renderer: ICaptionRenderer;
    private _dicts;
    private _locales;
    private _activeCaptionLine;
    private _activeCaptionTime;
    private _locale;
    /**
     * Getter for locale.
     */
    get locale(): string;
    private _options;
    get options(): CaptionsOptions;
    set options(value: Partial<CaptionsOptions>);
    private _activeCaptionId?;
    get activeCaptionId(): string | undefined;
    private _paused;
    get paused(): boolean;
    set paused(value: boolean);
    get floating(): boolean;
    set floating(value: boolean);
    get enabled(): boolean;
    set enabled(value: boolean);
    get position(): 'top' | 'bottom';
    set position(value: 'top' | 'bottom');
    set backgroundColor(value: number);
    set textColor(value: number);
    set backgroundAlpha(value: number);
    get padding(): Padding;
    set padding(value: Partial<Padding> | PointLike);
    get distance(): number;
    set distance(value: number);
    get fontSizeMultiplier(): number;
    set fontSizeMultiplier(value: number);
    get maxWidth(): number;
    set maxWidth(value: number);
    get list(): CaptionsDict;
    get debug(): boolean;
    /**
     * Initializes the i18n module.
     * sets the default locale and loads the locale files.
     * @param _app
     * @param options The i18n options.
     * @returns Promise<void>
     */
    initialize(_app: IApplication, options: Partial<CaptionsOptions>): Promise<void>;
    postInitialize(): void;
    /**
     * Sets the locale.
     * If the locale is not loaded, it will load it first.
     * @param localeId The locale id to set.
     * @returns Promise<string>
     */
    setLocale(localeId: string): Promise<string>;
    /**
     * Loads a locale.
     * @param localeId The locale id to load.
     * @returns Promise<void>
     */
    loadLocale(localeId: string): Promise<void>;
    render(): void;
    update(ticker: Ticker): void;
    playCaption(id: string): void;
    stopCaption(id: string): void;
    stopAllCaptions(): void;
    private _getId;
    private updateRenderer;
    private _handleLocaleChange;
    private _handleVoiceOverStart;
    private _handleVoiceOverPaused;
    private _handleVoiceOverResumed;
    private _handleVoiceoverComplete;
    private _handleVoiceoverStopped;
    /**
     * Loads and sets a locale.
     * If the locale is not loaded, it will load it first.
     * @param localeId The locale id to load and set.
     */
    private _loadAndSetLocale;
    private playLine;
}
export {};
//# sourceMappingURL=CaptionsPlugin.d.ts.map