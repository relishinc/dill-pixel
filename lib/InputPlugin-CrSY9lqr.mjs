import { a as e, P as d, S as n, d as c } from "./index-CSWyW782.mjs";
var o = /* @__PURE__ */ ((a) => (a.Keyboard = "keyboard", a.Gamepad = "gamepad", a.Mouse = "mouse", a.Touch = "touch", a))(o || {});
const r = [
  e.Up,
  e.Down,
  e.Left,
  e.Right,
  e.Action,
  e.Pause,
  e.Unpause,
  e.Start,
  e.Menu,
  e.Back,
  e.Next
], s = {
  actions: r
};
class l extends d {
  constructor() {
    super(...arguments), this.id = "input", this.activeGamepads = /* @__PURE__ */ new Map(), this.activeControllers = /* @__PURE__ */ new Set([]), this.onGamepadConnected = new n(), this.onGamepadDisconnected = new n(), this.onControllerActivated = new n(), this.onControllerDeactivated = new n(), this.onContextChanged = new n(), this._actionSignals = /* @__PURE__ */ new Map(), this._context = c.General;
  }
  get context() {
    return this._context;
  }
  set context(t) {
    this._context !== t && (this._context = t, this.onContextChanged.emit(t));
  }
  async initialize(t, i = s) {
    this.options = { ...s, ...i }, t.stage.eventMode = "static", t.stage.on("touchstart", this._onTouchStart), t.stage.on("globalmousemove", this._onMouseMove), window.addEventListener("keydown", this._onKeyDown), window.addEventListener("gamepadconnected", this._onGamepadConnected), window.addEventListener("gamepaddisconnected", this._onGamepadDisconnected);
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
  actions(t) {
    return this._actionSignals.has(t) || this._actionSignals.set(t, new n()), this._actionSignals.get(t);
  }
  sendAction(t, i) {
    return this.actions(t).emit({ id: t, context: this.context, data: i });
  }
  setActionContext(t) {
    return this.context = t, t;
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
    this._activateController(o.Touch);
  }
  _onMouseMove() {
    this._activateController(o.Mouse);
  }
  _onKeyDown() {
    this._activateController(o.Keyboard);
  }
  _onGamepadConnected(t) {
    this._activateController(o.Gamepad), this._activateController(t.gamepad.id), this._activateGamepad(t.gamepad), this.onGamepadConnected.emit(t.gamepad);
  }
  _onGamepadDisconnected(t) {
    this._deactivateGamepad(t.gamepad.id), this.sendAction(e.Pause), this.onGamepadDisconnected.emit(t.gamepad), this.activeGamepads.size === 0 && this._deactivateController(o.Gamepad);
  }
}
export {
  l as InputPlugin
};
//# sourceMappingURL=InputPlugin-CrSY9lqr.mjs.map
