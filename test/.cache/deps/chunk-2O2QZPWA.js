import {
  gsapWithCSS
} from "./chunk-LB2R3FI5.js";
import {
  AnimatedSprite,
  Application,
  Assets,
  BitmapText,
  ParticleContainer,
  Text
} from "./chunk-35K3ZVTQ.js";
import {
  isMobile
} from "./chunk-WGSHJJI4.js";
import {
  CanvasTextMetrics,
  Graphics,
  LoaderParserPriority,
  Polygon,
  path
} from "./chunk-VXOICCBN.js";
import {
  Container,
  DOMAdapter,
  ExtensionType,
  Point,
  Rectangle,
  Sprite,
  Texture,
  Ticker,
  eventemitter3_default,
  extensions
} from "./chunk-BQAEV2AX.js";

// node_modules/dill-pixel/lib/dill-pixel.mjs
var Pe = "development";
var W = Pe === "development";
var Rs = Pe === "production";
function Rt(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function Us(s) {
  return s.split(" ").map(Rt).join(" ");
}
var Ft = {
  log: "background: #74b64c; color: black;",
  warn: "background: yellow; color: black;",
  error: "background: orange; color: black;"
};
var b = class b2 {
  constructor(t) {
    b2._instance = this, b2.mode = t !== void 0 ? t : W ? "development" : "default", ["development", "default", "disabled"].includes(b2.mode) || (b2.mode = "default");
  }
  static get mode() {
    return b2._mode;
  }
  static set mode(t) {
    b2._mode = t;
  }
  static initialize(t) {
    if (b2._instance)
      throw new Error("Logger has already been instantiated.");
    b2._instance = new b2(t);
  }
  static log(...t) {
    b2.trace("log", ...t);
  }
  static warn(...t) {
    b2.trace("warn", ...t);
  }
  static error(...t) {
    b2.trace("error", ...t);
  }
  static trace(t = "log", ...e) {
    if (b2.mode !== "disabled") {
      if (b2.mode === "default")
        return console.log(`%c ${Rt(t)} `, Ft[t], ...e);
      console.groupCollapsed(`%c ${Rt(t)} `, Ft[t], ...e), console.trace("%c Stack ", Ft[t]), console.groupEnd();
    }
  }
};
b._instance = null, b._mode = "disabled";
var _ = b;
var ke = (s = 0) => new Promise((t) => setTimeout(t, s * 1e3));
var $s = (s = 0) => ke(s);
var Ee = (s) => s && typeof s.then == "function";
function si(...s) {
  return new ni(s);
}
var ni = class {
  /**
   * Creates a new Queue.
   * @param {(Promise<any> | (() => Promise<T>))[]} promises The promises to add to the queue.
   */
  constructor(t = []) {
    this._currentIndex = 0, this._isPaused = false, this._isCanceled = false, this._promises = t;
  }
  /**
   * Gets the results of the promises that have been resolved so far.
   * @returns {T[]} The results.
   */
  get results() {
    return this._results;
  }
  /**
   * Adds promises to the queue.
   * @param {...(Promise<any> | (() => Promise<T>))[]} args The promises to add.
   */
  add(...t) {
    this._promises.push(...t);
  }
  /**
   * Starts the execution of the promises in the queue.
   */
  start() {
    this._currentIndex === 0 && (this._results = [], this._next());
  }
  /**
   * Pauses the execution of the promises in the queue.
   */
  pause() {
    this._isPaused = true;
  }
  /**
   * Resumes the execution of the promises in the queue.
   */
  resume() {
    this._isPaused && (this._isPaused = false, this._next());
  }
  /**
   * Cancels the execution of the promises in the queue.
   */
  cancel() {
    this._isCanceled = true, this._promises = [];
  }
  /**
   * Executes the next promise in the queue.
   * @private
   * @returns {Promise<void>} A promise that resolves when the next promise in the queue has been executed.
   */
  async _next() {
    if (this._isPaused || this._isCanceled || this._currentIndex >= this._promises.length)
      return;
    const t = this._promises[this._currentIndex];
    try {
      const e = typeof t == "function" ? await t() : await t;
      this._results.push(e), this._currentIndex++, this._next();
    } catch (e) {
      _.error("Queue didn't complete due to an error:", e, "Cancelling Queue"), this._isCanceled = true;
    }
  }
};
function oi(s) {
  return typeof s == "function" && /^class\s/.test(Function.prototype.toString.call(s));
}
async function At(s) {
  let t, e;
  return Ee(s.module) ? (t = await s.module, e = s != null && s.namedExport ? t[s.namedExport] : t.default) : typeof s.module == "function" ? oi(s.module) ? (t = s.module, e = t) : (t = await s.module(), e = s != null && s.namedExport ? t[s.namedExport] : t.default) : (t = s.module, e = t), e;
}
function Jt(s) {
  if (s === void 0)
    return { width: 0, height: 0 };
  if (Array.isArray(s))
    return { width: s[0], height: s[1] === void 0 ? s[0] : s[1] };
  if (s instanceof Point)
    return { width: s.x, height: s.y };
  if (typeof s == "object") {
    const t = s;
    return { width: t.width || 0, height: t.height || 0 };
  } else
    return { width: s ?? 0, height: s ?? 0 };
}
function Ws(s, t) {
  let e;
  return function(...i) {
    e !== void 0 && clearTimeout(e), e = setTimeout(() => {
      s(...i);
    }, t);
  };
}
function Ut(s, t) {
  let e;
  for (const i of s) {
    if (i[0] === t)
      return e;
    e = i;
  }
}
function ri(s, t) {
  let e;
  const i = Array.from(s.entries());
  for (let n = i.length - 1; n >= 0; n--) {
    const o = i[n];
    if (o[0] === t)
      return e;
    e = o;
  }
}
function Ht(s) {
  return Array.from(s.entries()).pop();
}
function ai(s) {
  return Array.from(s.entries()).shift();
}
function Ks(s, t, e) {
  return Math.max(t, Math.min(e, s));
}
function hi(s, t, e) {
  return s + (t - s) * e;
}
function X(s, t) {
  return t.reduce((e, i) => i in s ? { ...e, [i]: s[i] } : e, {});
}
function $(s, t) {
  return Object.entries(t).filter(([e]) => !s.includes(e)).reduce((e, [i, n]) => ({ ...e, [i]: n }), {});
}
function js(s, t) {
  return new Point(s.x + t.x, s.y + t.y);
}
function Hs(s, t) {
  s.x += t.x, s.y += t.y;
}
function Gs(s, t) {
  return new Point(s.x - t.x, s.y - t.y);
}
function Vs(s, t) {
  s.x -= t.x, s.y -= t.y;
}
function Xs(s, t) {
  const e = new Point(s.x, s.y);
  return e.x *= t, e.y *= t, e;
}
function qs(s, t) {
  return hi(s.x, s.y, t);
}
function Ys(s, t) {
  return Math.sqrt(li(s, t));
}
function li(s, t) {
  return (t.x - s.x) * (t.x - s.x) + (t.y - s.y) * (t.y - s.y);
}
function Ns(s) {
  return Math.sqrt(s.x * s.x + s.y * s.y);
}
function I(s, t = false, e = 0, i = 0) {
  if (s instanceof Point)
    e = s.x, i = s.y;
  else if (Array.isArray(s))
    e = s[0], i = s[1] === void 0 ? s[0] : s[1];
  else if (typeof s == "object") {
    const n = s;
    e = n.x || 0, i = n.y || 0;
  } else
    e = s ?? e, i = s ?? i;
  return t ? new Point(e, i) : { x: e, y: i };
}
function Zs(s, t) {
  return s.x += t.x, s.y += t.y, s;
}
function Qs(s, t) {
  return t === void 0 && (t = new Point()), t.set(s.x + s.width * 0.5, s.y + s.height * 0.5), t;
}
function Js(s, t) {
  return s.x *= t, s.y *= t, s.width *= t, s.height *= t, s;
}
function tn(s, t) {
  return t === void 0 && (t = new Point()), t.set(s.width, s.height), t;
}
function ci(s, ...t) {
  t.forEach((e) => {
    const i = s[e];
    typeof i == "function" && (s[e] = i.bind(s));
  });
}
function ui(s, t = [], e = []) {
  let i = Object.getPrototypeOf(s);
  const n = [];
  for (; i; ) {
    const o = Object.getOwnPropertyNames(i).filter((r) => {
      const a = Object.getOwnPropertyDescriptor(i, r);
      return typeof (a == null ? void 0 : a.value) == "function" && r !== "constructor" && !t.some((h) => r.startsWith(h)) && !e.includes(r);
    });
    if (n.push(...o), i === Object.prototype || Object.prototype.hasOwnProperty.call(i.constructor, "__dill_pixel_method_binding_root"))
      break;
    i = Object.getPrototypeOf(i);
  }
  return n;
}
function w(s, t = [], e = []) {
  ui(s, t, e).forEach((i) => {
    s[i] = s[i].bind(s);
  });
}
function en(s, t, ...e) {
  typeof s[t] == "function" && s[t](...e);
}
function Le(s, t) {
  return s + Math.random() * (t - s);
}
function sn(s) {
  return Le(s.x, s.y);
}
function Gt(s, t) {
  return Math.floor(Le(s, t));
}
function nn(s) {
  return Gt(s.x, s.y);
}
function on() {
  return Math.random() < 0.5;
}
function rn(s) {
  let t, e;
  for (let i = 0; i < s.length; ++i)
    e = Gt(0, s.length), t = s[i], s[i] = s[e], s[e] = t;
}
function an(s) {
  return s[Gt(0, s.length)];
}
function wt(s, t) {
  return s >= 0 && s <= 1 ? s * t : s;
}
function bt(s) {
  if (Array.isArray(s))
    return {
      top: s[0],
      right: (s == null ? void 0 : s[1]) ?? s[0],
      bottom: (s == null ? void 0 : s[2]) ?? s[0],
      left: (s == null ? void 0 : s[3]) ?? (s == null ? void 0 : s[1]) ?? s[0] ?? 0
    };
  if (typeof s == "number")
    return { top: s, right: s, bottom: s, left: s };
  if (typeof s == "object") {
    const t = s;
    return t.x !== void 0 && t.y !== void 0 ? {
      top: t.y,
      right: t.x,
      bottom: t.y,
      left: t.x
    } : {
      top: s.top ?? 0,
      right: s.right ?? 0,
      bottom: s.bottom ?? 0,
      left: s.left ?? 0
    };
  } else
    return { top: 0, right: 0, bottom: 0, left: 0 };
}
var hn = window.devicePixelRatio > 1 || window.matchMedia && window.matchMedia(
  "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)"
).matches;
var Ot = "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator == null ? void 0 : navigator.maxTouchPoints) > 0;
var te = isMobile.any;
var ee = isMobile.android.device;
var di = isMobile.apple.device;
function fi(s, t = 0) {
  return s.toString().padStart(t, "0");
}
function pi(s, t) {
  const e = CanvasTextMetrics.measureText(s.text, s.style), i = e.lines, n = e.lineHeight, o = s.toLocal(new Point(t.pageX, t.pageY));
  let r = 0, a = 1 / 0, h = 0;
  for (let c = 0; c < i.length; c++) {
    const l = i[c];
    for (let d = 0; d <= l.length; d++) {
      const p = l.substring(0, d), H = CanvasTextMetrics.measureText(p, s.style).width, z = c * n, f = Math.hypot(H - o.x, z - o.y);
      f < a && (a = f, r = h + d);
    }
    h += l.length;
  }
  return r;
}
function ln(s) {
  return `#${s.toString(16)}`;
}
function cn(s) {
  return parseInt(s.replace(/^#/, ""), 16);
}
var m = class m2 {
  /**
   * A Color reresented by a red, green and blue component.
   * @param r The red component of the Color OR the full Color in HEX.
   * @param g The green component of the Color.
   * @param b The blue component of the Color.
   */
  constructor(t, e, i) {
    t !== void 0 && e === void 0 ? (this.r = (t & 255 << 16) >> 16, this.g = (t & 65280) >> 8, this.b = t & 255) : (this.r = t || 0, this.g = e || 0, this.b = i || 0);
  }
  /**
   * Creates a random Color.
   * @returns The new Color.
   */
  static random() {
    return new m2(Math.random() * 255, Math.random() * 255, Math.random() * 255);
  }
  /**
   * Converts the rgb values passed in to hex.
   * @param r The red component to convert.
   * @param g The green component to convert.
   * @param b The blue component to convert.
   * @returns The hex value.
   */
  static rgbToHex(t, e, i) {
    return t << 16 | e << 8 | i;
  }
  static rgbToHexString(t) {
    let e = Number(t).toString(16);
    return e.length < 2 && (e = "0" + e), e;
  }
  static rgbToFullHexString(t, e, i) {
    const n = m2.rgbToHexString(t), o = m2.rgbToHexString(e), r = m2.rgbToHexString(i);
    return n + o + r;
  }
  /**
   * Creates a new Color that is linearly interpolated from @var pA to @var b .
   * @param pA The start Color.
   * @param b The end Color.
   * @param pPerc The percentage on the path from @var pA to @var b .
   * @returns The new Color.
   */
  static lerp(t, e, i) {
    return new m2(t.r + i * (e.r - t.r), t.g + i * (e.g - t.g), t.b + i * (e.b - t.b));
  }
  /**
   * Creates a new hex Color that is linearly interpolated from @var pA to @var b .
   * @param pA The first Color hex.
   * @param b The second Color hex.
   * @param pPerc The percentage along the path from @var pA to @var b .
   * @returns The new hex Color.
   */
  static lerpHex(t, e, i) {
    const n = new m2(t), o = new m2(e);
    return m2.lerp(n, o, i).toHex();
  }
  /**
   * Convert this Color to hex.
   * @returns The Color in hex format.
   */
  toHex() {
    return m2.rgbToHex(this.r, this.g, this.b);
  }
  toHexString() {
    return m2.rgbToFullHexString(this.r, this.g, this.b);
  }
  /**
   * Converts the Color components to the 0...1 range.
   * @returns The new Color.
   */
  toWebGL() {
    return [this.r / 255, this.g / 255, this.b / 255];
  }
};
m.WHITE = new m(255, 255, 255), m.BLACK = new m(0, 0, 0), m.GREY = new m(127, 127, 127), m.RED = new m(255, 0, 0), m.GREEN = new m(0, 255, 0), m.BLUE = new m(0, 0, 255), m.YELLOW = new m(255, 255, 0), m.MAGENTA = new m(255, 0, 255), m.CYAN = new m(0, 255, 255);
var ie = m;
function un(s, t) {
  s.parent.worldTransform.apply(s.position, s.position), t.worldTransform.applyInverse(s.position, s.position), s.parent.removeChild(s), t.addChild(s);
}
function dn(s) {
  return Math.sqrt(s.width * s.width + s.height * s.height);
}
function fn(s) {
  const t = s.parent;
  t.removeChild(s), t.addChild(s);
}
function pn(s) {
  const t = s.parent;
  t.removeChild(s), t.addChildAt(s, 0);
}
function _n(s, t) {
  if (s instanceof Polygon) {
    for (let e = 0; e < s.points.length; e += 2)
      s.points[e] += t.x, s.points[e + 1] += t.y;
    return s;
  } else
    return s.x += t.x, s.y += t.y, s;
}
function gn(s, t) {
  return s.x += t.x, s.y += t.y, s;
}
function Me(s, t, e = "width") {
  const i = e === "width" ? "y" : "x", n = e === "width" ? "x" : "y";
  s[e] = t, s.scale[i] = s.scale[n];
}
function se(s, t) {
  Me(s, t, "width");
}
function ne(s, t) {
  Me(s, t, "height");
}
function mn(s, t, e = "width") {
  let i;
  t != null && t.width && (t != null && t.height) ? i = { x: t.width, y: t.height } : i = I(t), e === "width" ? (se(s, i.x), s.height < i.y && ne(s, i.y)) : (ne(s, i.y), s.width < i.x && se(s, i.x));
}
function yn(s) {
  const t = s.getContext("webgl");
  if (t) {
    const i = t.getExtension("WEBGL_lose_context");
    i && i.loseContext();
  }
  const e = s.getContext("2d");
  e && e.clearRect(0, 0, s.width, s.height), s instanceof OffscreenCanvas || s.parentNode && s.parentNode.removeChild(s), s.width = 0, s.height = 0, s = null;
}
function vn(s, t) {
  const e = /* @__PURE__ */ new Set();
  for (const i of s)
    t(i) && e.add(i);
  return e;
}
function wn(s) {
  return s == null ? void 0 : s.values().next().value;
}
function bn(s) {
  let t;
  for (const e of s)
    t = e;
  return t;
}
async function _i(s) {
  const e = globalThis.getDillPixel("pluginsList") || [];
  return s.map((i) => {
    var r, a;
    const n = e.find((h) => h.id === i || h.id === i[0]);
    if (!n)
      return _.warn(`Plugin ${i} not found`), null;
    const o = i;
    return console.log({ p: n }), {
      id: n.id,
      path: n.path,
      module: n.module,
      options: (r = o[1]) == null ? void 0 : r.options,
      autoLoad: ((a = o[1]) == null ? void 0 : a.autoLoad) !== false
    };
  }).filter(Boolean);
}
async function gi(s) {
  const e = globalThis.getDillPixel("storageAdaptersList") || [];
  return s.map((i) => {
    var r, a;
    const n = e.find((h) => h.id === i || h.id === i[0]);
    if (!n)
      return _.warn(`Storage Adapter ${i} not found`), null;
    const o = i;
    return {
      id: n.id,
      path: n.path,
      module: n.module,
      options: (r = o[1]) == null ? void 0 : r.options,
      autoLoad: ((a = o[1]) == null ? void 0 : a.autoLoad) !== false
    };
  }).filter(Boolean);
}
function xn(s) {
  return {
    id: "DillPixelApplication",
    showStats: false,
    showSceneDebugMenu: false,
    useHash: false,
    useSpine: false,
    useVoiceover: false,
    defaultSceneLoadMethod: "immediate",
    data: {
      initial: {},
      backupAll: false
    },
    assets: {
      manifest: {},
      preload: {
        bundles: ["required"]
      },
      background: {
        bundles: []
      }
    },
    plugins: [],
    scenes: [],
    ...s
  };
}
var mi = "8.18.2";
var yi = "8.6.6";
function vi() {
  const s = `%c Dill Pixel Game Framework v${mi} | %cPixi.js v${yi} %c| %chttps://dillpixel.io `;
  console.log(
    s,
    "background: rgba(31, 41, 55, 1);color: #74b64c",
    "background: rgba(31, 41, 55, 1);color: #e91e63",
    "background: rgba(31, 41, 55, 1);color: #74b64c",
    "background: rgba(31, 41, 55, 1);color: #74b64c; font-weight: bold"
  );
}
var wi = "dill-pixel-game-container";
function bi(s) {
  const t = document.createElement("div");
  return t.setAttribute("id", s), document.body.appendChild(t), t;
}
async function Cn(s = { id: "DillPixelApplication" }, t = v, e = wi, i = true) {
  i && vi();
  let n = null;
  if (typeof e == "string" ? (n = document.getElementById(e), n || (n = bi(e))) : e instanceof HTMLElement ? n = e : e === window && (n = document.body), !n)
    throw new Error(
      "You passed in a DOM Element, but none was found. If you instead pass in a string, a container will be created for you, using the string for its id."
    );
  s.resizeToContainer && (s.resizeTo = n), s.container = n;
  const o = new t();
  if (await o.initialize(s), n)
    n.appendChild(o.canvas), o.setContainer(n);
  else
    throw new Error("No element found to append the view to.");
  return await ke(0.01), await o.postInitialize(), o;
}
var Te = {};
var $t = {};
var xi = class {
  constructor() {
    this._adapters = /* @__PURE__ */ new Map();
  }
  /**
   * Registers a new storage adapter with the store.
   * @param {IStorageAdapter} adapter The adapter to register.
   * @param {any} adapterOptions The options to initialize the adapter with.
   * @returns {Promise<void>} A promise that resolves when the adapter has been registered and initialized.
   */
  async registerAdapter(t, e) {
    if (this._adapters.has(t.id))
      return _.error(`Storage Adapter with id "${t.id}" already registered. Not registering.`), Promise.resolve();
    this._adapters.set(t.id, t), await t.initialize(this._app, e);
  }
  /**
   * Retrieves a registered storage adapter.
   * @template T The type of the adapter.
   * @param {string} adapterId The ID of the adapter.
   * @returns {T} The adapter.
   */
  getAdapter(t) {
    const e = this._adapters.get(t);
    if (!e)
      throw new Error(`Adapter ${t} not found`);
    return e;
  }
  /**
   * Checks if a storage adapter is registered.
   * @param {string} adapterId The ID of the adapter.
   * @returns {boolean} True if the adapter is registered, false otherwise.
   */
  hasAdapter(t) {
    return this._adapters.has(t);
  }
  /**
   * Destroys the store and all its adapters.
   */
  destroy() {
    this._adapters.forEach((t) => {
      t.destroy();
    }), this._adapters.clear();
  }
  /**
   * Saves data with a storage adapter.
   * @param {string | string[] | Partial<AdapterSaveConfig> | Partial<AdapterSaveConfig>[]} adapterId The ID of the adapter, or an array of IDs, or an array of save configurations.
   * @param {string} key The key to save the data under.
   * @param {any} data The data to save.
   * @param {boolean} [awaitSave] Whether to wait for the save operation to complete before returning.
   * @returns {Promise<any>} A promise that resolves with the result of the save operation.
   */
  async save(t, e, i, n = true) {
    var a;
    let o = [];
    const r = [];
    Array.isArray(t) || (typeof t == "object" ? o = [t] : o = [t]), (o[0] === "*" || ((a = o[0]) == null ? void 0 : a.adapterId) === "*") && (o = Array.from(this._adapters.keys()));
    for (let h = 0; h < o.length; h++) {
      let c, l = false;
      if (typeof o[h] == "object") {
        const p = o[h];
        c = p.adapterId, l = p.awaitSave ?? false;
      } else
        c = o[h], l = n;
      const d = this._adapters.get(c);
      if (!d)
        throw new Error(`Adapter ${o[h]} not found`);
      l ? r.push(await d.save(e, i)) : r.push(void d.save(e, i));
    }
    return r;
  }
  /**
   * Loads data from a storage adapter.
   * @param {string} adapterId The ID of the adapter.
   * @param {string} key The key to load the data from.
   * @returns {Promise<any>} A promise that resolves with the loaded data.
   */
  async load(t, e) {
    const i = this._adapters.get(t);
    if (!i)
      throw new Error(`Adapter ${t} not found`);
    return await i.load(e);
  }
  initialize(t) {
    return this._app = t, this;
  }
};
var zt = {};
var et = {};
var oe;
function yt() {
  if (oe) return et;
  oe = 1, Object.defineProperty(et, "__esModule", { value: true }), et.Collector = void 0;
  let s = class {
    /**
     * Create a new collector.
     *
     * @param signal The signal to emit.
     */
    constructor(e) {
      this.emit = (...i) => {
        e.emitCollecting(this, i);
      };
    }
  };
  return et.Collector = s, et;
}
var it = {};
var re;
function Ci() {
  if (re) return it;
  re = 1, Object.defineProperty(it, "__esModule", { value: true }), it.CollectorArray = void 0;
  const s = yt();
  let t = class extends s.Collector {
    constructor() {
      super(...arguments), this.result = [];
    }
    handleResult(i) {
      return this.result.push(i), true;
    }
    /**
     * Get the list of results from the signal handlers.
     */
    getResult() {
      return this.result;
    }
    /**
     * Reset the result
     */
    reset() {
      this.result.length = 0;
    }
  };
  return it.CollectorArray = t, it;
}
var st = {};
var ae;
function Ai() {
  if (ae) return st;
  ae = 1, Object.defineProperty(st, "__esModule", { value: true }), st.CollectorLast = void 0;
  const s = yt();
  let t = class extends s.Collector {
    handleResult(i) {
      return this.result = i, true;
    }
    /**
     * Get the result of the last signal handler.
     */
    getResult() {
      return this.result;
    }
    /**
     * Reset the result
     */
    reset() {
      delete this.result;
    }
  };
  return st.CollectorLast = t, st;
}
var nt = {};
var he;
function Si() {
  if (he) return nt;
  he = 1, Object.defineProperty(nt, "__esModule", { value: true }), nt.CollectorUntil0 = void 0;
  const s = yt();
  let t = class extends s.Collector {
    constructor() {
      super(...arguments), this.result = false;
    }
    handleResult(i) {
      return this.result = i, this.result;
    }
    /**
     * Get the result of the last signal handler.
     */
    getResult() {
      return this.result;
    }
    /**
     * Reset the result
     */
    reset() {
      this.result = false;
    }
  };
  return nt.CollectorUntil0 = t, nt;
}
var ot = {};
var le;
function Pi() {
  if (le) return ot;
  le = 1, Object.defineProperty(ot, "__esModule", { value: true }), ot.CollectorWhile0 = void 0;
  const s = yt();
  let t = class extends s.Collector {
    constructor() {
      super(...arguments), this.result = false;
    }
    handleResult(i) {
      return this.result = i, !this.result;
    }
    /**
     * Get the result of the last signal handler.
     */
    getResult() {
      return this.result;
    }
    /**
     * Reset the result
     */
    reset() {
      this.result = false;
    }
  };
  return ot.CollectorWhile0 = t, ot;
}
var rt = {};
var at = {};
var ce;
function ki() {
  if (ce) return at;
  ce = 1, Object.defineProperty(at, "__esModule", { value: true }), at.SignalConnectionImpl = void 0;
  class s {
    /**
     * @param link The actual link of the connection.
     * @param parentCleanup Callback to cleanup the parent signal when a connection is disconnected
     */
    constructor(e, i) {
      this.link = e, this.parentCleanup = i;
    }
    disconnect() {
      return this.link !== null ? (this.link.unlink(), this.link = null, this.parentCleanup(), this.parentCleanup = null, true) : false;
    }
    set enabled(e) {
      this.link && this.link.setEnabled(e);
    }
    get enabled() {
      return this.link !== null && this.link.isEnabled();
    }
  }
  return at.SignalConnectionImpl = s, at;
}
var ht = {};
var ue;
function Ei() {
  if (ue) return ht;
  ue = 1, Object.defineProperty(ht, "__esModule", { value: true }), ht.SignalLink = void 0;
  let s = class De {
    constructor(e = null, i = null, n = 0) {
      this.enabled = true, this.newLink = false, this.callback = null, this.prev = e ?? this, this.next = i ?? this, this.order = n;
    }
    isEnabled() {
      return this.enabled && !this.newLink;
    }
    setEnabled(e) {
      this.enabled = e;
    }
    unlink() {
      this.callback = null, this.next.prev = this.prev, this.prev.next = this.next;
    }
    insert(e, i) {
      let n = this.prev;
      for (; n !== this && !(n.order <= i); )
        n = n.prev;
      const o = new De(n, n.next, i);
      return o.callback = e, n.next = o, o.next.prev = o, o;
    }
  };
  return ht.SignalLink = s, ht;
}
var de;
function Li() {
  if (de) return rt;
  de = 1, Object.defineProperty(rt, "__esModule", { value: true }), rt.Signal = void 0;
  const s = ki(), t = Ei();
  class e {
    constructor() {
      this.head = new t.SignalLink(), this.hasNewLinks = false, this.emitDepth = 0, this.connectionsCount = 0;
    }
    /**
     * @returns The number of connections on this signal.
     */
    getConnectionsCount() {
      return this.connectionsCount;
    }
    /**
     * @returns true if this signal has connections.
     */
    hasConnections() {
      return this.connectionsCount > 0;
    }
    /**
     * Subscribe to this signal.
     *
     * @param callback This callback will be run when emit() is called.
     * @param order Handlers with a higher order value will be called later.
     */
    connect(n, o = 0) {
      this.connectionsCount++;
      const r = this.head.insert(n, o);
      return this.emitDepth > 0 && (this.hasNewLinks = true, r.newLink = true), new s.SignalConnectionImpl(r, () => this.decrementConnectionCount());
    }
    decrementConnectionCount() {
      this.connectionsCount--;
    }
    /**
     * Unsubscribe from this signal with the original callback instance.
     * While you can use this method, the SignalConnection returned by connect() will not be updated!
     *
     * @param callback The callback you passed to connect().
     */
    disconnect(n) {
      for (let o = this.head.next; o !== this.head; o = o.next)
        if (o.callback === n)
          return this.decrementConnectionCount(), o.unlink(), true;
      return false;
    }
    /**
     * Disconnect all handlers from this signal event.
     */
    disconnectAll() {
      for (; this.head.next !== this.head; )
        this.head.next.unlink();
      this.connectionsCount = 0;
    }
    /**
     * Publish this signal event (call all handlers).
     */
    emit(...n) {
      this.emitDepth++;
      for (let o = this.head.next; o !== this.head; o = o.next)
        o.isEnabled() && o.callback && o.callback.apply(null, n);
      this.emitDepth--, this.unsetNewLink();
    }
    emitCollecting(n, o) {
      this.emitDepth++;
      for (let r = this.head.next; r !== this.head; r = r.next)
        if (r.isEnabled() && r.callback) {
          const a = r.callback.apply(null, o);
          if (!n.handleResult(a))
            break;
        }
      this.emitDepth--, this.unsetNewLink();
    }
    unsetNewLink() {
      if (this.hasNewLinks && this.emitDepth === 0) {
        for (let n = this.head.next; n !== this.head; n = n.next)
          n.newLink = false;
        this.hasNewLinks = false;
      }
    }
  }
  return rt.Signal = e, rt;
}
var lt = {};
var fe;
function Mi() {
  if (fe) return lt;
  fe = 1, Object.defineProperty(lt, "__esModule", { value: true }), lt.SignalConnections = void 0;
  let s = class {
    constructor() {
      this.list = [];
    }
    /**
     * Add a connection to the list.
     * @param connection
     */
    add(e) {
      this.list.push(e);
    }
    /**
     * Disconnect all connections in the list and empty the list.
     */
    disconnectAll() {
      for (const e of this.list)
        e.disconnect();
      this.list = [];
    }
    /**
     * @returns The number of connections in this list.
     */
    getCount() {
      return this.list.length;
    }
    /**
     * @returns true if this list is empty.
     */
    isEmpty() {
      return this.list.length === 0;
    }
  };
  return lt.SignalConnections = s, lt;
}
var pe;
function Ti() {
  return pe || (pe = 1, function(s) {
    Object.defineProperty(s, "__esModule", { value: true }), s.SignalConnections = s.Signal = s.CollectorWhile0 = s.CollectorUntil0 = s.CollectorLast = s.CollectorArray = s.Collector = void 0;
    var t = yt();
    Object.defineProperty(s, "Collector", { enumerable: true, get: function() {
      return t.Collector;
    } });
    var e = Ci();
    Object.defineProperty(s, "CollectorArray", { enumerable: true, get: function() {
      return e.CollectorArray;
    } });
    var i = Ai();
    Object.defineProperty(s, "CollectorLast", { enumerable: true, get: function() {
      return i.CollectorLast;
    } });
    var n = Si();
    Object.defineProperty(s, "CollectorUntil0", { enumerable: true, get: function() {
      return n.CollectorUntil0;
    } });
    var o = Pi();
    Object.defineProperty(s, "CollectorWhile0", { enumerable: true, get: function() {
      return o.CollectorWhile0;
    } });
    var r = Li();
    Object.defineProperty(s, "Signal", { enumerable: true, get: function() {
      return r.Signal;
    } });
    var a = Mi();
    Object.defineProperty(s, "SignalConnections", { enumerable: true, get: function() {
      return a.SignalConnections;
    } });
  }(zt)), zt;
}
var R = Ti();
var Di = {
  highest: Number.MIN_SAFE_INTEGER,
  higher: -1e3,
  high: -100,
  normal: 0,
  low: 100,
  lower: 1e3,
  lowest: Number.MAX_SAFE_INTEGER
};
var u = class extends R.Signal {
  // add a connectOnce method to the Signal class, that will connect a listener to the signal, and then remove it after the first time it is called
  connectOnce(t, e) {
    const i = (...o) => {
      t(...o), n.disconnect();
    }, n = this.connect(i, e);
    return n;
  }
  connectNTimes(t, e, i) {
    let n = 0;
    const o = (...a) => {
      t(...a), n++, n >= e && r.disconnect();
    }, r = this.connect(o, i);
    return r;
  }
  /**
   * Subscribe to this signal.
   *
   * @param callback This callback will be run when emit() is called.
   * @param order Handlers with a higher order value will be called later.
   */
  connect(t, e = "normal") {
    const i = Di[e] ?? e;
    return super.connect(t, i);
  }
};
var O = class {
  constructor(t = "Plugin") {
    this.id = t, this._signalConnections = new R.SignalConnections(), w(this), this.__dill_pixel_method_binding_root = true;
  }
  get app() {
    return v.getInstance();
  }
  destroy() {
    this._signalConnections.disconnectAll();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async initialize(t, e) {
    return Promise.resolve(void 0);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async postInitialize(t) {
    return Promise.resolve(void 0);
  }
  /**
   * Add signal connections to the container.
   * @param args - The signal connections to add.
   */
  addSignalConnection(...t) {
    for (const e of t)
      this._signalConnections.add(e);
  }
  clearSignalConnections() {
    this._signalConnections.disconnectAll();
  }
  /**
   * @override
   * @protected
   */
  registerCoreFunctions() {
    this.getCoreFunctions().forEach((e) => {
      const i = e;
      $t[i] = this[e];
    });
  }
  /**
   * @override
   * @protected
   */
  registerCoreSignals() {
    this.getCoreSignals().forEach((e) => {
      const i = e;
      Te[i] = this[e];
    });
  }
  getCoreFunctions() {
    return [];
  }
  getCoreSignals() {
    return [];
  }
};
var Fi = class extends O {
  constructor() {
    super(...arguments), this.id = "actions", this.onActionContextChanged = new u(), this._context = "default", this._signals = /* @__PURE__ */ new Map(), this._actions = {}, this._debug = false;
  }
  set debug(t) {
    this._debug = t;
  }
  get debug() {
    return this._debug;
  }
  // getter / setter
  get context() {
    return this._context;
  }
  set context(t) {
    this._context !== t && (this._context = t, this.onActionContextChanged.emit(t));
  }
  initialize(t) {
    var e;
    this._actions = (e = t == null ? void 0 : t.config) != null && e.actions ? t.config.actions || {} : {}, console.log("ActionsPlugin initialized");
  }
  getAction(t) {
    return this._signals.has(t) || this._signals.set(t, new u()), this._signals.get(t);
  }
  getActions() {
    return this._actions;
  }
  sendAction(t, e) {
    var i, n, o, r;
    if (!this._actions[t]) {
      this._debug && _.warn(`Action ${t} is not defined`);
      return;
    }
    if (((i = this._actions[t]) == null ? void 0 : i.context) === "*" || ((n = this._actions[t]) == null ? void 0 : n.context) === this.context || (r = (o = this._actions[t]) == null ? void 0 : o.context) != null && r.includes(this.context))
      return this.getAction(t).emit({ id: t, context: this.context, data: e });
    this._debug && _.warn(`Action ${t} is not allowed for context ${this.context}`);
  }
  setActionContext(t) {
    return this.context = t, this.context;
  }
  getCoreFunctions() {
    return ["getAction", "sendAction", "setActionContext", "getActions"];
  }
  getCoreSignals() {
    return ["onActionContextChanged"];
  }
};
var Mn = {
  default: "default",
  menu: "menu",
  pause: "pause",
  popup: "popup",
  game: "game"
};
var Oi = ["default", "menu", "pause", "popup", "game"];
var zi = [
  "up",
  "down",
  "left",
  "right",
  "action",
  "pause",
  "unpause",
  "start",
  "select",
  "menu",
  "back",
  "next"
];
var Bi = {
  action: { context: "*" },
  back: { context: ["menu", "default", "popup"] },
  next: { context: ["menu", "default", "popup"] },
  select: { context: ["menu", "default", "popup"] },
  menu: { context: ["default"] },
  down: { context: ["menu", "default", "popup"] },
  up: { context: ["menu", "default", "popup"] },
  left: { context: ["menu", "default", "popup"] },
  right: { context: "*" },
  pause: { context: "*" },
  unpause: { context: "*" },
  start: { context: "*" }
};
var Tn = {
  __default_do_not_use__: "__default_do_not_use__"
};
function Dn(s) {
  return s ?? Oi;
}
function Fn(s, t, e = true) {
  return e && (t = { ...Bi, ...t }), t;
}
function On(s) {
  return s || [];
}
var Ii = {
  preferWorkers: !W,
  crossOrigin: "anonymous"
};
function _e(s) {
  var t;
  if (typeof s == "string") {
    if (!(s != null && s.includes(".svg")))
      return s;
    s = { src: s };
  } else if (Array.isArray(s.src) || !((t = s.src) != null && t.includes(".svg")))
    return s;
  return s.data || (s.data = {}), s.data.parseAsGraphicsContext = true, s;
}
function q(s) {
  return Array.isArray(s) || (s = [s]), s.map((t) => {
    if (typeof t == "string")
      return _e(t);
    if (typeof t == "object") {
      let e = (t == null ? void 0 : t.src) || [];
      return Array.isArray(e) || (e = [e]), t.ext ? (t.src && !Array.isArray(t.src) && (e.push(t.src), t.src = [t.src]), t.src = t.src.map((i) => `${i}.${t.ext}`), t.alias = [...e, ...t.src].filter(Boolean)) : _e(t), t;
    }
  });
}
var Ri = class extends O {
  constructor() {
    super(...arguments), this.id = "assets", this.onLoadStart = new u(), this.onLoadProgress = new u(), this.onLoadComplete = new u(), this.onBackgroundLoadStart = new u(), this.onBackgroundAssetLoaded = new u(), this.onBackgroundBundlesLoaded = new u(), this._loadedBundles = /* @__PURE__ */ new Set(), this._loadedAssets = /* @__PURE__ */ new Set(), this._required = {}, this._background = {};
  }
  initialize(t, e) {
    e != null && e.preload && (this._required = e.preload), e != null && e.background && (this._background = e.background), Assets.setPreferences({ ...Ii, ...e == null ? void 0 : e.assetPreferences });
  }
  async loadRequired() {
    return this._handleLoadStart(), this._handleLoadProgress(0), this._required && (this._required.assets && await Assets.load(q(this._required.assets), this._handleLoadProgress), this._required.bundles && await Assets.loadBundle(this._required.bundles, this._handleLoadProgress)), this._handleLoadComplete(), Promise.resolve();
  }
  loadBackground() {
    this.onBackgroundLoadStart.emit(), this._background && (this._background.assets && q(this._background.assets).forEach((e) => {
      if (e != null && e.src) {
        const i = e.src;
        if (i)
          return Assets.backgroundLoad(i);
      }
      return Assets.backgroundLoad(e).then(() => {
        this.onBackgroundAssetLoaded.emit(e);
      });
    }), this._background.bundles && Assets.backgroundLoadBundle(this._background.bundles).then(() => {
      this.onBackgroundBundlesLoaded.emit();
    }));
  }
  async loadAssets(t) {
    return t = q(t), await Assets.load(t, this._handleLoadProgress), this._markAssetsLoaded(t), Promise.resolve();
  }
  async loadBundles(t) {
    return await Assets.loadBundle(t, this._handleLoadProgress), this._markBundlesLoaded(t), Promise.resolve();
  }
  async unloadSceneAssets(t) {
    var e, i, n, o;
    if ((i = (e = t.assets) == null ? void 0 : e.preload) != null && i.assets) {
      const r = q(t.assets.preload.assets);
      Assets.unload(r).then(() => {
        this._markAssetsUnloaded(r);
      });
    }
    if ((o = (n = t.assets) == null ? void 0 : n.preload) != null && o.bundles) {
      const r = t.assets.preload.bundles;
      Assets.unloadBundle(r).then(() => {
        this._markBundlesUnloaded(r);
      });
    }
    return Promise.resolve();
  }
  async loadSceneAssets(t, e = false) {
    var i, n, o, r, a;
    if (e) {
      if ((i = t.assets) != null && i.background) {
        if (t.assets.background.assets) {
          const c = q(t.assets.background.assets).filter((l) => !this._isAssetLoaded(l));
          c.length && c.forEach((l) => {
            if (l != null && l.src) {
              const d = l.src;
              if (d)
                return Assets.backgroundLoad(d);
            }
            return Assets.backgroundLoad(l);
          });
        }
        if (t.assets.background.bundles) {
          let h = Array.isArray(t.assets.background.bundles) ? t.assets.background.bundles : [t.assets.background.bundles];
          h = h.filter((c) => !this._isBundleLoaded(c)), h.length && Assets.backgroundLoadBundle(h);
        }
      }
    } else {
      if (this._handleLoadStart(), this._handleLoadProgress(0), (o = (n = t.assets) == null ? void 0 : n.preload) != null && o.assets) {
        const h = q(t.assets.preload.assets), c = h.filter((l) => !this._isAssetLoaded(l));
        c.length && (await Assets.load(c, this._handleLoadProgress), this._markAssetsLoaded(h));
      }
      if ((a = (r = t.assets) == null ? void 0 : r.preload) != null && a.bundles) {
        let h = Array.isArray(t.assets.preload.bundles) ? t.assets.preload.bundles : [t.assets.preload.bundles];
        h = h.filter((c) => !this._isBundleLoaded(c)), h.length && (_.log("loading bundles", h), await Assets.loadBundle(h, this._handleLoadProgress), this._markBundlesLoaded(h));
      }
      this._handleLoadComplete();
    }
  }
  getCoreFunctions() {
    return ["loadSceneAssets", "unloadSceneAssets", "loadAssets", "loadBundles", "loadRequired"];
  }
  getCoreSignals() {
    return [
      "onLoadStart",
      "onLoadProgress",
      "onLoadComplete",
      "onBackgroundLoadStart",
      "onBackgroundAssetLoaded",
      "onBackgroundBundlesLoaded"
    ];
  }
  _isAssetLoaded(t) {
    return this._loadedAssets.has(t);
  }
  _isBundleLoaded(t) {
    return this._loadedBundles.has(t);
  }
  _markAssetsLoaded(t) {
    t.forEach((e) => {
      this._loadedAssets.add(e);
    });
  }
  _markBundlesLoaded(t) {
    Array.isArray(t) || (t = [t]), t.forEach((e) => {
      this._loadedBundles.add(e);
    });
  }
  _markAssetsUnloaded(t) {
    Array.isArray(t) || (t = [t]), t.forEach((e) => {
      this._loadedAssets.delete(e);
    });
  }
  _markBundlesUnloaded(t) {
    Array.isArray(t) || (t = [t]), t.forEach((e) => {
      this._loadedBundles.delete(e);
    });
  }
  _handleLoadStart() {
    this.onLoadStart.emit();
  }
  _handleLoadProgress(t) {
    this.onLoadProgress.emit(t);
  }
  _handleLoadComplete() {
    this._handleLoadProgress(1), this.onLoadComplete.emit();
  }
};
var Ui = class {
  constructor(t, e) {
    this.name = t, this.manager = e, this._sounds = /* @__PURE__ */ new Map(), this._muted = false, this._volume = 1, this.muted = this.manager.muted;
  }
  get instances() {
    return Array.from(this._sounds.values());
  }
  get muted() {
    return this._muted;
  }
  set muted(t) {
    this._muted = t, this._setMuted();
  }
  get volume() {
    return this._volume;
  }
  set volume(t) {
    this._volume = t, this.updateVolume();
  }
  add(t, e) {
    return this._sounds.set(t, e), e;
  }
  get(t) {
    return this._sounds.get(t);
  }
  remove(t) {
    const e = this._sounds.get(t);
    return e && (e.destroy(), this._sounds.delete(t)), e;
  }
  _setMuted() {
    this._sounds.forEach((t) => {
      t.muted = this._muted;
    });
  }
  updateVolume() {
    this._sounds.forEach((t) => {
      t.updateVolume();
    }), this.manager.onChannelVolumeChanged.emit({ channel: this, volume: this._volume });
  }
  destroy() {
  }
};
var ge = class {
  constructor(t, e, i) {
    this.id = t, this.channel = e, this.manager = i, this.onStart = new u(), this.onStop = new u(), this.onEnd = new u(), this.onPaused = new u(), this.onResumed = new u(), this.onProgress = new u(), this._volume = 1, this._muted = false, this._isPlaying = false, w(this), this.muted = this.channel.muted;
  }
  get media() {
    return this._media;
  }
  set media(t) {
    this._media = t, t && (this._media.volume = this._volume * this.channel.volume * this.manager.masterVolume, this.muted && (this._media.muted = this.muted), this.addListeners());
  }
  get volume() {
    return this._volume;
  }
  set volume(t) {
    this._volume = t, this._media && (this._media.volume = this._volume * this.channel.volume * this.manager.masterVolume);
  }
  get muted() {
    return this._muted;
  }
  set muted(t) {
    this._muted = t, this._media && (this._media.muted = this._muted);
  }
  get isPlaying() {
    return this._isPlaying;
  }
  set isPlaying(t) {
    this._isPlaying = t;
  }
  pause() {
    this._isPlaying = false, this._media && (this._media.paused = true);
  }
  resume() {
    this._isPlaying = true, this._media && (this._media.paused = false);
  }
  remove() {
    this._isPlaying = false, this.channel.remove(this.id);
  }
  stop() {
    this._media && this._media.stop(), this._isPlaying = false, this.onEnd.emit(this);
  }
  updateVolume() {
    this.volume = this._volume;
  }
  addListeners() {
    this.removeListeners(), this._media.on("end", this._handleMediaEnded), this._media.on("start", this._handleMediaStarted), this._media.on("stop", this._handleMediaStopped), this._media.on("pause", this._handleMediaPaused), this._media.on("progress", this._handleMediaProgress), this._media.on("resumed", this._handleMediaResumed);
  }
  removeListeners() {
    this.media && (this._media.off("end", this._handleMediaEnded), this._media.off("start", this._handleMediaStarted), this._media.off("stop", this._handleMediaStopped), this._media.off("pause", this._handleMediaPaused), this._media.off("progress", this._handleMediaProgress), this._media.off("resumed", this._handleMediaResumed));
  }
  destroy() {
    this.stop(), this.removeListeners();
  }
  fadeTo(t, e) {
    return gsapWithCSS.to(this.media, { volume: t, duration: e });
  }
  play(t) {
    this._isPlaying = true, t ? this.media.play({ start: t }) : this.media.play({});
  }
  _handleMediaEnded() {
    this._isPlaying = false, this.onEnd.emit(this);
  }
  _handleMediaStarted() {
    this._isPlaying = true, this.onStart.emit(this);
  }
  _handleMediaStopped() {
    this._isPlaying = false, this.onStop.emit(this);
  }
  _handleMediaPaused() {
    this._isPlaying = false, this.onPaused.emit(this);
  }
  _handleMediaProgress() {
    this.onProgress.emit(this);
  }
  _handleMediaResumed() {
    this._isPlaying = true, this.onResumed.emit(this);
  }
};
var Fe;
function $i(s) {
  return Fe = s, s;
}
function pt() {
  return Fe;
}
var Wt = class {
  /**
   * Dezippering is removed in the future Web Audio API, instead
   * we use the `setValueAtTime` method, however, this is not available
   * in all environments (e.g., Android webview), so we fallback to the `value` setter.
   * @param param - AudioNode parameter object
   * @param value - Value to set
   * @return The value set
   */
  static setParamValue(t, e) {
    if (t.setValueAtTime) {
      const i = pt().context;
      t.setValueAtTime(e, i.audioContext.currentTime);
    } else
      t.value = e;
    return e;
  }
};
var Wi = class extends eventemitter3_default {
  constructor() {
    super(...arguments), this.speed = 1, this.muted = false, this.volume = 1, this.paused = false;
  }
  /** Internal trigger when volume, mute or speed changes */
  refresh() {
    this.emit("refresh");
  }
  /** Internal trigger paused changes */
  refreshPaused() {
    this.emit("refreshPaused");
  }
  /**
   * HTML Audio does not support filters, this is non-functional API.
   */
  get filters() {
    return console.warn("HTML Audio does not support filters"), null;
  }
  set filters(t) {
    console.warn("HTML Audio does not support filters");
  }
  /**
   * HTML Audio does not support `audioContext`
   * @readonly
   * @type {AudioContext}
   */
  get audioContext() {
    return console.warn("HTML Audio does not support audioContext"), null;
  }
  /**
   * Toggles the muted state.
   * @return The current muted state.
   */
  toggleMute() {
    return this.muted = !this.muted, this.refresh(), this.muted;
  }
  /**
   * Toggles the paused state.
   * @return The current paused state.
   */
  togglePause() {
    return this.paused = !this.paused, this.refreshPaused(), this.paused;
  }
  /** Destroy and don't use after this */
  destroy() {
    this.removeAllListeners();
  }
};
var Ki = 0;
var Kt = class extends eventemitter3_default {
  /** @param parent - Parent element */
  constructor(s) {
    super(), this.id = Ki++, this.init(s);
  }
  /**
   * Set a property by name, this makes it easy to chain values
   * @param name - Name of the property to set
   * @param value - Value to set property to
   */
  set(s, t) {
    if (this[s] === void 0)
      throw new Error(`Property with name ${s} does not exist.`);
    switch (s) {
      case "speed":
        this.speed = t;
        break;
      case "volume":
        this.volume = t;
        break;
      case "paused":
        this.paused = t;
        break;
      case "loop":
        this.loop = t;
        break;
      case "muted":
        this.muted = t;
        break;
    }
    return this;
  }
  /** The current playback progress from 0 to 1. */
  get progress() {
    const { currentTime: s } = this._source;
    return s / this._duration;
  }
  /** Pauses the sound. */
  get paused() {
    return this._paused;
  }
  set paused(s) {
    this._paused = s, this.refreshPaused();
  }
  /**
   * Reference: http://stackoverflow.com/a/40370077
   * @private
   */
  _onPlay() {
    this._playing = true;
  }
  /**
   * Reference: http://stackoverflow.com/a/40370077
   * @private
   */
  _onPause() {
    this._playing = false;
  }
  /**
   * Initialize the instance.
   * @param {htmlaudio.HTMLAudioMedia} media - Same as constructor
   */
  init(s) {
    this._playing = false, this._duration = s.source.duration;
    const t = this._source = s.source.cloneNode(false);
    t.src = s.parent.url, t.onplay = this._onPlay.bind(this), t.onpause = this._onPause.bind(this), s.context.on("refresh", this.refresh, this), s.context.on("refreshPaused", this.refreshPaused, this), this._media = s;
  }
  /**
   * Stop the sound playing
   * @private
   */
  _internalStop() {
    this._source && this._playing && (this._source.onended = null, this._source.pause());
  }
  /** Stop the sound playing */
  stop() {
    this._internalStop(), this._source && this.emit("stop");
  }
  /** Set the instance speed from 0 to 1 */
  get speed() {
    return this._speed;
  }
  set speed(s) {
    this._speed = s, this.refresh();
  }
  /** Get the set the volume for this instance from 0 to 1 */
  get volume() {
    return this._volume;
  }
  set volume(s) {
    this._volume = s, this.refresh();
  }
  /** If the sound instance should loop playback */
  get loop() {
    return this._loop;
  }
  set loop(s) {
    this._loop = s, this.refresh();
  }
  /** `true` if the sound is muted */
  get muted() {
    return this._muted;
  }
  set muted(s) {
    this._muted = s, this.refresh();
  }
  /**
   * HTML Audio does not support filters, this is non-functional API.
   */
  get filters() {
    return console.warn("HTML Audio does not support filters"), null;
  }
  set filters(s) {
    console.warn("HTML Audio does not support filters");
  }
  /** Call whenever the loop, speed or volume changes */
  refresh() {
    const s = this._media.context, t = this._media.parent;
    this._source.loop = this._loop || t.loop;
    const e = s.volume * (s.muted ? 0 : 1), i = t.volume * (t.muted ? 0 : 1), n = this._volume * (this._muted ? 0 : 1);
    this._source.volume = n * e * i, this._source.playbackRate = this._speed * s.speed * t.speed;
  }
  /** Handle changes in paused state, either globally or sound or instance */
  refreshPaused() {
    const s = this._media.context, t = this._media.parent, e = this._paused || t.paused || s.paused;
    e !== this._pausedReal && (this._pausedReal = e, e ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({
      start: this._source.currentTime,
      end: this._end,
      volume: this._volume,
      speed: this._speed,
      loop: this._loop
    })), this.emit("pause", e));
  }
  /** Start playing the sound/ */
  play(s) {
    const { start: t, end: e, speed: i, loop: n, volume: o, muted: r } = s;
    e && console.assert(e > t, "End time is before start time"), this._speed = i, this._volume = o, this._loop = !!n, this._muted = r, this.refresh(), this.loop && e !== null && (console.warn('Looping not support when specifying an "end" time'), this.loop = false), this._start = t, this._end = e || this._duration, this._start = Math.max(0, this._start - Kt.PADDING), this._end = Math.min(this._end + Kt.PADDING, this._duration), this._source.onloadedmetadata = () => {
      this._source && (this._source.currentTime = t, this._source.onloadedmetadata = null, this.emit("progress", t / this._duration, this._duration), Ticker.shared.add(this._onUpdate, this));
    }, this._source.onended = this._onComplete.bind(this), this._source.play(), this.emit("start");
  }
  /**
   * Handle time update on sound.
   * @private
   */
  _onUpdate() {
    this.emit("progress", this.progress, this._duration), this._source.currentTime >= this._end && !this._source.loop && this._onComplete();
  }
  /**
   * Callback when completed.
   * @private
   */
  _onComplete() {
    Ticker.shared.remove(this._onUpdate, this), this._internalStop(), this.emit("progress", 1, this._duration), this.emit("end", this);
  }
  /** Don't use after this. */
  destroy() {
    Ticker.shared.remove(this._onUpdate, this), this.removeAllListeners();
    const s = this._source;
    s && (s.onended = null, s.onplay = null, s.onpause = null, this._internalStop()), this._source = null, this._speed = 1, this._volume = 1, this._loop = false, this._end = null, this._start = 0, this._duration = 0, this._playing = false, this._pausedReal = false, this._paused = false, this._muted = false, this._media && (this._media.context.off("refresh", this.refresh, this), this._media.context.off("refreshPaused", this.refreshPaused, this), this._media = null);
  }
  /**
   * To string method for instance.
   * @return The string representation of instance.
   */
  toString() {
    return `[HTMLAudioInstance id=${this.id}]`;
  }
};
var Oe = Kt;
Oe.PADDING = 0.1;
var ji = class extends eventemitter3_default {
  init(t) {
    this.parent = t, this._source = t.options.source || new Audio(), t.url && (this._source.src = t.url);
  }
  // Implement create
  create() {
    return new Oe(this);
  }
  /**
   * If the audio media is playable (ready).
   * @readonly
   */
  get isPlayable() {
    return !!this._source && this._source.readyState === 4;
  }
  /**
   * THe duration of the media in seconds.
   * @readonly
   */
  get duration() {
    return this._source.duration;
  }
  /**
   * Reference to the context.
   * @readonly
   */
  get context() {
    return this.parent.context;
  }
  /** The collection of filters, does not apply to HTML Audio. */
  get filters() {
    return null;
  }
  set filters(t) {
    console.warn("HTML Audio does not support filters");
  }
  // Override the destroy
  destroy() {
    this.removeAllListeners(), this.parent = null, this._source && (this._source.src = "", this._source.load(), this._source = null);
  }
  /**
   * Get the audio source element.
   * @type {HTMLAudioElement}
   * @readonly
   */
  get source() {
    return this._source;
  }
  // Implement the method to being preloading
  load(t) {
    const e = this._source, i = this.parent;
    if (e.readyState === 4) {
      i.isLoaded = true;
      const h = i.autoPlayStart();
      t && setTimeout(() => {
        t(null, i, h);
      }, 0);
      return;
    }
    if (!i.url) {
      t(new Error("sound.url or sound.source must be set"));
      return;
    }
    e.src = i.url;
    const n = () => {
      a(), i.isLoaded = true;
      const h = i.autoPlayStart();
      t && t(null, i, h);
    }, o = () => {
      a(), t && t(new Error("Sound loading has been aborted"));
    }, r = () => {
      a();
      const h = `Failed to load audio element (code: ${e.error.code})`;
      t ? t(new Error(h)) : console.error(h);
    }, a = () => {
      e.removeEventListener("canplaythrough", n), e.removeEventListener("load", n), e.removeEventListener("abort", o), e.removeEventListener("error", r);
    };
    e.addEventListener("canplaythrough", n, false), e.addEventListener("load", n, false), e.addEventListener("abort", o, false), e.addEventListener("error", r, false), e.load();
  }
};
var Hi = class {
  /**
   * @param parent - The parent sound
   * @param options - Data associated with object.
   */
  constructor(t, e) {
    this.parent = t, Object.assign(this, e), this.duration = this.end - this.start, console.assert(this.duration > 0, "End time must be after start time");
  }
  /**
   * Play the sound sprite.
   * @param {Function} [complete] - Function call when complete
   * @return Sound instance being played.
   */
  play(t) {
    return this.parent.play({
      complete: t,
      speed: this.speed || this.parent.speed,
      end: this.end,
      start: this.start,
      loop: this.loop
    });
  }
  /** Destroy and don't use after this */
  destroy() {
    this.parent = null;
  }
};
var St = [
  "ogg",
  "oga",
  "opus",
  "m4a",
  "mp3",
  "mpeg",
  "wav",
  "aiff",
  "wma",
  "mid",
  "caf"
];
var Gi = [
  "audio/mpeg",
  "audio/ogg"
];
var Pt = {};
function Vi(s) {
  const t = {
    m4a: "audio/mp4",
    oga: "audio/ogg",
    opus: 'audio/ogg; codecs="opus"',
    caf: 'audio/x-caf; codecs="opus"'
  }, e = document.createElement("audio"), i = {}, n = /^no$/;
  St.forEach((o) => {
    const r = e.canPlayType(`audio/${o}`).replace(n, ""), a = t[o] ? e.canPlayType(t[o]).replace(n, "") : "";
    i[o] = !!r || !!a;
  }), Object.assign(Pt, i);
}
Vi();
var Xi = 0;
var qi = class extends eventemitter3_default {
  constructor(t) {
    super(), this.id = Xi++, this._media = null, this._paused = false, this._muted = false, this._elapsed = 0, this.init(t);
  }
  /**
   * Set a property by name, this makes it easy to chain values
   * @param name - Name of the property to set.
   * @param value - Value to set property to.
   */
  set(t, e) {
    if (this[t] === void 0)
      throw new Error(`Property with name ${t} does not exist.`);
    switch (t) {
      case "speed":
        this.speed = e;
        break;
      case "volume":
        this.volume = e;
        break;
      case "muted":
        this.muted = e;
        break;
      case "loop":
        this.loop = e;
        break;
      case "paused":
        this.paused = e;
        break;
    }
    return this;
  }
  /** Stops the instance, don't use after this. */
  stop() {
    this._source && (this._internalStop(), this.emit("stop"));
  }
  /** Set the instance speed from 0 to 1 */
  get speed() {
    return this._speed;
  }
  set speed(t) {
    this._speed = t, this.refresh(), this._update(true);
  }
  /** Get the set the volume for this instance from 0 to 1 */
  get volume() {
    return this._volume;
  }
  set volume(t) {
    this._volume = t, this.refresh();
  }
  /** `true` if the sound is muted */
  get muted() {
    return this._muted;
  }
  set muted(t) {
    this._muted = t, this.refresh();
  }
  /** If the sound instance should loop playback */
  get loop() {
    return this._loop;
  }
  set loop(t) {
    this._loop = t, this.refresh();
  }
  /** The collection of filters. */
  get filters() {
    return this._filters;
  }
  set filters(t) {
    var e;
    this._filters && ((e = this._filters) == null || e.filter((i) => i).forEach((i) => i.disconnect()), this._filters = null, this._source.connect(this._gain)), this._filters = t != null && t.length ? t.slice(0) : null, this.refresh();
  }
  /** Refresh loop, volume and speed based on changes to parent */
  refresh() {
    if (!this._source)
      return;
    const t = this._media.context, e = this._media.parent;
    this._source.loop = this._loop || e.loop;
    const i = t.volume * (t.muted ? 0 : 1), n = e.volume * (e.muted ? 0 : 1), o = this._volume * (this._muted ? 0 : 1);
    Wt.setParamValue(this._gain.gain, o * n * i), Wt.setParamValue(this._source.playbackRate, this._speed * e.speed * t.speed), this.applyFilters();
  }
  /** Connect filters nodes to audio context */
  applyFilters() {
    var t;
    if ((t = this._filters) != null && t.length) {
      this._source.disconnect();
      let e = this._source;
      this._filters.forEach((i) => {
        e.connect(i.destination), e = i;
      }), e.connect(this._gain);
    }
  }
  /** Handle changes in paused state, either globally or sound or instance */
  refreshPaused() {
    const t = this._media.context, e = this._media.parent, i = this._paused || e.paused || t.paused;
    i !== this._pausedReal && (this._pausedReal = i, i ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({
      start: this._elapsed % this._duration,
      end: this._end,
      speed: this._speed,
      loop: this._loop,
      volume: this._volume
    })), this.emit("pause", i));
  }
  /**
   * Plays the sound.
   * @param options - Play options.
   */
  play(t) {
    const { start: e, end: i, speed: n, loop: o, volume: r, muted: a, filters: h } = t;
    i && console.assert(i > e, "End time is before start time"), this._paused = false;
    const { source: c, gain: l } = this._media.nodes.cloneBufferSource();
    this._source = c, this._gain = l, this._speed = n, this._volume = r, this._loop = !!o, this._muted = a, this._filters = h, this.refresh();
    const d = this._source.buffer.duration;
    this._duration = d, this._end = i, this._lastUpdate = this._now(), this._elapsed = e, this._source.onended = this._onComplete.bind(this), this._loop ? (this._source.loopEnd = i, this._source.loopStart = e, this._source.start(0, e)) : i ? this._source.start(0, e, i - e) : this._source.start(0, e), this.emit("start"), this._update(true), this.enableTicker(true);
  }
  /** Start the update progress. */
  enableTicker(t) {
    Ticker.shared.remove(this._updateListener, this), t && Ticker.shared.add(this._updateListener, this);
  }
  /** The current playback progress from 0 to 1. */
  get progress() {
    return this._progress;
  }
  /** Pauses the sound. */
  get paused() {
    return this._paused;
  }
  set paused(t) {
    this._paused = t, this.refreshPaused();
  }
  /** Don't use after this. */
  destroy() {
    var t;
    this.removeAllListeners(), this._internalStop(), this._gain && (this._gain.disconnect(), this._gain = null), this._media && (this._media.context.events.off("refresh", this.refresh, this), this._media.context.events.off("refreshPaused", this.refreshPaused, this), this._media = null), (t = this._filters) == null || t.forEach((e) => e.disconnect()), this._filters = null, this._end = null, this._speed = 1, this._volume = 1, this._loop = false, this._elapsed = 0, this._duration = 0, this._paused = false, this._muted = false, this._pausedReal = false;
  }
  /**
   * To string method for instance.
   * @return The string representation of instance.
   */
  toString() {
    return `[WebAudioInstance id=${this.id}]`;
  }
  /**
   * Get the current time in seconds.
   * @return Seconds since start of context
   */
  _now() {
    return this._media.context.audioContext.currentTime;
  }
  /** Callback for update listener */
  _updateListener() {
    this._update();
  }
  /** Internal update the progress. */
  _update(t = false) {
    if (this._source) {
      const e = this._now(), i = e - this._lastUpdate;
      if (i > 0 || t) {
        const n = this._source.playbackRate.value;
        this._elapsed += i * n, this._lastUpdate = e;
        const o = this._duration;
        let r;
        if (this._source.loopStart) {
          const a = this._source.loopEnd - this._source.loopStart;
          r = (this._source.loopStart + this._elapsed % a) / o;
        } else
          r = this._elapsed % o / o;
        this._progress = r, this.emit("progress", this._progress, o);
      }
    }
  }
  /** Initializes the instance. */
  init(t) {
    this._media = t, t.context.events.on("refresh", this.refresh, this), t.context.events.on("refreshPaused", this.refreshPaused, this);
  }
  /** Stops the instance. */
  _internalStop() {
    if (this._source) {
      this.enableTicker(false), this._source.onended = null, this._source.stop(0), this._source.disconnect();
      try {
        this._source.buffer = null;
      } catch (t) {
        console.warn("Failed to set AudioBufferSourceNode.buffer to null:", t);
      }
      this._source = null;
    }
  }
  /** Callback when completed. */
  _onComplete() {
    if (this._source) {
      this.enableTicker(false), this._source.onended = null, this._source.disconnect();
      try {
        this._source.buffer = null;
      } catch (t) {
        console.warn("Failed to set AudioBufferSourceNode.buffer to null:", t);
      }
    }
    this._source = null, this._progress = 1, this.emit("progress", 1, this._duration), this.emit("end", this);
  }
};
var ze = class {
  /**
   * @param input - The source audio node
   * @param output - The output audio node
   */
  constructor(t, e) {
    this._output = e, this._input = t;
  }
  /** The destination output audio node */
  get destination() {
    return this._input;
  }
  /** The collection of filters. */
  get filters() {
    return this._filters;
  }
  set filters(t) {
    if (this._filters && (this._filters.forEach((e) => {
      e && e.disconnect();
    }), this._filters = null, this._input.connect(this._output)), t && t.length) {
      this._filters = t.slice(0), this._input.disconnect();
      let e = null;
      t.forEach((i) => {
        e === null ? this._input.connect(i.destination) : e.connect(i.destination), e = i;
      }), e.connect(this._output);
    }
  }
  /** Cleans up. */
  destroy() {
    this.filters = null, this._input = null, this._output = null;
  }
};
var Be = class extends ze {
  /**
   * @param context - The audio context.
   */
  constructor(s) {
    const t = s.audioContext, e = t.createBufferSource(), i = t.createGain(), n = t.createAnalyser();
    e.connect(n), n.connect(i), i.connect(s.destination), super(n, i), this.context = s, this.bufferSource = e, this.gain = i, this.analyser = n;
  }
  /**
   * Get the script processor node.
   * @readonly
   */
  get script() {
    return this._script || (this._script = this.context.audioContext.createScriptProcessor(Be.BUFFER_SIZE), this._script.connect(this.context.destination)), this._script;
  }
  /** Cleans up. */
  destroy() {
    super.destroy(), this.bufferSource.disconnect(), this._script && this._script.disconnect(), this.gain.disconnect(), this.analyser.disconnect(), this.bufferSource = null, this._script = null, this.gain = null, this.analyser = null, this.context = null;
  }
  /**
   * Clones the bufferSource. Used just before playing a sound.
   * @returns {SourceClone} The clone AudioBufferSourceNode.
   */
  cloneBufferSource() {
    const s = this.bufferSource, t = this.context.audioContext.createBufferSource();
    t.buffer = s.buffer, Wt.setParamValue(t.playbackRate, s.playbackRate.value), t.loop = s.loop;
    const e = this.context.audioContext.createGain();
    return t.connect(e), e.connect(this.destination), { source: t, gain: e };
  }
  /**
   * Get buffer size of `ScriptProcessorNode`.
   * @readonly
   */
  get bufferSize() {
    return this.script.bufferSize;
  }
};
var Ie = Be;
Ie.BUFFER_SIZE = 0;
var Yi = class {
  /**
   * Re-initialize without constructing.
   * @param parent - - Instance of parent Sound container
   */
  init(t) {
    this.parent = t, this._nodes = new Ie(this.context), this._source = this._nodes.bufferSource, this.source = t.options.source;
  }
  /** Destructor, safer to use `SoundLibrary.remove(alias)` to remove this sound. */
  destroy() {
    this.parent = null, this._nodes.destroy(), this._nodes = null;
    try {
      this._source.buffer = null;
    } catch (t) {
      console.warn("Failed to set AudioBufferSourceNode.buffer to null:", t);
    }
    this._source = null, this.source = null;
  }
  // Implement create
  create() {
    return new qi(this);
  }
  // Implement context
  get context() {
    return this.parent.context;
  }
  // Implement isPlayable
  get isPlayable() {
    return !!this._source && !!this._source.buffer;
  }
  // Implement filters
  get filters() {
    return this._nodes.filters;
  }
  set filters(t) {
    this._nodes.filters = t;
  }
  // Implements duration
  get duration() {
    return console.assert(this.isPlayable, "Sound not yet playable, no duration"), this._source.buffer.duration;
  }
  /** Gets and sets the buffer. */
  get buffer() {
    return this._source.buffer;
  }
  set buffer(t) {
    this._source.buffer = t;
  }
  /** Get the current chained nodes object */
  get nodes() {
    return this._nodes;
  }
  // Implements load
  load(t) {
    this.source ? this._decode(this.source, t) : this.parent.url ? this._loadUrl(t) : t ? t(new Error("sound.url or sound.source must be set")) : console.error("sound.url or sound.source must be set");
  }
  /** Loads a sound using XHMLHttpRequest object. */
  async _loadUrl(t) {
    const e = this.parent.url, i = await DOMAdapter.get().fetch(e);
    this._decode(await i.arrayBuffer(), t);
  }
  /**
   * Decodes the array buffer.
   * @param arrayBuffer - From load.
   * @param {Function} callback - Callback optional
   */
  _decode(t, e) {
    const i = (n, o) => {
      if (n)
        e && e(n);
      else {
        this.parent.isLoaded = true, this.buffer = o;
        const r = this.parent.autoPlayStart();
        e && e(null, this.parent, r);
      }
    };
    t instanceof AudioBuffer ? i(null, t) : this.parent.context.decode(t, i);
  }
};
var N = class {
  /**
   * Create a new sound instance from source.
   * @param source - Either the path or url to the source file.
   *        or the object of options to use.
   * @return Created sound instance.
   */
  static from(s) {
    let t = {};
    typeof s == "string" ? t.url = s : s instanceof ArrayBuffer || s instanceof AudioBuffer || s instanceof HTMLAudioElement ? t.source = s : Array.isArray(s) ? t.url = s : t = s, t = {
      autoPlay: false,
      singleInstance: false,
      url: null,
      source: null,
      preload: false,
      volume: 1,
      speed: 1,
      complete: null,
      loaded: null,
      loop: false,
      ...t
    }, Object.freeze(t);
    const e = pt().useLegacy ? new ji() : new Yi();
    return new N(e, t);
  }
  /**
   * Use `Sound.from`
   * @ignore
   */
  constructor(s, t) {
    this.media = s, this.options = t, this._instances = [], this._sprites = {}, this.media.init(this);
    const e = t.complete;
    this._autoPlayOptions = e ? { complete: e } : null, this.isLoaded = false, this._preloadQueue = null, this.isPlaying = false, this.autoPlay = t.autoPlay, this.singleInstance = t.singleInstance, this.preload = t.preload || this.autoPlay, this.url = Array.isArray(t.url) ? this.preferUrl(t.url) : t.url, this.speed = t.speed, this.volume = t.volume, this.loop = t.loop, t.sprites && this.addSprites(t.sprites), this.preload && this._preload(t.loaded);
  }
  /**
   * Internal help for resolving which file to use if there are multiple provide
   * this is especially helpful for working with bundlers (non Assets loading).
   */
  preferUrl(s) {
    const [t] = s.map((e) => ({ url: e, ext: path.extname(e).slice(1) })).filter(({ ext: e }) => Pt[e]).sort((e, i) => St.indexOf(e.ext) - St.indexOf(i.ext));
    if (!t)
      throw new Error("No supported file type found");
    return t.url;
  }
  /** Instance of the media context. */
  get context() {
    return pt().context;
  }
  /** Stops all the instances of this sound from playing. */
  pause() {
    return this.isPlaying = false, this.paused = true, this;
  }
  /** Resuming all the instances of this sound from playing */
  resume() {
    return this.isPlaying = this._instances.length > 0, this.paused = false, this;
  }
  /** Stops all the instances of this sound from playing. */
  get paused() {
    return this._paused;
  }
  set paused(s) {
    this._paused = s, this.refreshPaused();
  }
  /** The playback rate. */
  get speed() {
    return this._speed;
  }
  set speed(s) {
    this._speed = s, this.refresh();
  }
  /** Set the filters. Only supported with WebAudio. */
  get filters() {
    return this.media.filters;
  }
  set filters(s) {
    this.media.filters = s;
  }
  /**
   * @ignore
   */
  addSprites(s, t) {
    if (typeof s == "object") {
      const i = {};
      for (const n in s)
        i[n] = this.addSprites(n, s[n]);
      return i;
    }
    console.assert(!this._sprites[s], `Alias ${s} is already taken`);
    const e = new Hi(this, t);
    return this._sprites[s] = e, e;
  }
  /** Destructor, safer to use `SoundLibrary.remove(alias)` to remove this sound. */
  destroy() {
    this._removeInstances(), this.removeSprites(), this.media.destroy(), this.media = null, this._sprites = null, this._instances = null;
  }
  /**
   * Remove a sound sprite.
   * @param alias - The unique name of the sound sprite, if alias is omitted, removes all sprites.
   */
  removeSprites(s) {
    if (s) {
      const t = this._sprites[s];
      t !== void 0 && (t.destroy(), delete this._sprites[s]);
    } else
      for (const t in this._sprites)
        this.removeSprites(t);
    return this;
  }
  /** If the current sound is playable (loaded). */
  get isPlayable() {
    return this.isLoaded && this.media && this.media.isPlayable;
  }
  /** Stops all the instances of this sound from playing. */
  stop() {
    if (!this.isPlayable)
      return this.autoPlay = false, this._autoPlayOptions = null, this;
    this.isPlaying = false;
    for (let s = this._instances.length - 1; s >= 0; s--)
      this._instances[s].stop();
    return this;
  }
  // Overloaded function
  play(s, t) {
    let e;
    if (typeof s == "string" ? e = { sprite: s, loop: this.loop, complete: t } : typeof s == "function" ? (e = {}, e.complete = s) : e = s, e = {
      complete: null,
      loaded: null,
      sprite: null,
      end: null,
      start: 0,
      volume: 1,
      speed: 1,
      muted: false,
      loop: false,
      ...e || {}
    }, e.sprite) {
      const n = e.sprite;
      console.assert(!!this._sprites[n], `Alias ${n} is not available`);
      const o = this._sprites[n];
      e.start = o.start + (e.start || 0), e.end = o.end, e.speed = o.speed || 1, e.loop = o.loop || e.loop, delete e.sprite;
    }
    if (e.offset && (e.start = e.offset), !this.isLoaded)
      return this._preloadQueue ? new Promise((n) => {
        this._preloadQueue.push(() => {
          n(this.play(e));
        });
      }) : (this._preloadQueue = [], this.autoPlay = true, this._autoPlayOptions = e, new Promise((n, o) => {
        this._preload((r, a, h) => {
          this._preloadQueue.forEach((c) => c()), this._preloadQueue = null, r ? o(r) : (e.loaded && e.loaded(r, a, h), n(h));
        });
      }));
    (this.singleInstance || e.singleInstance) && this._removeInstances();
    const i = this._createInstance();
    return this._instances.push(i), this.isPlaying = true, i.once("end", () => {
      e.complete && e.complete(this), this._onComplete(i);
    }), i.once("stop", () => {
      this._onComplete(i);
    }), i.play(e), i;
  }
  /** Internal only, speed, loop, volume change occured. */
  refresh() {
    const s = this._instances.length;
    for (let t = 0; t < s; t++)
      this._instances[t].refresh();
  }
  /** Handle changes in paused state. Internal only. */
  refreshPaused() {
    const s = this._instances.length;
    for (let t = 0; t < s; t++)
      this._instances[t].refreshPaused();
  }
  /** Gets and sets the volume. */
  get volume() {
    return this._volume;
  }
  set volume(s) {
    this._volume = s, this.refresh();
  }
  /** Gets and sets the muted flag. */
  get muted() {
    return this._muted;
  }
  set muted(s) {
    this._muted = s, this.refresh();
  }
  /** Gets and sets the looping. */
  get loop() {
    return this._loop;
  }
  set loop(s) {
    this._loop = s, this.refresh();
  }
  /** Starts the preloading of sound. */
  _preload(s) {
    this.media.load(s);
  }
  /** Gets the list of instances that are currently being played of this sound. */
  get instances() {
    return this._instances;
  }
  /** Get the map of sprites. */
  get sprites() {
    return this._sprites;
  }
  /** Get the duration of the audio in seconds. */
  get duration() {
    return this.media.duration;
  }
  /** Auto play the first instance. */
  autoPlayStart() {
    let s;
    return this.autoPlay && (s = this.play(this._autoPlayOptions)), s;
  }
  /** Removes all instances. */
  _removeInstances() {
    for (let s = this._instances.length - 1; s >= 0; s--)
      this._poolInstance(this._instances[s]);
    this._instances.length = 0;
  }
  /**
   * Sound instance completed.
   * @param instance
   */
  _onComplete(s) {
    if (this._instances) {
      const t = this._instances.indexOf(s);
      t > -1 && this._instances.splice(t, 1), this.isPlaying = this._instances.length > 0;
    }
    this._poolInstance(s);
  }
  /** Create a new instance. */
  _createInstance() {
    if (N._pool.length > 0) {
      const s = N._pool.pop();
      return s.init(this.media), s;
    }
    return this.media.create();
  }
  /**
   * Destroy/recycling the instance object.
   * @param instance - Instance to recycle
   */
  _poolInstance(s) {
    s.destroy(), N._pool.indexOf(s) < 0 && N._pool.push(s);
  }
};
var kt = N;
kt._pool = [];
var _t = class __t extends ze {
  constructor() {
    const t = window, e = new __t.AudioContext(), i = e.createDynamicsCompressor(), n = e.createAnalyser();
    n.connect(i), i.connect(e.destination), super(n, i), this.autoPause = true, this._ctx = e, this._offlineCtx = new __t.OfflineAudioContext(
      1,
      2,
      t.OfflineAudioContext ? Math.max(8e3, Math.min(96e3, e.sampleRate)) : 44100
    ), this.compressor = i, this.analyser = n, this.events = new eventemitter3_default(), this.volume = 1, this.speed = 1, this.muted = false, this.paused = false, this._locked = e.state === "suspended" && ("ontouchstart" in globalThis || "onclick" in globalThis), this._locked && (this._unlock(), this._unlock = this._unlock.bind(this), document.addEventListener("mousedown", this._unlock, true), document.addEventListener("touchstart", this._unlock, true), document.addEventListener("touchend", this._unlock, true)), this.onFocus = this.onFocus.bind(this), this.onBlur = this.onBlur.bind(this), globalThis.addEventListener("focus", this.onFocus), globalThis.addEventListener("blur", this.onBlur);
  }
  /** Handle mobile WebAudio context resume */
  onFocus() {
    if (!this.autoPause)
      return;
    const t = this._ctx.state;
    (t === "suspended" || t === "interrupted" || !this._locked) && (this.paused = this._pausedOnBlur, this.refreshPaused());
  }
  /** Handle mobile WebAudio context suspend */
  onBlur() {
    this.autoPause && (this._locked || (this._pausedOnBlur = this._paused, this.paused = true, this.refreshPaused()));
  }
  /**
   * Try to unlock audio on iOS. This is triggered from either WebAudio plugin setup (which will work if inside of
   * a `mousedown` or `touchend` event stack), or the first document touchend/mousedown event. If it fails (touchend
   * will fail if the user presses for too long, indicating a scroll event instead of a click event.
   *
   * Note that earlier versions of iOS supported `touchstart` for this, but iOS9 removed this functionality. Adding
   * a `touchstart` event to support older platforms may preclude a `mousedown` even from getting fired on iOS9, so we
   * stick with `mousedown` and `touchend`.
   */
  _unlock() {
    this._locked && (this.playEmptySound(), this._ctx.state === "running" && (document.removeEventListener("mousedown", this._unlock, true), document.removeEventListener("touchend", this._unlock, true), document.removeEventListener("touchstart", this._unlock, true), this._locked = false));
  }
  /**
   * Plays an empty sound in the web audio context.  This is used to enable web audio on iOS devices, as they
   * require the first sound to be played inside of a user initiated event (touch/click).
   */
  playEmptySound() {
    const t = this._ctx.createBufferSource();
    t.buffer = this._ctx.createBuffer(1, 1, 22050), t.connect(this._ctx.destination), t.start(0, 0, 0), t.context.state === "suspended" && t.context.resume();
  }
  /**
   * Get AudioContext class, if not supported returns `null`
   * @type {AudioContext}
   * @readonly
   */
  static get AudioContext() {
    const t = window;
    return t.AudioContext || t.webkitAudioContext || null;
  }
  /**
   * Get OfflineAudioContext class, if not supported returns `null`
   * @type {OfflineAudioContext}
   * @readonly
   */
  static get OfflineAudioContext() {
    const t = window;
    return t.OfflineAudioContext || t.webkitOfflineAudioContext || null;
  }
  /** Destroy this context. */
  destroy() {
    super.destroy();
    const t = this._ctx;
    typeof t.close < "u" && t.close(), globalThis.removeEventListener("focus", this.onFocus), globalThis.removeEventListener("blur", this.onBlur), this.events.removeAllListeners(), this.analyser.disconnect(), this.compressor.disconnect(), this.analyser = null, this.compressor = null, this.events = null, this._offlineCtx = null, this._ctx = null;
  }
  /**
   * The WebAudio API AudioContext object.
   * @readonly
   * @type {AudioContext}
   */
  get audioContext() {
    return this._ctx;
  }
  /**
   * The WebAudio API OfflineAudioContext object.
   * @readonly
   * @type {OfflineAudioContext}
   */
  get offlineContext() {
    return this._offlineCtx;
  }
  /**
   * Pauses all sounds, even though we handle this at the instance
   * level, we'll also pause the audioContext so that the
   * time used to compute progress isn't messed up.
   * @default false
   */
  set paused(t) {
    t && this._ctx.state === "running" ? this._ctx.suspend() : !t && this._ctx.state === "suspended" && this._ctx.resume(), this._paused = t;
  }
  get paused() {
    return this._paused;
  }
  /** Emit event when muted, volume or speed changes */
  refresh() {
    this.events.emit("refresh");
  }
  /** Emit event when muted, volume or speed changes */
  refreshPaused() {
    this.events.emit("refreshPaused");
  }
  /**
   * Toggles the muted state.
   * @return The current muted state.
   */
  toggleMute() {
    return this.muted = !this.muted, this.refresh(), this.muted;
  }
  /**
   * Toggles the paused state.
   * @return The current muted state.
   */
  togglePause() {
    return this.paused = !this.paused, this.refreshPaused(), this._paused;
  }
  /**
   * Decode the audio data
   * @param arrayBuffer - Buffer from loader
   * @param callback - When completed, error and audioBuffer are parameters.
   */
  decode(t, e) {
    const i = (o) => {
      e(new Error((o == null ? void 0 : o.message) || "Unable to decode file"));
    }, n = this._offlineCtx.decodeAudioData(
      t,
      (o) => {
        e(null, o);
      },
      i
    );
    n && n.catch(i);
  }
};
var Ni = class {
  constructor() {
    this.init();
  }
  /**
   * Re-initialize the sound library, this will
   * recreate the AudioContext. If there's a hardware-failure
   * call `close` and then `init`.
   * @return Sound instance
   */
  init() {
    return this.supported && (this._webAudioContext = new _t()), this._htmlAudioContext = new Wi(), this._sounds = {}, this.useLegacy = !this.supported, this;
  }
  /**
   * The global context to use.
   * @readonly
   */
  get context() {
    return this._context;
  }
  /**
   * Apply filters to all sounds. Can be useful
   * for setting global planning or global effects.
   * **Only supported with WebAudio.**
   * @example
   * import { sound, filters } from '@pixi/sound';
   * // Adds a filter to pan all output left
   * sound.filtersAll = [
   *     new filters.StereoFilter(-1)
   * ];
   */
  get filtersAll() {
    return this.useLegacy ? [] : this._context.filters;
  }
  set filtersAll(t) {
    this.useLegacy || (this._context.filters = t);
  }
  /**
   * `true` if WebAudio is supported on the current browser.
   */
  get supported() {
    return _t.AudioContext !== null;
  }
  /**
   * @ignore
   */
  add(t, e) {
    if (typeof t == "object") {
      const o = {};
      for (const r in t) {
        const a = this._getOptions(
          t[r],
          e
        );
        o[r] = this.add(r, a);
      }
      return o;
    }
    if (console.assert(!this._sounds[t], `Sound with alias ${t} already exists.`), e instanceof kt)
      return this._sounds[t] = e, e;
    const i = this._getOptions(e), n = kt.from(i);
    return this._sounds[t] = n, n;
  }
  /**
   * Internal methods for getting the options object
   * @private
   * @param source - The source options
   * @param overrides - Override default options
   * @return The construction options
   */
  _getOptions(t, e) {
    let i;
    return typeof t == "string" ? i = { url: t } : Array.isArray(t) ? i = { url: t } : t instanceof ArrayBuffer || t instanceof AudioBuffer || t instanceof HTMLAudioElement ? i = { source: t } : i = t, i = { ...i, ...e || {} }, i;
  }
  /**
   * Do not use WebAudio, force the use of legacy. This **must** be called before loading any files.
   */
  get useLegacy() {
    return this._useLegacy;
  }
  set useLegacy(t) {
    this._useLegacy = t, this._context = !t && this.supported ? this._webAudioContext : this._htmlAudioContext;
  }
  /**
   * This disables auto-pause all playback when the window blurs (WebAudio only).
   * This is helpful to keep from playing sounds when the user switches tabs.
   * However, if you're running content within an iframe, this may be undesirable
   * and you should disable (set to `true`) this behavior.
   * @default false
   */
  get disableAutoPause() {
    return !this._webAudioContext.autoPause;
  }
  set disableAutoPause(t) {
    this._webAudioContext.autoPause = !t;
  }
  /**
   * Removes a sound by alias.
   * @param alias - The sound alias reference.
   * @return Instance for chaining.
   */
  remove(t) {
    return this.exists(t, true), this._sounds[t].destroy(), delete this._sounds[t], this;
  }
  /**
   * Set the global volume for all sounds. To set per-sound volume see {@link SoundLibrary#volume}.
   */
  get volumeAll() {
    return this._context.volume;
  }
  set volumeAll(t) {
    this._context.volume = t, this._context.refresh();
  }
  /**
   * Set the global speed for all sounds. To set per-sound speed see {@link SoundLibrary#speed}.
   */
  get speedAll() {
    return this._context.speed;
  }
  set speedAll(t) {
    this._context.speed = t, this._context.refresh();
  }
  /**
   * Toggle paused property for all sounds.
   * @return `true` if all sounds are paused.
   */
  togglePauseAll() {
    return this._context.togglePause();
  }
  /**
   * Pauses any playing sounds.
   * @return Instance for chaining.
   */
  pauseAll() {
    return this._context.paused = true, this._context.refreshPaused(), this;
  }
  /**
   * Resumes any sounds.
   * @return Instance for chaining.
   */
  resumeAll() {
    return this._context.paused = false, this._context.refreshPaused(), this;
  }
  /**
   * Toggle muted property for all sounds.
   * @return `true` if all sounds are muted.
   */
  toggleMuteAll() {
    return this._context.toggleMute();
  }
  /**
   * Mutes all playing sounds.
   * @return Instance for chaining.
   */
  muteAll() {
    return this._context.muted = true, this._context.refresh(), this;
  }
  /**
   * Unmutes all playing sounds.
   * @return Instance for chaining.
   */
  unmuteAll() {
    return this._context.muted = false, this._context.refresh(), this;
  }
  /**
   * Stops and removes all sounds. They cannot be used after this.
   * @return Instance for chaining.
   */
  removeAll() {
    for (const t in this._sounds)
      this._sounds[t].destroy(), delete this._sounds[t];
    return this;
  }
  /**
   * Stops all sounds.
   * @return Instance for chaining.
   */
  stopAll() {
    for (const t in this._sounds)
      this._sounds[t].stop();
    return this;
  }
  /**
   * Checks if a sound by alias exists.
   * @param alias - Check for alias.
   * @param assert - Whether enable console.assert.
   * @return true if the sound exists.
   */
  exists(t, e = false) {
    const i = !!this._sounds[t];
    return e && console.assert(i, `No sound matching alias '${t}'.`), i;
  }
  /**
   * Convenience function to check to see if any sound is playing.
   * @returns `true` if any sound is currently playing.
   */
  isPlaying() {
    for (const t in this._sounds)
      if (this._sounds[t].isPlaying)
        return true;
    return false;
  }
  /**
   * Find a sound by alias.
   * @param alias - The sound alias reference.
   * @return Sound object.
   */
  find(t) {
    return this.exists(t, true), this._sounds[t];
  }
  /**
   * Plays a sound.
   * @method play
   * @instance
   * @param {string} alias - The sound alias reference.
   * @param {string} sprite - The alias of the sprite to play.
   * @return {IMediaInstance|null} The sound instance, this cannot be reused
   *         after it is done playing. Returns `null` if the sound has not yet loaded.
   */
  /**
   * Plays a sound.
   * @param alias - The sound alias reference.
   * @param {PlayOptions|Function} options - The options or callback when done.
   * @return The sound instance,
   *        this cannot be reused after it is done playing. Returns a Promise if the sound
   *        has not yet loaded.
   */
  play(t, e) {
    return this.find(t).play(e);
  }
  /**
   * Stops a sound.
   * @param alias - The sound alias reference.
   * @return Sound object.
   */
  stop(t) {
    return this.find(t).stop();
  }
  /**
   * Pauses a sound.
   * @param alias - The sound alias reference.
   * @return Sound object.
   */
  pause(t) {
    return this.find(t).pause();
  }
  /**
   * Resumes a sound.
   * @param alias - The sound alias reference.
   * @return Instance for chaining.
   */
  resume(t) {
    return this.find(t).resume();
  }
  /**
   * Get or set the volume for a sound.
   * @param alias - The sound alias reference.
   * @param volume - Optional current volume to set.
   * @return The current volume.
   */
  volume(t, e) {
    const i = this.find(t);
    return e !== void 0 && (i.volume = e), i.volume;
  }
  /**
   * Get or set the speed for a sound.
   * @param alias - The sound alias reference.
   * @param speed - Optional current speed to set.
   * @return The current speed.
   */
  speed(t, e) {
    const i = this.find(t);
    return e !== void 0 && (i.speed = e), i.speed;
  }
  /**
   * Get the length of a sound in seconds.
   * @param alias - The sound alias reference.
   * @return The current duration in seconds.
   */
  duration(t) {
    return this.find(t).duration;
  }
  /**
   * Closes the sound library. This will release/destroy
   * the AudioContext(s). Can be used safely if you want to
   * initialize the sound library later. Use `init` method.
   */
  close() {
    return this.removeAll(), this._sounds = null, this._webAudioContext && (this._webAudioContext.destroy(), this._webAudioContext = null), this._htmlAudioContext && (this._htmlAudioContext.destroy(), this._htmlAudioContext = null), this._context = null, this;
  }
};
var me = (s) => {
  var i;
  const t = s.src;
  let e = (i = s == null ? void 0 : s.alias) == null ? void 0 : i[0];
  return (!e || s.src === e) && (e = path.basename(t, path.extname(t))), e;
};
var Zi = {
  extension: ExtensionType.Asset,
  detection: {
    test: async () => true,
    add: async (s) => [...s, ...St.filter((t) => Pt[t])],
    remove: async (s) => s.filter((t) => s.includes(t))
  },
  loader: {
    name: "sound",
    extension: {
      type: [ExtensionType.LoadParser],
      priority: LoaderParserPriority.High
    },
    /** Should we attempt to load this file? */
    test(s) {
      const t = path.extname(s).slice(1);
      return !!Pt[t] || Gi.some((e) => s.startsWith(`data:${e}`));
    },
    /** Load the sound file, this is mostly handled by Sound.from() */
    async load(s, t) {
      const e = await new Promise((i, n) => kt.from({
        ...t.data,
        url: s,
        preload: true,
        loaded(o, r) {
          var a, h;
          o ? n(o) : i(r), (h = (a = t.data) == null ? void 0 : a.loaded) == null || h.call(a, o, r);
        }
      }));
      return pt().add(me(t), e), e;
    },
    /** Remove the sound from the library */
    async unload(s, t) {
      pt().remove(me(t));
    }
  }
};
extensions.add(Zi);
var P = $i(new Ni());
var Qi = class extends O {
  /**
   * Creates a new AudioManager instance.
   * @param {string} id - The ID of the AudioManager. Default is 'AudioManager'.
   */
  constructor(t = "audio") {
    super(t), this.onSoundStarted = new u(), this.onSoundEnded = new u(), this.onMuted = new u(), this.onMasterVolumeChanged = new u(), this.onChannelVolumeChanged = new u(), this._storedVolume = void 0, this._paused = false, this._idMap = /* @__PURE__ */ new Map(), this._masterVolume = 1, this._muted = false, this._channels = /* @__PURE__ */ new Map(), this.createChannel("music"), this.createChannel("sfx"), this.createChannel("voiceover");
  }
  /**
   * Gets the master volume.
   * @returns {number} The master volume.
   */
  get masterVolume() {
    return this._masterVolume;
  }
  /**
   * Sets the master volume.
   * @param {number} value - The new master volume.
   */
  set masterVolume(t) {
    this._masterVolume = t, this._channels.forEach((e) => e.updateVolume());
  }
  /**
   * Gets whether the audio is muted.
   * @returns {boolean} True if the audio is muted, false otherwise.
   */
  get muted() {
    return this._muted;
  }
  /**
   * Sets whether the audio is muted.
   * @param {boolean} value - True to mute the audio, false to unmute.
   */
  set muted(t) {
    this._muted = t, this._setMuted();
  }
  /**
   * Gets the map of audio channels.
   * @returns {Map<string, IAudioChannel>} The map of audio channels.
   */
  get channels() {
    return this._channels;
  }
  get music() {
    return this._channels.get("music");
  }
  get sfx() {
    return this._channels.get("sfx");
  }
  get voiceover() {
    return this._channels.get("voiceover");
  }
  get vo() {
    return this._channels.get("voiceover");
  }
  destroy() {
    this._channels.forEach((t) => {
      t.destroy();
    }), this._channels.clear(), this.onSoundStarted.disconnectAll(), this.onSoundEnded.disconnectAll(), this.onMuted.disconnectAll(), this.onMasterVolumeChanged.disconnectAll(), this.onChannelVolumeChanged.disconnectAll(), super.destroy();
  }
  /**
   * Initializes the AudioManager.
   * @param {IApplication} app
   * @returns {Promise<void>}
   */
  initialize(t) {
    return typeof (t == null ? void 0 : t.manifest) == "object" && this.addAllFromManifest(t.manifest), Promise.resolve(void 0);
  }
  /**
   * Creates a new audio channel.
   * @param {string} name
   */
  createChannel(t) {
    if (this._channels.has(t))
      throw new Error(`Channel with name ${t} already exists.`);
    const e = new Ui(t, this);
    this._channels.set(t, e);
  }
  /**
   * Sets the volume of the specified channel.
   * @param {ChannelName|ChannelName[]} channelName
   * @param {number} volume
   */
  setChannelVolume(t, e) {
    Array.isArray(t) || (t = [t]), t.forEach((i) => this._setChannelVolume(i, e));
  }
  /**
   * Gets the audio channel with the specified name.
   * @param {C} name
   * @returns {IAudioChannel | undefined}
   */
  getChannel(t) {
    return this._channels.get(t);
  }
  /**
   * Mutes the audio.
   */
  mute() {
    this._muted = true, this._setMuted();
  }
  /**
   * Unmutes the audio.
   */
  unmute() {
    this._muted = false, this._setMuted();
  }
  /**
   * Pauses the audio.
   */
  pause() {
    this._paused = true, this._setPaused();
  }
  /**
   * Resumes the audio.
   */
  resume() {
    this._paused = false, this._setPaused();
  }
  /**
   * Adds all sound assets from the specified manifest.
   * @param {AssetsManifest} manifest
   */
  addAllFromManifest(t) {
    t.bundles.forEach((e) => {
      this.addAllFromBundle(e.name, t);
    });
  }
  /**
   * Adds all sound assets from the specified bundle.
   * @param {string} bundleName
   * @param {AssetsManifest | string | undefined} manifest
   */
  addAllFromBundle(t, e) {
    if (e || (e = this.app.manifest), e === void 0 || typeof e == "string")
      throw new Error("Manifest is not available");
    const i = e.bundles.find((n) => n.name === t);
    if (i === void 0)
      throw new Error(`Bundle with name ${t} does not exist.`);
    Array.isArray(i == null ? void 0 : i.assets) || (i.assets = [i.assets]), i.assets.forEach((n) => {
      let o = n.src;
      Array.isArray(o) && (o = o[0]);
      const r = o.split(".").pop();
      (r === "mp3" || r === "ogg" || r === "wav" || r === "webm") && this.add(n);
    });
  }
  /**
   * Adds a sound asset to the AudioManager.
   * @param {UnresolvedAsset} soundAsset
   */
  add(t) {
    let e = t.alias;
    if (Array.isArray(t.alias) || (e = [t.alias]), e) {
      const i = {};
      e.forEach((n) => {
        n !== void 0 && (i[n] = t.src);
      }), P.add(i);
    }
  }
  isPlaying(t, e) {
    var n;
    const i = this._channels.get(e);
    return i ? ((n = i.get(t)) == null ? void 0 : n.isPlaying) === true : false;
  }
  /**
   * Plays a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {C} channelName
   * @param {PlayOptions} options
   * @returns {Promise<IAudioInstance>}
   */
  async play(t, e = "sfx", i) {
    this._idMap.has(t) && (t = this._idMap.get(t));
    const n = this._channels.get(e);
    if (n) {
      t = this._verifySoundId(t);
      const o = n.add(
        t,
        new ge(t, n, this)
      ), r = await P.play(t, i);
      return o.media = r, (i == null ? void 0 : i.volume) !== void 0 && (r.volume = i.volume, o.onStart.connect(() => {
      }), o.onEnd.connect(() => {
      })), o.isPlaying = true, o;
    } else
      throw new Error(`Channel ${e} does not exist.`);
  }
  /**
   * Stops a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {C} channelName
   * @returns {IAudioInstance | undefined}
   */
  stop(t, e = "sfx") {
    const i = this._channels.get(e);
    if (i)
      return i.remove(t);
    throw new Error(`Channel ${e} does not exist.`);
  }
  /**
   * Fades in a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {C} channelName
   * @param {gsap.TweenVars} props
   * @returns {Promise<gsap.core.Tween | null>}
   */
  async fadeIn(t, e = "music", i) {
    const n = this._channels.get(e);
    n && (t = this._verifySoundId(t)), n != null && n.get(t) || await this.play(t, e, { volume: 0 }), (i == null ? void 0 : i.volume) === 0 && _.warn("fadeIn volume is 0", t, e, i);
    const o = Object.assign({ volume: (i == null ? void 0 : i.volume) ?? 1, duration: 1, ease: "linear.easeNone" }, i);
    return this.fade(t, e, o);
  }
  /**
   * Fades out a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {C} channelName
   * @param {Partial<gsap.TweenVars>} props
   * @returns {Promise<gsap.core.Tween | null>}
   */
  async fadeOut(t, e = "music", i = { volume: 0 }) {
    i || (i = {}), (i == null ? void 0 : i.volume) === void 0 && (i.volume = 0), (i == null ? void 0 : i.volume) > 0 && _.warn("fadeOut volume should probably be 0", t, e, i);
    const n = Object.assign({ volume: 0, duration: 1, ease: "linear.easeNone" }, i);
    return this.fade(t, e, n, true);
  }
  /**
   * Crossfades between two sounds in the specified channel.
   * @param {string} outSoundId
   * @param {string} inSoundId
   * @param {ChannelName} channelName
   * @param {number} duration
   * @returns {Promise<gsap.core.Tween | null>}
   */
  async crossFade(t, e, i = "music", n = 2) {
    const o = { duration: n, ease: "linear.easeNone" };
    return this.fadeOut(t, i, o), this.fadeIn(e, i, o);
  }
  /**
   * Fades a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {ChannelName} channelName
   * @param {gsap.TweenVars} props
   * @param {boolean} stopOnComplete
   * @returns {Promise<gsap.core.Tween | null>}
   */
  async fade(t, e = "music", i, n = false) {
    const o = this._channels.get(e);
    o && (t = this._verifySoundId(t));
    const r = o == null ? void 0 : o.get(t);
    if (r) {
      const a = gsapWithCSS.to(r, i);
      return a.eventCallback("onComplete", () => {
        n && this.stop(t, e);
      }), a;
    }
    return null;
  }
  /**
   * Restores the audio state after it has been suspended.
   */
  async restore() {
    var e;
    const t = (e = P == null ? void 0 : P.context) == null ? void 0 : e.audioContext;
    t && await t.resume(), this._storedVolume !== void 0 && (this.masterVolume = this._storedVolume), this.muted = this._muted, this.resume();
  }
  /**
   * Suspends the audio by setting the master volume to 0 and pausing all sounds.
   */
  suspend() {
    this._storedVolume = this._masterVolume, this.masterVolume = 0, this.pause();
  }
  getAudioInstance(t, e = "sfx") {
    const i = this._channels.get(e);
    if (t = this._verifySoundId(t), i)
      return i.get(t);
    throw new Error(`Channel ${e} does not exist.`);
  }
  load(t, e = "sfx", i) {
    Array.isArray(t) || (t = [t]);
    for (let n of t) {
      this._idMap.has(n) && (t = this._idMap.get(n));
      const o = this._channels.get(e);
      if (o) {
        n = this._verifySoundId(n);
        const r = P.find(n);
        r.options = { ...i, autoPlay: false };
        const a = o.add(n, new ge(n, o, this));
        a.media = r.instances[0], a.pause();
      } else
        throw new Error(`Channel ${e} does not exist.`);
    }
  }
  stopAll(t = false, e = 1, i = {}) {
    if (t) {
      const n = [];
      this._channels.forEach((o) => {
        o.instances.forEach((r) => {
          r.isPlaying && (r.storedVolume = r.volume, n.push(r));
        });
      }), gsapWithCSS.to(n, {
        volume: 0,
        duration: e,
        ...i,
        onComplete: () => {
          n.forEach((o) => {
            o.stop(), o.volume = o.storedVolume;
          });
        }
      });
    } else
      P.stopAll();
  }
  getCoreSignals() {
    return ["onSoundStarted", "onSoundEnded", "onMuted", "onMasterVolumeChanged", "onChannelVolumeChanged"];
  }
  _verifySoundId(t) {
    const e = t;
    if (this._idMap.has(t))
      return this._idMap.get(t);
    if (!P.exists(t))
      if (P.exists(t + ".mp3"))
        t += ".mp3";
      else if (P.exists(t + ".ogg"))
        t += ".ogg";
      else if (P.exists(t + ".wav"))
        t += ".wav";
      else {
        t = e;
        let i = Assets.get(t);
        if (i || (t = e + ".mp3", i = Assets.get(t)), i || (t = e + ".ogg", i = Assets.get(t)), i || (t = e + ".wav", i = Assets.get(t)), i)
          this._findAndAddFromManifest(t, i);
        else
          throw new Error(`Sound with ID ${t} does not exist.`);
      }
    return this._idMap.set(t, t), t;
  }
  _findAndAddFromManifest(t, e) {
    const i = this.app.manifest;
    if (i === void 0 || typeof i == "string")
      throw new Error("Manifest is not available");
    for (let n = 0; n < i.bundles.length; n++) {
      const o = i.bundles[n];
      Array.isArray(o == null ? void 0 : o.assets) || (o.assets = [o.assets]);
      for (let r = 0; r < o.assets.length; r++) {
        const a = o.assets[r], h = a.src, c = e.url.split("/").pop() ?? "";
        if (Array.isArray(h))
          for (let l = 0; l < h.length; l++) {
            const d = h[l];
            let p;
            if (typeof d != "string" ? p = d.src : p = d, p.includes(c)) {
              this.add(a);
              return;
            }
          }
        else if (h != null && h.includes(c)) {
          this.add(a);
          return;
        }
      }
    }
  }
  /**
   * @private
   */
  _setMuted() {
    this._channels.forEach((t) => {
      t.muted = this._muted;
    }), this._muted ? P.muteAll() : P.unmuteAll(), this.onMuted.emit(this._muted);
  }
  /**
   * @private
   */
  _setPaused() {
    this._paused ? P.pauseAll() : P.resumeAll();
  }
  /**
   * Sets the volume of the specified channel.
   * @param {C} channelName
   * @param {number} volume
   * @private
   */
  _setChannelVolume(t, e) {
    const i = this._channels.get(t);
    if (i)
      i.volume = e;
    else
      throw new Error(`Channel ${t} does not exist.`);
  }
  /**
   * Sound started event handler. Emit the onSoundStarted signal.
   * @param {string} id
   * @param {IAudioInstance} instance
   * @param {C} channelName
   * @private
   */
  _soundStarted(t, e, i) {
    this.onSoundStarted.emit({ id: t, instance: e, channelName: i });
  }
  /**
   * Sound ended event handler. Emit the onSoundEnded signal.
   * @param {string} id
   * @param {IAudioInstance} instance
   * @param {C} channelName
   * @private
   */
  _soundEnded(t, e, i) {
    this.onSoundEnded.emit({ id: t, instance: e, channelName: i });
  }
};
var Ji = class extends Container {
  constructor(t) {
    super(), w(this), this._config = {
      color: 65535,
      shape: "rounded rectangle",
      radius: 8,
      lineWidth: 2,
      ...t
    }, this._graphics = new Graphics(), this.addChild(this._graphics);
  }
  draw(t) {
    this.clear(), this.setFocusTarget(t), this.focusTarget && (this._graphics.strokeStyle = { width: this._config.lineWidth, color: this._config.color, alpha: 1 }, this._config.shape === "rectangle" ? this._graphics.rect(0, 0, this.focusBounds.width, this.focusBounds.height) : this._graphics.roundRect(0, 0, this.focusBounds.width, this.focusBounds.height, this._config.radius), this._graphics.stroke());
  }
  clear() {
    this.clearFocusTarget();
  }
  destroy(t) {
    this.clear(), this._graphics.destroy(), super.destroy(t);
  }
  setFocusTarget(t) {
    t && (this.focusTarget = t, this.focusBounds = this.focusTarget.getFocusArea().clone(), v.getInstance().ticker.add(this.updatePosition));
  }
  clearFocusTarget() {
    this.focusTarget = null, v.getInstance().ticker.remove(this.updatePosition);
  }
  updatePosition() {
    if (!this.focusTarget)
      return;
    const t = this.focusTarget.getGlobalPosition(), e = this.focusTarget.getFocusPosition();
    if (e) {
      const i = I(e);
      t.x += i.x, t.y += i.y;
    }
    this.position.set(t.x, t.y);
  }
};
var ts = class {
  constructor(t) {
    this.id = t, this.currentFocusable = null, this.lastFocusable = null, this.defaultFocusable = null, this._focusables = [], this._currentIndex = 0, this._current = false;
  }
  set current(t) {
    this._current = t, this.setCurrent();
  }
  get availableFocusables() {
    return this._focusables.filter((t) => t.focusEnabled);
  }
  setCurrent() {
    if (this._current)
      this.defaultFocusable || (this.defaultFocusable = this._focusables[0]), this.sortFocusables();
    else
      for (let t = 0; t < this._focusables.length; t++)
        this._focusables[t].accessible = false;
  }
  hasFocusable(t) {
    return t ? this._focusables.indexOf(t) > -1 : false;
  }
  addFocusable(t, e = false) {
    this._focusables.push(t), e && (this.defaultFocusable = t), this._current && this.sortFocusables();
  }
  removeFocusable(t) {
    const e = this._focusables.indexOf(t);
    e !== -1 && (this._focusables.splice(e, 1), this.currentFocusable === t && (this.currentFocusable = null), this.lastFocusable === t && (this.lastFocusable = null), this.defaultFocusable === t && (this.defaultFocusable = null)), this._current && this.sortFocusables();
  }
  sortFocusables() {
    for (let t = 0; t < this._focusables.length; t++)
      this._focusables[t].accessible = this._current, this._focusables[t].tabIndex = this._current ? Math.max(t, 1) + 1 : -1, this._focusables[t] === this.defaultFocusable && (this._focusables[t].tabIndex = this._current ? 1 : -1);
    this._current && this._focusables.sort((t, e) => t.tabIndex - e.tabIndex);
  }
  sortFocusablesByPosition() {
    this._current && this._focusables.sort((t, e) => t.position.y !== e.position.y ? t.position.y - e.position.y : t.position.x - e.position.x);
  }
  setCurrentFocusable(t) {
    return t ? (this._currentIndex = this._focusables.indexOf(t), this.currentFocusable = t) : (this._currentIndex = -1, this.currentFocusable = null), this.currentFocusable;
  }
  next() {
    return this._currentIndex = this._currentIndex + 1, this._currentIndex >= this._focusables.length && (this._currentIndex = 0), this.currentFocusable = this._focusables[this._currentIndex], this.currentFocusable;
  }
  prev() {
    return this._currentIndex = this._currentIndex - 1, this._currentIndex < 0 && (this._currentIndex = this._focusables.length - 1), this.currentFocusable = this._focusables[this._currentIndex], this.currentFocusable;
  }
};
var es = class extends O {
  constructor() {
    super(...arguments), this.id = "focus", this.view = new Container(), this.onFocusManagerActivated = new u(), this.onFocusManagerDeactivated = new u(), this.onFocusLayerChange = new u(), this.onFocusChange = new u(), this._focusTarget = null, this._keyboardActive = false, this._layers = /* @__PURE__ */ new Map(), this._currentLayerId = null, this._active = false, this._enabled = true;
  }
  get layers() {
    return this._layers;
  }
  get currentLayerId() {
    return this._currentLayerId;
  }
  get currentLayer() {
    if (this._currentLayerId)
      return this._layers.get(this._currentLayerId);
  }
  get active() {
    return this._active;
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(t) {
    this._enabled = t;
  }
  get layerCount() {
    return this._layers.size;
  }
  sortFocusablesByPosition() {
    var t;
    (t = this._getCurrentLayer()) == null || t.sortFocusablesByPosition();
  }
  initialize(t) {
    var i;
    ci(this, "removeAllFocusLayers", "_handleGlobalMouseMove", "_handleGlobalPointerDown");
    const e = ((i = t.config) == null ? void 0 : i.focus) || {};
    e.usePixiAccessibility = e.usePixiAccessibility ?? false, this._focusOutliner = typeof (e == null ? void 0 : e.outliner) == "function" ? new e.outliner() : new Ji(e.outliner), this._options = e, this.view.addChild(this._focusOutliner), this._updatePixiAccessibility(), this._setupKeyboardListeners(), this._setupAppListeners();
  }
  destroy() {
    this._removeGlobalListeners(), this.deactivate(), this._focusOutliner.destroy(), this._layers.clear(), super.destroy();
  }
  deactivate() {
    this._setTarget(null), this._updateOutliner(), this._active = false;
  }
  add(t, e, i = false) {
    this.addFocusable(t, e, i);
  }
  addFocusable(t, e, i = false) {
    (e === void 0 || e == null) && (e = this._currentLayerId ?? null);
    const n = this._layers.get(e);
    if (!n) {
      _.error(`Layer with ID ${e} does not exist.`);
      return;
    }
    Array.isArray(t) || (t = [t]), t.forEach((o, r) => {
      n.addFocusable(o, r === 0 && i);
    }), this._active && i && this._setTarget(n.currentFocusable || n.defaultFocusable || null, !this._active);
  }
  remove(t) {
    this.removeFocusable(t);
  }
  removeFocusable(t) {
    Array.isArray(t) || (t = [t]), this._layers.forEach((e) => {
      t.forEach((i) => {
        e.removeFocusable(i);
      });
    }), this._focusTarget && t.includes(this._focusTarget) && this._setTarget(null);
  }
  setLayerOrder(t) {
    const e = /* @__PURE__ */ new Map();
    t.forEach((i) => {
      if (!this._layers.has(i))
        throw new Error(`Layer with ID ${i} does not exist.`);
      e.set(i, this._layers.get(i));
    }), this._layers = e;
  }
  addFocusLayer(t, e = true, i) {
    t === void 0 && (t = this._layers.size);
    let n;
    return this._layers.has(t) ? (_.error(`Layer with ID ${t} already exists.`), n = this._layers.get(t)) : (n = new ts(t), this._layers.set(t, n)), (e || this._currentLayerId === null) && this.setFocusLayer(t), i && this.addFocusable(i, t), n;
  }
  removeFocusLayer(t, e = true) {
    var n;
    if (t === void 0 && e)
      return this._removeTopLayer();
    if (!this._layers.has(t))
      throw new Error(`Layer with ID ${t} does not exist.`);
    const i = (n = Ut(this._layers, t)) == null ? void 0 : n[0];
    this._layers.delete(t), this._postDelete(i);
  }
  restart(t = false) {
    var i, n, o;
    const e = this._getCurrentLayer();
    this._setTarget(
      t ? ((n = e == null ? void 0 : e.availableFocusables) == null ? void 0 : n[((i = e == null ? void 0 : e.availableFocusables) == null ? void 0 : i.length) - 1]) || null : ((o = e == null ? void 0 : e.availableFocusables) == null ? void 0 : o[0]) || null
    );
  }
  forceFocus(t) {
    this.focus(t);
  }
  setFocus(t) {
    this.focus(t);
  }
  focus(t) {
    this._setTarget(t);
  }
  setFocusLayer(t) {
    if (!this._layers.has(t))
      throw new Error(`Layer with ID ${t} does not exist.`);
    this._currentLayerId = t;
    const e = this._getCurrentLayer();
    e && (e.current = true, this._layers.forEach((i, n) => {
      i.current = n === t;
    }), e.sortFocusables(), this._setTarget(e.currentFocusable || e.defaultFocusable || null, !this._active)), this.onFocusLayerChange.emit(this._currentLayerId);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  postInitialize(t) {
  }
  clearFocus() {
    this._setTarget(null);
  }
  removeAllFocusLayers() {
    this._layers.clear(), this._setTarget(null);
  }
  _onKeyDown(t) {
    if (!(!this._enabled || t.key !== "Tab" && t.key !== "Enter" && t.key !== " " && t.key !== "Space") && !this._options.usePixiAccessibility)
      if (t.key === "Tab") {
        t.preventDefault();
        const e = this._getCurrentLayer();
        if (!(e == null ? void 0 : e.availableFocusables))
          return;
        this._keyboardActive ? t.shiftKey ? this._prev() : this._next() : (this._activate(), this._setTarget(this._focusTarget || e.currentFocusable || e.defaultFocusable || null));
      } else (t.key === "Enter" || t.key === " " || t.key === "Space") && this._focusTarget && this._focusTarget.isFocused && this._focusTarget.emit("pointerdown", { type: "pointerdown" });
  }
  _onKeyUp(t) {
    var e, i;
    !this._enabled || t.key !== "Enter" && t.key !== " " && t.key !== "Space" || this._options.usePixiAccessibility || this._focusTarget && this._focusTarget.isFocused && ((e = this._focusTarget) == null || e.emit("click", { type: "click", originalEvent: t }), (i = this._focusTarget) == null || i.emit("pointerup", { type: "pointerup", originalEvent: t }));
  }
  _onMouseMove(t) {
    t.movementX === 0 && t.movementY === 0 || this._deactivate();
  }
  getCoreFunctions() {
    return [
      "addFocusable",
      "removeFocusable",
      "setLayerOrder",
      "addFocusLayer",
      "removeFocusLayer",
      "setFocusLayer",
      "setFocus",
      "focus",
      "clearFocus",
      "removeAllFocusLayers"
    ];
  }
  getCoreSignals() {
    return ["onFocusManagerActivated", "onFocusManagerDeactivated", "onFocusLayerChange", "onFocusChange"];
  }
  _next() {
    var e;
    const t = (e = this._getCurrentLayer()) == null ? void 0 : e.next();
    if (!t) {
      _.error("FocusManager:: _next():: No focusable found in the current layer.");
      return;
    }
    this._setTarget(t);
  }
  _prev() {
    var e;
    const t = (e = this._getCurrentLayer()) == null ? void 0 : e.prev();
    if (!t) {
      _.error("FocusManager:: _prev():: No focusable found in the current layer.");
      return;
    }
    this._setTarget(t);
  }
  _deactivate() {
    this._keyboardActive && (this._keyboardActive = false);
  }
  _activate() {
    this._keyboardActive || (this._keyboardActive = true, globalThis.document.addEventListener("mousemove", this._onMouseMove, true));
  }
  _updatePixiAccessibility() {
    this.app.renderer.accessibility._div.setAttribute("id", "pixi-accessibility"), this._options.usePixiAccessibility || (this.app.renderer.accessibility._div.setAttribute("disabled", "disabled"), this.app.renderer.accessibility.destroy(), globalThis.addEventListener("keydown", this._onKeyDown, false), globalThis.addEventListener("keyup", this._onKeyUp, false));
  }
  _getCurrentLayer() {
    return this._currentLayerId != null && this._layers.get(this._currentLayerId) || null;
  }
  _removeTopLayer() {
    var i, n;
    const t = (i = Ht(this._layers)) == null ? void 0 : i[0], e = (n = Ut(this._layers, t)) == null ? void 0 : n[0];
    t !== void 0 && (this._layers.delete(t), this._postDelete(e));
  }
  _postDelete(t) {
    this._layers.size === 0 ? this._currentLayerId = null : t !== void 0 && this.setFocusLayer(t);
  }
  _setTarget(t, e = true) {
    const i = this._getCurrentLayer(), n = this._focusTarget;
    if (this._focusTarget = t, n && this._active && this._clearFocusTarget(n), this.app.renderer.accessibility.isActive || this._keyboardActive)
      this._focusTarget ? (this._active || (this._active = true), this._options.usePixiAccessibility && !this._focusTarget._accessibleDiv && this.app.renderer.accessibility.postrender(), this._options.usePixiAccessibility && this.app.ticker.addOnce(() => {
        var o, r;
        (r = (o = this._focusTarget) == null ? void 0 : o._accessibleDiv) == null || r.focus();
      }), i != null && i.hasFocusable(t) ? this._focusTarget && (this._focusTarget.focusIn(), this._focusTarget.isFocused = true, this._focusTarget.onFocusIn.emit(this._focusTarget), i.setCurrentFocusable(this._focusTarget), this._updateOutliner()) : _.warn(
        "The focusable",
        t,
        `does not exist on the current focus layer: ${this._currentLayerId}`
      )) : this._focusOutliner.clear();
    else if (this._focusOutliner.clear(), this._active && e) {
      this._active = false, this.onFocusManagerDeactivated.emit();
      return;
    }
    n !== t && this._active && this.onFocusChange.emit({ focusable: this._focusTarget, layer: this._currentLayerId });
  }
  _clearFocusTarget(t) {
    t && (t.focusOut(), t.isFocused = false, t.onFocusOut.emit(t), t.blur(), t.onBlur.emit(t));
  }
  _setupKeyboardListeners() {
    window.addEventListener("keydown", this._onKeyDown, false), this._addGlobalListeners();
  }
  _addGlobalListeners() {
    globalThis.document.addEventListener("mousemove", this._handleGlobalMouseMove), globalThis.document.addEventListener("pointerdown", this._handleGlobalPointerDown);
  }
  _removeGlobalListeners() {
    globalThis.document.removeEventListener("mousemove", this._handleGlobalMouseMove), globalThis.document.removeEventListener("pointerdown", this._handleGlobalPointerDown);
  }
  _handleGlobalMouseMove() {
    this._enabled && this._active && this.deactivate();
  }
  _handleGlobalPointerDown() {
    this._enabled && (this._active && this.deactivate(), (this.app.renderer.accessibility.isActive || this._keyboardActive) && (this.app.renderer.accessibility._deactivate(), this._deactivate()));
  }
  _setupAppListeners() {
    this.app.scenes.onSceneChangeStart.connect(this.removeAllFocusLayers);
  }
  _updateOutliner() {
    this._focusTarget ? (this._focusOutliner.position.set(this._focusTarget.position.x, this._focusTarget.position.y), this._focusOutliner.draw(this._focusTarget)) : this._focusOutliner.clear();
  }
};
var is = {
  defaultLocale: "en",
  locales: ["en"],
  loadAll: false,
  files: []
};
var ss = class extends O {
  constructor() {
    super(...arguments), this.id = "i18n", this.onLocaleChanged = new u(), this._dicts = {};
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
  async initialize(t, e) {
    if (super.initialize(t), this._options = { ...is, ...e }, this._locale = this._options.defaultLocale, this._options.loadAll && this._options.files.length > 0) {
      const i = this._options.files.filter((n) => this._options.locales.includes(n.id));
      for (const n of i)
        await this.loadLocale(n.id);
    } else this._options.files.length > 0 && await this.loadLocale(this._locale);
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
  t(t, e, i = this._locale) {
    const n = this._dicts[i];
    if (!n)
      return _.error(`i18n:: No dictionary loaded for current locale: ${i}`), "";
    let o = n[t];
    if (!o)
      return _.error(`i18n:: No result found for the key ${t} in the locale: ${this._locale}`), "";
    if (e) {
      if (typeof e.variant == "number" || e.variant === "random") {
        const r = /\[(.*?)\]/.exec(o);
        if (r) {
          const a = r[1].split("|"), h = e.variant === "random" ? Math.floor(Math.random() * a.length) : e.variant;
          o = o.replace(r[0], a[h]);
        }
      }
      for (const r in e) {
        const a = new RegExp(`{${r}}`, "g");
        o = o.replace(a, String(e[r]));
      }
    }
    return o;
  }
  /**
   * Parses the input string and replaces anything in between {} braces, assuming it is a key in the dictionary.
   * @param {string} input
   * @param locale
   * @returns {string}
   */
  parse(t, e = this._locale) {
    const i = this._dicts[e];
    if (!i)
      return _.error(`i18n:: No dictionary loaded for current locale: ${this._locale}`), "";
    let n = t;
    const o = n.match(/{(.*?)}/g);
    return o && o.forEach((r) => {
      const a = r.slice(1, -1);
      i[a] && (n = n.replace(r, i[a]));
    }), n;
  }
  /**
   * Loads a locale.
   * @param localeId The locale id to load.
   * @returns Promise<void>
   */
  async loadLocale(t) {
    const e = this._options.files.find((i) => t === i.id);
    if (!e) {
      _.error(`i18n:: Could not find locale file for ${t}`);
      return;
    }
    this._dicts[t] = e.json ? await Assets.load(e.json) : await At(e);
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
};
var Z = ((s) => (s.Keyboard = "keyboard", s.GamePad = "gamepad", s.Mouse = "mouse", s.Touch = "touch", s))(Z || {});
function K(s) {
  return class extends s {
    constructor() {
      super(...arguments), this.signalConnections = new R.SignalConnections();
    }
    /**
     * Add signal connections to the container.
     * @param args - The signal connections to add.
     */
    addSignalConnection(...t) {
      for (const e of t)
        this.signalConnections.add(e);
    }
    connectSignal(...t) {
      for (const e of t)
        this.signalConnections.add(e);
    }
    connectAction(...t) {
      for (const e of t)
        this.signalConnections.add(e);
    }
    destroy(t) {
      this.signalConnections.disconnectAll(), super.destroy(t);
    }
  };
}
function ns(s) {
  return class extends s {
    constructor() {
      super(...arguments), this.onAnimationStart = new u(), this.onAnimationUpdate = new u(), this.onAnimationComplete = new u(), this._activeTweens = [];
    }
    /**
     * Animate method.
     * @param animationProps - Animation properties.
     * @param instance - Instance to animate.
     * @returns GSAP Tween instance.
     */
    animate(t, e = this) {
      const i = gsapWithCSS.to(e, {
        ...t,
        onStart: () => {
          this._onAnimationStart(i);
        },
        onUpdate: () => {
          this._onAnimationUpdate(i);
        },
        onComplete: () => {
          this._onAnimationComplete(i), this._activeTweens = this._activeTweens.filter((n) => n !== i);
        }
      });
      return this._activeTweens.push(i), i;
    }
    /**
     * Animate from method.
     * @param animationProps - Animation properties.
     * @param instance - Instance to animate.
     * @returns GSAP Tween instance.
     */
    animateFrom(t, e = this) {
      const i = gsapWithCSS.from(e, {
        ...t,
        onStart: () => {
          this._onAnimationStart(i);
        },
        onUpdate: () => {
          this._onAnimationUpdate(i);
        },
        onComplete: () => {
          this._onAnimationComplete(i), this._activeTweens = this._activeTweens.filter((n) => n !== i);
        }
      });
      return this._activeTweens.push(i), i;
    }
    /**
     * Animate sequence method.
     * @param sequences - Array of animation sequences.
     * @param instance - Instance to animate.
     * @returns GSAP Timeline instance.
     */
    animateSequence(t, e = this) {
      return this._activeTimeline || (this._activeTimeline = gsapWithCSS.timeline({
        onStart: () => this._onAnimationStart(this._activeTimeline),
        onUpdate: () => this._onAnimationUpdate(this._activeTimeline),
        onComplete: () => {
          this._onAnimationComplete(this._activeTimeline), this._activeTimeline = void 0;
        }
      })), t.forEach((i) => {
        var n;
        (n = this._activeTimeline) == null || n.to(e, i);
      }), this._activeTimeline;
    }
    /**
     * Clear animations method.
     */
    destroyAnimations() {
      var t;
      this._activeTweens.forEach((e) => e.kill()), this._activeTweens = [], (t = this._activeTimeline) == null || t.clear(), this._activeTimeline = void 0;
    }
    /**
     * Pause animations method.
     */
    pauseAnimations() {
      var t;
      this._activeTweens.forEach((e) => e.pause()), (t = this._activeTimeline) == null || t.pause();
    }
    /**
     * Resume animations method.
     */
    resumeAnimations() {
      var t;
      this._activeTweens.forEach((e) => e.play()), (t = this._activeTimeline) == null || t.play();
    }
    /**
     * Animate from-to method.
     * @param fromProps - Animation properties for the start state.
     * @param toProps - Animation properties for the end state.
     * @param instance - Instance to animate.
     * @returns GSAP Tween instance.
     */
    animateFromTo(t, e, i = this) {
      const n = gsapWithCSS.fromTo(
        i,
        {
          ...t
        },
        {
          ...e
        }
      );
      return n.eventCallback("onStart", () => {
        this._onAnimationStart(n);
      }), n.eventCallback("onUpdate", () => {
        this._onAnimationUpdate(n);
      }), n.eventCallback("onComplete", () => {
        this._onAnimationComplete(n), this._activeTweens = this._activeTweens.filter((o) => o !== n);
      }), this._activeTweens.push(n), n;
    }
    /**
     * Reverses animations.
     */
    reverseAnimation() {
      var t;
      this._activeTweens.forEach((e) => e.reverse()), (t = this._activeTimeline) == null || t.reverse();
    }
    isAnimationPlaying() {
      var t;
      return ((t = this._activeTweens) == null ? void 0 : t.some((e) => !e.paused())) || this._activeTimeline && !this._activeTimeline.paused() || false;
    }
    // utility animations
    /**
     * Shake animation.
     * @param config - Configuration object.
     * @param instance
     * @returns GSAP Tween instance.
     */
    shake(t = {}, e = this) {
      const { duration: i = 0.05, intensity: n = 12, times: o = 41 } = t, a = { x: e.x, y: e.y }.x, h = o % 2 === 0 ? o + 1 : o, c = gsapWithCSS.to(e, {
        x: a + gsapWithCSS.utils.random(-Math.max(n, 2), Math.max(n, 2)),
        repeat: h,
        yoyo: true,
        duration: i
      });
      return this._activeTweens.push(c), c;
    }
    /**
     * Pulse animation.
     * @param config - Configuration object.
     * @param instance
     * @returns GSAP Tween instance.
     */
    pulse(t = {}, e = this) {
      const { duration: i = 0.5, intensity: n = 1.2, times: o = 1 } = t, r = o * 2 - 1, a = gsapWithCSS.to(e == null ? void 0 : e.scale, {
        x: n,
        y: n,
        repeat: r,
        yoyo: true,
        duration: i
      });
      return this._activeTweens.push(a), a;
    }
    /**
     * Bob animation.
     * @param config - Configuration object.
     * @param instance
     * @returns GSAP Tween instance.
     */
    bob(t = {}, e = this) {
      const { duration: i = 0.5, intensity: n = 10 } = t, o = gsapWithCSS.to(e, {
        y: `-=${n}`,
        repeat: -1,
        yoyo: true,
        duration: i
      });
      return this._activeTweens.push(o), o;
    }
    /**
     * Private method for handling animation start event.
     * @param animationEntity - Animation entity.
     */
    _onAnimationStart(t) {
      this.onAnimationStart.emit(t);
    }
    /**
     * Private method for handling animation update event.
     * @param animationEntity - Animation entity.
     */
    _onAnimationUpdate(t) {
      this.onAnimationUpdate.emit(t);
    }
    /**
     * Private method for handling animation complete event.
     * @param animationEntity - Animation entity.
     */
    _onAnimationComplete(t) {
      this.onAnimationComplete.emit(t);
    }
  };
}
function Vt(s) {
  return class extends s {
    constructor(...t) {
      super(...t), this.isFocused = false, this.isKeyDown = false, this.focusEnabled = true, this.tabIndex = 0, this.accessible = false, this.accessibleType = "button", this.accessibleTitle = "Focusable", this.accessibleHint = "Press enter to focus", this.accessiblePointerEvents = "auto", this.accessibleChildren = true, this.onFocus = new u(), this.onFocusIn = new u(), this.onFocusOut = new u(), this.onBlur = new u(), this._eventsDisabled = false, this.eventMode = "static", this.on("mouseover", this._onMouseOver), this.on("mousedown", this._onMouseDown), this.on("click", this._handleClick), this.on("tap", this._handleClick);
    }
    get app() {
      return v.getInstance();
    }
    destroy(t) {
      this.off("mouseover", this._onMouseOver), this.off("mousedown", this._onMouseDown), this.off("click", this._handleClick), this.off("tap", this._handleClick), super.destroy(t);
    }
    focusIn() {
      this.app.focus.active && this.emit("pointerover", { type: "pointerover" });
    }
    blur() {
      this.isKeyDown || window.removeEventListener("keyup", this._handleKeyUp.bind(this));
    }
    focusOut() {
      this.isKeyDown || window.removeEventListener("keyup", this._handleKeyUp.bind(this)), this.app.focus.active && this.emit("pointerout", { type: "pointerout" });
    }
    click() {
    }
    getFocusPosition() {
      return null;
    }
    getFocusArea() {
      return this.getBounds();
    }
    getFocusSize() {
      return [this.getFocusArea().width, this.getFocusArea().height];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _onMouseOver(t) {
      this.app.focus.setFocus(this);
    }
    _onMouseDown(t) {
      this._maybeEmit("pointerdown", t);
    }
    _handleClick(t) {
      this._maybeEmit("click", t), this.click();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _handleKeyUp(t) {
    }
    _maybeEmit(t, e) {
      this._eventsDisabled || e.type || (this._eventsDisabled = true, this.emit(t, { type: t }), this._eventsDisabled = false);
    }
  };
}
Vt.INITTED = false;
function Re(s) {
  return class extends s {
    constructor(...t) {
      super(...t), this._signals = /* @__PURE__ */ new Map(), this._emitSignal = this._emitSignal.bind(this), this.eventMode = "static";
    }
    /**
     * Handles interaction events and returns the corresponding signal.
     *
     * @param {InteractionEventName} eventName - The name of the interaction event.
     * @return {InteractionSignal} The signal associated with the interaction event.
     */
    onInteraction(t) {
      if (!this._signals.has(t)) {
        const e = new u();
        this._signals.set(t, e), this.on(t, this._emitSignal);
      }
      return this._signals.get(t);
    }
    destroy(t) {
      for (const e of this._signals.keys())
        this.off(e, this._emitSignal);
      this._signals.clear(), super.destroy(t);
    }
    /**
     * Emits a signal with the given event.
     *
     * @param {FederatedEvent} event - The event to emit.
     *
     * @return {void}
     */
    _emitSignal(t) {
      const e = t.type, i = this._signals.get(e);
      i && i.emit(t);
    }
  };
}
function ye(s, t, e) {
  const i = {};
  for (const n in s)
    i[n] = (...o) => {
      const r = s[n](...o);
      return e && t.addChild(r), r;
    };
  return i;
}
var ve = ["autoResize", "autoUpdate", "priority"];
var os = { autoResize: true, autoUpdate: false, priority: 0 };
var B = class extends ns(K(vt())) {
  /**
   * The constructor for the Container class.
   * @param config - The configuration for the container.
   */
  constructor(t = {}) {
    super(), this.onDestroy = new u(), this.__dill_pixel_method_binding_root = true, this.__config = { ...os, ...t }, w(this), this.on("added", this._added), this.on("removed", this._removed);
  }
  /**
   * Get the application instance.
   */
  get app() {
    return v.getInstance();
  }
  addColoredBackground(t = 0, e = 1) {
    const i = {
      color: 0,
      width: this.app.size.width,
      height: this.app.size.height,
      anchor: 0.5,
      alpha: 1,
      autoResize: true
    }, n = Object.assign(
      i,
      typeof t == "number" ? {
        color: t,
        alpha: e
      } : t
    );
    return this.__background = this.add.sprite({
      asset: Texture.WHITE,
      width: n.width,
      height: n.height,
      anchor: n.anchor,
      tint: n.color,
      alpha: n.alpha,
      resolution: 2
    }), this.setChildIndex(this.__background, 0), n.autoResize && this.addSignalConnection(this.app.signal.onResize.connect(this.__resizeBackground)), this.__background;
  }
  /**
   * Update the container. This method is meant to be overridden by subclasses.
   * @param ticker
   */
  update(t) {
  }
  /**
   * Resize the container. This method is meant to be overridden by subclasses.
   * @param size
   */
  resize(t) {
  }
  /**
   * This method is called when the container is added to the stage. It is meant to be overridden by subclasses.
   */
  added() {
  }
  destroy(t) {
    this.__config.autoUpdate && this.app.ticker.remove(this.update, this), this.onDestroy.emit(), super.destroy(t);
  }
  removed() {
  }
  __resizeBackground() {
    this.__background.width = this.app.size.width, this.__background.height = this.app.size.height;
  }
  /**
   * This method is called when the container is added to the stage. It sets up auto-resizing and auto-updating if enabled.
   */
  _added() {
    this.__config.autoResize && this.addSignalConnection(this.app.onResize.connect(this.resize, this.__config.priority ?? "highest")), this.__config.autoUpdate && this.app.ticker.add(this.update, this, -999999), this.added();
  }
  _removed() {
    this.__config.autoResize && this.app.onResize.disconnect(this.resize), this.__config.autoUpdate && this.app.ticker.remove(this.update, this), this.removed();
  }
};
var we = ["autoUpdate", "priority"];
var rs = { autoUpdate: true, priority: 0 };
var as = class extends ParticleContainer {
  /**
   * The constructor for the Container class.
   * @param config - The configuration for the container.
   */
  constructor(t = {}) {
    super(t), this.onDestroy = new u(), this.__dill_pixel_method_binding_root = true, this.__config = { ...rs, ...t }, w(this), this.on("added", this._added), this.on("removed", this._removed);
  }
  /**
   * Get the application instance.
   */
  get app() {
    return v.getInstance();
  }
  /**
   * Update the container. This method is meant to be overridden by subclasses.
   * @param ticker
   */
  update(t) {
  }
  /**
   * Resize the container. This method is meant to be overridden by subclasses.
   * @param size
   */
  resize(t) {
  }
  /**
   * This method is called when the container is added to the stage. It is meant to be overridden by subclasses.
   */
  added() {
  }
  destroy(t) {
    this.__config.autoUpdate && this.app.ticker.remove(this.update, this), this.onDestroy.emit(), super.destroy(t);
  }
  removed() {
  }
  /**
   * This method is called when the container is added to the stage. It sets up auto-resizing and auto-updating if enabled.
   */
  _added() {
    this.__config.autoUpdate && this.app.ticker.add(this.update, this, this.__config.priority), this.added();
  }
  _removed() {
    this.__config.autoUpdate && this.app.ticker.remove(this.update, this), this.removed();
  }
};
var zn = class extends B {
  constructor() {
    super({ autoResize: true, autoUpdate: true, priority: "highest" }), this.autoUnloadAssets = false;
  }
  get assets() {
    return this._assets;
  }
  set assets(t) {
    this._assets = t;
  }
  async initialize() {
  }
  /**
   * Called to animate the scene in
   * @returns {Promise<void>}
   */
  enter() {
    return Promise.resolve();
  }
  /**
   * Called to animate the scene out
   * @returns {Promise<void>}
   */
  exit() {
    return Promise.resolve();
  }
  async start() {
  }
  /**
   * Called every frame
   * @param {Ticker} ticker
   */
  update(t) {
  }
  /**
   * Called when the window is resized
   * @param {Size} size
   * @override
   */
  resize(t) {
    _.log("Scene.resize", this, t);
  }
  destroy() {
    this.app.ticker.remove(this.update), super.destroy({ children: true });
  }
};
var Bn = class extends B {
  constructor(t = false) {
    super({ autoResize: true, autoUpdate: t, priority: -9999 }), this._active = false, this.addSignalConnection(
      this.app.assets.onLoadStart.connect(this.handleLoadStart),
      this.app.assets.onLoadProgress.connect(this.handleLoadProgress),
      this.app.assets.onLoadProgress.connect(this.handleLoadComplete)
    );
  }
  get active() {
    return this._active;
  }
  set active(t) {
    this._active = t;
  }
  get progress() {
    return this._progress;
  }
  set progress(t) {
    this._progress = t;
  }
  /**
   * Called to animate the scene in
   * @returns {Promise<void>}
   */
  enter() {
    return Promise.resolve();
  }
  /**
   * Called to animate the scene out
   * @returns {Promise<void>}
   */
  exit() {
    return Promise.resolve();
  }
  handleLoadStart() {
  }
  handleLoadProgress(t) {
    this._progress = t;
  }
  handleLoadComplete() {
  }
};
var hs = class extends Graphics {
  constructor(t) {
    super(typeof t == "string" ? Assets.get(t) : t);
    const e = this.getLocalBounds();
    this.pivot.set((e.x + e.width) / 2, (e.y + e.height) / 2);
  }
};
var ft = class _ft extends AnimatedSprite {
  constructor(t) {
    const e = (t == null ? void 0 : t.animations) ?? {}, i = (t == null ? void 0 : t.animation) ?? Object.keys(e)[0], n = e[i], o = t == null ? void 0 : t.sheet, r = (t == null ? void 0 : t.texturePrefix) || "", a = t == null ? void 0 : t.zeroPad;
    super(
      _ft.generateTexturesFromProps(
        i,
        n,
        r,
        o,
        a
      ),
      (t == null ? void 0 : t.autoUpdate) !== false
    ), this.config = t, this.onAnimationChange = new u(), this.onAnimationStart = new u(), this.onAnimationStop = new u(), this.onAnimationLoop = new u(), this.onAnimationComplete = new u(), this.onAnimationFrameChange = new u(), this.defaultTexturePrefix = "", this._paused = false, this._isReversed = false, w(this), this.defaultSheet = o, this.defaultTexturePrefix = r, this.defaultZeroPad = a, this._generateAnimations(), this.currentAnimation = this.defaultAnimation = i, this.autoPlay = (t == null ? void 0 : t.autoPlay) ?? true, this.loop = (t == null ? void 0 : t.loop) ?? true, this.updateAnchor = (t == null ? void 0 : t.updateAnchor) ?? false, this.animationSpeed = this.defaultAnimationSpeed = (t == null ? void 0 : t.animationSpeed) ?? 1, this.on("added", this._added);
  }
  get paused() {
    return this._paused;
  }
  set paused(t) {
    this._paused = t;
  }
  get speed() {
    return this.animationSpeed;
  }
  set speed(t) {
    this.animationSpeed = this.defaultAnimationSpeed = t;
  }
  get isReversed() {
    return this._isReversed;
  }
  static generateTexturesFromProps(t, e, i = "", n = void 0, o) {
    const r = [];
    let a = "";
    const h = (e == null ? void 0 : e.sheet) ?? n;
    if ((e == null ? void 0 : e.numFrames) > 1) {
      const c = (e == null ? void 0 : e.startIndex) ?? 0;
      for (let l = c; l < c + (e == null ? void 0 : e.numFrames); l++)
        a = `${i}${(e == null ? void 0 : e.texturePrefix) ?? t}${fi(l, (e == null ? void 0 : e.zeroPad) ?? o)}`, r.push(
          Mt({
            asset: a,
            sheet: h
          })
        );
    } else
      a = `${i}${(e == null ? void 0 : e.texturePrefix) ?? t}`, r.push(
        Mt({
          asset: a,
          sheet: h
        })
      );
    return r;
  }
  reverse() {
    this._isReversed = !this._isReversed, this._isReversed ? this.setAnimation(`${this.currentAnimation}_reverse`) : this.setAnimation(this.currentAnimation.split("_reverse")[0]);
  }
  setAnimation(t, e = true) {
    var n, o, r;
    if (!this._animations.has(t)) {
      _.error(`Animation ${t} does not exist`);
      return;
    }
    this.textures = this._animations.get(t), this.currentAnimation = t;
    const i = (r = (o = (n = this.config) == null ? void 0 : n.animations) == null ? void 0 : o[t.split("_reverse")[0]]) == null ? void 0 : r.animationSpeed;
    i ? this.animationSpeed = i : this.animationSpeed = this.defaultAnimationSpeed, this.onAnimationChange.emit(t), e && this.play();
  }
  play() {
    var t;
    super.play(), (t = this.onAnimationStart) == null || t.emit();
  }
  stop() {
    var t;
    super.stop(), (t = this.onAnimationStop) == null || t.emit();
  }
  nextAnimation() {
    const t = ri(this._animations, this.currentAnimation) ?? ai(this._animations);
    t && this.setAnimation(t[0]);
  }
  previousAnimation() {
    const t = Ut(this._animations, this.currentAnimation) ?? Ht(this._animations);
    t && this.setAnimation(t[0]);
  }
  update(t) {
    this._paused || super.update(t);
  }
  _generateAnimations() {
    var e, i;
    this._animations = /* @__PURE__ */ new Map();
    const t = ((e = this.config) == null ? void 0 : e.animations) ?? {};
    if (t) {
      for (const [n, o] of Object.entries(t))
        this._animations.set(
          n,
          _ft.generateTexturesFromProps(
            n,
            o,
            this.defaultTexturePrefix,
            this.defaultSheet,
            this.defaultZeroPad
          )
        );
      if ((i = this.config) != null && i.reversible)
        for (const [n, o] of Object.entries(t)) {
          const r = _ft.generateTexturesFromProps(
            n,
            o,
            this.defaultTexturePrefix,
            this.defaultSheet,
            this.defaultZeroPad
          );
          r.reverse(), this._animations.set(`${n}_reverse`, r);
        }
    }
  }
  _added() {
    this.onLoop = () => {
      this.onAnimationLoop.emit();
    }, this.onComplete = () => {
      this.onAnimationComplete.emit();
    }, this.onFrameChange = () => {
      this.onAnimationFrameChange.emit();
    }, this.autoPlay && this.play();
  }
};
var In = class extends Container {
  constructor(t) {
    return super({ isRenderGroup: true }), this.config = t, this.onZoom = new u(), this.onZoomComplete = new u(), this.minX = 0, this.minY = 0, this._zooming = false, this._zoomLerp = 0.1, this._targetPivot = new Point(0, 0), this._targetScale = new Point(1, 1), this._lerp = 0, this._target = null, this._followOffset = new Point(0, 0), w(this), t && (this.container = t.container, this.addChild(this.container), t.minX && (this.minX = t.minX), t.maxX && (this.maxX = t.maxX), t.minY && (this.minY = t.minY), this.viewportWidth = t.viewportWidth ?? this.app.size.width, this.viewportHeight = t.viewportHeight ?? this.app.size.width, this.worldWidth = t.worldWidth ?? this.viewportWidth, this.worldHeight = t.worldHeight ?? this.viewportHeight, this.maxX = t.maxX ?? this.worldWidth - this.viewportWidth, this.maxY = t.maxY ?? this.worldHeight - this.viewportHeight), this._targetPivot.set(this.viewportWidth * 0.5, this.viewportHeight * 0.5), t.target && (this.target = t.target), this._lerp = 1, this.update(), t.lerp && (this.lerp = t.lerp), this;
  }
  get zooming() {
    return this._zooming;
  }
  get zoomLerp() {
    return this._zoomLerp;
  }
  get targetPivot() {
    return this._targetPivot;
  }
  get targetScale() {
    return this._targetPivot;
  }
  get lerp() {
    return this._lerp;
  }
  set lerp(t) {
    (t < 0 || t > 1) && _.error("Camera lerp value must be in the range [0, 1]"), this._lerp = Math.max(0, Math.min(t, 1));
  }
  get target() {
    return this._target;
  }
  set target(t) {
    this._target = t, this._target && this.focusOn(this._target);
  }
  get followOffset() {
    return this._followOffset;
  }
  set followOffset(t) {
    this._followOffset = I(t, true);
  }
  get app() {
    return v.getInstance();
  }
  follow(t, e) {
    e || (e = { x: 0, y: 0 }), this.followOffset = e, this.target = t;
  }
  pan(t, e) {
    let i = this.pivot.x + t, n = this.pivot.y + e;
    i = Math.max(this.minX, Math.min(i, this.maxX)), n = Math.max(this.minY, Math.min(n, this.maxY)), this._targetPivot.set(i, n);
  }
  zoom(t, e = 0.1) {
    this._zoomLerp = e, this._zooming = true, this._targetScale.set(t, t);
  }
  update() {
    this.updateZoom(), this._target && this.focusOn(this._target), this.updatePosition(this._zooming), this._zooming && Math.abs(this.scale.x - this._targetScale.x) < 1e-3 && Math.abs(this.scale.y - this._targetScale.y) < 1e-3 ? (this.onZoom.emit(this), this._zooming = false, this.scale.set(this._targetScale.x, this._targetScale.y), this.onZoomComplete.emit(this)) : this._zooming && this.onZoom.emit(this);
  }
  focusOn(t) {
    const e = t.getGlobalPosition(), i = this.toLocal(e), n = this.position.x / this.scale.x - this.viewportWidth / 2, o = this.position.y / this.scale.y - this.viewportHeight / 2, r = this.followOffset.x / this.scale.x, a = this.followOffset.y / this.scale.y;
    this._targetPivot.x = (i.x * this.scale.x + this.viewportWidth / 2) * (1 / this.scale.x) + r;
    const h = this.viewportWidth / this.scale.x / 2 + n + this.minX - r, c = this.worldWidth - this.viewportWidth / this.scale.x / 2 + n + this.maxX + r;
    this._targetPivot.x < h ? this._targetPivot.x = h : this._targetPivot.x > c && (this._targetPivot.x = c), this._targetPivot.y = (i.y * this.scale.y + this.viewportHeight / 2) * (1 / this.scale.y) + a;
    const l = this.viewportHeight / this.scale.y / 2 + o + this.minY - a, d = this.worldHeight - this.viewportHeight / this.scale.y / 2 + o + this.maxY - a;
    this._targetPivot.y < l ? this._targetPivot.y = l : this._targetPivot.y > d && (this._targetPivot.y = d);
  }
  updateZoom() {
    const t = this.scale.x, e = this.scale.y, i = t + this._zoomLerp * (this._targetScale.x - t), n = e + this._zoomLerp * (this._targetScale.y - e);
    this.scale.set(Math.max(0, i), Math.max(0, n));
  }
  updatePosition(t = false) {
    if (this.lerp > 0 && !t) {
      const e = this.pivot.x, i = this.pivot.y, n = e + this.lerp * (this._targetPivot.x - e), o = i + this.lerp * (this._targetPivot.y - i);
      this.pivot.set(n, o);
    } else
      this.pivot.set(this._targetPivot.x, this._targetPivot.y);
    this.position.set(this.viewportWidth / 2, this.viewportHeight / 2);
  }
};
var Rn = class {
  constructor(t, e) {
    this.camera = t, this.interactiveArea = e, this.dragging = false, this.previousPointerPosition = null, w(this), this.camera = t, this.interactiveArea = e, this.app.keyboard.onKeyDown().connect(this.handleKeyDown), this.interactiveArea.on("pointerdown", this.onPointerDown.bind(this)), this.interactiveArea.on("pointermove", this.onPointerMove.bind(this)), this.app.stage.on("pointerup", this.onPointerUp.bind(this)), this.app.stage.on("pointerupoutside", this.onPointerUp.bind(this)), this.interactiveArea.on("touchstart", this.onPointerDown.bind(this)), this.interactiveArea.on("touchmove", this.onPointerMove.bind(this)), this.interactiveArea.on("touchend", this.onPointerUp.bind(this));
  }
  get app() {
    return v.getInstance();
  }
  destroy() {
    this.interactiveArea.removeAllListeners(), this.app.stage.off("pointerup", this.onPointerUp.bind(this)), this.app.stage.off("pointerupoutside", this.onPointerUp.bind(this));
  }
  handleKeyDown(t) {
    switch (t.event.key) {
      case "ArrowUp":
        this.camera.pan(0, -10);
        break;
      case "ArrowDown":
        this.camera.pan(0, 10);
        break;
      case "ArrowLeft":
        this.camera.pan(-10, 0);
        break;
      case "ArrowRight":
        this.camera.pan(10, 0);
        break;
      case "+":
        this.camera.zoom(1.1);
        break;
      case "-":
        this.camera.zoom(1 / 1.1);
        break;
    }
  }
  onPointerDown(t) {
    this.dragging = true, this.previousPointerPosition = this.getEventPosition(t);
  }
  onPointerMove(t) {
    if (!this.dragging || !this.previousPointerPosition) return;
    const e = this.getEventPosition(t), i = e.x - this.previousPointerPosition.x, n = e.y - this.previousPointerPosition.y;
    this.camera.pan(i, n), this.previousPointerPosition = e;
  }
  onPointerUp() {
    this.dragging = false, this.previousPointerPosition = null;
  }
  getEventPosition(t) {
    return t instanceof TouchEvent ? new Point(t.touches[0].clientX, t.touches[0].clientY) : new Point(t.clientX, t.clientY);
  }
};
var ls = K(vt());
var cs = class extends ls {
  constructor(t) {
    super(), w(this);
    let e = t == null ? void 0 : t.data;
    if (this.paused = (t == null ? void 0 : t.paused) === true, typeof e == "string") {
      let i = e.slice(-5);
      i !== ".json" && i !== ".skel" ? i = ".json" : e = e.substring(0, e.length - 5), e = { skeleton: e + i, atlas: e + ".atlas" };
    }
    this.spine = window.Spine.from(e), this.add.existing(this.spine), t && (t.autoUpdate !== void 0 && (this.spine.autoUpdate = t.autoUpdate), t.animationName && this.setAnimation(t.animationName, t.loop, t.trackIndex ?? 0)), this.addSignalConnection(this.app.actions("toggle_pause").connect(this.togglePause));
  }
  get app() {
    return v.getInstance();
  }
  get animationNames() {
    return this.spine.state.data.skeletonData.animations.map((t) => t.name);
  }
  getCurrentAnimation(t = 0) {
    var e, i;
    return ((i = (e = this.spine.state.getCurrent(t)) == null ? void 0 : e.animation) == null ? void 0 : i.name) || "";
  }
  setAnimation(t, e = false, i = 0) {
    this.spine.state.setAnimation(i, t, e);
  }
  togglePause() {
    this.paused = !this.paused, this.spine.autoUpdate = !this.paused;
  }
};
var be = [
  "textures",
  "sounds",
  "actions",
  "cursor",
  "disabledCursor",
  "sheet",
  "enabled"
];
var us = Vt(Re(K(vt())));
var ds = class extends us {
  /**
   * @constructor
   * @param {Partial<ButtonConfig>} config - The configuration for the button.
   */
  constructor(t) {
    super(), this.onDown = new u(), this.onUp = new u(), this.onUpOutside = new u(), this.onOut = new u(), this.onOver = new u(), this.onClick = new u(), this.onEnabled = new u(), this.onDisabled = new u(), this.onKeyboardEvent = new u(), this.onDestroy = new u(), this._isDownCallbacks = /* @__PURE__ */ new Map(), this._isDownListenerAdded = false, w(this), this.config = Object.assign(
      {
        id: "button",
        textures: { default: "" },
        sheet: void 0,
        enabled: true,
        cursor: "default",
        disabledCursor: "not-allowed"
      },
      t
    ), this.id = this.config.id, this.view = this.add.sprite({ asset: this.config.textures.default, sheet: this.config.sheet, anchor: 0.5 }), this.cursor = this.config.cursor, this.enabled = t.enabled !== false, this.addSignalConnection(
      this.onInteraction("pointerover").connect(this.handlePointerOver, -1),
      this.onInteraction("pointerout").connect(this.handlePointerOut, -1),
      this.onInteraction("pointerup").connect(this.handlePointerUp, -1),
      this.onInteraction("click").connect(this.handleClick, -1),
      this.onInteraction("tap").connect(this.handleClick, -1),
      this.onInteraction("pointerdown").connect(this.handlePointerDown, -1)
    );
  }
  /**
   * @description Sets the enabled state of the button.
   * @param {boolean} enabled - Whether the button is enabled.
   */
  set enabled(t) {
    this._enabled !== t && (this._enabled = t, this.cursor = this._enabled ? this.config.cursor : this.config.disabledCursor, this.focusEnabled = t, this._enabled ? (this.view.texture = this.make.texture({
      asset: this.config.textures.default,
      sheet: this.config.sheet
    }), this.onEnabled.emit()) : (this.view.texture = this.make.texture({
      asset: this.config.textures.disabled || this.config.textures.default,
      sheet: this.config.sheet
    }), this.onDisabled.emit()));
  }
  get app() {
    return v.getInstance();
  }
  destroy(t) {
    this.onDestroy.emit(), super.destroy(t);
  }
  focusOut() {
    super.focusOut(), this.isDown = false, this.isOver = false;
  }
  blur() {
    super.blur(), this.isDown = false, this.isOver = false;
  }
  getFocusArea() {
    return this.view.getBounds().clone();
  }
  getFocusPosition() {
    return [-this.width * 0.5, -this.height * 0.5];
  }
  addIsDownCallback(t, e) {
    this._isDownCallbacks.set(t, e), this._checkIsDownCallbacks();
  }
  removeIsDownCallback(t) {
    this._isDownCallbacks.delete(t);
  }
  setTexture(t, e) {
    this.config.textures[t] = e, t === "default" && (this.view.texture = this.make.texture({
      asset: this.config.textures.default,
      sheet: this.config.sheet
    }));
  }
  /**
   * @description Handles the pointer over event.
   * Sets the texture of the button to the hover texture and emits the onOver event.
   */
  handlePointerOver() {
    var t, e;
    this._enabled && (this.isOver || (this.isOver = true), !this.isDown && (this.view.texture = this.make.texture({
      asset: this.config.textures.hover || this.config.textures.default,
      sheet: this.config.sheet
    }), this.onOver.emit(), (t = this.config.sounds) != null && t.hover && this.app.audio.play(this.config.sounds.hover, "sfx"), (e = this.config.actions) != null && e.hover && this._doAction(this.config.actions.hover)));
  }
  /**
   * @description Handles the pointer out event.
   * Sets the texture of the button to the default texture and emits the onOut event.
   */
  handlePointerOut(t) {
    this.isOver = false, this._enabled && (this.isDown || (this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet }), this.onOut.emit()));
  }
  /**
   * @description Handles the pointer down event.
   * Sets the isDown property to true and changes the texture of the button.
   */
  handlePointerDown(t) {
    var e, i, n;
    !this._enabled && !this.isKeyDown || !this.isDown && this._pointerId === void 0 && (this._pointerId = t.pointerId, window.removeEventListener("pointerup", this.handlePointerUpOutside), this.off("pointerupoutside", this.handlePointerUpOutside), window.addEventListener("pointerup", this.handlePointerUpOutside), this.on("pointerupoutside", this.handlePointerUpOutside), this.isDown = true, this.view.texture = this.make.texture({
      asset: this.config.textures.active || this.config.textures.hover || this.config.textures.default,
      sheet: this.config.sheet
    }), this.onDown.emit(), (e = this.config.sounds) != null && e.down && this.app.audio.play(this.config.sounds.down, "sfx"), (i = this.config.actions) != null && i.down && (n = this.config.actions) != null && n.down && this._doAction(this.config.actions.down));
  }
  /**
   * @description Handles the pointer up event.
   * Removes the keyup event listener and emits the onPress and onUp events.
   */
  handlePointerUp(t) {
    var e, i;
    !this._enabled || !this.isOver || t.pointerId !== this._pointerId || (window.removeEventListener("pointerup", this.handlePointerUpOutside), this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet }), this.onUp.emit(), (e = this.config.sounds) != null && e.up && this.app.audio.play(this.config.sounds.up, "sfx"), (i = this.config.actions) != null && i.up && this._doAction(this.config.actions.up), this._pointerId = void 0);
  }
  handleClick() {
    var t, e;
    this.isDown = false, this.onClick.emit(), (t = this.config.sounds) != null && t.click && this.app.audio.play(this.config.sounds.click, "sfx"), (e = this.config.actions) != null && e.click && this._doAction(this.config.actions.click);
  }
  /**
   * @description Handles the pointer up event.
   */
  handlePointerUpOutside(t) {
    var e, i;
    !this._enabled || t.pointerId !== this._pointerId || (window.removeEventListener("pointerup", this.handlePointerUpOutside), this.off("pointerupoutside", this.handlePointerUpOutside), this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet }), this.isDown = false, this.isOver = false, this.onUpOutside.emit(), (e = this.config.sounds) != null && e.up && this.app.audio.play(this.config.sounds.up, "sfx"), (i = this.config.actions) != null && i.up && this._doAction(this.config.actions.up), this._pointerId = void 0);
  }
  _doAction(t) {
    typeof t == "function" ? t() : (t.data.button || (t.data.button = this), this.app.action(t.id, t.data));
  }
  _checkIsDownCallbacks() {
    !this._isDownListenerAdded && this._isDownCallbacks.size > 0 ? (this._isDownListenerAdded = true, this.app.ticker.add(this._handleIsDownCallbacks)) : (this.app.ticker.remove(this._handleIsDownCallbacks), this._isDownListenerAdded = false);
  }
  _handleIsDownCallbacks() {
    this.isDown && this._isDownCallbacks.forEach((t) => {
      t();
    });
  }
};
var fs = K(vt());
var xe = [
  "width",
  "height",
  "bindTo",
  "bindToAppSize",
  "gap",
  "flexWrap",
  "flexDirection",
  "alignItems",
  "justifyContent"
];
var ps = {
  bindTo: null,
  width: 0,
  height: 0,
  gap: 0,
  flexWrap: "nowrap",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  padding: 0
};
var Et = class _Et extends fs {
  constructor(t = {}) {
    super(), this.onLayoutComplete = new u(), this.debug = false, this.paddingLeft = 0, this.paddingRight = 0, this.paddingTop = 0, this.paddingBottom = 0, this._childMap = /* @__PURE__ */ new Map(), this._reparentAddedChild = true, this._flexChildren = [], this.removeChildren = () => {
      const e = this.flexChildren;
      return this.removeChild(...e), e;
    }, this.removeChildAt = (e) => this.removeChild(this.flexChildren[e]), this.addChildAt = (e, i) => {
      const n = this.add.existing(e);
      return this.setChildIndex(n, i), n;
    }, this.setChildIndex = (e, i) => {
      const n = this._childMap.get(e);
      n && (super.setChildIndex(n, i), this.setFlexChildren(), this.layout());
    }, this.getChildIndex = (e) => this._childMap.has(e) ? super.getChildIndex(e.parent) : super.getChildIndex(e), this.getChildAt = (e) => {
      var i;
      return (i = super.getChildAt(e)) == null ? void 0 : i.getChildAt(0);
    }, w(this), this.config = Object.assign({ ...ps }, t), this.on("added", this._added), this.on("childAdded", this.handleChildAdded), this.on("childRemoved", this.handleChildRemoved), this.layout();
  }
  get flexChildren() {
    return this._flexChildren;
  }
  get gap() {
    return this.config.gap;
  }
  set gap(t) {
    this.config.gap = t, this.layout();
  }
  get flexWrap() {
    return this.config.flexWrap;
  }
  set flexWrap(t) {
    this.config.flexWrap = t, this.layout();
  }
  get flexDirection() {
    return this.config.flexDirection;
  }
  set flexDirection(t) {
    this.config.flexDirection = t, this.layout();
  }
  get alignItems() {
    return this.config.alignItems;
  }
  set alignItems(t) {
    this.config.alignItems = t, this.layout();
  }
  get justifyContent() {
    return this.config.justifyContent;
  }
  set justifyContent(t) {
    this.config.justifyContent = t, this.layout();
  }
  get containerHeight() {
    return this.config.height;
  }
  set containerHeight(t) {
    this.config.height = t, this.layout();
  }
  get containerWidth() {
    return this.config.width;
  }
  set containerWidth(t) {
    this.config.width = t, this.layout();
  }
  get size() {
    return { width: this.config.width, height: this.config.height };
  }
  set size(t) {
    const { x: e, y: i } = I(t);
    this.config.width = e, this.config.height = i, this.layout();
  }
  /**
   * Get the application instance.
   */
  get app() {
    return v.getInstance();
  }
  destroy(t) {
    this.off("childAdded", this.handleChildAdded), this.off("childRemoved", this.handleChildRemoved), super.destroy(t);
  }
  /**
   * Removes one or more children from the container
   * Override because we need to ensure it returns the proper re-parented children
   * @param children
   */
  removeChild(...t) {
    if (this._reparentAddedChild)
      t.forEach((e) => {
        const i = this._childMap.get(e);
        if (i)
          return super.removeChild(i);
      });
    else
      return super.removeChild(...t);
    return t[0];
  }
  getChildByLabel(t, e = true) {
    for (let i = 0; i < this.flexChildren.length; i++) {
      const n = this.flexChildren[i];
      if (n.label) {
        if (t instanceof RegExp) {
          if (t.test(n.label))
            return n;
        } else if (n.label === t)
          return n;
      }
      if (e) {
        const o = n.getChildByLabel(t, e);
        if (o)
          return o;
      }
    }
    return null;
  }
  /**
   * Public method to manually trigger a layout
   */
  layout() {
    this.app.ticker.addOnce(this._layout, this);
  }
  resize() {
    this.layout();
  }
  update() {
  }
  added() {
  }
  /**
   * Ensures we delete the child from the map when it's removed
   * @protected
   */
  handleChildRemoved(t) {
    this._reparentAddedChild && (this.deleteChild(t) || (t = t.getChildAt(0), this.deleteChild(t)));
  }
  /**
   * Deletes a child from the map
   * @param {Container} child
   * @returns {boolean}
   * @protected
   */
  deleteChild(t) {
    if (this._childMap.has(t)) {
      if (t instanceof _Et)
        try {
          t.onLayoutComplete.disconnect(this.layout);
        } catch (i) {
          _.warn("FlexContainer:: Error disconnecting signal from removed child"), console.warn(i);
        }
      return this._childMap.delete(t), this.setFlexChildren(), this.layout(), true;
    }
    return false;
  }
  /**
   * Sorts the children in the container
   * Needed because we need to ensure re-parented children are sorted by their actual index in the container
   * @protected
   */
  setFlexChildren() {
    this._flexChildren = Array.from(this._childMap.keys()), this._flexChildren.sort((t, e) => this.getChildIndex(t) - this.getChildIndex(e)), this.cleanup();
  }
  /**
   * Ensure we don't leave empty containers after setting child indices or adding / removing children
   * @protected
   */
  cleanup() {
    this.flexChildren.length !== this.children.length && this.children.forEach((t) => {
      var e;
      (e = t == null ? void 0 : t.children) != null && e.length || super.removeChild(t);
    });
  }
  /**
   * Re-parent a child to account for e.g. sprite that are added with anchors
   * @param child
   * @protected
   */
  handleChildAdded(t) {
    if (!this._reparentAddedChild) return;
    this._reparentAddedChild = false;
    const e = this.add.container();
    e.add.existing(t);
    const i = e.getLocalBounds();
    i.x < 0 && (e.pivot.x = i.x), i.y < 0 && (e.pivot.y = i.y), t instanceof _Et && this.addSignalConnection(t.onLayoutComplete.connect(this.layout)), this._childMap.set(t, e), this.setFlexChildren(), this._reparentAddedChild = true, this.app.render(), this.layout();
  }
  /**
   * Lay out the children according to the settings
   * Tries to follow the CSS Flexbox model as closely as possible
   * @private
   */
  _layout() {
    var Yt, Nt;
    this.config.bindTo && (this.config.width = ((Yt = this.config.bindTo) == null ? void 0 : Yt.width) ?? 0, this.config.height = ((Nt = this.config.bindTo) == null ? void 0 : Nt.height) ?? 0), this.config.bindToAppSize && (this.config.width = this.app.size.width, this.config.height = this.app.size.height);
    const t = ["flex-start"];
    let { width: e, height: i } = this.config;
    const { gap: n, flexDirection: o, flexWrap: r, alignItems: a, justifyContent: h } = this.config;
    this.config.flexDirection === "row" && this.config.flexWrap === "nowrap" && t.includes(this.config.justifyContent) ? e = 1 / 0 : this.config.flexDirection === "column" && this.config.flexWrap === "nowrap" && t.includes(this.config.justifyContent) && (i = 1 / 0);
    let c = [], l = 0, d = 0, p = 0, U = 0, H = 0, z = 0;
    const f = [], F = this.children.filter(Boolean);
    let G = [], tt = 0;
    const Ke = (g, D, A) => o === "row" && D + g.width + n > e || o === "column" && A + g.height + n > i, je = () => {
      o === "row" ? H += p + n : z += U + n, l = 0, d = 0, p = 0, U = 0;
    }, He = (g) => {
      o === "row" ? (l += g.width + n, p = Math.max(p, g.height)) : (d += g.height + n, U = Math.max(U, g.width));
    }, Ge = (g) => o === "row" ? g : z, Ve = (g) => o === "column" ? g : H, Xt = (g, D, A, V) => {
      const S = (V === "row" ? e : i) - (A - D);
      g.forEach(({ index: Zt }, Dt) => {
        let j = 0;
        switch (h) {
          case "flex-start":
            break;
          case "flex-end":
            j = S;
            break;
          case "center":
            j = S / 2;
            break;
          case "space-between":
            j = g.length > 1 ? Dt * (S / (g.length - 1)) : 0;
            break;
          case "space-around":
            j = S / g.length * Dt + S / (2 * g.length);
            break;
          case "space-evenly":
            j = S / (g.length + 1) * (Dt + 1);
            break;
        }
        V === "row" ? f[Zt].x += j : f[Zt].y += j;
      });
    }, Xe = (g, D) => {
      g.forEach((A, V) => {
        const S = D[V];
        if (S)
          if (o === "row")
            switch (a) {
              case "flex-start":
                break;
              case "flex-end":
                A.y += p - S.height;
                break;
              case "center":
                A.y += (p - S.height) / 2;
                break;
            }
          else
            switch (a) {
              case "flex-start":
                break;
              case "flex-end":
                A.x = e ? e - S.width : -S.width;
                break;
              case "center":
                A.x += (e - S.width) / 2;
                break;
            }
      });
    };
    F.forEach((g, D) => {
      if (!g) return;
      const A = g;
      r === "wrap" && Ke(A, l, d) && (Xt(G, tt, o === "column" ? d - n : l - n, o), je(), G = [], tt = l), G.push({ index: D, width: A.width, height: A.height }), f[D] = { x: Ge(l), y: Ve(d) }, He(A);
    }), Xt(G, tt, o === "column" ? d - n : l - n, o), Xe(f, F), c = f, F.forEach((g, D) => {
      const A = g, { x: V, y: S } = c[D] || { x: 0, y: 0 };
      A.position.set(V, S);
    });
    const qt = this.children.reduce((g, D) => Math.max(g, D.y + D.height), 0);
    this.children.forEach((g) => {
      if (this.config.flexDirection === "row")
        switch (this.config.alignItems) {
          case "center":
            g.y -= (qt - i) * 0.5;
            break;
          case "flex-end":
            g.y += i - qt;
            break;
        }
    }), this.onLayoutComplete.emit();
  }
  _added() {
    this.addSignalConnection(this.app.onResize.connect(this.layout, 0)), this.added();
  }
};
var Ce = ["debug", "padding", "size", "useAppSize"];
var _s = K(vt());
var Lt = class _Lt extends _s {
  constructor(t) {
    super(), this.settingsMap = /* @__PURE__ */ new Map(), this._childMap = /* @__PURE__ */ new Map(), this._reparentAddedChild = true, this._disableAddChildError = false, this._canvasChildren = [], this.removeChildren = (e, i) => this._inner.removeChildren(e, i), this.removeChildAt = (e) => this._inner.removeChildAt(e), this.addChildAt = (e, i) => {
      const n = this._inner.add.existing(e);
      return this._inner.setChildIndex(n, i), n;
    }, this.setChildIndex = (e, i) => {
      this._inner.setChildIndex(e, i), this.layout();
    }, this.getChildIndex = (e) => this._inner.getChildIndex(e), this.getChildAt = (e) => {
      var i;
      return (i = this._inner.getChildAt(e)) == null ? void 0 : i.getChildAt(0);
    }, w(this), this.config = {
      debug: t.debug === true,
      padding: bt((t == null ? void 0 : t.padding) ?? 0),
      size: t.size !== void 0 ? Jt(t.size) : { width: 0, height: 0 },
      useAppSize: t.useAppSize === true
    }, this._disableAddChildError = true, this._inner = this.add.container({ x: this.config.padding.left, y: this.config.padding.top }), this._disableAddChildError = false, this.addSignalConnection(this.app.onResize.connect(this.resize)), this.on("childRemoved", this._childRemoved), this.once("added", this._added);
  }
  get bounds() {
    return this._bounds || (this._bounds = this.getBounds()), this._bounds;
  }
  get canvasChildren() {
    return this._canvasChildren;
  }
  /**
   * Get the application instance.
   */
  get app() {
    return v.getInstance();
  }
  set size(t) {
    this.config.useAppSize = false, this.config.size = t === void 0 ? { width: 0, height: 0 } : Jt(t), this.resize();
  }
  set padding(t) {
    this.config.padding = bt(t), this._inner.position.set(this.config.padding.left, this.config.padding.top), this.resize();
  }
  static isFlexContainer(t) {
    return (t == null ? void 0 : t.flexChildren) !== void 0;
  }
  addChild(...t) {
    return this._disableAddChildError ? super.addChild(...t) : (_.warn(
      "UICanvas:: You probably shouldn't add children directly to UICanvas. Use .addElement(child, settings) instead, so you can pass alignment settings.",
      t,
      "will be added using the default 'top left' alignment'."
    ), this._inner.addChild(...t));
  }
  /**
   * Removes one or more children from the container
   * Override because we need to ensure it returns the proper re-parented children
   */
  removeChild(...t) {
    if (this._reparentAddedChild)
      t.forEach((e) => {
        const i = this._childMap.get(e);
        if (i)
          return this._inner.removeChild(i);
      });
    else
      return this._inner.removeChild(...t);
    return t[0];
  }
  resize() {
    const t = this.config.useAppSize ? this.app.size : this.config.size;
    this._displayBounds = this.__calculateBounds(t), this._outerBounds = this.__calculateOuterBounds(t), this.layout(), this.config.useAppSize && this.position.set(-t.width * 0.5, -t.height * 0.5), this.config.debug && this.app.ticker.addOnce(this.drawDebug);
  }
  layout() {
    this._inner.children.forEach((t) => {
      const e = t, i = this.settingsMap.get(e);
      i && this.applySettings(e, i);
    });
  }
  addElement(t, e) {
    const i = this._inner.add.container();
    i.addChild(t);
    const n = i.getLocalBounds();
    return n.x < 0 && (i.pivot.x = n.x), n.y < 0 && (i.pivot.y = n.y), t != null && t.flexChildren && this.addSignalConnection(t.onLayoutComplete.connect(this.layout)), this.settingsMap.set(i, {
      align: (e == null ? void 0 : e.align) ?? "top left",
      padding: e != null && e.padding ? bt(e.padding) : { top: 0, left: 0, bottom: 0, right: 0 }
    }), this._childMap.set(t, i), this._canvasChildren = Array.from(this._childMap.keys()), this.resize(), t;
  }
  /**
   * Ensure we don't leave empty containers after setting child indices or adding / removing children
   * @protected
   */
  cleanup() {
    this.canvasChildren.length !== this.children.length && this.children.forEach((t) => {
      var e;
      this.config.debug && t === this._debugGraphics || (e = t == null ? void 0 : t.children) != null && e.length || super.removeChild(t);
    });
  }
  __calculateBounds(t) {
    return new Rectangle(
      0,
      0,
      t.width - this.config.padding.left - this.config.padding.right,
      t.height - this.config.padding.top - this.config.padding.bottom
    );
  }
  __calculateOuterBounds(t) {
    return new Rectangle(0, 0, t.width, t.height);
  }
  _childRemoved(t) {
    this.settingsMap.delete(t), this._childMap.delete(t), this._canvasChildren = Array.from(this._childMap.keys());
  }
  _added() {
    this.layout();
  }
  applySettings(t, e) {
    if (!e) return;
    const i = this._displayBounds.width, n = this._displayBounds.height, o = t.getChildAt(0), r = _Lt.isFlexContainer(o) && o.containerWidth || t.width, a = _Lt.isFlexContainer(o) && o.containerHeight || t.height;
    switch (e.align) {
      case "top right":
        t.x = i - r, t.y = 0;
        break;
      case "top left":
        t.x = 0, t.y = 0;
        break;
      case "top center":
      case "top":
        t.x = (i - r) / 2, t.y = 0;
        break;
      case "bottom right":
        t.x = i - r, t.y = n - a;
        break;
      case "bottom left":
        t.x = 0, t.y = n - a;
        break;
      case "bottom center":
      case "bottom":
        t.x = (i - t.width) / 2, t.y = n - a;
        break;
      case "left top":
        t.x = 0, t.y = 0;
        break;
      case "left bottom":
        t.x = 0, t.y = n - a;
        break;
      case "left center":
      case "left":
        t.x = 0, t.y = (n - a) / 2;
        break;
      case "right top":
        t.x = i - r, t.y = 0;
        break;
      case "right bottom":
        t.x = i, t.y = n;
        break;
      case "right center":
      case "right":
        t.x = i - r, t.y = (n - a) / 2;
        break;
      case "center":
        t.x = (i - r) / 2, t.y = (n - a) / 2;
        break;
    }
    t.x += wt(e.padding.left, i) - wt(e.padding.right, i), t.y += wt(e.padding.top, n) - wt(e.padding.bottom, n);
  }
  drawDebug() {
    this._debugGraphics || (this._disableAddChildError = true, this._debugGraphics = this._inner.add.graphics(), this._disableAddChildError = false), this._debugGraphics.clear().rect(0, 0, this._displayBounds.width, this._displayBounds.height).stroke({
      width: 1,
      color: 16711680,
      alpha: 0.5,
      pixelLine: true
    }).rect(-this.config.padding.left, -this.config.padding.top, this._outerBounds.width, this._outerBounds.height).stroke({
      width: 1,
      color: 16711680,
      alpha: 0.5,
      pixelLine: true
    }).moveTo(this._displayBounds.width / 2, this._displayBounds.height / 2 - 10).lineTo(this._displayBounds.width / 2, this._displayBounds.height / 2 + 10).stroke({
      width: 1,
      color: 16711680,
      alpha: 0.5,
      pixelLine: true
    }).moveTo(this._displayBounds.width / 2 - 10, this._displayBounds.height / 2).lineTo(this._displayBounds.width / 2 + 10, this._displayBounds.height / 2).stroke({
      width: 1,
      color: 16711680,
      alpha: 0.5,
      pixelLine: true
    });
  }
};
var gs = {
  color: 0,
  alpha: 0.75
};
var ms = { backing: true, closeOnEscape: true, closeOnPointerDownOutside: true };
var ct = class _ct extends B {
  /**
   * Create a new Popup
   * @param id - The unique identifier for the popup
   * @param config - The configuration for the popup
   */
  constructor(t, e = {}) {
    super(), this.id = t, this.isShowing = false, this.config = Object.assign({ id: t, ...ms }, e), this._initialize();
  }
  get data() {
    return this.config.data;
  }
  /**
   * Create a backing for the popup
   * @param config - The configuration for the backing
   * @param size - The size of the backing
   * @returns The backing container
   */
  static makeBacking(t, e) {
    let i = {};
    typeof t == "object" && (i = t);
    const n = Object.assign({ ...gs }, i);
    if (_ct.BACKING_TEXTURE === void 0) {
      const a = new Graphics();
      a.rect(0, 0, 100, 100).fill("white"), _ct.BACKING_TEXTURE = v.getInstance().renderer.generateTexture(a);
    }
    const o = new B();
    o.sortableChildren = false;
    const r = o.addChild(new Sprite(_ct.BACKING_TEXTURE));
    return r.anchor.set(0.5), r.alpha = n.alpha, r.tint = n.color, r.setSize(e.width, e.height), o;
  }
  initialize() {
  }
  beforeHide() {
    this.app.focus.removeFocusLayer(this.id);
  }
  destroy(t) {
    this.app.focus.removeFocusLayer(this.id), super.destroy(t);
  }
  async hide() {
    return this.visible = false, Promise.resolve();
  }
  async show() {
    return this.resize(), this.visible = true, Promise.resolve();
  }
  async start() {
  }
  afterShow() {
    this.firstFocusableEntity && (this.app.focus.add(this.firstFocusableEntity, this.id, true), this.app.focus.setFocus(this.firstFocusableEntity));
  }
  /**
   * End the popup
   */
  end() {
  }
  async close() {
    this.app.popups.hidePopup(this.id, this.config.data);
  }
  resize() {
    var t;
    (t = this.backing) == null || t.setSize(this.app.size.width, this.app.size.height);
  }
  /**
   * Initialize the popup
   * @private
   */
  _initialize() {
    this.app.focus.addFocusLayer(this.id, false), this.config.backing && (this.backing = this.add.existing(_ct.makeBacking(this.config.backing, this.app.size)), this.backing.eventMode = "static", this.config.closeOnPointerDownOutside && (this.backing.once("click", this.close), this.backing.once("tap", this.close))), this.view = this.add.container(), this.view.eventMode = "static";
  }
};
var Y = {
  value: "",
  type: "text",
  fixed: true,
  pattern: "",
  debug: false,
  minWidth: 200,
  padding: { top: 0, left: 0, bottom: 0, right: 0 },
  blurOnEnter: true,
  style: {
    fontFamily: "Arial",
    fill: "#000000",
    fontSize: 20,
    fontWeight: "bold"
  },
  bg: {
    radius: 5,
    fill: { color: 16777215 },
    stroke: { width: 1, color: 0 }
  },
  placeholder: {},
  selection: { color: 65280 },
  caret: {
    color: 0,
    alpha: 0.8
  },
  focusOverlay: {
    activeFilter: false,
    scale: 1,
    marginTop: 60
  }
};
var ys = ["text", "password", "number", "email", "tel", "url"];
var Ue = class _Ue extends Vt(Re(K(B))) {
  constructor(t, e = false, i = null) {
    var n, o, r, a;
    if (super({ autoUpdate: true, autoResize: !e }), this.isClone = e, this.clone = i, this.onEnter = new u(), this.onChange = new u(), this.onError = new u(), this._lastWidth = 0, this._lastHeight = 0, this._caretPosition = -1, this._value = "", this.options = {
      ...Y,
      ...t,
      style: {
        ...Y.style,
        ...(t == null ? void 0 : t.style) ?? {}
      },
      padding: bt(t.padding ?? Y.padding),
      bg: {
        ...Y.bg,
        ...t.bg ?? {}
      },
      focusOverlay: {
        ...Y.focusOverlay,
        ...t.focusOverlay ?? {}
      }
    }, this.options.placeholder || (this.options.placeholder = {
      color: Number((n = this.options.style) == null ? void 0 : n.fill) ?? 6710886
    }), this._inner = this.add.container(), this.addBg(), this._inputContainer = this._inner.add.container({ y: -2 }), this.addSelection(), this.addCaret(), this.addInput(), this.addPlaceholder(), this.placeholder.text = this.options.placeholder.text || `Enter ${this.options.type}`, this.input.eventMode = this.placeholder.eventMode = "none", Ot && this.addSignalConnection(this.onInteraction("pointertap").connect(this.handleClick, -1)), this.addSignalConnection(this.onInteraction("click").connect(this.handleClick, -1)), this.options.fixed) {
      const h = this.isClone ? ((a = (r = (o = this.clone) == null ? void 0 : o.options) == null ? void 0 : r.focusOverlay) == null ? void 0 : a.scale) ?? 1 : 1;
      this._mask = this._inner.add.graphics().rect(
        0,
        0,
        this.bg.width * h - this.options.padding.left - this.options.padding.right,
        this.bg.height * h - this.options.padding.top - this.options.padding.bottom
      ).fill({ color: 0 }), this._inputContainer.mask = this._mask;
    }
  }
  get caretPosition() {
    return this._caretPosition;
  }
  get selectionRect() {
    return this._selectionRect;
  }
  set regex(t) {
    this._regex = t;
  }
  get isValid() {
    let t = false;
    if (this.domElement)
      if (this._regex)
        t = this._regex.test(this._value);
      else {
        if (this.options.type === "text")
          return true;
        this.domElement.required = true, t = this.domElement.checkValidity(), this.domElement.required = false;
      }
    return t;
  }
  get value() {
    var t;
    return ((t = this._value) == null ? void 0 : t.trim()) ?? "";
  }
  set value(t) {
    if (this.domElement) {
      this.domElement.value = t;
      const e = new Event("input", {
        bubbles: true,
        cancelable: true
      });
      this.domElement.dispatchEvent(e);
    } else
      this._value = t, this.input.text = t;
  }
  resize() {
    super.resize(), this.cloneOverlay && this._positionCloneOverlay();
  }
  resetBg() {
    this.drawBg();
  }
  added() {
    super.added(), this.isClone && this.showCursor();
  }
  handleClick(t) {
    var i, n;
    if ((i = t == null ? void 0 : t.originalEvent) != null && i.key)
      return;
    clearTimeout(this._focusTimer), clearTimeout(this._pointerDownTimer);
    const e = t ? pi(this.input, t) : ((n = this.input.text) == null ? void 0 : n.length) ?? 0;
    this.createDomElement(e);
  }
  focusIn() {
    this.handleClick();
  }
  _focusDomElement(t) {
    di ? this._triggerFocusAndSelection(t) : this._focusTimer = setTimeout(() => {
      this._triggerFocusAndSelection(t);
    }, 100);
  }
  _triggerFocusAndSelection(t) {
    var e, i;
    if (this.domElement) {
      try {
        this.domElement.focus(), this.domElement.click(), t === void 0 ? this.domElement.selectionStart = (i = (e = this.domElement) == null ? void 0 : e.value) == null ? void 0 : i.length : this.domElement.setSelectionRange(t, t, "none");
      } catch {
      }
      this._updateCaretAndSelection();
    }
  }
  _checkPointerDownOutside(t) {
    const e = this.toLocal(t.data.global);
    this.getBounds().rectangle.contains(e.x, e.y) ? this.focusIn() : this.focusOut();
  }
  focusOut() {
    var t;
    (t = this.domElement) == null || t.blur();
  }
  update() {
    var o, r, a, h, c;
    this.bg.x = 0, this.bg.y = 0;
    const t = this.input.getLocalBounds().y + this.input.style.fontSize + this.options.padding.top + this.options.padding.bottom, e = this.options.fixed ? this.options.minWidth : Math.max(this.options.minWidth, this.input.width) + this.options.padding.left + this.options.padding.right, i = this.options.minWidth - e + this.options.padding.left + this.options.padding.right, n = e - this.options.padding.left - this.options.padding.right;
    switch (this.input.style.align) {
      case "center":
        if (this.input.x = e / 2 - this.input.width / 2, this.placeholder.x = e / 2 - this.placeholder.width / 2, this._inner.x = i >= 0 ? 0 : i / 2, this.options.fixed) {
          const l = this.input.width - n;
          l > 0 && (this.input.x -= l / 2);
        }
        break;
      case "right":
        this.input.x = e - this.options.padding.right - this.input.width, this.placeholder.x = e - this.options.padding.right - this.placeholder.width, this._inner.x = i >= 0 ? 0 : i;
        break;
      default:
        if (this.input.x = this.options.padding.left, this.placeholder.x = this.options.padding.left, this._inner.x = 0, this.options.fixed) {
          const l = this.input.width - n;
          l > 0 && (this.input.x -= l);
        }
        break;
    }
    if (this.input.y = this.options.padding.top, this.placeholder.y = this.input.y, this.isClone && this.clone) {
      const l = ((r = (o = this.clone.options) == null ? void 0 : o.focusOverlay) == null ? void 0 : r.scale) ?? 1;
      this.error = this.clone.error, this._value = this.clone.input.text, this.input.text = this._value, this._selectionRect = this.clone.selectionRect.clone(), this._selectionRect.x *= l, this._selectionRect.y *= l, this._selectionRect.width *= l, this._selectionRect.height *= l, this._caretPosition = this.clone.caretPosition * l;
    }
    if (this.caret.x = this._caretPosition >= 0 ? this.input.x + this._caretPosition : this.input.x + this.input.width + 1, this.caret.y = this.input.y - 2, this.caret.height = this.input.style.fontSize * 1.15, this.value === "" ? this.placeholder.visible = true : this.placeholder.visible = false, this.options.fixed) {
      const l = this.isClone ? ((h = (a = this.options) == null ? void 0 : a.focusOverlay) == null ? void 0 : h.scale) ?? 1 : 1;
      this._mask && (this._mask.clear().rect(0, 0, (e - this.options.padding.left - this.options.padding.right) * l, t * l).fill({ color: 0 }), this._mask.position.set(this.options.padding.left * l, 0));
    }
    e !== this._lastWidth && this.drawBg(e, t), this._selectionRect ? this.drawSelection() : (c = this.selectionGraphics) == null || c.clear(), this.cloneOverlay && this._positionCloneOverlay();
  }
  drawSelection() {
    var e, i;
    const t = this._selectionRect;
    if (!t) {
      (e = this.selectionGraphics) == null || e.clear();
      return;
    }
    (i = this.selectionGraphics) == null || i.clear(), this.selectionGraphics.rect(t.left + this.input.x, this.caret.y, t.width, this.caret.height).fill({ color: this.options.selection.color });
  }
  drawBg(t = this._lastWidth, e = this._lastHeight) {
    var n, o, r;
    const i = (this.error || this.isClone && ((n = this.clone) != null && n.error)) && ((r = (o = this.options) == null ? void 0 : o.error) != null && r.bg) ? { ...this.options.bg, ...this.options.error.bg } : this.options.bg;
    this.bg.clear().roundRect(0, 0, t, e, (i == null ? void 0 : i.radius) ?? 0).fill(i.fill).stroke({ ...(i == null ? void 0 : i.stroke) || {}, alignment: 0 }), this._lastWidth = t, this._lastHeight = e;
  }
  destroy() {
    clearTimeout(this._focusTimer), clearTimeout(this._pointerDownTimer), this.app.stage.off("pointerdown", this._checkPointerDownOutside), this.hideCursor(), this.destroyDomElement(), super.destroy();
  }
  addBg() {
    var t, e;
    this.bg = this._inner.add.graphics().roundRect(0, 0, 100, 50, ((e = (t = this.options) == null ? void 0 : t.bg) == null ? void 0 : e.radius) ?? 0).fill(this.options.bg.fill);
  }
  addSelection() {
    this.selectionGraphics = this._inputContainer.add.graphics();
  }
  addCaret() {
    this.caret = this._inputContainer.add.sprite({
      asset: Texture.WHITE,
      width: 3,
      height: 10,
      tint: this.options.caret.color ?? 0,
      alpha: 0,
      visible: false
    });
  }
  addInput() {
    var t;
    this.input = this._inputContainer.add.text({
      ...this.options,
      style: { ...((t = this.options) == null ? void 0 : t.style) || {}, padding: 2 },
      text: this.options.value ?? "",
      label: "input",
      resolution: 2,
      roundPixels: true
    });
  }
  addPlaceholder() {
    var t;
    this.placeholder = this._inputContainer.add.text({
      ...this.options,
      ...this.options.placeholder,
      style: {
        ...this.options.style,
        fill: ((t = this.options.placeholder) == null ? void 0 : t.color) ?? 6710886
      },
      resolution: 2,
      label: "placeholder",
      roundPixels: true
    }), this.placeholder.style.align = this.input.style.align;
  }
  createDomElement(t) {
    var n, o, r, a, h;
    if (this.isClone && ((n = this.clone) != null && n.domElement)) {
      this.domElement = this.clone.domElement, this._addDomElementListeners();
      return;
    }
    clearTimeout(this._focusTimer), clearTimeout(this._pointerDownTimer), this.domElement = document.createElement("input"), this.domElement.type = "text", this.options.type && ys.includes(this.options.type) && (this.domElement.type = this.options.type), this.options.pattern && (this.domElement.pattern = this.options.pattern), this.options.regex && (this._regex = this.options.regex);
    const e = this.getGlobalPosition(), i = this.getBounds();
    i.x = e.x, i.y = e.y, i.width = this.width - this.options.padding.left, this.domElement.style.position = "fixed", this.domElement.style.border = "none", this.domElement.style.outline = "none", this.domElement.style.left = ee ? "0" : `${i.left}px`, this.domElement.style.top = ee ? "0" : `${i.top}px`, this.domElement.style.width = `${i.width}px`, this.domElement.style.height = `${i.height}px`, this.domElement.style.padding = "0", this.options.debug ? this.domElement.style.opacity = "0.8" : this.domElement.style.opacity = "0.0000001", (o = this.app.canvas.parentElement) == null || o.appendChild(this.domElement), this.domElement.value = this.value, this.domElement.setAttribute("placeholder", ((a = (r = this.options) == null ? void 0 : r.placeholder) == null ? void 0 : a.text) ?? ""), (h = this.options) != null && h.maxLength && this.domElement.setAttribute("maxLength", this.options.maxLength.toString()), this._addDomElementListeners(), this._focusDomElement(t);
  }
  destroyDomElement() {
    this.isClone || this.domElement && (this._removeDomElementListeners(), this.domElement.remove(), this.domElement = null);
  }
  showCursor() {
    this.caret.visible = true, this.blinkCaret();
  }
  hideCursor() {
    var t;
    (t = this.cursorAnimation) == null || t.kill(), this.caret.visible = false;
  }
  blinkCaret() {
    this.cursorAnimation && this.cursorAnimation.kill(), this.cursorAnimation = gsapWithCSS.fromTo(
      this.caret,
      { alpha: 0 },
      {
        duration: 0.5,
        alpha: 1,
        yoyo: true,
        repeat: -1,
        overwrite: true
      }
    );
  }
  validate() {
    var e, i, n, o, r, a, h, c, l;
    const t = this.error;
    this.isClone ? this.error = ((e = this.clone) == null ? void 0 : e.error) || false : (this.error = !this.isValid, this.error && this.error !== t && this.onError.emit({ input: this, domElement: this.domElement, value: this._value })), this.error !== t && (this.error && ((o = (n = (i = this.options) == null ? void 0 : i.error) == null ? void 0 : n.input) != null && o.fill) ? this.input.style.fill = (h = (a = (r = this.options) == null ? void 0 : r.error) == null ? void 0 : a.input) == null ? void 0 : h.fill : this.input.style.fill = ((l = (c = this.options.input) == null ? void 0 : c.style) == null ? void 0 : l.fill) || 0, this.drawBg()), this.cloneOverlay && this.cloneOverlay.validate();
  }
  _removeDomElementListeners() {
    this.domElement.removeEventListener("focus", this._handleDomElementFocus, false), this.domElement.removeEventListener("blur", this._handleDomElementBlur, false), this.domElement.removeEventListener("input", this._handleDomElementChange, false), this.domElement.removeEventListener("keyup", this._handleDomElementKeyup, false), this.domElement.removeEventListener("keydown", this._handleDomElementKeydown, false);
  }
  _addDomElementListeners() {
    this.isClone || (this._removeDomElementListeners(), this.domElement.addEventListener("focus", this._handleDomElementFocus, false), this.domElement.addEventListener("blur", this._handleDomElementBlur, false), this.domElement.addEventListener("input", this._handleDomElementChange, false), this.domElement.addEventListener("keyup", this._handleDomElementKeyup, false), this.domElement.addEventListener("keydown", this._handleDomElementKeydown, false));
  }
  _handleFocus() {
    var t, e, i, n, o, r, a, h, c, l, d, p;
    if (this._caretPosition = -1, this.showCursor(), clearTimeout(this._pointerDownTimer), !this.isClone) {
      this._pointerDownTimer = setTimeout(() => {
        this.app.stage.on("pointerdown", this._checkPointerDownOutside);
      }, 250);
      const U = !!this.options.focusOverlay.activeFilter;
      if (U) {
        this.cloneOverlay && this._removeCloneOverlay();
        const H = Array.isArray(this.options.focusOverlay.activeFilter);
        let z = false;
        if (H) {
          const f = this.options.focusOverlay.activeFilter;
          (te && f.includes("mobile") || Ot && f.includes("touch") || !te && !Ot && f.includes("desktop")) && (z = true);
        } else typeof this.options.focusOverlay.activeFilter == "function" ? z = this.options.focusOverlay.activeFilter() : z = U;
        if (z) {
          const f = structuredClone(this.options), F = ((t = this.options.focusOverlay) == null ? void 0 : t.scale) || 1;
          f.focusOverlay = { activeFilter: false };
          const G = Number(((e = f.style) == null ? void 0 : e.fontSize) || ((i = Y.style) == null ? void 0 : i.fontSize) || 20) * F;
          if (f.style || (f.style = {}), f.style.fontSize = G, f.padding && (f.padding.left *= F, f.padding.top *= F, f.padding.right *= F, f.padding.bottom *= F), (n = f.bg) != null && n.radius && (f.bg.radius *= F), (r = (o = f.bg) == null ? void 0 : o.stroke) != null && r.width && (f.bg.stroke.width *= F), f.minWidth && (f.minWidth *= F, f.minWidth > this.app.size.width && (f.minWidth = this.app.size.width - ((h = (a = f.bg) == null ? void 0 : a.stroke) != null && h.width ? f.bg.stroke.width * 2 + 20 : 20))), (l = (c = this.options.focusOverlay) == null ? void 0 : c.backing) != null && l.active) {
            const tt = this.make.sprite({
              asset: Texture.WHITE,
              tint: ((d = this.options.focusOverlay.backing.options) == null ? void 0 : d.color) ?? 0,
              alpha: ((p = this.options.focusOverlay.backing.options) == null ? void 0 : p.alpha) ?? 0.8,
              width: this.app.size.width,
              height: this.app.size.height,
              eventMode: "static"
            });
            this.overlayBacking = this.app.stage.addChild(tt);
          }
          this.cloneOverlay = new _Ue(f, true, this), this.cloneOverlay.label = `${this.label} -- clone`, this.cloneOverlay.alpha = 0, this.cloneOverlay.input.text = this.value, this.cloneOverlay.validate(), this.app.stage.addChild(this.cloneOverlay), this._positionCloneOverlay(), this._showCloneOverlay();
        }
      }
    }
  }
  _showCloneOverlay() {
    this.cloneOverlay.pivot.y = -20, gsapWithCSS.to(this.cloneOverlay, { duration: 0.5, alpha: 0.8, ease: "sine.out", delay: 0.1 }), gsapWithCSS.to(this.cloneOverlay.pivot, { duration: 0.5, y: 0, ease: "sine.out", delay: 0.1 });
  }
  _positionCloneOverlay() {
    var e;
    if (!this.cloneOverlay)
      return;
    const t = this.cloneOverlay.options.minWidth;
    this.cloneOverlay.x = this.app.size.width * 0.5 - t * 0.5, this.cloneOverlay.y = ((e = this.options.focusOverlay) == null ? void 0 : e.marginTop) || 20, this.overlayBacking && (this.overlayBacking.width = this.app.size.width, this.overlayBacking.height = this.app.size.height);
  }
  _removeCloneOverlay() {
    var t, e, i, n, o, r;
    (t = this.overlayBacking) == null || t.destroy(), (i = (e = this.overlayBacking) == null ? void 0 : e.parent) == null || i.removeChild(this.overlayBacking), this.overlayBacking = null, (n = this.cloneOverlay) == null || n.destroy(), (r = (o = this.cloneOverlay) == null ? void 0 : o.parent) == null || r.removeChild(this.cloneOverlay), this.cloneOverlay = null;
  }
  _handleDomElementFocus() {
    this.app.stage.off("pointerdown", this._checkPointerDownOutside), this._handleFocus();
  }
  _handleDomElementBlur() {
    this.isClone || (clearTimeout(this._focusTimer), clearTimeout(this._pointerDownTimer), this.hideCursor(), this._removeCloneOverlay(), this.destroyDomElement());
  }
  _handleDomElementKeyup() {
    this._updateCaretAndSelection();
  }
  _handleDomElementKeydown(t) {
    this._updateCaretAndSelection(), !this.isClone && t.key === "Enter" && (this.options.blurOnEnter && this.domElement.blur(), this.onEnter.emit({ input: this, value: this._value, domElement: this.domElement }));
  }
  _updateCaretAndSelection() {
    if (!this.domElement) {
      _.warn(this.label, "No dom element");
      return;
    }
    const t = this.domElement.selectionStart || 0, e = this.domElement.selectionEnd || -1, i = this.domElement.selectionDirection;
    let n = "";
    const o = this.options.type === "password" ? this.input.text : this._value;
    if (e === void 0) {
      n = o.substring(0, t);
      const r = CanvasTextMetrics.measureText(n, this.input.style);
      this._caretPosition = r.width, this._selectionRect = null;
    } else {
      n = o.substring(t > e ? e : t, t > e ? t : e);
      const r = o.substring(0, t > e ? e : t), a = CanvasTextMetrics.measureText(r, this.input.style), h = CanvasTextMetrics.measureText(n, this.input.style);
      this._selectionRect = new Rectangle(a.width, 0, h.width, this.input.height), this._caretPosition = i === "backward" ? this._selectionRect.left : this._selectionRect.left + this._selectionRect.width;
    }
  }
  _handleDomElementChange(t) {
    var i;
    const e = t.target;
    if (e && !this.domElement && (this.domElement = e), this.options.pattern !== "") {
      const n = e.value.replace(new RegExp(this.options.pattern, "g"), "");
      e.value = n, this._value = n;
    } else
      this._value = e.value;
    this.input.text = this.options.type === "password" ? (i = this._value) == null ? void 0 : i.split("").map(() => "*").join("") : this._value, this._updateCaretAndSelection(), this.isClone || (this.onChange.emit({ input: this, domElement: this.domElement, value: this._value }), this.validate());
  }
};
var Un = class extends B {
  constructor(t) {
    if (super(), this.onChange = new u(), this.onStart = new u(), this.onEnd = new u(), this.onDestroy = new u(), this.outerRadius = 0, this.innerRadius = 0, this.innerAlphaStandby = 0.5, this.dragging = false, this.pointData = new Point(), this.direction = C.None, this.settings = Object.assign(
      {
        outerScale: 1,
        innerScale: 1
      },
      t
    ), !this.settings.outer) {
      const e = new Graphics();
      e.circle(0, 0, 60).fill({ color: 0 }), e.alpha = 0.5, this.settings.outer = e;
    }
    if (!this.settings.inner) {
      const e = new Graphics();
      e.circle(0, 0, 35).fill({ color: 0 }), e.alpha = this.innerAlphaStandby, this.settings.inner = e;
    }
    this.threshold = this.settings.threshold ?? 0.01, this.initialize();
  }
  initialize() {
    this.outer = this.settings.outer, this.inner = this.settings.inner, this.outer.scale.set(this.settings.outerScale, this.settings.outerScale), this.inner.scale.set(this.settings.innerScale, this.settings.innerScale), "anchor" in this.outer && this.outer.anchor.set(0.5), "anchor" in this.inner && this.inner.anchor.set(0.5), this.add.existing(this.outer), this.add.existing(this.inner), this.outerRadius = this.width / 2.5, this.innerRadius = this.inner.width / 2, this.bindEvents();
  }
  handleDragMove(t) {
    if (!this.dragging || t.pointerId !== this._pointerId)
      return;
    const e = this.toLocal(t.global), i = e.x - this.startPosition.x, n = e.y - this.startPosition.y, o = new Point(0, 0);
    let r = 0, a = C.None;
    if (i == 0 && n == 0) {
      this.direction = a;
      return;
    }
    if (i === 0 && (n > 0 ? (o.set(0, n > this.outerRadius ? this.outerRadius : n), r = 270, a = C.Bottom) : (o.set(0, -(Math.abs(n) > this.outerRadius ? this.outerRadius : Math.abs(n))), r = 90, a = C.Top), this.inner.position.set(o.x, o.y), this.power = this.getPower(o), this.power >= this.threshold)) {
      this.direction = a, this.onChange.emit({ angle: r, direction: a, power: this.power });
      return;
    }
    if (n === 0 && (i > 0 ? (o.set(Math.abs(i) > this.outerRadius ? this.outerRadius : Math.abs(i), 0), r = 0, a = C.Right) : (o.set(-(Math.abs(i) > this.outerRadius ? this.outerRadius : Math.abs(i)), 0), r = 180, a = C.Left), this.inner.position.set(o.x, o.y), this.power = this.getPower(o), this.power >= this.threshold)) {
      this.direction = a, this.onChange.emit({ angle: r, direction: a, power: this.power });
      return;
    }
    const h = Math.abs(n / i), c = Math.atan(h);
    r = c * 180 / Math.PI;
    let l = 0, d = 0;
    i * i + n * n >= this.outerRadius * this.outerRadius ? (l = this.outerRadius * Math.cos(c), d = this.outerRadius * Math.sin(c)) : (l = Math.abs(i) > this.outerRadius ? this.outerRadius : Math.abs(i), d = Math.abs(n) > this.outerRadius ? this.outerRadius : Math.abs(n)), n < 0 && (d = -Math.abs(d)), i < 0 && (l = -Math.abs(l)), i > 0 && n < 0 || (i < 0 && n < 0 ? r = 180 - r : i < 0 && n > 0 ? r = r + 180 : i > 0 && n > 0 && (r = 360 - r)), o.set(l, d), this.power = this.getPower(o), this.power >= this.threshold && (a = this.getDirection(o), this.direction = a, this.inner.position.set(o.x, o.y), this.onChange.emit({ angle: r, direction: a, power: this.power }));
  }
  destroy(t) {
    this.off("pointerdown", this.handleDragStart).off("pointerup", this.handleDragEnd).off("pointerupoutside", this.handleDragEnd).off("pointermove", this.handleDragMove), window.removeEventListener("pointerup", this.handleDragEnd), this.onDestroy.emit(), super.destroy(t);
  }
  handleDragStart(t) {
    this._pointerId === void 0 && (this._pointerId = t.pointerId, this.startPosition = this.toLocal(t.global), this.dragging = true, this.inner.alpha = 1, this.onStart.emit());
  }
  handleDragEnd(t) {
    this._pointerId === t.pointerId && (this.direction = C.None, this.inner.position.set(0, 0), this.dragging = false, this.inner.alpha = this.innerAlphaStandby, this.onEnd.emit(), this._pointerId = void 0);
  }
  bindEvents() {
    this.eventMode = "static", this.on("pointerdown", this.handleDragStart).on("pointerup", this.handleDragEnd).on("pointerupoutside", this.handleDragEnd).on("pointermove", this.handleDragMove), window.addEventListener("pointerup", this.handleDragEnd);
  }
  getPower(t) {
    const e = t.x, i = t.y;
    return Math.min(1, Math.sqrt(e * e + i * i) / this.outerRadius);
  }
  getDirection(t) {
    const e = Math.atan2(t.y, t.x);
    return e >= -Math.PI / 8 && e < 0 || e >= 0 && e < Math.PI / 8 ? C.Right : e >= Math.PI / 8 && e < 3 * Math.PI / 8 ? C.BottomRight : e >= 3 * Math.PI / 8 && e < 5 * Math.PI / 8 ? C.Bottom : e >= 5 * Math.PI / 8 && e < 7 * Math.PI / 8 ? C.BottomLeft : e >= 7 * Math.PI / 8 && e < Math.PI || e >= -Math.PI && e < -7 * Math.PI / 8 ? C.Left : e >= -7 * Math.PI / 8 && e < -5 * Math.PI / 8 ? C.TopLeft : e >= -5 * Math.PI / 8 && e < -3 * Math.PI / 8 ? C.Top : C.TopRight;
  }
};
var vs = ["text", "anchor", "resolution", "roundPixels", "style"];
function k(s, t) {
  for (const e in s)
    try {
      t[e] = s[e];
    } catch (i) {
      _.error(`Error setting property ${e}`, i);
    }
}
function Mt(s) {
  let t;
  const e = s == null ? void 0 : s.asset, i = e, n = s == null ? void 0 : s.sheet;
  if (e instanceof Texture)
    t = e;
  else if (!n || (n == null ? void 0 : n.length) === 0)
    if (Assets.cache.has(i))
      t = Assets.get(i);
    else if (Assets.get(i))
      t = Assets.get(i).texture;
    else
      throw new Error('Asset "' + e + '" not loaded into Pixi cache');
  else if (Assets.get(n)) {
    const o = Assets.get(n), r = o.textures;
    if (r !== void 0)
      if (r.hasOwnProperty(i))
        t = r[i];
      else if (o.linkedSheets !== void 0 && o.linkedSheets.length > 0) {
        for (const a of o.linkedSheets)
          if (a.textures !== void 0 && a.textures.hasOwnProperty(i)) {
            t = a.textures[i];
            break;
          }
        if (t === void 0)
          throw new Error(
            'Asset "' + e + '" not found inside spritesheet "' + e + "' or any of its linked sheets"
          );
      } else
        throw new Error('Asset "' + e + '" not found inside spritesheet "' + n + "'");
    else
      throw new Error('Spritesheet "' + n + '" loaded but textures arent?!');
  } else
    throw new Error('Spritesheet "' + n + '" not loaded into Pixi cache');
  return t || new Sprite().texture;
}
function E(s, t) {
  const e = I(s.position, false, s.x, s.y);
  t.x = e.x, t.y = e.y;
}
function L(s, t) {
  if (!s)
    return;
  if (s.scale === void 0) {
    if (s.scaleX === void 0 && s.scaleY === void 0)
      return;
    s.scaleX === void 0 && (s.scaleX = 1), s.scaleY === void 0 && (s.scaleY = 1);
  }
  const e = I(s.scale, false, s.scaleX, s.scaleY);
  t.scale.set(e.x, e.y);
}
function Bt(s, t) {
  if (s !== void 0) {
    const e = I(s);
    t.anchor.set(e.x, e.y);
  }
}
function M(s, t) {
  if (s !== void 0) {
    const e = I(s);
    t.pivot.set(e.x, e.y);
  }
}
var ws = {
  existing: (s, t) => {
    if (!t) return s;
    const { position: e, x: i, y: n, pivot: o, scale: r, scaleX: a, scaleY: h, ...c } = t;
    return E({ position: e, x: i, y: n }, s), L({ scale: r, scaleX: a, scaleY: h }, s), M(o, s), k(c, s), s;
  },
  container: (s) => {
    const t = X(s ?? {}, ve), e = $(ve, s ?? {}), i = new B(t);
    if (!e) return i;
    const { position: n, x: o, y: r, pivot: a, scale: h, scaleX: c, scaleY: l, ...d } = e;
    return E({ position: n, x: o, y: r }, i), L({ scale: h, scaleX: c, scaleY: l }, i), M(a, i), k(d, i), i;
  },
  particleContainer: (s) => {
    const t = X(s ?? {}, we), e = $(
      we,
      s ?? {}
    ), i = new as(t);
    if (!e) return i;
    const { position: n, x: o, y: r, pivot: a, scale: h, ...c } = e;
    return E({ position: n, x: o, y: r }, i), L({ scale: h }, i), M(a, i), k(c, i), i;
  },
  texture: Mt,
  sprite: (s) => {
    const t = new Sprite(s ? Mt(s) : void 0);
    if (!s) return t;
    const { position: e, x: i, y: n, anchor: o, pivot: r, scale: a, scaleX: h, scaleY: c, ...l } = s;
    return E({ position: e, x: i, y: n }, t), L({ scale: a, scaleX: h, scaleY: c }, t), Bt(o, t), M(r, t), k(l, t), t;
  },
  animatedSprite: (s) => {
    const t = new ft(s);
    s != null && s.position && E({ position: s.position, x: s.x, y: s.y }, t), s != null && s.scale && L({ scale: s.scale ?? 1, scaleX: s.scaleX, scaleY: s.scaleY }, t), s != null && s.pivot && M(s.pivot, t);
    const e = $(
      ["x", "y", "position", "text", "roundPixels", "resolution", "style", "anchor", "pivot"],
      s ?? {}
    );
    return k(e, t), t;
  },
  graphics: (s) => {
    const t = new Graphics();
    if (!s) return t;
    const { position: e, x: i, y: n, pivot: o, scale: r, scaleX: a, scaleY: h, ...c } = s;
    return E({ position: e, x: i, y: n }, t), L({ scale: r, scaleX: a, scaleY: h }, t), M(o, t), k(c, t), t;
  },
  svg(s) {
    const t = new hs(s.ctx);
    if (!s) return t;
    const { position: e, x: i, y: n, pivot: o, scale: r, scaleX: a, scaleY: h, ...c } = s;
    return E({ position: e, x: i, y: n }, t), L({ scale: r, scaleX: a, scaleY: h }, t), M(o, t), k(c, t), t;
  },
  text: (s) => {
    const t = s ? {
      text: s.text,
      roundPixels: s.roundPixels,
      resolution: s.resolution,
      style: s.style,
      anchor: s.anchor ? I(s.anchor, true) : void 0
    } : {}, e = new Text(t);
    if (!s) return e;
    const { position: i, x: n, y: o, scale: r, scaleX: a, scaleY: h, pivot: c } = s;
    E({ position: i, x: n, y: o }, e), L({ scale: r, scaleX: a, scaleY: h }, e), M(c, e);
    const l = $(
      ["x", "y", "position", "text", "roundPixels", "resolution", "style", "anchor", "pivot"],
      s
    );
    return k(l, e), e;
  },
  bitmapText: (s) => {
    const t = X(s ?? {}, vs), e = new BitmapText(t);
    s != null && s.position && E({ position: s.position, x: s.x, y: s.y }, e), s != null && s.scale && L({ scale: s.scale ?? 1, scaleX: s.scaleX, scaleY: s.scaleY }, e), s != null && s.pivot && M(s.pivot, e);
    const i = $(
      ["x", "y", "position", "text", "roundPixels", "resolution", "style", "anchor", "pivot"],
      s ?? {}
    );
    return k(i, e), e;
  },
  // dill pixel specific stuff
  button: (s) => {
    const t = X(s ?? {}, be), e = $(be, s ?? {}), i = new ds(t);
    if (!e) return i;
    const { position: n, x: o, y: r, pivot: a, scale: h, scaleX: c, scaleY: l, ...d } = e;
    return E({ position: n, x: o, y: r }, i), L({ scale: h, scaleX: c, scaleY: l }, i), M(a, i), k(d, i), i;
  },
  flexContainer: (s) => {
    const t = X(s ?? {}, xe), e = $(xe, s ?? {}), i = new Et(t);
    if (!e) return i;
    const { position: n, x: o, y: r, pivot: a, scale: h, scaleX: c, scaleY: l, ...d } = e;
    return E({ position: n, x: o, y: r }, i), L({ scale: h, scaleX: c, scaleY: l }, i), M(a, i), k(d, i), i;
  },
  uiCanvas: (s) => {
    const t = X(s ?? {}, Ce), e = $(Ce, s ?? {}), i = new Lt(t);
    if (!e) return i;
    const { position: n, x: o, y: r, pivot: a, scale: h, scaleX: c, scaleY: l, ...d } = e;
    return E({ position: n, x: o, y: r }, i), L({ scale: h, scaleX: c, scaleY: l }, i), M(a, i), k(d, i), i;
  },
  spine: (s) => {
    let t = s == null ? void 0 : s.data;
    if (typeof t == "string") {
      let p = t.slice(-5);
      p !== ".json" && p !== ".skel" ? p = ".json" : t = t.substring(0, t.length - 5), t = { skeleton: t + p, atlas: t + ".atlas" };
    }
    const e = window.Spine.from(t);
    if (!s) return e;
    s.autoUpdate !== void 0 && (e.autoUpdate = s.autoUpdate), s.animationName && e.state.setAnimation(s.trackIndex ?? 0, s.animationName, s.loop);
    const { position: i, x: n, y: o, anchor: r, pivot: a, scale: h, scaleX: c, scaleY: l, ...d } = s;
    return E({ position: i, x: n, y: o }, e), L({ scale: h, scaleX: c, scaleY: l }, e), Bt(r, e), M(a, e), k(d, e), e;
  },
  spineAnimation: (s) => {
    const t = new cs(s);
    if (!s) return t;
    const { position: e, x: i, y: n, anchor: o, pivot: r, scale: a, scaleX: h, scaleY: c, ...l } = s;
    return E({ position: e, x: i, y: n }, t), L({ scale: a, scaleX: h, scaleY: c }, t), Bt(o, t), M(r, t), k(l, t), t;
  }
};
function vt(s) {
  return class extends Container {
    constructor() {
      super(), s = Object.assign(ws, s), this.make = ye(s, this, false), this.add = ye(s, this, true);
    }
  };
}
function Q(s) {
  return s === void 0 ? s = "*undefined*" : s === " " ? s = "Space" : s.length === 1 && (s = s.toUpperCase()), s;
}
var bs = class extends O {
  constructor() {
    super(...arguments), this.id = "keyboard", this.onGlobalKeyDown = new u(), this.onGlobalKeyUp = new u(), this._keyDownSignals = /* @__PURE__ */ new Map(), this._keyUpSignals = /* @__PURE__ */ new Map(), this._keysDown = /* @__PURE__ */ new Set(), this._enabled = true;
  }
  get keysDown() {
    return this._keysDown;
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(t) {
    this._enabled = t;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialize(t) {
    document.addEventListener("keydown", this._handleKeyDown), document.addEventListener("keyup", this._handleKeyUp);
  }
  destroy() {
    document.removeEventListener("keydown", this._handleEvent), document.removeEventListener("keyup", this._handleEvent), document.addEventListener("keydown", this._handleKeyDown), document.addEventListener("keyup", this._handleKeyUp);
  }
  onKeyDown(t) {
    return this._checkAndAddSignal(t || void 0, "keydown");
  }
  onKeyUp(t) {
    return this._checkAndAddSignal(t || void 0, "keyup");
  }
  isKeyDown(t) {
    return this._keysDown.has(t);
  }
  _update() {
  }
  getCoreSignals() {
    return ["onGlobalKeyDown", "onGlobalKeyUp"];
  }
  getCoreFunctions() {
    return ["onKeyDown", "onKeyUp", "isKeyDown"];
  }
  _handleKeyDown(t) {
    const e = Q(t.key);
    this._keysDown.add(e), this.onGlobalKeyDown.emit({ event: t, key: t.key });
  }
  _handleKeyUp(t) {
    const e = Q(t.key);
    this._keysDown.delete(e), this.onGlobalKeyUp.emit({ event: t, key: t.key });
  }
  /**
   * Check if the signal exists and add it if it doesn't
   * Also, if this is the first signal, start listening for the event
   * @param {string} key
   * @param {KeyboardEventType} eventType
   * @returns {KeySignal}
   * @private
   */
  _checkAndAddSignal(t, e) {
    const i = e === "keydown" ? this._keyDownSignals : this._keyUpSignals;
    return i.size || this._listen(e), t = Q(t), i.has(t) || i.set(t, new u()), i.get(t);
  }
  _listen(t) {
    document.addEventListener(t, this._handleEvent);
  }
  _handleEvent(t) {
    var n, o;
    if (!this._enabled)
      return;
    const e = t.type === "keydown" ? this._keyDownSignals : this._keyUpSignals, i = Q(t.key);
    (n = e.get("*undefined*")) == null || n.emit({ event: t, key: i }), (o = e.get(i)) == null || o.emit({ event: t, key: i });
  }
};
var $e = class {
  get app() {
    return v.getInstance();
  }
  initialize(t) {
    this.scheme = t;
  }
};
var xs = class extends K($e) {
  constructor() {
    super(), this._keyCombinations = [], this._singleDownKeys = /* @__PURE__ */ new Set(), this._keyCombinationsMap = /* @__PURE__ */ new Map(), this._activeDownKeys = /* @__PURE__ */ new Map(), this._activeUpKeys = /* @__PURE__ */ new Map(), w(this);
  }
  get app() {
    return v.getInstance();
  }
  isActionActive(t) {
    var i;
    const e = ((i = this.scheme.down) == null ? void 0 : i[t]) ?? null;
    return e ? Array.isArray(e) ? this._keyCombinationsMap.has(e) || e.some((n) => this._singleDownKeys.has(n)) : this._singleDownKeys.has(e) : false;
  }
  initialize(t) {
    super.initialize(t), this._keyDownMap = t.down || {}, this._keyUpMap = t.up || {}, this._sortActions();
  }
  connect() {
    this.addSignalConnection(
      this.app.signal.onActionContextChanged.connect(this._handleContextChanged),
      this.app.keyboard.onKeyDown().connect(this._handleKeyDown),
      this.app.keyboard.onKeyUp().connect(this._handleKeyUp)
    ), this.app.ticker.add(this._update);
  }
  _sortActions() {
    const t = this.app.actionsPlugin.getActions();
    this._keyCombinations = [], this._keyCombinationsMap.clear(), this._activeDownKeys.clear(), this._activeUpKeys.clear();
    let e = Object.keys(this._keyDownMap);
    e.forEach((i) => {
      const n = this._keyDownMap[i], o = t[i];
      if (o.context !== "*" && o.context !== this.app.actionContext && !o.context.includes(this.app.actionContext))
        return;
      let r = n;
      r && (Array.isArray(r) || (r = [r]), r.forEach((a) => {
        if (a.includes("+")) {
          const h = a.split("+");
          this._keyCombinations.push(h), this._keyCombinationsMap.set(h, i);
        } else
          this._activeDownKeys.set(a, i);
      }));
    }), this._keyCombinations.sort((i, n) => n.length - i.length), e = Object.keys(this._keyUpMap), e.forEach((i) => {
      let o = this._keyUpMap[i];
      o && (Array.isArray(o) || (o = [o]), o.forEach((r) => {
        this._activeUpKeys.set(r, i);
      }));
    });
  }
  _handleContextChanged() {
    this._getPossibleActions();
  }
  _getPossibleActions() {
    this._sortActions();
  }
  _handleKeyDown(t) {
    const e = Q(t.event.key);
    this._singleDownKeys.add(e);
  }
  _handleKeyUp(t) {
    const e = Q(t.event.key);
    this._singleDownKeys.delete(e);
    const i = this._activeUpKeys.get(e);
    i && this.app.action(i, { combination: false, inputState: "up", key: e });
  }
  _update() {
    if (!this.app.keyboard)
      return;
    const t = this.app.keyboard.keysDown;
    if (t.size === 0)
      return;
    const e = /* @__PURE__ */ new Set();
    for (let i = 0; i < this._keyCombinations.length; i++) {
      const n = this._keyCombinations[i];
      if (!n.some((o) => e.has(o)) && n.every((o) => t.has(o))) {
        n.forEach((r) => e.add(r));
        const o = this._keyCombinationsMap.get(n);
        o && this.app.action(o, {
          key: n,
          combination: true,
          inputState: "down"
        });
      }
    }
    this._singleDownKeys.forEach((i) => {
      if (!e.has(i) && t.has(i)) {
        const n = this._activeDownKeys.get(i);
        n && this.app.action(n, { key: i, combination: false, inputState: "down" });
      }
    });
  }
};
var C = ((s) => (s.None = "none", s.Left = "left", s.Top = "top", s.Bottom = "bottom", s.Right = "right", s.TopLeft = "top_left", s.TopRight = "top_right", s.BottomLeft = "bottom_left", s.BottomRight = "bottom_right", s))(C || {});
var Wn = [
  "none",
  "left",
  "top",
  "bottom",
  "right",
  "top_left",
  "top_right",
  "bottom_left",
  "bottom_right"
  /* BottomRight */
];
var Cs = class extends K($e) {
  constructor() {
    super(), this._buttons = /* @__PURE__ */ new Set(), this._combinations = [], this._singleDownButtons = /* @__PURE__ */ new Set(), this._activeJoystickDirections = /* @__PURE__ */ new Map(), this._activeButtonDownIds = /* @__PURE__ */ new Map(), this._activeButtonUpIds = /* @__PURE__ */ new Map(), this._combinationsMap = /* @__PURE__ */ new Map(), w(this);
  }
  get joystick() {
    return this._joystick;
  }
  set joystick(t) {
    this._joystick = t;
  }
  get app() {
    return v.getInstance();
  }
  addButton(t) {
    !t || this._buttons.has(t) || (this.addSignalConnection(
      t.onDown.connect(() => this._handleButtonDown(t)),
      t.onUp.connect(() => this._handleButtonUp(t)),
      t.onUpOutside.connect(() => this._handleButtonUp(t)),
      t.onDestroy.connect(() => this.removeButton(t))
    ), this._buttons.add(t));
  }
  removeButton(t) {
    !t || !this._buttons.has(t) || (t.onDown.disconnect(() => this._handleButtonDown(t)), t.onUp.disconnect(() => this._handleButtonUp(t)), t.onUpOutside.disconnect(() => this._handleButtonUp(t)), t.onDestroy.disconnect(() => this.removeButton(t)), this._buttons.delete(t));
  }
  initialize(t) {
    super.initialize(t), this._buttonDownMap = t.down || {}, this._buttonUpMap = t.up || {}, this._joystickMap = t.joystick || {}, this.app.signal.onActionContextChanged.connect(this._sortActions), this._sortActions();
  }
  connect() {
    this.app.ticker.add(this._update);
  }
  isActionActive(t) {
    var i, n, o;
    const e = ((i = this.scheme.down) == null ? void 0 : i[t]) ?? null;
    if (e)
      return Array.isArray(e) ? this._combinationsMap.has(e) : this._singleDownButtons.has(e);
    {
      const r = ((n = this.scheme.joystick) == null ? void 0 : n[t]) ?? null;
      if (this._joystick && r)
        return Array.isArray(r) ? r.includes(this._joystick.direction) : r === ((o = this._joystick) == null ? void 0 : o.direction);
    }
    return false;
  }
  _sortActions() {
    const t = this.app.actionsPlugin.getActions();
    this._combinations = [], this._combinationsMap.clear(), this._activeJoystickDirections.clear(), this._activeButtonDownIds.clear(), this._activeButtonUpIds.clear();
    let e = Object.keys(this._buttonDownMap);
    e.forEach((n) => {
      const o = this._buttonDownMap[n], r = t[n];
      if (r.context !== "*" && r.context !== this.app.actionContext && !r.context.includes(this.app.actionContext))
        return;
      let a = o;
      a && (Array.isArray(a) || (a = [a]), a.forEach((h) => {
        if (h.includes("+")) {
          const c = h.split("+");
          this._combinations.push(c), this._combinationsMap.set(c, n);
        } else
          this._activeButtonDownIds.set(h, n);
      }));
    }), this._combinations.sort((n, o) => o.length - n.length), e = Object.keys(this._buttonUpMap), e.forEach((n) => {
      const o = this._buttonUpMap[n], r = t[n];
      r.context !== "*" && r.context !== this.app.actionContext && !r.context.includes(this.app.actionContext) || this._activeButtonUpIds.set(o, n);
    }), Object.keys(this._joystickMap).forEach((n) => {
      let r = this._joystickMap[n];
      r && (Array.isArray(r) || (r = [r]), r.forEach((a) => {
        this._activeJoystickDirections.set(a, n);
      }));
    });
  }
  _handleButtonDown(t) {
    this._singleDownButtons.add(t.id);
  }
  _handleButtonUp(t) {
    this._singleDownButtons.delete(t.id);
    const e = this._activeButtonUpIds.get(t.id);
    e && this.app.action(e, {
      combination: false,
      inputState: "up",
      button: t.id
    });
  }
  _update() {
    var n;
    const t = ((n = this._joystick) == null ? void 0 : n.direction) ?? null, e = this._singleDownButtons, i = /* @__PURE__ */ new Set();
    for (let o = 0; o < this._combinations.length; o++) {
      const r = this._combinations[o];
      if (!r.some((a) => i.has(a)) && r.every((a) => e.has(a) || t === a)) {
        r.forEach((h) => i.add(h));
        const a = this._combinationsMap.get(r);
        a && this.app.action(a, {
          button: r,
          combination: true,
          inputState: "down"
        });
      }
    }
    if (this._singleDownButtons.forEach((o) => {
      if (!i.has(o) && e.has(o)) {
        const r = this._activeButtonDownIds.get(o);
        r && this.app.action(r, {
          button: o,
          combination: false,
          inputState: "down"
        });
      }
    }), t) {
      const o = this._activeJoystickDirections.get(t);
      o && this.app.action(o, {
        inputState: "joystick"
      });
    }
  }
};
var As = class {
  constructor() {
    w(this);
  }
  get app() {
    return v.getInstance();
  }
  destroy() {
    this.keyboard && this.keyboard.destroy(), this.touch && this.touch.destroy();
  }
  isActionActive(t) {
    var i, n;
    return ((i = this.keyboard) == null ? void 0 : i.isActionActive(t)) || ((n = this.touch) == null ? void 0 : n.isActionActive(t)) || false;
  }
  initialize(t) {
    t.keyboard && (this.keyboard = new xs(), this.keyboard.initialize(t.keyboard)), t.touch && (this.touch = new Cs(), this.touch.initialize(t.touch));
  }
  connect() {
    this.keyboard && this.keyboard.connect(), this.touch && this.touch.connect();
  }
};
var Ae = {
  actions: zi
};
var Ss = class extends O {
  constructor() {
    super(...arguments), this.id = "input", this.controls = new As(), this.activeGamepads = /* @__PURE__ */ new Map(), this.activeControllers = /* @__PURE__ */ new Set([]), this.onGamepadConnected = new u(), this.onGamepadDisconnected = new u(), this.onControllerActivated = new u(), this.onControllerDeactivated = new u();
  }
  isActionActive(t) {
    return this.controls.isActionActive(t);
  }
  async initialize(t, e = Ae) {
    this.options = { ...Ae, ...e }, t.stage.eventMode = "static", t.stage.on("touchstart", this._onTouchStart), t.stage.on("globalmousemove", this._onMouseMove), window.addEventListener("keydown", this._onKeyDown), window.addEventListener("gamepadconnected", this._onGamepadConnected), window.addEventListener("gamepaddisconnected", this._onGamepadDisconnected), this.options.controls && this.controls.initialize(this.options.controls);
  }
  postInitialize() {
    this.controls && this.controls.connect();
  }
  destroy() {
    this.app.stage.off("touchstart", this._onTouchStart), this.app.stage.off("globalmousemove", this._onMouseMove), window.removeEventListener("keydown", this._onKeyDown), window.removeEventListener("gamepadconnected", this._onGamepadConnected), window.removeEventListener("gamepaddisconnected", this._onGamepadDisconnected), super.destroy();
  }
  isControllerActive(t) {
    return this.activeControllers.has(t);
  }
  isGamepadActive(t) {
    return this.activeGamepads.has(t.id);
  }
  getCoreSignals() {
    return ["onGamepadConnected", "onGamepadDisconnected", "onControllerActivated", "onControllerDeactivated"];
  }
  _activateController(t) {
    this.activeControllers.has(t) || (this.activeControllers.add(t), this.onControllerActivated.emit(t));
  }
  _deactivateController(t) {
    this.activeControllers.has(t) && (this.activeControllers.delete(t), this.onControllerDeactivated.emit(t));
  }
  _activateGamepad(t) {
    this.activeGamepads.set(t.id, t);
  }
  _deactivateGamepad(t) {
    this.activeGamepads.delete(t);
  }
  _onTouchStart() {
    this._activateController(Z.Touch);
  }
  _onMouseMove() {
    this._activateController(Z.Mouse);
  }
  _onKeyDown() {
    this._activateController(Z.Keyboard);
  }
  _onGamepadConnected(t) {
    this._activateController(Z.GamePad), this._activateController(t.gamepad.id), this._activateGamepad(t.gamepad), this.onGamepadConnected.emit(t.gamepad);
  }
  _onGamepadDisconnected(t) {
    this._deactivateGamepad(t.gamepad.id), this.actionsPlugin.sendAction("pause"), this.onGamepadDisconnected.emit(t.gamepad), this.activeGamepads.size === 0 && this._deactivateController(Z.GamePad);
  }
  get actionsPlugin() {
    return this.app.getPlugin("actions");
  }
};
function Kn(s, t, e) {
  return e || [];
}
var Ps = class extends O {
  constructor() {
    super(...arguments), this.id = "popups", this.view = new B(), this.onShowPopup = new u(), this.onHidePopup = new u(), this._popups = /* @__PURE__ */ new Map(), this._activePopups = /* @__PURE__ */ new Map(), this._currentPopupId = void 0;
  }
  // The id of the current popup
  get currentPopupId() {
    return this._currentPopupId;
  }
  get popupCount() {
    return this._popups.size;
  }
  get current() {
    if (this._currentPopupId !== void 0)
      return this._activePopups.get(this._currentPopupId);
  }
  /**
   * Initialize the PopupManager
   * @param _app
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialize(t) {
    w(this), this.view.label = "PopupManager", this._setupAppListeners();
  }
  /**
   * Destroy the PopupManager
   */
  destroy() {
    this._activePopups.clear(), super.destroy();
  }
  /**
   * Add a popup
   * @param id - The id of the popup
   * @param popup - The popup constructor
   */
  addPopup(t, e) {
    this._popups.set(t, e);
  }
  /**
   * Show a popup
   * @param id - The id of the popup
   * @param config - The configuration for the popup
   * @returns a promise resolving to the popup, if it exists
   */
  async showPopup(t, e = {}) {
    const i = this._popups.get(t);
    if (i) {
      e.id = t;
      const n = this.view.add.existing(new i(t, e));
      return n.initialize(), this.app.focus.clearFocus(), await n.show(), this.app.focus.setFocusLayer(t), n.afterShow(), this._activePopups.set(t, n), this._currentPopupId = t, this.onShowPopup.emit({ id: t, data: e == null ? void 0 : e.data }), n.start(), n;
    }
  }
  /**
   * Hide a popup
   * @param id - The id of the popup
   * @param data
   * @returns a promise resolving to the popup, if it exists
   */
  async hidePopup(t, e) {
    var n;
    const i = this._activePopups.get(t);
    if (i)
      return i.beforeHide(), await i.hide(), this.view.removeChild(i), this._activePopups.delete(t), this._currentPopupId = ((n = Ht(this._activePopups)) == null ? void 0 : n[0]) || void 0, this.onHidePopup.emit({ id: t, data: e }), i.end(), i;
  }
  /**
   * Remove all popups
   * @param animate - Whether to animate the removal
   */
  removeAllPopups(t = false) {
    t ? this._activePopups.forEach((e) => {
      e.hide();
    }) : (this._activePopups.clear(), this.view.removeChildren());
  }
  getCoreFunctions() {
    return ["addPopup", "hidePopup", "showPopup", "removeAllPopups"];
  }
  getCoreSignals() {
    return ["onShowPopup", "onHidePopup"];
  }
  /**
   * Setup application listeners
   * @private
   */
  _setupAppListeners() {
    this.addSignalConnection(this.app.scenes.onSceneChangeStart.connect(() => this.removeAllPopups())), this.app.keyboard.onKeyUp("Escape").connect(this._handleEscape);
  }
  /**
   * Handle escape key press
   * if the current popup should close when escape is pressed (true by default), closes it
   * @private
   */
  _handleEscape() {
    this.current && this.current.config.closeOnEscape && this.hidePopup(this.current.id);
  }
};
var ks = {
  autoScroll: false,
  useAspectRatio: false,
  fixed: false,
  minSize: { width: 0, height: 0 },
  maxSize: { width: 0, height: 0 },
  debug: false
};
var Es = class extends O {
  constructor() {
    super(...arguments), this.id = "resizer";
  }
  get size() {
    return this._size;
  }
  get scale() {
    return this._scale;
  }
  /**
   * Initializes the Resizer module.
   */
  async initialize(t, e = {}) {
    this._options = { ...ks, ...e };
  }
  /**
   * Post-initialization of the Resizer module.
   * when this is called, the renderer is already created, and the dom element has been appended
   */
  async postInitialize() {
    this.resize();
  }
  /**
   * Resizes the application based on window size and module options.
   */
  resize() {
    var p;
    let t = window.innerWidth, e = window.innerHeight;
    const i = (p = this.app.renderer.canvas) == null ? void 0 : p.parentElement, n = i == null ? void 0 : i.getBoundingClientRect();
    n && (t = n.width, e = n.height);
    const o = this._options.minSize.width, r = this._options.minSize.height, a = t < o ? o / t : 1, h = e < r ? r / e : 1, c = a > h ? a : h;
    this._scale = c;
    const l = t * c, d = e * c;
    this.app.renderer.canvas.style.width = `${t}px`, this.app.renderer.canvas.style.height = `${e}px`, this._options.autoScroll && (window == null || window.scrollTo(0, 0)), this.app.renderer.resize(l, d), this._size = { width: l, height: d }, this._options.debug && this._drawDebug();
  }
  /**
   * Draws debug information if debug option is enabled.
   */
  _drawDebug() {
    this._debugContainer || (this._debugContainer = this.app.stage.addChild(new B()), this._gfx = this._debugContainer.add.graphics()), this._gfx.clear(), this._gfx.rect(0, 0, this._size.width, this._size.height), this._gfx.stroke({ width: 4, color: 4095 });
  }
};
var Ls = {
  view: null,
  hideWhen: "firstSceneEnter",
  zOrder: "top"
};
var Ms = class extends O {
  constructor() {
    super(), this.id = "scenes", this.onSceneChangeStart = new u(), this.onSceneChangeComplete = new u(), this.view = new Container(), this.isFirstScene = true, this.list = [], this._sceneModules = /* @__PURE__ */ new Map(), this._lastScene = null, this._defaultLoadMethod = "immediate", this._debugVisible = false, this._useHash = false, w(this);
  }
  get ids() {
    return this.list.map((t) => t.id);
  }
  setDefaultLoadMethod(t) {
    this._defaultLoadMethod = t;
  }
  destroy() {
  }
  async initialize(t) {
    var n, o, r, a, h, c, l, d;
    this._debugVisible = ((n = this.app.config) == null ? void 0 : n.showSceneDebugMenu) === true || W && ((o = this.app.config) == null ? void 0 : o.showSceneDebugMenu) !== false, this._useHash = ((r = t.config) == null ? void 0 : r.useHash) === true || this._debugVisible, this.view.sortableChildren = true;
    const i = globalThis.getDillPixel("sceneList") || [];
    if (this.list = i.filter((p) => p.active !== false), (this._debugVisible || this._useHash) && (this.defaultScene = this.getSceneFromHash() || ""), !this.splash) {
      this.splash = { view: null, hideWhen: "firstSceneEnter", zOrder: "top" };
      const p = { ...Ls, ...((a = t.config) == null ? void 0 : a.splash) ?? {} };
      p.view && (this.splash.view = typeof p.view == "function" ? new p.view() : p.view);
    }
    return this.defaultScene = this.defaultScene || ((h = t.config) == null ? void 0 : h.defaultScene) || ((l = (c = this.list) == null ? void 0 : c[0]) == null ? void 0 : l.id), !this.transition && ((d = t.config) != null && d.sceneTransition) && (this.transition = typeof t.config.sceneTransition == "function" ? new t.config.sceneTransition() : t.config.sceneTransition), this._defaultLoadMethod = t.config.defaultSceneLoadMethod || "immediate", this._debugVisible && this._createDebugMenu(), this._useHash && this._listenForHashChange(), Promise.resolve(void 0);
  }
  async loadDefaultScene() {
    return this.splash && await this._showSplash(), await this.app.assets.loadRequired(), this.splash.hideWhen === "requiredAssetsLoaded" && await this._hideSplash(), this.loadScene(this.defaultScene);
  }
  async loadScene(t) {
    var o;
    if (this._queue)
      return;
    this._lastScene = null;
    const e = typeof t == "string" ? t : t.id, i = typeof t == "string" ? this._defaultLoadMethod : (t == null ? void 0 : t.method) || this._defaultLoadMethod;
    this.currentScene && (this._lastScene = this.currentScene);
    const n = this.list.find((r) => r.id === e);
    if (!n)
      throw new Error(`Scene item not found  for id ${e}`);
    if ((o = n == null ? void 0 : n.plugins) != null && o.length)
      for (const r of n.plugins) {
        const a = this.app.getUnloadedPlugin(r);
        a && await this.app.loadPlugin(a);
      }
    switch (this._currentSceneId = e, this._queue = si(this._createCurrentScene), i) {
      case "exitEnter":
        this._queue.add(
          this._exitLastScene,
          this._destroyLastScene,
          this._unloadLastScene,
          this._loadCurrentScene,
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._enterCurrentScene,
          this._startCurrentScene
        );
        break;
      case "enterExit":
        this._queue.add(
          this._loadCurrentScene,
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._enterCurrentScene,
          this._startCurrentScene,
          this._destroyLastScene,
          this._unloadLastScene
        );
        break;
      case "enterBehind":
        this._queue.add(
          this._loadCurrentScene,
          this._initializeCurrentScene,
          this._addCurrentSceneBehind,
          this._enterCurrentScene,
          this._exitLastScene,
          this._destroyLastScene,
          this._unloadLastScene,
          this._startCurrentScene
        );
        break;
      case "transitionExitEnter":
        this._queue.add(
          this._showTransition,
          this._exitLastScene,
          this._destroyLastScene,
          this._unloadLastScene,
          this._loadCurrentScene,
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._hideTransition,
          this._enterCurrentScene,
          this._startCurrentScene
        );
        break;
      case "exitTransitionEnter":
        this._queue.add(
          this._exitLastScene,
          this._showTransition,
          this._destroyLastScene,
          this._unloadLastScene,
          this._loadCurrentScene,
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._hideTransition,
          this._enterCurrentScene,
          this._startCurrentScene
        );
        break;
      case "immediate":
      default:
        this._queue.add(
          this._destroyLastScene,
          this._unloadLastScene,
          this._loadCurrentScene,
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._enterCurrentScene,
          this._startCurrentScene
        );
        break;
    }
    this._queue.add(this._queueComplete), this._queue.start();
  }
  getSceneFromHash() {
    var e, i, n;
    let t = (e = window == null ? void 0 : window.location) == null ? void 0 : e.hash;
    if (t && (t = t.replace("#", ""), t.length > 0)) {
      for (let o = 0; o < this.list.length; o++)
        if (((n = (i = this.list[o]) == null ? void 0 : i.id) == null ? void 0 : n.toLowerCase()) === t.toLowerCase())
          return this.list[o].id;
    }
    return null;
  }
  getCoreSignals() {
    return ["onSceneChangeStart", "onSceneChangeComplete"];
  }
  getCoreFunctions() {
    return ["loadScene"];
  }
  _listenForHashChange() {
    window.addEventListener("hashchange", () => {
      const t = this.getSceneFromHash();
      t && this.loadScene(t);
    });
  }
  async _createCurrentScene() {
    var i;
    const t = this.list.find((n) => n.id === this._currentSceneId);
    let e;
    if (this._sceneModules.has(this._currentSceneId))
      e = this._sceneModules.get(this._currentSceneId);
    else {
      const n = await At(t);
      if (!n)
        throw new Error(`Couldn't load ${this._currentSceneId}"`);
      n[this._currentSceneId] ? e = n[this._currentSceneId] : e = n, e && this._sceneModules.set(this._currentSceneId, e);
    }
    if (!e)
      throw new Error(`Couldn't load ${this._currentSceneId}"`);
    this.currentScene = new e(), this.currentScene.id = this._currentSceneId, t != null && t.assets && (this.currentScene.assets = t.assets), t.autoUnloadAssets !== void 0 && (this.currentScene.autoUnloadAssets = t.autoUnloadAssets), this.onSceneChangeStart.emit({ exiting: ((i = this._lastScene) == null ? void 0 : i.id) || null, entering: this.currentScene.id });
  }
  _queueComplete() {
    return this.isFirstScene && this.app.assets.loadBackground(), this.isFirstScene = false, this.app.assets.loadSceneAssets(this.currentScene, true), this._lastScene = null, this.onSceneChangeComplete.emit({ current: this.currentScene.id }), this._queue = null, Promise.resolve();
  }
  async _destroyLastScene() {
    return this._lastScene && (this.view.removeChild(this._lastScene), this._lastScene.destroy()), Promise.resolve();
  }
  async _exitLastScene() {
    return this._lastScene && await this._lastScene.exit(), Promise.resolve();
  }
  async _loadCurrentScene() {
    await this.app.assets.loadSceneAssets(this.currentScene);
  }
  async _unloadLastScene() {
    return this._lastScene && this._lastScene.autoUnloadAssets ? this.app.assets.unloadSceneAssets(this._lastScene) : Promise.resolve();
  }
  async _initializeCurrentScene() {
    return await this.currentScene.initialize(), this.app.ticker.addOnce(() => {
      this.currentScene.resize(this.app.size);
    }), Promise.resolve();
  }
  _addCurrentScene() {
    return this.view.addChild(this.currentScene), Promise.resolve();
  }
  _addCurrentSceneBehind() {
    return this.view.addChildAt(this.currentScene, 0), Promise.resolve();
  }
  async _enterCurrentScene() {
    return await this.currentScene.enter(), this.isFirstScene && this.splash.hideWhen === "firstSceneEnter" && await this._hideSplash(), Promise.resolve();
  }
  async _startCurrentScene() {
    return this.currentScene.start(), Promise.resolve();
  }
  async _showTransition() {
    if (this.isFirstScene)
      return Promise.resolve();
    this.transition && (this.transition.active = true, this.transition.renderable = true, this.transition.visible = true, this.transition.progress = 0, await this.transition.enter());
  }
  async _hideTransition() {
    if (this.isFirstScene)
      return Promise.resolve();
    this.transition && (await this.transition.exit(), this.transition.progress = 0, this.transition.visible = false, this.transition.renderable = false, this.transition.active = false);
  }
  async _showSplash() {
    var t;
    await ((t = this.splash.view) == null ? void 0 : t.enter());
  }
  async _hideSplash() {
    var t, e, i, n;
    await ((t = this.splash.view) == null ? void 0 : t.exit()), (e = this.splash.view) == null || e.destroy(), (n = (i = this.splash.view) == null ? void 0 : i.parent) == null || n.removeChild(this.splash.view), this.splash.view = null;
  }
  _createDebugMenu() {
    this._debugMenu = document.createElement("div"), this._debugMenu.id = "scene-debug", this._debugMenu.style.cssText = "position: absolute; bottom: 0; left:0; width:48px; height:48px; z-index: 1000; background-color:rgba(0,0,0,0.8); color:white; border-top-right-radius:8px;";
    const t = document.createElement("i");
    t.style.cssText = "cursor:pointer; position:absolute;width:100%; font-style:normal; font-size:20px; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center; pointer-events:none", t.innerHTML = "🎬", this._debugMenu.appendChild(t), (v.containerElement || document.body).appendChild(this._debugMenu), this._sceneSelect = document.createElement("select"), this._sceneSelect.style.cssText = "padding:0; border-radius:5px; opacity:0; width:48px; height:48px; cursor:pointer", this._sceneSelect.value = this.defaultScene || "";
    const e = document.createElement("option");
    e.value = "", e.innerHTML = "Select a scene", e.setAttribute("disabled", "disabled"), this._sceneSelect.appendChild(e);
    const i = /* @__PURE__ */ new Map();
    if (this.list.forEach((n) => {
      if (n.debugGroup && !i.has(n.debugGroup)) {
        const o = document.createElement("optgroup");
        o.label = n.debugGroup, i.set(n.debugGroup, o), this._sceneSelect.appendChild(o);
      }
    }), i.size > 0) {
      const n = this.list.filter((o) => !o.debugGroup);
      if (n.length) {
        const o = document.createElement("optgroup");
        o.label = "Other", i.set("Other", o), this._sceneSelect.appendChild(o), n.forEach((r) => {
          r.debugGroup = "Other";
        });
      }
    }
    this.list.forEach((n) => {
      var r;
      const o = document.createElement("option");
      o.value = n.id, o.innerHTML = (n == null ? void 0 : n.debugLabel) || n.id, n.id === this.defaultScene && (o.selected = true), n.debugGroup ? (r = i.get(n.debugGroup)) == null || r.appendChild(o) : this._sceneSelect.appendChild(o);
    }), this._debugMenu.appendChild(this._sceneSelect), this._debugMenu.addEventListener("change", (n) => {
      if (this._queue) {
        n.preventDefault();
        return;
      }
      const r = n.target.value;
      r && (window.location.hash = r.toLowerCase());
    }), this.onSceneChangeStart.connect(this._disableDebugMenu), this.onSceneChangeComplete.connect(this._enableDebugMenu);
  }
  _enableDebugMenu() {
    var t, e;
    (e = (t = this._debugMenu) == null ? void 0 : t.querySelector("select")) == null || e.removeAttribute("disabled");
  }
  _disableDebugMenu() {
    var t, e;
    (e = (t = this._debugMenu) == null ? void 0 : t.querySelector("select")) == null || e.setAttribute("disabled", "disabled");
  }
};
var Ts = class extends O {
  /**
   * Creates callback arrays and registers to web events.
   */
  constructor() {
    super(), this.id = "webEvents", this.onResize = new u(), this.onVisibilityChanged = new u(), w(this);
  }
  get app() {
    return v.getInstance();
  }
  initialize() {
    document.addEventListener("visibilitychange", this._onVisibilityChanged, false), window.addEventListener("pagehide", this._onPageHide, false), window.addEventListener("pageshow", this._onPageShow, false), window.addEventListener("resize", this._onResize), document.addEventListener("fullscreenchange", this._onResize);
  }
  destroy() {
    document.removeEventListener("visibilitychange", this._onVisibilityChanged, false), window.removeEventListener("resize", this._onResize), document.removeEventListener("fullscreenchange", this._onResize), window.removeEventListener("pagehide", this._onPageHide, false), window.removeEventListener("pageshow", this._onPageShow, false);
  }
  getCoreSignals() {
    return ["onResize", "onVisibilityChanged"];
  }
  /**
   * Called when the browser visibility changes. Passes the `hidden` flag of the document to all callbacks.
   */
  _onVisibilityChanged() {
    this.onVisibilityChanged.emit(!document.hidden);
  }
  /**
   * Called when the browser resizes.
   */
  _onResize() {
    var n;
    const t = (n = this.app.renderer.canvas) == null ? void 0 : n.parentElement;
    let e = window.innerWidth, i = window.innerHeight;
    t && (t != null && t.getBoundingClientRect()) && (e = t.offsetWidth, i = t.offsetHeight), this.onResize.emit({ width: e, height: i });
  }
  /**
   * Called when the page is hidden.
   * Some browsers (like Safari) don't support the `visibilitychange` event, so we also listen for `pagehide`.
   * We're just mimicking the `visibilitychange` event here.
   */
  _onPageHide() {
    this.onVisibilityChanged.emit(false);
  }
  /**
   * Called when the page is shown.
   * Some browsers (like Safari) don't support the `visibilitychange` event, so we also listen for `pageshow`.
   * We're just mimicking the `visibilitychange` event here.
   * @private
   */
  _onPageShow() {
    this.onVisibilityChanged.emit(true);
  }
};
var Ds = class extends O {
  /**
   * Creates a new StorageAdapter.
   * @param {string} id The ID of the adapter. Default is 'StorageAdapter'.
   */
  constructor(t = "StorageAdapter") {
    super(t), this.id = t;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async load(t, ...e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async save(t, e, ...i) {
  }
};
var Fs = class extends Ds {
  constructor(t = "data") {
    super(t), this.id = t, this.backupKeys = [], this.backupAll = false, this.namespace = "", this.overrideWithLocalStorage = true;
  }
  /**
   * Destroys the adapter.
   */
  destroy() {
    this.data = {};
  }
  /**
   * Initializes the adapter.
   * @param {IApplication} _app The application that the adapter belongs to.
   * @param {Partial<ILocalStorageAdapterOptions>} options The options to initialize the adapter with.
   */
  initialize(t, e) {
    var i;
    this.namespace = (e == null ? void 0 : e.namespace) || ((i = t.config) == null ? void 0 : i.id) || "data", this.data = (e == null ? void 0 : e.initial) || {}, this.backupKeys = (e == null ? void 0 : e.backupKeys) || [], this.backupAll = (e == null ? void 0 : e.backupAll) || false, this.overrideWithLocalStorage = (e == null ? void 0 : e.overrideWithLocalStorage) !== false, (this.backupAll || this.backupKeys.length > 0) && (this.overrideWithLocalStorage && this.restoreFromLocalStorage(this.backupKeys), this.backupToLocalStorage(this.backupKeys));
  }
  /**
   * Saves data under a specified key in the local storage.
   * @param {string} key The key under which to save the data.
   * @param {any} data The data to save.
   * @returns {any} The saved data.
   */
  save(t, e) {
    return this.data[t] = e, (this.backupAll || this.backupKeys.includes(t)) && this.backupToLocalStorage([t]), e;
  }
  /**
   * Loads data from a specified key in the local storage.
   * @template T The type of the data to load.
   * @param {string} key The key from which to load the data.
   * @returns {T} The loaded data.
   */
  load(t) {
    return this.data[t];
  }
  set(t, e = true) {
    return e ? this.data = We({ ...this.data }, t) : this.data = t, (this.backupAll || this.backupKeys.length > 0) && this.backupToLocalStorage(this.backupKeys), this.data;
  }
  get() {
    return this.data;
  }
  /**
   * Deletes data from a specified key in the local storage.
   * @param {string} key The key from which to delete the data.
   */
  clear(t) {
    delete this.data[t], localStorage.removeItem(`${this.namespace}-${t}`);
  }
  /**
   * Backs up specified keys or all data to local storage.
   * @param {Array<keyof D>} [keys] The keys to back up. If not provided, all data will be backed up.
   */
  backupToLocalStorage(t) {
    const e = t && (t == null ? void 0 : t.length) > 0 ? Object.fromEntries(t.map((i) => [i, this.data[i]])) : this.data;
    for (const i in e)
      localStorage.setItem(`${this.namespace}-${i}`, JSON.stringify(e[i]));
  }
  /**
   * Restores data from local storage for specified keys or all data.
   * @param {Array<keyof D>} [keys] The keys to restore. If not provided, all data will be restored.
   */
  restoreFromLocalStorage(t) {
    (t && (t == null ? void 0 : t.length) > 0 ? t : Object.keys(this.data)).forEach((i) => {
      const n = localStorage.getItem(`${this.namespace}-${i}`);
      n !== null && (this.data[i] = JSON.parse(n));
    });
  }
};
function We(s, t) {
  for (const e in t)
    t[e] !== void 0 && Object.prototype.toString.call(t[e]) === "[object Object]" && e in s && typeof s[e] == "object" ? s[e] = We(s[e], t[e]) : t[e] !== void 0 && (s[e] = t[e]);
  return s;
}
var Se = [
  {
    id: "webEvents",
    module: Ts,
    namedExport: "WebEventsPlugin"
  },
  {
    id: "resizer",
    module: Es,
    namedExport: "ResizerPlugin"
  },
  {
    id: "assets",
    module: Ri,
    namedExport: "AssetsPlugin"
  },
  {
    id: "scenes",
    module: Ms,
    namedExport: "SceneManagerPlugin"
  },
  {
    id: "actions",
    module: Fi,
    namedExport: "ActionsPlugin"
  },
  {
    id: "input",
    module: Ss,
    namedExport: "InputPlugin"
  },
  {
    id: "keyboard",
    module: bs,
    namedExport: "KeyboardPlugin"
  },
  {
    id: "focus",
    module: es,
    namedExport: "FocusManagerPlugin"
  },
  {
    id: "popups",
    module: Ps,
    namedExport: "PopupManagerPlugin"
  },
  {
    id: "audio",
    module: Qi,
    namedExport: "AudioManagerPlugin"
  },
  {
    id: "i18n",
    module: ss,
    namedExport: "i18nPlugin"
  }
];
var Os = { BASE_URL: "/", DEV: false, MODE: "production", PROD: true, SSR: false };
var zs = {
  antialias: false,
  autoStart: true,
  resizeToContainer: false,
  backgroundColor: 0,
  backgroundAlpha: 1,
  clearBeforeRender: false,
  context: null,
  eventFeatures: void 0,
  eventMode: void 0,
  hello: false,
  powerPreference: "high-performance",
  premultipliedAlpha: false,
  preserveDrawingBuffer: false,
  resizeTo: void 0,
  sharedTicker: true,
  view: void 0,
  autoDensity: false,
  resolution: Math.max(window.devicePixelRatio, 2),
  // dill pixel options
  useHash: W,
  showSceneDebugMenu: W,
  showStats: W,
  useStore: true,
  useSpine: false,
  useVoiceover: false,
  storageAdapters: [],
  plugins: [],
  scenes: [],
  defaultSceneLoadMethod: "immediate",
  assets: {
    manifest: "./assets.json"
  }
};
var v = class _v extends Application {
  constructor() {
    super(), this.__dill_pixel_method_binding_root = true, this.onPause = new u(), this.onResume = new u(), this.onResize = new u(), this._plugins = /* @__PURE__ */ new Map(), this._isBooting = true, this._env = Os || {}, this._paused = false, this._center = new Point(0, 0), w(this);
  }
  get env() {
    return this._env;
  }
  get paused() {
    return this._paused;
  }
  set paused(t) {
    this._paused = t, this._paused ? this.onPause.emit() : this.onResume.emit();
  }
  resume() {
    this.paused = false;
  }
  pause() {
    this._paused = true;
  }
  togglePause() {
    this._paused = !this._paused;
  }
  get appVersion() {
    try {
      this._appVersion = __DILL_PIXEL_APP_VERSION;
    } catch {
      this._appVersion = -1;
    }
    return this._appVersion;
  }
  get appName() {
    if (!this._appName)
      try {
        this._appName = __DILL_PIXEL_APP_NAME;
      } catch {
        this._appName = "n/a";
      }
    return this._appName;
  }
  get i18n() {
    return this._i18n || (this._i18n = this.getPlugin("i18n")), this._i18n;
  }
  get resizer() {
    return this._resizer || (this._resizer = this.getPlugin("resizer")), this._resizer;
  }
  get actionsPlugin() {
    return this._actionsPlugin || (this._actionsPlugin = this.getPlugin("actions")), this._actionsPlugin;
  }
  get input() {
    return this._input || (this._input = this.getPlugin("input")), this._input;
  }
  // controls
  get controls() {
    return this._input || (this._input = this.getPlugin("input")), this._input.controls;
  }
  get store() {
    return this._store;
  }
  get center() {
    return this._center;
  }
  get assets() {
    return this._assetManager || (this._assetManager = this.getPlugin("assets")), this._assetManager;
  }
  get scenes() {
    return this._sceneManager || (this._sceneManager = this.getPlugin("scenes")), this._sceneManager;
  }
  get webEvents() {
    return this._webEventsManager || (this._webEventsManager = this.getPlugin("webEvents")), this._webEventsManager;
  }
  get keyboard() {
    return this._keyboardManager || (this._keyboardManager = this.getPlugin("keyboard")), this._keyboardManager;
  }
  get focus() {
    return this._focusManager || (this._focusManager = this.getPlugin("focus")), this._focusManager;
  }
  get size() {
    return this.resizer.size;
  }
  get popups() {
    return this._popupManager || (this._popupManager = this.getPlugin("popups")), this._popupManager;
  }
  get audio() {
    return this._audioManager || (this._audioManager = this.getPlugin("audio")), this._audioManager;
  }
  get actionContext() {
    return this.actionsPlugin.context;
  }
  set actionContext(t) {
    this.actionsPlugin.context = t;
  }
  get voiceover() {
    return this._voiceoverPlugin || (this._voiceoverPlugin = this.getPlugin(
      "voiceover",
      this._isBooting || this.config.useVoiceover
    )), this._voiceoverPlugin;
  }
  get captions() {
    return this._captionsPlugin || (this._captionsPlugin = this.getPlugin("captions", this._isBooting || this.config.useVoiceover)), this._captionsPlugin;
  }
  get isMobile() {
    return isMobile.any;
  }
  get isTouch() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }
  get signal() {
    return Te;
  }
  get func() {
    return $t;
  }
  get exec() {
    return $t;
  }
  get views() {
    var t;
    return this._views || (this._views = [this.scenes.view, this.popups.view], this.scenes.splash.view && this._views.push(this.scenes.splash.view), this.scenes.transition && this._views.push(this.scenes.transition), (t = this.captions) != null && t.view && this._views.push(this.captions.view)), this._views;
  }
  static getInstance() {
    return _v.instance;
  }
  /**
   * Destroy the application
   * This will destroy all plugins and the store
   * @param {RendererDestroyOptions} rendererDestroyOptions
   * @param {DestroyOptions} options
   */
  destroy(t, e) {
    this._plugins.forEach((i) => {
      i.destroy();
    }), this.store.destroy(), super.destroy(t, e);
  }
  setContainer(t) {
    _v.containerElement || (_v.containerElement = t);
  }
  async initialize(t) {
    if (_v.instance)
      throw new Error("Application is already initialized");
    _v.instance = this, this.config = Object.assign({ ...zs }, t), t.container && (_v.containerElement = t.container), _.initialize(this.config.logger), await this.boot(this.config), await this.preInitialize(this.config), await this.initAssets(), await this.init(this.config), await this.registerDefaultPlugins(), await this._setup(), this.plugins = await _i(this.config.plugins || []);
    for (let e = 0; e < this.plugins.length; e++) {
      const i = this.plugins[e];
      i && (i == null ? void 0 : i.autoLoad) !== false && await this.loadPlugin(i);
    }
    if (await this.registerPlugins(), this.config.useStore) {
      this.storageAdapters = await gi(this.config.storageAdapters || []);
      for (let e = 0; e < this.storageAdapters.length; e++) {
        const i = this.storageAdapters[e];
        if (this.store.hasAdapter(i.id)) {
          _.error(`Storage Adapter with id "${i.id}" already registered. Not registering.`);
          continue;
        }
        const n = await At(i);
        await this.registerStorageAdapter(new n(i.id), i.options);
      }
      await this.registerStorageAdapters();
    }
    return await this.setup(), await this.loadDefaultScene(), this.renderer.canvas.focus(), this.config.container && this.config.container.classList.add("loaded"), this._isBooting = false, _v.instance;
  }
  getPlugin(t, e = false) {
    const i = this._plugins.get(t);
    return !i && e && _.error(`Plugin with name "${t}" not found.`), i;
  }
  async postInitialize() {
    globalThis.__PIXI_APP__ = this, this._resize(), this._plugins.forEach((t) => {
      t.postInitialize(this);
    }), this.webEvents.onVisibilityChanged.connect((t) => {
      t ? this.audio.restore() : this.audio.suspend();
    });
  }
  getUnloadedPlugin(t) {
    var e;
    return (e = this.plugins) == null ? void 0 : e.find((i) => i.id === t);
  }
  async loadPlugin(t, e = false) {
    if (this._plugins.has(t.id))
      return await this.registerPlugin(this._plugins.get(t.id), t.options);
    const i = await At(t), n = new i(t.id);
    n.id !== t.id && (n.id = t.id);
    let o = t.options;
    return e && !o && (o = this.config[n.id]), await this.registerPlugin(n, o);
  }
  /**
   * Gets an ActionSignal for the specified action type
   * @template TActionData - The type of data associated with the action
   * @param {A} action - The action to get the signal for
   * @returns {ActionSignal<TActionData>} A signal that can be used to listen for the action
   * @example
   * // Listen for a 'jump' action
   * app.actions('jump').connect((data) => {
   *   player.jump(data.power);
   * });
   */
  actions(t) {
    return this.actionsPlugin.getAction(t);
  }
  /**
   * Dispatches an action with optional data
   * @template TActionData - The type of data to send with the action
   * @param {A} action - The action to dispatch
   * @param {TActionData} [data] - Optional data to send with the action
   * @example
   * // Send a 'jump' action with power data
   * app.sendAction('jump', { power: 100 });
   */
  sendAction(t, e) {
    this.actionsPlugin.sendAction(t, e);
  }
  /**
   * Dispatches an action with optional data
   * alias for sendAction
   * @template TActionData - The type of data to send with the action
   * @param {A} action - The action to dispatch
   * @param {TActionData} [data] - Optional data to send with the action
   * @example
   * // Send a 'jump' action with power data
   * app.action('jump', { power: 100 });
   */
  action(t, e) {
    this.actionsPlugin.sendAction(t, e);
  }
  /**
   * Checks if an action is currently active
   * @param {A} action - The action to check
   * @returns {boolean} True if the action is active, false otherwise
   * @example
   * // Check if the 'run' action is active
   * if (app.isActionActive('run')) {
   *   player.updateSpeed(runningSpeed);
   * }
   */
  isActionActive(t) {
    return this.input.controls.isActionActive(t);
  }
  /**
   * Get a storage adapter by id
   * @param {string} adapterId
   * @returns {IStorageAdapter}
   */
  getStorageAdapter(t) {
    return this.store.getAdapter(t);
  }
  /**
   * Get a storage adapter by id
   * @param {string} adapterId
   * @returns {IStorageAdapter}
   */
  get data() {
    return this.store.getAdapter("data");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async boot(t) {
    console.log(
      `%c App info - %c${this.appName} | %cv${this.appVersion} `,
      "background: rgba(31, 41, 55, 1); color: #74b64c",
      "background: rgba(31, 41, 55, 1); color: #74b64c; font-weight:bold",
      "background: rgba(31, 41, 55, 1); color: #74b64c; font-weight:bold"
    );
  }
  /**
   * Pre-initialize the application
   * This is called before the application is initialized
   * should register any pixi extensions, etc
   * @param {Partial<IApplicationOptions>} config
   * @returns {Promise<void>}
   * @protected
   */
  async preInitialize(t) {
    t.useSpine && await this.loadPlugin({
      id: "SpinePlugin",
      module: () => import("./SpinePlugin-BmtOdimW-2OR6W5WF.js"),
      namedExport: "SpinePlugin"
    }), this.config.useStore && (this._store = new xi(), this._store.initialize(this), this.registerDefaultStorageAdapters());
  }
  // plugins
  async registerPlugin(t, e) {
    return this._plugins.has(t.id) ? (_.error(`Plugin with id "${t.id}" already registered. Not registering.`), t.initialize(this, e)) : (t.registerCoreFunctions(), t.registerCoreSignals(), this._plugins.set(t.id, t), t.initialize(this, e));
  }
  async registerDefaultPlugins() {
    for (let e = 0; e < Se.length; e++) {
      const i = Se[e];
      await this.loadPlugin(i, true);
    }
    (this.config.showStats === true || W && this.config.showStats !== false) && await this.loadPlugin({
      id: "stats",
      module: () => import("./StatsPlugin-oCsIuD9Y-IW4A3OU2.js"),
      namedExport: "StatsPlugin"
    }), this.config.useVoiceover && (await this.loadPlugin({
      id: "voiceover",
      module: () => import("./VoiceOverPlugin-C1E6kNts-2N6S526O.js"),
      namedExport: "VoiceOverPlugin",
      options: this.config.voiceover || void 0
    }), await this.loadPlugin({
      id: "captions",
      module: () => import("./CaptionsPlugin-DazrJZ9z-ARWFCCQW.js"),
      namedExport: "CaptionsPlugin",
      options: this.config.captions || void 0
    }));
  }
  async registerDefaultStorageAdapters() {
    const t = new Fs();
    await this.registerStorageAdapter(t, this.config.data);
  }
  async registerPlugins() {
    return Promise.resolve();
  }
  // storage
  async registerStorageAdapters() {
    return Promise.resolve();
  }
  async registerStorageAdapter(t, e) {
    return this.store.registerAdapter(t, e);
  }
  async setup() {
  }
  async initAssets() {
    var e, i;
    const t = ((e = this.config.assets) == null ? void 0 : e.initOptions) || {};
    if ((i = this.config.assets) != null && i.manifest) {
      let n = this.config.assets.manifest || t.manifest;
      Ee(n) && (n = await n), t.manifest = n;
    }
    await Assets.init(t), this.manifest = Assets.resolver._manifest;
  }
  async loadDefaultScene() {
    return this.scenes.loadDefaultScene();
  }
  async _resize() {
    this.resizer.resize(), console.log("Application._resize", this.size), this.ticker.addOnce(() => {
      this._center.set(this.size.width * 0.5, this.size.height * 0.5), this.views.forEach((t) => {
        !t || !t.position || t.position.set(this._center.x, this._center.y);
      }), this.onResize.emit(this.size);
    });
  }
  /**
   * Called after the application is initialized
   * Here we add application specific signal listeners, etc
   * @returns {Promise<void>}
   * @private
   */
  async _setup() {
    var t, e;
    return W && (globalThis.__PIXI_APP__ = this), this._resize(), this.webEvents.onResize.connect(this._resize, -1), (t = this.scenes.splash) != null && t.view && this.scenes.splash.zOrder === "bottom" && this._addSplash(), this.scenes.view.label = "SceneManager", this.stage.addChild(this.scenes.view), (e = this.scenes.splash) != null && e.view && this.scenes.splash.zOrder === "top" && this._addSplash(), this.scenes.transition && (this.scenes.transition.label = "SceneManager:: Transition", this.stage.addChild(this.scenes.transition)), this.stage.addChild(this.popups.view), this.focus.view.label = "FocusManager", this.stage.addChild(this.focus.view), Promise.resolve();
  }
  _addSplash() {
    this.scenes.splash.view && (this.scenes.splash.view.label = "SceneManager:: Splash", this.stage.addChild(this.scenes.splash.view));
  }
};
var jn = R.Collector;
var Hn = R.CollectorArray;
var Gn = R.CollectorLast;
var Vn = R.CollectorUntil0;
var Xn = R.CollectorWhile0;
var qn = R.SignalConnections;

export {
  Pe,
  W,
  Rs,
  Rt,
  Us,
  _,
  ke,
  $s,
  Ee,
  si,
  ni,
  At,
  Jt,
  Ws,
  Ut,
  ri,
  Ht,
  ai,
  Ks,
  hi,
  X,
  $,
  js,
  Hs,
  Gs,
  Vs,
  Xs,
  qs,
  Ys,
  li,
  Ns,
  I,
  Zs,
  Qs,
  Js,
  tn,
  ci,
  w,
  en,
  Le,
  sn,
  Gt,
  nn,
  on,
  rn,
  an,
  wt,
  bt,
  hn,
  Ot,
  te,
  ee,
  di,
  fi,
  pi,
  ln,
  cn,
  ie,
  un,
  dn,
  fn,
  pn,
  _n,
  gn,
  Me,
  se,
  ne,
  mn,
  yn,
  vn,
  wn,
  bn,
  _i,
  gi,
  xn,
  mi,
  yi,
  vi,
  bi,
  Cn,
  Te,
  $t,
  xi,
  u,
  O,
  Fi,
  Mn,
  Oi,
  zi,
  Bi,
  Tn,
  Dn,
  Fn,
  On,
  Ri,
  Ui,
  ge,
  Qi,
  Ji,
  es,
  ss,
  Z,
  K,
  ns,
  Vt,
  Re,
  ye,
  ve,
  B,
  we,
  as,
  zn,
  Bn,
  hs,
  ft,
  In,
  Rn,
  cs,
  be,
  ds,
  xe,
  Et,
  Ce,
  Lt,
  ct,
  Ue,
  Un,
  vs,
  k,
  Mt,
  E,
  L,
  Bt,
  M,
  ws,
  vt,
  Q,
  bs,
  xs,
  C,
  Wn,
  Cs,
  As,
  Ss,
  Kn,
  Ps,
  Es,
  Ms,
  Ts,
  Ds,
  Fs,
  v,
  jn,
  Hn,
  Gn,
  Vn,
  Xn,
  qn
};
//# sourceMappingURL=chunk-2O2QZPWA.js.map
