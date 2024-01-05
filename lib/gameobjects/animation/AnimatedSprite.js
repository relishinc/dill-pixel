import { Sprite } from 'pixi.js';
import { Dictionary } from 'typescript-collections';
/**
 * Animated sprite
 */
export class AnimatedSprite extends Sprite {
    /**
     * Creates an instance of animated sprite.
     */
    constructor() {
        super();
        this._offset = 0;
        this.anchor.set(0.5);
        this._animations = new Dictionary();
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
    get currentFrame() {
        return this._frame;
    }
    set currentFrame(frame) {
        if (!this._activeAnimation) {
            console.warn(`AnimatedSprite: ${this.constructor.name}:: can't set the current frame before an active animation has been chosen.`);
            return;
        }
        if (frame < 0 || frame > this._activeAnimation.frames) {
            console.warn(`AnimatedSprite: ${this.constructor.name}:: The frame ${frame} is outside of the number of frames for the current animation`);
            return;
        }
        this._frame = frame;
    }
    /**
     * Adds animation
     * @param key
     * @param spriteAnimation
     * @returns animation
     */
    addAnimation(key, spriteAnimation) {
        this._animations.setValue(key, spriteAnimation);
        return spriteAnimation;
    }
    /**
     * Plays animated sprite
     * @param key
     * @param reverse
     * @param startingFrame
     */
    play(key, reverse = false, startingFrame = 0) {
        const anim = this._animations.getValue(key);
        if (anim !== undefined) {
            this._isReversed = reverse;
            this._isPlaying = true;
            this._elapsed = startingFrame ? (startingFrame / anim.frames) * anim.duration : 0;
            this._activeAnimation = anim;
        }
        else {
            console.log(`AnimatedSprite.play: Animation with key ${key} was not found`);
        }
    }
    /**
     * Holds frame
     * @param key
     * @param frame
     */
    holdFrame(key, frame = 0) {
        const anim = this._animations.getValue(key);
        if (anim !== undefined) {
            this._isReversed = false;
            this._isPlaying = false;
            this._elapsed = (frame / anim.frames) * anim.duration;
            this._activeAnimation = anim;
            this.updateFrame();
        }
        else {
            console.log(`AnimatedSprite.holdFrame: Animation with key ${key} not found`);
        }
    }
    /**
     * Updates animated sprite
     * @param deltaTime
     */
    update(deltaTime) {
        if (this._isPlaying) {
            this._elapsed += deltaTime;
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
//# sourceMappingURL=AnimatedSprite.js.map