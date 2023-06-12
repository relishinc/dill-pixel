"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFactory = void 0;
const Make_1 = require("./Make");
class AddFactory {
    constructor(defaultContainer) {
        this.defaultContainer = defaultContainer;
        this._make = new Make_1.MakeFactory();
    }
    sprite(pAsset, pSheet, x = 0, y = 0, anchorX = 0.5, anchorY = 0.5, scale = 1) {
        const sprite = this._make.sprite(pAsset, pSheet);
        sprite.x = x;
        sprite.y = y;
        sprite.anchor.x = anchorX;
        sprite.anchor.y = anchorY;
        sprite.scale.x = scale;
        sprite.scale.y = scale;
        return this.defaultContainer.addChild(sprite);
    }
    text(pText = ``, pStyle, x = 0, y = 0, anchorX = 0.5, anchorY = 0.5, scale = 1) {
        const text = this._make.text(pText, pStyle);
        text.x = x;
        text.y = y;
        text.anchor.x = anchorX;
        text.anchor.y = anchorY;
        text.scale.x = scale;
        text.scale.y = scale;
        return this.defaultContainer.addChild(text);
    }
}
exports.AddFactory = AddFactory;
//# sourceMappingURL=Add.js.map