import {Container, Graphics, IBitmapTextStyle, ITextStyle, TextStyle} from "pixi.js";
import {Application} from "../../Application";
import {MakeFactory} from "./Make";
import {resolveXYFromObjectOrArray} from "./utils";

export class AddFactory {
	private _make: MakeFactory;

	constructor(private defaultContainer: Container) {
		this._make = new MakeFactory();
	}

	existing(pObject: any) {
		return this.defaultContainer.addChild(pObject);
	}

	coloredSprite(color: number = 0x0, alpha: number = 1, position: {
		x: number;
		y: number
	} | [number, number?] | number = {
		x: 0,
		y: 0
	}, anchor: { x: number; y: number } | [number, number?] | number = {x: 0.5, y: 0.5}, scale: {
		x: number;
		y: number
	} | [number, number?] | number = {x: 1, y: 1}) {
		const gfx = new Graphics();
		gfx.beginFill(color);
		gfx.drawRect(0, 0, 1, 1);
		gfx.endFill();

		const sprite = this._make.sprite(Application.instance.renderer.generateTexture(gfx));
		sprite.tint = color;
		sprite.alpha = alpha;

		const resolvedPosition = resolveXYFromObjectOrArray(position);
		const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
		const resolvedScale = resolveXYFromObjectOrArray(scale);

		sprite.x = resolvedPosition.x;
		sprite.y = resolvedPosition.y;
		sprite.anchor.x = resolvedAnchor.x;
		sprite.anchor.y = resolvedAnchor.y;
		sprite.scale.x = resolvedScale.x;
		sprite.scale.y = resolvedScale.y

		return this.defaultContainer.addChild(sprite);
	}

	sprite(
		pAsset: string,
		pSheet?: string | string[] | undefined,
		alpha: number = 1,
		position: { x: number; y: number } | [number, number?] | number = {x: 0, y: 0},
		anchor: { x: number; y: number } | [number, number?] | number = {x: 0.5, y: 0.5},
		scale: { x: number; y: number } | [number, number?] | number = {x: 1, y: 1},
	) {
		const sprite = this._make.sprite(pAsset, pSheet);
		sprite.alpha = alpha;

		const resolvedPosition = resolveXYFromObjectOrArray(position);
		const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
		const resolvedScale = resolveXYFromObjectOrArray(scale);

		sprite.x = resolvedPosition.x;
		sprite.y = resolvedPosition.y;
		sprite.anchor.x = resolvedAnchor.x;
		sprite.anchor.y = resolvedAnchor.y;
		sprite.scale.x = resolvedScale.x;
		sprite.scale.y = resolvedScale.y

		return this.defaultContainer.addChild(sprite);
	}

	text(
		pText: string = ``,
		pStyle?: Partial<ITextStyle> | TextStyle,
		alpha: number = 1,
		position: { x: number; y: number } | [number, number?] | number = {x: 0, y: 0},
		anchor: { x: number; y: number } | [number, number?] | number = {x: 0.5, y: 0.5},
		scale: { x: number; y: number } | [number, number?] | number = {x: 1, y: 1},
	) {
		const text = this._make.text(pText, pStyle);
		text.alpha = alpha;

		const resolvedPosition = resolveXYFromObjectOrArray(position);
		const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
		const resolvedScale = resolveXYFromObjectOrArray(scale);

		text.x = resolvedPosition.x;
		text.y = resolvedPosition.y;
		text.anchor.x = resolvedAnchor.x;
		text.anchor.y = resolvedAnchor.y;
		text.scale.x = resolvedScale.x;
		text.scale.y = resolvedScale.y

		return this.defaultContainer.addChild(text);
	}

	// Add BitmapText
	bitmapText(
		pText: string,
		pStyle?: IBitmapTextStyle,
		alpha: number = 1,
		position: { x: number; y: number } | [number, number?] | number = {x: 0, y: 0},
		anchor: { x: number; y: number } | [number, number?] | number = {x: 0.5, y: 0.5},
		scale: { x: number; y: number } | [number, number?] | number = {x: 1, y: 1},
	) {
		const bitmapText = this._make.bitmapText(pText, pStyle);
		bitmapText.alpha = alpha;

		const resolvedPosition = resolveXYFromObjectOrArray(position);
		const resolvedAnchor = resolveXYFromObjectOrArray(anchor);
		const resolvedScale = resolveXYFromObjectOrArray(scale);

		bitmapText.x = resolvedPosition.x;
		bitmapText.y = resolvedPosition.y;
		bitmapText.anchor.x = resolvedAnchor.x;
		bitmapText.anchor.y = resolvedAnchor.y;
		bitmapText.scale.x = resolvedScale.x;
		bitmapText.scale.y = resolvedScale.y;

		return this.defaultContainer.addChild(bitmapText);
	}

	// Add Container
	container(
		alpha: number = 1,
		position: { x: number; y: number } | [number, number?] | number = {x: 0, y: 0},
		scale: { x: number; y: number } | [number, number?] | number = {x: 1, y: 1},
	) {
		const container = this._make.container();
		container.alpha = alpha;

		const resolvedPosition = resolveXYFromObjectOrArray(position);
		const resolvedScale = resolveXYFromObjectOrArray(scale);

		container.x = resolvedPosition.x;
		container.y = resolvedPosition.y;
		container.scale.x = resolvedScale.x;
		container.scale.y = resolvedScale.y;

		return this.defaultContainer.addChild(container);
	}

	// Add Graphics
	graphics(
		alpha: number = 1,
		position: { x: number; y: number } | [number, number?] | number = {x: 0, y: 0},
		scale: { x: number; y: number } | [number, number?] | number = {x: 1, y: 1},
	) {
		const graphics = this._make.graphics();
		graphics.alpha = alpha;

		const resolvedPosition = resolveXYFromObjectOrArray(position);
		const resolvedScale = resolveXYFromObjectOrArray(scale);

		graphics.x = resolvedPosition.x;
		graphics.y = resolvedPosition.y;
		graphics.scale.x = resolvedScale.x;
		graphics.scale.y = resolvedScale.y;

		return this.defaultContainer.addChild(graphics);
	}


}
