import { Assets as c } from "pixi.js";
import { P as h, S as f, L as a, g as d } from "./index-DXo32gNJ.mjs";
const u = {
  defaultLocale: "en",
  locales: ["en"],
  loadAll: !1,
  files: []
};
class L extends h {
  constructor() {
    super(...arguments), this.id = "i18n", this.onLocaleChanged = new f(), this._dicts = {};
  }
  /**
   * Getter for locale.
   */
  get locale() {
    return this._locale;
  }
  get locales() {
    return this._options.locales;
  }
  /**
   * Initializes the i18n module.
   * sets the default locale and loads the locale files.
   * @param app The application instance.
   * @param options The i18n options.
   * @returns Promise<void>
   */
  async initialize(t, i) {
    if (super.initialize(t), this._options = { ...u, ...i }, this._locale = this._options.defaultLocale, this._options.loadAll && this._options.files.length > 0) {
      const o = this._options.files.filter((e) => this._options.locales.includes(e.id));
      for (const e of o)
        await this.loadLocale(e.id);
    } else
      this._options.files.length > 0 && await this.loadLocale(this._locale);
  }
  /**
   * Sets the locale.
   * If the locale is not loaded, it will load it first.
   * @param localeId The locale id to set.
   * @returns Promise<string>
   */
  async setLocale(t) {
    return this._locale = t, await this._loadAndSetLocale(t), this._locale;
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
  t(t, i, o = this._locale) {
    const e = this._dicts[o];
    if (!e)
      return a.error(`i18n:: No dictionary loaded for current locale: ${o}`), "";
    let s = e[t];
    if (!s)
      return a.error(`i18n:: No result found for the key ${t} in the locale: ${this._locale}`), "";
    if (i) {
      if (typeof i.variant == "number" || i.variant === "random") {
        const n = /\[(.*?)\]/.exec(s);
        if (n) {
          const l = n[1].split("|"), r = i.variant === "random" ? Math.floor(Math.random() * l.length) : i.variant;
          s = s.replace(n[0], l[r]);
        }
      }
      for (const n in i) {
        const l = new RegExp(`{${n}}`, "g");
        s = s.replace(l, String(i[n]));
      }
    }
    return s;
  }
  /**
   * Parses the input string and replaces anything in between {} braces, assuming it is a key in the dictionary.
   * @param {string} input
   * @param locale
   * @returns {string}
   */
  parse(t, i = this._locale) {
    const o = this._dicts[i];
    if (!o)
      return a.error(`i18n:: No dictionary loaded for current locale: ${this._locale}`), "";
    let e = t;
    const s = e.match(/{(.*?)}/g);
    return s && s.forEach((n) => {
      const l = n.slice(1, -1);
      o[l] && (e = e.replace(n, o[l]));
    }), e;
  }
  /**
   * Loads a locale.
   * @param localeId The locale id to load.
   * @returns Promise<void>
   */
  async loadLocale(t) {
    const i = this._options.files.find((o) => t === o.id);
    if (!i) {
      a.error(`i18n:: Could not find locale file for ${t}`);
      return;
    }
    this._dicts[t] = i.json ? await c.load(i.json) : await d(i);
  }
  getCoreFunctions() {
    return ["t", "setLocale"];
  }
  getCoreSignals() {
    return ["onLocaleChanged"];
  }
  /**
   * Loads and sets a locale.
   * If the locale is not loaded, it will load it first.
   * @param localeId The locale id to load and set.
   */
  async _loadAndSetLocale(t) {
    this._dicts[t] || await this.loadLocale(t), this.onLocaleChanged.emit(t);
  }
}
export {
  L as i18nPlugin
};
//# sourceMappingURL=i18nPlugin-BPgURbw5.mjs.map
