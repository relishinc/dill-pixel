import {Container, ITextStyle, TextStyle} from "pixi.js";
import {MakeFactory} from "./Make";

export class AddFactory {
	private _make: MakeFactory;

	constructor(private defaultContainer: Container) {
		this._make = new MakeFactory();
	}

	sprite(
		pAsset: string,
		pSheet?: string | string[],
		alpha: number = 1,
		x: number = 0,
		y: number = 0,
		anchorX = 0.5,
		anchorY = 0.5,
		scaleX = 1,
		scaleY: number = 1
	) {
		const sprite = this._make.sprite(pAsset, pSheet);
		sprite.alpha = alpha;
		sprite.x = x;
		sprite.y = y;
		sprite.anchor.x = anchorX;
		sprite.anchor.y = anchorY;
		sprite.scale.x = scaleX;
		sprite.scale.y = scaleY === undefined ? scaleX : scaleY;
		return this.defaultContainer.addChild(sprite);
	}

	text(
		pText: string = ``,
		pStyle?: Partial<ITextStyle> | TextStyle,
		alpha: number = 1,
		x: number = 0,
		y: number = 0,
		anchorX = 0.5,
		anchorY = 0.5,
		scaleX = 1,
		scaleY = 1
	) {
		const text = this._make.text(pText, pStyle);
		text.alpha = alpha;
		text.x = x;
		text.y = y;
		text.anchor.x = anchorX;
		text.anchor.y = anchorY;
		text.scale.x = scaleX;
		text.scale.y = scaleY === undefined ? scaleX : scaleY;
		return this.defaultContainer.addChild(text);
	}
}
