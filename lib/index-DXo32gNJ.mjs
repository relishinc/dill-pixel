import { Application as Et, Container as H, Sprite as K, Graphics as G, Text as Ot, BitmapText as zt, HTMLText as Nt, Texture as Tt, Point as S, Rectangle as lt, TextStyle as Ht, HTMLTextStyle as Kt, isMobile as It, Assets as T } from "pixi.js";
import { gsap as A } from "gsap";
const je = {
  Application: Et,
  Container: H,
  Sprite: K,
  Graphics: G,
  Text: Ot,
  BitmapText: zt,
  HTMLText: Nt,
  Texture: Tt,
  Point: S,
  Rectangle: lt,
  TextStyle: Ht,
  HTMLTextStyle: Kt
};
var V = {}, M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.Collector = void 0;
class Gt {
  /**
   * Create a new collector.
   *
   * @param signal The signal to emit.
   */
  constructor(t) {
    this.emit = (...e) => {
      t.emitCollecting(this, e);
    };
  }
}
M.Collector = Gt;
var Z = {};
Object.defineProperty(Z, "__esModule", { value: !0 });
Z.CollectorArray = void 0;
const Vt = M;
class Zt extends Vt.Collector {
  constructor() {
    super(...arguments), this.result = [];
  }
  handleResult(t) {
    return this.result.push(t), !0;
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
Z.CollectorArray = Zt;
var J = {};
Object.defineProperty(J, "__esModule", { value: !0 });
J.CollectorLast = void 0;
const Jt = M;
class Qt extends Jt.Collector {
  handleResult(t) {
    return this.result = t, !0;
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
J.CollectorLast = Qt;
var Q = {};
Object.defineProperty(Q, "__esModule", { value: !0 });
Q.CollectorUntil0 = void 0;
const qt = M;
class te extends qt.Collector {
  constructor() {
    super(...arguments), this.result = !1;
  }
  handleResult(t) {
    return this.result = t, this.result;
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
Q.CollectorUntil0 = te;
var q = {};
Object.defineProperty(q, "__esModule", { value: !0 });
q.CollectorWhile0 = void 0;
const ee = M;
class ie extends ee.Collector {
  constructor() {
    super(...arguments), this.result = !1;
  }
  handleResult(t) {
    return this.result = t, !this.result;
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
q.CollectorWhile0 = ie;
var tt = {}, et = {};
Object.defineProperty(et, "__esModule", { value: !0 });
et.SignalConnectionImpl = void 0;
class se {
  /**
   * @param link The actual link of the connection.
   * @param parentCleanup Callback to cleanup the parent signal when a connection is disconnected
   */
  constructor(t, e) {
    this.link = t, this.parentCleanup = e;
  }
  disconnect() {
    return this.link !== null ? (this.link.unlink(), this.link = null, this.parentCleanup(), this.parentCleanup = null, !0) : !1;
  }
  set enabled(t) {
    this.link && this.link.setEnabled(t);
  }
  get enabled() {
    return this.link !== null && this.link.isEnabled();
  }
}
et.SignalConnectionImpl = se;
var it = {};
Object.defineProperty(it, "__esModule", { value: !0 });
it.SignalLink = void 0;
class ut {
  constructor(t = null, e = null, s = 0) {
    this.enabled = !0, this.newLink = !1, this.callback = null, this.prev = t ?? this, this.next = e ?? this, this.order = s;
  }
  isEnabled() {
    return this.enabled && !this.newLink;
  }
  setEnabled(t) {
    this.enabled = t;
  }
  unlink() {
    this.callback = null, this.next.prev = this.prev, this.prev.next = this.next;
  }
  insert(t, e) {
    let s = this.prev;
    for (; s !== this && !(s.order <= e); )
      s = s.prev;
    const n = new ut(s, s.next, e);
    return n.callback = t, s.next = n, n.next.prev = n, n;
  }
}
it.SignalLink = ut;
Object.defineProperty(tt, "__esModule", { value: !0 });
tt.Signal = void 0;
const ne = et, oe = it;
let re = class {
  constructor() {
    this.head = new oe.SignalLink(), this.hasNewLinks = !1, this.emitDepth = 0, this.connectionsCount = 0;
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
  connect(t, e = 0) {
    this.connectionsCount++;
    const s = this.head.insert(t, e);
    return this.emitDepth > 0 && (this.hasNewLinks = !0, s.newLink = !0), new ne.SignalConnectionImpl(s, () => this.decrementConnectionCount());
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
  disconnect(t) {
    for (let e = this.head.next; e !== this.head; e = e.next)
      if (e.callback === t)
        return this.decrementConnectionCount(), e.unlink(), !0;
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
  emit(...t) {
    this.emitDepth++;
    for (let e = this.head.next; e !== this.head; e = e.next)
      e.isEnabled() && e.callback && e.callback.apply(null, t);
    this.emitDepth--, this.unsetNewLink();
  }
  emitCollecting(t, e) {
    this.emitDepth++;
    for (let s = this.head.next; s !== this.head; s = s.next)
      if (s.isEnabled() && s.callback) {
        const n = s.callback.apply(null, e);
        if (!t.handleResult(n))
          break;
      }
    this.emitDepth--, this.unsetNewLink();
  }
  unsetNewLink() {
    if (this.hasNewLinks && this.emitDepth === 0) {
      for (let t = this.head.next; t !== this.head; t = t.next)
        t.newLink = !1;
      this.hasNewLinks = !1;
    }
  }
};
tt.Signal = re;
var st = {};
Object.defineProperty(st, "__esModule", { value: !0 });
st.SignalConnections = void 0;
class ae {
  constructor() {
    this.list = [];
  }
  /**
   * Add a connection to the list.
   * @param connection
   */
  add(t) {
    this.list.push(t);
  }
  /**
   * Disconnect all connections in the list and empty the list.
   */
  disconnectAll() {
    for (const t of this.list)
      t.disconnect();
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
st.SignalConnections = ae;
(function(i) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.SignalConnections = i.Signal = i.CollectorWhile0 = i.CollectorUntil0 = i.CollectorLast = i.CollectorArray = i.Collector = void 0;
  var t = M;
  Object.defineProperty(i, "Collector", { enumerable: !0, get: function() {
    return t.Collector;
  } });
  var e = Z;
  Object.defineProperty(i, "CollectorArray", { enumerable: !0, get: function() {
    return e.CollectorArray;
  } });
  var s = J;
  Object.defineProperty(i, "CollectorLast", { enumerable: !0, get: function() {
    return s.CollectorLast;
  } });
  var n = Q;
  Object.defineProperty(i, "CollectorUntil0", { enumerable: !0, get: function() {
    return n.CollectorUntil0;
  } });
  var o = q;
  Object.defineProperty(i, "CollectorWhile0", { enumerable: !0, get: function() {
    return o.CollectorWhile0;
  } });
  var r = tt;
  Object.defineProperty(i, "Signal", { enumerable: !0, get: function() {
    return r.Signal;
  } });
  var a = st;
  Object.defineProperty(i, "SignalConnections", { enumerable: !0, get: function() {
    return a.SignalConnections;
  } });
})(V);
class d extends V.Signal {
  // add a connectOnce method to the Signal class, that will connect a listener to the signal, and then remove it after the first time it is called
  connectOnce(t, e) {
    const s = (...o) => {
      t(...o), n.disconnect();
    }, n = this.connect(s, e);
    return n;
  }
  connectNTimes(t, e, s) {
    let n = 0;
    const o = (...a) => {
      t(...a), n++, n >= e && r.disconnect();
    }, r = this.connect(o, s);
    return r;
  }
}
const Dt = process.env.NODE_ENV, I = Dt === "development", Xe = Dt === "production", f = class f {
  constructor(t = "") {
    this._namespace = t, f._instance = this;
  }
  static initialize(t = "") {
    if (f._instance)
      throw new Error("Logger has already been instantiated.");
    f._instance = new f(t);
  }
  static log(...t) {
    !f._instance || !f._instance._namespace ? console.log(...t) : (console.log(`%c[${f._instance._namespace}]`, "background: lightblue; color: black;", ...t), I && f.trace());
  }
  static error(...t) {
    !f._instance || !f._instance._namespace ? console.error(...t) : (console.error(`%c[${f._instance._namespace}]`, "background: red; color: black;", ...t), I && f.trace());
  }
  static warn(...t) {
    !f._instance || !f._instance._namespace ? console.warn(...t) : (console.warn(`%c[${f._instance._namespace}]`, "background: orange; color: black;", ...t), I && f.trace());
  }
  static trace() {
    console.groupCollapsed("%cLogger trace", "background: #ccc; color: black;"), console.trace(), console.groupEnd();
  }
};
f._instance = null;
let p = f;
class he {
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
      return p.error(`Storage Adapter with id "${t.id}" already registered. Not registering.`), Promise.resolve();
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
  async save(t, e, s, n = !0) {
    var a;
    let o = [];
    const r = [];
    Array.isArray(t) || (typeof t == "object" ? o = [t] : o = [t]), (o[0] === "*" || ((a = o[0]) == null ? void 0 : a.adapterId) === "*") && (o = Array.from(this._adapters.keys()));
    for (let h = 0; h < o.length; h++) {
      let l, u = !1;
      if (typeof o[h] == "object") {
        const P = o[h];
        l = P.adapterId, u = P.awaitSave ?? !1;
      } else
        l = o[h], u = n;
      const g = this._adapters.get(l);
      if (!g)
        throw new Error(`Adapter ${o[h]} not found`);
      u ? r.push(await g.save(e, s)) : r.push(void g.save(e, s));
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
    const s = this._adapters.get(t);
    if (!s)
      throw new Error(`Adapter ${t} not found`);
    return await s.load(e);
  }
  initialize(t) {
    return this._app = t, this;
  }
}
const le = (i = 0) => new Promise((t) => setTimeout(t, i * 1e3)), Lt = (i) => i && typeof i.then == "function";
function ce(i) {
  return typeof i == "function" && /^class\s/.test(Function.prototype.toString.call(i));
}
async function yt(i) {
  let t, e;
  return Lt(i.module) ? (t = await i.module, e = i != null && i.namedExport ? t[i.namedExport] : t.default) : typeof i.module == "function" ? ce(i.module) ? (t = i.module, e = t) : (t = await i.module(), e = i != null && i.namedExport ? t[i.namedExport] : t.default) : (t = i.module, e = t), e;
}
function Be(i, ...t) {
  t.forEach((e) => {
    const s = i[e];
    typeof s == "function" && (i[e] = s.bind(i));
  });
}
function ue(i, t = [], e = []) {
  let s = Object.getPrototypeOf(i);
  const n = [];
  for (; s; ) {
    const o = Object.getOwnPropertyNames(s).filter((r) => {
      const a = Object.getOwnPropertyDescriptor(s, r);
      return typeof (a == null ? void 0 : a.value) == "function" && r !== "constructor" && !t.some((h) => r.startsWith(h)) && !e.includes(r);
    });
    if (n.push(...o), s === Object.prototype || Object.prototype.hasOwnProperty.call(s.constructor, "__dill_pixel_method_binding_root"))
      break;
    s = Object.getPrototypeOf(s);
  }
  return n;
}
function E(i, t = [], e = []) {
  ue(i, t, e).forEach((s) => {
    i[s] = i[s].bind(i);
  });
}
function We(i, t, ...e) {
  typeof i[t] == "function" && i[t](...e);
}
const ct = {}, Ut = {}, xt = [
  {
    id: "assets",
    module: () => import("./AssetsPlugin-CEkrjVn7.mjs"),
    namedExport: "AssetsPlugin"
  },
  {
    id: "webEvents",
    module: () => import("./WebEventsPlugin-GXKdDUwb.mjs"),
    namedExport: "WebEventsPlugin"
  },
  {
    id: "scenes",
    module: () => import("./SceneManagerPlugin-BqOAdlRG.mjs"),
    namedExport: "SceneManagerPlugin"
  },
  {
    id: "input",
    module: () => import("./InputPlugin-D7kR-jHH.mjs"),
    namedExport: "InputPlugin"
  },
  {
    id: "keyboard",
    module: () => import("./KeyboardPlugin-BKMyCSRu.mjs"),
    namedExport: "KeyboardPlugin"
  },
  {
    id: "focus",
    module: () => import("./FocusManagerPlugin-DbJs8cFu.mjs"),
    namedExport: "FocusManagerPlugin"
  },
  {
    id: "popups",
    module: () => import("./PopupManagerPlugin-BmzWwJ_6.mjs"),
    namedExport: "PopupManagerPlugin"
  },
  {
    id: "audio",
    module: () => import("./AudioManagerPlugin-KgXO2cTG.mjs"),
    namedExport: "AudioManagerPlugin"
  },
  {
    id: "i18n",
    module: () => import("./i18nPlugin-BPgURbw5.mjs"),
    namedExport: "i18nPlugin"
  },
  {
    id: "resizer",
    module: () => import("./ResizerPlugin-Blw7126d.mjs"),
    namedExport: "ResizerPlugin"
  }
], de = {
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
}, k = class k extends Et {
  constructor() {
    super(), this.__dill_pixel_method_binding_root = !0, this.onPause = new d(), this.onResume = new d(), this.onResize = new d(), this._plugins = /* @__PURE__ */ new Map(), this._center = new S(0, 0), E(this);
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
  set actionContext(t) {
    this.input.context = t;
  }
  get voiceover() {
    return this._voiceoverPlugin || (this._voiceoverPlugin = this.getPlugin("voiceover")), this._voiceoverPlugin;
  }
  get captions() {
    return this._captionsPlugin || (this._captionsPlugin = this.getPlugin("captions")), this._captionsPlugin;
  }
  get isMobile() {
    return It.any;
  }
  get isTouch() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }
  get signal() {
    return Ut;
  }
  get func() {
    return ct;
  }
  get exec() {
    return ct;
  }
  get views() {
    return [this.scenes.view, this.popups.view, this.captions.view];
  }
  static getInstance() {
    return k.instance;
  }
  static createContainer(t) {
    const e = document.createElement("div");
    return k.containerElement = e, e.setAttribute("id", t), document.body.appendChild(e), e;
  }
  /**
   * Destroy the application
   * This will destroy all plugins and the store
   * @param {RendererDestroyOptions} rendererDestroyOptions
   * @param {DestroyOptions} options
   */
  destroy(t, e) {
    this._plugins.forEach((s) => {
      s.destroy();
    }), this.store.destroy(), super.destroy(t, e);
  }
  async initialize(t) {
    if (k.instance)
      throw new Error("Application is already initialized");
    if (k.instance = this, this.config = Object.assign({ ...de }, t), await this.boot(this.config), await this.preInitialize(this.config), await this.initAssets(), await this.init(this.config), p.initialize(t.id), await this.registerDefaultPlugins(), this.config.plugins && this.config.plugins.length > 0)
      for (let e = 0; e < this.config.plugins.length; e++) {
        const s = this.config.plugins[e];
        s && (s == null ? void 0 : s.autoLoad) !== !1 && await this.loadPlugin(s);
      }
    if (await this.registerPlugins(), this.config.useStore) {
      if (this._store = new he(), this._store.initialize(this), this.config.storageAdapters && this.config.storageAdapters.length > 0)
        for (let e = 0; e < this.config.storageAdapters.length; e++) {
          const s = this.config.storageAdapters[e];
          if (this.store.hasAdapter(s.id)) {
            p.error(`Storage Adapter with id "${s.id}" already registered. Not registering.`);
            continue;
          }
          const n = await yt(s);
          await this.registerStorageAdapter(new n(s.id), s.options);
        }
      await this.registerStorageAdapters();
    }
    return await this._setup(), await this.setup(), await this.loadDefaultScene(), this.renderer.canvas.focus(), k.containerElement.classList.add("loaded"), k.instance;
  }
  getPlugin(t) {
    const e = this._plugins.get(t);
    return e || p.error(`Plugin with name "${t}" not found.`), e;
  }
  async postInitialize() {
    globalThis.__PIXI_APP__ = this, this._plugins.forEach((t) => {
      t.postInitialize(this);
    }), this.webEvents.onVisibilityChanged.connect((t) => {
      t ? this.audio.restore() : this.audio.suspend();
    }), this._resize();
  }
  actions(t) {
    return this.input.actions(t);
  }
  getUnloadedPlugin(t) {
    var e;
    return (e = this.config.plugins) == null ? void 0 : e.find((s) => s.id === t);
  }
  async loadPlugin(t) {
    if (this._plugins.has(t.id))
      return await this.registerPlugin(this._plugins.get(t.id), t.options);
    const e = await yt(t), s = new e(t.id);
    return s.id !== t.id && (s.id = t.id), await this.registerPlugin(s, t.options);
  }
  sendAction(t, e) {
    this.input.sendAction(t, e);
  }
  /**
   * Get a storage adapter by id
   * @param {string} adapterId
   * @returns {IStorageAdapter}
   */
  getStorageAdapter(t) {
    return this.store.getAdapter(t);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async boot(t) {
    p.log(`${this.appName}:: v${this.appVersion}`);
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
      module: () => import("./SpinePlugin-Db52qc34.mjs"),
      namedExport: "SpinePlugin"
    });
  }
  // plugins
  async registerPlugin(t, e) {
    return this._plugins.has(t.id) ? (p.error(`Plugin with id "${t.id}" already registered. Not registering.`), t.initialize(this, e)) : (p.log(`Registering plugin: ${t.id}`), t.registerCoreFunctions(), t.registerCoreSignals(), this._plugins.set(t.id, t), t.initialize(this, e));
  }
  async registerDefaultPlugins() {
    for (let e = 0; e < xt.length; e++) {
      const s = xt[e];
      await this.loadPlugin(s);
    }
    (this.config.showStats === !0 || I && this.config.showStats !== !1) && await this.loadPlugin({
      id: "stats",
      module: () => import("./StatsPlugin-BwKF_tzr.mjs"),
      namedExport: "StatsPlugin"
    }), this.config.useVoiceover && (await this.loadPlugin({
      id: "voiceover",
      module: () => import("./VoiceOverPlugin-h2gI_JLY.mjs"),
      namedExport: "VoiceOverPlugin",
      options: this.config.voiceover || void 0
    }), await this.loadPlugin({
      id: "captions",
      module: () => import("./CaptionsPlugin-mOqzESqW.mjs"),
      namedExport: "CaptionsPlugin",
      options: this.config.captions || void 0
    }));
  }
  async registerPlugins() {
    return I && p.log(
      'No custom plugins registered using "registerPlugins". Register them by overriding the "registerPlugins" method in your Application class.'
    ), Promise.resolve();
  }
  // storage
  async registerStorageAdapters() {
    return I && p.log(
      'No storage adapters registered using "registerStorageAdapters". Register them by overriding the "registerStorageAdapters" method in your Application class.'
    ), Promise.resolve();
  }
  async registerStorageAdapter(t, e) {
    return this.store.registerAdapter(t, e);
  }
  async setup() {
  }
  async initAssets() {
    const t = {
      texturePreference: { resolution: this.config.resolution >= 1.5 ? 1 : 0.5 }
    };
    if (this.config.manifest) {
      let e = this.config.manifest;
      Lt(e) && (e = await e), t.manifest = e;
    }
    this.manifest = t.manifest, await T.init(t);
  }
  async loadDefaultScene() {
    return this.scenes.loadDefaultScene();
  }
  async _resize() {
    this.resizer.resize(), this._center.set(this.size.width * 0.5, this.size.height * 0.5), this.ticker.addOnce(() => {
      this.views.forEach((t) => {
        t.position.set(this._center.x, this._center.y);
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
    return I && (globalThis.__PIXI_APP__ = this), this.webEvents.onResize.connect(this._resize, -1), this.scenes.view.label = "SceneManager", this.stage.addChild(this.scenes.view), this.stage.addChild(this.popups.view), this.focus.view.label = "FocusManager", this.stage.addChild(this.focus.view), this._resize(), Promise.resolve();
  }
};
k.containerId = "dill-pixel-game-container";
let w = k;
class ge {
  constructor(t = "Plugin") {
    this.id = t, this._signalConnections = new V.SignalConnections(), E(this), this.__dill_pixel_method_binding_root = !0;
  }
  get app() {
    return w.getInstance();
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
      const s = e;
      ct[s] = this[e];
    });
  }
  /**
   * @override
   * @protected
   */
  registerCoreSignals() {
    this.getCoreSignals().forEach((e) => {
      const s = e;
      Ut[s] = this[e];
    });
  }
  getCoreFunctions() {
    return [];
  }
  getCoreSignals() {
    return [];
  }
}
function O(i, t = !1, e = 0, s = 0) {
  if (i instanceof S)
    e = i.x, s = i.y;
  else if (Array.isArray(i))
    e = i[0], s = i[1] === void 0 ? i[0] : i[1];
  else if (typeof i == "object") {
    const n = i;
    e = n.x || 0, s = n.y || 0;
  } else
    e = i ?? e, s = i ?? s;
  return t ? new S(e, s) : { x: e, y: s };
}
function Ct(i) {
  if (i === void 0)
    return { width: 0, height: 0 };
  if (Array.isArray(i))
    return { width: i[0], height: i[1] === void 0 ? i[0] : i[1] };
  if (i instanceof S)
    return { width: i.x, height: i.y };
  if (typeof i == "object") {
    const t = i;
    return { width: t.width || 0, height: t.height || 0 };
  } else
    return { width: i ?? 0, height: i ?? 0 };
}
function fe(i) {
  return Array.isArray(i) ? i.join("/") : i;
}
function Re(i, t, e) {
  e && t ? i.name = `${fe(e)}/${t}` : typeof t == "string" && (i.name = `${t}`), typeof t == "string" && (i.__textureString = t), Array.isArray(e) ? i.__textureSheetArray = e : e && (i.__textureSheet = e);
}
function $e(i, t) {
  let e;
  return function(...s) {
    e !== void 0 && clearTimeout(e), e = setTimeout(() => {
      i(...s);
    }, t);
  };
}
class Ye extends H {
  constructor(t) {
    super(), E(this), this._config = {
      color: 65535,
      shape: "rounded rectangle",
      radius: 8,
      lineWidth: 2,
      ...t
    }, this._graphics = new G(), this.addChild(this._graphics);
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
    t && (this.focusTarget = t, this.focusBounds = this.focusTarget.getFocusArea().clone(), w.getInstance().ticker.add(this.updatePosition));
  }
  clearFocusTarget() {
    this.focusTarget = null, w.getInstance().ticker.remove(this.updatePosition);
  }
  updatePosition() {
    if (!this.focusTarget)
      return;
    const t = this.focusTarget.getGlobalPosition(), e = this.focusTarget.getFocusPosition();
    if (e) {
      const s = O(e);
      t.x += s.x, t.y += s.y;
    }
    this.position.set(t.x, t.y);
  }
}
var pe = /* @__PURE__ */ ((i) => (i.General = "general", i.Menu = "menu", i.Game = "game", i))(pe || {}), _e = /* @__PURE__ */ ((i) => (i.Up = "up", i.Down = "down", i.Left = "left", i.Right = "right", i.Action = "action", i.Next = "next", i.Back = "back", i.Pause = "pause", i.Unpause = "unpause", i.Start = "start", i.Menu = "menu", i))(_e || {});
class me extends ge {
  /**
   * Creates a new StorageAdapter.
   * @param {string} id The ID of the adapter. Default is 'StorageAdapter'.
   */
  constructor(t = "StorageAdapter") {
    super(t), this.id = t;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async load(t) {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async save(t, e, ...s) {
  }
}
class Ne extends me {
  constructor() {
    super(...arguments), this.namespace = "";
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
  initialize(t, e) {
    p.log("LocalStorageAdapter initialized"), this.namespace = (e == null ? void 0 : e.namespace) || "";
  }
  /**
   * Saves data under a specified key in the local storage.
   * @param {string} key The key under which to save the data.
   * @param {any} data The data to save.
   * @returns {any} The saved data.
   */
  save(t, e) {
    return localStorage.setItem(`${this.prefix}${t}`, JSON.stringify(e)), JSON.stringify(e);
  }
  /**
   * Loads data from a specified key in the local storage.
   * @template T The type of the data to load.
   * @param {string} key The key from which to load the data.
   * @returns {T} The loaded data.
   */
  load(t) {
    const e = localStorage.getItem(`${this.prefix}${t}`);
    return e ? JSON.parse(e) : null;
  }
  /**
   * Deletes data from a specified key in the local storage.
   * @param {string} key The key from which to delete the data.
   */
  clear(t) {
    localStorage.deleteItem(`${this.prefix}${t}`);
  }
}
function He(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function Ke(i, t, e) {
  return i + (t - i) * e;
}
function Ge(i, t) {
  let e;
  for (const s of i) {
    if (s[0] === t)
      return e;
    e = s;
  }
}
function Ve(i) {
  return Array.from(i.entries()).pop();
}
const Ze = window.devicePixelRatio > 1 || window.matchMedia && window.matchMedia(
  "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)"
).matches, Je = It.any;
function Qe(...i) {
  return new we(i);
}
class we {
  /**
   * Creates a new Queue.
   * @param {(Promise<any> | (() => Promise<T>))[]} promises The promises to add to the queue.
   */
  constructor(t = []) {
    this._currentIndex = 0, this._isPaused = !1, this._isCanceled = !1, this._promises = t;
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
    const t = this._promises[this._currentIndex];
    try {
      const e = typeof t == "function" ? await t() : await t;
      this._results.push(e), this._currentIndex++, this._next();
    } catch (e) {
      p.error("Queue didn't complete due to an error:", e, "Cancelling Queue"), this._isCanceled = !0;
    }
  }
}
function $(i, t) {
  return t.reduce((e, s) => s in i ? { ...e, [s]: i[s] } : e, {});
}
function j(i, t) {
  return Object.entries(t).filter(([e]) => !i.includes(e)).reduce((e, [s, n]) => ({ ...e, [s]: n }), {});
}
function jt(i) {
  return class extends i {
    constructor(...t) {
      super(...t), this.isFocused = !1, this.isKeyDown = !1, this.focusEnabled = !0, this.tabIndex = 0, this.accessible = !1, this.accessibleType = "button", this.accessibleTitle = "Focusable", this.accessibleHint = "Press enter to focus", this.accessiblePointerEvents = "auto", this.accessibleChildren = !0, this.onFocus = new d(), this.onFocusIn = new d(), this.onFocusOut = new d(), this.onBlur = new d(), this._eventsDisabled = !1, this.eventMode = "static", this.on("mouseover", this._onMouseOver), this.on("mousedown", this._onMouseDown), this.on("click", this._handleClick), this.on("tap", this._handleClick);
    }
    get app() {
      return w.getInstance();
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
      this._eventsDisabled || e.type || (this._eventsDisabled = !0, this.emit(t, { type: t }), this._eventsDisabled = !1);
    }
  };
}
jt.INITTED = !1;
function ve(i) {
  return class extends i {
    constructor(...t) {
      super(...t), this._signals = /* @__PURE__ */ new Map(), this._emitSignal = this._emitSignal.bind(this), this.eventMode = "static";
    }
    onInteraction(t) {
      if (!this._signals.has(t)) {
        const e = new d();
        this._signals.set(t, e), this.on(t, this._emitSignal);
      }
      return this._signals.get(t);
    }
    destroy(t) {
      for (const e of this._signals.keys())
        this.off(e, this._emitSignal);
      this._signals.clear(), super.destroy(t);
    }
    _emitSignal(t) {
      const e = t.type, s = this._signals.get(e);
      s && s.emit(t);
    }
  };
}
function X(i) {
  return class extends i {
    constructor() {
      super(...arguments), this.signalConnections = new V.SignalConnections();
    }
    /**
     * Add signal connections to the container.
     * @param args - The signal connections to add.
     */
    addSignalConnection(...t) {
      for (const e of t)
        this.signalConnections.add(e);
    }
    destroy(t) {
      this.signalConnections.disconnectAll(), super.destroy(t);
    }
  };
}
const bt = ["textures", "cursor", "disabledCursor", "sheet", "enabled"], ye = jt(ve(X(B())));
class xe extends ye {
  /**
   * @constructor
   * @param {Partial<ButtonConfig>} config - The configuration for the button.
   */
  constructor(t) {
    super(), this.onDown = new d(), this.onUp = new d(), this.onUpOutside = new d(), this.onOut = new d(), this.onOver = new d(), this.onClick = new d(), this.onEnabled = new d(), this.onDisabled = new d(), this.onKeyboardEvent = new d(), this._isDownCallbacks = /* @__PURE__ */ new Map(), this._isDownListenerAdded = !1, E(this), this.config = Object.assign(
      {
        textures: { default: "" },
        sheet: void 0,
        enabled: !0,
        cursor: "default",
        disabledCursor: "not-allowed"
      },
      t
    ), this.view = this.add.sprite({ asset: this.config.textures.default, sheet: this.config.sheet, anchor: 0.5 }), this.cursor = this.config.cursor, this.enabled = t.enabled !== !1, this.addSignalConnection(
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
    return w.getInstance();
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
  addIsDownCallback(t, e) {
    this._isDownCallbacks.set(t, e), this._checkIsDownCallbacks();
  }
  removeIsDownCallback(t) {
    this._isDownCallbacks.delete(t);
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
    this.isDown && this._isDownCallbacks.forEach((t) => {
      t();
    });
  }
}
function Ce(i) {
  return class extends i {
    constructor() {
      super(...arguments), this.onAnimationStart = new d(), this.onAnimationUpdate = new d(), this.onAnimationComplete = new d(), this._activeTweens = [];
    }
    /**
     * Animate method.
     * @param animationProps - Animation properties.
     * @param instance - Instance to animate.
     * @returns GSAP Tween instance.
     */
    animate(t, e = this) {
      const s = A.to(e, {
        ...t,
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
    animateFrom(t, e = this) {
      const s = A.from(e, {
        ...t,
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
    animateSequence(t, e = this) {
      return this._activeTimeline || (this._activeTimeline = A.timeline({
        onStart: () => this._onAnimationStart(this._activeTimeline),
        onUpdate: () => this._onAnimationUpdate(this._activeTimeline),
        onComplete: () => {
          this._onAnimationComplete(this._activeTimeline), this._activeTimeline = void 0;
        }
      })), t.forEach((s) => {
        var n;
        (n = this._activeTimeline) == null || n.to(e, s);
      }), this._activeTimeline;
    }
    /**
     * Clear animations method.
     */
    clearAnimations() {
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
    animateFromTo(t, e, s = this) {
      const n = A.fromTo(
        s,
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
      return ((t = this._activeTweens) == null ? void 0 : t.some((e) => !e.paused())) || this._activeTimeline && !this._activeTimeline.paused() || !1;
    }
    // utility animations
    /**
     * Shake animation.
     * @param config - Configuration object.
     * @param instance
     * @returns GSAP Tween instance.
     */
    shake(t = {}, e = this) {
      const { duration: s = 0.05, intensity: n = 12, times: o = 41 } = t, a = { x: e.x, y: e.y }.x, h = o % 2 === 0 ? o + 1 : o, l = A.to(e, {
        x: a + A.utils.random(-Math.max(n, 2), Math.max(n, 2)),
        repeat: h,
        yoyo: !0,
        duration: s
      });
      return this._activeTweens.push(l), l;
    }
    /**
     * Pulse animation.
     * @param config - Configuration object.
     * @param instance
     * @returns GSAP Tween instance.
     */
    pulse(t = {}, e = this) {
      const { duration: s = 0.5, intensity: n = 1.2, times: o = 1 } = t, r = o * 2 - 1, a = A.to(e == null ? void 0 : e.scale, {
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
    bob(t = {}, e = this) {
      const { duration: s = 0.5, intensity: n = 10 } = t, o = A.to(e, {
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
const be = Ce(X(B()));
class N extends be {
  /**
   * The constructor for the Container class.
   * @param __config - The configuration for the container.
   */
  constructor(t = { autoResize: !0, autoUpdate: !1, priority: 0 }) {
    super(), this.__config = t, this.__dill_pixel_method_binding_root = !0, E(this), this.on("added", this._added), this.on("removed", this._removed);
  }
  /**
   * Get the application instance.
   */
  get app() {
    return w.getInstance();
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
    this.__config.autoUpdate && this.app.ticker.remove(this.update, this), super.destroy(t);
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
const Pe = X(B()), Pt = [
  "width",
  "height",
  "bindTo",
  "bindToAppSize",
  "gap",
  "flexWrap",
  "flexDirection",
  "alignItems",
  "justifyContent"
], ke = {
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
class D extends Pe {
  constructor(t = {}) {
    super(), this.onLayoutComplete = new d(), this.debug = !1, this.paddingLeft = 0, this.paddingRight = 0, this.paddingTop = 0, this.paddingBottom = 0, this._childMap = /* @__PURE__ */ new Map(), this._reparentAddedChild = !0, this._flexChildren = [], this.removeChildren = () => {
      const e = this.flexChildren;
      return this.removeChild(...e), e;
    }, this.removeChildAt = (e) => this.removeChild(this.flexChildren[e]), this.addChildAt = (e, s) => {
      const n = this.add.existing(e);
      return this.setChildIndex(n, s), n;
    }, this.setChildIndex = (e, s) => {
      const n = this._childMap.get(e);
      n && (super.setChildIndex(n, s), this.setFlexChildren(), this.layout());
    }, this.getChildIndex = (e) => this._childMap.has(e) ? super.getChildIndex(e.parent) : super.getChildIndex(e), this.getChildAt = (e) => {
      var s;
      return (s = super.getChildAt(e)) == null ? void 0 : s.getChildAt(0);
    }, E(this), this.config = Object.assign({ ...ke }, t), this.on("added", this._added), this.on("childAdded", this.handleChildAdded), this.on("childRemoved", this.handleChildRemoved), this.layout();
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
    const { x: e, y: s } = O(t);
    this.config.width = e, this.config.height = s, this.layout();
  }
  /**
   * Get the application instance.
   */
  get app() {
    return w.getInstance();
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
        const s = this._childMap.get(e);
        if (s)
          return super.removeChild(s);
      });
    else
      return super.removeChild(...t);
    return t[0];
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
   * @param {PIXIContainer} child
   * @returns {boolean}
   * @protected
   */
  deleteChild(t) {
    if (this._childMap.has(t)) {
      if (t instanceof D)
        try {
          t.onLayoutComplete.disconnect(this.layout);
        } catch (s) {
          p.warn("FlexContainer:: Error disconnecting signal from removed child"), console.warn(s);
        }
      return this._childMap.delete(t), this.setFlexChildren(), this.layout(), !0;
    }
    return !1;
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
    if (!this._reparentAddedChild)
      return;
    this._reparentAddedChild = !1;
    const e = this.add.container();
    e.add.existing(t);
    const s = e.getLocalBounds();
    s.x < 0 && (e.pivot.x = s.x), s.y < 0 && (e.pivot.y = s.y), t instanceof D && this.addSignalConnection(t.onLayoutComplete.connect(this.layout)), this._childMap.set(t, e), this.setFlexChildren(), this._reparentAddedChild = !0, this.app.render(), this.layout();
  }
  /**
   * Lay out the children according to the settings
   * Tries to follow the CSS Flexbox model as closely as possible
   * @private
   */
  _layout() {
    var mt, wt;
    this.config.bindTo && (this.config.width = ((mt = this.config.bindTo) == null ? void 0 : mt.width) ?? 0, this.config.height = ((wt = this.config.bindTo) == null ? void 0 : wt.height) ?? 0), this.config.bindToAppSize && (this.config.width = this.app.size.width, this.config.height = this.app.size.height);
    const t = ["flex-start"];
    let { width: e, height: s } = this.config;
    const { gap: n, flexDirection: o, flexWrap: r, alignItems: a, justifyContent: h } = this.config;
    this.config.flexDirection === "row" && this.config.flexWrap === "nowrap" && t.includes(this.config.justifyContent) ? e = 1 / 0 : this.config.flexDirection === "column" && this.config.flexWrap === "nowrap" && t.includes(this.config.justifyContent) && (s = 1 / 0);
    let l = [], u = 0, g = 0, P = 0, W = 0, gt = 0, ft = 0;
    const U = [], nt = this.children.filter(Boolean);
    let R = [], ot = 0;
    const Xt = (c, v, _) => o === "row" && v + c.width + n > e || o === "column" && _ + c.height + n > s, Bt = () => {
      o === "row" ? gt += P + n : ft += W + n, u = 0, g = 0, P = 0, W = 0;
    }, Wt = (c) => {
      o === "row" ? (u += c.width + n, P = Math.max(P, c.height)) : (g += c.height + n, W = Math.max(W, c.width));
    }, Rt = (c) => o === "row" ? c : ft, $t = (c) => o === "column" ? c : gt, pt = (c, v, _, L) => {
      const m = (L === "row" ? e : s) - (_ - v);
      c.forEach(({ index: vt }, rt) => {
        let z = 0;
        switch (h) {
          case "flex-start":
            break;
          case "flex-end":
            z = m;
            break;
          case "center":
            z = m / 2;
            break;
          case "space-between":
            z = c.length > 1 ? rt * (m / (c.length - 1)) : 0;
            break;
          case "space-around":
            z = m / c.length * rt + m / (2 * c.length);
            break;
          case "space-evenly":
            z = m / (c.length + 1) * (rt + 1);
            break;
        }
        L === "row" ? U[vt].x += z : U[vt].y += z;
      });
    }, Yt = (c, v) => {
      c.forEach((_, L) => {
        const m = v[L];
        if (m)
          if (o === "row")
            switch (a) {
              case "flex-start":
                break;
              case "flex-end":
                _.y += P - m.height;
                break;
              case "center":
                _.y += (P - m.height) / 2;
                break;
            }
          else
            switch (a) {
              case "flex-start":
                break;
              case "flex-end":
                _.x = e ? e - m.width : -m.width;
                break;
              case "center":
                _.x += (e - m.width) / 2;
                break;
            }
      });
    };
    nt.forEach((c, v) => {
      if (!c)
        return;
      const _ = c;
      r === "wrap" && Xt(_, u, g) && (pt(R, ot, o === "column" ? g - n : u - n, o), Bt(), R = [], ot = u), R.push({ index: v, width: _.width, height: _.height }), U[v] = { x: Rt(u), y: $t(g) }, Wt(_);
    }), pt(R, ot, o === "column" ? g - n : u - n, o), Yt(U, nt), l = U, nt.forEach((c, v) => {
      const _ = c, { x: L, y: m } = l[v] || { x: 0, y: 0 };
      _.position.set(L, m);
    });
    const _t = this.children.reduce(
      (c, v) => Math.max(c, v.y + v.height),
      0
    );
    this.children.forEach((c) => {
      if (this.config.flexDirection === "row")
        switch (this.config.alignItems) {
          case "center":
            c.y -= (_t - s) * 0.5;
            break;
          case "flex-end":
            c.y += s - _t;
            break;
        }
    }), this.onLayoutComplete.emit();
  }
  _added() {
    this.addSignalConnection(this.app.onResize.connect(this.layout, 0)), this.added();
  }
}
const Ae = X(B());
class Se extends Ae {
  constructor(t) {
    super();
    let e = t == null ? void 0 : t.data;
    typeof e == "string" && e.slice(-5) !== ".json" && (e = { skeleton: e + ".json", atlas: e + ".atlas" }), this.spine = window.Spine.from(e), this.add.existing(this.spine), t && (t.autoUpdate !== void 0 && (this.spine.autoUpdate = t.autoUpdate), t.animationName && this.setAnimation(t.animationName, t.loop, t.trackIndex ?? 0));
  }
  get animationNames() {
    return this.spine.state.data.skeletonData.animations.map((t) => t.name);
  }
  getCurrentAnimation(t = 0) {
    var e, s;
    return ((s = (e = this.spine.state.getCurrent(t)) == null ? void 0 : e.animation) == null ? void 0 : s.name) || "";
  }
  setAnimation(t, e = !1, s = 0) {
    this.spine.state.setAnimation(s, t, e);
  }
}
function Y(i, t) {
  return i >= 0 && i <= 1 ? i * t : i;
}
function at(i) {
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
    const t = i;
    return t.x !== void 0 && t.y !== void 0 ? {
      top: t.y,
      right: t.x,
      bottom: t.y,
      left: t.x
    } : {
      top: i.top ?? 0,
      right: i.right ?? 0,
      bottom: i.bottom ?? 0,
      left: i.left ?? 0
    };
  } else
    return { top: 0, right: 0, bottom: 0, left: 0 };
}
const kt = ["debug", "padding", "size", "useAppSize"], Me = X(B());
class Ee extends Me {
  constructor(t) {
    super(), this.removeChildren = (e, s) => this._inner.removeChildren(e, s), this.removeChildAt = (e) => this._inner.removeChildAt(e), this.addChildAt = (e, s) => {
      const n = this._inner.add.existing(e);
      return this._inner.setChildIndex(n, s), n;
    }, this.setChildIndex = (e, s) => {
      this._inner.setChildIndex(e, s), this.layout();
    }, this.getChildIndex = (e) => this._inner.getChildIndex(e), this.getChildAt = (e) => {
      var s;
      return (s = this._inner.getChildAt(e)) == null ? void 0 : s.getChildAt(0);
    }, this.settingsMap = /* @__PURE__ */ new Map(), this._childMap = /* @__PURE__ */ new Map(), this._canvasChildren = [], this._reparentAddedChild = !0, this._disableAddChildError = !1, E(this), this.config = {
      debug: t.debug === !0,
      padding: at((t == null ? void 0 : t.padding) ?? 0),
      size: t.size !== void 0 ? Ct(t.size) : { width: 0, height: 0 },
      useAppSize: t.useAppSize === !0
    }, this._disableAddChildError = !0, this._inner = this.add.container({ x: this.config.padding.left, y: this.config.padding.top }), this._disableAddChildError = !1, this.addSignalConnection(this.app.onResize.connect(this.resize)), this.on("childRemoved", this._childRemoved), this.once("added", this._added);
  }
  /**
   * Get the application instance.
   */
  get app() {
    return w.getInstance();
  }
  get canvasChildren() {
    return this._canvasChildren;
  }
  get bounds() {
    return this._bounds || (this._bounds = this.getBounds()), this._bounds;
  }
  set size(t) {
    this.config.useAppSize = !1, this.config.size = t === void 0 ? { width: 0, height: 0 } : Ct(t), this.resize();
  }
  set padding(t) {
    this.config.padding = at(t), this._inner.position.set(this.config.padding.left, this.config.padding.top), this.resize();
  }
  addChild(...t) {
    return this._disableAddChildError ? super.addChild(...t) : (p.warn(
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
        const s = this._childMap.get(e);
        if (s)
          return this._inner.removeChild(s);
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
      const e = t, s = this.settingsMap.get(e);
      s && this.applySettings(e, s);
    });
  }
  addElement(t, e) {
    const s = this._inner.add.container();
    s.addChild(t);
    const n = s.getLocalBounds();
    return n.x < 0 && (s.pivot.x = n.x), n.y < 0 && (s.pivot.y = n.y), t instanceof D && this.addSignalConnection(t.onLayoutComplete.connect(this.layout)), this.settingsMap.set(s, {
      align: (e == null ? void 0 : e.align) ?? "top left",
      padding: e != null && e.padding ? at(e.padding) : { top: 0, left: 0, bottom: 0, right: 0 }
    }), this._childMap.set(t, s), this._canvasChildren = Array.from(this._childMap.keys()), this.resize(), t;
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
    return new lt(
      0,
      0,
      t.width - this.config.padding.left - this.config.padding.right,
      t.height - this.config.padding.top - this.config.padding.bottom
    );
  }
  __calculateOuterBounds(t) {
    return new lt(0, 0, t.width, t.height);
  }
  _childRemoved(t) {
    this.settingsMap.delete(t), this._childMap.delete(t), this._canvasChildren = Array.from(this._childMap.keys());
  }
  _added() {
    this.layout();
  }
  applySettings(t, e) {
    if (!e)
      return;
    const s = this._displayBounds.width, n = this._displayBounds.height, o = t.getChildAt(0), r = o instanceof D && o.containerWidth || t.width, a = o instanceof D && o.containerHeight || t.height;
    switch (e.align) {
      case "top right":
        t.x = s - r, t.y = 0;
        break;
      case "top left":
        t.x = 0, t.y = 0;
        break;
      case "top center":
      case "top":
        t.x = (s - r) / 2, t.y = 0;
        break;
      case "bottom right":
        t.x = s - r, t.y = n - a;
        break;
      case "bottom left":
        t.x = 0, t.y = n - a;
        break;
      case "bottom center":
      case "bottom":
        t.x = (s - t.width) / 2, t.y = n - a;
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
        t.x = s - r, t.y = 0;
        break;
      case "right bottom":
        t.x = s, t.y = n;
        break;
      case "right center":
      case "right":
        t.x = s - r, t.y = (n - a) / 2;
        break;
      case "center":
        t.x = (s - r) / 2, t.y = (n - a) / 2;
        break;
    }
    t.x += Y(e.padding.left, s) - Y(e.padding.right, s), t.y += Y(e.padding.top, n) - Y(e.padding.bottom, n);
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
const Oe = ["text", "anchor", "resolution", "roundPixels", "style"];
function y(i, t) {
  for (const e in i)
    try {
      t[e] = i[e];
    } catch (s) {
      p.error(`Error setting property ${e}`, s);
    }
}
function At(i) {
  let t;
  const e = i == null ? void 0 : i.asset, s = e, n = i == null ? void 0 : i.sheet;
  if (e instanceof Tt)
    t = e;
  else if (!n || (n == null ? void 0 : n.length) === 0)
    if (T.cache.has(s))
      t = T.get(s);
    else if (T.get(s))
      t = T.get(s).texture;
    else
      throw new Error('Asset "' + e + '" not loaded into Pixi cache');
  else if (T.get(n)) {
    const o = T.get(n), r = o.textures;
    if (r !== void 0)
      if (r.hasOwnProperty(s))
        t = r[s];
      else if (o.linkedSheets !== void 0 && o.linkedSheets.length > 0) {
        for (const a of o.linkedSheets)
          if (a.textures !== void 0 && a.textures.hasOwnProperty(s)) {
            t = a.textures[s];
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
  return t || new K().texture;
}
function x(i, t) {
  const e = O(i.position, !1, i.x, i.y);
  t.x = e.x, t.y = e.y;
}
function C(i, t) {
  if (!i)
    return;
  if (i.scale === void 0) {
    if (i.scaleX === void 0 && i.scaleY === void 0)
      return;
    i.scaleX === void 0 && (i.scaleX = 1), i.scaleY === void 0 && (i.scaleY = 1);
  }
  const e = O(i.scale, !1, i.scaleX, i.scaleY);
  t.scale.set(e.x, e.y);
}
function ht(i, t) {
  if (i !== void 0) {
    const e = O(i);
    t.anchor.set(e.x, e.y);
  }
}
function b(i, t) {
  if (i !== void 0) {
    const e = O(i);
    t.pivot.set(e.x, e.y);
  }
}
const Ft = {
  existing: (i, t) => {
    if (!t)
      return i;
    const { position: e, x: s, y: n, pivot: o, scale: r, scaleX: a, scaleY: h, ...l } = t;
    return x({ position: e, x: s, y: n }, i), C({ scale: r, scaleX: a, scaleY: h }, i), b(o, i), y(l, i), i;
  },
  texture: At,
  container: (i) => {
    const t = new N();
    if (!i)
      return t;
    const { position: e, x: s, y: n, pivot: o, scale: r, scaleX: a, scaleY: h, ...l } = i;
    return x({ position: e, x: s, y: n }, t), C({ scale: r, scaleX: a, scaleY: h }, t), b(o, t), y(l, t), t;
  },
  sprite: (i) => {
    const t = new K(i ? At(i) : void 0);
    if (!i)
      return t;
    const { position: e, x: s, y: n, anchor: o, pivot: r, scale: a, scaleX: h, scaleY: l, ...u } = i;
    return x({ position: e, x: s, y: n }, t), C({ scale: a, scaleX: h, scaleY: l }, t), ht(o, t), b(r, t), y(u, t), t;
  },
  graphics: (i) => {
    const t = new G();
    if (!i)
      return t;
    const { position: e, x: s, y: n, pivot: o, scale: r, scaleX: a, scaleY: h, ...l } = i;
    return x({ position: e, x: s, y: n }, t), C({ scale: r, scaleX: a, scaleY: h }, t), b(o, t), y(l, t), t;
  },
  text: (i) => {
    const t = i ? {
      text: i.text,
      roundPixels: i.roundPixels,
      resolution: i.resolution,
      style: i.style,
      anchor: i.anchor ? O(i.anchor, !0) : void 0
    } : {}, e = new Ot(t);
    if (!i)
      return e;
    const { position: s, x: n, y: o, scale: r, scaleX: a, scaleY: h, pivot: l } = i;
    x({ position: s, x: n, y: o }, e), C({ scale: r, scaleX: a, scaleY: h }, e), b(l, e);
    const u = j(
      ["x", "y", "position", "text", "roundPixels", "resolution", "style", "anchor", "pivot"],
      i
    );
    return y(u, e), e;
  },
  bitmapText: (i) => {
    const t = $(i ?? {}, Oe), e = new zt(t);
    i != null && i.position && x({ position: i.position, x: i.x, y: i.y }, e), i != null && i.scale && C({ scale: i.scale ?? 1, scaleX: i.scaleX, scaleY: i.scaleY }, e), i != null && i.pivot && b(i.pivot, e);
    const s = j(
      ["x", "y", "position", "text", "roundPixels", "resolution", "style", "anchor", "pivot"],
      i ?? {}
    );
    return y(s, e), e;
  },
  // dill pixel specific stuff
  button: (i) => {
    const t = $(i ?? {}, bt), e = j(bt, i ?? {}), s = new xe(t);
    if (!e)
      return s;
    const { position: n, x: o, y: r, pivot: a, scale: h, scaleX: l, scaleY: u, ...g } = e;
    return x({ position: n, x: o, y: r }, s), C({ scale: h, scaleX: l, scaleY: u }, s), b(a, s), y(g, s), s;
  },
  flexContainer: (i) => {
    const t = $(i ?? {}, Pt), e = j(Pt, i ?? {}), s = new D(t);
    if (!e)
      return s;
    const { position: n, x: o, y: r, pivot: a, scale: h, scaleX: l, scaleY: u, ...g } = e;
    return x({ position: n, x: o, y: r }, s), C({ scale: h, scaleX: l, scaleY: u }, s), b(a, s), y(g, s), s;
  },
  uiCanvas: (i) => {
    const t = $(i ?? {}, kt), e = j(kt, i ?? {}), s = new Ee(t);
    if (!e)
      return s;
    const { position: n, x: o, y: r, pivot: a, scale: h, scaleX: l, scaleY: u, ...g } = e;
    return x({ position: n, x: o, y: r }, s), C({ scale: h, scaleX: l, scaleY: u }, s), b(a, s), y(g, s), s;
  },
  spine: (i) => {
    let t = i == null ? void 0 : i.data;
    typeof t == "string" && t.slice(-5) !== ".json" && (t = { skeleton: t + ".json", atlas: t + ".atlas" });
    const e = window.Spine.from(t);
    if (!i)
      return e;
    console.log("adding spine", i, e), i.autoUpdate !== void 0 && (e.autoUpdate = i.autoUpdate), i.animationName && e.state.setAnimation(i.trackIndex ?? 0, i.animationName, i.loop);
    const { position: s, x: n, y: o, anchor: r, pivot: a, scale: h, scaleX: l, scaleY: u, ...g } = i;
    return x({ position: s, x: n, y: o }, e), C({ scale: h, scaleX: l, scaleY: u }, e), ht(r, e), b(a, e), y(g, e), e;
  },
  spineAnimation: (i) => {
    const t = new Se(i);
    if (!i)
      return t;
    const { position: e, x: s, y: n, anchor: o, pivot: r, scale: a, scaleX: h, scaleY: l, ...u } = i;
    return x({ position: e, x: s, y: n }, t), C({ scale: a, scaleX: h, scaleY: l }, t), ht(o, t), b(r, t), y(u, t), t;
  }
};
function St(i, t, e) {
  const s = {};
  for (const n in i)
    s[n] = (...o) => {
      const r = i[n](...o);
      return e && t.addChild(r), r;
    };
  return s;
}
function B(i) {
  return class extends H {
    constructor() {
      super(), i = Object.assign(Ft, i), this.make = St(i, this, !1), this.add = St(i, this, !0);
    }
  };
}
const dt = class dt {
};
dt.get = Object.assign(Ft, {});
let Mt = dt;
const ze = {
  color: 0,
  alpha: 0.75
}, Te = { backing: !0, closeOnEscape: !0, closeOnPointerDownOutside: !0 };
class F extends N {
  /**
   * Create a new Popup
   * @param id - The unique identifier for the popup
   * @param config - The configuration for the popup
   */
  constructor(t, e = {}) {
    super(), this.id = t, this.isShowing = !1, this.config = Object.assign({ id: t, ...Te }, e), this._initialize();
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
    let s = {};
    typeof t == "object" && (s = t);
    const n = Object.assign({ ...ze }, s);
    if (F.BACKING_TEXTURE === void 0) {
      const a = new G();
      a.rect(0, 0, 100, 100).fill("white"), F.BACKING_TEXTURE = w.getInstance().renderer.generateTexture(a);
    }
    const o = new N();
    o.sortableChildren = !1;
    const r = o.addChild(new K(F.BACKING_TEXTURE));
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
    this.app.focus.addFocusLayer(this.id, !1), this.config.backing && (this.backing = this.add.existing(F.makeBacking(this.config.backing, this.app.size)), this.backing.eventMode = "static", this.config.closeOnPointerDownOutside && (this.backing.once("click", this.close), this.backing.once("tap", this.close))), this.view = this.add.container(), this.view.eventMode = "static";
  }
}
class ti extends N {
  constructor() {
    super({ autoResize: !0, autoUpdate: !0, priority: -9999 });
  }
  get assets() {
    return null;
  }
  get bundles() {
    return null;
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
  }
}
class ei extends H {
  constructor(t) {
    return super({ isRenderGroup: !0 }), this.config = t, this.onZoom = new d(), this.onZoomComplete = new d(), this.minX = 0, this.minY = 0, this._zooming = !1, this._zoomLerp = 0.1, this._targetPivot = new S(0, 0), this._targetScale = new S(1, 1), this._lerp = 0, this._target = null, this._followOffset = new S(0, 0), E(this), t && (this.container = t.container, this.addChild(this.container), t.minX && (this.minX = t.minX), t.maxX && (this.maxX = t.maxX), t.minY && (this.minY = t.minY), this.viewportWidth = t.viewportWidth ?? this.app.size.width, this.viewportHeight = t.viewportHeight ?? this.app.size.width, this.worldWidth = t.worldWidth ?? this.viewportWidth, this.worldHeight = t.worldHeight ?? this.viewportHeight, this.maxX = t.maxX ?? this.worldWidth - this.viewportWidth, this.maxY = t.maxY ?? this.worldHeight - this.viewportHeight), this._targetPivot.set(this.viewportWidth * 0.5, this.viewportHeight * 0.5), t.target && (this.target = t.target), this._lerp = 1, this.update(), t.lerp && (this.lerp = t.lerp), this;
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
    (t < 0 || t > 1) && p.error("Camera lerp value must be in the range [0, 1]"), this._lerp = Math.max(0, Math.min(t, 1));
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
    this._followOffset = O(t, !0);
  }
  get app() {
    return w.getInstance();
  }
  follow(t, e) {
    e || (e = { x: 0, y: 0 }), this.followOffset = e, this.target = t;
  }
  pan(t, e) {
    let s = this.pivot.x + t, n = this.pivot.y + e;
    s = Math.max(this.minX, Math.min(s, this.maxX)), n = Math.max(this.minY, Math.min(n, this.maxY)), this._targetPivot.set(s, n);
  }
  zoom(t, e = 0.1) {
    this._zoomLerp = e, this._zooming = !0, this._targetScale.set(t, t);
  }
  update() {
    this.updateZoom(), this._target && this.focusOn(this._target), this.updatePosition(this._zooming), this._zooming && Math.abs(this.scale.x - this._targetScale.x) < 1e-3 && Math.abs(this.scale.y - this._targetScale.y) < 1e-3 ? (this.onZoom.emit(this), this._zooming = !1, this.scale.set(this._targetScale.x, this._targetScale.y), this.onZoomComplete.emit(this)) : this._zooming && this.onZoom.emit(this);
  }
  focusOn(t) {
    const e = t.getGlobalPosition(), s = this.toLocal(e), n = this.position.x / this.scale.x - this.viewportWidth / 2, o = this.position.y / this.scale.y - this.viewportHeight / 2, r = this.followOffset.x / this.scale.x, a = this.followOffset.y / this.scale.y;
    this._targetPivot.x = (s.x * this.scale.x + this.viewportWidth / 2) * (1 / this.scale.x) + r;
    const h = this.viewportWidth / this.scale.x / 2 + n + this.minX - r, l = this.worldWidth - this.viewportWidth / this.scale.x / 2 + n + this.maxX + r;
    this._targetPivot.x < h ? this._targetPivot.x = h : this._targetPivot.x > l && (this._targetPivot.x = l), this._targetPivot.y = (s.y * this.scale.y + this.viewportHeight / 2) * (1 / this.scale.y) + a;
    const u = this.viewportHeight / this.scale.y / 2 + o + this.minY - a, g = this.worldHeight - this.viewportHeight / this.scale.y / 2 + o + this.maxY - a;
    this._targetPivot.y < u ? this._targetPivot.y = u : this._targetPivot.y > g && (this._targetPivot.y = g);
  }
  updateZoom() {
    const t = this.scale.x, e = this.scale.y, s = t + this._zoomLerp * (this._targetScale.x - t), n = e + this._zoomLerp * (this._targetScale.y - e);
    this.scale.set(Math.max(0, s), Math.max(0, n));
  }
  updatePosition(t = !1) {
    if (this.lerp > 0 && !t) {
      const e = this.pivot.x, s = this.pivot.y, n = e + this.lerp * (this._targetPivot.x - e), o = s + this.lerp * (this._targetPivot.y - s);
      this.pivot.set(n, o);
    } else
      this.pivot.set(this._targetPivot.x, this._targetPivot.y);
    this.position.set(this.viewportWidth / 2, this.viewportHeight / 2);
  }
}
const Ie = "8.4.0";
function De() {
  let i = `%cDill Pixel Game Framework v${Ie}`;
  i += " - %chttps://dillpixel.io", console.log(i, "color: #74b64c", "color: #74b64c; font-weight: bold");
}
async function ii(i, t = { id: "DillPixelApplication" }, e = w.containerId, s = !0) {
  s && De();
  let n = null;
  if (typeof e == "string" ? (n = document.getElementById(e), n || (n = w.createContainer(e))) : e instanceof HTMLElement ? n = e : e === window && (n = document.body), !n)
    throw new Error(
      "You passed in a DOM Element, but none was found. If you instead pass in a string, a container will be created for you, using the string for its id."
    );
  w.containerElement = n, t.resizeToContainer && (t.resizeTo = n);
  const o = new i();
  if (await o.initialize(t), n)
    n.appendChild(o.canvas);
  else
    throw new Error("No element found to append the view to.");
  return await le(0.01), await o.postInitialize(), o;
}
export {
  w as A,
  $e as B,
  N as C,
  B as D,
  Mt as E,
  Ye as F,
  Ce as G,
  jt as H,
  ve as I,
  F as J,
  xe as K,
  p as L,
  ti as M,
  ei as N,
  D as O,
  ge as P,
  we as Q,
  Se as R,
  d as S,
  V as T,
  Ee as U,
  ii as V,
  X as W,
  je as X,
  _e as a,
  E as b,
  Qe as c,
  pe as d,
  at as e,
  Be as f,
  yt as g,
  Ge as h,
  I as i,
  Ve as j,
  me as k,
  Ne as l,
  he as m,
  He as n,
  Ke as o,
  fe as p,
  Ze as q,
  O as r,
  Re as s,
  Je as t,
  Xe as u,
  Dt as v,
  le as w,
  $ as x,
  j as y,
  We as z
};
//# sourceMappingURL=index-DXo32gNJ.mjs.map
