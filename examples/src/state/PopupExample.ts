import ExamplePopup from "@/popups/ExamplePopup.ts";
import {BaseState} from "@/state/BaseState.ts";
import {AssetMapData, PopupToken, showPopup, TextureAtlasAsset} from "html-living-framework";
import {Point} from "pixi.js";

class PopupExample extends BaseState {
	public static get NAME(): string {
		return "PopupExample";
	}

	public static get Assets(): AssetMapData[] {
		return [
			new TextureAtlasAsset("buildings")
		];
	}

	init(pSize: Point) {
		super.init(pSize);
		//
		this.setHeaderText("Popup Example");
		this.setMainText("Click anywhere to open a popup.");

		// register the popup
		this.app.popups.register(ExamplePopup);
		this.eventMode = 'static';

		console.log("hiihihihiih");
		this.initClickToOpen();
	}

	initClickToOpen() {
		this.on("pointerdown", (e) => {
			showPopup(new PopupToken(ExamplePopup.NAME))
		});
	}
}

export default PopupExample;
