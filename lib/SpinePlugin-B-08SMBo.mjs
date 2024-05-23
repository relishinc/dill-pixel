import { P as a } from "./index-DyK5nbTZ.mjs";
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
//# sourceMappingURL=SpinePlugin-B-08SMBo.mjs.map
