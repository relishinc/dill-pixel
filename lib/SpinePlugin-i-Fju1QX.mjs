import { P as a } from "./index-CSWyW782.mjs";
import { extensions as i } from "pixi.js";
class p extends a {
  constructor() {
    super(...arguments), this.id = "SpinePlugin";
  }
  async initialize() {
    await import("./index-COi_UROb.mjs").then(({ Spine: n, spineTextureAtlasLoader: t, spineLoaderExtension: e, SpinePipe: s }) => {
      i.add(t), i.add(e), i.add(s), window.Spine = n;
    });
  }
}
export {
  p as SpinePlugin
};
//# sourceMappingURL=SpinePlugin-i-Fju1QX.mjs.map
