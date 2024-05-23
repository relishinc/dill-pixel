import { Plugin as l, Signal as n, Logger as t } from "./dill-pixel.mjs";
class p extends l {
  constructor() {
    super(...arguments), this.id = "voiceover", this.fadeOutDuration = 0.15, this.debug = !1, this.onVoiceOverStart = new n(), this.onVoiceOverPaused = new n(), this.onVoiceOverComplete = new n(), this.onVoiceOverResumed = new n(), this.onVoiceOverStopped = new n(), this._queue = [], this._pausedQueue = [], this._paused = !1;
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
    let a = 0, o = "override", u = "";
    if (typeof i == "function")
      s = i;
    else if (typeof i == "object") {
      const h = i;
      a = h.priority ?? 0, s = h.callback, o = h.mode ?? "override", h.localized && (u = this.app.i18n.locale, e = e.map((c) => `${c}_${u}`));
    }
    if (typeof i == "string" && (o = i), this._paused = !1, e.length === 1 && this._queue.length === 1 && this._queue[0].key === e[0])
      t.warn(`🔇 Skipped VO ${e[0]} because it is already playing`), s && s(!1);
    else {
      if (this._queue.length === 0 || o === "override" && a >= this._queue[0].priority || o === "new" && a > this._queue[0].priority)
        return this.stopVO(), this.addToQueue(e, s, a), this.playNext();
      o === "append" ? this.addToQueue(e, s, a) : s ? (t.warn(`🎟🔇 Firing callback without playing VO(s) ${e.join(", ")}`), s(!1)) : t.warn(`🔇 Skipped VO(s) ${e.join(", ")} because it is lower priority than what was already playing`);
    }
  }
  async stopVO() {
    var s, a;
    const e = this.activeVO, i = this._queue[0];
    this._queue.splice(0, this._queue.length), this._pausedQueue.splice(0, this._pausedQueue.length), (s = i == null ? void 0 : i.timeout) == null || s.kill(), e ? e.media ? (e.isPlaying && (t.log(`🤫 Fading out VO ${e.id} (duration:${this.fadeOutDuration})`), await e.fadeTo(0, this.fadeOutDuration)), e.stop()) : (t.warn(`🛑 Stopping VO %c%s%c while it is still loading ${e.id}`), e.remove()) : (t.warn("🛑 No active VO to stop"), (a = this.activeTimeout) == null || a.kill()), this.clearSignalConnections(), this._paused = !1, this.onVoiceOverStopped.emit(e);
  }
  pauseVO() {
    if (!this._paused && this._queue.length > 0) {
      this._paused = !0, this._pausedQueue.push(...this._queue);
      const e = this.activeVO, i = this.activeTimeout;
      e == null || e.pause(), i == null || i.pause(), this._queue.splice(0, this._queue.length);
    }
  }
  resumeVO() {
    if (this._paused && (this._paused = !1, this._pausedQueue.length > 0)) {
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
      const u = e[o];
      typeof u == "number" ? t.log(`➕ Queueing delay ${u}`) : t.log(`➕ Queueing VO ${u}`), this._queue.push({
        key: typeof u == "string" ? u : "",
        delay: typeof u == "number" ? u : void 0,
        callback: o === e.length - 1 ? i : void 0,
        priority: s
      });
    }
    const a = e.filter((o) => typeof o == "string");
    t.log(`📂 Loading VO(s) ${a.join(", ")}`), this.app.audio.load(a, "voiceover");
  }
  async playNext() {
    var e;
    if (this._queue.length > 0) {
      const i = this._queue[0];
      if (i.delay !== void 0) {
        if ((e = this.activeTimeout) == null || e.kill(), this._queue.length === 1)
          return t.log("⌛ Skipping delay because there are no more items in queue"), this._queue.shift(), i.callback && i.callback(!0), this.playNext();
        t.log("⏳ Waiting %s seconds before next VO", i.delay), i.timeout = gsap.delayedCall(i.delay, () => (this._queue.shift(), i.callback && i.callback(!0), this.playNext()));
      } else {
        const s = this.app.audio.getAudioInstance(i.key, "voiceover");
        s ? s.isPlaying && (t.warn("🛑 Stopping VO %c%s%c (no fade out)", s.id), s.stop(), this.onVoiceOverComplete.emit(s)) : t.log("📂 Loading VO %c%s%c", i.key);
        const a = await this.app.audio.play(i.key, "voiceover");
        return this.activeVO && this.onVoiceOverStart.emit(this.activeVO), this._queue[0] !== i ? void 0 : (t.log(`▶️▶️ Playing VO ${i.key}`), t.log("ℹ️ Queue length:", this._queue.length), this.activeVO ? this.addSignalConnection(
          this.activeVO.onEnd.connectOnce(this._handleActiveVOEnded),
          this.activeVO.onPaused.connectOnce(this._handleActiveVOPaused),
          this.activeVO.onResumed.connectOnce(this._handleActiveVOResumed),
          this.activeVO.onStart.connectOnce(this._handleActiveVOStarted)
        ) : (t.error("⚠️ Vo %c%s%c completed early (did not play?)", i.key), this._handleActiveVOEndedWithoutPlaying(a)), a);
      }
    } else
      t.log("✅ Nothing left in queue");
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
    this.onVoiceOverComplete.emit(this.activeVO || e), (i = this.activeTimeout) == null || i.kill(), this._currentItemCallback(!1), this._queue.shift(), this.playNext();
  }
  _handleActiveVOEnded(e) {
    var i;
    this.onVoiceOverComplete.emit(this.activeVO || e), (i = this.activeTimeout) == null || i.kill(), this._currentItemCallback(), this._queue.shift(), this.playNext();
  }
  _currentItemCallback(e = !0) {
    const i = this._queue[0];
    i && (t.log(`🏁 Completed VO ${i.key}`), i.callback && (t.log("'🎟 Firing callback for", i.key), i.callback(e)));
  }
  onPause() {
    var e;
    this.activeVO !== void 0 && this.activeVO.isPlaying && (t.log("⏸ Pausing VO", this.activeVO.id), this.activeVO.pause(), this.onVoiceOverComplete.emit(this.activeVO)), (e = this.activeTimeout) == null || e.pause();
  }
  onResume() {
    var e;
    this.activeVO !== void 0 && !this.activeVO.isPlaying && (t.log("⏯ Resuming VO", this.activeVO.id), this.activeVO.resume(), this.onVoiceOverStart.emit(this.activeVO)), (e = this.activeTimeout) == null || e.resume();
  }
}
export {
  p as VoiceOverPlugin
};
//# sourceMappingURL=VoiceOverPlugin-BLoajfsu.mjs.map
