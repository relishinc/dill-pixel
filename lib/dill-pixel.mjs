import { Point as T, isMobile as Qe, Assets as p, Container as K, Graphics as Ae, Texture as gt, Sprite as ke, Text as mt, BitmapText as vt, Rectangle as Ue, EventEmitter as X, Ticker as V, DOMAdapter as yt, path as ee, ExtensionType as Be, LoaderParserPriority as wt, extensions as bt, Application as xt } from "pixi.js";
import { gsap as M } from "gsap";
var F = {}, z = {};
Object.defineProperty(z, "__esModule", { value: !0 });
z.Collector = void 0;
class Ct {
  /**
   * Create a new collector.
   *
   * @param signal The signal to emit.
   */
  constructor(e) {
    this.emit = (...t) => {
      e.emitCollecting(this, t);
    };
  }
}
z.Collector = Ct;
var he = {};
Object.defineProperty(he, "__esModule", { value: !0 });
he.CollectorArray = void 0;
const St = z;
class Pt extends St.Collector {
  constructor() {
    super(...arguments), this.result = [];
  }
  handleResult(e) {
    return this.result.push(e), !0;
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
}
he.CollectorArray = Pt;
var le = {};
Object.defineProperty(le, "__esModule", { value: !0 });
le.CollectorLast = void 0;
const At = z;
class kt extends At.Collector {
  handleResult(e) {
    return this.result = e, !0;
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
}
le.CollectorLast = kt;
var ue = {};
Object.defineProperty(ue, "__esModule", { value: !0 });
ue.CollectorUntil0 = void 0;
const Lt = z;
class Et extends Lt.Collector {
  constructor() {
    super(...arguments), this.result = !1;
  }
  handleResult(e) {
    return this.result = e, this.result;
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
    this.result = !1;
  }
}
ue.CollectorUntil0 = Et;
var ce = {};
Object.defineProperty(ce, "__esModule", { value: !0 });
ce.CollectorWhile0 = void 0;
const Mt = z;
class Ft extends Mt.Collector {
  constructor() {
    super(...arguments), this.result = !1;
  }
  handleResult(e) {
    return this.result = e, !this.result;
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
    this.result = !1;
  }
}
ce.CollectorWhile0 = Ft;
var de = {}, fe = {};
Object.defineProperty(fe, "__esModule", { value: !0 });
fe.SignalConnectionImpl = void 0;
class Tt {
  /**
   * @param link The actual link of the connection.
   * @param parentCleanup Callback to cleanup the parent signal when a connection is disconnected
   */
  constructor(e, t) {
    this.link = e, this.parentCleanup = t;
  }
  disconnect() {
    return this.link !== null ? (this.link.unlink(), this.link = null, this.parentCleanup(), this.parentCleanup = null, !0) : !1;
  }
  set enabled(e) {
    this.link && this.link.setEnabled(e);
  }
  get enabled() {
    return this.link !== null && this.link.isEnabled();
  }
}
fe.SignalConnectionImpl = Tt;
var _e = {};
Object.defineProperty(_e, "__esModule", { value: !0 });
_e.SignalLink = void 0;
class Le {
  constructor(e = null, t = null, s = 0) {
    this.enabled = !0, this.newLink = !1, this.callback = null, this.prev = e ?? this, this.next = t ?? this, this.order = s;
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
  insert(e, t) {
    let s = this.prev;
    for (; s !== this && !(s.order <= t); )
      s = s.prev;
    const n = new Le(s, s.next, t);
    return n.callback = e, s.next = n, n.next.prev = n, n;
  }
}
_e.SignalLink = Le;
Object.defineProperty(de, "__esModule", { value: !0 });
de.Signal = void 0;
const zt = fe, Dt = _e;
let Ot = class {
  constructor() {
    this.head = new Dt.SignalLink(), this.hasNewLinks = !1, this.emitDepth = 0, this.connectionsCount = 0;
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
  connect(e, t = 0) {
    this.connectionsCount++;
    const s = this.head.insert(e, t);
    return this.emitDepth > 0 && (this.hasNewLinks = !0, s.newLink = !0), new zt.SignalConnectionImpl(s, () => this.decrementConnectionCount());
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
  disconnect(e) {
    for (let t = this.head.next; t !== this.head; t = t.next)
      if (t.callback === e)
        return this.decrementConnectionCount(), t.unlink(), !0;
    return !1;
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
  emit(...e) {
    this.emitDepth++;
    for (let t = this.head.next; t !== this.head; t = t.next)
      t.isEnabled() && t.callback && t.callback.apply(null, e);
    this.emitDepth--, this.unsetNewLink();
  }
  emitCollecting(e, t) {
    this.emitDepth++;
    for (let s = this.head.next; s !== this.head; s = s.next)
      if (s.isEnabled() && s.callback) {
        const n = s.callback.apply(null, t);
        if (!e.handleResult(n))
          break;
      }
    this.emitDepth--, this.unsetNewLink();
  }
  unsetNewLink() {
    if (this.hasNewLinks && this.emitDepth === 0) {
      for (let e = this.head.next; e !== this.head; e = e.next)
        e.newLink = !1;
      this.hasNewLinks = !1;
    }
  }
};
de.Signal = Ot;
var pe = {};
Object.defineProperty(pe, "__esModule", { value: !0 });
pe.SignalConnections = void 0;
class It {
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
}
pe.SignalConnections = It;
(function(i) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.SignalConnections = i.Signal = i.CollectorWhile0 = i.CollectorUntil0 = i.CollectorLast = i.CollectorArray = i.Collector = void 0;
  var e = z;
  Object.defineProperty(i, "Collector", { enumerable: !0, get: function() {
    return e.Collector;
  } });
  var t = he;
  Object.defineProperty(i, "CollectorArray", { enumerable: !0, get: function() {
    return t.CollectorArray;
  } });
  var s = le;
  Object.defineProperty(i, "CollectorLast", { enumerable: !0, get: function() {
    return s.CollectorLast;
  } });
  var n = ue;
  Object.defineProperty(i, "CollectorUntil0", { enumerable: !0, get: function() {
    return n.CollectorUntil0;
  } });
  var o = ce;
  Object.defineProperty(i, "CollectorWhile0", { enumerable: !0, get: function() {
    return o.CollectorWhile0;
  } });
  var r = de;
  Object.defineProperty(i, "Signal", { enumerable: !0, get: function() {
    return r.Signal;
  } });
  var a = pe;
  Object.defineProperty(i, "SignalConnections", { enumerable: !0, get: function() {
    return a.SignalConnections;
  } });
})(F);
class l extends F.Signal {
  // add a connectOnce method to the Signal class, that will connect a listener to the signal, and then remove it after the first time it is called
  connectOnce(e, t) {
    const s = (...o) => {
      e(...o), n.disconnect();
    }, n = this.connect(s, t);
    return n;
  }
  connectNTimes(e, t, s) {
    let n = 0;
    const o = (...a) => {
      e(...a), n++, n >= t && r.disconnect();
    }, r = this.connect(o, s);
    return r;
  }
}
const Ze = process.env.NODE_ENV, te = Ze === "development", Gs = Ze === "production";
function xe(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
function Vs(i) {
  return i.split(" ").map(xe).join(" ");
}
const ye = {
  log: "background: #74b64c; color: black;",
  warn: "background: yellow; color: black;",
  error: "background: orange; color: black;"
}, m = class m {
  constructor(e) {
    m._instance = this, m.mode = e !== void 0 ? e : te ? "development" : "default", ["development", "default", "disabled"].includes(m.mode) || (m.mode = "default");
  }
  static get mode() {
    return m._mode;
  }
  static set mode(e) {
    m._mode = e;
  }
  static initialize(e) {
    if (m._instance)
      throw new Error("Logger has already been instantiated.");
    m._instance = new m(e);
  }
  static log(...e) {
    m.trace("log", ...e);
  }
  static warn(...e) {
    m.trace("warn", ...e);
  }
  static error(...e) {
    m.trace("error", ...e);
  }
  static trace(e = "log", ...t) {
    if (m.mode !== "disabled") {
      if (m.mode === "default")
        return console.log(`%c ${xe(e)} `, ye[e], ...t);
      console.groupCollapsed(`%c ${xe(e)} `, ye[e], ...t), console.trace("%c Stack ", ye[e]), console.groupEnd();
    }
  }
};
m._instance = null, m._mode = "disabled";
let _ = m;
const Ut = (i = 0) => new Promise((e) => setTimeout(e, i * 1e3)), Je = (i) => i && typeof i.then == "function";
function Bt(...i) {
  return new $t(i);
}
class $t {
  /**
   * Creates a new Queue.
   * @param {(Promise<any> | (() => Promise<T>))[]} promises The promises to add to the queue.
   */
  constructor(e = []) {
    this._currentIndex = 0, this._isPaused = !1, this._isCanceled = !1, this._promises = e;
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
  add(...e) {
    this._promises.push(...e);
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
    this._isPaused = !0;
  }
  /**
   * Resumes the execution of the promises in the queue.
   */
  resume() {
    this._isPaused && (this._isPaused = !1, this._next());
  }
  /**
   * Cancels the execution of the promises in the queue.
   */
  cancel() {
    this._isCanceled = !0, this._promises = [];
  }
  /**
   * Executes the next promise in the queue.
   * @private
   * @returns {Promise<void>} A promise that resolves when the next promise in the queue has been executed.
   */
  async _next() {
    if (this._isPaused || this._isCanceled || this._currentIndex >= this._promises.length)
      return;
    const e = this._promises[this._currentIndex];
    try {
      const t = typeof e == "function" ? await e() : await e;
      this._results.push(t), this._currentIndex++, this._next();
    } catch (t) {
      _.error("Queue didn't complete due to an error:", t, "Cancelling Queue"), this._isCanceled = !0;
    }
  }
}
function Rt(i) {
  return typeof i == "function" && /^class\s/.test(Function.prototype.toString.call(i));
}
async function se(i) {
  let e, t;
  return Je(i.module) ? (e = await i.module, t = i != null && i.namedExport ? e[i.namedExport] : e.default) : typeof i.module == "function" ? Rt(i.module) ? (e = i.module, t = e) : (e = await i.module(), t = i != null && i.namedExport ? e[i.namedExport] : e.default) : (e = i.module, t = e), t;
}
function D(i, e = !1, t = 0, s = 0) {
  if (i instanceof T)
    t = i.x, s = i.y;
  else if (Array.isArray(i))
    t = i[0], s = i[1] === void 0 ? i[0] : i[1];
  else if (typeof i == "object") {
    const n = i;
    t = n.x || 0, s = n.y || 0;
  } else
    t = i ?? t, s = i ?? s;
  return e ? new T(t, s) : { x: t, y: s };
}
function $e(i) {
  if (i === void 0)
    return { width: 0, height: 0 };
  if (Array.isArray(i))
    return { width: i[0], height: i[1] === void 0 ? i[0] : i[1] };
  if (i instanceof T)
    return { width: i.x, height: i.y };
  if (typeof i == "object") {
    const e = i;
    return { width: e.width || 0, height: e.height || 0 };
  } else
    return { width: i ?? 0, height: i ?? 0 };
}
function jt(i) {
  return Array.isArray(i) ? i.join("/") : i;
}
function Ws(i, e, t) {
  t && e ? i.name = `${jt(t)}/${e}` : typeof e == "string" && (i.name = `${e}`), typeof e == "string" && (i.__textureString = e), Array.isArray(t) ? i.__textureSheetArray = t : t && (i.__textureSheet = t);
}
function Hs(i, e) {
  let t;
  return function(...s) {
    t !== void 0 && clearTimeout(t), t = setTimeout(() => {
      i(...s);
    }, e);
  };
}
function Re(i, e) {
  let t;
  for (const s of i) {
    if (s[0] === e)
      return t;
    t = s;
  }
}
function et(i) {
  return Array.from(i.entries()).pop();
}
function Ks(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function Xs(i, e, t) {
  return i + (e - i) * t;
}
function Z(i, e) {
  return e.reduce((t, s) => s in i ? { ...t, [s]: i[s] } : t, {});
}
function j(i, e) {
  return Object.entries(e).filter(([t]) => !i.includes(t)).reduce((t, [s, n]) => ({ ...t, [s]: n }), {});
}
function Gt(i, ...e) {
  e.forEach((t) => {
    const s = i[t];
    typeof s == "function" && (i[t] = s.bind(i));
  });
}
function Vt(i, e = [], t = []) {
  let s = Object.getPrototypeOf(i);
  const n = [];
  for (; s; ) {
    const o = Object.getOwnPropertyNames(s).filter((r) => {
      const a = Object.getOwnPropertyDescriptor(s, r);
      return typeof (a == null ? void 0 : a.value) == "function" && r !== "constructor" && !e.some((h) => r.startsWith(h)) && !t.includes(r);
    });
    if (n.push(...o), s === Object.prototype || Object.prototype.hasOwnProperty.call(s.constructor, "__dill_pixel_method_binding_root"))
      break;
    s = Object.getPrototypeOf(s);
  }
  return n;
}
function C(i, e = [], t = []) {
  Vt(i, e, t).forEach((s) => {
    i[s] = i[s].bind(i);
  });
}
function Ys(i, e, ...t) {
  typeof i[e] == "function" && i[e](...t);
}
function J(i, e) {
  return i >= 0 && i <= 1 ? i * e : i;
}
function we(i) {
  if (Array.isArray(i))
    return {
      top: i[0],
      right: (i == null ? void 0 : i[1]) ?? i[0],
      bottom: (i == null ? void 0 : i[2]) ?? i[0],
      left: (i == null ? void 0 : i[3]) ?? (i == null ? void 0 : i[1]) ?? i[0] ?? 0
    };
  if (typeof i == "number")
    return { top: i, right: i, bottom: i, left: i };
  if (typeof i == "object") {
    const e = i;
    return e.x !== void 0 && e.y !== void 0 ? {
      top: e.y,
      right: e.x,
      bottom: e.y,
      left: e.x
    } : {
      top: i.top ?? 0,
      right: i.right ?? 0,
      bottom: i.bottom ?? 0,
      left: i.left ?? 0
    };
  } else
    return { top: 0, right: 0, bottom: 0, left: 0 };
}
const Ns = window.devicePixelRatio > 1 || window.matchMedia && window.matchMedia(
  "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)"
).matches, qs = Qe.any;
class Wt {
  constructor() {
    this._adapters = /* @__PURE__ */ new Map();
  }
  /**
   * Registers a new storage adapter with the store.
   * @param {IStorageAdapter} adapter The adapter to register.
   * @param {any} adapterOptions The options to initialize the adapter with.
   * @returns {Promise<void>} A promise that resolves when the adapter has been registered and initialized.
   */
  async registerAdapter(e, t) {
    if (this._adapters.has(e.id))
      return _.error(`Storage Adapter with id "${e.id}" already registered. Not registering.`), Promise.resolve();
    this._adapters.set(e.id, e), await e.initialize(this._app, t);
  }
  /**
   * Retrieves a registered storage adapter.
   * @template T The type of the adapter.
   * @param {string} adapterId The ID of the adapter.
   * @returns {T} The adapter.
   */
  getAdapter(e) {
    const t = this._adapters.get(e);
    if (!t)
      throw new Error(`Adapter ${e} not found`);
    return t;
  }
  /**
   * Checks if a storage adapter is registered.
   * @param {string} adapterId The ID of the adapter.
   * @returns {boolean} True if the adapter is registered, false otherwise.
   */
  hasAdapter(e) {
    return this._adapters.has(e);
  }
  /**
   * Destroys the store and all its adapters.
   */
  destroy() {
    this._adapters.forEach((e) => {
      e.destroy();
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
  async save(e, t, s, n = !0) {
    var a;
    let o = [];
    const r = [];
    Array.isArray(e) || (typeof e == "object" ? o = [e] : o = [e]), (o[0] === "*" || ((a = o[0]) == null ? void 0 : a.adapterId) === "*") && (o = Array.from(this._adapters.keys()));
    for (let h = 0; h < o.length; h++) {
      let u, c = !1;
      if (typeof o[h] == "object") {
        const v = o[h];
        u = v.adapterId, c = v.awaitSave ?? !1;
      } else
        u = o[h], c = n;
      const d = this._adapters.get(u);
      if (!d)
        throw new Error(`Adapter ${o[h]} not found`);
      c ? r.push(await d.save(t, s)) : r.push(void d.save(t, s));
    }
    return r;
  }
  /**
   * Loads data from a storage adapter.
   * @param {string} adapterId The ID of the adapter.
   * @param {string} key The key to load the data from.
   * @returns {Promise<any>} A promise that resolves with the loaded data.
   */
  async load(e, t) {
    const s = this._adapters.get(e);
    if (!s)
      throw new Error(`Adapter ${e} not found`);
    return await s.load(t);
  }
  initialize(e) {
    return this._app = e, this;
  }
}
const tt = {}, Ce = {}, Ht = "8.5.3", Kt = "8.1.5";
function Xt() {
  const i = `%c Dill Pixel Game Framework v${Ht} | %cPixi.js v${Kt} %c| %chttps://dillpixel.io `;
  console.log(
    i,
    "background: rgba(31, 41, 55, 1);color: #74b64c",
    "background: rgba(31, 41, 55, 1);color: #e91e63",
    "background: rgba(31, 41, 55, 1);color: #74b64c",
    "background: rgba(31, 41, 55, 1);color: #74b64c; font-weight: bold"
  );
}
const Yt = "dill-pixel-game-container";
function Nt(i) {
  const e = document.createElement("div");
  return e.setAttribute("id", i), document.body.appendChild(e), e;
}
async function Qs(i = { id: "DillPixelApplication" }, e = g, t = Yt, s = !0) {
  s && Xt();
  let n = null;
  if (typeof t == "string" ? (n = document.getElementById(t), n || (n = Nt(t))) : t instanceof HTMLElement ? n = t : t === window && (n = document.body), !n)
    throw new Error(
      "You passed in a DOM Element, but none was found. If you instead pass in a string, a container will be created for you, using the string for its id."
    );
  i.resizeToContainer && (i.resizeTo = n), i.container = n;
  const o = new e();
  if (await o.initialize(i), n)
    n.appendChild(o.canvas), o.setContainer(n);
  else
    throw new Error("No element found to append the view to.");
  return await Ut(0.01), await o.postInitialize(), o;
}
class E {
  constructor(e = "Plugin") {
    this.id = e, this._signalConnections = new F.SignalConnections(), C(this), this.__dill_pixel_method_binding_root = !0;
  }
  get app() {
    return g.getInstance();
  }
  destroy() {
    this._signalConnections.disconnectAll();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async initialize(e, t) {
    return Promise.resolve(void 0);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async postInitialize(e) {
    return Promise.resolve(void 0);
  }
  /**
   * Add signal connections to the container.
   * @param args - The signal connections to add.
   */
  addSignalConnection(...e) {
    for (const t of e)
      this._signalConnections.add(t);
  }
  clearSignalConnections() {
    this._signalConnections.disconnectAll();
  }
  /**
   * @override
   * @protected
   */
  registerCoreFunctions() {
    this.getCoreFunctions().forEach((t) => {
      const s = t;
      Ce[s] = this[t];
    });
  }
  /**
   * @override
   * @protected
   */
  registerCoreSignals() {
    this.getCoreSignals().forEach((t) => {
      const s = t;
      tt[s] = this[t];
    });
  }
  getCoreFunctions() {
    return [];
  }
  getCoreSignals() {
    return [];
  }
}
class qt extends E {
  /**
   * Creates a new StorageAdapter.
   * @param {string} id The ID of the adapter. Default is 'StorageAdapter'.
   */
  constructor(e = "StorageAdapter") {
    super(e), this.id = e;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async load(e) {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async save(e, t, ...s) {
  }
}
class Zs extends qt {
  constructor(e = "localStorage") {
    super(e), this.id = e, this.namespace = "";
  }
  /**
   * Gets the prefix to use for the keys in the local storage.
   * @returns {string} The prefix.
   */
  get prefix() {
    return this.namespace ? `${this.namespace}_` : "";
  }
  /**
   * Destroys the adapter.
   */
  destroy() {
  }
  /**
   * Initializes the adapter.
   * @param {IApplication} _app The application that the adapter belongs to.
   * @param {Partial<ILocalStorageAdapterOptions>} options The options to initialize the adapter with.
   */
  initialize(e, t) {
    _.log("LocalStorageAdapter initialized"), this.namespace = (t == null ? void 0 : t.namespace) || "";
  }
  /**
   * Saves data under a specified key in the local storage.
   * @param {string} key The key under which to save the data.
   * @param {any} data The data to save.
   * @returns {any} The saved data.
   */
  save(e, t) {
    return localStorage.setItem(`${this.prefix}${e}`, JSON.stringify(t)), JSON.stringify(t);
  }
  /**
   * Loads data from a specified key in the local storage.
   * @template T The type of the data to load.
   * @param {string} key The key from which to load the data.
   * @returns {T} The loaded data.
   */
  load(e) {
    const t = localStorage.getItem(`${this.prefix}${e}`);
    return t ? JSON.parse(t) : null;
  }
  /**
   * Deletes data from a specified key in the local storage.
   * @param {string} key The key from which to delete the data.
   */
  clear(e) {
    localStorage.deleteItem(`${this.prefix}${e}`);
  }
}
class Qt extends E {
  constructor() {
    super(...arguments), this.id = "assets", this.onLoadStart = new l(), this.onLoadProgress = new l(), this.onLoadComplete = new l(), this._required = {}, this._background = {};
  }
  initialize(e, t) {
    t != null && t.preload && (this._required = t.preload), t != null && t.background && (this._background = t.background), _.log("AssetsPlugin initialized", e, t, this._required);
  }
  async loadRequired() {
    return this._handleLoadStart(), this._handleLoadProgress(0), this._required && (this._required.assets && await p.load(this._required.assets, this._handleLoadProgress), this._required.bundles && await p.loadBundle(this._required.bundles, this._handleLoadProgress)), this._handleLoadComplete(), Promise.resolve();
  }
  loadBackground() {
    this._background && (this._background.assets && p.backgroundLoad(this._background.assets), this._background.bundles && p.backgroundLoadBundle(this._background.bundles));
  }
  async loadAssets(e) {
    return p.load(e, this._handleLoadProgress);
  }
  async loadBundles(e) {
    return p.loadBundle(e, this._handleLoadProgress);
  }
  async unloadSceneAssets(e) {
    var t, s, n, o;
    return (s = (t = e.assets) == null ? void 0 : t.preload) != null && s.assets && p.unload(e.assets.preload.assets), (o = (n = e.assets) == null ? void 0 : n.preload) != null && o.bundles && p.unloadBundle(e.assets.preload.bundles), Promise.resolve();
  }
  async loadSceneAssets(e, t = !1) {
    var s, n, o, r, a;
    t ? (s = e.assets) != null && s.background && (e.assets.background.assets && p.backgroundLoad(e.assets.background.assets), e.assets.background.bundles && p.backgroundLoadBundle(e.assets.background.bundles)) : (this._handleLoadStart(), this._handleLoadProgress(0), (o = (n = e.assets) == null ? void 0 : n.preload) != null && o.assets && await p.load(e.assets.preload.assets, this._handleLoadProgress), (a = (r = e.assets) == null ? void 0 : r.preload) != null && a.bundles && await p.loadBundle(e.assets.preload.bundles, this._handleLoadProgress), this._handleLoadComplete());
  }
  getCoreFunctions() {
    return ["loadSceneAssets", "unloadSceneAssets", "loadAssets", "loadBundles", "loadRequired"];
  }
  getCoreSignals() {
    return ["onLoadStart", "onLoadProgress", "onLoadComplete"];
  }
  _handleLoadStart() {
    _.log("AssetsPlugin:: onLoadStart"), this.onLoadStart.emit();
  }
  _handleLoadProgress(e) {
    _.log("AssetsPlugin:: onLoadProgress", e), this.onLoadProgress.emit(e);
  }
  _handleLoadComplete() {
    this._handleLoadProgress(1), _.log("AssetsPlugin:: onLoadComplete"), this.onLoadComplete.emit();
  }
}
class Zt extends E {
  /**
   * Creates callback arrays and registers to web events.
   */
  constructor() {
    super(), this.id = "webEvents", this.onResize = new l(), this.onVisibilityChanged = new l(), C(this);
  }
  get app() {
    return g.getInstance();
  }
  initialize() {
    document.addEventListener("visibilitychange", this._onVisibilityChanged, !1), window.addEventListener("resize", this._onResize), document.addEventListener("fullscreenchange", this._onResize);
  }
  destroy() {
    document.removeEventListener("visibilitychange", this._onVisibilityChanged, !1), window.removeEventListener("resize", this._onResize), document.removeEventListener("fullscreenchange", this._onResize);
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
    const e = (n = this.app.renderer.canvas) == null ? void 0 : n.parentElement;
    let t = window.innerWidth, s = window.innerHeight;
    e && (e != null && e.getBoundingClientRect()) && (t = e.offsetWidth, s = e.offsetHeight), this.onResize.emit({ width: t, height: s });
  }
}
class Jt extends E {
  constructor() {
    super(), this.id = "scenes", this.onSceneChangeStart = new l(), this.onSceneChangeComplete = new l(), this.view = new K(), this.isFirstScene = !0, this.scenes = [], this._sceneModules = /* @__PURE__ */ new Map(), this._lastScene = null, this._defaultLoadMethod = "immediate", this._debugVisible = !1, C(this);
  }
  setDefaultLoadMethod(e) {
    this._defaultLoadMethod = e;
  }
  destroy() {
  }
  initialize(e) {
    var t, s, n, o, r, a;
    return this._debugVisible = ((t = this.app.config) == null ? void 0 : t.showSceneDebugMenu) === !0 || te && ((s = this.app.config) == null ? void 0 : s.showSceneDebugMenu) !== !1, this.view.sortableChildren = !0, this.scenes = ((n = e.config) == null ? void 0 : n.scenes) || [], this._debugVisible && (this.defaultScene = this._getSceneFromHash() || ""), this.defaultScene = this.defaultScene || ((o = e.config) == null ? void 0 : o.defaultScene) || ((a = (r = this.scenes) == null ? void 0 : r[0]) == null ? void 0 : a.id), this._defaultLoadMethod = e.config.defaultSceneLoadMethod || "immediate", _.log("SceneManager initialize::", this.scenes), this._debugVisible && this._createDebugMenu(), Promise.resolve(void 0);
  }
  async loadDefaultScene() {
    return await this.app.assets.loadRequired(), this.loadScene(this.defaultScene);
  }
  async loadScene(e) {
    var o;
    if (this._queue)
      return;
    this._lastScene = null;
    const t = typeof e == "string" ? e : e.id, s = typeof e == "string" ? this._defaultLoadMethod : (e == null ? void 0 : e.method) || this._defaultLoadMethod;
    this.currentScene && (this._lastScene = this.currentScene);
    const n = this.scenes.find((r) => r.id === t);
    if (!n)
      throw new Error(`Scene item not found  for id ${t}`);
    if ((o = n == null ? void 0 : n.plugins) != null && o.length)
      for (const r of n.plugins) {
        const a = this.app.getUnloadedPlugin(r);
        a && await this.app.loadPlugin(a);
      }
    switch (this._currentSceneId = t, this._queue = Bt(this._createCurrentScene), s) {
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
  getCoreSignals() {
    return ["onSceneChangeStart", "onSceneChangeComplete"];
  }
  getCoreFunctions() {
    return ["loadScene"];
  }
  async _createCurrentScene() {
    var s;
    const e = this.scenes.find((n) => n.id === this._currentSceneId);
    let t;
    if (this._sceneModules.has(this._currentSceneId))
      t = this._sceneModules.get(this._currentSceneId);
    else {
      const n = await se(e);
      if (!n)
        throw new Error(`Couldn't load ${this._currentSceneId}"`);
      n[this._currentSceneId] ? t = n[this._currentSceneId] : t = n, t && this._sceneModules.set(this._currentSceneId, t);
    }
    if (!t)
      throw new Error(`Couldn't load ${this._currentSceneId}"`);
    this.currentScene = new t(), this.currentScene.id = this._currentSceneId, e != null && e.assets && (this.currentScene.assets = e.assets), e.autoUnloadAssets !== void 0 && (this.currentScene.autoUnloadAssets = e.autoUnloadAssets), this.onSceneChangeStart.emit({ exiting: ((s = this._lastScene) == null ? void 0 : s.id) || null, entering: this.currentScene.id });
  }
  _queueComplete() {
    return this.isFirstScene && this.app.assets.loadBackground(), this.isFirstScene = !1, this.app.assets.loadSceneAssets(this.currentScene, !0), this._lastScene = null, this.onSceneChangeComplete.emit({ current: this.currentScene.id }), this._queue = null, Promise.resolve();
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
    return await this.currentScene.enter(), Promise.resolve();
  }
  async _startCurrentScene() {
    return this.currentScene.start(), Promise.resolve();
  }
  _createDebugMenu() {
    this._debugMenu = document.createElement("div"), this._debugMenu.style.cssText = "position: absolute; bottom: 0; left:0; width:48px; height:48px; z-index: 1000; background-color:rgba(0,0,0,0.8); color:white; border-top-right-radius:8px;";
    const e = document.createElement("i");
    e.style.cssText = "cursor:pointer; position:absolute;width:100%; font-style:normal; font-size:20px; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center; pointer-events:none", e.innerHTML = "🎬", this._debugMenu.appendChild(e), (g.containerElement || document.body).appendChild(this._debugMenu), this._sceneSelect = document.createElement("select"), this._sceneSelect.style.cssText = "padding:0; border-radius:5px; opacity:0; width:48px; height:48px; cursor:pointer", this._sceneSelect.value = this.defaultScene || "";
    const t = document.createElement("option");
    t.value = "", t.innerHTML = "Select a scene", this._sceneSelect.appendChild(t), this.scenes.forEach((s) => {
      const n = document.createElement("option");
      n.value = s.id, n.innerHTML = (s == null ? void 0 : s.debugLabel) || s.id, s.id === this.defaultScene && (n.selected = !0), this._sceneSelect.appendChild(n);
    }), this._debugMenu.appendChild(this._sceneSelect), this._debugMenu.addEventListener("change", (s) => {
      if (this._queue) {
        s.preventDefault();
        return;
      }
      const o = s.target.value;
      o && (window.location.hash = o.toLowerCase());
    }), window.addEventListener("hashchange", () => {
      const s = this._getSceneFromHash();
      s && this.loadScene(s);
    }), this.onSceneChangeStart.connect(this._disableDebugMenu), this.onSceneChangeComplete.connect(this._enableDebugMenu);
  }
  _enableDebugMenu() {
    var e, t;
    (t = (e = this._debugMenu) == null ? void 0 : e.querySelector("select")) == null || t.removeAttribute("disabled");
  }
  _disableDebugMenu() {
    var e, t;
    (t = (e = this._debugMenu) == null ? void 0 : e.querySelector("select")) == null || t.setAttribute("disabled", "disabled");
  }
  _getSceneFromHash() {
    var t, s, n;
    let e = (t = window == null ? void 0 : window.location) == null ? void 0 : t.hash;
    if (e && (e = e.replace("#", ""), e.length > 0)) {
      for (let o = 0; o < this.scenes.length; o++)
        if (((n = (s = this.scenes[o]) == null ? void 0 : s.id) == null ? void 0 : n.toLowerCase()) === e.toLowerCase())
          return this.scenes[o].id;
    }
    return null;
  }
}
var U = /* @__PURE__ */ ((i) => (i.Keyboard = "keyboard", i.Gamepad = "gamepad", i.Mouse = "mouse", i.Touch = "touch", i))(U || {}), st = /* @__PURE__ */ ((i) => (i.General = "general", i.Menu = "menu", i.Game = "game", i))(st || {}), x = /* @__PURE__ */ ((i) => (i.Up = "up", i.Down = "down", i.Left = "left", i.Right = "right", i.Action = "action", i.Next = "next", i.Back = "back", i.Pause = "pause", i.Unpause = "unpause", i.Start = "start", i.Menu = "menu", i))(x || {});
const es = [
  x.Up,
  x.Down,
  x.Left,
  x.Right,
  x.Action,
  x.Pause,
  x.Unpause,
  x.Start,
  x.Menu,
  x.Back,
  x.Next
], je = {
  actions: es
};
class ts extends E {
  constructor() {
    super(...arguments), this.id = "input", this.activeGamepads = /* @__PURE__ */ new Map(), this.activeControllers = /* @__PURE__ */ new Set([]), this.onGamepadConnected = new l(), this.onGamepadDisconnected = new l(), this.onControllerActivated = new l(), this.onControllerDeactivated = new l(), this.onContextChanged = new l(), this._actionSignals = /* @__PURE__ */ new Map(), this._context = st.General;
  }
  get context() {
    return this._context;
  }
  set context(e) {
    this._context !== e && (this._context = e, this.onContextChanged.emit(e));
  }
  async initialize(e, t = je) {
    this.options = { ...je, ...t }, e.stage.eventMode = "static", e.stage.on("touchstart", this._onTouchStart), e.stage.on("globalmousemove", this._onMouseMove), window.addEventListener("keydown", this._onKeyDown), window.addEventListener("gamepadconnected", this._onGamepadConnected), window.addEventListener("gamepaddisconnected", this._onGamepadDisconnected);
  }
  destroy() {
    this.app.stage.off("touchstart", this._onTouchStart), this.app.stage.off("globalmousemove", this._onMouseMove), window.removeEventListener("keydown", this._onKeyDown), window.removeEventListener("gamepadconnected", this._onGamepadConnected), window.removeEventListener("gamepaddisconnected", this._onGamepadDisconnected), super.destroy();
  }
  isControllerActive(e) {
    return this.activeControllers.has(e);
  }
  isGamepadActive(e) {
    return this.activeGamepads.has(e.id);
  }
  actions(e) {
    return this._actionSignals.has(e) || this._actionSignals.set(e, new l()), this._actionSignals.get(e);
  }
  sendAction(e, t) {
    return this.actions(e).emit({ id: e, context: this.context, data: t });
  }
  setActionContext(e) {
    return this.context = e, e;
  }
  getCoreFunctions() {
    return ["setActionContext", "sendAction", "actions"];
  }
  getCoreSignals() {
    return [
      "onGamepadConnected",
      "onGamepadDisconnected",
      "onControllerActivated",
      "onControllerDeactivated",
      "onContextChanged"
    ];
  }
  _activateController(e) {
    this.activeControllers.has(e) || (this.activeControllers.add(e), this.onControllerActivated.emit(e));
  }
  _deactivateController(e) {
    this.activeControllers.has(e) && (this.activeControllers.delete(e), this.onControllerDeactivated.emit(e));
  }
  _activateGamepad(e) {
    this.activeGamepads.set(e.id, e);
  }
  _deactivateGamepad(e) {
    this.activeGamepads.delete(e);
  }
  _onTouchStart() {
    this._activateController(U.Touch);
  }
  _onMouseMove() {
    this._activateController(U.Mouse);
  }
  _onKeyDown() {
    this._activateController(U.Keyboard);
  }
  _onGamepadConnected(e) {
    this._activateController(U.Gamepad), this._activateController(e.gamepad.id), this._activateGamepad(e.gamepad), this.onGamepadConnected.emit(e.gamepad);
  }
  _onGamepadDisconnected(e) {
    this._deactivateGamepad(e.gamepad.id), this.sendAction(x.Pause), this.onGamepadDisconnected.emit(e.gamepad), this.activeGamepads.size === 0 && this._deactivateController(U.Gamepad);
  }
}
class ss extends E {
  constructor() {
    super(...arguments), this.id = "keyboard", this.onGlobalKeyDown = new l(), this.onGlobalKeyUp = new l(), this._keysDown = /* @__PURE__ */ new Set(), this._keyDownSignals = /* @__PURE__ */ new Map(), this._keyUpSignals = /* @__PURE__ */ new Map(), this._enabled = !0;
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(e) {
    this._enabled = e;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialize(e) {
    document.addEventListener("keydown", this._handleKeyDown), document.addEventListener("keyup", this._handleKeyUp);
  }
  destroy() {
    document.removeEventListener("keydown", this._handleEvent), document.removeEventListener("keyup", this._handleEvent), document.addEventListener("keydown", this._handleKeyDown), document.addEventListener("keyup", this._handleKeyUp);
  }
  onKeyDown(e) {
    return this._checkAndAddSignal((e == null ? void 0 : e.toLowerCase()) || void 0, "keydown");
  }
  onKeyUp(e) {
    return this._checkAndAddSignal((e == null ? void 0 : e.toLowerCase()) || void 0, "keyup");
  }
  isKeyDown(e) {
    return this._keysDown.has(e);
  }
  _update() {
  }
  getCoreSignals() {
    return ["onGlobalKeyDown", "onGlobalKeyUp"];
  }
  getCoreFunctions() {
    return ["onKeyDown", "onKeyUp", "isKeyDown"];
  }
  _handleKeyDown(e) {
    this._keysDown.add(e.key), this.onGlobalKeyDown.emit({ event: e, key: e.key });
  }
  _handleKeyUp(e) {
    this._keysDown.delete(e.key), this.onGlobalKeyUp.emit({ event: e, key: e.key });
  }
  /**
   * Check if the signal exists and add it if it doesn't
   * Also, if this is the first signal, start listening for the event
   * @param {string} key
   * @param {KeyboardEventType} eventType
   * @returns {KeySignal}
   * @private
   */
  _checkAndAddSignal(e, t) {
    const s = t === "keydown" ? this._keyDownSignals : this._keyUpSignals;
    return s.size || this._listen(t), e === void 0 && (e = "*undefined*"), s.has(e) || s.set(e, new l()), s.get(e);
  }
  _listen(e) {
    document.addEventListener(e, this._handleEvent);
  }
  _handleEvent(e) {
    var s, n;
    if (!this._enabled)
      return;
    const t = e.type === "keydown" ? this._keyDownSignals : this._keyUpSignals;
    (s = t.get("*undefined*")) == null || s.emit({ event: e, key: e.key.toLowerCase() }), (n = t.get(e.key.toLowerCase())) == null || n.emit({ event: e, key: e.key });
  }
}
class is extends K {
  constructor(e) {
    super(), C(this), this._config = {
      color: 65535,
      shape: "rounded rectangle",
      radius: 8,
      lineWidth: 2,
      ...e
    }, this._graphics = new Ae(), this.addChild(this._graphics);
  }
  draw(e) {
    this.clear(), this.setFocusTarget(e), this.focusTarget && (this._graphics.strokeStyle = { width: this._config.lineWidth, color: this._config.color, alpha: 1 }, this._config.shape === "rectangle" ? this._graphics.rect(0, 0, this.focusBounds.width, this.focusBounds.height) : this._graphics.roundRect(0, 0, this.focusBounds.width, this.focusBounds.height, this._config.radius), this._graphics.stroke());
  }
  clear() {
    this.clearFocusTarget();
  }
  destroy(e) {
    this.clear(), this._graphics.destroy(), super.destroy(e);
  }
  setFocusTarget(e) {
    e && (this.focusTarget = e, this.focusBounds = this.focusTarget.getFocusArea().clone(), g.getInstance().ticker.add(this.updatePosition));
  }
  clearFocusTarget() {
    this.focusTarget = null, g.getInstance().ticker.remove(this.updatePosition);
  }
  updatePosition() {
    if (!this.focusTarget)
      return;
    const e = this.focusTarget.getGlobalPosition(), t = this.focusTarget.getFocusPosition();
    if (t) {
      const s = D(t);
      e.x += s.x, e.y += s.y;
    }
    this.position.set(e.x, e.y);
  }
}
class ns {
  constructor(e) {
    this.id = e, this.currentFocusable = null, this.lastFocusable = null, this.defaultFocusable = null, this._focusables = [], this._currentIndex = 0, this._current = !1;
  }
  set current(e) {
    this._current = e, this.setCurrent();
  }
  get availableFocusables() {
    return this._focusables.filter((e) => e.focusEnabled);
  }
  setCurrent() {
    if (this._current)
      this.defaultFocusable || (this.defaultFocusable = this._focusables[0]), this.sortFocusables();
    else
      for (let e = 0; e < this._focusables.length; e++)
        this._focusables[e].accessible = !1;
  }
  hasFocusable(e) {
    return e ? this._focusables.indexOf(e) > -1 : !1;
  }
  addFocusable(e, t = !1) {
    this._focusables.push(e), t && (this.defaultFocusable = e), this._current && this.sortFocusables();
  }
  removeFocusable(e) {
    const t = this._focusables.indexOf(e);
    t !== -1 && (this._focusables.splice(t, 1), this.currentFocusable === e && (this.currentFocusable = null), this.lastFocusable === e && (this.lastFocusable = null), this.defaultFocusable === e && (this.defaultFocusable = null)), this._current && this.sortFocusables();
  }
  sortFocusables() {
    for (let e = 0; e < this._focusables.length; e++)
      this._focusables[e].accessible = this._current, this._focusables[e].tabIndex = this._current ? Math.max(e, 1) + 1 : -1, this._focusables[e] === this.defaultFocusable && (this._focusables[e].tabIndex = this._current ? 1 : -1);
    this._current && this._focusables.sort((e, t) => e.tabIndex - t.tabIndex);
  }
  setCurrentFocusable(e) {
    return e ? (this._currentIndex = this._focusables.indexOf(e), this.currentFocusable = e) : (this._currentIndex = -1, this.currentFocusable = null), this.currentFocusable;
  }
  next() {
    return this._currentIndex = this._currentIndex + 1, this._currentIndex >= this._focusables.length && (this._currentIndex = 0), this.currentFocusable = this._focusables[this._currentIndex], this.currentFocusable;
  }
  prev() {
    return this._currentIndex = this._currentIndex - 1, this._currentIndex < 0 && (this._currentIndex = this._focusables.length - 1), this.currentFocusable = this._focusables[this._currentIndex], this.currentFocusable;
  }
}
class os extends E {
  constructor() {
    super(...arguments), this.id = "focus", this.view = new K(), this.onFocusManagerActivated = new l(), this.onFocusManagerDeactivated = new l(), this.onFocusLayerChange = new l(), this.onFocusChange = new l(), this._focusTarget = null, this._keyboardActive = !1, this._layers = /* @__PURE__ */ new Map(), this._currentLayerId = null, this._active = !1, this._enabled = !0;
  }
  get layers() {
    return this._layers;
  }
  get currentLayerId() {
    return this._currentLayerId;
  }
  get active() {
    return this._active;
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(e) {
    this._enabled = e;
  }
  get layerCount() {
    return this._layers.size;
  }
  initialize(e) {
    var s;
    Gt(this, "removeAllFocusLayers", "_handleGlobalMouseMove", "_handleGlobalPointerDown");
    const t = ((s = e.config) == null ? void 0 : s.focusOptions) || {};
    t.usePixiAccessibility = t.usePixiAccessibility ?? !1, this._focusOutliner = typeof (t == null ? void 0 : t.outliner) == "function" ? new t.outliner() : new is(t.outliner), this._options = t, this.view.addChild(this._focusOutliner), this._updatePixiAccessibility(), this._setupKeyboardListeners(), this._setupAppListeners();
  }
  destroy() {
    this._removeGlobalListeners(), this.deactivate(), this._focusOutliner.destroy(), this._layers.clear(), super.destroy();
  }
  deactivate() {
    this._setTarget(null), this._updateOutliner(), this._active = !1;
  }
  add(e, t, s = !1) {
    this.addFocusable(e, t, s);
  }
  addFocusable(e, t, s = !1) {
    (t === void 0 || t == null) && (t = this._currentLayerId ?? null);
    const n = this._layers.get(t);
    if (!n) {
      _.error(`Layer with ID ${t} does not exist.`);
      return;
    }
    Array.isArray(e) || (e = [e]), e.forEach((o, r) => {
      n.addFocusable(o, r === 0 && s);
    }), this._active && s && this._setTarget(n.currentFocusable || n.defaultFocusable || null, !this._active);
  }
  remove(e) {
    this.removeFocusable(e);
  }
  removeFocusable(e) {
    Array.isArray(e) || (e = [e]), this._layers.forEach((t) => {
      e.forEach((s) => {
        t.removeFocusable(s);
      });
    });
  }
  setLayerOrder(e) {
    const t = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      if (!this._layers.has(s))
        throw new Error(`Layer with ID ${s} does not exist.`);
      t.set(s, this._layers.get(s));
    }), this._layers = t;
  }
  addFocusLayer(e, t = !0, s) {
    e === void 0 && (e = this._layers.size);
    let n;
    return this._layers.has(e) ? (_.error(`Layer with ID ${e} already exists.`), n = this._layers.get(e)) : (n = new ns(e), this._layers.set(e, n)), (t || this._currentLayerId === null) && this.setFocusLayer(e), s && this.addFocusable(s, e), n;
  }
  removeFocusLayer(e, t = !0) {
    var n;
    if (e === void 0 && t)
      return this._removeTopLayer();
    if (!this._layers.has(e))
      throw new Error(`Layer with ID ${e} does not exist.`);
    const s = (n = Re(this._layers, e)) == null ? void 0 : n[0];
    this._layers.delete(e), this._postDelete(s);
  }
  restart(e = !1) {
    var s, n, o;
    const t = this._getCurrentLayer();
    this._setTarget(
      e ? ((n = t == null ? void 0 : t.availableFocusables) == null ? void 0 : n[((s = t == null ? void 0 : t.availableFocusables) == null ? void 0 : s.length) - 1]) || null : ((o = t == null ? void 0 : t.availableFocusables) == null ? void 0 : o[0]) || null
    );
  }
  forceFocus(e) {
    this.focus(e);
  }
  setFocus(e) {
    this.focus(e);
  }
  focus(e) {
    this._setTarget(e);
  }
  setFocusLayer(e) {
    if (!this._layers.has(e))
      throw new Error(`Layer with ID ${e} does not exist.`);
    this._currentLayerId = e;
    const t = this._getCurrentLayer();
    t && (t.current = !0, this._layers.forEach((s, n) => {
      s.current = n === e;
    }), t.sortFocusables(), this._setTarget(t.currentFocusable || t.defaultFocusable || null, !this._active)), this.onFocusLayerChange.emit(this._currentLayerId);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  postInitialize(e) {
  }
  clearFocus() {
    this._setTarget(null);
  }
  removeAllFocusLayers() {
    this._layers.clear(), this._setTarget(null);
  }
  _onKeyDown(e) {
    if (!(!this._enabled || e.key !== "Tab" && e.key !== "Enter" && e.key !== " " && e.key !== "Space") && !this._options.usePixiAccessibility)
      if (e.preventDefault(), e.key === "Tab") {
        const t = this._getCurrentLayer();
        if (!(t == null ? void 0 : t.availableFocusables))
          return;
        this._keyboardActive ? e.shiftKey ? this._prev() : this._next() : (this._activate(), this._setTarget(t.currentFocusable || t.defaultFocusable || null));
      } else
        (e.key === "Enter" || e.key === " " || e.key === "Space") && this._focusTarget && this._focusTarget.isFocused && this._focusTarget.emit("pointerdown", { type: "pointerdown" });
  }
  _onKeyUp(e) {
    !this._enabled || e.key !== "Enter" && e.key !== " " && e.key !== "Space" || this._options.usePixiAccessibility || (e.preventDefault(), this._focusTarget && this._focusTarget.isFocused && (this._focusTarget.emit("click", { type: "click" }), this._focusTarget.emit("pointerup", { type: "pointerup" })));
  }
  _onMouseMove(e) {
    e.movementX === 0 && e.movementY === 0 || this._deactivate();
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
    var t;
    const e = (t = this._getCurrentLayer()) == null ? void 0 : t.next();
    if (!e) {
      _.error("FocusManager:: _next():: No focusable found in the current layer.");
      return;
    }
    this._setTarget(e);
  }
  _prev() {
    var t;
    const e = (t = this._getCurrentLayer()) == null ? void 0 : t.prev();
    if (!e) {
      _.error("FocusManager:: _prev():: No focusable found in the current layer.");
      return;
    }
    this._setTarget(e);
  }
  _deactivate() {
    this._keyboardActive && (this._keyboardActive = !1);
  }
  _activate() {
    this._keyboardActive || (this._keyboardActive = !0, globalThis.document.addEventListener("mousemove", this._onMouseMove, !0));
  }
  _updatePixiAccessibility() {
    this.app.renderer.accessibility._div.setAttribute("id", "pixi-accessibility"), this._options.usePixiAccessibility || (this.app.renderer.accessibility._div.setAttribute("disabled", "disabled"), this.app.renderer.accessibility.destroy(), globalThis.addEventListener("keydown", this._onKeyDown, !1), globalThis.addEventListener("keyup", this._onKeyUp, !1));
  }
  _getCurrentLayer() {
    return this._currentLayerId != null && this._layers.get(this._currentLayerId) || null;
  }
  _removeTopLayer() {
    var s, n;
    const e = (s = et(this._layers)) == null ? void 0 : s[0], t = (n = Re(this._layers, e)) == null ? void 0 : n[0];
    e !== void 0 && (this._layers.delete(e), this._postDelete(t));
  }
  _postDelete(e) {
    this._layers.size === 0 ? this._currentLayerId = null : e !== void 0 && this.setFocusLayer(e);
  }
  _setTarget(e, t = !0) {
    const s = this._getCurrentLayer(), n = this._focusTarget;
    if (this._focusTarget = e, n && this._active && this._clearFocusTarget(n), this.app.renderer.accessibility.isActive || this._keyboardActive)
      this._focusTarget ? (this._active || (this._active = !0), this._options.usePixiAccessibility && !this._focusTarget._accessibleDiv && this.app.renderer.accessibility.postrender(), this._options.usePixiAccessibility && this.app.ticker.addOnce(() => {
        var o, r;
        (r = (o = this._focusTarget) == null ? void 0 : o._accessibleDiv) == null || r.focus();
      }), s != null && s.hasFocusable(e) ? this._focusTarget && (this._focusTarget.focusIn(), this._focusTarget.isFocused = !0, this._focusTarget.onFocusIn.emit(this._focusTarget), s.setCurrentFocusable(this._focusTarget), this._updateOutliner()) : _.warn(
        "The focusable",
        e,
        `does not exist on the current focus layer: ${this._currentLayerId}`
      )) : this._focusOutliner.clear();
    else if (this._focusOutliner.clear(), this._active && t) {
      this._active = !1, this.onFocusManagerDeactivated.emit();
      return;
    }
    n !== e && this._active && this.onFocusChange.emit({ focusable: this._focusTarget, layer: this._currentLayerId });
  }
  _clearFocusTarget(e) {
    e && (e.focusOut(), e.isFocused = !1, e.onFocusOut.emit(e), e.blur(), e.onBlur.emit(e));
  }
  _setupKeyboardListeners() {
    window.addEventListener("keydown", this._onKeyDown, !1), this._addGlobalListeners();
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
}
function rs(i) {
  return class extends i {
    constructor() {
      super(...arguments), this.onAnimationStart = new l(), this.onAnimationUpdate = new l(), this.onAnimationComplete = new l(), this._activeTweens = [];
    }
    /**
     * Animate method.
     * @param animationProps - Animation properties.
     * @param instance - Instance to animate.
     * @returns GSAP Tween instance.
     */
    animate(e, t = this) {
      const s = M.to(t, {
        ...e,
        onStart: () => {
          this._onAnimationStart(s);
        },
        onUpdate: () => {
          this._onAnimationUpdate(s);
        },
        onComplete: () => {
          this._onAnimationComplete(s), this._activeTweens = this._activeTweens.filter((n) => n !== s);
        }
      });
      return this._activeTweens.push(s), s;
    }
    /**
     * Animate from method.
     * @param animationProps - Animation properties.
     * @param instance - Instance to animate.
     * @returns GSAP Tween instance.
     */
    animateFrom(e, t = this) {
      const s = M.from(t, {
        ...e,
        onStart: () => {
          this._onAnimationStart(s);
        },
        onUpdate: () => {
          this._onAnimationUpdate(s);
        },
        onComplete: () => {
          this._onAnimationComplete(s), this._activeTweens = this._activeTweens.filter((n) => n !== s);
        }
      });
      return this._activeTweens.push(s), s;
    }
    /**
     * Animate sequence method.
     * @param sequences - Array of animation sequences.
     * @param instance - Instance to animate.
     * @returns GSAP Timeline instance.
     */
    animateSequence(e, t = this) {
      return this._activeTimeline || (this._activeTimeline = M.timeline({
        onStart: () => this._onAnimationStart(this._activeTimeline),
        onUpdate: () => this._onAnimationUpdate(this._activeTimeline),
        onComplete: () => {
          this._onAnimationComplete(this._activeTimeline), this._activeTimeline = void 0;
        }
      })), e.forEach((s) => {
        var n;
        (n = this._activeTimeline) == null || n.to(t, s);
      }), this._activeTimeline;
    }
    /**
     * Clear animations method.
     */
    clearAnimations() {
      var e;
      this._activeTweens.forEach((t) => t.kill()), this._activeTweens = [], (e = this._activeTimeline) == null || e.clear(), this._activeTimeline = void 0;
    }
    /**
     * Pause animations method.
     */
    pauseAnimations() {
      var e;
      this._activeTweens.forEach((t) => t.pause()), (e = this._activeTimeline) == null || e.pause();
    }
    /**
     * Resume animations method.
     */
    resumeAnimations() {
      var e;
      this._activeTweens.forEach((t) => t.play()), (e = this._activeTimeline) == null || e.play();
    }
    /**
     * Animate from-to method.
     * @param fromProps - Animation properties for the start state.
     * @param toProps - Animation properties for the end state.
     * @param instance - Instance to animate.
     * @returns GSAP Tween instance.
     */
    animateFromTo(e, t, s = this) {
      const n = M.fromTo(
        s,
        {
          ...e
        },
        {
          ...t
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
      var e;
      this._activeTweens.forEach((t) => t.reverse()), (e = this._activeTimeline) == null || e.reverse();
    }
    isAnimationPlaying() {
      var e;
      return ((e = this._activeTweens) == null ? void 0 : e.some((t) => !t.paused())) || this._activeTimeline && !this._activeTimeline.paused() || !1;
    }
    // utility animations
    /**
     * Shake animation.
     * @param config - Configuration object.
     * @param instance
     * @returns GSAP Tween instance.
     */
    shake(e = {}, t = this) {
      const { duration: s = 0.05, intensity: n = 12, times: o = 41 } = e, a = { x: t.x, y: t.y }.x, h = o % 2 === 0 ? o + 1 : o, u = M.to(t, {
        x: a + M.utils.random(-Math.max(n, 2), Math.max(n, 2)),
        repeat: h,
        yoyo: !0,
        duration: s
      });
      return this._activeTweens.push(u), u;
    }
    /**
     * Pulse animation.
     * @param config - Configuration object.
     * @param instance
     * @returns GSAP Tween instance.
     */
    pulse(e = {}, t = this) {
      const { duration: s = 0.5, intensity: n = 1.2, times: o = 1 } = e, r = o * 2 - 1, a = M.to(t == null ? void 0 : t.scale, {
        x: n,
        y: n,
        repeat: r,
        yoyo: !0,
        duration: s
      });
      return this._activeTweens.push(a), a;
    }
    /**
     * Bob animation.
     * @param config - Configuration object.
     * @param instance
     * @returns GSAP Tween instance.
     */
    bob(e = {}, t = this) {
      const { duration: s = 0.5, intensity: n = 10 } = e, o = M.to(t, {
        y: `-=${n}`,
        repeat: -1,
        yoyo: !0,
        duration: s
      });
      return this._activeTweens.push(o), o;
    }
    /**
     * Private method for handling animation start event.
     * @param animationEntity - Animation entity.
     */
    _onAnimationStart(e) {
      this.onAnimationStart.emit(e);
    }
    /**
     * Private method for handling animation update event.
     * @param animationEntity - Animation entity.
     */
    _onAnimationUpdate(e) {
      this.onAnimationUpdate.emit(e);
    }
    /**
     * Private method for handling animation complete event.
     * @param animationEntity - Animation entity.
     */
    _onAnimationComplete(e) {
      this.onAnimationComplete.emit(e);
    }
  };
}
function it(i) {
  return class extends i {
    constructor(...e) {
      super(...e), this.isFocused = !1, this.isKeyDown = !1, this.focusEnabled = !0, this.tabIndex = 0, this.accessible = !1, this.accessibleType = "button", this.accessibleTitle = "Focusable", this.accessibleHint = "Press enter to focus", this.accessiblePointerEvents = "auto", this.accessibleChildren = !0, this.onFocus = new l(), this.onFocusIn = new l(), this.onFocusOut = new l(), this.onBlur = new l(), this._eventsDisabled = !1, this.eventMode = "static", this.on("mouseover", this._onMouseOver), this.on("mousedown", this._onMouseDown), this.on("click", this._handleClick), this.on("tap", this._handleClick);
    }
    get app() {
      return g.getInstance();
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
    _onMouseOver(e) {
      this.app.focus.setFocus(this);
    }
    _onMouseDown(e) {
      this._maybeEmit("pointerdown", e);
    }
    _handleClick(e) {
      this._maybeEmit("click", e), this.click();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _handleKeyUp(e) {
    }
    _maybeEmit(e, t) {
      this._eventsDisabled || t.type || (this._eventsDisabled = !0, this.emit(e, { type: e }), this._eventsDisabled = !1);
    }
  };
}
it.INITTED = !1;
function as(i) {
  return class extends i {
    constructor(...e) {
      super(...e), this._signals = /* @__PURE__ */ new Map(), this._emitSignal = this._emitSignal.bind(this), this.eventMode = "static";
    }
    onInteraction(e) {
      if (!this._signals.has(e)) {
        const t = new l();
        this._signals.set(e, t), this.on(e, this._emitSignal);
      }
      return this._signals.get(e);
    }
    destroy(e) {
      for (const t of this._signals.keys())
        this.off(t, this._emitSignal);
      this._signals.clear(), super.destroy(e);
    }
    _emitSignal(e) {
      const t = e.type, s = this._signals.get(t);
      s && s.emit(e);
    }
  };
}
function Js(i, ...e) {
  return e.reduce((t, s) => s(t), i);
}
function Y(i) {
  return class extends i {
    constructor() {
      super(...arguments), this.signalConnections = new F.SignalConnections();
    }
    /**
     * Add signal connections to the container.
     * @param args - The signal connections to add.
     */
    addSignalConnection(...e) {
      for (const t of e)
        this.signalConnections.add(t);
    }
    destroy(e) {
      this.signalConnections.disconnectAll(), super.destroy(e);
    }
  };
}
const hs = ["text", "anchor", "resolution", "roundPixels", "style"];
function S(i, e) {
  for (const t in i)
    try {
      e[t] = i[t];
    } catch (s) {
      _.error(`Error setting property ${t}`, s);
    }
}
function Ge(i) {
  let e;
  const t = i == null ? void 0 : i.asset, s = t, n = i == null ? void 0 : i.sheet;
  if (t instanceof gt)
    e = t;
  else if (!n || (n == null ? void 0 : n.length) === 0)
    if (p.cache.has(s))
      e = p.get(s);
    else if (p.get(s))
      e = p.get(s).texture;
    else
      throw new Error('Asset "' + t + '" not loaded into Pixi cache');
  else if (p.get(n)) {
    const o = p.get(n), r = o.textures;
    if (r !== void 0)
      if (r.hasOwnProperty(s))
        e = r[s];
      else if (o.linkedSheets !== void 0 && o.linkedSheets.length > 0) {
        for (const a of o.linkedSheets)
          if (a.textures !== void 0 && a.textures.hasOwnProperty(s)) {
            e = a.textures[s];
            break;
          }
        if (e === void 0)
          throw new Error(
            'Asset "' + t + '" not found inside spritesheet "' + t + "' or any of its linked sheets"
          );
      } else
        throw new Error('Asset "' + t + '" not found inside spritesheet "' + n + "'");
    else
      throw new Error('Spritesheet "' + n + '" loaded but textures arent?!');
  } else
    throw new Error('Spritesheet "' + n + '" not loaded into Pixi cache');
  return e || new ke().texture;
}
function P(i, e) {
  const t = D(i.position, !1, i.x, i.y);
  e.x = t.x, e.y = t.y;
}
function A(i, e) {
  if (!i)
    return;
  if (i.scale === void 0) {
    if (i.scaleX === void 0 && i.scaleY === void 0)
      return;
    i.scaleX === void 0 && (i.scaleX = 1), i.scaleY === void 0 && (i.scaleY = 1);
  }
  const t = D(i.scale, !1, i.scaleX, i.scaleY);
  e.scale.set(t.x, t.y);
}
function be(i, e) {
  if (i !== void 0) {
    const t = D(i);
    e.anchor.set(t.x, t.y);
  }
}
function k(i, e) {
  if (i !== void 0) {
    const t = D(i);
    e.pivot.set(t.x, t.y);
  }
}
const nt = {
  existing: (i, e) => {
    if (!e)
      return i;
    const { position: t, x: s, y: n, pivot: o, scale: r, scaleX: a, scaleY: h, ...u } = e;
    return P({ position: t, x: s, y: n }, i), A({ scale: r, scaleX: a, scaleY: h }, i), k(o, i), S(u, i), i;
  },
  texture: Ge,
  container: (i) => {
    const e = new $();
    if (!i)
      return e;
    const { position: t, x: s, y: n, pivot: o, scale: r, scaleX: a, scaleY: h, ...u } = i;
    return P({ position: t, x: s, y: n }, e), A({ scale: r, scaleX: a, scaleY: h }, e), k(o, e), S(u, e), e;
  },
  sprite: (i) => {
    const e = new ke(i ? Ge(i) : void 0);
    if (!i)
      return e;
    const { position: t, x: s, y: n, anchor: o, pivot: r, scale: a, scaleX: h, scaleY: u, ...c } = i;
    return P({ position: t, x: s, y: n }, e), A({ scale: a, scaleX: h, scaleY: u }, e), be(o, e), k(r, e), S(c, e), e;
  },
  graphics: (i) => {
    const e = new Ae();
    if (!i)
      return e;
    const { position: t, x: s, y: n, pivot: o, scale: r, scaleX: a, scaleY: h, ...u } = i;
    return P({ position: t, x: s, y: n }, e), A({ scale: r, scaleX: a, scaleY: h }, e), k(o, e), S(u, e), e;
  },
  text: (i) => {
    const e = i ? {
      text: i.text,
      roundPixels: i.roundPixels,
      resolution: i.resolution,
      style: i.style,
      anchor: i.anchor ? D(i.anchor, !0) : void 0
    } : {}, t = new mt(e);
    if (!i)
      return t;
    const { position: s, x: n, y: o, scale: r, scaleX: a, scaleY: h, pivot: u } = i;
    P({ position: s, x: n, y: o }, t), A({ scale: r, scaleX: a, scaleY: h }, t), k(u, t);
    const c = j(
      ["x", "y", "position", "text", "roundPixels", "resolution", "style", "anchor", "pivot"],
      i
    );
    return S(c, t), t;
  },
  bitmapText: (i) => {
    const e = Z(i ?? {}, hs), t = new vt(e);
    i != null && i.position && P({ position: i.position, x: i.x, y: i.y }, t), i != null && i.scale && A({ scale: i.scale ?? 1, scaleX: i.scaleX, scaleY: i.scaleY }, t), i != null && i.pivot && k(i.pivot, t);
    const s = j(
      ["x", "y", "position", "text", "roundPixels", "resolution", "style", "anchor", "pivot"],
      i ?? {}
    );
    return S(s, t), t;
  },
  // dill pixel specific stuff
  button: (i) => {
    const e = Z(i ?? {}, He), t = j(He, i ?? {}), s = new cs(e);
    if (!t)
      return s;
    const { position: n, x: o, y: r, pivot: a, scale: h, scaleX: u, scaleY: c, ...d } = t;
    return P({ position: n, x: o, y: r }, s), A({ scale: h, scaleX: u, scaleY: c }, s), k(a, s), S(d, s), s;
  },
  flexContainer: (i) => {
    const e = Z(i ?? {}, Ke), t = j(Ke, i ?? {}), s = new ie(e);
    if (!t)
      return s;
    const { position: n, x: o, y: r, pivot: a, scale: h, scaleX: u, scaleY: c, ...d } = t;
    return P({ position: n, x: o, y: r }, s), A({ scale: h, scaleX: u, scaleY: c }, s), k(a, s), S(d, s), s;
  },
  uiCanvas: (i) => {
    const e = Z(i ?? {}, Xe), t = j(Xe, i ?? {}), s = new ne(e);
    if (!t)
      return s;
    const { position: n, x: o, y: r, pivot: a, scale: h, scaleX: u, scaleY: c, ...d } = t;
    return P({ position: n, x: o, y: r }, s), A({ scale: h, scaleX: u, scaleY: c }, s), k(a, s), S(d, s), s;
  },
  spine: (i) => {
    let e = i == null ? void 0 : i.data;
    typeof e == "string" && e.slice(-5) !== ".json" && (e = { skeleton: e + ".json", atlas: e + ".atlas" });
    const t = window.Spine.from(e);
    if (!i)
      return t;
    i.autoUpdate !== void 0 && (t.autoUpdate = i.autoUpdate), i.animationName && t.state.setAnimation(i.trackIndex ?? 0, i.animationName, i.loop);
    const { position: s, x: n, y: o, anchor: r, pivot: a, scale: h, scaleX: u, scaleY: c, ...d } = i;
    return P({ position: s, x: n, y: o }, t), A({ scale: h, scaleX: u, scaleY: c }, t), be(r, t), k(a, t), S(d, t), t;
  },
  spineAnimation: (i) => {
    const e = new vs(i);
    if (!i)
      return e;
    const { position: t, x: s, y: n, anchor: o, pivot: r, scale: a, scaleX: h, scaleY: u, ...c } = i;
    return P({ position: t, x: s, y: n }, e), A({ scale: a, scaleX: h, scaleY: u }, e), be(o, e), k(r, e), S(c, e), e;
  }
};
function Ve(i, e, t) {
  const s = {};
  for (const n in i)
    s[n] = (...o) => {
      const r = i[n](...o);
      return t && e.addChild(r), r;
    };
  return s;
}
function N(i) {
  return class extends K {
    constructor() {
      super(), i = Object.assign(nt, i), this.make = Ve(i, this, !1), this.add = Ve(i, this, !0);
    }
  };
}
const Ee = class Ee {
};
Ee.get = Object.assign(nt, {});
let We = Ee;
const ls = rs(Y(N()));
class $ extends ls {
  /**
   * The constructor for the Container class.
   * @param __config - The configuration for the container.
   */
  constructor(e = { autoResize: !0, autoUpdate: !1, priority: 0 }) {
    super(), this.__config = e, this.__dill_pixel_method_binding_root = !0, C(this), this.on("added", this._added), this.on("removed", this._removed);
  }
  /**
   * Get the application instance.
   */
  get app() {
    return g.getInstance();
  }
  /**
   * Update the container. This method is meant to be overridden by subclasses.
   * @param ticker
   */
  update(e) {
  }
  /**
   * Resize the container. This method is meant to be overridden by subclasses.
   * @param size
   */
  resize(e) {
  }
  /**
   * This method is called when the container is added to the stage. It is meant to be overridden by subclasses.
   */
  added() {
  }
  destroy(e) {
    this.__config.autoUpdate && this.app.ticker.remove(this.update, this), super.destroy(e);
  }
  removed() {
  }
  /**
   * This method is called when the container is added to the stage. It sets up auto-resizing and auto-updating if enabled.
   */
  _added() {
    this.__config.autoResize && this.addSignalConnection(this.app.onResize.connect(this.resize, this.__config.priority)), this.__config.autoUpdate && this.app.ticker.add(this.update, this, this.__config.priority), this.added();
  }
  _removed() {
    this.__config.autoResize && this.app.onResize.disconnect(this.resize), this.__config.autoUpdate && this.app.ticker.remove(this.update, this), this.removed();
  }
}
class ti extends $ {
  constructor() {
    super({ autoResize: !0, autoUpdate: !0, priority: -9999 }), this.autoUnloadAssets = !1;
  }
  get assets() {
    return this._assets;
  }
  set assets(e) {
    this._assets = e;
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
  update(e) {
  }
  /**
   * Called when the window is resized
   * @param {Size} size
   * @override
   */
  resize(e) {
  }
}
const He = ["textures", "cursor", "disabledCursor", "sheet", "enabled"], us = it(as(Y(N())));
class cs extends us {
  /**
   * @constructor
   * @param {Partial<ButtonConfig>} config - The configuration for the button.
   */
  constructor(e) {
    super(), this.onDown = new l(), this.onUp = new l(), this.onUpOutside = new l(), this.onOut = new l(), this.onOver = new l(), this.onClick = new l(), this.onEnabled = new l(), this.onDisabled = new l(), this.onKeyboardEvent = new l(), this._isDownCallbacks = /* @__PURE__ */ new Map(), this._isDownListenerAdded = !1, C(this), this.config = Object.assign(
      {
        textures: { default: "" },
        sheet: void 0,
        enabled: !0,
        cursor: "default",
        disabledCursor: "not-allowed"
      },
      e
    ), this.view = this.add.sprite({ asset: this.config.textures.default, sheet: this.config.sheet, anchor: 0.5 }), this.cursor = this.config.cursor, this.enabled = e.enabled !== !1, this.addSignalConnection(
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
  set enabled(e) {
    this._enabled !== e && (this._enabled = e, this.cursor = this._enabled ? this.config.cursor : this.config.disabledCursor, this.focusEnabled = e, this._enabled ? (this.view.texture = this.make.texture({
      asset: this.config.textures.default,
      sheet: this.config.sheet
    }), this.onEnabled.emit()) : (this.view.texture = this.make.texture({
      asset: this.config.textures.disabled || this.config.textures.default,
      sheet: this.config.sheet
    }), this.onDisabled.emit()));
  }
  get app() {
    return g.getInstance();
  }
  focusOut() {
    super.focusOut(), this.isDown = !1, this.isOver = !1;
  }
  blur() {
    super.blur(), this.isDown = !1, this.isOver = !1;
  }
  getFocusArea() {
    return this.view.getBounds().clone();
  }
  getFocusPosition() {
    return [-this.width * 0.5, -this.height * 0.5];
  }
  addIsDownCallback(e, t) {
    this._isDownCallbacks.set(e, t), this._checkIsDownCallbacks();
  }
  removeIsDownCallback(e) {
    this._isDownCallbacks.delete(e);
  }
  /**
   * @description Handles the pointer over event.
   * Sets the texture of the button to the hover texture and emits the onOver event.
   */
  handlePointerOver() {
    this._enabled && (this.isOver || (this.isOver = !0), !this.isDown && (this.view.texture = this.make.texture({
      asset: this.config.textures.hover || this.config.textures.default,
      sheet: this.config.sheet
    }), this.onOver.emit()));
  }
  /**
   * @description Handles the pointer out event.
   * Sets the texture of the button to the default texture and emits the onOut event.
   */
  handlePointerOut() {
    this.isOver = !1, this._enabled && (this.isDown || (this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet }), this.onOut.emit()));
  }
  /**
   * @description Handles the pointer down event.
   * Sets the isDown property to true and changes the texture of the button.
   */
  handlePointerDown() {
    !this._enabled && !this.isKeyDown || this.isDown || (window.removeEventListener("pointerup", this.handlePointerUpOutside), window.addEventListener("pointerup", this.handlePointerUpOutside), this.isDown = !0, this.view.texture = this.make.texture({
      asset: this.config.textures.active || this.config.textures.hover || this.config.textures.default,
      sheet: this.config.sheet
    }), this.onDown.emit());
  }
  /**
   * @description Handles the pointer up event.
   * Removes the keyup event listener and emits the onPress and onUp events.
   */
  handlePointerUp() {
    !this._enabled || !this.isOver || (window.removeEventListener("pointerup", this.handlePointerUpOutside), this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet }), this.onUp.emit());
  }
  handleClick() {
    this.isDown = !1, this.onClick.emit();
  }
  /**
   * @description Handles the pointer up event.
   */
  handlePointerUpOutside() {
    !this._enabled || this.isOver || (window.removeEventListener("pointerup", this.handlePointerUpOutside), this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet }), this.isDown = !1, this.isOver = !1, this.onUpOutside.emit());
  }
  _checkIsDownCallbacks() {
    !this._isDownListenerAdded && this._isDownCallbacks.size > 0 ? (this._isDownListenerAdded = !0, this.app.ticker.add(this._handleIsDownCallbacks)) : (this.app.ticker.remove(this._handleIsDownCallbacks), this._isDownListenerAdded = !1);
  }
  _handleIsDownCallbacks() {
    this.isDown && this._isDownCallbacks.forEach((e) => {
      e();
    });
  }
}
class si extends K {
  constructor(e) {
    return super({ isRenderGroup: !0 }), this.config = e, this.onZoom = new l(), this.onZoomComplete = new l(), this.minX = 0, this.minY = 0, this._zooming = !1, this._zoomLerp = 0.1, this._targetPivot = new T(0, 0), this._targetScale = new T(1, 1), this._lerp = 0, this._target = null, this._followOffset = new T(0, 0), C(this), e && (this.container = e.container, this.addChild(this.container), e.minX && (this.minX = e.minX), e.maxX && (this.maxX = e.maxX), e.minY && (this.minY = e.minY), this.viewportWidth = e.viewportWidth ?? this.app.size.width, this.viewportHeight = e.viewportHeight ?? this.app.size.width, this.worldWidth = e.worldWidth ?? this.viewportWidth, this.worldHeight = e.worldHeight ?? this.viewportHeight, this.maxX = e.maxX ?? this.worldWidth - this.viewportWidth, this.maxY = e.maxY ?? this.worldHeight - this.viewportHeight), this._targetPivot.set(this.viewportWidth * 0.5, this.viewportHeight * 0.5), e.target && (this.target = e.target), this._lerp = 1, this.update(), e.lerp && (this.lerp = e.lerp), this;
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
  set lerp(e) {
    (e < 0 || e > 1) && _.error("Camera lerp value must be in the range [0, 1]"), this._lerp = Math.max(0, Math.min(e, 1));
  }
  get target() {
    return this._target;
  }
  set target(e) {
    this._target = e, this._target && this.focusOn(this._target);
  }
  get followOffset() {
    return this._followOffset;
  }
  set followOffset(e) {
    this._followOffset = D(e, !0);
  }
  get app() {
    return g.getInstance();
  }
  follow(e, t) {
    t || (t = { x: 0, y: 0 }), this.followOffset = t, this.target = e;
  }
  pan(e, t) {
    let s = this.pivot.x + e, n = this.pivot.y + t;
    s = Math.max(this.minX, Math.min(s, this.maxX)), n = Math.max(this.minY, Math.min(n, this.maxY)), this._targetPivot.set(s, n);
  }
  zoom(e, t = 0.1) {
    this._zoomLerp = t, this._zooming = !0, this._targetScale.set(e, e);
  }
  update() {
    this.updateZoom(), this._target && this.focusOn(this._target), this.updatePosition(this._zooming), this._zooming && Math.abs(this.scale.x - this._targetScale.x) < 1e-3 && Math.abs(this.scale.y - this._targetScale.y) < 1e-3 ? (this.onZoom.emit(this), this._zooming = !1, this.scale.set(this._targetScale.x, this._targetScale.y), this.onZoomComplete.emit(this)) : this._zooming && this.onZoom.emit(this);
  }
  focusOn(e) {
    const t = e.getGlobalPosition(), s = this.toLocal(t), n = this.position.x / this.scale.x - this.viewportWidth / 2, o = this.position.y / this.scale.y - this.viewportHeight / 2, r = this.followOffset.x / this.scale.x, a = this.followOffset.y / this.scale.y;
    this._targetPivot.x = (s.x * this.scale.x + this.viewportWidth / 2) * (1 / this.scale.x) + r;
    const h = this.viewportWidth / this.scale.x / 2 + n + this.minX - r, u = this.worldWidth - this.viewportWidth / this.scale.x / 2 + n + this.maxX + r;
    this._targetPivot.x < h ? this._targetPivot.x = h : this._targetPivot.x > u && (this._targetPivot.x = u), this._targetPivot.y = (s.y * this.scale.y + this.viewportHeight / 2) * (1 / this.scale.y) + a;
    const c = this.viewportHeight / this.scale.y / 2 + o + this.minY - a, d = this.worldHeight - this.viewportHeight / this.scale.y / 2 + o + this.maxY - a;
    this._targetPivot.y < c ? this._targetPivot.y = c : this._targetPivot.y > d && (this._targetPivot.y = d);
  }
  updateZoom() {
    const e = this.scale.x, t = this.scale.y, s = e + this._zoomLerp * (this._targetScale.x - e), n = t + this._zoomLerp * (this._targetScale.y - t);
    this.scale.set(Math.max(0, s), Math.max(0, n));
  }
  updatePosition(e = !1) {
    if (this.lerp > 0 && !e) {
      const t = this.pivot.x, s = this.pivot.y, n = t + this.lerp * (this._targetPivot.x - t), o = s + this.lerp * (this._targetPivot.y - s);
      this.pivot.set(n, o);
    } else
      this.pivot.set(this._targetPivot.x, this._targetPivot.y);
    this.position.set(this.viewportWidth / 2, this.viewportHeight / 2);
  }
}
class ii {
  constructor(e, t) {
    this.camera = e, this.interactiveArea = t, this.dragging = !1, this.previousPointerPosition = null, C(this), this.camera = e, this.interactiveArea = t, this.app.keyboard.onKeyDown().connect(this.handleKeyDown), this.interactiveArea.on("pointerdown", this.onPointerDown.bind(this)), this.interactiveArea.on("pointermove", this.onPointerMove.bind(this)), this.app.stage.on("pointerup", this.onPointerUp.bind(this)), this.app.stage.on("pointerupoutside", this.onPointerUp.bind(this)), this.interactiveArea.on("touchstart", this.onPointerDown.bind(this)), this.interactiveArea.on("touchmove", this.onPointerMove.bind(this)), this.interactiveArea.on("touchend", this.onPointerUp.bind(this));
  }
  get app() {
    return g.getInstance();
  }
  destroy() {
    this.interactiveArea.removeAllListeners(), this.app.stage.off("pointerup", this.onPointerUp.bind(this)), this.app.stage.off("pointerupoutside", this.onPointerUp.bind(this));
  }
  handleKeyDown(e) {
    switch (e.event.key) {
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
  onPointerDown(e) {
    this.dragging = !0, this.previousPointerPosition = this.getEventPosition(e);
  }
  onPointerMove(e) {
    if (!this.dragging || !this.previousPointerPosition)
      return;
    const t = this.getEventPosition(e), s = t.x - this.previousPointerPosition.x, n = t.y - this.previousPointerPosition.y;
    this.camera.pan(s, n), this.previousPointerPosition = t;
  }
  onPointerUp() {
    this.dragging = !1, this.previousPointerPosition = null;
  }
  getEventPosition(e) {
    return e instanceof TouchEvent ? new T(e.touches[0].clientX, e.touches[0].clientY) : new T(e.clientX, e.clientY);
  }
}
const ds = Y(N()), Ke = [
  "width",
  "height",
  "bindTo",
  "bindToAppSize",
  "gap",
  "flexWrap",
  "flexDirection",
  "alignItems",
  "justifyContent"
], fs = {
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
class ie extends ds {
  constructor(e = {}) {
    super(), this.onLayoutComplete = new l(), this.debug = !1, this.paddingLeft = 0, this.paddingRight = 0, this.paddingTop = 0, this.paddingBottom = 0, this._childMap = /* @__PURE__ */ new Map(), this._reparentAddedChild = !0, this._flexChildren = [], this.removeChildren = () => {
      const t = this.flexChildren;
      return this.removeChild(...t), t;
    }, this.removeChildAt = (t) => this.removeChild(this.flexChildren[t]), this.addChildAt = (t, s) => {
      const n = this.add.existing(t);
      return this.setChildIndex(n, s), n;
    }, this.setChildIndex = (t, s) => {
      const n = this._childMap.get(t);
      n && (super.setChildIndex(n, s), this.setFlexChildren(), this.layout());
    }, this.getChildIndex = (t) => this._childMap.has(t) ? super.getChildIndex(t.parent) : super.getChildIndex(t), this.getChildAt = (t) => {
      var s;
      return (s = super.getChildAt(t)) == null ? void 0 : s.getChildAt(0);
    }, C(this), this.config = Object.assign({ ...fs }, e), this.on("added", this._added), this.on("childAdded", this.handleChildAdded), this.on("childRemoved", this.handleChildRemoved), this.layout();
  }
  get flexChildren() {
    return this._flexChildren;
  }
  get gap() {
    return this.config.gap;
  }
  set gap(e) {
    this.config.gap = e, this.layout();
  }
  get flexWrap() {
    return this.config.flexWrap;
  }
  set flexWrap(e) {
    this.config.flexWrap = e, this.layout();
  }
  get flexDirection() {
    return this.config.flexDirection;
  }
  set flexDirection(e) {
    this.config.flexDirection = e, this.layout();
  }
  get alignItems() {
    return this.config.alignItems;
  }
  set alignItems(e) {
    this.config.alignItems = e, this.layout();
  }
  get justifyContent() {
    return this.config.justifyContent;
  }
  set justifyContent(e) {
    this.config.justifyContent = e, this.layout();
  }
  get containerHeight() {
    return this.config.height;
  }
  set containerHeight(e) {
    this.config.height = e, this.layout();
  }
  get containerWidth() {
    return this.config.width;
  }
  set containerWidth(e) {
    this.config.width = e, this.layout();
  }
  get size() {
    return { width: this.config.width, height: this.config.height };
  }
  set size(e) {
    const { x: t, y: s } = D(e);
    this.config.width = t, this.config.height = s, this.layout();
  }
  /**
   * Get the application instance.
   */
  get app() {
    return g.getInstance();
  }
  destroy(e) {
    this.off("childAdded", this.handleChildAdded), this.off("childRemoved", this.handleChildRemoved), super.destroy(e);
  }
  /**
   * Removes one or more children from the container
   * Override because we need to ensure it returns the proper re-parented children
   * @param children
   */
  removeChild(...e) {
    if (this._reparentAddedChild)
      e.forEach((t) => {
        const s = this._childMap.get(t);
        if (s)
          return super.removeChild(s);
      });
    else
      return super.removeChild(...e);
    return e[0];
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
  handleChildRemoved(e) {
    this._reparentAddedChild && (this.deleteChild(e) || (e = e.getChildAt(0), this.deleteChild(e)));
  }
  /**
   * Deletes a child from the map
   * @param {Container} child
   * @returns {boolean}
   * @protected
   */
  deleteChild(e) {
    if (this._childMap.has(e)) {
      if (e instanceof ie)
        try {
          e.onLayoutComplete.disconnect(this.layout);
        } catch (s) {
          _.warn("FlexContainer:: Error disconnecting signal from removed child"), console.warn(s);
        }
      return this._childMap.delete(e), this.setFlexChildren(), this.layout(), !0;
    }
    return !1;
  }
  /**
   * Sorts the children in the container
   * Needed because we need to ensure re-parented children are sorted by their actual index in the container
   * @protected
   */
  setFlexChildren() {
    this._flexChildren = Array.from(this._childMap.keys()), this._flexChildren.sort((e, t) => this.getChildIndex(e) - this.getChildIndex(t)), this.cleanup();
  }
  /**
   * Ensure we don't leave empty containers after setting child indices or adding / removing children
   * @protected
   */
  cleanup() {
    this.flexChildren.length !== this.children.length && this.children.forEach((e) => {
      var t;
      (t = e == null ? void 0 : e.children) != null && t.length || super.removeChild(e);
    });
  }
  /**
   * Re-parent a child to account for e.g. sprite that are added with anchors
   * @param child
   * @protected
   */
  handleChildAdded(e) {
    if (!this._reparentAddedChild)
      return;
    this._reparentAddedChild = !1;
    const t = this.add.container();
    t.add.existing(e);
    const s = t.getLocalBounds();
    s.x < 0 && (t.pivot.x = s.x), s.y < 0 && (t.pivot.y = s.y), e instanceof ie && this.addSignalConnection(e.onLayoutComplete.connect(this.layout)), this._childMap.set(e, t), this.setFlexChildren(), this._reparentAddedChild = !0, this.app.render(), this.layout();
  }
  /**
   * Lay out the children according to the settings
   * Tries to follow the CSS Flexbox model as closely as possible
   * @private
   */
  _layout() {
    var De, Oe;
    this.config.bindTo && (this.config.width = ((De = this.config.bindTo) == null ? void 0 : De.width) ?? 0, this.config.height = ((Oe = this.config.bindTo) == null ? void 0 : Oe.height) ?? 0), this.config.bindToAppSize && (this.config.width = this.app.size.width, this.config.height = this.app.size.height);
    const e = ["flex-start"];
    let { width: t, height: s } = this.config;
    const { gap: n, flexDirection: o, flexWrap: r, alignItems: a, justifyContent: h } = this.config;
    this.config.flexDirection === "row" && this.config.flexWrap === "nowrap" && e.includes(this.config.justifyContent) ? t = 1 / 0 : this.config.flexDirection === "column" && this.config.flexWrap === "nowrap" && e.includes(this.config.justifyContent) && (s = 1 / 0);
    let u = [], c = 0, d = 0, v = 0, q = 0, Me = 0, Fe = 0;
    const R = [], ge = this.children.filter(Boolean);
    let Q = [], me = 0;
    const ut = (f, b, y) => o === "row" && b + f.width + n > t || o === "column" && y + f.height + n > s, ct = () => {
      o === "row" ? Me += v + n : Fe += q + n, c = 0, d = 0, v = 0, q = 0;
    }, dt = (f) => {
      o === "row" ? (c += f.width + n, v = Math.max(v, f.height)) : (d += f.height + n, q = Math.max(q, f.width));
    }, ft = (f) => o === "row" ? f : Fe, _t = (f) => o === "column" ? f : Me, Te = (f, b, y, I) => {
      const w = (I === "row" ? t : s) - (y - b);
      f.forEach(({ index: Ie }, ve) => {
        let O = 0;
        switch (h) {
          case "flex-start":
            break;
          case "flex-end":
            O = w;
            break;
          case "center":
            O = w / 2;
            break;
          case "space-between":
            O = f.length > 1 ? ve * (w / (f.length - 1)) : 0;
            break;
          case "space-around":
            O = w / f.length * ve + w / (2 * f.length);
            break;
          case "space-evenly":
            O = w / (f.length + 1) * (ve + 1);
            break;
        }
        I === "row" ? R[Ie].x += O : R[Ie].y += O;
      });
    }, pt = (f, b) => {
      f.forEach((y, I) => {
        const w = b[I];
        if (w)
          if (o === "row")
            switch (a) {
              case "flex-start":
                break;
              case "flex-end":
                y.y += v - w.height;
                break;
              case "center":
                y.y += (v - w.height) / 2;
                break;
            }
          else
            switch (a) {
              case "flex-start":
                break;
              case "flex-end":
                y.x = t ? t - w.width : -w.width;
                break;
              case "center":
                y.x += (t - w.width) / 2;
                break;
            }
      });
    };
    ge.forEach((f, b) => {
      if (!f)
        return;
      const y = f;
      r === "wrap" && ut(y, c, d) && (Te(Q, me, o === "column" ? d - n : c - n, o), ct(), Q = [], me = c), Q.push({ index: b, width: y.width, height: y.height }), R[b] = { x: ft(c), y: _t(d) }, dt(y);
    }), Te(Q, me, o === "column" ? d - n : c - n, o), pt(R, ge), u = R, ge.forEach((f, b) => {
      const y = f, { x: I, y: w } = u[b] || { x: 0, y: 0 };
      y.position.set(I, w);
    });
    const ze = this.children.reduce((f, b) => Math.max(f, b.y + b.height), 0);
    this.children.forEach((f) => {
      if (this.config.flexDirection === "row")
        switch (this.config.alignItems) {
          case "center":
            f.y -= (ze - s) * 0.5;
            break;
          case "flex-end":
            f.y += s - ze;
            break;
        }
    }), this.onLayoutComplete.emit();
  }
  _added() {
    this.addSignalConnection(this.app.onResize.connect(this.layout, 0)), this.added();
  }
}
const Xe = ["debug", "padding", "size", "useAppSize"], _s = Y(N());
class ne extends _s {
  constructor(e) {
    super(), this.settingsMap = /* @__PURE__ */ new Map(), this._childMap = /* @__PURE__ */ new Map(), this._reparentAddedChild = !0, this._disableAddChildError = !1, this._canvasChildren = [], this.removeChildren = (t, s) => this._inner.removeChildren(t, s), this.removeChildAt = (t) => this._inner.removeChildAt(t), this.addChildAt = (t, s) => {
      const n = this._inner.add.existing(t);
      return this._inner.setChildIndex(n, s), n;
    }, this.setChildIndex = (t, s) => {
      this._inner.setChildIndex(t, s), this.layout();
    }, this.getChildIndex = (t) => this._inner.getChildIndex(t), this.getChildAt = (t) => {
      var s;
      return (s = this._inner.getChildAt(t)) == null ? void 0 : s.getChildAt(0);
    }, C(this), this.config = {
      debug: e.debug === !0,
      padding: we((e == null ? void 0 : e.padding) ?? 0),
      size: e.size !== void 0 ? $e(e.size) : { width: 0, height: 0 },
      useAppSize: e.useAppSize === !0
    }, this._disableAddChildError = !0, this._inner = this.add.container({ x: this.config.padding.left, y: this.config.padding.top }), this._disableAddChildError = !1, this.addSignalConnection(this.app.onResize.connect(this.resize)), this.on("childRemoved", this._childRemoved), this.once("added", this._added);
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
    return g.getInstance();
  }
  set size(e) {
    this.config.useAppSize = !1, this.config.size = e === void 0 ? { width: 0, height: 0 } : $e(e), this.resize();
  }
  set padding(e) {
    this.config.padding = we(e), this._inner.position.set(this.config.padding.left, this.config.padding.top), this.resize();
  }
  static isFlexContainer(e) {
    return (e == null ? void 0 : e.flexChildren) !== void 0;
  }
  addChild(...e) {
    return this._disableAddChildError ? super.addChild(...e) : (_.warn(
      "UICanvas:: You probably shouldn't add children directly to UICanvas. Use .addElement(child, settings) instead, so you can pass alignment settings.",
      e,
      "will be added using the default 'top left' alignment'."
    ), this._inner.addChild(...e));
  }
  /**
   * Removes one or more children from the container
   * Override because we need to ensure it returns the proper re-parented children
   */
  removeChild(...e) {
    if (this._reparentAddedChild)
      e.forEach((t) => {
        const s = this._childMap.get(t);
        if (s)
          return this._inner.removeChild(s);
      });
    else
      return this._inner.removeChild(...e);
    return e[0];
  }
  resize() {
    const e = this.config.useAppSize ? this.app.size : this.config.size;
    this._displayBounds = this.__calculateBounds(e), this._outerBounds = this.__calculateOuterBounds(e), this.layout(), this.config.useAppSize && this.position.set(-e.width * 0.5, -e.height * 0.5), this.config.debug && this.app.ticker.addOnce(this.drawDebug);
  }
  layout() {
    this._inner.children.forEach((e) => {
      const t = e, s = this.settingsMap.get(t);
      s && this.applySettings(t, s);
    });
  }
  addElement(e, t) {
    const s = this._inner.add.container();
    s.addChild(e);
    const n = s.getLocalBounds();
    return n.x < 0 && (s.pivot.x = n.x), n.y < 0 && (s.pivot.y = n.y), e != null && e.flexChildren && this.addSignalConnection(e.onLayoutComplete.connect(this.layout)), this.settingsMap.set(s, {
      align: (t == null ? void 0 : t.align) ?? "top left",
      padding: t != null && t.padding ? we(t.padding) : { top: 0, left: 0, bottom: 0, right: 0 }
    }), this._childMap.set(e, s), this._canvasChildren = Array.from(this._childMap.keys()), this.resize(), e;
  }
  /**
   * Ensure we don't leave empty containers after setting child indices or adding / removing children
   * @protected
   */
  cleanup() {
    this.canvasChildren.length !== this.children.length && this.children.forEach((e) => {
      var t;
      this.config.debug && e === this._debugGraphics || (t = e == null ? void 0 : e.children) != null && t.length || super.removeChild(e);
    });
  }
  __calculateBounds(e) {
    return new Ue(
      0,
      0,
      e.width - this.config.padding.left - this.config.padding.right,
      e.height - this.config.padding.top - this.config.padding.bottom
    );
  }
  __calculateOuterBounds(e) {
    return new Ue(0, 0, e.width, e.height);
  }
  _childRemoved(e) {
    this.settingsMap.delete(e), this._childMap.delete(e), this._canvasChildren = Array.from(this._childMap.keys());
  }
  _added() {
    this.layout();
  }
  applySettings(e, t) {
    if (!t)
      return;
    const s = this._displayBounds.width, n = this._displayBounds.height, o = e.getChildAt(0), r = ne.isFlexContainer(o) && o.containerWidth || e.width, a = ne.isFlexContainer(o) && o.containerHeight || e.height;
    switch (t.align) {
      case "top right":
        e.x = s - r, e.y = 0;
        break;
      case "top left":
        e.x = 0, e.y = 0;
        break;
      case "top center":
      case "top":
        e.x = (s - r) / 2, e.y = 0;
        break;
      case "bottom right":
        e.x = s - r, e.y = n - a;
        break;
      case "bottom left":
        e.x = 0, e.y = n - a;
        break;
      case "bottom center":
      case "bottom":
        e.x = (s - e.width) / 2, e.y = n - a;
        break;
      case "left top":
        e.x = 0, e.y = 0;
        break;
      case "left bottom":
        e.x = 0, e.y = n - a;
        break;
      case "left center":
      case "left":
        e.x = 0, e.y = (n - a) / 2;
        break;
      case "right top":
        e.x = s - r, e.y = 0;
        break;
      case "right bottom":
        e.x = s, e.y = n;
        break;
      case "right center":
      case "right":
        e.x = s - r, e.y = (n - a) / 2;
        break;
      case "center":
        e.x = (s - r) / 2, e.y = (n - a) / 2;
        break;
    }
    e.x += J(t.padding.left, s) - J(t.padding.right, s), e.y += J(t.padding.top, n) - J(t.padding.bottom, n);
  }
  drawDebug() {
    this._debugGraphics || (this._disableAddChildError = !0, this._debugGraphics = this._inner.add.graphics(), this._disableAddChildError = !1), this._debugGraphics.clear().rect(0, 0, this._displayBounds.width, this._displayBounds.height).stroke({
      width: 1,
      color: 16711680,
      alpha: 0.5
    }).rect(-this.config.padding.left, -this.config.padding.top, this._outerBounds.width, this._outerBounds.height).stroke({
      width: 1,
      color: 16711680,
      alpha: 0.5
    }).moveTo(this._displayBounds.width / 2, this._displayBounds.height / 2 - 10).lineTo(this._displayBounds.width / 2, this._displayBounds.height / 2 + 10).stroke({
      width: 1,
      color: 16711680,
      alpha: 0.5
    }).moveTo(this._displayBounds.width / 2 - 10, this._displayBounds.height / 2).lineTo(this._displayBounds.width / 2 + 10, this._displayBounds.height / 2).stroke({
      width: 1,
      color: 16711680,
      alpha: 0.5
    });
  }
}
const ps = {
  color: 0,
  alpha: 0.75
}, gs = { backing: !0, closeOnEscape: !0, closeOnPointerDownOutside: !0 };
class G extends $ {
  /**
   * Create a new Popup
   * @param id - The unique identifier for the popup
   * @param config - The configuration for the popup
   */
  constructor(e, t = {}) {
    super(), this.id = e, this.isShowing = !1, this.config = Object.assign({ id: e, ...gs }, t), this._initialize();
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
  static makeBacking(e, t) {
    let s = {};
    typeof e == "object" && (s = e);
    const n = Object.assign({ ...ps }, s);
    if (G.BACKING_TEXTURE === void 0) {
      const a = new Ae();
      a.rect(0, 0, 100, 100).fill("white"), G.BACKING_TEXTURE = g.getInstance().renderer.generateTexture(a);
    }
    const o = new $();
    o.sortableChildren = !1;
    const r = o.addChild(new ke(G.BACKING_TEXTURE));
    return r.anchor.set(0.5), r.alpha = n.alpha, r.tint = n.color, r.setSize(t.width, t.height), o;
  }
  initialize() {
  }
  beforeHide() {
    this.app.focus.removeFocusLayer(this.id);
  }
  destroy(e) {
    this.app.focus.removeFocusLayer(this.id), super.destroy(e);
  }
  async hide() {
    return this.visible = !1, Promise.resolve();
  }
  async show() {
    return this.visible = !0, Promise.resolve();
  }
  async start() {
  }
  afterShow() {
    this.firstFocusableEntity && (this.app.focus.add(this.firstFocusableEntity, this.id, !0), this.app.focus.setFocus(this.firstFocusableEntity));
  }
  /**
   * End the popup
   */
  end() {
  }
  async close() {
    this.app.popups.hidePopup(this.id, this.config.data);
  }
  /**
   * Initialize the popup
   * @private
   */
  _initialize() {
    this.app.focus.addFocusLayer(this.id, !1), this.config.backing && (this.backing = this.add.existing(G.makeBacking(this.config.backing, this.app.size)), this.backing.eventMode = "static", this.config.closeOnPointerDownOutside && (this.backing.once("click", this.close), this.backing.once("tap", this.close))), this.view = this.add.container(), this.view.eventMode = "static";
  }
}
const ms = Y(N());
class vs extends ms {
  constructor(e) {
    super();
    let t = e == null ? void 0 : e.data;
    typeof t == "string" && t.slice(-5) !== ".json" && (t = { skeleton: t + ".json", atlas: t + ".atlas" }), this.spine = window.Spine.from(t), this.add.existing(this.spine), e && (e.autoUpdate !== void 0 && (this.spine.autoUpdate = e.autoUpdate), e.animationName && this.setAnimation(e.animationName, e.loop, e.trackIndex ?? 0));
  }
  get animationNames() {
    return this.spine.state.data.skeletonData.animations.map((e) => e.name);
  }
  getCurrentAnimation(e = 0) {
    var t, s;
    return ((s = (t = this.spine.state.getCurrent(e)) == null ? void 0 : t.animation) == null ? void 0 : s.name) || "";
  }
  setAnimation(e, t = !1, s = 0) {
    this.spine.state.setAnimation(s, e, t);
  }
}
class ys extends E {
  constructor() {
    super(...arguments), this.id = "popups", this.view = new $(), this.onShowPopup = new l(), this.onHidePopup = new l(), this._popups = /* @__PURE__ */ new Map(), this._activePopups = /* @__PURE__ */ new Map(), this._currentPopupId = void 0;
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
  initialize(e) {
    C(this), this.view.label = "PopupManager", this._setupAppListeners();
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
  addPopup(e, t) {
    this._popups.set(e, t);
  }
  /**
   * Show a popup
   * @param id - The id of the popup
   * @param config - The configuration for the popup
   * @returns a promise resolving to the popup, if it exists
   */
  async showPopup(e, t = {}) {
    const s = this._popups.get(e);
    if (s) {
      t.id = e;
      const n = this.view.add.existing(new s(e, t));
      return n.initialize(), this.app.focus.clearFocus(), await n.show(), this.app.focus.setFocusLayer(e), n.afterShow(), this._activePopups.set(e, n), this._currentPopupId = e, this.onShowPopup.emit({ id: e, data: t == null ? void 0 : t.data }), n.start(), n;
    }
  }
  /**
   * Hide a popup
   * @param id - The id of the popup
   * @param data
   * @returns a promise resolving to the popup, if it exists
   */
  async hidePopup(e, t) {
    var n;
    const s = this._activePopups.get(e);
    if (s)
      return s.beforeHide(), await s.hide(), this.view.removeChild(s), this._activePopups.delete(e), this._currentPopupId = ((n = et(this._activePopups)) == null ? void 0 : n[0]) || void 0, this.onHidePopup.emit({ id: e, data: t }), s.end(), s;
  }
  /**
   * Remove all popups
   * @param animate - Whether to animate the removal
   */
  removeAllPopups(e = !1) {
    e ? this._activePopups.forEach((t) => {
      t.hide();
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
}
class ws {
  constructor(e, t) {
    this.name = e, this.manager = t, this._sounds = /* @__PURE__ */ new Map(), this._muted = !1, this._volume = 1, this.muted = this.manager.muted;
  }
  get muted() {
    return this._muted;
  }
  set muted(e) {
    this._muted = e, this._setMuted();
  }
  get volume() {
    return this._volume;
  }
  set volume(e) {
    this._volume = e, this.updateVolume();
  }
  add(e, t) {
    return this._sounds.set(e, t), t;
  }
  get(e) {
    return this._sounds.get(e);
  }
  remove(e) {
    const t = this._sounds.get(e);
    return t && (t.destroy(), this._sounds.delete(e)), t;
  }
  _setMuted() {
    this._sounds.forEach((e) => {
      e.muted = this._muted;
    });
  }
  updateVolume() {
    this._sounds.forEach((e) => {
      e.updateVolume();
    }), this.manager.onChannelVolumeChanged.emit({ channel: this, volume: this._volume });
  }
  destroy() {
  }
}
class Ye {
  constructor(e, t, s) {
    this.id = e, this.channel = t, this.manager = s, this.onStart = new l(), this.onStop = new l(), this.onEnd = new l(), this.onPaused = new l(), this.onResumed = new l(), this.onProgress = new l(), this._volume = 1, this._muted = !1, this._isPlaying = !1, C(this), this.muted = this.channel.muted;
  }
  get media() {
    return this._media;
  }
  set media(e) {
    this._media = e, e && (this._media.volume = this._volume * this.channel.volume * this.manager.masterVolume, this.muted && (this._media.muted = this.muted), this.addListeners());
  }
  get volume() {
    return this._volume;
  }
  set volume(e) {
    this._volume = e, this._media && (this._media.volume = this._volume * this.channel.volume * this.manager.masterVolume);
  }
  get muted() {
    return this._muted;
  }
  set muted(e) {
    this._muted = e, this._media && (this._media.muted = this._muted);
  }
  get isPlaying() {
    return this._isPlaying;
  }
  pause() {
    this._isPlaying = !1, this._media && (this._media.paused = !0);
  }
  resume() {
    this._isPlaying = !0, this._media && (this._media.paused = !1);
  }
  remove() {
    this.channel.remove(this.id);
  }
  stop() {
    this._media && this._media.stop(), this.onEnd.emit(this);
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
  fadeTo(e, t) {
    return M.to(this.media, { volume: e, duration: t });
  }
  play(e) {
    this._isPlaying = !0, e ? this.media.play({ start: e }) : this.media.play({});
  }
  _handleMediaEnded() {
    this.onEnd.emit(this);
  }
  _handleMediaStarted() {
    this.onStart.emit(this);
  }
  _handleMediaStopped() {
    this.onStop.emit(this);
  }
  _handleMediaPaused() {
    this.onPaused.emit(this);
  }
  _handleMediaProgress() {
    this.onProgress.emit(this);
  }
  _handleMediaResumed() {
    this.onResumed.emit(this);
  }
}
let ot;
function bs(i) {
  return ot = i, i;
}
function W() {
  return ot;
}
class Se {
  /**
   * Dezippering is removed in the future Web Audio API, instead
   * we use the `setValueAtTime` method, however, this is not available
   * in all environments (e.g., Android webview), so we fallback to the `value` setter.
   * @param param - AudioNode parameter object
   * @param value - Value to set
   * @return The value set
   */
  static setParamValue(e, t) {
    if (e.setValueAtTime) {
      const s = W().context;
      e.setValueAtTime(t, s.audioContext.currentTime);
    } else
      e.value = t;
    return t;
  }
}
class xs extends X {
  constructor() {
    super(...arguments), this.speed = 1, this.muted = !1, this.volume = 1, this.paused = !1;
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
  set filters(e) {
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
}
let Cs = 0;
const Pe = class extends X {
  /** @param parent - Parent element */
  constructor(i) {
    super(), this.id = Cs++, this.init(i);
  }
  /**
   * Set a property by name, this makes it easy to chain values
   * @param name - Name of the property to set
   * @param value - Value to set property to
   */
  set(i, e) {
    if (this[i] === void 0)
      throw new Error(`Property with name ${i} does not exist.`);
    switch (i) {
      case "speed":
        this.speed = e;
        break;
      case "volume":
        this.volume = e;
        break;
      case "paused":
        this.paused = e;
        break;
      case "loop":
        this.loop = e;
        break;
      case "muted":
        this.muted = e;
        break;
    }
    return this;
  }
  /** The current playback progress from 0 to 1. */
  get progress() {
    const { currentTime: i } = this._source;
    return i / this._duration;
  }
  /** Pauses the sound. */
  get paused() {
    return this._paused;
  }
  set paused(i) {
    this._paused = i, this.refreshPaused();
  }
  /**
   * Reference: http://stackoverflow.com/a/40370077
   * @private
   */
  _onPlay() {
    this._playing = !0;
  }
  /**
   * Reference: http://stackoverflow.com/a/40370077
   * @private
   */
  _onPause() {
    this._playing = !1;
  }
  /**
   * Initialize the instance.
   * @param {htmlaudio.HTMLAudioMedia} media - Same as constructor
   */
  init(i) {
    this._playing = !1, this._duration = i.source.duration;
    const e = this._source = i.source.cloneNode(!1);
    e.src = i.parent.url, e.onplay = this._onPlay.bind(this), e.onpause = this._onPause.bind(this), i.context.on("refresh", this.refresh, this), i.context.on("refreshPaused", this.refreshPaused, this), this._media = i;
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
  set speed(i) {
    this._speed = i, this.refresh();
  }
  /** Get the set the volume for this instance from 0 to 1 */
  get volume() {
    return this._volume;
  }
  set volume(i) {
    this._volume = i, this.refresh();
  }
  /** If the sound instance should loop playback */
  get loop() {
    return this._loop;
  }
  set loop(i) {
    this._loop = i, this.refresh();
  }
  /** `true` if the sound is muted */
  get muted() {
    return this._muted;
  }
  set muted(i) {
    this._muted = i, this.refresh();
  }
  /**
   * HTML Audio does not support filters, this is non-functional API.
   */
  get filters() {
    return console.warn("HTML Audio does not support filters"), null;
  }
  set filters(i) {
    console.warn("HTML Audio does not support filters");
  }
  /** Call whenever the loop, speed or volume changes */
  refresh() {
    const i = this._media.context, e = this._media.parent;
    this._source.loop = this._loop || e.loop;
    const t = i.volume * (i.muted ? 0 : 1), s = e.volume * (e.muted ? 0 : 1), n = this._volume * (this._muted ? 0 : 1);
    this._source.volume = n * t * s, this._source.playbackRate = this._speed * i.speed * e.speed;
  }
  /** Handle changes in paused state, either globally or sound or instance */
  refreshPaused() {
    const i = this._media.context, e = this._media.parent, t = this._paused || e.paused || i.paused;
    t !== this._pausedReal && (this._pausedReal = t, t ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({
      start: this._source.currentTime,
      end: this._end,
      volume: this._volume,
      speed: this._speed,
      loop: this._loop
    })), this.emit("pause", t));
  }
  /** Start playing the sound/ */
  play(i) {
    const { start: e, end: t, speed: s, loop: n, volume: o, muted: r } = i;
    t && console.assert(t > e, "End time is before start time"), this._speed = s, this._volume = o, this._loop = !!n, this._muted = r, this.refresh(), this.loop && t !== null && (console.warn('Looping not support when specifying an "end" time'), this.loop = !1), this._start = e, this._end = t || this._duration, this._start = Math.max(0, this._start - Pe.PADDING), this._end = Math.min(this._end + Pe.PADDING, this._duration), this._source.onloadedmetadata = () => {
      this._source && (this._source.currentTime = e, this._source.onloadedmetadata = null, this.emit("progress", e, this._duration), V.shared.add(this._onUpdate, this));
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
    V.shared.remove(this._onUpdate, this), this._internalStop(), this.emit("progress", 1, this._duration), this.emit("end", this);
  }
  /** Don't use after this. */
  destroy() {
    V.shared.remove(this._onUpdate, this), this.removeAllListeners();
    const i = this._source;
    i && (i.onended = null, i.onplay = null, i.onpause = null, this._internalStop()), this._source = null, this._speed = 1, this._volume = 1, this._loop = !1, this._end = null, this._start = 0, this._duration = 0, this._playing = !1, this._pausedReal = !1, this._paused = !1, this._muted = !1, this._media && (this._media.context.off("refresh", this.refresh, this), this._media.context.off("refreshPaused", this.refreshPaused, this), this._media = null);
  }
  /**
   * To string method for instance.
   * @return The string representation of instance.
   */
  toString() {
    return `[HTMLAudioInstance id=${this.id}]`;
  }
};
let rt = Pe;
rt.PADDING = 0.1;
class Ss extends X {
  init(e) {
    this.parent = e, this._source = e.options.source || new Audio(), e.url && (this._source.src = e.url);
  }
  // Implement create
  create() {
    return new rt(this);
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
  set filters(e) {
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
  load(e) {
    const t = this._source, s = this.parent;
    if (t.readyState === 4) {
      s.isLoaded = !0;
      const h = s.autoPlayStart();
      e && setTimeout(() => {
        e(null, s, h);
      }, 0);
      return;
    }
    if (!s.url) {
      e(new Error("sound.url or sound.source must be set"));
      return;
    }
    t.src = s.url;
    const n = () => {
      a(), s.isLoaded = !0;
      const h = s.autoPlayStart();
      e && e(null, s, h);
    }, o = () => {
      a(), e && e(new Error("Sound loading has been aborted"));
    }, r = () => {
      a();
      const h = `Failed to load audio element (code: ${t.error.code})`;
      e ? e(new Error(h)) : console.error(h);
    }, a = () => {
      t.removeEventListener("canplaythrough", n), t.removeEventListener("load", n), t.removeEventListener("abort", o), t.removeEventListener("error", r);
    };
    t.addEventListener("canplaythrough", n, !1), t.addEventListener("load", n, !1), t.addEventListener("abort", o, !1), t.addEventListener("error", r, !1), t.load();
  }
}
class Ps {
  /**
   * @param parent - The parent sound
   * @param options - Data associated with object.
   */
  constructor(e, t) {
    this.parent = e, Object.assign(this, t), this.duration = this.end - this.start, console.assert(this.duration > 0, "End time must be after start time");
  }
  /**
   * Play the sound sprite.
   * @param {Function} [complete] - Function call when complete
   * @return Sound instance being played.
   */
  play(e) {
    return this.parent.play({
      complete: e,
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
}
const oe = [
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
], As = [
  "audio/mpeg",
  "audio/ogg"
], re = {};
function ks(i) {
  const e = {
    m4a: "audio/mp4",
    oga: "audio/ogg",
    opus: 'audio/ogg; codecs="opus"',
    caf: 'audio/x-caf; codecs="opus"'
  }, t = document.createElement("audio"), s = {}, n = /^no$/;
  oe.forEach((o) => {
    const r = t.canPlayType(`audio/${o}`).replace(n, ""), a = e[o] ? t.canPlayType(e[o]).replace(n, "") : "";
    s[o] = !!r || !!a;
  }), Object.assign(re, s);
}
ks();
let Ls = 0;
class Es extends X {
  constructor(e) {
    super(), this.id = Ls++, this._media = null, this._paused = !1, this._muted = !1, this._elapsed = 0, this.init(e);
  }
  /**
   * Set a property by name, this makes it easy to chain values
   * @param name - Name of the property to set.
   * @param value - Value to set property to.
   */
  set(e, t) {
    if (this[e] === void 0)
      throw new Error(`Property with name ${e} does not exist.`);
    switch (e) {
      case "speed":
        this.speed = t;
        break;
      case "volume":
        this.volume = t;
        break;
      case "muted":
        this.muted = t;
        break;
      case "loop":
        this.loop = t;
        break;
      case "paused":
        this.paused = t;
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
  set speed(e) {
    this._speed = e, this.refresh(), this._update(!0);
  }
  /** Get the set the volume for this instance from 0 to 1 */
  get volume() {
    return this._volume;
  }
  set volume(e) {
    this._volume = e, this.refresh();
  }
  /** `true` if the sound is muted */
  get muted() {
    return this._muted;
  }
  set muted(e) {
    this._muted = e, this.refresh();
  }
  /** If the sound instance should loop playback */
  get loop() {
    return this._loop;
  }
  set loop(e) {
    this._loop = e, this.refresh();
  }
  /** The collection of filters. */
  get filters() {
    return this._filters;
  }
  set filters(e) {
    var t;
    this._filters && ((t = this._filters) == null || t.filter((s) => s).forEach((s) => s.disconnect()), this._filters = null, this._source.connect(this._gain)), this._filters = e != null && e.length ? e.slice(0) : null, this.refresh();
  }
  /** Refresh loop, volume and speed based on changes to parent */
  refresh() {
    if (!this._source)
      return;
    const e = this._media.context, t = this._media.parent;
    this._source.loop = this._loop || t.loop;
    const s = e.volume * (e.muted ? 0 : 1), n = t.volume * (t.muted ? 0 : 1), o = this._volume * (this._muted ? 0 : 1);
    Se.setParamValue(this._gain.gain, o * n * s), Se.setParamValue(this._source.playbackRate, this._speed * t.speed * e.speed), this.applyFilters();
  }
  /** Connect filters nodes to audio context */
  applyFilters() {
    var e;
    if ((e = this._filters) != null && e.length) {
      this._source.disconnect();
      let t = this._source;
      this._filters.forEach((s) => {
        t.connect(s.destination), t = s;
      }), t.connect(this._gain);
    }
  }
  /** Handle changes in paused state, either globally or sound or instance */
  refreshPaused() {
    const e = this._media.context, t = this._media.parent, s = this._paused || t.paused || e.paused;
    s !== this._pausedReal && (this._pausedReal = s, s ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({
      start: this._elapsed % this._duration,
      end: this._end,
      speed: this._speed,
      loop: this._loop,
      volume: this._volume
    })), this.emit("pause", s));
  }
  /**
   * Plays the sound.
   * @param options - Play options.
   */
  play(e) {
    const { start: t, end: s, speed: n, loop: o, volume: r, muted: a, filters: h } = e;
    s && console.assert(s > t, "End time is before start time"), this._paused = !1;
    const { source: u, gain: c } = this._media.nodes.cloneBufferSource();
    this._source = u, this._gain = c, this._speed = n, this._volume = r, this._loop = !!o, this._muted = a, this._filters = h, this.refresh();
    const d = this._source.buffer.duration;
    this._duration = d, this._end = s, this._lastUpdate = this._now(), this._elapsed = t, this._source.onended = this._onComplete.bind(this), this._loop ? (this._source.loopEnd = s, this._source.loopStart = t, this._source.start(0, t)) : s ? this._source.start(0, t, s - t) : this._source.start(0, t), this.emit("start"), this._update(!0), this.enableTicker(!0);
  }
  /** Start the update progress. */
  enableTicker(e) {
    V.shared.remove(this._updateListener, this), e && V.shared.add(this._updateListener, this);
  }
  /** The current playback progress from 0 to 1. */
  get progress() {
    return this._progress;
  }
  /** Pauses the sound. */
  get paused() {
    return this._paused;
  }
  set paused(e) {
    this._paused = e, this.refreshPaused();
  }
  /** Don't use after this. */
  destroy() {
    var e;
    this.removeAllListeners(), this._internalStop(), this._gain && (this._gain.disconnect(), this._gain = null), this._media && (this._media.context.events.off("refresh", this.refresh, this), this._media.context.events.off("refreshPaused", this.refreshPaused, this), this._media = null), (e = this._filters) == null || e.forEach((t) => t.disconnect()), this._filters = null, this._end = null, this._speed = 1, this._volume = 1, this._loop = !1, this._elapsed = 0, this._duration = 0, this._paused = !1, this._muted = !1, this._pausedReal = !1;
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
  _update(e = !1) {
    if (this._source) {
      const t = this._now(), s = t - this._lastUpdate;
      if (s > 0 || e) {
        const n = this._source.playbackRate.value;
        this._elapsed += s * n, this._lastUpdate = t;
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
  init(e) {
    this._media = e, e.context.events.on("refresh", this.refresh, this), e.context.events.on("refreshPaused", this.refreshPaused, this);
  }
  /** Stops the instance. */
  _internalStop() {
    if (this._source) {
      this.enableTicker(!1), this._source.onended = null, this._source.stop(0), this._source.disconnect();
      try {
        this._source.buffer = null;
      } catch (e) {
        console.warn("Failed to set AudioBufferSourceNode.buffer to null:", e);
      }
      this._source = null;
    }
  }
  /** Callback when completed. */
  _onComplete() {
    if (this._source) {
      this.enableTicker(!1), this._source.onended = null, this._source.disconnect();
      try {
        this._source.buffer = null;
      } catch (e) {
        console.warn("Failed to set AudioBufferSourceNode.buffer to null:", e);
      }
    }
    this._source = null, this._progress = 1, this.emit("progress", 1, this._duration), this.emit("end", this);
  }
}
class at {
  /**
   * @param input - The source audio node
   * @param output - The output audio node
   */
  constructor(e, t) {
    this._output = t, this._input = e;
  }
  /** The destination output audio node */
  get destination() {
    return this._input;
  }
  /** The collection of filters. */
  get filters() {
    return this._filters;
  }
  set filters(e) {
    if (this._filters && (this._filters.forEach((t) => {
      t && t.disconnect();
    }), this._filters = null, this._input.connect(this._output)), e && e.length) {
      this._filters = e.slice(0), this._input.disconnect();
      let t = null;
      e.forEach((s) => {
        t === null ? this._input.connect(s.destination) : t.connect(s.destination), t = s;
      }), t.connect(this._output);
    }
  }
  /** Cleans up. */
  destroy() {
    this.filters = null, this._input = null, this._output = null;
  }
}
const ht = class extends at {
  /**
   * @param context - The audio context.
   */
  constructor(i) {
    const e = i.audioContext, t = e.createBufferSource(), s = e.createGain(), n = e.createAnalyser();
    t.connect(n), n.connect(s), s.connect(i.destination), super(n, s), this.context = i, this.bufferSource = t, this.gain = s, this.analyser = n;
  }
  /**
   * Get the script processor node.
   * @readonly
   */
  get script() {
    return this._script || (this._script = this.context.audioContext.createScriptProcessor(ht.BUFFER_SIZE), this._script.connect(this.context.destination)), this._script;
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
    const i = this.bufferSource, e = this.context.audioContext.createBufferSource();
    e.buffer = i.buffer, Se.setParamValue(e.playbackRate, i.playbackRate.value), e.loop = i.loop;
    const t = this.context.audioContext.createGain();
    return e.connect(t), t.connect(this.destination), { source: e, gain: t };
  }
  /**
   * Get buffer size of `ScriptProcessorNode`.
   * @readonly
   */
  get bufferSize() {
    return this.script.bufferSize;
  }
};
let lt = ht;
lt.BUFFER_SIZE = 0;
class Ms {
  /**
   * Re-initialize without constructing.
   * @param parent - - Instance of parent Sound container
   */
  init(e) {
    this.parent = e, this._nodes = new lt(this.context), this._source = this._nodes.bufferSource, this.source = e.options.source;
  }
  /** Destructor, safer to use `SoundLibrary.remove(alias)` to remove this sound. */
  destroy() {
    this.parent = null, this._nodes.destroy(), this._nodes = null;
    try {
      this._source.buffer = null;
    } catch (e) {
      console.warn("Failed to set AudioBufferSourceNode.buffer to null:", e);
    }
    this._source = null, this.source = null;
  }
  // Implement create
  create() {
    return new Es(this);
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
  set filters(e) {
    this._nodes.filters = e;
  }
  // Implements duration
  get duration() {
    return console.assert(this.isPlayable, "Sound not yet playable, no duration"), this._source.buffer.duration;
  }
  /** Gets and sets the buffer. */
  get buffer() {
    return this._source.buffer;
  }
  set buffer(e) {
    this._source.buffer = e;
  }
  /** Get the current chained nodes object */
  get nodes() {
    return this._nodes;
  }
  // Implements load
  load(e) {
    this.source ? this._decode(this.source, e) : this.parent.url ? this._loadUrl(e) : e ? e(new Error("sound.url or sound.source must be set")) : console.error("sound.url or sound.source must be set");
  }
  /** Loads a sound using XHMLHttpRequest object. */
  async _loadUrl(e) {
    const t = this.parent.url, s = await yt.get().fetch(t);
    this._decode(await s.arrayBuffer(), e);
  }
  /**
   * Decodes the array buffer.
   * @param arrayBuffer - From load.
   * @param {Function} callback - Callback optional
   */
  _decode(e, t) {
    const s = (n, o) => {
      if (n)
        t && t(n);
      else {
        this.parent.isLoaded = !0, this.buffer = o;
        const r = this.parent.autoPlayStart();
        t && t(null, this.parent, r);
      }
    };
    e instanceof AudioBuffer ? s(null, e) : this.parent.context.decode(e, s);
  }
}
const B = class {
  /**
   * Create a new sound instance from source.
   * @param source - Either the path or url to the source file.
   *        or the object of options to use.
   * @return Created sound instance.
   */
  static from(i) {
    let e = {};
    typeof i == "string" ? e.url = i : i instanceof ArrayBuffer || i instanceof AudioBuffer || i instanceof HTMLAudioElement ? e.source = i : Array.isArray(i) ? e.url = i : e = i, e = {
      autoPlay: !1,
      singleInstance: !1,
      url: null,
      source: null,
      preload: !1,
      volume: 1,
      speed: 1,
      complete: null,
      loaded: null,
      loop: !1,
      ...e
    }, Object.freeze(e);
    const t = W().useLegacy ? new Ss() : new Ms();
    return new B(t, e);
  }
  /**
   * Use `Sound.from`
   * @ignore
   */
  constructor(i, e) {
    this.media = i, this.options = e, this._instances = [], this._sprites = {}, this.media.init(this);
    const t = e.complete;
    this._autoPlayOptions = t ? { complete: t } : null, this.isLoaded = !1, this._preloadQueue = null, this.isPlaying = !1, this.autoPlay = e.autoPlay, this.singleInstance = e.singleInstance, this.preload = e.preload || this.autoPlay, this.url = Array.isArray(e.url) ? this.preferUrl(e.url) : e.url, this.speed = e.speed, this.volume = e.volume, this.loop = e.loop, e.sprites && this.addSprites(e.sprites), this.preload && this._preload(e.loaded);
  }
  /**
   * Internal help for resolving which file to use if there are multiple provide
   * this is especially helpful for working with bundlers (non Assets loading).
   */
  preferUrl(i) {
    const [e] = i.map((t) => ({ url: t, ext: ee.extname(t).slice(1) })).filter(({ ext: t }) => re[t]).sort((t, s) => oe.indexOf(t.ext) - oe.indexOf(s.ext));
    if (!e)
      throw new Error("No supported file type found");
    return e.url;
  }
  /** Instance of the media context. */
  get context() {
    return W().context;
  }
  /** Stops all the instances of this sound from playing. */
  pause() {
    return this.isPlaying = !1, this.paused = !0, this;
  }
  /** Resuming all the instances of this sound from playing */
  resume() {
    return this.isPlaying = this._instances.length > 0, this.paused = !1, this;
  }
  /** Stops all the instances of this sound from playing. */
  get paused() {
    return this._paused;
  }
  set paused(i) {
    this._paused = i, this.refreshPaused();
  }
  /** The playback rate. */
  get speed() {
    return this._speed;
  }
  set speed(i) {
    this._speed = i, this.refresh();
  }
  /** Set the filters. Only supported with WebAudio. */
  get filters() {
    return this.media.filters;
  }
  set filters(i) {
    this.media.filters = i;
  }
  /**
   * @ignore
   */
  addSprites(i, e) {
    if (typeof i == "object") {
      const s = {};
      for (const n in i)
        s[n] = this.addSprites(n, i[n]);
      return s;
    }
    console.assert(!this._sprites[i], `Alias ${i} is already taken`);
    const t = new Ps(this, e);
    return this._sprites[i] = t, t;
  }
  /** Destructor, safer to use `SoundLibrary.remove(alias)` to remove this sound. */
  destroy() {
    this._removeInstances(), this.removeSprites(), this.media.destroy(), this.media = null, this._sprites = null, this._instances = null;
  }
  /**
   * Remove a sound sprite.
   * @param alias - The unique name of the sound sprite, if alias is omitted, removes all sprites.
   */
  removeSprites(i) {
    if (i) {
      const e = this._sprites[i];
      e !== void 0 && (e.destroy(), delete this._sprites[i]);
    } else
      for (const e in this._sprites)
        this.removeSprites(e);
    return this;
  }
  /** If the current sound is playable (loaded). */
  get isPlayable() {
    return this.isLoaded && this.media && this.media.isPlayable;
  }
  /** Stops all the instances of this sound from playing. */
  stop() {
    if (!this.isPlayable)
      return this.autoPlay = !1, this._autoPlayOptions = null, this;
    this.isPlaying = !1;
    for (let i = this._instances.length - 1; i >= 0; i--)
      this._instances[i].stop();
    return this;
  }
  // Overloaded function
  play(i, e) {
    let t;
    if (typeof i == "string" ? t = { sprite: i, loop: this.loop, complete: e } : typeof i == "function" ? (t = {}, t.complete = i) : t = i, t = {
      complete: null,
      loaded: null,
      sprite: null,
      end: null,
      start: 0,
      volume: 1,
      speed: 1,
      muted: !1,
      loop: !1,
      ...t || {}
    }, t.sprite) {
      const n = t.sprite;
      console.assert(!!this._sprites[n], `Alias ${n} is not available`);
      const o = this._sprites[n];
      t.start = o.start + (t.start || 0), t.end = o.end, t.speed = o.speed || 1, t.loop = o.loop || t.loop, delete t.sprite;
    }
    if (t.offset && (t.start = t.offset), !this.isLoaded)
      return this._preloadQueue ? new Promise((n) => {
        this._preloadQueue.push(() => {
          n(this.play(t));
        });
      }) : (this._preloadQueue = [], this.autoPlay = !0, this._autoPlayOptions = t, new Promise((n, o) => {
        this._preload((r, a, h) => {
          this._preloadQueue.forEach((u) => u()), this._preloadQueue = null, r ? o(r) : (t.loaded && t.loaded(r, a, h), n(h));
        });
      }));
    (this.singleInstance || t.singleInstance) && this._removeInstances();
    const s = this._createInstance();
    return this._instances.push(s), this.isPlaying = !0, s.once("end", () => {
      t.complete && t.complete(this), this._onComplete(s);
    }), s.once("stop", () => {
      this._onComplete(s);
    }), s.play(t), s;
  }
  /** Internal only, speed, loop, volume change occured. */
  refresh() {
    const i = this._instances.length;
    for (let e = 0; e < i; e++)
      this._instances[e].refresh();
  }
  /** Handle changes in paused state. Internal only. */
  refreshPaused() {
    const i = this._instances.length;
    for (let e = 0; e < i; e++)
      this._instances[e].refreshPaused();
  }
  /** Gets and sets the volume. */
  get volume() {
    return this._volume;
  }
  set volume(i) {
    this._volume = i, this.refresh();
  }
  /** Gets and sets the muted flag. */
  get muted() {
    return this._muted;
  }
  set muted(i) {
    this._muted = i, this.refresh();
  }
  /** Gets and sets the looping. */
  get loop() {
    return this._loop;
  }
  set loop(i) {
    this._loop = i, this.refresh();
  }
  /** Starts the preloading of sound. */
  _preload(i) {
    this.media.load(i);
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
    let i;
    return this.autoPlay && (i = this.play(this._autoPlayOptions)), i;
  }
  /** Removes all instances. */
  _removeInstances() {
    for (let i = this._instances.length - 1; i >= 0; i--)
      this._poolInstance(this._instances[i]);
    this._instances.length = 0;
  }
  /**
   * Sound instance completed.
   * @param instance
   */
  _onComplete(i) {
    if (this._instances) {
      const e = this._instances.indexOf(i);
      e > -1 && this._instances.splice(e, 1), this.isPlaying = this._instances.length > 0;
    }
    this._poolInstance(i);
  }
  /** Create a new instance. */
  _createInstance() {
    if (B._pool.length > 0) {
      const i = B._pool.pop();
      return i.init(this.media), i;
    }
    return this.media.create();
  }
  /**
   * Destroy/recycling the instance object.
   * @param instance - Instance to recycle
   */
  _poolInstance(i) {
    i.destroy(), B._pool.indexOf(i) < 0 && B._pool.push(i);
  }
};
let ae = B;
ae._pool = [];
class H extends at {
  constructor() {
    const e = window, t = new H.AudioContext(), s = t.createDynamicsCompressor(), n = t.createAnalyser();
    n.connect(s), s.connect(t.destination), super(n, s), this.autoPause = !0, this._ctx = t, this._offlineCtx = new H.OfflineAudioContext(
      1,
      2,
      e.OfflineAudioContext ? Math.max(8e3, Math.min(96e3, t.sampleRate)) : 44100
    ), this.compressor = s, this.analyser = n, this.events = new X(), this.volume = 1, this.speed = 1, this.muted = !1, this.paused = !1, this._locked = t.state === "suspended" && ("ontouchstart" in globalThis || "onclick" in globalThis), this._locked && (this._unlock(), this._unlock = this._unlock.bind(this), document.addEventListener("mousedown", this._unlock, !0), document.addEventListener("touchstart", this._unlock, !0), document.addEventListener("touchend", this._unlock, !0)), this.onFocus = this.onFocus.bind(this), this.onBlur = this.onBlur.bind(this), globalThis.addEventListener("focus", this.onFocus), globalThis.addEventListener("blur", this.onBlur);
  }
  /** Handle mobile WebAudio context resume */
  onFocus() {
    if (!this.autoPause)
      return;
    const e = this._ctx.state;
    (e === "suspended" || e === "interrupted" || !this._locked) && (this.paused = this._pausedOnBlur, this.refreshPaused());
  }
  /** Handle mobile WebAudio context suspend */
  onBlur() {
    this.autoPause && (this._locked || (this._pausedOnBlur = this._paused, this.paused = !0, this.refreshPaused()));
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
    this._locked && (this.playEmptySound(), this._ctx.state === "running" && (document.removeEventListener("mousedown", this._unlock, !0), document.removeEventListener("touchend", this._unlock, !0), document.removeEventListener("touchstart", this._unlock, !0), this._locked = !1));
  }
  /**
   * Plays an empty sound in the web audio context.  This is used to enable web audio on iOS devices, as they
   * require the first sound to be played inside of a user initiated event (touch/click).
   */
  playEmptySound() {
    const e = this._ctx.createBufferSource();
    e.buffer = this._ctx.createBuffer(1, 1, 22050), e.connect(this._ctx.destination), e.start(0, 0, 0), e.context.state === "suspended" && e.context.resume();
  }
  /**
   * Get AudioContext class, if not supported returns `null`
   * @type {AudioContext}
   * @readonly
   */
  static get AudioContext() {
    const e = window;
    return e.AudioContext || e.webkitAudioContext || null;
  }
  /**
   * Get OfflineAudioContext class, if not supported returns `null`
   * @type {OfflineAudioContext}
   * @readonly
   */
  static get OfflineAudioContext() {
    const e = window;
    return e.OfflineAudioContext || e.webkitOfflineAudioContext || null;
  }
  /** Destroy this context. */
  destroy() {
    super.destroy();
    const e = this._ctx;
    typeof e.close < "u" && e.close(), globalThis.removeEventListener("focus", this.onFocus), globalThis.removeEventListener("blur", this.onBlur), this.events.removeAllListeners(), this.analyser.disconnect(), this.compressor.disconnect(), this.analyser = null, this.compressor = null, this.events = null, this._offlineCtx = null, this._ctx = null;
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
  set paused(e) {
    e && this._ctx.state === "running" ? this._ctx.suspend() : !e && this._ctx.state === "suspended" && this._ctx.resume(), this._paused = e;
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
  decode(e, t) {
    const s = (o) => {
      t(new Error((o == null ? void 0 : o.message) || "Unable to decode file"));
    }, n = this._offlineCtx.decodeAudioData(
      e,
      (o) => {
        t(null, o);
      },
      s
    );
    n && n.catch(s);
  }
}
class Fs {
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
    return this.supported && (this._webAudioContext = new H()), this._htmlAudioContext = new xs(), this._sounds = {}, this.useLegacy = !this.supported, this;
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
  set filtersAll(e) {
    this.useLegacy || (this._context.filters = e);
  }
  /**
   * `true` if WebAudio is supported on the current browser.
   */
  get supported() {
    return H.AudioContext !== null;
  }
  /**
   * @ignore
   */
  add(e, t) {
    if (typeof e == "object") {
      const o = {};
      for (const r in e) {
        const a = this._getOptions(
          e[r],
          t
        );
        o[r] = this.add(r, a);
      }
      return o;
    }
    if (console.assert(!this._sounds[e], `Sound with alias ${e} already exists.`), t instanceof ae)
      return this._sounds[e] = t, t;
    const s = this._getOptions(t), n = ae.from(s);
    return this._sounds[e] = n, n;
  }
  /**
   * Internal methods for getting the options object
   * @private
   * @param source - The source options
   * @param overrides - Override default options
   * @return The construction options
   */
  _getOptions(e, t) {
    let s;
    return typeof e == "string" ? s = { url: e } : Array.isArray(e) ? s = { url: e } : e instanceof ArrayBuffer || e instanceof AudioBuffer || e instanceof HTMLAudioElement ? s = { source: e } : s = e, s = { ...s, ...t || {} }, s;
  }
  /**
   * Do not use WebAudio, force the use of legacy. This **must** be called before loading any files.
   */
  get useLegacy() {
    return this._useLegacy;
  }
  set useLegacy(e) {
    this._useLegacy = e, this._context = !e && this.supported ? this._webAudioContext : this._htmlAudioContext;
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
  set disableAutoPause(e) {
    this._webAudioContext.autoPause = !e;
  }
  /**
   * Removes a sound by alias.
   * @param alias - The sound alias reference.
   * @return Instance for chaining.
   */
  remove(e) {
    return this.exists(e, !0), this._sounds[e].destroy(), delete this._sounds[e], this;
  }
  /**
   * Set the global volume for all sounds. To set per-sound volume see {@link SoundLibrary#volume}.
   */
  get volumeAll() {
    return this._context.volume;
  }
  set volumeAll(e) {
    this._context.volume = e, this._context.refresh();
  }
  /**
   * Set the global speed for all sounds. To set per-sound speed see {@link SoundLibrary#speed}.
   */
  get speedAll() {
    return this._context.speed;
  }
  set speedAll(e) {
    this._context.speed = e, this._context.refresh();
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
    return this._context.paused = !0, this._context.refreshPaused(), this;
  }
  /**
   * Resumes any sounds.
   * @return Instance for chaining.
   */
  resumeAll() {
    return this._context.paused = !1, this._context.refreshPaused(), this;
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
    return this._context.muted = !0, this._context.refresh(), this;
  }
  /**
   * Unmutes all playing sounds.
   * @return Instance for chaining.
   */
  unmuteAll() {
    return this._context.muted = !1, this._context.refresh(), this;
  }
  /**
   * Stops and removes all sounds. They cannot be used after this.
   * @return Instance for chaining.
   */
  removeAll() {
    for (const e in this._sounds)
      this._sounds[e].destroy(), delete this._sounds[e];
    return this;
  }
  /**
   * Stops all sounds.
   * @return Instance for chaining.
   */
  stopAll() {
    for (const e in this._sounds)
      this._sounds[e].stop();
    return this;
  }
  /**
   * Checks if a sound by alias exists.
   * @param alias - Check for alias.
   * @param assert - Whether enable console.assert.
   * @return true if the sound exists.
   */
  exists(e, t = !1) {
    const s = !!this._sounds[e];
    return t && console.assert(s, `No sound matching alias '${e}'.`), s;
  }
  /**
   * Convenience function to check to see if any sound is playing.
   * @returns `true` if any sound is currently playing.
   */
  isPlaying() {
    for (const e in this._sounds)
      if (this._sounds[e].isPlaying)
        return !0;
    return !1;
  }
  /**
   * Find a sound by alias.
   * @param alias - The sound alias reference.
   * @return Sound object.
   */
  find(e) {
    return this.exists(e, !0), this._sounds[e];
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
  play(e, t) {
    return this.find(e).play(t);
  }
  /**
   * Stops a sound.
   * @param alias - The sound alias reference.
   * @return Sound object.
   */
  stop(e) {
    return this.find(e).stop();
  }
  /**
   * Pauses a sound.
   * @param alias - The sound alias reference.
   * @return Sound object.
   */
  pause(e) {
    return this.find(e).pause();
  }
  /**
   * Resumes a sound.
   * @param alias - The sound alias reference.
   * @return Instance for chaining.
   */
  resume(e) {
    return this.find(e).resume();
  }
  /**
   * Get or set the volume for a sound.
   * @param alias - The sound alias reference.
   * @param volume - Optional current volume to set.
   * @return The current volume.
   */
  volume(e, t) {
    const s = this.find(e);
    return t !== void 0 && (s.volume = t), s.volume;
  }
  /**
   * Get or set the speed for a sound.
   * @param alias - The sound alias reference.
   * @param speed - Optional current speed to set.
   * @return The current speed.
   */
  speed(e, t) {
    const s = this.find(e);
    return t !== void 0 && (s.speed = t), s.speed;
  }
  /**
   * Get the length of a sound in seconds.
   * @param alias - The sound alias reference.
   * @return The current duration in seconds.
   */
  duration(e) {
    return this.find(e).duration;
  }
  /**
   * Closes the sound library. This will release/destroy
   * the AudioContext(s). Can be used safely if you want to
   * initialize the sound library later. Use `init` method.
   */
  close() {
    return this.removeAll(), this._sounds = null, this._webAudioContext && (this._webAudioContext.destroy(), this._webAudioContext = null), this._htmlAudioContext && (this._htmlAudioContext.destroy(), this._htmlAudioContext = null), this._context = null, this;
  }
}
const Ne = (i) => {
  var s;
  const e = i.src;
  let t = (s = i == null ? void 0 : i.alias) == null ? void 0 : s[0];
  return (!t || i.src === t) && (t = ee.basename(e, ee.extname(e))), t;
}, Ts = {
  extension: Be.Asset,
  detection: {
    test: async () => !0,
    add: async (i) => [...i, ...oe.filter((e) => re[e])],
    remove: async (i) => i.filter((e) => i.includes(e))
  },
  loader: {
    name: "sound",
    extension: {
      type: [Be.LoadParser],
      priority: wt.High
    },
    /** Should we attempt to load this file? */
    test(i) {
      const e = ee.extname(i).slice(1);
      return !!re[e] || As.some((t) => i.startsWith(`data:${t}`));
    },
    /** Load the sound file, this is mostly handled by Sound.from() */
    async load(i, e) {
      const t = await new Promise((s, n) => ae.from({
        ...e.data,
        url: i,
        preload: !0,
        loaded(o, r) {
          var a, h;
          o ? n(o) : s(r), (h = (a = e.data) == null ? void 0 : a.loaded) == null || h.call(a, o, r);
        }
      }));
      return W().add(Ne(e), t), t;
    },
    /** Remove the sound from the library */
    async unload(i, e) {
      W().remove(Ne(e));
    }
  }
};
bt.add(Ts);
const L = bs(new Fs());
class zs extends E {
  /**
   * Creates a new AudioManager instance.
   * @param {string} id - The ID of the AudioManager. Default is 'AudioManager'.
   */
  constructor(e = "audio") {
    super(e), this.onSoundStarted = new l(), this.onSoundEnded = new l(), this.onMuted = new l(), this.onMasterVolumeChanged = new l(), this.onChannelVolumeChanged = new l(), this._storedVolume = void 0, this._paused = !1, this._idMap = /* @__PURE__ */ new Map(), this._masterVolume = 1, this._muted = !1, this._channels = /* @__PURE__ */ new Map(), this.createChannel("music"), this.createChannel("sfx"), this.createChannel("voiceover");
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
  set masterVolume(e) {
    this._masterVolume = e, this._channels.forEach((t) => t.updateVolume());
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
  set muted(e) {
    this._muted = e, this._setMuted();
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
    this._channels.forEach((e) => {
      e.destroy();
    }), this._channels.clear(), this.onSoundStarted.disconnectAll(), this.onSoundEnded.disconnectAll(), this.onMuted.disconnectAll(), this.onMasterVolumeChanged.disconnectAll(), this.onChannelVolumeChanged.disconnectAll(), super.destroy();
  }
  /**
   * Initializes the AudioManager.
   * @param {IApplication} app
   * @returns {Promise<void>}
   */
  initialize(e) {
    return typeof (e == null ? void 0 : e.manifest) == "object" && this.addAllFromManifest(e.manifest), Promise.resolve(void 0);
  }
  /**
   * Creates a new audio channel.
   * @param {string} name
   */
  createChannel(e) {
    if (this._channels.has(e))
      throw new Error(`Channel with name ${e} already exists.`);
    const t = new ws(e, this);
    this._channels.set(e, t);
  }
  /**
   * Sets the volume of the specified channel.
   * @param {ChannelName | ChannelName[]} channelName
   * @param {number} volume
   */
  setChannelVolume(e, t) {
    Array.isArray(e) || (e = [e]), e.forEach((s) => this._setChannelVolume(s, t));
  }
  /**
   * Gets the audio channel with the specified name.
   * @param {ChannelName} name
   * @returns {IAudioChannel | undefined}
   */
  getChannel(e) {
    return this._channels.get(e);
  }
  /**
   * Mutes the audio.
   */
  mute() {
    this._muted = !0, this._setMuted();
  }
  /**
   * Unmutes the audio.
   */
  unmute() {
    this._muted = !1, this._setMuted();
  }
  /**
   * Pauses the audio.
   */
  pause() {
    this._paused = !0, this._setPaused();
  }
  /**
   * Resumes the audio.
   */
  resume() {
    this._paused = !1, this._setPaused();
  }
  /**
   * Adds all sound assets from the specified manifest.
   * @param {AssetsManifest} manifest
   */
  addAllFromManifest(e) {
    e.bundles.forEach((t) => {
      this.addAllFromBundle(t.name, e);
    });
  }
  /**
   * Adds all sound assets from the specified bundle.
   * @param {string} bundleName
   * @param {AssetsManifest | string | undefined} manifest
   */
  addAllFromBundle(e, t) {
    if (t || (t = this.app.manifest), t === void 0 || typeof t == "string")
      throw new Error("Manifest is not available");
    const s = t.bundles.find((n) => n.name === e);
    if (s === void 0)
      throw new Error(`Bundle with name ${e} does not exist.`);
    Array.isArray(s == null ? void 0 : s.assets) || (s.assets = [s.assets]), s.assets.forEach((n) => {
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
  add(e) {
    let t = e.alias;
    if (Array.isArray(e.alias) || (t = [e.alias]), t) {
      const s = {};
      t.forEach((n) => {
        n !== void 0 && (s[n] = e.src);
      }), L.add(s);
    }
  }
  /**
   * Plays a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {ChannelName} channelName
   * @param {PlayOptions} options
   * @returns {Promise<IAudioInstance>}
   */
  async play(e, t = "sfx", s) {
    this._idMap.has(e) && (e = this._idMap.get(e));
    const n = this._channels.get(t);
    if (n) {
      e = this._verifySoundId(e);
      const o = n.add(e, new Ye(e, n, this)), r = await L.play(e, s);
      return o.media = r, (s == null ? void 0 : s.volume) !== void 0 && (r.volume = s.volume, o.onStart.connect(() => {
      }), o.onEnd.connect(() => {
      })), o;
    } else
      throw new Error(`Channel ${t} does not exist.`);
  }
  /**
   * Stops a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {ChannelName} channelName
   * @returns {IAudioInstance | undefined}
   */
  stop(e, t = "sfx") {
    const s = this._channels.get(t);
    if (s)
      return s.remove(e);
    throw new Error(`Channel ${t} does not exist.`);
  }
  /**
   * Fades in a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {ChannelName} channelName
   * @param {gsap.TweenVars} props
   * @returns {Promise<gsap.core.Tween | null>}
   */
  async fadeIn(e, t = "music", s) {
    const n = this._channels.get(t);
    n && (e = this._verifySoundId(e)), n != null && n.get(e) || await this.play(e, t, { volume: 0 }), (s == null ? void 0 : s.volume) === 0 && _.warn("fadeIn volume is 0", e, t, s);
    const o = Object.assign({ volume: (s == null ? void 0 : s.volume) ?? 1, duration: 1, ease: "linear.easeNone" }, s);
    return this.fade(e, t, o);
  }
  /**
   * Fades out a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {ChannelName} channelName
   * @param {Partial<gsap.TweenVars>} props
   * @returns {Promise<gsap.core.Tween | null>}
   */
  async fadeOut(e, t = "music", s = { volume: 0 }) {
    s || (s = {}), (s == null ? void 0 : s.volume) === void 0 && (s.volume = 0), (s == null ? void 0 : s.volume) > 0 && _.warn("fadeOut volume should probably be 0", e, t, s);
    const n = Object.assign({ volume: 0, duration: 1, ease: "linear.easeNone" }, s);
    return this.fade(e, t, n, !0);
  }
  /**
   * Crossfades between two sounds in the specified channel.
   * @param {string} outSoundId
   * @param {string} inSoundId
   * @param {ChannelName} channelName
   * @param {number} duration
   * @returns {Promise<gsap.core.Tween | null>}
   */
  async crossFade(e, t, s = "music", n = 2) {
    const o = { duration: n, ease: "linear.easeNone" };
    return this.fadeOut(e, s, o), this.fadeIn(t, s, o);
  }
  /**
   * Fades a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {ChannelName} channelName
   * @param {gsap.TweenVars} props
   * @param {boolean} stopOnComplete
   * @returns {Promise<gsap.core.Tween | null>}
   */
  async fade(e, t = "music", s, n = !1) {
    const o = this._channels.get(t);
    o && (e = this._verifySoundId(e));
    const r = o == null ? void 0 : o.get(e);
    if (r) {
      const a = M.to(r, s);
      return a.eventCallback("onComplete", () => {
        n && this.stop(e, t);
      }), a;
    }
    return null;
  }
  /**
   * Restores the audio state after it has been suspended.
   */
  restore() {
    this._storedVolume !== void 0 && (this.masterVolume = this._storedVolume), this.muted = this._muted, this.resume();
  }
  /**
   * Suspends the audio by setting the master volume to 0 and pausing all sounds.
   */
  suspend() {
    this._storedVolume = this._masterVolume, this.masterVolume = 0, this.pause();
  }
  getAudioInstance(e, t = "sfx") {
    const s = this._channels.get(t);
    if (e = this._verifySoundId(e), s)
      return s.get(e);
    throw new Error(`Channel ${t} does not exist.`);
  }
  load(e, t = "sfx", s) {
    Array.isArray(e) || (e = [e]);
    for (let n of e) {
      this._idMap.has(n) && (e = this._idMap.get(n));
      const o = this._channels.get(t);
      if (o) {
        n = this._verifySoundId(n);
        const r = L.find(n);
        r.options = { ...s, autoPlay: !1 };
        const a = o.add(n, new Ye(n, o, this));
        a.media = r.instances[0], a.pause();
      } else
        throw new Error(`Channel ${t} does not exist.`);
    }
  }
  getCoreSignals() {
    return ["onSoundStarted", "onSoundEnded", "onMuted", "onMasterVolumeChanged", "onChannelVolumeChanged"];
  }
  _verifySoundId(e) {
    const t = e;
    if (this._idMap.has(e))
      return this._idMap.get(e);
    if (!L.exists(e))
      if (L.exists(e + ".mp3"))
        e += ".mp3";
      else if (L.exists(e + ".ogg"))
        e += ".ogg";
      else if (L.exists(e + ".wav"))
        e += ".wav";
      else {
        e = t;
        let s = p.get(e);
        if (s || (e = t + ".mp3", s = p.get(e)), s || (e = t + ".ogg", s = p.get(e)), s || (e = t + ".wav", s = p.get(e)), s)
          this._findAndAddFromManifest(e, s);
        else
          throw new Error(`Sound with ID ${e} does not exist.`);
      }
    return _.log(`Sound with id:${t} is now mapped to id:${e}`), this._idMap.set(e, e), e;
  }
  _findAndAddFromManifest(e, t) {
    const s = this.app.manifest;
    if (s === void 0 || typeof s == "string")
      throw new Error("Manifest is not available");
    for (let n = 0; n < s.bundles.length; n++) {
      const o = s.bundles[n];
      Array.isArray(o == null ? void 0 : o.assets) || (o.assets = [o.assets]);
      for (let r = 0; r < o.assets.length; r++) {
        const a = o.assets[r], h = a.src, u = t.url.split("/").pop() ?? "";
        if (Array.isArray(h))
          for (let c = 0; c < h.length; c++) {
            const d = h[c];
            let v;
            if (typeof d != "string" ? v = d.src : v = d, v.includes(u)) {
              this.add(a);
              return;
            }
          }
        else if (h != null && h.includes(u)) {
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
    this._channels.forEach((e) => {
      e.muted = this._muted;
    }), this._muted ? L.muteAll() : L.unmuteAll(), this.onMuted.emit(this._muted);
  }
  /**
   * @private
   */
  _setPaused() {
    this._paused ? L.pauseAll() : L.resumeAll();
  }
  /**
   * Sets the volume of the specified channel.
   * @param {ChannelName} channelName
   * @param {number} volume
   * @private
   */
  _setChannelVolume(e, t) {
    const s = this._channels.get(e);
    if (s)
      s.volume = t;
    else
      throw new Error(`Channel ${e} does not exist.`);
  }
  /**
   * Sound started event handler. Emit the onSoundStarted signal.
   * @param {string} id
   * @param {IAudioInstance} instance
   * @param {ChannelName} channelName
   * @private
   */
  _soundStarted(e, t, s) {
    this.onSoundStarted.emit({ id: e, instance: t, channelName: s });
  }
  /**
   * Sound ended event handler. Emit the onSoundEnded signal.
   * @param {string} id
   * @param {IAudioInstance} instance
   * @param {ChannelName} channelName
   * @private
   */
  _soundEnded(e, t, s) {
    this.onSoundEnded.emit({ id: e, instance: t, channelName: s });
  }
}
const Ds = {
  defaultLocale: "en",
  locales: ["en"],
  loadAll: !1,
  files: []
};
class Os extends E {
  constructor() {
    super(...arguments), this.id = "i18n", this.onLocaleChanged = new l(), this._dicts = {};
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
  async initialize(e, t) {
    if (super.initialize(e), this._options = { ...Ds, ...t }, this._locale = this._options.defaultLocale, this._options.loadAll && this._options.files.length > 0) {
      const s = this._options.files.filter((n) => this._options.locales.includes(n.id));
      for (const n of s)
        await this.loadLocale(n.id);
    } else
      this._options.files.length > 0 && await this.loadLocale(this._locale);
  }
  /**
   * Sets the locale.
   * If the locale is not loaded, it will load it first.
   * @param localeId The locale id to set.
   * @returns Promise<string>
   */
  async setLocale(e) {
    return this._locale = e, await this._loadAndSetLocale(e), this._locale;
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
  t(e, t, s = this._locale) {
    const n = this._dicts[s];
    if (!n)
      return _.error(`i18n:: No dictionary loaded for current locale: ${s}`), "";
    let o = n[e];
    if (!o)
      return _.error(`i18n:: No result found for the key ${e} in the locale: ${this._locale}`), "";
    if (t) {
      if (typeof t.variant == "number" || t.variant === "random") {
        const r = /\[(.*?)\]/.exec(o);
        if (r) {
          const a = r[1].split("|"), h = t.variant === "random" ? Math.floor(Math.random() * a.length) : t.variant;
          o = o.replace(r[0], a[h]);
        }
      }
      for (const r in t) {
        const a = new RegExp(`{${r}}`, "g");
        o = o.replace(a, String(t[r]));
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
  parse(e, t = this._locale) {
    const s = this._dicts[t];
    if (!s)
      return _.error(`i18n:: No dictionary loaded for current locale: ${this._locale}`), "";
    let n = e;
    const o = n.match(/{(.*?)}/g);
    return o && o.forEach((r) => {
      const a = r.slice(1, -1);
      s[a] && (n = n.replace(r, s[a]));
    }), n;
  }
  /**
   * Loads a locale.
   * @param localeId The locale id to load.
   * @returns Promise<void>
   */
  async loadLocale(e) {
    const t = this._options.files.find((s) => e === s.id);
    if (!t) {
      _.error(`i18n:: Could not find locale file for ${e}`);
      return;
    }
    this._dicts[e] = t.json ? await p.load(t.json) : await se(t);
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
  async _loadAndSetLocale(e) {
    this._dicts[e] || await this.loadLocale(e), this.onLocaleChanged.emit(e);
  }
}
const Is = {
  autoScroll: !1,
  useAspectRatio: !1,
  fixed: !1,
  minSize: { width: 0, height: 0 },
  maxSize: { width: 0, height: 0 },
  debug: !1
};
class Us extends E {
  constructor() {
    super(...arguments), this.id = "resizer";
  }
  get size() {
    return this._size;
  }
  /**
   * Initializes the Resizer module.
   */
  async initialize(e, t = {}) {
    this._options = { ...Is, ...t };
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
    var v;
    let e = window.innerWidth, t = window.innerHeight;
    const s = (v = this.app.renderer.canvas) == null ? void 0 : v.parentElement, n = s == null ? void 0 : s.getBoundingClientRect();
    n && (e = n.width, t = n.height);
    const o = this._options.minSize.width, r = this._options.minSize.height, a = e < o ? o / e : 1, h = t < r ? r / t : 1, u = a > h ? a : h, c = e * u, d = t * u;
    this.app.renderer.canvas.style.width = `${e}px`, this.app.renderer.canvas.style.height = `${t}px`, this._options.autoScroll && (window == null || window.scrollTo(0, 0)), this.app.renderer.resize(c, d), this._size = { width: c, height: d }, this._options.debug && this._drawDebug();
  }
  /**
   * Draws debug information if debug option is enabled.
   */
  _drawDebug() {
    this._debugContainer || (this._debugContainer = this.app.stage.addChild(new $()), this._gfx = this._debugContainer.add.graphics()), this._gfx.clear(), this._gfx.rect(0, 0, this._size.width, this._size.height), this._gfx.stroke({ width: 4, color: 4095 });
  }
}
const qe = [
  {
    id: "assets",
    // module: () => import('./AssetsPlugin'),
    module: Qt,
    namedExport: "AssetsPlugin"
  },
  {
    id: "webEvents",
    module: Zt,
    namedExport: "WebEventsPlugin"
  },
  {
    id: "scenes",
    module: Jt,
    namedExport: "SceneManagerPlugin"
  },
  {
    id: "input",
    module: ts,
    namedExport: "InputPlugin"
  },
  {
    id: "keyboard",
    module: ss,
    namedExport: "KeyboardPlugin"
  },
  {
    id: "focus",
    module: os,
    namedExport: "FocusManagerPlugin"
  },
  {
    id: "popups",
    module: ys,
    namedExport: "PopupManagerPlugin"
  },
  {
    id: "audio",
    module: zs,
    namedExport: "AudioManagerPlugin"
  },
  {
    id: "i18n",
    module: Os,
    namedExport: "i18nPlugin"
  },
  {
    id: "resizer",
    module: Us,
    namedExport: "ResizerPlugin"
  }
], Bs = {
  antialias: !1,
  autoStart: !0,
  resizeToContainer: !1,
  backgroundColor: 0,
  backgroundAlpha: 1,
  clearBeforeRender: !1,
  context: null,
  eventFeatures: void 0,
  eventMode: void 0,
  hello: !1,
  powerPreference: "high-performance",
  premultipliedAlpha: !1,
  preserveDrawingBuffer: !1,
  resizeTo: void 0,
  sharedTicker: !0,
  view: void 0,
  autoDensity: !1,
  resolution: window.devicePixelRatio > 1.5 ? 2 : 1,
  // dill pixel options
  useStore: !0,
  useSpine: !1,
  useVoiceover: !0,
  storageAdapters: [],
  plugins: [],
  scenes: [],
  defaultSceneLoadMethod: "immediate",
  manifest: "./assets.json"
};
class g extends xt {
  constructor() {
    super(), this.__dill_pixel_method_binding_root = !0, this.onPause = new l(), this.onResume = new l(), this.onResize = new l(), this._plugins = /* @__PURE__ */ new Map(), this._center = new T(0, 0), C(this);
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
  get input() {
    return this._input || (this._input = this.getPlugin("input")), this._input;
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
    return this.input.context;
  }
  set actionContext(e) {
    this.input.context = e;
  }
  get voiceover() {
    return this._voiceoverPlugin || (this._voiceoverPlugin = this.getPlugin("voiceover")), this._voiceoverPlugin;
  }
  get captions() {
    return this._captionsPlugin || (this._captionsPlugin = this.getPlugin("captions")), this._captionsPlugin;
  }
  get isMobile() {
    return Qe.any;
  }
  get isTouch() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }
  get signal() {
    return tt;
  }
  get func() {
    return Ce;
  }
  get exec() {
    return Ce;
  }
  get views() {
    return [this.scenes.view, this.popups.view, this.captions.view];
  }
  static getInstance() {
    return g.instance;
  }
  /**
   * Destroy the application
   * This will destroy all plugins and the store
   * @param {RendererDestroyOptions} rendererDestroyOptions
   * @param {DestroyOptions} options
   */
  destroy(e, t) {
    this._plugins.forEach((s) => {
      s.destroy();
    }), this.store.destroy(), super.destroy(e, t);
  }
  setContainer(e) {
    g.containerElement || (g.containerElement = e);
  }
  async initialize(e) {
    if (g.instance)
      throw new Error("Application is already initialized");
    if (g.instance = this, this.config = Object.assign({ ...Bs }, e), e.container && (g.containerElement = e.container), _.initialize(this.config.logger), await this.boot(this.config), await this.preInitialize(this.config), await this.initAssets(), await this.init(this.config), await this.registerDefaultPlugins(), this.config.plugins && this.config.plugins.length > 0)
      for (let t = 0; t < this.config.plugins.length; t++) {
        const s = this.config.plugins[t];
        s && (s == null ? void 0 : s.autoLoad) !== !1 && await this.loadPlugin(s);
      }
    if (await this.registerPlugins(), this.config.useStore) {
      if (this._store = new Wt(), this._store.initialize(this), this.config.storageAdapters && this.config.storageAdapters.length > 0)
        for (let t = 0; t < this.config.storageAdapters.length; t++) {
          const s = this.config.storageAdapters[t];
          if (this.store.hasAdapter(s.id)) {
            _.error(`Storage Adapter with id "${s.id}" already registered. Not registering.`);
            continue;
          }
          const n = await se(s);
          await this.registerStorageAdapter(new n(s.id), s.options);
        }
      await this.registerStorageAdapters();
    }
    return await this._setup(), await this.setup(), await this.loadDefaultScene(), this.renderer.canvas.focus(), this.config.container && this.config.container.classList.add("loaded"), g.instance;
  }
  getPlugin(e) {
    const t = this._plugins.get(e);
    return t || _.error(`Plugin with name "${e}" not found.`), t;
  }
  async postInitialize() {
    globalThis.__PIXI_APP__ = this, this._plugins.forEach((e) => {
      e.postInitialize(this);
    }), this.webEvents.onVisibilityChanged.connect((e) => {
      e ? this.audio.restore() : this.audio.suspend();
    }), this._resize();
  }
  actions(e) {
    return this.input.actions(e);
  }
  getUnloadedPlugin(e) {
    var t;
    return (t = this.config.plugins) == null ? void 0 : t.find((s) => s.id === e);
  }
  async loadPlugin(e, t = !1) {
    if (this._plugins.has(e.id))
      return await this.registerPlugin(this._plugins.get(e.id), e.options);
    const s = await se(e), n = new s(e.id);
    n.id !== e.id && (n.id = e.id);
    let o = e.options;
    return t && !o && (o = this.config[n.id]), await this.registerPlugin(n, o);
  }
  sendAction(e, t) {
    this.input.sendAction(e, t);
  }
  /**
   * Get a storage adapter by id
   * @param {string} adapterId
   * @returns {IStorageAdapter}
   */
  getStorageAdapter(e) {
    return this.store.getAdapter(e);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async boot(e) {
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
  async preInitialize(e) {
    e.useSpine && await this.loadPlugin({
      id: "SpinePlugin",
      module: () => import("./SpinePlugin-DDC9c4H0.mjs"),
      namedExport: "SpinePlugin"
    });
  }
  // plugins
  async registerPlugin(e, t) {
    return this._plugins.has(e.id) ? (_.error(`Plugin with id "${e.id}" already registered. Not registering.`), e.initialize(this, t)) : (e.registerCoreFunctions(), e.registerCoreSignals(), this._plugins.set(e.id, e), e.initialize(this, t));
  }
  async registerDefaultPlugins() {
    for (let t = 0; t < qe.length; t++) {
      const s = qe[t];
      await this.loadPlugin(s, !0);
    }
    (this.config.showStats === !0 || te && this.config.showStats !== !1) && await this.loadPlugin({
      id: "stats",
      module: () => import("./StatsPlugin-NkiR1twn.mjs"),
      namedExport: "StatsPlugin"
    }), this.config.useVoiceover && (await this.loadPlugin({
      id: "voiceover",
      module: () => import("./VoiceOverPlugin-BLoajfsu.mjs"),
      namedExport: "VoiceOverPlugin",
      options: this.config.voiceover || void 0
    }), await this.loadPlugin({
      id: "captions",
      module: () => import("./CaptionsPlugin-DZ0VrqRj.mjs"),
      namedExport: "CaptionsPlugin",
      options: this.config.captions || void 0
    }));
  }
  async registerPlugins() {
    return Promise.resolve();
  }
  // storage
  async registerStorageAdapters() {
    return Promise.resolve();
  }
  async registerStorageAdapter(e, t) {
    return this.store.registerAdapter(e, t);
  }
  async setup() {
  }
  async initAssets() {
    const e = {
      texturePreference: { resolution: this.config.resolution >= 1.5 ? 1 : 0.5 }
    };
    if (this.config.manifest) {
      let t = this.config.manifest;
      Je(t) && (t = await t), e.manifest = t;
    }
    this.manifest = e.manifest, await p.init(e);
  }
  async loadDefaultScene() {
    return this.scenes.loadDefaultScene();
  }
  async _resize() {
    this.resizer.resize(), this._center.set(this.size.width * 0.5, this.size.height * 0.5), this.ticker.addOnce(() => {
      this.views.forEach((e) => {
        e.position.set(this._center.x, this._center.y);
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
    return te && (globalThis.__PIXI_APP__ = this), this.webEvents.onResize.connect(this._resize, -1), this.scenes.view.label = "SceneManager", this.stage.addChild(this.scenes.view), this.stage.addChild(this.popups.view), this.focus.view.label = "FocusManager", this.stage.addChild(this.focus.view), this._resize(), Promise.resolve();
  }
}
const ni = F.Collector, oi = F.CollectorArray, ri = F.CollectorLast, ai = F.CollectorUntil0, hi = F.CollectorWhile0, li = F.SignalConnections;
export {
  x as Action,
  st as ActionContext,
  rs as Animated,
  g as Application,
  Qt as AssetsPlugin,
  ws as AudioChannel,
  Ye as AudioInstance,
  zs as AudioManagerPlugin,
  cs as Button,
  He as ButtonConfigKeys,
  si as Camera,
  ii as CameraController,
  ni as Collector,
  oi as CollectorArray,
  ri as CollectorLast,
  ai as CollectorUntil0,
  hi as CollectorWhile0,
  $ as Container,
  ie as FlexContainer,
  Ke as FlexContainerConfigKeys,
  os as FocusManagerPlugin,
  is as FocusOutliner,
  it as Focusable,
  U as InputController,
  ts as InputPlugin,
  as as Interactive,
  ss as KeyboardPlugin,
  Zs as LocalStorageAdapter,
  _ as Logger,
  E as Plugin,
  G as Popup,
  ys as PopupManagerPlugin,
  $t as Queue,
  Us as ResizerPlugin,
  ti as Scene,
  Jt as SceneManagerPlugin,
  l as Signal,
  li as SignalConnections,
  vs as SpineAnimation,
  qt as StorageAdapter,
  Wt as Store,
  ne as UICanvas,
  Xe as UICanvasConfigKeys,
  Zt as WebEventsPlugin,
  Y as WithSignals,
  C as bindAllMethods,
  Gt as bindMethods,
  xe as capitalize,
  Vs as capitalizeWords,
  Ys as checkAndInvokeMethod,
  Ks as clamp,
  Ce as coreFunctionRegistry,
  tt as coreSignalRegistry,
  Qs as create,
  Nt as createContainer,
  Bt as createQueue,
  Hs as debounce,
  Ut as delay,
  we as ensurePadding,
  Ze as env,
  se as getDynamicModuleFromImportListItem,
  et as getLastMapEntry,
  Re as getPreviousMapEntry,
  jt as getSheetLikeString,
  Os as i18nPlugin,
  te as isDev,
  qs as isMobile,
  Gs as isProduction,
  Je as isPromise,
  Ns as isRetina,
  Xs as lerp,
  Js as mixin,
  j as omitKeys,
  Kt as pixiVersion,
  Z as pluck,
  J as resolvePadding,
  D as resolvePointLike,
  $e as resolveSizeLike,
  Xt as sayHello,
  Ws as setObjectName,
  Ht as version
};
//# sourceMappingURL=dill-pixel.mjs.map
