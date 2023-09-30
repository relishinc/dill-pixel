import { Texture } from 'pixi.js';
/**
 * SpriteAnimation
 */
export declare class SpriteAnimation {
    private _frames;
    private _frameRate;
    private _isLooping;
    private _onComplete;
    private _onLoop;
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
    constructor(pName: string, pSheet: string | string[], pFrames: number, pZeroPadding: number, pFramerate: number, pLooping?: boolean, pStartFrame?: number);
    /**
     * Gets number of frames
     */
    get frames(): number;
    /**
     * Gets framerate
     */
    get framerate(): number;
    /**
     * Sets framerate
     */
    set framerate(pValue: number);
    /**
     * Gets duration (automatically calculated based on framerate)
     */
    get duration(): number;
    /**
     * Gets whether is looping
     */
    get isLooping(): boolean;
    /**
     * Gets a specific frame
     * @param pFrame
     * @returns frame
     */
    getFrame(pFrame: number): Texture;
    /**
     * onComplete
     * @todo SH: Optimize the adding of onComplete callbacks (constructor?)
     * @param pOnComplete
     */
    onComplete(pOnComplete: (pReversed?: boolean) => void): void;
    /**
     * onLoop
     * @param pOnLoop
     */
    onLoop(pOnLoop: () => void): void;
    /**
     * Fires on complete
     * @param [pReversed]
     */
    fireOnComplete(pReversed?: boolean): void;
    /**
     * Fires on loop
     */
    fireOnLoop(): void;
}
//# sourceMappingURL=SpriteAnimation.d.ts.map