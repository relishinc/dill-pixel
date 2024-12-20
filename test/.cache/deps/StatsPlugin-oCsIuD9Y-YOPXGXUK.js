import {
  O,
  v
} from "./chunk-D37FA67I.js";
import "./chunk-IF2C3KLE.js";
import "./chunk-AYLFXNJK.js";
import "./chunk-3OY5PPQQ.js";
import "./chunk-TDGCD75C.js";
import "./chunk-MKM4NCB5.js";
import "./chunk-ULUUGPA3.js";
import {
  Ticker,
  UPDATE_PRIORITY
} from "./chunk-5TVQ26FI.js";

// node_modules/dill-pixel/lib/StatsPlugin-oCsIuD9Y.js
function _(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var S = { exports: {} };
var M = S.exports;
var P;
function A() {
  return P || (P = 1, function(o, w) {
    (function(p, s) {
      o.exports = s();
    })(M, function() {
      var p = function() {
        function s(n) {
          return a.appendChild(n.dom), n;
        }
        function f(n) {
          for (var i = 0; i < a.children.length; i++) a.children[i].style.display = i === n ? "block" : "none";
          c = n;
        }
        var c = 0, a = document.createElement("div");
        a.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000", a.addEventListener("click", function(n) {
          n.preventDefault(), f(++c % a.children.length);
        }, false);
        var r = (performance || Date).now(), l = r, t = 0, y = s(new p.Panel("FPS", "#0ff", "#002")), x = s(new p.Panel("MS", "#0f0", "#020"));
        if (self.performance && self.performance.memory) var v2 = s(new p.Panel("MB", "#f08", "#201"));
        return f(0), { REVISION: 16, dom: a, addPanel: s, showPanel: f, begin: function() {
          r = (performance || Date).now();
        }, end: function() {
          t++;
          var n = (performance || Date).now();
          if (x.update(n - r, 200), n > l + 1e3 && (y.update(1e3 * t / (n - l), 100), l = n, t = 0, v2)) {
            var i = performance.memory;
            v2.update(i.usedJSHeapSize / 1048576, i.jsHeapSizeLimit / 1048576);
          }
          return n;
        }, update: function() {
          r = this.end();
        }, domElement: a, setMode: f };
      };
      return p.Panel = function(s, f, c) {
        var a = 1 / 0, r = 0, l = Math.round, t = l(window.devicePixelRatio || 1), y = 80 * t, x = 48 * t, v2 = 3 * t, n = 2 * t, i = 3 * t, d = 15 * t, u = 74 * t, m = 30 * t, h = document.createElement("canvas");
        h.width = y, h.height = x, h.style.cssText = "width:80px;height:48px";
        var e = h.getContext("2d");
        return e.font = "bold " + 9 * t + "px Helvetica,Arial,sans-serif", e.textBaseline = "top", e.fillStyle = c, e.fillRect(0, 0, y, x), e.fillStyle = f, e.fillText(s, v2, n), e.fillRect(i, d, u, m), e.fillStyle = c, e.globalAlpha = 0.9, e.fillRect(i, d, u, m), { dom: h, update: function(g, E) {
          a = Math.min(a, g), r = Math.max(r, g), e.fillStyle = c, e.globalAlpha = 1, e.fillRect(0, 0, y, d), e.fillStyle = f, e.fillText(l(g) + " " + s + " (" + l(a) + "-" + l(r) + ")", v2, n), e.drawImage(h, i + t, d, u - t, m, i, d, u - t, m), e.fillRect(i + u - t, d, t, m), e.fillStyle = c, e.globalAlpha = 0.9, e.fillRect(i + u - t, d, t, l((1 - g / E) * m));
        } };
      }, p;
    });
  }(S)), S.exports;
}
var D = A();
var k = _(D);
var O2 = class extends O {
  constructor() {
    super(...arguments), this.id = "StatsPlugin";
  }
  async initialize() {
    var w;
    this.stats = new k(), this.stats.dom.id = "stats", (w = v.containerElement) == null || w.appendChild(this.stats.dom), this.stats.dom.style.position = "absolute", this.stats.dom.style.top = "auto", this.stats.dom.style.bottom = "0", this.stats.dom.style.right = "0", this.stats.dom.style.left = "auto", Ticker.shared.add(this.stats.update, this.stats, UPDATE_PRIORITY.UTILITY);
  }
};
export {
  O2 as StatsPlugin
};
//# sourceMappingURL=StatsPlugin-oCsIuD9Y-YOPXGXUK.js.map
