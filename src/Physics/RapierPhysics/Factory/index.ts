import {Container} from "pixi.js";
import {Application} from "../../../Application";
import {Add} from "./Add";
import {Make} from "./Make";


export class Factory {
	private app: Application;
	private _add: Add;

	constructor() {
		this.app = Application.instance;
		this._add = new Add(this.app.stage);
	}

	set container(value: Container) {
		this._add.container = value;
	}

	get add(): Add {
		return this._add;
	}

	get make(): typeof Make {
		return Make;
	}
}
