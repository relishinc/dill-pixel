import ExamplePopup from "@/popups/ExamplePopup.ts";
import {BaseState} from "@/state/BaseState.ts";
import * as Topics from "html-living-framework";
import {broadcast, PopupToken} from "html-living-framework";
import {Point} from "pixi.js";

class PopupExample extends BaseState {
	public static get NAME(): string {
		return "PopupExample";
	}

	init(pSize: Point) {
		super.init(pSize);

		this.setHeaderText("Popup Example");
		this.setMainText("Click anywhere to open a popup.");

		// register the popup
		this.app.popups.register(ExamplePopup);

		this.eventMode = 'static';

		this.initClickToOpen = this.initClickToOpen.bind(this)

		this.initClickToOpen();
	}

	initClickToOpen() {
		this.once("pointerdown", (e) => {
			broadcast(Topics.SHOW_POPUP, new PopupToken(ExamplePopup.NAME, this.initClickToOpen))
		});
	}
}

export default PopupExample;
