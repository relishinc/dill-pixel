import {IHitArea} from "pixi.js";
import {PixiShape} from "../Utils/PixiUtils";

/**
 * Compound hit area
 */
export class CompoundHitArea implements IHitArea {
	private _components: PixiShape[];

	constructor(pComponents: PixiShape[]) {
		this._components = pComponents;
	}

	/**
	 * Gets components
	 */
	public get components(): PixiShape[] {
		return this._components;
	}

	/**
	 * contains
	 * @param pX
	 * @param pY
	 * @returns boolean
	 */
	public contains(pX: number, pY: number): boolean {
		for (let i = 0; i < this._components.length; ++i) {
			if (this._components[i].contains(pX, pY)) {
				return true;
			}
		}
		return false;
	}
}
