import { Assets, Container, Ticker } from 'pixi.js';
import type { IApplication } from '../../core';
import type { ImportListItem, ImportListItemModule, Padding, PointLike } from '../../utils';
import { ensurePadding, getDynamicModuleFromImportListItem, isDev, Logger } from '../../utils';
import type { IAudioInstance } from '../audio';
import type { IPlugin } from '../Plugin';
import { Plugin } from '../Plugin';
import type { ICaptionRenderer } from './CaptionsRenderer';
import { CaptionsRenderer } from './CaptionsRenderer';

const isDebug = isDev;

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
 * Default options for i18n module.
 */
const defaultOptions: Partial<CaptionsOptions> = {
  renderer: CaptionsRenderer,
  defaultLocale: 'en',
  fontFile: './dill-pixel/font/Sans.fnt',
  fontName: 'Sans',
  fontSizeMultiplier: 1,
  maxWidth: 0.8,
  textColor: 0xffffff,
  backgroundColor: 0x0,
  backgroundAlpha: 0.4,
  enabled: true,
  floating: false,
  distance: 0,
  padding: { top: 20, left: 0, bottom: 20, right: 0 },
  position: 'top',
};

function resolveMaxWidth(value: number, appWidth: number) {
  if (value <= 0) {
    return 0;
  }
  if (value > 0 && value <= 1) {
    return appWidth * value;
  }
  return value;
}

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
export class CaptionsPlugin extends Plugin implements ICaptionsPlugin {
  public readonly id = 'captions';
  public view: Container = new Container();
  public renderer: ICaptionRenderer;
  private _dicts: Record<string, CaptionsDict> = {};
  private _locales: string[];
  private _activeCaptionLine = -1;
  private _activeCaptionTime = 0;
  
  private _locale: string;

  /**
   * Getter for locale.
   */
  get locale(): string {
    return this._locale;
  }

  private _options: CaptionsOptions;
  private _originalOptions: CaptionsOptions;

  get options(): CaptionsOptions {
    return this._options;
  }

  set options(value: Partial<CaptionsOptions>) {
    this._options = { ...this._options, ...value };
    

    if (value.padding) {
      this._options.padding = ensurePadding(value.padding);
    }
  }

  private _activeCaptionId?: string;

  get activeCaptionId() {
    return this._activeCaptionId;
  }

  private _paused: boolean = false;

  get paused(): boolean {
    return this._paused;
  }

  set paused(value: boolean) {
    this._paused = value;
  }

  get floating(): boolean {
    return this.options.floating;
  }

  set floating(value: boolean) {
    this.options.floating = value;
    this.updateRenderer();
  }

  public get enabled(): boolean {
    return this.options.enabled;
  }

  set enabled(value: boolean) {
    this.options.enabled = value;
    if (this.enabled) {
      this.view.visible = true;
    } else {
      this.view.visible = false;
    }
  }

  public get position(): 'top' | 'bottom' {
    return this.options.position;
  }

  public set position(value: 'top' | 'bottom') {
    this.options.position = value;
    this.renderer.updateSettings();
  }

  set backgroundColor(value: number) {
    this.options.backgroundColor = value;
    this.updateRenderer();
  }

  set textColor(value: number) {
    this.options.textColor = value;
    this.updateRenderer();
  }

  set backgroundAlpha(value: number) {
    this.options.backgroundAlpha = value;
    this.updateRenderer();
  }

  get padding(): Padding {
    return this.options.padding;
  }

  set padding(value: Partial<Padding> | PointLike) {
    this.options.padding = ensurePadding(value);
    this.updateRenderer();
  }

  get distance(): number {
    return this.options.distance;
  }

  set distance(value: number) {
    this.options.distance = value;
    this.updateRenderer();
  }

  public get fontSizeMultiplier(): number {
    return this.options.fontSizeMultiplier;
  }

  public set fontSizeMultiplier(value: number) {
    this.options.fontSizeMultiplier = value;
    this.renderer.resize();
  }

  public get maxWidth(): number {
    return this.options.maxWidth;
  }

  public set maxWidth(value: number) {
    this.options.maxWidth = resolveMaxWidth(value, this.app.size.width);
    this.renderer?.resize();
  }

  get list(): CaptionsDict {
    return this._dicts[this._locale];
  }

  get debug(): boolean {
    return isDebug;
  }

  /**
   * Initializes the i18n module.
   * sets the default locale and loads the locale files.
   * @param _app
   * @param options The i18n options.
   * @returns Promise<void>
   */
  public async initialize(_app: IApplication, options: Partial<CaptionsOptions> = {}): Promise<void> {
    this._options = {
      ...defaultOptions,
      ...options,
    } as CaptionsOptions;

    this._originalOptions = { ...this._options};

    if (options?.padding) {
      this._options.padding = ensurePadding(options.padding);
    }

    this._locale = this.app.i18n.locale;
    this._locales = this.app.i18n.locales;

    if (this._options.fontFile) {
      await Assets.load(this._options.fontFile);
    }

    if (this._options?.files?.length > 0) {
      const files = this._options.files.filter((file) => this._locales.includes(file.id));
      for (const file of files) {
        await this.loadLocale(file.id);
      }
    }

    this.addSignalConnection(this.app.onResize.connect(this.handleResize, 'highest'));
  }

