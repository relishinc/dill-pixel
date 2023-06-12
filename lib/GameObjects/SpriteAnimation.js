"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteAnimation = void 0;
const Utils_1 = require("../Utils");
const NumberUtils = __importStar(require("../Utils/NumberUtils"));
/**
 * SpriteAnimation
 */
class SpriteAnimation {
    // TODO:SH: Find a better format for shortening long constructors
    /**
     * Creates an instance of sprite animation.
     * @param pName
     * @param pSheet
     * @param pFrames
     * @param pZeroPadding
     * @param pFramerate
     * @param [pLooping]
     * @param [pStartFrame=0]
     */
    constructor(pName, pSheet, pFrames, pZeroPadding, pFramerate, pLooping = false, pStartFrame = 0) {
        this._frameRate = pFramerate;
        this._isLooping = pLooping;
        this._frames = new Array(pFrames);
        let textureName;
        for (let i = 0; i < pFrames; ++i) {
            textureName = pName + NumberUtils.addZeroPadding((i + pStartFrame).toString(), pZeroPadding);
            this._frames[i] = Utils_1.PixiUtils.getTexture(textureName, pSheet);
        }
    }
    /**
     * Gets number of frames
     */
    get frames() {
        return this._frames.length;
    }
    /**
     * Gets framerate
     */
    get framerate() {
        return this._frameRate;
    }
    /**
     * Sets framerate
     */
    set framerate(pValue) {
        this._frameRate = pValue;
    }
    /**
     * Gets duration (automatically calculated based on framerate)
     */
    get duration() {
        return this._frames.length / this._frameRate;
    }
    /**
     * Gets whether is looping
     */
    get isLooping() {
        return this._isLooping;
    }
    /**
     * Gets a specific frame
     * @param pFrame
     * @returns frame
     */
    getFrame(pFrame) {
        return this._frames[pFrame];
    }
    // TODO:SH: Optimize the adding of onComplete callbacks (constructor?)
    /**
     * onComplete
     * @todo SH: Optimize the adding of onComplete callbacks (constructor?)
     * @param pOnComplete
     */
    onComplete(pOnComplete) {
        this._onComplete = pOnComplete;
    }
    /**
     * onLoop
     * @param pOnLoop
     */
    onLoop(pOnLoop) {
        this._onLoop = pOnLoop;
    }
    /**
     * Fires on complete
     * @param [pReversed]
     */
    fireOnComplete(pReversed) {
        if (this._onComplete !== undefined) {
            this._onComplete(pReversed);
        }
    }
    /**
     * Fires on loop
     */
    fireOnLoop() {
        if (this._onLoop !== undefined) {
            this._onLoop();
        }
    }
}
exports.SpriteAnimation = SpriteAnimation;
//# sourceMappingURL=SpriteAnimation.js.map