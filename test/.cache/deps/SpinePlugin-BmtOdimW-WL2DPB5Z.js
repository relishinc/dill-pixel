import {
  Assets,
  O,
  checkExtension
} from "./chunk-D37FA67I.js";
import "./chunk-IF2C3KLE.js";
import {
  Cache,
  Graphics,
  LoaderParserPriority,
  Resolver,
  path
} from "./chunk-AYLFXNJK.js";
import "./chunk-3OY5PPQQ.js";
import "./chunk-TDGCD75C.js";
import "./chunk-MKM4NCB5.js";
import {
  collectAllRenderables
} from "./chunk-ULUUGPA3.js";
import {
  Container,
  DEG_TO_RAD,
  DOMAdapter,
  ExtensionType,
  Texture,
  TextureSource,
  Ticker,
  ViewContainer,
  extensions,
  fastCopy
} from "./chunk-5TVQ26FI.js";

// node_modules/dill-pixel/lib/SpinePlugin-BmtOdimW.js
var Bs = Object.defineProperty;
var Vs = (k, t, e) => t in k ? Bs(k, t, { enumerable: true, configurable: true, writable: true, value: e }) : k[t] = e;
var u = (k, t, e) => Vs(k, typeof t != "symbol" ? t + "" : t, e);
var _e = class {
  constructor() {
    u(this, "entries", {});
    u(this, "size", 0);
  }
  add(t) {
    let e = this.entries[t];
    return this.entries[t] = true, e ? false : (this.size++, true);
  }
  addAll(t) {
    let e = this.size;
    for (var i = 0, s = t.length; i < s; i++)
      this.add(t[i]);
    return e != this.size;
  }
  contains(t) {
    return this.entries[t];
  }
  clear() {
    this.entries = {}, this.size = 0;
  }
};
var ft = class ft2 {
  constructor(t = 0, e = 0, i = 0, s = 0) {
    u(this, "r");
    u(this, "g");
    u(this, "b");
    u(this, "a");
    this.r = t, this.g = e, this.b = i, this.a = s;
  }
  set(t, e, i, s) {
    return this.r = t, this.g = e, this.b = i, this.a = s, this.clamp();
  }
  setFromColor(t) {
    return this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this;
  }
  setFromString(t) {
    return t = t.charAt(0) == "#" ? t.substr(1) : t, this.r = parseInt(t.substr(0, 2), 16) / 255, this.g = parseInt(t.substr(2, 2), 16) / 255, this.b = parseInt(t.substr(4, 2), 16) / 255, this.a = t.length != 8 ? 1 : parseInt(t.substr(6, 2), 16) / 255, this;
  }
  add(t, e, i, s) {
    return this.r += t, this.g += e, this.b += i, this.a += s, this.clamp();
  }
  clamp() {
    return this.r < 0 ? this.r = 0 : this.r > 1 && (this.r = 1), this.g < 0 ? this.g = 0 : this.g > 1 && (this.g = 1), this.b < 0 ? this.b = 0 : this.b > 1 && (this.b = 1), this.a < 0 ? this.a = 0 : this.a > 1 && (this.a = 1), this;
  }
  static rgba8888ToColor(t, e) {
    t.r = ((e & 4278190080) >>> 24) / 255, t.g = ((e & 16711680) >>> 16) / 255, t.b = ((e & 65280) >>> 8) / 255, t.a = (e & 255) / 255;
  }
  static rgb888ToColor(t, e) {
    t.r = ((e & 16711680) >>> 16) / 255, t.g = ((e & 65280) >>> 8) / 255, t.b = (e & 255) / 255;
  }
  toRgb888() {
    const t = (e) => ("0" + (e * 255).toString(16)).slice(-2);
    return +("0x" + t(this.r) + t(this.g) + t(this.b));
  }
  static fromString(t) {
    return new ft2().setFromString(t);
  }
};
u(ft, "WHITE", new ft(1, 1, 1, 1)), u(ft, "RED", new ft(1, 0, 0, 1)), u(ft, "GREEN", new ft(0, 1, 0, 1)), u(ft, "BLUE", new ft(0, 0, 1, 1)), u(ft, "MAGENTA", new ft(1, 0, 1, 1));
var q = ft;
var et = class et2 {
  static clamp(t, e, i) {
    return t < e ? e : t > i ? i : t;
  }
  static cosDeg(t) {
    return Math.cos(t * et2.degRad);
  }
  static sinDeg(t) {
    return Math.sin(t * et2.degRad);
  }
  static atan2Deg(t, e) {
    return Math.atan2(t, e) * et2.degRad;
  }
  static signum(t) {
    return t > 0 ? 1 : t < 0 ? -1 : 0;
  }
  static toInt(t) {
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  static cbrt(t) {
    let e = Math.pow(Math.abs(t), 0.3333333333333333);
    return t < 0 ? -e : e;
  }
  static randomTriangular(t, e) {
    return et2.randomTriangularWith(t, e, (t + e) * 0.5);
  }
  static randomTriangularWith(t, e, i) {
    let s = Math.random(), n = e - t;
    return s <= (i - t) / n ? t + Math.sqrt(s * n * (i - t)) : e - Math.sqrt((1 - s) * n * (e - i));
  }
  static isPowerOfTwo(t) {
    return t && (t & t - 1) === 0;
  }
};
u(et, "PI", 3.1415927), u(et, "PI2", et.PI * 2), u(et, "invPI2", 1 / et.PI2), u(et, "radiansToDegrees", 180 / et.PI), u(et, "radDeg", et.radiansToDegrees), u(et, "degreesToRadians", et.PI / 180), u(et, "degRad", et.degreesToRadians);
var B = et;
var Tt = class Tt2 {
  static arrayCopy(t, e, i, s, n) {
    for (let o = e, a = s; o < e + n; o++, a++)
      i[a] = t[o];
  }
  static arrayFill(t, e, i, s) {
    for (let n = e; n < i; n++)
      t[n] = s;
  }
  static setArraySize(t, e, i = 0) {
    let s = t.length;
    if (s == e)
      return t;
    if (t.length = e, s < e)
      for (let n = s; n < e; n++)
        t[n] = i;
    return t;
  }
  static ensureArrayCapacity(t, e, i = 0) {
    return t.length >= e ? t : Tt2.setArraySize(t, e, i);
  }
  static newArray(t, e) {
    let i = new Array(t);
    for (let s = 0; s < t; s++)
      i[s] = e;
    return i;
  }
  static newFloatArray(t) {
    if (Tt2.SUPPORTS_TYPED_ARRAYS)
      return new Float32Array(t);
    {
      let e = new Array(t);
      for (let i = 0; i < e.length; i++)
        e[i] = 0;
      return e;
    }
  }
  static newShortArray(t) {
    if (Tt2.SUPPORTS_TYPED_ARRAYS)
      return new Int16Array(t);
    {
      let e = new Array(t);
      for (let i = 0; i < e.length; i++)
        e[i] = 0;
      return e;
    }
  }
  static toFloatArray(t) {
    return Tt2.SUPPORTS_TYPED_ARRAYS ? new Float32Array(t) : t;
  }
  static toSinglePrecision(t) {
    return Tt2.SUPPORTS_TYPED_ARRAYS ? Math.fround(t) : t;
  }
  // This function is used to fix WebKit 602 specific issue described at http://esotericsoftware.com/forum/iOS-10-disappearing-graphics-10109
  static webkit602BugfixHelper(t, e) {
  }
  static contains(t, e, i = true) {
    for (var s = 0; s < t.length; s++)
      if (t[s] == e)
        return true;
    return false;
  }
  static enumValue(t, e) {
    return t[e[0].toUpperCase() + e.slice(1)];
  }
};
u(Tt, "SUPPORTS_TYPED_ARRAYS", typeof Float32Array < "u");
var V = Tt;
var jt = class {
  constructor(t) {
    u(this, "items", new Array());
    u(this, "instantiator");
    this.instantiator = t;
  }
  obtain() {
    return this.items.length > 0 ? this.items.pop() : this.instantiator();
  }
  free(t) {
    t.reset && t.reset(), this.items.push(t);
  }
  freeAll(t) {
    for (let e = 0; e < t.length; e++)
      this.free(t[e]);
  }
  clear() {
    this.items.length = 0;
  }
};
var ie = class {
  constructor(t = 0, e = 0) {
    u(this, "x");
    u(this, "y");
    this.x = t, this.y = e;
  }
  set(t, e) {
    return this.x = t, this.y = e, this;
  }
  length() {
    let t = this.x, e = this.y;
    return Math.sqrt(t * t + e * e);
  }
  normalize() {
    let t = this.length();
    return t != 0 && (this.x /= t, this.y /= t), this;
  }
};
var Ke = class {
  constructor(t) {
    u(this, "name");
    if (!t)
      throw new Error("name cannot be null.");
    this.name = t;
  }
};
var ue = class ue2 extends Ke {
  constructor(e) {
    super(e);
    u(this, "id", ue2.nextID++);
    u(this, "bones", null);
    u(this, "vertices", []);
    u(this, "worldVerticesLength", 0);
    u(this, "timelineAttachment", this);
  }
  /** Transforms the attachment's local {@link #vertices} to world coordinates. If the slot's {@link Slot#deform} is
   * not empty, it is used to deform the vertices.
   *
   * See [World transforms](http://esotericsoftware.com/spine-runtime-skeletons#World-transforms) in the Spine
   * Runtimes Guide.
   * @param start The index of the first {@link #vertices} value to transform. Each vertex has 2 values, x and y.
   * @param count The number of world vertex values to output. Must be <= {@link #worldVerticesLength} - `start`.
   * @param worldVertices The output world vertices. Must have a length >= `offset` + `count` *
   *           `stride` / 2.
   * @param offset The `worldVertices` index to begin writing values.
   * @param stride The number of `worldVertices` entries between the value pairs written. */
  computeWorldVertices(e, i, s, n, o, a) {
    s = o + (s >> 1) * a;
    let h = e.bone.skeleton, r = e.deform, l = this.vertices, c = this.bones;
    if (!c) {
      r.length > 0 && (l = r);
      let g = e.bone, b = g.worldX, w = g.worldY, v = g.a, x = g.b, p = g.c, S = g.d;
      for (let y = i, A = o; A < s; y += 2, A += a) {
        let C = l[y], M = l[y + 1];
        n[A] = C * v + M * x + b, n[A + 1] = C * p + M * S + w;
      }
      return;
    }
    let f = 0, d = 0;
    for (let g = 0; g < i; g += 2) {
      let b = c[f];
      f += b + 1, d += b;
    }
    let m = h.bones;
    if (r.length == 0)
      for (let g = o, b = d * 3; g < s; g += a) {
        let w = 0, v = 0, x = c[f++];
        for (x += f; f < x; f++, b += 3) {
          let p = m[c[f]], S = l[b], y = l[b + 1], A = l[b + 2];
          w += (S * p.a + y * p.b + p.worldX) * A, v += (S * p.c + y * p.d + p.worldY) * A;
        }
        n[g] = w, n[g + 1] = v;
      }
    else {
      let g = r;
      for (let b = o, w = d * 3, v = d << 1; b < s; b += a) {
        let x = 0, p = 0, S = c[f++];
        for (S += f; f < S; f++, w += 3, v += 2) {
          let y = m[c[f]], A = l[w] + g[v], C = l[w + 1] + g[v + 1], M = l[w + 2];
          x += (A * y.a + C * y.b + y.worldX) * M, p += (A * y.c + C * y.d + y.worldY) * M;
        }
        n[b] = x, n[b + 1] = p;
      }
    }
  }
  /** Does not copy id (generated) or name (set on construction). **/
  copyTo(e) {
    this.bones ? (e.bones = new Array(this.bones.length), V.arrayCopy(this.bones, 0, e.bones, 0, this.bones.length)) : e.bones = null, this.vertices && (e.vertices = V.newFloatArray(this.vertices.length), V.arrayCopy(this.vertices, 0, e.vertices, 0, this.vertices.length)), e.worldVerticesLength = this.worldVerticesLength, e.timelineAttachment = this.timelineAttachment;
  }
};
u(ue, "nextID", 0);
var yt = ue;
var Nt = class Nt2 {
  constructor(t) {
    u(this, "id", Nt2.nextID());
    u(this, "regions");
    u(this, "start", 0);
    u(this, "digits", 0);
    u(this, "setupIndex", 0);
    this.regions = new Array(t);
  }
  copy() {
    let t = new Nt2(this.regions.length);
    return V.arrayCopy(this.regions, 0, t.regions, 0, this.regions.length), t.start = this.start, t.digits = this.digits, t.setupIndex = this.setupIndex, t;
  }
  apply(t, e) {
    let i = t.sequenceIndex;
    i == -1 && (i = this.setupIndex), i >= this.regions.length && (i = this.regions.length - 1);
    let s = this.regions[i];
    e.region != s && (e.region = s, e.updateRegion());
  }
  getPath(t, e) {
    let i = t, s = (this.start + e).toString();
    for (let n = this.digits - s.length; n > 0; n--)
      i += "0";
    return i += s, i;
  }
  static nextID() {
    return Nt2._nextID++;
  }
};
u(Nt, "_nextID", 0);
var re = Nt;
var rt;
(function(k) {
  k[k.hold = 0] = "hold", k[k.once = 1] = "once", k[k.loop = 2] = "loop", k[k.pingpong = 3] = "pingpong", k[k.onceReverse = 4] = "onceReverse", k[k.loopReverse = 5] = "loopReverse", k[k.pingpongReverse = 6] = "pingpongReverse";
})(rt || (rt = {}));
var Qe = [
  rt.hold,
  rt.once,
  rt.loop,
  rt.pingpong,
  rt.onceReverse,
  rt.loopReverse,
  rt.pingpongReverse
];
var Te = class {
  constructor(t, e, i) {
    u(this, "name");
    u(this, "timelines", []);
    u(this, "timelineIds", new _e());
    u(this, "duration");
    if (!t)
      throw new Error("name cannot be null.");
    this.name = t, this.setTimelines(e), this.duration = i;
  }
  setTimelines(t) {
    if (!t)
      throw new Error("timelines cannot be null.");
    this.timelines = t, this.timelineIds.clear();
    for (var e = 0; e < t.length; e++)
      this.timelineIds.addAll(t[e].getPropertyIds());
  }
  hasTimeline(t) {
    for (let e = 0; e < t.length; e++)
      if (this.timelineIds.contains(t[e]))
        return true;
    return false;
  }
  /** Applies all the animation's timelines to the specified skeleton.
   *
   * See Timeline {@link Timeline#apply(Skeleton, float, float, Array, float, MixBlend, MixDirection)}.
   * @param loop If true, the animation repeats after {@link #getDuration()}.
   * @param events May be null to ignore fired events. */
  apply(t, e, i, s, n, o, a, h) {
    if (!t)
      throw new Error("skeleton cannot be null.");
    s && this.duration != 0 && (i %= this.duration, e > 0 && (e %= this.duration));
    let r = this.timelines;
    for (let l = 0, c = r.length; l < c; l++)
      r[l].apply(t, e, i, n, o, a, h);
  }
};
var E;
(function(k) {
  k[k.setup = 0] = "setup", k[k.first = 1] = "first", k[k.replace = 2] = "replace", k[k.add = 3] = "add";
})(E || (E = {}));
var ot;
(function(k) {
  k[k.mixIn = 0] = "mixIn", k[k.mixOut = 1] = "mixOut";
})(ot || (ot = {}));
var W = {
  rotate: 0,
  x: 1,
  y: 2,
  scaleX: 3,
  scaleY: 4,
  shearX: 5,
  shearY: 6,
  inherit: 7,
  rgb: 8,
  alpha: 9,
  rgb2: 10,
  attachment: 11,
  deform: 12,
  event: 13,
  drawOrder: 14,
  ikConstraint: 15,
  transformConstraint: 16,
  pathConstraintPosition: 17,
  pathConstraintSpacing: 18,
  pathConstraintMix: 19,
  physicsConstraintInertia: 20,
  physicsConstraintStrength: 21,
  physicsConstraintDamping: 22,
  physicsConstraintMass: 23,
  physicsConstraintWind: 24,
  physicsConstraintGravity: 25,
  physicsConstraintMix: 26,
  physicsConstraintReset: 27,
  sequence: 28
};
var J = class {
  constructor(t, e) {
    u(this, "propertyIds");
    u(this, "frames");
    this.propertyIds = e, this.frames = V.newFloatArray(t * this.getFrameEntries());
  }
  getPropertyIds() {
    return this.propertyIds;
  }
  getFrameEntries() {
    return 1;
  }
  getFrameCount() {
    return this.frames.length / this.getFrameEntries();
  }
  getDuration() {
    return this.frames[this.frames.length - this.getFrameEntries()];
  }
  static search1(t, e) {
    let i = t.length;
    for (let s = 1; s < i; s++)
      if (t[s] > e)
        return s - 1;
    return i - 1;
  }
  static search(t, e, i) {
    let s = t.length;
    for (let n = i; n < s; n += i)
      if (t[n] > e)
        return n - i;
    return s - i;
  }
};
var Ct = class extends J {
  // type, x, y, ...
  constructor(e, i, s) {
    super(e, s);
    u(this, "curves");
    this.curves = V.newFloatArray(
      e + i * 18
      /*BEZIER_SIZE*/
    ), this.curves[e - 1] = 1;
  }
  /** Sets the specified key frame to linear interpolation. */
  setLinear(e) {
    this.curves[e] = 0;
  }
  /** Sets the specified key frame to stepped interpolation. */
  setStepped(e) {
    this.curves[e] = 1;
  }
  /** Shrinks the storage for Bezier curves, for use when <code>bezierCount</code> (specified in the constructor) was larger
   * than the actual number of Bezier curves. */
  shrink(e) {
    let i = this.getFrameCount() + e * 18;
    if (this.curves.length > i) {
      let s = V.newFloatArray(i);
      V.arrayCopy(this.curves, 0, s, 0, i), this.curves = s;
    }
  }
  /** Stores the segments for the specified Bezier curve. For timelines that modify multiple values, there may be more than
   * one curve per frame.
   * @param bezier The ordinal of this Bezier curve for this timeline, between 0 and <code>bezierCount - 1</code> (specified
   *           in the constructor), inclusive.
   * @param frame Between 0 and <code>frameCount - 1</code>, inclusive.
   * @param value The index of the value for this frame that this curve is used for.
   * @param time1 The time for the first key.
   * @param value1 The value for the first key.
   * @param cx1 The time for the first Bezier handle.
   * @param cy1 The value for the first Bezier handle.
   * @param cx2 The time of the second Bezier handle.
   * @param cy2 The value for the second Bezier handle.
   * @param time2 The time for the second key.
   * @param value2 The value for the second key. */
  setBezier(e, i, s, n, o, a, h, r, l, c, f) {
    let d = this.curves, m = this.getFrameCount() + e * 18;
    s == 0 && (d[i] = 2 + m);
    let g = (n - a * 2 + r) * 0.03, b = (o - h * 2 + l) * 0.03, w = ((a - r) * 3 - n + c) * 6e-3, v = ((h - l) * 3 - o + f) * 6e-3, x = g * 2 + w, p = b * 2 + v, S = (a - n) * 0.3 + g + w * 0.16666667, y = (h - o) * 0.3 + b + v * 0.16666667, A = n + S, C = o + y;
    for (let M = m + 18; m < M; m += 2)
      d[m] = A, d[m + 1] = C, S += x, y += p, x += w, p += v, A += S, C += y;
  }
  /** Returns the Bezier interpolated value for the specified time.
   * @param frameIndex The index into {@link #getFrames()} for the values of the frame before <code>time</code>.
   * @param valueOffset The offset from <code>frameIndex</code> to the value this curve is used for.
   * @param i The index of the Bezier segments. See {@link #getCurveType(int)}. */
  getBezierValue(e, i, s, n) {
    let o = this.curves;
    if (o[n] > e) {
      let l = this.frames[i], c = this.frames[i + s];
      return c + (e - l) / (o[n] - l) * (o[n + 1] - c);
    }
    let a = n + 18;
    for (n += 2; n < a; n += 2)
      if (o[n] >= e) {
        let l = o[n - 2], c = o[n - 1];
        return c + (e - l) / (o[n] - l) * (o[n + 1] - c);
      }
    i += this.getFrameEntries();
    let h = o[a - 2], r = o[a - 1];
    return r + (e - h) / (this.frames[i] - h) * (this.frames[i + s] - r);
  }
};
var vt = class extends Ct {
  constructor(t, e, i) {
    super(t, e, [i]);
  }
  getFrameEntries() {
    return 2;
  }
  /** Sets the time and value for the specified frame.
   * @param frame Between 0 and <code>frameCount</code>, inclusive.
   * @param time The frame time in seconds. */
  setFrame(t, e, i) {
    t <<= 1, this.frames[t] = e, this.frames[
      t + 1
      /*VALUE*/
    ] = i;
  }
  /** Returns the interpolated value for the specified time. */
  getCurveValue(t) {
    let e = this.frames, i = e.length - 2;
    for (let n = 2; n <= i; n += 2)
      if (e[n] > t) {
        i = n - 2;
        break;
      }
    let s = this.curves[i >> 1];
    switch (s) {
      case 0:
        let n = e[i], o = e[
          i + 1
          /*VALUE*/
        ];
        return o + (t - n) / (e[
          i + 2
          /*ENTRIES*/
        ] - n) * (e[
          i + 2 + 1
          /*VALUE*/
        ] - o);
      case 1:
        return e[
          i + 1
          /*VALUE*/
        ];
    }
    return this.getBezierValue(
      t,
      i,
      1,
      s - 2
      /*BEZIER*/
    );
  }
  getRelativeValue(t, e, i, s, n) {
    if (t < this.frames[0]) {
      switch (i) {
        case E.setup:
          return n;
        case E.first:
          return s + (n - s) * e;
      }
      return s;
    }
    let o = this.getCurveValue(t);
    switch (i) {
      case E.setup:
        return n + o * e;
      case E.first:
      case E.replace:
        o += n - s;
    }
    return s + o * e;
  }
  getAbsoluteValue(t, e, i, s, n) {
    if (t < this.frames[0]) {
      switch (i) {
        case E.setup:
          return n;
        case E.first:
          return s + (n - s) * e;
      }
      return s;
    }
    let o = this.getCurveValue(t);
    return i == E.setup ? n + (o - n) * e : s + (o - s) * e;
  }
  getAbsoluteValue2(t, e, i, s, n, o) {
    if (t < this.frames[0]) {
      switch (i) {
        case E.setup:
          return n;
        case E.first:
          return s + (n - s) * e;
      }
      return s;
    }
    return i == E.setup ? n + (o - n) * e : s + (o - s) * e;
  }
  getScaleValue(t, e, i, s, n, o) {
    const a = this.frames;
    if (t < a[0]) {
      switch (i) {
        case E.setup:
          return o;
        case E.first:
          return n + (o - n) * e;
      }
      return n;
    }
    let h = this.getCurveValue(t) * o;
    if (e == 1)
      return i == E.add ? n + h - o : h;
    if (s == ot.mixOut)
      switch (i) {
        case E.setup:
          return o + (Math.abs(h) * B.signum(o) - o) * e;
        case E.first:
        case E.replace:
          return n + (Math.abs(h) * B.signum(n) - n) * e;
      }
    else {
      let r = 0;
      switch (i) {
        case E.setup:
          return r = Math.abs(o) * B.signum(h), r + (h - r) * e;
        case E.first:
        case E.replace:
          return r = Math.abs(n) * B.signum(h), r + (h - r) * e;
      }
    }
    return n + (h - o) * e;
  }
};
var Fe = class extends Ct {
  /** @param bezierCount The maximum number of Bezier curves. See {@link #shrink(int)}.
   * @param propertyIds Unique identifiers for the properties the timeline modifies. */
  constructor(t, e, i, s) {
    super(t, e, [i, s]);
  }
  getFrameEntries() {
    return 3;
  }
  /** Sets the time and values for the specified frame.
   * @param frame Between 0 and <code>frameCount</code>, inclusive.
   * @param time The frame time in seconds. */
  setFrame(t, e, i, s) {
    t *= 3, this.frames[t] = e, this.frames[
      t + 1
      /*VALUE1*/
    ] = i, this.frames[
      t + 2
      /*VALUE2*/
    ] = s;
  }
};
var ne = class extends vt {
  constructor(e, i, s) {
    super(e, i, W.rotate + "|" + s);
    u(this, "boneIndex", 0);
    this.boneIndex = s;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.bones[this.boneIndex];
    r.active && (r.rotation = this.getRelativeValue(s, o, a, r.rotation, r.data.rotation));
  }
};
var Je = class extends Fe {
  constructor(e, i, s) {
    super(e, i, W.x + "|" + s, W.y + "|" + s);
    u(this, "boneIndex", 0);
    this.boneIndex = s;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.bones[this.boneIndex];
    if (!r.active)
      return;
    let l = this.frames;
    if (s < l[0]) {
      switch (a) {
        case E.setup:
          r.x = r.data.x, r.y = r.data.y;
          return;
        case E.first:
          r.x += (r.data.x - r.x) * o, r.y += (r.data.y - r.y) * o;
      }
      return;
    }
    let c = 0, f = 0, d = J.search(
      l,
      s,
      3
      /*ENTRIES*/
    ), m = this.curves[
      d / 3
      /*ENTRIES*/
    ];
    switch (m) {
      case 0:
        let g = l[d];
        c = l[
          d + 1
          /*VALUE1*/
        ], f = l[
          d + 2
          /*VALUE2*/
        ];
        let b = (s - g) / (l[
          d + 3
          /*ENTRIES*/
        ] - g);
        c += (l[
          d + 3 + 1
          /*VALUE1*/
        ] - c) * b, f += (l[
          d + 3 + 2
          /*VALUE2*/
        ] - f) * b;
        break;
      case 1:
        c = l[
          d + 1
          /*VALUE1*/
        ], f = l[
          d + 2
          /*VALUE2*/
        ];
        break;
      default:
        c = this.getBezierValue(
          s,
          d,
          1,
          m - 2
          /*BEZIER*/
        ), f = this.getBezierValue(
          s,
          d,
          2,
          m + 18 - 2
          /*BEZIER*/
        );
    }
    switch (a) {
      case E.setup:
        r.x = r.data.x + c * o, r.y = r.data.y + f * o;
        break;
      case E.first:
      case E.replace:
        r.x += (r.data.x + c - r.x) * o, r.y += (r.data.y + f - r.y) * o;
        break;
      case E.add:
        r.x += c * o, r.y += f * o;
    }
  }
};
var Ze = class extends vt {
  constructor(e, i, s) {
    super(e, i, W.x + "|" + s);
    u(this, "boneIndex", 0);
    this.boneIndex = s;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.bones[this.boneIndex];
    r.active && (r.x = this.getRelativeValue(s, o, a, r.x, r.data.x));
  }
};
var ts = class extends vt {
  constructor(e, i, s) {
    super(e, i, W.y + "|" + s);
    u(this, "boneIndex", 0);
    this.boneIndex = s;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.bones[this.boneIndex];
    r.active && (r.y = this.getRelativeValue(s, o, a, r.y, r.data.y));
  }
};
var es = class extends Fe {
  constructor(e, i, s) {
    super(e, i, W.scaleX + "|" + s, W.scaleY + "|" + s);
    u(this, "boneIndex", 0);
    this.boneIndex = s;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.bones[this.boneIndex];
    if (!r.active)
      return;
    let l = this.frames;
    if (s < l[0]) {
      switch (a) {
        case E.setup:
          r.scaleX = r.data.scaleX, r.scaleY = r.data.scaleY;
          return;
        case E.first:
          r.scaleX += (r.data.scaleX - r.scaleX) * o, r.scaleY += (r.data.scaleY - r.scaleY) * o;
      }
      return;
    }
    let c, f, d = J.search(
      l,
      s,
      3
      /*ENTRIES*/
    ), m = this.curves[
      d / 3
      /*ENTRIES*/
    ];
    switch (m) {
      case 0:
        let g = l[d];
        c = l[
          d + 1
          /*VALUE1*/
        ], f = l[
          d + 2
          /*VALUE2*/
        ];
        let b = (s - g) / (l[
          d + 3
          /*ENTRIES*/
        ] - g);
        c += (l[
          d + 3 + 1
          /*VALUE1*/
        ] - c) * b, f += (l[
          d + 3 + 2
          /*VALUE2*/
        ] - f) * b;
        break;
      case 1:
        c = l[
          d + 1
          /*VALUE1*/
        ], f = l[
          d + 2
          /*VALUE2*/
        ];
        break;
      default:
        c = this.getBezierValue(
          s,
          d,
          1,
          m - 2
          /*BEZIER*/
        ), f = this.getBezierValue(
          s,
          d,
          2,
          m + 18 - 2
          /*BEZIER*/
        );
    }
    if (c *= r.data.scaleX, f *= r.data.scaleY, o == 1)
      a == E.add ? (r.scaleX += c - r.data.scaleX, r.scaleY += f - r.data.scaleY) : (r.scaleX = c, r.scaleY = f);
    else {
      let g = 0, b = 0;
      if (h == ot.mixOut)
        switch (a) {
          case E.setup:
            g = r.data.scaleX, b = r.data.scaleY, r.scaleX = g + (Math.abs(c) * B.signum(g) - g) * o, r.scaleY = b + (Math.abs(f) * B.signum(b) - b) * o;
            break;
          case E.first:
          case E.replace:
            g = r.scaleX, b = r.scaleY, r.scaleX = g + (Math.abs(c) * B.signum(g) - g) * o, r.scaleY = b + (Math.abs(f) * B.signum(b) - b) * o;
            break;
          case E.add:
            r.scaleX += (c - r.data.scaleX) * o, r.scaleY += (f - r.data.scaleY) * o;
        }
      else
        switch (a) {
          case E.setup:
            g = Math.abs(r.data.scaleX) * B.signum(c), b = Math.abs(r.data.scaleY) * B.signum(f), r.scaleX = g + (c - g) * o, r.scaleY = b + (f - b) * o;
            break;
          case E.first:
          case E.replace:
            g = Math.abs(r.scaleX) * B.signum(c), b = Math.abs(r.scaleY) * B.signum(f), r.scaleX = g + (c - g) * o, r.scaleY = b + (f - b) * o;
            break;
          case E.add:
            r.scaleX += (c - r.data.scaleX) * o, r.scaleY += (f - r.data.scaleY) * o;
        }
    }
  }
};
var ss = class extends vt {
  constructor(e, i, s) {
    super(e, i, W.scaleX + "|" + s);
    u(this, "boneIndex", 0);
    this.boneIndex = s;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.bones[this.boneIndex];
    r.active && (r.scaleX = this.getScaleValue(s, o, a, h, r.scaleX, r.data.scaleX));
  }
};
var is = class extends vt {
  constructor(e, i, s) {
    super(e, i, W.scaleY + "|" + s);
    u(this, "boneIndex", 0);
    this.boneIndex = s;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.bones[this.boneIndex];
    r.active && (r.scaleY = this.getScaleValue(s, o, a, h, r.scaleY, r.data.scaleY));
  }
};
var rs = class extends Fe {
  constructor(e, i, s) {
    super(e, i, W.shearX + "|" + s, W.shearY + "|" + s);
    u(this, "boneIndex", 0);
    this.boneIndex = s;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.bones[this.boneIndex];
    if (!r.active)
      return;
    let l = this.frames;
    if (s < l[0]) {
      switch (a) {
        case E.setup:
          r.shearX = r.data.shearX, r.shearY = r.data.shearY;
          return;
        case E.first:
          r.shearX += (r.data.shearX - r.shearX) * o, r.shearY += (r.data.shearY - r.shearY) * o;
      }
      return;
    }
    let c = 0, f = 0, d = J.search(
      l,
      s,
      3
      /*ENTRIES*/
    ), m = this.curves[
      d / 3
      /*ENTRIES*/
    ];
    switch (m) {
      case 0:
        let g = l[d];
        c = l[
          d + 1
          /*VALUE1*/
        ], f = l[
          d + 2
          /*VALUE2*/
        ];
        let b = (s - g) / (l[
          d + 3
          /*ENTRIES*/
        ] - g);
        c += (l[
          d + 3 + 1
          /*VALUE1*/
        ] - c) * b, f += (l[
          d + 3 + 2
          /*VALUE2*/
        ] - f) * b;
        break;
      case 1:
        c = l[
          d + 1
          /*VALUE1*/
        ], f = l[
          d + 2
          /*VALUE2*/
        ];
        break;
      default:
        c = this.getBezierValue(
          s,
          d,
          1,
          m - 2
          /*BEZIER*/
        ), f = this.getBezierValue(
          s,
          d,
          2,
          m + 18 - 2
          /*BEZIER*/
        );
    }
    switch (a) {
      case E.setup:
        r.shearX = r.data.shearX + c * o, r.shearY = r.data.shearY + f * o;
        break;
      case E.first:
      case E.replace:
        r.shearX += (r.data.shearX + c - r.shearX) * o, r.shearY += (r.data.shearY + f - r.shearY) * o;
        break;
      case E.add:
        r.shearX += c * o, r.shearY += f * o;
    }
  }
};
var ns = class extends vt {
  constructor(e, i, s) {
    super(e, i, W.shearX + "|" + s);
    u(this, "boneIndex", 0);
    this.boneIndex = s;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.bones[this.boneIndex];
    r.active && (r.shearX = this.getRelativeValue(s, o, a, r.shearX, r.data.shearX));
  }
};
var as = class extends vt {
  constructor(e, i, s) {
    super(e, i, W.shearY + "|" + s);
    u(this, "boneIndex", 0);
    this.boneIndex = s;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.bones[this.boneIndex];
    r.active && (r.shearY = this.getRelativeValue(s, o, a, r.shearY, r.data.shearY));
  }
};
var ls = class extends J {
  constructor(e, i) {
    super(e, [W.inherit + "|" + i]);
    u(this, "boneIndex", 0);
    this.boneIndex = i;
  }
  getFrameEntries() {
    return 2;
  }
  /** Sets the transform mode for the specified frame.
   * @param frame Between 0 and <code>frameCount</code>, inclusive.
   * @param time The frame time in seconds. */
  setFrame(e, i, s) {
    e *= 2, this.frames[e] = i, this.frames[
      e + 1
      /*INHERIT*/
    ] = s;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.bones[this.boneIndex];
    if (!r.active)
      return;
    if (h == ot.mixOut) {
      a == E.setup && (r.inherit = r.data.inherit);
      return;
    }
    let l = this.frames;
    if (s < l[0]) {
      (a == E.setup || a == E.first) && (r.inherit = r.data.inherit);
      return;
    }
    r.inherit = this.frames[
      J.search(
        l,
        s,
        2
        /*ENTRIES*/
      ) + 1
      /*INHERIT*/
    ];
  }
};
var os = class extends Ct {
  constructor(e, i, s) {
    super(e, i, [
      W.rgb + "|" + s,
      W.alpha + "|" + s
    ]);
    u(this, "slotIndex", 0);
    this.slotIndex = s;
  }
  getFrameEntries() {
    return 5;
  }
  /** Sets the time in seconds, red, green, blue, and alpha for the specified key frame. */
  setFrame(e, i, s, n, o, a) {
    e *= 5, this.frames[e] = i, this.frames[
      e + 1
      /*R*/
    ] = s, this.frames[
      e + 2
      /*G*/
    ] = n, this.frames[
      e + 3
      /*B*/
    ] = o, this.frames[
      e + 4
      /*A*/
    ] = a;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.slots[this.slotIndex];
    if (!r.bone.active)
      return;
    let l = this.frames, c = r.color;
    if (s < l[0]) {
      let v = r.data.color;
      switch (a) {
        case E.setup:
          c.setFromColor(v);
          return;
        case E.first:
          c.add((v.r - c.r) * o, (v.g - c.g) * o, (v.b - c.b) * o, (v.a - c.a) * o);
      }
      return;
    }
    let f = 0, d = 0, m = 0, g = 0, b = J.search(
      l,
      s,
      5
      /*ENTRIES*/
    ), w = this.curves[
      b / 5
      /*ENTRIES*/
    ];
    switch (w) {
      case 0:
        let v = l[b];
        f = l[
          b + 1
          /*R*/
        ], d = l[
          b + 2
          /*G*/
        ], m = l[
          b + 3
          /*B*/
        ], g = l[
          b + 4
          /*A*/
        ];
        let x = (s - v) / (l[
          b + 5
          /*ENTRIES*/
        ] - v);
        f += (l[
          b + 5 + 1
          /*R*/
        ] - f) * x, d += (l[
          b + 5 + 2
          /*G*/
        ] - d) * x, m += (l[
          b + 5 + 3
          /*B*/
        ] - m) * x, g += (l[
          b + 5 + 4
          /*A*/
        ] - g) * x;
        break;
      case 1:
        f = l[
          b + 1
          /*R*/
        ], d = l[
          b + 2
          /*G*/
        ], m = l[
          b + 3
          /*B*/
        ], g = l[
          b + 4
          /*A*/
        ];
        break;
      default:
        f = this.getBezierValue(
          s,
          b,
          1,
          w - 2
          /*BEZIER*/
        ), d = this.getBezierValue(
          s,
          b,
          2,
          w + 18 - 2
          /*BEZIER*/
        ), m = this.getBezierValue(
          s,
          b,
          3,
          w + 18 * 2 - 2
          /*BEZIER*/
        ), g = this.getBezierValue(
          s,
          b,
          4,
          w + 18 * 3 - 2
          /*BEZIER*/
        );
    }
    o == 1 ? c.set(f, d, m, g) : (a == E.setup && c.setFromColor(r.data.color), c.add((f - c.r) * o, (d - c.g) * o, (m - c.b) * o, (g - c.a) * o));
  }
};
var hs = class extends Ct {
  constructor(e, i, s) {
    super(e, i, [
      W.rgb + "|" + s
    ]);
    u(this, "slotIndex", 0);
    this.slotIndex = s;
  }
  getFrameEntries() {
    return 4;
  }
  /** Sets the time in seconds, red, green, blue, and alpha for the specified key frame. */
  setFrame(e, i, s, n, o) {
    e <<= 2, this.frames[e] = i, this.frames[
      e + 1
      /*R*/
    ] = s, this.frames[
      e + 2
      /*G*/
    ] = n, this.frames[
      e + 3
      /*B*/
    ] = o;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.slots[this.slotIndex];
    if (!r.bone.active)
      return;
    let l = this.frames, c = r.color;
    if (s < l[0]) {
      let w = r.data.color;
      switch (a) {
        case E.setup:
          c.r = w.r, c.g = w.g, c.b = w.b;
          return;
        case E.first:
          c.r += (w.r - c.r) * o, c.g += (w.g - c.g) * o, c.b += (w.b - c.b) * o;
      }
      return;
    }
    let f = 0, d = 0, m = 0, g = J.search(
      l,
      s,
      4
      /*ENTRIES*/
    ), b = this.curves[g >> 2];
    switch (b) {
      case 0:
        let w = l[g];
        f = l[
          g + 1
          /*R*/
        ], d = l[
          g + 2
          /*G*/
        ], m = l[
          g + 3
          /*B*/
        ];
        let v = (s - w) / (l[
          g + 4
          /*ENTRIES*/
        ] - w);
        f += (l[
          g + 4 + 1
          /*R*/
        ] - f) * v, d += (l[
          g + 4 + 2
          /*G*/
        ] - d) * v, m += (l[
          g + 4 + 3
          /*B*/
        ] - m) * v;
        break;
      case 1:
        f = l[
          g + 1
          /*R*/
        ], d = l[
          g + 2
          /*G*/
        ], m = l[
          g + 3
          /*B*/
        ];
        break;
      default:
        f = this.getBezierValue(
          s,
          g,
          1,
          b - 2
          /*BEZIER*/
        ), d = this.getBezierValue(
          s,
          g,
          2,
          b + 18 - 2
          /*BEZIER*/
        ), m = this.getBezierValue(
          s,
          g,
          3,
          b + 18 * 2 - 2
          /*BEZIER*/
        );
    }
    if (o == 1)
      c.r = f, c.g = d, c.b = m;
    else {
      if (a == E.setup) {
        let w = r.data.color;
        c.r = w.r, c.g = w.g, c.b = w.b;
      }
      c.r += (f - c.r) * o, c.g += (d - c.g) * o, c.b += (m - c.b) * o;
    }
  }
};
var cs = class extends vt {
  constructor(e, i, s) {
    super(e, i, W.alpha + "|" + s);
    u(this, "slotIndex", 0);
    this.slotIndex = s;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.slots[this.slotIndex];
    if (!r.bone.active)
      return;
    let l = r.color;
    if (s < this.frames[0]) {
      let f = r.data.color;
      switch (a) {
        case E.setup:
          l.a = f.a;
          return;
        case E.first:
          l.a += (f.a - l.a) * o;
      }
      return;
    }
    let c = this.getCurveValue(s);
    o == 1 ? l.a = c : (a == E.setup && (l.a = r.data.color.a), l.a += (c - l.a) * o);
  }
};
var ds = class extends Ct {
  constructor(e, i, s) {
    super(e, i, [
      W.rgb + "|" + s,
      W.alpha + "|" + s,
      W.rgb2 + "|" + s
    ]);
    u(this, "slotIndex", 0);
    this.slotIndex = s;
  }
  getFrameEntries() {
    return 8;
  }
  /** Sets the time in seconds, light, and dark colors for the specified key frame. */
  setFrame(e, i, s, n, o, a, h, r, l) {
    e <<= 3, this.frames[e] = i, this.frames[
      e + 1
      /*R*/
    ] = s, this.frames[
      e + 2
      /*G*/
    ] = n, this.frames[
      e + 3
      /*B*/
    ] = o, this.frames[
      e + 4
      /*A*/
    ] = a, this.frames[
      e + 5
      /*R2*/
    ] = h, this.frames[
      e + 6
      /*G2*/
    ] = r, this.frames[
      e + 7
      /*B2*/
    ] = l;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.slots[this.slotIndex];
    if (!r.bone.active)
      return;
    let l = this.frames, c = r.color, f = r.darkColor;
    if (s < l[0]) {
      let y = r.data.color, A = r.data.darkColor;
      switch (a) {
        case E.setup:
          c.setFromColor(y), f.r = A.r, f.g = A.g, f.b = A.b;
          return;
        case E.first:
          c.add((y.r - c.r) * o, (y.g - c.g) * o, (y.b - c.b) * o, (y.a - c.a) * o), f.r += (A.r - f.r) * o, f.g += (A.g - f.g) * o, f.b += (A.b - f.b) * o;
      }
      return;
    }
    let d = 0, m = 0, g = 0, b = 0, w = 0, v = 0, x = 0, p = J.search(
      l,
      s,
      8
      /*ENTRIES*/
    ), S = this.curves[p >> 3];
    switch (S) {
      case 0:
        let y = l[p];
        d = l[
          p + 1
          /*R*/
        ], m = l[
          p + 2
          /*G*/
        ], g = l[
          p + 3
          /*B*/
        ], b = l[
          p + 4
          /*A*/
        ], w = l[
          p + 5
          /*R2*/
        ], v = l[
          p + 6
          /*G2*/
        ], x = l[
          p + 7
          /*B2*/
        ];
        let A = (s - y) / (l[
          p + 8
          /*ENTRIES*/
        ] - y);
        d += (l[
          p + 8 + 1
          /*R*/
        ] - d) * A, m += (l[
          p + 8 + 2
          /*G*/
        ] - m) * A, g += (l[
          p + 8 + 3
          /*B*/
        ] - g) * A, b += (l[
          p + 8 + 4
          /*A*/
        ] - b) * A, w += (l[
          p + 8 + 5
          /*R2*/
        ] - w) * A, v += (l[
          p + 8 + 6
          /*G2*/
        ] - v) * A, x += (l[
          p + 8 + 7
          /*B2*/
        ] - x) * A;
        break;
      case 1:
        d = l[
          p + 1
          /*R*/
        ], m = l[
          p + 2
          /*G*/
        ], g = l[
          p + 3
          /*B*/
        ], b = l[
          p + 4
          /*A*/
        ], w = l[
          p + 5
          /*R2*/
        ], v = l[
          p + 6
          /*G2*/
        ], x = l[
          p + 7
          /*B2*/
        ];
        break;
      default:
        d = this.getBezierValue(
          s,
          p,
          1,
          S - 2
          /*BEZIER*/
        ), m = this.getBezierValue(
          s,
          p,
          2,
          S + 18 - 2
          /*BEZIER*/
        ), g = this.getBezierValue(
          s,
          p,
          3,
          S + 18 * 2 - 2
          /*BEZIER*/
        ), b = this.getBezierValue(
          s,
          p,
          4,
          S + 18 * 3 - 2
          /*BEZIER*/
        ), w = this.getBezierValue(
          s,
          p,
          5,
          S + 18 * 4 - 2
          /*BEZIER*/
        ), v = this.getBezierValue(
          s,
          p,
          6,
          S + 18 * 5 - 2
          /*BEZIER*/
        ), x = this.getBezierValue(
          s,
          p,
          7,
          S + 18 * 6 - 2
          /*BEZIER*/
        );
    }
    if (o == 1)
      c.set(d, m, g, b), f.r = w, f.g = v, f.b = x;
    else {
      if (a == E.setup) {
        c.setFromColor(r.data.color);
        let y = r.data.darkColor;
        f.r = y.r, f.g = y.g, f.b = y.b;
      }
      c.add((d - c.r) * o, (m - c.g) * o, (g - c.b) * o, (b - c.a) * o), f.r += (w - f.r) * o, f.g += (v - f.g) * o, f.b += (x - f.b) * o;
    }
  }
};
var fs = class extends Ct {
  constructor(e, i, s) {
    super(e, i, [
      W.rgb + "|" + s,
      W.rgb2 + "|" + s
    ]);
    u(this, "slotIndex", 0);
    this.slotIndex = s;
  }
  getFrameEntries() {
    return 7;
  }
  /** Sets the time in seconds, light, and dark colors for the specified key frame. */
  setFrame(e, i, s, n, o, a, h, r) {
    e *= 7, this.frames[e] = i, this.frames[
      e + 1
      /*R*/
    ] = s, this.frames[
      e + 2
      /*G*/
    ] = n, this.frames[
      e + 3
      /*B*/
    ] = o, this.frames[
      e + 4
      /*R2*/
    ] = a, this.frames[
      e + 5
      /*G2*/
    ] = h, this.frames[
      e + 6
      /*B2*/
    ] = r;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.slots[this.slotIndex];
    if (!r.bone.active)
      return;
    let l = this.frames, c = r.color, f = r.darkColor;
    if (s < l[0]) {
      let S = r.data.color, y = r.data.darkColor;
      switch (a) {
        case E.setup:
          c.r = S.r, c.g = S.g, c.b = S.b, f.r = y.r, f.g = y.g, f.b = y.b;
          return;
        case E.first:
          c.r += (S.r - c.r) * o, c.g += (S.g - c.g) * o, c.b += (S.b - c.b) * o, f.r += (y.r - f.r) * o, f.g += (y.g - f.g) * o, f.b += (y.b - f.b) * o;
      }
      return;
    }
    let d = 0, m = 0, g = 0, b = 0, w = 0, v = 0, x = J.search(
      l,
      s,
      7
      /*ENTRIES*/
    ), p = this.curves[
      x / 7
      /*ENTRIES*/
    ];
    switch (p) {
      case 0:
        let S = l[x];
        d = l[
          x + 1
          /*R*/
        ], m = l[
          x + 2
          /*G*/
        ], g = l[
          x + 3
          /*B*/
        ], b = l[
          x + 4
          /*R2*/
        ], w = l[
          x + 5
          /*G2*/
        ], v = l[
          x + 6
          /*B2*/
        ];
        let y = (s - S) / (l[
          x + 7
          /*ENTRIES*/
        ] - S);
        d += (l[
          x + 7 + 1
          /*R*/
        ] - d) * y, m += (l[
          x + 7 + 2
          /*G*/
        ] - m) * y, g += (l[
          x + 7 + 3
          /*B*/
        ] - g) * y, b += (l[
          x + 7 + 4
          /*R2*/
        ] - b) * y, w += (l[
          x + 7 + 5
          /*G2*/
        ] - w) * y, v += (l[
          x + 7 + 6
          /*B2*/
        ] - v) * y;
        break;
      case 1:
        d = l[
          x + 1
          /*R*/
        ], m = l[
          x + 2
          /*G*/
        ], g = l[
          x + 3
          /*B*/
        ], b = l[
          x + 4
          /*R2*/
        ], w = l[
          x + 5
          /*G2*/
        ], v = l[
          x + 6
          /*B2*/
        ];
        break;
      default:
        d = this.getBezierValue(
          s,
          x,
          1,
          p - 2
          /*BEZIER*/
        ), m = this.getBezierValue(
          s,
          x,
          2,
          p + 18 - 2
          /*BEZIER*/
        ), g = this.getBezierValue(
          s,
          x,
          3,
          p + 18 * 2 - 2
          /*BEZIER*/
        ), b = this.getBezierValue(
          s,
          x,
          4,
          p + 18 * 3 - 2
          /*BEZIER*/
        ), w = this.getBezierValue(
          s,
          x,
          5,
          p + 18 * 4 - 2
          /*BEZIER*/
        ), v = this.getBezierValue(
          s,
          x,
          6,
          p + 18 * 5 - 2
          /*BEZIER*/
        );
    }
    if (o == 1)
      c.r = d, c.g = m, c.b = g, f.r = b, f.g = w, f.b = v;
    else {
      if (a == E.setup) {
        let S = r.data.color, y = r.data.darkColor;
        c.r = S.r, c.g = S.g, c.b = S.b, f.r = y.r, f.g = y.g, f.b = y.b;
      }
      c.r += (d - c.r) * o, c.g += (m - c.g) * o, c.b += (g - c.b) * o, f.r += (b - f.r) * o, f.g += (w - f.g) * o, f.b += (v - f.b) * o;
    }
  }
};
var Lt = class extends J {
  constructor(e, i) {
    super(e, [
      W.attachment + "|" + i
    ]);
    u(this, "slotIndex", 0);
    u(this, "attachmentNames");
    this.slotIndex = i, this.attachmentNames = new Array(e);
  }
  getFrameCount() {
    return this.frames.length;
  }
  /** Sets the time in seconds and the attachment name for the specified key frame. */
  setFrame(e, i, s) {
    this.frames[e] = i, this.attachmentNames[e] = s;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.slots[this.slotIndex];
    if (r.bone.active) {
      if (h == ot.mixOut) {
        a == E.setup && this.setAttachment(e, r, r.data.attachmentName);
        return;
      }
      if (s < this.frames[0]) {
        (a == E.setup || a == E.first) && this.setAttachment(e, r, r.data.attachmentName);
        return;
      }
      this.setAttachment(e, r, this.attachmentNames[J.search1(this.frames, s)]);
    }
  }
  setAttachment(e, i, s) {
    i.setAttachment(s ? e.getAttachment(this.slotIndex, s) : null);
  }
};
var us = class extends Ct {
  constructor(e, i, s, n) {
    super(e, i, [
      W.deform + "|" + s + "|" + n.id
    ]);
    u(this, "slotIndex", 0);
    u(this, "attachment");
    u(this, "vertices");
    this.slotIndex = s, this.attachment = n, this.vertices = new Array(e);
  }
  getFrameCount() {
    return this.frames.length;
  }
  /** Sets the time in seconds and the vertices for the specified key frame.
   * @param vertices Vertex positions for an unweighted VertexAttachment, or deform offsets if it has weights. */
  setFrame(e, i, s) {
    this.frames[e] = i, this.vertices[e] = s;
  }
  /** @param value1 Ignored (0 is used for a deform timeline).
   * @param value2 Ignored (1 is used for a deform timeline). */
  setBezier(e, i, s, n, o, a, h, r, l, c, f) {
    let d = this.curves, m = this.getFrameCount() + e * 18;
    s == 0 && (d[i] = 2 + m);
    let g = (n - a * 2 + r) * 0.03, b = l * 0.03 - h * 0.06, w = ((a - r) * 3 - n + c) * 6e-3, v = (h - l + 0.33333333) * 0.018, x = g * 2 + w, p = b * 2 + v, S = (a - n) * 0.3 + g + w * 0.16666667, y = h * 0.3 + b + v * 0.16666667, A = n + S, C = y;
    for (let M = m + 18; m < M; m += 2)
      d[m] = A, d[m + 1] = C, S += x, y += p, x += w, p += v, A += S, C += y;
  }
  getCurvePercent(e, i) {
    let s = this.curves, n = s[i];
    switch (n) {
      case 0:
        let r = this.frames[i];
        return (e - r) / (this.frames[i + this.getFrameEntries()] - r);
      case 1:
        return 0;
    }
    if (n -= 2, s[n] > e) {
      let r = this.frames[i];
      return s[n + 1] * (e - r) / (s[n] - r);
    }
    let o = n + 18;
    for (n += 2; n < o; n += 2)
      if (s[n] >= e) {
        let r = s[n - 2], l = s[n - 1];
        return l + (e - r) / (s[n] - r) * (s[n + 1] - l);
      }
    let a = s[o - 2], h = s[o - 1];
    return h + (1 - h) * (e - a) / (this.frames[i + this.getFrameEntries()] - a);
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.slots[this.slotIndex];
    if (!r.bone.active)
      return;
    let l = r.getAttachment();
    if (!l || !(l instanceof yt) || l.timelineAttachment != this.attachment)
      return;
    let c = r.deform;
    c.length == 0 && (a = E.setup);
    let f = this.vertices, d = f[0].length, m = this.frames;
    if (s < m[0]) {
      switch (a) {
        case E.setup:
          c.length = 0;
          return;
        case E.first:
          if (o == 1) {
            c.length = 0;
            return;
          }
          c.length = d;
          let p = l;
          if (p.bones) {
            o = 1 - o;
            for (var g = 0; g < d; g++)
              c[g] *= o;
          } else {
            let S = p.vertices;
            for (var g = 0; g < d; g++)
              c[g] += (S[g] - c[g]) * o;
          }
      }
      return;
    }
    if (c.length = d, s >= m[m.length - 1]) {
      let p = f[m.length - 1];
      if (o == 1)
        if (a == E.add) {
          let S = l;
          if (S.bones)
            for (let y = 0; y < d; y++)
              c[y] += p[y];
          else {
            let y = S.vertices;
            for (let A = 0; A < d; A++)
              c[A] += p[A] - y[A];
          }
        } else
          V.arrayCopy(p, 0, c, 0, d);
      else
        switch (a) {
          case E.setup: {
            let y = l;
            if (y.bones)
              for (let A = 0; A < d; A++)
                c[A] = p[A] * o;
            else {
              let A = y.vertices;
              for (let C = 0; C < d; C++) {
                let M = A[C];
                c[C] = M + (p[C] - M) * o;
              }
            }
            break;
          }
          case E.first:
          case E.replace:
            for (let y = 0; y < d; y++)
              c[y] += (p[y] - c[y]) * o;
            break;
          case E.add:
            let S = l;
            if (S.bones)
              for (let y = 0; y < d; y++)
                c[y] += p[y] * o;
            else {
              let y = S.vertices;
              for (let A = 0; A < d; A++)
                c[A] += (p[A] - y[A]) * o;
            }
        }
      return;
    }
    let b = J.search1(m, s), w = this.getCurvePercent(s, b), v = f[b], x = f[b + 1];
    if (o == 1)
      if (a == E.add) {
        let p = l;
        if (p.bones)
          for (let S = 0; S < d; S++) {
            let y = v[S];
            c[S] += y + (x[S] - y) * w;
          }
        else {
          let S = p.vertices;
          for (let y = 0; y < d; y++) {
            let A = v[y];
            c[y] += A + (x[y] - A) * w - S[y];
          }
        }
      } else
        for (let p = 0; p < d; p++) {
          let S = v[p];
          c[p] = S + (x[p] - S) * w;
        }
    else
      switch (a) {
        case E.setup: {
          let S = l;
          if (S.bones)
            for (let y = 0; y < d; y++) {
              let A = v[y];
              c[y] = (A + (x[y] - A) * w) * o;
            }
          else {
            let y = S.vertices;
            for (let A = 0; A < d; A++) {
              let C = v[A], M = y[A];
              c[A] = M + (C + (x[A] - C) * w - M) * o;
            }
          }
          break;
        }
        case E.first:
        case E.replace:
          for (let S = 0; S < d; S++) {
            let y = v[S];
            c[S] += (y + (x[S] - y) * w - c[S]) * o;
          }
          break;
        case E.add:
          let p = l;
          if (p.bones)
            for (let S = 0; S < d; S++) {
              let y = v[S];
              c[S] += (y + (x[S] - y) * w) * o;
            }
          else {
            let S = p.vertices;
            for (let y = 0; y < d; y++) {
              let A = v[y];
              c[y] += (A + (x[y] - A) * w - S[y]) * o;
            }
          }
      }
  }
};
var me = class me2 extends J {
  constructor(e) {
    super(e, me2.propertyIds);
    u(this, "events");
    this.events = new Array(e);
  }
  getFrameCount() {
    return this.frames.length;
  }
  /** Sets the time in seconds and the event for the specified key frame. */
  setFrame(e, i) {
    this.frames[e] = i.time, this.events[e] = i;
  }
  /** Fires events for frames > `lastTime` and <= `time`. */
  apply(e, i, s, n, o, a, h) {
    if (!n)
      return;
    let r = this.frames, l = this.frames.length;
    if (i > s)
      this.apply(e, i, Number.MAX_VALUE, n, o, a, h), i = -1;
    else if (i >= r[l - 1])
      return;
    if (s < r[0])
      return;
    let c = 0;
    if (i < r[0])
      c = 0;
    else {
      c = J.search1(r, i) + 1;
      let f = r[c];
      for (; c > 0 && r[c - 1] == f; )
        c--;
    }
    for (; c < l && s >= r[c]; c++)
      n.push(this.events[c]);
  }
};
u(me, "propertyIds", ["" + W.event]);
var _t = me;
var ge = class ge2 extends J {
  constructor(e) {
    super(e, ge2.propertyIds);
    u(this, "drawOrders");
    this.drawOrders = new Array(e);
  }
  getFrameCount() {
    return this.frames.length;
  }
  /** Sets the time in seconds and the draw order for the specified key frame.
   * @param drawOrder For each slot in {@link Skeleton#slots}, the index of the new draw order. May be null to use setup pose
   *           draw order. */
  setFrame(e, i, s) {
    this.frames[e] = i, this.drawOrders[e] = s;
  }
  apply(e, i, s, n, o, a, h) {
    if (h == ot.mixOut) {
      a == E.setup && V.arrayCopy(e.slots, 0, e.drawOrder, 0, e.slots.length);
      return;
    }
    if (s < this.frames[0]) {
      (a == E.setup || a == E.first) && V.arrayCopy(e.slots, 0, e.drawOrder, 0, e.slots.length);
      return;
    }
    let r = J.search1(this.frames, s), l = this.drawOrders[r];
    if (!l)
      V.arrayCopy(e.slots, 0, e.drawOrder, 0, e.slots.length);
    else {
      let c = e.drawOrder, f = e.slots;
      for (let d = 0, m = l.length; d < m; d++)
        c[d] = f[l[d]];
    }
  }
};
u(ge, "propertyIds", ["" + W.drawOrder]);
var Rt = ge;
var ms = class extends Ct {
  constructor(e, i, s) {
    super(e, i, [
      W.ikConstraint + "|" + s
    ]);
    u(this, "constraintIndex", 0);
    this.constraintIndex = s;
  }
  getFrameEntries() {
    return 6;
  }
  /** Sets the time in seconds, mix, softness, bend direction, compress, and stretch for the specified key frame. */
  setFrame(e, i, s, n, o, a, h) {
    e *= 6, this.frames[e] = i, this.frames[
      e + 1
      /*MIX*/
    ] = s, this.frames[
      e + 2
      /*SOFTNESS*/
    ] = n, this.frames[
      e + 3
      /*BEND_DIRECTION*/
    ] = o, this.frames[
      e + 4
      /*COMPRESS*/
    ] = a ? 1 : 0, this.frames[
      e + 5
      /*STRETCH*/
    ] = h ? 1 : 0;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.ikConstraints[this.constraintIndex];
    if (!r.active)
      return;
    let l = this.frames;
    if (s < l[0]) {
      switch (a) {
        case E.setup:
          r.mix = r.data.mix, r.softness = r.data.softness, r.bendDirection = r.data.bendDirection, r.compress = r.data.compress, r.stretch = r.data.stretch;
          return;
        case E.first:
          r.mix += (r.data.mix - r.mix) * o, r.softness += (r.data.softness - r.softness) * o, r.bendDirection = r.data.bendDirection, r.compress = r.data.compress, r.stretch = r.data.stretch;
      }
      return;
    }
    let c = 0, f = 0, d = J.search(
      l,
      s,
      6
      /*ENTRIES*/
    ), m = this.curves[
      d / 6
      /*ENTRIES*/
    ];
    switch (m) {
      case 0:
        let g = l[d];
        c = l[
          d + 1
          /*MIX*/
        ], f = l[
          d + 2
          /*SOFTNESS*/
        ];
        let b = (s - g) / (l[
          d + 6
          /*ENTRIES*/
        ] - g);
        c += (l[
          d + 6 + 1
          /*MIX*/
        ] - c) * b, f += (l[
          d + 6 + 2
          /*SOFTNESS*/
        ] - f) * b;
        break;
      case 1:
        c = l[
          d + 1
          /*MIX*/
        ], f = l[
          d + 2
          /*SOFTNESS*/
        ];
        break;
      default:
        c = this.getBezierValue(
          s,
          d,
          1,
          m - 2
          /*BEZIER*/
        ), f = this.getBezierValue(
          s,
          d,
          2,
          m + 18 - 2
          /*BEZIER*/
        );
    }
    a == E.setup ? (r.mix = r.data.mix + (c - r.data.mix) * o, r.softness = r.data.softness + (f - r.data.softness) * o, h == ot.mixOut ? (r.bendDirection = r.data.bendDirection, r.compress = r.data.compress, r.stretch = r.data.stretch) : (r.bendDirection = l[
      d + 3
      /*BEND_DIRECTION*/
    ], r.compress = l[
      d + 4
      /*COMPRESS*/
    ] != 0, r.stretch = l[
      d + 5
      /*STRETCH*/
    ] != 0)) : (r.mix += (c - r.mix) * o, r.softness += (f - r.softness) * o, h == ot.mixIn && (r.bendDirection = l[
      d + 3
      /*BEND_DIRECTION*/
    ], r.compress = l[
      d + 4
      /*COMPRESS*/
    ] != 0, r.stretch = l[
      d + 5
      /*STRETCH*/
    ] != 0));
  }
};
var gs = class extends Ct {
  constructor(e, i, s) {
    super(e, i, [
      W.transformConstraint + "|" + s
    ]);
    u(this, "constraintIndex", 0);
    this.constraintIndex = s;
  }
  getFrameEntries() {
    return 7;
  }
  /** The time in seconds, rotate mix, translate mix, scale mix, and shear mix for the specified key frame. */
  setFrame(e, i, s, n, o, a, h, r) {
    let l = this.frames;
    e *= 7, l[e] = i, l[
      e + 1
      /*ROTATE*/
    ] = s, l[
      e + 2
      /*X*/
    ] = n, l[
      e + 3
      /*Y*/
    ] = o, l[
      e + 4
      /*SCALEX*/
    ] = a, l[
      e + 5
      /*SCALEY*/
    ] = h, l[
      e + 6
      /*SHEARY*/
    ] = r;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.transformConstraints[this.constraintIndex];
    if (!r.active)
      return;
    let l = this.frames;
    if (s < l[0]) {
      let x = r.data;
      switch (a) {
        case E.setup:
          r.mixRotate = x.mixRotate, r.mixX = x.mixX, r.mixY = x.mixY, r.mixScaleX = x.mixScaleX, r.mixScaleY = x.mixScaleY, r.mixShearY = x.mixShearY;
          return;
        case E.first:
          r.mixRotate += (x.mixRotate - r.mixRotate) * o, r.mixX += (x.mixX - r.mixX) * o, r.mixY += (x.mixY - r.mixY) * o, r.mixScaleX += (x.mixScaleX - r.mixScaleX) * o, r.mixScaleY += (x.mixScaleY - r.mixScaleY) * o, r.mixShearY += (x.mixShearY - r.mixShearY) * o;
      }
      return;
    }
    let c, f, d, m, g, b, w = J.search(
      l,
      s,
      7
      /*ENTRIES*/
    ), v = this.curves[
      w / 7
      /*ENTRIES*/
    ];
    switch (v) {
      case 0:
        let x = l[w];
        c = l[
          w + 1
          /*ROTATE*/
        ], f = l[
          w + 2
          /*X*/
        ], d = l[
          w + 3
          /*Y*/
        ], m = l[
          w + 4
          /*SCALEX*/
        ], g = l[
          w + 5
          /*SCALEY*/
        ], b = l[
          w + 6
          /*SHEARY*/
        ];
        let p = (s - x) / (l[
          w + 7
          /*ENTRIES*/
        ] - x);
        c += (l[
          w + 7 + 1
          /*ROTATE*/
        ] - c) * p, f += (l[
          w + 7 + 2
          /*X*/
        ] - f) * p, d += (l[
          w + 7 + 3
          /*Y*/
        ] - d) * p, m += (l[
          w + 7 + 4
          /*SCALEX*/
        ] - m) * p, g += (l[
          w + 7 + 5
          /*SCALEY*/
        ] - g) * p, b += (l[
          w + 7 + 6
          /*SHEARY*/
        ] - b) * p;
        break;
      case 1:
        c = l[
          w + 1
          /*ROTATE*/
        ], f = l[
          w + 2
          /*X*/
        ], d = l[
          w + 3
          /*Y*/
        ], m = l[
          w + 4
          /*SCALEX*/
        ], g = l[
          w + 5
          /*SCALEY*/
        ], b = l[
          w + 6
          /*SHEARY*/
        ];
        break;
      default:
        c = this.getBezierValue(
          s,
          w,
          1,
          v - 2
          /*BEZIER*/
        ), f = this.getBezierValue(
          s,
          w,
          2,
          v + 18 - 2
          /*BEZIER*/
        ), d = this.getBezierValue(
          s,
          w,
          3,
          v + 18 * 2 - 2
          /*BEZIER*/
        ), m = this.getBezierValue(
          s,
          w,
          4,
          v + 18 * 3 - 2
          /*BEZIER*/
        ), g = this.getBezierValue(
          s,
          w,
          5,
          v + 18 * 4 - 2
          /*BEZIER*/
        ), b = this.getBezierValue(
          s,
          w,
          6,
          v + 18 * 5 - 2
          /*BEZIER*/
        );
    }
    if (a == E.setup) {
      let x = r.data;
      r.mixRotate = x.mixRotate + (c - x.mixRotate) * o, r.mixX = x.mixX + (f - x.mixX) * o, r.mixY = x.mixY + (d - x.mixY) * o, r.mixScaleX = x.mixScaleX + (m - x.mixScaleX) * o, r.mixScaleY = x.mixScaleY + (g - x.mixScaleY) * o, r.mixShearY = x.mixShearY + (b - x.mixShearY) * o;
    } else
      r.mixRotate += (c - r.mixRotate) * o, r.mixX += (f - r.mixX) * o, r.mixY += (d - r.mixY) * o, r.mixScaleX += (m - r.mixScaleX) * o, r.mixScaleY += (g - r.mixScaleY) * o, r.mixShearY += (b - r.mixShearY) * o;
  }
};
var ps = class extends vt {
  constructor(e, i, s) {
    super(e, i, W.pathConstraintPosition + "|" + s);
    u(this, "constraintIndex", 0);
    this.constraintIndex = s;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.pathConstraints[this.constraintIndex];
    r.active && (r.position = this.getAbsoluteValue(s, o, a, r.position, r.data.position));
  }
};
var xs = class extends vt {
  constructor(e, i, s) {
    super(e, i, W.pathConstraintSpacing + "|" + s);
    u(this, "constraintIndex", 0);
    this.constraintIndex = s;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.pathConstraints[this.constraintIndex];
    r.active && (r.spacing = this.getAbsoluteValue(s, o, a, r.spacing, r.data.spacing));
  }
};
var bs = class extends Ct {
  constructor(e, i, s) {
    super(e, i, [
      W.pathConstraintMix + "|" + s
    ]);
    u(this, "constraintIndex", 0);
    this.constraintIndex = s;
  }
  getFrameEntries() {
    return 4;
  }
  setFrame(e, i, s, n, o) {
    let a = this.frames;
    e <<= 2, a[e] = i, a[
      e + 1
      /*ROTATE*/
    ] = s, a[
      e + 2
      /*X*/
    ] = n, a[
      e + 3
      /*Y*/
    ] = o;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.pathConstraints[this.constraintIndex];
    if (!r.active)
      return;
    let l = this.frames;
    if (s < l[0]) {
      switch (a) {
        case E.setup:
          r.mixRotate = r.data.mixRotate, r.mixX = r.data.mixX, r.mixY = r.data.mixY;
          return;
        case E.first:
          r.mixRotate += (r.data.mixRotate - r.mixRotate) * o, r.mixX += (r.data.mixX - r.mixX) * o, r.mixY += (r.data.mixY - r.mixY) * o;
      }
      return;
    }
    let c, f, d, m = J.search(
      l,
      s,
      4
      /*ENTRIES*/
    ), g = this.curves[m >> 2];
    switch (g) {
      case 0:
        let b = l[m];
        c = l[
          m + 1
          /*ROTATE*/
        ], f = l[
          m + 2
          /*X*/
        ], d = l[
          m + 3
          /*Y*/
        ];
        let w = (s - b) / (l[
          m + 4
          /*ENTRIES*/
        ] - b);
        c += (l[
          m + 4 + 1
          /*ROTATE*/
        ] - c) * w, f += (l[
          m + 4 + 2
          /*X*/
        ] - f) * w, d += (l[
          m + 4 + 3
          /*Y*/
        ] - d) * w;
        break;
      case 1:
        c = l[
          m + 1
          /*ROTATE*/
        ], f = l[
          m + 2
          /*X*/
        ], d = l[
          m + 3
          /*Y*/
        ];
        break;
      default:
        c = this.getBezierValue(
          s,
          m,
          1,
          g - 2
          /*BEZIER*/
        ), f = this.getBezierValue(
          s,
          m,
          2,
          g + 18 - 2
          /*BEZIER*/
        ), d = this.getBezierValue(
          s,
          m,
          3,
          g + 18 * 2 - 2
          /*BEZIER*/
        );
    }
    if (a == E.setup) {
      let b = r.data;
      r.mixRotate = b.mixRotate + (c - b.mixRotate) * o, r.mixX = b.mixX + (f - b.mixX) * o, r.mixY = b.mixY + (d - b.mixY) * o;
    } else
      r.mixRotate += (c - r.mixRotate) * o, r.mixX += (f - r.mixX) * o, r.mixY += (d - r.mixY) * o;
  }
};
var Vt = class extends vt {
  /** @param physicsConstraintIndex -1 for all physics constraints in the skeleton. */
  constructor(e, i, s, n) {
    super(e, i, n + "|" + s);
    u(this, "constraintIndex", 0);
    this.constraintIndex = s;
  }
  apply(e, i, s, n, o, a, h) {
    let r;
    if (this.constraintIndex == -1) {
      const l = s >= this.frames[0] ? this.getCurveValue(s) : 0;
      for (const c of e.physicsConstraints)
        c.active && this.global(c.data) && this.set(c, this.getAbsoluteValue2(s, o, a, this.get(c), this.setup(c), l));
    } else
      r = e.physicsConstraints[this.constraintIndex], r.active && this.set(r, this.getAbsoluteValue(s, o, a, this.get(r), this.setup(r)));
  }
};
var ws = class extends Vt {
  constructor(t, e, i) {
    super(t, e, i, W.physicsConstraintInertia);
  }
  setup(t) {
    return t.data.inertia;
  }
  get(t) {
    return t.inertia;
  }
  set(t, e) {
    t.inertia = e;
  }
  global(t) {
    return t.inertiaGlobal;
  }
};
var ys = class extends Vt {
  constructor(t, e, i) {
    super(t, e, i, W.physicsConstraintStrength);
  }
  setup(t) {
    return t.data.strength;
  }
  get(t) {
    return t.strength;
  }
  set(t, e) {
    t.strength = e;
  }
  global(t) {
    return t.strengthGlobal;
  }
};
var vs = class extends Vt {
  constructor(t, e, i) {
    super(t, e, i, W.physicsConstraintDamping);
  }
  setup(t) {
    return t.data.damping;
  }
  get(t) {
    return t.damping;
  }
  set(t, e) {
    t.damping = e;
  }
  global(t) {
    return t.dampingGlobal;
  }
};
var Ss = class extends Vt {
  constructor(t, e, i) {
    super(t, e, i, W.physicsConstraintMass);
  }
  setup(t) {
    return 1 / t.data.massInverse;
  }
  get(t) {
    return 1 / t.massInverse;
  }
  set(t, e) {
    t.massInverse = 1 / e;
  }
  global(t) {
    return t.massGlobal;
  }
};
var ks = class extends Vt {
  constructor(t, e, i) {
    super(t, e, i, W.physicsConstraintWind);
  }
  setup(t) {
    return t.data.wind;
  }
  get(t) {
    return t.wind;
  }
  set(t, e) {
    t.wind = e;
  }
  global(t) {
    return t.windGlobal;
  }
};
var As = class extends Vt {
  constructor(t, e, i) {
    super(t, e, i, W.physicsConstraintGravity);
  }
  setup(t) {
    return t.data.gravity;
  }
  get(t) {
    return t.gravity;
  }
  set(t, e) {
    t.gravity = e;
  }
  global(t) {
    return t.gravityGlobal;
  }
};
var Cs = class extends Vt {
  constructor(t, e, i) {
    super(t, e, i, W.physicsConstraintMix);
  }
  setup(t) {
    return t.data.mix;
  }
  get(t) {
    return t.mix;
  }
  set(t, e) {
    t.mix = e;
  }
  global(t) {
    return t.mixGlobal;
  }
};
var pe = class pe2 extends J {
  /** @param physicsConstraintIndex -1 for all physics constraints in the skeleton. */
  constructor(e, i) {
    super(e, pe2.propertyIds);
    u(this, "constraintIndex");
    this.constraintIndex = i;
  }
  getFrameCount() {
    return this.frames.length;
  }
  /** Sets the time for the specified frame.
   * @param frame Between 0 and <code>frameCount</code>, inclusive. */
  setFrame(e, i) {
    this.frames[e] = i;
  }
  /** Resets the physics constraint when frames > <code>lastTime</code> and <= <code>time</code>. */
  apply(e, i, s, n, o, a, h) {
    let r;
    if (this.constraintIndex != -1 && (r = e.physicsConstraints[this.constraintIndex], !r.active))
      return;
    const l = this.frames;
    if (i > s)
      this.apply(e, i, Number.MAX_VALUE, [], o, a, h), i = -1;
    else if (i >= l[l.length - 1])
      return;
    if (!(s < l[0]) && (i < l[0] || s >= l[J.search1(l, i) + 1]))
      if (r != null)
        r.reset();
      else
        for (const c of e.physicsConstraints)
          c.active && c.reset();
  }
};
u(pe, "propertyIds", [W.physicsConstraintReset.toString()]);
var ae = pe;
var gt = class gt2 extends J {
  constructor(e, i, s) {
    super(e, [
      W.sequence + "|" + i + "|" + s.sequence.id
    ]);
    u(this, "slotIndex");
    u(this, "attachment");
    this.slotIndex = i, this.attachment = s;
  }
  getFrameEntries() {
    return gt2.ENTRIES;
  }
  getSlotIndex() {
    return this.slotIndex;
  }
  getAttachment() {
    return this.attachment;
  }
  /** Sets the time, mode, index, and frame time for the specified frame.
   * @param frame Between 0 and <code>frameCount</code>, inclusive.
   * @param time Seconds between frames. */
  setFrame(e, i, s, n, o) {
    let a = this.frames;
    e *= gt2.ENTRIES, a[e] = i, a[e + gt2.MODE] = s | n << 4, a[e + gt2.DELAY] = o;
  }
  apply(e, i, s, n, o, a, h) {
    let r = e.slots[this.slotIndex];
    if (!r.bone.active)
      return;
    let l = r.attachment, c = this.attachment;
    if (l != c && (!(l instanceof yt) || l.timelineAttachment != c))
      return;
    if (h == ot.mixOut) {
      a == E.setup && (r.sequenceIndex = -1);
      return;
    }
    let f = this.frames;
    if (s < f[0]) {
      (a == E.setup || a == E.first) && (r.sequenceIndex = -1);
      return;
    }
    let d = J.search(f, s, gt2.ENTRIES), m = f[d], g = f[d + gt2.MODE], b = f[d + gt2.DELAY];
    if (!this.attachment.sequence)
      return;
    let w = g >> 4, v = this.attachment.sequence.regions.length, x = Qe[g & 15];
    if (x != rt.hold)
      switch (w += (s - m) / b + 1e-5 | 0, x) {
        case rt.once:
          w = Math.min(v - 1, w);
          break;
        case rt.loop:
          w %= v;
          break;
        case rt.pingpong: {
          let p = (v << 1) - 2;
          w = p == 0 ? 0 : w % p, w >= v && (w = p - w);
          break;
        }
        case rt.onceReverse:
          w = Math.max(v - 1 - w, 0);
          break;
        case rt.loopReverse:
          w = v - 1 - w % v;
          break;
        case rt.pingpongReverse: {
          let p = (v << 1) - 2;
          w = p == 0 ? 0 : (w + v - 1) % p, w >= v && (w = p - w);
        }
      }
    r.sequenceIndex = w;
  }
};
u(gt, "ENTRIES", 3), u(gt, "MODE", 1), u(gt, "DELAY", 2);
var le = gt;
var qt = class qt2 {
  constructor(t) {
    u(this, "data");
    u(this, "tracks", new Array());
    u(this, "timeScale", 1);
    u(this, "unkeyedState", 0);
    u(this, "events", new Array());
    u(this, "listeners", new Array());
    u(this, "queue", new $s(this));
    u(this, "propertyIDs", new _e());
    u(this, "animationsChanged", false);
    u(this, "trackEntryPool", new jt(() => new Gs()));
    this.data = t;
  }
  static emptyAnimation() {
    return qt2._emptyAnimation;
  }
  /** Increments each track entry {@link TrackEntry#trackTime()}, setting queued animations as current if needed. */
  update(t) {
    t *= this.timeScale;
    let e = this.tracks;
    for (let i = 0, s = e.length; i < s; i++) {
      let n = e[i];
      if (!n)
        continue;
      n.animationLast = n.nextAnimationLast, n.trackLast = n.nextTrackLast;
      let o = t * n.timeScale;
      if (n.delay > 0) {
        if (n.delay -= o, n.delay > 0)
          continue;
        o = -n.delay, n.delay = 0;
      }
      let a = n.next;
      if (a) {
        let h = n.trackLast - a.delay;
        if (h >= 0) {
          for (a.delay = 0, a.trackTime += n.timeScale == 0 ? 0 : (h / n.timeScale + t) * a.timeScale, n.trackTime += o, this.setCurrent(i, a, true); a.mixingFrom; )
            a.mixTime += t, a = a.mixingFrom;
          continue;
        }
      } else if (n.trackLast >= n.trackEnd && !n.mixingFrom) {
        e[i] = null, this.queue.end(n), this.clearNext(n);
        continue;
      }
      if (n.mixingFrom && this.updateMixingFrom(n, t)) {
        let h = n.mixingFrom;
        for (n.mixingFrom = null, h && (h.mixingTo = null); h; )
          this.queue.end(h), h = h.mixingFrom;
      }
      n.trackTime += o;
    }
    this.queue.drain();
  }
  /** Returns true when all mixing from entries are complete. */
  updateMixingFrom(t, e) {
    let i = t.mixingFrom;
    if (!i)
      return true;
    let s = this.updateMixingFrom(i, e);
    return i.animationLast = i.nextAnimationLast, i.trackLast = i.nextTrackLast, t.mixTime > 0 && t.mixTime >= t.mixDuration ? ((i.totalAlpha == 0 || t.mixDuration == 0) && (t.mixingFrom = i.mixingFrom, i.mixingFrom && (i.mixingFrom.mixingTo = t), t.interruptAlpha = i.interruptAlpha, this.queue.end(i)), s) : (i.trackTime += e * i.timeScale, t.mixTime += e, false);
  }
  /** Poses the skeleton using the track entry animations. There are no side effects other than invoking listeners, so the
   * animation state can be applied to multiple skeletons to pose them identically.
   * @returns True if any animations were applied. */
  apply(t) {
    if (!t)
      throw new Error("skeleton cannot be null.");
    this.animationsChanged && this._animationsChanged();
    let e = this.events, i = this.tracks, s = false;
    for (let f = 0, d = i.length; f < d; f++) {
      let m = i[f];
      if (!m || m.delay > 0)
        continue;
      s = true;
      let g = f == 0 ? E.first : m.mixBlend, b = m.alpha;
      m.mixingFrom ? b *= this.applyMixingFrom(m, t, g) : m.trackTime >= m.trackEnd && !m.next && (b = 0);
      let w = b >= m.alphaAttachmentThreshold, v = m.animationLast, x = m.getAnimationTime(), p = x, S = e;
      m.reverse && (p = m.animation.duration - p, S = null);
      let y = m.animation.timelines, A = y.length;
      if (f == 0 && b == 1 || g == E.add) {
        f == 0 && (w = true);
        for (let C = 0; C < A; C++) {
          var n = y[C];
          n instanceof Lt ? this.applyAttachmentTimeline(n, t, p, g, w) : n.apply(t, v, p, S, b, g, ot.mixIn);
        }
      } else {
        let C = m.timelineMode, M = m.shortestRotation, F = !M && m.timelinesRotation.length != A << 1;
        F && (m.timelinesRotation.length = A << 1);
        for (let T = 0; T < A; T++) {
          let P = y[T], R = C[T] == Se ? g : E.setup;
          !M && P instanceof ne ? this.applyRotateTimeline(P, t, p, b, R, m.timelinesRotation, T << 1, F) : P instanceof Lt ? this.applyAttachmentTimeline(P, t, p, g, w) : P.apply(t, v, p, S, b, R, ot.mixIn);
        }
      }
      this.queueEvents(m, x), e.length = 0, m.nextAnimationLast = x, m.nextTrackLast = m.trackTime;
    }
    for (var o = this.unkeyedState + We, a = t.slots, h = 0, r = t.slots.length; h < r; h++) {
      var l = a[h];
      if (l.attachmentState == o) {
        var c = l.data.attachmentName;
        l.setAttachment(c ? t.getAttachment(l.data.index, c) : null);
      }
    }
    return this.unkeyedState += 2, this.queue.drain(), s;
  }
  applyMixingFrom(t, e, i) {
    let s = t.mixingFrom;
    s.mixingFrom && this.applyMixingFrom(s, e, i);
    let n = 0;
    t.mixDuration == 0 ? (n = 1, i == E.first && (i = E.setup)) : (n = t.mixTime / t.mixDuration, n > 1 && (n = 1), i != E.first && (i = s.mixBlend));
    let o = n < s.mixAttachmentThreshold, a = n < s.mixDrawOrderThreshold, h = s.animation.timelines, r = h.length, l = s.alpha * t.interruptAlpha, c = l * (1 - n), f = s.animationLast, d = s.getAnimationTime(), m = d, g = null;
    if (s.reverse ? m = s.animation.duration - m : n < s.eventThreshold && (g = this.events), i == E.add)
      for (let b = 0; b < r; b++)
        h[b].apply(e, f, m, g, c, i, ot.mixOut);
    else {
      let b = s.timelineMode, w = s.timelineHoldMix, v = s.shortestRotation, x = !v && s.timelinesRotation.length != r << 1;
      x && (s.timelinesRotation.length = r << 1), s.totalAlpha = 0;
      for (let p = 0; p < r; p++) {
        let S = h[p], y = ot.mixOut, A, C = 0;
        switch (b[p]) {
          case Se:
            if (!a && S instanceof Rt)
              continue;
            A = i, C = c;
            break;
          case Ne:
            A = E.setup, C = c;
            break;
          case qe:
            A = i, C = l;
            break;
          case ke:
            A = E.setup, C = l;
            break;
          default:
            A = E.setup;
            let M = w[p];
            C = l * Math.max(0, 1 - M.mixTime / M.mixDuration);
            break;
        }
        s.totalAlpha += C, !v && S instanceof ne ? this.applyRotateTimeline(S, e, m, C, A, s.timelinesRotation, p << 1, x) : S instanceof Lt ? this.applyAttachmentTimeline(S, e, m, A, o && C >= s.alphaAttachmentThreshold) : (a && S instanceof Rt && A == E.setup && (y = ot.mixIn), S.apply(e, f, m, g, C, A, y));
      }
    }
    return t.mixDuration > 0 && this.queueEvents(s, d), this.events.length = 0, s.nextAnimationLast = d, s.nextTrackLast = s.trackTime, n;
  }
  applyAttachmentTimeline(t, e, i, s, n) {
    var o = e.slots[t.slotIndex];
    o.bone.active && (i < t.frames[0] ? (s == E.setup || s == E.first) && this.setAttachment(e, o, o.data.attachmentName, n) : this.setAttachment(e, o, t.attachmentNames[J.search1(t.frames, i)], n), o.attachmentState <= this.unkeyedState && (o.attachmentState = this.unkeyedState + We));
  }
  setAttachment(t, e, i, s) {
    e.setAttachment(i ? t.getAttachment(e.data.index, i) : null), s && (e.attachmentState = this.unkeyedState + js);
  }
  applyRotateTimeline(t, e, i, s, n, o, a, h) {
    if (h && (o[a] = 0), s == 1) {
      t.apply(e, 0, i, null, 1, n, ot.mixIn);
      return;
    }
    let r = e.bones[t.boneIndex];
    if (!r.active)
      return;
    let l = t.frames, c = 0, f = 0;
    if (i < l[0])
      switch (n) {
        case E.setup:
          r.rotation = r.data.rotation;
        default:
          return;
        case E.first:
          c = r.rotation, f = r.data.rotation;
      }
    else
      c = n == E.setup ? r.data.rotation : r.rotation, f = r.data.rotation + t.getCurveValue(i);
    let d = 0, m = f - c;
    if (m -= Math.ceil(m / 360 - 0.5) * 360, m == 0)
      d = o[a];
    else {
      let g = 0, b = 0;
      h ? (g = 0, b = m) : (g = o[a], b = o[a + 1]);
      let w = g - g % 360;
      d = m + w;
      let v = m >= 0, x = g >= 0;
      Math.abs(b) <= 90 && B.signum(b) != B.signum(m) && (Math.abs(g - w) > 180 ? (d += 360 * B.signum(g), x = v) : w != 0 ? d -= 360 * B.signum(g) : x = v), x != v && (d += 360 * B.signum(g)), o[a] = d;
    }
    o[a + 1] = m, r.rotation = c + d * s;
  }
  queueEvents(t, e) {
    let i = t.animationStart, s = t.animationEnd, n = s - i, o = t.trackLast % n, a = this.events, h = 0, r = a.length;
    for (; h < r; h++) {
      let c = a[h];
      if (c.time < o)
        break;
      c.time > s || this.queue.event(t, c);
    }
    let l = false;
    if (t.loop)
      if (n == 0)
        l = true;
      else {
        const c = Math.floor(t.trackTime / n);
        l = c > 0 && c > Math.floor(t.trackLast / n);
      }
    else
      l = e >= s && t.animationLast < s;
    for (l && this.queue.complete(t); h < r; h++) {
      let c = a[h];
      c.time < i || this.queue.event(t, c);
    }
  }
  /** Removes all animations from all tracks, leaving skeletons in their current pose.
   *
   * It may be desired to use {@link AnimationState#setEmptyAnimation()} to mix the skeletons back to the setup pose,
   * rather than leaving them in their current pose. */
  clearTracks() {
    let t = this.queue.drainDisabled;
    this.queue.drainDisabled = true;
    for (let e = 0, i = this.tracks.length; e < i; e++)
      this.clearTrack(e);
    this.tracks.length = 0, this.queue.drainDisabled = t, this.queue.drain();
  }
  /** Removes all animations from the track, leaving skeletons in their current pose.
   *
   * It may be desired to use {@link AnimationState#setEmptyAnimation()} to mix the skeletons back to the setup pose,
   * rather than leaving them in their current pose. */
  clearTrack(t) {
    if (t >= this.tracks.length)
      return;
    let e = this.tracks[t];
    if (!e)
      return;
    this.queue.end(e), this.clearNext(e);
    let i = e;
    for (; ; ) {
      let s = i.mixingFrom;
      if (!s)
        break;
      this.queue.end(s), i.mixingFrom = null, i.mixingTo = null, i = s;
    }
    this.tracks[e.trackIndex] = null, this.queue.drain();
  }
  setCurrent(t, e, i) {
    let s = this.expandToIndex(t);
    this.tracks[t] = e, e.previous = null, s && (i && this.queue.interrupt(s), e.mixingFrom = s, s.mixingTo = e, e.mixTime = 0, s.mixingFrom && s.mixDuration > 0 && (e.interruptAlpha *= Math.min(1, s.mixTime / s.mixDuration)), s.timelinesRotation.length = 0), this.queue.start(e);
  }
  /** Sets an animation by name.
    *
    * See {@link #setAnimationWith()}. */
  setAnimation(t, e, i = false) {
    let s = this.data.skeletonData.findAnimation(e);
    if (!s)
      throw new Error("Animation not found: " + e);
    return this.setAnimationWith(t, s, i);
  }
  /** Sets the current animation for a track, discarding any queued animations. If the formerly current track entry was never
   * applied to a skeleton, it is replaced (not mixed from).
   * @param loop If true, the animation will repeat. If false it will not, instead its last frame is applied if played beyond its
   *           duration. In either case {@link TrackEntry#trackEnd} determines when the track is cleared.
   * @returns A track entry to allow further customization of animation playback. References to the track entry must not be kept
   *         after the {@link AnimationStateListener#dispose()} event occurs. */
  setAnimationWith(t, e, i = false) {
    if (!e)
      throw new Error("animation cannot be null.");
    let s = true, n = this.expandToIndex(t);
    n && (n.nextTrackLast == -1 ? (this.tracks[t] = n.mixingFrom, this.queue.interrupt(n), this.queue.end(n), this.clearNext(n), n = n.mixingFrom, s = false) : this.clearNext(n));
    let o = this.trackEntry(t, e, i, n);
    return this.setCurrent(t, o, s), this.queue.drain(), o;
  }
  /** Queues an animation by name.
   *
   * See {@link #addAnimationWith()}. */
  addAnimation(t, e, i = false, s = 0) {
    let n = this.data.skeletonData.findAnimation(e);
    if (!n)
      throw new Error("Animation not found: " + e);
    return this.addAnimationWith(t, n, i, s);
  }
  /** Adds an animation to be played after the current or last queued animation for a track. If the track is empty, it is
   * equivalent to calling {@link #setAnimationWith()}.
   * @param delay If > 0, sets {@link TrackEntry#delay}. If <= 0, the delay set is the duration of the previous track entry
   *           minus any mix duration (from the {@link AnimationStateData}) plus the specified `delay` (ie the mix
   *           ends at (`delay` = 0) or before (`delay` < 0) the previous track entry duration). If the
   *           previous entry is looping, its next loop completion is used instead of its duration.
   * @returns A track entry to allow further customization of animation playback. References to the track entry must not be kept
   *         after the {@link AnimationStateListener#dispose()} event occurs. */
  addAnimationWith(t, e, i = false, s = 0) {
    if (!e)
      throw new Error("animation cannot be null.");
    let n = this.expandToIndex(t);
    if (n)
      for (; n.next; )
        n = n.next;
    let o = this.trackEntry(t, e, i, n);
    return n ? (n.next = o, o.previous = n, s <= 0 && (s += n.getTrackComplete() - o.mixDuration)) : (this.setCurrent(t, o, true), this.queue.drain()), o.delay = s, o;
  }
  /** Sets an empty animation for a track, discarding any queued animations, and sets the track entry's
   * {@link TrackEntry#mixduration}. An empty animation has no timelines and serves as a placeholder for mixing in or out.
   *
   * Mixing out is done by setting an empty animation with a mix duration using either {@link #setEmptyAnimation()},
   * {@link #setEmptyAnimations()}, or {@link #addEmptyAnimation()}. Mixing to an empty animation causes
   * the previous animation to be applied less and less over the mix duration. Properties keyed in the previous animation
   * transition to the value from lower tracks or to the setup pose value if no lower tracks key the property. A mix duration of
   * 0 still mixes out over one frame.
   *
   * Mixing in is done by first setting an empty animation, then adding an animation using
   * {@link #addAnimation()} and on the returned track entry, set the
   * {@link TrackEntry#setMixDuration()}. Mixing from an empty animation causes the new animation to be applied more and
   * more over the mix duration. Properties keyed in the new animation transition from the value from lower tracks or from the
   * setup pose value if no lower tracks key the property to the value keyed in the new animation. */
  setEmptyAnimation(t, e = 0) {
    let i = this.setAnimationWith(t, qt2.emptyAnimation(), false);
    return i.mixDuration = e, i.trackEnd = e, i;
  }
  /** Adds an empty animation to be played after the current or last queued animation for a track, and sets the track entry's
   * {@link TrackEntry#mixDuration}. If the track is empty, it is equivalent to calling
   * {@link #setEmptyAnimation()}.
   *
   * See {@link #setEmptyAnimation()}.
   * @param delay If > 0, sets {@link TrackEntry#delay}. If <= 0, the delay set is the duration of the previous track entry
   *           minus any mix duration plus the specified `delay` (ie the mix ends at (`delay` = 0) or
   *           before (`delay` < 0) the previous track entry duration). If the previous entry is looping, its next
   *           loop completion is used instead of its duration.
   * @return A track entry to allow further customization of animation playback. References to the track entry must not be kept
   *         after the {@link AnimationStateListener#dispose()} event occurs. */
  addEmptyAnimation(t, e = 0, i = 0) {
    let s = this.addAnimationWith(t, qt2.emptyAnimation(), false, i);
    return i <= 0 && (s.delay += s.mixDuration - e), s.mixDuration = e, s.trackEnd = e, s;
  }
  /** Sets an empty animation for every track, discarding any queued animations, and mixes to it over the specified mix
    * duration. */
  setEmptyAnimations(t = 0) {
    let e = this.queue.drainDisabled;
    this.queue.drainDisabled = true;
    for (let i = 0, s = this.tracks.length; i < s; i++) {
      let n = this.tracks[i];
      n && this.setEmptyAnimation(n.trackIndex, t);
    }
    this.queue.drainDisabled = e, this.queue.drain();
  }
  expandToIndex(t) {
    return t < this.tracks.length ? this.tracks[t] : (V.ensureArrayCapacity(this.tracks, t + 1, null), this.tracks.length = t + 1, null);
  }
  /** @param last May be null. */
  trackEntry(t, e, i, s) {
    let n = this.trackEntryPool.obtain();
    return n.reset(), n.trackIndex = t, n.animation = e, n.loop = i, n.holdPrevious = false, n.reverse = false, n.shortestRotation = false, n.eventThreshold = 0, n.alphaAttachmentThreshold = 0, n.mixAttachmentThreshold = 0, n.mixDrawOrderThreshold = 0, n.animationStart = 0, n.animationEnd = e.duration, n.animationLast = -1, n.nextAnimationLast = -1, n.delay = 0, n.trackTime = 0, n.trackLast = -1, n.nextTrackLast = -1, n.trackEnd = Number.MAX_VALUE, n.timeScale = 1, n.alpha = 1, n.mixTime = 0, n.mixDuration = s ? this.data.getMix(s.animation, e) : 0, n.interruptAlpha = 1, n.totalAlpha = 0, n.mixBlend = E.replace, n;
  }
  /** Removes the {@link TrackEntry#getNext() next entry} and all entries after it for the specified entry. */
  clearNext(t) {
    let e = t.next;
    for (; e; )
      this.queue.dispose(e), e = e.next;
    t.next = null;
  }
  _animationsChanged() {
    this.animationsChanged = false, this.propertyIDs.clear();
    let t = this.tracks;
    for (let e = 0, i = t.length; e < i; e++) {
      let s = t[e];
      if (s) {
        for (; s.mixingFrom; )
          s = s.mixingFrom;
        do
          (!s.mixingTo || s.mixBlend != E.add) && this.computeHold(s), s = s.mixingTo;
        while (s);
      }
    }
  }
  computeHold(t) {
    let e = t.mixingTo, i = t.animation.timelines, s = t.animation.timelines.length, n = t.timelineMode;
    n.length = s;
    let o = t.timelineHoldMix;
    o.length = 0;
    let a = this.propertyIDs;
    if (e && e.holdPrevious) {
      for (let h = 0; h < s; h++)
        n[h] = a.addAll(i[h].getPropertyIds()) ? ke : qe;
      return;
    }
    t: for (let h = 0; h < s; h++) {
      let r = i[h], l = r.getPropertyIds();
      if (!a.addAll(l))
        n[h] = Se;
      else if (!e || r instanceof Lt || r instanceof Rt || r instanceof _t || !e.animation.hasTimeline(l))
        n[h] = Ne;
      else {
        for (let c = e.mixingTo; c; c = c.mixingTo)
          if (!c.animation.hasTimeline(l)) {
            if (t.mixDuration > 0) {
              n[h] = Hs, o[h] = c;
              continue t;
            }
            break;
          }
        n[h] = ke;
      }
    }
  }
  /** Returns the track entry for the animation currently playing on the track, or null if no animation is currently playing. */
  getCurrent(t) {
    return t >= this.tracks.length ? null : this.tracks[t];
  }
  /** Adds a listener to receive events for all track entries. */
  addListener(t) {
    if (!t)
      throw new Error("listener cannot be null.");
    this.listeners.push(t);
  }
  /** Removes the listener added with {@link #addListener()}. */
  removeListener(t) {
    let e = this.listeners.indexOf(t);
    e >= 0 && this.listeners.splice(e, 1);
  }
  /** Removes all listeners added with {@link #addListener()}. */
  clearListeners() {
    this.listeners.length = 0;
  }
  /** Discards all listener notifications that have not yet been delivered. This can be useful to call from an
   * {@link AnimationStateListener} when it is known that further notifications that may have been already queued for delivery
   * are not wanted because new animations are being set. */
  clearListenerNotifications() {
    this.queue.clear();
  }
};
u(qt, "_emptyAnimation", new Te("<empty>", [], 0));
var Ie = qt;
var Gs = class {
  constructor() {
    u(this, "animation", null);
    u(this, "previous", null);
    u(this, "next", null);
    u(this, "mixingFrom", null);
    u(this, "mixingTo", null);
    u(this, "listener", null);
    u(this, "trackIndex", 0);
    u(this, "loop", false);
    u(this, "holdPrevious", false);
    u(this, "reverse", false);
    u(this, "shortestRotation", false);
    u(this, "eventThreshold", 0);
    u(this, "mixAttachmentThreshold", 0);
    u(this, "alphaAttachmentThreshold", 0);
    u(this, "mixDrawOrderThreshold", 0);
    u(this, "animationStart", 0);
    u(this, "animationEnd", 0);
    u(this, "animationLast", 0);
    u(this, "nextAnimationLast", 0);
    u(this, "delay", 0);
    u(this, "trackTime", 0);
    u(this, "trackLast", 0);
    u(this, "nextTrackLast", 0);
    u(this, "trackEnd", 0);
    u(this, "timeScale", 0);
    u(this, "alpha", 0);
    u(this, "mixTime", 0);
    u(this, "_mixDuration", 0);
    u(this, "interruptAlpha", 0);
    u(this, "totalAlpha", 0);
    u(this, "mixBlend", E.replace);
    u(this, "timelineMode", new Array());
    u(this, "timelineHoldMix", new Array());
    u(this, "timelinesRotation", new Array());
  }
  get mixDuration() {
    return this._mixDuration;
  }
  set mixDuration(t) {
    this._mixDuration = t;
  }
  setMixDurationWithDelay(t, e) {
    this._mixDuration = t, this.previous != null && e <= 0 && (e += this.previous.getTrackComplete() - t), this.delay = e;
  }
  reset() {
    this.next = null, this.previous = null, this.mixingFrom = null, this.mixingTo = null, this.animation = null, this.listener = null, this.timelineMode.length = 0, this.timelineHoldMix.length = 0, this.timelinesRotation.length = 0;
  }
  /** Uses {@link #trackTime} to compute the `animationTime`, which is between {@link #animationStart}
   * and {@link #animationEnd}. When the `trackTime` is 0, the `animationTime` is equal to the
   * `animationStart` time. */
  getAnimationTime() {
    if (this.loop) {
      let t = this.animationEnd - this.animationStart;
      return t == 0 ? this.animationStart : this.trackTime % t + this.animationStart;
    }
    return Math.min(this.trackTime + this.animationStart, this.animationEnd);
  }
  setAnimationLast(t) {
    this.animationLast = t, this.nextAnimationLast = t;
  }
  /** Returns true if at least one loop has been completed.
   *
   * See {@link AnimationStateListener#complete()}. */
  isComplete() {
    return this.trackTime >= this.animationEnd - this.animationStart;
  }
  /** Resets the rotation directions for mixing this entry's rotate timelines. This can be useful to avoid bones rotating the
   * long way around when using {@link #alpha} and starting animations on other tracks.
   *
   * Mixing with {@link MixBlend#replace} involves finding a rotation between two others, which has two possible solutions:
   * the short way or the long way around. The two rotations likely change over time, so which direction is the short or long
   * way also changes. If the short way was always chosen, bones would flip to the other side when that direction became the
   * long way. TrackEntry chooses the short way the first time it is applied and remembers that direction. */
  resetRotationDirections() {
    this.timelinesRotation.length = 0;
  }
  getTrackComplete() {
    let t = this.animationEnd - this.animationStart;
    if (t != 0) {
      if (this.loop)
        return t * (1 + (this.trackTime / t | 0));
      if (this.trackTime < t)
        return t;
    }
    return this.trackTime;
  }
  /** Returns true if this track entry has been applied at least once.
   * <p>
   * See {@link AnimationState#apply(Skeleton)}. */
  wasApplied() {
    return this.nextTrackLast != -1;
  }
  /** Returns true if there is a {@link #getNext()} track entry and it will become the current track entry during the next
   * {@link AnimationState#update(float)}. */
  isNextReady() {
    return this.next != null && this.nextTrackLast - this.next.delay >= 0;
  }
};
var $s = class {
  constructor(t) {
    u(this, "objects", []);
    u(this, "drainDisabled", false);
    u(this, "animState");
    this.animState = t;
  }
  start(t) {
    this.objects.push(ct.start), this.objects.push(t), this.animState.animationsChanged = true;
  }
  interrupt(t) {
    this.objects.push(ct.interrupt), this.objects.push(t);
  }
  end(t) {
    this.objects.push(ct.end), this.objects.push(t), this.animState.animationsChanged = true;
  }
  dispose(t) {
    this.objects.push(ct.dispose), this.objects.push(t);
  }
  complete(t) {
    this.objects.push(ct.complete), this.objects.push(t);
  }
  event(t, e) {
    this.objects.push(ct.event), this.objects.push(t), this.objects.push(e);
  }
  drain() {
    if (this.drainDisabled)
      return;
    this.drainDisabled = true;
    let t = this.objects, e = this.animState.listeners;
    for (let i = 0; i < t.length; i += 2) {
      let s = t[i], n = t[i + 1];
      switch (s) {
        case ct.start:
          n.listener && n.listener.start && n.listener.start(n);
          for (let a = 0; a < e.length; a++) {
            let h = e[a];
            h.start && h.start(n);
          }
          break;
        case ct.interrupt:
          n.listener && n.listener.interrupt && n.listener.interrupt(n);
          for (let a = 0; a < e.length; a++) {
            let h = e[a];
            h.interrupt && h.interrupt(n);
          }
          break;
        case ct.end:
          n.listener && n.listener.end && n.listener.end(n);
          for (let a = 0; a < e.length; a++) {
            let h = e[a];
            h.end && h.end(n);
          }
        case ct.dispose:
          n.listener && n.listener.dispose && n.listener.dispose(n);
          for (let a = 0; a < e.length; a++) {
            let h = e[a];
            h.dispose && h.dispose(n);
          }
          this.animState.trackEntryPool.free(n);
          break;
        case ct.complete:
          n.listener && n.listener.complete && n.listener.complete(n);
          for (let a = 0; a < e.length; a++) {
            let h = e[a];
            h.complete && h.complete(n);
          }
          break;
        case ct.event:
          let o = t[i++ + 2];
          n.listener && n.listener.event && n.listener.event(n, o);
          for (let a = 0; a < e.length; a++) {
            let h = e[a];
            h.event && h.event(n, o);
          }
          break;
      }
    }
    this.clear(), this.drainDisabled = false;
  }
  clear() {
    this.objects.length = 0;
  }
};
var ct;
(function(k) {
  k[k.start = 0] = "start", k[k.interrupt = 1] = "interrupt", k[k.end = 2] = "end", k[k.dispose = 3] = "dispose", k[k.complete = 4] = "complete", k[k.event = 5] = "event";
})(ct || (ct = {}));
var Se = 0;
var Ne = 1;
var qe = 2;
var ke = 3;
var Hs = 4;
var We = 1;
var js = 2;
var _s = class {
  constructor(t) {
    u(this, "skeletonData");
    u(this, "animationToMixTime", {});
    u(this, "defaultMix", 0);
    if (!t)
      throw new Error("skeletonData cannot be null.");
    this.skeletonData = t;
  }
  /** Sets a mix duration by animation name.
   *
   * See {@link #setMixWith()}. */
  setMix(t, e, i) {
    let s = this.skeletonData.findAnimation(t);
    if (!s)
      throw new Error("Animation not found: " + t);
    let n = this.skeletonData.findAnimation(e);
    if (!n)
      throw new Error("Animation not found: " + e);
    this.setMixWith(s, n, i);
  }
  /** Sets the mix duration when changing from the specified animation to the other.
   *
   * See {@link TrackEntry#mixDuration}. */
  setMixWith(t, e, i) {
    if (!t)
      throw new Error("from cannot be null.");
    if (!e)
      throw new Error("to cannot be null.");
    let s = t.name + "." + e.name;
    this.animationToMixTime[s] = i;
  }
  /** Returns the mix duration to use when changing from the specified animation to the other, or the {@link #defaultMix} if
    * no mix duration has been set. */
  getMix(t, e) {
    let i = t.name + "." + e.name, s = this.animationToMixTime[i];
    return s === void 0 ? this.defaultMix : s;
  }
};
var xe = class _xe extends yt {
  constructor(e) {
    super(e);
    u(this, "color", new q(1, 1, 1, 1));
  }
  copy() {
    let e = new _xe(this.name);
    return this.copyTo(e), e.color.setFromColor(this.color), e;
  }
};
var Pt = class _Pt extends yt {
  // ce3a3aff
  constructor(e) {
    super(e);
    u(this, "endSlot", null);
    u(this, "color", new q(0.2275, 0.2275, 0.8078, 1));
  }
  copy() {
    let e = new _Pt(this.name);
    return this.copyTo(e), e.endSlot = this.endSlot, e.color.setFromColor(this.color), e;
  }
};
var Ks = class {
  constructor(t) {
    u(this, "_image");
    this._image = t;
  }
  getImage() {
    return this._image;
  }
};
var it;
(function(k) {
  k[k.Nearest = 9728] = "Nearest", k[k.Linear = 9729] = "Linear", k[k.MipMap = 9987] = "MipMap", k[k.MipMapNearestNearest = 9984] = "MipMapNearestNearest", k[k.MipMapLinearNearest = 9985] = "MipMapLinearNearest", k[k.MipMapNearestLinear = 9986] = "MipMapNearestLinear", k[k.MipMapLinearLinear = 9987] = "MipMapLinearLinear";
})(it || (it = {}));
var Mt;
(function(k) {
  k[k.MirroredRepeat = 33648] = "MirroredRepeat", k[k.ClampToEdge = 33071] = "ClampToEdge", k[k.Repeat = 10497] = "Repeat";
})(Mt || (Mt = {}));
var Qs = class {
  constructor() {
    u(this, "texture");
    u(this, "u", 0);
    u(this, "v", 0);
    u(this, "u2", 0);
    u(this, "v2", 0);
    u(this, "width", 0);
    u(this, "height", 0);
    u(this, "degrees", 0);
    u(this, "offsetX", 0);
    u(this, "offsetY", 0);
    u(this, "originalWidth", 0);
    u(this, "originalHeight", 0);
  }
};
var Js = class {
  constructor(t) {
    u(this, "pages", new Array());
    u(this, "regions", new Array());
    let e = new Zs(t), i = new Array(4), s = {};
    s.size = (l) => {
      l.width = parseInt(i[1]), l.height = parseInt(i[2]);
    }, s.format = () => {
    }, s.filter = (l) => {
      l.minFilter = V.enumValue(it, i[1]), l.magFilter = V.enumValue(it, i[2]);
    }, s.repeat = (l) => {
      i[1].indexOf("x") != -1 && (l.uWrap = Mt.Repeat), i[1].indexOf("y") != -1 && (l.vWrap = Mt.Repeat);
    }, s.pma = (l) => {
      l.pma = i[1] == "true";
    };
    var n = {};
    n.xy = (l) => {
      l.x = parseInt(i[1]), l.y = parseInt(i[2]);
    }, n.size = (l) => {
      l.width = parseInt(i[1]), l.height = parseInt(i[2]);
    }, n.bounds = (l) => {
      l.x = parseInt(i[1]), l.y = parseInt(i[2]), l.width = parseInt(i[3]), l.height = parseInt(i[4]);
    }, n.offset = (l) => {
      l.offsetX = parseInt(i[1]), l.offsetY = parseInt(i[2]);
    }, n.orig = (l) => {
      l.originalWidth = parseInt(i[1]), l.originalHeight = parseInt(i[2]);
    }, n.offsets = (l) => {
      l.offsetX = parseInt(i[1]), l.offsetY = parseInt(i[2]), l.originalWidth = parseInt(i[3]), l.originalHeight = parseInt(i[4]);
    }, n.rotate = (l) => {
      let c = i[1];
      c == "true" ? l.degrees = 90 : c != "false" && (l.degrees = parseInt(c));
    }, n.index = (l) => {
      l.index = parseInt(i[1]);
    };
    let o = e.readLine();
    for (; o && o.trim().length == 0; )
      o = e.readLine();
    for (; !(!o || o.trim().length == 0 || e.readEntry(i, o) == 0); )
      o = e.readLine();
    let a = null, h = null, r = null;
    for (; o !== null; )
      if (o.trim().length == 0)
        a = null, o = e.readLine();
      else if (a) {
        let l = new Is(a, o);
        for (; ; ) {
          let c = e.readEntry(i, o = e.readLine());
          if (c == 0)
            break;
          let f = n[i[0]];
          if (f)
            f(l);
          else {
            h || (h = []), r || (r = []), h.push(i[0]);
            let d = [];
            for (let m = 0; m < c; m++)
              d.push(parseInt(i[m + 1]));
            r.push(d);
          }
        }
        l.originalWidth == 0 && l.originalHeight == 0 && (l.originalWidth = l.width, l.originalHeight = l.height), h && h.length > 0 && r && r.length > 0 && (l.names = h, l.values = r, h = null, r = null), l.u = l.x / a.width, l.v = l.y / a.height, l.degrees == 90 ? (l.u2 = (l.x + l.height) / a.width, l.v2 = (l.y + l.width) / a.height) : (l.u2 = (l.x + l.width) / a.width, l.v2 = (l.y + l.height) / a.height), this.regions.push(l);
      } else {
        for (a = new ti(o.trim()); e.readEntry(i, o = e.readLine()) != 0; ) {
          let l = s[i[0]];
          l && l(a);
        }
        this.pages.push(a);
      }
  }
  findRegion(t) {
    for (let e = 0; e < this.regions.length; e++)
      if (this.regions[e].name == t)
        return this.regions[e];
    return null;
  }
  setTextures(t, e = "") {
    for (let i of this.pages)
      i.setTexture(t.get(e + i.name));
  }
  dispose() {
    var t;
    for (let e = 0; e < this.pages.length; e++)
      (t = this.pages[e].texture) == null || t.dispose();
  }
};
var Zs = class {
  constructor(t) {
    u(this, "lines");
    u(this, "index", 0);
    this.lines = t.split(/\r\n|\r|\n/);
  }
  readLine() {
    return this.index >= this.lines.length ? null : this.lines[this.index++];
  }
  readEntry(t, e) {
    if (!e || (e = e.trim(), e.length == 0))
      return 0;
    let i = e.indexOf(":");
    if (i == -1)
      return 0;
    t[0] = e.substr(0, i).trim();
    for (let s = 1, n = i + 1; ; s++) {
      let o = e.indexOf(",", n);
      if (o == -1)
        return t[s] = e.substr(n).trim(), s;
      if (t[s] = e.substr(n, o - n).trim(), n = o + 1, s == 4)
        return 4;
    }
  }
};
var ti = class {
  constructor(t) {
    u(this, "name");
    u(this, "minFilter", it.Nearest);
    u(this, "magFilter", it.Nearest);
    u(this, "uWrap", Mt.ClampToEdge);
    u(this, "vWrap", Mt.ClampToEdge);
    u(this, "texture", null);
    u(this, "width", 0);
    u(this, "height", 0);
    u(this, "pma", false);
    u(this, "regions", new Array());
    this.name = t;
  }
  setTexture(t) {
    this.texture = t, t.setFilters(this.minFilter, this.magFilter), t.setWraps(this.uWrap, this.vWrap);
    for (let e of this.regions)
      e.texture = t;
  }
};
var Is = class extends Qs {
  constructor(e, i) {
    super();
    u(this, "page");
    u(this, "name");
    u(this, "x", 0);
    u(this, "y", 0);
    u(this, "offsetX", 0);
    u(this, "offsetY", 0);
    u(this, "originalWidth", 0);
    u(this, "originalHeight", 0);
    u(this, "index", 0);
    u(this, "degrees", 0);
    u(this, "names", null);
    u(this, "values", null);
    this.page = e, this.name = i, e.regions.push(this);
  }
};
var wt = class _wt extends yt {
  constructor(e, i) {
    super(e);
    u(this, "region", null);
    u(this, "path");
    u(this, "regionUVs", []);
    u(this, "uvs", []);
    u(this, "triangles", []);
    u(this, "color", new q(1, 1, 1, 1));
    u(this, "width", 0);
    u(this, "height", 0);
    u(this, "hullLength", 0);
    u(this, "edges", []);
    u(this, "parentMesh", null);
    u(this, "sequence", null);
    u(this, "tempColor", new q(0, 0, 0, 0));
    this.path = i;
  }
  /** Calculates {@link #uvs} using the {@link #regionUVs} and region. Must be called if the region, the region's properties, or
   * the {@link #regionUVs} are changed. */
  updateRegion() {
    if (!this.region)
      throw new Error("Region not set.");
    let e = this.regionUVs;
    (!this.uvs || this.uvs.length != e.length) && (this.uvs = V.newFloatArray(e.length));
    let i = this.uvs, s = this.uvs.length, n = this.region.u, o = this.region.v, a = 0, h = 0;
    if (this.region instanceof Is) {
      let r = this.region, l = r.page, c = l.width, f = l.height;
      switch (r.degrees) {
        case 90:
          n -= (r.originalHeight - r.offsetY - r.height) / c, o -= (r.originalWidth - r.offsetX - r.width) / f, a = r.originalHeight / c, h = r.originalWidth / f;
          for (let d = 0; d < s; d += 2)
            i[d] = n + e[d + 1] * a, i[d + 1] = o + (1 - e[d]) * h;
          return;
        case 180:
          n -= (r.originalWidth - r.offsetX - r.width) / c, o -= r.offsetY / f, a = r.originalWidth / c, h = r.originalHeight / f;
          for (let d = 0; d < s; d += 2)
            i[d] = n + (1 - e[d]) * a, i[d + 1] = o + (1 - e[d + 1]) * h;
          return;
        case 270:
          n -= r.offsetY / c, o -= r.offsetX / f, a = r.originalHeight / c, h = r.originalWidth / f;
          for (let d = 0; d < s; d += 2)
            i[d] = n + (1 - e[d + 1]) * a, i[d + 1] = o + e[d] * h;
          return;
      }
      n -= r.offsetX / c, o -= (r.originalHeight - r.offsetY - r.height) / f, a = r.originalWidth / c, h = r.originalHeight / f;
    } else this.region ? (a = this.region.u2 - n, h = this.region.v2 - o) : (n = o = 0, a = h = 1);
    for (let r = 0; r < s; r += 2)
      i[r] = n + e[r] * a, i[r + 1] = o + e[r + 1] * h;
  }
  /** The parent mesh if this is a linked mesh, else null. A linked mesh shares the {@link #bones}, {@link #vertices},
   * {@link #regionUVs}, {@link #triangles}, {@link #hullLength}, {@link #edges}, {@link #width}, and {@link #height} with the
   * parent mesh, but may have a different {@link #name} or {@link #path} (and therefore a different texture). */
  getParentMesh() {
    return this.parentMesh;
  }
  /** @param parentMesh May be null. */
  setParentMesh(e) {
    this.parentMesh = e, e && (this.bones = e.bones, this.vertices = e.vertices, this.worldVerticesLength = e.worldVerticesLength, this.regionUVs = e.regionUVs, this.triangles = e.triangles, this.hullLength = e.hullLength, this.worldVerticesLength = e.worldVerticesLength);
  }
  copy() {
    if (this.parentMesh)
      return this.newLinkedMesh();
    let e = new _wt(this.name, this.path);
    return e.region = this.region, e.color.setFromColor(this.color), this.copyTo(e), e.regionUVs = new Array(this.regionUVs.length), V.arrayCopy(this.regionUVs, 0, e.regionUVs, 0, this.regionUVs.length), e.uvs = new Array(this.uvs.length), V.arrayCopy(this.uvs, 0, e.uvs, 0, this.uvs.length), e.triangles = new Array(this.triangles.length), V.arrayCopy(this.triangles, 0, e.triangles, 0, this.triangles.length), e.hullLength = this.hullLength, e.sequence = this.sequence != null ? this.sequence.copy() : null, this.edges && (e.edges = new Array(this.edges.length), V.arrayCopy(this.edges, 0, e.edges, 0, this.edges.length)), e.width = this.width, e.height = this.height, e;
  }
  computeWorldVertices(e, i, s, n, o, a) {
    this.sequence != null && this.sequence.apply(e, this), super.computeWorldVertices(e, i, s, n, o, a);
  }
  /** Returns a new mesh with the {@link #parentMesh} set to this mesh's parent mesh, if any, else to this mesh. **/
  newLinkedMesh() {
    let e = new _wt(this.name, this.path);
    return e.region = this.region, e.color.setFromColor(this.color), e.timelineAttachment = this.timelineAttachment, e.setParentMesh(this.parentMesh ? this.parentMesh : this), e.region != null && e.updateRegion(), e;
  }
};
var Ut = class _Ut extends yt {
  constructor(e) {
    super(e);
    u(this, "lengths", []);
    u(this, "closed", false);
    u(this, "constantSpeed", false);
    u(this, "color", new q(1, 1, 1, 1));
  }
  copy() {
    let e = new _Ut(this.name);
    return this.copyTo(e), e.lengths = new Array(this.lengths.length), V.arrayCopy(this.lengths, 0, e.lengths, 0, this.lengths.length), e.closed = closed, e.constantSpeed = this.constantSpeed, e.color.setFromColor(this.color), e;
  }
};
var Xe = class _Xe extends yt {
  constructor(e) {
    super(e);
    u(this, "x", 0);
    u(this, "y", 0);
    u(this, "rotation", 0);
    u(this, "color", new q(0.38, 0.94, 0, 1));
  }
  computeWorldPosition(e, i) {
    return i.x = this.x * e.a + this.y * e.b + e.worldX, i.y = this.x * e.c + this.y * e.d + e.worldY, i;
  }
  computeWorldRotation(e) {
    const i = this.rotation * B.degRad, s = Math.cos(i), n = Math.sin(i), o = s * e.a + n * e.b, a = s * e.c + n * e.d;
    return B.atan2Deg(a, o);
  }
  copy() {
    let e = new _Xe(this.name);
    return e.x = this.x, e.y = this.y, e.rotation = this.rotation, e.color.setFromColor(this.color), e;
  }
};
var j = class j2 extends Ke {
  constructor(e, i) {
    super(e);
    u(this, "x", 0);
    u(this, "y", 0);
    u(this, "scaleX", 1);
    u(this, "scaleY", 1);
    u(this, "rotation", 0);
    u(this, "width", 0);
    u(this, "height", 0);
    u(this, "color", new q(1, 1, 1, 1));
    u(this, "path");
    u(this, "region", null);
    u(this, "sequence", null);
    u(this, "offset", V.newFloatArray(8));
    u(this, "uvs", V.newFloatArray(8));
    u(this, "tempColor", new q(1, 1, 1, 1));
    this.path = i;
  }
  /** Calculates the {@link #offset} using the region settings. Must be called after changing region settings. */
  updateRegion() {
    if (!this.region)
      throw new Error("Region not set.");
    let e = this.region, i = this.uvs;
    if (e == null) {
      i[0] = 0, i[1] = 0, i[2] = 0, i[3] = 1, i[4] = 1, i[5] = 1, i[6] = 1, i[7] = 0;
      return;
    }
    let s = this.width / this.region.originalWidth * this.scaleX, n = this.height / this.region.originalHeight * this.scaleY, o = -this.width / 2 * this.scaleX + this.region.offsetX * s, a = -this.height / 2 * this.scaleY + this.region.offsetY * n, h = o + this.region.width * s, r = a + this.region.height * n, l = this.rotation * B.degRad, c = Math.cos(l), f = Math.sin(l), d = this.x, m = this.y, g = o * c + d, b = o * f, w = a * c + m, v = a * f, x = h * c + d, p = h * f, S = r * c + m, y = r * f, A = this.offset;
    A[0] = g - v, A[1] = w + b, A[2] = g - y, A[3] = S + b, A[4] = x - y, A[5] = S + p, A[6] = x - v, A[7] = w + p, e.degrees == 90 ? (i[0] = e.u2, i[1] = e.v2, i[2] = e.u, i[3] = e.v2, i[4] = e.u, i[5] = e.v, i[6] = e.u2, i[7] = e.v) : (i[0] = e.u, i[1] = e.v2, i[2] = e.u, i[3] = e.v, i[4] = e.u2, i[5] = e.v, i[6] = e.u2, i[7] = e.v2);
  }
  /** Transforms the attachment's four vertices to world coordinates. If the attachment has a {@link #sequence}, the region may
   * be changed.
   * <p>
   * See <a href="http://esotericsoftware.com/spine-runtime-skeletons#World-transforms">World transforms</a> in the Spine
   * Runtimes Guide.
   * @param worldVertices The output world vertices. Must have a length >= <code>offset</code> + 8.
   * @param offset The <code>worldVertices</code> index to begin writing values.
   * @param stride The number of <code>worldVertices</code> entries between the value pairs written. */
  computeWorldVertices(e, i, s, n) {
    this.sequence != null && this.sequence.apply(e, this);
    let o = e.bone, a = this.offset, h = o.worldX, r = o.worldY, l = o.a, c = o.b, f = o.c, d = o.d, m = 0, g = 0;
    m = a[0], g = a[1], i[s] = m * l + g * c + h, i[s + 1] = m * f + g * d + r, s += n, m = a[2], g = a[3], i[s] = m * l + g * c + h, i[s + 1] = m * f + g * d + r, s += n, m = a[4], g = a[5], i[s] = m * l + g * c + h, i[s + 1] = m * f + g * d + r, s += n, m = a[6], g = a[7], i[s] = m * l + g * c + h, i[s + 1] = m * f + g * d + r;
  }
  copy() {
    let e = new j2(this.name, this.path);
    return e.region = this.region, e.x = this.x, e.y = this.y, e.scaleX = this.scaleX, e.scaleY = this.scaleY, e.rotation = this.rotation, e.width = this.width, e.height = this.height, V.arrayCopy(this.uvs, 0, e.uvs, 0, 8), V.arrayCopy(this.offset, 0, e.offset, 0, 8), e.color.setFromColor(this.color), e.sequence = this.sequence != null ? this.sequence.copy() : null, e;
  }
};
u(j, "X1", 0), u(j, "Y1", 1), u(j, "C1R", 2), u(j, "C1G", 3), u(j, "C1B", 4), u(j, "C1A", 5), u(j, "U1", 6), u(j, "V1", 7), u(j, "X2", 8), u(j, "Y2", 9), u(j, "C2R", 10), u(j, "C2G", 11), u(j, "C2B", 12), u(j, "C2A", 13), u(j, "U2", 14), u(j, "V2", 15), u(j, "X3", 16), u(j, "Y3", 17), u(j, "C3R", 18), u(j, "C3G", 19), u(j, "C3B", 20), u(j, "C3A", 21), u(j, "U3", 22), u(j, "V3", 23), u(j, "X4", 24), u(j, "Y4", 25), u(j, "C4R", 26), u(j, "C4G", 27), u(j, "C4B", 28), u(j, "C4A", 29), u(j, "U4", 30), u(j, "V4", 31);
var bt = j;
var ei = class {
  constructor(t) {
    u(this, "atlas");
    this.atlas = t;
  }
  loadSequence(t, e, i) {
    let s = i.regions;
    for (let n = 0, o = s.length; n < o; n++) {
      let a = i.getPath(e, n), h = this.atlas.findRegion(a);
      if (h == null)
        throw new Error("Region not found in atlas: " + a + " (sequence: " + t + ")");
      s[n] = h;
    }
  }
  newRegionAttachment(t, e, i, s) {
    let n = new bt(e, i);
    if (s != null)
      this.loadSequence(e, i, s);
    else {
      let o = this.atlas.findRegion(i);
      if (!o)
        throw new Error("Region not found in atlas: " + i + " (region attachment: " + e + ")");
      n.region = o;
    }
    return n;
  }
  newMeshAttachment(t, e, i, s) {
    let n = new wt(e, i);
    if (s != null)
      this.loadSequence(e, i, s);
    else {
      let o = this.atlas.findRegion(i);
      if (!o)
        throw new Error("Region not found in atlas: " + i + " (mesh attachment: " + e + ")");
      n.region = o;
    }
    return n;
  }
  newBoundingBoxAttachment(t, e) {
    return new xe(e);
  }
  newPathAttachment(t, e) {
    return new Ut(e);
  }
  newPointAttachment(t, e) {
    return new Xe(e);
  }
  newClippingAttachment(t, e) {
    return new Pt(e);
  }
};
var Ms = class {
  constructor(t, e, i) {
    u(this, "index", 0);
    u(this, "name");
    u(this, "parent", null);
    u(this, "length", 0);
    u(this, "x", 0);
    u(this, "y", 0);
    u(this, "rotation", 0);
    u(this, "scaleX", 1);
    u(this, "scaleY", 1);
    u(this, "shearX", 0);
    u(this, "shearY", 0);
    u(this, "inherit", Z.Normal);
    u(this, "skinRequired", false);
    u(this, "color", new q());
    u(this, "icon");
    u(this, "visible", false);
    if (t < 0)
      throw new Error("index must be >= 0.");
    if (!e)
      throw new Error("name cannot be null.");
    this.index = t, this.name = e, this.parent = i;
  }
};
var Z;
(function(k) {
  k[k.Normal = 0] = "Normal", k[k.OnlyTranslation = 1] = "OnlyTranslation", k[k.NoRotationOrReflection = 2] = "NoRotationOrReflection", k[k.NoScale = 3] = "NoScale", k[k.NoScaleOrReflection = 4] = "NoScaleOrReflection";
})(Z || (Z = {}));
var ze = class {
  /** @param parent May be null. */
  constructor(t, e, i) {
    u(this, "data");
    u(this, "skeleton");
    u(this, "parent", null);
    u(this, "children", new Array());
    u(this, "x", 0);
    u(this, "y", 0);
    u(this, "rotation", 0);
    u(this, "scaleX", 0);
    u(this, "scaleY", 0);
    u(this, "shearX", 0);
    u(this, "shearY", 0);
    u(this, "ax", 0);
    u(this, "ay", 0);
    u(this, "arotation", 0);
    u(this, "ascaleX", 0);
    u(this, "ascaleY", 0);
    u(this, "ashearX", 0);
    u(this, "ashearY", 0);
    u(this, "a", 0);
    u(this, "b", 0);
    u(this, "c", 0);
    u(this, "d", 0);
    u(this, "worldY", 0);
    u(this, "worldX", 0);
    u(this, "inherit", Z.Normal);
    u(this, "sorted", false);
    u(this, "active", false);
    if (!t)
      throw new Error("data cannot be null.");
    if (!e)
      throw new Error("skeleton cannot be null.");
    this.data = t, this.skeleton = e, this.parent = i, this.setToSetupPose();
  }
  /** Returns false when the bone has not been computed because {@link BoneData#skinRequired} is true and the
    * {@link Skeleton#skin active skin} does not {@link Skin#bones contain} this bone. */
  isActive() {
    return this.active;
  }
  /** Computes the world transform using the parent bone and this bone's local applied transform. */
  update(t) {
    this.updateWorldTransformWith(this.ax, this.ay, this.arotation, this.ascaleX, this.ascaleY, this.ashearX, this.ashearY);
  }
  /** Computes the world transform using the parent bone and this bone's local transform.
   *
   * See {@link #updateWorldTransformWith()}. */
  updateWorldTransform() {
    this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY);
  }
  /** Computes the world transform using the parent bone and the specified local transform. The applied transform is set to the
   * specified local transform. Child bones are not updated.
   *
   * See [World transforms](http://esotericsoftware.com/spine-runtime-skeletons#World-transforms) in the Spine
   * Runtimes Guide. */
  updateWorldTransformWith(t, e, i, s, n, o, a) {
    this.ax = t, this.ay = e, this.arotation = i, this.ascaleX = s, this.ascaleY = n, this.ashearX = o, this.ashearY = a;
    let h = this.parent;
    if (!h) {
      let d = this.skeleton;
      const m = d.scaleX, g = d.scaleY, b = (i + o) * B.degRad, w = (i + 90 + a) * B.degRad;
      this.a = Math.cos(b) * s * m, this.b = Math.cos(w) * n * m, this.c = Math.sin(b) * s * g, this.d = Math.sin(w) * n * g, this.worldX = t * m + d.x, this.worldY = e * g + d.y;
      return;
    }
    let r = h.a, l = h.b, c = h.c, f = h.d;
    switch (this.worldX = r * t + l * e + h.worldX, this.worldY = c * t + f * e + h.worldY, this.inherit) {
      case Z.Normal: {
        const d = (i + o) * B.degRad, m = (i + 90 + a) * B.degRad, g = Math.cos(d) * s, b = Math.cos(m) * n, w = Math.sin(d) * s, v = Math.sin(m) * n;
        this.a = r * g + l * w, this.b = r * b + l * v, this.c = c * g + f * w, this.d = c * b + f * v;
        return;
      }
      case Z.OnlyTranslation: {
        const d = (i + o) * B.degRad, m = (i + 90 + a) * B.degRad;
        this.a = Math.cos(d) * s, this.b = Math.cos(m) * n, this.c = Math.sin(d) * s, this.d = Math.sin(m) * n;
        break;
      }
      case Z.NoRotationOrReflection: {
        let d = 1 / this.skeleton.scaleX, m = 1 / this.skeleton.scaleY;
        r *= d, c *= m;
        let g = r * r + c * c, b = 0;
        g > 1e-4 ? (g = Math.abs(r * f * m - l * d * c) / g, l = c * g, f = r * g, b = Math.atan2(c, r) * B.radDeg) : (r = 0, c = 0, b = 90 - Math.atan2(f, l) * B.radDeg);
        const w = (i + o - b) * B.degRad, v = (i + a - b + 90) * B.degRad, x = Math.cos(w) * s, p = Math.cos(v) * n, S = Math.sin(w) * s, y = Math.sin(v) * n;
        this.a = r * x - l * S, this.b = r * p - l * y, this.c = c * x + f * S, this.d = c * p + f * y;
        break;
      }
      case Z.NoScale:
      case Z.NoScaleOrReflection: {
        i *= B.degRad;
        const d = Math.cos(i), m = Math.sin(i);
        let g = (r * d + l * m) / this.skeleton.scaleX, b = (c * d + f * m) / this.skeleton.scaleY, w = Math.sqrt(g * g + b * b);
        w > 1e-5 && (w = 1 / w), g *= w, b *= w, w = Math.sqrt(g * g + b * b), this.inherit == Z.NoScale && r * f - l * c < 0 != (this.skeleton.scaleX < 0 != this.skeleton.scaleY < 0) && (w = -w), i = Math.PI / 2 + Math.atan2(b, g);
        const v = Math.cos(i) * w, x = Math.sin(i) * w;
        o *= B.degRad, a = (90 + a) * B.degRad;
        const p = Math.cos(o) * s, S = Math.cos(a) * n, y = Math.sin(o) * s, A = Math.sin(a) * n;
        this.a = g * p + v * y, this.b = g * S + v * A, this.c = b * p + x * y, this.d = b * S + x * A;
        break;
      }
    }
    this.a *= this.skeleton.scaleX, this.b *= this.skeleton.scaleX, this.c *= this.skeleton.scaleY, this.d *= this.skeleton.scaleY;
  }
  /** Sets this bone's local transform to the setup pose. */
  setToSetupPose() {
    let t = this.data;
    this.x = t.x, this.y = t.y, this.rotation = t.rotation, this.scaleX = t.scaleX, this.scaleY = t.scaleY, this.shearX = t.shearX, this.shearY = t.shearY, this.inherit = t.inherit;
  }
  /** Computes the applied transform values from the world transform.
   *
   * If the world transform is modified (by a constraint, {@link #rotateWorld(float)}, etc) then this method should be called so
   * the applied transform matches the world transform. The applied transform may be needed by other code (eg to apply other
   * constraints).
   *
   * Some information is ambiguous in the world transform, such as -1,-1 scale versus 180 rotation. The applied transform after
   * calling this method is equivalent to the local transform used to compute the world transform, but may not be identical. */
  updateAppliedTransform() {
    let t = this.parent;
    if (!t) {
      this.ax = this.worldX - this.skeleton.x, this.ay = this.worldY - this.skeleton.y, this.arotation = Math.atan2(this.c, this.a) * B.radDeg, this.ascaleX = Math.sqrt(this.a * this.a + this.c * this.c), this.ascaleY = Math.sqrt(this.b * this.b + this.d * this.d), this.ashearX = 0, this.ashearY = Math.atan2(this.a * this.b + this.c * this.d, this.a * this.d - this.b * this.c) * B.radDeg;
      return;
    }
    let e = t.a, i = t.b, s = t.c, n = t.d, o = 1 / (e * n - i * s), a = n * o, h = i * o, r = s * o, l = e * o, c = this.worldX - t.worldX, f = this.worldY - t.worldY;
    this.ax = c * a - f * h, this.ay = f * l - c * r;
    let d, m, g, b;
    if (this.inherit == Z.OnlyTranslation)
      d = this.a, m = this.b, g = this.c, b = this.d;
    else {
      switch (this.inherit) {
        case Z.NoRotationOrReflection: {
          let S = Math.abs(e * n - i * s) / (e * e + s * s);
          i = -s * this.skeleton.scaleX * S / this.skeleton.scaleY, n = e * this.skeleton.scaleY * S / this.skeleton.scaleX, o = 1 / (e * n - i * s), a = n * o, h = i * o;
          break;
        }
        case Z.NoScale:
        case Z.NoScaleOrReflection:
          let w = B.cosDeg(this.rotation), v = B.sinDeg(this.rotation);
          e = (e * w + i * v) / this.skeleton.scaleX, s = (s * w + n * v) / this.skeleton.scaleY;
          let x = Math.sqrt(e * e + s * s);
          x > 1e-5 && (x = 1 / x), e *= x, s *= x, x = Math.sqrt(e * e + s * s), this.inherit == Z.NoScale && o < 0 != (this.skeleton.scaleX < 0 != this.skeleton.scaleY < 0) && (x = -x);
          let p = B.PI / 2 + Math.atan2(s, e);
          i = Math.cos(p) * x, n = Math.sin(p) * x, o = 1 / (e * n - i * s), a = n * o, h = i * o, r = s * o, l = e * o;
      }
      d = a * this.a - h * this.c, m = a * this.b - h * this.d, g = l * this.c - r * this.a, b = l * this.d - r * this.b;
    }
    if (this.ashearX = 0, this.ascaleX = Math.sqrt(d * d + g * g), this.ascaleX > 1e-4) {
      let w = d * b - m * g;
      this.ascaleY = w / this.ascaleX, this.ashearY = -Math.atan2(d * m + g * b, w) * B.radDeg, this.arotation = Math.atan2(g, d) * B.radDeg;
    } else
      this.ascaleX = 0, this.ascaleY = Math.sqrt(m * m + b * b), this.ashearY = 0, this.arotation = 90 - Math.atan2(b, m) * B.radDeg;
  }
  /** The world rotation for the X axis, calculated using {@link #a} and {@link #c}. */
  getWorldRotationX() {
    return Math.atan2(this.c, this.a) * B.radDeg;
  }
  /** The world rotation for the Y axis, calculated using {@link #b} and {@link #d}. */
  getWorldRotationY() {
    return Math.atan2(this.d, this.b) * B.radDeg;
  }
  /** The magnitude (always positive) of the world scale X, calculated using {@link #a} and {@link #c}. */
  getWorldScaleX() {
    return Math.sqrt(this.a * this.a + this.c * this.c);
  }
  /** The magnitude (always positive) of the world scale Y, calculated using {@link #b} and {@link #d}. */
  getWorldScaleY() {
    return Math.sqrt(this.b * this.b + this.d * this.d);
  }
  /** Transforms a point from world coordinates to the bone's local coordinates. */
  worldToLocal(t) {
    let e = 1 / (this.a * this.d - this.b * this.c), i = t.x - this.worldX, s = t.y - this.worldY;
    return t.x = i * this.d * e - s * this.b * e, t.y = s * this.a * e - i * this.c * e, t;
  }
  /** Transforms a point from the bone's local coordinates to world coordinates. */
  localToWorld(t) {
    let e = t.x, i = t.y;
    return t.x = e * this.a + i * this.b + this.worldX, t.y = e * this.c + i * this.d + this.worldY, t;
  }
  /** Transforms a point from world coordinates to the parent bone's local coordinates. */
  worldToParent(t) {
    if (t == null)
      throw new Error("world cannot be null.");
    return this.parent == null ? t : this.parent.worldToLocal(t);
  }
  /** Transforms a point from the parent bone's coordinates to world coordinates. */
  parentToWorld(t) {
    if (t == null)
      throw new Error("world cannot be null.");
    return this.parent == null ? t : this.parent.localToWorld(t);
  }
  /** Transforms a world rotation to a local rotation. */
  worldToLocalRotation(t) {
    let e = B.sinDeg(t), i = B.cosDeg(t);
    return Math.atan2(this.a * e - this.c * i, this.d * i - this.b * e) * B.radDeg + this.rotation - this.shearX;
  }
  /** Transforms a local rotation to a world rotation. */
  localToWorldRotation(t) {
    t -= this.rotation - this.shearX;
    let e = B.sinDeg(t), i = B.cosDeg(t);
    return Math.atan2(i * this.c + e * this.d, i * this.a + e * this.b) * B.radDeg;
  }
  /** Rotates the world transform the specified amount.
   * <p>
   * After changes are made to the world transform, {@link #updateAppliedTransform()} should be called and
   * {@link #update(Physics)} will need to be called on any child bones, recursively. */
  rotateWorld(t) {
    t *= B.degRad;
    const e = Math.sin(t), i = Math.cos(t), s = this.a, n = this.b;
    this.a = i * s - e * this.c, this.b = i * n - e * this.d, this.c = e * s + i * this.c, this.d = e * n + i * this.d;
  }
};
var be = class {
  constructor(t, e, i) {
    u(this, "name");
    u(this, "order");
    u(this, "skinRequired");
    this.name = t, this.order = e, this.skinRequired = i;
  }
};
var Ys = class {
  constructor(t, e) {
    u(this, "data");
    u(this, "intValue", 0);
    u(this, "floatValue", 0);
    u(this, "stringValue", null);
    u(this, "time", 0);
    u(this, "volume", 0);
    u(this, "balance", 0);
    if (!e)
      throw new Error("data cannot be null.");
    this.time = t, this.data = e;
  }
};
var Ts = class {
  constructor(t) {
    u(this, "name");
    u(this, "intValue", 0);
    u(this, "floatValue", 0);
    u(this, "stringValue", null);
    u(this, "audioPath", null);
    u(this, "volume", 0);
    u(this, "balance", 0);
    this.name = t;
  }
};
var si = class {
  constructor(t, e) {
    u(this, "data");
    u(this, "bones");
    u(this, "target");
    u(this, "bendDirection", 0);
    u(this, "compress", false);
    u(this, "stretch", false);
    u(this, "mix", 1);
    u(this, "softness", 0);
    u(this, "active", false);
    if (!t)
      throw new Error("data cannot be null.");
    if (!e)
      throw new Error("skeleton cannot be null.");
    this.data = t, this.bones = new Array();
    for (let s = 0; s < t.bones.length; s++) {
      let n = e.findBone(t.bones[s].name);
      if (!n)
        throw new Error(`Couldn't find bone ${t.bones[s].name}`);
      this.bones.push(n);
    }
    let i = e.findBone(t.target.name);
    if (!i)
      throw new Error(`Couldn't find bone ${t.target.name}`);
    this.target = i, this.mix = t.mix, this.softness = t.softness, this.bendDirection = t.bendDirection, this.compress = t.compress, this.stretch = t.stretch;
  }
  isActive() {
    return this.active;
  }
  setToSetupPose() {
    const t = this.data;
    this.mix = t.mix, this.softness = t.softness, this.bendDirection = t.bendDirection, this.compress = t.compress, this.stretch = t.stretch;
  }
  update(t) {
    if (this.mix == 0)
      return;
    let e = this.target, i = this.bones;
    switch (i.length) {
      case 1:
        this.apply1(i[0], e.worldX, e.worldY, this.compress, this.stretch, this.data.uniform, this.mix);
        break;
      case 2:
        this.apply2(i[0], i[1], e.worldX, e.worldY, this.bendDirection, this.stretch, this.data.uniform, this.softness, this.mix);
        break;
    }
  }
  /** Applies 1 bone IK. The target is specified in the world coordinate system. */
  apply1(t, e, i, s, n, o, a) {
    let h = t.parent;
    if (!h)
      throw new Error("IK bone must have parent.");
    let r = h.a, l = h.b, c = h.c, f = h.d, d = -t.ashearX - t.arotation, m = 0, g = 0;
    switch (t.inherit) {
      case Z.OnlyTranslation:
        m = (e - t.worldX) * B.signum(t.skeleton.scaleX), g = (i - t.worldY) * B.signum(t.skeleton.scaleY);
        break;
      case Z.NoRotationOrReflection:
        let v = Math.abs(r * f - l * c) / Math.max(1e-4, r * r + c * c), x = r / t.skeleton.scaleX, p = c / t.skeleton.scaleY;
        l = -p * v * t.skeleton.scaleX, f = x * v * t.skeleton.scaleY, d += Math.atan2(p, x) * B.radDeg;
      default:
        let S = e - h.worldX, y = i - h.worldY, A = r * f - l * c;
        Math.abs(A) <= 1e-4 ? (m = 0, g = 0) : (m = (S * f - y * l) / A - t.ax, g = (y * r - S * c) / A - t.ay);
    }
    d += Math.atan2(g, m) * B.radDeg, t.ascaleX < 0 && (d += 180), d > 180 ? d -= 360 : d < -180 && (d += 360);
    let b = t.ascaleX, w = t.ascaleY;
    if (s || n) {
      switch (t.inherit) {
        case Z.NoScale:
        case Z.NoScaleOrReflection:
          m = e - t.worldX, g = i - t.worldY;
      }
      const v = t.data.length * b;
      if (v > 1e-4) {
        const x = m * m + g * g;
        if (s && x < v * v || n && x > v * v) {
          const p = (Math.sqrt(x) / v - 1) * a + 1;
          b *= p, o && (w *= p);
        }
      }
    }
    t.updateWorldTransformWith(t.ax, t.ay, t.arotation + d * a, b, w, t.ashearX, t.ashearY);
  }
  /** Applies 2 bone IK. The target is specified in the world coordinate system.
   * @param child A direct descendant of the parent bone. */
  apply2(t, e, i, s, n, o, a, h, r) {
    if (t.inherit != Z.Normal || e.inherit != Z.Normal)
      return;
    let l = t.ax, c = t.ay, f = t.ascaleX, d = t.ascaleY, m = f, g = d, b = e.ascaleX, w = 0, v = 0, x = 0;
    f < 0 ? (f = -f, w = 180, x = -1) : (w = 0, x = 1), d < 0 && (d = -d, x = -x), b < 0 ? (b = -b, v = 180) : v = 0;
    let p = e.ax, S = 0, y = 0, A = 0, C = t.a, M = t.b, F = t.c, T = t.d, P = Math.abs(f - d) <= 1e-4;
    !P || o ? (S = 0, y = C * p + t.worldX, A = F * p + t.worldY) : (S = e.ay, y = C * p + M * S + t.worldX, A = F * p + T * S + t.worldY);
    let R = t.parent;
    if (!R)
      throw new Error("IK parent must itself have a parent.");
    C = R.a, M = R.b, F = R.c, T = R.d;
    let Y = C * T - M * F, X = y - R.worldX, O2 = A - R.worldY;
    Y = Math.abs(Y) <= 1e-4 ? 0 : 1 / Y;
    let N = (X * T - O2 * M) * Y - l, z = (O2 * C - X * F) * Y - c, L = Math.sqrt(N * N + z * z), H = e.data.length * b, K, Q;
    if (L < 1e-4) {
      this.apply1(t, i, s, false, o, false, r), e.updateWorldTransformWith(p, S, 0, e.ascaleX, e.ascaleY, e.ashearX, e.ashearY);
      return;
    }
    X = i - R.worldX, O2 = s - R.worldY;
    let D = (X * T - O2 * M) * Y - l, U = (O2 * C - X * F) * Y - c, G = D * D + U * U;
    if (h != 0) {
      h *= f * (b + 1) * 0.5;
      let tt = Math.sqrt(G), nt = tt - L - H * f + h;
      if (nt > 0) {
        let at = Math.min(1, nt / (h * 2)) - 1;
        at = (nt - h * (1 - at * at)) / tt, D -= at * D, U -= at * U, G = D * D + U * U;
      }
    }
    t: if (P) {
      H *= f;
      let tt = (G - L * L - H * H) / (2 * L * H);
      tt < -1 ? (tt = -1, Q = Math.PI * n) : tt > 1 ? (tt = 1, Q = 0, o && (C = (Math.sqrt(G) / (L + H) - 1) * r + 1, m *= C, a && (g *= C))) : Q = Math.acos(tt) * n, C = L + H * tt, M = H * Math.sin(Q), K = Math.atan2(U * C - D * M, D * C + U * M);
    } else {
      C = f * H, M = d * H;
      let tt = C * C, nt = M * M, at = Math.atan2(U, D);
      F = nt * L * L + tt * G - tt * nt;
      let Yt = -2 * nt * L, $t = nt - tt;
      if (T = Yt * Yt - 4 * $t * F, T >= 0) {
        let Ot = Math.sqrt(T);
        Yt < 0 && (Ot = -Ot), Ot = -(Yt + Ot) * 0.5;
        let Ht = Ot / $t, Oe = F / Ot, Jt = Math.abs(Ht) < Math.abs(Oe) ? Ht : Oe;
        if (Ht = G - Jt * Jt, Ht >= 0) {
          O2 = Math.sqrt(Ht) * n, K = at - Math.atan2(O2, Jt), Q = Math.atan2(O2 / d, (Jt - L) / f);
          break t;
        }
      }
      let Re = B.PI, Kt = L - C, we = Kt * Kt, Pe = 0, Be = 0, Qt = L + C, ye = Qt * Qt, Ve = 0;
      F = -C * L / (tt - nt), F >= -1 && F <= 1 && (F = Math.acos(F), X = C * Math.cos(F) + L, O2 = M * Math.sin(F), T = X * X + O2 * O2, T < we && (Re = F, we = T, Kt = X, Pe = O2), T > ye && (Be = F, ye = T, Qt = X, Ve = O2)), G <= (we + ye) * 0.5 ? (K = at - Math.atan2(Pe * n, Kt), Q = Re * n) : (K = at - Math.atan2(Ve * n, Qt), Q = Be * n);
    }
    let mt = Math.atan2(S, p) * x, ht = t.arotation;
    K = (K - mt) * B.radDeg + w - ht, K > 180 ? K -= 360 : K < -180 && (K += 360), t.updateWorldTransformWith(l, c, ht + K * r, m, g, 0, 0), ht = e.arotation, Q = ((Q + mt) * B.radDeg - e.ashearX) * x + v - ht, Q > 180 ? Q -= 360 : Q < -180 && (Q += 360), e.updateWorldTransformWith(p, S, ht + Q * r, e.ascaleX, e.ascaleY, e.ashearX, e.ashearY);
  }
};
var Fs = class extends be {
  constructor(e) {
    super(e, 0, false);
    u(this, "bones", new Array());
    u(this, "_target", null);
    u(this, "bendDirection", 0);
    u(this, "compress", false);
    u(this, "stretch", false);
    u(this, "uniform", false);
    u(this, "mix", 0);
    u(this, "softness", 0);
  }
  set target(e) {
    this._target = e;
  }
  get target() {
    if (this._target)
      return this._target;
    throw new Error("BoneData not set.");
  }
};
var Xs = class extends be {
  constructor(e) {
    super(e, 0, false);
    u(this, "bones", new Array());
    u(this, "_target", null);
    u(this, "positionMode", At.Fixed);
    u(this, "spacingMode", st.Fixed);
    u(this, "rotateMode", Bt.Chain);
    u(this, "offsetRotation", 0);
    u(this, "position", 0);
    u(this, "spacing", 0);
    u(this, "mixRotate", 0);
    u(this, "mixX", 0);
    u(this, "mixY", 0);
  }
  set target(e) {
    this._target = e;
  }
  get target() {
    if (this._target)
      return this._target;
    throw new Error("SlotData not set.");
  }
};
var At;
(function(k) {
  k[k.Fixed = 0] = "Fixed", k[k.Percent = 1] = "Percent";
})(At || (At = {}));
var st;
(function(k) {
  k[k.Length = 0] = "Length", k[k.Fixed = 1] = "Fixed", k[k.Percent = 2] = "Percent", k[k.Proportional = 3] = "Proportional";
})(st || (st = {}));
var Bt;
(function(k) {
  k[k.Tangent = 0] = "Tangent", k[k.Chain = 1] = "Chain", k[k.ChainScale = 2] = "ChainScale";
})(Bt || (Bt = {}));
var ut = class ut2 {
  constructor(t, e) {
    u(this, "data");
    u(this, "bones");
    u(this, "target");
    u(this, "position", 0);
    u(this, "spacing", 0);
    u(this, "mixRotate", 0);
    u(this, "mixX", 0);
    u(this, "mixY", 0);
    u(this, "spaces", new Array());
    u(this, "positions", new Array());
    u(this, "world", new Array());
    u(this, "curves", new Array());
    u(this, "lengths", new Array());
    u(this, "segments", new Array());
    u(this, "active", false);
    if (!t)
      throw new Error("data cannot be null.");
    if (!e)
      throw new Error("skeleton cannot be null.");
    this.data = t, this.bones = new Array();
    for (let s = 0, n = t.bones.length; s < n; s++) {
      let o = e.findBone(t.bones[s].name);
      if (!o)
        throw new Error(`Couldn't find bone ${t.bones[s].name}.`);
      this.bones.push(o);
    }
    let i = e.findSlot(t.target.name);
    if (!i)
      throw new Error(`Couldn't find target bone ${t.target.name}`);
    this.target = i, this.position = t.position, this.spacing = t.spacing, this.mixRotate = t.mixRotate, this.mixX = t.mixX, this.mixY = t.mixY;
  }
  isActive() {
    return this.active;
  }
  setToSetupPose() {
    const t = this.data;
    this.position = t.position, this.spacing = t.spacing, this.mixRotate = t.mixRotate, this.mixX = t.mixX, this.mixY = t.mixY;
  }
  update(t) {
    let e = this.target.getAttachment();
    if (!(e instanceof Ut))
      return;
    let i = this.mixRotate, s = this.mixX, n = this.mixY;
    if (i == 0 && s == 0 && n == 0)
      return;
    let o = this.data, a = o.rotateMode == Bt.Tangent, h = o.rotateMode == Bt.ChainScale, r = this.bones, l = r.length, c = a ? l : l + 1, f = V.setArraySize(this.spaces, c), d = h ? this.lengths = V.setArraySize(this.lengths, l) : [], m = this.spacing;
    switch (o.spacingMode) {
      case st.Percent:
        if (h)
          for (let y = 0, A = c - 1; y < A; y++) {
            let C = r[y], M = C.data.length, F = M * C.a, T = M * C.c;
            d[y] = Math.sqrt(F * F + T * T);
          }
        V.arrayFill(f, 1, c, m);
        break;
      case st.Proportional:
        let p = 0;
        for (let y = 0, A = c - 1; y < A; ) {
          let C = r[y], M = C.data.length;
          if (M < ut2.epsilon)
            h && (d[y] = 0), f[++y] = m;
          else {
            let F = M * C.a, T = M * C.c, P = Math.sqrt(F * F + T * T);
            h && (d[y] = P), f[++y] = P, p += P;
          }
        }
        if (p > 0) {
          p = c / p * m;
          for (let y = 1; y < c; y++)
            f[y] *= p;
        }
        break;
      default:
        let S = o.spacingMode == st.Length;
        for (let y = 0, A = c - 1; y < A; ) {
          let C = r[y], M = C.data.length;
          if (M < ut2.epsilon)
            h && (d[y] = 0), f[++y] = m;
          else {
            let F = M * C.a, T = M * C.c, P = Math.sqrt(F * F + T * T);
            h && (d[y] = P), f[++y] = (S ? M + m : m) * P / M;
          }
        }
    }
    let g = this.computeWorldPositions(e, c, a), b = g[0], w = g[1], v = o.offsetRotation, x = false;
    if (v == 0)
      x = o.rotateMode == Bt.Chain;
    else {
      x = false;
      let p = this.target.bone;
      v *= p.a * p.d - p.b * p.c > 0 ? B.degRad : -B.degRad;
    }
    for (let p = 0, S = 3; p < l; p++, S += 3) {
      let y = r[p];
      y.worldX += (b - y.worldX) * s, y.worldY += (w - y.worldY) * n;
      let A = g[S], C = g[S + 1], M = A - b, F = C - w;
      if (h) {
        let T = d[p];
        if (T != 0) {
          let P = (Math.sqrt(M * M + F * F) / T - 1) * i + 1;
          y.a *= P, y.c *= P;
        }
      }
      if (b = A, w = C, i > 0) {
        let T = y.a, P = y.b, R = y.c, Y = y.d, X = 0, O2 = 0, N = 0;
        if (a ? X = g[S - 1] : f[p + 1] == 0 ? X = g[S + 2] : X = Math.atan2(F, M), X -= Math.atan2(R, T), x) {
          O2 = Math.cos(X), N = Math.sin(X);
          let z = y.data.length;
          b += (z * (O2 * T - N * R) - M) * i, w += (z * (N * T + O2 * R) - F) * i;
        } else
          X += v;
        X > B.PI ? X -= B.PI2 : X < -B.PI && (X += B.PI2), X *= i, O2 = Math.cos(X), N = Math.sin(X), y.a = O2 * T - N * R, y.b = O2 * P - N * Y, y.c = N * T + O2 * R, y.d = N * P + O2 * Y;
      }
      y.updateAppliedTransform();
    }
  }
  computeWorldPositions(t, e, i) {
    let s = this.target, n = this.position, o = this.spaces, a = V.setArraySize(this.positions, e * 3 + 2), h = this.world, r = t.closed, l = t.worldVerticesLength, c = l / 6, f = ut2.NONE;
    if (!t.constantSpeed) {
      let z = t.lengths;
      c -= r ? 1 : 2;
      let L = z[c];
      this.data.positionMode == At.Percent && (n *= L);
      let H;
      switch (this.data.spacingMode) {
        case st.Percent:
          H = L;
          break;
        case st.Proportional:
          H = L / e;
          break;
        default:
          H = 1;
      }
      h = V.setArraySize(this.world, 8);
      for (let K = 0, Q = 0, D = 0; K < e; K++, Q += 3) {
        let U = o[K] * H;
        n += U;
        let G = n;
        if (r)
          G %= L, G < 0 && (G += L), D = 0;
        else if (G < 0) {
          f != ut2.BEFORE && (f = ut2.BEFORE, t.computeWorldVertices(s, 2, 4, h, 0, 2)), this.addBeforePosition(G, h, 0, a, Q);
          continue;
        } else if (G > L) {
          f != ut2.AFTER && (f = ut2.AFTER, t.computeWorldVertices(s, l - 6, 4, h, 0, 2)), this.addAfterPosition(G - L, h, 0, a, Q);
          continue;
        }
        for (; ; D++) {
          let mt = z[D];
          if (!(G > mt)) {
            if (D == 0)
              G /= mt;
            else {
              let ht = z[D - 1];
              G = (G - ht) / (mt - ht);
            }
            break;
          }
        }
        D != f && (f = D, r && D == c ? (t.computeWorldVertices(s, l - 4, 4, h, 0, 2), t.computeWorldVertices(s, 0, 4, h, 4, 2)) : t.computeWorldVertices(s, D * 6 + 2, 8, h, 0, 2)), this.addCurvePosition(G, h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], a, Q, i || K > 0 && U == 0);
      }
      return a;
    }
    r ? (l += 2, h = V.setArraySize(this.world, l), t.computeWorldVertices(s, 2, l - 4, h, 0, 2), t.computeWorldVertices(s, 0, 2, h, l - 4, 2), h[l - 2] = h[0], h[l - 1] = h[1]) : (c--, l -= 4, h = V.setArraySize(this.world, l), t.computeWorldVertices(s, 2, l, h, 0, 2));
    let d = V.setArraySize(this.curves, c), m = 0, g = h[0], b = h[1], w = 0, v = 0, x = 0, p = 0, S = 0, y = 0, A = 0, C = 0, M = 0, F = 0, T = 0, P = 0, R = 0, Y = 0;
    for (let z = 0, L = 2; z < c; z++, L += 6)
      w = h[L], v = h[L + 1], x = h[L + 2], p = h[L + 3], S = h[L + 4], y = h[L + 5], A = (g - w * 2 + x) * 0.1875, C = (b - v * 2 + p) * 0.1875, M = ((w - x) * 3 - g + S) * 0.09375, F = ((v - p) * 3 - b + y) * 0.09375, T = A * 2 + M, P = C * 2 + F, R = (w - g) * 0.75 + A + M * 0.16666667, Y = (v - b) * 0.75 + C + F * 0.16666667, m += Math.sqrt(R * R + Y * Y), R += T, Y += P, T += M, P += F, m += Math.sqrt(R * R + Y * Y), R += T, Y += P, m += Math.sqrt(R * R + Y * Y), R += T + M, Y += P + F, m += Math.sqrt(R * R + Y * Y), d[z] = m, g = S, b = y;
    this.data.positionMode == At.Percent && (n *= m);
    let X;
    switch (this.data.spacingMode) {
      case st.Percent:
        X = m;
        break;
      case st.Proportional:
        X = m / e;
        break;
      default:
        X = 1;
    }
    let O2 = this.segments, N = 0;
    for (let z = 0, L = 0, H = 0, K = 0; z < e; z++, L += 3) {
      let Q = o[z] * X;
      n += Q;
      let D = n;
      if (r)
        D %= m, D < 0 && (D += m), H = 0;
      else if (D < 0) {
        this.addBeforePosition(D, h, 0, a, L);
        continue;
      } else if (D > m) {
        this.addAfterPosition(D - m, h, l - 4, a, L);
        continue;
      }
      for (; ; H++) {
        let U = d[H];
        if (!(D > U)) {
          if (H == 0)
            D /= U;
          else {
            let G = d[H - 1];
            D = (D - G) / (U - G);
          }
          break;
        }
      }
      if (H != f) {
        f = H;
        let U = H * 6;
        for (g = h[U], b = h[U + 1], w = h[U + 2], v = h[U + 3], x = h[U + 4], p = h[U + 5], S = h[U + 6], y = h[U + 7], A = (g - w * 2 + x) * 0.03, C = (b - v * 2 + p) * 0.03, M = ((w - x) * 3 - g + S) * 6e-3, F = ((v - p) * 3 - b + y) * 6e-3, T = A * 2 + M, P = C * 2 + F, R = (w - g) * 0.3 + A + M * 0.16666667, Y = (v - b) * 0.3 + C + F * 0.16666667, N = Math.sqrt(R * R + Y * Y), O2[0] = N, U = 1; U < 8; U++)
          R += T, Y += P, T += M, P += F, N += Math.sqrt(R * R + Y * Y), O2[U] = N;
        R += T, Y += P, N += Math.sqrt(R * R + Y * Y), O2[8] = N, R += T + M, Y += P + F, N += Math.sqrt(R * R + Y * Y), O2[9] = N, K = 0;
      }
      for (D *= N; ; K++) {
        let U = O2[K];
        if (!(D > U)) {
          if (K == 0)
            D /= U;
          else {
            let G = O2[K - 1];
            D = K + (D - G) / (U - G);
          }
          break;
        }
      }
      this.addCurvePosition(D * 0.1, g, b, w, v, x, p, S, y, a, L, i || z > 0 && Q == 0);
    }
    return a;
  }
  addBeforePosition(t, e, i, s, n) {
    let o = e[i], a = e[i + 1], h = e[i + 2] - o, r = e[i + 3] - a, l = Math.atan2(r, h);
    s[n] = o + t * Math.cos(l), s[n + 1] = a + t * Math.sin(l), s[n + 2] = l;
  }
  addAfterPosition(t, e, i, s, n) {
    let o = e[i + 2], a = e[i + 3], h = o - e[i], r = a - e[i + 1], l = Math.atan2(r, h);
    s[n] = o + t * Math.cos(l), s[n + 1] = a + t * Math.sin(l), s[n + 2] = l;
  }
  addCurvePosition(t, e, i, s, n, o, a, h, r, l, c, f) {
    if (t == 0 || isNaN(t)) {
      l[c] = e, l[c + 1] = i, l[c + 2] = Math.atan2(n - i, s - e);
      return;
    }
    let d = t * t, m = d * t, g = 1 - t, b = g * g, w = b * g, v = g * t, x = v * 3, p = g * x, S = x * t, y = e * w + s * p + o * S + h * m, A = i * w + n * p + a * S + r * m;
    l[c] = y, l[c + 1] = A, f && (t < 1e-3 ? l[c + 2] = Math.atan2(n - i, s - e) : l[c + 2] = Math.atan2(A - (i * b + n * v * 2 + a * d), y - (e * b + s * v * 2 + o * d)));
  }
};
u(ut, "NONE", -1), u(ut, "BEFORE", -2), u(ut, "AFTER", -3), u(ut, "epsilon", 1e-5);
var Me = ut;
var ii = class {
  constructor(t, e) {
    u(this, "data");
    u(this, "_bone", null);
    u(this, "inertia", 0);
    u(this, "strength", 0);
    u(this, "damping", 0);
    u(this, "massInverse", 0);
    u(this, "wind", 0);
    u(this, "gravity", 0);
    u(this, "mix", 0);
    u(this, "_reset", true);
    u(this, "ux", 0);
    u(this, "uy", 0);
    u(this, "cx", 0);
    u(this, "cy", 0);
    u(this, "tx", 0);
    u(this, "ty", 0);
    u(this, "xOffset", 0);
    u(this, "xVelocity", 0);
    u(this, "yOffset", 0);
    u(this, "yVelocity", 0);
    u(this, "rotateOffset", 0);
    u(this, "rotateVelocity", 0);
    u(this, "scaleOffset", 0);
    u(this, "scaleVelocity", 0);
    u(this, "active", false);
    u(this, "skeleton");
    u(this, "remaining", 0);
    u(this, "lastTime", 0);
    this.data = t, this.skeleton = e, this.bone = e.bones[t.bone.index], this.inertia = t.inertia, this.strength = t.strength, this.damping = t.damping, this.massInverse = t.massInverse, this.wind = t.wind, this.gravity = t.gravity, this.mix = t.mix;
  }
  /** The bone constrained by this physics constraint. */
  set bone(t) {
    this._bone = t;
  }
  get bone() {
    if (this._bone)
      return this._bone;
    throw new Error("Bone not set.");
  }
  reset() {
    this.remaining = 0, this.lastTime = this.skeleton.time, this._reset = true, this.xOffset = 0, this.xVelocity = 0, this.yOffset = 0, this.yVelocity = 0, this.rotateOffset = 0, this.rotateVelocity = 0, this.scaleOffset = 0, this.scaleVelocity = 0;
  }
  setToSetupPose() {
    const t = this.data;
    this.inertia = t.inertia, this.strength = t.strength, this.damping = t.damping, this.massInverse = t.massInverse, this.wind = t.wind, this.gravity = t.gravity, this.mix = t.mix;
  }
  isActive() {
    return this.active;
  }
  /** Applies the constraint to the constrained bones. */
  update(t) {
    const e = this.mix;
    if (e == 0)
      return;
    const i = this.data.x > 0, s = this.data.y > 0, n = this.data.rotate > 0 || this.data.shearX > 0, o = this.data.scaleX > 0, a = this.bone, h = a.data.length;
    switch (t) {
      case Ft.none:
        return;
      case Ft.reset:
        this.reset();
      case Ft.update:
        const r = this.skeleton, l = Math.max(this.skeleton.time - this.lastTime, 0);
        this.remaining += l, this.lastTime = r.time;
        const c = a.worldX, f = a.worldY;
        if (this._reset)
          this._reset = false, this.ux = c, this.uy = f;
        else {
          let d = this.remaining, m = this.inertia, g = this.data.step, b = this.skeleton.data.referenceScale, w = -1, v = this.data.limit * l, x = v * Math.abs(r.scaleY);
          if (v *= Math.abs(r.scaleX), i || s) {
            if (i) {
              const p = (this.ux - c) * m;
              this.xOffset += p > v ? v : p < -v ? -v : p, this.ux = c;
            }
            if (s) {
              const p = (this.uy - f) * m;
              this.yOffset += p > x ? x : p < -x ? -x : p, this.uy = f;
            }
            if (d >= g) {
              w = Math.pow(this.damping, 60 * g);
              const p = this.massInverse * g, S = this.strength, y = this.wind * b, A = (Gt.yDown ? -this.gravity : this.gravity) * b;
              do
                i && (this.xVelocity += (y - this.xOffset * S) * p, this.xOffset += this.xVelocity * g, this.xVelocity *= w), s && (this.yVelocity -= (A + this.yOffset * S) * p, this.yOffset += this.yVelocity * g, this.yVelocity *= w), d -= g;
              while (d >= g);
            }
            i && (a.worldX += this.xOffset * e * this.data.x), s && (a.worldY += this.yOffset * e * this.data.y);
          }
          if (n || o) {
            let p = Math.atan2(a.c, a.a), S = 0, y = 0, A = 0, C = this.cx - a.worldX, M = this.cy - a.worldY;
            if (C > v ? C = v : C < -v && (C = -v), M > x ? M = x : M < -x && (M = -x), n) {
              A = (this.data.rotate + this.data.shearX) * e;
              let F = Math.atan2(M + this.ty, C + this.tx) - p - this.rotateOffset * A;
              this.rotateOffset += (F - Math.ceil(F * B.invPI2 - 0.5) * B.PI2) * m, F = this.rotateOffset * A + p, S = Math.cos(F), y = Math.sin(F), o && (F = h * a.getWorldScaleX(), F > 0 && (this.scaleOffset += (C * S + M * y) * m / F));
            } else {
              S = Math.cos(p), y = Math.sin(p);
              const F = h * a.getWorldScaleX();
              F > 0 && (this.scaleOffset += (C * S + M * y) * m / F);
            }
            if (d = this.remaining, d >= g) {
              w == -1 && (w = Math.pow(this.damping, 60 * g));
              const F = this.massInverse * g, T = this.strength, P = this.wind, R = Gt.yDown ? -this.gravity : this.gravity, Y = h / b;
              for (; ; )
                if (d -= g, o && (this.scaleVelocity += (P * S - R * y - this.scaleOffset * T) * F, this.scaleOffset += this.scaleVelocity * g, this.scaleVelocity *= w), n) {
                  if (this.rotateVelocity -= ((P * y + R * S) * Y + this.rotateOffset * T) * F, this.rotateOffset += this.rotateVelocity * g, this.rotateVelocity *= w, d < g)
                    break;
                  const X = this.rotateOffset * A + p;
                  S = Math.cos(X), y = Math.sin(X);
                } else if (d < g)
                  break;
            }
          }
          this.remaining = d;
        }
        this.cx = a.worldX, this.cy = a.worldY;
        break;
      case Ft.pose:
        i && (a.worldX += this.xOffset * e * this.data.x), s && (a.worldY += this.yOffset * e * this.data.y);
    }
    if (n) {
      let r = this.rotateOffset * e, l = 0, c = 0, f = 0;
      if (this.data.shearX > 0) {
        let d = 0;
        this.data.rotate > 0 && (d = r * this.data.rotate, l = Math.sin(d), c = Math.cos(d), f = a.b, a.b = c * f - l * a.d, a.d = l * f + c * a.d), d += r * this.data.shearX, l = Math.sin(d), c = Math.cos(d), f = a.a, a.a = c * f - l * a.c, a.c = l * f + c * a.c;
      } else
        r *= this.data.rotate, l = Math.sin(r), c = Math.cos(r), f = a.a, a.a = c * f - l * a.c, a.c = l * f + c * a.c, f = a.b, a.b = c * f - l * a.d, a.d = l * f + c * a.d;
    }
    if (o) {
      const r = 1 + this.scaleOffset * e * this.data.scaleX;
      a.a *= r, a.c *= r;
    }
    t != Ft.pose && (this.tx = h * a.a, this.ty = h * a.c), a.updateAppliedTransform();
  }
  /** Translates the physics constraint so next {@link #update(Physics)} forces are applied as if the bone moved an additional
   * amount in world space. */
  translate(t, e) {
    this.ux -= t, this.uy -= e, this.cx -= t, this.cy -= e;
  }
  /** Rotates the physics constraint so next {@link #update(Physics)} forces are applied as if the bone rotated around the
   * specified point in world space. */
  rotate(t, e, i) {
    const s = i * B.degRad, n = Math.cos(s), o = Math.sin(s), a = this.cx - t, h = this.cy - e;
    this.translate(a * n - h * o - a, a * o + h * n - h);
  }
};
var ri = class {
  constructor(t, e) {
    u(this, "data");
    u(this, "bone");
    u(this, "color");
    u(this, "darkColor", null);
    u(this, "attachment", null);
    u(this, "attachmentState", 0);
    u(this, "sequenceIndex", -1);
    u(this, "deform", new Array());
    if (!t)
      throw new Error("data cannot be null.");
    if (!e)
      throw new Error("bone cannot be null.");
    this.data = t, this.bone = e, this.color = new q(), this.darkColor = t.darkColor ? new q() : null, this.setToSetupPose();
  }
  /** The skeleton this slot belongs to. */
  getSkeleton() {
    return this.bone.skeleton;
  }
  /** The current attachment for the slot, or null if the slot has no attachment. */
  getAttachment() {
    return this.attachment;
  }
  /** Sets the slot's attachment and, if the attachment changed, resets {@link #sequenceIndex} and clears the {@link #deform}.
   * The deform is not cleared if the old attachment has the same {@link VertexAttachment#getTimelineAttachment()} as the
   * specified attachment. */
  setAttachment(t) {
    this.attachment != t && ((!(t instanceof yt) || !(this.attachment instanceof yt) || t.timelineAttachment != this.attachment.timelineAttachment) && (this.deform.length = 0), this.attachment = t, this.sequenceIndex = -1);
  }
  /** Sets this slot to the setup pose. */
  setToSetupPose() {
    this.color.setFromColor(this.data.color), this.darkColor && this.darkColor.setFromColor(this.data.darkColor), this.data.attachmentName ? (this.attachment = null, this.setAttachment(this.bone.skeleton.getAttachment(this.data.index, this.data.attachmentName))) : this.attachment = null;
  }
};
var ni = class {
  constructor(t, e) {
    u(this, "data");
    u(this, "bones");
    u(this, "target");
    u(this, "mixRotate", 0);
    u(this, "mixX", 0);
    u(this, "mixY", 0);
    u(this, "mixScaleX", 0);
    u(this, "mixScaleY", 0);
    u(this, "mixShearY", 0);
    u(this, "temp", new ie());
    u(this, "active", false);
    if (!t)
      throw new Error("data cannot be null.");
    if (!e)
      throw new Error("skeleton cannot be null.");
    this.data = t, this.bones = new Array();
    for (let s = 0; s < t.bones.length; s++) {
      let n = e.findBone(t.bones[s].name);
      if (!n)
        throw new Error(`Couldn't find bone ${t.bones[s].name}.`);
      this.bones.push(n);
    }
    let i = e.findBone(t.target.name);
    if (!i)
      throw new Error(`Couldn't find target bone ${t.target.name}.`);
    this.target = i, this.mixRotate = t.mixRotate, this.mixX = t.mixX, this.mixY = t.mixY, this.mixScaleX = t.mixScaleX, this.mixScaleY = t.mixScaleY, this.mixShearY = t.mixShearY;
  }
  isActive() {
    return this.active;
  }
  setToSetupPose() {
    const t = this.data;
    this.mixRotate = t.mixRotate, this.mixX = t.mixX, this.mixY = t.mixY, this.mixScaleX = t.mixScaleX, this.mixScaleY = t.mixScaleY, this.mixShearY = t.mixShearY;
  }
  update(t) {
    this.mixRotate == 0 && this.mixX == 0 && this.mixY == 0 && this.mixScaleX == 0 && this.mixScaleY == 0 && this.mixShearY == 0 || (this.data.local ? this.data.relative ? this.applyRelativeLocal() : this.applyAbsoluteLocal() : this.data.relative ? this.applyRelativeWorld() : this.applyAbsoluteWorld());
  }
  applyAbsoluteWorld() {
    let t = this.mixRotate, e = this.mixX, i = this.mixY, s = this.mixScaleX, n = this.mixScaleY, o = this.mixShearY, a = e != 0 || i != 0, h = this.target, r = h.a, l = h.b, c = h.c, f = h.d, d = r * f - l * c > 0 ? B.degRad : -B.degRad, m = this.data.offsetRotation * d, g = this.data.offsetShearY * d, b = this.bones;
    for (let w = 0, v = b.length; w < v; w++) {
      let x = b[w];
      if (t != 0) {
        let p = x.a, S = x.b, y = x.c, A = x.d, C = Math.atan2(c, r) - Math.atan2(y, p) + m;
        C > B.PI ? C -= B.PI2 : C < -B.PI && (C += B.PI2), C *= t;
        let M = Math.cos(C), F = Math.sin(C);
        x.a = M * p - F * y, x.b = M * S - F * A, x.c = F * p + M * y, x.d = F * S + M * A;
      }
      if (a) {
        let p = this.temp;
        h.localToWorld(p.set(this.data.offsetX, this.data.offsetY)), x.worldX += (p.x - x.worldX) * e, x.worldY += (p.y - x.worldY) * i;
      }
      if (s != 0) {
        let p = Math.sqrt(x.a * x.a + x.c * x.c);
        p != 0 && (p = (p + (Math.sqrt(r * r + c * c) - p + this.data.offsetScaleX) * s) / p), x.a *= p, x.c *= p;
      }
      if (n != 0) {
        let p = Math.sqrt(x.b * x.b + x.d * x.d);
        p != 0 && (p = (p + (Math.sqrt(l * l + f * f) - p + this.data.offsetScaleY) * n) / p), x.b *= p, x.d *= p;
      }
      if (o > 0) {
        let p = x.b, S = x.d, y = Math.atan2(S, p), A = Math.atan2(f, l) - Math.atan2(c, r) - (y - Math.atan2(x.c, x.a));
        A > B.PI ? A -= B.PI2 : A < -B.PI && (A += B.PI2), A = y + (A + g) * o;
        let C = Math.sqrt(p * p + S * S);
        x.b = Math.cos(A) * C, x.d = Math.sin(A) * C;
      }
      x.updateAppliedTransform();
    }
  }
  applyRelativeWorld() {
    let t = this.mixRotate, e = this.mixX, i = this.mixY, s = this.mixScaleX, n = this.mixScaleY, o = this.mixShearY, a = e != 0 || i != 0, h = this.target, r = h.a, l = h.b, c = h.c, f = h.d, d = r * f - l * c > 0 ? B.degRad : -B.degRad, m = this.data.offsetRotation * d, g = this.data.offsetShearY * d, b = this.bones;
    for (let w = 0, v = b.length; w < v; w++) {
      let x = b[w];
      if (t != 0) {
        let p = x.a, S = x.b, y = x.c, A = x.d, C = Math.atan2(c, r) + m;
        C > B.PI ? C -= B.PI2 : C < -B.PI && (C += B.PI2), C *= t;
        let M = Math.cos(C), F = Math.sin(C);
        x.a = M * p - F * y, x.b = M * S - F * A, x.c = F * p + M * y, x.d = F * S + M * A;
      }
      if (a) {
        let p = this.temp;
        h.localToWorld(p.set(this.data.offsetX, this.data.offsetY)), x.worldX += p.x * e, x.worldY += p.y * i;
      }
      if (s != 0) {
        let p = (Math.sqrt(r * r + c * c) - 1 + this.data.offsetScaleX) * s + 1;
        x.a *= p, x.c *= p;
      }
      if (n != 0) {
        let p = (Math.sqrt(l * l + f * f) - 1 + this.data.offsetScaleY) * n + 1;
        x.b *= p, x.d *= p;
      }
      if (o > 0) {
        let p = Math.atan2(f, l) - Math.atan2(c, r);
        p > B.PI ? p -= B.PI2 : p < -B.PI && (p += B.PI2);
        let S = x.b, y = x.d;
        p = Math.atan2(y, S) + (p - B.PI / 2 + g) * o;
        let A = Math.sqrt(S * S + y * y);
        x.b = Math.cos(p) * A, x.d = Math.sin(p) * A;
      }
      x.updateAppliedTransform();
    }
  }
  applyAbsoluteLocal() {
    let t = this.mixRotate, e = this.mixX, i = this.mixY, s = this.mixScaleX, n = this.mixScaleY, o = this.mixShearY, a = this.target, h = this.bones;
    for (let r = 0, l = h.length; r < l; r++) {
      let c = h[r], f = c.arotation;
      t != 0 && (f += (a.arotation - f + this.data.offsetRotation) * t);
      let d = c.ax, m = c.ay;
      d += (a.ax - d + this.data.offsetX) * e, m += (a.ay - m + this.data.offsetY) * i;
      let g = c.ascaleX, b = c.ascaleY;
      s != 0 && g != 0 && (g = (g + (a.ascaleX - g + this.data.offsetScaleX) * s) / g), n != 0 && b != 0 && (b = (b + (a.ascaleY - b + this.data.offsetScaleY) * n) / b);
      let w = c.ashearY;
      o != 0 && (w += (a.ashearY - w + this.data.offsetShearY) * o), c.updateWorldTransformWith(d, m, f, g, b, c.ashearX, w);
    }
  }
  applyRelativeLocal() {
    let t = this.mixRotate, e = this.mixX, i = this.mixY, s = this.mixScaleX, n = this.mixScaleY, o = this.mixShearY, a = this.target, h = this.bones;
    for (let r = 0, l = h.length; r < l; r++) {
      let c = h[r], f = c.arotation + (a.arotation + this.data.offsetRotation) * t, d = c.ax + (a.ax + this.data.offsetX) * e, m = c.ay + (a.ay + this.data.offsetY) * i, g = c.ascaleX * ((a.ascaleX - 1 + this.data.offsetScaleX) * s + 1), b = c.ascaleY * ((a.ascaleY - 1 + this.data.offsetScaleY) * n + 1), w = c.ashearY + (a.ashearY + this.data.offsetShearY) * o;
      c.updateWorldTransformWith(d, m, f, g, b, c.ashearX, w);
    }
  }
};
var Wt = class Wt2 {
  constructor(t) {
    u(this, "data");
    u(this, "bones");
    u(this, "slots");
    u(this, "drawOrder");
    u(this, "ikConstraints");
    u(this, "transformConstraints");
    u(this, "pathConstraints");
    u(this, "physicsConstraints");
    u(this, "_updateCache", new Array());
    u(this, "skin", null);
    u(this, "color");
    u(this, "scaleX", 1);
    u(this, "_scaleY", 1);
    u(this, "x", 0);
    u(this, "y", 0);
    u(this, "time", 0);
    if (!t)
      throw new Error("data cannot be null.");
    this.data = t, this.bones = new Array();
    for (let e = 0; e < t.bones.length; e++) {
      let i = t.bones[e], s;
      if (!i.parent)
        s = new ze(i, this, null);
      else {
        let n = this.bones[i.parent.index];
        s = new ze(i, this, n), n.children.push(s);
      }
      this.bones.push(s);
    }
    this.slots = new Array(), this.drawOrder = new Array();
    for (let e = 0; e < t.slots.length; e++) {
      let i = t.slots[e], s = this.bones[i.boneData.index], n = new ri(i, s);
      this.slots.push(n), this.drawOrder.push(n);
    }
    this.ikConstraints = new Array();
    for (let e = 0; e < t.ikConstraints.length; e++) {
      let i = t.ikConstraints[e];
      this.ikConstraints.push(new si(i, this));
    }
    this.transformConstraints = new Array();
    for (let e = 0; e < t.transformConstraints.length; e++) {
      let i = t.transformConstraints[e];
      this.transformConstraints.push(new ni(i, this));
    }
    this.pathConstraints = new Array();
    for (let e = 0; e < t.pathConstraints.length; e++) {
      let i = t.pathConstraints[e];
      this.pathConstraints.push(new Me(i, this));
    }
    this.physicsConstraints = new Array();
    for (let e = 0; e < t.physicsConstraints.length; e++) {
      let i = t.physicsConstraints[e];
      this.physicsConstraints.push(new ii(i, this));
    }
    this.color = new q(1, 1, 1, 1), this.updateCache();
  }
  get scaleY() {
    return Wt2.yDown ? -this._scaleY : this._scaleY;
  }
  set scaleY(t) {
    this._scaleY = t;
  }
  /** Caches information about bones and constraints. Must be called if the {@link #getSkin()} is modified or if bones,
   * constraints, or weighted path attachments are added or removed. */
  updateCache() {
    let t = this._updateCache;
    t.length = 0;
    let e = this.bones;
    for (let f = 0, d = e.length; f < d; f++) {
      let m = e[f];
      m.sorted = m.data.skinRequired, m.active = !m.sorted;
    }
    if (this.skin) {
      let f = this.skin.bones;
      for (let d = 0, m = this.skin.bones.length; d < m; d++) {
        let g = this.bones[f[d].index];
        do
          g.sorted = false, g.active = true, g = g.parent;
        while (g);
      }
    }
    let i = this.ikConstraints, s = this.transformConstraints, n = this.pathConstraints, o = this.physicsConstraints, a = i.length, h = s.length, r = n.length, l = this.physicsConstraints.length, c = a + h + r + l;
    t: for (let f = 0; f < c; f++) {
      for (let d = 0; d < a; d++) {
        let m = i[d];
        if (m.data.order == f) {
          this.sortIkConstraint(m);
          continue t;
        }
      }
      for (let d = 0; d < h; d++) {
        let m = s[d];
        if (m.data.order == f) {
          this.sortTransformConstraint(m);
          continue t;
        }
      }
      for (let d = 0; d < r; d++) {
        let m = n[d];
        if (m.data.order == f) {
          this.sortPathConstraint(m);
          continue t;
        }
      }
      for (let d = 0; d < l; d++) {
        const m = o[d];
        if (m.data.order == f) {
          this.sortPhysicsConstraint(m);
          continue t;
        }
      }
    }
    for (let f = 0, d = e.length; f < d; f++)
      this.sortBone(e[f]);
  }
  sortIkConstraint(t) {
    if (t.active = t.target.isActive() && (!t.data.skinRequired || this.skin && V.contains(this.skin.constraints, t.data, true)), !t.active)
      return;
    let e = t.target;
    this.sortBone(e);
    let i = t.bones, s = i[0];
    if (this.sortBone(s), i.length == 1)
      this._updateCache.push(t), this.sortReset(s.children);
    else {
      let n = i[i.length - 1];
      this.sortBone(n), this._updateCache.push(t), this.sortReset(s.children), n.sorted = true;
    }
  }
  sortPathConstraint(t) {
    if (t.active = t.target.bone.isActive() && (!t.data.skinRequired || this.skin && V.contains(this.skin.constraints, t.data, true)), !t.active)
      return;
    let e = t.target, i = e.data.index, s = e.bone;
    this.skin && this.sortPathConstraintAttachment(this.skin, i, s), this.data.defaultSkin && this.data.defaultSkin != this.skin && this.sortPathConstraintAttachment(this.data.defaultSkin, i, s);
    for (let h = 0, r = this.data.skins.length; h < r; h++)
      this.sortPathConstraintAttachment(this.data.skins[h], i, s);
    let n = e.getAttachment();
    n instanceof Ut && this.sortPathConstraintAttachmentWith(n, s);
    let o = t.bones, a = o.length;
    for (let h = 0; h < a; h++)
      this.sortBone(o[h]);
    this._updateCache.push(t);
    for (let h = 0; h < a; h++)
      this.sortReset(o[h].children);
    for (let h = 0; h < a; h++)
      o[h].sorted = true;
  }
  sortTransformConstraint(t) {
    if (t.active = t.target.isActive() && (!t.data.skinRequired || this.skin && V.contains(this.skin.constraints, t.data, true)), !t.active)
      return;
    this.sortBone(t.target);
    let e = t.bones, i = e.length;
    if (t.data.local)
      for (let s = 0; s < i; s++) {
        let n = e[s];
        this.sortBone(n.parent), this.sortBone(n);
      }
    else
      for (let s = 0; s < i; s++)
        this.sortBone(e[s]);
    this._updateCache.push(t);
    for (let s = 0; s < i; s++)
      this.sortReset(e[s].children);
    for (let s = 0; s < i; s++)
      e[s].sorted = true;
  }
  sortPathConstraintAttachment(t, e, i) {
    let s = t.attachments[e];
    if (s)
      for (let n in s)
        this.sortPathConstraintAttachmentWith(s[n], i);
  }
  sortPathConstraintAttachmentWith(t, e) {
    if (!(t instanceof Ut))
      return;
    let i = t.bones;
    if (!i)
      this.sortBone(e);
    else {
      let s = this.bones;
      for (let n = 0, o = i.length; n < o; ) {
        let a = i[n++];
        for (a += n; n < a; )
          this.sortBone(s[i[n++]]);
      }
    }
  }
  sortPhysicsConstraint(t) {
    const e = t.bone;
    t.active = e.active && (!t.data.skinRequired || this.skin != null && V.contains(this.skin.constraints, t.data, true)), t.active && (this.sortBone(e), this._updateCache.push(t), this.sortReset(e.children), e.sorted = true);
  }
  sortBone(t) {
    if (!t || t.sorted)
      return;
    let e = t.parent;
    e && this.sortBone(e), t.sorted = true, this._updateCache.push(t);
  }
  sortReset(t) {
    for (let e = 0, i = t.length; e < i; e++) {
      let s = t[e];
      s.active && (s.sorted && this.sortReset(s.children), s.sorted = false);
    }
  }
  /** Updates the world transform for each bone and applies all constraints.
   *
   * See [World transforms](http://esotericsoftware.com/spine-runtime-skeletons#World-transforms) in the Spine
   * Runtimes Guide. */
  updateWorldTransform(t) {
    if (t == null)
      throw new Error("physics is undefined");
    let e = this.bones;
    for (let s = 0, n = e.length; s < n; s++) {
      let o = e[s];
      o.ax = o.x, o.ay = o.y, o.arotation = o.rotation, o.ascaleX = o.scaleX, o.ascaleY = o.scaleY, o.ashearX = o.shearX, o.ashearY = o.shearY;
    }
    let i = this._updateCache;
    for (let s = 0, n = i.length; s < n; s++)
      i[s].update(t);
  }
  updateWorldTransformWith(t, e) {
    let i = this.getRootBone();
    if (!i)
      throw new Error("Root bone must not be null.");
    let s = e.a, n = e.b, o = e.c, a = e.d;
    i.worldX = s * this.x + n * this.y + e.worldX, i.worldY = o * this.x + a * this.y + e.worldY;
    const h = (i.rotation + i.shearX) * B.degRad, r = (i.rotation + 90 + i.shearY) * B.degRad, l = Math.cos(h) * i.scaleX, c = Math.cos(r) * i.scaleY, f = Math.sin(h) * i.scaleX, d = Math.sin(r) * i.scaleY;
    i.a = (s * l + n * f) * this.scaleX, i.b = (s * c + n * d) * this.scaleX, i.c = (o * l + a * f) * this.scaleY, i.d = (o * c + a * d) * this.scaleY;
    let m = this._updateCache;
    for (let g = 0, b = m.length; g < b; g++) {
      let w = m[g];
      w != i && w.update(t);
    }
  }
  /** Sets the bones, constraints, and slots to their setup pose values. */
  setToSetupPose() {
    this.setBonesToSetupPose(), this.setSlotsToSetupPose();
  }
  /** Sets the bones and constraints to their setup pose values. */
  setBonesToSetupPose() {
    for (const t of this.bones)
      t.setToSetupPose();
    for (const t of this.ikConstraints)
      t.setToSetupPose();
    for (const t of this.transformConstraints)
      t.setToSetupPose();
    for (const t of this.pathConstraints)
      t.setToSetupPose();
    for (const t of this.physicsConstraints)
      t.setToSetupPose();
  }
  /** Sets the slots and draw order to their setup pose values. */
  setSlotsToSetupPose() {
    let t = this.slots;
    V.arrayCopy(t, 0, this.drawOrder, 0, t.length);
    for (let e = 0, i = t.length; e < i; e++)
      t[e].setToSetupPose();
  }
  /** @returns May return null. */
  getRootBone() {
    return this.bones.length == 0 ? null : this.bones[0];
  }
  /** @returns May be null. */
  findBone(t) {
    if (!t)
      throw new Error("boneName cannot be null.");
    let e = this.bones;
    for (let i = 0, s = e.length; i < s; i++) {
      let n = e[i];
      if (n.data.name == t)
        return n;
    }
    return null;
  }
  /** Finds a slot by comparing each slot's name. It is more efficient to cache the results of this method than to call it
   * repeatedly.
   * @returns May be null. */
  findSlot(t) {
    if (!t)
      throw new Error("slotName cannot be null.");
    let e = this.slots;
    for (let i = 0, s = e.length; i < s; i++) {
      let n = e[i];
      if (n.data.name == t)
        return n;
    }
    return null;
  }
  /** Sets a skin by name.
   *
   * See {@link #setSkin()}. */
  setSkinByName(t) {
    let e = this.data.findSkin(t);
    if (!e)
      throw new Error("Skin not found: " + t);
    this.setSkin(e);
  }
  /** Sets the skin used to look up attachments before looking in the {@link SkeletonData#defaultSkin default skin}. If the
   * skin is changed, {@link #updateCache()} is called.
   *
   * Attachments from the new skin are attached if the corresponding attachment from the old skin was attached. If there was no
   * old skin, each slot's setup mode attachment is attached from the new skin.
   *
   * After changing the skin, the visible attachments can be reset to those attached in the setup pose by calling
   * {@link #setSlotsToSetupPose()}. Also, often {@link AnimationState#apply()} is called before the next time the
   * skeleton is rendered to allow any attachment keys in the current animation(s) to hide or show attachments from the new skin.
   * @param newSkin May be null. */
  setSkin(t) {
    if (t != this.skin) {
      if (t)
        if (this.skin)
          t.attachAll(this, this.skin);
        else {
          let e = this.slots;
          for (let i = 0, s = e.length; i < s; i++) {
            let n = e[i], o = n.data.attachmentName;
            if (o) {
              let a = t.getAttachment(i, o);
              a && n.setAttachment(a);
            }
          }
        }
      this.skin = t, this.updateCache();
    }
  }
  /** Finds an attachment by looking in the {@link #skin} and {@link SkeletonData#defaultSkin} using the slot name and attachment
   * name.
   *
   * See {@link #getAttachment()}.
   * @returns May be null. */
  getAttachmentByName(t, e) {
    let i = this.data.findSlot(t);
    if (!i)
      throw new Error(`Can't find slot with name ${t}`);
    return this.getAttachment(i.index, e);
  }
  /** Finds an attachment by looking in the {@link #skin} and {@link SkeletonData#defaultSkin} using the slot index and
   * attachment name. First the skin is checked and if the attachment was not found, the default skin is checked.
   *
   * See [Runtime skins](http://esotericsoftware.com/spine-runtime-skins) in the Spine Runtimes Guide.
   * @returns May be null. */
  getAttachment(t, e) {
    if (!e)
      throw new Error("attachmentName cannot be null.");
    if (this.skin) {
      let i = this.skin.getAttachment(t, e);
      if (i)
        return i;
    }
    return this.data.defaultSkin ? this.data.defaultSkin.getAttachment(t, e) : null;
  }
  /** A convenience method to set an attachment by finding the slot with {@link #findSlot()}, finding the attachment with
   * {@link #getAttachment()}, then setting the slot's {@link Slot#attachment}.
   * @param attachmentName May be null to clear the slot's attachment. */
  setAttachment(t, e) {
    if (!t)
      throw new Error("slotName cannot be null.");
    let i = this.slots;
    for (let s = 0, n = i.length; s < n; s++) {
      let o = i[s];
      if (o.data.name == t) {
        let a = null;
        if (e && (a = this.getAttachment(s, e), !a))
          throw new Error("Attachment not found: " + e + ", for slot: " + t);
        o.setAttachment(a);
        return;
      }
    }
    throw new Error("Slot not found: " + t);
  }
  /** Finds an IK constraint by comparing each IK constraint's name. It is more efficient to cache the results of this method
   * than to call it repeatedly.
   * @return May be null. */
  findIkConstraint(t) {
    if (!t)
      throw new Error("constraintName cannot be null.");
    return this.ikConstraints.find((e) => e.data.name == t) ?? null;
  }
  /** Finds a transform constraint by comparing each transform constraint's name. It is more efficient to cache the results of
   * this method than to call it repeatedly.
   * @return May be null. */
  findTransformConstraint(t) {
    if (!t)
      throw new Error("constraintName cannot be null.");
    return this.transformConstraints.find((e) => e.data.name == t) ?? null;
  }
  /** Finds a path constraint by comparing each path constraint's name. It is more efficient to cache the results of this method
   * than to call it repeatedly.
   * @return May be null. */
  findPathConstraint(t) {
    if (!t)
      throw new Error("constraintName cannot be null.");
    return this.pathConstraints.find((e) => e.data.name == t) ?? null;
  }
  /** Finds a physics constraint by comparing each physics constraint's name. It is more efficient to cache the results of this
   * method than to call it repeatedly. */
  findPhysicsConstraint(t) {
    if (t == null)
      throw new Error("constraintName cannot be null.");
    return this.physicsConstraints.find((e) => e.data.name == t) ?? null;
  }
  /** Returns the axis aligned bounding box (AABB) of the region and mesh attachments for the current pose as `{ x: number, y: number, width: number, height: number }`.
   * Note that this method will create temporary objects which can add to garbage collection pressure. Use `getBounds()` if garbage collection is a concern. */
  getBoundsRect() {
    let t = new ie(), e = new ie();
    return this.getBounds(t, e), { x: t.x, y: t.y, width: e.x, height: e.y };
  }
  /** Returns the axis aligned bounding box (AABB) of the region and mesh attachments for the current pose.
   * @param offset An output value, the distance from the skeleton origin to the bottom left corner of the AABB.
   * @param size An output value, the width and height of the AABB.
   * @param temp Working memory to temporarily store attachments' computed world vertices.
   * @param clipper {@link SkeletonClipping} to use. If <code>null</code>, no clipping is applied. */
  getBounds(t, e, i = new Array(2), s = null) {
    if (!t)
      throw new Error("offset cannot be null.");
    if (!e)
      throw new Error("size cannot be null.");
    let n = this.drawOrder, o = Number.POSITIVE_INFINITY, a = Number.POSITIVE_INFINITY, h = Number.NEGATIVE_INFINITY, r = Number.NEGATIVE_INFINITY;
    for (let l = 0, c = n.length; l < c; l++) {
      let f = n[l];
      if (!f.bone.active)
        continue;
      let d = 0, m = null, g = null, b = f.getAttachment();
      if (b instanceof bt)
        d = 8, m = V.setArraySize(i, d, 0), b.computeWorldVertices(f, m, 0, 2), g = Wt2.quadTriangles;
      else if (b instanceof wt) {
        let w = b;
        d = w.worldVerticesLength, m = V.setArraySize(i, d, 0), w.computeWorldVertices(f, 0, d, m, 0, 2), g = w.triangles;
      } else if (b instanceof Pt && s != null) {
        s.clipStart(f, b);
        continue;
      }
      if (m && g) {
        s != null && s.isClipping() && (s.clipTriangles(m, g, g.length), m = s.clippedVertices, d = s.clippedVertices.length);
        for (let w = 0, v = m.length; w < v; w += 2) {
          let x = m[w], p = m[w + 1];
          o = Math.min(o, x), a = Math.min(a, p), h = Math.max(h, x), r = Math.max(r, p);
        }
      }
      s != null && s.clipEndWithSlot(f);
    }
    s != null && s.clipEnd(), t.set(o, a), e.set(h - o, r - a);
  }
  /** Increments the skeleton's {@link #time}. */
  update(t) {
    this.time += t;
  }
  physicsTranslate(t, e) {
    const i = this.physicsConstraints;
    for (let s = 0, n = i.length; s < n; s++)
      i[s].translate(t, e);
  }
  /** Calls {@link PhysicsConstraint#rotate(float, float, float)} for each physics constraint. */
  physicsRotate(t, e, i) {
    const s = this.physicsConstraints;
    for (let n = 0, o = s.length; n < o; n++)
      s[n].rotate(t, e, i);
  }
};
u(Wt, "quadTriangles", [0, 1, 2, 2, 3, 0]), u(Wt, "yDown", false);
var Gt = Wt;
var Ft;
(function(k) {
  k[k.none = 0] = "none", k[k.reset = 1] = "reset", k[k.update = 2] = "update", k[k.pose = 3] = "pose";
})(Ft || (Ft = {}));
var Es = class extends be {
  constructor(e) {
    super(e, 0, false);
    u(this, "_bone", null);
    u(this, "x", 0);
    u(this, "y", 0);
    u(this, "rotate", 0);
    u(this, "scaleX", 0);
    u(this, "shearX", 0);
    u(this, "limit", 0);
    u(this, "step", 0);
    u(this, "inertia", 0);
    u(this, "strength", 0);
    u(this, "damping", 0);
    u(this, "massInverse", 0);
    u(this, "wind", 0);
    u(this, "gravity", 0);
    u(this, "mix", 0);
    u(this, "inertiaGlobal", false);
    u(this, "strengthGlobal", false);
    u(this, "dampingGlobal", false);
    u(this, "massGlobal", false);
    u(this, "windGlobal", false);
    u(this, "gravityGlobal", false);
    u(this, "mixGlobal", false);
  }
  /** The bone constrained by this physics constraint. */
  set bone(e) {
    this._bone = e;
  }
  get bone() {
    if (this._bone)
      return this._bone;
    throw new Error("BoneData not set.");
  }
};
var oe = class {
  constructor() {
    u(this, "name", null);
    u(this, "bones", new Array());
    u(this, "slots", new Array());
    u(this, "skins", new Array());
    u(this, "defaultSkin", null);
    u(this, "events", new Array());
    u(this, "animations", new Array());
    u(this, "ikConstraints", new Array());
    u(this, "transformConstraints", new Array());
    u(this, "pathConstraints", new Array());
    u(this, "physicsConstraints", new Array());
    u(this, "x", 0);
    u(this, "y", 0);
    u(this, "width", 0);
    u(this, "height", 0);
    u(this, "referenceScale", 100);
    u(this, "version", null);
    u(this, "hash", null);
    u(this, "fps", 0);
    u(this, "imagesPath", null);
    u(this, "audioPath", null);
  }
  /** Finds a bone by comparing each bone's name. It is more efficient to cache the results of this method than to call it
   * multiple times.
   * @returns May be null. */
  findBone(t) {
    if (!t)
      throw new Error("boneName cannot be null.");
    let e = this.bones;
    for (let i = 0, s = e.length; i < s; i++) {
      let n = e[i];
      if (n.name == t)
        return n;
    }
    return null;
  }
  /** Finds a slot by comparing each slot's name. It is more efficient to cache the results of this method than to call it
   * multiple times.
   * @returns May be null. */
  findSlot(t) {
    if (!t)
      throw new Error("slotName cannot be null.");
    let e = this.slots;
    for (let i = 0, s = e.length; i < s; i++) {
      let n = e[i];
      if (n.name == t)
        return n;
    }
    return null;
  }
  /** Finds a skin by comparing each skin's name. It is more efficient to cache the results of this method than to call it
   * multiple times.
   * @returns May be null. */
  findSkin(t) {
    if (!t)
      throw new Error("skinName cannot be null.");
    let e = this.skins;
    for (let i = 0, s = e.length; i < s; i++) {
      let n = e[i];
      if (n.name == t)
        return n;
    }
    return null;
  }
  /** Finds an event by comparing each events's name. It is more efficient to cache the results of this method than to call it
   * multiple times.
   * @returns May be null. */
  findEvent(t) {
    if (!t)
      throw new Error("eventDataName cannot be null.");
    let e = this.events;
    for (let i = 0, s = e.length; i < s; i++) {
      let n = e[i];
      if (n.name == t)
        return n;
    }
    return null;
  }
  /** Finds an animation by comparing each animation's name. It is more efficient to cache the results of this method than to
   * call it multiple times.
   * @returns May be null. */
  findAnimation(t) {
    if (!t)
      throw new Error("animationName cannot be null.");
    let e = this.animations;
    for (let i = 0, s = e.length; i < s; i++) {
      let n = e[i];
      if (n.name == t)
        return n;
    }
    return null;
  }
  /** Finds an IK constraint by comparing each IK constraint's name. It is more efficient to cache the results of this method
   * than to call it multiple times.
   * @return May be null. */
  findIkConstraint(t) {
    if (!t)
      throw new Error("constraintName cannot be null.");
    const e = this.ikConstraints;
    for (let i = 0, s = e.length; i < s; i++) {
      const n = e[i];
      if (n.name == t)
        return n;
    }
    return null;
  }
  /** Finds a transform constraint by comparing each transform constraint's name. It is more efficient to cache the results of
   * this method than to call it multiple times.
   * @return May be null. */
  findTransformConstraint(t) {
    if (!t)
      throw new Error("constraintName cannot be null.");
    const e = this.transformConstraints;
    for (let i = 0, s = e.length; i < s; i++) {
      const n = e[i];
      if (n.name == t)
        return n;
    }
    return null;
  }
  /** Finds a path constraint by comparing each path constraint's name. It is more efficient to cache the results of this method
   * than to call it multiple times.
   * @return May be null. */
  findPathConstraint(t) {
    if (!t)
      throw new Error("constraintName cannot be null.");
    const e = this.pathConstraints;
    for (let i = 0, s = e.length; i < s; i++) {
      const n = e[i];
      if (n.name == t)
        return n;
    }
    return null;
  }
  /** Finds a physics constraint by comparing each physics constraint's name. It is more efficient to cache the results of this method
   * than to call it multiple times.
   * @return May be null. */
  findPhysicsConstraint(t) {
    if (!t)
      throw new Error("constraintName cannot be null.");
    const e = this.physicsConstraints;
    for (let i = 0, s = e.length; i < s; i++) {
      const n = e[i];
      if (n.name == t)
        return n;
    }
    return null;
  }
};
var Ue = class {
  constructor(t = 0, e, i) {
    u(this, "slotIndex");
    u(this, "name");
    u(this, "attachment");
    this.slotIndex = t, this.name = e, this.attachment = i;
  }
};
var Ye = class {
  // fe9e4fff
  constructor(t) {
    u(this, "name");
    u(this, "attachments", new Array());
    u(this, "bones", Array());
    u(this, "constraints", new Array());
    u(this, "color", new q(0.99607843, 0.61960787, 0.30980393, 1));
    if (!t)
      throw new Error("name cannot be null.");
    this.name = t;
  }
  /** Adds an attachment to the skin for the specified slot index and name. */
  setAttachment(t, e, i) {
    if (!i)
      throw new Error("attachment cannot be null.");
    let s = this.attachments;
    t >= s.length && (s.length = t + 1), s[t] || (s[t] = {}), s[t][e] = i;
  }
  /** Adds all attachments, bones, and constraints from the specified skin to this skin. */
  addSkin(t) {
    for (let s = 0; s < t.bones.length; s++) {
      let n = t.bones[s], o = false;
      for (let a = 0; a < this.bones.length; a++)
        if (this.bones[a] == n) {
          o = true;
          break;
        }
      o || this.bones.push(n);
    }
    for (let s = 0; s < t.constraints.length; s++) {
      let n = t.constraints[s], o = false;
      for (let a = 0; a < this.constraints.length; a++)
        if (this.constraints[a] == n) {
          o = true;
          break;
        }
      o || this.constraints.push(n);
    }
    let e = t.getAttachments();
    for (let s = 0; s < e.length; s++) {
      var i = e[s];
      this.setAttachment(i.slotIndex, i.name, i.attachment);
    }
  }
  /** Adds all bones and constraints and copies of all attachments from the specified skin to this skin. Mesh attachments are not
   * copied, instead a new linked mesh is created. The attachment copies can be modified without affecting the originals. */
  copySkin(t) {
    for (let s = 0; s < t.bones.length; s++) {
      let n = t.bones[s], o = false;
      for (let a = 0; a < this.bones.length; a++)
        if (this.bones[a] == n) {
          o = true;
          break;
        }
      o || this.bones.push(n);
    }
    for (let s = 0; s < t.constraints.length; s++) {
      let n = t.constraints[s], o = false;
      for (let a = 0; a < this.constraints.length; a++)
        if (this.constraints[a] == n) {
          o = true;
          break;
        }
      o || this.constraints.push(n);
    }
    let e = t.getAttachments();
    for (let s = 0; s < e.length; s++) {
      var i = e[s];
      i.attachment && (i.attachment instanceof wt ? (i.attachment = i.attachment.newLinkedMesh(), this.setAttachment(i.slotIndex, i.name, i.attachment)) : (i.attachment = i.attachment.copy(), this.setAttachment(i.slotIndex, i.name, i.attachment)));
    }
  }
  /** Returns the attachment for the specified slot index and name, or null. */
  getAttachment(t, e) {
    let i = this.attachments[t];
    return i ? i[e] : null;
  }
  /** Removes the attachment in the skin for the specified slot index and name, if any. */
  removeAttachment(t, e) {
    let i = this.attachments[t];
    i && delete i[e];
  }
  /** Returns all attachments in this skin. */
  getAttachments() {
    let t = new Array();
    for (var e = 0; e < this.attachments.length; e++) {
      let i = this.attachments[e];
      if (i)
        for (let s in i) {
          let n = i[s];
          n && t.push(new Ue(e, s, n));
        }
    }
    return t;
  }
  /** Returns all attachments in this skin for the specified slot index. */
  getAttachmentsForSlot(t, e) {
    let i = this.attachments[t];
    if (i)
      for (let s in i) {
        let n = i[s];
        n && e.push(new Ue(t, s, n));
      }
  }
  /** Clears all attachments, bones, and constraints. */
  clear() {
    this.attachments.length = 0, this.bones.length = 0, this.constraints.length = 0;
  }
  /** Attach each attachment in this skin if the corresponding attachment in the old skin is currently attached. */
  attachAll(t, e) {
    let i = 0;
    for (let s = 0; s < t.slots.length; s++) {
      let n = t.slots[s], o = n.getAttachment();
      if (o && i < e.attachments.length) {
        let a = e.attachments[i];
        for (let h in a) {
          let r = a[h];
          if (o == r) {
            let l = this.getAttachment(i, h);
            l && n.setAttachment(l);
            break;
          }
        }
      }
      i++;
    }
  }
};
var Rs = class {
  constructor(t, e, i) {
    u(this, "index", 0);
    u(this, "name");
    u(this, "boneData");
    u(this, "color", new q(1, 1, 1, 1));
    u(this, "darkColor", null);
    u(this, "attachmentName", null);
    u(this, "blendMode", Xt.Normal);
    u(this, "visible", true);
    if (t < 0)
      throw new Error("index must be >= 0.");
    if (!e)
      throw new Error("name cannot be null.");
    if (!i)
      throw new Error("boneData cannot be null.");
    this.index = t, this.name = e, this.boneData = i;
  }
};
var Xt;
(function(k) {
  k[k.Normal = 0] = "Normal", k[k.Additive = 1] = "Additive", k[k.Multiply = 2] = "Multiply", k[k.Screen = 3] = "Screen";
})(Xt || (Xt = {}));
var Ps = class extends be {
  constructor(e) {
    super(e, 0, false);
    u(this, "bones", new Array());
    u(this, "_target", null);
    u(this, "mixRotate", 0);
    u(this, "mixX", 0);
    u(this, "mixY", 0);
    u(this, "mixScaleX", 0);
    u(this, "mixScaleY", 0);
    u(this, "mixShearY", 0);
    u(this, "offsetRotation", 0);
    u(this, "offsetX", 0);
    u(this, "offsetY", 0);
    u(this, "offsetScaleX", 0);
    u(this, "offsetScaleY", 0);
    u(this, "offsetShearY", 0);
    u(this, "relative", false);
    u(this, "local", false);
  }
  set target(e) {
    this._target = e;
  }
  get target() {
    if (this._target)
      return this._target;
    throw new Error("BoneData not set.");
  }
};
var ai = class {
  constructor(t) {
    u(this, "scale", 1);
    u(this, "attachmentLoader");
    u(this, "linkedMeshes", new Array());
    this.attachmentLoader = t;
  }
  readSkeletonData(t) {
    let e = this.scale, i = new oe();
    i.name = "";
    let s = new li(t), n = s.readInt32(), o = s.readInt32();
    i.hash = o == 0 && n == 0 ? null : o.toString(16) + n.toString(16), i.version = s.readString(), i.x = s.readFloat(), i.y = s.readFloat(), i.width = s.readFloat(), i.height = s.readFloat(), i.referenceScale = s.readFloat() * e;
    let a = s.readBoolean();
    a && (i.fps = s.readFloat(), i.imagesPath = s.readString(), i.audioPath = s.readString());
    let h = 0;
    h = s.readInt(true);
    for (let l = 0; l < h; l++) {
      let c = s.readString();
      if (!c)
        throw new Error("String in string table must not be null.");
      s.strings.push(c);
    }
    h = s.readInt(true);
    for (let l = 0; l < h; l++) {
      let c = s.readString();
      if (!c)
        throw new Error("Bone name must not be null.");
      let f = l == 0 ? null : i.bones[s.readInt(true)], d = new Ms(l, c, f);
      d.rotation = s.readFloat(), d.x = s.readFloat() * e, d.y = s.readFloat() * e, d.scaleX = s.readFloat(), d.scaleY = s.readFloat(), d.shearX = s.readFloat(), d.shearY = s.readFloat(), d.length = s.readFloat() * e, d.inherit = s.readByte(), d.skinRequired = s.readBoolean(), a && (q.rgba8888ToColor(d.color, s.readInt32()), d.icon = s.readString() ?? void 0, d.visible = s.readBoolean()), i.bones.push(d);
    }
    h = s.readInt(true);
    for (let l = 0; l < h; l++) {
      let c = s.readString();
      if (!c)
        throw new Error("Slot name must not be null.");
      let f = i.bones[s.readInt(true)], d = new Rs(l, c, f);
      q.rgba8888ToColor(d.color, s.readInt32());
      let m = s.readInt32();
      m != -1 && q.rgb888ToColor(d.darkColor = new q(), m), d.attachmentName = s.readStringRef(), d.blendMode = s.readInt(true), a && (d.visible = s.readBoolean()), i.slots.push(d);
    }
    h = s.readInt(true);
    for (let l = 0, c; l < h; l++) {
      let f = s.readString();
      if (!f)
        throw new Error("IK constraint data name must not be null.");
      let d = new Fs(f);
      d.order = s.readInt(true), c = s.readInt(true);
      for (let g = 0; g < c; g++)
        d.bones.push(i.bones[s.readInt(true)]);
      d.target = i.bones[s.readInt(true)];
      let m = s.readByte();
      d.skinRequired = (m & 1) != 0, d.bendDirection = m & 2 ? 1 : -1, d.compress = (m & 4) != 0, d.stretch = (m & 8) != 0, d.uniform = (m & 16) != 0, m & 32 && (d.mix = m & 64 ? s.readFloat() : 1), m & 128 && (d.softness = s.readFloat() * e), i.ikConstraints.push(d);
    }
    h = s.readInt(true);
    for (let l = 0, c; l < h; l++) {
      let f = s.readString();
      if (!f)
        throw new Error("Transform constraint data name must not be null.");
      let d = new Ps(f);
      d.order = s.readInt(true), c = s.readInt(true);
      for (let g = 0; g < c; g++)
        d.bones.push(i.bones[s.readInt(true)]);
      d.target = i.bones[s.readInt(true)];
      let m = s.readByte();
      d.skinRequired = (m & 1) != 0, d.local = (m & 2) != 0, d.relative = (m & 4) != 0, m & 8 && (d.offsetRotation = s.readFloat()), m & 16 && (d.offsetX = s.readFloat() * e), m & 32 && (d.offsetY = s.readFloat() * e), m & 64 && (d.offsetScaleX = s.readFloat()), m & 128 && (d.offsetScaleY = s.readFloat()), m = s.readByte(), m & 1 && (d.offsetShearY = s.readFloat()), m & 2 && (d.mixRotate = s.readFloat()), m & 4 && (d.mixX = s.readFloat()), m & 8 && (d.mixY = s.readFloat()), m & 16 && (d.mixScaleX = s.readFloat()), m & 32 && (d.mixScaleY = s.readFloat()), m & 64 && (d.mixShearY = s.readFloat()), i.transformConstraints.push(d);
    }
    h = s.readInt(true);
    for (let l = 0, c; l < h; l++) {
      let f = s.readString();
      if (!f)
        throw new Error("Path constraint data name must not be null.");
      let d = new Xs(f);
      d.order = s.readInt(true), d.skinRequired = s.readBoolean(), c = s.readInt(true);
      for (let g = 0; g < c; g++)
        d.bones.push(i.bones[s.readInt(true)]);
      d.target = i.slots[s.readInt(true)];
      const m = s.readByte();
      d.positionMode = m & 1, d.spacingMode = m >> 1 & 3, d.rotateMode = m >> 3 & 3, m & 128 && (d.offsetRotation = s.readFloat()), d.position = s.readFloat(), d.positionMode == At.Fixed && (d.position *= e), d.spacing = s.readFloat(), (d.spacingMode == st.Length || d.spacingMode == st.Fixed) && (d.spacing *= e), d.mixRotate = s.readFloat(), d.mixX = s.readFloat(), d.mixY = s.readFloat(), i.pathConstraints.push(d);
    }
    h = s.readInt(true);
    for (let l = 0, c; l < h; l++) {
      const f = s.readString();
      if (!f)
        throw new Error("Physics constraint data name must not be null.");
      const d = new Es(f);
      d.order = s.readInt(true), d.bone = i.bones[s.readInt(true)];
      let m = s.readByte();
      d.skinRequired = (m & 1) != 0, m & 2 && (d.x = s.readFloat()), m & 4 && (d.y = s.readFloat()), m & 8 && (d.rotate = s.readFloat()), m & 16 && (d.scaleX = s.readFloat()), m & 32 && (d.shearX = s.readFloat()), d.limit = (m & 64 ? s.readFloat() : 5e3) * e, d.step = 1 / s.readUnsignedByte(), d.inertia = s.readFloat(), d.strength = s.readFloat(), d.damping = s.readFloat(), d.massInverse = m & 128 ? s.readFloat() : 1, d.wind = s.readFloat(), d.gravity = s.readFloat(), m = s.readByte(), m & 1 && (d.inertiaGlobal = true), m & 2 && (d.strengthGlobal = true), m & 4 && (d.dampingGlobal = true), m & 8 && (d.massGlobal = true), m & 16 && (d.windGlobal = true), m & 32 && (d.gravityGlobal = true), m & 64 && (d.mixGlobal = true), d.mix = m & 128 ? s.readFloat() : 1, i.physicsConstraints.push(d);
    }
    let r = this.readSkin(s, i, true, a);
    r && (i.defaultSkin = r, i.skins.push(r));
    {
      let l = i.skins.length;
      for (V.setArraySize(i.skins, h = l + s.readInt(true)); l < h; l++) {
        let c = this.readSkin(s, i, false, a);
        if (!c)
          throw new Error("readSkin() should not have returned null.");
        i.skins[l] = c;
      }
    }
    h = this.linkedMeshes.length;
    for (let l = 0; l < h; l++) {
      let c = this.linkedMeshes[l];
      const f = i.skins[c.skinIndex];
      if (!c.parent)
        throw new Error("Linked mesh parent must not be null");
      let d = f.getAttachment(c.slotIndex, c.parent);
      if (!d)
        throw new Error(`Parent mesh not found: ${c.parent}`);
      c.mesh.timelineAttachment = c.inheritTimeline ? d : c.mesh, c.mesh.setParentMesh(d), c.mesh.region != null && c.mesh.updateRegion();
    }
    this.linkedMeshes.length = 0, h = s.readInt(true);
    for (let l = 0; l < h; l++) {
      let c = s.readString();
      if (!c)
        throw new Error("Event data name must not be null");
      let f = new Ts(c);
      f.intValue = s.readInt(false), f.floatValue = s.readFloat(), f.stringValue = s.readString(), f.audioPath = s.readString(), f.audioPath && (f.volume = s.readFloat(), f.balance = s.readFloat()), i.events.push(f);
    }
    h = s.readInt(true);
    for (let l = 0; l < h; l++) {
      let c = s.readString();
      if (!c)
        throw new Error("Animatio name must not be null.");
      i.animations.push(this.readAnimation(s, c, i));
    }
    return i;
  }
  readSkin(t, e, i, s) {
    let n = null, o = 0;
    if (i) {
      if (o = t.readInt(true), o == 0)
        return null;
      n = new Ye("default");
    } else {
      let a = t.readString();
      if (!a)
        throw new Error("Skin name must not be null.");
      n = new Ye(a), s && q.rgba8888ToColor(n.color, t.readInt32()), n.bones.length = t.readInt(true);
      for (let h = 0, r = n.bones.length; h < r; h++)
        n.bones[h] = e.bones[t.readInt(true)];
      for (let h = 0, r = t.readInt(true); h < r; h++)
        n.constraints.push(e.ikConstraints[t.readInt(true)]);
      for (let h = 0, r = t.readInt(true); h < r; h++)
        n.constraints.push(e.transformConstraints[t.readInt(true)]);
      for (let h = 0, r = t.readInt(true); h < r; h++)
        n.constraints.push(e.pathConstraints[t.readInt(true)]);
      for (let h = 0, r = t.readInt(true); h < r; h++)
        n.constraints.push(e.physicsConstraints[t.readInt(true)]);
      o = t.readInt(true);
    }
    for (let a = 0; a < o; a++) {
      let h = t.readInt(true);
      for (let r = 0, l = t.readInt(true); r < l; r++) {
        let c = t.readStringRef();
        if (!c)
          throw new Error("Attachment name must not be null");
        let f = this.readAttachment(t, e, n, h, c, s);
        f && n.setAttachment(h, c, f);
      }
    }
    return n;
  }
  readAttachment(t, e, i, s, n, o) {
    let a = this.scale, h = t.readByte();
    const r = h & 8 ? t.readStringRef() : n;
    if (!r)
      throw new Error("Attachment name must not be null");
    switch (h & 7) {
      case It.Region: {
        let l = h & 16 ? t.readStringRef() : null;
        const c = h & 32 ? t.readInt32() : 4294967295, f = h & 64 ? this.readSequence(t) : null;
        let d = h & 128 ? t.readFloat() : 0, m = t.readFloat(), g = t.readFloat(), b = t.readFloat(), w = t.readFloat(), v = t.readFloat(), x = t.readFloat();
        l || (l = r);
        let p = this.attachmentLoader.newRegionAttachment(i, r, l, f);
        return p ? (p.path = l, p.x = m * a, p.y = g * a, p.scaleX = b, p.scaleY = w, p.rotation = d, p.width = v * a, p.height = x * a, q.rgba8888ToColor(p.color, c), p.sequence = f, f == null && p.updateRegion(), p) : null;
      }
      case It.BoundingBox: {
        let l = this.readVertices(t, (h & 16) != 0), c = o ? t.readInt32() : 0, f = this.attachmentLoader.newBoundingBoxAttachment(i, r);
        return f ? (f.worldVerticesLength = l.length, f.vertices = l.vertices, f.bones = l.bones, o && q.rgba8888ToColor(f.color, c), f) : null;
      }
      case It.Mesh: {
        let l = h & 16 ? t.readStringRef() : r;
        const c = h & 32 ? t.readInt32() : 4294967295, f = h & 64 ? this.readSequence(t) : null, d = t.readInt(true), m = this.readVertices(t, (h & 128) != 0), g = this.readFloatArray(t, m.length, 1), b = this.readShortArray(t, (m.length - d - 2) * 3);
        let w = [], v = 0, x = 0;
        o && (w = this.readShortArray(t, t.readInt(true)), v = t.readFloat(), x = t.readFloat()), l || (l = r);
        let p = this.attachmentLoader.newMeshAttachment(i, r, l, f);
        return p ? (p.path = l, q.rgba8888ToColor(p.color, c), p.bones = m.bones, p.vertices = m.vertices, p.worldVerticesLength = m.length, p.triangles = b, p.regionUVs = g, f == null && p.updateRegion(), p.hullLength = d << 1, p.sequence = f, o && (p.edges = w, p.width = v * a, p.height = x * a), p) : null;
      }
      case It.LinkedMesh: {
        const l = h & 16 ? t.readStringRef() : r;
        if (l == null)
          throw new Error("Path of linked mesh must not be null");
        const c = h & 32 ? t.readInt32() : 4294967295, f = h & 64 ? this.readSequence(t) : null, d = (h & 128) != 0, m = t.readInt(true), g = t.readStringRef();
        let b = 0, w = 0;
        o && (b = t.readFloat(), w = t.readFloat());
        let v = this.attachmentLoader.newMeshAttachment(i, r, l, f);
        return v ? (v.path = l, q.rgba8888ToColor(v.color, c), v.sequence = f, o && (v.width = b * a, v.height = w * a), this.linkedMeshes.push(new oi(v, m, s, g, d)), v) : null;
      }
      case It.Path: {
        const l = (h & 16) != 0, c = (h & 32) != 0, f = this.readVertices(t, (h & 64) != 0), d = V.newArray(f.length / 6, 0);
        for (let b = 0, w = d.length; b < w; b++)
          d[b] = t.readFloat() * a;
        const m = o ? t.readInt32() : 0, g = this.attachmentLoader.newPathAttachment(i, r);
        return g ? (g.closed = l, g.constantSpeed = c, g.worldVerticesLength = f.length, g.vertices = f.vertices, g.bones = f.bones, g.lengths = d, o && q.rgba8888ToColor(g.color, m), g) : null;
      }
      case It.Point: {
        const l = t.readFloat(), c = t.readFloat(), f = t.readFloat(), d = o ? t.readInt32() : 0, m = this.attachmentLoader.newPointAttachment(i, r);
        return m ? (m.x = c * a, m.y = f * a, m.rotation = l, o && q.rgba8888ToColor(m.color, d), m) : null;
      }
      case It.Clipping: {
        const l = t.readInt(true), c = this.readVertices(t, (h & 16) != 0);
        let f = o ? t.readInt32() : 0, d = this.attachmentLoader.newClippingAttachment(i, r);
        return d ? (d.endSlot = e.slots[l], d.worldVerticesLength = c.length, d.vertices = c.vertices, d.bones = c.bones, o && q.rgba8888ToColor(d.color, f), d) : null;
      }
    }
    return null;
  }
  readSequence(t) {
    let e = new re(t.readInt(true));
    return e.start = t.readInt(true), e.digits = t.readInt(true), e.setupIndex = t.readInt(true), e;
  }
  readVertices(t, e) {
    const i = this.scale, s = t.readInt(true), n = new hi();
    if (n.length = s << 1, !e)
      return n.vertices = this.readFloatArray(t, n.length, i), n;
    let o = new Array(), a = new Array();
    for (let h = 0; h < s; h++) {
      let r = t.readInt(true);
      a.push(r);
      for (let l = 0; l < r; l++)
        a.push(t.readInt(true)), o.push(t.readFloat() * i), o.push(t.readFloat() * i), o.push(t.readFloat());
    }
    return n.vertices = V.toFloatArray(o), n.bones = a, n;
  }
  readFloatArray(t, e, i) {
    let s = new Array(e);
    if (i == 1)
      for (let n = 0; n < e; n++)
        s[n] = t.readFloat();
    else
      for (let n = 0; n < e; n++)
        s[n] = t.readFloat() * i;
    return s;
  }
  readShortArray(t, e) {
    let i = new Array(e);
    for (let s = 0; s < e; s++)
      i[s] = t.readInt(true);
    return i;
  }
  readAnimation(t, e, i) {
    t.readInt(true);
    let s = new Array(), n = this.scale;
    for (let r = 0, l = t.readInt(true); r < l; r++) {
      let c = t.readInt(true);
      for (let f = 0, d = t.readInt(true); f < d; f++) {
        let m = t.readByte(), g = t.readInt(true), b = g - 1;
        switch (m) {
          case vi: {
            let w = new Lt(g, c);
            for (let v = 0; v < g; v++)
              w.setFrame(v, t.readFloat(), t.readStringRef());
            s.push(w);
            break;
          }
          case Si: {
            let w = t.readInt(true), v = new os(g, w, c), x = t.readFloat(), p = t.readUnsignedByte() / 255, S = t.readUnsignedByte() / 255, y = t.readUnsignedByte() / 255, A = t.readUnsignedByte() / 255;
            for (let C = 0, M = 0; v.setFrame(C, x, p, S, y, A), C != b; C++) {
              let F = t.readFloat(), T = t.readUnsignedByte() / 255, P = t.readUnsignedByte() / 255, R = t.readUnsignedByte() / 255, Y = t.readUnsignedByte() / 255;
              switch (t.readByte()) {
                case St:
                  v.setStepped(C);
                  break;
                case kt:
                  $(t, v, M++, C, 0, x, F, p, T, 1), $(t, v, M++, C, 1, x, F, S, P, 1), $(t, v, M++, C, 2, x, F, y, R, 1), $(t, v, M++, C, 3, x, F, A, Y, 1);
              }
              x = F, p = T, S = P, y = R, A = Y;
            }
            s.push(v);
            break;
          }
          case ki: {
            let w = t.readInt(true), v = new hs(g, w, c), x = t.readFloat(), p = t.readUnsignedByte() / 255, S = t.readUnsignedByte() / 255, y = t.readUnsignedByte() / 255;
            for (let A = 0, C = 0; v.setFrame(A, x, p, S, y), A != b; A++) {
              let M = t.readFloat(), F = t.readUnsignedByte() / 255, T = t.readUnsignedByte() / 255, P = t.readUnsignedByte() / 255;
              switch (t.readByte()) {
                case St:
                  v.setStepped(A);
                  break;
                case kt:
                  $(t, v, C++, A, 0, x, M, p, F, 1), $(t, v, C++, A, 1, x, M, S, T, 1), $(t, v, C++, A, 2, x, M, y, P, 1);
              }
              x = M, p = F, S = T, y = P;
            }
            s.push(v);
            break;
          }
          case Ai: {
            let w = t.readInt(true), v = new ds(g, w, c), x = t.readFloat(), p = t.readUnsignedByte() / 255, S = t.readUnsignedByte() / 255, y = t.readUnsignedByte() / 255, A = t.readUnsignedByte() / 255, C = t.readUnsignedByte() / 255, M = t.readUnsignedByte() / 255, F = t.readUnsignedByte() / 255;
            for (let T = 0, P = 0; v.setFrame(T, x, p, S, y, A, C, M, F), T != b; T++) {
              let R = t.readFloat(), Y = t.readUnsignedByte() / 255, X = t.readUnsignedByte() / 255, O2 = t.readUnsignedByte() / 255, N = t.readUnsignedByte() / 255, z = t.readUnsignedByte() / 255, L = t.readUnsignedByte() / 255, H = t.readUnsignedByte() / 255;
              switch (t.readByte()) {
                case St:
                  v.setStepped(T);
                  break;
                case kt:
                  $(t, v, P++, T, 0, x, R, p, Y, 1), $(t, v, P++, T, 1, x, R, S, X, 1), $(t, v, P++, T, 2, x, R, y, O2, 1), $(t, v, P++, T, 3, x, R, A, N, 1), $(t, v, P++, T, 4, x, R, C, z, 1), $(t, v, P++, T, 5, x, R, M, L, 1), $(t, v, P++, T, 6, x, R, F, H, 1);
              }
              x = R, p = Y, S = X, y = O2, A = N, C = z, M = L, F = H;
            }
            s.push(v);
            break;
          }
          case Ci: {
            let w = t.readInt(true), v = new fs(g, w, c), x = t.readFloat(), p = t.readUnsignedByte() / 255, S = t.readUnsignedByte() / 255, y = t.readUnsignedByte() / 255, A = t.readUnsignedByte() / 255, C = t.readUnsignedByte() / 255, M = t.readUnsignedByte() / 255;
            for (let F = 0, T = 0; v.setFrame(F, x, p, S, y, A, C, M), F != b; F++) {
              let P = t.readFloat(), R = t.readUnsignedByte() / 255, Y = t.readUnsignedByte() / 255, X = t.readUnsignedByte() / 255, O2 = t.readUnsignedByte() / 255, N = t.readUnsignedByte() / 255, z = t.readUnsignedByte() / 255;
              switch (t.readByte()) {
                case St:
                  v.setStepped(F);
                  break;
                case kt:
                  $(t, v, T++, F, 0, x, P, p, R, 1), $(t, v, T++, F, 1, x, P, S, Y, 1), $(t, v, T++, F, 2, x, P, y, X, 1), $(t, v, T++, F, 3, x, P, A, O2, 1), $(t, v, T++, F, 4, x, P, C, N, 1), $(t, v, T++, F, 5, x, P, M, z, 1);
              }
              x = P, p = R, S = Y, y = X, A = O2, C = N, M = z;
            }
            s.push(v);
            break;
          }
          case Ii: {
            let w = new cs(g, t.readInt(true), c), v = t.readFloat(), x = t.readUnsignedByte() / 255;
            for (let p = 0, S = 0; w.setFrame(p, v, x), p != b; p++) {
              let y = t.readFloat(), A = t.readUnsignedByte() / 255;
              switch (t.readByte()) {
                case St:
                  w.setStepped(p);
                  break;
                case kt:
                  $(t, w, S++, p, 0, v, y, x, A, 1);
              }
              v = y, x = A;
            }
            s.push(w);
          }
        }
      }
    }
    for (let r = 0, l = t.readInt(true); r < l; r++) {
      let c = t.readInt(true);
      for (let f = 0, d = t.readInt(true); f < d; f++) {
        let m = t.readByte(), g = t.readInt(true);
        if (m == yi) {
          let w = new ls(g, c);
          for (let v = 0; v < g; v++)
            w.setFrame(v, t.readFloat(), t.readByte());
          s.push(w);
          continue;
        }
        let b = t.readInt(true);
        switch (m) {
          case ci:
            s.push(lt(t, new ne(g, b, c), 1));
            break;
          case di:
            s.push(Ae(t, new Je(g, b, c), n));
            break;
          case fi:
            s.push(lt(t, new Ze(g, b, c), n));
            break;
          case ui:
            s.push(lt(t, new ts(g, b, c), n));
            break;
          case mi:
            s.push(Ae(t, new es(g, b, c), 1));
            break;
          case gi:
            s.push(lt(t, new ss(g, b, c), 1));
            break;
          case pi:
            s.push(lt(t, new is(g, b, c), 1));
            break;
          case xi:
            s.push(Ae(t, new rs(g, b, c), 1));
            break;
          case bi:
            s.push(lt(t, new ns(g, b, c), 1));
            break;
          case wi:
            s.push(lt(t, new as(g, b, c), 1));
        }
      }
    }
    for (let r = 0, l = t.readInt(true); r < l; r++) {
      let c = t.readInt(true), f = t.readInt(true), d = f - 1, m = new ms(f, t.readInt(true), c), g = t.readByte(), b = t.readFloat(), w = g & 1 ? g & 2 ? t.readFloat() : 1 : 0, v = g & 4 ? t.readFloat() * n : 0;
      for (let x = 0, p = 0; m.setFrame(x, b, w, v, g & 8 ? 1 : -1, (g & 16) != 0, (g & 32) != 0), x != d; x++) {
        g = t.readByte();
        const S = t.readFloat(), y = g & 1 ? g & 2 ? t.readFloat() : 1 : 0, A = g & 4 ? t.readFloat() * n : 0;
        g & 64 ? m.setStepped(x) : g & 128 && ($(t, m, p++, x, 0, b, S, w, y, 1), $(t, m, p++, x, 1, b, S, v, A, n)), b = S, w = y, v = A;
      }
      s.push(m);
    }
    for (let r = 0, l = t.readInt(true); r < l; r++) {
      let c = t.readInt(true), f = t.readInt(true), d = f - 1, m = new gs(f, t.readInt(true), c), g = t.readFloat(), b = t.readFloat(), w = t.readFloat(), v = t.readFloat(), x = t.readFloat(), p = t.readFloat(), S = t.readFloat();
      for (let y = 0, A = 0; m.setFrame(y, g, b, w, v, x, p, S), y != d; y++) {
        let C = t.readFloat(), M = t.readFloat(), F = t.readFloat(), T = t.readFloat(), P = t.readFloat(), R = t.readFloat(), Y = t.readFloat();
        switch (t.readByte()) {
          case St:
            m.setStepped(y);
            break;
          case kt:
            $(t, m, A++, y, 0, g, C, b, M, 1), $(t, m, A++, y, 1, g, C, w, F, 1), $(t, m, A++, y, 2, g, C, v, T, 1), $(t, m, A++, y, 3, g, C, x, P, 1), $(t, m, A++, y, 4, g, C, p, R, 1), $(t, m, A++, y, 5, g, C, S, Y, 1);
        }
        g = C, b = M, w = F, v = T, x = P, p = R, S = Y;
      }
      s.push(m);
    }
    for (let r = 0, l = t.readInt(true); r < l; r++) {
      let c = t.readInt(true), f = i.pathConstraints[c];
      for (let d = 0, m = t.readInt(true); d < m; d++) {
        const g = t.readByte(), b = t.readInt(true), w = t.readInt(true);
        switch (g) {
          case Ti:
            s.push(lt(t, new ps(b, w, c), f.positionMode == At.Fixed ? n : 1));
            break;
          case Fi:
            s.push(lt(t, new xs(b, w, c), f.spacingMode == st.Length || f.spacingMode == st.Fixed ? n : 1));
            break;
          case Xi:
            let v = new bs(b, w, c), x = t.readFloat(), p = t.readFloat(), S = t.readFloat(), y = t.readFloat();
            for (let A = 0, C = 0, M = v.getFrameCount() - 1; v.setFrame(A, x, p, S, y), A != M; A++) {
              let F = t.readFloat(), T = t.readFloat(), P = t.readFloat(), R = t.readFloat();
              switch (t.readByte()) {
                case St:
                  v.setStepped(A);
                  break;
                case kt:
                  $(t, v, C++, A, 0, x, F, p, T, 1), $(t, v, C++, A, 1, x, F, S, P, 1), $(t, v, C++, A, 2, x, F, y, R, 1);
              }
              x = F, p = T, S = P, y = R;
            }
            s.push(v);
        }
      }
    }
    for (let r = 0, l = t.readInt(true); r < l; r++) {
      const c = t.readInt(true) - 1;
      for (let f = 0, d = t.readInt(true); f < d; f++) {
        const m = t.readByte(), g = t.readInt(true);
        if (m == Li) {
          const w = new ae(g, c);
          for (let v = 0; v < g; v++)
            w.setFrame(v, t.readFloat());
          s.push(w);
          continue;
        }
        const b = t.readInt(true);
        switch (m) {
          case Ei:
            s.push(lt(t, new ws(g, b, c), 1));
            break;
          case Ri:
            s.push(lt(t, new ys(g, b, c), 1));
            break;
          case Pi:
            s.push(lt(t, new vs(g, b, c), 1));
            break;
          case Bi:
            s.push(lt(t, new Ss(g, b, c), 1));
            break;
          case Vi:
            s.push(lt(t, new ks(g, b, c), 1));
            break;
          case Oi:
            s.push(lt(t, new As(g, b, c), 1));
            break;
          case Di:
            s.push(lt(t, new Cs(g, b, c), 1));
        }
      }
    }
    for (let r = 0, l = t.readInt(true); r < l; r++) {
      let c = i.skins[t.readInt(true)];
      for (let f = 0, d = t.readInt(true); f < d; f++) {
        let m = t.readInt(true);
        for (let g = 0, b = t.readInt(true); g < b; g++) {
          let w = t.readStringRef();
          if (!w)
            throw new Error("attachmentName must not be null.");
          let v = c.getAttachment(m, w), x = t.readByte(), p = t.readInt(true), S = p - 1;
          switch (x) {
            case Mi: {
              let y = v, A = y.bones, C = y.vertices, M = A ? C.length / 3 * 2 : C.length, F = t.readInt(true), T = new us(p, F, m, y), P = t.readFloat();
              for (let R = 0, Y = 0; ; R++) {
                let X, O2 = t.readInt(true);
                if (O2 == 0)
                  X = A ? V.newFloatArray(M) : C;
                else {
                  X = V.newFloatArray(M);
                  let z = t.readInt(true);
                  if (O2 += z, n == 1)
                    for (let L = z; L < O2; L++)
                      X[L] = t.readFloat();
                  else
                    for (let L = z; L < O2; L++)
                      X[L] = t.readFloat() * n;
                  if (!A)
                    for (let L = 0, H = X.length; L < H; L++)
                      X[L] += C[L];
                }
                if (T.setFrame(R, P, X), R == S)
                  break;
                let N = t.readFloat();
                switch (t.readByte()) {
                  case St:
                    T.setStepped(R);
                    break;
                  case kt:
                    $(t, T, Y++, R, 0, P, N, 0, 1, 1);
                }
                P = N;
              }
              s.push(T);
              break;
            }
            case Yi: {
              let y = new le(p, m, v);
              for (let A = 0; A < p; A++) {
                let C = t.readFloat(), M = t.readInt32();
                y.setFrame(A, C, Qe[M & 15], M >> 4, t.readFloat());
              }
              s.push(y);
              break;
            }
          }
        }
      }
    }
    let o = t.readInt(true);
    if (o > 0) {
      let r = new Rt(o), l = i.slots.length;
      for (let c = 0; c < o; c++) {
        let f = t.readFloat(), d = t.readInt(true), m = V.newArray(l, 0);
        for (let v = l - 1; v >= 0; v--)
          m[v] = -1;
        let g = V.newArray(l - d, 0), b = 0, w = 0;
        for (let v = 0; v < d; v++) {
          let x = t.readInt(true);
          for (; b != x; )
            g[w++] = b++;
          m[b + t.readInt(true)] = b++;
        }
        for (; b < l; )
          g[w++] = b++;
        for (let v = l - 1; v >= 0; v--)
          m[v] == -1 && (m[v] = g[--w]);
        r.setFrame(c, f, m);
      }
      s.push(r);
    }
    let a = t.readInt(true);
    if (a > 0) {
      let r = new _t(a);
      for (let l = 0; l < a; l++) {
        let c = t.readFloat(), f = i.events[t.readInt(true)], d = new Ys(c, f);
        d.intValue = t.readInt(false), d.floatValue = t.readFloat(), d.stringValue = t.readString(), d.stringValue == null && (d.stringValue = f.stringValue), d.data.audioPath && (d.volume = t.readFloat(), d.balance = t.readFloat()), r.setFrame(l, d);
      }
      s.push(r);
    }
    let h = 0;
    for (let r = 0, l = s.length; r < l; r++)
      h = Math.max(h, s[r].getDuration());
    return new Te(e, s, h);
  }
};
var li = class {
  constructor(t, e = new Array(), i = 0, s = new DataView(t instanceof ArrayBuffer ? t : t.buffer)) {
    u(this, "strings");
    u(this, "index");
    u(this, "buffer");
    this.strings = e, this.index = i, this.buffer = s;
  }
  readByte() {
    return this.buffer.getInt8(this.index++);
  }
  readUnsignedByte() {
    return this.buffer.getUint8(this.index++);
  }
  readShort() {
    let t = this.buffer.getInt16(this.index);
    return this.index += 2, t;
  }
  readInt32() {
    let t = this.buffer.getInt32(this.index);
    return this.index += 4, t;
  }
  readInt(t) {
    let e = this.readByte(), i = e & 127;
    return e & 128 && (e = this.readByte(), i |= (e & 127) << 7, e & 128 && (e = this.readByte(), i |= (e & 127) << 14, e & 128 && (e = this.readByte(), i |= (e & 127) << 21, e & 128 && (e = this.readByte(), i |= (e & 127) << 28)))), t ? i : i >>> 1 ^ -(i & 1);
  }
  readStringRef() {
    let t = this.readInt(true);
    return t == 0 ? null : this.strings[t - 1];
  }
  readString() {
    let t = this.readInt(true);
    switch (t) {
      case 0:
        return null;
      case 1:
        return "";
    }
    t--;
    let e = "";
    for (let i = 0; i < t; ) {
      let s = this.readUnsignedByte();
      switch (s >> 4) {
        case 12:
        case 13:
          e += String.fromCharCode((s & 31) << 6 | this.readByte() & 63), i += 2;
          break;
        case 14:
          e += String.fromCharCode((s & 15) << 12 | (this.readByte() & 63) << 6 | this.readByte() & 63), i += 3;
          break;
        default:
          e += String.fromCharCode(s), i++;
      }
    }
    return e;
  }
  readFloat() {
    let t = this.buffer.getFloat32(this.index);
    return this.index += 4, t;
  }
  readBoolean() {
    return this.readByte() != 0;
  }
};
var oi = class {
  constructor(t, e, i, s, n) {
    u(this, "parent");
    u(this, "skinIndex");
    u(this, "slotIndex");
    u(this, "mesh");
    u(this, "inheritTimeline");
    this.mesh = t, this.skinIndex = e, this.slotIndex = i, this.parent = s, this.inheritTimeline = n;
  }
};
var hi = class {
  constructor(t = null, e = null, i = 0) {
    u(this, "bones");
    u(this, "vertices");
    u(this, "length");
    this.bones = t, this.vertices = e, this.length = i;
  }
};
var It;
(function(k) {
  k[k.Region = 0] = "Region", k[k.BoundingBox = 1] = "BoundingBox", k[k.Mesh = 2] = "Mesh", k[k.LinkedMesh = 3] = "LinkedMesh", k[k.Path = 4] = "Path", k[k.Point = 5] = "Point", k[k.Clipping = 6] = "Clipping";
})(It || (It = {}));
function lt(k, t, e) {
  let i = k.readFloat(), s = k.readFloat() * e;
  for (let n = 0, o = 0, a = t.getFrameCount() - 1; t.setFrame(n, i, s), n != a; n++) {
    let h = k.readFloat(), r = k.readFloat() * e;
    switch (k.readByte()) {
      case St:
        t.setStepped(n);
        break;
      case kt:
        $(k, t, o++, n, 0, i, h, s, r, e);
    }
    i = h, s = r;
  }
  return t;
}
function Ae(k, t, e) {
  let i = k.readFloat(), s = k.readFloat() * e, n = k.readFloat() * e;
  for (let o = 0, a = 0, h = t.getFrameCount() - 1; t.setFrame(o, i, s, n), o != h; o++) {
    let r = k.readFloat(), l = k.readFloat() * e, c = k.readFloat() * e;
    switch (k.readByte()) {
      case St:
        t.setStepped(o);
        break;
      case kt:
        $(k, t, a++, o, 0, i, r, s, l, e), $(k, t, a++, o, 1, i, r, n, c, e);
    }
    i = r, s = l, n = c;
  }
  return t;
}
function $(k, t, e, i, s, n, o, a, h, r) {
  t.setBezier(e, i, s, n, a, k.readFloat(), k.readFloat() * r, k.readFloat(), k.readFloat() * r, o, h);
}
var ci = 0;
var di = 1;
var fi = 2;
var ui = 3;
var mi = 4;
var gi = 5;
var pi = 6;
var xi = 7;
var bi = 8;
var wi = 9;
var yi = 10;
var vi = 0;
var Si = 1;
var ki = 2;
var Ai = 3;
var Ci = 4;
var Ii = 5;
var Mi = 0;
var Yi = 1;
var Ti = 0;
var Fi = 1;
var Xi = 2;
var Ei = 0;
var Ri = 1;
var Pi = 2;
var Bi = 4;
var Vi = 5;
var Oi = 6;
var Di = 7;
var Li = 8;
var St = 1;
var kt = 2;
var Ni = class {
  constructor() {
    u(this, "minX", 0);
    u(this, "minY", 0);
    u(this, "maxX", 0);
    u(this, "maxY", 0);
    u(this, "boundingBoxes", new Array());
    u(this, "polygons", new Array());
    u(this, "polygonPool", new jt(() => V.newFloatArray(16)));
  }
  /** Clears any previous polygons, finds all visible bounding box attachments, and computes the world vertices for each bounding
   * box's polygon.
   * @param updateAabb If true, the axis aligned bounding box containing all the polygons is computed. If false, the
   *           SkeletonBounds AABB methods will always return true. */
  update(t, e) {
    if (!t)
      throw new Error("skeleton cannot be null.");
    let i = this.boundingBoxes, s = this.polygons, n = this.polygonPool, o = t.slots, a = o.length;
    i.length = 0, n.freeAll(s), s.length = 0;
    for (let h = 0; h < a; h++) {
      let r = o[h];
      if (!r.bone.active)
        continue;
      let l = r.getAttachment();
      if (l instanceof xe) {
        let c = l;
        i.push(c);
        let f = n.obtain();
        f.length != c.worldVerticesLength && (f = V.newFloatArray(c.worldVerticesLength)), s.push(f), c.computeWorldVertices(r, 0, c.worldVerticesLength, f, 0, 2);
      }
    }
    e ? this.aabbCompute() : (this.minX = Number.POSITIVE_INFINITY, this.minY = Number.POSITIVE_INFINITY, this.maxX = Number.NEGATIVE_INFINITY, this.maxY = Number.NEGATIVE_INFINITY);
  }
  aabbCompute() {
    let t = Number.POSITIVE_INFINITY, e = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY, s = Number.NEGATIVE_INFINITY, n = this.polygons;
    for (let o = 0, a = n.length; o < a; o++) {
      let h = n[o], r = h;
      for (let l = 0, c = h.length; l < c; l += 2) {
        let f = r[l], d = r[l + 1];
        t = Math.min(t, f), e = Math.min(e, d), i = Math.max(i, f), s = Math.max(s, d);
      }
    }
    this.minX = t, this.minY = e, this.maxX = i, this.maxY = s;
  }
  /** Returns true if the axis aligned bounding box contains the point. */
  aabbContainsPoint(t, e) {
    return t >= this.minX && t <= this.maxX && e >= this.minY && e <= this.maxY;
  }
  /** Returns true if the axis aligned bounding box intersects the line segment. */
  aabbIntersectsSegment(t, e, i, s) {
    let n = this.minX, o = this.minY, a = this.maxX, h = this.maxY;
    if (t <= n && i <= n || e <= o && s <= o || t >= a && i >= a || e >= h && s >= h)
      return false;
    let r = (s - e) / (i - t), l = r * (n - t) + e;
    if (l > o && l < h || (l = r * (a - t) + e, l > o && l < h))
      return true;
    let c = (o - e) / r + t;
    return c > n && c < a || (c = (h - e) / r + t, c > n && c < a);
  }
  /** Returns true if the axis aligned bounding box intersects the axis aligned bounding box of the specified bounds. */
  aabbIntersectsSkeleton(t) {
    return this.minX < t.maxX && this.maxX > t.minX && this.minY < t.maxY && this.maxY > t.minY;
  }
  /** Returns the first bounding box attachment that contains the point, or null. When doing many checks, it is usually more
   * efficient to only call this method if {@link #aabbContainsPoint(float, float)} returns true. */
  containsPoint(t, e) {
    let i = this.polygons;
    for (let s = 0, n = i.length; s < n; s++)
      if (this.containsPointPolygon(i[s], t, e))
        return this.boundingBoxes[s];
    return null;
  }
  /** Returns true if the polygon contains the point. */
  containsPointPolygon(t, e, i) {
    let s = t, n = t.length, o = n - 2, a = false;
    for (let h = 0; h < n; h += 2) {
      let r = s[h + 1], l = s[o + 1];
      if (r < i && l >= i || l < i && r >= i) {
        let c = s[h];
        c + (i - r) / (l - r) * (s[o] - c) < e && (a = !a);
      }
      o = h;
    }
    return a;
  }
  /** Returns the first bounding box attachment that contains any part of the line segment, or null. When doing many checks, it
   * is usually more efficient to only call this method if {@link #aabbIntersectsSegment()} returns
   * true. */
  intersectsSegment(t, e, i, s) {
    let n = this.polygons;
    for (let o = 0, a = n.length; o < a; o++)
      if (this.intersectsSegmentPolygon(n[o], t, e, i, s))
        return this.boundingBoxes[o];
    return null;
  }
  /** Returns true if the polygon contains any part of the line segment. */
  intersectsSegmentPolygon(t, e, i, s, n) {
    let o = t, a = t.length, h = e - s, r = i - n, l = e * n - i * s, c = o[a - 2], f = o[a - 1];
    for (let d = 0; d < a; d += 2) {
      let m = o[d], g = o[d + 1], b = c * g - f * m, w = c - m, v = f - g, x = h * v - r * w, p = (l * w - h * b) / x;
      if ((p >= c && p <= m || p >= m && p <= c) && (p >= e && p <= s || p >= s && p <= e)) {
        let S = (l * v - r * b) / x;
        if ((S >= f && S <= g || S >= g && S <= f) && (S >= i && S <= n || S >= n && S <= i))
          return true;
      }
      c = m, f = g;
    }
    return false;
  }
  /** Returns the polygon for the specified bounding box, or null. */
  getPolygon(t) {
    if (!t)
      throw new Error("boundingBox cannot be null.");
    let e = this.boundingBoxes.indexOf(t);
    return e == -1 ? null : this.polygons[e];
  }
  /** The width of the axis aligned bounding box. */
  getWidth() {
    return this.maxX - this.minX;
  }
  /** The height of the axis aligned bounding box. */
  getHeight() {
    return this.maxY - this.minY;
  }
};
var dt = class _dt {
  constructor() {
    u(this, "convexPolygons", new Array());
    u(this, "convexPolygonsIndices", new Array());
    u(this, "indicesArray", new Array());
    u(this, "isConcaveArray", new Array());
    u(this, "triangles", new Array());
    u(this, "polygonPool", new jt(() => new Array()));
    u(this, "polygonIndicesPool", new jt(() => new Array()));
  }
  triangulate(t) {
    let e = t, i = t.length >> 1, s = this.indicesArray;
    s.length = 0;
    for (let a = 0; a < i; a++)
      s[a] = a;
    let n = this.isConcaveArray;
    n.length = 0;
    for (let a = 0, h = i; a < h; ++a)
      n[a] = _dt.isConcave(a, i, e, s);
    let o = this.triangles;
    for (o.length = 0; i > 3; ) {
      let a = i - 1, h = 0, r = 1;
      for (; ; ) {
        t: if (!n[h]) {
          let f = s[a] << 1, d = s[h] << 1, m = s[r] << 1, g = e[f], b = e[f + 1], w = e[d], v = e[d + 1], x = e[m], p = e[m + 1];
          for (let S = (r + 1) % i; S != a; S = (S + 1) % i) {
            if (!n[S])
              continue;
            let y = s[S] << 1, A = e[y], C = e[y + 1];
            if (_dt.positiveArea(x, p, g, b, A, C) && _dt.positiveArea(g, b, w, v, A, C) && _dt.positiveArea(w, v, x, p, A, C))
              break t;
          }
          break;
        }
        if (r == 0) {
          do {
            if (!n[h])
              break;
            h--;
          } while (h > 0);
          break;
        }
        a = h, h = r, r = (r + 1) % i;
      }
      o.push(s[(i + h - 1) % i]), o.push(s[h]), o.push(s[(h + 1) % i]), s.splice(h, 1), n.splice(h, 1), i--;
      let l = (i + h - 1) % i, c = h == i ? 0 : h;
      n[l] = _dt.isConcave(l, i, e, s), n[c] = _dt.isConcave(c, i, e, s);
    }
    return i == 3 && (o.push(s[2]), o.push(s[0]), o.push(s[1])), o;
  }
  decompose(t, e) {
    let i = t, s = this.convexPolygons;
    this.polygonPool.freeAll(s), s.length = 0;
    let n = this.convexPolygonsIndices;
    this.polygonIndicesPool.freeAll(n), n.length = 0;
    let o = this.polygonIndicesPool.obtain();
    o.length = 0;
    let a = this.polygonPool.obtain();
    a.length = 0;
    let h = -1, r = 0;
    for (let l = 0, c = e.length; l < c; l += 3) {
      let f = e[l] << 1, d = e[l + 1] << 1, m = e[l + 2] << 1, g = i[f], b = i[f + 1], w = i[d], v = i[d + 1], x = i[m], p = i[m + 1], S = false;
      if (h == f) {
        let y = a.length - 4, A = _dt.winding(a[y], a[y + 1], a[y + 2], a[y + 3], x, p), C = _dt.winding(x, p, a[0], a[1], a[2], a[3]);
        A == r && C == r && (a.push(x), a.push(p), o.push(m), S = true);
      }
      S || (a.length > 0 ? (s.push(a), n.push(o)) : (this.polygonPool.free(a), this.polygonIndicesPool.free(o)), a = this.polygonPool.obtain(), a.length = 0, a.push(g), a.push(b), a.push(w), a.push(v), a.push(x), a.push(p), o = this.polygonIndicesPool.obtain(), o.length = 0, o.push(f), o.push(d), o.push(m), r = _dt.winding(g, b, w, v, x, p), h = f);
    }
    a.length > 0 && (s.push(a), n.push(o));
    for (let l = 0, c = s.length; l < c; l++) {
      if (o = n[l], o.length == 0)
        continue;
      let f = o[0], d = o[o.length - 1];
      a = s[l];
      let m = a.length - 4, g = a[m], b = a[m + 1], w = a[m + 2], v = a[m + 3], x = a[0], p = a[1], S = a[2], y = a[3], A = _dt.winding(g, b, w, v, x, p);
      for (let C = 0; C < c; C++) {
        if (C == l)
          continue;
        let M = n[C];
        if (M.length != 3)
          continue;
        let F = M[0], T = M[1], P = M[2], R = s[C], Y = R[R.length - 2], X = R[R.length - 1];
        if (F != f || T != d)
          continue;
        let O2 = _dt.winding(g, b, w, v, Y, X), N = _dt.winding(Y, X, x, p, S, y);
        O2 == A && N == A && (R.length = 0, M.length = 0, a.push(Y), a.push(X), o.push(P), g = w, b = v, w = Y, v = X, C = 0);
      }
    }
    for (let l = s.length - 1; l >= 0; l--)
      a = s[l], a.length == 0 && (s.splice(l, 1), this.polygonPool.free(a), o = n[l], n.splice(l, 1), this.polygonIndicesPool.free(o));
    return s;
  }
  static isConcave(t, e, i, s) {
    let n = s[(e + t - 1) % e] << 1, o = s[t] << 1, a = s[(t + 1) % e] << 1;
    return !this.positiveArea(i[n], i[n + 1], i[o], i[o + 1], i[a], i[a + 1]);
  }
  static positiveArea(t, e, i, s, n, o) {
    return t * (o - s) + i * (e - o) + n * (s - e) >= 0;
  }
  static winding(t, e, i, s, n, o) {
    let a = i - t, h = s - e;
    return n * h - o * a + a * e - t * h >= 0 ? 1 : -1;
  }
};
var he = class _he {
  constructor() {
    u(this, "triangulator", new dt());
    u(this, "clippingPolygon", new Array());
    u(this, "clipOutput", new Array());
    u(this, "clippedVertices", new Array());
    u(this, "clippedUVs", new Array());
    u(this, "clippedTriangles", new Array());
    u(this, "scratch", new Array());
    u(this, "clipAttachment", null);
    u(this, "clippingPolygons", null);
  }
  clipStart(t, e) {
    if (this.clipAttachment)
      return 0;
    this.clipAttachment = e;
    let i = e.worldVerticesLength, s = V.setArraySize(this.clippingPolygon, i);
    e.computeWorldVertices(t, 0, i, s, 0, 2);
    let n = this.clippingPolygon;
    _he.makeClockwise(n);
    let o = this.clippingPolygons = this.triangulator.decompose(n, this.triangulator.triangulate(n));
    for (let a = 0, h = o.length; a < h; a++) {
      let r = o[a];
      _he.makeClockwise(r), r.push(r[0]), r.push(r[1]);
    }
    return o.length;
  }
  clipEndWithSlot(t) {
    this.clipAttachment && this.clipAttachment.endSlot == t.data && this.clipEnd();
  }
  clipEnd() {
    this.clipAttachment && (this.clipAttachment = null, this.clippingPolygons = null, this.clippedVertices.length = 0, this.clippedTriangles.length = 0, this.clippingPolygon.length = 0);
  }
  isClipping() {
    return this.clipAttachment != null;
  }
  clipTriangles(t, e, i, s, n, o, a, h) {
    let r, l, c, f, d, m;
    typeof e == "number" ? (r = i, l = s, c = n, f = o, d = a, m = h) : (r = e, l = i, c = s, f = n, d = o, m = a), c && f && d && typeof m == "boolean" ? this.clipTrianglesRender(t, r, l, c, f, d, m) : this.clipTrianglesNoRender(t, r, l);
  }
  clipTrianglesNoRender(t, e, i) {
    let s = this.clipOutput, n = this.clippedVertices, o = this.clippedTriangles, a = this.clippingPolygons, h = a.length, r = 0;
    n.length = 0, o.length = 0;
    for (let l = 0; l < i; l += 3) {
      let c = e[l] << 1, f = t[c], d = t[c + 1];
      c = e[l + 1] << 1;
      let m = t[c], g = t[c + 1];
      c = e[l + 2] << 1;
      let b = t[c], w = t[c + 1];
      for (let v = 0; v < h; v++) {
        let x = n.length;
        if (this.clip(f, d, m, g, b, w, a[v], s)) {
          let p = s.length;
          if (p == 0)
            continue;
          let S = p >> 1, y = this.clipOutput, A = V.setArraySize(n, x + S * 2);
          for (let M = 0; M < p; M += 2, x += 2) {
            let F = y[M], T = y[M + 1];
            A[x] = F, A[x + 1] = T;
          }
          x = o.length;
          let C = V.setArraySize(o, x + 3 * (S - 2));
          S--;
          for (let M = 1; M < S; M++, x += 3)
            C[x] = r, C[x + 1] = r + M, C[x + 2] = r + M + 1;
          r += S + 1;
        } else {
          let p = V.setArraySize(n, x + 6);
          p[x] = f, p[x + 1] = d, p[x + 2] = m, p[x + 3] = g, p[x + 4] = b, p[x + 5] = w, x = o.length;
          let S = V.setArraySize(o, x + 3);
          S[x] = r, S[x + 1] = r + 1, S[x + 2] = r + 2, r += 3;
          break;
        }
      }
    }
  }
  clipTrianglesRender(t, e, i, s, n, o, a) {
    let h = this.clipOutput, r = this.clippedVertices, l = this.clippedTriangles, c = this.clippingPolygons, f = c.length, d = a ? 12 : 8, m = 0;
    r.length = 0, l.length = 0;
    for (let g = 0; g < i; g += 3) {
      let b = e[g] << 1, w = t[b], v = t[b + 1], x = s[b], p = s[b + 1];
      b = e[g + 1] << 1;
      let S = t[b], y = t[b + 1], A = s[b], C = s[b + 1];
      b = e[g + 2] << 1;
      let M = t[b], F = t[b + 1], T = s[b], P = s[b + 1];
      for (let R = 0; R < f; R++) {
        let Y = r.length;
        if (this.clip(w, v, S, y, M, F, c[R], h)) {
          let X = h.length;
          if (X == 0)
            continue;
          let O2 = y - F, N = M - S, z = w - M, L = F - v, H = 1 / (O2 * z + N * (v - F)), K = X >> 1, Q = this.clipOutput, D = V.setArraySize(r, Y + K * d);
          for (let G = 0; G < X; G += 2, Y += d) {
            let mt = Q[G], ht = Q[G + 1];
            D[Y] = mt, D[Y + 1] = ht, D[Y + 2] = n.r, D[Y + 3] = n.g, D[Y + 4] = n.b, D[Y + 5] = n.a;
            let tt = mt - M, nt = ht - F, at = (O2 * tt + N * nt) * H, Yt = (L * tt + z * nt) * H, $t = 1 - at - Yt;
            D[Y + 6] = x * at + A * Yt + T * $t, D[Y + 7] = p * at + C * Yt + P * $t, a && (D[Y + 8] = o.r, D[Y + 9] = o.g, D[Y + 10] = o.b, D[Y + 11] = o.a);
          }
          Y = l.length;
          let U = V.setArraySize(l, Y + 3 * (K - 2));
          K--;
          for (let G = 1; G < K; G++, Y += 3)
            U[Y] = m, U[Y + 1] = m + G, U[Y + 2] = m + G + 1;
          m += K + 1;
        } else {
          let X = V.setArraySize(r, Y + 3 * d);
          X[Y] = w, X[Y + 1] = v, X[Y + 2] = n.r, X[Y + 3] = n.g, X[Y + 4] = n.b, X[Y + 5] = n.a, a ? (X[Y + 6] = x, X[Y + 7] = p, X[Y + 8] = o.r, X[Y + 9] = o.g, X[Y + 10] = o.b, X[Y + 11] = o.a, X[Y + 12] = S, X[Y + 13] = y, X[Y + 14] = n.r, X[Y + 15] = n.g, X[Y + 16] = n.b, X[Y + 17] = n.a, X[Y + 18] = A, X[Y + 19] = C, X[Y + 20] = o.r, X[Y + 21] = o.g, X[Y + 22] = o.b, X[Y + 23] = o.a, X[Y + 24] = M, X[Y + 25] = F, X[Y + 26] = n.r, X[Y + 27] = n.g, X[Y + 28] = n.b, X[Y + 29] = n.a, X[Y + 30] = T, X[Y + 31] = P, X[Y + 32] = o.r, X[Y + 33] = o.g, X[Y + 34] = o.b, X[Y + 35] = o.a) : (X[Y + 6] = x, X[Y + 7] = p, X[Y + 8] = S, X[Y + 9] = y, X[Y + 10] = n.r, X[Y + 11] = n.g, X[Y + 12] = n.b, X[Y + 13] = n.a, X[Y + 14] = A, X[Y + 15] = C, X[Y + 16] = M, X[Y + 17] = F, X[Y + 18] = n.r, X[Y + 19] = n.g, X[Y + 20] = n.b, X[Y + 21] = n.a, X[Y + 22] = T, X[Y + 23] = P), Y = l.length;
          let O2 = V.setArraySize(l, Y + 3);
          O2[Y] = m, O2[Y + 1] = m + 1, O2[Y + 2] = m + 2, m += 3;
          break;
        }
      }
    }
  }
  clipTrianglesUnpacked(t, e, i, s) {
    let n = this.clipOutput, o = this.clippedVertices, a = this.clippedUVs, h = this.clippedTriangles, r = this.clippingPolygons, l = r.length, c = 0;
    o.length = 0, a.length = 0, h.length = 0;
    for (let f = 0; f < i; f += 3) {
      let d = e[f] << 1, m = t[d], g = t[d + 1], b = s[d], w = s[d + 1];
      d = e[f + 1] << 1;
      let v = t[d], x = t[d + 1], p = s[d], S = s[d + 1];
      d = e[f + 2] << 1;
      let y = t[d], A = t[d + 1], C = s[d], M = s[d + 1];
      for (let F = 0; F < l; F++) {
        let T = o.length;
        if (this.clip(m, g, v, x, y, A, r[F], n)) {
          let P = n.length;
          if (P == 0)
            continue;
          let R = x - A, Y = y - v, X = m - y, O2 = A - g, N = 1 / (R * X + Y * (g - A)), z = P >> 1, L = this.clipOutput, H = V.setArraySize(o, T + z * 2), K = V.setArraySize(a, T + z * 2);
          for (let D = 0; D < P; D += 2, T += 2) {
            let U = L[D], G = L[D + 1];
            H[T] = U, H[T + 1] = G;
            let mt = U - y, ht = G - A, tt = (R * mt + Y * ht) * N, nt = (O2 * mt + X * ht) * N, at = 1 - tt - nt;
            K[T] = b * tt + p * nt + C * at, K[T + 1] = w * tt + S * nt + M * at;
          }
          T = h.length;
          let Q = V.setArraySize(h, T + 3 * (z - 2));
          z--;
          for (let D = 1; D < z; D++, T += 3)
            Q[T] = c, Q[T + 1] = c + D, Q[T + 2] = c + D + 1;
          c += z + 1;
        } else {
          let P = V.setArraySize(o, T + 6);
          P[T] = m, P[T + 1] = g, P[T + 2] = v, P[T + 3] = x, P[T + 4] = y, P[T + 5] = A;
          let R = V.setArraySize(a, T + 3 * 2);
          R[T] = b, R[T + 1] = w, R[T + 2] = p, R[T + 3] = S, R[T + 4] = C, R[T + 5] = M, T = h.length;
          let Y = V.setArraySize(h, T + 3);
          Y[T] = c, Y[T + 1] = c + 1, Y[T + 2] = c + 2, c += 3;
          break;
        }
      }
    }
  }
  /** Clips the input triangle against the convex, clockwise clipping area. If the triangle lies entirely within the clipping
   * area, false is returned. The clipping area must duplicate the first vertex at the end of the vertices list. */
  clip(t, e, i, s, n, o, a, h) {
    let r = h, l = false, c;
    a.length % 4 >= 2 ? (c = h, h = this.scratch) : c = this.scratch, c.length = 0, c.push(t), c.push(e), c.push(i), c.push(s), c.push(n), c.push(o), c.push(t), c.push(e), h.length = 0;
    let f = a.length - 4, d = a;
    for (let m = 0; ; m += 2) {
      let g = d[m], b = d[m + 1], w = g - d[m + 2], v = b - d[m + 3], x = h.length, p = c;
      for (let y = 0, A = c.length - 2; y < A; ) {
        let C = p[y], M = p[y + 1];
        y += 2;
        let F = p[y], T = p[y + 1], P = v * (g - F) > w * (b - T), R = v * (g - C) - w * (b - M);
        if (R > 0) {
          if (P) {
            h.push(F), h.push(T);
            continue;
          }
          let Y = F - C, X = T - M, O2 = R / (Y * v - X * w);
          if (O2 >= 0 && O2 <= 1)
            h.push(C + Y * O2), h.push(M + X * O2);
          else {
            h.push(F), h.push(T);
            continue;
          }
        } else if (P) {
          let Y = F - C, X = T - M, O2 = R / (Y * v - X * w);
          if (O2 >= 0 && O2 <= 1)
            h.push(C + Y * O2), h.push(M + X * O2), h.push(F), h.push(T);
          else {
            h.push(F), h.push(T);
            continue;
          }
        }
        l = true;
      }
      if (x == h.length)
        return r.length = 0, true;
      if (h.push(h[0]), h.push(h[1]), m == f)
        break;
      let S = h;
      h = c, h.length = 0, c = S;
    }
    if (r != h) {
      r.length = 0;
      for (let m = 0, g = h.length - 2; m < g; m++)
        r[m] = h[m];
    } else
      r.length = r.length - 2;
    return l;
  }
  static makeClockwise(t) {
    let e = t, i = t.length, s = e[i - 2] * e[1] - e[0] * e[i - 1], n = 0, o = 0, a = 0, h = 0;
    for (let r = 0, l = i - 3; r < l; r += 2)
      n = e[r], o = e[r + 1], a = e[r + 2], h = e[r + 3], s += n * h - a * o;
    if (!(s < 0))
      for (let r = 0, l = i - 2, c = i >> 1; r < c; r += 2) {
        let f = e[r], d = e[r + 1], m = l - r;
        e[r] = e[m], e[r + 1] = e[m + 1], e[m] = f, e[m + 1] = d;
      }
  }
};
var qi = class {
  constructor(t) {
    u(this, "attachmentLoader");
    u(this, "scale", 1);
    u(this, "linkedMeshes", new Array());
    this.attachmentLoader = t;
  }
  readSkeletonData(t) {
    let e = this.scale, i = new oe(), s = typeof t == "string" ? JSON.parse(t) : t, n = s.skeleton;
    if (n && (i.hash = n.hash, i.version = n.spine, i.x = n.x, i.y = n.y, i.width = n.width, i.height = n.height, i.referenceScale = I(n, "referenceScale", 100) * e, i.fps = n.fps, i.imagesPath = n.images ?? null, i.audioPath = n.audio ?? null), s.bones)
      for (let o = 0; o < s.bones.length; o++) {
        let a = s.bones[o], h = null, r = I(a, "parent", null);
        r && (h = i.findBone(r));
        let l = new Ms(i.bones.length, a.name, h);
        l.length = I(a, "length", 0) * e, l.x = I(a, "x", 0) * e, l.y = I(a, "y", 0) * e, l.rotation = I(a, "rotation", 0), l.scaleX = I(a, "scaleX", 1), l.scaleY = I(a, "scaleY", 1), l.shearX = I(a, "shearX", 0), l.shearY = I(a, "shearY", 0), l.inherit = V.enumValue(Z, I(a, "inherit", "Normal")), l.skinRequired = I(a, "skin", false);
        let c = I(a, "color", null);
        c && l.color.setFromString(c), i.bones.push(l);
      }
    if (s.slots)
      for (let o = 0; o < s.slots.length; o++) {
        let a = s.slots[o], h = a.name, r = i.findBone(a.bone);
        if (!r)
          throw new Error(`Couldn't find bone ${a.bone} for slot ${h}`);
        let l = new Rs(i.slots.length, h, r), c = I(a, "color", null);
        c && l.color.setFromString(c);
        let f = I(a, "dark", null);
        f && (l.darkColor = q.fromString(f)), l.attachmentName = I(a, "attachment", null), l.blendMode = V.enumValue(Xt, I(a, "blend", "normal")), l.visible = I(a, "visible", true), i.slots.push(l);
      }
    if (s.ik)
      for (let o = 0; o < s.ik.length; o++) {
        let a = s.ik[o], h = new Fs(a.name);
        h.order = I(a, "order", 0), h.skinRequired = I(a, "skin", false);
        for (let l = 0; l < a.bones.length; l++) {
          let c = i.findBone(a.bones[l]);
          if (!c)
            throw new Error(`Couldn't find bone ${a.bones[l]} for IK constraint ${a.name}.`);
          h.bones.push(c);
        }
        let r = i.findBone(a.target);
        if (!r)
          throw new Error(`Couldn't find target bone ${a.target} for IK constraint ${a.name}.`);
        h.target = r, h.mix = I(a, "mix", 1), h.softness = I(a, "softness", 0) * e, h.bendDirection = I(a, "bendPositive", true) ? 1 : -1, h.compress = I(a, "compress", false), h.stretch = I(a, "stretch", false), h.uniform = I(a, "uniform", false), i.ikConstraints.push(h);
      }
    if (s.transform)
      for (let o = 0; o < s.transform.length; o++) {
        let a = s.transform[o], h = new Ps(a.name);
        h.order = I(a, "order", 0), h.skinRequired = I(a, "skin", false);
        for (let c = 0; c < a.bones.length; c++) {
          let f = a.bones[c], d = i.findBone(f);
          if (!d)
            throw new Error(`Couldn't find bone ${f} for transform constraint ${a.name}.`);
          h.bones.push(d);
        }
        let r = a.target, l = i.findBone(r);
        if (!l)
          throw new Error(`Couldn't find target bone ${r} for transform constraint ${a.name}.`);
        h.target = l, h.local = I(a, "local", false), h.relative = I(a, "relative", false), h.offsetRotation = I(a, "rotation", 0), h.offsetX = I(a, "x", 0) * e, h.offsetY = I(a, "y", 0) * e, h.offsetScaleX = I(a, "scaleX", 0), h.offsetScaleY = I(a, "scaleY", 0), h.offsetShearY = I(a, "shearY", 0), h.mixRotate = I(a, "mixRotate", 1), h.mixX = I(a, "mixX", 1), h.mixY = I(a, "mixY", h.mixX), h.mixScaleX = I(a, "mixScaleX", 1), h.mixScaleY = I(a, "mixScaleY", h.mixScaleX), h.mixShearY = I(a, "mixShearY", 1), i.transformConstraints.push(h);
      }
    if (s.path)
      for (let o = 0; o < s.path.length; o++) {
        let a = s.path[o], h = new Xs(a.name);
        h.order = I(a, "order", 0), h.skinRequired = I(a, "skin", false);
        for (let c = 0; c < a.bones.length; c++) {
          let f = a.bones[c], d = i.findBone(f);
          if (!d)
            throw new Error(`Couldn't find bone ${f} for path constraint ${a.name}.`);
          h.bones.push(d);
        }
        let r = a.target, l = i.findSlot(r);
        if (!l)
          throw new Error(`Couldn't find target slot ${r} for path constraint ${a.name}.`);
        h.target = l, h.positionMode = V.enumValue(At, I(a, "positionMode", "Percent")), h.spacingMode = V.enumValue(st, I(a, "spacingMode", "Length")), h.rotateMode = V.enumValue(Bt, I(a, "rotateMode", "Tangent")), h.offsetRotation = I(a, "rotation", 0), h.position = I(a, "position", 0), h.positionMode == At.Fixed && (h.position *= e), h.spacing = I(a, "spacing", 0), (h.spacingMode == st.Length || h.spacingMode == st.Fixed) && (h.spacing *= e), h.mixRotate = I(a, "mixRotate", 1), h.mixX = I(a, "mixX", 1), h.mixY = I(a, "mixY", h.mixX), i.pathConstraints.push(h);
      }
    if (s.physics)
      for (let o = 0; o < s.physics.length; o++) {
        const a = s.physics[o], h = new Es(a.name);
        h.order = I(a, "order", 0), h.skinRequired = I(a, "skin", false);
        const r = a.bone, l = i.findBone(r);
        if (l == null)
          throw new Error("Physics bone not found: " + r);
        h.bone = l, h.x = I(a, "x", 0), h.y = I(a, "y", 0), h.rotate = I(a, "rotate", 0), h.scaleX = I(a, "scaleX", 0), h.shearX = I(a, "shearX", 0), h.limit = I(a, "limit", 5e3) * e, h.step = 1 / I(a, "fps", 60), h.inertia = I(a, "inertia", 1), h.strength = I(a, "strength", 100), h.damping = I(a, "damping", 1), h.massInverse = 1 / I(a, "mass", 1), h.wind = I(a, "wind", 0), h.gravity = I(a, "gravity", 0), h.mix = I(a, "mix", 1), h.inertiaGlobal = I(a, "inertiaGlobal", false), h.strengthGlobal = I(a, "strengthGlobal", false), h.dampingGlobal = I(a, "dampingGlobal", false), h.massGlobal = I(a, "massGlobal", false), h.windGlobal = I(a, "windGlobal", false), h.gravityGlobal = I(a, "gravityGlobal", false), h.mixGlobal = I(a, "mixGlobal", false), i.physicsConstraints.push(h);
      }
    if (s.skins)
      for (let o = 0; o < s.skins.length; o++) {
        let a = s.skins[o], h = new Ye(a.name);
        if (a.bones)
          for (let r = 0; r < a.bones.length; r++) {
            let l = a.bones[r], c = i.findBone(l);
            if (!c)
              throw new Error(`Couldn't find bone ${l} for skin ${a.name}.`);
            h.bones.push(c);
          }
        if (a.ik)
          for (let r = 0; r < a.ik.length; r++) {
            let l = a.ik[r], c = i.findIkConstraint(l);
            if (!c)
              throw new Error(`Couldn't find IK constraint ${l} for skin ${a.name}.`);
            h.constraints.push(c);
          }
        if (a.transform)
          for (let r = 0; r < a.transform.length; r++) {
            let l = a.transform[r], c = i.findTransformConstraint(l);
            if (!c)
              throw new Error(`Couldn't find transform constraint ${l} for skin ${a.name}.`);
            h.constraints.push(c);
          }
        if (a.path)
          for (let r = 0; r < a.path.length; r++) {
            let l = a.path[r], c = i.findPathConstraint(l);
            if (!c)
              throw new Error(`Couldn't find path constraint ${l} for skin ${a.name}.`);
            h.constraints.push(c);
          }
        if (a.physics)
          for (let r = 0; r < a.physics.length; r++) {
            let l = a.physics[r], c = i.findPhysicsConstraint(l);
            if (!c)
              throw new Error(`Couldn't find physics constraint ${l} for skin ${a.name}.`);
            h.constraints.push(c);
          }
        for (let r in a.attachments) {
          let l = i.findSlot(r);
          if (!l)
            throw new Error(`Couldn't find slot ${r} for skin ${a.name}.`);
          let c = a.attachments[r];
          for (let f in c) {
            let d = this.readAttachment(c[f], h, l.index, f, i);
            d && h.setAttachment(l.index, f, d);
          }
        }
        i.skins.push(h), h.name == "default" && (i.defaultSkin = h);
      }
    for (let o = 0, a = this.linkedMeshes.length; o < a; o++) {
      let h = this.linkedMeshes[o], r = h.skin ? i.findSkin(h.skin) : i.defaultSkin;
      if (!r)
        throw new Error(`Skin not found: ${h.skin}`);
      let l = r.getAttachment(h.slotIndex, h.parent);
      if (!l)
        throw new Error(`Parent mesh not found: ${h.parent}`);
      h.mesh.timelineAttachment = h.inheritTimeline ? l : h.mesh, h.mesh.setParentMesh(l), h.mesh.region != null && h.mesh.updateRegion();
    }
    if (this.linkedMeshes.length = 0, s.events)
      for (let o in s.events) {
        let a = s.events[o], h = new Ts(o);
        h.intValue = I(a, "int", 0), h.floatValue = I(a, "float", 0), h.stringValue = I(a, "string", ""), h.audioPath = I(a, "audio", null), h.audioPath && (h.volume = I(a, "volume", 1), h.balance = I(a, "balance", 0)), i.events.push(h);
      }
    if (s.animations)
      for (let o in s.animations) {
        let a = s.animations[o];
        this.readAnimation(a, o, i);
      }
    return i;
  }
  readAttachment(t, e, i, s, n) {
    let o = this.scale;
    switch (s = I(t, "name", s), I(t, "type", "region")) {
      case "region": {
        let a = I(t, "path", s), h = this.readSequence(I(t, "sequence", null)), r = this.attachmentLoader.newRegionAttachment(e, s, a, h);
        if (!r)
          return null;
        r.path = a, r.x = I(t, "x", 0) * o, r.y = I(t, "y", 0) * o, r.scaleX = I(t, "scaleX", 1), r.scaleY = I(t, "scaleY", 1), r.rotation = I(t, "rotation", 0), r.width = t.width * o, r.height = t.height * o, r.sequence = h;
        let l = I(t, "color", null);
        return l && r.color.setFromString(l), r.region != null && r.updateRegion(), r;
      }
      case "boundingbox": {
        let a = this.attachmentLoader.newBoundingBoxAttachment(e, s);
        if (!a)
          return null;
        this.readVertices(t, a, t.vertexCount << 1);
        let h = I(t, "color", null);
        return h && a.color.setFromString(h), a;
      }
      case "mesh":
      case "linkedmesh": {
        let a = I(t, "path", s), h = this.readSequence(I(t, "sequence", null)), r = this.attachmentLoader.newMeshAttachment(e, s, a, h);
        if (!r)
          return null;
        r.path = a;
        let l = I(t, "color", null);
        l && r.color.setFromString(l), r.width = I(t, "width", 0) * o, r.height = I(t, "height", 0) * o, r.sequence = h;
        let c = I(t, "parent", null);
        if (c)
          return this.linkedMeshes.push(new Wi(r, I(t, "skin", null), i, c, I(t, "timelines", true))), r;
        let f = t.uvs;
        return this.readVertices(t, r, f.length), r.triangles = t.triangles, r.regionUVs = f, r.region != null && r.updateRegion(), r.edges = I(t, "edges", null), r.hullLength = I(t, "hull", 0) * 2, r;
      }
      case "path": {
        let a = this.attachmentLoader.newPathAttachment(e, s);
        if (!a)
          return null;
        a.closed = I(t, "closed", false), a.constantSpeed = I(t, "constantSpeed", true);
        let h = t.vertexCount;
        this.readVertices(t, a, h << 1);
        let r = V.newArray(h / 3, 0);
        for (let c = 0; c < t.lengths.length; c++)
          r[c] = t.lengths[c] * o;
        a.lengths = r;
        let l = I(t, "color", null);
        return l && a.color.setFromString(l), a;
      }
      case "point": {
        let a = this.attachmentLoader.newPointAttachment(e, s);
        if (!a)
          return null;
        a.x = I(t, "x", 0) * o, a.y = I(t, "y", 0) * o, a.rotation = I(t, "rotation", 0);
        let h = I(t, "color", null);
        return h && a.color.setFromString(h), a;
      }
      case "clipping": {
        let a = this.attachmentLoader.newClippingAttachment(e, s);
        if (!a)
          return null;
        let h = I(t, "end", null);
        h && (a.endSlot = n.findSlot(h));
        let r = t.vertexCount;
        this.readVertices(t, a, r << 1);
        let l = I(t, "color", null);
        return l && a.color.setFromString(l), a;
      }
    }
    return null;
  }
  readSequence(t) {
    if (t == null)
      return null;
    let e = new re(I(t, "count", 0));
    return e.start = I(t, "start", 1), e.digits = I(t, "digits", 0), e.setupIndex = I(t, "setup", 0), e;
  }
  readVertices(t, e, i) {
    let s = this.scale;
    e.worldVerticesLength = i;
    let n = t.vertices;
    if (i == n.length) {
      let h = V.toFloatArray(n);
      if (s != 1)
        for (let r = 0, l = n.length; r < l; r++)
          h[r] *= s;
      e.vertices = h;
      return;
    }
    let o = new Array(), a = new Array();
    for (let h = 0, r = n.length; h < r; ) {
      let l = n[h++];
      a.push(l);
      for (let c = h + l * 4; h < c; h += 4)
        a.push(n[h]), o.push(n[h + 1] * s), o.push(n[h + 2] * s), o.push(n[h + 3]);
    }
    e.bones = a, e.vertices = V.toFloatArray(o);
  }
  readAnimation(t, e, i) {
    let s = this.scale, n = new Array();
    if (t.slots)
      for (let a in t.slots) {
        let h = t.slots[a], r = i.findSlot(a);
        if (!r)
          throw new Error("Slot not found: " + a);
        let l = r.index;
        for (let c in h) {
          let f = h[c];
          if (!f)
            continue;
          let d = f.length;
          if (c == "attachment") {
            let m = new Lt(d, l);
            for (let g = 0; g < d; g++) {
              let b = f[g];
              m.setFrame(g, I(b, "time", 0), I(b, "name", null));
            }
            n.push(m);
          } else if (c == "rgba") {
            let m = new os(d, d << 2, l), g = f[0], b = I(g, "time", 0), w = q.fromString(g.color);
            for (let v = 0, x = 0; ; v++) {
              m.setFrame(v, b, w.r, w.g, w.b, w.a);
              let p = f[v + 1];
              if (!p) {
                m.shrink(x);
                break;
              }
              let S = I(p, "time", 0), y = q.fromString(p.color), A = g.curve;
              A && (x = _(A, m, x, v, 0, b, S, w.r, y.r, 1), x = _(A, m, x, v, 1, b, S, w.g, y.g, 1), x = _(A, m, x, v, 2, b, S, w.b, y.b, 1), x = _(A, m, x, v, 3, b, S, w.a, y.a, 1)), b = S, w = y, g = p;
            }
            n.push(m);
          } else if (c == "rgb") {
            let m = new hs(d, d * 3, l), g = f[0], b = I(g, "time", 0), w = q.fromString(g.color);
            for (let v = 0, x = 0; ; v++) {
              m.setFrame(v, b, w.r, w.g, w.b);
              let p = f[v + 1];
              if (!p) {
                m.shrink(x);
                break;
              }
              let S = I(p, "time", 0), y = q.fromString(p.color), A = g.curve;
              A && (x = _(A, m, x, v, 0, b, S, w.r, y.r, 1), x = _(A, m, x, v, 1, b, S, w.g, y.g, 1), x = _(A, m, x, v, 2, b, S, w.b, y.b, 1)), b = S, w = y, g = p;
            }
            n.push(m);
          } else if (c == "alpha")
            n.push(pt(f, new cs(d, d, l), 0, 1));
          else if (c == "rgba2") {
            let m = new ds(d, d * 7, l), g = f[0], b = I(g, "time", 0), w = q.fromString(g.light), v = q.fromString(g.dark);
            for (let x = 0, p = 0; ; x++) {
              m.setFrame(x, b, w.r, w.g, w.b, w.a, v.r, v.g, v.b);
              let S = f[x + 1];
              if (!S) {
                m.shrink(p);
                break;
              }
              let y = I(S, "time", 0), A = q.fromString(S.light), C = q.fromString(S.dark), M = g.curve;
              M && (p = _(M, m, p, x, 0, b, y, w.r, A.r, 1), p = _(M, m, p, x, 1, b, y, w.g, A.g, 1), p = _(M, m, p, x, 2, b, y, w.b, A.b, 1), p = _(M, m, p, x, 3, b, y, w.a, A.a, 1), p = _(M, m, p, x, 4, b, y, v.r, C.r, 1), p = _(M, m, p, x, 5, b, y, v.g, C.g, 1), p = _(M, m, p, x, 6, b, y, v.b, C.b, 1)), b = y, w = A, v = C, g = S;
            }
            n.push(m);
          } else if (c == "rgb2") {
            let m = new fs(d, d * 6, l), g = f[0], b = I(g, "time", 0), w = q.fromString(g.light), v = q.fromString(g.dark);
            for (let x = 0, p = 0; ; x++) {
              m.setFrame(x, b, w.r, w.g, w.b, v.r, v.g, v.b);
              let S = f[x + 1];
              if (!S) {
                m.shrink(p);
                break;
              }
              let y = I(S, "time", 0), A = q.fromString(S.light), C = q.fromString(S.dark), M = g.curve;
              M && (p = _(M, m, p, x, 0, b, y, w.r, A.r, 1), p = _(M, m, p, x, 1, b, y, w.g, A.g, 1), p = _(M, m, p, x, 2, b, y, w.b, A.b, 1), p = _(M, m, p, x, 3, b, y, v.r, C.r, 1), p = _(M, m, p, x, 4, b, y, v.g, C.g, 1), p = _(M, m, p, x, 5, b, y, v.b, C.b, 1)), b = y, w = A, v = C, g = S;
            }
            n.push(m);
          }
        }
      }
    if (t.bones)
      for (let a in t.bones) {
        let h = t.bones[a], r = i.findBone(a);
        if (!r)
          throw new Error("Bone not found: " + a);
        let l = r.index;
        for (let c in h) {
          let f = h[c], d = f.length;
          if (d != 0) {
            if (c === "rotate")
              n.push(pt(f, new ne(d, d, l), 0, 1));
            else if (c === "translate") {
              let m = new Je(d, d << 1, l);
              n.push(Ce(f, m, "x", "y", 0, s));
            } else if (c === "translatex") {
              let m = new Ze(d, d, l);
              n.push(pt(f, m, 0, s));
            } else if (c === "translatey") {
              let m = new ts(d, d, l);
              n.push(pt(f, m, 0, s));
            } else if (c === "scale") {
              let m = new es(d, d << 1, l);
              n.push(Ce(f, m, "x", "y", 1, 1));
            } else if (c === "scalex") {
              let m = new ss(d, d, l);
              n.push(pt(f, m, 1, 1));
            } else if (c === "scaley") {
              let m = new is(d, d, l);
              n.push(pt(f, m, 1, 1));
            } else if (c === "shear") {
              let m = new rs(d, d << 1, l);
              n.push(Ce(f, m, "x", "y", 0, 1));
            } else if (c === "shearx") {
              let m = new ns(d, d, l);
              n.push(pt(f, m, 0, 1));
            } else if (c === "sheary") {
              let m = new as(d, d, l);
              n.push(pt(f, m, 0, 1));
            } else if (c === "inherit") {
              let m = new ls(d, r.index);
              for (let g = 0; g < f.length; g++) {
                let b = f[g];
                m.setFrame(g, I(b, "time", 0), V.enumValue(Z, I(b, "inherit", "Normal")));
              }
              n.push(m);
            }
          }
        }
      }
    if (t.ik)
      for (let a in t.ik) {
        let h = t.ik[a], r = h[0];
        if (!r)
          continue;
        let l = i.findIkConstraint(a);
        if (!l)
          throw new Error("IK Constraint not found: " + a);
        let c = i.ikConstraints.indexOf(l), f = new ms(h.length, h.length << 1, c), d = I(r, "time", 0), m = I(r, "mix", 1), g = I(r, "softness", 0) * s;
        for (let b = 0, w = 0; ; b++) {
          f.setFrame(b, d, m, g, I(r, "bendPositive", true) ? 1 : -1, I(r, "compress", false), I(r, "stretch", false));
          let v = h[b + 1];
          if (!v) {
            f.shrink(w);
            break;
          }
          let x = I(v, "time", 0), p = I(v, "mix", 1), S = I(v, "softness", 0) * s, y = r.curve;
          y && (w = _(y, f, w, b, 0, d, x, m, p, 1), w = _(y, f, w, b, 1, d, x, g, S, s)), d = x, m = p, g = S, r = v;
        }
        n.push(f);
      }
    if (t.transform)
      for (let a in t.transform) {
        let h = t.transform[a], r = h[0];
        if (!r)
          continue;
        let l = i.findTransformConstraint(a);
        if (!l)
          throw new Error("Transform constraint not found: " + a);
        let c = i.transformConstraints.indexOf(l), f = new gs(h.length, h.length * 6, c), d = I(r, "time", 0), m = I(r, "mixRotate", 1), g = I(r, "mixX", 1), b = I(r, "mixY", g), w = I(r, "mixScaleX", 1), v = I(r, "mixScaleY", w), x = I(r, "mixShearY", 1);
        for (let p = 0, S = 0; ; p++) {
          f.setFrame(p, d, m, g, b, w, v, x);
          let y = h[p + 1];
          if (!y) {
            f.shrink(S);
            break;
          }
          let A = I(y, "time", 0), C = I(y, "mixRotate", 1), M = I(y, "mixX", 1), F = I(y, "mixY", M), T = I(y, "mixScaleX", 1), P = I(y, "mixScaleY", T), R = I(y, "mixShearY", 1), Y = r.curve;
          Y && (S = _(Y, f, S, p, 0, d, A, m, C, 1), S = _(Y, f, S, p, 1, d, A, g, M, 1), S = _(Y, f, S, p, 2, d, A, b, F, 1), S = _(Y, f, S, p, 3, d, A, w, T, 1), S = _(Y, f, S, p, 4, d, A, v, P, 1), S = _(Y, f, S, p, 5, d, A, x, R, 1)), d = A, m = C, g = M, b = F, w = T, v = P, w = T, r = y;
        }
        n.push(f);
      }
    if (t.path)
      for (let a in t.path) {
        let h = t.path[a], r = i.findPathConstraint(a);
        if (!r)
          throw new Error("Path constraint not found: " + a);
        let l = i.pathConstraints.indexOf(r);
        for (let c in h) {
          let f = h[c], d = f[0];
          if (!d)
            continue;
          let m = f.length;
          if (c === "position") {
            let g = new ps(m, m, l);
            n.push(pt(f, g, 0, r.positionMode == At.Fixed ? s : 1));
          } else if (c === "spacing") {
            let g = new xs(m, m, l);
            n.push(pt(f, g, 0, r.spacingMode == st.Length || r.spacingMode == st.Fixed ? s : 1));
          } else if (c === "mix") {
            let g = new bs(m, m * 3, l), b = I(d, "time", 0), w = I(d, "mixRotate", 1), v = I(d, "mixX", 1), x = I(d, "mixY", v);
            for (let p = 0, S = 0; ; p++) {
              g.setFrame(p, b, w, v, x);
              let y = f[p + 1];
              if (!y) {
                g.shrink(S);
                break;
              }
              let A = I(y, "time", 0), C = I(y, "mixRotate", 1), M = I(y, "mixX", 1), F = I(y, "mixY", M), T = d.curve;
              T && (S = _(T, g, S, p, 0, b, A, w, C, 1), S = _(T, g, S, p, 1, b, A, v, M, 1), S = _(T, g, S, p, 2, b, A, x, F, 1)), b = A, w = C, v = M, x = F, d = y;
            }
            n.push(g);
          }
        }
      }
    if (t.physics)
      for (let a in t.physics) {
        let h = t.physics[a], r = -1;
        if (a.length > 0) {
          let l = i.findPhysicsConstraint(a);
          if (!l)
            throw new Error("Physics constraint not found: " + a);
          r = i.physicsConstraints.indexOf(l);
        }
        for (let l in h) {
          let c = h[l], f = c[0];
          if (!f)
            continue;
          let d = c.length;
          if (l == "reset") {
            const g = new ae(d, r);
            for (let b = 0; f != null; f = c[b + 1], b++)
              g.setFrame(b, I(f, "time", 0));
            n.push(g);
            continue;
          }
          let m;
          if (l == "inertia")
            m = new ws(d, d, r);
          else if (l == "strength")
            m = new ys(d, d, r);
          else if (l == "damping")
            m = new vs(d, d, r);
          else if (l == "mass")
            m = new Ss(d, d, r);
          else if (l == "wind")
            m = new ks(d, d, r);
          else if (l == "gravity")
            m = new As(d, d, r);
          else if (l == "mix")
            m = new Cs(d, d, r);
          else
            continue;
          n.push(pt(c, m, 0, 1));
        }
      }
    if (t.attachments)
      for (let a in t.attachments) {
        let h = t.attachments[a], r = i.findSkin(a);
        if (!r)
          throw new Error("Skin not found: " + a);
        for (let l in h) {
          let c = h[l], f = i.findSlot(l);
          if (!f)
            throw new Error("Slot not found: " + l);
          let d = f.index;
          for (let m in c) {
            let g = c[m], b = r.getAttachment(d, m);
            for (let w in g) {
              let v = g[w], x = v[0];
              if (x) {
                if (w == "deform") {
                  let p = b.bones, S = b.vertices, y = p ? S.length / 3 * 2 : S.length, A = new us(v.length, v.length, d, b), C = I(x, "time", 0);
                  for (let M = 0, F = 0; ; M++) {
                    let T, P = I(x, "vertices", null);
                    if (!P)
                      T = p ? V.newFloatArray(y) : S;
                    else {
                      T = V.newFloatArray(y);
                      let O2 = I(x, "offset", 0);
                      if (V.arrayCopy(P, 0, T, O2, P.length), s != 1)
                        for (let N = O2, z = N + P.length; N < z; N++)
                          T[N] *= s;
                      if (!p)
                        for (let N = 0; N < y; N++)
                          T[N] += S[N];
                    }
                    A.setFrame(M, C, T);
                    let R = v[M + 1];
                    if (!R) {
                      A.shrink(F);
                      break;
                    }
                    let Y = I(R, "time", 0), X = x.curve;
                    X && (F = _(X, A, F, M, 0, C, Y, 0, 1, 1)), C = Y, x = R;
                  }
                  n.push(A);
                } else if (w == "sequence") {
                  let p = new le(v.length, d, b), S = 0;
                  for (let y = 0; y < v.length; y++) {
                    let A = I(x, "delay", S), C = I(x, "time", 0), M = rt[I(x, "mode", "hold")], F = I(x, "index", 0);
                    p.setFrame(y, C, M, F, A), S = A, x = v[y + 1];
                  }
                  n.push(p);
                }
              }
            }
          }
        }
      }
    if (t.drawOrder) {
      let a = new Rt(t.drawOrder.length), h = i.slots.length, r = 0;
      for (let l = 0; l < t.drawOrder.length; l++, r++) {
        let c = t.drawOrder[l], f = null, d = I(c, "offsets", null);
        if (d) {
          f = V.newArray(h, -1);
          let m = V.newArray(h - d.length, 0), g = 0, b = 0;
          for (let w = 0; w < d.length; w++) {
            let v = d[w], x = i.findSlot(v.slot);
            if (!x)
              throw new Error("Slot not found: " + x);
            let p = x.index;
            for (; g != p; )
              m[b++] = g++;
            f[g + v.offset] = g++;
          }
          for (; g < h; )
            m[b++] = g++;
          for (let w = h - 1; w >= 0; w--)
            f[w] == -1 && (f[w] = m[--b]);
        }
        a.setFrame(r, I(c, "time", 0), f);
      }
      n.push(a);
    }
    if (t.events) {
      let a = new _t(t.events.length), h = 0;
      for (let r = 0; r < t.events.length; r++, h++) {
        let l = t.events[r], c = i.findEvent(l.name);
        if (!c)
          throw new Error("Event not found: " + l.name);
        let f = new Ys(V.toSinglePrecision(I(l, "time", 0)), c);
        f.intValue = I(l, "int", c.intValue), f.floatValue = I(l, "float", c.floatValue), f.stringValue = I(l, "string", c.stringValue), f.data.audioPath && (f.volume = I(l, "volume", 1), f.balance = I(l, "balance", 0)), a.setFrame(h, f);
      }
      n.push(a);
    }
    let o = 0;
    for (let a = 0, h = n.length; a < h; a++)
      o = Math.max(o, n[a].getDuration());
    i.animations.push(new Te(e, n, o));
  }
};
var Wi = class {
  constructor(t, e, i, s, n) {
    u(this, "parent");
    u(this, "skin");
    u(this, "slotIndex");
    u(this, "mesh");
    u(this, "inheritTimeline");
    this.mesh = t, this.skin = e, this.slotIndex = i, this.parent = s, this.inheritTimeline = n;
  }
};
function pt(k, t, e, i) {
  let s = k[0], n = I(s, "time", 0), o = I(s, "value", e) * i, a = 0;
  for (let h = 0; ; h++) {
    t.setFrame(h, n, o);
    let r = k[h + 1];
    if (!r)
      return t.shrink(a), t;
    let l = I(r, "time", 0), c = I(r, "value", e) * i;
    s.curve && (a = _(s.curve, t, a, h, 0, n, l, o, c, i)), n = l, o = c, s = r;
  }
}
function Ce(k, t, e, i, s, n) {
  let o = k[0], a = I(o, "time", 0), h = I(o, e, s) * n, r = I(o, i, s) * n, l = 0;
  for (let c = 0; ; c++) {
    t.setFrame(c, a, h, r);
    let f = k[c + 1];
    if (!f)
      return t.shrink(l), t;
    let d = I(f, "time", 0), m = I(f, e, s) * n, g = I(f, i, s) * n, b = o.curve;
    b && (l = _(b, t, l, c, 0, a, d, h, m, n), l = _(b, t, l, c, 1, a, d, r, g, n)), a = d, h = m, r = g, o = f;
  }
}
function _(k, t, e, i, s, n, o, a, h, r) {
  if (k == "stepped")
    return t.setStepped(i), e;
  let l = s << 2, c = k[l], f = k[l + 1] * r, d = k[l + 2], m = k[l + 3] * r;
  return t.setBezier(e, i, s, n, a, c, f, d, m, o, h), e + 1;
}
function I(k, t, e) {
  return k[t] !== void 0 ? k[t] : e;
}
typeof Math.fround > "u" && (Math.fround = /* @__PURE__ */ function(k) {
  return function(t) {
    return k[0] = t, k[0];
  };
}(new Float32Array(1)));
var xt = class xt2 extends Ks {
  static from(t) {
    return xt2.textureMap.has(t) ? xt2.textureMap.get(t) : new xt2(t);
  }
  constructor(t) {
    super(t.resource), this.texture = Texture.from(t);
  }
  setFilters(t, e) {
    const i = this.texture.source.style;
    i.minFilter = xt2.toPixiTextureFilter(t), i.magFilter = xt2.toPixiTextureFilter(e), this.texture.source.autoGenerateMipmaps = xt2.toPixiMipMap(t), this.texture.source.updateMipmaps();
  }
  setWraps(t, e) {
    const i = this.texture.source.style;
    i.addressModeU = xt2.toPixiTextureWrap(t), i.addressModeV = xt2.toPixiTextureWrap(e);
  }
  dispose() {
    this.texture.destroy();
  }
  static toPixiMipMap(t) {
    switch (t) {
      case it.Nearest:
      case it.Linear:
        return false;
      case it.MipMapNearestLinear:
      case it.MipMapNearestNearest:
      case it.MipMapLinearLinear:
      case it.MipMapLinearNearest:
        return true;
      default:
        throw new Error(`Unknown texture filter: ${String(t)}`);
    }
  }
  static toPixiTextureFilter(t) {
    switch (t) {
      case it.Nearest:
      case it.MipMapNearestLinear:
      case it.MipMapNearestNearest:
        return "nearest";
      case it.Linear:
      case it.MipMapLinearLinear:
      case it.MipMapLinearNearest:
        return "linear";
      default:
        throw new Error(`Unknown texture filter: ${String(t)}`);
    }
  }
  static toPixiTextureWrap(t) {
    switch (t) {
      case Mt.ClampToEdge:
        return "clamp-to-edge";
      case Mt.MirroredRepeat:
        return "mirror-repeat";
      case Mt.Repeat:
        return "repeat";
      default:
        throw new Error(`Unknown texture wrap: ${String(t)}`);
    }
  }
  static toPixiBlending(t) {
    switch (t) {
      case Xt.Normal:
        return "normal";
      case Xt.Additive:
        return "add";
      case Xt.Multiply:
        return "multiply";
      case Xt.Screen:
        return "screen";
      default:
        throw new Error(`Unknown blendMode: ${String(t)}`);
    }
  }
};
xt.textureMap = /* @__PURE__ */ new Map();
var ce = xt;
var zi = {
  extension: ExtensionType.Asset,
  resolver: {
    test: (k) => checkExtension(k, ".atlas"),
    parse: (k) => {
      var e, i;
      const t = k.split(".");
      return {
        resolution: parseFloat(((i = (e = Resolver.RETINA_PREFIX) == null ? void 0 : e.exec(k)) == null ? void 0 : i[1]) ?? "1"),
        format: t[t.length - 2],
        src: k
      };
    }
  },
  loader: {
    extension: {
      type: ExtensionType.LoadParser,
      priority: LoaderParserPriority.Normal,
      name: "spineTextureAtlasLoader"
    },
    test(k) {
      return checkExtension(k, ".atlas");
    },
    async load(k) {
      return await (await DOMAdapter.get().fetch(k)).text();
    },
    testParse(k, t) {
      const e = checkExtension(t.src, ".atlas"), i = typeof k == "string";
      return Promise.resolve(e && i);
    },
    unload(k) {
      k.dispose();
    },
    async parse(k, t, e) {
      const i = t.data || {};
      let s = path.dirname(t.src);
      s && s.lastIndexOf("/") !== s.length - 1 && (s += "/");
      const n = new Js(k);
      if (i.images instanceof TextureSource || typeof i.images == "string") {
        const a = i.images;
        i.images = {}, i.images[n.pages[0].name] = a;
      }
      const o = [];
      for (const a of n.pages) {
        const h = a.name, r = i != null && i.images ? i.images[h] : void 0;
        if (r instanceof TextureSource)
          a.setTexture(ce.from(r));
        else {
          const c = {
            src: r ?? path.normalize([...s.split(path.sep), h].join(path.sep)),
            data: {
              ...i.imageMetadata,
              alphaMode: a.pma ? "premultiplied-alpha" : "premultiply-alpha-on-upload"
            }
          }, f = e.load(c).then((d) => {
            a.setTexture(ce.from(d.source));
          });
          o.push(f);
        }
      }
      return await Promise.all(o), n;
    }
  }
};
function Ui(k) {
  return Object.prototype.hasOwnProperty.call(k, "bones");
}
function Gi(k) {
  return k instanceof Uint8Array;
}
var $i = {
  extension: ExtensionType.Asset,
  loader: {
    extension: {
      type: ExtensionType.LoadParser,
      priority: LoaderParserPriority.Normal,
      name: "spineSkeletonLoader"
    },
    test(k) {
      return checkExtension(k, ".skel");
    },
    async load(k) {
      const t = await DOMAdapter.get().fetch(k);
      return new Uint8Array(await t.arrayBuffer());
    },
    testParse(k, t) {
      const e = checkExtension(t.src, ".json") && Ui(k), i = checkExtension(t.src, ".skel") && Gi(k);
      return Promise.resolve(e || i);
    }
  }
};
var Hi = class {
  constructor() {
    this.indexOffset = 0, this.attributeOffset = 0, this.batcherName = "darkTint", this.topology = "triangle-list", this.packAsQuad = false;
  }
  get color() {
    const t = this.data.color, e = this.renderable.groupColor, i = this.renderable.groupAlpha;
    let s;
    const n = t.a * i * 255;
    if (e !== 16777215) {
      const o = e >> 16 & 255, a = e >> 8 & 255, h = e & 255, r = t.r * h, l = t.g * a, c = t.b * o;
      s = n << 24 | c << 16 | l << 8 | r;
    } else
      s = n << 24 | t.b * 255 << 16 | t.g * 255 << 8 | t.r * 255;
    return s;
  }
  get darkColor() {
    const t = this.data.darkColor;
    return t.b * 255 << 16 | t.g * 255 << 8 | t.r * 255;
  }
  get groupTransform() {
    return this.renderable.groupTransform;
  }
  setData(t, e, i, s) {
    if (this.renderable = t, this.transform = t.groupTransform, this.data = e, e.clipped) {
      const n = e.clippedData;
      this.indexSize = n.indicesCount, this.attributeSize = n.vertexCount, this.positions = n.vertices, this.indices = n.indices, this.uvs = n.uvs;
    } else
      this.indexSize = e.indices.length, this.attributeSize = e.vertices.length / 2, this.positions = e.vertices, this.indices = e.indices, this.uvs = e.uvs;
    this.texture = e.texture, this.roundPixels = s, this.blendMode = i, this.batcherName = e.darkTint ? "darkTint" : "default";
  }
};
var ji = {
  0: "normal",
  1: "add",
  2: "multiply",
  3: "screen"
};
var Ee = class Ee2 {
  constructor(t) {
    this.gpuSpineData = {}, this._destroyRenderableBound = this.destroyRenderable.bind(this), this.renderer = t;
  }
  validateRenderable(t) {
    if (t._validateAndTransformAttachments(), t.spineAttachmentsDirty)
      return true;
    if (t.spineTexturesDirty) {
      const e = t.skeleton.drawOrder, i = this.gpuSpineData[t.uid];
      for (let s = 0, n = e.length; s < n; s++) {
        const o = e[s], a = o.getAttachment();
        if (a instanceof bt || a instanceof wt) {
          const h = t._getCachedData(o, a), r = i.slotBatches[h.id], l = h.texture;
          if (l !== r.texture && !r._batcher.checkAndUpdateTexture(r, l))
            return true;
        }
      }
    }
    return false;
  }
  addRenderable(t, e) {
    var a, h;
    const i = this._getSpineData(t), s = this.renderer.renderPipes.batch, n = t.skeleton.drawOrder, o = this.renderer._roundPixels | t._roundPixels;
    t._validateAndTransformAttachments();
    for (let r = 0, l = n.length; r < l; r++) {
      const c = n[r], f = c.getAttachment(), d = ji[c.data.blendMode];
      if (f instanceof bt || f instanceof wt) {
        const g = t._getCachedData(c, f), b = (a = i.slotBatches)[h = g.id] || (a[h] = new Hi());
        b.setData(
          t,
          g,
          d,
          o
        ), g.skipRender || s.addToBatch(b, e);
      }
      const m = t._slotsObject[c.data.name];
      if (m) {
        const g = m.container;
        g.includeInBuild = true, collectAllRenderables(g, e, this.renderer), g.includeInBuild = false;
      }
    }
  }
  updateRenderable(t) {
    var s;
    const e = this.gpuSpineData[t.uid];
    t._validateAndTransformAttachments();
    const i = t.skeleton.drawOrder;
    for (let n = 0, o = i.length; n < o; n++) {
      const a = i[n], h = a.getAttachment();
      if ((h instanceof bt || h instanceof wt) && !t._getCachedData(a, h).skipRender) {
        const l = e.slotBatches[t._getCachedData(a, h).id];
        (s = l._batcher) == null || s.updateElement(l);
      }
    }
  }
  destroyRenderable(t) {
    this.gpuSpineData[t.uid] = null, t.off("destroyed", this._destroyRenderableBound);
  }
  destroy() {
    this.gpuSpineData = null, this.renderer = null;
  }
  _getSpineData(t) {
    return this.gpuSpineData[t.uid] || this._initMeshData(t);
  }
  _initMeshData(t) {
    return this.gpuSpineData[t.uid] = { slotBatches: {} }, t.on("destroyed", this._destroyRenderableBound), this.gpuSpineData[t.uid];
  }
};
Ee.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "spine"
};
var de = Ee;
extensions.add(de);
var ee = new ie();
Gt.yDown = true;
var Dt = new he();
var Ge = new jt(() => new Graphics());
var fe = class _fe extends ViewContainer {
  constructor(t) {
    t instanceof oe && (t = {
      skeletonData: t
    }), super(), this.batched = true, this.buildId = 0, this.renderPipeId = "spine", this._didSpineUpdate = false, this.beforeUpdateWorldTransforms = () => {
    }, this.afterUpdateWorldTransforms = () => {
    }, this.darkTint = false, this._debug = void 0, this._slotsObject = /* @__PURE__ */ Object.create(null), this.clippingSlotToPixiMasks = /* @__PURE__ */ Object.create(null), this.spineAttachmentsDirty = true, this.spineTexturesDirty = true, this._lastAttachments = [], this._stateChanged = true, this.attachmentCacheData = [], this._autoUpdate = true, this.hasNeverUpdated = true;
    const e = t instanceof oe ? t : t.skeletonData;
    this.skeleton = new Gt(e), this.state = new Ie(new _s(e)), this.autoUpdate = (t == null ? void 0 : t.autoUpdate) ?? true, this.darkTint = (t == null ? void 0 : t.darkTint) === void 0 ? this.skeleton.slots.some((s) => !!s.data.darkColor) : t == null ? void 0 : t.darkTint;
    const i = this.skeleton.slots;
    for (let s = 0; s < i.length; s++)
      this.attachmentCacheData[s] = /* @__PURE__ */ Object.create(null);
  }
  getSlotFromRef(t) {
    let e;
    if (typeof t == "number" ? e = this.skeleton.slots[t] : typeof t == "string" ? e = this.skeleton.findSlot(t) : e = t, !e) throw new Error(`No slot found with the given slot reference: ${t}`);
    return e;
  }
  get debug() {
    return this._debug;
  }
  /** Pass a {@link SpineDebugRenderer} or create your own {@link ISpineDebugRenderer} to render bones, meshes, ...
   * @example spineGO.debug = new SpineDebugRenderer();
   */
  set debug(t) {
    this._debug && this._debug.unregisterSpine(this), t && t.registerSpine(this), this._debug = t;
  }
  get autoUpdate() {
    return this._autoUpdate;
  }
  /** When `true`, the Spine AnimationState and the Skeleton will be automatically updated using the {@link Ticker.shared} instance. */
  set autoUpdate(t) {
    t ? Ticker.shared.add(this.internalUpdate, this) : Ticker.shared.remove(this.internalUpdate, this), this._autoUpdate = t;
  }
  /** If {@link Spine.autoUpdate} is `false`, this method allows to update the AnimationState and the Skeleton with the given delta. */
  update(t) {
    this.internalUpdate(0, t);
  }
  internalUpdate(t, e) {
    this._updateAndApplyState(e ?? Ticker.shared.deltaMS / 1e3);
  }
  get bounds() {
    return this._boundsDirty && this.updateBounds(), this._bounds;
  }
  /**
   * Set the position of the bone given in input through a {@link IPointData}.
   * @param bone: the bone name or the bone instance to set the position
   * @param outPos: the new position of the bone.
   * @throws {Error}: if the given bone is not found in the skeleton, an error is thrown
   */
  setBonePosition(t, e) {
    const i = t;
    if (typeof t == "string" && (t = this.skeleton.findBone(t)), !t) throw Error(`Cant set bone position, bone ${String(i)} not found`);
    if (ee.set(e.x, e.y), t.parent) {
      const s = t.parent.worldToLocal(ee);
      t.x = s.x, t.y = -s.y;
    } else
      t.x = ee.x, t.y = ee.y;
  }
  /**
   * Return the position of the bone given in input into an {@link IPointData}.
   * @param bone: the bone name or the bone instance to get the position from
   * @param outPos: an optional {@link IPointData} to use to return the bone position, rathern than instantiating a new object.
   * @returns {IPointData | undefined}: the position of the bone, or undefined if no matching bone is found in the skeleton
   */
  getBonePosition(t, e) {
    const i = t;
    return typeof t == "string" && (t = this.skeleton.findBone(t)), t ? (e || (e = { x: 0, y: 0 }), e.x = t.worldX, e.y = t.worldY, e) : (console.error(`Cant set bone position! Bone ${String(i)} not found`), e);
  }
  /**
   * Advance the state and skeleton by the given time, then update slot objects too.
   * The container transform is not updated.
   *
   * @param time the time at which to set the state
   */
  _updateAndApplyState(t) {
    this.hasNeverUpdated = false, this.state.update(t), this.skeleton.update(t);
    const { skeleton: e } = this;
    this.state.apply(e), this.beforeUpdateWorldTransforms(this), e.updateWorldTransform(Ft.update), this.afterUpdateWorldTransforms(this), this.updateSlotObjects(), this._stateChanged = true, this._boundsDirty = true, this.onViewUpdate();
  }
  /**
   * - validates the attachments - to flag if the attachments have changed this state
   * - transforms the attachments - to update the vertices of the attachments based on the new positions
   * @internal
   */
  _validateAndTransformAttachments() {
    this._stateChanged && (this._stateChanged = false, this.validateAttachments(), this.transformAttachments());
  }
  validateAttachments() {
    const t = this.skeleton.drawOrder, e = this._lastAttachments;
    let i = 0, s = false;
    for (let n = 0; n < t.length; n++) {
      const a = t[n].getAttachment();
      a && (a !== e[i] && (s = true, e[i] = a), i++);
    }
    i !== e.length && (s = true, e.length = i), this.spineAttachmentsDirty = s;
  }
  updateAndSetPixiMask(t, e) {
    var o, a;
    const i = t.attachment;
    if (i && i instanceof Pt) {
      const h = (o = this.clippingSlotToPixiMasks)[a = t.data.name] || (o[a] = { slot: t, vertices: new Array() });
      h.maskComputed = false, this.currentClippingSlot = this.clippingSlotToPixiMasks[t.data.name];
      return;
    }
    let s = this.currentClippingSlot, n = this._slotsObject[t.data.name];
    if (s && n) {
      let h = s.slot, r = h.attachment, l = s.mask;
      if (l || (l = Ge.obtain(), s.mask = l, this.addChild(l)), !s.maskComputed) {
        s.maskComputed = true;
        const c = r.worldVerticesLength, f = s.vertices;
        r.computeWorldVertices(h, 0, c, f, 0, 2), l.clear().poly(f).stroke({ width: 0 }).fill({ alpha: 0.25 });
      }
      n.container.mask = l;
    } else n != null && n.container.mask && (n.container.mask = null);
    if (s && s.slot.attachment.endSlot == t.data && (this.currentClippingSlot = void 0), e)
      for (const h in this.clippingSlotToPixiMasks) {
        const r = this.clippingSlotToPixiMasks[h];
        (!(r.slot.attachment instanceof Pt) || !r.maskComputed) && r.mask && (this.removeChild(r.mask), Ge.free(r.mask), r.mask = void 0);
      }
  }
  transformAttachments() {
    var e;
    const t = this.skeleton.drawOrder;
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      this.updateAndSetPixiMask(s, i === t.length - 1);
      const n = s.getAttachment();
      if (n) {
        if (n instanceof wt || n instanceof bt) {
          const o = this._getCachedData(s, n);
          n instanceof bt ? n.computeWorldVertices(s, o.vertices, 0, 2) : n.computeWorldVertices(s, 0, n.worldVerticesLength, o.vertices, 0, 2), o.uvs.length < n.uvs.length && (o.uvs = new Float32Array(n.uvs.length)), fastCopy(n.uvs.buffer, o.uvs.buffer);
          const h = s.bone.skeleton.color, r = s.color, l = n.color;
          o.color.set(
            h.r * r.r * l.r,
            h.g * r.g * l.g,
            h.b * r.b * l.b,
            h.a * r.a * l.a
          ), s.darkColor && o.darkColor.setFromColor(s.darkColor), o.skipRender = o.clipped = false;
          const c = ((e = n.region) == null ? void 0 : e.texture.texture) || Texture.EMPTY;
          o.texture !== c && (o.texture = c, this.spineTexturesDirty = true), Dt.isClipping() && this.updateClippingData(o);
        } else if (n instanceof Pt) {
          Dt.clipStart(s, n);
          continue;
        }
      }
      Dt.clipEndWithSlot(s);
    }
    Dt.clipEnd();
  }
  updateClippingData(t) {
    t.clipped = true, Dt.clipTrianglesUnpacked(t.vertices, t.indices, t.indices.length, t.uvs);
    const { clippedVertices: e, clippedUVs: i, clippedTriangles: s } = Dt, n = e.length / 2, o = s.length;
    t.clippedData || (t.clippedData = {
      vertices: new Float32Array(n * 2),
      uvs: new Float32Array(n * 2),
      vertexCount: n,
      indices: new Uint16Array(o),
      indicesCount: o
    }, this.spineAttachmentsDirty = true);
    const a = t.clippedData, h = a.vertexCount !== n || o !== a.indicesCount;
    t.skipRender = n === 0, h && (this.spineAttachmentsDirty = true, a.vertexCount < n && (a.vertices = new Float32Array(n * 2), a.uvs = new Float32Array(n * 2)), a.indices.length < o && (a.indices = new Uint16Array(o)));
    const { vertices: r, uvs: l, indices: c } = a;
    for (let f = 0; f < n; f++)
      r[f * 2] = e[f * 2], r[f * 2 + 1] = e[f * 2 + 1], l[f * 2] = i[f * 2], l[f * 2 + 1] = i[f * 2 + 1];
    a.vertexCount = n;
    for (let f = 0; f < o; f++)
      c[f] !== s[f] && (this.spineAttachmentsDirty = true, c[f] = s[f]);
    a.indicesCount = o;
  }
  /**
   * ensure that attached containers map correctly to their slots
   * along with their position, rotation, scale, and visibility.
   */
  updateSlotObjects() {
    for (const t in this._slotsObject) {
      const e = this._slotsObject[t];
      e && this.updateSlotObject(e);
    }
  }
  updateSlotObject(t) {
    const { slot: e, container: i } = t;
    if (i.visible = this.skeleton.drawOrder.includes(e), i.visible) {
      const s = e.bone;
      i.position.set(s.worldX, s.worldY), i.scale.x = s.getWorldScaleX(), i.scale.y = s.getWorldScaleY(), i.rotation = s.getWorldRotationX() * DEG_TO_RAD, i.alpha = this.skeleton.color.a * e.color.a;
    }
  }
  /** @internal */
  _getCachedData(t, e) {
    return this.attachmentCacheData[t.data.index][e.name] || this.initCachedData(t, e);
  }
  initCachedData(t, e) {
    var s, n;
    let i;
    return e instanceof bt ? (i = new Float32Array(8), this.attachmentCacheData[t.data.index][e.name] = {
      id: `${t.data.index}-${e.name}`,
      vertices: i,
      clipped: false,
      indices: [0, 1, 2, 0, 2, 3],
      uvs: new Float32Array(e.uvs.length),
      color: new q(1, 1, 1, 1),
      darkColor: new q(0, 0, 0, 0),
      darkTint: this.darkTint,
      skipRender: false,
      texture: (s = e.region) == null ? void 0 : s.texture.texture
    }) : (i = new Float32Array(e.worldVerticesLength), this.attachmentCacheData[t.data.index][e.name] = {
      id: `${t.data.index}-${e.name}`,
      vertices: i,
      clipped: false,
      indices: e.triangles,
      uvs: new Float32Array(e.uvs.length),
      color: new q(1, 1, 1, 1),
      darkColor: new q(0, 0, 0, 0),
      darkTint: this.darkTint,
      skipRender: false,
      texture: (n = e.region) == null ? void 0 : n.texture.texture
    }), this.attachmentCacheData[t.data.index][e.name];
  }
  onViewUpdate() {
    var e;
    if (this._didViewChangeTick++, this._boundsDirty = true, this.didViewUpdate) return;
    this.didViewUpdate = true;
    const t = this.renderGroup || this.parentRenderGroup;
    t && t.onChildViewUpdate(this), (e = this.debug) == null || e.renderDebug(this);
  }
  /**
   * Attaches a PixiJS container to a specified slot. This will map the world transform of the slots bone
   * to the attached container. A container can only be attached to one slot at a time.
   *
   * @param container - The container to attach to the slot
   * @param slotRef - The slot id or  slot to attach to
   */
  addSlotObject(t, e) {
    t = this.getSlotFromRef(t);
    for (const s in this._slotsObject) {
      const n = this._slotsObject[s];
      n && n.container === e && n.slot && this.removeSlotObject(n.slot);
    }
    this.removeSlotObject(t), e.includeInBuild = false, this.addChild(e);
    const i = { container: e, slot: t };
    this._slotsObject[t.data.name] = i, this.updateSlotObject(i);
  }
  /**
   * Removes a PixiJS container from the slot it is attached to.
   *
   * @param container - The container to detach from the slot
   * @param slotOrContainer - The container, slot id or slot to detach from
   */
  removeSlotObject(t) {
    var i, s;
    let e;
    if (t instanceof Container) {
      for (const n in this._slotsObject)
        if (((i = this._slotsObject[n]) == null ? void 0 : i.container) === t) {
          this._slotsObject[n] = null, e = t;
          break;
        }
    } else {
      const n = this.getSlotFromRef(t);
      e = (s = this._slotsObject[n.data.name]) == null ? void 0 : s.container, this._slotsObject[n.data.name] = null;
    }
    e && (this.removeChild(e), e.includeInBuild = true);
  }
  /**
   * Returns a container attached to a slot, or undefined if no container is attached.
   *
   * @param slotRef - The slot id or slot to get the attachment from
   * @returns - The container attached to the slot
   */
  getSlotObject(t) {
    var e;
    return t = this.getSlotFromRef(t), (e = this._slotsObject[t.data.name]) == null ? void 0 : e.container;
  }
  updateBounds() {
    this._boundsDirty = false, this.skeletonBounds || (this.skeletonBounds = new Ni());
    const t = this.skeletonBounds;
    if (t.update(this.skeleton, true), t.minX === 1 / 0) {
      this.hasNeverUpdated && (this._updateAndApplyState(0), this._boundsDirty = false), this._validateAndTransformAttachments();
      const e = this.skeleton.drawOrder, i = this._bounds;
      i.clear();
      for (let s = 0; s < e.length; s++) {
        const n = e[s], o = n.getAttachment();
        if (o && (o instanceof bt || o instanceof wt)) {
          const a = this._getCachedData(n, o);
          i.addVertexData(a.vertices, 0, a.vertices.length);
        }
      }
    } else
      this._bounds.minX = t.minX, this._bounds.minY = t.minY, this._bounds.maxX = t.maxX, this._bounds.maxY = t.maxY;
  }
  /** @internal */
  addBounds(t) {
    t.addBounds(this.bounds);
  }
  /**
   * Destroys this sprite renderable and optionally its texture.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the renderable as well
   * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the renderable as well
   */
  destroy(t = false) {
    super.destroy(t), Ticker.shared.remove(this.internalUpdate, this), this.state.clearListeners(), this.debug = void 0, this.skeleton = null, this.state = null, this._slotsObject = null, this._lastAttachments.length = 0, this.attachmentCacheData = null;
  }
  /** Converts a point from the skeleton coordinate system to the Pixi world coordinate system. */
  skeletonToPixiWorldCoordinates(t) {
    this.worldTransform.apply(t, t);
  }
  /** Converts a point from the Pixi world coordinate system to the skeleton coordinate system. */
  pixiWorldCoordinatesToSkeleton(t) {
    this.worldTransform.applyInverse(t, t);
  }
  /** Converts a point from the Pixi world coordinate system to the bone's local coordinate system. */
  pixiWorldCoordinatesToBone(t, e) {
    this.pixiWorldCoordinatesToSkeleton(t), e.parent ? e.parent.worldToLocal(t) : e.worldToLocal(t);
  }
  /**
   * Use this method to instantiate a Spine game object.
   * Before instantiating a Spine game object, the skeleton (`.skel` or `.json`) and the atlas text files must be loaded into the Assets. For example:
   * ```
   * PIXI.Assets.add("sackData", "./assets/sack-pro.skel");
   * PIXI.Assets.add("sackAtlas", "./assets/sack-pma.atlas");
   * await PIXI.Assets.load(["sackData", "sackAtlas"]);
   * ```
   * Once a Spine game object is created, its skeleton data is cached into {@link Cache} using the key:
   * `${skeletonAssetName}-${atlasAssetName}-${options?.scale ?? 1}`
   *
   * @param options - Options to configure the Spine game object. See {@link SpineFromOptions}
   * @returns {Spine} The Spine game object instantiated
   */
  static from({ skeleton: t, atlas: e, scale: i = 1, darkTint: s, autoUpdate: n = true }) {
    const o = `${t}-${e}-${i}`;
    if (Cache.has(o))
      return new _fe(Cache.get(o));
    const a = Assets.get(t), h = Assets.get(e), r = new ei(h), l = a instanceof Uint8Array ? new ai(r) : new qi(r);
    l.scale = i;
    const c = l.readSkeletonData(a);
    return Cache.set(o, c), new _fe({
      skeletonData: c,
      darkTint: s,
      autoUpdate: n
    });
  }
};
var Zi = class extends O {
  constructor() {
    super(...arguments), this.id = "SpinePlugin";
  }
  async initialize() {
    extensions.add(zi), extensions.add($i), extensions.add(de), window.Spine = fe;
  }
};
export {
  Zi as SpinePlugin
};
//# sourceMappingURL=SpinePlugin-BmtOdimW-WL2DPB5Z.js.map