  private handleResize() {
    Logger.log('CaptionsPlugin.handleResize');
    this.maxWidth = this._originalOptions.maxWidth ;
  }

  public postInitialize(): void {
    this.app.i18n.onLocaleChanged.connect(this._handleLocaleChange);
    this.app.voiceover.onVoiceOverStart.connect(this._handleVoiceOverStart);
    this.app.voiceover.onVoiceOverPaused.connect(this._handleVoiceOverPaused);
    this.app.voiceover.onVoiceOverResumed.connect(this._handleVoiceOverResumed);
    this.app.voiceover.onVoiceOverComplete.connect(this._handleVoiceoverComplete);
    this.app.voiceover.onVoiceOverStopped.connect(this._handleVoiceoverStopped);

    this.app.stage.addChild(this.view);
    this._options.maxWidth = resolveMaxWidth(this._originalOptions.maxWidth, this.app.size.width);
    const RendererClass: CaptionRendererConstructor = this.options.renderer;
    this.renderer = this.view.addChild(new RendererClass(this)) as CaptionsRenderer;

    this.app.ticker.add(this.update);
    this.app.scenes.onSceneChangeStart.connect(this.stopAllCaptions);
  }

  /**
   * Sets the locale.
   * If the locale is not loaded, it will load it first.
   * @param localeId The locale id to set.
   * @returns Promise<string>
   */
  async setLocale(localeId: string) {
    if (this._locale === localeId) {
      return this._locale;
    }
    if (this._activeCaptionId) {
      this.stopCaption(this._activeCaptionId);
    }
    this._activeCaptionId = undefined;
    await this._loadAndSetLocale(localeId);
    this._locale = localeId;
    return this._locale;
  }

  /**
   * Loads a locale.
   * @param localeId The locale id to load.
   * @returns Promise<void>
   */
  async loadLocale(localeId: string) {
    if (this._locale === 'localeId') {
      return;
    }
    const file = this._options.files.find((file) => localeId === file.id);
    if (!file) {
      Logger.error(`i18n:: Could not find locale file for ${localeId}`);
      return;
    }
    this._dicts[localeId] = file.json
      ? await Assets.load(file.json)
      : await getDynamicModuleFromImportListItem(file as ImportListItem<CaptionsDict>);
  }

  render() {
    this.renderer.resize();
  }

  update(ticker: Ticker): void {
    if (this._paused) {
      return;
    }
    const dt: number = ticker.deltaMS / 1000;
    const id = this._activeCaptionId;
    if (id) {
      this._activeCaptionTime += dt;
      const ms = this._activeCaptionTime * 1000;
      const cc = this.list[id];
      const n = cc.length;
      for (let i = 0; i < n; i++) {
        if (ms >= cc[i].start && ms < cc[i].end) {
          if (this._activeCaptionLine !== i) {
            this.playLine(id, i);
          }
          break;
        }
      }
      if (ms >= cc[n - 1].end) {
        this.playLine(id, -1);
      }
    }
  }

  public playCaption(id: string): void {
    // remove extension from id
    id = this._getId(id);
    this.playLine(id, 0);
  }

  public stopCaption(id: string): void {
    // remove extension from id
    id = this._getId(id);
    if (this._activeCaptionId === id) {
      this.playLine(id, -1);
    }
  }

  public stopAllCaptions(): void {
    this.renderer?.stop();
    this._activeCaptionId = undefined;
    this._activeCaptionLine = -1;
  }

  private _getId(id: string) {
    return id.replace(/\.[^/.]+$/, '');
  }

  private updateRenderer() {
    if (!this.enabled) {
      return;
    }
    this.renderer.updateSettings();
  }

  private _handleLocaleChange() {
    void this.setLocale(this.app.i18n.locale);
  }

  private _handleVoiceOverStart(vo: IAudioInstance) {
    this.playCaption(vo.id);
  }

  private _handleVoiceOverPaused() {
    this.paused = true;
  }

  private _handleVoiceOverResumed() {
    this.paused = false;
  }

  private _handleVoiceoverComplete(vo: IAudioInstance) {
    const id = this._getId(vo?.id || '');
    if (this._activeCaptionId === id) {
      this.stopCaption(id);
    }
  }

  private _handleVoiceoverStopped() {
    this.stopAllCaptions();
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
  }

  private playLine(id: string, index: number) {
    const cc = this.list[id];
    const line = cc ? cc[index] : undefined;
    if (line) {
      if (this._activeCaptionId !== id) {
        this._activeCaptionId = id;
        this._activeCaptionTime = 0;
        this._activeCaptionLine = -1;
        this.renderer?.start();
      }
      if (this._activeCaptionLine !== index) {
        this._activeCaptionLine = index;
        this.renderer?.lineBegin({
          id: this._activeCaptionId,
          ...cc[index],
        });
      }
    } else if (this._activeCaptionId === id && cc) {
      this.renderer?.lineEnd({
        id: this._activeCaptionId,
        ...cc[this._activeCaptionLine],
      });
      this.renderer?.stop();
      this._activeCaptionId = undefined;
      this._activeCaptionLine = -1;
    }
  }
}
