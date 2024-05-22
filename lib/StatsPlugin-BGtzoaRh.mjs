import { Ticker as i, UPDATE_PRIORITY as o } from "pixi.js";
import { P as e, A as n } from "./index-DH1sq-Gb.mjs";
class m extends e {
  constructor() {
    super(...arguments), this.id = "StatsPlugin";
  }
  async initialize() {
    var s;
    const a = await import("./stats.min-D6K70H78.mjs").then((t) => t.s).then((t) => t.default);
    this.stats = new a(), this.stats.dom.id = "stats", (s = n.containerElement) == null || s.appendChild(this.stats.dom), this.stats.dom.style.position = "absolute", this.stats.dom.style.top = "auto", this.stats.dom.style.bottom = "0", this.stats.dom.style.right = "0", this.stats.dom.style.left = "auto", i.shared.add(this.stats.update, this.stats, o.UTILITY);
  }
}
export {
  m as StatsPlugin
};
//# sourceMappingURL=StatsPlugin-BGtzoaRh.mjs.map
