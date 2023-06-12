"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnchorManager = exports.AnchorPosition = void 0;
const Data_1 = require("../Data");
var AnchorPosition;
(function (AnchorPosition) {
    AnchorPosition["TOP_LEFT"] = "top left";
    AnchorPosition["LEFT"] = "left";
    AnchorPosition["BOTTOM_LEFT"] = "bottom left";
    AnchorPosition["TOP"] = "top";
    AnchorPosition["TOP_RIGHT"] = "top right";
    AnchorPosition["RIGHT"] = "right";
    AnchorPosition["BOTTOM_RIGHT"] = "bottom right";
    AnchorPosition["BOTTOM"] = "bottom";
    AnchorPosition["CENTER"] = "center";
})(AnchorPosition = exports.AnchorPosition || (exports.AnchorPosition = {}));
class AnchorManager {
    constructor(app, container) {
        this.app = app;
        this.container = container;
        this.width = 0;
        this.height = 0;
        this._registry = new Map();
        this.updatePositions = this.updatePositions.bind(this);
        this.width = this.container.width;
        this.height = this.container.height;
        this.app.subscribe(Data_1.LOAD_COMPLETE, this.updatePositions);
        this.app.subscribe(Data_1.STATE_INIT, this.updatePositions);
    }
    anchor(object, anchorPosition, padding, container) {
        this._registry.set(object, { anchorPosition, padding, container });
        this.positionObject(object, { anchorPosition, padding, container });
    }
    setSize(size) {
        this.width = size.x;
        this.height = size.y;
        this.updatePositions();
    }
    positionObject(object, value) {
        const anchorPosition = value.anchorPosition;
        const padding = (value === null || value === void 0 ? void 0 : value.padding) || { top: 0, left: 0, right: 0, bottom: 0 };
        const container = (value === null || value === void 0 ? void 0 : value.container) || this.container;
        switch (anchorPosition) {
            // tl
            case AnchorPosition.TOP_LEFT:
                object.anchor.set(0, 0);
                object.position.set(container.x - this.width * 0.5 + this.renderPadding(padding === null || padding === void 0 ? void 0 : padding.left), container.y - this.height * 0.5 + this.renderPadding(padding === null || padding === void 0 ? void 0 : padding.top));
                break;
            // l
            case AnchorPosition.LEFT:
                object.anchor.set(0, 0.5);
                object.position.set(container.x - this.width * 0.5 + this.renderPadding(padding === null || padding === void 0 ? void 0 : padding.left), container.y);
                break;
            // bl
            case AnchorPosition.BOTTOM_LEFT:
                object.anchor.set(0, 1);
                object.position.set(container.x - this.width * 0.5 + this.renderPadding(padding === null || padding === void 0 ? void 0 : padding.left), container.y + this.height * 0.5 - this.renderPadding(padding === null || padding === void 0 ? void 0 : padding.bottom));
                break;
            // tr
            case AnchorPosition.TOP_RIGHT:
                object.anchor.set(1, 0);
                object.position.set(container.x + this.width * 0.5 - this.renderPadding(padding === null || padding === void 0 ? void 0 : padding.right), container.y - this.height * 0.5 + this.renderPadding(padding === null || padding === void 0 ? void 0 : padding.top));
                break;
            // r
            case AnchorPosition.RIGHT:
                object.anchor.set(1, 0.5);
                object.position.set(container.x + this.width * 0.5 - this.renderPadding(padding === null || padding === void 0 ? void 0 : padding.right), container.y);
                break;
            // br
            case AnchorPosition.BOTTOM_RIGHT:
                object.anchor.set(1, 1);
                object.position.set(container.x + this.width * 0.5 - this.renderPadding(padding === null || padding === void 0 ? void 0 : padding.right), container.y + this.height * 0.5 - this.renderPadding(padding === null || padding === void 0 ? void 0 : padding.bottom));
                break;
            // t
            case AnchorPosition.TOP:
                object.anchor.set(0.5, 0);
                object.position.set(container.x, container.y - this.height * 0.5 + this.renderPadding(padding === null || padding === void 0 ? void 0 : padding.top));
                break;
            // b
            case AnchorPosition.BOTTOM:
                object.anchor.set(0.5, 1);
                object.position.set(container.x, container.y + this.height * 0.5 - this.renderPadding(padding === null || padding === void 0 ? void 0 : padding.bottom));
                break;
        }
    }
    renderPadding(padding) {
        if (!padding) {
            return 0;
        }
        if (typeof padding === "number") {
            return padding;
        }
        return padding();
    }
    updatePositions() {
        this._registry.forEach((value, key) => {
            this.positionObject(key, value);
        });
    }
}
exports.AnchorManager = AnchorManager;
//# sourceMappingURL=Anchor.js.map