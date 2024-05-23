import { P as o, S as i } from "./index-DXo32gNJ.mjs";
class l extends o {
  constructor() {
    super(...arguments), this.id = "keyboard", this.onGlobalKeyDown = new i(), this.onGlobalKeyUp = new i(), this._keysDown = /* @__PURE__ */ new Set(), this._keyDownSignals = /* @__PURE__ */ new Map(), this._keyUpSignals = /* @__PURE__ */ new Map(), this._enabled = !0;
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
    const n = t === "keydown" ? this._keyDownSignals : this._keyUpSignals;
    return n.size || this._listen(t), e === void 0 && (e = "*undefined*"), n.has(e) || n.set(e, new i()), n.get(e);
  }
  _listen(e) {
    document.addEventListener(e, this._handleEvent);
  }
  _handleEvent(e) {
    var n, s;
    if (!this._enabled)
      return;
    const t = e.type === "keydown" ? this._keyDownSignals : this._keyUpSignals;
    (n = t.get("*undefined*")) == null || n.emit({ event: e, key: e.key.toLowerCase() }), (s = t.get(e.key.toLowerCase())) == null || s.emit({ event: e, key: e.key });
  }
}
export {
  l as KeyboardPlugin
};
//# sourceMappingURL=KeyboardPlugin-BKMyCSRu.mjs.map
