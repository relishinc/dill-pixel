import {
  At,
  B,
  O,
  W,
  _,
  bt
} from "./chunk-2O2QZPWA.js";
import {
  gsapWithCSS
} from "./chunk-LB2R3FI5.js";
import {
  Assets
} from "./chunk-35K3ZVTQ.js";
import "./chunk-WGSHJJI4.js";
import "./chunk-VXOICCBN.js";
import "./chunk-QOUQSLCC.js";
import "./chunk-YBKGRBSO.js";
import "./chunk-IYUHB4SQ.js";
import "./chunk-XRNVWQXP.js";
import {
  Container,
  Texture
} from "./chunk-BQAEV2AX.js";
import "./chunk-5WRI5ZAA.js";

// node_modules/dill-pixel/lib/CaptionsPlugin-DazrJZ9z.js
var x = class extends B {
  constructor(t) {
    if (super({ autoResize: false }), this.plugin = t, this._size = { width: 0, height: 0 }, this.fontSize = 48, this._bg = this.add.sprite({ asset: Texture.WHITE, anchor: [0.5, 0] }), this._bg.tint = this.plugin.options.backgroundColor, this._bg.alpha = 0, this._text = this.add.bitmapText({
      font: t.options.fontName,
      resolution: 2,
      roundPixels: true,
      style: {
        fill: this.plugin.options.textColor,
        fontSize: this.fontSize * this.getSizeMultiplier(),
        fontWeight: "bold",
        align: "center",
        wordWrapWidth: this.plugin.maxWidth,
        wordWrap: true,
        lineHeight: this.fontSize * this.getSizeMultiplier() * 2 + 20
      }
    }), this._text.style.wordWrap = true, this._text.alpha = 0, this._text.visible = false, this._text.anchor.x = 0.5, this._text.anchor.y = 0, this.addChild(this._text), this.plugin.debug) {
      let i = false;
      this._bg.eventMode = "static", this._bg.on("pointertap", () => {
        i || (i = true, setTimeout(() => {
          i = false, this.app.voiceover.stopVO();
        }, 100));
      });
    }
  }
  start() {
    this._text.visible = true, this._bg.visible = true, gsapWithCSS.killTweensOf([this._bg, this._text]), this.animate({ alpha: this.plugin.options.backgroundAlpha, visible: true, duration: 0.2 }, this._bg), this.animate({ alpha: 1, visible: true, duration: 0.2 }, this._text);
  }
  stop() {
    gsapWithCSS.killTweensOf([this._bg, this._text]), this.animate({ alpha: 0, visible: false, duration: 0.2 }, [this._bg, this._text]);
  }
  lineBegin(t) {
    let i = t.content.replace(/<[^>]*>/gi, "").replace(/\[.*]\W*/gi, "");
    t.start === 0 && (i = i.charAt(0).toUpperCase() + i.slice(1)), this._text.text = i, this.resize();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lineEnd(t) {
  }
  resize() {
    _.log("CaptionsRenderer.resize", this.plugin.options.maxWidth);
    const t = this.app.size, i = this.plugin.options;
    this._size.width = t.width, this._size.height = t.height, this._text.style.fontSize = this.fontSize * this.getSizeMultiplier(), this._text.style.wordWrapWidth = i.maxWidth * 2, this._text.scale.set(0.5), this._text.position.set(this._size.width * 0.5, 0), this._bg.position.set(this._size.width * 0.5, 0);
    let e = this._text.height;
    if (i.padding.top && (e += i.padding.top), i.padding.bottom && (e += i.padding.bottom), this._bg.height = e, this._text.y += i.padding.top, i.floating) {
      let s = this._text.width;
      i.padding.left && (s += i.padding.left), i.padding.right && (s += i.padding.right), this._bg.x += i.padding.right * 0.5 - i.padding.left * 0.5, this._bg.width = s;
    } else
      this._bg.width = t.width;
    i.position === "top" ? (this.position.set(-t.width * 0.5, Math.round(-t.height * 0.5)), i.floating && (this.position.y += Math.round(i.distance - this._bg.y))) : (this.position.set(-t.width * 0.5, Math.round(t.height * 0.5 - this._bg.height)), i.floating && (this.position.y -= Math.round(i.distance + this._bg.y)));
  }
  updateSettings() {
    this.plugin.options.enabled ? (this._text.style.fill = this.plugin.options.textColor, this._bg.tint = this.plugin.options.backgroundColor, this._bg.visible && (this._bg.alpha = this.plugin.options.backgroundAlpha, this.resize())) : (this.stop(), this._bg.visible = false, this._text.visible = false, this._bg.alpha = this._text.alpha = 0);
  }
  getSizeMultiplier() {
    return this.plugin.options.fontSizeMultiplier;
  }
};
var m = W;
var z = {
  renderer: x,
  defaultLocale: "en",
  fontFile: "./dill-pixel/font/Sans.fnt",
  fontName: "Sans",
  fontSizeMultiplier: 1,
  maxWidth: 0.8,
  textColor: 16777215,
  backgroundColor: 0,
  backgroundAlpha: 0.4,
  enabled: true,
  floating: false,
  distance: 0,
  padding: { top: 20, left: 0, bottom: 20, right: 0 },
  position: "top"
};
function g(h, t) {
  return h <= 0 ? 0 : h > 0 && h <= 1 ? t * h : h;
}
var y = class extends O {
  constructor() {
    super(...arguments), this.id = "captions", this.view = new Container(), this._dicts = {}, this._activeCaptionLine = -1, this._activeCaptionTime = 0, this._paused = false;
  }
  /**
   * Getter for locale.
   */
  get locale() {
    return this._locale;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this._options = { ...this._options, ...t }, t.padding && (this._options.padding = bt(t.padding));
  }
  get activeCaptionId() {
    return this._activeCaptionId;
  }
  get paused() {
    return this._paused;
  }
  set paused(t) {
    this._paused = t;
  }
  get floating() {
    return this.options.floating;
  }
  set floating(t) {
    this.options.floating = t, this.updateRenderer();
  }
  get enabled() {
    return this.options.enabled;
  }
  set enabled(t) {
    this.options.enabled = t, this.enabled ? this.view.visible = true : this.view.visible = false;
  }
  get position() {
    return this.options.position;
  }
  set position(t) {
    this.options.position = t, this.renderer.updateSettings();
  }
  set backgroundColor(t) {
    this.options.backgroundColor = t, this.updateRenderer();
  }
  set textColor(t) {
    this.options.textColor = t, this.updateRenderer();
  }
  set backgroundAlpha(t) {
    this.options.backgroundAlpha = t, this.updateRenderer();
  }
  get padding() {
    return this.options.padding;
  }
  set padding(t) {
    this.options.padding = bt(t), this.updateRenderer();
  }
  get distance() {
    return this.options.distance;
  }
  set distance(t) {
    this.options.distance = t, this.updateRenderer();
  }
  get fontSizeMultiplier() {
    return this.options.fontSizeMultiplier;
  }
  set fontSizeMultiplier(t) {
    this.options.fontSizeMultiplier = t, this.renderer.resize();
  }
  get maxWidth() {
    return this.options.maxWidth;
  }
  set maxWidth(t) {
    var i;
    this.options.maxWidth = g(t, this.app.size.width), (i = this.renderer) == null || i.resize();
  }
  get list() {
    return this._dicts[this._locale];
  }
  get debug() {
    return m;
  }
  /**
   * Initializes the i18n module.
   * sets the default locale and loads the locale files.
   * @param _app
   * @param options The i18n options.
   * @returns Promise<void>
   */
  async initialize(t, i = {}) {
    var e, s;
    if (this._options = {
      ...z,
      ...i
    }, this._originalOptions = { ...this._options }, i != null && i.padding && (this._options.padding = bt(i.padding)), this._locale = this.app.i18n.locale, this._locales = this.app.i18n.locales, this._options.fontFile && await Assets.load(this._options.fontFile), ((s = (e = this._options) == null ? void 0 : e.files) == null ? void 0 : s.length) > 0) {
      const n = this._options.files.filter((o) => this._locales.includes(o.id));
      for (const o of n)
        await this.loadLocale(o.id);
    }
    this.addSignalConnection(this.app.onResize.connect(this.handleResize, "highest"));
  }
  handleResize() {
    _.log("CaptionsPlugin.handleResize"), this.maxWidth = this._originalOptions.maxWidth;
  }
  postInitialize() {
    this.app.i18n.onLocaleChanged.connect(this._handleLocaleChange), this.app.voiceover.onVoiceOverStart.connect(this._handleVoiceOverStart), this.app.voiceover.onVoiceOverPaused.connect(this._handleVoiceOverPaused), this.app.voiceover.onVoiceOverResumed.connect(this._handleVoiceOverResumed), this.app.voiceover.onVoiceOverComplete.connect(this._handleVoiceoverComplete), this.app.voiceover.onVoiceOverStopped.connect(this._handleVoiceoverStopped), this.app.stage.addChild(this.view), this._options.maxWidth = g(this._originalOptions.maxWidth, this.app.size.width);
    const t = this.options.renderer;
    this.renderer = this.view.addChild(new t(this)), this.app.ticker.add(this.update), this.app.scenes.onSceneChangeStart.connect(this.stopAllCaptions);
  }
  /**
   * Sets the locale.
   * If the locale is not loaded, it will load it first.
   * @param localeId The locale id to set.
   * @returns Promise<string>
   */
  async setLocale(t) {
    return this._locale === t ? this._locale : (this._activeCaptionId && this.stopCaption(this._activeCaptionId), this._activeCaptionId = void 0, await this._loadAndSetLocale(t), this._locale = t, this._locale);
  }
  /**
   * Loads a locale.
   * @param localeId The locale id to load.
   * @returns Promise<void>
   */
  async loadLocale(t) {
    if (this._locale === "localeId")
      return;
    const i = this._options.files.find((e) => t === e.id);
    if (!i) {
      _.error(`i18n:: Could not find locale file for ${t}`);
      return;
    }
    this._dicts[t] = i.json ? await Assets.load(i.json) : await At(i);
  }
  render() {
    this.renderer.resize();
  }
  update(t) {
    if (this._paused)
      return;
    const i = t.deltaMS / 1e3, e = this._activeCaptionId;
    if (e) {
      this._activeCaptionTime += i;
      const s = this._activeCaptionTime * 1e3, n = this.list[e], o = n.length;
      for (let a = 0; a < o; a++)
        if (s >= n[a].start && s < n[a].end) {
          this._activeCaptionLine !== a && this.playLine(e, a);
          break;
        }
      s >= n[o - 1].end && this.playLine(e, -1);
    }
  }
  playCaption(t) {
    t = this._getId(t), this.playLine(t, 0);
  }
  stopCaption(t) {
    t = this._getId(t), this._activeCaptionId === t && this.playLine(t, -1);
  }
  stopAllCaptions() {
    var t;
    (t = this.renderer) == null || t.stop(), this._activeCaptionId = void 0, this._activeCaptionLine = -1;
  }
  _getId(t) {
    return t.replace(/\.[^/.]+$/, "");
  }
  updateRenderer() {
    this.enabled && this.renderer.updateSettings();
  }
  _handleLocaleChange() {
    this.setLocale(this.app.i18n.locale);
  }
  _handleVoiceOverStart(t) {
    this.playCaption(t.id);
  }
  _handleVoiceOverPaused() {
    this.paused = true;
  }
  _handleVoiceOverResumed() {
    this.paused = false;
  }
  _handleVoiceoverComplete(t) {
    const i = this._getId((t == null ? void 0 : t.id) || "");
    this._activeCaptionId === i && this.stopCaption(i);
  }
  _handleVoiceoverStopped() {
    this.stopAllCaptions();
  }
  /**
   * Loads and sets a locale.
   * If the locale is not loaded, it will load it first.
   * @param localeId The locale id to load and set.
   */
  async _loadAndSetLocale(t) {
    this._dicts[t] || await this.loadLocale(t);
  }
  playLine(t, i) {
    var n, o, a, d;
    const e = this.list[t];
    (e ? e[i] : void 0) ? (this._activeCaptionId !== t && (this._activeCaptionId = t, this._activeCaptionTime = 0, this._activeCaptionLine = -1, (n = this.renderer) == null || n.start()), this._activeCaptionLine !== i && (this._activeCaptionLine = i, (o = this.renderer) == null || o.lineBegin({
      id: this._activeCaptionId,
      ...e[i]
    }))) : this._activeCaptionId === t && e && ((a = this.renderer) == null || a.lineEnd({
      id: this._activeCaptionId,
      ...e[this._activeCaptionLine]
    }), (d = this.renderer) == null || d.stop(), this._activeCaptionId = void 0, this._activeCaptionLine = -1);
  }
};
export {
  y as CaptionsPlugin
};
//# sourceMappingURL=CaptionsPlugin-DazrJZ9z-ARWFCCQW.js.map
