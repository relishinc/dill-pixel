import { Make } from '../../utils';
import * as NumberUtils from '../../utils/NumberUtils';
const defaultConfig = {
    zeroPadding: 0,
    framerate: 60,
    loop: false,
    startFrame: 0,
};
/**
 * SpriteAnimation
 */
export class SpriteAnimation {
    /**
     * Creates an instance of sprite animation.
     * @param props
     */
    constructor(props) {
        this.config = { ...defaultConfig, ...props };
        this._frameRate = this.config.framerate;
        this._isLooping = this.config.loop;
        this._frames = [];
        let textureName;
        for (let i = 0; i < this.config.numFrames; ++i) {
            textureName =
                this.config.name + NumberUtils.addZeroPadding((i + this.config.startFrame).toString(), this.config.zeroPadding);
            this._frames[i] = Make.texture(textureName, this.config.sheet);
        }
        if (this.config.onComplete) {
            this._onComplete = this.config.onComplete;
        }
        if (this.config.onLoop) {
            this._onLoop = this.config.onLoop;
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
    set framerate(value) {
        this._frameRate = value;
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
     * @returns frame
     * @param frame
     */
    getFrame(frame) {
        return this._frames[frame];
    }
    // TODO:SH: Optimize the adding of onComplete callbacks (constructor?)
    /**
     * onComplete
     * @todo SH: Optimize the adding of onComplete callbacks (constructor?)
     * @param callback
     */
    onComplete(callback) {
        this._onComplete = callback;
    }
    /**
     * onLoop
     * @param callback
     */
    onLoop(callback) {
        this._onLoop = callback;
    }
    /**
     * Fires on complete
     * @param [reversed]
     */
    fireOnComplete(reversed) {
        if (this._onComplete !== undefined) {
            this._onComplete(reversed);
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
//# sourceMappingURL=SpriteAnimation.js.map