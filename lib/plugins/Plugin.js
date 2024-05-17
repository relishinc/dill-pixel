var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Application } from '../core/Application';
import { MethodBindingRoot } from '../core/decorators';
import { SignalConnections } from '../signals';
import { bindAllMethods } from '../utils/methodBinding';
let Plugin = class Plugin {
    id;
    // A collection of signal connections.
    _signalConnections = new SignalConnections();
    constructor(id = 'Plugin') {
        this.id = id;
        bindAllMethods(this);
    }
    get app() {
        return Application.getInstance();
    }
    destroy() {
        this._signalConnections.disconnectAll();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async initialize(_app, _options) {
        return Promise.resolve(undefined);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async postInitialize(_app) {
        return Promise.resolve(undefined);
    }
    /**
     * Add signal connections to the container.
     * @param args - The signal connections to add.
     */
    addSignalConnection(...args) {
        for (const connection of args) {
            this._signalConnections.add(connection);
        }
    }
    clearSignalConnections() {
        this._signalConnections.disconnectAll();
    }
};
Plugin = __decorate([
    MethodBindingRoot,
    __metadata("design:paramtypes", [String])
], Plugin);
export { Plugin };
