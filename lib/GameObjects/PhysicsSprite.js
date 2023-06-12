"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicsSprite = exports.BodyType = void 0;
const matter_js_1 = require("matter-js");
const pixi_js_1 = require("pixi.js");
const Application_1 = require("../Application");
const utils_1 = require("../Utils/Factory/utils");
var BodyType;
(function (BodyType) {
    BodyType["RECTANGLE"] = "rectangle";
    BodyType["CIRCLE"] = "circle";
    BodyType["CONVEX"] = "convex";
    BodyType["TRAPEZOID"] = "trapezoid";
    BodyType["POLYGON"] = "polygon";
    BodyType["CHAMFER"] = "chamfer";
})(BodyType = exports.BodyType || (exports.BodyType = {}));
class PhysicsSprite extends pixi_js_1.Container {
    constructor(pTexture, pSheet, pSize, pBodyType = BodyType.RECTANGLE) {
        super();
        this.onAdded = this.onAdded.bind(this);
        this.sprite = typeof pTexture === 'string' ? this.addChild(this.app.make.sprite(pTexture, pSheet)) : this.addChild(new pixi_js_1.Sprite(pTexture));
        this.sprite.anchor.set(0.5, 0.5);
        // if (pPosition) {
        // 	const resolvedPosition = resolveXYFromObjectOrArray(pPosition);
        // 	this.x = resolvedPosition.x;
        // 	this.y = resolvedPosition.y;
        // }
        if (pSize) {
            this._size = (0, utils_1.resolveXYFromObjectOrArray)(pSize);
            this.sprite.width = this._size.x;
            this.sprite.height = this._size.y;
        }
        this._bodyType = pBodyType;
        this.on('added', this.onAdded);
        this.on('removed', this.onRemoved);
    }
    get debugColor() {
        return PhysicsSprite.DEFAULT_DEBUG_COLOR;
    }
    get app() {
        return Application_1.Application.instance;
    }
    onAdded() {
        this.createBody();
        this.app.physics.add(this);
    }
    onRemoved() {
        this.app.physics.remove(this.body);
    }
    createBody() {
        switch (this._bodyType) {
            case BodyType.RECTANGLE:
                this.body = matter_js_1.Bodies.rectangle(this.x, this.y, this.sprite.width, this.sprite.height);
                break;
            case BodyType.CIRCLE:
                this.body = matter_js_1.Bodies.circle(this.x, this.y, this.sprite.width * 0.5);
                break;
            case BodyType.CONVEX:
                // this.body = Bodies.fromVertices(this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height);
                break;
            case BodyType.TRAPEZOID:
                this.body = matter_js_1.Bodies.trapezoid(this.x, this.y, this.sprite.width, this.sprite.height, 0.5);
                break;
        }
    }
    update() {
        if (this.sprite && this.body) {
            this.x = this.body.position.x;
            this.y = this.body.position.y;
            this.rotation = this.body.angle;
        }
    }
}
PhysicsSprite.DEFAULT_DEBUG_COLOR = 0x29c5f6;
exports.PhysicsSprite = PhysicsSprite;
//# sourceMappingURL=PhysicsSprite.js.map