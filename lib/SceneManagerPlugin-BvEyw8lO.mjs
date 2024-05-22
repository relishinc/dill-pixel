import { Container as a } from "pixi.js";
import { P as u, S as h, b as o, i as d, L as l, c as S, g as _, A as g } from "./index-DH1sq-Gb.mjs";
class b extends u {
  constructor() {
    super(), this.id = "scenes", this.onSceneChangeStart = new h(), this.onSceneChangeComplete = new h(), this.view = new a(), this.isFirstScene = !0, this.scenes = [], this._sceneModules = /* @__PURE__ */ new Map(), this._lastScene = null, this._defaultLoadMethod = "immediate", this._debugVisible = !1, o(this);
  }
  setDefaultLoadMethod(e) {
    this._defaultLoadMethod = e;
  }
  destroy() {
  }
  initialize(e) {
    var t, i, n, s, r, c;
    return this._debugVisible = ((t = this.app.config) == null ? void 0 : t.showSceneDebugMenu) === !0 || d && ((i = this.app.config) == null ? void 0 : i.showSceneDebugMenu) !== !1, this.view.sortableChildren = !0, this.scenes = ((n = e.config) == null ? void 0 : n.scenes) || [], this._debugVisible && (this.defaultScene = this._getSceneFromHash() || ""), this.defaultScene = this.defaultScene || ((s = e.config) == null ? void 0 : s.defaultScene) || ((c = (r = this.scenes) == null ? void 0 : r[0]) == null ? void 0 : c.id), this._defaultLoadMethod = e.config.defaultSceneLoadMethod || "immediate", l.log("SceneManager initialize::", this.scenes), this._debugVisible && this._createDebugMenu(), Promise.resolve(void 0);
  }
  async loadDefaultScene() {
    return this.loadScene(this.defaultScene);
  }
  async loadScene(e) {
    var s;
    if (this._queue)
      return;
    this._lastScene = null;
    const t = typeof e == "string" ? e : e.id, i = typeof e == "string" ? this._defaultLoadMethod : (e == null ? void 0 : e.method) || this._defaultLoadMethod;
    this.currentScene && (this._lastScene = this.currentScene);
    const n = this.scenes.find((r) => r.id === t);
    if (!n)
      throw new Error(`Scene item not found  for id ${t}`);
    if ((s = n == null ? void 0 : n.plugins) != null && s.length)
      for (const r of n.plugins) {
        const c = this.app.getUnloadedPlugin(r);
        c && await this.app.loadPlugin(c);
      }
    switch (this._currentSceneId = t, this._queue = S(this._createCurrentScene), i) {
      case "exitEnter":
        this._queue.add(
          this._exitLastScene,
          this._destroyLastScene,
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._enterCurrentScene,
          this._startCurrentScene
        );
        break;
      case "enterExit":
        this._queue.add(
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._enterCurrentScene,
          this._startCurrentScene,
          this._destroyLastScene
        );
        break;
      case "enterBehind":
        this._queue.add(
          this._initializeCurrentScene,
          this._addCurrentSceneBehind,
          this._enterCurrentScene,
          this._exitLastScene,
          this._destroyLastScene,
          this._startCurrentScene
        );
        break;
      default:
        this._queue.add(
          this._destroyLastScene,
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
    var i;
    const e = this.scenes.find((n) => n.id === this._currentSceneId);
    let t;
    if (this._sceneModules.has(this._currentSceneId))
      t = this._sceneModules.get(this._currentSceneId);
    else {
      const n = await _(e);
      if (!n)
        throw new Error(`Couldn't load ${this._currentSceneId}"`);
      n[this._currentSceneId] ? t = n[this._currentSceneId] : t = n, t && this._sceneModules.set(this._currentSceneId, t);
    }
    if (!t)
      throw new Error(`Couldn't load ${this._currentSceneId}"`);
    this.currentScene = new t(), this.currentScene.id = this._currentSceneId, this.onSceneChangeStart.emit({ exiting: ((i = this._lastScene) == null ? void 0 : i.id) || null, entering: this.currentScene.id });
  }
  _queueComplete() {
    return this.isFirstScene = !1, this._lastScene = null, this.onSceneChangeComplete.emit({ current: this.currentScene.id }), this._queue = null, Promise.resolve();
  }
  async _destroyLastScene() {
    return this._lastScene && (this.view.removeChild(this._lastScene), this._lastScene.destroy()), Promise.resolve();
  }
  async _exitLastScene() {
    return this._lastScene && await this._lastScene.exit(), Promise.resolve();
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
    t.value = "", t.innerHTML = "Select a scene", this._sceneSelect.appendChild(t), this.scenes.forEach((i) => {
      const n = document.createElement("option");
      n.value = i.id, n.innerHTML = (i == null ? void 0 : i.debugLabel) || i.id, i.id === this.defaultScene && (n.selected = !0), this._sceneSelect.appendChild(n);
    }), this._debugMenu.appendChild(this._sceneSelect), this._debugMenu.addEventListener("change", (i) => {
      if (this._queue) {
        i.preventDefault();
        return;
      }
      const s = i.target.value;
      s && (window.location.hash = s.toLowerCase());
    }), window.addEventListener("hashchange", () => {
      const i = this._getSceneFromHash();
      i && this.loadScene(i);
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
    var t, i, n;
    let e = (t = window == null ? void 0 : window.location) == null ? void 0 : t.hash;
    if (e && (e = e.replace("#", ""), e.length > 0)) {
      for (let s = 0; s < this.scenes.length; s++)
        if (((n = (i = this.scenes[s]) == null ? void 0 : i.id) == null ? void 0 : n.toLowerCase()) === e.toLowerCase())
          return this.scenes[s].id;
    }
    return null;
  }
}
export {
  b as SceneManagerPlugin
};
//# sourceMappingURL=SceneManagerPlugin-BvEyw8lO.mjs.map
