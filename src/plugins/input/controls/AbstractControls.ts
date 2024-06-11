import { AbstractControlScheme } from "./interfaces";
import { Application } from "../../../Application";
import { IApplication } from "../../../core";

export class AbstractControls {
    public scheme: AbstractControlScheme;

    get app(): IApplication {
        return Application.getInstance();
    }

    initialize<T extends string = string>(scheme: AbstractControlScheme<T>) {
        this.scheme = scheme;
    }
}
