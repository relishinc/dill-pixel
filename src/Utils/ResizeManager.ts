import {Point} from "pixi.js";
import {Application} from "../Application";
import * as MathUtils from "../Utils/MathUtils";

export class ResizeManager {
	private _sizeMin: Point;
	private _sizeMax: Point;
	private _ratioMin!: number;
	private _ratioMax!: number;

	constructor(
		private app: Application,
		pSizeMin: Point,
		pSizeMax: Point
	) {
		this._sizeMin = pSizeMin;
		this._sizeMax = pSizeMax;
		this.updateRatio();
	}

	public set sizeMin(pSize: Point) {
		this._sizeMin.copyFrom(pSize);
		this.updateRatio();
	}

	public set sizeMax(pSize: Point) {
		this._sizeMax.copyFrom(pSize);
		this.updateRatio();
	}

	private get windowAspectRatio(): number {
		return window.innerWidth / window.innerHeight;
	}

	private get gameAspectRatio(): number {
		return MathUtils.clamp(
			this.windowAspectRatio,
			this._ratioMin,
			this._ratioMax
		);
	}

	public getSize(): Point {
		const size: Point = new Point();
		// TODO:SH: Y scaling is currently not supported. Look into a more flexible solution
		size.y = this._sizeMax.y;
		size.x = size.y * this.gameAspectRatio;
		return size;
	}

	public getStageScale(): number {
		// if the window is wider than we support, fill the entire height
		if (this.gameAspectRatio < this.windowAspectRatio) {
			return window.innerHeight / this.getSize().y;
		}
		// otherwise, window is narrower or equal to what we support, so we fill the entire width
		else {
			return window.innerWidth / this.getSize().x;
		}
	}

	private updateRatio(): void {
		this._ratioMin = this._sizeMin.x / this._sizeMin.y;
		this._ratioMax = this._sizeMax.x / this._sizeMax.y;
	}
}
