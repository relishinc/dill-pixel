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
import { Animated } from '../mixins/animated';
import { FactoryContainer } from '../mixins/factory';
import { WithSignals } from '../mixins/signals';
import { bindAllMethods } from '../utils/methodBinding';
// Create a new class that extends PIXI.Container and includes the Animated and Factory mixins.
const _Container = Animated(WithSignals(FactoryContainer()));
/**
 * The Container class extends the _Container class (which includes the Animated and Factory mixins) and implements the IContainer interface.
 * It represents a container for PIXI.js display objects.
 */
let Container = class Container extends _Container {
    __config;
    /**
     * The constructor for the Container class.
     * @param __config - The configuration for the container.
     */
    constructor(__config = { autoResize: true, autoUpdate: false, priority: 0 }) {
        super();
        this.__config = __config;
        // Bind all methods of this class to the current instance.
        bindAllMethods(this);
        // Add an event listener for the 'added' event.
        this.on('added', this._added);
        this.on('removed', this._removed);
    }
    /**
     * Get the application instance.
     */
    get app() {
        return Application.getInstance();
    }
    /**
     * Update the container. This method is meant to be overridden by subclasses.
     * @param ticker
     */
    update(ticker) {
        void ticker;
    }
    /**
     * Resize the container. This method is meant to be overridden by subclasses.
     * @param size
     */
    resize(size) {
        void size;
    }
    /**
     * This method is called when the container is added to the stage. It is meant to be overridden by subclasses.
     */
    added() { }
    destroy(options) {
        if (this.__config.autoUpdate) {
            this.app.ticker.remove(this.update, this);
        }
        super.destroy(options);
    }
    removed() { }
    /**
     * This method is called when the container is added to the stage. It sets up auto-resizing and auto-updating if enabled.
     */
    _added() {
        if (this.__config.autoResize) {
            this.addSignalConnection(this.app.onResize.connect(this.resize, this.__config.priority));
        }
        if (this.__config.autoUpdate) {
            this.app.ticker.add(this.update, this, this.__config.priority);
        }
        this.added();
    }
    _removed() {
        if (this.__config.autoResize) {
            this.app.onResize.disconnect(this.resize);
        }
        if (this.__config.autoUpdate) {
            this.app.ticker.remove(this.update, this);
        }
        this.removed();
    }
};
Container = __decorate([
    MethodBindingRoot,
    __metadata("design:paramtypes", [Object])
], Container);
export { Container };
