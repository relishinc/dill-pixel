var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Assets, Container } from 'pixi.js';
import { CorePlugin } from '../../core/decorators';
import { Logger } from '../../utils/console/Logger';
import { isDev } from '../../utils/env';
import { getDynamicModuleFromImportListItem } from '../../utils/framework';
import { ensurePadding } from '../../utils/padding';
import { Plugin } from '../Plugin';
import { CaptionsRenderer } from './CaptionsRenderer';
const isDebug = isDev;
/**
 * Default options for i18n module.
 */
const defaultOptions = {
    defaultLocale: 'en',
    fontFile: './font/Arial.fnt',
    fontName: 'Arial',
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
function resolveMaxWidth(value, appWidth) {
    if (value <= 0) {
        return 0;
    }
    if (value > 0 && value <= 1) {
        return appWidth * value;
    }
    return value;
}
/**
 * i18n module class.
 */
let CaptionsPlugin = class CaptionsPlugin extends Plugin {
    id = 'captions';
    view = new Container();
    renderer;
    _dicts = {};
    _locales;
    _activeCaptionLine = -1;
    _activeCaptionTime = 0;
    _locale;
    /**
     * Getter for locale.
     */
    get locale() {
        return this._locale;
    }
    _options;
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = { ...this._options, ...value };
        if (value.padding) {
            this._options.padding = ensurePadding(value.padding);
        }
    }
    _activeCaptionId;
    get activeCaptionId() {
        return this._activeCaptionId;
    }
    _paused = false;
    get paused() {
        return this._paused;
    }
    set paused(value) {
        this._paused = value;
    }
    get floating() {
        return this.options.floating;
    }
    set floating(value) {
        this.options.floating = value;
        this.updateRenderer();
    }
    get enabled() {
        return this.options.enabled;
    }
    set enabled(value) {
        this.options.enabled = value;
        if (this.enabled) {
            this.view.visible = true;
        }
        else {
            this.view.visible = false;
        }
    }
    get position() {
        return this.options.position;
    }
    set position(value) {
        this.options.position = value;
        this.renderer.updateSettings();
    }
    set backgroundColor(value) {
        this.options.backgroundColor = value;
        this.updateRenderer();
    }
    set textColor(value) {
        this.options.textColor = value;
        this.updateRenderer();
    }
    set backgroundAlpha(value) {
        this.options.backgroundAlpha = value;
        this.updateRenderer();
    }
    get padding() {
        return this.options.padding;
    }
    set padding(value) {
        this.options.padding = ensurePadding(value);
        this.updateRenderer();
    }
    get distance() {
        return this.options.distance;
    }
    set distance(value) {
        this.options.distance = value;
        this.updateRenderer();
    }
    get fontSizeMultiplier() {
        return this.options.fontSizeMultiplier;
    }
    set fontSizeMultiplier(value) {
        this.options.fontSizeMultiplier = value;
        this.renderer.resize();
    }
    get maxWidth() {
        return this.options.maxWidth;
    }
    set maxWidth(value) {
        this.options.maxWidth = resolveMaxWidth(value, this.app.size.width);
        this.renderer.resize();
    }
    get list() {
        return this._dicts[this._locale];
    }
    get debug() {
        return isDebug;
    }
    /**
     * Initializes the i18n module.
     * sets the default locale and loads the locale files.
     * @param _app
     * @param options The i18n options.
     * @returns Promise<void>
     */
    async initialize(_app, options) {
        this._options = {
            ...defaultOptions,
            ...options,
        };
        if (options.padding) {
            this._options.padding = ensurePadding(options.padding);
        }
        this._locale = this.app.i18n.locale;
        this._locales = this.app.i18n.locales;
        await Assets.load(this._options.fontFile);
        if (this._options.files.length > 0) {
            const files = this._options.files.filter((file) => this._locales.includes(file.id));
            for (const file of files) {
                await this.loadLocale(file.id);
            }
        }
    }
    postInitialize() {
        this.app.i18n.onLocaleChanged.connect(this._handleLocaleChange);
        this.app.voiceover.onVoiceOverStart.connect(this._handleVoiceOverStart);
        this.app.voiceover.onVoiceOverPaused.connect(this._handleVoiceOverPaused);
        this.app.voiceover.onVoiceOverResumed.connect(this._handleVoiceOverResumed);
        this.app.voiceover.onVoiceOverComplete.connect(this._handleVoiceoverComplete);
        this.app.stage.addChild(this.view);
        this._options.maxWidth = resolveMaxWidth(this.options.maxWidth, this.app.size.width);
        this.renderer = this.view.addChild(new CaptionsRenderer(this));
        this.app.ticker.add(this.update);
    }
    /**
     * Sets the locale.
     * If the locale is not loaded, it will load it first.
     * @param localeId The locale id to set.
     * @returns Promise<string>
     */
    async setLocale(localeId) {
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
    async loadLocale(localeId) {
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
            : await getDynamicModuleFromImportListItem(file);
    }
    render() {
        this.renderer.resize();
    }
    update(ticker) {
        if (this._paused) {
            return;
        }
        const dt = ticker.deltaMS / 1000;
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
    playCaption(id) {
        // remove extension from id
        id = this._getId(id);
        this.playLine(id, 0);
    }
    stopCaption(id) {
        // remove extension from id
        id = this._getId(id);
        if (this._activeCaptionId === id) {
            this.playLine(id, -1);
        }
    }
    _getId(id) {
        return id.replace(/\.[^/.]+$/, '');
    }
    updateRenderer() {
        if (!this.enabled) {
            return;
        }
        this.renderer.updateSettings();
    }
    _handleLocaleChange() {
        void this.setLocale(this.app.i18n.locale);
    }
    _handleVoiceOverStart(vo) {
        this.playCaption(vo.id);
    }
    _handleVoiceOverPaused() {
        this.paused = true;
    }
    _handleVoiceOverResumed() {
        this.paused = false;
    }
    _handleVoiceoverComplete(vo) {
        const id = this._getId(vo?.id || '');
        if (this._activeCaptionId === id) {
            this.stopCaption(id);
        }
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
    }
    playLine(id, index) {
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
        }
        else if (this._activeCaptionId === id && cc) {
            this.renderer?.lineEnd({
                id: this._activeCaptionId,
                ...cc[this._activeCaptionLine],
            });
            this.renderer?.stop();
            this._activeCaptionId = undefined;
            this._activeCaptionLine = -1;
        }
    }
};
CaptionsPlugin = __decorate([
    CorePlugin
], CaptionsPlugin);
export { CaptionsPlugin };
