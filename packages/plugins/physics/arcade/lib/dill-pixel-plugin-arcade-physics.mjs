import { Plugin as Je, Logger as ve, Container as Ke } from "dill-pixel";
import { Graphics as ti, Point as me } from "pixi.js";
function ei(i, t) {
  for (var e = 0; e < t.length; e++) {
    const s = t[e];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const r in s)
        if (r !== "default" && !(r in i)) {
          const n = Object.getOwnPropertyDescriptor(s, r);
          n && Object.defineProperty(i, r, n.get ? n : {
            enumerable: !0,
            get: () => s[r]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }));
}
var x = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ii(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var mt = {}, Nt = {}, z = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(z, "__esModule", { value: !0 });
var Wt;
(function(i) {
  i[i.PI2 = Math.PI * 2] = "PI2", i[i.TAU = Math.PI * 0.5] = "TAU", i[i.EPSILON = 1e-6] = "EPSILON", i[i.DEG_TO_RAD = Math.PI / 180] = "DEG_TO_RAD", i[i.RAD_TO_DEG = 180 / Math.PI] = "RAD_TO_DEG", i[i.MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991] = "MIN_SAFE_INTEGER", i[i.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991] = "MAX_SAFE_INTEGER";
})(Wt || (Wt = {}));
z.default = Wt;
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var si = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(Nt, "__esModule", { value: !0 });
const ri = si(z), ni = (i) => i * ri.default.DEG_TO_RAD;
Nt.default = ni;
var it = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(it, "__esModule", { value: !0 });
const oi = (i, t, e, s) => {
  const r = i - e, n = t - s;
  return Math.sqrt(r * r + n * n);
};
it.default = oi;
var Ut = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(Ut, "__esModule", { value: !0 });
const hi = (i, t, e, s) => {
  const r = i - e, n = t - s;
  return r * r + n * n;
};
Ut.default = hi;
var xt = {}, wt = {}, L = {};
(function(i) {
  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2020 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */
  Object.defineProperty(i, "__esModule", { value: !0 }), i.FACING = i.PHYSICS_TYPE = void 0;
  var t;
  (function(s) {
    s[s.DYNAMIC_BODY = 0] = "DYNAMIC_BODY", s[s.STATIC_BODY = 1] = "STATIC_BODY", s[s.GROUP = 2] = "GROUP", s[s.TILEMAPLAYER = 3] = "TILEMAPLAYER";
  })(t = i.PHYSICS_TYPE || (i.PHYSICS_TYPE = {}));
  var e;
  (function(s) {
    s[s.FACING_NONE = 10] = "FACING_NONE", s[s.FACING_UP = 11] = "FACING_UP", s[s.FACING_DOWN = 12] = "FACING_DOWN", s[s.FACING_LEFT = 13] = "FACING_LEFT", s[s.FACING_RIGHT = 14] = "FACING_RIGHT";
  })(e = i.FACING || (i.FACING = {})), i.default = {
    PHYSICS_TYPE: t,
    FACING: e
  };
})(L);
const li = /* @__PURE__ */ ii(L), Xr = /* @__PURE__ */ ei({
  __proto__: null,
  default: li
}, [L]);
var Pt = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(Pt, "__esModule", { value: !0 });
Pt.default = {
  /**
   * The Arcade Physics World Collide Event.
   *
   * This event is dispatched by an Arcade Physics World instance if two bodies collide _and_ at least
   * one of them has their [onCollide]{@link Phaser.Physics.Arcade.Body#onCollide} property set to `true`.
   *
   * It provides an alternative means to handling collide events rather than using the callback approach.
   *
   * Listen to it from a Scene using: `this.physics.world.on('collide', listener)`.
   *
   * Please note that 'collide' and 'overlap' are two different things in Arcade Physics.
   *
   * @param {Phaser.GameObjects.GameObject} gameObject1 - The first Game Object involved in the collision. This is the parent of `body1`.
   * @param {Phaser.GameObjects.GameObject} gameObject2 - The second Game Object involved in the collision. This is the parent of `body2`.
   * @param {Phaser.Physics.Arcade.Body|Phaser.Physics.Arcade.StaticBody} body1 - The first Physics Body involved in the collision.
   * @param {Phaser.Physics.Arcade.Body|Phaser.Physics.Arcade.StaticBody} body2 - The second Physics Body involved in the collision.
   */
  COLLIDE: "collide",
  /**
   * The Arcade Physics World Overlap Event.
   *
   * This event is dispatched by an Arcade Physics World instance if two bodies overlap _and_ at least
   * one of them has their [onOverlap]{@link Phaser.Physics.Arcade.Body#onOverlap} property set to `true`.
   *
   * It provides an alternative means to handling overlap events rather than using the callback approach.
   *
   * Listen to it from a Scene using: `this.physics.world.on('overlap', listener)`.
   *
   * Please note that 'collide' and 'overlap' are two different things in Arcade Physics.
   *
   * @event Phaser.Physics.Arcade.Events#OVERLAP
   * @since 3.0.0
   *
   * @param {Phaser.GameObjects.GameObject} gameObject1 - The first Game Object involved in the overlap. This is the parent of `body1`.
   * @param {Phaser.GameObjects.GameObject} gameObject2 - The second Game Object involved in the overlap. This is the parent of `body2`.
   * @param {Phaser.Physics.Arcade.Body|Phaser.Physics.Arcade.StaticBody} body1 - The first Physics Body involved in the overlap.
   * @param {Phaser.Physics.Arcade.Body|Phaser.Physics.Arcade.StaticBody} body2 - The second Physics Body involved in the overlap.
   */
  OVERLAP: "overlap",
  /**
   * The Arcade Physics World Pause Event.
   *
   * This event is dispatched by an Arcade Physics World instance when it is paused.
   *
   * Listen to it from a Scene using: `this.physics.world.on('pause', listener)`.
   *
   * @event Phaser.Physics.Arcade.Events#PAUSE
   * @since 3.0.0
   */
  PAUSE: "pause",
  /**
   * The Arcade Physics World Resume Event.
   *
   * This event is dispatched by an Arcade Physics World instance when it resumes from a paused state.
   *
   * Listen to it from a Scene using: `this.physics.world.on('resume', listener)`.
   *
   * @event Phaser.Physics.Arcade.Events#RESUME
   * @since 3.0.0
   */
  RESUME: "resume",
  /**
   * The Arcade Physics Tile Collide Event.
   *
   * This event is dispatched by an Arcade Physics World instance if a body collides with a Tile _and_
   * has its [onCollide]{@link Phaser.Physics.Arcade.Body#onCollide} property set to `true`.
   *
   * It provides an alternative means to handling collide events rather than using the callback approach.
   *
   * Listen to it from a Scene using: `this.physics.world.on('tilecollide', listener)`.
   *
   * Please note that 'collide' and 'overlap' are two different things in Arcade Physics.
   *
   * @event Phaser.Physics.Arcade.Events#TILE_COLLIDE
   * @since 3.16.1
   *
   * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object involved in the collision. This is the parent of `body`.
   * @param {Phaser.Tilemaps.Tile} tile - The tile the body collided with.
   * @param {Phaser.Physics.Arcade.Body} body - The Arcade Physics Body of the Game Object involved in the collision.
   */
  TILE_COLLIDE: "tilecollide",
  /**
   * The Arcade Physics Tile Overlap Event.
   *
   * This event is dispatched by an Arcade Physics World instance if a body overlaps with a Tile _and_
   * has its [onOverlap]{@link Phaser.Physics.Arcade.Body#onOverlap} property set to `true`.
   *
   * It provides an alternative means to handling overlap events rather than using the callback approach.
   *
   * Listen to it from a Scene using: `this.physics.world.on('tileoverlap', listener)`.
   *
   * Please note that 'collide' and 'overlap' are two different things in Arcade Physics.
   *
   * @event Phaser.Physics.Arcade.Events#TILE_OVERLAP
   * @since 3.16.1
   *
   * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object involved in the overlap. This is the parent of `body`.
   * @param {Phaser.Tilemaps.Tile} tile - The tile the body overlapped.
   * @param {Phaser.Physics.Arcade.Body} body - The Arcade Physics Body of the Game Object involved in the overlap.
   */
  TILE_OVERLAP: "tileoverlap",
  /**
   * The Arcade Physics World Bounds Event.
   *
   * This event is dispatched by an Arcade Physics World instance if a body makes contact with the world bounds _and_
   * it has its [onWorldBounds]{@link Phaser.Physics.Arcade.Body#onWorldBounds} property set to `true`.
   *
   * It provides an alternative means to handling collide events rather than using the callback approach.
   *
   * Listen to it from a Scene using: `this.physics.world.on('worldbounds', listener)`.
   *
   * @event Phaser.Physics.Arcade.Events#WORLD_BOUNDS
   * @since 3.0.0
   *
   * @param {Phaser.Physics.Arcade.Body} body - The Arcade Physics Body that hit the world bounds.
   * @param {boolean} up - Is the Body blocked up? I.e. collided with the top of the world bounds.
   * @param {boolean} down - Is the Body blocked down? I.e. collided with the bottom of the world bounds.
   * @param {boolean} left - Is the Body blocked left? I.e. collided with the left of the world bounds.
   * @param {boolean} right - Is the Body blocked right? I.e. collided with the right of the world bounds.
   */
  WORLD_BOUNDS: "worldbounds",
  /**
   * The Arcade Physics World Step Event.
   *
   * This event is dispatched by an Arcade Physics World instance whenever a physics step is run.
   * It is emitted _after_ the bodies and colliders have been updated.
   *
   * In high framerate settings this can be multiple times per game frame.
   *
   * Listen to it from a Scene using: `this.physics.world.on('worldstep', listener)`.
   *
   * @event Phaser.Physics.Arcade.Events#WORLD_STEP
   * @since 3.18.0
   *
   * @param {number} delta - The delta time amount of this step, in seconds.
   */
  WORLD_STEP: "worldstep"
};
var st = {}, rt = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(rt, "__esModule", { value: !0 });
const ai = (i, t, e) => i.width <= 0 || i.height <= 0 ? !1 : i.x <= t && i.x + i.width >= t && i.y <= e && i.y + i.height >= e;
rt.default = ai;
var Mt = {}, Bt = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(Bt, "__esModule", { value: !0 });
const ui = (i) => 2 * (i.width + i.height);
Bt.default = ui;
var b = {}, nt = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(nt, "__esModule", { value: !0 });
function ci(i) {
  return !!i.get && typeof i.get == "function" || !!i.set && typeof i.set == "function";
}
function fi(i, t, e) {
  let s = e ? i[t] : Object.getOwnPropertyDescriptor(i, t);
  return !e && s.value && typeof s.value == "object" && (s = s.value), s && ci(s) ? (typeof s.enumerable > "u" && (s.enumerable = !0), typeof s.configurable > "u" && (s.configurable = !0), s) : !1;
}
function di(i, t) {
  let e = Object.getOwnPropertyDescriptor(i, t);
  return e ? (e.value && typeof e.value == "object" && (e = e.value), e.configurable === !1) : !1;
}
function Ht(i, t, e, s) {
  for (const r in t) {
    if (!t.hasOwnProperty(r))
      continue;
    const n = fi(t, r, e);
    if (n !== !1) {
      if (di((s || i).prototype, r)) {
        if (ot.ignoreFinals)
          continue;
        throw new Error(`cannot override final property '${r}', set Class.ignoreFinals = true to skip`);
      }
      Object.defineProperty(i.prototype, r, n);
    } else
      i.prototype[r] = t[r];
  }
}
function Ie(i, t) {
  if (t) {
    Array.isArray(t) || (t = [t]);
    for (let e = 0; e < t.length; e++)
      Ht(i, t[e].prototype || t[e]);
  }
}
function ot(i) {
  i || (i = {});
  let t, e;
  if (i.initialize) {
    if (typeof i.initialize != "function")
      throw new Error("initialize must be a function");
    t = i.initialize, delete i.initialize;
  } else if (i.Extends) {
    const r = i.Extends;
    t = function() {
      r.apply(this, arguments);
    };
  } else
    t = () => {
    };
  i.Extends ? (t.prototype = Object.create(i.Extends.prototype), t.prototype.constructor = t, e = i.Extends, delete i.Extends) : t.prototype.constructor = t;
  let s = null;
  return i.Mixins && (s = i.Mixins, delete i.Mixins), Ie(t, s), Ht(t, i, !0, e), t;
}
ot.extend = Ht;
ot.mixin = Ie;
ot.ignoreFinals = !1;
nt.default = ot;
var q = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(q, "__esModule", { value: !0 });
const pi = {
  /**
   * A Circle Geometry object type.
   *
   * @name Phaser.Geom.CIRCLE
   * @type {number}
   * @since 3.19.0
   */
  CIRCLE: 0,
  /**
   * An Ellipse Geometry object type.
   *
   * @name Phaser.Geom.ELLIPSE
   * @type {number}
   * @since 3.19.0
   */
  ELLIPSE: 1,
  /**
   * A Line Geometry object type.
   *
   * @name Phaser.Geom.LINE
   * @type {number}
   * @since 3.19.0
   */
  LINE: 2,
  /**
   * A Point Geometry object type.
   *
   * @name Phaser.Geom.POINT
   * @type {number}
   * @since 3.19.0
   */
  POINT: 3,
  /**
   * A Polygon Geometry object type.
   *
   * @name Phaser.Geom.POLYGON
   * @type {number}
   * @since 3.19.0
   */
  POLYGON: 4,
  /**
   * A Rectangle Geometry object type.
   *
   * @name Phaser.Geom.RECTANGLE
   * @type {number}
   * @since 3.19.0
   */
  RECTANGLE: 5,
  /**
   * A Triangle Geometry object type.
   *
   * @name Phaser.Geom.TRIANGLE
   * @type {number}
   * @since 3.19.0
   */
  TRIANGLE: 6
};
q.default = pi;
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var Xe = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(b, "__esModule", { value: !0 });
const _i = Xe(nt), yi = Xe(q), gi = new _i.default({
  initialize: function(t, e) {
    t === void 0 && (t = 0), e === void 0 && (e = t), this.type = yi.default.POINT, this.x = t, this.y = e;
  },
  /**
   * Set the x and y coordinates of the point to the given values.
   *
   * @method Phaser.Geom.Point#setTo
   * @since 3.0.0
   *
   * @param {number} [x=0] - The x coordinate of this Point.
   * @param {number} [y=x] - The y coordinate of this Point.
   *
   * @return {this} This Point object.
   */
  setTo: function(i, t) {
    return i === void 0 && (i = 0), t === void 0 && (t = i), this.x = i, this.y = t, this;
  }
});
b.default = gi;
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var Re = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(Mt, "__esModule", { value: !0 });
const vi = Re(Bt), mi = Re(b), xi = (i, t, e) => {
  if (e === void 0 && (e = new mi.default()), t <= 0 || t >= 1)
    return e.x = i.x, e.y = i.y, e;
  let s = (0, vi.default)(i) * t;
  return t > 0.5 ? (s -= i.width + i.height, s <= i.width ? (e.x = i.right - s, e.y = i.bottom) : (e.x = i.x, e.y = i.bottom - (s - i.width))) : s <= i.width ? (e.x = i.x + s, e.y = i.y) : (e.x = i.right, e.y = i.y + (s - i.width)), e;
};
Mt.default = xi;
var zt = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var be = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(zt, "__esModule", { value: !0 });
const wi = be(Mt), Pi = be(Bt), Mi = (i, t, e, s) => {
  s === void 0 && (s = []), !t && e > 0 && (t = (0, Pi.default)(i) / e);
  for (let r = 0; r < t; r++) {
    const n = r / t;
    s.push((0, wi.default)(i, n));
  }
  return s;
};
zt.default = Mi;
var qt = {}, Qt = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var Bi = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(Qt, "__esModule", { value: !0 });
const Ci = Bi(b), Oi = (i, t, e) => (e === void 0 && (e = new Ci.default()), e.x = i.x1 + (i.x2 - i.x1) * t, e.y = i.y1 + (i.y2 - i.y1) * t, e);
Qt.default = Oi;
var Zt = {}, Jt = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(Jt, "__esModule", { value: !0 });
const Di = (i) => Math.sqrt((i.x2 - i.x1) * (i.x2 - i.x1) + (i.y2 - i.y1) * (i.y2 - i.y1));
Jt.default = Di;
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var Ge = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(Zt, "__esModule", { value: !0 });
const Si = Ge(Jt), Yi = Ge(b), Ti = (i, t, e, s) => {
  s === void 0 && (s = []), !t && e > 0 && (t = (0, Si.default)(i) / e);
  const r = i.x1, n = i.y1, a = i.x2, l = i.y2;
  for (let u = 0; u < t; u++) {
    const c = u / t, d = r + (a - r) * c, p = n + (l - n) * c;
    s.push(new Yi.default(d, p));
  }
  return s;
};
Zt.default = Ti;
var Kt = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var Ei = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(Kt, "__esModule", { value: !0 });
const $i = Ei(b), Ai = (i, t) => {
  t === void 0 && (t = new $i.default());
  const e = Math.random();
  return t.x = i.x1 + e * (i.x2 - i.x1), t.y = i.y1 + e * (i.y2 - i.y1), t;
};
Kt.default = Ai;
var j = {}, Ct = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(Ct, "__esModule", { value: !0 });
const Ii = (i, t, e) => (e === void 0 && (e = 1e-4), Math.abs(i - t) < e);
Ct.default = Ii;
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(j, "__esModule", { value: !0 });
j.Vector2 = void 0;
const xe = Ct;
class A {
  constructor(t, e) {
    this.x = 0, this.y = 0, typeof t == "object" ? (this.x = t.x || 0, this.y = t.y || 0) : (e === void 0 && (e = t), this.x = t || 0, this.y = e || 0);
  }
  /**
   * Make a clone of this Vector2.
   *
   * @method Phaser.Math.Vector2#clone
   * @since 3.0.0
   *
   * @return {Phaser.Math.Vector2} A clone of this Vector2.
   */
  clone() {
    return new A(this.x, this.y);
  }
  /**
   * Copy the components of a given Vector into this Vector.
   *
   * @method Phaser.Math.Vector2#copy
   * @since 3.0.0
   *
   * @param {Phaser.Types.Math.Vector2Like} src - The Vector to copy the components from.
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  copy(t) {
    return this.x = t.x || 0, this.y = t.y || 0, this;
  }
  /**
   * Set the component values of this Vector from a given Vector2Like object.
   *
   * @method Phaser.Math.Vector2#setFromObject
   * @since 3.0.0
   *
   * @param {Phaser.Types.Math.Vector2Like} obj - The object containing the component values to set for this Vector.
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  setFromObject(t) {
    return this.x = t.x || 0, this.y = t.y || 0, this;
  }
  /**
   * Set the `x` and `y` components of the this Vector to the given `x` and `y` values.
   *
   * @method Phaser.Math.Vector2#set
   * @since 3.0.0
   *
   * @param {number} x - The x value to set for this Vector.
   * @param {number} [y=x] - The y value to set for this Vector.
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  set(t, e) {
    return e === void 0 && (e = t), this.x = t, this.y = e, this;
  }
  /**
   * This method is an alias for `Vector2.set`.
   *
   * @method Phaser.Math.Vector2#setTo
   * @since 3.4.0
   *
   * @param {number} x - The x value to set for this Vector.
   * @param {number} [y=x] - The y value to set for this Vector.
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  setTo(t, e) {
    return this.set(t, e);
  }
  /**
   * Sets the `x` and `y` values of this object from a given polar coordinate.
   *
   * @method Phaser.Math.Vector2#setToPolar
   * @since 3.0.0
   *
   * @param {number} azimuth - The angular coordinate, in radians.
   * @param {number} [radius=1] - The radial coordinate (length).
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  setToPolar(t, e) {
    return e == null && (e = 1), this.x = Math.cos(t) * e, this.y = Math.sin(t) * e, this;
  }
  /**
   * Check whether this Vector is equal to a given Vector.
   *
   * Performs a strict equality check against each Vector's components.
   *
   * @method Phaser.Math.Vector2#equals
   * @since 3.0.0
   *
   * @param {Phaser.Types.Math.Vector2Like} v - The vector to compare with this Vector.
   *
   * @return {boolean} Whether the given Vector is equal to this Vector.
   */
  equals(t) {
    return this.x === t.x && this.y === t.y;
  }
  /**
   * Check whether this Vector is approximately equal to a given Vector.
   *
   * @method Phaser.Math.Vector2#fuzzyEquals
   * @since 3.23.0
   *
   * @param {Phaser.Types.Math.Vector2Like} v - The vector to compare with this Vector.
   * @param {number} [epsilon=0.0001] - The tolerance value.
   *
   * @return {boolean} Whether both absolute differences of the x and y components are smaller than `epsilon`.
   */
  fuzzyEquals(t, e) {
    return xe(this.x, t.x, e) && xe(this.y, t.y, e);
  }
  /**
   * Calculate the angle between this Vector and the positive x-axis, in radians.
   *
   * @method Phaser.Math.Vector2#angle
   * @since 3.0.0
   *
   * @return {number} The angle between this Vector, and the positive x-axis, given in radians.
   */
  angle() {
    let t = Math.atan2(this.y, this.x);
    return t < 0 && (t += 2 * Math.PI), t;
  }
  /**
   * Set the angle of this Vector.
   *
   * @method Phaser.Math.Vector2#setAngle
   * @since 3.23.0
   *
   * @param {number} angle - The angle, in radians.
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  setAngle(t) {
    return this.setToPolar(t, this.length());
  }
  /**
   * Add a given Vector to this Vector. Addition is component-wise.
   *
   * @method Phaser.Math.Vector2#add
   * @since 3.0.0
   *
   * @param {Phaser.Types.Math.Vector2Like} src - The Vector to add to this Vector.
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  add(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  /**
   * Subtract the given Vector from this Vector. Subtraction is component-wise.
   *
   * @method Phaser.Math.Vector2#subtract
   * @since 3.0.0
   *
   * @param {Phaser.Types.Math.Vector2Like} src - The Vector to subtract from this Vector.
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  subtract(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  /**
   * Perform a component-wise multiplication between this Vector and the given Vector.
   *
   * Multiplies this Vector by the given Vector.
   *
   * @method Phaser.Math.Vector2#multiply
   * @since 3.0.0
   *
   * @param {Phaser.Types.Math.Vector2Like} src - The Vector to multiply this Vector by.
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this;
  }
  /**
   * Scale this Vector by the given value.
   *
   * @method Phaser.Math.Vector2#scale
   * @since 3.0.0
   *
   * @param {number} value - The value to scale this Vector by.
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  scale(t) {
    return isFinite(t) ? (this.x *= t, this.y *= t) : (this.x = 0, this.y = 0), this;
  }
  /**
   * Perform a component-wise division between this Vector and the given Vector.
   *
   * Divides this Vector by the given Vector.
   *
   * @method Phaser.Math.Vector2#divide
   * @since 3.0.0
   *
   * @param {Phaser.Types.Math.Vector2Like} src - The Vector to divide this Vector by.
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this;
  }
  /**
   * Negate the `x` and `y` components of this Vector.
   *
   * @method Phaser.Math.Vector2#negate
   * @since 3.0.0
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  /**
   * Calculate the distance between this Vector and the given Vector.
   *
   * @method Phaser.Math.Vector2#distance
   * @since 3.0.0
   *
   * @param {Phaser.Types.Math.Vector2Like} src - The Vector to calculate the distance to.
   *
   * @return {number} The distance from this Vector to the given Vector.
   */
  distance(t) {
    const e = t.x - this.x, s = t.y - this.y;
    return Math.sqrt(e * e + s * s);
  }
  /**
   * Calculate the distance between this Vector and the given Vector, squared.
   *
   * @method Phaser.Math.Vector2#distanceSq
   * @since 3.0.0
   *
   * @param {Phaser.Types.Math.Vector2Like} src - The Vector to calculate the distance to.
   *
   * @return {number} The distance from this Vector to the given Vector, squared.
   */
  distanceSq(t) {
    const e = t.x - this.x, s = t.y - this.y;
    return e * e + s * s;
  }
  /**
   * Calculate the length (or magnitude) of this Vector.
   *
   * @method Phaser.Math.Vector2#length
   * @since 3.0.0
   *
   * @return {number} The length of this Vector.
   */
  length() {
    const t = this.x, e = this.y;
    return Math.sqrt(t * t + e * e);
  }
  /**
   * Set the length (or magnitude) of this Vector.
   *
   * @method Phaser.Math.Vector2#setLength
   * @since 3.23.0
   *
   * @param {number} length
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  setLength(t) {
    return this.normalize().scale(t);
  }
  /**
   * Calculate the length of this Vector squared.
   *
   * @method Phaser.Math.Vector2#lengthSq
   * @since 3.0.0
   *
   * @return {number} The length of this Vector, squared.
   */
  lengthSq() {
    const t = this.x, e = this.y;
    return t * t + e * e;
  }
  /**
   * Normalize this Vector.
   *
   * Makes the vector a unit length vector (magnitude of 1) in the same direction.
   *
   * @method Phaser.Math.Vector2#normalize
   * @since 3.0.0
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  normalize() {
    const t = this.x, e = this.y;
    let s = t * t + e * e;
    return s > 0 && (s = 1 / Math.sqrt(s), this.x = t * s, this.y = e * s), this;
  }
  /**
   * Rotate this Vector to its perpendicular, in the positive direction.
   *
   * @method Phaser.Math.Vector2#normalizeRightHand
   * @since 3.0.0
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  normalizeRightHand() {
    const t = this.x;
    return this.x = this.y * -1, this.y = t, this;
  }
  /**
   * Rotate this Vector to its perpendicular, in the negative direction.
   *
   * @method Phaser.Math.Vector2#normalizeLeftHand
   * @since 3.23.0
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  normalizeLeftHand() {
    const t = this.x;
    return this.x = this.y, this.y = t * -1, this;
  }
  /**
   * Calculate the dot product of this Vector and the given Vector.
   *
   * @method Phaser.Math.Vector2#dot
   * @since 3.0.0
   *
   * @param {Phaser.Types.Math.Vector2Like} src - The Vector2 to dot product with this Vector2.
   *
   * @return {number} The dot product of this Vector and the given Vector.
   */
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  /**
   * Calculate the cross product of this Vector and the given Vector.
   *
   * @method Phaser.Math.Vector2#cross
   * @since 3.0.0
   *
   * @param {Phaser.Types.Math.Vector2Like} src - The Vector2 to cross with this Vector2.
   *
   * @return {number} The cross product of this Vector and the given Vector.
   */
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  /**
   * Linearly interpolate between this Vector and the given Vector.
   *
   * Interpolates this Vector towards the given Vector.
   *
   * @method Phaser.Math.Vector2#lerp
   * @since 3.0.0
   *
   * @param {Phaser.Types.Math.Vector2Like} src - The Vector2 to interpolate towards.
   * @param {number} [t=0] - The interpolation percentage, between 0 and 1.
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  lerp(t, e) {
    e === void 0 && (e = 0);
    const s = this.x, r = this.y;
    return this.x = s + e * (t.x - s), this.y = r + e * (t.y - r), this;
  }
  /**
   * Transform this Vector with the given Matrix.
   *
   * @method Phaser.Math.Vector2#transformMat3
   * @since 3.0.0
   *
   * @param {Phaser.Math.Matrix3} mat - The Matrix3 to transform this Vector2 with.
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  transformMat3(t) {
    const e = this.x, s = this.y, r = t.val;
    return this.x = r[0] * e + r[3] * s + r[6], this.y = r[1] * e + r[4] * s + r[7], this;
  }
  /**
   * Transform this Vector with the given Matrix.
   *
   * @method Phaser.Math.Vector2#transformMat4
   * @since 3.0.0
   *
   * @param {Phaser.Math.Matrix4} mat - The Matrix4 to transform this Vector2 with.
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  transformMat4(t) {
    const e = this.x, s = this.y, r = t.val;
    return this.x = r[0] * e + r[4] * s + r[12], this.y = r[1] * e + r[5] * s + r[13], this;
  }
  /**
   * Make this Vector the zero vector (0, 0).
   *
   * @method Phaser.Math.Vector2#reset
   * @since 3.0.0
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  reset() {
    return this.x = 0, this.y = 0, this;
  }
  /**
   * Limit the length (or magnitude) of this Vector.
   *
   * @method Phaser.Math.Vector2#limit
   * @since 3.23.0
   *
   * @param {number} max - The maximum length.
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  limit(t) {
    const e = this.length();
    return e && e > t && this.scale(t / e), this;
  }
  /**
   * Reflect this Vector off a line defined by a normal.
   *
   * @method Phaser.Math.Vector2#reflect
   * @since 3.23.0
   *
   * @param {Phaser.Math.Vector2} normal - A vector perpendicular to the line.
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  reflect(t) {
    return t = t.clone().normalize(), this.subtract(t.scale(2 * this.dot(t)));
  }
  /**
   * Reflect this Vector across another.
   *
   * @method Phaser.Math.Vector2#mirror
   * @since 3.23.0
   *
   * @param {Phaser.Math.Vector2} axis - A vector to reflect across.
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  mirror(t) {
    return this.reflect(t).negate();
  }
  /**
   * Rotate this Vector by an angle amount.
   *
   * @method Phaser.Math.Vector2#rotate
   * @since 3.23.0
   *
   * @param {number} delta - The angle to rotate by, in radians.
   *
   * @return {Phaser.Math.Vector2} This Vector2.
   */
  rotate(t) {
    const e = Math.cos(t), s = Math.sin(t);
    return this.set(e * this.x - s * this.y, s * this.x + e * this.y);
  }
}
j.Vector2 = A;
A.ZERO = new A();
A.RIGHT = new A(1, 0);
A.LEFT = new A(-1, 0);
A.UP = new A(0, -1);
A.DOWN = new A(0, 1);
A.ONE = new A(1, 1);
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var Q = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(qt, "__esModule", { value: !0 });
const Xi = Q(nt), Ri = Q(Qt), bi = Q(Zt), Gi = Q(q), Li = Q(Kt), we = Q(j), ji = new Xi.default({
  initialize: function(t, e, s, r) {
    t === void 0 && (t = 0), e === void 0 && (e = 0), s === void 0 && (s = 0), r === void 0 && (r = 0), this.type = Gi.default.LINE, this.x1 = t, this.y1 = e, this.x2 = s, this.y2 = r;
  },
  /**
   * Get a point on a line that's a given percentage along its length.
   *
   * @method Phaser.Geom.Line#getPoint
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Point} O - [output,$return]
   *
   * @param {number} position - A value between 0 and 1, where 0 is the start, 0.5 is the middle and 1 is the end of the line.
   * @param {(Phaser.Geom.Point|object)} [output] - An optional point, or point-like object, to store the coordinates of the point on the line.
   *
   * @return {(Phaser.Geom.Point|object)} A Point, or point-like object, containing the coordinates of the point on the line.
   */
  getPoint: function(i, t) {
    return (0, Ri.default)(this, i, t);
  },
  /**
   * Get a number of points along a line's length.
   *
   * Provide a `quantity` to get an exact number of points along the line.
   *
   * Provide a `stepRate` to ensure a specific distance between each point on the line. Set `quantity` to `0` when
   * providing a `stepRate`.
   *
   * @method Phaser.Geom.Line#getPoints
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Point[]} O - [output,$return]
   *
   * @param {number} quantity - The number of points to place on the line. Set to `0` to use `stepRate` instead.
   * @param {number} [stepRate] - The distance between each point on the line. When set, `quantity` is implied and should be set to `0`.
   * @param {(array|Phaser.Geom.Point[])} [output] - An optional array of Points, or point-like objects, to store the coordinates of the points on the line.
   *
   * @return {(array|Phaser.Geom.Point[])} An array of Points, or point-like objects, containing the coordinates of the points on the line.
   */
  getPoints: function(i, t, e) {
    return (0, bi.default)(this, i, t, e);
  },
  /**
   * Get a random Point on the Line.
   *
   * @method Phaser.Geom.Line#getRandomPoint
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Point} O - [point,$return]
   *
   * @param {(Phaser.Geom.Point|object)} [point] - An instance of a Point to be modified.
   *
   * @return {Phaser.Geom.Point} A random Point on the Line.
   */
  getRandomPoint: function(i) {
    return (0, Li.default)(this, i);
  },
  /**
   * Set new coordinates for the line endpoints.
   *
   * @method Phaser.Geom.Line#setTo
   * @since 3.0.0
   *
   * @param {number} [x1=0] - The x coordinate of the lines starting point.
   * @param {number} [y1=0] - The y coordinate of the lines starting point.
   * @param {number} [x2=0] - The x coordinate of the lines ending point.
   * @param {number} [y2=0] - The y coordinate of the lines ending point.
   *
   * @return {this} This Line object.
   */
  setTo: function(i, t, e, s) {
    return i === void 0 && (i = 0), t === void 0 && (t = 0), e === void 0 && (e = 0), s === void 0 && (s = 0), this.x1 = i, this.y1 = t, this.x2 = e, this.y2 = s, this;
  },
  /**
   * Returns a Vector2 object that corresponds to the start of this Line.
   *
   * @method Phaser.Geom.Line#getPointA
   * @since 3.0.0
   *
   * @generic {Phaser.Math.Vector2} O - [vec2,$return]
   *
   * @param {Phaser.Math.Vector2} [vec2] - A Vector2 object to set the results in. If `undefined` a new Vector2 will be created.
   *
   * @return {Phaser.Math.Vector2} A Vector2 object that corresponds to the start of this Line.
   */
  getPointA: function(i) {
    return i === void 0 && (i = new we.default()), i.set(this.x1, this.y1), i;
  },
  /**
   * Returns a Vector2 object that corresponds to the end of this Line.
   *
   * @method Phaser.Geom.Line#getPointB
   * @since 3.0.0
   *
   * @generic {Phaser.Math.Vector2} O - [vec2,$return]
   *
   * @param {Phaser.Math.Vector2} [vec2] - A Vector2 object to set the results in. If `undefined` a new Vector2 will be created.
   *
   * @return {Phaser.Math.Vector2} A Vector2 object that corresponds to the end of this Line.
   */
  getPointB: function(i) {
    return i === void 0 && (i = new we.default()), i.set(this.x2, this.y2), i;
  },
  /**
   * The left position of the Line.
   *
   * @name Phaser.Geom.Line#left
   * @type {number}
   * @since 3.0.0
   */
  left: {
    get: function() {
      return Math.min(this.x1, this.x2);
    },
    set: function(i) {
      this.x1 <= this.x2 ? this.x1 = i : this.x2 = i;
    }
  },
  /**
   * The right position of the Line.
   *
   * @name Phaser.Geom.Line#right
   * @type {number}
   * @since 3.0.0
   */
  right: {
    get: function() {
      return Math.max(this.x1, this.x2);
    },
    set: function(i) {
      this.x1 > this.x2 ? this.x1 = i : this.x2 = i;
    }
  },
  /**
   * The top position of the Line.
   *
   * @name Phaser.Geom.Line#top
   * @type {number}
   * @since 3.0.0
   */
  top: {
    get: function() {
      return Math.min(this.y1, this.y2);
    },
    set: function(i) {
      this.y1 <= this.y2 ? this.y1 = i : this.y2 = i;
    }
  },
  /**
   * The bottom position of the Line.
   *
   * @name Phaser.Geom.Line#bottom
   * @type {number}
   * @since 3.0.0
   */
  bottom: {
    get: function() {
      return Math.max(this.y1, this.y2);
    },
    set: function(i) {
      this.y1 > this.y2 ? this.y1 = i : this.y2 = i;
    }
  }
});
qt.default = ji;
var te = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var Vi = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(te, "__esModule", { value: !0 });
const Fi = Vi(b), ki = (i, t) => (t === void 0 && (t = new Fi.default()), t.x = i.x + Math.random() * i.width, t.y = i.y + Math.random() * i.height, t);
te.default = ki;
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var Z = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(st, "__esModule", { value: !0 });
st.Rectangle = void 0;
const Wi = Z(rt), Ni = Z(Mt), Ui = Z(zt), Hi = Z(q), ft = Z(qt), zi = Z(te);
class qi {
  constructor(t, e, s, r) {
    t === void 0 && (t = 0), e === void 0 && (e = 0), s === void 0 && (s = 0), r === void 0 && (r = 0), this.type = Hi.default.RECTANGLE, this.x = t, this.y = e, this.width = s, this.height = r;
  }
  /**
   * Checks if the given point is inside the Rectangle's bounds.
   *
   * @method Phaser.Geom.Rectangle#contains
   * @since 3.0.0
   *
   * @param {number} x - The X coordinate of the point to check.
   * @param {number} y - The Y coordinate of the point to check.
   *
   * @return {boolean} `true` if the point is within the Rectangle's bounds, otherwise `false`.
   */
  contains(t, e) {
    return (0, Wi.default)(this, t, e);
  }
  /**
   * Calculates the coordinates of a point at a certain `position` on the Rectangle's perimeter.
   *
   * The `position` is a fraction between 0 and 1 which defines how far into the perimeter the point is.
   *
   * A value of 0 or 1 returns the point at the top left corner of the rectangle, while a value of 0.5 returns the point at the bottom right corner of the rectangle. Values between 0 and 0.5 are on the top or the right side and values between 0.5 and 1 are on the bottom or the left side.
   *
   * @method Phaser.Geom.Rectangle#getPoint
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Point} O - [output,$return]
   *
   * @param {number} position - The normalized distance into the Rectangle's perimeter to return.
   * @param {(Phaser.Geom.Point|object)} [output] - An object to update with the `x` and `y` coordinates of the point.
   *
   * @return {(Phaser.Geom.Point|object)} The updated `output` object, or a new Point if no `output` object was given.
   */
  getPoint(t, e) {
    return (0, Ni.default)(this, t, e);
  }
  /**
   * Returns an array of points from the perimeter of the Rectangle, each spaced out based on the quantity or step required.
   *
   * @method Phaser.Geom.Rectangle#getPoints
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Point[]} O - [output,$return]
   *
   * @param {number} quantity - The number of points to return. Set to `false` or 0 to return an arbitrary number of points (`perimeter / stepRate`) evenly spaced around the Rectangle based on the `stepRate`.
   * @param {number} [stepRate] - If `quantity` is 0, determines the normalized distance between each returned point.
   * @param {(array|Phaser.Geom.Point[])} [output] - An array to which to append the points.
   *
   * @return {(array|Phaser.Geom.Point[])} The modified `output` array, or a new array if none was provided.
   */
  getPoints(t, e, s) {
    return (0, Ui.default)(this, t, e, s);
  }
  /**
   * Returns a random point within the Rectangle's bounds.
   *
   * @method Phaser.Geom.Rectangle#getRandomPoint
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Point} O - [point,$return]
   *
   * @param {Phaser.Geom.Point} [point] - The object in which to store the `x` and `y` coordinates of the point.
   *
   * @return {Phaser.Geom.Point} The updated `point`, or a new Point if none was provided.
   */
  getRandomPoint(t) {
    return (0, zi.default)(this, t);
  }
  /**
   * Sets the position, width, and height of the Rectangle.
   *
   * @method Phaser.Geom.Rectangle#setTo
   * @since 3.0.0
   *
   * @param {number} x - The X coordinate of the top left corner of the Rectangle.
   * @param {number} y - The Y coordinate of the top left corner of the Rectangle.
   * @param {number} width - The width of the Rectangle.
   * @param {number} height - The height of the Rectangle.
   *
   * @return {this} This Rectangle object.
   */
  setTo(t, e, s, r) {
    return this.x = t, this.y = e, this.width = s, this.height = r, this;
  }
  /**
   * Resets the position, width, and height of the Rectangle to 0.
   *
   * @method Phaser.Geom.Rectangle#setEmpty
   * @since 3.0.0
   *
   * @return {this} This Rectangle object.
   */
  setEmpty() {
    return this.setTo(0, 0, 0, 0);
  }
  /**
   * Sets the position of the Rectangle.
   *
   * @method Phaser.Geom.Rectangle#setPosition
   * @since 3.0.0
   *
   * @param {number} x - The X coordinate of the top left corner of the Rectangle.
   * @param {number} [y=x] - The Y coordinate of the top left corner of the Rectangle.
   *
   * @return {this} This Rectangle object.
   */
  setPosition(t, e) {
    return e === void 0 && (e = t), this.x = t, this.y = e, this;
  }
  /**
   * Sets the width and height of the Rectangle.
   *
   * @method Phaser.Geom.Rectangle#setSize
   * @since 3.0.0
   *
   * @param {number} width - The width to set the Rectangle to.
   * @param {number} [height=width] - The height to set the Rectangle to.
   *
   * @return {this} This Rectangle object.
   */
  setSize(t, e) {
    return e === void 0 && (e = t), this.width = t, this.height = e, this;
  }
  /**
   * Determines if the Rectangle is empty. A Rectangle is empty if its width or height is less than or equal to 0.
   *
   * @method Phaser.Geom.Rectangle#isEmpty
   * @since 3.0.0
   *
   * @return {boolean} `true` if the Rectangle is empty. A Rectangle object is empty if its width or height is less than or equal to 0.
   */
  isEmpty() {
    return this.width <= 0 || this.height <= 0;
  }
  /**
   * Returns a Line object that corresponds to the top of this Rectangle.
   *
   * @method Phaser.Geom.Rectangle#getLineA
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Line} O - [line,$return]
   *
   * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
   *
   * @return {Phaser.Geom.Line} A Line object that corresponds to the top of this Rectangle.
   */
  getLineA(t) {
    return t === void 0 && (t = new ft.default()), t.setTo(this.x, this.y, this.right, this.y), t;
  }
  /**
   * Returns a Line object that corresponds to the right of this Rectangle.
   *
   * @method Phaser.Geom.Rectangle#getLineB
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Line} O - [line,$return]
   *
   * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
   *
   * @return {Phaser.Geom.Line} A Line object that corresponds to the right of this Rectangle.
   */
  getLineB(t) {
    return t === void 0 && (t = new ft.default()), t.setTo(this.right, this.y, this.right, this.bottom), t;
  }
  /**
   * Returns a Line object that corresponds to the bottom of this Rectangle.
   *
   * @method Phaser.Geom.Rectangle#getLineC
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Line} O - [line,$return]
   *
   * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
   *
   * @return {Phaser.Geom.Line} A Line object that corresponds to the bottom of this Rectangle.
   */
  getLineC(t) {
    return t === void 0 && (t = new ft.default()), t.setTo(this.right, this.bottom, this.x, this.bottom), t;
  }
  /**
   * Returns a Line object that corresponds to the left of this Rectangle.
   *
   * @method Phaser.Geom.Rectangle#getLineD
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Line} O - [line,$return]
   *
   * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
   *
   * @return {Phaser.Geom.Line} A Line object that corresponds to the left of this Rectangle.
   */
  getLineD(t) {
    return t === void 0 && (t = new ft.default()), t.setTo(this.x, this.bottom, this.x, this.y), t;
  }
  /**
   * The x coordinate of the left of the Rectangle.
   * Changing the left property of a Rectangle object has no effect on the y and height properties. However it does affect the width property, whereas changing the x value does not affect the width property.
   *
   * @name Phaser.Geom.Rectangle#left
   * @type {number}
   * @since 3.0.0
   */
  get left() {
    return this.x;
  }
  set left(t) {
    t >= this.right ? this.width = 0 : this.width = this.right - t, this.x = t;
  }
  /**
   * The sum of the x and width properties.
   * Changing the right property of a Rectangle object has no effect on the x, y and height properties, however it does affect the width property.
   *
   * @name Phaser.Geom.Rectangle#right
   * @type {number}
   * @since 3.0.0
   */
  get right() {
    return this.x + this.width;
  }
  set right(t) {
    t <= this.x ? this.width = 0 : this.width = t - this.x;
  }
  /**
   * The y coordinate of the top of the Rectangle. Changing the top property of a Rectangle object has no effect on the x and width properties.
   * However it does affect the height property, whereas changing the y value does not affect the height property.
   *
   * @name Phaser.Geom.Rectangle#top
   * @type {number}
   * @since 3.0.0
   */
  get top() {
    return this.y;
  }
  set top(t) {
    t >= this.bottom ? this.height = 0 : this.height = this.bottom - t, this.y = t;
  }
  /**
   * The sum of the y and height properties.
   * Changing the bottom property of a Rectangle object has no effect on the x, y and width properties, but does change the height property.
   *
   * @name Phaser.Geom.Rectangle#bottom
   * @type {number}
   * @since 3.0.0
   */
  get bottom() {
    return this.y + this.height;
  }
  set bottom(t) {
    t <= this.y ? this.height = 0 : this.height = t - this.y;
  }
  /**
   * The x coordinate of the center of the Rectangle.
   *
   * @name Phaser.Geom.Rectangle#centerX
   * @type {number}
   * @since 3.0.0
   */
  get centerX() {
    return this.x + this.width / 2;
  }
  set centerX(t) {
    this.x = t - this.width / 2;
  }
  /**
   * The y coordinate of the center of the Rectangle.
   *
   * @name Phaser.Geom.Rectangle#centerY
   * @type {number}
   * @since 3.0.0
   */
  get centerY() {
    return this.y + this.height / 2;
  }
  set centerY(t) {
    this.y = t - this.height / 2;
  }
}
st.Rectangle = qi;
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Benjamin D. Richards <benjamindrichards@gmail.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var ee = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(wt, "__esModule", { value: !0 });
var Le = wt.Body = void 0;
const W = ee(L), Qi = ee(Pt), Zi = st, Ji = ee(rt), X = j;
let Ki = class {
  constructor(t, e, s, r = 64, n = 64) {
    this.enable = !0, this.isCircle = !1, this.radius = 0, this.allowRotation = !0, this.velocity = new X.Vector2(), this.newVelocity = new X.Vector2(), this.deltaMax = new X.Vector2(), this.acceleration = new X.Vector2(), this.allowDrag = !0, this.drag = new X.Vector2(), this.allowGravity = !0, this.gravity = new X.Vector2(), this.bounce = new X.Vector2(), this.worldBounce = null, this.onWorldBounds = !1, this.onCollide = !1, this.onOverlap = !1, this.maxVelocity = new X.Vector2(1e4, 1e4), this.maxSpeed = -1, this.friction = new X.Vector2(1, 0), this.useDamping = !1, this.angularVelocity = 0, this.angularAcceleration = 0, this.angularDrag = 0, this.maxAngular = 1e3, this.mass = 1, this.angle = 0, this.speed = 0, this.facing = W.default.FACING.FACING_NONE, this.immovable = !1, this.pushable = !0, this.moves = !0, this.customSeparateX = !1, this.customSeparateY = !1, this.overlapX = 0, this.overlapY = 0, this.overlapR = 0, this.embedded = !1, this.collideWorldBounds = !1, this.checkCollision = {
      none: !1,
      up: !0,
      down: !0,
      left: !0,
      right: !0
    }, this.touching = {
      none: !0,
      up: !1,
      down: !1,
      left: !1,
      right: !1
    }, this.wasTouching = {
      none: !0,
      up: !1,
      down: !1,
      left: !1,
      right: !1
    }, this.blocked = {
      none: !0,
      up: !1,
      down: !1,
      left: !1,
      right: !1
    }, this.physicsType = W.default.PHYSICS_TYPE.DYNAMIC_BODY, this._dx = 0, this._dy = 0, this._tx = 0, this._ty = 0, this._bounds = new Zi.Rectangle(), this.isBody = !0, this.world = t, this.debugShowBody = t.defaults.debugShowBody, this.debugShowVelocity = t.defaults.debugShowVelocity, this.debugBodyColor = t.defaults.bodyDebugColor, this.position = new X.Vector2(e, s), this.prev = this.position.clone(), this.prevFrame = this.position.clone(), this.rotation = 0, this.preRotation = 0, this.width = r, this.height = n, this.sourceWidth = r, this.sourceHeight = n, this.halfWidth = Math.abs(r / 2), this.halfHeight = Math.abs(n / 2), this.center = new X.Vector2(this.position.x + this.halfWidth, this.position.y + this.halfHeight), this.customBoundsRectangle = t.bounds, this._sx = 1, this._sy = 1;
  }
  // used for the btree
  get minX() {
    return this.x;
  }
  get minY() {
    return this.y;
  }
  get maxX() {
    return this.x + this.width;
  }
  get maxY() {
    return this.y + this.height;
  }
  /** Updates the Body's `center` from its `position`, `width`, and `height`. */
  updateCenter() {
    this.center.set(this.position.x + this.halfWidth, this.position.y + this.halfHeight);
  }
  /**
   * Prepares the Body for a physics step by resetting the `wasTouching`, `touching` and `blocked` states.
   *
   * This method is only called if the physics world is going to run a step this frame.
   */
  resetFlags(t = !1) {
    const e = this.wasTouching, s = this.touching, r = this.blocked;
    t ? (e.none = !0, e.up = !1, e.down = !1, e.left = !1, e.right = !1) : (e.none = s.none, e.up = s.up, e.down = s.down, e.left = s.left, e.right = s.right), s.none = !0, s.up = !1, s.down = !1, s.left = !1, s.right = !1, r.none = !0, r.up = !1, r.down = !1, r.left = !1, r.right = !1, this.overlapR = 0, this.overlapX = 0, this.overlapY = 0, this.embedded = !1;
  }
  /**
   * Syncs the position body position with the parent Game Object.
   *
   * This method is called every game frame, regardless if the world steps or not.
   *
   * @param willStep - Will this Body run an update as well?
   * @param delta - The delta time, in seconds, elapsed since the last frame.
   */
  preUpdate(t, e) {
    t && this.resetFlags(), this.preRotation = this.rotation, this.moves && (this.prev.x = this.position.x, this.prev.y = this.position.y, this.prevFrame.x = this.position.x, this.prevFrame.y = this.position.y), t && this.update(e);
  }
  /**
   * Performs a single physics step and updates the body velocity, angle, speed and other properties.
   *
   * This method can be called multiple times per game frame, depending on the physics step rate.
   *
   * The results are synced back to the Game Object in `postUpdate`.
   *
   * @param delta - The delta time, in seconds, elapsed since the last frame.
   */
  update(t) {
    if (this.prev.x = this.position.x, this.prev.y = this.position.y, this.moves) {
      this.world.updateMotion(this, t);
      const e = this.velocity.x, s = this.velocity.y;
      this.newVelocity.set(e * t, s * t), this.position.add(this.newVelocity), this.updateCenter(), this.angle = Math.atan2(s, e), this.speed = Math.sqrt(e * e + s * s), this.collideWorldBounds && this.checkWorldBounds() && this.onWorldBounds && this.world.emit(Qi.default.WORLD_BOUNDS, this, this.blocked.up, this.blocked.down, this.blocked.left, this.blocked.right);
    }
    this._dx = this.position.x - this.prev.x, this._dy = this.position.y - this.prev.y;
  }
  /**
   * Feeds the Body results back into the parent Game Object.
   *
   * This method is called every game frame, regardless if the world steps or not.
   */
  postUpdate() {
    let t = this.position.x - this.prevFrame.x, e = this.position.y - this.prevFrame.y;
    if (this.moves) {
      const s = this.deltaMax.x, r = this.deltaMax.y;
      s !== 0 && t !== 0 && (t < 0 && t < -s ? t = -s : t > 0 && t > s && (t = s)), r !== 0 && e !== 0 && (e < 0 && e < -r ? e = -r : e > 0 && e > r && (e = r));
    }
    t < 0 ? this.facing = W.default.FACING.FACING_LEFT : t > 0 && (this.facing = W.default.FACING.FACING_RIGHT), e < 0 ? this.facing = W.default.FACING.FACING_UP : e > 0 && (this.facing = W.default.FACING.FACING_DOWN), this.allowRotation, this._tx = t, this._ty = e;
  }
  /**
   * Sets a custom collision boundary rectangle. Use if you want to have a custom
   * boundary instead of the world boundaries.
   *
   * @param bounds - The new boundary rectangle. Pass `null` to use the World bounds.
   */
  setBoundsRectangle(t) {
    return this.customBoundsRectangle = t || this.world.bounds, this;
  }
  /**
   * Checks for collisions between this Body and the world boundary and separates them.
   *
   * Returns true if this Body is colliding with the world boundary.
   */
  checkWorldBounds() {
    const t = this.position, e = this.customBoundsRectangle, s = this.world.checkCollision, r = this.worldBounce ? -this.worldBounce.x : -this.bounce.x, n = this.worldBounce ? -this.worldBounce.y : -this.bounce.y;
    let a = !1;
    return t.x < e.x && s.left ? (t.x = e.x, this.velocity.x *= r, this.blocked.left = !0, a = !0) : this.right > e.right && s.right && (t.x = e.right - this.width, this.velocity.x *= r, this.blocked.right = !0, a = !0), t.y < e.y && s.up ? (t.y = e.y, this.velocity.y *= n, this.blocked.up = !0, a = !0) : this.bottom > e.bottom && s.down && (t.y = e.bottom - this.height, this.velocity.y *= n, this.blocked.down = !0, a = !0), a && (this.blocked.none = !1, this.updateCenter()), a;
  }
  /**
   * Sizes and positions this Body, as a rectangle.
   *
   * @param width - The width of the Body in pixels. Cannot be zero.
   * @param height - The height of the Body in pixels. Cannot be zero.
   */
  setSize(t, e) {
    return this.sourceWidth = t, this.sourceHeight = e, this.width = this.sourceWidth * this._sx, this.height = this.sourceHeight * this._sy, this.halfWidth = Math.floor(this.width / 2), this.halfHeight = Math.floor(this.height / 2), this.updateCenter(), this.isCircle = !1, this.radius = 0, this;
  }
  /**
   * Sizes and positions this Body, as a circle.
   *
   * @param radius - The radius of the Body, in source pixels.
   */
  setCircle(t) {
    return t > 0 ? (this.isCircle = !0, this.radius = t, this.sourceWidth = t * 2, this.sourceHeight = t * 2, this.width = this.sourceWidth * this._sx, this.height = this.sourceHeight * this._sy, this.halfWidth = Math.floor(this.width / 2), this.halfHeight = Math.floor(this.height / 2), this.updateCenter()) : this.isCircle = !1, this;
  }
  /**
   * Resets this Body at the new coordinates.
   * If the Body had any velocity or acceleration it is lost as a result of calling this.
   *
   * @param x - The horizontal position to place the Body.
   * @param y - The vertical position to place the Body.
   */
  reset(t, e) {
    this.stop(), this.position.set(t, e), this.prev.copy(this.position), this.prevFrame.copy(this.position), this.updateCenter(), this.resetFlags(!0);
  }
  /** Sets acceleration, velocity, and speed to zero. */
  stop() {
    return this.velocity.set(0), this.acceleration.set(0), this.speed = 0, this.angularVelocity = 0, this.angularAcceleration = 0, this;
  }
  /**
   * Copies the coordinates of this Body's edges into an object.
   *
   * @param {Phaser.Types.Physics.Arcade.ArcadeBodyBounds} obj - An object to copy the values into.
   *
   * @return {Phaser.Types.Physics.Arcade.ArcadeBodyBounds} - An object with {x, y, right, bottom}.
   */
  getBounds(t) {
    return t.x = this.x, t.y = this.y, t.right = this.right, t.bottom = this.bottom, t;
  }
  /**
   * Tests if the coordinates are within this Body.
   *
   * Returns true if (x, y) is within this Body.
   *
   * @param x - The horizontal coordinate.
   * @param y - The vertical coordinate.
   */
  hitTest(t, e) {
    if (!this.isCircle)
      return (0, Ji.default)(this, t, e);
    if (this.radius > 0 && t >= this.left && t <= this.right && e >= this.top && e <= this.bottom) {
      const s = (this.center.x - t) * (this.center.x - t), r = (this.center.y - e) * (this.center.y - e);
      return s + r <= this.radius * this.radius;
    }
    return !1;
  }
  /**
   * Whether this Body is touching a tile or the world boundary while moving down.
   *
   * Returns true if touching.
   */
  onFloor() {
    return this.blocked.down;
  }
  /**
   * Whether this Body is touching a tile or the world boundary while moving up.
   *
   * Returns true if touching.
   */
  onCeiling() {
    return this.blocked.up;
  }
  /**
   * Whether this Body is touching a tile or the world boundary while moving left or right.
   *
   * Returns true if touching.
   */
  onWall() {
    return this.blocked.left || this.blocked.right;
  }
  /**
   * The absolute (non-negative) change in this Body's horizontal position from the previous step.
   *
   * Returns the delta value.
   */
  deltaAbsX() {
    return this._dx > 0 ? this._dx : -this._dx;
  }
  /**
   * The absolute (non-negative) change in this Body's vertical position from the previous step.
   *
   * Returns the delta value.
   */
  deltaAbsY() {
    return this._dy > 0 ? this._dy : -this._dy;
  }
  /**
   * The change in this Body's horizontal position from the previous step.
   * This value is set during the Body's update phase.
   *
   * As a Body can update multiple times per step this may not hold the final
   * delta value for the Body. In this case, please see the `deltaXFinal` method.
   *
   * Returns the delta value.
   */
  deltaX() {
    return this._dx;
  }
  /**
   * The change in this Body's vertical position from the previous step.
   * This value is set during the Body's update phase.
   *
   * As a Body can update multiple times per step this may not hold the final
   * delta value for the Body. In this case, please see the `deltaYFinal` method.
   *
   * Returns the delta value.
   */
  deltaY() {
    return this._dy;
  }
  /**
   * The change in this Body's horizontal position from the previous game update.
   *
   * This value is set during the `postUpdate` phase and takes into account the
   * `deltaMax` and final position of the Body.
   *
   * Because this value is not calculated until `postUpdate`, you must listen for it
   * during a Scene `POST_UPDATE` or `RENDER` event, and not in `update`, as it will
   * not be calculated by that point. If you _do_ use these values in `update` they
   * will represent the delta from the _previous_ game frame.
   *
   * Returns the final delta x value.
   */
  deltaXFinal() {
    return this._tx;
  }
  /**
   * The change in this Body's vertical position from the previous game update.
   *
   * This value is set during the `postUpdate` phase and takes into account the
   * `deltaMax` and final position of the Body.
   *
   * Because this value is not calculated until `postUpdate`, you must listen for it
   * during a Scene `POST_UPDATE` or `RENDER` event, and not in `update`, as it will
   * not be calculated by that point. If you _do_ use these values in `update` they
   * will represent the delta from the _previous_ game frame.
   *
   * Returns the final delta y value.
   */
  deltaYFinal() {
    return this._ty;
  }
  /**
   * The change in this Body's rotation from the previous step, in degrees.
   *
   * Returns the delta value.
   */
  deltaZ() {
    return this.rotation - this.preRotation;
  }
  /**
   * Disables this Body and marks it for deletion by the simulation.
   *
   * @method Phaser.Physics.Arcade.Body#destroy
   * @since 3.0.0
   */
  destroy() {
    this.enable = !1, this.world && this.world.pendingDestroy.add(this);
  }
  /**
   * Draws this Body and its velocity, if enabled.
   *
   * @method Phaser.Physics.Arcade.Body#drawDebug
   * @since 3.0.0
   *
   * @param {CanvasRenderingContext2D} Context2D - The Context2D to draw on.
   */
  drawDebug(t) {
    var e, s;
    const r = this.position, n = r.x + this.halfWidth, a = r.y + this.halfHeight, l = 1, u = (v, B, O, C) => {
      t.moveTo(v, B), t.lineTo(O, C);
    }, c = (v) => {
      v >>>= 0;
      let B = (v & 255).toString(16), O = ((v & 65280) >>> 8).toString(16), C = ((v & 16711680) >>> 16).toString(16);
      return B === "0" && (B = "00"), O === "0" && (O = "00"), C === "0" && (C = "00"), `#${B}${O}${C}`;
    }, d = (v, B, O) => {
      t.lineWidth = v, t.strokeStyle = c(B);
    }, p = (v, B, O) => {
      t.arc(v, B, O, 0, 2 * Math.PI);
    };
    this.debugShowBody && (t.beginPath(), d(l, this.debugBodyColor), this.isCircle ? p(n, a, this.width / 2) : (this.checkCollision.up && u(r.x, r.y, r.x + this.width, r.y), this.checkCollision.right && u(r.x + this.width, r.y, r.x + this.width, r.y + this.height), this.checkCollision.down && u(r.x, r.y + this.height, r.x + this.width, r.y + this.height), this.checkCollision.left && u(r.x, r.y, r.x, r.y + this.height)), t.stroke()), this.debugShowVelocity && (t.beginPath(), d(l, ((s = (e = this.world) === null || e === void 0 ? void 0 : e.defaults) === null || s === void 0 ? void 0 : s.velocityDebugColor) || 65280), u(n, a, n + this.velocity.x / 2, a + this.velocity.y / 2), t.stroke());
  }
  /**
   * Whether this Body will be drawn to the debug display.
   *
   * @method Phaser.Physics.Arcade.Body#willDrawDebug
   * @since 3.0.0
   *
   * @return {boolean} True if either `debugShowBody` or `debugShowVelocity` are enabled.
   */
  willDrawDebug() {
    return this.debugShowBody || this.debugShowVelocity;
  }
  /**
   * Sets whether this Body collides with the world boundary.
   *
   * Optionally also sets the World Bounce and `onWorldBounds` values.
   *
   * @method Phaser.Physics.Arcade.Body#setCollideWorldBounds
   * @since 3.0.0
   *
   * @param {boolean} [value=true] - `true` if the Body should collide with the world bounds, otherwise `false`.
   * @param {number} [bounceX] - If given this replaces the Body's `worldBounce.x` value.
   * @param {number} [bounceY] - If given this replaces the Body's `worldBounce.y` value.
   * @param {boolean} [onWorldBounds] - If given this replaces the Body's `onWorldBounds` value.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setCollideWorldBounds(t, e, s, r) {
    t === void 0 && (t = !0), this.collideWorldBounds = t;
    const n = e !== void 0, a = s !== void 0;
    return (n || a) && (this.worldBounce || (this.worldBounce = new X.Vector2()), n && (this.worldBounce.x = e), a && (this.worldBounce.y = s)), r !== void 0 && (this.onWorldBounds = r), this;
  }
  /**
   * Sets the Body's velocity.
   *
   * @method Phaser.Physics.Arcade.Body#setVelocity
   * @since 3.0.0
   *
   * @param {number} x - The horizontal velocity, in pixels per second.
   * @param {number} [y=x] - The vertical velocity, in pixels per second.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setVelocity(t, e) {
    return this.velocity.set(t, e), t = this.velocity.x, e = this.velocity.y, this.speed = Math.sqrt(t * t + e * e), this;
  }
  /**
   * Sets the Body's horizontal velocity.
   *
   * @method Phaser.Physics.Arcade.Body#setVelocityX
   * @since 3.0.0
   *
   * @param {number} value - The velocity, in pixels per second.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setVelocityX(t) {
    this.velocity.x = t;
    const e = t, s = this.velocity.y;
    return this.speed = Math.sqrt(e * e + s * s), this;
  }
  /**
   * Sets the Body's vertical velocity.
   *
   * @method Phaser.Physics.Arcade.Body#setVelocityY
   * @since 3.0.0
   *
   * @param {number} value - The velocity, in pixels per second.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setVelocityY(t) {
    this.velocity.y = t;
    const e = this.velocity.x, s = t;
    return this.speed = Math.sqrt(e * e + s * s), this;
  }
  /**
   * Sets the Body's maximum velocity.
   *
   * @method Phaser.Physics.Arcade.Body#setMaxVelocity
   * @since 3.10.0
   *
   * @param {number} x - The horizontal velocity, in pixels per second.
   * @param {number} [y=x] - The vertical velocity, in pixels per second.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setMaxVelocity(t, e) {
    return this.maxVelocity.set(t, e), this;
  }
  /**
   * Sets the Body's maximum horizontal velocity.
   *
   * @method Phaser.Physics.Arcade.Body#setMaxVelocityX
   * @since 3.50.0
   *
   * @param {number} value - The maximum horizontal velocity, in pixels per second.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setMaxVelocityX(t) {
    return this.maxVelocity.x = t, this;
  }
  /**
   * Sets the Body's maximum vertical velocity.
   *
   * @method Phaser.Physics.Arcade.Body#setMaxVelocityY
   * @since 3.50.0
   *
   * @param {number} value - The maximum vertical velocity, in pixels per second.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setMaxVelocityY(t) {
    return this.maxVelocity.y = t, this;
  }
  /**
   * Sets the maximum speed the Body can move.
   *
   * @method Phaser.Physics.Arcade.Body#setMaxSpeed
   * @since 3.16.0
   *
   * @param {number} value - The maximum speed value, in pixels per second. Set to a negative value to disable.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setMaxSpeed(t) {
    return this.maxSpeed = t, this;
  }
  /**
   * Sets the Body's bounce.
   *
   * @method Phaser.Physics.Arcade.Body#setBounce
   * @since 3.0.0
   *
   * @param {number} x - The horizontal bounce, relative to 1.
   * @param {number} y - The vertical bounce, relative to 1.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setBounce(t, e) {
    return this.bounce.set(t, e), this;
  }
  /**
   * Sets the Body's horizontal bounce.
   *
   * @method Phaser.Physics.Arcade.Body#setBounceX
   * @since 3.0.0
   *
   * @param {number} value - The bounce, relative to 1.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setBounceX(t) {
    return this.bounce.x = t, this;
  }
  /**
   * Sets the Body's vertical bounce.
   *
   * @method Phaser.Physics.Arcade.Body#setBounceY
   * @since 3.0.0
   *
   * @param {number} value - The bounce, relative to 1.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setBounceY(t) {
    return this.bounce.y = t, this;
  }
  /**
   * Sets the Body's acceleration.
   *
   * @method Phaser.Physics.Arcade.Body#setAcceleration
   * @since 3.0.0
   *
   * @param {number} x - The horizontal component, in pixels per second squared.
   * @param {number} y - The vertical component, in pixels per second squared.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setAcceleration(t, e) {
    return this.acceleration.set(t, e), this;
  }
  /**
   * Sets the Body's horizontal acceleration.
   *
   * @method Phaser.Physics.Arcade.Body#setAccelerationX
   * @since 3.0.0
   *
   * @param {number} value - The acceleration, in pixels per second squared.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setAccelerationX(t) {
    return this.acceleration.x = t, this;
  }
  /**
   * Sets the Body's vertical acceleration.
   *
   * @method Phaser.Physics.Arcade.Body#setAccelerationY
   * @since 3.0.0
   *
   * @param {number} value - The acceleration, in pixels per second squared.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setAccelerationY(t) {
    return this.acceleration.y = t, this;
  }
  /**
   * Enables or disables drag.
   *
   * @method Phaser.Physics.Arcade.Body#setAllowDrag
   * @since 3.9.0
   * @see Phaser.Physics.Arcade.Body#allowDrag
   *
   * @param {boolean} [value=true] - `true` to allow drag on this body, or `false` to disable it.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setAllowDrag(t) {
    return t === void 0 && (t = !0), this.allowDrag = t, this;
  }
  /**
   * Enables or disables gravity's effect on this Body.
   *
   * @method Phaser.Physics.Arcade.Body#setAllowGravity
   * @since 3.9.0
   * @see Phaser.Physics.Arcade.Body#allowGravity
   *
   * @param {boolean} [value=true] - `true` to allow gravity on this body, or `false` to disable it.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setAllowGravity(t) {
    return t === void 0 && (t = !0), this.allowGravity = t, this;
  }
  /**
   * Enables or disables rotation.
   *
   * @method Phaser.Physics.Arcade.Body#setAllowRotation
   * @since 3.9.0
   * @see Phaser.Physics.Arcade.Body#allowRotation
   *
   * @param {boolean} [value=true] - `true` to allow rotation on this body, or `false` to disable it.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setAllowRotation(t) {
    return t === void 0 && (t = !0), this.allowRotation = t, this;
  }
  /**
   * Sets the Body's drag.
   *
   * @method Phaser.Physics.Arcade.Body#setDrag
   * @since 3.0.0
   *
   * @param {number} x - The horizontal component, in pixels per second squared.
   * @param {number} y - The vertical component, in pixels per second squared.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setDrag(t, e) {
    return this.drag.set(t, e), this;
  }
  /**
   * If this Body is using `drag` for deceleration this property controls how the drag is applied.
   * If set to `true` drag will use a damping effect rather than a linear approach. If you are
   * creating a game where the Body moves freely at any angle (i.e. like the way the ship moves in
   * the game Asteroids) then you will get a far smoother and more visually correct deceleration
   * by using damping, avoiding the axis-drift that is prone with linear deceleration.
   *
   * If you enable this property then you should use far smaller `drag` values than with linear, as
   * they are used as a multiplier on the velocity. Values such as 0.95 will give a nice slow
   * deceleration, where-as smaller values, such as 0.5 will stop an object almost immediately.
   *
   * @method Phaser.Physics.Arcade.Body#setDamping
   * @since 3.50.0
   *
   * @param {boolean} value - `true` to use damping, or `false` to use drag.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setDamping(t) {
    return this.useDamping = t, this;
  }
  /**
   * Sets the Body's horizontal drag.
   *
   * @method Phaser.Physics.Arcade.Body#setDragX
   * @since 3.0.0
   *
   * @param {number} value - The drag, in pixels per second squared.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setDragX(t) {
    return this.drag.x = t, this;
  }
  /**
   * Sets the Body's vertical drag.
   *
   * @method Phaser.Physics.Arcade.Body#setDragY
   * @since 3.0.0
   *
   * @param {number} value - The drag, in pixels per second squared.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setDragY(t) {
    return this.drag.y = t, this;
  }
  /**
   * Sets the Body's gravity.
   *
   * @method Phaser.Physics.Arcade.Body#setGravity
   * @since 3.0.0
   *
   * @param {number} x - The horizontal component, in pixels per second squared.
   * @param {number} y - The vertical component, in pixels per second squared.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setGravity(t, e) {
    return this.gravity.set(t, e), this;
  }
  /**
   * Sets the Body's horizontal gravity.
   *
   * @method Phaser.Physics.Arcade.Body#setGravityX
   * @since 3.0.0
   *
   * @param {number} value - The gravity, in pixels per second squared.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setGravityX(t) {
    return this.gravity.x = t, this;
  }
  /**
   * Sets the Body's vertical gravity.
   *
   * @method Phaser.Physics.Arcade.Body#setGravityY
   * @since 3.0.0
   *
   * @param {number} value - The gravity, in pixels per second squared.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setGravityY(t) {
    return this.gravity.y = t, this;
  }
  /**
   * Sets the Body's friction.
   *
   * @method Phaser.Physics.Arcade.Body#setFriction
   * @since 3.0.0
   *
   * @param {number} x - The horizontal component, relative to 1.
   * @param {number} y - The vertical component, relative to 1.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setFriction(t, e) {
    return this.friction.set(t, e), this;
  }
  /**
   * Sets the Body's horizontal friction.
   *
   * @method Phaser.Physics.Arcade.Body#setFrictionX
   * @since 3.0.0
   *
   * @param {number} value - The friction value, relative to 1.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setFrictionX(t) {
    return this.friction.x = t, this;
  }
  /**
   * Sets the Body's vertical friction.
   *
   * @method Phaser.Physics.Arcade.Body#setFrictionY
   * @since 3.0.0
   *
   * @param {number} value - The friction value, relative to 1.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setFrictionY(t) {
    return this.friction.y = t, this;
  }
  /**
   * Sets the Body's angular velocity.
   *
   * @method Phaser.Physics.Arcade.Body#setAngularVelocity
   * @since 3.0.0
   *
   * @param {number} value - The velocity, in degrees per second.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setAngularVelocity(t) {
    return this.angularVelocity = t, this;
  }
  /**
   * Sets the Body's angular acceleration.
   *
   * @method Phaser.Physics.Arcade.Body#setAngularAcceleration
   * @since 3.0.0
   *
   * @param {number} value - The acceleration, in degrees per second squared.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setAngularAcceleration(t) {
    return this.angularAcceleration = t, this;
  }
  /**
   * Sets the Body's angular drag.
   *
   * @method Phaser.Physics.Arcade.Body#setAngularDrag
   * @since 3.0.0
   *
   * @param {number} value - The drag, in degrees per second squared.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setAngularDrag(t) {
    return this.angularDrag = t, this;
  }
  /**
   * Sets the Body's mass.
   *
   * @method Phaser.Physics.Arcade.Body#setMass
   * @since 3.0.0
   *
   * @param {number} value - The mass value, relative to 1.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setMass(t) {
    return this.mass = t, this;
  }
  /**
   * Sets the Body's `immovable` property.
   *
   * @method Phaser.Physics.Arcade.Body#setImmovable
   * @since 3.0.0
   *
   * @param {boolean} [value=true] - The value to assign to `immovable`.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setImmovable(t) {
    return t === void 0 && (t = !0), this.immovable = t, this;
  }
  /**
   * Sets the Body's `enable` property.
   *
   * @method Phaser.Physics.Arcade.Body#setEnable
   * @since 3.15.0
   *
   * @param {boolean} [value=true] - The value to assign to `enable`.
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  setEnable(t) {
    return t === void 0 && (t = !0), this.enable = t, this;
  }
  /**
   * This is an internal handler, called by the `ProcessX` function as part
   * of the collision step. You should almost never call this directly.
   *
   * @method Phaser.Physics.Arcade.Body#processX
   * @since 3.50.0
   *
   * @param {number} x - The amount to add to the Body position.
   * @param {number} [vx] - The amount to add to the Body velocity.
   * @param {boolean} [left] - Set the blocked.left value?
   * @param {boolean} [right] - Set the blocked.right value?
   */
  processX(t, e, s, r) {
    this.x += t, this.updateCenter(), e !== null && (this.velocity.x = e);
    const n = this.blocked;
    s && (n.left = !0), r && (n.right = !0);
  }
  /**
   * This is an internal handler, called by the `ProcessY` function as part
   * of the collision step. You should almost never call this directly.
   *
   * @method Phaser.Physics.Arcade.Body#processY
   * @since 3.50.0
   *
   * @param {number} y - The amount to add to the Body position.
   * @param {number} [vy] - The amount to add to the Body velocity.
   * @param {boolean} [up] - Set the blocked.up value?
   * @param {boolean} [down] - Set the blocked.down value?
   */
  processY(t, e, s, r) {
    this.y += t, this.updateCenter(), e !== null && (this.velocity.y = e);
    const n = this.blocked;
    s && (n.up = !0), r && (n.down = !0);
  }
  /**
   * The Bodys horizontal position (left edge).
   *
   * @name Phaser.Physics.Arcade.Body#x
   * @type {number}
   * @since 3.0.0
   */
  get x() {
    return this.position.x;
  }
  set x(t) {
    this.position.x = t;
  }
  /**
   * The Bodys vertical position (top edge).
   *
   * @name Phaser.Physics.Arcade.Body#y
   * @type {number}
   * @since 3.0.0
   */
  get y() {
    return this.position.y;
  }
  set y(t) {
    this.position.y = t;
  }
  /**
   * The left edge of the Body. Identical to x.
   *
   * @name Phaser.Physics.Arcade.Body#left
   * @type {number}
   * @readonly
   * @since 3.0.0
   */
  get left() {
    return this.position.x;
  }
  /**
   * The right edge of the Body.
   *
   * @name Phaser.Physics.Arcade.Body#right
   * @type {number}
   * @readonly
   * @since 3.0.0
   */
  get right() {
    return this.position.x + this.width;
  }
  /**
   * The top edge of the Body. Identical to y.
   *
   * @name Phaser.Physics.Arcade.Body#top
   * @type {number}
   * @readonly
   * @since 3.0.0
   */
  get top() {
    return this.position.y;
  }
  /**
   * The bottom edge of this Body.
   *
   * @name Phaser.Physics.Arcade.Body#bottom
   * @type {number}
   * @readonly
   * @since 3.0.0
   */
  get bottom() {
    return this.position.y + this.height;
  }
};
Le = wt.Body = Ki;
var Ot = {}, Dt = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(Dt, "__esModule", { value: !0 });
const ts = (i, t, e) => {
  if (i.radius > 0 && t >= i.left && t <= i.right && e >= i.top && e <= i.bottom) {
    const s = (i.x - t) * (i.x - t), r = (i.y - e) * (i.y - e);
    return s + r <= i.radius * i.radius;
  } else
    return !1;
};
Dt.default = ts;
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var ie = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(Ot, "__esModule", { value: !0 });
var je = Ot.StaticBody = void 0;
const es = ie(Dt), is = ie(rt), ss = ie(L), N = j;
let rs = class {
  /**
   * A Static Arcade Physics Body.
   *
   * A Static Body never moves, and isn't automatically synchronized with its parent Game Object.
   * That means if you make any change to the parent's origin, position, or scale after creating or adding the body, you'll need to update the Static Body manually.
   *
   * A Static Body can collide with other Bodies, but is never moved by collisions.
   *
   * Its dynamic counterpart is {@link Body}.
   *
   * @param world The Arcade Physics simulation this Static Body belongs to.
   * @param x
   * @param y
   * @param width
   * @param height
   */
  constructor(t, e, s, r = 64, n = 64) {
    this.world = t, this.enable = !0, this.isCircle = !1, this.radius = 0, this.offset = new N.Vector2(), this._dx = 0, this._dy = 0, this.isBody = !0, this.debugShowBody = t.defaults.debugShowStaticBody, this.debugBodyColor = t.defaults.staticBodyDebugColor, this.position = new N.Vector2(e, s), this.width = r, this.height = n, this.halfWidth = Math.abs(this.width / 2), this.halfHeight = Math.abs(this.height / 2), this.center = new N.Vector2(this.position.x + this.halfWidth, this.position.y + this.halfHeight), this.velocity = N.Vector2.ZERO, this.allowGravity = !1, this.gravity = N.Vector2.ZERO, this.bounce = N.Vector2.ZERO, this.onWorldBounds = !1, this.onCollide = !1, this.onOverlap = !1, this.mass = 1, this.immovable = !0, this.pushable = !1, this.customSeparateX = !1, this.customSeparateY = !1, this.overlapX = 0, this.overlapY = 0, this.overlapR = 0, this.embedded = !1, this.collideWorldBounds = !1, this.checkCollision = {
      none: !1,
      up: !0,
      down: !0,
      left: !0,
      right: !0
    }, this.touching = {
      none: !0,
      up: !1,
      down: !1,
      left: !1,
      right: !1
    }, this.wasTouching = {
      none: !0,
      up: !1,
      down: !1,
      left: !1,
      right: !1
    }, this.blocked = {
      none: !0,
      up: !1,
      down: !1,
      left: !1,
      right: !1
    }, this.physicsType = ss.default.PHYSICS_TYPE.STATIC_BODY, this._dx = 0, this._dy = 0;
  }
  // used for the btree
  get minX() {
    return this.x;
  }
  get minY() {
    return this.y;
  }
  get maxX() {
    return this.x + this.width;
  }
  get maxY() {
    return this.y + this.height;
  }
  // /**
  //  * Changes the Game Object this Body is bound to.
  //  * First it removes its reference from the old Game Object, then sets the new one.
  //  * You can optionally update the position and dimensions of this Body to reflect that of the new Game Object.
  //  *
  //  * @method Phaser.Physics.Arcade.StaticBody#setGameObject
  //  * @since 3.1.0
  //  *
  //  * @param {Phaser.GameObjects.GameObject} gameObject - The new Game Object that will own this Body.
  //  * @param {boolean} [update=true] - Reposition and resize this Body to match the new Game Object?
  //  *
  //  * @return {Phaser.Physics.Arcade.StaticBody} This Static Body object.
  //  *
  //  * @see Phaser.Physics.Arcade.StaticBody#updateFromGameObject
  //  */
  // setGameObject(gameObject, update) {
  //   if (gameObject && gameObject !== this.gameObject) {
  //     //  Remove this body from the old game object
  //     // @ts-ignore
  //     this.gameObject.body = null
  //     gameObject.body = this
  //     //  Update our reference
  //     this.gameObject = gameObject
  //   }
  //   if (update) {
  //     this.updateFromGameObject()
  //   }
  //   return this
  // }
  preUpdate() {
  }
  update() {
  }
  /**
   * Sets the size of the Static Body.
   * Resets the width and height to match current frame, if no width and height provided and a frame is found.
   *
   * @method Phaser.Physics.Arcade.StaticBody#setSize
   * @since 3.0.0
   *
   * @param {number} [width] - The width of the Static Body in pixels. Cannot be zero. If not given, and the parent Game Object has a frame, it will use the frame width.
   * @param {number} [height] - The height of the Static Body in pixels. Cannot be zero. If not given, and the parent Game Object has a frame, it will use the frame height.
   *
   * @return {Phaser.Physics.Arcade.StaticBody} This Static Body object.
   */
  setSize(t, e) {
    return this.world.staticTree.remove(this), this.width = t, this.height = e, this.halfWidth = Math.floor(t / 2), this.halfHeight = Math.floor(e / 2), this.updateCenter(), this.isCircle = !1, this.radius = 0, this.world.staticTree.insert(this), this;
  }
  /**
   * Sets this Static Body to have a circular body and sets its size and position.
   *
   * @method Phaser.Physics.Arcade.StaticBody#setCircle
   * @since 3.0.0
   *
   * @param {number} radius - The radius of the StaticBody, in pixels.
   * @param {number} [offsetX] - The horizontal offset of the StaticBody from its Game Object, in pixels.
   * @param {number} [offsetY] - The vertical offset of the StaticBody from its Game Object, in pixels.
   *
   * @return {Phaser.Physics.Arcade.StaticBody} This Static Body object.
   */
  setCircle(t, e, s) {
    return e === void 0 && (e = this.offset.x), s === void 0 && (s = this.offset.y), t > 0 ? (this.world.staticTree.remove(this), this.isCircle = !0, this.radius = t, this.width = t * 2, this.height = t * 2, this.halfWidth = Math.floor(this.width / 2), this.halfHeight = Math.floor(this.height / 2), this.offset.set(e, s), this.updateCenter(), this.world.staticTree.insert(this)) : this.isCircle = !1, this;
  }
  /**
   * Updates the StaticBody's `center` from its `position` and dimensions.
   *
   * @method Phaser.Physics.Arcade.StaticBody#updateCenter
   * @since 3.0.0
   */
  updateCenter() {
    this.center.set(this.position.x + this.halfWidth, this.position.y + this.halfHeight);
  }
  /**
   * Resets this Body to the given coordinates. Also positions its parent Game Object to the same coordinates.
   *
   * @method Phaser.Physics.Arcade.StaticBody#reset
   * @since 3.0.0
   *
   * @param {number} [x] - The x coordinate to reset the body to.
   * @param {number} [y] - The y coordinate to reset the body to.
   */
  reset(t, e) {
    this.world.staticTree.remove(this), this.position.set(t, e), this.updateCenter(), this.world.staticTree.insert(this);
  }
  /**
   * NOOP function. A Static Body cannot be stopped.
   *
   * @method Phaser.Physics.Arcade.StaticBody#stop
   * @since 3.0.0
   *
   * @return {Phaser.Physics.Arcade.StaticBody} This Static Body object.
   */
  stop() {
    return this;
  }
  /**
   * Returns the x and y coordinates of the top left and bottom right points of the StaticBody.
   *
   * @param {ArcadeBodyBounds} obj - The object which will hold the coordinates of the bounds.
   * @return {ArcadeBodyBounds} The same object that was passed with `x`, `y`, `right` and `bottom` values matching the respective values of the StaticBody.
   */
  getBounds(t) {
    return t.x = this.x, t.y = this.y, t.right = this.right, t.bottom = this.bottom, t;
  }
  /**
   * Checks to see if a given x,y coordinate is colliding with this Static Body.
   *
   * @method Phaser.Physics.Arcade.StaticBody#hitTest
   * @since 3.0.0
   *
   * @param {number} x - The x coordinate to check against this body.
   * @param {number} y - The y coordinate to check against this body.
   *
   * @return {boolean} `true` if the given coordinate lies within this body, otherwise `false`.
   */
  hitTest(t, e) {
    return this.isCircle ? (0, es.default)(this, t, e) : (0, is.default)(this, t, e);
  }
  /**
   * NOOP
   *
   * @method Phaser.Physics.Arcade.StaticBody#postUpdate
   * @since 3.12.0
   */
  postUpdate() {
  }
  /**
   * The absolute (non-negative) change in this StaticBody's horizontal position from the previous step. Always zero.
   *
   * @method Phaser.Physics.Arcade.StaticBody#deltaAbsX
   * @since 3.0.0
   *
   * @return {number} Always zero for a Static Body.
   */
  deltaAbsX() {
    return 0;
  }
  /**
   * The absolute (non-negative) change in this StaticBody's vertical position from the previous step. Always zero.
   *
   * @method Phaser.Physics.Arcade.StaticBody#deltaAbsY
   * @since 3.0.0
   *
   * @return {number} Always zero for a Static Body.
   */
  deltaAbsY() {
    return 0;
  }
  /**
   * The change in this StaticBody's horizontal position from the previous step. Always zero.
   *
   * @method Phaser.Physics.Arcade.StaticBody#deltaX
   * @since 3.0.0
   *
   * @return {number} The change in this StaticBody's velocity from the previous step. Always zero.
   */
  deltaX() {
    return 0;
  }
  /**
   * The change in this StaticBody's vertical position from the previous step. Always zero.
   *
   * @method Phaser.Physics.Arcade.StaticBody#deltaY
   * @since 3.0.0
   *
   * @return {number} The change in this StaticBody's velocity from the previous step. Always zero.
   */
  deltaY() {
    return 0;
  }
  /**
   * The change in this StaticBody's rotation from the previous step. Always zero.
   *
   * @method Phaser.Physics.Arcade.StaticBody#deltaZ
   * @since 3.0.0
   *
   * @return {number} The change in this StaticBody's rotation from the previous step. Always zero.
   */
  deltaZ() {
    return 0;
  }
  /**
   * Disables this Body and marks it for destruction during the next step.
   *
   * @method Phaser.Physics.Arcade.StaticBody#destroy
   * @since 3.0.0
   */
  destroy() {
    this.enable = !1, this.world.pendingDestroy.add(this);
  }
  /**
   * Draws a graphical representation of the StaticBody for visual debugging purposes.
   *
   * @method Phaser.Physics.Arcade.StaticBody#drawDebug
   * @since 3.0.0
   *
   * @param {CanvasRenderingContext2D} Context2D - The Context2D to use for the debug drawing of the StaticBody.
   */
  drawDebug(t) {
    const e = this.position, s = e.x + this.halfWidth, r = e.y + this.halfHeight, n = 1, a = (d) => {
      d >>>= 0;
      let p = (d & 255).toString(16), v = ((d & 65280) >>> 8).toString(16), B = ((d & 16711680) >>> 16).toString(16);
      return p === "0" && (p = "00"), v === "0" && (v = "00"), B === "0" && (B = "00"), `#${p}${v}${B}`;
    }, l = (d, p, v, B) => {
      t.rect(d, p, v, B);
    }, u = (d, p, v) => {
      t.lineWidth = d, t.strokeStyle = a(p);
    }, c = (d, p, v) => {
      t.arc(d, p, v, 0, 2 * Math.PI);
    };
    this.debugShowBody && (t.beginPath(), u(n, this.debugBodyColor || 255), this.isCircle ? c(s, r, this.width / 2) : l(e.x, e.y, this.width, this.height), t.stroke());
  }
  /**
   * Indicates whether the StaticBody is going to be showing a debug visualization during postUpdate.
   *
   * @method Phaser.Physics.Arcade.StaticBody#willDrawDebug
   * @since 3.0.0
   *
   * @return {boolean} Whether or not the StaticBody is going to show the debug visualization during postUpdate.
   */
  willDrawDebug() {
    return this.debugShowBody;
  }
  /**
   * Sets the Mass of the StaticBody. Will set the Mass to 0.1 if the value passed is less than or equal to zero.
   *
   * @method Phaser.Physics.Arcade.StaticBody#setMass
   * @since 3.0.0
   *
   * @param {number} value - The value to set the Mass to. Values of zero or less are changed to 0.1.
   *
   * @return {Phaser.Physics.Arcade.StaticBody} This Static Body object.
   */
  setMass(t) {
    return t <= 0 && (t = 0.1), this.mass = t, this;
  }
  /**
   * The x coordinate of the StaticBody.
   *
   * @name Phaser.Physics.Arcade.StaticBody#x
   * @type {number}
   * @since 3.0.0
   */
  get x() {
    return this.position.x;
  }
  set x(t) {
    this.world.staticTree.remove(this), this.position.x = t, this.world.staticTree.insert(this);
  }
  /**
   * The y coordinate of the StaticBody.
   *
   * @name Phaser.Physics.Arcade.StaticBody#y
   * @type {number}
   * @since 3.0.0
   */
  get y() {
    return this.position.y;
  }
  set y(t) {
    this.world.staticTree.remove(this), this.position.y = t, this.world.staticTree.insert(this);
  }
  /**
   * Returns the left-most x coordinate of the area of the StaticBody.
   *
   * @name Phaser.Physics.Arcade.StaticBody#left
   * @type {number}
   * @readonly
   * @since 3.0.0
   */
  get left() {
    return this.position.x;
  }
  /**
   * The right-most x coordinate of the area of the StaticBody.
   *
   * @name Phaser.Physics.Arcade.StaticBody#right
   * @type {number}
   * @readonly
   * @since 3.0.0
   */
  get right() {
    return this.position.x + this.width;
  }
  /**
   * The highest y coordinate of the area of the StaticBody.
   *
   * @name Phaser.Physics.Arcade.StaticBody#top
   * @type {number}
   * @readonly
   * @since 3.0.0
   */
  get top() {
    return this.position.y;
  }
  /**
   * The lowest y coordinate of the area of the StaticBody. (y + height)
   *
   * @name Phaser.Physics.Arcade.StaticBody#bottom
   * @type {number}
   * @readonly
   * @since 3.0.0
   */
  get bottom() {
    return this.position.y + this.height;
  }
};
je = Ot.StaticBody = rs;
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(xt, "__esModule", { value: !0 });
var ns = xt.Factory = void 0;
const os = wt, hs = Ot;
class ls {
  /**
   * The Arcade Physics Factory allows you to easily create Arcade Physics enabled Game Objects.
   * Objects that are created by this Factory are automatically added to the physics world.
   *
   * @param world The Arcade Physics World instance.
   */
  constructor(t) {
    this.world = t, this.scene = t.scene, this.sys = t.scene.sys;
  }
  /** Creates a new Dynamic Arcade Body. */
  body(t, e, s = 64, r = 64) {
    const n = new os.Body(this.world, t, e, s, r);
    return this.world.add(n), n;
  }
  /** Creates a new Static Arcade Physics Body. */
  staticBody(t, e, s = 64, r = 64) {
    const n = new hs.StaticBody(this.world, t, e, s, r);
    return this.world.add(n), n;
  }
  /**
   * Creates a new Arcade Physics Collider object.
   *
   * @param body1 - The first object to check for collision.
   * @param body2 - The second object to check for collision.
   * @param [collideCallback] - The callback to invoke when the two objects collide.
   * @param [processCallback] - The callback to invoke when the two objects collide. Must return a boolean.
   * @param [callbackContext] - The scope in which to call the callbacks.
   *
   * @return The Collider that was created.
   */
  collider(t, e, s, r, n) {
    return this.world.addCollider(t, e, s, r, n);
  }
  /**
   * Creates a new Arcade Physics Collider Overlap object.
   *
   * @param body1 - The first object to check for overlap.
   * @param body2 - The second object to check for overlap.
   * @param [collideCallback] - The callback to invoke when the two objects collide.
   * @param [processCallback] - The callback to invoke when the two objects collide. Must return a boolean.
   * @param [callbackContext] - The scope in which to call the callbacks.
   *
   * @return The Collider that was created.
   */
  overlap(t, e, s, r, n) {
    return this.world.addOverlap(t, e, s, r, n);
  }
  /** Destroys this Factory. */
  destroy() {
    this.world = null, this.scene = null, this.sys = null;
  }
}
ns = xt.Factory = ls;
var se = {}, St = {};
Object.defineProperty(St, "__esModule", { value: !0 });
const as = function(i, t, e, s, r, n = !0, a = !1) {
  let l = [], u = [];
  const c = i.treeMinMax;
  if (c.minX = t, c.minY = e, c.maxX = t + s, c.maxY = e + r, a && (u = i.staticTree.search(c)), n && i.useTree)
    l = i.tree.search(c);
  else if (n) {
    const d = i.bodies, p = {
      position: {
        x: t,
        y: e
      },
      left: t,
      top: e,
      right: t + s,
      bottom: e + r,
      isCircle: !1
    };
    d.forEach((v) => {
      i.intersects(v, p) && l.push(v);
    });
  }
  return [...u, ...l];
};
St.default = as;
var Yt = {}, re = {}, Tt = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var us = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(Tt, "__esModule", { value: !0 });
const cs = us(b), fs = (i, t, e) => (e === void 0 && (e = new cs.default()), e.x = i.x + i.radius * Math.cos(t), e.y = i.y + i.radius * Math.sin(t), e);
Tt.default = fs;
var Et = {}, $t = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty($t, "__esModule", { value: !0 });
const ds = (i, t, e) => Math.max(t, Math.min(e, i));
$t.default = ds;
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var ps = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(Et, "__esModule", { value: !0 });
const _s = ps($t), ys = (i, t, e) => (i = (0, _s.default)(i, 0, 1), (e - t) * i + t);
Et.default = ys;
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var At = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(re, "__esModule", { value: !0 });
const gs = At(Tt), vs = At(Et), ms = At(z), xs = At(b), ws = (i, t, e) => {
  e === void 0 && (e = new xs.default());
  const s = (0, vs.default)(t, 0, ms.default.PI2);
  return (0, gs.default)(i, s, e);
};
re.default = ws;
var ne = {}, oe = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(oe, "__esModule", { value: !0 });
const Ps = (i) => 2 * (Math.PI * i.radius);
oe.default = Ps;
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var It = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(ne, "__esModule", { value: !0 });
const Ms = It(oe), Bs = It(Tt), Cs = It(Et), Os = It(z), Ds = (i, t, e, s) => {
  s === void 0 && (s = []), !t && e > 0 && (t = (0, Ms.default)(i) / e);
  for (let r = 0; r < t; r++) {
    const n = (0, Cs.default)(r / t, 0, Os.default.PI2);
    s.push((0, Bs.default)(i, n));
  }
  return s;
};
ne.default = Ds;
var he = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var Ss = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(he, "__esModule", { value: !0 });
const Ys = Ss(b), Ts = (i, t) => {
  t === void 0 && (t = new Ys.default());
  const e = 2 * Math.PI * Math.random(), s = Math.random() + Math.random(), r = s > 1 ? 2 - s : s, n = r * Math.cos(e), a = r * Math.sin(e);
  return t.x = i.x + n * i.radius, t.y = i.y + a * i.radius, t;
};
he.default = Ts;
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var J = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(Yt, "__esModule", { value: !0 });
Yt.Circle = void 0;
J(nt);
const Es = J(Dt), $s = J(re), As = J(ne), Is = J(q), Xs = J(he);
class Rs {
  constructor(t, e, s) {
    t === void 0 && (t = 0), e === void 0 && (e = 0), s === void 0 && (s = 0), this.type = Is.default.CIRCLE, this.x = t, this.y = e, this._radius = s, this._diameter = s * 2;
  }
  /**
   * Check to see if the Circle contains the given x / y coordinates.
   *
   * @method Phaser.Geom.Circle#contains
   * @since 3.0.0
   *
   * @param {number} x - The x coordinate to check within the circle.
   * @param {number} y - The y coordinate to check within the circle.
   *
   * @return {boolean} True if the coordinates are within the circle, otherwise false.
   */
  contains(t, e) {
    return (0, Es.default)(this, t, e);
  }
  /**
   * Returns a Point object containing the coordinates of a point on the circumference of the Circle
   * based on the given angle normalized to the range 0 to 1. I.e. a value of 0.5 will give the point
   * at 180 degrees around the circle.
   *
   * @method Phaser.Geom.Circle#getPoint
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Point} O - [out,$return]
   *
   * @param {number} position - A value between 0 and 1, where 0 equals 0 degrees, 0.5 equals 180 degrees and 1 equals 360 around the circle.
   * @param {(Phaser.Geom.Point|object)} [out] - An object to store the return values in. If not given a Point object will be created.
   *
   * @return {(Phaser.Geom.Point|object)} A Point, or point-like object, containing the coordinates of the point around the circle.
   */
  getPoint(t, e) {
    return (0, $s.default)(this, t, e);
  }
  /**
   * Returns an array of Point objects containing the coordinates of the points around the circumference of the Circle,
   * based on the given quantity or stepRate values.
   *
   * @method Phaser.Geom.Circle#getPoints
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Point[]} O - [output,$return]
   *
   * @param {number} quantity - The amount of points to return. If a falsey value the quantity will be derived from the `stepRate` instead.
   * @param {number} [stepRate] - Sets the quantity by getting the circumference of the circle and dividing it by the stepRate.
   * @param {(array|Phaser.Geom.Point[])} [output] - An array to insert the points in to. If not provided a new array will be created.
   *
   * @return {(array|Phaser.Geom.Point[])} An array of Point objects pertaining to the points around the circumference of the circle.
   */
  getPoints(t, e, s) {
    return (0, As.default)(this, t, e, s);
  }
  /**
   * Returns a uniformly distributed random point from anywhere within the Circle.
   *
   * @method Phaser.Geom.Circle#getRandomPoint
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Point} O - [point,$return]
   *
   * @param {(Phaser.Geom.Point|object)} [point] - A Point or point-like object to set the random `x` and `y` values in.
   *
   * @return {(Phaser.Geom.Point|object)} A Point object with the random values set in the `x` and `y` properties.
   */
  getRandomPoint(t) {
    return (0, Xs.default)(this, t);
  }
  /**
   * Sets the x, y and radius of this circle.
   *
   * @method Phaser.Geom.Circle#setTo
   * @since 3.0.0
   *
   * @param {number} [x=0] - The x position of the center of the circle.
   * @param {number} [y=0] - The y position of the center of the circle.
   * @param {number} [radius=0] - The radius of the circle.
   *
   * @return {this} This Circle object.
   */
  setTo(t, e, s) {
    return this.x = t, this.y = e, this._radius = s, this._diameter = s * 2, this;
  }
  /**
   * Sets this Circle to be empty with a radius of zero.
   * Does not change its position.
   *
   * @method Phaser.Geom.Circle#setEmpty
   * @since 3.0.0
   *
   * @return {this} This Circle object.
   */
  setEmpty() {
    return this._radius = 0, this._diameter = 0, this;
  }
  /**
   * Sets the position of this Circle.
   *
   * @method Phaser.Geom.Circle#setPosition
   * @since 3.0.0
   *
   * @param {number} [x=0] - The x position of the center of the circle.
   * @param {number} [y=0] - The y position of the center of the circle.
   *
   * @return {this} This Circle object.
   */
  setPosition(t, e) {
    return e === void 0 && (e = t), this.x = t, this.y = e, this;
  }
  /**
   * Checks to see if the Circle is empty: has a radius of zero.
   *
   * @method Phaser.Geom.Circle#isEmpty
   * @since 3.0.0
   *
   * @return {boolean} True if the Circle is empty, otherwise false.
   */
  isEmpty() {
    return this._radius <= 0;
  }
  /**
   * The radius of the Circle.
   *
   * @name Phaser.Geom.Circle#radius
   * @type {number}
   * @since 3.0.0
   */
  get radius() {
    return this._radius;
  }
  set radius(t) {
    this._radius = t, this._diameter = t * 2;
  }
  /**
   * The diameter of the Circle.
   *
   * @name Phaser.Geom.Circle#diameter
   * @type {number}
   * @since 3.0.0
   */
  get diameter() {
    return this._diameter;
  }
  set diameter(t) {
    this._diameter = t, this._radius = t * 0.5;
  }
  /**
   * The left position of the Circle.
   *
   * @name Phaser.Geom.Circle#left
   * @type {number}
   * @since 3.0.0
   */
  get left() {
    return this.x - this._radius;
  }
  set left(t) {
    this.x = t + this._radius;
  }
  /**
   * The right position of the Circle.
   *
   * @name Phaser.Geom.Circle#right
   * @type {number}
   * @since 3.0.0
   */
  get right() {
    return this.x + this._radius;
  }
  set right(t) {
    this.x = t - this._radius;
  }
  /**
   * The top position of the Circle.
   *
   * @name Phaser.Geom.Circle#top
   * @type {number}
   * @since 3.0.0
   */
  get top() {
    return this.y - this._radius;
  }
  set top(t) {
    this.y = t + this._radius;
  }
  /**
   * The bottom position of the Circle.
   *
   * @name Phaser.Geom.Circle#bottom
   * @type {number}
   * @since 3.0.0
   */
  get bottom() {
    return this.y + this._radius;
  }
  set bottom(t) {
    this.y = t - this._radius;
  }
}
Yt.Circle = Rs;
var le = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var bs = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(le, "__esModule", { value: !0 });
const Gs = bs(it), Ls = (i, t) => (0, Gs.default)(i.x, i.y, t.x, t.y) <= i.radius + t.radius;
le.default = Ls;
var ae = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(ae, "__esModule", { value: !0 });
const js = (i, t) => {
  const e = t.width / 2, s = t.height / 2, r = Math.abs(i.x - t.x - e), n = Math.abs(i.y - t.y - s), a = e + i.radius, l = s + i.radius;
  if (r > a || n > l)
    return !1;
  if (r <= e || n <= s)
    return !0;
  {
    const u = r - e, c = n - s, d = u * u, p = c * c, v = i.radius * i.radius;
    return d + p <= v;
  }
};
ae.default = js;
var ue = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(se, "__esModule", { value: !0 });
const Vs = ue(St), Pe = Yt, Fs = ue(le), ks = ue(ae), Ws = function(i, t, e, s, r = !0, n = !1) {
  const a = (0, Vs.default)(i, t - s, e - s, 2 * s, 2 * s, r, n);
  if (a.length === 0)
    return a;
  const l = new Pe.Circle(t, e, s), u = new Pe.Circle(), c = [];
  for (let d = 0; d < a.length; d++) {
    const p = a[d];
    p.isCircle ? (u.setTo(p.center.x, p.center.y, p.halfWidth), (0, Fs.default)(l, u) && c.push(p)) : (0, ks.default)(l, p) && c.push(p);
  }
  return c;
};
se.default = Ws;
var Xt = {}, ce = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(ce, "__esModule", { value: !0 });
const Ns = (i, t) => Math.atan2(t.y - i.y, t.x - i.x);
ce.default = Ns;
var Ve = { exports: {} };
(function(i) {
  var t = Object.prototype.hasOwnProperty, e = "~";
  function s() {
  }
  Object.create && (s.prototype = /* @__PURE__ */ Object.create(null), new s().__proto__ || (e = !1));
  function r(u, c, d) {
    this.fn = u, this.context = c, this.once = d || !1;
  }
  function n(u, c, d, p, v) {
    if (typeof d != "function")
      throw new TypeError("The listener must be a function");
    var B = new r(d, p || u, v), O = e ? e + c : c;
    return u._events[O] ? u._events[O].fn ? u._events[O] = [u._events[O], B] : u._events[O].push(B) : (u._events[O] = B, u._eventsCount++), u;
  }
  function a(u, c) {
    --u._eventsCount === 0 ? u._events = new s() : delete u._events[c];
  }
  function l() {
    this._events = new s(), this._eventsCount = 0;
  }
  l.prototype.eventNames = function() {
    var c = [], d, p;
    if (this._eventsCount === 0)
      return c;
    for (p in d = this._events)
      t.call(d, p) && c.push(e ? p.slice(1) : p);
    return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(d)) : c;
  }, l.prototype.listeners = function(c) {
    var d = e ? e + c : c, p = this._events[d];
    if (!p)
      return [];
    if (p.fn)
      return [p.fn];
    for (var v = 0, B = p.length, O = new Array(B); v < B; v++)
      O[v] = p[v].fn;
    return O;
  }, l.prototype.listenerCount = function(c) {
    var d = e ? e + c : c, p = this._events[d];
    return p ? p.fn ? 1 : p.length : 0;
  }, l.prototype.emit = function(c, d, p, v, B, O) {
    var C = e ? e + c : c;
    if (!this._events[C])
      return !1;
    var g = this._events[C], M = arguments.length, o, h;
    if (g.fn) {
      switch (g.once && this.removeListener(c, g.fn, void 0, !0), M) {
        case 1:
          return g.fn.call(g.context), !0;
        case 2:
          return g.fn.call(g.context, d), !0;
        case 3:
          return g.fn.call(g.context, d, p), !0;
        case 4:
          return g.fn.call(g.context, d, p, v), !0;
        case 5:
          return g.fn.call(g.context, d, p, v, B), !0;
        case 6:
          return g.fn.call(g.context, d, p, v, B, O), !0;
      }
      for (h = 1, o = new Array(M - 1); h < M; h++)
        o[h - 1] = arguments[h];
      g.fn.apply(g.context, o);
    } else {
      var _ = g.length, m;
      for (h = 0; h < _; h++)
        switch (g[h].once && this.removeListener(c, g[h].fn, void 0, !0), M) {
          case 1:
            g[h].fn.call(g[h].context);
            break;
          case 2:
            g[h].fn.call(g[h].context, d);
            break;
          case 3:
            g[h].fn.call(g[h].context, d, p);
            break;
          case 4:
            g[h].fn.call(g[h].context, d, p, v);
            break;
          default:
            if (!o)
              for (m = 1, o = new Array(M - 1); m < M; m++)
                o[m - 1] = arguments[m];
            g[h].fn.apply(g[h].context, o);
        }
    }
    return !0;
  }, l.prototype.on = function(c, d, p) {
    return n(this, c, d, p, !1);
  }, l.prototype.once = function(c, d, p) {
    return n(this, c, d, p, !0);
  }, l.prototype.removeListener = function(c, d, p, v) {
    var B = e ? e + c : c;
    if (!this._events[B])
      return this;
    if (!d)
      return a(this, B), this;
    var O = this._events[B];
    if (O.fn)
      O.fn === d && (!v || O.once) && (!p || O.context === p) && a(this, B);
    else {
      for (var C = 0, g = [], M = O.length; C < M; C++)
        (O[C].fn !== d || v && !O[C].once || p && O[C].context !== p) && g.push(O[C]);
      g.length ? this._events[B] = g.length === 1 ? g[0] : g : a(this, B);
    }
    return this;
  }, l.prototype.removeAllListeners = function(c) {
    var d;
    return c ? (d = e ? e + c : c, this._events[d] && a(this, d)) : (this._events = new s(), this._eventsCount = 0), this;
  }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = e, l.EventEmitter = l, i.exports = l;
})(Ve);
var Fe = Ve.exports, fe = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(fe, "__esModule", { value: !0 });
const Us = (i, t, e) => (e === void 0 && (e = 1e-4), i > t - e);
fe.default = Us;
var de = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(de, "__esModule", { value: !0 });
const Hs = (i, t, e) => (e === void 0 && (e = 1e-4), i < t + e);
de.default = Hs;
var ht = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var zs = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(ht, "__esModule", { value: !0 });
ht.GetOverlapX = void 0;
const dt = zs(L), qs = (i, t, e, s) => {
  let r = 0;
  const n = i.deltaAbsX() + t.deltaAbsX() + s;
  return i._dx === 0 && t._dx === 0 ? (i.embedded = !0, t.embedded = !0) : i._dx > t._dx ? (r = i.right - t.x, r > n && !e || i.checkCollision.right === !1 || t.checkCollision.left === !1 ? r = 0 : (i.touching.none = !1, i.touching.right = !0, t.touching.none = !1, t.touching.left = !0, t.physicsType === dt.default.PHYSICS_TYPE.STATIC_BODY && !e && (i.blocked.none = !1, i.blocked.right = !0), i.physicsType === dt.default.PHYSICS_TYPE.STATIC_BODY && !e && (t.blocked.none = !1, t.blocked.left = !0))) : i._dx < t._dx && (r = i.x - t.width - t.x, -r > n && !e || i.checkCollision.left === !1 || t.checkCollision.right === !1 ? r = 0 : (i.touching.none = !1, i.touching.left = !0, t.touching.none = !1, t.touching.right = !0, t.physicsType === dt.default.PHYSICS_TYPE.STATIC_BODY && !e && (i.blocked.none = !1, i.blocked.left = !0), i.physicsType === dt.default.PHYSICS_TYPE.STATIC_BODY && !e && (t.blocked.none = !1, t.blocked.right = !0))), i.overlapX = r, t.overlapX = r, r;
};
ht.GetOverlapX = qs;
var lt = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var Qs = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.GetOverlapY = void 0;
const pt = Qs(L), Zs = (i, t, e, s) => {
  let r = 0;
  const n = i.deltaAbsY() + t.deltaAbsY() + s;
  return i._dy === 0 && t._dy === 0 ? (i.embedded = !0, t.embedded = !0) : i._dy > t._dy ? (r = i.bottom - t.y, r > n && !e || i.checkCollision.down === !1 || t.checkCollision.up === !1 ? r = 0 : (i.touching.none = !1, i.touching.down = !0, t.touching.none = !1, t.touching.up = !0, t.physicsType === pt.default.PHYSICS_TYPE.STATIC_BODY && !e && (i.blocked.none = !1, i.blocked.down = !0), i.physicsType === pt.default.PHYSICS_TYPE.STATIC_BODY && !e && (t.blocked.none = !1, t.blocked.up = !0))) : i._dy < t._dy && (r = i.y - t.bottom, -r > n && !e || i.checkCollision.up === !1 || t.checkCollision.down === !1 ? r = 0 : (i.touching.none = !1, i.touching.up = !0, t.touching.none = !1, t.touching.down = !0, t.physicsType === pt.default.PHYSICS_TYPE.STATIC_BODY && !e && (i.blocked.none = !1, i.blocked.up = !0), i.physicsType === pt.default.PHYSICS_TYPE.STATIC_BODY && !e && (t.blocked.none = !1, t.blocked.down = !0))), i.overlapY = r, t.overlapY = r, r;
};
lt.GetOverlapY = Zs;
var pe = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(pe, "__esModule", { value: !0 });
const Js = (i, t, e) => {
  if (!i || typeof i == "number")
    return e;
  if (i.hasOwnProperty(t))
    return i[t];
  if (t.indexOf(".") !== -1) {
    const s = t.split(".");
    let r = i, n = e;
    for (let a = 0; a < s.length; a++)
      if (r.hasOwnProperty(s[a]))
        n = r[s[a]], r = r[s[a]];
      else {
        n = e;
        break;
      }
    return n;
  } else
    return e;
};
pe.default = Js;
var at = {}, ke = { exports: {} };
(function(i, t) {
  (function(e, s) {
    i.exports = s();
  })(x, function() {
    function e(o, h, _, m, w) {
      (function P(f, y, S, D, Y) {
        for (; D > S; ) {
          if (D - S > 600) {
            var T = D - S + 1, $ = y - S + 1, K = Math.log(T), V = 0.5 * Math.exp(2 * K / 3), F = 0.5 * Math.sqrt(K * V * (T - V) / T) * ($ - T / 2 < 0 ? -1 : 1), k = Math.max(S, Math.floor(y - $ * V / T + F)), Ze = Math.min(D, Math.floor(y + (T - $) * V / T + F));
            P(f, y, k, Ze, Y);
          }
          var ct = f[y], tt = S, R = D;
          for (s(f, S, y), Y(f[D], ct) > 0 && s(f, S, D); tt < R; ) {
            for (s(f, tt, R), tt++, R--; Y(f[tt], ct) < 0; )
              tt++;
            for (; Y(f[R], ct) > 0; )
              R--;
          }
          Y(f[S], ct) === 0 ? s(f, S, R) : s(f, ++R, D), R <= y && (S = R + 1), y <= R && (D = R - 1);
        }
      })(o, h, _ || 0, m || o.length - 1, w || r);
    }
    function s(o, h, _) {
      var m = o[h];
      o[h] = o[_], o[_] = m;
    }
    function r(o, h) {
      return o < h ? -1 : o > h ? 1 : 0;
    }
    var n = function(o) {
      o === void 0 && (o = 9), this._maxEntries = Math.max(4, o), this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries)), this.clear();
    };
    function a(o, h, _) {
      if (!_)
        return h.indexOf(o);
      for (var m = 0; m < h.length; m++)
        if (_(o, h[m]))
          return m;
      return -1;
    }
    function l(o, h) {
      u(o, 0, o.children.length, h, o);
    }
    function u(o, h, _, m, w) {
      w || (w = g(null)), w.minX = 1 / 0, w.minY = 1 / 0, w.maxX = -1 / 0, w.maxY = -1 / 0;
      for (var P = h; P < _; P++) {
        var f = o.children[P];
        c(w, o.leaf ? m(f) : f);
      }
      return w;
    }
    function c(o, h) {
      return o.minX = Math.min(o.minX, h.minX), o.minY = Math.min(o.minY, h.minY), o.maxX = Math.max(o.maxX, h.maxX), o.maxY = Math.max(o.maxY, h.maxY), o;
    }
    function d(o, h) {
      return o.minX - h.minX;
    }
    function p(o, h) {
      return o.minY - h.minY;
    }
    function v(o) {
      return (o.maxX - o.minX) * (o.maxY - o.minY);
    }
    function B(o) {
      return o.maxX - o.minX + (o.maxY - o.minY);
    }
    function O(o, h) {
      return o.minX <= h.minX && o.minY <= h.minY && h.maxX <= o.maxX && h.maxY <= o.maxY;
    }
    function C(o, h) {
      return h.minX <= o.maxX && h.minY <= o.maxY && h.maxX >= o.minX && h.maxY >= o.minY;
    }
    function g(o) {
      return { children: o, height: 1, leaf: !0, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
    }
    function M(o, h, _, m, w) {
      for (var P = [h, _]; P.length; )
        if (!((_ = P.pop()) - (h = P.pop()) <= m)) {
          var f = h + Math.ceil((_ - h) / m / 2) * m;
          e(o, f, h, _, w), P.push(h, f, f, _);
        }
    }
    return n.prototype.all = function() {
      return this._all(this.data, []);
    }, n.prototype.search = function(o) {
      var h = this.data, _ = [];
      if (!C(o, h))
        return _;
      for (var m = this.toBBox, w = []; h; ) {
        for (var P = 0; P < h.children.length; P++) {
          var f = h.children[P], y = h.leaf ? m(f) : f;
          C(o, y) && (h.leaf ? _.push(f) : O(o, y) ? this._all(f, _) : w.push(f));
        }
        h = w.pop();
      }
      return _;
    }, n.prototype.collides = function(o) {
      var h = this.data;
      if (!C(o, h))
        return !1;
      for (var _ = []; h; ) {
        for (var m = 0; m < h.children.length; m++) {
          var w = h.children[m], P = h.leaf ? this.toBBox(w) : w;
          if (C(o, P)) {
            if (h.leaf || O(o, P))
              return !0;
            _.push(w);
          }
        }
        h = _.pop();
      }
      return !1;
    }, n.prototype.load = function(o) {
      if (!o || !o.length)
        return this;
      if (o.length < this._minEntries) {
        for (var h = 0; h < o.length; h++)
          this.insert(o[h]);
        return this;
      }
      var _ = this._build(o.slice(), 0, o.length - 1, 0);
      if (this.data.children.length)
        if (this.data.height === _.height)
          this._splitRoot(this.data, _);
        else {
          if (this.data.height < _.height) {
            var m = this.data;
            this.data = _, _ = m;
          }
          this._insert(_, this.data.height - _.height - 1, !0);
        }
      else
        this.data = _;
      return this;
    }, n.prototype.insert = function(o) {
      return o && this._insert(o, this.data.height - 1), this;
    }, n.prototype.clear = function() {
      return this.data = g([]), this;
    }, n.prototype.remove = function(o, h) {
      if (!o)
        return this;
      for (var _, m, w, P = this.data, f = this.toBBox(o), y = [], S = []; P || y.length; ) {
        if (P || (P = y.pop(), m = y[y.length - 1], _ = S.pop(), w = !0), P.leaf) {
          var D = a(o, P.children, h);
          if (D !== -1)
            return P.children.splice(D, 1), y.push(P), this._condense(y), this;
        }
        w || P.leaf || !O(P, f) ? m ? (_++, P = m.children[_], w = !1) : P = null : (y.push(P), S.push(_), _ = 0, m = P, P = P.children[0]);
      }
      return this;
    }, n.prototype.toBBox = function(o) {
      return o;
    }, n.prototype.compareMinX = function(o, h) {
      return o.minX - h.minX;
    }, n.prototype.compareMinY = function(o, h) {
      return o.minY - h.minY;
    }, n.prototype.toJSON = function() {
      return this.data;
    }, n.prototype.fromJSON = function(o) {
      return this.data = o, this;
    }, n.prototype._all = function(o, h) {
      for (var _ = []; o; )
        o.leaf ? h.push.apply(h, o.children) : _.push.apply(_, o.children), o = _.pop();
      return h;
    }, n.prototype._build = function(o, h, _, m) {
      var w, P = _ - h + 1, f = this._maxEntries;
      if (P <= f)
        return l(w = g(o.slice(h, _ + 1)), this.toBBox), w;
      m || (m = Math.ceil(Math.log(P) / Math.log(f)), f = Math.ceil(P / Math.pow(f, m - 1))), (w = g([])).leaf = !1, w.height = m;
      var y = Math.ceil(P / f), S = y * Math.ceil(Math.sqrt(f));
      M(o, h, _, S, this.compareMinX);
      for (var D = h; D <= _; D += S) {
        var Y = Math.min(D + S - 1, _);
        M(o, D, Y, y, this.compareMinY);
        for (var T = D; T <= Y; T += y) {
          var $ = Math.min(T + y - 1, Y);
          w.children.push(this._build(o, T, $, m - 1));
        }
      }
      return l(w, this.toBBox), w;
    }, n.prototype._chooseSubtree = function(o, h, _, m) {
      for (; m.push(h), !h.leaf && m.length - 1 !== _; ) {
        for (var w = 1 / 0, P = 1 / 0, f = void 0, y = 0; y < h.children.length; y++) {
          var S = h.children[y], D = v(S), Y = (T = o, $ = S, (Math.max($.maxX, T.maxX) - Math.min($.minX, T.minX)) * (Math.max($.maxY, T.maxY) - Math.min($.minY, T.minY)) - D);
          Y < P ? (P = Y, w = D < w ? D : w, f = S) : Y === P && D < w && (w = D, f = S);
        }
        h = f || h.children[0];
      }
      var T, $;
      return h;
    }, n.prototype._insert = function(o, h, _) {
      var m = _ ? o : this.toBBox(o), w = [], P = this._chooseSubtree(m, this.data, h, w);
      for (P.children.push(o), c(P, m); h >= 0 && w[h].children.length > this._maxEntries; )
        this._split(w, h), h--;
      this._adjustParentBBoxes(m, w, h);
    }, n.prototype._split = function(o, h) {
      var _ = o[h], m = _.children.length, w = this._minEntries;
      this._chooseSplitAxis(_, w, m);
      var P = this._chooseSplitIndex(_, w, m), f = g(_.children.splice(P, _.children.length - P));
      f.height = _.height, f.leaf = _.leaf, l(_, this.toBBox), l(f, this.toBBox), h ? o[h - 1].children.push(f) : this._splitRoot(_, f);
    }, n.prototype._splitRoot = function(o, h) {
      this.data = g([o, h]), this.data.height = o.height + 1, this.data.leaf = !1, l(this.data, this.toBBox);
    }, n.prototype._chooseSplitIndex = function(o, h, _) {
      for (var m, w, P, f, y, S, D, Y = 1 / 0, T = 1 / 0, $ = h; $ <= _ - h; $++) {
        var K = u(o, 0, $, this.toBBox), V = u(o, $, _, this.toBBox), F = (w = K, P = V, f = void 0, y = void 0, S = void 0, D = void 0, f = Math.max(w.minX, P.minX), y = Math.max(w.minY, P.minY), S = Math.min(w.maxX, P.maxX), D = Math.min(w.maxY, P.maxY), Math.max(0, S - f) * Math.max(0, D - y)), k = v(K) + v(V);
        F < Y ? (Y = F, m = $, T = k < T ? k : T) : F === Y && k < T && (T = k, m = $);
      }
      return m || _ - h;
    }, n.prototype._chooseSplitAxis = function(o, h, _) {
      var m = o.leaf ? this.compareMinX : d, w = o.leaf ? this.compareMinY : p;
      this._allDistMargin(o, h, _, m) < this._allDistMargin(o, h, _, w) && o.children.sort(m);
    }, n.prototype._allDistMargin = function(o, h, _, m) {
      o.children.sort(m);
      for (var w = this.toBBox, P = u(o, 0, h, w), f = u(o, _ - h, _, w), y = B(P) + B(f), S = h; S < _ - h; S++) {
        var D = o.children[S];
        c(P, o.leaf ? w(D) : D), y += B(P);
      }
      for (var Y = _ - h - 1; Y >= h; Y--) {
        var T = o.children[Y];
        c(f, o.leaf ? w(T) : T), y += B(f);
      }
      return y;
    }, n.prototype._adjustParentBBoxes = function(o, h, _) {
      for (var m = _; m >= 0; m--)
        c(h[m], o);
    }, n.prototype._condense = function(o) {
      for (var h = o.length - 1, _ = void 0; h >= 0; h--)
        o[h].children.length === 0 ? h > 0 ? (_ = o[h - 1].children).splice(_.indexOf(o[h]), 1) : this.clear() : l(o[h], this.toBBox);
    }, n;
  });
})(ke);
var Ks = ke.exports, tr = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(at, "__esModule", { value: !0 });
at.rbush = void 0;
const We = tr(Ks), er = (i) => new We.default(i);
at.rbush = er;
class ir extends We.default {
  constructor(t) {
    super(t);
  }
}
at.default = ir;
var Rt = {}, Ne = {};
(function(i) {
  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2020 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */
  Object.defineProperty(i, "__esModule", { value: !0 }), i.RunImmovableBody2 = i.RunImmovableBody1 = i.Run = i.Check = i.BlockCheck = i.Set = void 0;
  let t, e, s, r, n, a, l, u, c, d, p, v, B, O, C, g, M;
  const o = (f, y, S) => {
    t = f, e = y;
    const D = t.velocity.x, Y = e.velocity.x;
    return s = t.pushable, c = t._dx < 0, d = t._dx > 0, p = t._dx === 0, C = Math.abs(t.right - e.x) <= Math.abs(e.right - t.x), l = Y - D * t.bounce.x, r = e.pushable, v = e._dx < 0, B = e._dx > 0, O = e._dx === 0, g = !C, u = D - Y * e.bounce.x, M = Math.abs(S), (0, i.BlockCheck)();
  };
  i.Set = o;
  const h = () => d && C && e.blocked.right ? (t.processX(-M, l, !1, !0), 1) : c && g && e.blocked.left ? (t.processX(M, l, !0), 1) : B && g && t.blocked.right ? (e.processX(-M, u, !1, !0), 2) : v && C && t.blocked.left ? (e.processX(M, u, !0), 2) : 0;
  i.BlockCheck = h;
  const _ = () => {
    const f = t.velocity.x, y = e.velocity.x;
    let S = Math.sqrt(y * y * e.mass / t.mass) * (y > 0 ? 1 : -1), D = Math.sqrt(f * f * t.mass / e.mass) * (f > 0 ? 1 : -1);
    const Y = (S + D) * 0.5;
    return S -= Y, D -= Y, n = Y + S * t.bounce.x, a = Y + D * e.bounce.x, c && g ? (0, i.Run)(0) : v && C ? (0, i.Run)(1) : d && C ? (0, i.Run)(2) : B && g ? (0, i.Run)(3) : !1;
  };
  i.Check = _;
  const m = (f) => {
    if (s && r)
      M *= 0.5, f === 0 || f === 3 ? (t.processX(M, n), e.processX(-M, a)) : (t.processX(-M, n), e.processX(M, a));
    else if (s && !r)
      f === 0 || f === 3 ? t.processX(M, l, !0) : t.processX(-M, l, !1, !0);
    else if (!s && r)
      f === 0 || f === 3 ? e.processX(-M, u, !1, !0) : e.processX(M, u, !0);
    else {
      const y = M * 0.5;
      f === 0 ? O ? (t.processX(M, 0, !0), e.processX(0, null, !1, !0)) : B ? (t.processX(y, 0, !0), e.processX(-y, 0, !1, !0)) : (t.processX(y, e.velocity.x, !0), e.processX(-y, null, !1, !0)) : f === 1 ? p ? (t.processX(0, null, !1, !0), e.processX(M, 0, !0)) : d ? (t.processX(-y, 0, !1, !0), e.processX(y, 0, !0)) : (t.processX(-y, null, !1, !0), e.processX(y, t.velocity.x, !0)) : f === 2 ? O ? (t.processX(-M, 0, !1, !0), e.processX(0, null, !0)) : v ? (t.processX(-y, 0, !1, !0), e.processX(y, 0, !0)) : (t.processX(-y, e.velocity.x, !1, !0), e.processX(y, null, !0)) : f === 3 && (p ? (t.processX(0, null, !0), e.processX(-M, 0, !1, !0)) : c ? (t.processX(y, 0, !0), e.processX(-y, 0, !1, !0)) : (t.processX(y, e.velocity.y, !0), e.processX(-y, null, !1, !0)));
    }
    return !0;
  };
  i.Run = m;
  const w = (f) => {
    f === 1 ? e.velocity.x = 0 : C ? e.processX(M, u, !0) : e.processX(-M, u, !1, !0), t.moves && (e.y += (t.y - t.prev.y) * t.friction.y, e._dy = e.y - e.prev.y);
  };
  i.RunImmovableBody1 = w;
  const P = (f) => {
    f === 2 ? t.velocity.x = 0 : g ? t.processX(M, l, !0) : t.processX(-M, l, !1, !0), e.moves && (t.y += (e.y - e.prev.y) * e.friction.y, t._dy = t.y - t.prev.y);
  };
  i.RunImmovableBody2 = P;
})(Ne);
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var sr = x && x.__createBinding || (Object.create ? function(i, t, e, s) {
  s === void 0 && (s = e);
  var r = Object.getOwnPropertyDescriptor(t, e);
  (!r || ("get" in r ? !t.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return t[e];
  } }), Object.defineProperty(i, s, r);
} : function(i, t, e, s) {
  s === void 0 && (s = e), i[s] = t[e];
}), rr = x && x.__setModuleDefault || (Object.create ? function(i, t) {
  Object.defineProperty(i, "default", { enumerable: !0, value: t });
} : function(i, t) {
  i.default = t;
}), nr = x && x.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var t = {};
  if (i != null)
    for (var e in i)
      e !== "default" && Object.prototype.hasOwnProperty.call(i, e) && sr(t, i, e);
  return rr(t, i), t;
};
Object.defineProperty(Rt, "__esModule", { value: !0 });
Rt.SeparateX = void 0;
const or = ht, _t = nr(Ne), hr = (i, t, e, s) => {
  const r = (0, or.GetOverlapX)(i, t, e, s), n = i.immovable, a = t.immovable;
  if (e || r === 0 || n && a || i.customSeparateX || t.customSeparateX)
    return r !== 0 || i.embedded && t.embedded;
  const l = _t.Set(i, t, r);
  return !n && !a ? l > 0 ? !0 : _t.Check() : (n ? _t.RunImmovableBody1(l) : a && _t.RunImmovableBody2(l), !0);
};
Rt.SeparateX = hr;
var bt = {}, Ue = {};
(function(i) {
  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2020 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */
  Object.defineProperty(i, "__esModule", { value: !0 }), i.RunImmovableBody2 = i.RunImmovableBody1 = i.Run = i.Check = i.BlockCheck = i.Set = void 0;
  let t, e, s, r, n, a, l, u, c, d, p, v, B, O, C, g, M;
  const o = (f, y, S) => {
    t = f, e = y;
    const D = t.velocity.y, Y = e.velocity.y;
    return s = t.pushable, c = t._dy < 0, d = t._dy > 0, p = t._dy === 0, C = Math.abs(t.bottom - e.y) <= Math.abs(e.bottom - t.y), l = Y - D * t.bounce.y, r = e.pushable, v = e._dy < 0, B = e._dy > 0, O = e._dy === 0, g = !C, u = D - Y * e.bounce.y, M = Math.abs(S), (0, i.BlockCheck)();
  };
  i.Set = o;
  const h = () => d && C && e.blocked.down ? (t.processY(-M, l, !1, !0), 1) : c && g && e.blocked.up ? (t.processY(M, l, !0), 1) : B && g && t.blocked.down ? (e.processY(-M, u, !1, !0), 2) : v && C && t.blocked.up ? (e.processY(M, u, !0), 2) : 0;
  i.BlockCheck = h;
  const _ = () => {
    const f = t.velocity.y, y = e.velocity.y;
    let S = Math.sqrt(y * y * e.mass / t.mass) * (y > 0 ? 1 : -1), D = Math.sqrt(f * f * t.mass / e.mass) * (f > 0 ? 1 : -1);
    const Y = (S + D) * 0.5;
    return S -= Y, D -= Y, n = Y + S * t.bounce.y, a = Y + D * e.bounce.y, c && g ? (0, i.Run)(0) : v && C ? (0, i.Run)(1) : d && C ? (0, i.Run)(2) : B && g ? (0, i.Run)(3) : !1;
  };
  i.Check = _;
  const m = (f) => {
    if (s && r)
      M *= 0.5, f === 0 || f === 3 ? (t.processY(M, n), e.processY(-M, a)) : (t.processY(-M, n), e.processY(M, a));
    else if (s && !r)
      f === 0 || f === 3 ? t.processY(M, l, !0) : t.processY(-M, l, !1, !0);
    else if (!s && r)
      f === 0 || f === 3 ? e.processY(-M, u, !1, !0) : e.processY(M, u, !0);
    else {
      const y = M * 0.5;
      f === 0 ? O ? (t.processY(M, 0, !0), e.processY(0, null, !1, !0)) : B ? (t.processY(y, 0, !0), e.processY(-y, 0, !1, !0)) : (t.processY(y, e.velocity.y, !0), e.processY(-y, null, !1, !0)) : f === 1 ? p ? (t.processY(0, null, !1, !0), e.processY(M, 0, !0)) : d ? (t.processY(-y, 0, !1, !0), e.processY(y, 0, !0)) : (t.processY(-y, null, !1, !0), e.processY(y, t.velocity.y, !0)) : f === 2 ? O ? (t.processY(-M, 0, !1, !0), e.processY(0, null, !0)) : v ? (t.processY(-y, 0, !1, !0), e.processY(y, 0, !0)) : (t.processY(-y, e.velocity.y, !1, !0), e.processY(y, null, !0)) : f === 3 && (p ? (t.processY(0, null, !0), e.processY(-M, 0, !1, !0)) : c ? (t.processY(y, 0, !0), e.processY(-y, 0, !1, !0)) : (t.processY(y, e.velocity.y, !0), e.processY(-y, null, !1, !0)));
    }
    return !0;
  };
  i.Run = m;
  const w = (f) => {
    f === 1 ? e.velocity.y = 0 : C ? e.processY(M, u, !0) : e.processY(-M, u, !1, !0), t.moves && (e.x += (t.x - t.prev.x) * t.friction.x, e._dx = e.x - e.prev.x);
  };
  i.RunImmovableBody1 = w;
  const P = (f) => {
    f === 2 ? t.velocity.y = 0 : g ? t.processY(M, l, !0) : t.processY(-M, l, !1, !0), e.moves && (t.x += (e.x - e.prev.x) * e.friction.x, t._dx = t.x - t.prev.x);
  };
  i.RunImmovableBody2 = P;
})(Ue);
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var lr = x && x.__createBinding || (Object.create ? function(i, t, e, s) {
  s === void 0 && (s = e);
  var r = Object.getOwnPropertyDescriptor(t, e);
  (!r || ("get" in r ? !t.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return t[e];
  } }), Object.defineProperty(i, s, r);
} : function(i, t, e, s) {
  s === void 0 && (s = e), i[s] = t[e];
}), ar = x && x.__setModuleDefault || (Object.create ? function(i, t) {
  Object.defineProperty(i, "default", { enumerable: !0, value: t });
} : function(i, t) {
  i.default = t;
}), ur = x && x.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var t = {};
  if (i != null)
    for (var e in i)
      e !== "default" && Object.prototype.hasOwnProperty.call(i, e) && lr(t, i, e);
  return ar(t, i), t;
};
Object.defineProperty(bt, "__esModule", { value: !0 });
bt.SeparateY = void 0;
const cr = lt, yt = ur(Ue), fr = (i, t, e, s) => {
  const r = (0, cr.GetOverlapY)(i, t, e, s), n = i.immovable, a = t.immovable;
  if (e || r === 0 || n && a || i.customSeparateY || t.customSeparateY)
    return r !== 0 || i.embedded && t.embedded;
  const l = yt.Set(i, t, r);
  return !n && !a ? l > 0 ? !0 : yt.Check() : (n ? yt.RunImmovableBody1(l) : a && yt.RunImmovableBody2(l), !0);
};
bt.SeparateY = fr;
var _e = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(_e, "__esModule", { value: !0 });
const dr = (i, t, e) => {
  const s = e - t;
  return t + ((i - t) % s + s) % s;
};
_e.default = dr;
var Gt = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(Gt, "__esModule", { value: !0 });
var pr = Gt.Collider = void 0;
class _r {
  /**
   * An Arcade Physics Collider will automatically check for collision, or overlaps, between two objects
   * every step. If a collision, or overlap, occurs it will invoke the given callbacks.
   *
   * @param world The world in which the bodies will collide.
   * @param overlapOnly Whether to check for collisions or overlaps.
   * @param body1 The first object to check for collision.
   * @param body2 The second object to check for collision.
   * @param collideCallback The callback to invoke when the two objects collide.
   * @param processCallback If a processCallback exists it must return true or collision checking will be skipped.
   * @param callbackContext The context the collideCallback and processCallback will run in.
   */
  constructor(t, e, s, r, n, a, l) {
    this.world = t, this.overlapOnly = e, this.body1 = s, this.body2 = r, this.collideCallback = n, this.processCallback = a, this.callbackContext = l, this.name = "", this.active = !0;
  }
  /**
   * A name for the Collider.
   *
   * Phaser does not use this value, it's for your own reference.
   */
  setName(t) {
    return this.name = t, this;
  }
  /** Called by World as part of its step processing, initial operation of collision checking. */
  update() {
    this.world.collideObjects(this.body1, this.body2, this.collideCallback, this.processCallback, this.callbackContext, this.overlapOnly);
  }
  /** Removes Collider from World and disposes of its resources. */
  destroy() {
    this.world.removeCollider(this), this.active = !1, this.world = null, this.body1 = null, this.body2 = null, this.collideCallback = null, this.processCallback = null, this.callbackContext = null;
  }
}
pr = Gt.Collider = _r;
var Lt = {}, ye = {};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(ye, "__esModule", { value: !0 });
ye.default = {
  PROCESS_QUEUE_ADD: "add",
  PROCESS_QUEUE_REMOVE: "remove"
};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var He = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(Lt, "__esModule", { value: !0 });
Lt.ProcessQueue = void 0;
const yr = He(Fe), Me = He(ye);
class gr extends yr.default {
  constructor() {
    super(), this._pending = [], this._active = [], this._destroy = [], this._toProcess = 0, this.checkQueue = !1;
  }
  /**
   * Adds a new item to the Process Queue.
   *
   * The item is added to the pending list and made active in the next update.
   *
   * @method Phaser.Structs.ProcessQueue#add
   * @since 3.0.0
   *
   * @genericUse {T} - [item]
   * @genericUse {Phaser.Structs.ProcessQueue.<T>} - [$return]
   *
   * @param {*} item - The item to add to the queue.
   *
   * @return {*} The item that was added.
   */
  add(t) {
    return this._pending.push(t), this._toProcess++, t;
  }
  /**
   * Removes an item from the Process Queue.
   *
   * The item is added to the pending destroy and fully removed in the next update.
   *
   * @method Phaser.Structs.ProcessQueue#remove
   * @since 3.0.0
   *
   * @genericUse {T} - [item]
   * @genericUse {Phaser.Structs.ProcessQueue.<T>} - [$return]
   *
   * @param {*} item - The item to be removed from the queue.
   *
   * @return {*} The item that was removed.
   */
  remove(t) {
    return this._destroy.push(t), this._toProcess++, t;
  }
  /**
   * Removes all active items from this Process Queue.
   *
   * All the items are marked as 'pending destroy' and fully removed in the next update.
   *
   * @method Phaser.Structs.ProcessQueue#removeAll
   * @since 3.20.0
   *
   * @return {this} This Process Queue object.
   */
  removeAll() {
    for (var t = this._active, e = this._destroy, s = t.length; s--; )
      e.push(t[s]), this._toProcess++;
    return this;
  }
  /**
   * Update this queue. First it will process any items awaiting destruction, and remove them.
   *
   * Then it will check to see if there are any items pending insertion, and move them to an
   * active state. Finally, it will return a list of active items for further processing.
   *
   * @method Phaser.Structs.ProcessQueue#update
   * @since 3.0.0
   *
   * @genericUse {T[]} - [$return]
   *
   * @return {Array.<*>} A list of active items.
   */
  update() {
    if (this._toProcess === 0)
      return this._active;
    var t = this._destroy, e = this._active, s, r;
    for (s = 0; s < t.length; s++) {
      r = t[s];
      var n = e.indexOf(r);
      n !== -1 && (e.splice(n, 1), this.emit(Me.default.PROCESS_QUEUE_REMOVE, r));
    }
    for (t.length = 0, t = this._pending, s = 0; s < t.length; s++)
      r = t[s], (!this.checkQueue || this.checkQueue && e.indexOf(r) === -1) && (e.push(r), this.emit(Me.default.PROCESS_QUEUE_ADD, r));
    return t.length = 0, this._toProcess = 0, e;
  }
  /**
   * Returns the current list of active items.
   *
   * This method returns a reference to the active list array, not a copy of it.
   * Therefore, be careful to not modify this array outside of the ProcessQueue.
   *
   * @method Phaser.Structs.ProcessQueue#getActive
   * @since 3.0.0
   *
   * @genericUse {T[]} - [$return]
   *
   * @return {Array.<*>} A list of active items.
   */
  getActive() {
    return this._active;
  }
  /**
   * The number of entries in the active list.
   *
   * @name Phaser.Structs.ProcessQueue#length
   * @type {number}
   * @readonly
   * @since 3.20.0
   */
  get length() {
    return this._active.length;
  }
  /**
   * Immediately destroys this process queue, clearing all of its internal arrays and resetting the process totals.
   *
   * @method Phaser.Structs.ProcessQueue#destroy
   * @since 3.0.0
   */
  destroy() {
    this._toProcess = 0, this._pending = [], this._active = [], this._destroy = [];
  }
}
Lt.ProcessQueue = gr;
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var I = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(Xt, "__esModule", { value: !0 });
Xt.World = void 0;
const vr = I(ce), et = I($t), U = I(it), mr = I(Fe), G = I(Pt), Be = I(Ct), jt = I(fe), Vt = I(de), xr = ht, wr = lt, E = I(pe), Ce = I(at), Pr = st, Ft = Rt, kt = bt, Oe = I(_e), H = I(L), De = I(z), Se = Gt, Mr = Lt, Br = j;
class Cr extends mr.default {
  /**
   *  The Arcade Physics World.
   *
   * The World is responsible for creating, managing, colliding and updating all of the bodies within it.
   *
   * An instance of the World belongs to a Phaser.Scene and is accessed via the property `physics.world`.
   *
   * @param scene The Scene this simulation belongs to.
   * @param config An Arcade Physics Configuration object.
   */
  constructor(t, e) {
    super(), this.scene = t, this.config = e, this.bodies = /* @__PURE__ */ new Set(), this.staticBodies = /* @__PURE__ */ new Set(), this.pendingDestroy = /* @__PURE__ */ new Set(), this._elapsed = 0, this.colliders = new Mr.ProcessQueue(), this.gravity = new Br.Vector2((0, E.default)(e, "gravity.x", 0), (0, E.default)(e, "gravity.y", 0)), this.bounds = new Pr.Rectangle((0, E.default)(e, "x", 0), (0, E.default)(e, "y", 0), (0, E.default)(e, "width", t.sys.scale.width), (0, E.default)(e, "height", t.sys.scale.height)), this.checkCollision = {
      up: (0, E.default)(e, "checkCollision.up", !0),
      down: (0, E.default)(e, "checkCollision.down", !0),
      left: (0, E.default)(e, "checkCollision.left", !0),
      right: (0, E.default)(e, "checkCollision.right", !0)
    }, this.fps = (0, E.default)(e, "fps", 60), this.fixedStep = (0, E.default)(e, "fixedStep", !0), this._frameTime = 1 / this.fps, this._frameTimeMS = 1e3 * this._frameTime, this.stepsLastFrame = 0, this.timeScale = (0, E.default)(e, "timeScale", 1), this.OVERLAP_BIAS = (0, E.default)(e, "overlapBias", 4), this.TILE_BIAS = (0, E.default)(e, "tileBias", 16), this.forceX = (0, E.default)(e, "forceX", !1), this.isPaused = (0, E.default)(e, "isPaused", !1), this._total = 0, this.drawDebug = (0, E.default)(e, "debug", !1), this.debugGraphic, this.defaults = {
      debugShowBody: (0, E.default)(e, "debugShowBody", !0),
      debugShowStaticBody: (0, E.default)(e, "debugShowStaticBody", !0),
      debugShowVelocity: (0, E.default)(e, "debugShowVelocity", !0),
      bodyDebugColor: (0, E.default)(e, "debugBodyColor", 16711935),
      staticBodyDebugColor: (0, E.default)(e, "debugStaticBodyColor", 255),
      velocityDebugColor: (0, E.default)(e, "debugVelocityColor", 65280)
    }, this.maxEntries = (0, E.default)(e, "maxEntries", 16), this.useTree = (0, E.default)(e, "useTree", !0), this.tree = new Ce.default(this.maxEntries), this.staticTree = new Ce.default(this.maxEntries), this.treeMinMax = { minX: 0, minY: 0, maxX: 0, maxY: 0 }, this.drawDebug && this.createDebugGraphic();
  }
  // /**
  //  * Adds an Arcade Physics Body to a Game Object, an array of Game Objects, or the children of a Group.
  //  *
  //  * The difference between this and the `enableBody` method is that you can pass arrays or Groups
  //  * to this method.
  //  *
  //  * You can specify if the bodies are to be Dynamic or Static. A dynamic body can move via velocity and
  //  * acceleration. A static body remains fixed in place and as such is able to use an optimized search
  //  * tree, making it ideal for static elements such as level objects. You can still collide and overlap
  //  * with static bodies.
  //  *
  //  * Normally, rather than calling this method directly, you'd use the helper methods available in the
  //  * Arcade Physics Factory, such as:
  //  *
  //  * ```javascript
  //  * this.physics.add.image(x, y, textureKey);
  //  * this.physics.add.sprite(x, y, textureKey);
  //  * ```
  //  *
  //  * Calling factory methods encapsulates the creation of a Game Object and the creation of its
  //  * body at the same time. If you are creating custom classes then you can pass them to this
  //  * method to have their bodies created.
  //  *
  //  * @method Phaser.Physics.Arcade.World#enable
  //  * @since 3.0.0
  //  *
  //  * @param {(Phaser.GameObjects.GameObject|Phaser.GameObjects.GameObject[]|Phaser.GameObjects.Group|Phaser.GameObjects.Group[])} object - The object, or objects, on which to create the bodies.
  //  * @param {number} [bodyType] - The type of Body to create. Either `DYNAMIC_BODY` or `STATIC_BODY`.
  //  */
  // enable(object, bodyType) {
  //   if (bodyType === undefined) {
  //     bodyType = CONST.DYNAMIC_BODY
  //   }
  //   if (!Array.isArray(object)) {
  //     object = [object]
  //   }
  //   for (let i = 0; i < object.length; i++) {
  //     let entry = object[i]
  //     if (entry.isParent) {
  //       let children = entry.getChildren()
  //       for (let c = 0; c < children.length; c++) {
  //         let child = children[c]
  //         if (child.isParent) {
  //           //  Handle Groups nested inside of Groups
  //           this.enable(child, bodyType)
  //         } else {
  //           this.enableBody(child, bodyType)
  //         }
  //       }
  //     } else {
  //       this.enableBody(entry, bodyType)
  //     }
  //   }
  // }
  // /**
  //  * Creates an Arcade Physics Body on a single Game Object.
  //  *
  //  * If the Game Object already has a body, this method will simply add it back into the simulation.
  //  *
  //  * You can specify if the body is Dynamic or Static. A dynamic body can move via velocity and
  //  * acceleration. A static body remains fixed in place and as such is able to use an optimized search
  //  * tree, making it ideal for static elements such as level objects. You can still collide and overlap
  //  * with static bodies.
  //  *
  //  * Normally, rather than calling this method directly, you'd use the helper methods available in the
  //  * Arcade Physics Factory, such as:
  //  *
  //  * ```javascript
  //  * this.physics.add.image(x, y, textureKey);
  //  * this.physics.add.sprite(x, y, textureKey);
  //  * ```
  //  *
  //  * Calling factory methods encapsulates the creation of a Game Object and the creation of its
  //  * body at the same time. If you are creating custom classes then you can pass them to this
  //  * method to have their bodies created.
  //  *
  //  * @method Phaser.Physics.Arcade.World#enableBody
  //  * @since 3.0.0
  //  *
  //  * @param {Phaser.GameObjects.GameObject} object - The Game Object on which to create the body.
  //  * @param {number} [bodyType] - The type of Body to create. Either `DYNAMIC_BODY` or `STATIC_BODY`.
  //  *
  //  * @return {Phaser.GameObjects.GameObject} The Game Object on which the body was created.
  //  */
  // enableBody(object, bodyType) {
  //   if (bodyType === undefined) {
  //     bodyType = CONST.DYNAMIC_BODY
  //   }
  //   if (!object.body) {
  //     if (bodyType === CONST.DYNAMIC_BODY) {
  //       object.body = new Body(this, object)
  //     } else if (bodyType === CONST.STATIC_BODY) {
  //       object.body = new StaticBody(this, object)
  //     }
  //   }
  //   this.add(object.body)
  //   return object
  // }
  /**
   * Adds an existing Arcade Physics Body or StaticBody to the simulation.
   *
   * The body is enabled and added to the local search trees.
   *
   * @method Phaser.Physics.Arcade.World#add
   * @since 3.10.0
   *
   * @param {(Phaser.Physics.Arcade.Body|Phaser.Physics.Arcade.StaticBody)} body - The Body to be added to the simulation.
   *
   * @return {(Phaser.Physics.Arcade.Body|Phaser.Physics.Arcade.StaticBody)} The Body that was added to the simulation.
   */
  add(t) {
    return t.physicsType === H.default.PHYSICS_TYPE.DYNAMIC_BODY ? (this.bodies.add(t), this.tree.insert(t)) : t.physicsType === H.default.PHYSICS_TYPE.STATIC_BODY && (this.staticBodies.add(t), this.staticTree.insert(t)), t.enable = !0, t;
  }
  /**
   * Disables the Arcade Physics Body of a Game Object, an array of Game Objects, or the children of a Group.
   *
   * The difference between this and the `disableBody` method is that you can pass arrays or Groups
   * to this method.
   *
   * The body itself is not deleted, it just has its `enable` property set to false, which
   * means you can re-enable it again at any point by passing it to enable `World.enable` or `World.add`.
   *
   * @method Phaser.Physics.Arcade.World#disable
   * @since 3.0.0
   *
   * @param {(Phaser.GameObjects.GameObject|Phaser.GameObjects.GameObject[]|Phaser.GameObjects.Group|Phaser.GameObjects.Group[])} object - The object, or objects, on which to disable the bodies.
   */
  disable(t) {
    Array.isArray(t) || (t = [t]);
    for (let e = 0; e < t.length; e++) {
      const s = t[e];
      if (s.isParent) {
        const r = s.getChildren();
        for (let n = 0; n < r.length; n++) {
          const a = r[n];
          a.isParent ? this.disable(a) : this.disableBody(a.body);
        }
      } else
        this.disableBody(s.body);
    }
  }
  /**
   * Disables an existing Arcade Physics Body or StaticBody and removes it from the simulation.
   *
   * The body is disabled and removed from the local search trees.
   *
   * The body itself is not deleted, it just has its `enable` property set to false, which
   * means you can re-enable it again at any point by passing it to enable `World.enable` or `World.add`.
   *
   * @method Phaser.Physics.Arcade.World#disableBody
   * @since 3.0.0
   *
   * @param {(Phaser.Physics.Arcade.Body|Phaser.Physics.Arcade.StaticBody)} body - The Body to be disabled.
   */
  disableBody(t) {
    this.remove(t), t.enable = !1;
  }
  /**
   * Removes an existing Arcade Physics Body or StaticBody from the simulation.
   *
   * The body is disabled and removed from the local search trees.
   *
   * The body itself is not deleted, it just has its `enabled` property set to false, which
   * means you can re-enable it again at any point by passing it to enable `enable` or `add`.
   *
   * @method Phaser.Physics.Arcade.World#remove
   * @since 3.0.0
   *
   * @param {(Phaser.Physics.Arcade.Body|Phaser.Physics.Arcade.StaticBody)} body - The body to be removed from the simulation.
   */
  remove(t) {
    t.physicsType === H.default.PHYSICS_TYPE.DYNAMIC_BODY ? (this.bodies.delete(t), this.tree.remove(t)) : t.physicsType === H.default.PHYSICS_TYPE.STATIC_BODY && (this.staticBodies.delete(t), this.staticTree.remove(t));
  }
  /**
   * Creates a Graphics Game Object that the world will use to render the debug display to.
   *
   * This is called automatically when the World is instantiated if the `debug` config property
   * was set to `true`. However, you can call it at any point should you need to display the
   * debug Graphic from a fixed point.
   *
   * You can control which objects are drawn to the Graphics object, and the colors they use,
   * by setting the debug properties in the physics config.
   *
   * You should not typically use this in a production game. Use it to aid during debugging.
   *
   * @method Phaser.Physics.Arcade.World#createDebugGraphic
   * @since 3.0.0
   *
   * @return {Phaser.GameObjects.Graphics} The Graphics object that was created for use by the World.
   */
  createDebugGraphic() {
  }
  /**
   * Sets the position, size and properties of the World boundary.
   *
   * The World boundary is an invisible rectangle that defines the edges of the World.
   * If a Body is set to collide with the world bounds then it will automatically stop
   * when it reaches any of the edges. You can optionally set which edges of the boundary
   * should be checked against.
   *
   * @method Phaser.Physics.Arcade.World#setBounds
   * @since 3.0.0
   *
   * @param {number} x - The top-left x coordinate of the boundary.
   * @param {number} y - The top-left y coordinate of the boundary.
   * @param {number} width - The width of the boundary.
   * @param {number} height - The height of the boundary.
   * @param {boolean} [checkLeft] - Should bodies check against the left edge of the boundary?
   * @param {boolean} [checkRight] - Should bodies check against the right edge of the boundary?
   * @param {boolean} [checkUp] - Should bodies check against the top edge of the boundary?
   * @param {boolean} [checkDown] - Should bodies check against the bottom edge of the boundary?
   *
   * @return {Phaser.Physics.Arcade.World} This World object.
   */
  setBounds(t, e, s, r, n, a, l, u) {
    return this.bounds.setTo(t, e, s, r), n !== void 0 && this.setBoundsCollision(n, a, l, u), this;
  }
  /**
   * Enables or disables collisions on each edge of the World boundary.
   *
   * @method Phaser.Physics.Arcade.World#setBoundsCollision
   * @since 3.0.0
   *
   * @param {boolean} [left=true] - Should bodies check against the left edge of the boundary?
   * @param {boolean} [right=true] - Should bodies check against the right edge of the boundary?
   * @param {boolean} [up=true] - Should bodies check against the top edge of the boundary?
   * @param {boolean} [down=true] - Should bodies check against the bottom edge of the boundary?
   *
   * @return {Phaser.Physics.Arcade.World} This World object.
   */
  setBoundsCollision(t, e, s, r) {
    return t === void 0 && (t = !0), e === void 0 && (e = !0), s === void 0 && (s = !0), r === void 0 && (r = !0), this.checkCollision.left = t, this.checkCollision.right = e, this.checkCollision.up = s, this.checkCollision.down = r, this;
  }
  /**
   * Pauses the simulation.
   *
   * A paused simulation does not update any existing bodies, or run any Colliders.
   *
   * However, you can still enable and disable bodies within it, or manually run collide or overlap
   * checks.
   *
   * @method Phaser.Physics.Arcade.World#pause
   * @fires Phaser.Physics.Arcade.Events#PAUSE
   * @since 3.0.0
   *
   * @return {Phaser.Physics.Arcade.World} This World object.
   */
  pause() {
    return this.isPaused = !0, this.emit(G.default.PAUSE), this;
  }
  /**
   * Resumes the simulation, if paused.
   *
   * @method Phaser.Physics.Arcade.World#resume
   * @fires Phaser.Physics.Arcade.Events#RESUME
   * @since 3.0.0
   *
   * @return {Phaser.Physics.Arcade.World} This World object.
   */
  resume() {
    return this.isPaused = !1, this.emit(G.default.RESUME), this;
  }
  /**
   * Creates a new Collider object and adds it to the simulation.
   *
   * A Collider is a way to automatically perform collision checks between two objects,
   * calling the collide and process callbacks if they occur.
   *
   * Colliders are run as part of the World update, after all of the Bodies have updated.
   *
   * By creating a Collider you don't need then call `World.collide` in your `update` loop,
   * as it will be handled for you automatically.
   *
   * @method Phaser.Physics.Arcade.World#addCollider
   * @since 3.0.0
   * @see Phaser.Physics.Arcade.World#collide
   *
   * @param {Phaser.Types.Physics.Arcade.ArcadeColliderType} body1 - The first object to check for collision.
   * @param {Phaser.Types.Physics.Arcade.ArcadeColliderType} body2 - The second object to check for collision.
   * @param {ArcadePhysicsCallback} [collideCallback] - The callback to invoke when the two objects collide.
   * @param {ArcadePhysicsCallback} [processCallback] - The callback to invoke when the two objects collide. Must return a boolean.
   * @param {*} [callbackContext] - The scope in which to call the callbacks.
   *
   * @return {Phaser.Physics.Arcade.Collider} The Collider that was created.
   */
  addCollider(t, e, s, r, n) {
    s === void 0 && (s = null), r === void 0 && (r = null), n === void 0 && (n = s);
    const a = new Se.Collider(this, !1, t, e, s, r, n);
    return this.colliders.add(a), a;
  }
  /**
   * Creates a new Overlap Collider object and adds it to the simulation.
   *
   * A Collider is a way to automatically perform overlap checks between two objects,
   * calling the collide and process callbacks if they occur.
   *
   * Colliders are run as part of the World update, after all of the Bodies have updated.
   *
   * By creating a Collider you don't need then call `World.overlap` in your `update` loop,
   * as it will be handled for you automatically.
   *
   * @method Phaser.Physics.Arcade.World#addOverlap
   * @since 3.0.0
   *
   * @param {Phaser.Types.Physics.Arcade.ArcadeColliderType} body1 - The first object to check for overlap.
   * @param {Phaser.Types.Physics.Arcade.ArcadeColliderType} body2 - The second object to check for overlap.
   * @param {ArcadePhysicsCallback} [collideCallback] - The callback to invoke when the two objects overlap.
   * @param {ArcadePhysicsCallback} [processCallback] - The callback to invoke when the two objects overlap. Must return a boolean.
   * @param {*} [callbackContext] - The scope in which to call the callbacks.
   *
   * @return {Phaser.Physics.Arcade.Collider} The Collider that was created.
   */
  addOverlap(t, e, s, r, n) {
    s === void 0 && (s = null), r === void 0 && (r = null), n === void 0 && (n = s);
    const a = new Se.Collider(this, !0, t, e, s, r, n);
    return this.colliders.add(a), a;
  }
  /**
   * Removes a Collider from the simulation so it is no longer processed.
   *
   * This method does not destroy the Collider. If you wish to add it back at a later stage you can call
   * `World.colliders.add(Collider)`.
   *
   * If you no longer need the Collider you can call the `Collider.destroy` method instead, which will
   * automatically clear all of its references and then remove it from the World. If you call destroy on
   * a Collider you _don't_ need to pass it to this method too.
   *
   * @method Phaser.Physics.Arcade.World#removeCollider
   * @since 3.0.0
   *
   * @param {Phaser.Physics.Arcade.Collider} collider - The Collider to remove from the simulation.
   *
   * @return {Phaser.Physics.Arcade.World} This World object.
   */
  removeCollider(t) {
    return this.colliders.remove(t), this;
  }
  /**
   * Sets the frame rate to run the simulation at.
   *
   * The frame rate value is used to simulate a fixed update time step. This fixed
   * time step allows for a straightforward implementation of a deterministic game state.
   *
   * This frame rate is independent of the frequency at which the game is rendering. The
   * higher you set the fps, the more physics simulation steps will occur per game step.
   * Conversely, the lower you set it, the less will take place.
   *
   * You can optionally advance the simulation directly yourself by calling the `step` method.
   *
   * @method Phaser.Physics.Arcade.World#setFPS
   * @since 3.10.0
   *
   * @param {number} framerate - The frame rate to advance the simulation at.
   *
   * @return {this} This World object.
   */
  setFPS(t) {
    return this.fps = t, this._frameTime = 1 / this.fps, this._frameTimeMS = 1e3 * this._frameTime, this;
  }
  /**
   * Advances the simulation based on the elapsed time and fps rate.
   *
   * This is called automatically by your Scene and does not need to be invoked directly.
   *
   * @method Phaser.Physics.Arcade.World#update
   * @fires Phaser.Physics.Arcade.Events#WORLD_STEP
   * @since 3.0.0
   *
   * @param {number} time - The current timestamp as generated by the Request Animation Frame or SetTimeout.
   * @param {number} delta - The delta time, in ms, elapsed since the last frame.
   */
  update(t, e) {
    if (this.isPaused || this.bodies.size === 0)
      return;
    let s, r = this._frameTime;
    const n = this._frameTimeMS * this.timeScale;
    this._elapsed += e;
    const a = this.bodies;
    let l = this._elapsed >= n;
    this.fixedStep || (r = e * 1e-3, l = !0, this._elapsed = 0);
    for (const u of a)
      u.enable && u.preUpdate(l, r);
    if (l) {
      this._elapsed -= n, this.stepsLastFrame = 1, this.useTree && (this.tree.clear(), this.tree.load(Array.from(a)));
      const u = this.colliders.update();
      for (s = 0; s < u.length; s++) {
        const c = u[s];
        c.active && c.update();
      }
      this.emit(G.default.WORLD_STEP, r);
    }
    for (; this._elapsed >= n; )
      this._elapsed -= n, this.step(r);
  }
  /**
   * Advances the simulation by a time increment.
   *
   * @method Phaser.Physics.Arcade.World#step
   * @fires Phaser.Physics.Arcade.Events#WORLD_STEP
   * @since 3.10.0
   *
   * @param {number} delta - The delta time amount, in seconds, by which to advance the simulation.
   */
  step(t) {
    let e;
    const s = this.bodies;
    s.size;
    for (const n of s)
      n.enable && n.update(t);
    this.useTree && (this.tree.clear(), this.tree.load(Array.from(s)));
    const r = this.colliders.update();
    for (e = 0; e < r.length; e++) {
      const n = r[e];
      n.active && n.update();
    }
    this.emit(G.default.WORLD_STEP, t), this.stepsLastFrame++;
  }
  /**
   * Updates bodies, draws the debug display, and handles pending queue operations.
   *
   * @method Phaser.Physics.Arcade.World#postUpdate
   * @since 3.0.0
   */
  postUpdate() {
    let t = this.bodies;
    const e = this.bodies, s = this.staticBodies;
    if (this.stepsLastFrame) {
      this.stepsLastFrame = 0;
      for (const n of t)
        n.enable && n.postUpdate();
    }
    if (this.drawDebug) {
      const n = this.debugGraphic;
      n.clear();
      for (const a of t)
        a.willDrawDebug() && a.drawDebug(n);
      t = s, t.size;
      for (const a of t)
        a.willDrawDebug() && a.drawDebug(n);
    }
    const r = this.pendingDestroy;
    if (r.size > 0) {
      const n = this.tree, a = this.staticTree;
      t = r, t.size;
      for (const l of t)
        l.physicsType === H.default.PHYSICS_TYPE.DYNAMIC_BODY ? (n.remove(l), e.delete(l)) : l.physicsType === H.default.PHYSICS_TYPE.STATIC_BODY && (a.remove(l), s.delete(l)), l.world = void 0, l.gameObject = void 0;
      r.clear();
    }
  }
  /**
   * Calculates a Body's velocity and updates its position.
   *
   * @method Phaser.Physics.Arcade.World#updateMotion
   * @since 3.0.0
   *
   * @param {Phaser.Physics.Arcade.Body} body - The Body to be updated.
   * @param {number} delta - The delta value to be used in the motion calculations, in seconds.
   */
  updateMotion(t, e) {
    t.allowRotation && this.computeAngularVelocity(t, e), this.computeVelocity(t, e);
  }
  /**
   * Calculates a Body's angular velocity.
   *
   * @method Phaser.Physics.Arcade.World#computeAngularVelocity
   * @since 3.10.0
   *
   * @param {Phaser.Physics.Arcade.Body} body - The Body to compute the velocity for.
   * @param {number} delta - The delta value to be used in the calculation, in seconds.
   */
  computeAngularVelocity(t, e) {
    let s = t.angularVelocity;
    const r = t.angularAcceleration;
    let n = t.angularDrag;
    const a = t.maxAngular;
    r ? s += r * e : t.allowDrag && n && (n *= e, (0, jt.default)(s - n, 0, 0.1) ? s -= n : (0, Vt.default)(s + n, 0, 0.1) ? s += n : s = 0), s = (0, et.default)(s, -a, a);
    const l = s - t.angularVelocity;
    t.angularVelocity += l, t.rotation += t.angularVelocity * e;
  }
  /**
   * Calculates a Body's per-axis velocity.
   *
   * @method Phaser.Physics.Arcade.World#computeVelocity
   * @since 3.0.0
   *
   * @param {Phaser.Physics.Arcade.Body} body - The Body to compute the velocity for.
   * @param {number} delta - The delta value to be used in the calculation, in seconds.
   */
  computeVelocity(t, e) {
    let s = t.velocity.x;
    const r = t.acceleration.x;
    let n = t.drag.x;
    const a = t.maxVelocity.x;
    let l = t.velocity.y;
    const u = t.acceleration.y;
    let c = t.drag.y;
    const d = t.maxVelocity.y;
    let p = t.speed;
    const v = t.maxSpeed, B = t.allowDrag, O = t.useDamping;
    t.allowGravity && (s += (this.gravity.x + t.gravity.x) * e, l += (this.gravity.y + t.gravity.y) * e), r ? s += r * e : B && n && (O ? (n = Math.pow(n, e), s *= n, p = Math.sqrt(s * s + l * l), (0, Be.default)(p, 0, 1e-3) && (s = 0)) : (n *= e, (0, jt.default)(s - n, 0, 0.01) ? s -= n : (0, Vt.default)(s + n, 0, 0.01) ? s += n : s = 0)), u ? l += u * e : B && c && (O ? (c = Math.pow(c, e), l *= c, p = Math.sqrt(s * s + l * l), (0, Be.default)(p, 0, 1e-3) && (l = 0)) : (c *= e, (0, jt.default)(l - c, 0, 0.01) ? l -= c : (0, Vt.default)(l + c, 0, 0.01) ? l += c : l = 0)), s = (0, et.default)(s, -a, a), l = (0, et.default)(l, -d, d), t.velocity.set(s, l), v > -1 && p > v && (t.velocity.normalize().scale(v), p = v), t.speed = p;
  }
  /**
   * Separates two Bodies.
   *
   * @method Phaser.Physics.Arcade.World#separate
   * @fires Phaser.Physics.Arcade.Events#COLLIDE
   * @fires Phaser.Physics.Arcade.Events#OVERLAP
   * @since 3.0.0
   *
   * @param {Phaser.Physics.Arcade.Body} body1 - The first Body to be separated.
   * @param {Phaser.Physics.Arcade.Body} body2 - The second Body to be separated.
   * @param {ArcadePhysicsCallback} [processCallback] - The process callback.
   * @param {*} [callbackContext] - The context in which to invoke the callback.
   * @param {boolean} [overlapOnly] - If this a collide or overlap check?
   * @param {boolean} [intersects] - Assert that the bodies intersect and should not be tested before separation.
   *
   * @return {boolean} True if separation occurred, otherwise false.
   */
  separate(t, e, s, r, n, a) {
    if (!a && !t.enable || !e.enable || t.checkCollision.none || e.checkCollision.none || !this.intersects(t, e) || s && s.call(r, t, e) === !1)
      return !1;
    if (t.isCircle && e.isCircle)
      return this.separateCircle(t, e, n);
    if (t.isCircle !== e.isCircle) {
      const d = t.isCircle ? e : t, p = t.isCircle ? t : e, v = {
        x: d.x,
        y: d.y,
        right: d.right,
        bottom: d.bottom
      }, B = p.center;
      if ((B.y < v.y || B.y > v.bottom) && (B.x < v.x || B.x > v.right))
        return this.separateCircle(t, e, n);
    }
    let l = !1, u = !1;
    n ? (l = (0, Ft.SeparateX)(t, e, n, this.OVERLAP_BIAS), u = (0, kt.SeparateY)(t, e, n, this.OVERLAP_BIAS)) : this.forceX || Math.abs(this.gravity.y + t.gravity.y) < Math.abs(this.gravity.x + t.gravity.x) ? (l = (0, Ft.SeparateX)(t, e, n, this.OVERLAP_BIAS), this.intersects(t, e) && (u = (0, kt.SeparateY)(t, e, n, this.OVERLAP_BIAS))) : (u = (0, kt.SeparateY)(t, e, n, this.OVERLAP_BIAS), this.intersects(t, e) && (l = (0, Ft.SeparateX)(t, e, n, this.OVERLAP_BIAS)));
    const c = l || u;
    return c && (n ? (t.onOverlap || e.onOverlap) && this.emit(G.default.OVERLAP, t, e) : (t.onCollide || e.onCollide) && this.emit(G.default.COLLIDE, t, e)), c;
  }
  /**
   * Separates two Bodies, when both are circular.
   *
   * @method Phaser.Physics.Arcade.World#separateCircle
   * @fires Phaser.Physics.Arcade.Events#COLLIDE
   * @fires Phaser.Physics.Arcade.Events#OVERLAP
   * @since 3.0.0
   *
   * @param {Phaser.Physics.Arcade.Body} body1 - The first Body to be separated.
   * @param {Phaser.Physics.Arcade.Body} body2 - The second Body to be separated.
   * @param {boolean} [overlapOnly] - If this a collide or overlap check?
   * @param {number} [bias] - A small value added to the calculations.
   *
   * @return {boolean} True if separation occurred, otherwise false.
   */
  separateCircle(t, e, s, r) {
    (0, xr.GetOverlapX)(t, e, !1, r), (0, wr.GetOverlapY)(t, e, !1, r);
    let n = 0;
    if (t.isCircle !== e.isCircle) {
      const C = {
        x: e.isCircle ? t.position.x : e.position.x,
        y: e.isCircle ? t.position.y : e.position.y,
        right: e.isCircle ? t.right : e.right,
        bottom: e.isCircle ? t.bottom : e.bottom
      }, g = {
        x: t.isCircle ? t.center.x : e.center.x,
        y: t.isCircle ? t.center.y : e.center.y,
        radius: t.isCircle ? t.halfWidth : e.halfWidth
      };
      g.y < C.y ? g.x < C.x ? n = (0, U.default)(g.x, g.y, C.x, C.y) - g.radius : g.x > C.right && (n = (0, U.default)(g.x, g.y, C.right, C.y) - g.radius) : g.y > C.bottom && (g.x < C.x ? n = (0, U.default)(g.x, g.y, C.x, C.bottom) - g.radius : g.x > C.right && (n = (0, U.default)(g.x, g.y, C.right, C.bottom) - g.radius)), n *= -1;
    } else
      n = t.halfWidth + e.halfWidth - (0, U.default)(t.center.x, t.center.y, e.center.x, e.center.y);
    if (t.overlapR = n, e.overlapR = n, s || n === 0 || t.immovable && e.immovable || t.customSeparateX || e.customSeparateX)
      return n !== 0 && (t.onOverlap || e.onOverlap) && this.emit(G.default.OVERLAP, t, e), n !== 0;
    const a = t.center.x - e.center.x, l = t.center.y - e.center.y, u = Math.sqrt(Math.pow(a, 2) + Math.pow(l, 2)), c = (e.center.x - t.center.x) / u || 0, d = (e.center.y - t.center.y) / u || 0;
    let p = 2 * (t.velocity.x * c + t.velocity.y * d - e.velocity.x * c - e.velocity.y * d) / (t.mass + e.mass);
    (t.immovable || e.immovable) && (p *= 2), t.immovable || (t.velocity.x = t.velocity.x - p / t.mass * c, t.velocity.y = t.velocity.y - p / t.mass * d), e.immovable || (e.velocity.x = e.velocity.x + p / e.mass * c, e.velocity.y = e.velocity.y + p / e.mass * d), !t.immovable && !e.immovable && (n /= 2);
    const v = (0, vr.default)(t.center, e.center), B = (n + De.default.EPSILON) * Math.cos(v), O = (n + De.default.EPSILON) * Math.sin(v);
    return t.immovable || (t.x -= B, t.y -= O, t.updateCenter()), e.immovable || (e.x += B, e.y += O, e.updateCenter()), t.velocity.x *= t.bounce.x, t.velocity.y *= t.bounce.y, e.velocity.x *= e.bounce.x, e.velocity.y *= e.bounce.y, (t.onCollide || e.onCollide) && this.emit(G.default.COLLIDE, t, e), !0;
  }
  /**
   * Checks to see if two Bodies intersect at all.
   *
   * @method Phaser.Physics.Arcade.World#intersects
   * @since 3.0.0
   *
   * @param {Phaser.Physics.Arcade.Body} body1 - The first body to check.
   * @param {Phaser.Physics.Arcade.Body} body2 - The second body to check.
   *
   * @return {boolean} True if the two bodies intersect, otherwise false.
   */
  intersects(t, e) {
    return t === e ? !1 : !t.isCircle && !e.isCircle ? !(t.right <= e.position.x || t.bottom <= e.position.y || t.position.x >= e.right || t.position.y >= e.bottom) : t.isCircle ? e.isCircle ? (0, U.default)(t.center.x, t.center.y, e.center.x, e.center.y) <= t.halfWidth + e.halfWidth : this.circleBodyIntersects(t, e) : this.circleBodyIntersects(e, t);
  }
  /**
   * Tests if a circular Body intersects with another Body.
   *
   * @method Phaser.Physics.Arcade.World#circleBodyIntersects
   * @since 3.0.0
   *
   * @param {Phaser.Physics.Arcade.Body} circle - The circular body to test.
   * @param {Phaser.Physics.Arcade.Body} body - The rectangular body to test.
   *
   * @return {boolean} True if the two bodies intersect, otherwise false.
   */
  circleBodyIntersects(t, e) {
    const s = (0, et.default)(t.center.x, e.left, e.right), r = (0, et.default)(t.center.y, e.top, e.bottom), n = (t.center.x - s) * (t.center.x - s), a = (t.center.y - r) * (t.center.y - r);
    return n + a <= t.halfWidth * t.halfWidth;
  }
  /**
   * Tests if Game Objects overlap.
   *
   * See details in {@link Phaser.Physics.Arcade.World#collide}.
   *
   * @method Phaser.Physics.Arcade.World#overlap
   * @since 3.0.0
   *
   * @param {Phaser.Types.Physics.Arcade.ArcadeColliderType} body1 - The first object or array of objects to check.
   * @param {Phaser.Types.Physics.Arcade.ArcadeColliderType} [body2] - The second object or array of objects to check, or `undefined`.
   * @param {ArcadePhysicsCallback} [overlapCallback] - An optional callback function that is called if the objects overlap.
   * @param {ArcadePhysicsCallback} [processCallback] - An optional callback function that lets you perform additional checks against the two objects if they overlap. If this is set then `overlapCallback` will only be called if this callback returns `true`.
   * @param {*} [callbackContext] - The context in which to run the callbacks.
   *
   * @return {boolean} True if at least one Game Object overlaps another.
   *
   * @see Phaser.Physics.Arcade.World#collide
   */
  overlap(t, e, s, r, n) {
    return s === void 0 && (s = null), r === void 0 && (r = null), n === void 0 && (n = s), this.collideObjects(t, e, s, r, n, !0);
  }
  /**
   * Performs a collision check and separation between the two physics enabled objects given, which can be single
   * Game Objects, arrays of Game Objects, Physics Groups, arrays of Physics Groups or normal Groups.
   *
   * If you don't require separation then use {@link Phaser.Physics.Arcade.World#overlap} instead.
   *
   * If two Groups or arrays are passed, each member of one will be tested against each member of the other.
   *
   * If **only** one Group is passed (as `body1`), each member of the Group will be collided against the other members.
   *
   * If **only** one Array is passed, the array is iterated and every element in it is tested against the others.
   *
   * Two callbacks can be provided; they receive the colliding game objects as arguments.
   * If an overlap is detected, the `processCallback` is called first. It can cancel the collision by returning false.
   * Next the objects are separated and `collideCallback` is invoked.
   *
   * Arcade Physics uses the Projection Method of collision resolution and separation. While it's fast and suitable
   * for 'arcade' style games it lacks stability when multiple objects are in close proximity or resting upon each other.
   * The separation that stops two objects penetrating may create a new penetration against a different object. If you
   * require a high level of stability please consider using an alternative physics system, such as Matter.js.
   *
   * @method Phaser.Physics.Arcade.World#collide
   * @since 3.0.0
   *
   * @param {Phaser.Types.Physics.Arcade.ArcadeColliderType} body1 - The first object or array of objects to check.
   * @param {Phaser.Types.Physics.Arcade.ArcadeColliderType} [body2] - The second object or array of objects to check, or `undefined`.
   * @param {ArcadePhysicsCallback} [collideCallback] - An optional callback function that is called if the objects collide.
   * @param {ArcadePhysicsCallback} [processCallback] - An optional callback function that lets you perform additional checks against the two objects if they collide. If this is set then `collideCallback` will only be called if this callback returns `true`.
   * @param {any} [callbackContext] - The context in which to run the callbacks.
   *
   * @return {boolean} `true` if any overlapping Game Objects were separated, otherwise `false`.
   */
  collide(t, e, s, r, n) {
    return n === void 0 && (n = s), this.collideObjects(t, e, s, r, n, !1);
  }
  /**
   * Internal helper function. Please use Phaser.Physics.Arcade.World#collide instead.
   *
   * @method Phaser.Physics.Arcade.World#collideObjects
   * @private
   * @since 3.0.0
   *
   * @param {Phaser.Types.Physics.Arcade.ArcadeColliderType} body1 - The first object to check for collision.
   * @param {Phaser.Types.Physics.Arcade.ArcadeColliderType} [body2] - The second object to check for collision.
   * @param {ArcadePhysicsCallback} collideCallback - The callback to invoke when the two objects collide.
   * @param {ArcadePhysicsCallback} processCallback - The callback to invoke when the two objects collide. Must return a boolean.
   * @param {any} callbackContext - The scope in which to call the callbacks.
   * @param {boolean} overlapOnly - Whether this is a collision or overlap check.
   *
   * @return {boolean} True if any objects overlap (with `overlapOnly`); or true if any overlapping objects were separated.
   */
  collideObjects(t, e, s, r, n, a) {
    let l, u;
    const c = Array.isArray(t), d = Array.isArray(e);
    if (this._total = 0, !c && !d)
      this.collideHandler(t, e, s, r, n, a);
    else if (!c && d)
      for (l = 0; l < e.length; l++)
        this.collideHandler(t, e[l], s, r, n, a);
    else if (c && !d)
      if (e)
        for (l = 0; l < t.length; l++)
          this.collideHandler(t[l], e, s, r, n, a);
      else
        for (l = 0; l < t.length; l++) {
          const p = t[l];
          for (u = l + 1; u < t.length; u++)
            l !== u && this.collideHandler(p, t[u], s, r, n, a);
        }
    else if (c && d)
      for (l = 0; l < t.length; l++)
        for (u = 0; u < e.length; u++)
          this.collideHandler(t[l], e[u], s, r, n, a);
    return this._total > 0;
  }
  /**
   * Internal helper function. Please use Phaser.Physics.Arcade.World#collide and Phaser.Physics.Arcade.World#overlap instead.
   *
   * @method Phaser.Physics.Arcade.World#collideHandler
   * @private
   * @since 3.0.0
   *
   * @param {Phaser.Types.Physics.Arcade.ArcadeColliderType} body1 - The first object or array of objects to check.
   * @param {Phaser.Types.Physics.Arcade.ArcadeColliderType} body2 - The second object or array of objects to check, or `undefined`.
   * @param {ArcadePhysicsCallback} collideCallback - An optional callback function that is called if the objects collide.
   * @param {ArcadePhysicsCallback} processCallback - An optional callback function that lets you perform additional checks against the two objects if they collide. If this is set then `collideCallback` will only be called if this callback returns `true`.
   * @param {any} callbackContext - The context in which to run the callbacks.
   * @param {boolean} overlapOnly - Whether this is a collision or overlap check.
   *
   * @return {boolean} True if any objects overlap (with `overlapOnly`); or true if any overlapping objects were separated.
   */
  collideHandler(t, e, s, r, n, a) {
    if (!t || !e)
      return !1;
    if (!Array.isArray(e) && t.isBody && e.isBody)
      return this.collideBodyVsBody(t, e, s, r, n, a);
  }
  /**
   * Internal handler for Sprite vs. Sprite collisions.
   * Please use Phaser.Physics.Arcade.World#collide instead.
   *
   * @method Phaser.Physics.Arcade.World#collideSpriteVsSprite
   * @private
   * @since 3.0.0
   *
   * @param {Phaser.GameObjects.GameObject} sprite1 - The first object to check for collision.
   * @param {Phaser.GameObjects.GameObject} sprite2 - The second object to check for collision.
   * @param {ArcadePhysicsCallback} [collideCallback] - An optional callback function that is called if the objects collide.
   * @param {ArcadePhysicsCallback} [processCallback] - An optional callback function that lets you perform additional checks against the two objects if they collide. If this is set then `collideCallback` will only be called if this callback returns `true`.
   * @param {any} [callbackContext] - The context in which to run the callbacks.
   * @param {boolean} overlapOnly - Whether this is a collision or overlap check.
   *
   * @return {boolean} True if any objects overlap (with `overlapOnly`); or true if any overlapping objects were separated.
   */
  // collideSpriteVsSprite(sprite1, sprite2, collideCallback, processCallback, callbackContext, overlapOnly) {
  //   if (!sprite1.body || !sprite2.body) {
  //     return false
  //   }
  //   if (this.separate(sprite1.body, sprite2.body, processCallback, callbackContext, overlapOnly)) {
  //     if (collideCallback) {
  //       collideCallback.call(callbackContext, sprite1, sprite2)
  //     }
  //     this._total++
  //   }
  //   return true
  // }
  collideBodyVsBody(t, e, s, r, n, a) {
    return !t.isBody || !e.isBody ? !1 : (this.separate(t, e, r, n, a) && (s && s.call(n, t, e), this._total++), !0);
  }
  /**
   * Internal handler for Sprite vs. Group collisions.
   * Please use Phaser.Physics.Arcade.World#collide instead.
   *
   * @method Phaser.Physics.Arcade.World#collideSpriteVsGroup
   * @private
   * @since 3.0.0
   *
   * @param {Phaser.GameObjects.GameObject} sprite - The first object to check for collision.
   * @param {Phaser.GameObjects.Group} group - The second object to check for collision.
   * @param {ArcadePhysicsCallback} collideCallback - The callback to invoke when the two objects collide.
   * @param {ArcadePhysicsCallback} processCallback - The callback to invoke when the two objects collide. Must return a boolean.
   * @param {any} callbackContext - The scope in which to call the callbacks.
   * @param {boolean} overlapOnly - Whether this is a collision or overlap check.
   *
   * @return {boolean} `true` if the Sprite collided with the given Group, otherwise `false`.
   */
  // collideSpriteVsGroup(sprite, group, collideCallback, processCallback, callbackContext, overlapOnly) {
  //   let bodyA = sprite.body
  //   if (group.length === 0 || !bodyA || !bodyA.enable || bodyA.checkCollision.none) {
  //     return
  //   }
  //   //  Does sprite collide with anything?
  //   let i
  //   let len
  //   let bodyB
  //   if (this.useTree || group.physicsType === CONST.PHYSICS_TYPE.STATIC_BODY) {
  //     let minMax = this.treeMinMax
  //     minMax.minX = bodyA.left
  //     minMax.minY = bodyA.top
  //     minMax.maxX = bodyA.right
  //     minMax.maxY = bodyA.bottom
  //     let results =
  //       group.physicsType === CONST.PHYSICS_TYPE.DYNAMIC_BODY
  //         ? this.tree.search(minMax)
  //         : this.staticTree.search(minMax)
  //     len = results.length
  //     for (i = 0; i < len; i++) {
  //       bodyB = results[i]
  //       if (bodyA === bodyB || !bodyB.enable || bodyB.checkCollision.none || !group.contains(bodyB.gameObject)) {
  //         //  Skip if comparing against itself, or if bodyB isn't collidable, or if bodyB isn't actually part of the Group
  //         continue
  //       }
  //       if (this.separate(bodyA, bodyB, processCallback, callbackContext, overlapOnly, true)) {
  //         if (collideCallback) {
  //           collideCallback.call(callbackContext, bodyA.gameObject, bodyB.gameObject)
  //         }
  //         this._total++
  //       }
  //     }
  //   } else {
  //     let children = group.getChildren()
  //     let skipIndex = group.children.entries.indexOf(sprite)
  //     len = children.length
  //     for (i = 0; i < len; i++) {
  //       bodyB = children[i].body
  //       if (!bodyB || i === skipIndex || !bodyB.enable) {
  //         continue
  //       }
  //       if (this.separate(bodyA, bodyB, processCallback, callbackContext, overlapOnly)) {
  //         if (collideCallback) {
  //           collideCallback.call(callbackContext, bodyA.gameObject, bodyB.gameObject)
  //         }
  //         this._total++
  //       }
  //     }
  //   }
  // }
  /**
   * Internal handler for Group vs. Tilemap collisions.
   * Please use Phaser.Physics.Arcade.World#collide instead.
   *
   * @method Phaser.Physics.Arcade.World#collideGroupVsTilemapLayer
   * @private
   * @since 3.0.0
   *
   * @param {Phaser.GameObjects.Group} group - The first object to check for collision.
   * @param {Phaser.Tilemaps.TilemapLayer} tilemapLayer - The second object to check for collision.
   * @param {ArcadePhysicsCallback} collideCallback - An optional callback function that is called if the objects collide.
   * @param {ArcadePhysicsCallback} processCallback - An optional callback function that lets you perform additional checks against the two objects if they collide. If this is set then `collideCallback` will only be called if this callback returns `true`.
   * @param {any} callbackContext - The context in which to run the callbacks.
   * @param {boolean} overlapOnly - Whether this is a collision or overlap check.
   *
   * @return {boolean} True if any objects overlap (with `overlapOnly`); or true if any overlapping objects were separated.
   */
  // collideGroupVsTilemapLayer(group, tilemapLayer, collideCallback, processCallback, callbackContext, overlapOnly) {
  // let children = group.getChildren()
  // if (children.length === 0) {
  //   return false
  // }
  // let didCollide = false
  // for (let i = 0; i < children.length; i++) {
  //   if (children[i].body) {
  //     if (
  //       this.collideSpriteVsTilemapLayer(
  //         children[i],
  //         tilemapLayer,
  //         collideCallback,
  //         processCallback,
  //         callbackContext,
  //         overlapOnly
  //       )
  //     ) {
  //       didCollide = true
  //     }
  //   }
  // }
  // return didCollide
  // }
  /**
   * This advanced method is specifically for testing for collision between a single Sprite and an array of Tile objects.
   *
   * You should generally use the `collide` method instead, with a Sprite vs. a Tilemap Layer, as that will perform
   * tile filtering and culling for you, as well as handle the interesting face collision automatically.
   *
   * This method is offered for those who would like to check for collision with specific Tiles in a layer, without
   * having to set any collision attributes on the tiles in question. This allows you to perform quick dynamic collisions
   * on small sets of Tiles. As such, no culling or checks are made to the array of Tiles given to this method,
   * you should filter them before passing them to this method.
   *
   * Important: Use of this method skips the `interesting faces` system that Tilemap Layers use. This means if you have
   * say a row or column of tiles, and you jump into, or walk over them, it's possible to get stuck on the edges of the
   * tiles as the interesting face calculations are skipped. However, for quick-fire small collision set tests on
   * dynamic maps, this method can prove very useful.
   *
   * @method Phaser.Physics.Arcade.World#collideTiles
   * @fires Phaser.Physics.Arcade.Events#TILE_COLLIDE
   * @since 3.17.0
   *
   * @param {Phaser.GameObjects.GameObject} sprite - The first object to check for collision.
   * @param {Phaser.Tilemaps.Tile[]} tiles - An array of Tiles to check for collision against.
   * @param {ArcadePhysicsCallback} [collideCallback] - An optional callback function that is called if the objects collide.
   * @param {ArcadePhysicsCallback} [processCallback] - An optional callback function that lets you perform additional checks against the two objects if they collide. If this is set then `collideCallback` will only be called if this callback returns `true`.
   * @param {any} [callbackContext] - The context in which to run the callbacks.
   *
   * @return {boolean} True if any objects overlap (with `overlapOnly`); or true if any overlapping objects were separated.
   */
  // collideTiles(sprite, tiles, collideCallback, processCallback, callbackContext) {
  // if (!sprite.body.enable || tiles.length === 0) {
  //   return false
  // } else {
  //   return this.collideSpriteVsTilesHandler(
  //     sprite,
  //     tiles,
  //     collideCallback,
  //     processCallback,
  //     callbackContext,
  //     false,
  //     false
  //   )
  // }
  // }
  /**
   * This advanced method is specifically for testing for overlaps between a single Sprite and an array of Tile objects.
   *
   * You should generally use the `overlap` method instead, with a Sprite vs. a Tilemap Layer, as that will perform
   * tile filtering and culling for you, as well as handle the interesting face collision automatically.
   *
   * This method is offered for those who would like to check for overlaps with specific Tiles in a layer, without
   * having to set any collision attributes on the tiles in question. This allows you to perform quick dynamic overlap
   * tests on small sets of Tiles. As such, no culling or checks are made to the array of Tiles given to this method,
   * you should filter them before passing them to this method.
   *
   * @method Phaser.Physics.Arcade.World#overlapTiles
   * @fires Phaser.Physics.Arcade.Events#TILE_OVERLAP
   * @since 3.17.0
   *
   * @param {Phaser.GameObjects.GameObject} sprite - The first object to check for collision.
   * @param {Phaser.Tilemaps.Tile[]} tiles - An array of Tiles to check for collision against.
   * @param {ArcadePhysicsCallback} [collideCallback] - An optional callback function that is called if the objects overlap.
   * @param {ArcadePhysicsCallback} [processCallback] - An optional callback function that lets you perform additional checks against the two objects if they collide. If this is set then `collideCallback` will only be called if this callback returns `true`.
   * @param {any} [callbackContext] - The context in which to run the callbacks.
   *
   * @return {boolean} True if any objects overlap (with `overlapOnly`); or true if any overlapping objects were separated.
   */
  // overlapTiles(sprite, tiles, collideCallback, processCallback, callbackContext) {
  // if (!sprite.body.enable || tiles.length === 0) {
  //   return false
  // } else {
  //   return this.collideSpriteVsTilesHandler(
  //     sprite,
  //     tiles,
  //     collideCallback,
  //     processCallback,
  //     callbackContext,
  //     true,
  //     false
  //   )
  // }
  // }
  /**
   * Internal handler for Sprite vs. Tilemap collisions.
   * Please use Phaser.Physics.Arcade.World#collide instead.
   *
   * @method Phaser.Physics.Arcade.World#collideSpriteVsTilemapLayer
   * @fires Phaser.Physics.Arcade.Events#TILE_COLLIDE
   * @fires Phaser.Physics.Arcade.Events#TILE_OVERLAP
   * @since 3.0.0
   *
   * @param {Phaser.GameObjects.GameObject} sprite - The first object to check for collision.
   * @param {Phaser.Tilemaps.TilemapLayer} tilemapLayer - The second object to check for collision.
   * @param {ArcadePhysicsCallback} [collideCallback] - An optional callback function that is called if the objects collide.
   * @param {ArcadePhysicsCallback} [processCallback] - An optional callback function that lets you perform additional checks against the two objects if they collide. If this is set then `collideCallback` will only be called if this callback returns `true`.
   * @param {any} [callbackContext] - The context in which to run the callbacks.
   * @param {boolean} [overlapOnly] - Whether this is a collision or overlap check.
   *
   * @return {boolean} True if any objects overlap (with `overlapOnly`); or true if any overlapping objects were separated.
   */
  // collideSpriteVsTilemapLayer(sprite, tilemapLayer, collideCallback, processCallback, callbackContext, overlapOnly) {
  // let body = sprite.body
  // if (!body.enable || body.checkCollision.none) {
  //   return false
  // }
  // let x = body.position.x
  // let y = body.position.y
  // let w = body.width
  // let h = body.height
  // let layerData = tilemapLayer.layer
  // if (layerData.tileWidth > layerData.baseTileWidth) {
  //   // The x origin of a tile is the left side, so x and width need to be adjusted.
  //   let xDiff = (layerData.tileWidth - layerData.baseTileWidth) * tilemapLayer.scaleX
  //   x -= xDiff
  //   w += xDiff
  // }
  // if (layerData.tileHeight > layerData.baseTileHeight) {
  //   // The y origin of a tile is the bottom side, so just the height needs to be adjusted.
  //   let yDiff = (layerData.tileHeight - layerData.baseTileHeight) * tilemapLayer.scaleY
  //   h += yDiff
  // }
  // let mapData = GetTilesWithinWorldXY(x, y, w, h, null, tilemapLayer.scene.cameras.main, tilemapLayer.layer)
  // if (mapData.length === 0) {
  //   return false
  // } else {
  //   return this.collideSpriteVsTilesHandler(
  //     sprite,
  //     mapData,
  //     collideCallback,
  //     processCallback,
  //     callbackContext,
  //     overlapOnly,
  //     true
  //   )
  // }
  // }
  /**
   * Internal handler for Sprite vs. Tilemap collisions.
   * Please use Phaser.Physics.Arcade.World#collide instead.
   *
   * @method Phaser.Physics.Arcade.World#collideSpriteVsTilesHandler
   * @fires Phaser.Physics.Arcade.Events#TILE_COLLIDE
   * @fires Phaser.Physics.Arcade.Events#TILE_OVERLAP
   * @private
   * @since 3.17.0
   *
   * @param {Phaser.GameObjects.GameObject} sprite - The first object to check for collision.
   * @param {Phaser.Tilemaps.TilemapLayer} tilemapLayer - The second object to check for collision.
   * @param {ArcadePhysicsCallback} [collideCallback] - An optional callback function that is called if the objects collide.
   * @param {ArcadePhysicsCallback} [processCallback] - An optional callback function that lets you perform additional checks against the two objects if they collide. If this is set then `collideCallback` will only be called if this callback returns `true`.
   * @param {any} [callbackContext] - The context in which to run the callbacks.
   * @param {boolean} [overlapOnly] - Whether this is a collision or overlap check.
   * @param {boolean} [isLayer] - Is this check coming from a TilemapLayer or an array of tiles?
   *
   * @return {boolean} True if any objects overlap (with `overlapOnly`); or true if any overlapping objects were separated.
   */
  // collideSpriteVsTilesHandler(sprite, tiles, collideCallback, processCallback, callbackContext, overlapOnly, isLayer) {
  //   let body = sprite.body
  //   let tile
  //   let tileWorldRect = { left: 0, right: 0, top: 0, bottom: 0 }
  //   let tilemapLayer
  //   let collision = false
  //   for (let i = 0; i < tiles.length; i++) {
  //     tile = tiles[i]
  //     tilemapLayer = tile.tilemapLayer
  //     let point = tilemapLayer.tileToWorldXY(tile.x, tile.y)
  //     tileWorldRect.left = point.x
  //     tileWorldRect.top = point.y
  //     //  If the maps base tile size differs from the layer tile size, only the top of the rect
  //     //  needs to be adjusted since its origin is (0, 1).
  //     if (tile.baseHeight !== tile.height) {
  //       tileWorldRect.top -= (tile.height - tile.baseHeight) * tilemapLayer.scaleY
  //     }
  //     tileWorldRect.right = tileWorldRect.left + tile.width * tilemapLayer.scaleX
  //     tileWorldRect.bottom = tileWorldRect.top + tile.height * tilemapLayer.scaleY
  //     if (
  //       TileIntersectsBody(tileWorldRect, body) &&
  //       (!processCallback || processCallback.call(callbackContext, sprite, tile)) &&
  //       ProcessTileCallbacks(tile, sprite) &&
  //       (overlapOnly || SeparateTile(i, body, tile, tileWorldRect, tilemapLayer, this.TILE_BIAS, isLayer))
  //     ) {
  //       this._total++
  //       collision = true
  //       if (collideCallback) {
  //         collideCallback.call(callbackContext, sprite, tile)
  //       }
  //       if (overlapOnly && body.onOverlap) {
  //         this.emit(Events.TILE_OVERLAP, sprite, tile, body)
  //       } else if (body.onCollide) {
  //         this.emit(Events.TILE_COLLIDE, sprite, tile, body)
  //       }
  //     }
  //   }
  //   return collision
  // }
  /**
   * Internal helper for Group vs. Group collisions.
   * Please use Phaser.Physics.Arcade.World#collide instead.
   *
   * @method Phaser.Physics.Arcade.World#collideGroupVsGroup
   * @private
   * @since 3.0.0
   *
   * @param {Phaser.GameObjects.Group} group1 - The first object to check for collision.
   * @param {Phaser.GameObjects.Group} group2 - The second object to check for collision.
   * @param {ArcadePhysicsCallback} [collideCallback] - An optional callback function that is called if the objects collide.
   * @param {ArcadePhysicsCallback} [processCallback] - An optional callback function that lets you perform additional checks against the two objects if they collide. If this is set then `collideCallback` will only be called if this callback returns `true`.
   * @param {any} [callbackContext] - The context in which to run the callbacks.
   * @param {boolean} overlapOnly - Whether this is a collision or overlap check.
   *
   * @return {boolean} True if any objects overlap (with `overlapOnly`); or true if any overlapping objects were separated.
   */
  // collideGroupVsGroup(group1, group2, collideCallback, processCallback, callbackContext, overlapOnly) {
  //   if (group1.length === 0 || group2.length === 0) {
  //     return
  //   }
  //   let children = group1.getChildren()
  //   for (let i = 0; i < children.length; i++) {
  //     this.collideSpriteVsGroup(children[i], group2, collideCallback, processCallback, callbackContext, overlapOnly)
  //   }
  // }
  /**
   * Wrap an object's coordinates (or several objects' coordinates) within {@link Phaser.Physics.Arcade.World#bounds}.
   *
   * If the object is outside any boundary edge (left, top, right, bottom), it will be moved to the same offset from the opposite edge (the interior).
   *
   * @method Phaser.Physics.Arcade.World#wrap
   * @since 3.3.0
   *
   * @param {any} object - A Game Object, a Group, an object with `x` and `y` coordinates, or an array of such objects.
   * @param {number} [padding=0] - An amount added to each boundary edge during the operation.
   */
  wrap(t, e) {
    t.body ? this.wrapObject(t, e) : t.getChildren ? this.wrapArray(t.getChildren(), e) : Array.isArray(t) ? this.wrapArray(t, e) : this.wrapObject(t, e);
  }
  /**
   * Wrap each object's coordinates within {@link Phaser.Physics.Arcade.World#bounds}.
   *
   * @method Phaser.Physics.Arcade.World#wrapArray
   * @since 3.3.0
   *
   * @param {Array.<*>} objects - An array of objects to be wrapped.
   * @param {number} [padding=0] - An amount added to the boundary.
   */
  wrapArray(t, e) {
    for (let s = 0; s < t.length; s++)
      this.wrapObject(t[s], e);
  }
  /**
   * Wrap an object's coordinates within {@link Phaser.Physics.Arcade.World#bounds}.
   *
   * @method Phaser.Physics.Arcade.World#wrapObject
   * @since 3.3.0
   *
   * @param {*} object - A Game Object, a Physics Body, or any object with `x` and `y` coordinates
   * @param {number} [padding=0] - An amount added to the boundary.
   */
  wrapObject(t, e) {
    e === void 0 && (e = 0), t.x = (0, Oe.default)(t.x, this.bounds.left - e, this.bounds.right + e), t.y = (0, Oe.default)(t.y, this.bounds.top - e, this.bounds.bottom + e);
  }
  /**
   * Shuts down the simulation, clearing physics data and removing listeners.
   *
   * @method Phaser.Physics.Arcade.World#shutdown
   * @since 3.0.0
   */
  shutdown() {
    this.tree.clear(), this.staticTree.clear(), this.bodies.clear(), this.staticBodies.clear(), this.colliders.destroy(), this.removeAllListeners();
  }
  /**
   * Shuts down the simulation and disconnects it from the current scene.
   *
   * @method Phaser.Physics.Arcade.World#destroy
   * @since 3.0.0
   */
  destroy() {
    this.shutdown(), this.scene = null;
  }
}
Xt.World = Cr;
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
var ut = x && x.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(mt, "__esModule", { value: !0 });
var ze = mt.ArcadePhysics = void 0;
const Or = ut(Nt), Dr = ut(it), Ye = ut(Ut), Te = xt, Sr = ut(se), Yr = ut(St), Ee = j, $e = Xt;
class Tr {
  constructor(t) {
    const e = {
      sys: {
        scale: { width: t.width, height: t.height },
        settings: {
          physics: t
        }
      }
    };
    this.scene = e, this.systems = e.sys, this.config = this.getConfig(), this.world, this.add, this.boot();
  }
  /**
   * This method is called automatically, only once, when the Scene is first created.
   * Do not invoke it directly.
   */
  boot() {
    this.world || (this.world = new $e.World(this.scene, this.config)), this.add || (this.add = new Te.Factory(this.world));
  }
  /**
   * This method is called automatically by the Scene when it is starting up.
   * It is responsible for creating local systems, properties and listening for Scene events.
   * Do not invoke it directly.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#start
   * @private
   * @since 3.5.0
   */
  start() {
    this.world || (this.world = new $e.World(this.scene, this.config), this.add = new Te.Factory(this.world)), this.systems.events;
  }
  /**
   * Causes `World.update` to be automatically called each time the Scene
   * emits and `UPDATE` event. This is the default setting, so only needs
   * calling if you have specifically disabled it.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#enableUpdate
   * @since 3.50.0
   */
  enableUpdate() {
  }
  /**
   * Causes `World.update` to **not** be automatically called each time the Scene
   * emits and `UPDATE` event.
   *
   * If you wish to run the World update at your own rate, or from your own
   * component, then you should call this method to disable the built-in link,
   * and then call `World.update(delta, time)` accordingly.
   *
   * Note that `World.postUpdate` is always automatically called when the Scene
   * emits a `POST_UPDATE` event, regardless of this setting.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#disableUpdate
   * @since 3.50.0
   */
  disableUpdate() {
  }
  /**
   * Creates the physics configuration for the current Scene.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#getConfig
   * @since 3.0.0
   *
   * @return {Phaser.Types.Physics.Arcade.ArcadeWorldConfig} The physics configuration.
   */
  getConfig() {
    var t, e, s;
    const r = ((e = (t = this.systems.game) === null || t === void 0 ? void 0 : t.config) === null || e === void 0 ? void 0 : e.physics) || {}, n = ((s = this.systems.settings) === null || s === void 0 ? void 0 : s.physics) || {};
    return Object.assign(Object.assign({}, r), n);
  }
  /**
   * Tests if Game Objects overlap. See {@link Phaser.Physics.Arcade.World#overlap}
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#overlap
   * @since 3.0.0
   *
   * @param {Phaser.Types.Physics.Arcade.ArcadeColliderType} object1 - The first object or array of objects to check.
   * @param {Phaser.Types.Physics.Arcade.ArcadeColliderType} [object2] - The second object or array of objects to check, or `undefined`.
   * @param {ArcadePhysicsCallback} [collideCallback] - An optional callback function that is called if the objects collide.
   * @param {ArcadePhysicsCallback} [processCallback] - An optional callback function that lets you perform additional checks against the two objects if they overlap. If this is set then `collideCallback` will only be called if this callback returns `true`.
   * @param {*} [callbackContext] - The context in which to run the callbacks.
   *
   * @return {boolean} True if at least one Game Object overlaps another.
   *
   * @see Phaser.Physics.Arcade.World#overlap
   */
  overlap(t, e, s, r, n) {
    return s === void 0 && (s = null), r === void 0 && (r = null), n === void 0 && (n = s), this.world.collideObjects(t, e, s, r, n, !0);
  }
  /**
   * Performs a collision check and separation between the two physics enabled objects given, which can be single
   * Game Objects, arrays of Game Objects, Physics Groups, arrays of Physics Groups or normal Groups.
   *
   * If you don't require separation then use {@link #overlap} instead.
   *
   * If two Groups or arrays are passed, each member of one will be tested against each member of the other.
   *
   * If **only** one Group is passed (as `object1`), each member of the Group will be collided against the other members.
   *
   * If **only** one Array is passed, the array is iterated and every element in it is tested against the others.
   *
   * Two callbacks can be provided. The `collideCallback` is invoked if a collision occurs and the two colliding
   * objects are passed to it.
   *
   * Arcade Physics uses the Projection Method of collision resolution and separation. While it's fast and suitable
   * for 'arcade' style games it lacks stability when multiple objects are in close proximity or resting upon each other.
   * The separation that stops two objects penetrating may create a new penetration against a different object. If you
   * require a high level of stability please consider using an alternative physics system, such as Matter.js.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#collide
   * @since 3.0.0
   *
   * @param {Phaser.Types.Physics.Arcade.ArcadeColliderType} object1 - The first object or array of objects to check.
   * @param {Phaser.Types.Physics.Arcade.ArcadeColliderType} [object2] - The second object or array of objects to check, or `undefined`.
   * @param {ArcadePhysicsCallback} [collideCallback] - An optional callback function that is called if the objects collide.
   * @param {ArcadePhysicsCallback} [processCallback] - An optional callback function that lets you perform additional checks against the two objects if they collide. If this is set then `collideCallback` will only be called if this callback returns `true`.
   * @param {*} [callbackContext] - The context in which to run the callbacks.
   *
   * @return {boolean} True if any overlapping Game Objects were separated, otherwise false.
   *
   * @see Phaser.Physics.Arcade.World#collide
   */
  collide(t, e, s, r, n) {
    return s === void 0 && (s = null), r === void 0 && (r = null), n === void 0 && (n = s), this.world.collideObjects(t, e, s, r, n, !1);
  }
  /**
   * This advanced method is specifically for testing for collision between a single Sprite and an array of Tile objects.
   *
   * You should generally use the `collide` method instead, with a Sprite vs. a Tilemap Layer, as that will perform
   * tile filtering and culling for you, as well as handle the interesting face collision automatically.
   *
   * This method is offered for those who would like to check for collision with specific Tiles in a layer, without
   * having to set any collision attributes on the tiles in question. This allows you to perform quick dynamic collisions
   * on small sets of Tiles. As such, no culling or checks are made to the array of Tiles given to this method,
   * you should filter them before passing them to this method.
   *
   * Important: Use of this method skips the `interesting faces` system that Tilemap Layers use. This means if you have
   * say a row or column of tiles, and you jump into, or walk over them, it's possible to get stuck on the edges of the
   * tiles as the interesting face calculations are skipped. However, for quick-fire small collision set tests on
   * dynamic maps, this method can prove very useful.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#collideTiles
   * @fires Phaser.Physics.Arcade.Events#TILE_COLLIDE
   * @since 3.17.0
   *
   * @param {Phaser.GameObjects.GameObject} sprite - The first object to check for collision.
   * @param {Phaser.Tilemaps.Tile[]} tiles - An array of Tiles to check for collision against.
   * @param {ArcadePhysicsCallback} [collideCallback] - An optional callback function that is called if the objects collide.
   * @param {ArcadePhysicsCallback} [processCallback] - An optional callback function that lets you perform additional checks against the two objects if they collide. If this is set then `collideCallback` will only be called if this callback returns `true`.
   * @param {any} [callbackContext] - The context in which to run the callbacks.
   *
   * @return {boolean} True if any objects overlap (with `overlapOnly`); or true if any overlapping objects were separated.
   */
  // collideTiles(sprite, tiles, collideCallback, processCallback, callbackContext) {
  //   return this.world.collideTiles(sprite, tiles, collideCallback, processCallback, callbackContext)
  // }
  /**
   * This advanced method is specifically for testing for overlaps between a single Sprite and an array of Tile objects.
   *
   * You should generally use the `overlap` method instead, with a Sprite vs. a Tilemap Layer, as that will perform
   * tile filtering and culling for you, as well as handle the interesting face collision automatically.
   *
   * This method is offered for those who would like to check for overlaps with specific Tiles in a layer, without
   * having to set any collision attributes on the tiles in question. This allows you to perform quick dynamic overlap
   * tests on small sets of Tiles. As such, no culling or checks are made to the array of Tiles given to this method,
   * you should filter them before passing them to this method.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#overlapTiles
   * @fires Phaser.Physics.Arcade.Events#TILE_OVERLAP
   * @since 3.17.0
   *
   * @param {Phaser.GameObjects.GameObject} sprite - The first object to check for collision.
   * @param {Phaser.Tilemaps.Tile[]} tiles - An array of Tiles to check for collision against.
   * @param {ArcadePhysicsCallback} [collideCallback] - An optional callback function that is called if the objects overlap.
   * @param {ArcadePhysicsCallback} [processCallback] - An optional callback function that lets you perform additional checks against the two objects if they collide. If this is set then `collideCallback` will only be called if this callback returns `true`.
   * @param {any} [callbackContext] - The context in which to run the callbacks.
   *
   * @return {boolean} True if any objects overlap (with `overlapOnly`); or true if any overlapping objects were separated.
   */
  // overlapTiles(sprite, tiles, collideCallback, processCallback, callbackContext) {
  //   return this.world.overlapTiles(sprite, tiles, collideCallback, processCallback, callbackContext)
  // }
  /**
   * Pauses the simulation.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#pause
   * @since 3.0.0
   *
   * @return {Phaser.Physics.Arcade.World} The simulation.
   */
  pause() {
    return this.world.pause();
  }
  /**
   * Resumes the simulation (if paused).
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#resume
   * @since 3.0.0
   *
   * @return {Phaser.Physics.Arcade.World} The simulation.
   */
  resume() {
    return this.world.resume();
  }
  /**
   * Sets the acceleration.x/y property on the game object so it will move towards the x/y coordinates at the given rate (in pixels per second squared)
   *
   * You must give a maximum speed value, beyond which the game object won't go any faster.
   *
   * Note: The game object does not continuously track the target. If the target changes location during transit the game object will not modify its course.
   * Note: The game object doesn't stop moving once it reaches the destination coordinates.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#accelerateTo
   * @since 3.0.0
   *
   * @param {Phaser.GameObjects.GameObject} gameObject - Any Game Object with an Arcade Physics body.
   * @param {number} x - The x coordinate to accelerate towards.
   * @param {number} y - The y coordinate to accelerate towards.
   * @param {number} [speed=60] - The acceleration (change in speed) in pixels per second squared.
   * @param {number} [xSpeedMax=500] - The maximum x velocity the game object can reach.
   * @param {number} [ySpeedMax=500] - The maximum y velocity the game object can reach.
   *
   * @return {number} The angle (in radians) that the object should be visually set to in order to match its new velocity.
   */
  accelerateTo(t, e, s, r, n, a) {
    r === void 0 && (r = 60);
    const l = Math.atan2(s - t.y, e - t.x);
    return t.body.acceleration.setToPolar(l, r), n !== void 0 && a !== void 0 && t.body.maxVelocity.set(n, a), l;
  }
  /**
   * Sets the acceleration.x/y property on the game object so it will move towards the x/y coordinates at the given rate (in pixels per second squared)
   *
   * You must give a maximum speed value, beyond which the game object won't go any faster.
   *
   * Note: The game object does not continuously track the target. If the target changes location during transit the game object will not modify its course.
   * Note: The game object doesn't stop moving once it reaches the destination coordinates.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#accelerateToObject
   * @since 3.0.0
   *
   * @param {Phaser.GameObjects.GameObject} gameObject - Any Game Object with an Arcade Physics body.
   * @param {Phaser.GameObjects.GameObject} destination - The Game Object to move towards. Can be any object but must have visible x/y properties.
   * @param {number} [speed=60] - The acceleration (change in speed) in pixels per second squared.
   * @param {number} [xSpeedMax=500] - The maximum x velocity the game object can reach.
   * @param {number} [ySpeedMax=500] - The maximum y velocity the game object can reach.
   *
   * @return {number} The angle (in radians) that the object should be visually set to in order to match its new velocity.
   */
  accelerateToObject(t, e, s, r, n) {
    return this.accelerateTo(t, e.x, e.y, s, r, n);
  }
  /**
   * Finds the Body or Game Object closest to a source point or object.
   *
   * If a `targets` argument is passed, this method finds the closest of those.
   * The targets can be Arcade Physics Game Objects, Dynamic Bodies, or Static Bodies.
   *
   * If no `targets` argument is passed, this method finds the closest Dynamic Body.
   *
   * If two or more targets are the exact same distance from the source point, only the first target
   * is returned.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#closest
   * @since 3.0.0
   *
   * @param {any} source - Any object with public `x` and `y` properties, such as a Game Object or Geometry object.
   * @param {(Phaser.Physics.Arcade.Body[]|Phaser.Physics.Arcade.StaticBody[]|Phaser.GameObjects.GameObject[])} [targets] - The targets.
   *
   * @return {?(Phaser.Physics.Arcade.Body|Phaser.Physics.Arcade.StaticBody|Phaser.GameObjects.GameObject)} The target closest to the given source point.
   */
  closest(t, e = this.world.bodies) {
    let s = Number.MAX_VALUE, r = null;
    const n = t.x, a = t.y;
    e.size;
    for (const l of e) {
      const u = l.body || l;
      if (t === l || t === u || t === u.gameObject || t === u.center)
        continue;
      const c = (0, Ye.default)(n, a, u.center.x, u.center.y);
      c < s && (r = l, s = c);
    }
    return r;
  }
  /**
   * Finds the Body or Game Object farthest from a source point or object.
   *
   * If a `targets` argument is passed, this method finds the farthest of those.
   * The targets can be Arcade Physics Game Objects, Dynamic Bodies, or Static Bodies.
   *
   * If no `targets` argument is passed, this method finds the farthest Dynamic Body.
   *
   * If two or more targets are the exact same distance from the source point, only the first target
   * is returned.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#furthest
   * @since 3.0.0
   *
   * @param {any} source - Any object with public `x` and `y` properties, such as a Game Object or Geometry object.
   * @param {(Phaser.Physics.Arcade.Body[]|Phaser.Physics.Arcade.StaticBody[]|Phaser.GameObjects.GameObject[])} [targets] - The targets.
   *
   * @return {?(Phaser.Physics.Arcade.Body|Phaser.Physics.Arcade.StaticBody|Phaser.GameObjects.GameObject)} The target farthest from the given source point.
   */
  furthest(t, e = this.world.bodies) {
    let s = -1, r = null;
    const n = t.x, a = t.y;
    e.size;
    for (const l of e) {
      const u = l.body || l;
      if (t === l || t === u || t === u.gameObject || t === u.center)
        continue;
      const c = (0, Ye.default)(n, a, u.center.x, u.center.y);
      c > s && (r = l, s = c);
    }
    return r;
  }
  /**
   * Move the given display object towards the x/y coordinates at a steady velocity.
   * If you specify a maxTime then it will adjust the speed (over-writing what you set) so it arrives at the destination in that number of seconds.
   * Timings are approximate due to the way browser timers work. Allow for a letiance of +- 50ms.
   * Note: The display object does not continuously track the target. If the target changes location during transit the display object will not modify its course.
   * Note: The display object doesn't stop moving once it reaches the destination coordinates.
   * Note: Doesn't take into account acceleration, maxVelocity or drag (if you've set drag or acceleration too high this object may not move at all)
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#moveTo
   * @since 3.0.0
   *
   * @param {Phaser.GameObjects.GameObject} gameObject - Any Game Object with an Arcade Physics body.
   * @param {number} x - The x coordinate to move towards.
   * @param {number} y - The y coordinate to move towards.
   * @param {number} [speed=60] - The speed it will move, in pixels per second (default is 60 pixels/sec)
   * @param {number} [maxTime=0] - Time given in milliseconds (1000 = 1 sec). If set the speed is adjusted so the object will arrive at destination in the given number of ms.
   *
   * @return {number} The angle (in radians) that the object should be visually set to in order to match its new velocity.
   */
  moveTo(t, e, s, r = 60, n = 0) {
    const a = Math.atan2(s - t.y, e - t.x);
    return n > 0 && (r = (0, Dr.default)(t.x, t.y, e, s) / (n / 1e3)), t.velocity.setToPolar(a, r), a;
  }
  /**
   * Move the given display object towards the destination object at a steady velocity.
   * If you specify a maxTime then it will adjust the speed (overwriting what you set) so it arrives at the destination in that number of seconds.
   * Timings are approximate due to the way browser timers work. Allow for a letiance of +- 50ms.
   * Note: The display object does not continuously track the target. If the target changes location during transit the display object will not modify its course.
   * Note: The display object doesn't stop moving once it reaches the destination coordinates.
   * Note: Doesn't take into account acceleration, maxVelocity or drag (if you've set drag or acceleration too high this object may not move at all)
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#moveToObject
   * @since 3.0.0
   *
   * @param {Phaser.GameObjects.GameObject} gameObject - Any Game Object with an Arcade Physics body.
   * @param {object} destination - Any object with public `x` and `y` properties, such as a Game Object or Geometry object.
   * @param {number} [speed=60] - The speed it will move, in pixels per second (default is 60 pixels/sec)
   * @param {number} [maxTime=0] - Time given in milliseconds (1000 = 1 sec). If set the speed is adjusted so the object will arrive at destination in the given number of ms.
   *
   * @return {number} The angle (in radians) that the object should be visually set to in order to match its new velocity.
   */
  moveToObject(t, e, s = 60, r = 0) {
    return this.moveTo(t, e.x, e.y, s, r);
  }
  /**
   * Given the angle (in degrees) and speed calculate the velocity and return it as a vector, or set it to the given vector object.
   * One way to use this is: velocityFromAngle(angle, 200, sprite.body.velocity) which will set the values directly to the sprite's velocity and not create a new vector object.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#velocityFromAngle
   * @since 3.0.0
   *
   * @param {number} angle - The angle in degrees calculated in clockwise positive direction (down = 90 degrees positive, right = 0 degrees positive, up = 90 degrees negative)
   * @param {number} [speed=60] - The speed it will move, in pixels per second squared.
   * @param {Phaser.Math.Vector2} [vec2] - The Vector2 in which the x and y properties will be set to the calculated velocity.
   *
   * @return {Phaser.Math.Vector2} The Vector2 that stores the velocity.
   */
  velocityFromAngle(t, e, s) {
    return e === void 0 && (e = 60), s === void 0 && (s = new Ee.Vector2()), s.setToPolar((0, Or.default)(t), e);
  }
  /**
   * Given the rotation (in radians) and speed calculate the velocity and return it as a vector, or set it to the given vector object.
   * One way to use this is: velocityFromRotation(rotation, 200, sprite.body.velocity) which will set the values directly to the sprite's velocity and not create a new vector object.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#velocityFromRotation
   * @since 3.0.0
   *
   * @param {number} rotation - The angle in radians.
   * @param {number} [speed=60] - The speed it will move, in pixels per second squared
   * @param {Phaser.Math.Vector2} [vec2] - The Vector2 in which the x and y properties will be set to the calculated velocity.
   *
   * @return {Phaser.Math.Vector2} The Vector2 that stores the velocity.
   */
  velocityFromRotation(t, e, s) {
    return e === void 0 && (e = 60), s === void 0 && (s = new Ee.Vector2()), s.setToPolar(t, e);
  }
  /**
   * This method will search the given rectangular area and return an array of all physics bodies that
   * overlap with it. It can return either Dynamic, Static bodies or a mixture of both.
   *
   * A body only has to intersect with the search area to be considered, it doesn't have to be fully
   * contained within it.
   *
   * If Arcade Physics is set to use the RTree (which it is by default) then the search for is extremely fast,
   * otherwise the search is O(N) for Dynamic Bodies.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#overlapRect
   * @since 3.17.0
   *
   * @param {number} x - The top-left x coordinate of the area to search within.
   * @param {number} y - The top-left y coordinate of the area to search within.
   * @param {number} width - The width of the area to search within.
   * @param {number} height - The height of the area to search within.
   * @param {boolean} [includeDynamic=true] - Should the search include Dynamic Bodies?
   * @param {boolean} [includeStatic=false] - Should the search include Static Bodies?
   *
   * @return {(Phaser.Physics.Arcade.Body[]|Phaser.Physics.Arcade.StaticBody[])} An array of bodies that overlap with the given area.
   */
  overlapRect(t, e, s, r, n = !0, a = !1) {
    return (0, Yr.default)(this.world, t, e, s, r, n, a);
  }
  /**
   * This method will search the given circular area and return an array of all physics bodies that
   * overlap with it. It can return either Dynamic, Static bodies or a mixture of both.
   *
   * A body only has to intersect with the search area to be considered, it doesn't have to be fully
   * contained within it.
   *
   * If Arcade Physics is set to use the RTree (which it is by default) then the search is rather fast,
   * otherwise the search is O(N) for Dynamic Bodies.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#overlapCirc
   * @since 3.21.0
   *
   * @param {number} x - The x coordinate of the center of the area to search within.
   * @param {number} y - The y coordinate of the center of the area to search within.
   * @param {number} radius - The radius of the area to search within.
   * @param {boolean} [includeDynamic=true] - Should the search include Dynamic Bodies?
   * @param {boolean} [includeStatic=false] - Should the search include Static Bodies?
   *
   * @return {(Phaser.Physics.Arcade.Body[]|Phaser.Physics.Arcade.StaticBody[])} An array of bodies that overlap with the given area.
   */
  overlapCirc(t, e, s, r, n) {
    return (0, Sr.default)(this.world, t, e, s, r, n);
  }
  /**
   * The Scene that owns this plugin is shutting down.
   * We need to kill and reset all internal properties as well as stop listening to Scene events.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#shutdown
   * @since 3.0.0
   */
  shutdown() {
    this.world && (this.systems.events, this.add.destroy(), this.world.destroy(), this.add = null, this.world = null);
  }
  /**
   * The Scene that owns this plugin is being destroyed.
   * We need to shutdown and then kill off all external references.
   *
   * @method Phaser.Physics.Arcade.ArcadePhysics#destroy
   * @since 3.0.0
   */
  destroy() {
    this.shutdown(), this.scene = null, this.systems = null;
  }
}
ze = mt.ArcadePhysics = Tr;
const Er = {
  debug: !1,
  gravity: { x: 0, y: 300 }
}, vt = class vt extends Je {
  constructor() {
    super(...arguments), this.id = "ArcadePhysicsPlugin";
  }
  set debug(t) {
    var e;
    this._debug = t, t ? this.app.ticker.add(this._drawDebug) : ((e = this._gfx) == null || e.destroy(), this._gfx = null, this.app.ticker.remove(this._drawDebug));
  }
  async initialize(t, e) {
    vt.ID = this.id, this.options = { ...Er, width: t.size.width, height: t.size.height, ...e, debug: !1 }, ve.log("ArcadePhysicsPlugin", "initialize", this.options), this.physics = new ze(this.options), e != null && e.debug && (this.debug = !0);
  }
  destroy() {
    this._gfx && (this._gfx.parent.removeChild(this._gfx), this._gfx.destroy()), this.app.ticker.remove(this._drawDebug), this.physics.shutdown(), this.physics.destroy(), this.physics = null, this._gfx = null, this.debug = !1, super.destroy();
  }
  addBody(t) {
    if (!t.body) {
      ve.error("ArcadePhysicsPlugin", "addBody", "Entity does not have a body");
      return;
    }
    t.body.entity = t;
  }
  _drawDebug() {
    this.container && (this._gfx || (this._gfx = new ti(), this.container.addChild(this._gfx)), this._gfx.clear(), this.physics.world && (this.physics.world.bodies.forEach((t) => {
      var s, r;
      const e = t.entity;
      if (e) {
        const n = e.bodyPosition;
        t.isCircle ? (s = this._gfx) == null || s.circle(n.x + t.width * 0.5, n.y + t.width * 0.5, t.width * 0.5) : (r = this._gfx) == null || r.rect(n.x, n.y, t.width, t.height);
      }
    }), this._gfx.stroke({ width: 1, color: 16711680, alignment: 0.5 }), this.physics.world.staticBodies.forEach((t) => {
      var e, s;
      t.isCircle ? (e = this._gfx) == null || e.circle(t.x + t.width * 0.5, t.y + t.width * 0.5, t.width * 0.5) : (s = this._gfx) == null || s.rect(t.x, t.y, t.width, t.height);
    }), this._gfx.stroke({ width: 1, color: 65280, alignment: 0.5 }), this._gfx.rect(
      this.physics.world.bounds.x,
      this.physics.world.bounds.y,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height
    ), this._gfx.stroke({ width: 1, color: 16711680, alignment: 0.5 })));
  }
};
vt.ID = "ArcadePhysicsPlugin";
let gt = vt;
const qe = (i) => class extends i {
  get entity() {
    return this._entity;
  }
  set entity(t) {
    this._entity = t;
  }
  constructor(...t) {
    super(...t);
  }
};
class $r extends qe(Le) {
}
class Gr extends qe(je) {
}
const ge = class ge extends Ke {
  constructor() {
    super({ autoUpdate: !0, priority: 0, autoResize: !1 }), this.type = "actor", this.bodyType = "rectangle", this.bodyPosition = new me(), this.offset = new me();
  }
  get view() {
    return this._view;
  }
  set view(t) {
    this._view = t, this.updateBody();
  }
  get world() {
    return this.physics.world;
  }
  get physics() {
    return this.app.getPlugin(gt.ID).physics;
  }
  get plugin() {
    return this.app.getPlugin(gt.ID);
  }
  added() {
    this.create(), this.postCreate();
  }
  updateBody() {
    if (!this.body) {
      const t = this.getBoundingBox();
      this.type === "solid" ? this.body = this.physics.add.staticBody(
        this.x + t.left,
        this.y + t.top,
        t.width,
        t.height
      ) : this.body = this.physics.add.body(
        this.x + t.left,
        this.y + t.top,
        t.width,
        t.height
      ), this.bodyType === "circle" && this.body.setCircle(t.width * 0.5, 0, 0);
    }
  }
  getBoundingBox() {
    return this._cachedBounds || (this._cachedBounds = this.getLocalBounds(), this._cachedBounds.scale(1 / this.plugin.container.worldTransform.d)), this._cachedBounds;
  }
  update() {
    !this.body || !this.view || (this.bodyPosition.x = this.body.x, this.bodyPosition.y = this.body.y, this.x = this.bodyPosition.x + this.getBoundingBox().width * 0.5 + this.offset.x, this.y = this.bodyPosition.y + this.getBoundingBox().height * 0.5 + this.offset.y, this.body instanceof $r && (this.angle = this.body.rotation));
  }
  create() {
  }
  postCreate() {
    this.body && this.plugin.addBody(this);
  }
};
ge.pluginName = "ArcadePhysicsPlugin";
let Ae = ge;
var Qe = {};
(function(i) {
  /**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2022 Yannick Deubel
   * @license      {@link https://opensource.org/licenses/MIT | MIT License}
   */
  Object.defineProperty(i, "__esModule", { value: !0 }), i.ArcadePhysics = void 0;
  var t = mt;
  Object.defineProperty(i, "ArcadePhysics", { enumerable: !0, get: function() {
    return t.ArcadePhysics;
  } });
})(Qe);
const Lr = Qe.ArcadePhysics;
export {
  Lr as ArcadePhysics,
  $r as Body,
  pr as Collider,
  Xr as Constants,
  Ae as Entity,
  ns as Factory,
  Gr as StaticBody,
  gt as default
};
//# sourceMappingURL=dill-pixel-plugin-arcade-physics.mjs.map
