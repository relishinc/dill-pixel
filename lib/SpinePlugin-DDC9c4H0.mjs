import { Plugin as ys } from "./dill-pixel.mjs";
import { Texture as ge, ExtensionType as Yt, LoaderParserPriority as Oe, checkExtension as Lt, DOMAdapter as qe, path as qt, TextureSource as Fe, BigPool as oe, Container as Ss, Bounds as vs, Ticker as zt, Cache as ce, Assets as Ee, extensions as he } from "pixi.js";
class ze {
  constructor() {
    this.entries = {}, this.size = 0;
  }
  add(t) {
    const n = this.entries[t];
    return this.entries[t] = !0, n ? !1 : (this.size++, !0);
  }
  addAll(t) {
    const n = this.size;
    for (let e = 0, r = t.length; e < r; e++)
      this.add(t[e]);
    return n != this.size;
  }
  contains(t) {
    return this.entries[t];
  }
  clear() {
    this.entries = {}, this.size = 0;
  }
}
class V {
  constructor(t = 0, n = 0, e = 0, r = 0) {
    this.r = t, this.g = n, this.b = e, this.a = r;
  }
  static rgba8888ToColor(t, n) {
    t.r = ((n & 4278190080) >>> 24) / 255, t.g = ((n & 16711680) >>> 16) / 255, t.b = ((n & 65280) >>> 8) / 255, t.a = (n & 255) / 255;
  }
  static rgb888ToColor(t, n) {
    t.r = ((n & 16711680) >>> 16) / 255, t.g = ((n & 65280) >>> 8) / 255, t.b = (n & 255) / 255;
  }
  static fromString(t) {
    return new V().setFromString(t);
  }
  set(t, n, e, r) {
    return this.r = t, this.g = n, this.b = e, this.a = r, this.clamp();
  }
  setFromColor(t) {
    return this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this;
  }
  setFromString(t) {
    return t = t.charAt(0) == "#" ? t.substr(1) : t, this.r = parseInt(t.substr(0, 2), 16) / 255, this.g = parseInt(t.substr(2, 2), 16) / 255, this.b = parseInt(t.substr(4, 2), 16) / 255, this.a = t.length != 8 ? 1 : parseInt(t.substr(6, 2), 16) / 255, this;
  }
  add(t, n, e, r) {
    return this.r += t, this.g += n, this.b += e, this.a += r, this.clamp();
  }
  clamp() {
    return this.r < 0 ? this.r = 0 : this.r > 1 && (this.r = 1), this.g < 0 ? this.g = 0 : this.g > 1 && (this.g = 1), this.b < 0 ? this.b = 0 : this.b > 1 && (this.b = 1), this.a < 0 ? this.a = 0 : this.a > 1 && (this.a = 1), this;
  }
}
V.WHITE = new V(1, 1, 1, 1);
V.RED = new V(1, 0, 0, 1);
V.GREEN = new V(0, 1, 0, 1);
V.BLUE = new V(0, 0, 1, 1);
V.MAGENTA = new V(1, 0, 1, 1);
class M {
  static clamp(t, n, e) {
    return t < n ? n : t > e ? e : t;
  }
  static cosDeg(t) {
    return Math.cos(t * M.degRad);
  }
  static sinDeg(t) {
    return Math.sin(t * M.degRad);
  }
  static signum(t) {
    return t > 0 ? 1 : t < 0 ? -1 : 0;
  }
  static toInt(t) {
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  static cbrt(t) {
    const n = Math.pow(Math.abs(t), 0.3333333333333333);
    return t < 0 ? -n : n;
  }
  static randomTriangular(t, n) {
    return M.randomTriangularWith(t, n, (t + n) * 0.5);
  }
  static randomTriangularWith(t, n, e) {
    const r = Math.random(), i = n - t;
    return r <= (e - t) / i ? t + Math.sqrt(r * i * (e - t)) : n - Math.sqrt((1 - r) * i * (n - e));
  }
  static isPowerOfTwo(t) {
    return t && (t & t - 1) === 0;
  }
}
M.PI = Math.PI;
M.PI2 = Math.PI * 2;
M.radiansToDegrees = 180 / M.PI;
M.radDeg = M.radiansToDegrees;
M.degreesToRadians = M.PI / 180;
M.degRad = M.degreesToRadians;
const St = class St {
  static arrayCopy(t, n, e, r, i) {
    for (let l = n, c = r; l < n + i; l++, c++)
      e[c] = t[l];
  }
  static arrayFill(t, n, e, r) {
    for (let i = n; i < e; i++)
      t[i] = r;
  }
  static setArraySize(t, n, e = 0) {
    const r = t.length;
    if (r == n)
      return t;
    if (t.length = n, r < n)
      for (let i = r; i < n; i++)
        t[i] = e;
    return t;
  }
  static ensureArrayCapacity(t, n, e = 0) {
    return t.length >= n ? t : St.setArraySize(t, n, e);
  }
  static newArray(t, n) {
    const e = new Array(t);
    for (let r = 0; r < t; r++)
      e[r] = n;
    return e;
  }
  static newFloatArray(t) {
    if (St.SUPPORTS_TYPED_ARRAYS)
      return new Float32Array(t);
    {
      const n = new Array(t);
      for (let e = 0; e < n.length; e++)
        n[e] = 0;
      return n;
    }
  }
  static newShortArray(t) {
    if (St.SUPPORTS_TYPED_ARRAYS)
      return new Int16Array(t);
    {
      const n = new Array(t);
      for (let e = 0; e < n.length; e++)
        n[e] = 0;
      return n;
    }
  }
  static toFloatArray(t) {
    return St.SUPPORTS_TYPED_ARRAYS ? new Float32Array(t) : t;
  }
  static toSinglePrecision(t) {
    return St.SUPPORTS_TYPED_ARRAYS ? Math.fround(t) : t;
  }
  // This function is used to fix WebKit 602 specific issue described at http://esotericsoftware.com/forum/iOS-10-disappearing-graphics-10109
  static webkit602BugfixHelper(t, n) {
  }
  static contains(t, n, e = !0) {
    for (let r = 0; r < t.length; r++)
      if (t[r] == n)
        return !0;
    return !1;
  }
  static enumValue(t, n) {
    return t[n[0].toUpperCase() + n.slice(1)];
  }
};
St.SUPPORTS_TYPED_ARRAYS = typeof Float32Array < "u";
let P = St;
class $t {
  constructor(t) {
    this.items = new Array(), this.instantiator = t;
  }
  obtain() {
    return this.items.length > 0 ? this.items.pop() : this.instantiator();
  }
  free(t) {
    t.reset && t.reset(), this.items.push(t);
  }
  freeAll(t) {
    for (let n = 0; n < t.length; n++)
      this.free(t[n]);
  }
  clear() {
    this.items.length = 0;
  }
}
class Ht {
  constructor(t = 0, n = 0) {
    this.x = t, this.y = n;
  }
  set(t, n) {
    return this.x = t, this.y = n, this;
  }
  length() {
    const t = this.x, n = this.y;
    return Math.sqrt(t * t + n * n);
  }
  normalize() {
    const t = this.length();
    return t != 0 && (this.x /= t, this.y /= t), this;
  }
}
class We {
  constructor(t) {
    if (!t)
      throw new Error("name cannot be null.");
    this.name = t;
  }
}
const te = class te extends We {
  constructor(t) {
    super(t), this.id = te.nextID++, this.bones = null, this.vertices = [], this.worldVerticesLength = 0, this.timelineAttachment = this;
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
  computeWorldVertices(t, n, e, r, i, l) {
    e = i + (e >> 1) * l;
    const c = t.bone.skeleton, s = t.deform;
    let o = this.vertices;
    const a = this.bones;
    if (!a) {
      s.length > 0 && (o = s);
      const u = t.bone, m = u.worldX, x = u.worldY, y = u.a, b = u.b, g = u.c, p = u.d;
      for (let w = n, S = i; S < e; w += 2, S += l) {
        const k = o[w], A = o[w + 1];
        r[S] = k * y + A * b + m, r[S + 1] = k * g + A * p + x;
      }
      return;
    }
    let h = 0, d = 0;
    for (let u = 0; u < n; u += 2) {
      const m = a[h];
      h += m + 1, d += m;
    }
    const f = c.bones;
    if (s.length == 0)
      for (let u = i, m = d * 3; u < e; u += l) {
        let x = 0, y = 0, b = a[h++];
        for (b += h; h < b; h++, m += 3) {
          const g = f[a[h]], p = o[m], w = o[m + 1], S = o[m + 2];
          x += (p * g.a + w * g.b + g.worldX) * S, y += (p * g.c + w * g.d + g.worldY) * S;
        }
        r[u] = x, r[u + 1] = y;
      }
    else {
      const u = s;
      for (let m = i, x = d * 3, y = d << 1; m < e; m += l) {
        let b = 0, g = 0, p = a[h++];
        for (p += h; h < p; h++, x += 3, y += 2) {
          const w = f[a[h]], S = o[x] + u[y], k = o[x + 1] + u[y + 1], A = o[x + 2];
          b += (S * w.a + k * w.b + w.worldX) * A, g += (S * w.c + k * w.d + w.worldY) * A;
        }
        r[m] = b, r[m + 1] = g;
      }
    }
  }
  /** Does not copy id (generated) or name (set on construction). **/
  copyTo(t) {
    this.bones ? (t.bones = new Array(this.bones.length), P.arrayCopy(this.bones, 0, t.bones, 0, this.bones.length)) : t.bones = null, this.vertices && (t.vertices = P.newFloatArray(this.vertices.length), P.arrayCopy(this.vertices, 0, t.vertices, 0, this.vertices.length)), t.worldVerticesLength = this.worldVerticesLength, t.timelineAttachment = this.timelineAttachment;
  }
};
te.nextID = 0;
let ft = te;
const Et = class Et {
  constructor(t) {
    this.id = Et.nextID(), this.start = 0, this.digits = 0, this.setupIndex = 0, this.regions = new Array(t);
  }
  static nextID() {
    return Et._nextID++;
  }
  copy() {
    const t = new Et(this.regions.length);
    return P.arrayCopy(this.regions, 0, t.regions, 0, this.regions.length), t.start = this.start, t.digits = this.digits, t.setupIndex = this.setupIndex, t;
  }
  apply(t, n) {
    let e = t.sequenceIndex;
    e == -1 && (e = this.setupIndex), e >= this.regions.length && (e = this.regions.length - 1);
    const r = this.regions[e];
    n.region != r && (n.region = r, n.updateRegion());
  }
  getPath(t, n) {
    let e = t;
    const r = (this.start + n).toString();
    for (let i = this.digits - r.length; i > 0; i--)
      e += "0";
    return e += r, e;
  }
};
Et._nextID = 0;
let Gt = Et;
var bt = /* @__PURE__ */ ((v) => (v[v.hold = 0] = "hold", v[v.once = 1] = "once", v[v.loop = 2] = "loop", v[v.pingpong = 3] = "pingpong", v[v.onceReverse = 4] = "onceReverse", v[v.loopReverse = 5] = "loopReverse", v[v.pingpongReverse = 6] = "pingpongReverse", v))(bt || {});
const $e = [
  0,
  1,
  2,
  3,
  4,
  5,
  6
  /* pingpongReverse */
];
class Se {
  constructor(t, n, e) {
    if (this.timelines = [], this.timelineIds = new ze(), !t)
      throw new Error("name cannot be null.");
    this.name = t, this.setTimelines(n), this.duration = e;
  }
  setTimelines(t) {
    if (!t)
      throw new Error("timelines cannot be null.");
    this.timelines = t, this.timelineIds.clear();
    for (let n = 0; n < t.length; n++)
      this.timelineIds.addAll(t[n].getPropertyIds());
  }
  hasTimeline(t) {
    for (let n = 0; n < t.length; n++)
      if (this.timelineIds.contains(t[n]))
        return !0;
    return !1;
  }
  /** Applies all the animation's timelines to the specified skeleton.
   *
   * See Timeline {@link Timeline#apply(Skeleton, float, float, Array, float, MixBlend, MixDirection)}.
   * @param loop If true, the animation repeats after {@link #getDuration()}.
   * @param events May be null to ignore fired events. */
  apply(t, n, e, r, i, l, c, s) {
    if (!t)
      throw new Error("skeleton cannot be null.");
    r && this.duration != 0 && (e %= this.duration, n > 0 && (n %= this.duration));
    const o = this.timelines;
    for (let a = 0, h = o.length; a < h; a++)
      o[a].apply(t, n, e, i, l, c, s);
  }
}
var Q = /* @__PURE__ */ ((v) => (v[v.setup = 0] = "setup", v[v.first = 1] = "first", v[v.replace = 2] = "replace", v[v.add = 3] = "add", v))(Q || {}), At = /* @__PURE__ */ ((v) => (v[v.mixIn = 0] = "mixIn", v[v.mixOut = 1] = "mixOut", v))(At || {});
const $ = {
  rotate: 0,
  x: 1,
  y: 2,
  scaleX: 3,
  scaleY: 4,
  shearX: 5,
  shearY: 6,
  rgb: 7,
  alpha: 8,
  rgb2: 9,
  attachment: 10,
  deform: 11,
  event: 12,
  drawOrder: 13,
  ikConstraint: 14,
  transformConstraint: 15,
  pathConstraintPosition: 16,
  pathConstraintSpacing: 17,
  pathConstraintMix: 18,
  sequence: 19
};
class K {
  static search1(t, n) {
    const e = t.length;
    for (let r = 1; r < e; r++)
      if (t[r] > n)
        return r - 1;
    return e - 1;
  }
  static search(t, n, e) {
    const r = t.length;
    for (let i = e; i < r; i += e)
      if (t[i] > n)
        return i - e;
    return r - e;
  }
  constructor(t, n) {
    this.propertyIds = n, this.frames = P.newFloatArray(t * this.getFrameEntries());
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
}
class gt extends K {
  // type, x, y, ...
  constructor(t, n, e) {
    super(t, e), this.curves = P.newFloatArray(
      t + n * 18
      /*BEZIER_SIZE*/
    ), this.curves[t - 1] = 1;
  }
  /** Sets the specified key frame to linear interpolation. */
  setLinear(t) {
    this.curves[t] = 0;
  }
  /** Sets the specified key frame to stepped interpolation. */
  setStepped(t) {
    this.curves[t] = 1;
  }
  /** Shrinks the storage for Bezier curves, for use when <code>bezierCount</code> (specified in the constructor) was larger
   * than the actual number of Bezier curves. */
  shrink(t) {
    const n = this.getFrameCount() + t * 18;
    if (this.curves.length > n) {
      const e = P.newFloatArray(n);
      P.arrayCopy(this.curves, 0, e, 0, n), this.curves = e;
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
  setBezier(t, n, e, r, i, l, c, s, o, a, h) {
    const d = this.curves;
    let f = this.getFrameCount() + t * 18;
    e == 0 && (d[n] = 2 + f);
    const u = (r - l * 2 + s) * 0.03, m = (i - c * 2 + o) * 0.03, x = ((l - s) * 3 - r + a) * 6e-3, y = ((c - o) * 3 - i + h) * 6e-3;
    let b = u * 2 + x, g = m * 2 + y, p = (l - r) * 0.3 + u + x * 0.16666667, w = (c - i) * 0.3 + m + y * 0.16666667, S = r + p, k = i + w;
    for (let A = f + 18; f < A; f += 2)
      d[f] = S, d[f + 1] = k, p += b, w += g, b += x, g += y, S += p, k += w;
  }
  /** Returns the Bezier interpolated value for the specified time.
   * @param frameIndex The index into {@link #getFrames()} for the values of the frame before <code>time</code>.
   * @param valueOffset The offset from <code>frameIndex</code> to the value this curve is used for.
   * @param i The index of the Bezier segments. See {@link #getCurveType(int)}. */
  getBezierValue(t, n, e, r) {
    const i = this.curves;
    if (i[r] > t) {
      const o = this.frames[n], a = this.frames[n + e];
      return a + (t - o) / (i[r] - o) * (i[r + 1] - a);
    }
    const l = r + 18;
    for (r += 2; r < l; r += 2)
      if (i[r] >= t) {
        const o = i[r - 2], a = i[r - 1];
        return a + (t - o) / (i[r] - o) * (i[r + 1] - a);
      }
    n += this.getFrameEntries();
    const c = i[l - 2], s = i[l - 1];
    return s + (t - c) / (this.frames[n] - c) * (this.frames[n + e] - s);
  }
}
class xt extends gt {
  constructor(t, n, e) {
    super(t, n, [e]);
  }
  getFrameEntries() {
    return 2;
  }
  /** Sets the time and value for the specified frame.
   * @param frame Between 0 and <code>frameCount</code>, inclusive.
   * @param time The frame time in seconds. */
  setFrame(t, n, e) {
    t <<= 1, this.frames[t] = n, this.frames[
      t + 1
      /*VALUE*/
    ] = e;
  }
  /** Returns the interpolated value for the specified time. */
  getCurveValue(t) {
    const n = this.frames;
    let e = n.length - 2;
    for (let i = 2; i <= e; i += 2)
      if (n[i] > t) {
        e = i - 2;
        break;
      }
    const r = this.curves[e >> 1];
    switch (r) {
      case 0:
        const i = n[e], l = n[
          e + 1
          /*VALUE*/
        ];
        return l + (t - i) / (n[
          e + 2
          /*ENTRIES*/
        ] - i) * (n[
          e + 2 + 1
          /*VALUE*/
        ] - l);
      case 1:
        return n[
          e + 1
          /*VALUE*/
        ];
    }
    return this.getBezierValue(
      t,
      e,
      1,
      r - 2
      /*BEZIER*/
    );
  }
}
class ve extends gt {
  /** @param bezierCount The maximum number of Bezier curves. See {@link #shrink(int)}.
   * @param propertyIds Unique identifiers for the properties the timeline modifies. */
  constructor(t, n, e, r) {
    super(t, n, [e, r]);
  }
  getFrameEntries() {
    return 3;
  }
  /** Sets the time and values for the specified frame.
   * @param frame Between 0 and <code>frameCount</code>, inclusive.
   * @param time The frame time in seconds. */
  setFrame(t, n, e, r) {
    t *= 3, this.frames[t] = n, this.frames[
      t + 1
      /*VALUE1*/
    ] = e, this.frames[
      t + 2
      /*VALUE2*/
    ] = r;
  }
}
class jt extends xt {
  constructor(t, n, e) {
    super(t, n, $.rotate + "|" + e), this.boneIndex = 0, this.boneIndex = e;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.bones[this.boneIndex];
    if (!s.active)
      return;
    const o = this.frames;
    if (e < o[0]) {
      switch (l) {
        case 0:
          s.rotation = s.data.rotation;
          return;
        case 1:
          s.rotation += (s.data.rotation - s.rotation) * i;
      }
      return;
    }
    let a = this.getCurveValue(e);
    switch (l) {
      case 0:
        s.rotation = s.data.rotation + a * i;
        break;
      case 1:
      case 2:
        a += s.data.rotation - s.rotation;
      case 3:
        s.rotation += a * i;
    }
  }
}
class He extends ve {
  constructor(t, n, e) {
    super(t, n, $.x + "|" + e, $.y + "|" + e), this.boneIndex = 0, this.boneIndex = e;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.bones[this.boneIndex];
    if (!s.active)
      return;
    const o = this.frames;
    if (e < o[0]) {
      switch (l) {
        case 0:
          s.x = s.data.x, s.y = s.data.y;
          return;
        case 1:
          s.x += (s.data.x - s.x) * i, s.y += (s.data.y - s.y) * i;
      }
      return;
    }
    let a = 0, h = 0;
    const d = K.search(
      o,
      e,
      3
      /*ENTRIES*/
    ), f = this.curves[
      d / 3
      /*ENTRIES*/
    ];
    switch (f) {
      case 0:
        const u = o[d];
        a = o[
          d + 1
          /*VALUE1*/
        ], h = o[
          d + 2
          /*VALUE2*/
        ];
        const m = (e - u) / (o[
          d + 3
          /*ENTRIES*/
        ] - u);
        a += (o[
          d + 3 + 1
          /*VALUE1*/
        ] - a) * m, h += (o[
          d + 3 + 2
          /*VALUE2*/
        ] - h) * m;
        break;
      case 1:
        a = o[
          d + 1
          /*VALUE1*/
        ], h = o[
          d + 2
          /*VALUE2*/
        ];
        break;
      default:
        a = this.getBezierValue(
          e,
          d,
          1,
          f - 2
          /*BEZIER*/
        ), h = this.getBezierValue(
          e,
          d,
          2,
          f + 18 - 2
          /*BEZIER*/
        );
    }
    switch (l) {
      case 0:
        s.x = s.data.x + a * i, s.y = s.data.y + h * i;
        break;
      case 1:
      case 2:
        s.x += (s.data.x + a - s.x) * i, s.y += (s.data.y + h - s.y) * i;
        break;
      case 3:
        s.x += a * i, s.y += h * i;
    }
  }
}
class Ge extends xt {
  constructor(t, n, e) {
    super(t, n, $.x + "|" + e), this.boneIndex = 0, this.boneIndex = e;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.bones[this.boneIndex];
    if (!s.active)
      return;
    const o = this.frames;
    if (e < o[0]) {
      switch (l) {
        case 0:
          s.x = s.data.x;
          return;
        case 1:
          s.x += (s.data.x - s.x) * i;
      }
      return;
    }
    const a = this.getCurveValue(e);
    switch (l) {
      case 0:
        s.x = s.data.x + a * i;
        break;
      case 1:
      case 2:
        s.x += (s.data.x + a - s.x) * i;
        break;
      case 3:
        s.x += a * i;
    }
  }
}
class je extends xt {
  constructor(t, n, e) {
    super(t, n, $.y + "|" + e), this.boneIndex = 0, this.boneIndex = e;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.bones[this.boneIndex];
    if (!s.active)
      return;
    const o = this.frames;
    if (e < o[0]) {
      switch (l) {
        case 0:
          s.y = s.data.y;
          return;
        case 1:
          s.y += (s.data.y - s.y) * i;
      }
      return;
    }
    const a = this.getCurveValue(e);
    switch (l) {
      case 0:
        s.y = s.data.y + a * i;
        break;
      case 1:
      case 2:
        s.y += (s.data.y + a - s.y) * i;
        break;
      case 3:
        s.y += a * i;
    }
  }
}
class _e extends ve {
  constructor(t, n, e) {
    super(t, n, $.scaleX + "|" + e, $.scaleY + "|" + e), this.boneIndex = 0, this.boneIndex = e;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.bones[this.boneIndex];
    if (!s.active)
      return;
    const o = this.frames;
    if (e < o[0]) {
      switch (l) {
        case 0:
          s.scaleX = s.data.scaleX, s.scaleY = s.data.scaleY;
          return;
        case 1:
          s.scaleX += (s.data.scaleX - s.scaleX) * i, s.scaleY += (s.data.scaleY - s.scaleY) * i;
      }
      return;
    }
    let a, h;
    const d = K.search(
      o,
      e,
      3
      /*ENTRIES*/
    ), f = this.curves[
      d / 3
      /*ENTRIES*/
    ];
    switch (f) {
      case 0:
        const u = o[d];
        a = o[
          d + 1
          /*VALUE1*/
        ], h = o[
          d + 2
          /*VALUE2*/
        ];
        const m = (e - u) / (o[
          d + 3
          /*ENTRIES*/
        ] - u);
        a += (o[
          d + 3 + 1
          /*VALUE1*/
        ] - a) * m, h += (o[
          d + 3 + 2
          /*VALUE2*/
        ] - h) * m;
        break;
      case 1:
        a = o[
          d + 1
          /*VALUE1*/
        ], h = o[
          d + 2
          /*VALUE2*/
        ];
        break;
      default:
        a = this.getBezierValue(
          e,
          d,
          1,
          f - 2
          /*BEZIER*/
        ), h = this.getBezierValue(
          e,
          d,
          2,
          f + 18 - 2
          /*BEZIER*/
        );
    }
    if (a *= s.data.scaleX, h *= s.data.scaleY, i == 1)
      l == 3 ? (s.scaleX += a - s.data.scaleX, s.scaleY += h - s.data.scaleY) : (s.scaleX = a, s.scaleY = h);
    else {
      let u = 0, m = 0;
      if (c == 1)
        switch (l) {
          case 0:
            u = s.data.scaleX, m = s.data.scaleY, s.scaleX = u + (Math.abs(a) * M.signum(u) - u) * i, s.scaleY = m + (Math.abs(h) * M.signum(m) - m) * i;
            break;
          case 1:
          case 2:
            u = s.scaleX, m = s.scaleY, s.scaleX = u + (Math.abs(a) * M.signum(u) - u) * i, s.scaleY = m + (Math.abs(h) * M.signum(m) - m) * i;
            break;
          case 3:
            s.scaleX += (a - s.data.scaleX) * i, s.scaleY += (h - s.data.scaleY) * i;
        }
      else
        switch (l) {
          case 0:
            u = Math.abs(s.data.scaleX) * M.signum(a), m = Math.abs(s.data.scaleY) * M.signum(h), s.scaleX = u + (a - u) * i, s.scaleY = m + (h - m) * i;
            break;
          case 1:
          case 2:
            u = Math.abs(s.scaleX) * M.signum(a), m = Math.abs(s.scaleY) * M.signum(h), s.scaleX = u + (a - u) * i, s.scaleY = m + (h - m) * i;
            break;
          case 3:
            s.scaleX += (a - s.data.scaleX) * i, s.scaleY += (h - s.data.scaleY) * i;
        }
    }
  }
}
class Ke extends xt {
  constructor(t, n, e) {
    super(t, n, $.scaleX + "|" + e), this.boneIndex = 0, this.boneIndex = e;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.bones[this.boneIndex];
    if (!s.active)
      return;
    const o = this.frames;
    if (e < o[0]) {
      switch (l) {
        case 0:
          s.scaleX = s.data.scaleX;
          return;
        case 1:
          s.scaleX += (s.data.scaleX - s.scaleX) * i;
      }
      return;
    }
    const a = this.getCurveValue(e) * s.data.scaleX;
    if (i == 1)
      l == 3 ? s.scaleX += a - s.data.scaleX : s.scaleX = a;
    else {
      let h = 0;
      if (c == 1)
        switch (l) {
          case 0:
            h = s.data.scaleX, s.scaleX = h + (Math.abs(a) * M.signum(h) - h) * i;
            break;
          case 1:
          case 2:
            h = s.scaleX, s.scaleX = h + (Math.abs(a) * M.signum(h) - h) * i;
            break;
          case 3:
            s.scaleX += (a - s.data.scaleX) * i;
        }
      else
        switch (l) {
          case 0:
            h = Math.abs(s.data.scaleX) * M.signum(a), s.scaleX = h + (a - h) * i;
            break;
          case 1:
          case 2:
            h = Math.abs(s.scaleX) * M.signum(a), s.scaleX = h + (a - h) * i;
            break;
          case 3:
            s.scaleX += (a - s.data.scaleX) * i;
        }
    }
  }
}
class Qe extends xt {
  constructor(t, n, e) {
    super(t, n, $.scaleY + "|" + e), this.boneIndex = 0, this.boneIndex = e;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.bones[this.boneIndex];
    if (!s.active)
      return;
    const o = this.frames;
    if (e < o[0]) {
      switch (l) {
        case 0:
          s.scaleY = s.data.scaleY;
          return;
        case 1:
          s.scaleY += (s.data.scaleY - s.scaleY) * i;
      }
      return;
    }
    const a = this.getCurveValue(e) * s.data.scaleY;
    if (i == 1)
      l == 3 ? s.scaleY += a - s.data.scaleY : s.scaleY = a;
    else {
      let h = 0;
      if (c == 1)
        switch (l) {
          case 0:
            h = s.data.scaleY, s.scaleY = h + (Math.abs(a) * M.signum(h) - h) * i;
            break;
          case 1:
          case 2:
            h = s.scaleY, s.scaleY = h + (Math.abs(a) * M.signum(h) - h) * i;
            break;
          case 3:
            s.scaleY += (a - s.data.scaleY) * i;
        }
      else
        switch (l) {
          case 0:
            h = Math.abs(s.data.scaleY) * M.signum(a), s.scaleY = h + (a - h) * i;
            break;
          case 1:
          case 2:
            h = Math.abs(s.scaleY) * M.signum(a), s.scaleY = h + (a - h) * i;
            break;
          case 3:
            s.scaleY += (a - s.data.scaleY) * i;
        }
    }
  }
}
class Je extends ve {
  constructor(t, n, e) {
    super(t, n, $.shearX + "|" + e, $.shearY + "|" + e), this.boneIndex = 0, this.boneIndex = e;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.bones[this.boneIndex];
    if (!s.active)
      return;
    const o = this.frames;
    if (e < o[0]) {
      switch (l) {
        case 0:
          s.shearX = s.data.shearX, s.shearY = s.data.shearY;
          return;
        case 1:
          s.shearX += (s.data.shearX - s.shearX) * i, s.shearY += (s.data.shearY - s.shearY) * i;
      }
      return;
    }
    let a = 0, h = 0;
    const d = K.search(
      o,
      e,
      3
      /*ENTRIES*/
    ), f = this.curves[
      d / 3
      /*ENTRIES*/
    ];
    switch (f) {
      case 0:
        const u = o[d];
        a = o[
          d + 1
          /*VALUE1*/
        ], h = o[
          d + 2
          /*VALUE2*/
        ];
        const m = (e - u) / (o[
          d + 3
          /*ENTRIES*/
        ] - u);
        a += (o[
          d + 3 + 1
          /*VALUE1*/
        ] - a) * m, h += (o[
          d + 3 + 2
          /*VALUE2*/
        ] - h) * m;
        break;
      case 1:
        a = o[
          d + 1
          /*VALUE1*/
        ], h = o[
          d + 2
          /*VALUE2*/
        ];
        break;
      default:
        a = this.getBezierValue(
          e,
          d,
          1,
          f - 2
          /*BEZIER*/
        ), h = this.getBezierValue(
          e,
          d,
          2,
          f + 18 - 2
          /*BEZIER*/
        );
    }
    switch (l) {
      case 0:
        s.shearX = s.data.shearX + a * i, s.shearY = s.data.shearY + h * i;
        break;
      case 1:
      case 2:
        s.shearX += (s.data.shearX + a - s.shearX) * i, s.shearY += (s.data.shearY + h - s.shearY) * i;
        break;
      case 3:
        s.shearX += a * i, s.shearY += h * i;
    }
  }
}
class Ze extends xt {
  constructor(t, n, e) {
    super(t, n, $.shearX + "|" + e), this.boneIndex = 0, this.boneIndex = e;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.bones[this.boneIndex];
    if (!s.active)
      return;
    const o = this.frames;
    if (e < o[0]) {
      switch (l) {
        case 0:
          s.shearX = s.data.shearX;
          return;
        case 1:
          s.shearX += (s.data.shearX - s.shearX) * i;
      }
      return;
    }
    const a = this.getCurveValue(e);
    switch (l) {
      case 0:
        s.shearX = s.data.shearX + a * i;
        break;
      case 1:
      case 2:
        s.shearX += (s.data.shearX + a - s.shearX) * i;
        break;
      case 3:
        s.shearX += a * i;
    }
  }
}
class ts extends xt {
  constructor(t, n, e) {
    super(t, n, $.shearY + "|" + e), this.boneIndex = 0, this.boneIndex = e;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.bones[this.boneIndex];
    if (!s.active)
      return;
    const o = this.frames;
    if (e < o[0]) {
      switch (l) {
        case 0:
          s.shearY = s.data.shearY;
          return;
        case 1:
          s.shearY += (s.data.shearY - s.shearY) * i;
      }
      return;
    }
    const a = this.getCurveValue(e);
    switch (l) {
      case 0:
        s.shearY = s.data.shearY + a * i;
        break;
      case 1:
      case 2:
        s.shearY += (s.data.shearY + a - s.shearY) * i;
        break;
      case 3:
        s.shearY += a * i;
    }
  }
}
class es extends gt {
  constructor(t, n, e) {
    super(t, n, [$.rgb + "|" + e, $.alpha + "|" + e]), this.slotIndex = 0, this.slotIndex = e;
  }
  getFrameEntries() {
    return 5;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.slots[this.slotIndex];
    if (!s.bone.active)
      return;
    const o = this.frames, a = s.color;
    if (e < o[0]) {
      const y = s.data.color;
      switch (l) {
        case 0:
          a.setFromColor(y);
          return;
        case 1:
          a.add(
            (y.r - a.r) * i,
            (y.g - a.g) * i,
            (y.b - a.b) * i,
            (y.a - a.a) * i
          );
      }
      return;
    }
    let h = 0, d = 0, f = 0, u = 0;
    const m = K.search(
      o,
      e,
      5
      /*ENTRIES*/
    ), x = this.curves[
      m / 5
      /*ENTRIES*/
    ];
    switch (x) {
      case 0:
        const y = o[m];
        h = o[
          m + 1
          /*R*/
        ], d = o[
          m + 2
          /*G*/
        ], f = o[
          m + 3
          /*B*/
        ], u = o[
          m + 4
          /*A*/
        ];
        const b = (e - y) / (o[
          m + 5
          /*ENTRIES*/
        ] - y);
        h += (o[
          m + 5 + 1
          /*R*/
        ] - h) * b, d += (o[
          m + 5 + 2
          /*G*/
        ] - d) * b, f += (o[
          m + 5 + 3
          /*B*/
        ] - f) * b, u += (o[
          m + 5 + 4
          /*A*/
        ] - u) * b;
        break;
      case 1:
        h = o[
          m + 1
          /*R*/
        ], d = o[
          m + 2
          /*G*/
        ], f = o[
          m + 3
          /*B*/
        ], u = o[
          m + 4
          /*A*/
        ];
        break;
      default:
        h = this.getBezierValue(
          e,
          m,
          1,
          x - 2
          /*BEZIER*/
        ), d = this.getBezierValue(
          e,
          m,
          2,
          x + 18 - 2
          /*BEZIER*/
        ), f = this.getBezierValue(
          e,
          m,
          3,
          x + 18 * 2 - 2
          /*BEZIER*/
        ), u = this.getBezierValue(
          e,
          m,
          4,
          x + 18 * 3 - 2
          /*BEZIER*/
        );
    }
    i == 1 ? a.set(h, d, f, u) : (l == 0 && a.setFromColor(s.data.color), a.add((h - a.r) * i, (d - a.g) * i, (f - a.b) * i, (u - a.a) * i));
  }
  /** Sets the time in seconds, red, green, blue, and alpha for the specified key frame. */
  setFrame(t, n, e, r, i, l) {
    t *= 5, this.frames[t] = n, this.frames[
      t + 1
      /*R*/
    ] = e, this.frames[
      t + 2
      /*G*/
    ] = r, this.frames[
      t + 3
      /*B*/
    ] = i, this.frames[
      t + 4
      /*A*/
    ] = l;
  }
}
class ss extends gt {
  constructor(t, n, e) {
    super(t, n, [$.rgb + "|" + e]), this.slotIndex = 0, this.slotIndex = e;
  }
  getFrameEntries() {
    return 4;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.slots[this.slotIndex];
    if (!s.bone.active)
      return;
    const o = this.frames, a = s.color;
    if (e < o[0]) {
      const x = s.data.color;
      switch (l) {
        case 0:
          a.r = x.r, a.g = x.g, a.b = x.b;
          return;
        case 1:
          a.r += (x.r - a.r) * i, a.g += (x.g - a.g) * i, a.b += (x.b - a.b) * i;
      }
      return;
    }
    let h = 0, d = 0, f = 0;
    const u = K.search(
      o,
      e,
      4
      /*ENTRIES*/
    ), m = this.curves[u >> 2];
    switch (m) {
      case 0:
        const x = o[u];
        h = o[
          u + 1
          /*R*/
        ], d = o[
          u + 2
          /*G*/
        ], f = o[
          u + 3
          /*B*/
        ];
        const y = (e - x) / (o[
          u + 4
          /*ENTRIES*/
        ] - x);
        h += (o[
          u + 4 + 1
          /*R*/
        ] - h) * y, d += (o[
          u + 4 + 2
          /*G*/
        ] - d) * y, f += (o[
          u + 4 + 3
          /*B*/
        ] - f) * y;
        break;
      case 1:
        h = o[
          u + 1
          /*R*/
        ], d = o[
          u + 2
          /*G*/
        ], f = o[
          u + 3
          /*B*/
        ];
        break;
      default:
        h = this.getBezierValue(
          e,
          u,
          1,
          m - 2
          /*BEZIER*/
        ), d = this.getBezierValue(
          e,
          u,
          2,
          m + 18 - 2
          /*BEZIER*/
        ), f = this.getBezierValue(
          e,
          u,
          3,
          m + 18 * 2 - 2
          /*BEZIER*/
        );
    }
    if (i == 1)
      a.r = h, a.g = d, a.b = f;
    else {
      if (l == 0) {
        const x = s.data.color;
        a.r = x.r, a.g = x.g, a.b = x.b;
      }
      a.r += (h - a.r) * i, a.g += (d - a.g) * i, a.b += (f - a.b) * i;
    }
  }
  /** Sets the time in seconds, red, green, blue, and alpha for the specified key frame. */
  setFrame(t, n, e, r, i) {
    t <<= 2, this.frames[t] = n, this.frames[
      t + 1
      /*R*/
    ] = e, this.frames[
      t + 2
      /*G*/
    ] = r, this.frames[
      t + 3
      /*B*/
    ] = i;
  }
}
class ns extends xt {
  constructor(t, n, e) {
    super(t, n, $.alpha + "|" + e), this.slotIndex = 0, this.slotIndex = e;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.slots[this.slotIndex];
    if (!s.bone.active)
      return;
    const o = s.color;
    if (e < this.frames[0]) {
      const h = s.data.color;
      switch (l) {
        case 0:
          o.a = h.a;
          return;
        case 1:
          o.a += (h.a - o.a) * i;
      }
      return;
    }
    const a = this.getCurveValue(e);
    i == 1 ? o.a = a : (l == 0 && (o.a = s.data.color.a), o.a += (a - o.a) * i);
  }
}
class is extends gt {
  constructor(t, n, e) {
    super(t, n, [
      $.rgb + "|" + e,
      $.alpha + "|" + e,
      $.rgb2 + "|" + e
    ]), this.slotIndex = 0, this.slotIndex = e;
  }
  getFrameEntries() {
    return 8;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.slots[this.slotIndex];
    if (!s.bone.active)
      return;
    const o = this.frames, a = s.color, h = s.darkColor;
    if (e < o[0]) {
      const w = s.data.color, S = s.data.darkColor;
      switch (l) {
        case 0:
          a.setFromColor(w), h.r = S.r, h.g = S.g, h.b = S.b;
          return;
        case 1:
          a.add(
            (w.r - a.r) * i,
            (w.g - a.g) * i,
            (w.b - a.b) * i,
            (w.a - a.a) * i
          ), h.r += (S.r - h.r) * i, h.g += (S.g - h.g) * i, h.b += (S.b - h.b) * i;
      }
      return;
    }
    let d = 0, f = 0, u = 0, m = 0, x = 0, y = 0, b = 0;
    const g = K.search(
      o,
      e,
      8
      /*ENTRIES*/
    ), p = this.curves[g >> 3];
    switch (p) {
      case 0:
        const w = o[g];
        d = o[
          g + 1
          /*R*/
        ], f = o[
          g + 2
          /*G*/
        ], u = o[
          g + 3
          /*B*/
        ], m = o[
          g + 4
          /*A*/
        ], x = o[
          g + 5
          /*R2*/
        ], y = o[
          g + 6
          /*G2*/
        ], b = o[
          g + 7
          /*B2*/
        ];
        const S = (e - w) / (o[
          g + 8
          /*ENTRIES*/
        ] - w);
        d += (o[
          g + 8 + 1
          /*R*/
        ] - d) * S, f += (o[
          g + 8 + 2
          /*G*/
        ] - f) * S, u += (o[
          g + 8 + 3
          /*B*/
        ] - u) * S, m += (o[
          g + 8 + 4
          /*A*/
        ] - m) * S, x += (o[
          g + 8 + 5
          /*R2*/
        ] - x) * S, y += (o[
          g + 8 + 6
          /*G2*/
        ] - y) * S, b += (o[
          g + 8 + 7
          /*B2*/
        ] - b) * S;
        break;
      case 1:
        d = o[
          g + 1
          /*R*/
        ], f = o[
          g + 2
          /*G*/
        ], u = o[
          g + 3
          /*B*/
        ], m = o[
          g + 4
          /*A*/
        ], x = o[
          g + 5
          /*R2*/
        ], y = o[
          g + 6
          /*G2*/
        ], b = o[
          g + 7
          /*B2*/
        ];
        break;
      default:
        d = this.getBezierValue(
          e,
          g,
          1,
          p - 2
          /*BEZIER*/
        ), f = this.getBezierValue(
          e,
          g,
          2,
          p + 18 - 2
          /*BEZIER*/
        ), u = this.getBezierValue(
          e,
          g,
          3,
          p + 18 * 2 - 2
          /*BEZIER*/
        ), m = this.getBezierValue(
          e,
          g,
          4,
          p + 18 * 3 - 2
          /*BEZIER*/
        ), x = this.getBezierValue(
          e,
          g,
          5,
          p + 18 * 4 - 2
          /*BEZIER*/
        ), y = this.getBezierValue(
          e,
          g,
          6,
          p + 18 * 5 - 2
          /*BEZIER*/
        ), b = this.getBezierValue(
          e,
          g,
          7,
          p + 18 * 6 - 2
          /*BEZIER*/
        );
    }
    if (i == 1)
      a.set(d, f, u, m), h.r = x, h.g = y, h.b = b;
    else {
      if (l == 0) {
        a.setFromColor(s.data.color);
        const w = s.data.darkColor;
        h.r = w.r, h.g = w.g, h.b = w.b;
      }
      a.add((d - a.r) * i, (f - a.g) * i, (u - a.b) * i, (m - a.a) * i), h.r += (x - h.r) * i, h.g += (y - h.g) * i, h.b += (b - h.b) * i;
    }
  }
  /** Sets the time in seconds, light, and dark colors for the specified key frame. */
  setFrame(t, n, e, r, i, l, c, s, o) {
    t <<= 3, this.frames[t] = n, this.frames[
      t + 1
      /*R*/
    ] = e, this.frames[
      t + 2
      /*G*/
    ] = r, this.frames[
      t + 3
      /*B*/
    ] = i, this.frames[
      t + 4
      /*A*/
    ] = l, this.frames[
      t + 5
      /*R2*/
    ] = c, this.frames[
      t + 6
      /*G2*/
    ] = s, this.frames[
      t + 7
      /*B2*/
    ] = o;
  }
}
class rs extends gt {
  constructor(t, n, e) {
    super(t, n, [$.rgb + "|" + e, $.rgb2 + "|" + e]), this.slotIndex = 0, this.slotIndex = e;
  }
  getFrameEntries() {
    return 7;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.slots[this.slotIndex];
    if (!s.bone.active)
      return;
    const o = this.frames, a = s.color, h = s.darkColor;
    if (e < o[0]) {
      const p = s.data.color, w = s.data.darkColor;
      switch (l) {
        case 0:
          a.r = p.r, a.g = p.g, a.b = p.b, h.r = w.r, h.g = w.g, h.b = w.b;
          return;
        case 1:
          a.r += (p.r - a.r) * i, a.g += (p.g - a.g) * i, a.b += (p.b - a.b) * i, h.r += (w.r - h.r) * i, h.g += (w.g - h.g) * i, h.b += (w.b - h.b) * i;
      }
      return;
    }
    let d = 0, f = 0, u = 0, m = 0, x = 0, y = 0;
    const b = K.search(
      o,
      e,
      7
      /*ENTRIES*/
    ), g = this.curves[
      b / 7
      /*ENTRIES*/
    ];
    switch (g) {
      case 0:
        const p = o[b];
        d = o[
          b + 1
          /*R*/
        ], f = o[
          b + 2
          /*G*/
        ], u = o[
          b + 3
          /*B*/
        ], m = o[
          b + 4
          /*R2*/
        ], x = o[
          b + 5
          /*G2*/
        ], y = o[
          b + 6
          /*B2*/
        ];
        const w = (e - p) / (o[
          b + 7
          /*ENTRIES*/
        ] - p);
        d += (o[
          b + 7 + 1
          /*R*/
        ] - d) * w, f += (o[
          b + 7 + 2
          /*G*/
        ] - f) * w, u += (o[
          b + 7 + 3
          /*B*/
        ] - u) * w, m += (o[
          b + 7 + 4
          /*R2*/
        ] - m) * w, x += (o[
          b + 7 + 5
          /*G2*/
        ] - x) * w, y += (o[
          b + 7 + 6
          /*B2*/
        ] - y) * w;
        break;
      case 1:
        d = o[
          b + 1
          /*R*/
        ], f = o[
          b + 2
          /*G*/
        ], u = o[
          b + 3
          /*B*/
        ], m = o[
          b + 4
          /*R2*/
        ], x = o[
          b + 5
          /*G2*/
        ], y = o[
          b + 6
          /*B2*/
        ];
        break;
      default:
        d = this.getBezierValue(
          e,
          b,
          1,
          g - 2
          /*BEZIER*/
        ), f = this.getBezierValue(
          e,
          b,
          2,
          g + 18 - 2
          /*BEZIER*/
        ), u = this.getBezierValue(
          e,
          b,
          3,
          g + 18 * 2 - 2
          /*BEZIER*/
        ), m = this.getBezierValue(
          e,
          b,
          4,
          g + 18 * 3 - 2
          /*BEZIER*/
        ), x = this.getBezierValue(
          e,
          b,
          5,
          g + 18 * 4 - 2
          /*BEZIER*/
        ), y = this.getBezierValue(
          e,
          b,
          6,
          g + 18 * 5 - 2
          /*BEZIER*/
        );
    }
    if (i == 1)
      a.r = d, a.g = f, a.b = u, h.r = m, h.g = x, h.b = y;
    else {
      if (l == 0) {
        const p = s.data.color, w = s.data.darkColor;
        a.r = p.r, a.g = p.g, a.b = p.b, h.r = w.r, h.g = w.g, h.b = w.b;
      }
      a.r += (d - a.r) * i, a.g += (f - a.g) * i, a.b += (u - a.b) * i, h.r += (m - h.r) * i, h.g += (x - h.g) * i, h.b += (y - h.b) * i;
    }
  }
  /** Sets the time in seconds, light, and dark colors for the specified key frame. */
  setFrame(t, n, e, r, i, l, c, s) {
    t *= 7, this.frames[t] = n, this.frames[
      t + 1
      /*R*/
    ] = e, this.frames[
      t + 2
      /*G*/
    ] = r, this.frames[
      t + 3
      /*B*/
    ] = i, this.frames[
      t + 4
      /*R2*/
    ] = l, this.frames[
      t + 5
      /*G2*/
    ] = c, this.frames[
      t + 6
      /*B2*/
    ] = s;
  }
}
class Tt extends K {
  constructor(t, n) {
    super(t, [$.attachment + "|" + n]), this.slotIndex = 0, this.slotIndex = n, this.attachmentNames = new Array(t);
  }
  getFrameCount() {
    return this.frames.length;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.slots[this.slotIndex];
    if (s.bone.active) {
      if (c == 1) {
        l == 0 && this.setAttachment(t, s, s.data.attachmentName);
        return;
      }
      if (e < this.frames[0]) {
        (l == 0 || l == 1) && this.setAttachment(t, s, s.data.attachmentName);
        return;
      }
      this.setAttachment(t, s, this.attachmentNames[K.search1(this.frames, e)]);
    }
  }
  /** Sets the time in seconds and the attachment name for the specified key frame. */
  setFrame(t, n, e) {
    this.frames[t] = n, this.attachmentNames[t] = e;
  }
  setAttachment(t, n, e) {
    n.setAttachment(e ? t.getAttachment(this.slotIndex, e) : null);
  }
}
class as extends gt {
  constructor(t, n, e, r) {
    super(t, n, [$.deform + "|" + e + "|" + r.id]), this.slotIndex = 0, this.slotIndex = e, this.attachment = r, this.vertices = new Array(t);
  }
  getFrameCount() {
    return this.frames.length;
  }
  /** @param value1 Ignored (0 is used for a deform timeline).
   * @param value2 Ignored (1 is used for a deform timeline). */
  setBezier(t, n, e, r, i, l, c, s, o, a, h) {
    const d = this.curves;
    let f = this.getFrameCount() + t * 18;
    e == 0 && (d[n] = 2 + f);
    const u = (r - l * 2 + s) * 0.03, m = o * 0.03 - c * 0.06, x = ((l - s) * 3 - r + a) * 6e-3, y = (c - o + 0.33333333) * 0.018;
    let b = u * 2 + x, g = m * 2 + y, p = (l - r) * 0.3 + u + x * 0.16666667, w = c * 0.3 + m + y * 0.16666667, S = r + p, k = w;
    for (let A = f + 18; f < A; f += 2)
      d[f] = S, d[f + 1] = k, p += b, w += g, b += x, g += y, S += p, k += w;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.slots[this.slotIndex];
    if (!s.bone.active)
      return;
    const o = s.getAttachment();
    if (!o || !(o instanceof ft) || o.timelineAttachment != this.attachment)
      return;
    const a = s.deform;
    a.length == 0 && (l = 0);
    const h = this.vertices, d = h[0].length, f = this.frames;
    if (e < f[0]) {
      switch (l) {
        case 0:
          a.length = 0;
          return;
        case 1:
          if (i == 1) {
            a.length = 0;
            return;
          }
          a.length = d;
          const g = o;
          if (g.bones) {
            i = 1 - i;
            for (var u = 0; u < d; u++)
              a[u] *= i;
          } else {
            const p = g.vertices;
            for (var u = 0; u < d; u++)
              a[u] += (p[u] - a[u]) * i;
          }
      }
      return;
    }
    if (a.length = d, e >= f[f.length - 1]) {
      const g = h[f.length - 1];
      if (i == 1)
        if (l == 3) {
          const p = o;
          if (p.bones)
            for (let w = 0; w < d; w++)
              a[w] += g[w];
          else {
            const w = p.vertices;
            for (let S = 0; S < d; S++)
              a[S] += g[S] - w[S];
          }
        } else
          P.arrayCopy(g, 0, a, 0, d);
      else
        switch (l) {
          case 0: {
            const w = o;
            if (w.bones)
              for (let S = 0; S < d; S++)
                a[S] = g[S] * i;
            else {
              const S = w.vertices;
              for (let k = 0; k < d; k++) {
                const A = S[k];
                a[k] = A + (g[k] - A) * i;
              }
            }
            break;
          }
          case 1:
          case 2:
            for (let w = 0; w < d; w++)
              a[w] += (g[w] - a[w]) * i;
            break;
          case 3:
            const p = o;
            if (p.bones)
              for (let w = 0; w < d; w++)
                a[w] += g[w] * i;
            else {
              const w = p.vertices;
              for (let S = 0; S < d; S++)
                a[S] += (g[S] - w[S]) * i;
            }
        }
      return;
    }
    const m = K.search1(f, e), x = this.getCurvePercent(e, m), y = h[m], b = h[m + 1];
    if (i == 1)
      if (l == 3) {
        const g = o;
        if (g.bones)
          for (let p = 0; p < d; p++) {
            const w = y[p];
            a[p] += w + (b[p] - w) * x;
          }
        else {
          const p = g.vertices;
          for (let w = 0; w < d; w++) {
            const S = y[w];
            a[w] += S + (b[w] - S) * x - p[w];
          }
        }
      } else
        for (let g = 0; g < d; g++) {
          const p = y[g];
          a[g] = p + (b[g] - p) * x;
        }
    else
      switch (l) {
        case 0: {
          const p = o;
          if (p.bones)
            for (let w = 0; w < d; w++) {
              const S = y[w];
              a[w] = (S + (b[w] - S) * x) * i;
            }
          else {
            const w = p.vertices;
            for (let S = 0; S < d; S++) {
              const k = y[S], A = w[S];
              a[S] = A + (k + (b[S] - k) * x - A) * i;
            }
          }
          break;
        }
        case 1:
        case 2:
          for (let p = 0; p < d; p++) {
            const w = y[p];
            a[p] += (w + (b[p] - w) * x - a[p]) * i;
          }
          break;
        case 3:
          const g = o;
          if (g.bones)
            for (let p = 0; p < d; p++) {
              const w = y[p];
              a[p] += (w + (b[p] - w) * x) * i;
            }
          else {
            const p = g.vertices;
            for (let w = 0; w < d; w++) {
              const S = y[w];
              a[w] += (S + (b[w] - S) * x - p[w]) * i;
            }
          }
      }
  }
  /** Sets the time in seconds and the vertices for the specified key frame.
   * @param vertices Vertex positions for an unweighted VertexAttachment, or deform offsets if it has weights. */
  setFrame(t, n, e) {
    this.frames[t] = n, this.vertices[t] = e;
  }
  getCurvePercent(t, n) {
    const e = this.curves;
    let r = e[n];
    switch (r) {
      case 0:
        const s = this.frames[n];
        return (t - s) / (this.frames[n + this.getFrameEntries()] - s);
      case 1:
        return 0;
    }
    if (r -= 2, e[r] > t) {
      const s = this.frames[n];
      return e[r + 1] * (t - s) / (e[r] - s);
    }
    const i = r + 18;
    for (r += 2; r < i; r += 2)
      if (e[r] >= t) {
        const s = e[r - 2], o = e[r - 1];
        return o + (t - s) / (e[r] - s) * (e[r + 1] - o);
      }
    const l = e[i - 2], c = e[i - 1];
    return c + (1 - c) * (t - l) / (this.frames[n + this.getFrameEntries()] - l);
  }
}
const ee = class ee extends K {
  constructor(t) {
    super(t, ee.propertyIds), this.events = new Array(t);
  }
  getFrameCount() {
    return this.frames.length;
  }
  /** Fires events for frames > `lastTime` and <= `time`. */
  apply(t, n, e, r, i, l, c) {
    if (!r)
      return;
    const s = this.frames, o = this.frames.length;
    if (n > e)
      this.apply(t, n, Number.MAX_VALUE, r, i, l, c), n = -1;
    else if (n >= s[o - 1])
      return;
    if (e < s[0])
      return;
    let a = 0;
    if (n < s[0])
      a = 0;
    else {
      a = K.search1(s, n) + 1;
      const h = s[a];
      for (; a > 0 && s[a - 1] == h; )
        a--;
    }
    for (; a < o && e >= s[a]; a++)
      r.push(this.events[a]);
  }
  /** Sets the time in seconds and the event for the specified key frame. */
  setFrame(t, n) {
    this.frames[t] = n.time, this.events[t] = n;
  }
};
ee.propertyIds = ["" + $.event];
let Nt = ee;
const se = class se extends K {
  constructor(t) {
    super(t, se.propertyIds), this.drawOrders = new Array(t);
  }
  getFrameCount() {
    return this.frames.length;
  }
  apply(t, n, e, r, i, l, c) {
    if (c == 1) {
      l == 0 && P.arrayCopy(t.slots, 0, t.drawOrder, 0, t.slots.length);
      return;
    }
    if (e < this.frames[0]) {
      (l == 0 || l == 1) && P.arrayCopy(t.slots, 0, t.drawOrder, 0, t.slots.length);
      return;
    }
    const s = K.search1(this.frames, e), o = this.drawOrders[s];
    if (!o)
      P.arrayCopy(t.slots, 0, t.drawOrder, 0, t.slots.length);
    else {
      const a = t.drawOrder, h = t.slots;
      for (let d = 0, f = o.length; d < f; d++)
        a[d] = h[o[d]];
    }
  }
  /** Sets the time in seconds and the draw order for the specified key frame.
   * @param drawOrder For each slot in {@link Skeleton#slots}, the index of the new draw order. May be null to use setup pose
   *           draw order. */
  setFrame(t, n, e) {
    this.frames[t] = n, this.drawOrders[t] = e;
  }
};
se.propertyIds = ["" + $.drawOrder];
let It = se;
class os extends gt {
  constructor(t, n, e) {
    super(t, n, [$.ikConstraint + "|" + e]), this.ikConstraintIndex = 0, this.ikConstraintIndex = e;
  }
  getFrameEntries() {
    return 6;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.ikConstraints[this.ikConstraintIndex];
    if (!s.active)
      return;
    const o = this.frames;
    if (e < o[0]) {
      switch (l) {
        case 0:
          s.mix = s.data.mix, s.softness = s.data.softness, s.bendDirection = s.data.bendDirection, s.compress = s.data.compress, s.stretch = s.data.stretch;
          return;
        case 1:
          s.mix += (s.data.mix - s.mix) * i, s.softness += (s.data.softness - s.softness) * i, s.bendDirection = s.data.bendDirection, s.compress = s.data.compress, s.stretch = s.data.stretch;
      }
      return;
    }
    let a = 0, h = 0;
    const d = K.search(
      o,
      e,
      6
      /*ENTRIES*/
    ), f = this.curves[
      d / 6
      /*ENTRIES*/
    ];
    switch (f) {
      case 0:
        const u = o[d];
        a = o[
          d + 1
          /*MIX*/
        ], h = o[
          d + 2
          /*SOFTNESS*/
        ];
        const m = (e - u) / (o[
          d + 6
          /*ENTRIES*/
        ] - u);
        a += (o[
          d + 6 + 1
          /*MIX*/
        ] - a) * m, h += (o[
          d + 6 + 2
          /*SOFTNESS*/
        ] - h) * m;
        break;
      case 1:
        a = o[
          d + 1
          /*MIX*/
        ], h = o[
          d + 2
          /*SOFTNESS*/
        ];
        break;
      default:
        a = this.getBezierValue(
          e,
          d,
          1,
          f - 2
          /*BEZIER*/
        ), h = this.getBezierValue(
          e,
          d,
          2,
          f + 18 - 2
          /*BEZIER*/
        );
    }
    l == 0 ? (s.mix = s.data.mix + (a - s.data.mix) * i, s.softness = s.data.softness + (h - s.data.softness) * i, c == 1 ? (s.bendDirection = s.data.bendDirection, s.compress = s.data.compress, s.stretch = s.data.stretch) : (s.bendDirection = o[
      d + 3
      /*BEND_DIRECTION*/
    ], s.compress = o[
      d + 4
      /*COMPRESS*/
    ] != 0, s.stretch = o[
      d + 5
      /*STRETCH*/
    ] != 0)) : (s.mix += (a - s.mix) * i, s.softness += (h - s.softness) * i, c == 0 && (s.bendDirection = o[
      d + 3
      /*BEND_DIRECTION*/
    ], s.compress = o[
      d + 4
      /*COMPRESS*/
    ] != 0, s.stretch = o[
      d + 5
      /*STRETCH*/
    ] != 0));
  }
  /** Sets the time in seconds, mix, softness, bend direction, compress, and stretch for the specified key frame. */
  setFrame(t, n, e, r, i, l, c) {
    t *= 6, this.frames[t] = n, this.frames[
      t + 1
      /*MIX*/
    ] = e, this.frames[
      t + 2
      /*SOFTNESS*/
    ] = r, this.frames[
      t + 3
      /*BEND_DIRECTION*/
    ] = i, this.frames[
      t + 4
      /*COMPRESS*/
    ] = l ? 1 : 0, this.frames[
      t + 5
      /*STRETCH*/
    ] = c ? 1 : 0;
  }
}
class cs extends gt {
  constructor(t, n, e) {
    super(t, n, [$.transformConstraint + "|" + e]), this.transformConstraintIndex = 0, this.transformConstraintIndex = e;
  }
  getFrameEntries() {
    return 7;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.transformConstraints[this.transformConstraintIndex];
    if (!s.active)
      return;
    const o = this.frames;
    if (e < o[0]) {
      const b = s.data;
      switch (l) {
        case 0:
          s.mixRotate = b.mixRotate, s.mixX = b.mixX, s.mixY = b.mixY, s.mixScaleX = b.mixScaleX, s.mixScaleY = b.mixScaleY, s.mixShearY = b.mixShearY;
          return;
        case 1:
          s.mixRotate += (b.mixRotate - s.mixRotate) * i, s.mixX += (b.mixX - s.mixX) * i, s.mixY += (b.mixY - s.mixY) * i, s.mixScaleX += (b.mixScaleX - s.mixScaleX) * i, s.mixScaleY += (b.mixScaleY - s.mixScaleY) * i, s.mixShearY += (b.mixShearY - s.mixShearY) * i;
      }
      return;
    }
    let a, h, d, f, u, m;
    const x = K.search(
      o,
      e,
      7
      /*ENTRIES*/
    ), y = this.curves[
      x / 7
      /*ENTRIES*/
    ];
    switch (y) {
      case 0:
        const b = o[x];
        a = o[
          x + 1
          /*ROTATE*/
        ], h = o[
          x + 2
          /*X*/
        ], d = o[
          x + 3
          /*Y*/
        ], f = o[
          x + 4
          /*SCALEX*/
        ], u = o[
          x + 5
          /*SCALEY*/
        ], m = o[
          x + 6
          /*SHEARY*/
        ];
        const g = (e - b) / (o[
          x + 7
          /*ENTRIES*/
        ] - b);
        a += (o[
          x + 7 + 1
          /*ROTATE*/
        ] - a) * g, h += (o[
          x + 7 + 2
          /*X*/
        ] - h) * g, d += (o[
          x + 7 + 3
          /*Y*/
        ] - d) * g, f += (o[
          x + 7 + 4
          /*SCALEX*/
        ] - f) * g, u += (o[
          x + 7 + 5
          /*SCALEY*/
        ] - u) * g, m += (o[
          x + 7 + 6
          /*SHEARY*/
        ] - m) * g;
        break;
      case 1:
        a = o[
          x + 1
          /*ROTATE*/
        ], h = o[
          x + 2
          /*X*/
        ], d = o[
          x + 3
          /*Y*/
        ], f = o[
          x + 4
          /*SCALEX*/
        ], u = o[
          x + 5
          /*SCALEY*/
        ], m = o[
          x + 6
          /*SHEARY*/
        ];
        break;
      default:
        a = this.getBezierValue(
          e,
          x,
          1,
          y - 2
          /*BEZIER*/
        ), h = this.getBezierValue(
          e,
          x,
          2,
          y + 18 - 2
          /*BEZIER*/
        ), d = this.getBezierValue(
          e,
          x,
          3,
          y + 18 * 2 - 2
          /*BEZIER*/
        ), f = this.getBezierValue(
          e,
          x,
          4,
          y + 18 * 3 - 2
          /*BEZIER*/
        ), u = this.getBezierValue(
          e,
          x,
          5,
          y + 18 * 4 - 2
          /*BEZIER*/
        ), m = this.getBezierValue(
          e,
          x,
          6,
          y + 18 * 5 - 2
          /*BEZIER*/
        );
    }
    if (l == 0) {
      const b = s.data;
      s.mixRotate = b.mixRotate + (a - b.mixRotate) * i, s.mixX = b.mixX + (h - b.mixX) * i, s.mixY = b.mixY + (d - b.mixY) * i, s.mixScaleX = b.mixScaleX + (f - b.mixScaleX) * i, s.mixScaleY = b.mixScaleY + (u - b.mixScaleY) * i, s.mixShearY = b.mixShearY + (m - b.mixShearY) * i;
    } else
      s.mixRotate += (a - s.mixRotate) * i, s.mixX += (h - s.mixX) * i, s.mixY += (d - s.mixY) * i, s.mixScaleX += (f - s.mixScaleX) * i, s.mixScaleY += (u - s.mixScaleY) * i, s.mixShearY += (m - s.mixShearY) * i;
  }
  /** The time in seconds, rotate mix, translate mix, scale mix, and shear mix for the specified key frame. */
  setFrame(t, n, e, r, i, l, c, s) {
    const o = this.frames;
    t *= 7, o[t] = n, o[
      t + 1
      /*ROTATE*/
    ] = e, o[
      t + 2
      /*X*/
    ] = r, o[
      t + 3
      /*Y*/
    ] = i, o[
      t + 4
      /*SCALEX*/
    ] = l, o[
      t + 5
      /*SCALEY*/
    ] = c, o[
      t + 6
      /*SHEARY*/
    ] = s;
  }
}
class hs extends xt {
  constructor(t, n, e) {
    super(t, n, $.pathConstraintPosition + "|" + e), this.pathConstraintIndex = 0, this.pathConstraintIndex = e;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.pathConstraints[this.pathConstraintIndex];
    if (!s.active)
      return;
    const o = this.frames;
    if (e < o[0]) {
      switch (l) {
        case 0:
          s.position = s.data.position;
          return;
        case 1:
          s.position += (s.data.position - s.position) * i;
      }
      return;
    }
    const a = this.getCurveValue(e);
    l == 0 ? s.position = s.data.position + (a - s.data.position) * i : s.position += (a - s.position) * i;
  }
}
class ls extends xt {
  constructor(t, n, e) {
    super(t, n, $.pathConstraintSpacing + "|" + e), this.pathConstraintIndex = 0, this.pathConstraintIndex = e;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.pathConstraints[this.pathConstraintIndex];
    if (!s.active)
      return;
    const o = this.frames;
    if (e < o[0]) {
      switch (l) {
        case 0:
          s.spacing = s.data.spacing;
          return;
        case 1:
          s.spacing += (s.data.spacing - s.spacing) * i;
      }
      return;
    }
    const a = this.getCurveValue(e);
    l == 0 ? s.spacing = s.data.spacing + (a - s.data.spacing) * i : s.spacing += (a - s.spacing) * i;
  }
}
class ds extends gt {
  constructor(t, n, e) {
    super(t, n, [$.pathConstraintMix + "|" + e]), this.pathConstraintIndex = 0, this.pathConstraintIndex = e;
  }
  getFrameEntries() {
    return 4;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.pathConstraints[this.pathConstraintIndex];
    if (!s.active)
      return;
    const o = this.frames;
    if (e < o[0]) {
      switch (l) {
        case 0:
          s.mixRotate = s.data.mixRotate, s.mixX = s.data.mixX, s.mixY = s.data.mixY;
          return;
        case 1:
          s.mixRotate += (s.data.mixRotate - s.mixRotate) * i, s.mixX += (s.data.mixX - s.mixX) * i, s.mixY += (s.data.mixY - s.mixY) * i;
      }
      return;
    }
    let a, h, d;
    const f = K.search(
      o,
      e,
      4
      /*ENTRIES*/
    ), u = this.curves[f >> 2];
    switch (u) {
      case 0:
        const m = o[f];
        a = o[
          f + 1
          /*ROTATE*/
        ], h = o[
          f + 2
          /*X*/
        ], d = o[
          f + 3
          /*Y*/
        ];
        const x = (e - m) / (o[
          f + 4
          /*ENTRIES*/
        ] - m);
        a += (o[
          f + 4 + 1
          /*ROTATE*/
        ] - a) * x, h += (o[
          f + 4 + 2
          /*X*/
        ] - h) * x, d += (o[
          f + 4 + 3
          /*Y*/
        ] - d) * x;
        break;
      case 1:
        a = o[
          f + 1
          /*ROTATE*/
        ], h = o[
          f + 2
          /*X*/
        ], d = o[
          f + 3
          /*Y*/
        ];
        break;
      default:
        a = this.getBezierValue(
          e,
          f,
          1,
          u - 2
          /*BEZIER*/
        ), h = this.getBezierValue(
          e,
          f,
          2,
          u + 18 - 2
          /*BEZIER*/
        ), d = this.getBezierValue(
          e,
          f,
          3,
          u + 18 * 2 - 2
          /*BEZIER*/
        );
    }
    if (l == 0) {
      const m = s.data;
      s.mixRotate = m.mixRotate + (a - m.mixRotate) * i, s.mixX = m.mixX + (h - m.mixX) * i, s.mixY = m.mixY + (d - m.mixY) * i;
    } else
      s.mixRotate += (a - s.mixRotate) * i, s.mixX += (h - s.mixX) * i, s.mixY += (d - s.mixY) * i;
  }
  setFrame(t, n, e, r, i) {
    const l = this.frames;
    t <<= 2, l[t] = n, l[
      t + 1
      /*ROTATE*/
    ] = e, l[
      t + 2
      /*X*/
    ] = r, l[
      t + 3
      /*Y*/
    ] = i;
  }
}
const at = class at extends K {
  constructor(t, n, e) {
    super(t, [$.sequence + "|" + n + "|" + e.sequence.id]), this.slotIndex = n, this.attachment = e;
  }
  getFrameEntries() {
    return at.ENTRIES;
  }
  apply(t, n, e, r, i, l, c) {
    const s = t.slots[this.slotIndex];
    if (!s.bone.active)
      return;
    const o = s.attachment, a = this.attachment;
    if (o != a && (!(o instanceof ft) || o.timelineAttachment != a))
      return;
    const h = this.frames;
    if (e < h[0]) {
      (l == 0 || l == 1) && (s.sequenceIndex = -1);
      return;
    }
    const d = K.search(h, e, at.ENTRIES), f = h[d], u = h[d + at.MODE], m = h[d + at.DELAY];
    if (!this.attachment.sequence)
      return;
    let x = u >> 4, y = this.attachment.sequence.regions.length;
    const b = $e[u & 15];
    if (b != bt.hold)
      switch (x += (e - f) / m + 1e-5 | 0, b) {
        case bt.once:
          x = Math.min(y - 1, x);
          break;
        case bt.loop:
          x %= y;
          break;
        case bt.pingpong: {
          const g = (y << 1) - 2;
          x = g == 0 ? 0 : x % g, x >= y && (x = g - x);
          break;
        }
        case bt.onceReverse:
          x = Math.max(y - 1 - x, 0);
          break;
        case bt.loopReverse:
          x = y - 1 - x % y;
          break;
        case bt.pingpongReverse: {
          const g = (y << 1) - 2;
          x = g == 0 ? 0 : (x + y - 1) % g, x >= y && (x = g - x);
        }
      }
    s.sequenceIndex = x;
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
  setFrame(t, n, e, r, i) {
    const l = this.frames;
    t *= at.ENTRIES, l[t] = n, l[t + at.MODE] = e | r << 4, l[t + at.DELAY] = i;
  }
};
at.ENTRIES = 3, at.MODE = 1, at.DELAY = 2;
let _t = at;
const Bt = class Bt {
  constructor(t) {
    this.tracks = new Array(), this.timeScale = 1, this.unkeyedState = 0, this.events = new Array(), this.listeners = new Array(), this.queue = new As(this), this.propertyIDs = new ze(), this.animationsChanged = !1, this.trackEntryPool = new $t(() => new ks()), this.data = t;
  }
  static emptyAnimation() {
    return Bt._emptyAnimation;
  }
  /** Increments each track entry {@link TrackEntry#trackTime()}, setting queued animations as current if needed. */
  update(t) {
    t *= this.timeScale;
    const n = this.tracks;
    for (let e = 0, r = n.length; e < r; e++) {
      const i = n[e];
      if (!i)
        continue;
      i.animationLast = i.nextAnimationLast, i.trackLast = i.nextTrackLast;
      let l = t * i.timeScale;
      if (i.delay > 0) {
        if (i.delay -= l, i.delay > 0)
          continue;
        l = -i.delay, i.delay = 0;
      }
      let c = i.next;
      if (c) {
        const s = i.trackLast - c.delay;
        if (s >= 0) {
          for (c.delay = 0, c.trackTime += i.timeScale == 0 ? 0 : (s / i.timeScale + t) * c.timeScale, i.trackTime += l, this.setCurrent(e, c, !0); c.mixingFrom; )
            c.mixTime += t, c = c.mixingFrom;
          continue;
        }
      } else if (i.trackLast >= i.trackEnd && !i.mixingFrom) {
        n[e] = null, this.queue.end(i), this.clearNext(i);
        continue;
      }
      if (i.mixingFrom && this.updateMixingFrom(i, t)) {
        let s = i.mixingFrom;
        for (i.mixingFrom = null, s && (s.mixingTo = null); s; )
          this.queue.end(s), s = s.mixingFrom;
      }
      i.trackTime += l;
    }
    this.queue.drain();
  }
  /** Returns true when all mixing from entries are complete. */
  updateMixingFrom(t, n) {
    const e = t.mixingFrom;
    if (!e)
      return !0;
    const r = this.updateMixingFrom(e, n);
    return e.animationLast = e.nextAnimationLast, e.trackLast = e.nextTrackLast, t.mixTime > 0 && t.mixTime >= t.mixDuration ? ((e.totalAlpha == 0 || t.mixDuration == 0) && (t.mixingFrom = e.mixingFrom, e.mixingFrom && (e.mixingFrom.mixingTo = t), t.interruptAlpha = e.interruptAlpha, this.queue.end(e)), r) : (e.trackTime += n * e.timeScale, t.mixTime += n, !1);
  }
  /** Poses the skeleton using the track entry animations. There are no side effects other than invoking listeners, so the
   * animation state can be applied to multiple skeletons to pose them identically.
   * @returns True if any animations were applied. */
  apply(t) {
    if (!t)
      throw new Error("skeleton cannot be null.");
    this.animationsChanged && this._animationsChanged();
    const n = this.events, e = this.tracks;
    let r = !1;
    for (let c = 0, s = e.length; c < s; c++) {
      const o = e[c];
      if (!o || o.delay > 0)
        continue;
      r = !0;
      const a = c == 0 ? Q.first : o.mixBlend;
      let h = o.alpha;
      o.mixingFrom ? h *= this.applyMixingFrom(o, t, a) : o.trackTime >= o.trackEnd && !o.next && (h = 0);
      let d = o.animationLast, f = o.getAnimationTime(), u = f, m = n;
      o.reverse && (u = o.animation.duration - u, m = null);
      const x = o.animation.timelines, y = x.length;
      if (c == 0 && h == 1 || a == Q.add)
        for (let b = 0; b < y; b++) {
          const g = x[b];
          g instanceof Tt ? this.applyAttachmentTimeline(g, t, u, a, !0) : g.apply(t, d, u, m, h, a, At.mixIn);
        }
      else {
        const b = o.timelineMode, g = o.shortestRotation, p = !g && o.timelinesRotation.length != y << 1;
        p && (o.timelinesRotation.length = y << 1);
        for (let w = 0; w < y; w++) {
          const S = x[w], k = b[w] == le ? a : Q.setup;
          !g && S instanceof jt ? this.applyRotateTimeline(
            S,
            t,
            u,
            h,
            k,
            o.timelinesRotation,
            w << 1,
            p
          ) : S instanceof Tt ? this.applyAttachmentTimeline(S, t, u, a, !0) : S.apply(t, d, u, m, h, k, At.mixIn);
        }
      }
      this.queueEvents(o, f), n.length = 0, o.nextAnimationLast = f, o.nextTrackLast = o.trackTime;
    }
    const i = this.unkeyedState + Re, l = t.slots;
    for (let c = 0, s = t.slots.length; c < s; c++) {
      const o = l[c];
      if (o.attachmentState == i) {
        const a = o.data.attachmentName;
        o.setAttachment(a ? t.getAttachment(o.data.index, a) : null);
      }
    }
    return this.unkeyedState += 2, this.queue.drain(), r;
  }
  applyMixingFrom(t, n, e) {
    const r = t.mixingFrom;
    r.mixingFrom && this.applyMixingFrom(r, n, e);
    let i = 0;
    t.mixDuration == 0 ? (i = 1, e == Q.first && (e = Q.setup)) : (i = t.mixTime / t.mixDuration, i > 1 && (i = 1), e != Q.first && (e = r.mixBlend));
    const l = i < r.attachmentThreshold, c = i < r.drawOrderThreshold, s = r.animation.timelines, o = s.length, a = r.alpha * t.interruptAlpha, h = a * (1 - i);
    let d = r.animationLast, f = r.getAnimationTime(), u = f, m = null;
    if (r.reverse ? u = r.animation.duration - u : i < r.eventThreshold && (m = this.events), e == Q.add)
      for (let x = 0; x < o; x++)
        s[x].apply(n, d, u, m, h, e, At.mixOut);
    else {
      const x = r.timelineMode, y = r.timelineHoldMix, b = r.shortestRotation, g = !b && r.timelinesRotation.length != o << 1;
      g && (r.timelinesRotation.length = o << 1), r.totalAlpha = 0;
      for (let p = 0; p < o; p++) {
        const w = s[p];
        let S = At.mixOut, k, A = 0;
        switch (x[p]) {
          case le:
            if (!c && w instanceof It)
              continue;
            k = e, A = h;
            break;
          case Be:
            k = Q.setup, A = h;
            break;
          case Pe:
            k = e, A = a;
            break;
          case de:
            k = Q.setup, A = a;
            break;
          default:
            k = Q.setup;
            const C = y[p];
            A = a * Math.max(0, 1 - C.mixTime / C.mixDuration);
            break;
        }
        r.totalAlpha += A, !b && w instanceof jt ? this.applyRotateTimeline(
          w,
          n,
          u,
          A,
          k,
          r.timelinesRotation,
          p << 1,
          g
        ) : w instanceof Tt ? this.applyAttachmentTimeline(w, n, u, k, l) : (c && w instanceof It && k == Q.setup && (S = At.mixIn), w.apply(n, d, u, m, A, k, S));
      }
    }
    return t.mixDuration > 0 && this.queueEvents(r, f), this.events.length = 0, r.nextAnimationLast = f, r.nextTrackLast = r.trackTime, i;
  }
  applyAttachmentTimeline(t, n, e, r, i) {
    const l = n.slots[t.slotIndex];
    l.bone.active && (e < t.frames[0] ? (r == Q.setup || r == Q.first) && this.setAttachment(n, l, l.data.attachmentName, i) : this.setAttachment(
      n,
      l,
      t.attachmentNames[K.search1(t.frames, e)],
      i
    ), l.attachmentState <= this.unkeyedState && (l.attachmentState = this.unkeyedState + Re));
  }
  setAttachment(t, n, e, r) {
    n.setAttachment(e ? t.getAttachment(n.data.index, e) : null), r && (n.attachmentState = this.unkeyedState + Is);
  }
  applyRotateTimeline(t, n, e, r, i, l, c, s) {
    if (s && (l[c] = 0), r == 1) {
      t.apply(n, 0, e, null, 1, i, At.mixIn);
      return;
    }
    const o = n.bones[t.boneIndex];
    if (!o.active)
      return;
    const a = t.frames;
    let h = 0, d = 0;
    if (e < a[0])
      switch (i) {
        case Q.setup:
          o.rotation = o.data.rotation;
        default:
          return;
        case Q.first:
          h = o.rotation, d = o.data.rotation;
      }
    else
      h = i == Q.setup ? o.data.rotation : o.rotation, d = o.data.rotation + t.getCurveValue(e);
    let f = 0, u = d - h;
    if (u -= (16384 - (16384.499999999996 - u / 360 | 0)) * 360, u == 0)
      f = l[c];
    else {
      let m = 0, x = 0;
      s ? (m = 0, x = u) : (m = l[c], x = l[c + 1]);
      let y = u > 0, b = m >= 0;
      M.signum(x) != M.signum(u) && Math.abs(x) <= 90 && (Math.abs(m) > 180 && (m += 360 * M.signum(m)), b = y), f = u + m - m % 360, b != y && (f += 360 * M.signum(m)), l[c] = f;
    }
    l[c + 1] = u, o.rotation = h + f * r;
  }
  queueEvents(t, n) {
    const e = t.animationStart, r = t.animationEnd, i = r - e, l = t.trackLast % i, c = this.events;
    let s = 0, o = c.length;
    for (; s < o; s++) {
      const h = c[s];
      if (h.time < l)
        break;
      h.time > r || this.queue.event(t, h);
    }
    let a = !1;
    for (t.loop ? a = i == 0 || l > t.trackTime % i : a = n >= r && t.animationLast < r, a && this.queue.complete(t); s < o; s++) {
      const h = c[s];
      h.time < e || this.queue.event(t, h);
    }
  }
  /** Removes all animations from all tracks, leaving skeletons in their current pose.
   *
   * It may be desired to use {@link AnimationState#setEmptyAnimation()} to mix the skeletons back to the setup pose,
   * rather than leaving them in their current pose. */
  clearTracks() {
    const t = this.queue.drainDisabled;
    this.queue.drainDisabled = !0;
    for (let n = 0, e = this.tracks.length; n < e; n++)
      this.clearTrack(n);
    this.tracks.length = 0, this.queue.drainDisabled = t, this.queue.drain();
  }
  /** Removes all animations from the track, leaving skeletons in their current pose.
   *
   * It may be desired to use {@link AnimationState#setEmptyAnimation()} to mix the skeletons back to the setup pose,
   * rather than leaving them in their current pose. */
  clearTrack(t) {
    if (t >= this.tracks.length)
      return;
    const n = this.tracks[t];
    if (!n)
      return;
    this.queue.end(n), this.clearNext(n);
    let e = n;
    for (; ; ) {
      const r = e.mixingFrom;
      if (!r)
        break;
      this.queue.end(r), e.mixingFrom = null, e.mixingTo = null, e = r;
    }
    this.tracks[n.trackIndex] = null, this.queue.drain();
  }
  setCurrent(t, n, e) {
    const r = this.expandToIndex(t);
    this.tracks[t] = n, n.previous = null, r && (e && this.queue.interrupt(r), n.mixingFrom = r, r.mixingTo = n, n.mixTime = 0, r.mixingFrom && r.mixDuration > 0 && (n.interruptAlpha *= Math.min(1, r.mixTime / r.mixDuration)), r.timelinesRotation.length = 0), this.queue.start(n);
  }
  /** Sets an animation by name.
   *
   * See {@link #setAnimationWith()}. */
  setAnimation(t, n, e = !1) {
    const r = this.data.skeletonData.findAnimation(n);
    if (!r)
      throw new Error("Animation not found: " + n);
    return this.setAnimationWith(t, r, e);
  }
  /** Sets the current animation for a track, discarding any queued animations. If the formerly current track entry was never
   * applied to a skeleton, it is replaced (not mixed from).
   * @param loop If true, the animation will repeat. If false it will not, instead its last frame is applied if played beyond its
   *           duration. In either case {@link TrackEntry#trackEnd} determines when the track is cleared.
   * @returns A track entry to allow further customization of animation playback. References to the track entry must not be kept
   *         after the {@link AnimationStateListener#dispose()} event occurs. */
  setAnimationWith(t, n, e = !1) {
    if (!n)
      throw new Error("animation cannot be null.");
    let r = !0, i = this.expandToIndex(t);
    i && (i.nextTrackLast == -1 ? (this.tracks[t] = i.mixingFrom, this.queue.interrupt(i), this.queue.end(i), this.clearNext(i), i = i.mixingFrom, r = !1) : this.clearNext(i));
    const l = this.trackEntry(t, n, e, i);
    return this.setCurrent(t, l, r), this.queue.drain(), l;
  }
  /** Queues an animation by name.
   *
   * See {@link #addAnimationWith()}. */
  addAnimation(t, n, e = !1, r = 0) {
    const i = this.data.skeletonData.findAnimation(n);
    if (!i)
      throw new Error("Animation not found: " + n);
    return this.addAnimationWith(t, i, e, r);
  }
  /** Adds an animation to be played after the current or last queued animation for a track. If the track is empty, it is
   * equivalent to calling {@link #setAnimationWith()}.
   * @param delay If > 0, sets {@link TrackEntry#delay}. If <= 0, the delay set is the duration of the previous track entry
   *           minus any mix duration (from the {@link AnimationStateData}) plus the specified `delay` (ie the mix
   *           ends at (`delay` = 0) or before (`delay` < 0) the previous track entry duration). If the
   *           previous entry is looping, its next loop completion is used instead of its duration.
   * @returns A track entry to allow further customization of animation playback. References to the track entry must not be kept
   *         after the {@link AnimationStateListener#dispose()} event occurs. */
  addAnimationWith(t, n, e = !1, r = 0) {
    if (!n)
      throw new Error("animation cannot be null.");
    let i = this.expandToIndex(t);
    if (i)
      for (; i.next; )
        i = i.next;
    const l = this.trackEntry(t, n, e, i);
    return i ? (i.next = l, l.previous = i, r <= 0 && (r += i.getTrackComplete() - l.mixDuration)) : (this.setCurrent(t, l, !0), this.queue.drain()), l.delay = r, l;
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
  setEmptyAnimation(t, n = 0) {
    const e = this.setAnimationWith(t, Bt.emptyAnimation(), !1);
    return e.mixDuration = n, e.trackEnd = n, e;
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
  addEmptyAnimation(t, n = 0, e = 0) {
    const r = this.addAnimationWith(t, Bt.emptyAnimation(), !1, e);
    return e <= 0 && (r.delay += r.mixDuration - n), r.mixDuration = n, r.trackEnd = n, r;
  }
  /** Sets an empty animation for every track, discarding any queued animations, and mixes to it over the specified mix
   * duration. */
  setEmptyAnimations(t = 0) {
    const n = this.queue.drainDisabled;
    this.queue.drainDisabled = !0;
    for (let e = 0, r = this.tracks.length; e < r; e++) {
      const i = this.tracks[e];
      i && this.setEmptyAnimation(i.trackIndex, t);
    }
    this.queue.drainDisabled = n, this.queue.drain();
  }
  expandToIndex(t) {
    return t < this.tracks.length ? this.tracks[t] : (P.ensureArrayCapacity(this.tracks, t + 1, null), this.tracks.length = t + 1, null);
  }
  /** @param last May be null. */
  trackEntry(t, n, e, r) {
    const i = this.trackEntryPool.obtain();
    return i.reset(), i.trackIndex = t, i.animation = n, i.loop = e, i.holdPrevious = !1, i.reverse = !1, i.shortestRotation = !1, i.eventThreshold = 0, i.attachmentThreshold = 0, i.drawOrderThreshold = 0, i.animationStart = 0, i.animationEnd = n.duration, i.animationLast = -1, i.nextAnimationLast = -1, i.delay = 0, i.trackTime = 0, i.trackLast = -1, i.nextTrackLast = -1, i.trackEnd = Number.MAX_VALUE, i.timeScale = 1, i.alpha = 1, i.mixTime = 0, i.mixDuration = r ? this.data.getMix(r.animation, n) : 0, i.interruptAlpha = 1, i.totalAlpha = 0, i.mixBlend = Q.replace, i;
  }
  /** Removes the {@link TrackEntry#getNext() next entry} and all entries after it for the specified entry. */
  clearNext(t) {
    let n = t.next;
    for (; n; )
      this.queue.dispose(n), n = n.next;
    t.next = null;
  }
  _animationsChanged() {
    this.animationsChanged = !1, this.propertyIDs.clear();
    const t = this.tracks;
    for (let n = 0, e = t.length; n < e; n++) {
      let r = t[n];
      if (r) {
        for (; r.mixingFrom; )
          r = r.mixingFrom;
        do
          (!r.mixingTo || r.mixBlend != Q.add) && this.computeHold(r), r = r.mixingTo;
        while (r);
      }
    }
  }
  computeHold(t) {
    const n = t.mixingTo, e = t.animation.timelines, r = t.animation.timelines.length, i = t.timelineMode;
    i.length = r;
    const l = t.timelineHoldMix;
    l.length = 0;
    const c = this.propertyIDs;
    if (n && n.holdPrevious) {
      for (let s = 0; s < r; s++)
        i[s] = c.addAll(e[s].getPropertyIds()) ? de : Pe;
      return;
    }
    t:
      for (let s = 0; s < r; s++) {
        const o = e[s], a = o.getPropertyIds();
        if (!c.addAll(a))
          i[s] = le;
        else if (!n || o instanceof Tt || o instanceof It || o instanceof Nt || !n.animation.hasTimeline(a))
          i[s] = Be;
        else {
          for (let h = n.mixingTo; h; h = h.mixingTo)
            if (!h.animation.hasTimeline(a)) {
              if (t.mixDuration > 0) {
                i[s] = Ys, l[s] = h;
                continue t;
              }
              break;
            }
          i[s] = de;
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
    const n = this.listeners.indexOf(t);
    n >= 0 && this.listeners.splice(n, 1);
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
Bt._emptyAnimation = new Se("<empty>", [], 0);
let xe = Bt;
class ks {
  constructor() {
    this.animation = null, this.previous = null, this.next = null, this.mixingFrom = null, this.mixingTo = null, this.listener = null, this.trackIndex = 0, this.loop = !1, this.holdPrevious = !1, this.reverse = !1, this.shortestRotation = !1, this.eventThreshold = 0, this.attachmentThreshold = 0, this.drawOrderThreshold = 0, this.animationStart = 0, this.animationEnd = 0, this.animationLast = 0, this.nextAnimationLast = 0, this.delay = 0, this.trackTime = 0, this.trackLast = 0, this.nextTrackLast = 0, this.trackEnd = 0, this.timeScale = 0, this.alpha = 0, this.mixTime = 0, this.mixDuration = 0, this.interruptAlpha = 0, this.totalAlpha = 0, this.mixBlend = Q.replace, this.timelineMode = new Array(), this.timelineHoldMix = new Array(), this.timelinesRotation = new Array();
  }
  reset() {
    this.next = null, this.previous = null, this.mixingFrom = null, this.mixingTo = null, this.animation = null, this.listener = null, this.timelineMode.length = 0, this.timelineHoldMix.length = 0, this.timelinesRotation.length = 0;
  }
  /** Uses {@link #trackTime} to compute the `animationTime`, which is between {@link #animationStart}
   * and {@link #animationEnd}. When the `trackTime` is 0, the `animationTime` is equal to the
   * `animationStart` time. */
  getAnimationTime() {
    if (this.loop) {
      const t = this.animationEnd - this.animationStart;
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
    const t = this.animationEnd - this.animationStart;
    if (t != 0) {
      if (this.loop)
        return t * (1 + (this.trackTime / t | 0));
      if (this.trackTime < t)
        return t;
    }
    return this.trackTime;
  }
}
class As {
  constructor(t) {
    this.objects = [], this.drainDisabled = !1, this.animState = t;
  }
  start(t) {
    this.objects.push(
      0
      /* start */
    ), this.objects.push(t), this.animState.animationsChanged = !0;
  }
  interrupt(t) {
    this.objects.push(
      1
      /* interrupt */
    ), this.objects.push(t);
  }
  end(t) {
    this.objects.push(
      2
      /* end */
    ), this.objects.push(t), this.animState.animationsChanged = !0;
  }
  dispose(t) {
    this.objects.push(
      3
      /* dispose */
    ), this.objects.push(t);
  }
  complete(t) {
    this.objects.push(
      4
      /* complete */
    ), this.objects.push(t);
  }
  event(t, n) {
    this.objects.push(
      5
      /* event */
    ), this.objects.push(t), this.objects.push(n);
  }
  drain() {
    if (this.drainDisabled)
      return;
    this.drainDisabled = !0;
    const t = this.objects, n = this.animState.listeners;
    for (let e = 0; e < t.length; e += 2) {
      const r = t[e], i = t[e + 1];
      switch (r) {
        case 0:
          i.listener && i.listener.start && i.listener.start(i);
          for (let c = 0; c < n.length; c++) {
            const s = n[c];
            s.start && s.start(i);
          }
          break;
        case 1:
          i.listener && i.listener.interrupt && i.listener.interrupt(i);
          for (let c = 0; c < n.length; c++) {
            const s = n[c];
            s.interrupt && s.interrupt(i);
          }
          break;
        case 2:
          i.listener && i.listener.end && i.listener.end(i);
          for (let c = 0; c < n.length; c++) {
            const s = n[c];
            s.end && s.end(i);
          }
        case 3:
          i.listener && i.listener.dispose && i.listener.dispose(i);
          for (let c = 0; c < n.length; c++) {
            const s = n[c];
            s.dispose && s.dispose(i);
          }
          this.animState.trackEntryPool.free(i);
          break;
        case 4:
          i.listener && i.listener.complete && i.listener.complete(i);
          for (let c = 0; c < n.length; c++) {
            const s = n[c];
            s.complete && s.complete(i);
          }
          break;
        case 5:
          const l = t[e++ + 2];
          i.listener && i.listener.event && i.listener.event(i, l);
          for (let c = 0; c < n.length; c++) {
            const s = n[c];
            s.event && s.event(i, l);
          }
          break;
      }
    }
    this.clear(), this.drainDisabled = !1;
  }
  clear() {
    this.objects.length = 0;
  }
}
const le = 0, Be = 1, Pe = 2, de = 3, Ys = 4, Re = 1, Is = 2;
class Cs {
  constructor(t) {
    if (this.animationToMixTime = {}, this.defaultMix = 0, !t)
      throw new Error("skeletonData cannot be null.");
    this.skeletonData = t;
  }
  /** Sets a mix duration by animation name.
   *
   * See {@link #setMixWith()}. */
  setMix(t, n, e) {
    const r = this.skeletonData.findAnimation(t);
    if (!r)
      throw new Error("Animation not found: " + t);
    const i = this.skeletonData.findAnimation(n);
    if (!i)
      throw new Error("Animation not found: " + n);
    this.setMixWith(r, i, e);
  }
  /** Sets the mix duration when changing from the specified animation to the other.
   *
   * See {@link TrackEntry#mixDuration}. */
  setMixWith(t, n, e) {
    if (!t)
      throw new Error("from cannot be null.");
    if (!n)
      throw new Error("to cannot be null.");
    const r = t.name + "." + n.name;
    this.animationToMixTime[r] = e;
  }
  /** Returns the mix duration to use when changing from the specified animation to the other, or the {@link #defaultMix} if
   * no mix duration has been set. */
  getMix(t, n) {
    const e = t.name + "." + n.name, r = this.animationToMixTime[e];
    return r === void 0 ? this.defaultMix : r;
  }
}
class ie extends ft {
  constructor(t) {
    super(t), this.color = new V(1, 1, 1, 1);
  }
  copy() {
    const t = new ie(this.name);
    return this.copyTo(t), t.color.setFromColor(this.color), t;
  }
}
class Dt extends ft {
  // ce3a3aff
  constructor(t) {
    super(t), this.endSlot = null, this.color = new V(0.2275, 0.2275, 0.8078, 1);
  }
  copy() {
    const t = new Dt(this.name);
    return this.copyTo(t), t.endSlot = this.endSlot, t.color.setFromColor(this.color), t;
  }
}
class Xs {
  constructor(t) {
    this._image = t;
  }
  getImage() {
    return this._image;
  }
}
var Z = /* @__PURE__ */ ((v) => (v[v.Nearest = 9728] = "Nearest", v[v.Linear = 9729] = "Linear", v[v.MipMap = 9987] = "MipMap", v[v.MipMapNearestNearest = 9984] = "MipMapNearestNearest", v[v.MipMapLinearNearest = 9985] = "MipMapLinearNearest", v[v.MipMapNearestLinear = 9986] = "MipMapNearestLinear", v[v.MipMapLinearLinear = 9987] = "MipMapLinearLinear", v))(Z || {}), vt = /* @__PURE__ */ ((v) => (v[v.MirroredRepeat = 33648] = "MirroredRepeat", v[v.ClampToEdge = 33071] = "ClampToEdge", v[v.Repeat = 10497] = "Repeat", v))(vt || {});
class Ms {
  constructor() {
    this.u = 0, this.v = 0, this.u2 = 0, this.v2 = 0, this.width = 0, this.height = 0, this.degrees = 0, this.offsetX = 0, this.offsetY = 0, this.originalWidth = 0, this.originalHeight = 0;
  }
}
class Ts {
  constructor(t) {
    this.pages = new Array(), this.regions = new Array();
    const n = new Fs(t), e = new Array(4), r = {};
    r.size = (a) => {
      a.width = parseInt(e[1]), a.height = parseInt(e[2]);
    }, r.format = () => {
    }, r.filter = (a) => {
      a.minFilter = P.enumValue(Z, e[1]), a.magFilter = P.enumValue(Z, e[2]);
    }, r.repeat = (a) => {
      e[1].indexOf("x") != -1 && (a.uWrap = vt.Repeat), e[1].indexOf("y") != -1 && (a.vWrap = vt.Repeat);
    }, r.pma = (a) => {
      a.pma = e[1] == "true";
    };
    const i = {};
    i.xy = (a) => {
      a.x = parseInt(e[1]), a.y = parseInt(e[2]);
    }, i.size = (a) => {
      a.width = parseInt(e[1]), a.height = parseInt(e[2]);
    }, i.bounds = (a) => {
      a.x = parseInt(e[1]), a.y = parseInt(e[2]), a.width = parseInt(e[3]), a.height = parseInt(e[4]);
    }, i.offset = (a) => {
      a.offsetX = parseInt(e[1]), a.offsetY = parseInt(e[2]);
    }, i.orig = (a) => {
      a.originalWidth = parseInt(e[1]), a.originalHeight = parseInt(e[2]);
    }, i.offsets = (a) => {
      a.offsetX = parseInt(e[1]), a.offsetY = parseInt(e[2]), a.originalWidth = parseInt(e[3]), a.originalHeight = parseInt(e[4]);
    }, i.rotate = (a) => {
      const h = e[1];
      h == "true" ? a.degrees = 90 : h != "false" && (a.degrees = parseInt(h));
    }, i.index = (a) => {
      a.index = parseInt(e[1]);
    };
    let l = n.readLine();
    for (; l && l.trim().length == 0; )
      l = n.readLine();
    for (; !(!l || l.trim().length == 0 || n.readEntry(e, l) == 0); )
      l = n.readLine();
    let c = null, s = null, o = null;
    for (; l !== null; )
      if (l.trim().length == 0)
        c = null, l = n.readLine();
      else if (c) {
        const a = new fs(c, l);
        for (; ; ) {
          const h = n.readEntry(e, l = n.readLine());
          if (h == 0)
            break;
          const d = i[e[0]];
          if (d)
            d(a);
          else {
            s || (s = []), o || (o = []), s.push(e[0]);
            const f = [];
            for (let u = 0; u < h; u++)
              f.push(parseInt(e[u + 1]));
            o.push(f);
          }
        }
        a.originalWidth == 0 && a.originalHeight == 0 && (a.originalWidth = a.width, a.originalHeight = a.height), s && s.length > 0 && o && o.length > 0 && (a.names = s, a.values = o, s = null, o = null), a.u = a.x / c.width, a.v = a.y / c.height, a.degrees == 90 ? (a.u2 = (a.x + a.height) / c.width, a.v2 = (a.y + a.width) / c.height) : (a.u2 = (a.x + a.width) / c.width, a.v2 = (a.y + a.height) / c.height), this.regions.push(a);
      } else {
        for (c = new Es(l.trim()); n.readEntry(e, l = n.readLine()) != 0; ) {
          const a = r[e[0]];
          a && a(c);
        }
        this.pages.push(c);
      }
  }
  dispose() {
    var t;
    for (let n = 0; n < this.pages.length; n++)
      (t = this.pages[n].texture) == null || t.dispose();
  }
  findRegion(t) {
    for (let n = 0; n < this.regions.length; n++)
      if (this.regions[n].name == t)
        return this.regions[n];
    return null;
  }
  setTextures(t, n = "") {
    for (const e of this.pages)
      e.setTexture(t.get(n + e.name));
  }
}
class Fs {
  constructor(t) {
    this.index = 0, this.lines = t.split(/\r\n|\r|\n/);
  }
  readLine() {
    return this.index >= this.lines.length ? null : this.lines[this.index++];
  }
  readEntry(t, n) {
    if (!n || (n = n.trim(), n.length == 0))
      return 0;
    const e = n.indexOf(":");
    if (e == -1)
      return 0;
    t[0] = n.substr(0, e).trim();
    for (let r = 1, i = e + 1; ; r++) {
      const l = n.indexOf(",", i);
      if (l == -1)
        return t[r] = n.substr(i).trim(), r;
      if (t[r] = n.substr(i, l - i).trim(), i = l + 1, r == 4)
        return 4;
    }
  }
}
class Es {
  constructor(t) {
    this.minFilter = Z.Nearest, this.magFilter = Z.Nearest, this.uWrap = vt.ClampToEdge, this.vWrap = vt.ClampToEdge, this.texture = null, this.width = 0, this.height = 0, this.pma = !1, this.regions = new Array(), this.name = t;
  }
  setTexture(t) {
    this.texture = t, t.setFilters(this.minFilter, this.magFilter), t.setWraps(this.uWrap, this.vWrap);
    for (const n of this.regions)
      n.texture = t;
  }
}
class fs extends Ms {
  constructor(t, n) {
    super(), this.offsetX = 0, this.offsetY = 0, this.originalWidth = 0, this.originalHeight = 0, this.degrees = 0, this.x = 0, this.y = 0, this.index = 0, this.names = null, this.values = null, this.page = t, this.name = n, t.regions.push(this);
  }
}
class mt extends ft {
  constructor(t, n) {
    super(t), this.region = null, this.color = new V(1, 1, 1, 1), this.sequence = null, this.regionUVs = [], this.uvs = [], this.triangles = [], this.width = 0, this.height = 0, this.hullLength = 0, this.edges = [], this.tempColor = new V(0, 0, 0, 0), this.parentMesh = null, this.path = n;
  }
  /** Calculates {@link #uvs} using the {@link #regionUVs} and region. Must be called if the region, the region's properties, or
   * the {@link #regionUVs} are changed. */
  updateRegion() {
    if (!this.region)
      throw new Error("Region not set.");
    const t = this.regionUVs;
    (!this.uvs || this.uvs.length != t.length) && (this.uvs = P.newFloatArray(t.length));
    const n = this.uvs, e = this.uvs.length;
    let r = this.region.u, i = this.region.v, l = 0, c = 0;
    if (this.region instanceof fs) {
      const s = this.region, o = s.page.texture.getImage(), a = o.width, h = o.height;
      switch (s.degrees) {
        case 90:
          r -= (s.originalHeight - s.offsetY - s.height) / a, i -= (s.originalWidth - s.offsetX - s.width) / h, l = s.originalHeight / a, c = s.originalWidth / h;
          for (let d = 0; d < e; d += 2)
            n[d] = r + t[d + 1] * l, n[d + 1] = i + (1 - t[d]) * c;
          return;
        case 180:
          r -= (s.originalWidth - s.offsetX - s.width) / a, i -= s.offsetY / h, l = s.originalWidth / a, c = s.originalHeight / h;
          for (let d = 0; d < e; d += 2)
            n[d] = r + (1 - t[d]) * l, n[d + 1] = i + (1 - t[d + 1]) * c;
          return;
        case 270:
          r -= s.offsetY / a, i -= s.offsetX / h, l = s.originalHeight / a, c = s.originalWidth / h;
          for (let d = 0; d < e; d += 2)
            n[d] = r + (1 - t[d + 1]) * l, n[d + 1] = i + t[d] * c;
          return;
      }
      r -= s.offsetX / a, i -= (s.originalHeight - s.offsetY - s.height) / h, l = s.originalWidth / a, c = s.originalHeight / h;
    } else
      this.region ? (l = this.region.u2 - r, c = this.region.v2 - i) : (r = i = 0, l = c = 1);
    for (let s = 0; s < e; s += 2)
      n[s] = r + t[s] * l, n[s + 1] = i + t[s + 1] * c;
  }
  copy() {
    if (this.parentMesh)
      return this.newLinkedMesh();
    const t = new mt(this.name, this.path);
    return t.region = this.region, t.color.setFromColor(this.color), this.copyTo(t), t.regionUVs = new Array(this.regionUVs.length), P.arrayCopy(this.regionUVs, 0, t.regionUVs, 0, this.regionUVs.length), t.uvs = new Array(this.uvs.length), P.arrayCopy(this.uvs, 0, t.uvs, 0, this.uvs.length), t.triangles = new Array(this.triangles.length), P.arrayCopy(this.triangles, 0, t.triangles, 0, this.triangles.length), t.hullLength = this.hullLength, t.sequence = this.sequence != null ? this.sequence.copy() : null, this.edges && (t.edges = new Array(this.edges.length), P.arrayCopy(this.edges, 0, t.edges, 0, this.edges.length)), t.width = this.width, t.height = this.height, t;
  }
  computeWorldVertices(t, n, e, r, i, l) {
    this.sequence != null && this.sequence.apply(t, this), super.computeWorldVertices(t, n, e, r, i, l);
  }
  /** The parent mesh if this is a linked mesh, else null. A linked mesh shares the {@link #bones}, {@link #vertices},
   * {@link #regionUVs}, {@link #triangles}, {@link #hullLength}, {@link #edges}, {@link #width}, and {@link #height} with the
   * parent mesh, but may have a different {@link #name} or {@link #path} (and therefore a different texture). */
  getParentMesh() {
    return this.parentMesh;
  }
  /** @param parentMesh May be null. */
  setParentMesh(t) {
    this.parentMesh = t, t && (this.bones = t.bones, this.vertices = t.vertices, this.worldVerticesLength = t.worldVerticesLength, this.regionUVs = t.regionUVs, this.triangles = t.triangles, this.hullLength = t.hullLength, this.worldVerticesLength = t.worldVerticesLength);
  }
  /** Returns a new mesh with the {@link #parentMesh} set to this mesh's parent mesh, if any, else to this mesh. **/
  newLinkedMesh() {
    const t = new mt(this.name, this.path);
    return t.region = this.region, t.color.setFromColor(this.color), t.timelineAttachment = this.timelineAttachment, t.setParentMesh(this.parentMesh ? this.parentMesh : this), t.region != null && t.updateRegion(), t;
  }
}
class Pt extends ft {
  constructor(t) {
    super(t), this.lengths = [], this.closed = !1, this.constantSpeed = !1, this.color = new V(1, 1, 1, 1);
  }
  copy() {
    const t = new Pt(this.name);
    return this.copyTo(t), t.lengths = new Array(this.lengths.length), P.arrayCopy(this.lengths, 0, t.lengths, 0, this.lengths.length), t.closed = closed, t.constantSpeed = this.constantSpeed, t.color.setFromColor(this.color), t;
  }
}
class ke extends ft {
  constructor(t) {
    super(t), this.x = 0, this.y = 0, this.rotation = 0, this.color = new V(0.38, 0.94, 0, 1);
  }
  copy() {
    const t = new ke(this.name);
    return t.x = this.x, t.y = this.y, t.rotation = this.rotation, t.color.setFromColor(this.color), t;
  }
  computeWorldPosition(t, n) {
    return n.x = this.x * t.a + this.y * t.b + t.worldX, n.y = this.x * t.c + this.y * t.d + t.worldY, n;
  }
  computeWorldRotation(t) {
    const n = M.cosDeg(this.rotation), e = M.sinDeg(this.rotation), r = n * t.a + e * t.b, i = n * t.c + e * t.d;
    return Math.atan2(i, r) * M.radDeg;
  }
}
const z = class z extends We {
  constructor(t, n) {
    super(t), this.color = new V(1, 1, 1, 1), this.region = null, this.sequence = null, this.x = 0, this.y = 0, this.scaleX = 1, this.scaleY = 1, this.rotation = 0, this.width = 0, this.height = 0, this.offset = P.newFloatArray(8), this.uvs = P.newFloatArray(8), this.tempColor = new V(1, 1, 1, 1), this.path = n;
  }
  /** Calculates the {@link #offset} using the region settings. Must be called after changing region settings. */
  updateRegion() {
    if (!this.region)
      throw new Error("Region not set.");
    const t = this.region, n = this.uvs;
    if (t == null) {
      n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 1, n[5] = 1, n[6] = 1, n[7] = 0;
      return;
    }
    const e = this.width / this.region.originalWidth * this.scaleX, r = this.height / this.region.originalHeight * this.scaleY, i = -this.width / 2 * this.scaleX + this.region.offsetX * e, l = -this.height / 2 * this.scaleY + this.region.offsetY * r, c = i + this.region.width * e, s = l + this.region.height * r, o = this.rotation * Math.PI / 180, a = Math.cos(o), h = Math.sin(o), d = this.x, f = this.y, u = i * a + d, m = i * h, x = l * a + f, y = l * h, b = c * a + d, g = c * h, p = s * a + f, w = s * h, S = this.offset;
    S[0] = u - y, S[1] = x + m, S[2] = u - w, S[3] = p + m, S[4] = b - w, S[5] = p + g, S[6] = b - y, S[7] = x + g, t.degrees == 90 ? (n[0] = t.u2, n[1] = t.v2, n[2] = t.u, n[3] = t.v2, n[4] = t.u, n[5] = t.v, n[6] = t.u2, n[7] = t.v) : (n[0] = t.u, n[1] = t.v2, n[2] = t.u, n[3] = t.v, n[4] = t.u2, n[5] = t.v, n[6] = t.u2, n[7] = t.v2);
  }
  copy() {
    const t = new z(this.name, this.path);
    return t.region = this.region, t.x = this.x, t.y = this.y, t.scaleX = this.scaleX, t.scaleY = this.scaleY, t.rotation = this.rotation, t.width = this.width, t.height = this.height, P.arrayCopy(this.uvs, 0, t.uvs, 0, 8), P.arrayCopy(this.offset, 0, t.offset, 0, 8), t.color.setFromColor(this.color), t.sequence = this.sequence != null ? this.sequence.copy() : null, t;
  }
  /** Transforms the attachment's four vertices to world coordinates. If the attachment has a {@link #sequence}, the region may
   * be changed.
   * <p>
   * See <a href="http://esotericsoftware.com/spine-runtime-skeletons#World-transforms">World transforms</a> in the Spine
   * Runtimes Guide.
   * @param worldVertices The output world vertices. Must have a length >= <code>offset</code> + 8.
   * @param offset The <code>worldVertices</code> index to begin writing values.
   * @param stride The number of <code>worldVertices</code> entries between the value pairs written. */
  computeWorldVertices(t, n, e, r) {
    this.sequence != null && this.sequence.apply(t, this);
    const i = t.bone, l = this.offset, c = i.worldX, s = i.worldY, o = i.a, a = i.b, h = i.c, d = i.d;
    let f = 0, u = 0;
    f = l[0], u = l[1], n[e] = f * o + u * a + c, n[e + 1] = f * h + u * d + s, e += r, f = l[2], u = l[3], n[e] = f * o + u * a + c, n[e + 1] = f * h + u * d + s, e += r, f = l[4], u = l[5], n[e] = f * o + u * a + c, n[e + 1] = f * h + u * d + s, e += r, f = l[6], u = l[7], n[e] = f * o + u * a + c, n[e + 1] = f * h + u * d + s;
  }
};
z.X1 = 0, z.Y1 = 1, z.C1R = 2, z.C1G = 3, z.C1B = 4, z.C1A = 5, z.U1 = 6, z.V1 = 7, z.X2 = 8, z.Y2 = 9, z.C2R = 10, z.C2G = 11, z.C2B = 12, z.C2A = 13, z.U2 = 14, z.V2 = 15, z.X3 = 16, z.Y3 = 17, z.C3R = 18, z.C3G = 19, z.C3B = 20, z.C3A = 21, z.U3 = 22, z.V3 = 23, z.X4 = 24, z.Y4 = 25, z.C4R = 26, z.C4G = 27, z.C4B = 28, z.C4A = 29, z.U4 = 30, z.V4 = 31;
let wt = z;
class Bs {
  constructor(t) {
    this.atlas = t;
  }
  newRegionAttachment(t, n, e, r) {
    const i = new wt(n, e);
    if (r != null)
      this.loadSequence(n, e, r);
    else {
      const l = this.atlas.findRegion(e);
      if (!l)
        throw new Error("Region not found in atlas: " + e + " (region attachment: " + n + ")");
      i.region = l;
    }
    return i;
  }
  newMeshAttachment(t, n, e, r) {
    const i = new mt(n, e);
    if (r != null)
      this.loadSequence(n, e, r);
    else {
      const l = this.atlas.findRegion(e);
      if (!l)
        throw new Error("Region not found in atlas: " + e + " (mesh attachment: " + n + ")");
      i.region = l;
    }
    return i;
  }
  newBoundingBoxAttachment(t, n) {
    return new ie(n);
  }
  newPathAttachment(t, n) {
    return new Pt(n);
  }
  newPointAttachment(t, n) {
    return new ke(n);
  }
  newClippingAttachment(t, n) {
    return new Dt(n);
  }
  loadSequence(t, n, e) {
    const r = e.regions;
    for (let i = 0, l = r.length; i < l; i++) {
      const c = e.getPath(n, i), s = this.atlas.findRegion(c);
      if (s == null)
        throw new Error("Region not found in atlas: " + c + " (sequence: " + t + ")");
      r[i] = s;
    }
  }
}
class us {
  constructor(t, n, e) {
    if (this.index = 0, this.parent = null, this.length = 0, this.x = 0, this.y = 0, this.rotation = 0, this.scaleX = 1, this.scaleY = 1, this.shearX = 0, this.shearY = 0, this.transformMode = 0, this.skinRequired = !1, this.color = new V(), t < 0)
      throw new Error("index must be >= 0.");
    if (!n)
      throw new Error("name cannot be null.");
    this.index = t, this.name = n, this.parent = e;
  }
}
var ot = /* @__PURE__ */ ((v) => (v[v.Normal = 0] = "Normal", v[v.OnlyTranslation = 1] = "OnlyTranslation", v[v.NoRotationOrReflection = 2] = "NoRotationOrReflection", v[v.NoScale = 3] = "NoScale", v[v.NoScaleOrReflection = 4] = "NoScaleOrReflection", v))(ot || {});
class Le {
  /** @param parent May be null. */
  constructor(t, n, e) {
    if (this.parent = null, this.children = new Array(), this.x = 0, this.y = 0, this.rotation = 0, this.scaleX = 0, this.scaleY = 0, this.shearX = 0, this.shearY = 0, this.ax = 0, this.ay = 0, this.arotation = 0, this.ascaleX = 0, this.ascaleY = 0, this.ashearX = 0, this.ashearY = 0, this.a = 0, this.b = 0, this.c = 0, this.d = 0, this.worldY = 0, this.worldX = 0, this.sorted = !1, this.active = !1, !t)
      throw new Error("data cannot be null.");
    if (!n)
      throw new Error("skeleton cannot be null.");
    this.data = t, this.skeleton = n, this.parent = e, this.setToSetupPose();
  }
  /** Returns false when the bone has not been computed because {@link BoneData#skinRequired} is true and the
   * {@link Skeleton#skin active skin} does not {@link Skin#bones contain} this bone. */
  isActive() {
    return this.active;
  }
  /** Computes the world transform using the parent bone and this bone's local applied transform. */
  update() {
    this.updateWorldTransformWith(
      this.ax,
      this.ay,
      this.arotation,
      this.ascaleX,
      this.ascaleY,
      this.ashearX,
      this.ashearY
    );
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
  updateWorldTransformWith(t, n, e, r, i, l, c) {
    this.ax = t, this.ay = n, this.arotation = e, this.ascaleX = r, this.ascaleY = i, this.ashearX = l, this.ashearY = c;
    const s = this.parent;
    if (!s) {
      const f = this.skeleton, u = e + 90 + c, m = f.scaleX, x = f.scaleY;
      this.a = M.cosDeg(e + l) * r * m, this.b = M.cosDeg(u) * i * m, this.c = M.sinDeg(e + l) * r * x, this.d = M.sinDeg(u) * i * x, this.worldX = t * m + f.x, this.worldY = n * x + f.y;
      return;
    }
    let o = s.a, a = s.b, h = s.c, d = s.d;
    switch (this.worldX = o * t + a * n + s.worldX, this.worldY = h * t + d * n + s.worldY, this.data.transformMode) {
      case ot.Normal: {
        const f = e + 90 + c, u = M.cosDeg(e + l) * r, m = M.cosDeg(f) * i, x = M.sinDeg(e + l) * r, y = M.sinDeg(f) * i;
        this.a = o * u + a * x, this.b = o * m + a * y, this.c = h * u + d * x, this.d = h * m + d * y;
        return;
      }
      case ot.OnlyTranslation: {
        const f = e + 90 + c;
        this.a = M.cosDeg(e + l) * r, this.b = M.cosDeg(f) * i, this.c = M.sinDeg(e + l) * r, this.d = M.sinDeg(f) * i;
        break;
      }
      case ot.NoRotationOrReflection: {
        let f = o * o + h * h, u = 0;
        f > 1e-4 ? (f = Math.abs(o * d - a * h) / f, o /= this.skeleton.scaleX, h /= this.skeleton.scaleY, a = h * f, d = o * f, u = Math.atan2(h, o) * M.radDeg) : (o = 0, h = 0, u = 90 - Math.atan2(d, a) * M.radDeg);
        const m = e + l - u, x = e + c - u + 90, y = M.cosDeg(m) * r, b = M.cosDeg(x) * i, g = M.sinDeg(m) * r, p = M.sinDeg(x) * i;
        this.a = o * y - a * g, this.b = o * b - a * p, this.c = h * y + d * g, this.d = h * b + d * p;
        break;
      }
      case ot.NoScale:
      case ot.NoScaleOrReflection: {
        const f = M.cosDeg(e), u = M.sinDeg(e);
        let m = (o * f + a * u) / this.skeleton.scaleX, x = (h * f + d * u) / this.skeleton.scaleY, y = Math.sqrt(m * m + x * x);
        y > 1e-5 && (y = 1 / y), m *= y, x *= y, y = Math.sqrt(m * m + x * x), this.data.transformMode == ot.NoScale && o * d - a * h < 0 != (this.skeleton.scaleX < 0 != this.skeleton.scaleY < 0) && (y = -y);
        const b = Math.PI / 2 + Math.atan2(x, m), g = Math.cos(b) * y, p = Math.sin(b) * y, w = M.cosDeg(l) * r, S = M.cosDeg(90 + c) * i, k = M.sinDeg(l) * r, A = M.sinDeg(90 + c) * i;
        this.a = m * w + g * k, this.b = m * S + g * A, this.c = x * w + p * k, this.d = x * S + p * A;
        break;
      }
    }
    this.a *= this.skeleton.scaleX, this.b *= this.skeleton.scaleX, this.c *= this.skeleton.scaleY, this.d *= this.skeleton.scaleY;
  }
  /** Sets this bone's local transform to the setup pose. */
  setToSetupPose() {
    const t = this.data;
    this.x = t.x, this.y = t.y, this.rotation = t.rotation, this.scaleX = t.scaleX, this.scaleY = t.scaleY, this.shearX = t.shearX, this.shearY = t.shearY;
  }
  /** The world rotation for the X axis, calculated using {@link #a} and {@link #c}. */
  getWorldRotationX() {
    return Math.atan2(this.c, this.a) * M.radDeg;
  }
  /** The world rotation for the Y axis, calculated using {@link #b} and {@link #d}. */
  getWorldRotationY() {
    return Math.atan2(this.d, this.b) * M.radDeg;
  }
  /** The magnitude (always positive) of the world scale X, calculated using {@link #a} and {@link #c}. */
  getWorldScaleX() {
    return Math.sqrt(this.a * this.a + this.c * this.c);
  }
  /** The magnitude (always positive) of the world scale Y, calculated using {@link #b} and {@link #d}. */
  getWorldScaleY() {
    return Math.sqrt(this.b * this.b + this.d * this.d);
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
    const t = this.parent;
    if (!t) {
      this.ax = this.worldX - this.skeleton.x, this.ay = this.worldY - this.skeleton.y, this.arotation = Math.atan2(this.c, this.a) * M.radDeg, this.ascaleX = Math.sqrt(this.a * this.a + this.c * this.c), this.ascaleY = Math.sqrt(this.b * this.b + this.d * this.d), this.ashearX = 0, this.ashearY = Math.atan2(this.a * this.b + this.c * this.d, this.a * this.d - this.b * this.c) * M.radDeg;
      return;
    }
    const n = t.a, e = t.b, r = t.c, i = t.d, l = 1 / (n * i - e * r), c = this.worldX - t.worldX, s = this.worldY - t.worldY;
    this.ax = c * i * l - s * e * l, this.ay = s * n * l - c * r * l;
    const o = l * i, a = l * n, h = l * e, d = l * r, f = o * this.a - h * this.c, u = o * this.b - h * this.d, m = a * this.c - d * this.a, x = a * this.d - d * this.b;
    if (this.ashearX = 0, this.ascaleX = Math.sqrt(f * f + m * m), this.ascaleX > 1e-4) {
      const y = f * x - u * m;
      this.ascaleY = y / this.ascaleX, this.ashearY = Math.atan2(f * u + m * x, y) * M.radDeg, this.arotation = Math.atan2(m, f) * M.radDeg;
    } else
      this.ascaleX = 0, this.ascaleY = Math.sqrt(u * u + x * x), this.ashearY = 0, this.arotation = 90 - Math.atan2(x, u) * M.radDeg;
  }
  /** Transforms a point from world coordinates to the bone's local coordinates. */
  worldToLocal(t) {
    const n = 1 / (this.a * this.d - this.b * this.c), e = t.x - this.worldX, r = t.y - this.worldY;
    return t.x = e * this.d * n - r * this.b * n, t.y = r * this.a * n - e * this.c * n, t;
  }
  /** Transforms a point from the bone's local coordinates to world coordinates. */
  localToWorld(t) {
    const n = t.x, e = t.y;
    return t.x = n * this.a + e * this.b + this.worldX, t.y = n * this.c + e * this.d + this.worldY, t;
  }
  /** Transforms a world rotation to a local rotation. */
  worldToLocalRotation(t) {
    const n = M.sinDeg(t), e = M.cosDeg(t);
    return Math.atan2(this.a * n - this.c * e, this.d * e - this.b * n) * M.radDeg + this.rotation - this.shearX;
  }
  /** Transforms a local rotation to a world rotation. */
  localToWorldRotation(t) {
    t -= this.rotation - this.shearX;
    const n = M.sinDeg(t), e = M.cosDeg(t);
    return Math.atan2(e * this.c + n * this.d, e * this.a + n * this.b) * M.radDeg;
  }
  /** Rotates the world transform the specified amount.
   * <p>
   * After changes are made to the world transform, {@link #updateAppliedTransform()} should be called and {@link #update()} will
   * need to be called on any child bones, recursively. */
  rotateWorld(t) {
    const n = this.a, e = this.b, r = this.c, i = this.d, l = M.cosDeg(t), c = M.sinDeg(t);
    this.a = l * n - c * r, this.b = l * e - c * i, this.c = c * n + l * r, this.d = c * e + l * i;
  }
}
class Ae {
  constructor(t, n, e) {
    this.name = t, this.order = n, this.skinRequired = e;
  }
}
class ms {
  constructor(t, n) {
    if (this.intValue = 0, this.floatValue = 0, this.stringValue = null, this.time = 0, this.volume = 0, this.balance = 0, !n)
      throw new Error("data cannot be null.");
    this.time = t, this.data = n;
  }
}
class gs {
  constructor(t) {
    this.intValue = 0, this.floatValue = 0, this.stringValue = null, this.audioPath = null, this.volume = 0, this.balance = 0, this.name = t;
  }
}
class Ps {
  constructor(t, n) {
    if (this.bendDirection = 0, this.compress = !1, this.stretch = !1, this.mix = 1, this.softness = 0, this.active = !1, !t)
      throw new Error("data cannot be null.");
    if (!n)
      throw new Error("skeleton cannot be null.");
    this.data = t, this.mix = t.mix, this.softness = t.softness, this.bendDirection = t.bendDirection, this.compress = t.compress, this.stretch = t.stretch, this.bones = new Array();
    for (let r = 0; r < t.bones.length; r++) {
      const i = n.findBone(t.bones[r].name);
      if (!i)
        throw new Error(`Couldn't find bone ${t.bones[r].name}`);
      this.bones.push(i);
    }
    const e = n.findBone(t.target.name);
    if (!e)
      throw new Error(`Couldn't find bone ${t.target.name}`);
    this.target = e;
  }
  isActive() {
    return this.active;
  }
  update() {
    if (this.mix == 0)
      return;
    const t = this.target, n = this.bones;
    switch (n.length) {
      case 1:
        this.apply1(n[0], t.worldX, t.worldY, this.compress, this.stretch, this.data.uniform, this.mix);
        break;
      case 2:
        this.apply2(
          n[0],
          n[1],
          t.worldX,
          t.worldY,
          this.bendDirection,
          this.stretch,
          this.data.uniform,
          this.softness,
          this.mix
        );
        break;
    }
  }
  /** Applies 1 bone IK. The target is specified in the world coordinate system. */
  apply1(t, n, e, r, i, l, c) {
    const s = t.parent;
    if (!s)
      throw new Error("IK bone must have parent.");
    let o = s.a, a = s.b, h = s.c, d = s.d, f = -t.ashearX - t.arotation, u = 0, m = 0;
    switch (t.data.transformMode) {
      case ot.OnlyTranslation:
        u = (n - t.worldX) * M.signum(t.skeleton.scaleX), m = (e - t.worldY) * M.signum(t.skeleton.scaleY);
        break;
      case ot.NoRotationOrReflection:
        const b = Math.abs(o * d - a * h) / Math.max(1e-4, o * o + h * h), g = o / t.skeleton.scaleX, p = h / t.skeleton.scaleY;
        a = -p * b * t.skeleton.scaleX, d = g * b * t.skeleton.scaleY, f += Math.atan2(p, g) * M.radDeg;
      default:
        const w = n - s.worldX, S = e - s.worldY, k = o * d - a * h;
        Math.abs(k) <= 1e-4 ? (u = 0, m = 0) : (u = (w * d - S * a) / k - t.ax, m = (S * o - w * h) / k - t.ay);
    }
    f += Math.atan2(m, u) * M.radDeg, t.ascaleX < 0 && (f += 180), f > 180 ? f -= 360 : f < -180 && (f += 360);
    let x = t.ascaleX, y = t.ascaleY;
    if (r || i) {
      switch (t.data.transformMode) {
        case ot.NoScale:
        case ot.NoScaleOrReflection:
          u = n - t.worldX, m = e - t.worldY;
      }
      const b = t.data.length * x, g = Math.sqrt(u * u + m * m);
      if (r && g < b || i && g > b && b > 1e-4) {
        const p = (g / b - 1) * c + 1;
        x *= p, l && (y *= p);
      }
    }
    t.updateWorldTransformWith(
      t.ax,
      t.ay,
      t.arotation + f * c,
      x,
      y,
      t.ashearX,
      t.ashearY
    );
  }
  /** Applies 2 bone IK. The target is specified in the world coordinate system.
   * @param child A direct descendant of the parent bone. */
  apply2(t, n, e, r, i, l, c, s, o) {
    let a = t.ax, h = t.ay, d = t.ascaleX, f = t.ascaleY, u = d, m = f, x = n.ascaleX, y = 0, b = 0, g = 0;
    d < 0 ? (d = -d, y = 180, g = -1) : (y = 0, g = 1), f < 0 && (f = -f, g = -g), x < 0 ? (x = -x, b = 180) : b = 0;
    let p = n.ax, w = 0, S = 0, k = 0, A = t.a, C = t.b, X = t.c, F = t.d;
    const R = Math.abs(d - f) <= 1e-4;
    !R || l ? (w = 0, S = A * p + t.worldX, k = X * p + t.worldY) : (w = n.ay, S = A * p + C * w + t.worldX, k = X * p + F * w + t.worldY);
    const B = t.parent;
    if (!B)
      throw new Error("IK parent must itself have a parent.");
    A = B.a, C = B.b, X = B.c, F = B.d;
    let E = A * F - C * X, I = S - B.worldX, T = k - B.worldY;
    E = Math.abs(E) <= 1e-4 ? 0 : 1 / E;
    const N = (I * F - T * C) * E - a, O = (T * A - I * X) * E - h;
    let L = Math.sqrt(N * N + O * O), H = n.data.length * x, _, j;
    if (L < 1e-4) {
      this.apply1(t, e, r, !1, l, !1, o), n.updateWorldTransformWith(p, w, 0, n.ascaleX, n.ascaleY, n.ashearX, n.ashearY);
      return;
    }
    I = e - B.worldX, T = r - B.worldY;
    let U = (I * F - T * C) * E - a, D = (T * A - I * X) * E - h, G = U * U + D * D;
    if (s != 0) {
      s *= d * (x + 1) * 0.5;
      const J = Math.sqrt(G), it = J - L - H * d + s;
      if (it > 0) {
        let rt = Math.min(1, it / (s * 2)) - 1;
        rt = (it - s * (1 - rt * rt)) / J, U -= rt * U, D -= rt * D, G = U * U + D * D;
      }
    }
    t:
      if (R) {
        H *= d;
        let J = (G - L * L - H * H) / (2 * L * H);
        J < -1 ? (J = -1, j = Math.PI * i) : J > 1 ? (J = 1, j = 0, l && (A = (Math.sqrt(G) / (L + H) - 1) * o + 1, u *= A, c && (m *= A))) : j = Math.acos(J) * i, A = L + H * J, C = H * Math.sin(j), _ = Math.atan2(D * A - U * C, U * A + D * C);
      } else {
        A = d * H, C = f * H;
        const J = A * A, it = C * C, rt = Math.atan2(D, U);
        X = it * L * L + J * G - J * it;
        const yt = -2 * it * L, Ct = it - J;
        if (F = yt * yt - 4 * Ct * X, F >= 0) {
          let Xt = Math.sqrt(F);
          yt < 0 && (Xt = -Xt), Xt = -(yt + Xt) * 0.5;
          const Me = Xt / Ct, Te = X / Xt, Mt = Math.abs(Me) < Math.abs(Te) ? Me : Te;
          if (Mt * Mt <= G) {
            T = Math.sqrt(G - Mt * Mt) * i, _ = rt - Math.atan2(T, Mt), j = Math.atan2(T / f, (Mt - L) / d);
            break t;
          }
        }
        let Rt = M.PI, Ut = L - A, re = Ut * Ut, Ie = 0, Ce = 0, Ot = L + A, ae = Ot * Ot, Xe = 0;
        X = -A * L / (J - it), X >= -1 && X <= 1 && (X = Math.acos(X), I = A * Math.cos(X) + L, T = C * Math.sin(X), F = I * I + T * T, F < re && (Rt = X, re = F, Ut = I, Ie = T), F > ae && (Ce = X, ae = F, Ot = I, Xe = T)), G <= (re + ae) * 0.5 ? (_ = rt - Math.atan2(Ie * i, Ut), j = Rt * i) : (_ = rt - Math.atan2(Xe * i, Ot), j = Ce * i);
      }
    const et = Math.atan2(w, p) * g;
    let ct = t.arotation;
    _ = (_ - et) * M.radDeg + y - ct, _ > 180 ? _ -= 360 : _ < -180 && (_ += 360), t.updateWorldTransformWith(a, h, ct + _ * o, u, m, 0, 0), ct = n.arotation, j = ((j + et) * M.radDeg - n.ashearX) * g + b - ct, j > 180 ? j -= 360 : j < -180 && (j += 360), n.updateWorldTransformWith(
      p,
      w,
      ct + j * o,
      n.ascaleX,
      n.ascaleY,
      n.ashearX,
      n.ashearY
    );
  }
}
class xs extends Ae {
  constructor(t) {
    super(t, 0, !1), this.bones = new Array(), this.bendDirection = 1, this.compress = !1, this.stretch = !1, this.uniform = !1, this.mix = 1, this.softness = 0, this._target = null;
  }
  get target() {
    if (this._target)
      return this._target;
    throw new Error("BoneData not set.");
  }
  set target(t) {
    this._target = t;
  }
}
class ps extends Ae {
  constructor(t) {
    super(t, 0, !1), this.bones = new Array(), this.positionMode = 0, this.spacingMode = 1, this.rotateMode = 1, this.offsetRotation = 0, this.position = 0, this.spacing = 0, this.mixRotate = 0, this.mixX = 0, this.mixY = 0, this._target = null;
  }
  get target() {
    if (this._target)
      return this._target;
    throw new Error("SlotData not set.");
  }
  set target(t) {
    this._target = t;
  }
}
var kt = /* @__PURE__ */ ((v) => (v[v.Fixed = 0] = "Fixed", v[v.Percent = 1] = "Percent", v))(kt || {}), tt = /* @__PURE__ */ ((v) => (v[v.Length = 0] = "Length", v[v.Fixed = 1] = "Fixed", v[v.Percent = 2] = "Percent", v[v.Proportional = 3] = "Proportional", v))(tt || {}), Vt = /* @__PURE__ */ ((v) => (v[v.Tangent = 0] = "Tangent", v[v.Chain = 1] = "Chain", v[v.ChainScale = 2] = "ChainScale", v))(Vt || {});
const nt = class nt {
  constructor(t, n) {
    if (this.position = 0, this.spacing = 0, this.mixRotate = 0, this.mixX = 0, this.mixY = 0, this.spaces = new Array(), this.positions = new Array(), this.world = new Array(), this.curves = new Array(), this.lengths = new Array(), this.segments = new Array(), this.active = !1, !t)
      throw new Error("data cannot be null.");
    if (!n)
      throw new Error("skeleton cannot be null.");
    this.data = t, this.bones = new Array();
    for (let r = 0, i = t.bones.length; r < i; r++) {
      const l = n.findBone(t.bones[r].name);
      if (!l)
        throw new Error(`Couldn't find bone ${t.bones[r].name}.`);
      this.bones.push(l);
    }
    const e = n.findSlot(t.target.name);
    if (!e)
      throw new Error(`Couldn't find target bone ${t.target.name}`);
    this.target = e, this.position = t.position, this.spacing = t.spacing, this.mixRotate = t.mixRotate, this.mixX = t.mixX, this.mixY = t.mixY;
  }
  isActive() {
    return this.active;
  }
  update() {
    const t = this.target.getAttachment();
    if (!(t instanceof Pt))
      return;
    const n = this.mixRotate, e = this.mixX, r = this.mixY;
    if (n == 0 && e == 0 && r == 0)
      return;
    const i = this.data, l = i.rotateMode == Vt.Tangent, c = i.rotateMode == Vt.ChainScale, s = this.bones, o = s.length, a = l ? o : o + 1, h = P.setArraySize(this.spaces, a), d = c ? this.lengths = P.setArraySize(this.lengths, o) : [], f = this.spacing;
    switch (i.spacingMode) {
      case tt.Percent:
        if (c)
          for (let w = 0, S = a - 1; w < S; w++) {
            const k = s[w], A = k.data.length;
            if (A < nt.epsilon)
              d[w] = 0;
            else {
              const C = A * k.a, X = A * k.c;
              d[w] = Math.sqrt(C * C + X * X);
            }
          }
        P.arrayFill(h, 1, a, f);
        break;
      case tt.Proportional:
        let g = 0;
        for (let w = 0, S = a - 1; w < S; ) {
          const k = s[w], A = k.data.length;
          if (A < nt.epsilon)
            c && (d[w] = 0), h[++w] = f;
          else {
            const C = A * k.a, X = A * k.c, F = Math.sqrt(C * C + X * X);
            c && (d[w] = F), h[++w] = F, g += F;
          }
        }
        if (g > 0) {
          g = a / g * f;
          for (let w = 1; w < a; w++)
            h[w] *= g;
        }
        break;
      default:
        const p = i.spacingMode == tt.Length;
        for (let w = 0, S = a - 1; w < S; ) {
          const k = s[w], A = k.data.length;
          if (A < nt.epsilon)
            c && (d[w] = 0), h[++w] = f;
          else {
            const C = A * k.a, X = A * k.c, F = Math.sqrt(C * C + X * X);
            c && (d[w] = F), h[++w] = (p ? A + f : f) * F / A;
          }
        }
    }
    const u = this.computeWorldPositions(t, a, l);
    let m = u[0], x = u[1], y = i.offsetRotation, b = !1;
    if (y == 0)
      b = i.rotateMode == Vt.Chain;
    else {
      b = !1;
      const g = this.target.bone;
      y *= g.a * g.d - g.b * g.c > 0 ? M.degRad : -M.degRad;
    }
    for (let g = 0, p = 3; g < o; g++, p += 3) {
      const w = s[g];
      w.worldX += (m - w.worldX) * e, w.worldY += (x - w.worldY) * r;
      const S = u[p], k = u[p + 1], A = S - m, C = k - x;
      if (c) {
        const X = d[g];
        if (X != 0) {
          const F = (Math.sqrt(A * A + C * C) / X - 1) * n + 1;
          w.a *= F, w.c *= F;
        }
      }
      if (m = S, x = k, n > 0) {
        let X = w.a, F = w.b, R = w.c, B = w.d, E = 0, I = 0, T = 0;
        if (l ? E = u[p - 1] : h[g + 1] == 0 ? E = u[p + 2] : E = Math.atan2(C, A), E -= Math.atan2(R, X), b) {
          I = Math.cos(E), T = Math.sin(E);
          const N = w.data.length;
          m += (N * (I * X - T * R) - A) * n, x += (N * (T * X + I * R) - C) * n;
        } else
          E += y;
        E > M.PI ? E -= M.PI2 : E < -M.PI && (E += M.PI2), E *= n, I = Math.cos(E), T = Math.sin(E), w.a = I * X - T * R, w.b = I * F - T * B, w.c = T * X + I * R, w.d = T * F + I * B;
      }
      w.updateAppliedTransform();
    }
  }
  computeWorldPositions(t, n, e) {
    const r = this.target;
    let i = this.position, l = this.spaces, c = P.setArraySize(this.positions, n * 3 + 2), s = this.world;
    const o = t.closed;
    let a = t.worldVerticesLength, h = a / 6, d = nt.NONE;
    if (!t.constantSpeed) {
      const O = t.lengths;
      h -= o ? 1 : 2;
      const L = O[h];
      this.data.positionMode == kt.Percent && (i *= L);
      let H;
      switch (this.data.spacingMode) {
        case tt.Percent:
          H = L;
          break;
        case tt.Proportional:
          H = L / n;
          break;
        default:
          H = 1;
      }
      s = P.setArraySize(this.world, 8);
      for (let _ = 0, j = 0, U = 0; _ < n; _++, j += 3) {
        const D = l[_] * H;
        i += D;
        let G = i;
        if (o)
          G %= L, G < 0 && (G += L), U = 0;
        else if (G < 0) {
          d != nt.BEFORE && (d = nt.BEFORE, t.computeWorldVertices(r, 2, 4, s, 0, 2)), this.addBeforePosition(G, s, 0, c, j);
          continue;
        } else if (G > L) {
          d != nt.AFTER && (d = nt.AFTER, t.computeWorldVertices(r, a - 6, 4, s, 0, 2)), this.addAfterPosition(G - L, s, 0, c, j);
          continue;
        }
        for (; ; U++) {
          const et = O[U];
          if (!(G > et)) {
            if (U == 0)
              G /= et;
            else {
              const ct = O[U - 1];
              G = (G - ct) / (et - ct);
            }
            break;
          }
        }
        U != d && (d = U, o && U == h ? (t.computeWorldVertices(r, a - 4, 4, s, 0, 2), t.computeWorldVertices(r, 0, 4, s, 4, 2)) : t.computeWorldVertices(r, U * 6 + 2, 8, s, 0, 2)), this.addCurvePosition(
          G,
          s[0],
          s[1],
          s[2],
          s[3],
          s[4],
          s[5],
          s[6],
          s[7],
          c,
          j,
          e || _ > 0 && D == 0
        );
      }
      return c;
    }
    o ? (a += 2, s = P.setArraySize(this.world, a), t.computeWorldVertices(r, 2, a - 4, s, 0, 2), t.computeWorldVertices(r, 0, 2, s, a - 4, 2), s[a - 2] = s[0], s[a - 1] = s[1]) : (h--, a -= 4, s = P.setArraySize(this.world, a), t.computeWorldVertices(r, 2, a, s, 0, 2));
    const f = P.setArraySize(this.curves, h);
    let u = 0, m = s[0], x = s[1], y = 0, b = 0, g = 0, p = 0, w = 0, S = 0, k = 0, A = 0, C = 0, X = 0, F = 0, R = 0, B = 0, E = 0;
    for (let O = 0, L = 2; O < h; O++, L += 6)
      y = s[L], b = s[L + 1], g = s[L + 2], p = s[L + 3], w = s[L + 4], S = s[L + 5], k = (m - y * 2 + g) * 0.1875, A = (x - b * 2 + p) * 0.1875, C = ((y - g) * 3 - m + w) * 0.09375, X = ((b - p) * 3 - x + S) * 0.09375, F = k * 2 + C, R = A * 2 + X, B = (y - m) * 0.75 + k + C * 0.16666667, E = (b - x) * 0.75 + A + X * 0.16666667, u += Math.sqrt(B * B + E * E), B += F, E += R, F += C, R += X, u += Math.sqrt(B * B + E * E), B += F, E += R, u += Math.sqrt(B * B + E * E), B += F + C, E += R + X, u += Math.sqrt(B * B + E * E), f[O] = u, m = w, x = S;
    this.data.positionMode == kt.Percent && (i *= u);
    let I;
    switch (this.data.spacingMode) {
      case tt.Percent:
        I = u;
        break;
      case tt.Proportional:
        I = u / n;
        break;
      default:
        I = 1;
    }
    const T = this.segments;
    let N = 0;
    for (let O = 0, L = 0, H = 0, _ = 0; O < n; O++, L += 3) {
      const j = l[O] * I;
      i += j;
      let U = i;
      if (o)
        U %= u, U < 0 && (U += u), H = 0;
      else if (U < 0) {
        this.addBeforePosition(U, s, 0, c, L);
        continue;
      } else if (U > u) {
        this.addAfterPosition(U - u, s, a - 4, c, L);
        continue;
      }
      for (; ; H++) {
        const D = f[H];
        if (!(U > D)) {
          if (H == 0)
            U /= D;
          else {
            const G = f[H - 1];
            U = (U - G) / (D - G);
          }
          break;
        }
      }
      if (H != d) {
        d = H;
        let D = H * 6;
        for (m = s[D], x = s[D + 1], y = s[D + 2], b = s[D + 3], g = s[D + 4], p = s[D + 5], w = s[D + 6], S = s[D + 7], k = (m - y * 2 + g) * 0.03, A = (x - b * 2 + p) * 0.03, C = ((y - g) * 3 - m + w) * 6e-3, X = ((b - p) * 3 - x + S) * 6e-3, F = k * 2 + C, R = A * 2 + X, B = (y - m) * 0.3 + k + C * 0.16666667, E = (b - x) * 0.3 + A + X * 0.16666667, N = Math.sqrt(B * B + E * E), T[0] = N, D = 1; D < 8; D++)
          B += F, E += R, F += C, R += X, N += Math.sqrt(B * B + E * E), T[D] = N;
        B += F, E += R, N += Math.sqrt(B * B + E * E), T[8] = N, B += F + C, E += R + X, N += Math.sqrt(B * B + E * E), T[9] = N, _ = 0;
      }
      for (U *= N; ; _++) {
        const D = T[_];
        if (!(U > D)) {
          if (_ == 0)
            U /= D;
          else {
            const G = T[_ - 1];
            U = _ + (U - G) / (D - G);
          }
          break;
        }
      }
      this.addCurvePosition(U * 0.1, m, x, y, b, g, p, w, S, c, L, e || O > 0 && j == 0);
    }
    return c;
  }
  addBeforePosition(t, n, e, r, i) {
    const l = n[e], c = n[e + 1], s = n[e + 2] - l, o = n[e + 3] - c, a = Math.atan2(o, s);
    r[i] = l + t * Math.cos(a), r[i + 1] = c + t * Math.sin(a), r[i + 2] = a;
  }
  addAfterPosition(t, n, e, r, i) {
    const l = n[e + 2], c = n[e + 3], s = l - n[e], o = c - n[e + 1], a = Math.atan2(o, s);
    r[i] = l + t * Math.cos(a), r[i + 1] = c + t * Math.sin(a), r[i + 2] = a;
  }
  addCurvePosition(t, n, e, r, i, l, c, s, o, a, h, d) {
    if (t == 0 || isNaN(t)) {
      a[h] = n, a[h + 1] = e, a[h + 2] = Math.atan2(i - e, r - n);
      return;
    }
    const f = t * t, u = f * t, m = 1 - t, x = m * m, y = x * m, b = m * t, g = b * 3, p = m * g, w = g * t, S = n * y + r * p + l * w + s * u, k = e * y + i * p + c * w + o * u;
    a[h] = S, a[h + 1] = k, d && (t < 1e-3 ? a[h + 2] = Math.atan2(i - e, r - n) : a[h + 2] = Math.atan2(k - (e * x + i * b * 2 + c * f), S - (n * x + r * b * 2 + l * f)));
  }
};
nt.NONE = -1, nt.BEFORE = -2, nt.AFTER = -3, nt.epsilon = 1e-5;
let pe = nt;
class Rs {
  constructor(t, n) {
    if (this.darkColor = null, this.attachment = null, this.attachmentState = 0, this.sequenceIndex = -1, this.deform = new Array(), !t)
      throw new Error("data cannot be null.");
    if (!n)
      throw new Error("bone cannot be null.");
    this.data = t, this.bone = n, this.color = new V(), this.darkColor = t.darkColor ? new V() : null, this.setToSetupPose();
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
    this.attachment != t && ((!(t instanceof ft) || !(this.attachment instanceof ft) || t.timelineAttachment != this.attachment.timelineAttachment) && (this.deform.length = 0), this.attachment = t, this.sequenceIndex = -1);
  }
  /** Sets this slot to the setup pose. */
  setToSetupPose() {
    this.color.setFromColor(this.data.color), this.darkColor && this.darkColor.setFromColor(this.data.darkColor), this.data.attachmentName ? (this.attachment = null, this.setAttachment(this.bone.skeleton.getAttachment(this.data.index, this.data.attachmentName))) : this.attachment = null;
  }
}
class Ls {
  constructor(t, n) {
    if (this.mixRotate = 0, this.mixX = 0, this.mixY = 0, this.mixScaleX = 0, this.mixScaleY = 0, this.mixShearY = 0, this.temp = new Ht(), this.active = !1, !t)
      throw new Error("data cannot be null.");
    if (!n)
      throw new Error("skeleton cannot be null.");
    this.data = t, this.mixRotate = t.mixRotate, this.mixX = t.mixX, this.mixY = t.mixY, this.mixScaleX = t.mixScaleX, this.mixScaleY = t.mixScaleY, this.mixShearY = t.mixShearY, this.bones = new Array();
    for (let r = 0; r < t.bones.length; r++) {
      const i = n.findBone(t.bones[r].name);
      if (!i)
        throw new Error(`Couldn't find bone ${t.bones[r].name}.`);
      this.bones.push(i);
    }
    const e = n.findBone(t.target.name);
    if (!e)
      throw new Error(`Couldn't find target bone ${t.target.name}.`);
    this.target = e;
  }
  isActive() {
    return this.active;
  }
  update() {
    this.mixRotate == 0 && this.mixX == 0 && this.mixY == 0 && this.mixScaleX == 0 && this.mixScaleY == 0 && this.mixShearY == 0 || (this.data.local ? this.data.relative ? this.applyRelativeLocal() : this.applyAbsoluteLocal() : this.data.relative ? this.applyRelativeWorld() : this.applyAbsoluteWorld());
  }
  applyAbsoluteWorld() {
    const t = this.mixRotate, n = this.mixX, e = this.mixY, r = this.mixScaleX, i = this.mixScaleY, l = this.mixShearY, c = n != 0 || e != 0, s = this.target, o = s.a, a = s.b, h = s.c, d = s.d, f = o * d - a * h > 0 ? M.degRad : -M.degRad, u = this.data.offsetRotation * f, m = this.data.offsetShearY * f, x = this.bones;
    for (let y = 0, b = x.length; y < b; y++) {
      const g = x[y];
      if (t != 0) {
        const p = g.a, w = g.b, S = g.c, k = g.d;
        let A = Math.atan2(h, o) - Math.atan2(S, p) + u;
        A > M.PI ? A -= M.PI2 : A < -M.PI && (A += M.PI2), A *= t;
        const C = Math.cos(A), X = Math.sin(A);
        g.a = C * p - X * S, g.b = C * w - X * k, g.c = X * p + C * S, g.d = X * w + C * k;
      }
      if (c) {
        const p = this.temp;
        s.localToWorld(p.set(this.data.offsetX, this.data.offsetY)), g.worldX += (p.x - g.worldX) * n, g.worldY += (p.y - g.worldY) * e;
      }
      if (r != 0) {
        let p = Math.sqrt(g.a * g.a + g.c * g.c);
        p != 0 && (p = (p + (Math.sqrt(o * o + h * h) - p + this.data.offsetScaleX) * r) / p), g.a *= p, g.c *= p;
      }
      if (i != 0) {
        let p = Math.sqrt(g.b * g.b + g.d * g.d);
        p != 0 && (p = (p + (Math.sqrt(a * a + d * d) - p + this.data.offsetScaleY) * i) / p), g.b *= p, g.d *= p;
      }
      if (l > 0) {
        const p = g.b, w = g.d, S = Math.atan2(w, p);
        let k = Math.atan2(d, a) - Math.atan2(h, o) - (S - Math.atan2(g.c, g.a));
        k > M.PI ? k -= M.PI2 : k < -M.PI && (k += M.PI2), k = S + (k + m) * l;
        const A = Math.sqrt(p * p + w * w);
        g.b = Math.cos(k) * A, g.d = Math.sin(k) * A;
      }
      g.updateAppliedTransform();
    }
  }
  applyRelativeWorld() {
    const t = this.mixRotate, n = this.mixX, e = this.mixY, r = this.mixScaleX, i = this.mixScaleY, l = this.mixShearY, c = n != 0 || e != 0, s = this.target, o = s.a, a = s.b, h = s.c, d = s.d, f = o * d - a * h > 0 ? M.degRad : -M.degRad, u = this.data.offsetRotation * f, m = this.data.offsetShearY * f, x = this.bones;
    for (let y = 0, b = x.length; y < b; y++) {
      const g = x[y];
      if (t != 0) {
        const p = g.a, w = g.b, S = g.c, k = g.d;
        let A = Math.atan2(h, o) + u;
        A > M.PI ? A -= M.PI2 : A < -M.PI && (A += M.PI2), A *= t;
        const C = Math.cos(A), X = Math.sin(A);
        g.a = C * p - X * S, g.b = C * w - X * k, g.c = X * p + C * S, g.d = X * w + C * k;
      }
      if (c) {
        const p = this.temp;
        s.localToWorld(p.set(this.data.offsetX, this.data.offsetY)), g.worldX += p.x * n, g.worldY += p.y * e;
      }
      if (r != 0) {
        const p = (Math.sqrt(o * o + h * h) - 1 + this.data.offsetScaleX) * r + 1;
        g.a *= p, g.c *= p;
      }
      if (i != 0) {
        const p = (Math.sqrt(a * a + d * d) - 1 + this.data.offsetScaleY) * i + 1;
        g.b *= p, g.d *= p;
      }
      if (l > 0) {
        let p = Math.atan2(d, a) - Math.atan2(h, o);
        p > M.PI ? p -= M.PI2 : p < -M.PI && (p += M.PI2);
        const w = g.b, S = g.d;
        p = Math.atan2(S, w) + (p - M.PI / 2 + m) * l;
        const k = Math.sqrt(w * w + S * S);
        g.b = Math.cos(p) * k, g.d = Math.sin(p) * k;
      }
      g.updateAppliedTransform();
    }
  }
  applyAbsoluteLocal() {
    const t = this.mixRotate, n = this.mixX, e = this.mixY, r = this.mixScaleX, i = this.mixScaleY, l = this.mixShearY, c = this.target, s = this.bones;
    for (let o = 0, a = s.length; o < a; o++) {
      const h = s[o];
      let d = h.arotation;
      if (t != 0) {
        let b = c.arotation - d + this.data.offsetRotation;
        b -= (16384 - (16384.499999999996 - b / 360 | 0)) * 360, d += b * t;
      }
      let f = h.ax, u = h.ay;
      f += (c.ax - f + this.data.offsetX) * n, u += (c.ay - u + this.data.offsetY) * e;
      let m = h.ascaleX, x = h.ascaleY;
      r != 0 && m != 0 && (m = (m + (c.ascaleX - m + this.data.offsetScaleX) * r) / m), i != 0 && x != 0 && (x = (x + (c.ascaleY - x + this.data.offsetScaleY) * i) / x);
      let y = h.ashearY;
      if (l != 0) {
        let b = c.ashearY - y + this.data.offsetShearY;
        b -= (16384 - (16384.499999999996 - b / 360 | 0)) * 360, y += b * l;
      }
      h.updateWorldTransformWith(f, u, d, m, x, h.ashearX, y);
    }
  }
  applyRelativeLocal() {
    const t = this.mixRotate, n = this.mixX, e = this.mixY, r = this.mixScaleX, i = this.mixScaleY, l = this.mixShearY, c = this.target, s = this.bones;
    for (let o = 0, a = s.length; o < a; o++) {
      const h = s[o], d = h.arotation + (c.arotation + this.data.offsetRotation) * t, f = h.ax + (c.ax + this.data.offsetX) * n, u = h.ay + (c.ay + this.data.offsetY) * e, m = h.ascaleX * ((c.ascaleX - 1 + this.data.offsetScaleX) * r + 1), x = h.ascaleY * ((c.ascaleY - 1 + this.data.offsetScaleY) * i + 1), y = h.ashearY + (c.ashearY + this.data.offsetShearY) * l;
      h.updateWorldTransformWith(f, u, d, m, x, h.ashearX, y);
    }
  }
}
const ne = class ne {
  constructor(t) {
    if (this._updateCache = new Array(), this.skin = null, this.scaleX = 1, this._scaleY = 1, this.x = 0, this.y = 0, !t)
      throw new Error("data cannot be null.");
    this.data = t, this.bones = new Array();
    for (let n = 0; n < t.bones.length; n++) {
      const e = t.bones[n];
      let r;
      if (!e.parent)
        r = new Le(e, this, null);
      else {
        const i = this.bones[e.parent.index];
        r = new Le(e, this, i), i.children.push(r);
      }
      this.bones.push(r);
    }
    this.slots = new Array(), this.drawOrder = new Array();
    for (let n = 0; n < t.slots.length; n++) {
      const e = t.slots[n], r = this.bones[e.boneData.index], i = new Rs(e, r);
      this.slots.push(i), this.drawOrder.push(i);
    }
    this.ikConstraints = new Array();
    for (let n = 0; n < t.ikConstraints.length; n++) {
      const e = t.ikConstraints[n];
      this.ikConstraints.push(new Ps(e, this));
    }
    this.transformConstraints = new Array();
    for (let n = 0; n < t.transformConstraints.length; n++) {
      const e = t.transformConstraints[n];
      this.transformConstraints.push(new Ls(e, this));
    }
    this.pathConstraints = new Array();
    for (let n = 0; n < t.pathConstraints.length; n++) {
      const e = t.pathConstraints[n];
      this.pathConstraints.push(new pe(e, this));
    }
    this.color = new V(1, 1, 1, 1), this.updateCache();
  }
  get scaleY() {
    return ne.yDown ? -this._scaleY : this._scaleY;
  }
  set scaleY(t) {
    this._scaleY = t;
  }
  /** Caches information about bones and constraints. Must be called if the {@link #getSkin()} is modified or if bones,
   * constraints, or weighted path attachments are added or removed. */
  updateCache() {
    const t = this._updateCache;
    t.length = 0;
    const n = this.bones;
    for (let a = 0, h = n.length; a < h; a++) {
      const d = n[a];
      d.sorted = d.data.skinRequired, d.active = !d.sorted;
    }
    if (this.skin) {
      const a = this.skin.bones;
      for (let h = 0, d = this.skin.bones.length; h < d; h++) {
        let f = this.bones[a[h].index];
        do
          f.sorted = !1, f.active = !0, f = f.parent;
        while (f);
      }
    }
    const e = this.ikConstraints, r = this.transformConstraints, i = this.pathConstraints, l = e.length, c = r.length, s = i.length, o = l + c + s;
    t:
      for (let a = 0; a < o; a++) {
        for (let h = 0; h < l; h++) {
          const d = e[h];
          if (d.data.order == a) {
            this.sortIkConstraint(d);
            continue t;
          }
        }
        for (let h = 0; h < c; h++) {
          const d = r[h];
          if (d.data.order == a) {
            this.sortTransformConstraint(d);
            continue t;
          }
        }
        for (let h = 0; h < s; h++) {
          const d = i[h];
          if (d.data.order == a) {
            this.sortPathConstraint(d);
            continue t;
          }
        }
      }
    for (let a = 0, h = n.length; a < h; a++)
      this.sortBone(n[a]);
  }
  sortIkConstraint(t) {
    if (t.active = t.target.isActive() && (!t.data.skinRequired || this.skin && P.contains(this.skin.constraints, t.data, !0)), !t.active)
      return;
    const n = t.target;
    this.sortBone(n);
    const e = t.bones, r = e[0];
    if (this.sortBone(r), e.length == 1)
      this._updateCache.push(t), this.sortReset(r.children);
    else {
      const i = e[e.length - 1];
      this.sortBone(i), this._updateCache.push(t), this.sortReset(r.children), i.sorted = !0;
    }
  }
  sortPathConstraint(t) {
    if (t.active = t.target.bone.isActive() && (!t.data.skinRequired || this.skin && P.contains(this.skin.constraints, t.data, !0)), !t.active)
      return;
    const n = t.target, e = n.data.index, r = n.bone;
    this.skin && this.sortPathConstraintAttachment(this.skin, e, r), this.data.defaultSkin && this.data.defaultSkin != this.skin && this.sortPathConstraintAttachment(this.data.defaultSkin, e, r);
    for (let s = 0, o = this.data.skins.length; s < o; s++)
      this.sortPathConstraintAttachment(this.data.skins[s], e, r);
    const i = n.getAttachment();
    i instanceof Pt && this.sortPathConstraintAttachmentWith(i, r);
    const l = t.bones, c = l.length;
    for (let s = 0; s < c; s++)
      this.sortBone(l[s]);
    this._updateCache.push(t);
    for (let s = 0; s < c; s++)
      this.sortReset(l[s].children);
    for (let s = 0; s < c; s++)
      l[s].sorted = !0;
  }
  sortTransformConstraint(t) {
    if (t.active = t.target.isActive() && (!t.data.skinRequired || this.skin && P.contains(this.skin.constraints, t.data, !0)), !t.active)
      return;
    this.sortBone(t.target);
    const n = t.bones, e = n.length;
    if (t.data.local)
      for (let r = 0; r < e; r++) {
        const i = n[r];
        this.sortBone(i.parent), this.sortBone(i);
      }
    else
      for (let r = 0; r < e; r++)
        this.sortBone(n[r]);
    this._updateCache.push(t);
    for (let r = 0; r < e; r++)
      this.sortReset(n[r].children);
    for (let r = 0; r < e; r++)
      n[r].sorted = !0;
  }
  sortPathConstraintAttachment(t, n, e) {
    const r = t.attachments[n];
    if (r)
      for (const i in r)
        this.sortPathConstraintAttachmentWith(r[i], e);
  }
  sortPathConstraintAttachmentWith(t, n) {
    if (!(t instanceof Pt))
      return;
    const e = t.bones;
    if (!e)
      this.sortBone(n);
    else {
      const r = this.bones;
      for (let i = 0, l = e.length; i < l; ) {
        let c = e[i++];
        for (c += i; i < c; )
          this.sortBone(r[e[i++]]);
      }
    }
  }
  sortBone(t) {
    if (!t || t.sorted)
      return;
    const n = t.parent;
    n && this.sortBone(n), t.sorted = !0, this._updateCache.push(t);
  }
  sortReset(t) {
    for (let n = 0, e = t.length; n < e; n++) {
      const r = t[n];
      r.active && (r.sorted && this.sortReset(r.children), r.sorted = !1);
    }
  }
  /** Updates the world transform for each bone and applies all constraints.
   *
   * See [World transforms](http://esotericsoftware.com/spine-runtime-skeletons#World-transforms) in the Spine
   * Runtimes Guide. */
  updateWorldTransform() {
    const t = this.bones;
    for (let e = 0, r = t.length; e < r; e++) {
      const i = t[e];
      i.ax = i.x, i.ay = i.y, i.arotation = i.rotation, i.ascaleX = i.scaleX, i.ascaleY = i.scaleY, i.ashearX = i.shearX, i.ashearY = i.shearY;
    }
    const n = this._updateCache;
    for (let e = 0, r = n.length; e < r; e++)
      n[e].update();
  }
  updateWorldTransformWith(t) {
    const n = this.getRootBone();
    if (!n)
      throw new Error("Root bone must not be null.");
    const e = t.a, r = t.b, i = t.c, l = t.d;
    n.worldX = e * this.x + r * this.y + t.worldX, n.worldY = i * this.x + l * this.y + t.worldY;
    const c = n.rotation + 90 + n.shearY, s = M.cosDeg(n.rotation + n.shearX) * n.scaleX, o = M.cosDeg(c) * n.scaleY, a = M.sinDeg(n.rotation + n.shearX) * n.scaleX, h = M.sinDeg(c) * n.scaleY;
    n.a = (e * s + r * a) * this.scaleX, n.b = (e * o + r * h) * this.scaleX, n.c = (i * s + l * a) * this.scaleY, n.d = (i * o + l * h) * this.scaleY;
    const d = this._updateCache;
    for (let f = 0, u = d.length; f < u; f++) {
      const m = d[f];
      m != n && m.update();
    }
  }
  /** Sets the bones, constraints, and slots to their setup pose values. */
  setToSetupPose() {
    this.setBonesToSetupPose(), this.setSlotsToSetupPose();
  }
  /** Sets the bones and constraints to their setup pose values. */
  setBonesToSetupPose() {
    const t = this.bones;
    for (let i = 0, l = t.length; i < l; i++)
      t[i].setToSetupPose();
    const n = this.ikConstraints;
    for (let i = 0, l = n.length; i < l; i++) {
      const c = n[i];
      c.mix = c.data.mix, c.softness = c.data.softness, c.bendDirection = c.data.bendDirection, c.compress = c.data.compress, c.stretch = c.data.stretch;
    }
    const e = this.transformConstraints;
    for (let i = 0, l = e.length; i < l; i++) {
      const c = e[i], s = c.data;
      c.mixRotate = s.mixRotate, c.mixX = s.mixX, c.mixY = s.mixY, c.mixScaleX = s.mixScaleX, c.mixScaleY = s.mixScaleY, c.mixShearY = s.mixShearY;
    }
    const r = this.pathConstraints;
    for (let i = 0, l = r.length; i < l; i++) {
      const c = r[i], s = c.data;
      c.position = s.position, c.spacing = s.spacing, c.mixRotate = s.mixRotate, c.mixX = s.mixX, c.mixY = s.mixY;
    }
  }
  /** Sets the slots and draw order to their setup pose values. */
  setSlotsToSetupPose() {
    const t = this.slots;
    P.arrayCopy(t, 0, this.drawOrder, 0, t.length);
    for (let n = 0, e = t.length; n < e; n++)
      t[n].setToSetupPose();
  }
  /** @returns May return null. */
  getRootBone() {
    return this.bones.length == 0 ? null : this.bones[0];
  }
  /** @returns May be null. */
  findBone(t) {
    if (!t)
      throw new Error("boneName cannot be null.");
    const n = this.bones;
    for (let e = 0, r = n.length; e < r; e++) {
      const i = n[e];
      if (i.data.name == t)
        return i;
    }
    return null;
  }
  /** Finds a slot by comparing each slot's name. It is more efficient to cache the results of this method than to call it
   * repeatedly.
   * @returns May be null. */
  findSlot(t) {
    if (!t)
      throw new Error("slotName cannot be null.");
    const n = this.slots;
    for (let e = 0, r = n.length; e < r; e++) {
      const i = n[e];
      if (i.data.name == t)
        return i;
    }
    return null;
  }
  /** Sets a skin by name.
   *
   * See {@link #setSkin()}. */
  setSkinByName(t) {
    const n = this.data.findSkin(t);
    if (!n)
      throw new Error("Skin not found: " + t);
    this.setSkin(n);
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
          const n = this.slots;
          for (let e = 0, r = n.length; e < r; e++) {
            const i = n[e], l = i.data.attachmentName;
            if (l) {
              const c = t.getAttachment(e, l);
              c && i.setAttachment(c);
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
  getAttachmentByName(t, n) {
    const e = this.data.findSlot(t);
    if (!e)
      throw new Error(`Can't find slot with name ${t}`);
    return this.getAttachment(e.index, n);
  }
  /** Finds an attachment by looking in the {@link #skin} and {@link SkeletonData#defaultSkin} using the slot index and
   * attachment name. First the skin is checked and if the attachment was not found, the default skin is checked.
   *
   * See [Runtime skins](http://esotericsoftware.com/spine-runtime-skins) in the Spine Runtimes Guide.
   * @returns May be null. */
  getAttachment(t, n) {
    if (!n)
      throw new Error("attachmentName cannot be null.");
    if (this.skin) {
      const e = this.skin.getAttachment(t, n);
      if (e)
        return e;
    }
    return this.data.defaultSkin ? this.data.defaultSkin.getAttachment(t, n) : null;
  }
  /** A convenience method to set an attachment by finding the slot with {@link #findSlot()}, finding the attachment with
   * {@link #getAttachment()}, then setting the slot's {@link Slot#attachment}.
   * @param attachmentName May be null to clear the slot's attachment. */
  setAttachment(t, n) {
    if (!t)
      throw new Error("slotName cannot be null.");
    const e = this.slots;
    for (let r = 0, i = e.length; r < i; r++) {
      const l = e[r];
      if (l.data.name == t) {
        let c = null;
        if (n && (c = this.getAttachment(r, n), !c))
          throw new Error("Attachment not found: " + n + ", for slot: " + t);
        l.setAttachment(c);
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
    const n = this.ikConstraints;
    for (let e = 0, r = n.length; e < r; e++) {
      const i = n[e];
      if (i.data.name == t)
        return i;
    }
    return null;
  }
  /** Finds a transform constraint by comparing each transform constraint's name. It is more efficient to cache the results of
   * this method than to call it repeatedly.
   * @return May be null. */
  findTransformConstraint(t) {
    if (!t)
      throw new Error("constraintName cannot be null.");
    const n = this.transformConstraints;
    for (let e = 0, r = n.length; e < r; e++) {
      const i = n[e];
      if (i.data.name == t)
        return i;
    }
    return null;
  }
  /** Finds a path constraint by comparing each path constraint's name. It is more efficient to cache the results of this method
   * than to call it repeatedly.
   * @return May be null. */
  findPathConstraint(t) {
    if (!t)
      throw new Error("constraintName cannot be null.");
    const n = this.pathConstraints;
    for (let e = 0, r = n.length; e < r; e++) {
      const i = n[e];
      if (i.data.name == t)
        return i;
    }
    return null;
  }
  /** Returns the axis aligned bounding box (AABB) of the region and mesh attachments for the current pose as `{ x: number, y: number, width: number, height: number }`.
   * Note that this method will create temporary objects which can add to garbage collection pressure. Use `getBounds()` if garbage collection is a concern. */
  getBoundsRect() {
    const t = new Ht(), n = new Ht();
    return this.getBounds(t, n), { x: t.x, y: t.y, width: n.x, height: n.y };
  }
  /** Returns the axis aligned bounding box (AABB) of the region and mesh attachments for the current pose.
   * @param offset An output value, the distance from the skeleton origin to the bottom left corner of the AABB.
   * @param size An output value, the width and height of the AABB.
   * @param temp Working memory to temporarily store attachments' computed world vertices. */
  getBounds(t, n, e = new Array(2)) {
    if (!t)
      throw new Error("offset cannot be null.");
    if (!n)
      throw new Error("size cannot be null.");
    const r = this.drawOrder;
    let i = Number.POSITIVE_INFINITY, l = Number.POSITIVE_INFINITY, c = Number.NEGATIVE_INFINITY, s = Number.NEGATIVE_INFINITY;
    for (let o = 0, a = r.length; o < a; o++) {
      const h = r[o];
      if (!h.bone.active)
        continue;
      let d = 0, f = null;
      const u = h.getAttachment();
      if (u instanceof wt)
        d = 8, f = P.setArraySize(e, d, 0), u.computeWorldVertices(h, f, 0, 2);
      else if (u instanceof mt) {
        const m = u;
        d = m.worldVerticesLength, f = P.setArraySize(e, d, 0), m.computeWorldVertices(h, 0, d, f, 0, 2);
      }
      if (f)
        for (let m = 0, x = f.length; m < x; m += 2) {
          const y = f[m], b = f[m + 1];
          i = Math.min(i, y), l = Math.min(l, b), c = Math.max(c, y), s = Math.max(s, b);
        }
    }
    t.set(i, l), n.set(c - i, s - l);
  }
};
ne.yDown = !1;
let be = ne;
class Kt {
  constructor() {
    this.name = null, this.bones = new Array(), this.slots = new Array(), this.skins = new Array(), this.defaultSkin = null, this.events = new Array(), this.animations = new Array(), this.ikConstraints = new Array(), this.transformConstraints = new Array(), this.pathConstraints = new Array(), this.x = 0, this.y = 0, this.width = 0, this.height = 0, this.version = null, this.hash = null, this.fps = 0, this.imagesPath = null, this.audioPath = null;
  }
  /** Finds a bone by comparing each bone's name. It is more efficient to cache the results of this method than to call it
   * multiple times.
   * @returns May be null. */
  findBone(t) {
    if (!t)
      throw new Error("boneName cannot be null.");
    const n = this.bones;
    for (let e = 0, r = n.length; e < r; e++) {
      const i = n[e];
      if (i.name == t)
        return i;
    }
    return null;
  }
  /** Finds a slot by comparing each slot's name. It is more efficient to cache the results of this method than to call it
   * multiple times.
   * @returns May be null. */
  findSlot(t) {
    if (!t)
      throw new Error("slotName cannot be null.");
    const n = this.slots;
    for (let e = 0, r = n.length; e < r; e++) {
      const i = n[e];
      if (i.name == t)
        return i;
    }
    return null;
  }
  /** Finds a skin by comparing each skin's name. It is more efficient to cache the results of this method than to call it
   * multiple times.
   * @returns May be null. */
  findSkin(t) {
    if (!t)
      throw new Error("skinName cannot be null.");
    const n = this.skins;
    for (let e = 0, r = n.length; e < r; e++) {
      const i = n[e];
      if (i.name == t)
        return i;
    }
    return null;
  }
  /** Finds an event by comparing each events's name. It is more efficient to cache the results of this method than to call it
   * multiple times.
   * @returns May be null. */
  findEvent(t) {
    if (!t)
      throw new Error("eventDataName cannot be null.");
    const n = this.events;
    for (let e = 0, r = n.length; e < r; e++) {
      const i = n[e];
      if (i.name == t)
        return i;
    }
    return null;
  }
  /** Finds an animation by comparing each animation's name. It is more efficient to cache the results of this method than to
   * call it multiple times.
   * @returns May be null. */
  findAnimation(t) {
    if (!t)
      throw new Error("animationName cannot be null.");
    const n = this.animations;
    for (let e = 0, r = n.length; e < r; e++) {
      const i = n[e];
      if (i.name == t)
        return i;
    }
    return null;
  }
  /** Finds an IK constraint by comparing each IK constraint's name. It is more efficient to cache the results of this method
   * than to call it multiple times.
   * @return May be null. */
  findIkConstraint(t) {
    if (!t)
      throw new Error("constraintName cannot be null.");
    const n = this.ikConstraints;
    for (let e = 0, r = n.length; e < r; e++) {
      const i = n[e];
      if (i.name == t)
        return i;
    }
    return null;
  }
  /** Finds a transform constraint by comparing each transform constraint's name. It is more efficient to cache the results of
   * this method than to call it multiple times.
   * @return May be null. */
  findTransformConstraint(t) {
    if (!t)
      throw new Error("constraintName cannot be null.");
    const n = this.transformConstraints;
    for (let e = 0, r = n.length; e < r; e++) {
      const i = n[e];
      if (i.name == t)
        return i;
    }
    return null;
  }
  /** Finds a path constraint by comparing each path constraint's name. It is more efficient to cache the results of this method
   * than to call it multiple times.
   * @return May be null. */
  findPathConstraint(t) {
    if (!t)
      throw new Error("constraintName cannot be null.");
    const n = this.pathConstraints;
    for (let e = 0, r = n.length; e < r; e++) {
      const i = n[e];
      if (i.name == t)
        return i;
    }
    return null;
  }
}
class Ve {
  constructor(t = 0, n, e) {
    this.slotIndex = t, this.name = n, this.attachment = e;
  }
}
class we {
  constructor(t) {
    if (this.attachments = new Array(), this.bones = Array(), this.constraints = new Array(), !t)
      throw new Error("name cannot be null.");
    this.name = t;
  }
  /** Adds an attachment to the skin for the specified slot index and name. */
  setAttachment(t, n, e) {
    if (!e)
      throw new Error("attachment cannot be null.");
    const r = this.attachments;
    t >= r.length && (r.length = t + 1), r[t] || (r[t] = {}), r[t][n] = e;
  }
  /** Adds all attachments, bones, and constraints from the specified skin to this skin. */
  addSkin(t) {
    for (let e = 0; e < t.bones.length; e++) {
      const r = t.bones[e];
      let i = !1;
      for (let l = 0; l < this.bones.length; l++)
        if (this.bones[l] == r) {
          i = !0;
          break;
        }
      i || this.bones.push(r);
    }
    for (let e = 0; e < t.constraints.length; e++) {
      const r = t.constraints[e];
      let i = !1;
      for (let l = 0; l < this.constraints.length; l++)
        if (this.constraints[l] == r) {
          i = !0;
          break;
        }
      i || this.constraints.push(r);
    }
    const n = t.getAttachments();
    for (let e = 0; e < n.length; e++) {
      const r = n[e];
      this.setAttachment(r.slotIndex, r.name, r.attachment);
    }
  }
  /** Adds all bones and constraints and copies of all attachments from the specified skin to this skin. Mesh attachments are not
   * copied, instead a new linked mesh is created. The attachment copies can be modified without affecting the originals. */
  copySkin(t) {
    for (let e = 0; e < t.bones.length; e++) {
      const r = t.bones[e];
      let i = !1;
      for (let l = 0; l < this.bones.length; l++)
        if (this.bones[l] == r) {
          i = !0;
          break;
        }
      i || this.bones.push(r);
    }
    for (let e = 0; e < t.constraints.length; e++) {
      const r = t.constraints[e];
      let i = !1;
      for (let l = 0; l < this.constraints.length; l++)
        if (this.constraints[l] == r) {
          i = !0;
          break;
        }
      i || this.constraints.push(r);
    }
    const n = t.getAttachments();
    for (let e = 0; e < n.length; e++) {
      const r = n[e];
      r.attachment && (r.attachment instanceof mt ? (r.attachment = r.attachment.newLinkedMesh(), this.setAttachment(r.slotIndex, r.name, r.attachment)) : (r.attachment = r.attachment.copy(), this.setAttachment(r.slotIndex, r.name, r.attachment)));
    }
  }
  /** Returns the attachment for the specified slot index and name, or null. */
  getAttachment(t, n) {
    const e = this.attachments[t];
    return e ? e[n] : null;
  }
  /** Removes the attachment in the skin for the specified slot index and name, if any. */
  removeAttachment(t, n) {
    const e = this.attachments[t];
    e && delete e[n];
  }
  /** Returns all attachments in this skin. */
  getAttachments() {
    const t = new Array();
    for (let n = 0; n < this.attachments.length; n++) {
      const e = this.attachments[n];
      if (e)
        for (const r in e) {
          const i = e[r];
          i && t.push(new Ve(n, r, i));
        }
    }
    return t;
  }
  /** Returns all attachments in this skin for the specified slot index. */
  getAttachmentsForSlot(t, n) {
    const e = this.attachments[t];
    if (e)
      for (const r in e) {
        const i = e[r];
        i && n.push(new Ve(t, r, i));
      }
  }
  /** Clears all attachments, bones, and constraints. */
  clear() {
    this.attachments.length = 0, this.bones.length = 0, this.constraints.length = 0;
  }
  /** Attach each attachment in this skin if the corresponding attachment in the old skin is currently attached. */
  attachAll(t, n) {
    let e = 0;
    for (let r = 0; r < t.slots.length; r++) {
      const i = t.slots[r], l = i.getAttachment();
      if (l && e < n.attachments.length) {
        const c = n.attachments[e];
        for (const s in c) {
          const o = c[s];
          if (l == o) {
            const a = this.getAttachment(e, s);
            a && i.setAttachment(a);
            break;
          }
        }
      }
      e++;
    }
  }
}
class bs {
  constructor(t, n, e) {
    if (this.index = 0, this.color = new V(1, 1, 1, 1), this.darkColor = null, this.attachmentName = null, this.blendMode = 0, t < 0)
      throw new Error("index must be >= 0.");
    if (!n)
      throw new Error("name cannot be null.");
    if (!e)
      throw new Error("boneData cannot be null.");
    this.index = t, this.name = n, this.boneData = e;
  }
}
var Ft = /* @__PURE__ */ ((v) => (v[v.Normal = 0] = "Normal", v[v.Additive = 1] = "Additive", v[v.Multiply = 2] = "Multiply", v[v.Screen = 3] = "Screen", v))(Ft || {});
class ws extends Ae {
  constructor(t) {
    super(t, 0, !1), this.bones = new Array(), this.mixRotate = 0, this.mixX = 0, this.mixY = 0, this.mixScaleX = 0, this.mixScaleY = 0, this.mixShearY = 0, this.offsetRotation = 0, this.offsetX = 0, this.offsetY = 0, this.offsetScaleX = 0, this.offsetScaleY = 0, this.offsetShearY = 0, this.relative = !1, this.local = !1, this._target = null;
  }
  get target() {
    if (this._target)
      return this._target;
    throw new Error("BoneData not set.");
  }
  set target(t) {
    this._target = t;
  }
}
class Vs {
  constructor(t) {
    this.scale = 1, this.linkedMeshes = new Array(), this.attachmentLoader = t;
  }
  readSkeletonData(t) {
    const n = this.scale, e = new Kt();
    e.name = "";
    const r = new Ns(t), i = r.readInt32(), l = r.readInt32();
    e.hash = l == 0 && i == 0 ? null : l.toString(16) + i.toString(16), e.version = r.readString(), e.x = r.readFloat(), e.y = r.readFloat(), e.width = r.readFloat(), e.height = r.readFloat();
    const c = r.readBoolean();
    c && (e.fps = r.readFloat(), e.imagesPath = r.readString(), e.audioPath = r.readString());
    let s = 0;
    s = r.readInt(!0);
    for (let a = 0; a < s; a++) {
      const h = r.readString();
      if (!h)
        throw new Error("String in string table must not be null.");
      r.strings.push(h);
    }
    s = r.readInt(!0);
    for (let a = 0; a < s; a++) {
      const h = r.readString();
      if (!h)
        throw new Error("Bone name must not be null.");
      const d = a == 0 ? null : e.bones[r.readInt(!0)], f = new us(a, h, d);
      f.rotation = r.readFloat(), f.x = r.readFloat() * n, f.y = r.readFloat() * n, f.scaleX = r.readFloat(), f.scaleY = r.readFloat(), f.shearX = r.readFloat(), f.shearY = r.readFloat(), f.length = r.readFloat() * n, f.transformMode = r.readInt(!0), f.skinRequired = r.readBoolean(), c && V.rgba8888ToColor(f.color, r.readInt32()), e.bones.push(f);
    }
    s = r.readInt(!0);
    for (let a = 0; a < s; a++) {
      const h = r.readString();
      if (!h)
        throw new Error("Slot name must not be null.");
      const d = e.bones[r.readInt(!0)], f = new bs(a, h, d);
      V.rgba8888ToColor(f.color, r.readInt32());
      const u = r.readInt32();
      u != -1 && V.rgb888ToColor(f.darkColor = new V(), u), f.attachmentName = r.readStringRef(), f.blendMode = r.readInt(!0), e.slots.push(f);
    }
    s = r.readInt(!0);
    for (let a = 0, h; a < s; a++) {
      const d = r.readString();
      if (!d)
        throw new Error("IK constraint data name must not be null.");
      const f = new xs(d);
      f.order = r.readInt(!0), f.skinRequired = r.readBoolean(), h = r.readInt(!0);
      for (let u = 0; u < h; u++)
        f.bones.push(e.bones[r.readInt(!0)]);
      f.target = e.bones[r.readInt(!0)], f.mix = r.readFloat(), f.softness = r.readFloat() * n, f.bendDirection = r.readByte(), f.compress = r.readBoolean(), f.stretch = r.readBoolean(), f.uniform = r.readBoolean(), e.ikConstraints.push(f);
    }
    s = r.readInt(!0);
    for (let a = 0, h; a < s; a++) {
      const d = r.readString();
      if (!d)
        throw new Error("Transform constraint data name must not be null.");
      const f = new ws(d);
      f.order = r.readInt(!0), f.skinRequired = r.readBoolean(), h = r.readInt(!0);
      for (let u = 0; u < h; u++)
        f.bones.push(e.bones[r.readInt(!0)]);
      f.target = e.bones[r.readInt(!0)], f.local = r.readBoolean(), f.relative = r.readBoolean(), f.offsetRotation = r.readFloat(), f.offsetX = r.readFloat() * n, f.offsetY = r.readFloat() * n, f.offsetScaleX = r.readFloat(), f.offsetScaleY = r.readFloat(), f.offsetShearY = r.readFloat(), f.mixRotate = r.readFloat(), f.mixX = r.readFloat(), f.mixY = r.readFloat(), f.mixScaleX = r.readFloat(), f.mixScaleY = r.readFloat(), f.mixShearY = r.readFloat(), e.transformConstraints.push(f);
    }
    s = r.readInt(!0);
    for (let a = 0, h; a < s; a++) {
      const d = r.readString();
      if (!d)
        throw new Error("Path constraint data name must not be null.");
      const f = new ps(d);
      f.order = r.readInt(!0), f.skinRequired = r.readBoolean(), h = r.readInt(!0);
      for (let u = 0; u < h; u++)
        f.bones.push(e.bones[r.readInt(!0)]);
      f.target = e.slots[r.readInt(!0)], f.positionMode = r.readInt(!0), f.spacingMode = r.readInt(!0), f.rotateMode = r.readInt(!0), f.offsetRotation = r.readFloat(), f.position = r.readFloat(), f.positionMode == kt.Fixed && (f.position *= n), f.spacing = r.readFloat(), (f.spacingMode == tt.Length || f.spacingMode == tt.Fixed) && (f.spacing *= n), f.mixRotate = r.readFloat(), f.mixX = r.readFloat(), f.mixY = r.readFloat(), e.pathConstraints.push(f);
    }
    const o = this.readSkin(r, e, !0, c);
    o && (e.defaultSkin = o, e.skins.push(o));
    {
      let a = e.skins.length;
      for (P.setArraySize(e.skins, s = a + r.readInt(!0)); a < s; a++) {
        const h = this.readSkin(r, e, !1, c);
        if (!h)
          throw new Error("readSkin() should not have returned null.");
        e.skins[a] = h;
      }
    }
    s = this.linkedMeshes.length;
    for (let a = 0; a < s; a++) {
      const h = this.linkedMeshes[a], d = h.skin ? e.findSkin(h.skin) : e.defaultSkin;
      if (!d)
        throw new Error("Not skin found for linked mesh.");
      if (!h.parent)
        throw new Error("Linked mesh parent must not be null");
      const f = d.getAttachment(h.slotIndex, h.parent);
      if (!f)
        throw new Error(`Parent mesh not found: ${h.parent}`);
      h.mesh.timelineAttachment = h.inheritTimeline ? f : h.mesh, h.mesh.setParentMesh(f), h.mesh.region != null && h.mesh.updateRegion();
    }
    this.linkedMeshes.length = 0, s = r.readInt(!0);
    for (let a = 0; a < s; a++) {
      const h = r.readStringRef();
      if (!h)
        throw new Error();
      const d = new gs(h);
      d.intValue = r.readInt(!1), d.floatValue = r.readFloat(), d.stringValue = r.readString(), d.audioPath = r.readString(), d.audioPath && (d.volume = r.readFloat(), d.balance = r.readFloat()), e.events.push(d);
    }
    s = r.readInt(!0);
    for (let a = 0; a < s; a++) {
      const h = r.readString();
      if (!h)
        throw new Error("Animatio name must not be null.");
      e.animations.push(this.readAnimation(r, h, e));
    }
    return e;
  }
  readSkin(t, n, e, r) {
    let i = null, l = 0;
    if (e) {
      if (l = t.readInt(!0), l == 0)
        return null;
      i = new we("default");
    } else {
      const c = t.readStringRef();
      if (!c)
        throw new Error("Skin name must not be null.");
      i = new we(c), i.bones.length = t.readInt(!0);
      for (let s = 0, o = i.bones.length; s < o; s++)
        i.bones[s] = n.bones[t.readInt(!0)];
      for (let s = 0, o = t.readInt(!0); s < o; s++)
        i.constraints.push(n.ikConstraints[t.readInt(!0)]);
      for (let s = 0, o = t.readInt(!0); s < o; s++)
        i.constraints.push(n.transformConstraints[t.readInt(!0)]);
      for (let s = 0, o = t.readInt(!0); s < o; s++)
        i.constraints.push(n.pathConstraints[t.readInt(!0)]);
      l = t.readInt(!0);
    }
    for (let c = 0; c < l; c++) {
      const s = t.readInt(!0);
      for (let o = 0, a = t.readInt(!0); o < a; o++) {
        const h = t.readStringRef();
        if (!h)
          throw new Error("Attachment name must not be null");
        const d = this.readAttachment(t, n, i, s, h, r);
        d && i.setAttachment(s, h, d);
      }
    }
    return i;
  }
  readAttachment(t, n, e, r, i, l) {
    const c = this.scale;
    let s = t.readStringRef();
    switch (s || (s = i), t.readByte()) {
      case 0: {
        let o = t.readStringRef();
        const a = t.readFloat(), h = t.readFloat(), d = t.readFloat(), f = t.readFloat(), u = t.readFloat(), m = t.readFloat(), x = t.readFloat(), y = t.readInt32(), b = this.readSequence(t);
        o || (o = s);
        const g = this.attachmentLoader.newRegionAttachment(e, s, o, b);
        return g ? (g.path = o, g.x = h * c, g.y = d * c, g.scaleX = f, g.scaleY = u, g.rotation = a, g.width = m * c, g.height = x * c, V.rgba8888ToColor(g.color, y), g.sequence = b, b == null && g.updateRegion(), g) : null;
      }
      case 1: {
        const o = t.readInt(!0), a = this.readVertices(t, o), h = l ? t.readInt32() : 0, d = this.attachmentLoader.newBoundingBoxAttachment(e, s);
        return d ? (d.worldVerticesLength = o << 1, d.vertices = a.vertices, d.bones = a.bones, l && V.rgba8888ToColor(d.color, h), d) : null;
      }
      case 2: {
        let o = t.readStringRef();
        const a = t.readInt32(), h = t.readInt(!0), d = this.readFloatArray(t, h << 1, 1), f = this.readShortArray(t), u = this.readVertices(t, h), m = t.readInt(!0), x = this.readSequence(t);
        let y = [], b = 0, g = 0;
        l && (y = this.readShortArray(t), b = t.readFloat(), g = t.readFloat()), o || (o = s);
        const p = this.attachmentLoader.newMeshAttachment(e, s, o, x);
        return p ? (p.path = o, V.rgba8888ToColor(p.color, a), p.bones = u.bones, p.vertices = u.vertices, p.worldVerticesLength = h << 1, p.triangles = f, p.regionUVs = d, x == null && p.updateRegion(), p.hullLength = m << 1, p.sequence = x, l && (p.edges = y, p.width = b * c, p.height = g * c), p) : null;
      }
      case 3: {
        let o = t.readStringRef();
        const a = t.readInt32(), h = t.readStringRef(), d = t.readStringRef(), f = t.readBoolean(), u = this.readSequence(t);
        let m = 0, x = 0;
        l && (m = t.readFloat(), x = t.readFloat()), o || (o = s);
        const y = this.attachmentLoader.newMeshAttachment(e, s, o, u);
        return y ? (y.path = o, V.rgba8888ToColor(y.color, a), y.sequence = u, l && (y.width = m * c, y.height = x * c), this.linkedMeshes.push(new Ds(y, h, r, d, f)), y) : null;
      }
      case 4: {
        const o = t.readBoolean(), a = t.readBoolean(), h = t.readInt(!0), d = this.readVertices(t, h), f = P.newArray(h / 3, 0);
        for (let x = 0, y = f.length; x < y; x++)
          f[x] = t.readFloat() * c;
        const u = l ? t.readInt32() : 0, m = this.attachmentLoader.newPathAttachment(e, s);
        return m ? (m.closed = o, m.constantSpeed = a, m.worldVerticesLength = h << 1, m.vertices = d.vertices, m.bones = d.bones, m.lengths = f, l && V.rgba8888ToColor(m.color, u), m) : null;
      }
      case 5: {
        const o = t.readFloat(), a = t.readFloat(), h = t.readFloat(), d = l ? t.readInt32() : 0, f = this.attachmentLoader.newPointAttachment(e, s);
        return f ? (f.x = a * c, f.y = h * c, f.rotation = o, l && V.rgba8888ToColor(f.color, d), f) : null;
      }
      case 6: {
        const o = t.readInt(!0), a = t.readInt(!0), h = this.readVertices(t, a), d = l ? t.readInt32() : 0, f = this.attachmentLoader.newClippingAttachment(e, s);
        return f ? (f.endSlot = n.slots[o], f.worldVerticesLength = a << 1, f.vertices = h.vertices, f.bones = h.bones, l && V.rgba8888ToColor(f.color, d), f) : null;
      }
    }
    return null;
  }
  readSequence(t) {
    if (!t.readBoolean())
      return null;
    const n = new Gt(t.readInt(!0));
    return n.start = t.readInt(!0), n.digits = t.readInt(!0), n.setupIndex = t.readInt(!0), n;
  }
  readVertices(t, n) {
    const e = this.scale, r = n << 1, i = new Us();
    if (!t.readBoolean())
      return i.vertices = this.readFloatArray(t, r, e), i;
    const l = new Array(), c = new Array();
    for (let s = 0; s < n; s++) {
      const o = t.readInt(!0);
      c.push(o);
      for (let a = 0; a < o; a++)
        c.push(t.readInt(!0)), l.push(t.readFloat() * e), l.push(t.readFloat() * e), l.push(t.readFloat());
    }
    return i.vertices = P.toFloatArray(l), i.bones = c, i;
  }
  readFloatArray(t, n, e) {
    const r = new Array(n);
    if (e == 1)
      for (let i = 0; i < n; i++)
        r[i] = t.readFloat();
    else
      for (let i = 0; i < n; i++)
        r[i] = t.readFloat() * e;
    return r;
  }
  readShortArray(t) {
    const n = t.readInt(!0), e = new Array(n);
    for (let r = 0; r < n; r++)
      e[r] = t.readShort();
    return e;
  }
  readAnimation(t, n, e) {
    t.readInt(!0);
    const r = new Array(), i = this.scale;
    for (let o = 0, a = t.readInt(!0); o < a; o++) {
      const h = t.readInt(!0);
      for (let d = 0, f = t.readInt(!0); d < f; d++) {
        const u = t.readByte(), m = t.readInt(!0), x = m - 1;
        switch (u) {
          case Qs: {
            const y = new Tt(m, h);
            for (let b = 0; b < m; b++)
              y.setFrame(b, t.readFloat(), t.readStringRef());
            r.push(y);
            break;
          }
          case Js: {
            const y = t.readInt(!0), b = new es(m, y, h);
            let g = t.readFloat(), p = t.readUnsignedByte() / 255, w = t.readUnsignedByte() / 255, S = t.readUnsignedByte() / 255, k = t.readUnsignedByte() / 255;
            for (let A = 0, C = 0; b.setFrame(A, g, p, w, S, k), A != x; A++) {
              const X = t.readFloat(), F = t.readUnsignedByte() / 255, R = t.readUnsignedByte() / 255, B = t.readUnsignedByte() / 255, E = t.readUnsignedByte() / 255;
              switch (t.readByte()) {
                case ht:
                  b.setStepped(A);
                  break;
                case lt:
                  q(t, b, C++, A, 0, g, X, p, F, 1), q(t, b, C++, A, 1, g, X, w, R, 1), q(t, b, C++, A, 2, g, X, S, B, 1), q(t, b, C++, A, 3, g, X, k, E, 1);
              }
              g = X, p = F, w = R, S = B, k = E;
            }
            r.push(b);
            break;
          }
          case Zs: {
            const y = t.readInt(!0), b = new ss(m, y, h);
            let g = t.readFloat(), p = t.readUnsignedByte() / 255, w = t.readUnsignedByte() / 255, S = t.readUnsignedByte() / 255;
            for (let k = 0, A = 0; b.setFrame(k, g, p, w, S), k != x; k++) {
              const C = t.readFloat(), X = t.readUnsignedByte() / 255, F = t.readUnsignedByte() / 255, R = t.readUnsignedByte() / 255;
              switch (t.readByte()) {
                case ht:
                  b.setStepped(k);
                  break;
                case lt:
                  q(t, b, A++, k, 0, g, C, p, X, 1), q(t, b, A++, k, 1, g, C, w, F, 1), q(t, b, A++, k, 2, g, C, S, R, 1);
              }
              g = C, p = X, w = F, S = R;
            }
            r.push(b);
            break;
          }
          case tn: {
            const y = t.readInt(!0), b = new is(m, y, h);
            let g = t.readFloat(), p = t.readUnsignedByte() / 255, w = t.readUnsignedByte() / 255, S = t.readUnsignedByte() / 255, k = t.readUnsignedByte() / 255, A = t.readUnsignedByte() / 255, C = t.readUnsignedByte() / 255, X = t.readUnsignedByte() / 255;
            for (let F = 0, R = 0; b.setFrame(F, g, p, w, S, k, A, C, X), F != x; F++) {
              const B = t.readFloat(), E = t.readUnsignedByte() / 255, I = t.readUnsignedByte() / 255, T = t.readUnsignedByte() / 255, N = t.readUnsignedByte() / 255, O = t.readUnsignedByte() / 255, L = t.readUnsignedByte() / 255, H = t.readUnsignedByte() / 255;
              switch (t.readByte()) {
                case ht:
                  b.setStepped(F);
                  break;
                case lt:
                  q(t, b, R++, F, 0, g, B, p, E, 1), q(t, b, R++, F, 1, g, B, w, I, 1), q(t, b, R++, F, 2, g, B, S, T, 1), q(t, b, R++, F, 3, g, B, k, N, 1), q(t, b, R++, F, 4, g, B, A, O, 1), q(t, b, R++, F, 5, g, B, C, L, 1), q(t, b, R++, F, 6, g, B, X, H, 1);
              }
              g = B, p = E, w = I, S = T, k = N, A = O, C = L, X = H;
            }
            r.push(b);
            break;
          }
          case en: {
            const y = t.readInt(!0), b = new rs(m, y, h);
            let g = t.readFloat(), p = t.readUnsignedByte() / 255, w = t.readUnsignedByte() / 255, S = t.readUnsignedByte() / 255, k = t.readUnsignedByte() / 255, A = t.readUnsignedByte() / 255, C = t.readUnsignedByte() / 255;
            for (let X = 0, F = 0; b.setFrame(X, g, p, w, S, k, A, C), X != x; X++) {
              const R = t.readFloat(), B = t.readUnsignedByte() / 255, E = t.readUnsignedByte() / 255, I = t.readUnsignedByte() / 255, T = t.readUnsignedByte() / 255, N = t.readUnsignedByte() / 255, O = t.readUnsignedByte() / 255;
              switch (t.readByte()) {
                case ht:
                  b.setStepped(X);
                  break;
                case lt:
                  q(t, b, F++, X, 0, g, R, p, B, 1), q(t, b, F++, X, 1, g, R, w, E, 1), q(t, b, F++, X, 2, g, R, S, I, 1), q(t, b, F++, X, 3, g, R, k, T, 1), q(t, b, F++, X, 4, g, R, A, N, 1), q(t, b, F++, X, 5, g, R, C, O, 1);
              }
              g = R, p = B, w = E, S = I, k = T, A = N, C = O;
            }
            r.push(b);
            break;
          }
          case sn: {
            const y = new ns(m, t.readInt(!0), h);
            let b = t.readFloat(), g = t.readUnsignedByte() / 255;
            for (let p = 0, w = 0; y.setFrame(p, b, g), p != x; p++) {
              const S = t.readFloat(), k = t.readUnsignedByte() / 255;
              switch (t.readByte()) {
                case ht:
                  y.setStepped(p);
                  break;
                case lt:
                  q(t, y, w++, p, 0, b, S, g, k, 1);
              }
              b = S, g = k;
            }
            r.push(y);
          }
        }
      }
    }
    for (let o = 0, a = t.readInt(!0); o < a; o++) {
      const h = t.readInt(!0);
      for (let d = 0, f = t.readInt(!0); d < f; d++) {
        const u = t.readByte(), m = t.readInt(!0), x = t.readInt(!0);
        switch (u) {
          case Os:
            r.push(pt(t, new jt(m, x, h), 1));
            break;
          case qs:
            r.push(fe(t, new He(m, x, h), i));
            break;
          case zs:
            r.push(pt(t, new Ge(m, x, h), i));
            break;
          case Ws:
            r.push(pt(t, new je(m, x, h), i));
            break;
          case $s:
            r.push(fe(t, new _e(m, x, h), 1));
            break;
          case Hs:
            r.push(pt(t, new Ke(m, x, h), 1));
            break;
          case Gs:
            r.push(pt(t, new Qe(m, x, h), 1));
            break;
          case js:
            r.push(fe(t, new Je(m, x, h), 1));
            break;
          case _s:
            r.push(pt(t, new Ze(m, x, h), 1));
            break;
          case Ks:
            r.push(pt(t, new ts(m, x, h), 1));
        }
      }
    }
    for (let o = 0, a = t.readInt(!0); o < a; o++) {
      const h = t.readInt(!0), d = t.readInt(!0), f = d - 1, u = new os(d, t.readInt(!0), h);
      let m = t.readFloat(), x = t.readFloat(), y = t.readFloat() * i;
      for (let b = 0, g = 0; u.setFrame(b, m, x, y, t.readByte(), t.readBoolean(), t.readBoolean()), b != f; b++) {
        const p = t.readFloat(), w = t.readFloat(), S = t.readFloat() * i;
        switch (t.readByte()) {
          case ht:
            u.setStepped(b);
            break;
          case lt:
            q(t, u, g++, b, 0, m, p, x, w, 1), q(t, u, g++, b, 1, m, p, y, S, i);
        }
        m = p, x = w, y = S;
      }
      r.push(u);
    }
    for (let o = 0, a = t.readInt(!0); o < a; o++) {
      const h = t.readInt(!0), d = t.readInt(!0), f = d - 1, u = new cs(d, t.readInt(!0), h);
      let m = t.readFloat(), x = t.readFloat(), y = t.readFloat(), b = t.readFloat(), g = t.readFloat(), p = t.readFloat(), w = t.readFloat();
      for (let S = 0, k = 0; u.setFrame(S, m, x, y, b, g, p, w), S != f; S++) {
        const A = t.readFloat(), C = t.readFloat(), X = t.readFloat(), F = t.readFloat(), R = t.readFloat(), B = t.readFloat(), E = t.readFloat();
        switch (t.readByte()) {
          case ht:
            u.setStepped(S);
            break;
          case lt:
            q(t, u, k++, S, 0, m, A, x, C, 1), q(t, u, k++, S, 1, m, A, y, X, 1), q(t, u, k++, S, 2, m, A, b, F, 1), q(t, u, k++, S, 3, m, A, g, R, 1), q(t, u, k++, S, 4, m, A, p, B, 1), q(t, u, k++, S, 5, m, A, w, E, 1);
        }
        m = A, x = C, y = X, b = F, g = R, p = B, w = E;
      }
      r.push(u);
    }
    for (let o = 0, a = t.readInt(!0); o < a; o++) {
      const h = t.readInt(!0), d = e.pathConstraints[h];
      for (let f = 0, u = t.readInt(!0); f < u; f++)
        switch (t.readByte()) {
          case an:
            r.push(
              pt(
                t,
                new hs(t.readInt(!0), t.readInt(!0), h),
                d.positionMode == kt.Fixed ? i : 1
              )
            );
            break;
          case on:
            r.push(
              pt(
                t,
                new ls(t.readInt(!0), t.readInt(!0), h),
                d.spacingMode == tt.Length || d.spacingMode == tt.Fixed ? i : 1
              )
            );
            break;
          case cn:
            const m = new ds(t.readInt(!0), t.readInt(!0), h);
            let x = t.readFloat(), y = t.readFloat(), b = t.readFloat(), g = t.readFloat();
            for (let p = 0, w = 0, S = m.getFrameCount() - 1; m.setFrame(p, x, y, b, g), p != S; p++) {
              const k = t.readFloat(), A = t.readFloat(), C = t.readFloat(), X = t.readFloat();
              switch (t.readByte()) {
                case ht:
                  m.setStepped(p);
                  break;
                case lt:
                  q(t, m, w++, p, 0, x, k, y, A, 1), q(t, m, w++, p, 1, x, k, b, C, 1), q(t, m, w++, p, 2, x, k, g, X, 1);
              }
              x = k, y = A, b = C, g = X;
            }
            r.push(m);
        }
    }
    for (let o = 0, a = t.readInt(!0); o < a; o++) {
      const h = e.skins[t.readInt(!0)];
      for (let d = 0, f = t.readInt(!0); d < f; d++) {
        const u = t.readInt(!0);
        for (let m = 0, x = t.readInt(!0); m < x; m++) {
          const y = t.readStringRef();
          if (!y)
            throw new Error("attachmentName must not be null.");
          const b = h.getAttachment(u, y), g = t.readByte(), p = t.readInt(!0), w = p - 1;
          switch (g) {
            case nn: {
              const S = b, k = S.bones, A = S.vertices, C = k ? A.length / 3 * 2 : A.length, X = t.readInt(!0), F = new as(p, X, u, S);
              let R = t.readFloat();
              for (let B = 0, E = 0; ; B++) {
                let I, T = t.readInt(!0);
                if (T == 0)
                  I = k ? P.newFloatArray(C) : A;
                else {
                  I = P.newFloatArray(C);
                  const O = t.readInt(!0);
                  if (T += O, i == 1)
                    for (let L = O; L < T; L++)
                      I[L] = t.readFloat();
                  else
                    for (let L = O; L < T; L++)
                      I[L] = t.readFloat() * i;
                  if (!k)
                    for (let L = 0, H = I.length; L < H; L++)
                      I[L] += A[L];
                }
                if (F.setFrame(B, R, I), B == w)
                  break;
                const N = t.readFloat();
                switch (t.readByte()) {
                  case ht:
                    F.setStepped(B);
                    break;
                  case lt:
                    q(t, F, E++, B, 0, R, N, 0, 1, 1);
                }
                R = N;
              }
              r.push(F);
              break;
            }
            case rn: {
              const S = new _t(p, u, b);
              for (let k = 0; k < p; k++) {
                const A = t.readFloat(), C = t.readInt32();
                S.setFrame(
                  k,
                  A,
                  $e[C & 15],
                  C >> 4,
                  t.readFloat()
                );
              }
              r.push(S);
              break;
            }
          }
        }
      }
    }
    const l = t.readInt(!0);
    if (l > 0) {
      const o = new It(l), a = e.slots.length;
      for (let h = 0; h < l; h++) {
        const d = t.readFloat(), f = t.readInt(!0), u = P.newArray(a, 0);
        for (let b = a - 1; b >= 0; b--)
          u[b] = -1;
        const m = P.newArray(a - f, 0);
        let x = 0, y = 0;
        for (let b = 0; b < f; b++) {
          const g = t.readInt(!0);
          for (; x != g; )
            m[y++] = x++;
          u[x + t.readInt(!0)] = x++;
        }
        for (; x < a; )
          m[y++] = x++;
        for (let b = a - 1; b >= 0; b--)
          u[b] == -1 && (u[b] = m[--y]);
        o.setFrame(h, d, u);
      }
      r.push(o);
    }
    const c = t.readInt(!0);
    if (c > 0) {
      const o = new Nt(c);
      for (let a = 0; a < c; a++) {
        const h = t.readFloat(), d = e.events[t.readInt(!0)], f = new ms(h, d);
        f.intValue = t.readInt(!1), f.floatValue = t.readFloat(), f.stringValue = t.readBoolean() ? t.readString() : d.stringValue, f.data.audioPath && (f.volume = t.readFloat(), f.balance = t.readFloat()), o.setFrame(a, f);
      }
      r.push(o);
    }
    let s = 0;
    for (let o = 0, a = r.length; o < a; o++)
      s = Math.max(s, r[o].getDuration());
    return new Se(n, r, s);
  }
}
class Ns {
  constructor(t, n = new Array(), e = 0, r = new DataView(t.buffer)) {
    this.strings = n, this.index = e, this.buffer = r;
  }
  readByte() {
    return this.buffer.getInt8(this.index++);
  }
  readUnsignedByte() {
    return this.buffer.getUint8(this.index++);
  }
  readShort() {
    const t = this.buffer.getInt16(this.index);
    return this.index += 2, t;
  }
  readInt32() {
    const t = this.buffer.getInt32(this.index);
    return this.index += 4, t;
  }
  readInt(t) {
    let n = this.readByte(), e = n & 127;
    return n & 128 && (n = this.readByte(), e |= (n & 127) << 7, n & 128 && (n = this.readByte(), e |= (n & 127) << 14, n & 128 && (n = this.readByte(), e |= (n & 127) << 21, n & 128 && (n = this.readByte(), e |= (n & 127) << 28)))), t ? e : e >>> 1 ^ -(e & 1);
  }
  readStringRef() {
    const t = this.readInt(!0);
    return t == 0 ? null : this.strings[t - 1];
  }
  readString() {
    let t = this.readInt(!0);
    switch (t) {
      case 0:
        return null;
      case 1:
        return "";
    }
    t--;
    let n = "";
    for (let e = 0; e < t; ) {
      const r = this.readUnsignedByte();
      switch (r >> 4) {
        case 12:
        case 13:
          n += String.fromCharCode((r & 31) << 6 | this.readByte() & 63), e += 2;
          break;
        case 14:
          n += String.fromCharCode((r & 15) << 12 | (this.readByte() & 63) << 6 | this.readByte() & 63), e += 3;
          break;
        default:
          n += String.fromCharCode(r), e++;
      }
    }
    return n;
  }
  readFloat() {
    const t = this.buffer.getFloat32(this.index);
    return this.index += 4, t;
  }
  readBoolean() {
    return this.readByte() != 0;
  }
}
let Ds = class {
  constructor(t, n, e, r, i) {
    this.mesh = t, this.skin = n, this.slotIndex = e, this.parent = r, this.inheritTimeline = i;
  }
};
class Us {
  constructor(t = null, n = null) {
    this.bones = t, this.vertices = n;
  }
}
function pt(v, t, n) {
  let e = v.readFloat(), r = v.readFloat() * n;
  for (let i = 0, l = 0, c = t.getFrameCount() - 1; t.setFrame(i, e, r), i != c; i++) {
    const s = v.readFloat(), o = v.readFloat() * n;
    switch (v.readByte()) {
      case ht:
        t.setStepped(i);
        break;
      case lt:
        q(v, t, l++, i, 0, e, s, r, o, n);
    }
    e = s, r = o;
  }
  return t;
}
function fe(v, t, n) {
  let e = v.readFloat(), r = v.readFloat() * n, i = v.readFloat() * n;
  for (let l = 0, c = 0, s = t.getFrameCount() - 1; t.setFrame(l, e, r, i), l != s; l++) {
    const o = v.readFloat(), a = v.readFloat() * n, h = v.readFloat() * n;
    switch (v.readByte()) {
      case ht:
        t.setStepped(l);
        break;
      case lt:
        q(v, t, c++, l, 0, e, o, r, a, n), q(v, t, c++, l, 1, e, o, i, h, n);
    }
    e = o, r = a, i = h;
  }
  return t;
}
function q(v, t, n, e, r, i, l, c, s, o) {
  t.setBezier(
    n,
    e,
    r,
    i,
    c,
    v.readFloat(),
    v.readFloat() * o,
    v.readFloat(),
    v.readFloat() * o,
    l,
    s
  );
}
const Os = 0, qs = 1, zs = 2, Ws = 3, $s = 4, Hs = 5, Gs = 6, js = 7, _s = 8, Ks = 9, Qs = 0, Js = 1, Zs = 2, tn = 3, en = 4, sn = 5, nn = 0, rn = 1, an = 0, on = 1, cn = 2, ht = 1, lt = 2;
class hn {
  constructor() {
    this.minX = 0, this.minY = 0, this.maxX = 0, this.maxY = 0, this.boundingBoxes = new Array(), this.polygons = new Array(), this.polygonPool = new $t(() => P.newFloatArray(16));
  }
  /** Clears any previous polygons, finds all visible bounding box attachments, and computes the world vertices for each bounding
   * box's polygon.
   * @param updateAabb If true, the axis aligned bounding box containing all the polygons is computed. If false, the
   *           SkeletonBounds AABB methods will always return true. */
  update(t, n) {
    if (!t)
      throw new Error("skeleton cannot be null.");
    const e = this.boundingBoxes, r = this.polygons, i = this.polygonPool, l = t.slots, c = l.length;
    e.length = 0, i.freeAll(r), r.length = 0;
    for (let s = 0; s < c; s++) {
      const o = l[s];
      if (!o.bone.active)
        continue;
      const a = o.getAttachment();
      if (a instanceof ie) {
        const h = a;
        e.push(h);
        let d = i.obtain();
        d.length != h.worldVerticesLength && (d = P.newFloatArray(h.worldVerticesLength)), r.push(d), h.computeWorldVertices(o, 0, h.worldVerticesLength, d, 0, 2);
      }
    }
    n ? this.aabbCompute() : (this.minX = Number.POSITIVE_INFINITY, this.minY = Number.POSITIVE_INFINITY, this.maxX = Number.NEGATIVE_INFINITY, this.maxY = Number.NEGATIVE_INFINITY);
  }
  aabbCompute() {
    let t = Number.POSITIVE_INFINITY, n = Number.POSITIVE_INFINITY, e = Number.NEGATIVE_INFINITY, r = Number.NEGATIVE_INFINITY;
    const i = this.polygons;
    for (let l = 0, c = i.length; l < c; l++) {
      const s = i[l], o = s;
      for (let a = 0, h = s.length; a < h; a += 2) {
        const d = o[a], f = o[a + 1];
        t = Math.min(t, d), n = Math.min(n, f), e = Math.max(e, d), r = Math.max(r, f);
      }
    }
    this.minX = t, this.minY = n, this.maxX = e, this.maxY = r;
  }
  /** Returns true if the axis aligned bounding box contains the point. */
  aabbContainsPoint(t, n) {
    return t >= this.minX && t <= this.maxX && n >= this.minY && n <= this.maxY;
  }
  /** Returns true if the axis aligned bounding box intersects the line segment. */
  aabbIntersectsSegment(t, n, e, r) {
    const i = this.minX, l = this.minY, c = this.maxX, s = this.maxY;
    if (t <= i && e <= i || n <= l && r <= l || t >= c && e >= c || n >= s && r >= s)
      return !1;
    const o = (r - n) / (e - t);
    let a = o * (i - t) + n;
    if (a > l && a < s || (a = o * (c - t) + n, a > l && a < s))
      return !0;
    let h = (l - n) / o + t;
    return h > i && h < c || (h = (s - n) / o + t, h > i && h < c);
  }
  /** Returns true if the axis aligned bounding box intersects the axis aligned bounding box of the specified bounds. */
  aabbIntersectsSkeleton(t) {
    return this.minX < t.maxX && this.maxX > t.minX && this.minY < t.maxY && this.maxY > t.minY;
  }
  /** Returns the first bounding box attachment that contains the point, or null. When doing many checks, it is usually more
   * efficient to only call this method if {@link #aabbContainsPoint(float, float)} returns true. */
  containsPoint(t, n) {
    const e = this.polygons;
    for (let r = 0, i = e.length; r < i; r++)
      if (this.containsPointPolygon(e[r], t, n))
        return this.boundingBoxes[r];
    return null;
  }
  /** Returns true if the polygon contains the point. */
  containsPointPolygon(t, n, e) {
    const r = t, i = t.length;
    let l = i - 2, c = !1;
    for (let s = 0; s < i; s += 2) {
      const o = r[s + 1], a = r[l + 1];
      if (o < e && a >= e || a < e && o >= e) {
        const h = r[s];
        h + (e - o) / (a - o) * (r[l] - h) < n && (c = !c);
      }
      l = s;
    }
    return c;
  }
  /** Returns the first bounding box attachment that contains any part of the line segment, or null. When doing many checks, it
   * is usually more efficient to only call this method if {@link #aabbIntersectsSegment()} returns
   * true. */
  intersectsSegment(t, n, e, r) {
    const i = this.polygons;
    for (let l = 0, c = i.length; l < c; l++)
      if (this.intersectsSegmentPolygon(i[l], t, n, e, r))
        return this.boundingBoxes[l];
    return null;
  }
  /** Returns true if the polygon contains any part of the line segment. */
  intersectsSegmentPolygon(t, n, e, r, i) {
    const l = t, c = t.length, s = n - r, o = e - i, a = n * i - e * r;
    let h = l[c - 2], d = l[c - 1];
    for (let f = 0; f < c; f += 2) {
      const u = l[f], m = l[f + 1], x = h * m - d * u, y = h - u, b = d - m, g = s * b - o * y, p = (a * y - s * x) / g;
      if ((p >= h && p <= u || p >= u && p <= h) && (p >= n && p <= r || p >= r && p <= n)) {
        const w = (a * b - o * x) / g;
        if ((w >= d && w <= m || w >= m && w <= d) && (w >= e && w <= i || w >= i && w <= e))
          return !0;
      }
      h = u, d = m;
    }
    return !1;
  }
  /** Returns the polygon for the specified bounding box, or null. */
  getPolygon(t) {
    if (!t)
      throw new Error("boundingBox cannot be null.");
    const n = this.boundingBoxes.indexOf(t);
    return n == -1 ? null : this.polygons[n];
  }
  /** The width of the axis aligned bounding box. */
  getWidth() {
    return this.maxX - this.minX;
  }
  /** The height of the axis aligned bounding box. */
  getHeight() {
    return this.maxY - this.minY;
  }
}
class st {
  constructor() {
    this.convexPolygons = new Array(), this.convexPolygonsIndices = new Array(), this.indicesArray = new Array(), this.isConcaveArray = new Array(), this.triangles = new Array(), this.polygonPool = new $t(() => new Array()), this.polygonIndicesPool = new $t(() => new Array());
  }
  static isConcave(t, n, e, r) {
    const i = r[(n + t - 1) % n] << 1, l = r[t] << 1, c = r[(t + 1) % n] << 1;
    return !this.positiveArea(
      e[i],
      e[i + 1],
      e[l],
      e[l + 1],
      e[c],
      e[c + 1]
    );
  }
  static positiveArea(t, n, e, r, i, l) {
    return t * (l - r) + e * (n - l) + i * (r - n) >= 0;
  }
  static winding(t, n, e, r, i, l) {
    const c = e - t, s = r - n;
    return i * s - l * c + c * n - t * s >= 0 ? 1 : -1;
  }
  triangulate(t) {
    const n = t;
    let e = t.length >> 1;
    const r = this.indicesArray;
    r.length = 0;
    for (let c = 0; c < e; c++)
      r[c] = c;
    const i = this.isConcaveArray;
    i.length = 0;
    for (let c = 0, s = e; c < s; ++c)
      i[c] = st.isConcave(c, e, n, r);
    const l = this.triangles;
    for (l.length = 0; e > 3; ) {
      let c = e - 1, s = 0, o = 1;
      for (; ; ) {
        t:
          if (!i[s]) {
            const d = r[c] << 1, f = r[s] << 1, u = r[o] << 1, m = n[d], x = n[d + 1], y = n[f], b = n[f + 1], g = n[u], p = n[u + 1];
            for (let w = (o + 1) % e; w != c; w = (w + 1) % e) {
              if (!i[w])
                continue;
              const S = r[w] << 1, k = n[S], A = n[S + 1];
              if (st.positiveArea(g, p, m, x, k, A) && st.positiveArea(m, x, y, b, k, A) && st.positiveArea(y, b, g, p, k, A))
                break t;
            }
            break;
          }
        if (o == 0) {
          do {
            if (!i[s])
              break;
            s--;
          } while (s > 0);
          break;
        }
        c = s, s = o, o = (o + 1) % e;
      }
      l.push(r[(e + s - 1) % e]), l.push(r[s]), l.push(r[(s + 1) % e]), r.splice(s, 1), i.splice(s, 1), e--;
      const a = (e + s - 1) % e, h = s == e ? 0 : s;
      i[a] = st.isConcave(a, e, n, r), i[h] = st.isConcave(h, e, n, r);
    }
    return e == 3 && (l.push(r[2]), l.push(r[0]), l.push(r[1])), l;
  }
  decompose(t, n) {
    const e = t, r = this.convexPolygons;
    this.polygonPool.freeAll(r), r.length = 0;
    const i = this.convexPolygonsIndices;
    this.polygonIndicesPool.freeAll(i), i.length = 0;
    let l = this.polygonIndicesPool.obtain();
    l.length = 0;
    let c = this.polygonPool.obtain();
    c.length = 0;
    let s = -1, o = 0;
    for (let a = 0, h = n.length; a < h; a += 3) {
      const d = n[a] << 1, f = n[a + 1] << 1, u = n[a + 2] << 1, m = e[d], x = e[d + 1], y = e[f], b = e[f + 1], g = e[u], p = e[u + 1];
      let w = !1;
      if (s == d) {
        const S = c.length - 4, k = st.winding(c[S], c[S + 1], c[S + 2], c[S + 3], g, p), A = st.winding(g, p, c[0], c[1], c[2], c[3]);
        k == o && A == o && (c.push(g), c.push(p), l.push(u), w = !0);
      }
      w || (c.length > 0 ? (r.push(c), i.push(l)) : (this.polygonPool.free(c), this.polygonIndicesPool.free(l)), c = this.polygonPool.obtain(), c.length = 0, c.push(m), c.push(x), c.push(y), c.push(b), c.push(g), c.push(p), l = this.polygonIndicesPool.obtain(), l.length = 0, l.push(d), l.push(f), l.push(u), o = st.winding(m, x, y, b, g, p), s = d);
    }
    c.length > 0 && (r.push(c), i.push(l));
    for (let a = 0, h = r.length; a < h; a++) {
      if (l = i[a], l.length == 0)
        continue;
      const d = l[0], f = l[l.length - 1];
      c = r[a];
      const u = c.length - 4;
      let m = c[u], x = c[u + 1], y = c[u + 2], b = c[u + 3];
      const g = c[0], p = c[1], w = c[2], S = c[3], k = st.winding(m, x, y, b, g, p);
      for (let A = 0; A < h; A++) {
        if (A == a)
          continue;
        const C = i[A];
        if (C.length != 3)
          continue;
        const X = C[0], F = C[1], R = C[2], B = r[A], E = B[B.length - 2], I = B[B.length - 1];
        if (X != d || F != f)
          continue;
        const T = st.winding(m, x, y, b, E, I), N = st.winding(E, I, g, p, w, S);
        T == k && N == k && (B.length = 0, C.length = 0, c.push(E), c.push(I), l.push(R), m = y, x = b, y = E, b = I, A = 0);
      }
    }
    for (let a = r.length - 1; a >= 0; a--)
      c = r[a], c.length == 0 && (r.splice(a, 1), this.polygonPool.free(c), l = i[a], i.splice(a, 1), this.polygonIndicesPool.free(l));
    return r;
  }
}
class Qt {
  constructor() {
    this.clippedVertices = new Array(), this.clippedTriangles = new Array(), this.triangulator = new st(), this.clippingPolygon = new Array(), this.clipOutput = new Array(), this.scratch = new Array(), this.clipAttachment = null, this.clippingPolygons = null;
  }
  static makeClockwise(t) {
    const n = t, e = t.length;
    let r = n[e - 2] * n[1] - n[0] * n[e - 1], i = 0, l = 0, c = 0, s = 0;
    for (let o = 0, a = e - 3; o < a; o += 2)
      i = n[o], l = n[o + 1], c = n[o + 2], s = n[o + 3], r += i * s - c * l;
    if (!(r < 0))
      for (let o = 0, a = e - 2, h = e >> 1; o < h; o += 2) {
        const d = n[o], f = n[o + 1], u = a - o;
        n[o] = n[u], n[o + 1] = n[u + 1], n[u] = d, n[u + 1] = f;
      }
  }
  clipStart(t, n) {
    if (this.clipAttachment)
      return 0;
    this.clipAttachment = n;
    const e = n.worldVerticesLength, r = P.setArraySize(this.clippingPolygon, e);
    n.computeWorldVertices(t, 0, e, r, 0, 2);
    const i = this.clippingPolygon;
    Qt.makeClockwise(i);
    const l = this.clippingPolygons = this.triangulator.decompose(
      i,
      this.triangulator.triangulate(i)
    );
    for (let c = 0, s = l.length; c < s; c++) {
      const o = l[c];
      Qt.makeClockwise(o), o.push(o[0]), o.push(o[1]);
    }
    return l.length;
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
  clipTriangles(t, n, e, r, i, l, c, s) {
    const o = this.clipOutput, a = this.clippedVertices, h = this.clippedTriangles, d = this.clippingPolygons, f = d.length, u = s ? 12 : 8;
    let m = 0;
    a.length = 0, h.length = 0;
    t:
      for (let x = 0; x < r; x += 3) {
        let y = e[x] << 1;
        const b = t[y], g = t[y + 1], p = i[y], w = i[y + 1];
        y = e[x + 1] << 1;
        const S = t[y], k = t[y + 1], A = i[y], C = i[y + 1];
        y = e[x + 2] << 1;
        const X = t[y], F = t[y + 1], R = i[y], B = i[y + 1];
        for (let E = 0; E < f; E++) {
          let I = a.length;
          if (this.clip(b, g, S, k, X, F, d[E], o)) {
            const T = o.length;
            if (T == 0)
              continue;
            const N = k - F, O = X - S, L = b - X, H = F - g, _ = 1 / (N * L + O * (g - F));
            let j = T >> 1;
            const U = this.clipOutput, D = P.setArraySize(a, I + j * u);
            for (let et = 0; et < T; et += 2) {
              const ct = U[et], J = U[et + 1];
              D[I] = ct, D[I + 1] = J, D[I + 2] = l.r, D[I + 3] = l.g, D[I + 4] = l.b, D[I + 5] = l.a;
              const it = ct - X, rt = J - F, yt = (N * it + O * rt) * _, Ct = (H * it + L * rt) * _, Rt = 1 - yt - Ct;
              D[I + 6] = p * yt + A * Ct + R * Rt, D[I + 7] = w * yt + C * Ct + B * Rt, s && (D[I + 8] = c.r, D[I + 9] = c.g, D[I + 10] = c.b, D[I + 11] = c.a), I += u;
            }
            I = h.length;
            const G = P.setArraySize(h, I + 3 * (j - 2));
            j--;
            for (let et = 1; et < j; et++)
              G[I] = m, G[I + 1] = m + et, G[I + 2] = m + et + 1, I += 3;
            m += j + 1;
          } else {
            const T = P.setArraySize(a, I + 3 * u);
            T[I] = b, T[I + 1] = g, T[I + 2] = l.r, T[I + 3] = l.g, T[I + 4] = l.b, T[I + 5] = l.a, s ? (T[I + 6] = p, T[I + 7] = w, T[I + 8] = c.r, T[I + 9] = c.g, T[I + 10] = c.b, T[I + 11] = c.a, T[I + 12] = S, T[I + 13] = k, T[I + 14] = l.r, T[I + 15] = l.g, T[I + 16] = l.b, T[I + 17] = l.a, T[I + 18] = A, T[I + 19] = C, T[I + 20] = c.r, T[I + 21] = c.g, T[I + 22] = c.b, T[I + 23] = c.a, T[I + 24] = X, T[I + 25] = F, T[I + 26] = l.r, T[I + 27] = l.g, T[I + 28] = l.b, T[I + 29] = l.a, T[I + 30] = R, T[I + 31] = B, T[I + 32] = c.r, T[I + 33] = c.g, T[I + 34] = c.b, T[I + 35] = c.a) : (T[I + 6] = p, T[I + 7] = w, T[I + 8] = S, T[I + 9] = k, T[I + 10] = l.r, T[I + 11] = l.g, T[I + 12] = l.b, T[I + 13] = l.a, T[I + 14] = A, T[I + 15] = C, T[I + 16] = X, T[I + 17] = F, T[I + 18] = l.r, T[I + 19] = l.g, T[I + 20] = l.b, T[I + 21] = l.a, T[I + 22] = R, T[I + 23] = B), I = h.length;
            const N = P.setArraySize(h, I + 3);
            N[I] = m, N[I + 1] = m + 1, N[I + 2] = m + 2, m += 3;
            continue t;
          }
        }
      }
  }
  /** Clips the input triangle against the convex, clockwise clipping area. If the triangle lies entirely within the clipping
   * area, false is returned. The clipping area must duplicate the first vertex at the end of the vertices list. */
  clip(t, n, e, r, i, l, c, s) {
    const o = s;
    let a = !1, h;
    c.length % 4 >= 2 ? (h = s, s = this.scratch) : h = this.scratch, h.length = 0, h.push(t), h.push(n), h.push(e), h.push(r), h.push(i), h.push(l), h.push(t), h.push(n), s.length = 0;
    const d = c, f = c.length - 4;
    for (let u = 0; ; u += 2) {
      const m = d[u], x = d[u + 1], y = d[u + 2], b = d[u + 3], g = m - y, p = x - b, w = h, S = h.length - 2, k = s.length;
      for (let C = 0; C < S; C += 2) {
        const X = w[C], F = w[C + 1], R = w[C + 2], B = w[C + 3], E = g * (B - b) - p * (R - y) > 0;
        if (g * (F - b) - p * (X - y) > 0) {
          if (E) {
            s.push(R), s.push(B);
            continue;
          }
          const I = B - F, T = R - X, N = I * (y - m) - T * (b - x);
          if (Math.abs(N) > 1e-6) {
            const O = (T * (x - F) - I * (m - X)) / N;
            s.push(m + (y - m) * O), s.push(x + (b - x) * O);
          } else
            s.push(m), s.push(x);
        } else if (E) {
          const I = B - F, T = R - X, N = I * (y - m) - T * (b - x);
          if (Math.abs(N) > 1e-6) {
            const O = (T * (x - F) - I * (m - X)) / N;
            s.push(m + (y - m) * O), s.push(x + (b - x) * O);
          } else
            s.push(m), s.push(x);
          s.push(R), s.push(B);
        }
        a = !0;
      }
      if (k == s.length)
        return o.length = 0, !0;
      if (s.push(s[0]), s.push(s[1]), u == f)
        break;
      const A = s;
      s = h, s.length = 0, h = A;
    }
    if (o != s) {
      o.length = 0;
      for (let u = 0, m = s.length - 2; u < m; u++)
        o[u] = s[u];
    } else
      o.length = o.length - 2;
    return a;
  }
}
class ln {
  constructor(t) {
    this.scale = 1, this.linkedMeshes = new Array(), this.attachmentLoader = t;
  }
  readSkeletonData(t) {
    const n = this.scale, e = new Kt(), r = typeof t == "string" ? JSON.parse(t) : t, i = r.skeleton;
    if (i && (e.hash = i.hash, e.version = i.spine, e.x = i.x, e.y = i.y, e.width = i.width, e.height = i.height, e.fps = i.fps, e.imagesPath = i.images), r.bones)
      for (let l = 0; l < r.bones.length; l++) {
        const c = r.bones[l];
        let s = null;
        const o = Y(c, "parent", null);
        o && (s = e.findBone(o));
        const a = new us(e.bones.length, c.name, s);
        a.length = Y(c, "length", 0) * n, a.x = Y(c, "x", 0) * n, a.y = Y(c, "y", 0) * n, a.rotation = Y(c, "rotation", 0), a.scaleX = Y(c, "scaleX", 1), a.scaleY = Y(c, "scaleY", 1), a.shearX = Y(c, "shearX", 0), a.shearY = Y(c, "shearY", 0), a.transformMode = P.enumValue(ot, Y(c, "transform", "Normal")), a.skinRequired = Y(c, "skin", !1);
        const h = Y(c, "color", null);
        h && a.color.setFromString(h), e.bones.push(a);
      }
    if (r.slots)
      for (let l = 0; l < r.slots.length; l++) {
        const c = r.slots[l], s = e.findBone(c.bone);
        if (!s)
          throw new Error(`Couldn't find bone ${c.bone} for slot ${c.name}`);
        const o = new bs(e.slots.length, c.name, s), a = Y(c, "color", null);
        a && o.color.setFromString(a);
        const h = Y(c, "dark", null);
        h && (o.darkColor = V.fromString(h)), o.attachmentName = Y(c, "attachment", null), o.blendMode = P.enumValue(Ft, Y(c, "blend", "normal")), e.slots.push(o);
      }
    if (r.ik)
      for (let l = 0; l < r.ik.length; l++) {
        const c = r.ik[l], s = new xs(c.name);
        s.order = Y(c, "order", 0), s.skinRequired = Y(c, "skin", !1);
        for (let a = 0; a < c.bones.length; a++) {
          const h = e.findBone(c.bones[a]);
          if (!h)
            throw new Error(`Couldn't find bone ${c.bones[a]} for IK constraint ${c.name}.`);
          s.bones.push(h);
        }
        const o = e.findBone(c.target);
        if (!o)
          throw new Error(`Couldn't find target bone ${c.target} for IK constraint ${c.name}.`);
        s.target = o, s.mix = Y(c, "mix", 1), s.softness = Y(c, "softness", 0) * n, s.bendDirection = Y(c, "bendPositive", !0) ? 1 : -1, s.compress = Y(c, "compress", !1), s.stretch = Y(c, "stretch", !1), s.uniform = Y(c, "uniform", !1), e.ikConstraints.push(s);
      }
    if (r.transform)
      for (let l = 0; l < r.transform.length; l++) {
        const c = r.transform[l], s = new ws(c.name);
        s.order = Y(c, "order", 0), s.skinRequired = Y(c, "skin", !1);
        for (let h = 0; h < c.bones.length; h++) {
          const d = c.bones[h], f = e.findBone(d);
          if (!f)
            throw new Error(`Couldn't find bone ${d} for transform constraint ${c.name}.`);
          s.bones.push(f);
        }
        const o = c.target, a = e.findBone(o);
        if (!a)
          throw new Error(`Couldn't find target bone ${o} for transform constraint ${c.name}.`);
        s.target = a, s.local = Y(c, "local", !1), s.relative = Y(c, "relative", !1), s.offsetRotation = Y(c, "rotation", 0), s.offsetX = Y(c, "x", 0) * n, s.offsetY = Y(c, "y", 0) * n, s.offsetScaleX = Y(c, "scaleX", 0), s.offsetScaleY = Y(c, "scaleY", 0), s.offsetShearY = Y(c, "shearY", 0), s.mixRotate = Y(c, "mixRotate", 1), s.mixX = Y(c, "mixX", 1), s.mixY = Y(c, "mixY", s.mixX), s.mixScaleX = Y(c, "mixScaleX", 1), s.mixScaleY = Y(c, "mixScaleY", s.mixScaleX), s.mixShearY = Y(c, "mixShearY", 1), e.transformConstraints.push(s);
      }
    if (r.path)
      for (let l = 0; l < r.path.length; l++) {
        const c = r.path[l], s = new ps(c.name);
        s.order = Y(c, "order", 0), s.skinRequired = Y(c, "skin", !1);
        for (let h = 0; h < c.bones.length; h++) {
          const d = c.bones[h], f = e.findBone(d);
          if (!f)
            throw new Error(`Couldn't find bone ${d} for path constraint ${c.name}.`);
          s.bones.push(f);
        }
        const o = c.target, a = e.findSlot(o);
        if (!a)
          throw new Error(`Couldn't find target slot ${o} for path constraint ${c.name}.`);
        s.target = a, s.positionMode = P.enumValue(kt, Y(c, "positionMode", "Percent")), s.spacingMode = P.enumValue(tt, Y(c, "spacingMode", "Length")), s.rotateMode = P.enumValue(Vt, Y(c, "rotateMode", "Tangent")), s.offsetRotation = Y(c, "rotation", 0), s.position = Y(c, "position", 0), s.positionMode == kt.Fixed && (s.position *= n), s.spacing = Y(c, "spacing", 0), (s.spacingMode == tt.Length || s.spacingMode == tt.Fixed) && (s.spacing *= n), s.mixRotate = Y(c, "mixRotate", 1), s.mixX = Y(c, "mixX", 1), s.mixY = Y(c, "mixY", s.mixX), e.pathConstraints.push(s);
      }
    if (r.skins)
      for (let l = 0; l < r.skins.length; l++) {
        const c = r.skins[l], s = new we(c.name);
        if (c.bones)
          for (let o = 0; o < c.bones.length; o++) {
            const a = c.bones[o], h = e.findBone(a);
            if (!h)
              throw new Error(`Couldn't find bone ${a} for skin ${c.name}.`);
            s.bones.push(h);
          }
        if (c.ik)
          for (let o = 0; o < c.ik.length; o++) {
            const a = c.ik[o], h = e.findIkConstraint(a);
            if (!h)
              throw new Error(`Couldn't find IK constraint ${a} for skin ${c.name}.`);
            s.constraints.push(h);
          }
        if (c.transform)
          for (let o = 0; o < c.transform.length; o++) {
            const a = c.transform[o], h = e.findTransformConstraint(a);
            if (!h)
              throw new Error(`Couldn't find transform constraint ${a} for skin ${c.name}.`);
            s.constraints.push(h);
          }
        if (c.path)
          for (let o = 0; o < c.path.length; o++) {
            const a = c.path[o], h = e.findPathConstraint(a);
            if (!h)
              throw new Error(`Couldn't find path constraint ${a} for skin ${c.name}.`);
            s.constraints.push(h);
          }
        for (const o in c.attachments) {
          const a = e.findSlot(o);
          if (!a)
            throw new Error(`Couldn't find slot ${o} for skin ${c.name}.`);
          const h = c.attachments[o];
          for (const d in h) {
            const f = this.readAttachment(h[d], s, a.index, d, e);
            f && s.setAttachment(a.index, d, f);
          }
        }
        e.skins.push(s), s.name == "default" && (e.defaultSkin = s);
      }
    for (let l = 0, c = this.linkedMeshes.length; l < c; l++) {
      const s = this.linkedMeshes[l], o = s.skin ? e.findSkin(s.skin) : e.defaultSkin;
      if (!o)
        throw new Error(`Skin not found: ${s.skin}`);
      const a = o.getAttachment(s.slotIndex, s.parent);
      if (!a)
        throw new Error(`Parent mesh not found: ${s.parent}`);
      s.mesh.timelineAttachment = s.inheritTimeline ? a : s.mesh, s.mesh.setParentMesh(a), s.mesh.region != null && s.mesh.updateRegion();
    }
    if (this.linkedMeshes.length = 0, r.events)
      for (const l in r.events) {
        const c = r.events[l], s = new gs(l);
        s.intValue = Y(c, "int", 0), s.floatValue = Y(c, "float", 0), s.stringValue = Y(c, "string", ""), s.audioPath = Y(c, "audio", null), s.audioPath && (s.volume = Y(c, "volume", 1), s.balance = Y(c, "balance", 0)), e.events.push(s);
      }
    if (r.animations)
      for (const l in r.animations) {
        const c = r.animations[l];
        this.readAnimation(c, l, e);
      }
    return e;
  }
  readAttachment(t, n, e, r, i) {
    const l = this.scale;
    switch (r = Y(t, "name", r), Y(t, "type", "region")) {
      case "region": {
        const c = Y(t, "path", r), s = this.readSequence(Y(t, "sequence", null)), o = this.attachmentLoader.newRegionAttachment(n, r, c, s);
        if (!o)
          return null;
        o.path = c, o.x = Y(t, "x", 0) * l, o.y = Y(t, "y", 0) * l, o.scaleX = Y(t, "scaleX", 1), o.scaleY = Y(t, "scaleY", 1), o.rotation = Y(t, "rotation", 0), o.width = t.width * l, o.height = t.height * l, o.sequence = s;
        const a = Y(t, "color", null);
        return a && o.color.setFromString(a), o.region != null && o.updateRegion(), o;
      }
      case "boundingbox": {
        const c = this.attachmentLoader.newBoundingBoxAttachment(n, r);
        if (!c)
          return null;
        this.readVertices(t, c, t.vertexCount << 1);
        const s = Y(t, "color", null);
        return s && c.color.setFromString(s), c;
      }
      case "mesh":
      case "linkedmesh": {
        const c = Y(t, "path", r), s = this.readSequence(Y(t, "sequence", null)), o = this.attachmentLoader.newMeshAttachment(n, r, c, s);
        if (!o)
          return null;
        o.path = c;
        const a = Y(t, "color", null);
        a && o.color.setFromString(a), o.width = Y(t, "width", 0) * l, o.height = Y(t, "height", 0) * l, o.sequence = s;
        const h = Y(t, "parent", null);
        if (h)
          return this.linkedMeshes.push(
            new dn(
              o,
              Y(t, "skin", null),
              e,
              h,
              Y(t, "timelines", !0)
            )
          ), o;
        const d = t.uvs;
        return this.readVertices(t, o, d.length), o.triangles = t.triangles, o.regionUVs = d, o.region != null && o.updateRegion(), o.edges = Y(t, "edges", null), o.hullLength = Y(t, "hull", 0) * 2, o;
      }
      case "path": {
        const c = this.attachmentLoader.newPathAttachment(n, r);
        if (!c)
          return null;
        c.closed = Y(t, "closed", !1), c.constantSpeed = Y(t, "constantSpeed", !0);
        const s = t.vertexCount;
        this.readVertices(t, c, s << 1);
        const o = P.newArray(s / 3, 0);
        for (let h = 0; h < t.lengths.length; h++)
          o[h] = t.lengths[h] * l;
        c.lengths = o;
        const a = Y(t, "color", null);
        return a && c.color.setFromString(a), c;
      }
      case "point": {
        const c = this.attachmentLoader.newPointAttachment(n, r);
        if (!c)
          return null;
        c.x = Y(t, "x", 0) * l, c.y = Y(t, "y", 0) * l, c.rotation = Y(t, "rotation", 0);
        const s = Y(t, "color", null);
        return s && c.color.setFromString(s), c;
      }
      case "clipping": {
        const c = this.attachmentLoader.newClippingAttachment(n, r);
        if (!c)
          return null;
        const s = Y(t, "end", null);
        s && (c.endSlot = i.findSlot(s));
        const o = t.vertexCount;
        this.readVertices(t, c, o << 1);
        const a = Y(t, "color", null);
        return a && c.color.setFromString(a), c;
      }
    }
    return null;
  }
  readSequence(t) {
    if (t == null)
      return null;
    const n = new Gt(Y(t, "count", 0));
    return n.start = Y(t, "start", 1), n.digits = Y(t, "digits", 0), n.setupIndex = Y(t, "setup", 0), n;
  }
  readVertices(t, n, e) {
    const r = this.scale;
    n.worldVerticesLength = e;
    const i = t.vertices;
    if (e == i.length) {
      const s = P.toFloatArray(i);
      if (r != 1)
        for (let o = 0, a = i.length; o < a; o++)
          s[o] *= r;
      n.vertices = s;
      return;
    }
    const l = new Array(), c = new Array();
    for (let s = 0, o = i.length; s < o; ) {
      const a = i[s++];
      c.push(a);
      for (let h = s + a * 4; s < h; s += 4)
        c.push(i[s]), l.push(i[s + 1] * r), l.push(i[s + 2] * r), l.push(i[s + 3]);
    }
    n.bones = c, n.vertices = P.toFloatArray(l);
  }
  readAnimation(t, n, e) {
    const r = this.scale, i = new Array();
    if (t.slots)
      for (const c in t.slots) {
        const s = t.slots[c], o = e.findSlot(c);
        if (!o)
          throw new Error("Slot not found: " + c);
        const a = o.index;
        for (const h in s) {
          const d = s[h];
          if (!d)
            continue;
          const f = d.length;
          if (h == "attachment") {
            const u = new Tt(f, a);
            for (let m = 0; m < f; m++) {
              const x = d[m];
              u.setFrame(m, Y(x, "time", 0), Y(x, "name", null));
            }
            i.push(u);
          } else if (h == "rgba") {
            const u = new es(f, f << 2, a);
            let m = d[0], x = Y(m, "time", 0), y = V.fromString(m.color);
            for (let b = 0, g = 0; ; b++) {
              u.setFrame(b, x, y.r, y.g, y.b, y.a);
              const p = d[b + 1];
              if (!p) {
                u.shrink(g);
                break;
              }
              const w = Y(p, "time", 0), S = V.fromString(p.color), k = m.curve;
              k && (g = W(k, u, g, b, 0, x, w, y.r, S.r, 1), g = W(k, u, g, b, 1, x, w, y.g, S.g, 1), g = W(k, u, g, b, 2, x, w, y.b, S.b, 1), g = W(k, u, g, b, 3, x, w, y.a, S.a, 1)), x = w, y = S, m = p;
            }
            i.push(u);
          } else if (h == "rgb") {
            const u = new ss(f, f * 3, a);
            let m = d[0], x = Y(m, "time", 0), y = V.fromString(m.color);
            for (let b = 0, g = 0; ; b++) {
              u.setFrame(b, x, y.r, y.g, y.b);
              const p = d[b + 1];
              if (!p) {
                u.shrink(g);
                break;
              }
              const w = Y(p, "time", 0), S = V.fromString(p.color), k = m.curve;
              k && (g = W(k, u, g, b, 0, x, w, y.r, S.r, 1), g = W(k, u, g, b, 1, x, w, y.g, S.g, 1), g = W(k, u, g, b, 2, x, w, y.b, S.b, 1)), x = w, y = S, m = p;
            }
            i.push(u);
          } else if (h == "alpha")
            i.push(ut(d, new ns(f, f, a), 0, 1));
          else if (h == "rgba2") {
            const u = new is(f, f * 7, a);
            let m = d[0], x = Y(m, "time", 0), y = V.fromString(m.light), b = V.fromString(m.dark);
            for (let g = 0, p = 0; ; g++) {
              u.setFrame(g, x, y.r, y.g, y.b, y.a, b.r, b.g, b.b);
              const w = d[g + 1];
              if (!w) {
                u.shrink(p);
                break;
              }
              const S = Y(w, "time", 0), k = V.fromString(w.light), A = V.fromString(w.dark), C = m.curve;
              C && (p = W(C, u, p, g, 0, x, S, y.r, k.r, 1), p = W(C, u, p, g, 1, x, S, y.g, k.g, 1), p = W(C, u, p, g, 2, x, S, y.b, k.b, 1), p = W(C, u, p, g, 3, x, S, y.a, k.a, 1), p = W(C, u, p, g, 4, x, S, b.r, A.r, 1), p = W(C, u, p, g, 5, x, S, b.g, A.g, 1), p = W(C, u, p, g, 6, x, S, b.b, A.b, 1)), x = S, y = k, b = A, m = w;
            }
            i.push(u);
          } else if (h == "rgb2") {
            const u = new rs(f, f * 6, a);
            let m = d[0], x = Y(m, "time", 0), y = V.fromString(m.light), b = V.fromString(m.dark);
            for (let g = 0, p = 0; ; g++) {
              u.setFrame(g, x, y.r, y.g, y.b, b.r, b.g, b.b);
              const w = d[g + 1];
              if (!w) {
                u.shrink(p);
                break;
              }
              const S = Y(w, "time", 0), k = V.fromString(w.light), A = V.fromString(w.dark), C = m.curve;
              C && (p = W(C, u, p, g, 0, x, S, y.r, k.r, 1), p = W(C, u, p, g, 1, x, S, y.g, k.g, 1), p = W(C, u, p, g, 2, x, S, y.b, k.b, 1), p = W(C, u, p, g, 3, x, S, b.r, A.r, 1), p = W(C, u, p, g, 4, x, S, b.g, A.g, 1), p = W(C, u, p, g, 5, x, S, b.b, A.b, 1)), x = S, y = k, b = A, m = w;
            }
            i.push(u);
          }
        }
      }
    if (t.bones)
      for (const c in t.bones) {
        const s = t.bones[c], o = e.findBone(c);
        if (!o)
          throw new Error("Bone not found: " + c);
        const a = o.index;
        for (const h in s) {
          const d = s[h], f = d.length;
          if (f != 0) {
            if (h === "rotate")
              i.push(ut(d, new jt(f, f, a), 0, 1));
            else if (h === "translate") {
              const u = new He(f, f << 1, a);
              i.push(ue(d, u, "x", "y", 0, r));
            } else if (h === "translatex") {
              const u = new Ge(f, f, a);
              i.push(ut(d, u, 0, r));
            } else if (h === "translatey") {
              const u = new je(f, f, a);
              i.push(ut(d, u, 0, r));
            } else if (h === "scale") {
              const u = new _e(f, f << 1, a);
              i.push(ue(d, u, "x", "y", 1, 1));
            } else if (h === "scalex") {
              const u = new Ke(f, f, a);
              i.push(ut(d, u, 1, 1));
            } else if (h === "scaley") {
              const u = new Qe(f, f, a);
              i.push(ut(d, u, 1, 1));
            } else if (h === "shear") {
              const u = new Je(f, f << 1, a);
              i.push(ue(d, u, "x", "y", 0, 1));
            } else if (h === "shearx") {
              const u = new Ze(f, f, a);
              i.push(ut(d, u, 0, 1));
            } else if (h === "sheary") {
              const u = new ts(f, f, a);
              i.push(ut(d, u, 0, 1));
            }
          }
        }
      }
    if (t.ik)
      for (const c in t.ik) {
        const s = t.ik[c];
        let o = s[0];
        if (!o)
          continue;
        const a = e.findIkConstraint(c);
        if (!a)
          throw new Error("IK Constraint not found: " + c);
        const h = e.ikConstraints.indexOf(a), d = new os(s.length, s.length << 1, h);
        let f = Y(o, "time", 0), u = Y(o, "mix", 1), m = Y(o, "softness", 0) * r;
        for (let x = 0, y = 0; ; x++) {
          d.setFrame(
            x,
            f,
            u,
            m,
            Y(o, "bendPositive", !0) ? 1 : -1,
            Y(o, "compress", !1),
            Y(o, "stretch", !1)
          );
          const b = s[x + 1];
          if (!b) {
            d.shrink(y);
            break;
          }
          const g = Y(b, "time", 0), p = Y(b, "mix", 1), w = Y(b, "softness", 0) * r, S = o.curve;
          S && (y = W(S, d, y, x, 0, f, g, u, p, 1), y = W(S, d, y, x, 1, f, g, m, w, r)), f = g, u = p, m = w, o = b;
        }
        i.push(d);
      }
    if (t.transform)
      for (const c in t.transform) {
        const s = t.transform[c];
        let o = s[0];
        if (!o)
          continue;
        const a = e.findTransformConstraint(c);
        if (!a)
          throw new Error("Transform constraint not found: " + c);
        const h = e.transformConstraints.indexOf(a), d = new cs(s.length, s.length * 6, h);
        let f = Y(o, "time", 0), u = Y(o, "mixRotate", 1), m = Y(o, "mixX", 1), x = Y(o, "mixY", m), y = Y(o, "mixScaleX", 1), b = Y(o, "mixScaleY", y);
        const g = Y(o, "mixShearY", 1);
        for (let p = 0, w = 0; ; p++) {
          d.setFrame(p, f, u, m, x, y, b, g);
          const S = s[p + 1];
          if (!S) {
            d.shrink(w);
            break;
          }
          const k = Y(S, "time", 0), A = Y(S, "mixRotate", 1), C = Y(S, "mixX", 1), X = Y(S, "mixY", C), F = Y(S, "mixScaleX", 1), R = Y(S, "mixScaleY", F), B = Y(S, "mixShearY", 1), E = o.curve;
          E && (w = W(E, d, w, p, 0, f, k, u, A, 1), w = W(E, d, w, p, 1, f, k, m, C, 1), w = W(E, d, w, p, 2, f, k, x, X, 1), w = W(E, d, w, p, 3, f, k, y, F, 1), w = W(E, d, w, p, 4, f, k, b, R, 1), w = W(E, d, w, p, 5, f, k, g, B, 1)), f = k, u = A, m = C, x = X, y = F, b = R, y = F, o = S;
        }
        i.push(d);
      }
    if (t.path)
      for (const c in t.path) {
        const s = t.path[c], o = e.findPathConstraint(c);
        if (!o)
          throw new Error("Path constraint not found: " + c);
        const a = e.pathConstraints.indexOf(o);
        for (const h in s) {
          const d = s[h];
          let f = d[0];
          if (!f)
            continue;
          const u = d.length;
          if (h === "position") {
            const m = new hs(u, u, a);
            i.push(
              ut(d, m, 0, o.positionMode == kt.Fixed ? r : 1)
            );
          } else if (h === "spacing") {
            const m = new ls(u, u, a);
            i.push(
              ut(
                d,
                m,
                0,
                o.spacingMode == tt.Length || o.spacingMode == tt.Fixed ? r : 1
              )
            );
          } else if (h === "mix") {
            const m = new ds(u, u * 3, a);
            let x = Y(f, "time", 0), y = Y(f, "mixRotate", 1), b = Y(f, "mixX", 1), g = Y(f, "mixY", b);
            for (let p = 0, w = 0; ; p++) {
              m.setFrame(p, x, y, b, g);
              const S = d[p + 1];
              if (!S) {
                m.shrink(w);
                break;
              }
              const k = Y(S, "time", 0), A = Y(S, "mixRotate", 1), C = Y(S, "mixX", 1), X = Y(S, "mixY", C), F = f.curve;
              F && (w = W(F, m, w, p, 0, x, k, y, A, 1), w = W(F, m, w, p, 1, x, k, b, C, 1), w = W(F, m, w, p, 2, x, k, g, X, 1)), x = k, y = A, b = C, g = X, f = S;
            }
            i.push(m);
          }
        }
      }
    if (t.attachments)
      for (const c in t.attachments) {
        const s = t.attachments[c], o = e.findSkin(c);
        if (!o)
          throw new Error("Skin not found: " + c);
        for (const a in s) {
          const h = s[a], d = e.findSlot(a);
          if (!d)
            throw new Error("Slot not found: " + a);
          const f = d.index;
          for (const u in h) {
            const m = h[u], x = o.getAttachment(f, u);
            for (const y in m) {
              const b = m[y];
              let g = b[0];
              if (g) {
                if (y == "deform") {
                  const p = x.bones, w = x.vertices, S = p ? w.length / 3 * 2 : w.length, k = new as(b.length, b.length, f, x);
                  let A = Y(g, "time", 0);
                  for (let C = 0, X = 0; ; C++) {
                    let F;
                    const R = Y(g, "vertices", null);
                    if (!R)
                      F = p ? P.newFloatArray(S) : w;
                    else {
                      F = P.newFloatArray(S);
                      const T = Y(g, "offset", 0);
                      if (P.arrayCopy(R, 0, F, T, R.length), r != 1)
                        for (let N = T, O = N + R.length; N < O; N++)
                          F[N] *= r;
                      if (!p)
                        for (let N = 0; N < S; N++)
                          F[N] += w[N];
                    }
                    k.setFrame(C, A, F);
                    const B = b[C + 1];
                    if (!B) {
                      k.shrink(X);
                      break;
                    }
                    const E = Y(B, "time", 0), I = g.curve;
                    I && (X = W(I, k, X, C, 0, A, E, 0, 1, 1)), A = E, g = B;
                  }
                  i.push(k);
                } else if (y == "sequence") {
                  const p = new _t(
                    b.length,
                    f,
                    x
                  );
                  let w = 0;
                  for (let S = 0; S < b.length; S++) {
                    const k = Y(g, "delay", w), A = Y(g, "time", 0), C = bt[Y(g, "mode", "hold")], X = Y(g, "index", 0);
                    p.setFrame(S, A, C, X, k), w = k, g = b[S + 1];
                  }
                  i.push(p);
                }
              }
            }
          }
        }
      }
    if (t.drawOrder) {
      const c = new It(t.drawOrder.length), s = e.slots.length;
      let o = 0;
      for (let a = 0; a < t.drawOrder.length; a++, o++) {
        const h = t.drawOrder[a];
        let d = null;
        const f = Y(h, "offsets", null);
        if (f) {
          d = P.newArray(s, -1);
          const u = P.newArray(s - f.length, 0);
          let m = 0, x = 0;
          for (let y = 0; y < f.length; y++) {
            const b = f[y], g = e.findSlot(b.slot);
            if (!g)
              throw new Error("Slot not found: " + g);
            const p = g.index;
            for (; m != p; )
              u[x++] = m++;
            d[m + b.offset] = m++;
          }
          for (; m < s; )
            u[x++] = m++;
          for (let y = s - 1; y >= 0; y--)
            d[y] == -1 && (d[y] = u[--x]);
        }
        c.setFrame(o, Y(h, "time", 0), d);
      }
      i.push(c);
    }
    if (t.events) {
      const c = new Nt(t.events.length);
      let s = 0;
      for (let o = 0; o < t.events.length; o++, s++) {
        const a = t.events[o], h = e.findEvent(a.name);
        if (!h)
          throw new Error("Event not found: " + a.name);
        const d = new ms(P.toSinglePrecision(Y(a, "time", 0)), h);
        d.intValue = Y(a, "int", h.intValue), d.floatValue = Y(a, "float", h.floatValue), d.stringValue = Y(a, "string", h.stringValue), d.data.audioPath && (d.volume = Y(a, "volume", 1), d.balance = Y(a, "balance", 0)), c.setFrame(s, d);
      }
      i.push(c);
    }
    let l = 0;
    for (let c = 0, s = i.length; c < s; c++)
      l = Math.max(l, i[c].getDuration());
    e.animations.push(new Se(n, i, l));
  }
}
class dn {
  constructor(t, n, e, r, i) {
    this.mesh = t, this.skin = n, this.slotIndex = e, this.parent = r, this.inheritTimeline = i;
  }
}
function ut(v, t, n, e) {
  let r = v[0], i = Y(r, "time", 0), l = Y(r, "value", n) * e, c = 0;
  for (let s = 0; ; s++) {
    t.setFrame(s, i, l);
    const o = v[s + 1];
    if (!o)
      return t.shrink(c), t;
    const a = Y(o, "time", 0), h = Y(o, "value", n) * e;
    r.curve && (c = W(r.curve, t, c, s, 0, i, a, l, h, e)), i = a, l = h, r = o;
  }
}
function ue(v, t, n, e, r, i) {
  let l = v[0], c = Y(l, "time", 0), s = Y(l, n, r) * i, o = Y(l, e, r) * i, a = 0;
  for (let h = 0; ; h++) {
    t.setFrame(h, c, s, o);
    const d = v[h + 1];
    if (!d)
      return t.shrink(a), t;
    const f = Y(d, "time", 0), u = Y(d, n, r) * i, m = Y(d, e, r) * i, x = l.curve;
    x && (a = W(x, t, a, h, 0, c, f, s, u, i), a = W(x, t, a, h, 1, c, f, o, m, i)), c = f, s = u, o = m, l = d;
  }
}
function W(v, t, n, e, r, i, l, c, s, o) {
  if (v == "stepped")
    return t.setStepped(e), n;
  const a = r << 2, h = v[a], d = v[a + 1] * o, f = v[a + 2], u = v[a + 3] * o;
  return t.setBezier(n, e, r, i, c, h, d, f, u, l, s), n + 1;
}
function Y(v, t, n) {
  return v[t] !== void 0 ? v[t] : n;
}
typeof Math.fround > "u" && (Math.fround = /* @__PURE__ */ function(v) {
  return function(t) {
    return v[0] = t, v[0];
  };
}(new Float32Array(1)));
const dt = class dt extends Xs {
  constructor(t) {
    super(t.resource), this.texture = ge.from(t);
  }
  static from(t) {
    return dt.textureMap.has(t) ? dt.textureMap.get(t) : new dt(t);
  }
  static toPixiBlending(t) {
    switch (t) {
      case Ft.Normal:
        return "normal";
      case Ft.Additive:
        return "add";
      case Ft.Multiply:
        return "multiply";
      case Ft.Screen:
        return "screen";
      default:
        throw new Error(`Unknown blendMode: ${String(t)}`);
    }
  }
  static toPixiMipMap(t) {
    switch (t) {
      case Z.Nearest:
      case Z.Linear:
        return !1;
      case Z.MipMapNearestLinear:
      case Z.MipMapNearestNearest:
      case Z.MipMapLinearLinear:
      case Z.MipMapLinearNearest:
        return !0;
      default:
        throw new Error(`Unknown texture filter: ${String(t)}`);
    }
  }
  static toPixiTextureFilter(t) {
    switch (t) {
      case Z.Nearest:
      case Z.MipMapNearestLinear:
      case Z.MipMapNearestNearest:
        return "nearest";
      case Z.Linear:
      case Z.MipMapLinearLinear:
      case Z.MipMapLinearNearest:
        return "linear";
      default:
        throw new Error(`Unknown texture filter: ${String(t)}`);
    }
  }
  static toPixiTextureWrap(t) {
    switch (t) {
      case vt.ClampToEdge:
        return "clamp-to-edge";
      case vt.MirroredRepeat:
        return "mirror-repeat";
      case vt.Repeat:
        return "repeat";
      default:
        throw new Error(`Unknown texture wrap: ${String(t)}`);
    }
  }
  setFilters(t, n) {
    const e = this.texture.source.style;
    e.minFilter = dt.toPixiTextureFilter(t), e.magFilter = dt.toPixiTextureFilter(n), this.texture.source.autoGenerateMipmaps = dt.toPixiMipMap(t), this.texture.source.updateMipmaps();
  }
  setWraps(t, n) {
    const e = this.texture.source.style;
    e.addressModeU = dt.toPixiTextureWrap(t), e.addressModeV = dt.toPixiTextureWrap(n);
  }
  dispose() {
    this.texture.destroy();
  }
};
dt.textureMap = /* @__PURE__ */ new Map();
let Jt = dt;
const fn = {
  extension: Yt.Asset,
  loader: {
    extension: {
      type: Yt.LoadParser,
      priority: Oe.Normal,
      name: "spineTextureAtlasLoader"
    },
    test(v) {
      return Lt(v, ".atlas");
    },
    async load(v) {
      return await (await qe.get().fetch(v)).text();
    },
    testParse(v, t) {
      const n = Lt(t.src, ".atlas"), e = typeof v == "string";
      return Promise.resolve(n && e);
    },
    unload(v) {
      v.dispose();
    },
    async parse(v, t, n) {
      const e = t.data || {};
      let r = qt.dirname(t.src);
      r && r.lastIndexOf("/") !== r.length - 1 && (r += "/");
      const i = new Ts(v);
      if (e.images instanceof Fe || typeof e.images == "string") {
        const c = e.images;
        e.images = {}, e.images[i.pages[0].name] = c;
      }
      const l = [];
      for (const c of i.pages) {
        const s = c.name, o = e != null && e.images ? e.images[s] : void 0;
        if (o instanceof Fe)
          c.setTexture(Jt.from(o));
        else {
          const a = o ?? qt.normalize([...r.split(qt.sep), s].join(qt.sep)), h = n.load({
            src: a,
            data: e.imageMetadata
          }).then((d) => {
            c.setTexture(Jt.from(d.source));
          });
          l.push(h);
        }
      }
      return await Promise.all(l), i;
    }
  }
};
function un(v) {
  return Object.prototype.hasOwnProperty.call(v, "bones");
}
function mn(v) {
  return v instanceof Uint8Array;
}
const gn = {
  extension: Yt.Asset,
  loader: {
    extension: {
      type: Yt.LoadParser,
      priority: Oe.Normal,
      name: "spineSkeletonLoader"
    },
    test(v) {
      return Lt(v, ".skel");
    },
    async load(v) {
      const t = await qe.get().fetch(v);
      return new Uint8Array(await t.arrayBuffer());
    },
    testParse(v, t) {
      const n = Lt(t.src, ".json") && un(v), e = Lt(t.src, ".skel") && mn(v);
      return Promise.resolve(n || e);
    }
  }
};
class xn {
  constructor() {
    this.clippedVertices = [], this.clippedTriangles = [];
  }
  get blendMode() {
    return this.renderable.groupBlendMode;
  }
  reset() {
    this.renderable = null, this.texture = null, this.batcher = null, this.batch = null;
  }
  setClipper(t) {
    Ne(t.clippedVertices, this.clippedVertices), Ne(t.clippedTriangles, this.clippedTriangles), this.vertexSize = t.clippedVertices.length / 8, this.indexSize = t.clippedTriangles.length;
  }
  packIndex(t, n, e) {
    const r = this.clippedTriangles;
    for (let i = 0; i < r.length; i++)
      t[n++] = r[i] + e;
  }
  packAttributes(t, n, e, r) {
    const i = this.clippedVertices, l = this.vertexSize, c = this.renderable.groupColor, s = r << 16 | this.roundPixels & 65535;
    for (let o = 0; o < l; o++) {
      const a = o * 8;
      t[e++] = i[a], t[e++] = i[a + 1] * -1, t[e++] = i[a + 6], t[e++] = i[a + 7], n[e++] = c, t[e++] = s;
    }
  }
}
function Ne(v, t) {
  for (let n = 0; n < v.length; n++)
    t[n] = v[n];
}
const pn = [0, 1, 2, 2, 3, 0];
class bn {
  get blendMode() {
    return this.renderable.groupBlendMode;
  }
  reset() {
    this.renderable = null, this.texture = null, this.batcher = null, this.batch = null;
  }
  setSlot(t) {
    this.slot = t;
    const n = t.getAttachment();
    n instanceof wt ? (this.vertexSize = 4, this.indexSize = 6) : n instanceof mt && (this.vertexSize = n.worldVerticesLength / 2, this.indexSize = n.triangles.length);
  }
  packIndex(t, n, e) {
    const r = this.slot.getAttachment().triangles ?? pn;
    for (let i = 0; i < r.length; i++)
      t[n++] = r[i] + e;
  }
  packAttributes(t, n, e, r) {
    const i = this.slot, l = i.getAttachment();
    l instanceof mt ? l.computeWorldVertices(i, 0, l.worldVerticesLength, t, e, 6) : l instanceof wt && l.computeWorldVertices(i, t, e, 6);
    const c = this.vertexSize, s = this.renderable.groupColor, o = this.renderable.groupAlpha, a = i.color;
    let h;
    const d = a.a * o * 255;
    if (s !== 16777215) {
      const S = s >> 16 & 255, k = s >> 8 & 255, A = s & 255, C = a.r * A * 255, X = a.g * k * 255, F = a.b * S * 255;
      h = d << 24 | F << 16 | X << 8 | C;
    } else
      h = d << 24 | a.b * 255 << 16 | a.g * 255 << 8 | a.r * 255;
    const f = l.uvs, u = this.renderable.groupTransform, m = u.a, x = u.b, y = u.c, b = u.d, g = u.tx, p = u.ty, w = r << 16 | this.roundPixels & 65535;
    for (let S = 0; S < c; S++) {
      const k = t[e], A = -t[e + 1];
      t[e++] = m * k + y * A + g, t[e++] = x * k + b * A + p, t[e++] = f[S * 2], t[e++] = f[S * 2 + 1], n[e++] = h, n[e++] = w;
    }
  }
}
const De = [0, 1, 2, 2, 3, 0], me = new Float32Array(8), wn = new V(), yn = new V(), Ye = class Ye {
  constructor(t) {
    this.activeBatchableSpineSlots = [], this.renderer = t, t.runners.prerender.add({
      prerender: () => {
        this.buildStart();
      }
    });
  }
  validateRenderable(t) {
    return !0;
  }
  buildStart() {
    this._returnActiveBatches();
  }
  addRenderable(t) {
    var c, s;
    const n = this.renderer.renderPipes.batch, e = t.skeleton.getRootBone();
    e.x = 0, e.y = 0, e.scaleX = 1, e.scaleY = 1, e.rotation = 0, t.state.apply(t.skeleton), t.skeleton.updateWorldTransform();
    const r = t.skeleton.drawOrder, i = this.activeBatchableSpineSlots, l = new Qt();
    for (let o = 0, a = r.length; o < a; o++) {
      const h = r[o], d = h.getAttachment();
      if (d instanceof wt || d instanceof mt)
        if (l != null && l.isClipping()) {
          if (d instanceof wt) {
            const f = me;
            if (d.computeWorldVertices(h, f, 0, 2), l.clipTriangles(
              me,
              me.length,
              De,
              De.length,
              d.uvs,
              wn,
              yn,
              !1
              // useDarkColor
            ), l.clippedVertices.length > 0) {
              const u = oe.get(xn);
              i.push(u), u.texture = ((c = d.region) == null ? void 0 : c.texture.texture) || ge.WHITE, u.roundPixels = this.renderer._roundPixels | t._roundPixels, u.setClipper(l), u.renderable = t, n.addToBatch(u);
            }
          }
        } else {
          const f = oe.get(bn);
          i.push(f), f.renderable = t, f.setSlot(h), f.texture = ((s = d.region) == null ? void 0 : s.texture.texture) || ge.EMPTY, f.roundPixels = this.renderer._roundPixels | t._roundPixels, n.addToBatch(f);
        }
      else
        d instanceof Dt ? l.clipStart(h, d) : l.clipEndWithSlot(h);
    }
    l.clipEnd();
  }
  updateRenderable(t) {
  }
  destroyRenderable(t) {
    this._returnActiveBatches();
  }
  destroy() {
    this._returnActiveBatches(), this.renderer = null;
  }
  _returnActiveBatches() {
    const t = this.activeBatchableSpineSlots;
    for (let n = 0; n < t.length; n++)
      oe.return(t[n]);
    t.length = 0;
  }
};
Ye.extension = {
  type: [Yt.WebGLPipes, Yt.WebGPUPipes, Yt.CanvasPipes],
  name: "spine"
};
let ye = Ye;
const Sn = new Float32Array(8), Ue = [];
function vn(v, t) {
  t.clear();
  const n = v.getRootBone();
  n.x = 0, n.y = 0, n.scaleX = 1, n.scaleY = -1, n.rotation = 0, v.updateWorldTransform();
  const e = v.drawOrder;
  for (let r = 0, i = e.length; r < i; r++) {
    const l = e[r], c = l.getAttachment();
    if (c instanceof wt) {
      const s = Sn;
      c.computeWorldVertices(l, s, 0, 2), t.addVertexData(s, 0, 8);
    } else
      c instanceof mt ? (c.computeWorldVertices(l, 0, c.worldVerticesLength, Ue, 0, 2), t.addVertexData(Ue, 0, c.worldVerticesLength)) : c instanceof Dt && console.warn("[Pixi Spine] ClippingAttachment bounds is not supported yet");
  }
}
const Wt = new Ht();
class Zt extends Ss {
  constructor(t) {
    t instanceof Kt && (t = {
      skeletonData: t
    }), super(), this.batched = !0, this.buildId = 0, this.renderPipeId = "spine", this._didSpineUpdate = !1, this._boundsDirty = !0, this.autoUpdateWarned = !1, this._bounds = new vs(), this._debug = void 0, this._autoUpdate = !0;
    const n = t instanceof Kt ? t : t.skeletonData;
    this.skeleton = new be(n), this.state = new xe(new Cs(n)), this.autoUpdate = (t == null ? void 0 : t.autoUpdate) ?? !0;
  }
  /** Whether or not to round the x/y position of the sprite. */
  get roundPixels() {
    return !!this._roundPixels;
  }
  set roundPixels(t) {
    this._roundPixels = t ? 1 : 0;
  }
  get bounds() {
    return this._boundsDirty && this.updateBounds(), this._bounds;
  }
  get debug() {
    return this._debug;
  }
  set debug(t) {
    this._debug && this._debug.unregisterSpine(this), t && t.registerSpine(this), this._debug = t;
  }
  get autoUpdate() {
    return this._autoUpdate;
  }
  set autoUpdate(t) {
    t ? (zt.shared.add(this.internalUpdate, this), this.autoUpdateWarned = !1) : zt.shared.remove(this.internalUpdate, this), this._autoUpdate = t;
  }
  static from({ skeleton: t, atlas: n, scale: e = 1 }) {
    const r = `${t}-${n}`;
    if (ce.has(r))
      return new Zt(ce.get(r));
    const i = Ee.get(t), l = Ee.get(n), c = new Bs(l), s = i instanceof Uint8Array ? new Vs(c) : new ln(c);
    s.scale = e;
    const o = s.readSkeletonData(i);
    return ce.set(r, o), new Zt({
      skeletonData: o
    });
  }
  update(t) {
    this.autoUpdate && !this.autoUpdateWarned && (console.warn(
      "You are calling update on a Spine instance that has autoUpdate set to true. This is probably not what you want."
    ), this.autoUpdateWarned = !0), this.internalUpdate(0, t);
  }
  setBonePosition(t, n) {
    const e = t;
    if (typeof t == "string" && (t = this.skeleton.findBone(t)), !t)
      throw Error(`Cant set bone position, bone ${String(e)} not found`);
    if (Wt.set(n.x, n.y), t.parent) {
      const r = t.parent.worldToLocal(Wt);
      t.x = r.x, t.y = r.y;
    } else
      t.x = Wt.x, t.y = Wt.y;
  }
  getBonePosition(t, n) {
    const e = t;
    return typeof t == "string" && (t = this.skeleton.findBone(t)), t ? (n || (n = { x: 0, y: 0 }), n.x = t.worldX, n.y = t.worldY, n) : (console.error(`Cant set bone position! Bone ${String(e)} not found`), n);
  }
  updateState(t) {
    this.state.update(t), this._boundsDirty = !0, this.onViewUpdate();
  }
  onViewUpdate() {
    var n;
    if (this._didChangeId += 4096, this._didSpineUpdate = !0, this._didSpineUpdate = !0, this._boundsDirty = !0, this.didViewUpdate)
      return;
    this.didViewUpdate = !0;
    const t = this.renderGroup || this.parentRenderGroup;
    t && t.onChildViewUpdate(this), (n = this.debug) == null || n.renderDebug(this);
  }
  updateBounds() {
    this._boundsDirty = !1, this.skeletonBounds || (this.skeletonBounds = new hn());
    const t = this.skeletonBounds;
    t.update(this.skeleton, !0), t.minX === 1 / 0 ? (this.state.apply(this.skeleton), vn(this.skeleton, this._bounds)) : (this._bounds.minX = t.minX, this._bounds.minY = t.minY, this._bounds.maxX = t.maxX, this._bounds.maxY = t.maxY);
  }
  addBounds(t) {
    t.addBounds(this.bounds);
  }
  // passed local space..
  containsPoint(t) {
    return !1;
  }
  /**
   * Destroys this sprite renderable and optionally its texture.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the renderable as well
   * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the renderable as well
   */
  destroy(t = !1) {
    super.destroy(t), zt.shared.remove(this.internalUpdate, this), this.state.clearListeners(), this.debug = void 0, this.skeleton = null, this.state = null;
  }
  internalUpdate(t, n) {
    this.updateState(n ?? zt.shared.deltaMS / 1e3);
  }
}
class In extends ys {
  constructor() {
    super(...arguments), this.id = "SpinePlugin";
  }
  async initialize() {
    he.add(fn), he.add(gn), he.add(ye), window.Spine = Zt;
  }
}
export {
  In as SpinePlugin
};
//# sourceMappingURL=SpinePlugin-DDC9c4H0.mjs.map
