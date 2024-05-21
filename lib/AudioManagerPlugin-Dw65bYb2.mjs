import { EventEmitter as m, Ticker as c, DOMAdapter as O, path as p, ExtensionType as P, LoaderParserPriority as R, extensions as $ } from "pixi.js";
import { gsap as C } from "gsap";
import { S as l, b as U, P as H, L as b } from "./index-ChDTXvc9.mjs";
let M;
function D(i) {
  return M = i, i;
}
function _() {
  return M;
}
class w {
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
      const s = _().context;
      e.setValueAtTime(t, s.audioContext.currentTime);
    } else
      e.value = t;
    return t;
  }
}
class j extends m {
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
let I = 0;
const A = class extends m {
  /** @param parent - Parent element */
  constructor(i) {
    super(), this.id = I++, this.init(i);
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
    t && console.assert(t > e, "End time is before start time"), this._speed = s, this._volume = o, this._loop = !!n, this._muted = r, this.refresh(), this.loop && t !== null && (console.warn('Looping not support when specifying an "end" time'), this.loop = !1), this._start = e, this._end = t || this._duration, this._start = Math.max(0, this._start - A.PADDING), this._end = Math.min(this._end + A.PADDING, this._duration), this._source.onloadedmetadata = () => {
      this._source && (this._source.currentTime = e, this._source.onloadedmetadata = null, this.emit("progress", e, this._duration), c.shared.add(this._onUpdate, this));
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
    c.shared.remove(this._onUpdate, this), this._internalStop(), this.emit("progress", 1, this._duration), this.emit("end", this);
  }
  /** Don't use after this. */
  destroy() {
    c.shared.remove(this._onUpdate, this), this.removeAllListeners();
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
let L = A;
L.PADDING = 0.1;
class Q extends m {
  init(e) {
    this.parent = e, this._source = e.options.source || new Audio(), e.url && (this._source.src = e.url);
  }
  // Implement create
  create() {
    return new L(this);
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
      const a = s.autoPlayStart();
      e && setTimeout(() => {
        e(null, s, a);
      }, 0);
      return;
    }
    if (!s.url) {
      e(new Error("sound.url or sound.source must be set"));
      return;
    }
    t.src = s.url;
    const n = () => {
      h(), s.isLoaded = !0;
      const a = s.autoPlayStart();
      e && e(null, s, a);
    }, o = () => {
      h(), e && e(new Error("Sound loading has been aborted"));
    }, r = () => {
      h();
      const a = `Failed to load audio element (code: ${t.error.code})`;
      e ? e(new Error(a)) : console.error(a);
    }, h = () => {
      t.removeEventListener("canplaythrough", n), t.removeEventListener("load", n), t.removeEventListener("abort", o), t.removeEventListener("error", r);
    };
    t.addEventListener("canplaythrough", n, !1), t.addEventListener("load", n, !1), t.addEventListener("abort", o, !1), t.addEventListener("error", r, !1), t.load();
  }
}
class W {
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
const g = [
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
], G = [
  "audio/mpeg",
  "audio/ogg"
], y = {};
function z(i) {
  const e = {
    m4a: "audio/mp4",
    oga: "audio/ogg",
    opus: 'audio/ogg; codecs="opus"',
    caf: 'audio/x-caf; codecs="opus"'
  }, t = document.createElement("audio"), s = {}, n = /^no$/;
  g.forEach((o) => {
    const r = t.canPlayType(`audio/${o}`).replace(n, ""), h = e[o] ? t.canPlayType(e[o]).replace(n, "") : "";
    s[o] = !!r || !!h;
  }), Object.assign(y, s);
}
z();
let Z = 0;
class q extends m {
  constructor(e) {
    super(), this.id = Z++, this._media = null, this._paused = !1, this._muted = !1, this._elapsed = 0, this.init(e);
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
    w.setParamValue(this._gain.gain, o * n * s), w.setParamValue(this._source.playbackRate, this._speed * t.speed * e.speed), this.applyFilters();
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
    const { start: t, end: s, speed: n, loop: o, volume: r, muted: h, filters: a } = e;
    s && console.assert(s > t, "End time is before start time"), this._paused = !1;
    const { source: x, gain: k } = this._media.nodes.cloneBufferSource();
    this._source = x, this._gain = k, this._speed = n, this._volume = r, this._loop = !!o, this._muted = h, this._filters = a, this.refresh();
    const F = this._source.buffer.duration;
    this._duration = F, this._end = s, this._lastUpdate = this._now(), this._elapsed = t, this._source.onended = this._onComplete.bind(this), this._loop ? (this._source.loopEnd = s, this._source.loopStart = t, this._source.start(0, t)) : s ? this._source.start(0, t, s - t) : this._source.start(0, t), this.emit("start"), this._update(!0), this.enableTicker(!0);
  }
  /** Start the update progress. */
  enableTicker(e) {
    c.shared.remove(this._updateListener, this), e && c.shared.add(this._updateListener, this);
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
          const h = this._source.loopEnd - this._source.loopStart;
          r = (this._source.loopStart + this._elapsed % h) / o;
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
class V {
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
const T = class extends V {
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
    return this._script || (this._script = this.context.audioContext.createScriptProcessor(T.BUFFER_SIZE), this._script.connect(this.context.destination)), this._script;
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
    e.buffer = i.buffer, w.setParamValue(e.playbackRate, i.playbackRate.value), e.loop = i.loop;
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
let B = T;
B.BUFFER_SIZE = 0;
class J {
  /**
   * Re-initialize without constructing.
   * @param parent - - Instance of parent Sound container
   */
  init(e) {
    this.parent = e, this._nodes = new B(this.context), this._source = this._nodes.bufferSource, this.source = e.options.source;
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
    return new q(this);
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
    const t = this.parent.url, s = await O.get().fetch(t);
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
const d = class {
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
    const t = _().useLegacy ? new Q() : new J();
    return new d(t, e);
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
    const [e] = i.map((t) => ({ url: t, ext: p.extname(t).slice(1) })).filter(({ ext: t }) => y[t]).sort((t, s) => g.indexOf(t.ext) - g.indexOf(s.ext));
    if (!e)
      throw new Error("No supported file type found");
    return e.url;
  }
  /** Instance of the media context. */
  get context() {
    return _().context;
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
    const t = new W(this, e);
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
        this._preload((r, h, a) => {
          this._preloadQueue.forEach((x) => x()), this._preloadQueue = null, r ? o(r) : (t.loaded && t.loaded(r, h, a), n(a));
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
    if (d._pool.length > 0) {
      const i = d._pool.pop();
      return i.init(this.media), i;
    }
    return this.media.create();
  }
  /**
   * Destroy/recycling the instance object.
   * @param instance - Instance to recycle
   */
  _poolInstance(i) {
    i.destroy(), d._pool.indexOf(i) < 0 && d._pool.push(i);
  }
};
let v = d;
v._pool = [];
class f extends V {
  constructor() {
    const e = window, t = new f.AudioContext(), s = t.createDynamicsCompressor(), n = t.createAnalyser();
    n.connect(s), s.connect(t.destination), super(n, s), this.autoPause = !0, this._ctx = t, this._offlineCtx = new f.OfflineAudioContext(
      1,
      2,
      e.OfflineAudioContext ? Math.max(8e3, Math.min(96e3, t.sampleRate)) : 44100
    ), this.compressor = s, this.analyser = n, this.events = new m(), this.volume = 1, this.speed = 1, this.muted = !1, this.paused = !1, this._locked = t.state === "suspended" && ("ontouchstart" in globalThis || "onclick" in globalThis), this._locked && (this._unlock(), this._unlock = this._unlock.bind(this), document.addEventListener("mousedown", this._unlock, !0), document.addEventListener("touchstart", this._unlock, !0), document.addEventListener("touchend", this._unlock, !0)), this.onFocus = this.onFocus.bind(this), this.onBlur = this.onBlur.bind(this), globalThis.addEventListener("focus", this.onFocus), globalThis.addEventListener("blur", this.onBlur);
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
class K {
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
    return this.supported && (this._webAudioContext = new f()), this._htmlAudioContext = new j(), this._sounds = {}, this.useLegacy = !this.supported, this;
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
    return f.AudioContext !== null;
  }
  /**
   * @ignore
   */
  add(e, t) {
    if (typeof e == "object") {
      const o = {};
      for (const r in e) {
        const h = this._getOptions(
          e[r],
          t
        );
        o[r] = this.add(r, h);
      }
      return o;
    }
    if (console.assert(!this._sounds[e], `Sound with alias ${e} already exists.`), t instanceof v)
      return this._sounds[e] = t, t;
    const s = this._getOptions(t), n = v.from(s);
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
const S = (i) => {
  var s;
  const e = i.src;
  let t = (s = i == null ? void 0 : i.alias) == null ? void 0 : s[0];
  return (!t || i.src === t) && (t = p.basename(e, p.extname(e))), t;
}, X = {
  extension: P.Asset,
  detection: {
    test: async () => !0,
    add: async (i) => [...i, ...g.filter((e) => y[e])],
    remove: async (i) => i.filter((e) => i.includes(e))
  },
  loader: {
    name: "sound",
    extension: {
      type: [P.LoadParser],
      priority: R.High
    },
    /** Should we attempt to load this file? */
    test(i) {
      const e = p.extname(i).slice(1);
      return !!y[e] || G.some((t) => i.startsWith(`data:${t}`));
    },
    /** Load the sound file, this is mostly handled by Sound.from() */
    async load(i, e) {
      const t = await new Promise((s, n) => v.from({
        ...e.data,
        url: i,
        preload: !0,
        loaded(o, r) {
          var h, a;
          o ? n(o) : s(r), (a = (h = e.data) == null ? void 0 : h.loaded) == null || a.call(h, o, r);
        }
      }));
      return _().add(S(e), t), t;
    },
    /** Remove the sound from the library */
    async unload(i, e) {
      _().remove(S(e));
    }
  }
};
$.add(X);
const u = D(new K());
class Y {
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
class E {
  constructor(e, t, s) {
    this.id = e, this.channel = t, this.manager = s, this.onStart = new l(), this.onStop = new l(), this.onEnd = new l(), this.onPaused = new l(), this.onResumed = new l(), this.onProgress = new l(), this._volume = 1, this._muted = !1, this._isPlaying = !1, U(this), this.muted = this.channel.muted;
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
    return C.to(this.media, { volume: e, duration: t });
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
class se extends H {
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
    const t = new Y(e, this);
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
      }), u.add(s);
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
      const o = n.add(e, new E(e, n, this)), r = await u.play(e, s);
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
    n && (e = this._verifySoundId(e)), n != null && n.get(e) || await this.play(e, t, { volume: 0 }), (s == null ? void 0 : s.volume) === 0 && b.warn("fadeIn volume is 0", e, t, s);
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
    s || (s = {}), (s == null ? void 0 : s.volume) === void 0 && (s.volume = 0), (s == null ? void 0 : s.volume) > 0 && b.warn("fadeOut volume should probably be 0", e, t, s);
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
      const h = C.to(r, s);
      return h.eventCallback("onComplete", () => {
        n && this.stop(e, t);
      }), h;
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
        const r = u.find(n);
        r.options = { ...s, autoPlay: !1 };
        const h = o.add(n, new E(n, o, this));
        h.media = r.instances[0], h.pause();
      } else
        throw new Error(`Channel ${t} does not exist.`);
    }
  }
  getCoreSignals() {
    return ["onSoundStarted", "onSoundEnded", "onMuted", "onMasterVolumeChanged", "onChannelVolumeChanged"];
  }
  _verifySoundId(e) {
    if (this._idMap.has(e))
      return this._idMap.get(e);
    if (!u.exists(e))
      if (u.exists(e + ".mp3"))
        e += ".mp3";
      else if (u.exists(e + ".ogg"))
        e += ".ogg";
      else if (u.exists(e + ".wav"))
        e += ".wav";
      else
        throw new Error(`Sound with ID ${e} does not exist.`);
    return this._idMap.set(e, e), e;
  }
  /**
   * @private
   */
  _setMuted() {
    this._channels.forEach((e) => {
      e.muted = this._muted;
    }), this._muted ? u.muteAll() : u.unmuteAll(), this.onMuted.emit(this._muted);
  }
  /**
   * @private
   */
  _setPaused() {
    this._paused ? u.pauseAll() : u.resumeAll();
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
export {
  se as AudioManagerPlugin
};
//# sourceMappingURL=AudioManagerPlugin-Dw65bYb2.mjs.map
