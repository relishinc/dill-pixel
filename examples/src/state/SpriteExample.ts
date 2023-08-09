import ExamplePopup from "@/popups/ExamplePopup.ts";
import {BaseState} from "@/state/BaseState.ts";
import {AssetMapData, AssetType, TextureAsset, TextureAtlasAsset} from "html-living-framework";
import {Point} from "pixi.js";

class SpriteExample extends BaseState {
	public static get NAME(): string {
		return "SpriteExample";
	}

	public static get Assets(): AssetMapData[] {
		return [
			new TextureAsset("pickle", AssetType.PNG),
			new TextureAtlasAsset("buildings")
		];
	}

	init(pSize: Point) {
		super.init(pSize);

		this.setHeaderText("Sprite Example");
		this.setMainText("Static and Texture Atlas Sprites");

		// register the popup
		this.app.popups.register(ExamplePopup);

		this.eventMode = 'static';

		const spr = this.add.sprite('pickle', null, 1, [-150, 150], 0.5);
		const textureAtlasSprite = this.add.sprite('lab', 'buildings', 1, [150, 150]);
	}
}

export default SpriteExample;
