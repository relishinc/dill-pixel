import { Container } from "pixi.js";
import AddFactory from "./AddFactory";
import MakeFactory from "./MakeFactory";
export declare class Factory {
    private app;
    private _addFactory;
    private _makeFactory;
    constructor();
    set container(value: Container);
    get add(): AddFactory;
    get make(): MakeFactory;
}
//# sourceMappingURL=index.d.ts.map