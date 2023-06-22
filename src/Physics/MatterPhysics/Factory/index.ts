import {Container} from "pixi.js";
import {Application} from "../../../Application";
import AddFactory from "./AddFactory";
import MakeFactory from "./MakeFactory";


export class Factory {
	private app: Application;
	private _addFactory: AddFactory;
	private _makeFactory: MakeFactory;

	constructor() {
		this.app = Application.instance;
		this._addFactory = new AddFactory(this.app.stage);
		this._makeFactory = this._addFactory.make;
	}

	set container(value: Container) {
		this._addFactory.container = value;
	}

	get add(): AddFactory {
		return this._addFactory;
	}

	get make(): MakeFactory {
		return this._makeFactory;
	}
}
