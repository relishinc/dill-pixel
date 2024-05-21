import { Texture as _, Container as u, Assets as d } from "pixi.js";
import { C as f, L as g, P as v, f as p, g as C, i as b } from "./index-ChDTXvc9.mjs";
import { gsap as l } from "gsap";
class x extends f {
  constructor(t) {
    if (super(), this.plugin = t, this._size = { width: 0, height: 0 }, this.fontSize = 48, this._bg = this.add.sprite({ asset: _.WHITE, anchor: [0.5, 0] }), this._bg.tint = this.plugin.options.backgroundColor, this._bg.alpha = 0, this._text = this.add.bitmapText({
      font: t.options.fontName,
      resolution: 2,
      roundPixels: !0,
      style: {
        fill: this.plugin.options.textColor,
        fontSize: this.fontSize * this.getSizeMultiplier(),
        fontWeight: "bold",
        align: "center",
        wordWrapWidth: this.plugin.maxWidth,
        wordWrap: !0,
        lineHeight: this.fontSize * this.getSizeMultiplier() * 2 + 20
      }
    }), this._text.style.wordWrap = !0, this._text.alpha = 0, this._text.visible = !1, this._text.anchor.x = 0.5, this._text.anchor.y = 0, this.addChild(this._text), this.plugin.debug) {
      let i = !1;
      this._bg.eventMode = "static", this._bg.on("pointertap", () => {
        i || (i = !0, setTimeout(() => {
          i = !1, this.app.voiceover.stopVO();
        }, 100));
      });
    }
  }
  start() {
    this._text.visible = !0, this._bg.visible = !0, l.killTweensOf([this._bg, this._text]), this.animate({ alpha: this.plugin.options.backgroundAlpha, visible: !0, duration: 0.2 }, this._bg), this.animate({ alpha: 1, visible: !0, duration: 0.2 }, this._text);
  }
  stop() {
    g.log("CaptionsRenderer", "stop"), l.killTweensOf([this._bg, this._text]), this.animate({ alpha: 0, visible: !1, duration: 0.2 }, [this._bg, this._text]);
  }
  lineBegin(t) {
    let i = t.content.replace(/<[^>]*>/gi, "").replace(/\[.*]\W*/gi, "");
    t.start === 0 && (i = i.charAt(0).toUpperCase() + i.slice(1)), this._text.text = i, this.resize();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lineEnd(t) {
  }
  resize() {
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
    this.plugin.options.enabled ? (this._text.style.fill = this.plugin.options.textColor, this._bg.tint = this.plugin.options.backgroundColor, this._bg.visible && (this._bg.alpha = this.plugin.options.backgroundAlpha, this.resize())) : (this.stop(), this._bg.visible = !1, this._text.visible = !1, this._bg.alpha = this._text.alpha = 0);
  }
  getSizeMultiplier() {
    return this.plugin.options.fontSizeMultiplier;
  }
}
const m = b, w = {
  renderer: x,
  defaultLocale: "en",
  fontFile: "./dill-pixel/font/Sans.fnt",
  fontName: "Sans",
  fontSizeMultiplier: 1,
  maxWidth: 0.8,
  textColor: 16777215,
  backgroundColor: 0,
  backgroundAlpha: 0.4,
  enabled: !0,
  floating: !1,
  distance: 0,
  padding: { top: 20, left: 0, bottom: 20, right: 0 },
  position: "top"
};
function c(o, t) {
  return o <= 0 ? 0 : o > 0 && o <= 1 ? t * o : o;
}
class y extends v {
  constructor() {
    super(...arguments), this.id = "captions", this.view = new u(), this._dicts = {}, this._activeCaptionLine = -1, this._activeCaptionTime = 0, this._paused = !1;
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
    this._options = { ...this._options, ...t }, t.padding && (this._options.padding = p(t.padding));
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
    this.options.enabled = t, this.enabled ? this.view.visible = !0 : this.view.visible = !1;
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
    this.options.padding = p(t), this.updateRenderer();
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
    this.options.maxWidth = c(t, this.app.size.width), this.renderer.resize();
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
  async initialize(t, i) {
    if (this._options = {
      ...w,
      ...i
    }, i.padding && (this._options.padding = p(i.padding)), this._locale = this.app.i18n.locale, this._locales = this.app.i18n.locales, await d.load(this._options.fontFile), this._options.files.length > 0) {
      const e = this._options.files.filter((s) => this._locales.includes(s.id));
      for (const s of e)
        await this.loadLocale(s.id);
    }
  }
  postInitialize() {
    this.app.i18n.onLocaleChanged.connect(this._handleLocaleChange), this.app.voiceover.onVoiceOverStart.connect(this._handleVoiceOverStart), this.app.voiceover.onVoiceOverPaused.connect(this._handleVoiceOverPaused), this.app.voiceover.onVoiceOverResumed.connect(this._handleVoiceOverResumed), this.app.voiceover.onVoiceOverComplete.connect(this._handleVoiceoverComplete), this.app.voiceover.onVoiceOverStopped.connect(this._handleVoiceoverStopped), this.app.stage.addChild(this.view), this._options.maxWidth = c(this.options.maxWidth, this.app.size.width);
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
      g.error(`i18n:: Could not find locale file for ${t}`);
      return;
    }
    this._dicts[t] = i.json ? await d.load(i.json) : await C(i);
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
      const s = this._activeCaptionTime * 1e3, a = this.list[e], h = a.length;
      for (let n = 0; n < h; n++)
        if (s >= a[n].start && s < a[n].end) {
          this._activeCaptionLine !== n && this.playLine(e, n);
          break;
        }
      s >= a[h - 1].end && this.playLine(e, -1);
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
    this.paused = !0;
  }
  _handleVoiceOverResumed() {
    this.paused = !1;
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
    var a, h, n, r;
    const e = this.list[t];
    (e ? e[i] : void 0) ? (this._activeCaptionId !== t && (this._activeCaptionId = t, this._activeCaptionTime = 0, this._activeCaptionLine = -1, (a = this.renderer) == null || a.start()), this._activeCaptionLine !== i && (this._activeCaptionLine = i, (h = this.renderer) == null || h.lineBegin({
      id: this._activeCaptionId,
      ...e[i]
    }))) : this._activeCaptionId === t && e && ((n = this.renderer) == null || n.lineEnd({
      id: this._activeCaptionId,
      ...e[this._activeCaptionLine]
    }), (r = this.renderer) == null || r.stop(), this._activeCaptionId = void 0, this._activeCaptionLine = -1);
  }
}
export {
  y as CaptionsPlugin
};
//# sourceMappingURL=CaptionsPlugin--nuHT0uP.mjs.map
