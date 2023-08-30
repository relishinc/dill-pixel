import {IHitArea, Point, Renderer, Sprite} from "pixi.js";
import * as MathUtils from "../Utils/MathUtils";

/**
 * Pixel perfect hit area
 */
export class PixelPerfectHitArea implements IHitArea {
	private _map: boolean[][];
	private _target: Sprite;
	private _norm: Point;
	private _pixel: Point;

	constructor(pRenderer: Renderer, pTarget: Sprite, pThreshhold: number = 0) {
		this._target = pTarget;
		this._norm = new Point();
		this._pixel = new Point();
		const data = pRenderer.plugins.extract.pixels(
			pTarget,
		);
		let widthOffset: number = 0;
		let heightOffset: number = 0;
		// Apply offset to measurements to account for decimal values when using retina assets
		if (pTarget.texture.width % 1 !== 0) {
			widthOffset = -0.5;
		}
		if (pTarget.texture.height % 1 !== 0) {
			heightOffset = -0.5;
		}

		this._map = new Array<boolean[]>();
		for (let x = 0; x < pTarget.texture.width + widthOffset; ++x) {
			this._map.push(new Array<boolean>());
			for (let y = 0; y < pTarget.texture.height + heightOffset; ++y) {
				this._map[x][y] = data[(y * (pTarget.texture.width + widthOffset) + x) * 4 + 3] > pThreshhold;
			}
		}
	}

	/**
	 * Gets width
	 */
	public get width(): number {
		return this._map.length;
	}

	/**
	 * Gets scaled width
	 */
	public get scaledWidth(): number {
		return this.width * this._target.scale.x;
	}

	/**
	 * Gets height
	 */
	public get height(): number {
		return this._map[0].length;
	}

	/**
	 * Gets scaled height
	 */
	public get scaledHeight(): number {
		return this.height * this._target.scale.y;
	}

	/**
	 * Gets hit area at pixel
	 * @param pX
	 * @param pY
	 * @returns boolean
	 */
	public getHitAreaAtPixel(pX: number, pY: number): boolean {
		return this._map[pX][pY];
	}

	/**
	 * Contains pixel perfect hit area
	 * @param pX
	 * @param pY
	 * @returns boolean
	 */
	public contains(pX: number, pY: number): boolean {
		this._norm.x = (pX + this.width * this._target.anchor.x) / this.width;
		this._norm.y = (pY + this.height * this._target.anchor.y) / this.height;

		// If we are within the bounds of the texture
		if (this._norm.x >= 0 && this._norm.x <= 1 && this._norm.y >= 0 && this._norm.y <= 1) {
			this._pixel.x = Math.floor(MathUtils.clamp(
				this._norm.x * this._map.length,
				0,
				this._map.length - 1,
			));
			this._pixel.y = Math.floor(MathUtils.clamp(
				this._norm.y * this._map[0].length,
				0,
				this._map[0].length - 1,
			));
			return this._map[this._pixel.x][this._pixel.y];
		} else {
			return false;
		}
	}
}
