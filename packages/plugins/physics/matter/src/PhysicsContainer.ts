import { Application, FactoryContainer, Size, WithSignals, bindAllMethod, defaultFactoryMethods } from "dill-pixel";
import { DestroyOptions, Ticker } from "pixi.js";
import { Entity, EntityConfig } from "./Entity";

const factoryMethods = {
    ...defaultFactoryMethods,
    entity: (config: Partial<EntityConfig>) => {
        return new Entity(config);
    }
};

// create a factory container that adds matter physics entities to the scene
const _PhysicsContainer = WithSignals(FactoryContainer<typeof factoryMethods>(factoryMethods));

/**
 * Configuration for the Container class.
 */
export type PhysicsContainerConfig = {
    autoResize: boolean;
    autoUpdate: boolean;
    priority: number;
};

export const ContainerConfigKeys: (keyof PhysicsContainerConfig)[] = [
    'autoResize',
    'autoUpdate',
    'priority',
];

const defaultConfig: PhysicsContainerConfig = { autoResize: true, autoUpdate: false, priority: 0 };


export class PhysicsContainer<T extends Application = Application> extends _PhysicsContainer {
    private __config: PhysicsContainerConfig;

    /**
  * The constructor for the Container class.
  * @param config - The configuration for the container.
  */
    constructor(config: Partial<PhysicsContainerConfig>) {
        super();
        this.__config = { ...defaultConfig, ...config };
        // Bind all methods of this class to the current instance.
        bindAllMethods(this);
        // Add an event listener for the 'added' event.
        this.on('added', this._added);
        this.on('removed', this._removed);
    }

    /**
   * This method is called when the container is added to the stage. It sets up auto-resizing and auto-updating if enabled.
   */
    private _added() {
        if (this.__config.autoResize) {
            this.addSignalConnection(this.app.onResize.connect(this.resize, this.__config.priority));
        }

        if (this.__config.autoUpdate) {
            this.app.ticker.add(this.update, this, this.__config.priority);
        }
        this.added();
    }

    private _removed() {
        if (this.__config.autoResize) {
            this.app.onResize.disconnect(this.resize);
        }

        if (this.__config.autoUpdate) {
            this.app.ticker.remove(this.update, this);
        }

        this.removed();
    }

    /**
     * Update the container. This method is meant to be overridden by subclasses.
     * @param ticker
     */
    public update(ticker?: Ticker | number) {
        void ticker;
    }

    /**
     * Resize the container. This method is meant to be overridden by subclasses.
     * @param size
     */
    public resize(size?: Size) {
        void size;
    }

    /**
     * This method is called when the container is added to the stage. It is meant to be overridden by subclasses.
     */
    public added() { }

    destroy(options?: DestroyOptions): void {
        if (this.__config.autoUpdate) {
            this.app.ticker.remove(this.update, this);
        }
        super.destroy(options);
    }

    public removed() { }

    get app(): T {
        return Application.getInstance<T>()
    }
}