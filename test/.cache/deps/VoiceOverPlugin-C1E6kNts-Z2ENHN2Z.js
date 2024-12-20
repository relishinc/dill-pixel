import {
  O,
  _,
  u
} from "./chunk-D37FA67I.js";
import "./chunk-IF2C3KLE.js";
import "./chunk-AYLFXNJK.js";
import "./chunk-3OY5PPQQ.js";
import "./chunk-TDGCD75C.js";
import "./chunk-MKM4NCB5.js";
import "./chunk-ULUUGPA3.js";
import "./chunk-5TVQ26FI.js";

// node_modules/dill-pixel/lib/VoiceOverPlugin-C1E6kNts.js
var p = class extends O {
  constructor() {
    super(...arguments), this.id = "voiceover", this.fadeOutDuration = 0.15, this.debug = false, this.onVoiceOverStart = new u(), this.onVoiceOverPaused = new u(), this.onVoiceOverComplete = new u(), this.onVoiceOverResumed = new u(), this.onVoiceOverStopped = new u(), this._queue = [], this._pausedQueue = [], this._paused = false;
  }
  get paused() {
    return this._paused;
  }
  get activeTimeout() {
    var e;
    return (e = this._queue[0]) == null ? void 0 : e.timeout;
  }
  get activeVO() {
    if (this._queue.length > 0 && this._queue[0].key)
      return this.app.audio.getAudioInstance(this._queue[0].key, "voiceover");
  }
  async initialize() {
    this.app.actions("pause").connect(this.onPause), this.app.actions("unpause").connect(this.onResume), this.app.scenes.onSceneChangeStart.connect(this.stopVO);
  }
  async playVO(e, i, s) {
    Array.isArray(e) || (e = [e]);
    let a = 0, o = "override", u2 = "";
    if (typeof i == "function")
      s = i;
    else if (typeof i == "object") {
      const h = i;
      a = h.priority ?? 0, s = h.callback, o = h.mode ?? "override", h.localized && (u2 = this.app.i18n.locale, e = e.map((c) => `${c}_${u2}`));
    }
    if (typeof i == "string" && (o = i), this._paused = false, e.length === 1 && this._queue.length === 1 && this._queue[0].key === e[0])
      _.warn(`🔇 Skipped VO ${e[0]} because it is already playing`), s && s(false);
    else {
      if (this._queue.length === 0 || o === "override" && a >= this._queue[0].priority || o === "new" && a > this._queue[0].priority)
        return await this.stopVO(), this.addToQueue(e, s, a), this.playNext();
      o === "append" ? this.addToQueue(e, s, a) : s ? (_.warn(`🎟🔇 Firing callback without playing VO(s) ${e.join(", ")}`), s(false)) : _.warn(`🔇 Skipped VO(s) ${e.join(", ")} because it is lower priority than what was already playing`);
    }
  }
  async stopVO() {
    var s, a;
    const e = this.activeVO, i = this._queue[0];
    this._queue.splice(0, this._queue.length), this._pausedQueue.splice(0, this._pausedQueue.length), (s = i == null ? void 0 : i.timeout) == null || s.kill(), e ? e.media ? (e.isPlaying && (_.log(`🤫 Fading out VO ${e.id} (duration:${this.fadeOutDuration})`), await e.fadeTo(0, this.fadeOutDuration)), e.stop()) : (_.warn(`🛑 Stopping VO %c%s%c while it is still loading ${e.id}`), e.remove()) : (_.warn("🛑 No active VO to stop"), (a = this.activeTimeout) == null || a.kill()), this.clearSignalConnections(), this._paused = false, this.onVoiceOverStopped.emit(e);
  }
  pauseVO() {
    if (!this._paused && this._queue.length > 0) {
      this._paused = true, this._pausedQueue.push(...this._queue);
      const e = this.activeVO, i = this.activeTimeout;
      e == null || e.pause(), i == null || i.pause(), this._queue.splice(0, this._queue.length);
    }
  }
  resumeVO() {
    if (this._paused && (this._paused = false, this._pausedQueue.length > 0)) {
      this._queue.push(...this._pausedQueue), this._pausedQueue.splice(0, this._pausedQueue.length);
      const e = this.activeVO, i = this.activeTimeout;
      e == null || e.resume(), i == null || i.resume(), e && this.onVoiceOverStart.emit(e);
    }
  }
  getCoreSignals() {
    return ["onVoiceOverStart", "onVoiceOverPaused", "onVoiceOverComplete", "onVoiceOverResumed", "onVoiceOverStopped"];
  }
  addToQueue(e, i, s) {
    for (let o = 0; o < e.length; o++) {
      const u2 = e[o];
      typeof u2 == "number" ? _.log(`➕ Queueing delay ${u2}`) : _.log(`➕ Queueing VO ${u2}`), this._queue.push({
        key: typeof u2 == "string" ? u2 : "",
        delay: typeof u2 == "number" ? u2 : void 0,
        callback: o === e.length - 1 ? i : void 0,
        priority: s
      });
    }
    const a = e.filter((o) => typeof o == "string");
    _.log(`📂 Loading VO(s) ${a.join(", ")}`), this.app.audio.load(a, "voiceover");
  }
  async playNext() {
    var e;
    if (this._queue.length > 0) {
      const i = this._queue[0];
      if (i.delay !== void 0) {
        if ((e = this.activeTimeout) == null || e.kill(), this._queue.length === 1)
          return _.log("⌛ Skipping delay because there are no more items in queue"), this._queue.shift(), i.callback && i.callback(true), this.playNext();
        _.log("⏳ Waiting %s seconds before next VO", i.delay), i.timeout = gsap.delayedCall(i.delay, () => (this._queue.shift(), i.callback && i.callback(true), this.playNext()));
      } else {
        const s = this.app.audio.getAudioInstance(i.key, "voiceover");
        s ? s.isPlaying && (_.warn("🛑 Stopping VO %c%s%c (no fade out)", s.id), s.stop(), this.onVoiceOverComplete.emit(s)) : _.log("📂 Loading VO %c%s%c", i.key);
        const a = await this.app.audio.play(i.key, "voiceover", { singleInstance: true });
        return this.activeVO && this.onVoiceOverStart.emit(this.activeVO), this._queue[0] !== i ? void 0 : (_.log(`▶️▶️ Playing VO ${i.key}`), _.log("ℹ️ Queue length:", this._queue.length), this.activeVO ? this.addSignalConnection(
          this.activeVO.onEnd.connectOnce(this._handleActiveVOEnded),
          this.activeVO.onPaused.connectOnce(this._handleActiveVOPaused),
          this.activeVO.onResumed.connectOnce(this._handleActiveVOResumed),
          this.activeVO.onStart.connectOnce(this._handleActiveVOStarted)
        ) : (_.error("⚠️ Vo %c%s%c completed early (did not play?)", i.key), this._handleActiveVOEndedWithoutPlaying(a)), a);
      }
    } else
      _.log("✅ Nothing left in queue");
  }
  _handleActiveVOStarted(e) {
    this.onVoiceOverStart.emit(this.activeVO || e);
  }
  _handleActiveVOPaused(e) {
    this.onVoiceOverPaused.emit(this.activeVO || e);
  }
  _handleActiveVOResumed(e) {
    this.onVoiceOverResumed.emit(this.activeVO || e);
  }
  _handleActiveVOEndedWithoutPlaying(e) {
    var i;
    this.onVoiceOverComplete.emit(this.activeVO || e), (i = this.activeTimeout) == null || i.kill(), this._currentItemCallback(false), this._queue.shift(), this.playNext();
  }
  _handleActiveVOEnded(e) {
    var i;
    this.onVoiceOverComplete.emit(this.activeVO || e), (i = this.activeTimeout) == null || i.kill(), this._currentItemCallback(), this._queue.shift(), this.playNext();
  }
  _currentItemCallback(e = true) {
    const i = this._queue[0];
    i && (_.log(`🏁 Completed VO ${i.key}`), i.callback && (_.log("'🎟 Firing callback for", i.key), i.callback(e)));
  }
  onPause() {
    var e;
    this.activeVO !== void 0 && this.activeVO.isPlaying && (_.log("⏸ Pausing VO", this.activeVO.id), this.activeVO.pause(), this.onVoiceOverComplete.emit(this.activeVO)), (e = this.activeTimeout) == null || e.pause();
  }
  onResume() {
    var e;
    this.activeVO !== void 0 && !this.activeVO.isPlaying && (_.log("⏯ Resuming VO", this.activeVO.id), this.activeVO.resume(), this.onVoiceOverStart.emit(this.activeVO)), (e = this.activeTimeout) == null || e.resume();
  }
};
export {
  p as VoiceOverPlugin
};
//# sourceMappingURL=VoiceOverPlugin-C1E6kNts-Z2ENHN2Z.js.map
