import { ColorSource, DestroyOptions, Container as PIXIContainer, Sprite, Texture } from 'pixi.js';

import type { IContainer } from '../display/Container';
import { Container } from '../display/Container';
import type { ActionContext, IFocusable } from '../plugins';
import { Logger, type Size } from '../utils';

/**
 * Interface for Popup
 */
export interface IPopup<T = any> extends IContainer {
  readonly id: string | number; // Unique identifier for the popup
  config: PopupConfig<T>; // Configuration for the popup
  view: Container; // The view of the popup
  backing?: PIXIContainer; // The backing of the popup
  isShowing: boolean; // Whether the popup is currently showing
  firstFocusableEntity?: IFocusable; // The first focusable entity in the popup
  data: T;

  readonly actionContext: ActionContext | undefined; // The action context of the popup

  close(): void;

  initialize(): void; // Initialize the popup

  beforeShow(): void; // Show the popup

  show(): void | Promise<any>; // Show the popup

  afterShow(): void; // Show the popup

  beforeHide(): void; // Hide the popup

  hide(): void | Promise<any>; // Hide the popup

  start(): void | Promise<any>; // Start the popup

  end(): void; // End the popup

  restoreActionContext(): void; // Restore the action context
}

export type PopupConstructor<T = any> = new (id: string | number, config?: Partial<PopupConfig<T>>) => IPopup<T>;

/**
 * Configuration for the backing of the popup
 */
export type BackingConfig = {
  color: ColorSource;
  alpha: number;
};

const defaultBackingConfig = {
  color: 0x0,
  alpha: 0.75,
};

/**
 * Configuration for the popup
 */
export type PopupConfig<T = any> = {
  id: string | number;
  closeOnEscape: boolean;
  closeOnPointerDownOutside: boolean;
  backing: boolean | Partial<BackingConfig>;
  data?: T;
  actionContext?: ActionContext;
};

const defaultPopupConfig = {
  backing: true,
  closeOnEscape: true,
  closeOnPointerDownOutside: true,
  actionContext: 'popup',
};

/**
 * Class representing a Popup
 */
export class Popup<T = any> extends Container implements IPopup<T> {
  public isShowing: boolean = false;
  public firstFocusableEntity: IFocusable;
  public view: Container;
  public backing?: Sprite;
  public config: PopupConfig<T>;

  protected _storedActionContext: ActionContext | undefined = undefined;

  get actionContext(): ActionContext | undefined {
    return this.config.actionContext;
  }

  /**
   * Create a new Popup
   * @param id - The unique identifier for the popup
   * @param config - The configuration for the popup
   */
  constructor(
    public readonly id: string | number,
    config: Partial<PopupConfig> = {},
  ) {
    super();
    this.config = Object.assign({ id, ...defaultPopupConfig }, config);

    this._initialize();
  }

  get data(): T {
    return this.config.data as T;
  }
  /**
   * Create a backing for the popup
   * @param config - The configuration for the backing
   * @param size - The size of the backing
   * @returns The backing container
   */
  private static makeBacking(config: boolean | Partial<BackingConfig>, size: Size): Sprite {
    let finalConfig = {};
    if (typeof config === 'object') {
      finalConfig = config;
    }
    const backingConfig: BackingConfig = Object.assign({ ...defaultBackingConfig }, finalConfig);
    const backing = new Sprite(Texture.WHITE);
    backing.anchor.set(0.5);
    backing.alpha = backingConfig.alpha;
    backing.tint = backingConfig.color;
    backing.width = size.width;
    backing.height = size.height;
    return backing;
  }

  initialize() {}

  public beforeShow() {
    this.storeActionContext();
    this.setActionContext();
  }

  public beforeHide() {
    this.app.focus.removeFocusLayer(this.id);
  }

  destroy(options?: boolean | DestroyOptions): void {
    this.app.focus.removeFocusLayer(this.id);
    this._storedActionContext = undefined;
    super.destroy(options);
  }

  /**
   * Hide the popup
   * @returns A promise that resolves when the popup is hidden
   */
  hide(): void | any | Promise<any>;

  async hide(): Promise<void> {
    this.visible = false;
    return Promise.resolve();
  }

  /**
   * Show the popup
   * @returns A promise that resolves when the popup is shown
   */
  show(): void | Promise<any>;

  async show(): Promise<void> {
    this.resize();
    this.visible = true;
    return Promise.resolve();
  }

  /**
   * Start the popup
   */
  start(): void | Promise<any>;
  async start() {}

  afterShow() {
    if (this.firstFocusableEntity) {
      this.app.focus.add(this.firstFocusableEntity, this.id, true);
      this.app.focus.setFocus(this.firstFocusableEntity);
    }
  }
  /**
   * End the popup
   */
  end() {}

  close(): void | Promise<void>;
  async close(): Promise<void> {
    void this.app.popups.hidePopup(this.id, this.config.data);
  }

  resize() {
    this.backing?.setSize(this.app.size.width, this.app.size.height);
  }

  /**
   * Initialize the popup
   * @private
   */
  private _initialize() {
    this.app.focus.addFocusLayer(this.id, false);

    if (this.config.backing) {
      this.backing = this.add.existing(Popup.makeBacking(this.config.backing, this.app.size));
      this.backing.eventMode = 'static';

      if (this.config.closeOnPointerDownOutside) {
        this.backing.once('click', this.close);
        this.backing.once('tap', this.close);
      }
    }

    this.view = this.add.container();
    this.view.eventMode = 'static';
  }

  // store and restore the action context
  protected setActionContext() {
    if (this.actionContext) {
      this.app.actionContext = this.actionContext;
      Logger.log('Popup', 'Setting action context', this.app.actionContext);
    }
  }

  protected storeActionContext() {
    this._storedActionContext = this.app.actionContext;
    Logger.log('Popup', 'Storing action context', this._storedActionContext);
  }

  public restoreActionContext() {
    if (this._storedActionContext) {
      Logger.log('Popup', 'Restoring action context', this._storedActionContext);
      this.app.actionContext = this._storedActionContext;
    }
    this._storedActionContext = undefined;
  }
}
