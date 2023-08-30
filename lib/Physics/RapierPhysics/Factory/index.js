import { Application } from "../../../Application";
import { Add } from "./Add";
import { Make } from "./Make";
export class Factory {
    constructor() {
        this.app = Application.instance;
        this._add = new Add(this.app.stage);
    }
    set container(value) {
        this._add.container = value;
    }
    get add() {
        return this._add;
    }
    get make() {
        return Make;
    }
}
//# sourceMappingURL=index.js.map