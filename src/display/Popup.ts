import { ColorSource, Graphics, Sprite, Texture } from 'pixi.js';
import { Application } from '../core/Application';
import { IFocusable } from '../plugins/focus/FocusManager';
import { Size } from '../utils/types';
import { Container, IContainer } from './Container';

/**
 * Interface for Popup
 */
export interface IPopup<T = any> extends IContainer {
  readonly id: string | number; // Unique identifier for the popup
  config: PopupConfig<T>; // Configuration for the popup
  view: Container; // The view of the popup
  backing?: any; // The backing of the popup
  isShowing: boolean; // Whether the popup is currently showing
  firstFocusableEntity?: IFocusable; // The first focusable entity in the popup
  data: T;

  close(): void;

  initialize(): void; // Initialize the popup

  show(): void | Promise<any>; // Show the popup

  afterShow(): void; // Show the popup

  beforeHide(): void; // Hide the popup

  hide(): void | Promise<any>; // Hide the popup

  start(): void | Promise<any>; // Start the popup

  end(): void; // End the popup
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
};

const defaultPopupConfig = { backing: true, closeOnEscape: true, closeOnPointerDownOutside: true };

/**
 * Class representing a Popup
 */
export class Popup<T = any> extends Container implements IPopup<T> {
  public isShowing: boolean = false;
  public firstFocusableEntity: IFocusable;
  public view: Container;
  public backing?: Container;
  public config: PopupConfig<T>;
  public static BACKING_TEXTURE: Texture;

  /**
   * Create a backing for the popup
   * @param config - The configuration for the backing
   * @param size - The size of the backing
   * @returns The backing container
   */
  private static makeBacking(config: boolean | Partial<BackingConfig>, size: Size): Container {
    let finalConfig = {};
    if (typeof config === 'object') {
      finalConfig = config;
    }
    const backingConfig: BackingConfig = Object.assign({ ...defaultBackingConfig }, finalConfig);
    if (Popup.BACKING_TEXTURE === undefined) {
      const gfx = new Graphics();
      gfx.rect(0, 0, 100, 100).fill('white');
      Popup.BACKING_TEXTURE = Application.getInstance().renderer.generateTexture(gfx);
    }
    const backingWrapper = new Container();
    backingWrapper.sortableChildren = false;
    const backing = backingWrapper.addChild(new Sprite(Popup.BACKING_TEXTURE));
    backing.anchor.set(0.5);
    backing.alpha = backingConfig.alpha;
    backing.tint = backingConfig.color;
    backing.setSize(size.width, size.height);

    return backingWrapper;
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

  initialize() {}

  public beforeHide() {
    this.app.focus.removeFocusLayer(this.id);
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
}
