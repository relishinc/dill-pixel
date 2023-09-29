import {Sprite} from "pixi.js";
import {Dictionary} from "typescript-collections";
import {SpriteAnimation} from "./SpriteAnimation";

// TODO:SH: Make an "Animation" module containing this and SpriteAnimation
/**
 * Animated sprite
 * @todo SH: Make an "Animation" module containing this and SpriteAnimation
 */
export class AnimatedSprite extends Sprite {
	private _elapsed: number;
	private _frame: number;
	private _animations: Dictionary<string, SpriteAnimation>;
	private _isPlaying: boolean;
	private _isReversed: boolean;
	private _activeAnimation!: SpriteAnimation;

	/**
	 * Creates an instance of animated sprite.
	 */
	constructor() {
		super();
		this.anchor.set(0.5);
		this._animations = new Dictionary<string, SpriteAnimation>();
		this._elapsed = -1;
		this._frame = -1;
		this._isPlaying = false;
		this._isReversed = false;
	}

	/**
	 * Gets whether is playing
	 */
	public get isPlaying(): boolean {
		return this._isPlaying;
	}

	/**
	 * Adds animation
	 * @param pKey
	 * @param pSpriteAnimation
	 * @returns animation
	 */
	public addAnimation(pKey: string, pSpriteAnimation: SpriteAnimation): SpriteAnimation {
		this._animations.setValue(pKey, pSpriteAnimation);
		return pSpriteAnimation;
	}

	/**
	 * Plays animated sprite
	 * @param pKey
	 * @param [pReverse]
	 */
	public play(pKey: string, pReverse: boolean = false): void {
		const anim: SpriteAnimation | undefined = this._animations.getValue(pKey);
		if (anim !== undefined) {
			this._isReversed = pReverse;
			this._isPlaying = true;
			this._elapsed = 0;
			this._activeAnimation = anim;
		} else {
			console.log("AnimatedSprite.play: Animation with key " + pKey + " not found");
		}
	}

	/**
	 * Holds frame
	 * @param pKey
	 * @param [pFrame]
	 */
	public holdFrame(pKey: string, pFrame: number = 0): void {
		const anim: SpriteAnimation | undefined = this._animations.getValue(pKey);
		if (anim !== undefined) {
			this._isReversed = false;
			this._isPlaying = false;
			this._elapsed = (pFrame / anim.frames) * anim.duration;
			this._activeAnimation = anim;
			this.updateFrame();
		} else {
			console.log("AnimatedSprite.holdFrame: Animation with key " + pKey + " not found");
		}

	}

	/**
	 * Updates animated sprite
	 * @param pDeltaTime
	 */
	public update(pDeltaTime: number): void {
		if (this._isPlaying) {
			this._elapsed += pDeltaTime;
			this.updateFrame();
		}
	}

	/**
	 * Updates frame
	 */
	private updateFrame(): void {
		let looped: boolean = false;
		let complete: boolean = false;
		if (this._elapsed >= this._activeAnimation.duration) {
			if (this._activeAnimation.isLooping) {
				looped = true;
				this._elapsed %= this._activeAnimation.duration;
			} else {
				complete = true;
				this._elapsed = this._activeAnimation.duration;
				this._isPlaying = false;
			}
		}
		let animPerc: number = this._elapsed / this._activeAnimation.duration;
		if (this._isReversed) {
			animPerc = 1 - animPerc;
		}
		let newFrame: number = Math.floor(animPerc * this._activeAnimation.frames);
		newFrame = Math.min(Math.max(newFrame, 0), this._activeAnimation.frames - 1);
		if (newFrame !== this._frame) {
			this._frame = newFrame;
			this.texture = this._activeAnimation.getFrame(this._frame);
		}

		// Delaying these calls to avoid any issues with destroying the item in these callbacks
		if (looped) {
			this._activeAnimation.fireOnLoop();
		} else if (complete) {
			this._activeAnimation.fireOnComplete(this._isReversed);
		}
	}
}
