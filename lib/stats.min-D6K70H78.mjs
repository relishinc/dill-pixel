function _(i, w) {
  for (var c = 0; c < w.length; c++) {
    const l = w[c];
    if (typeof l != "string" && !Array.isArray(l)) {
      for (const r in l)
        if (r !== "default" && !(r in i)) {
          const f = Object.getOwnPropertyDescriptor(l, r);
          f && Object.defineProperty(i, r, f.get ? f : {
            enumerable: !0,
            get: () => l[r]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }));
}
var E = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function j(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var x = { exports: {} };
(function(i, w) {
  (function(c, l) {
    i.exports = l();
  })(E, function() {
    var c = function() {
      function l(n) {
        return a.appendChild(n.dom), n;
      }
      function r(n) {
        for (var o = 0; o < a.children.length; o++)
          a.children[o].style.display = o === n ? "block" : "none";
        f = n;
      }
      var f = 0, a = document.createElement("div");
      a.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000", a.addEventListener("click", function(n) {
        n.preventDefault(), r(++f % a.children.length);
      }, !1);
      var d = (performance || Date).now(), s = d, e = 0, g = l(new c.Panel("FPS", "#0ff", "#002")), v = l(new c.Panel("MS", "#0f0", "#020"));
      if (self.performance && self.performance.memory)
        var h = l(new c.Panel("MB", "#f08", "#201"));
      return r(0), { REVISION: 16, dom: a, addPanel: l, showPanel: r, begin: function() {
        d = (performance || Date).now();
      }, end: function() {
        e++;
        var n = (performance || Date).now();
        if (v.update(n - d, 200), n > s + 1e3 && (g.update(1e3 * e / (n - s), 100), s = n, e = 0, h)) {
          var o = performance.memory;
          h.update(o.usedJSHeapSize / 1048576, o.jsHeapSizeLimit / 1048576);
        }
        return n;
      }, update: function() {
        d = this.end();
      }, domElement: a, setMode: r };
    };
    return c.Panel = function(l, r, f) {
      var a = 1 / 0, d = 0, s = Math.round, e = s(window.devicePixelRatio || 1), g = 80 * e, v = 48 * e, h = 3 * e, n = 2 * e, o = 3 * e, p = 15 * e, u = 74 * e, m = 30 * e, y = document.createElement("canvas");
      y.width = g, y.height = v, y.style.cssText = "width:80px;height:48px";
      var t = y.getContext("2d");
      return t.font = "bold " + 9 * e + "px Helvetica,Arial,sans-serif", t.textBaseline = "top", t.fillStyle = f, t.fillRect(0, 0, g, v), t.fillStyle = r, t.fillText(l, h, n), t.fillRect(o, p, u, m), t.fillStyle = f, t.globalAlpha = 0.9, t.fillRect(o, p, u, m), { dom: y, update: function(b, P) {
        a = Math.min(a, b), d = Math.max(d, b), t.fillStyle = f, t.globalAlpha = 1, t.fillRect(0, 0, g, p), t.fillStyle = r, t.fillText(s(b) + " " + l + " (" + s(a) + "-" + s(d) + ")", h, n), t.drawImage(y, o + e, p, u - e, m, o, p, u - e, m), t.fillRect(o + u - e, p, e, m), t.fillStyle = f, t.globalAlpha = 0.9, t.fillRect(o + u - e, p, e, s((1 - b / P) * m));
      } };
    }, c;
  });
})(x);
var S = x.exports;
const M = /* @__PURE__ */ j(S), O = /* @__PURE__ */ _({
  __proto__: null,
  default: M
}, [S]);
export {
  O as s
};
//# sourceMappingURL=stats.min-D6K70H78.mjs.map
