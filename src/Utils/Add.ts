import {MakeFactory} from "./Make";
import {Container, ITextStyle, TextStyle} from "pixi.js";

export class AddFactory {
    private _make: MakeFactory;

    constructor(private defaultContainer: Container) {
        this._make = new MakeFactory();
    }

    sprite(pAsset: string, pSheet?: string | string[], x: number = 0, y: number = 0, anchorX = 0.5, anchorY = 0.5, scale = 1) {
        const sprite = this._make.sprite(pAsset, pSheet);
        sprite.x = x;
        sprite.y = y;
        sprite.anchor.x = anchorX;
        sprite.anchor.y = anchorY;
        sprite.scale.x = scale;
        sprite.scale.y = scale;
        return this.defaultContainer.addChild(sprite);
    }

    text(pText:string = ``, pStyle?: Partial<ITextStyle> | TextStyle, x: number = 0, y: number = 0, anchorX = 0.5, anchorY = 0.5, scale = 1) {
        const text = this._make.text(pText,pStyle);
        text.x = x;
        text.y = y;
        text.anchor.x = anchorX;
        text.anchor.y = anchorY;
        text.scale.x = scale;
        text.scale.y = scale;
        return this.defaultContainer.addChild(text);
    }
}
