import * as PIXI from "pixi.js";
import { SpriteAnimation } from "./SpriteAnimation";
/**
 * Animated sprite
 * @todo SH: Make an "Animation" module containing this and SpriteAnimation
 */
export declare class AnimatedSprite extends PIXI.Sprite {
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
    /**
     * Adds animation
     * @param pKey
     * @param pSpriteAnimation
     * @returns animation
     */
    addAnimation(pKey: string, pSpriteAnimation: SpriteAnimation): SpriteAnimation;
    /**
     * Plays animated sprite
     * @param pKey
     * @param [pReverse]
     */
    play(pKey: string, pReverse?: boolean): void;
    /**
     * Holds frame
     * @param pKey
     * @param [pFrame]
     */
    holdFrame(pKey: string, pFrame?: number): void;
    /**
     * Updates animated sprite
     * @param pDeltaTime
     */
    update(pDeltaTime: number): void;
    /**
     * Updates frame
     */
    private updateFrame;
}
//# sourceMappingURL=AnimatedSprite.d.ts.map