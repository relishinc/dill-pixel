"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedSprite = void 0;
const pixi_js_1 = require("pixi.js");
const typescript_collections_1 = require("typescript-collections");
// TODO:SH: Make an "Animation" module containing this and SpriteAnimation
/**
 * Animated sprite
 * @todo SH: Make an "Animation" module containing this and SpriteAnimation
 */
class AnimatedSprite extends pixi_js_1.Sprite {
    /**
     * Creates an instance of animated sprite.
     */
    constructor() {
        super();
        this.anchor.set(0.5);
        this._animations = new typescript_collections_1.Dictionary();
        this._elapsed = -1;
        this._frame = -1;
        this._isPlaying = false;
        this._isReversed = false;
    }
    /**
     * Gets whether is playing
     */
    get isPlaying() {
        return this._isPlaying;
    }
    /**
     * Adds animation
     * @param pKey
     * @param pSpriteAnimation
     * @returns animation
     */
    addAnimation(pKey, pSpriteAnimation) {
        this._animations.setValue(pKey, pSpriteAnimation);
        return pSpriteAnimation;
    }
    /**
     * Plays animated sprite
     * @param pKey
     * @param [pReverse]
     */
    play(pKey, pReverse = false) {
        const anim = this._animations.getValue(pKey);
        if (anim !== undefined) {
            this._isReversed = pReverse;
            this._isPlaying = true;
            this._elapsed = 0;
            this._activeAnimation = anim;
        }
        else {
            console.log("AnimatedSprite.play: Animation with key " + pKey + " not found");
        }
    }
    /**
     * Holds frame
     * @param pKey
     * @param [pFrame]
     */
    holdFrame(pKey, pFrame = 0) {
        const anim = this._animations.getValue(pKey);
        if (anim !== undefined) {
            this._isReversed = false;
            this._isPlaying = false;
            this._elapsed = (pFrame / anim.frames) * anim.duration;
            this._activeAnimation = anim;
            this.updateFrame();
        }
        else {
            console.log("AnimatedSprite.holdFrame: Animation with key " + pKey + " not found");
        }
    }
    /**
     * Updates animated sprite
     * @param pDeltaTime
     */
    update(pDeltaTime) {
        if (this._isPlaying) {
            this._elapsed += pDeltaTime;
            this.updateFrame();
        }
    }
    /**
     * Updates frame
     */
    updateFrame() {
        let looped = false;
        let complete = false;
        if (this._elapsed >= this._activeAnimation.duration) {
            if (this._activeAnimation.isLooping) {
                looped = true;
                this._elapsed %= this._activeAnimation.duration;
            }
            else {
                complete = true;
                this._elapsed = this._activeAnimation.duration;
                this._isPlaying = false;
            }
        }
        let animPerc = this._elapsed / this._activeAnimation.duration;
        if (this._isReversed) {
            animPerc = 1 - animPerc;
        }
        let newFrame = Math.floor(animPerc * this._activeAnimation.frames);
        newFrame = Math.min(Math.max(newFrame, 0), this._activeAnimation.frames - 1);
        if (newFrame !== this._frame) {
            this._frame = newFrame;
            this.texture = this._activeAnimation.getFrame(this._frame);
        }
        // Delaying these calls to avoid any issues with destroying the item in these callbacks
        if (looped) {
            this._activeAnimation.fireOnLoop();
        }
        else if (complete) {
            this._activeAnimation.fireOnComplete(this._isReversed);
        }
    }
}
exports.AnimatedSprite = AnimatedSprite;
//# sourceMappingURL=AnimatedSprite.js.map