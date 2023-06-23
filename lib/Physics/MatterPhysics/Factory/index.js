import { Application } from "../../../Application";
import AddFactory from "./AddFactory";
export class Factory {
    constructor() {
        this.app = Application.instance;
        this._addFactory = new AddFactory(this.app.stage);
        this._makeFactory = this._addFactory.make;
    }
    set container(value) {
        this._addFactory.container = value;
    }
    get add() {
        return this._addFactory;
    }
    get make() {
        return this._makeFactory;
    }
}
//# sourceMappingURL=index.js.map