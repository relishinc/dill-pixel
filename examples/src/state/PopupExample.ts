import ExamplePopup from "@/popups/ExamplePopup.ts";
import {BaseState} from "@/state/BaseState.ts";
import {AssetMapData, broadcast, PopupToken, TextureAtlasAsset, Topics} from "html-living-framework";
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
		this.initClickToOpen = this.initClickToOpen.bind(this);


		this.setHeaderText("Popup Example");
		this.setMainText("Click anywhere to open a popup.");

		// register the popup
		this.app.popups.register(ExamplePopup);

		this.eventMode = 'static';


		// this.initClickToOpen();

		const spr = this.add.sprite('lab', 'buildings');
		spr.width = 100;
		spr.height = 100;
	}

	initClickToOpen() {
		this.once("pointerdown", (e) => {
			broadcast(Topics.SHOW_POPUP, new PopupToken(ExamplePopup.NAME, this.initClickToOpen))
		});
	}
}

export default PopupExample;
