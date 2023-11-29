import { Texture } from 'pixi.js';
export interface SpriteAnimationConfig {
    name: string;
    sheet: string;
    numFrames: number;
    zeroPadding: number;
    framerate: number;
    loop: boolean;
    startFrame: number;
    onComplete?: (reversed?: boolean) => void;
    onLoop?: () => void;
}
export type SpriteAnimationProps = Partial<SpriteAnimationConfig> & Required<Pick<SpriteAnimationConfig, 'name' | 'sheet' | 'numFrames'>>;
/**
 * SpriteAnimation
 */
export declare class SpriteAnimation {
    private _frames;
    private _frameRate;
    private _isLooping;
    private _onComplete;
    private _onLoop;
    protected config: SpriteAnimationConfig;
    /**
     * Creates an instance of sprite animation.
     * @param props
     */
    constructor(props: SpriteAnimationProps);
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
    set framerate(value: number);
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
     * @returns frame
     * @param frame
     */
    getFrame(frame: number): Texture;
    /**
     * onComplete
     * @todo SH: Optimize the adding of onComplete callbacks (constructor?)
     * @param callback
     */
    onComplete(callback: (reversed?: boolean) => void): void;
    /**
     * onLoop
     * @param callback
     */
    onLoop(callback: () => void): void;
    /**
     * Fires on complete
     * @param [reversed]
     */
    fireOnComplete(reversed?: boolean): void;
    /**
     * Fires on loop
     */
    fireOnLoop(): void;
}
//# sourceMappingURL=SpriteAnimation.d.ts.map