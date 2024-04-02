import { ColorSource, Graphics, Sprite, Texture } from 'pixi.js';
import { Application } from '../core/Application';
import { IFocusable } from '../modules/default/focus/FocusManager';
import { Size } from '../utils/types';
import { Container, IContainer } from './Container';

/**
 * Interface for Popup
 */
export interface IPopup extends IContainer {
  readonly id: string | number; // Unique identifier for the popup
  config: PopupConfig; // Configuration for the popup
  view: Container; // The view of the popup
  backing?: any; // The backing of the popup
  isShowing: boolean; // Whether the popup is currently showing
  firstFocusableEntity?: IFocusable; // The first focusable entity in the popup

  initialize(): void; // Initialize the popup

  show(): void | Promise<any>; // Show the popup
  afterShow(): void; // Show the popup

  beforeHide(): void; // Hide the popup
  hide(): void | Promise<any>; // Hide the popup

  start(): void | Promise<any>; // Start the popup

  end(): void; // End the popup
}

export type PopupConstructor = new (id: string | number, config?: Partial<PopupConfig>) => IPopup;

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
export type PopupConfig = {
  closeOnEscape: boolean;
  closeOnPointerDownOutside: boolean;
  backing: boolean | Partial<BackingConfig>;
  data?: any;
};

const defaultPopupConfig = { backing: true, closeOnEscape: true, closeOnPointerDownOutside: true };

/**
 * Class representing a Popup
 */
export class Popup extends Container implements IPopup {
  public isShowing: boolean = false;
  public firstFocusableEntity: IFocusable;
  public view: Container;
  public backing?: Container;
  public config: PopupConfig;
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
    this.config = Object.assign({ ...defaultPopupConfig }, config);

    this._initialize();
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

  /**
   * Initialize the popup
   * @private
   */
  private _initialize() {
    this.app.focus.addFocusLayer(this.id);

    if (this.config.backing) {
      this.backing = this.add.existing(Popup.makeBacking(this.config.backing, this.app.size));
      this.backing.eventMode = 'static';
      if (this.config.closeOnPointerDownOutside) {
        this.backing.once('pointerup', this._handlePointerUp);
        this.backing.once('tap', this._handlePointerUp);
      }
    }

    this.view = this.add.container();
    this.view.eventMode = 'static';
  }

  /**
   * Handle pointer up event
   * @private
   */
  private _handlePointerUp() {
    void this.app.popups.hide(this.id);
  }
}
