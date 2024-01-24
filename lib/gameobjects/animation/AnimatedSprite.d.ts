import { Sprite } from '../Sprite';
import { SpriteAnimation } from './SpriteAnimation';
/**
 * Animated sprite
 */
export declare class AnimatedSprite extends Sprite {
    private _offset;
    private _elapsed;
    private _frame;
    private _animations;
    private _isPlaying;
    private _isReversed;
    private _activeAnimation;
    /**
     * Creates an instance of animated sprite.
     */
    constructor();
    /**
     * Gets whether is playing
     */
    get isPlaying(): boolean;
    get currentFrame(): number;
    set currentFrame(frame: number);
    /**
     * Adds animation
     * @param key
     * @param spriteAnimation
     * @returns animation
     */
    addAnimation(key: string, spriteAnimation: SpriteAnimation): SpriteAnimation;
    /**
     * Plays animated sprite
     * @param key
     * @param reverse
     * @param startingFrame
     */
    play(key: string, reverse?: boolean, startingFrame?: number): void;
    /**
     * Holds frame
     * @param key
     * @param frame
     */
    holdFrame(key: string, frame?: number): void;
    /**
     * Updates animated sprite
     * @param deltaTime
     */
    update(deltaTime: number): void;
    /**
     * Updates frame
     */
    private updateFrame;
}
//# sourceMappingURL=AnimatedSprite.d.ts.map