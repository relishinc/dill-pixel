import { P as a, L as s } from "./index-DH1sq-Gb.mjs";
import { extensions as i } from "pixi.js";
class g extends a {
  constructor() {
    super(...arguments), this.id = "SpinePlugin";
  }
  async initialize() {
    await import("./index-COi_UROb.mjs").then(({ Spine: n, spineTextureAtlasLoader: e, spineLoaderExtension: o, SpinePipe: t }) => {
      s.log("Spine loaded"), i.add(e), i.add(o), i.add(t), window.Spine = n;
    });
  }
}
export {
  g as SpinePlugin
};
//# sourceMappingURL=SpinePlugin-ohh7bPTL.mjs.map
