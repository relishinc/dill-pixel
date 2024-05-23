import { Ticker as P, UPDATE_PRIORITY as E } from "pixi.js";
import { Plugin as T, Application as R } from "./dill-pixel.mjs";
var I = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function M(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var b = { exports: {} };
(function(s, x) {
  (function(p, a) {
    s.exports = a();
  })(I, function() {
    var p = function() {
      function a(n) {
        return l.appendChild(n.dom), n;
      }
      function f(n) {
        for (var i = 0; i < l.children.length; i++)
          l.children[i].style.display = i === n ? "block" : "none";
        d = n;
      }
      var d = 0, l = document.createElement("div");
      l.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000", l.addEventListener("click", function(n) {
        n.preventDefault(), f(++d % l.children.length);
      }, !1);
      var r = (performance || Date).now(), o = r, t = 0, y = a(new p.Panel("FPS", "#0ff", "#002")), v = a(new p.Panel("MS", "#0f0", "#020"));
      if (self.performance && self.performance.memory)
        var g = a(new p.Panel("MB", "#f08", "#201"));
      return f(0), { REVISION: 16, dom: l, addPanel: a, showPanel: f, begin: function() {
        r = (performance || Date).now();
      }, end: function() {
        t++;
        var n = (performance || Date).now();
        if (v.update(n - r, 200), n > o + 1e3 && (y.update(1e3 * t / (n - o), 100), o = n, t = 0, g)) {
          var i = performance.memory;
          g.update(i.usedJSHeapSize / 1048576, i.jsHeapSizeLimit / 1048576);
        }
        return n;
      }, update: function() {
        r = this.end();
      }, domElement: l, setMode: f };
    };
    return p.Panel = function(a, f, d) {
      var l = 1 / 0, r = 0, o = Math.round, t = o(window.devicePixelRatio || 1), y = 80 * t, v = 48 * t, g = 3 * t, n = 2 * t, i = 3 * t, c = 15 * t, u = 74 * t, m = 30 * t, h = document.createElement("canvas");
      h.width = y, h.height = v, h.style.cssText = "width:80px;height:48px";
      var e = h.getContext("2d");
      return e.font = "bold " + 9 * t + "px Helvetica,Arial,sans-serif", e.textBaseline = "top", e.fillStyle = d, e.fillRect(0, 0, y, v), e.fillStyle = f, e.fillText(a, g, n), e.fillRect(i, c, u, m), e.fillStyle = d, e.globalAlpha = 0.9, e.fillRect(i, c, u, m), { dom: h, update: function(w, S) {
        l = Math.min(l, w), r = Math.max(r, w), e.fillStyle = d, e.globalAlpha = 1, e.fillRect(0, 0, y, c), e.fillStyle = f, e.fillText(o(w) + " " + a + " (" + o(l) + "-" + o(r) + ")", g, n), e.drawImage(h, i + t, c, u - t, m, i, c, u - t, m), e.fillRect(i + u - t, c, t, m), e.fillStyle = d, e.globalAlpha = 0.9, e.fillRect(i + u - t, c, t, o((1 - w / S) * m));
      } };
    }, p;
  });
})(b);
var A = b.exports;
const D = /* @__PURE__ */ M(A);
class j extends T {
  constructor() {
    super(...arguments), this.id = "StatsPlugin";
  }
  async initialize() {
    var x;
    this.stats = new D(), this.stats.dom.id = "stats", (x = R.containerElement) == null || x.appendChild(this.stats.dom), this.stats.dom.style.position = "absolute", this.stats.dom.style.top = "auto", this.stats.dom.style.bottom = "0", this.stats.dom.style.right = "0", this.stats.dom.style.left = "auto", P.shared.add(this.stats.update, this.stats, E.UTILITY);
  }
}
export {
  j as StatsPlugin
};
//# sourceMappingURL=StatsPlugin-NkiR1twn.mjs.map
