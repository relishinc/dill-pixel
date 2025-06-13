import type { ContainerLike } from '../utils';
import { bindAllMethods } from '../utils';

import type { Layout, LayoutOptions, NumberValue } from '@pixi/layout';
import type { DestroyOptions } from 'pixi.js';
import { Container as PIXIContainer } from 'pixi.js';
import { Application } from '../core/Application';
import { Factory, WithSignals } from '../mixins';
import { Signal } from '../signals';

const _FlexContainer = WithSignals(Factory());

export interface FlexContainerConfig extends LayoutOptions {
  bindTo: ContainerLike;
  bindToAppSize: boolean;
  autoLayoutChildren: boolean;
  layout: boolean | Partial<LayoutOptions> | null | undefined;
  layoutWidth: SizeNumber;
  layoutHeight: SizeNumber;
}

export const FlexContainerConfigKeys: (keyof FlexContainerConfig)[] = [
  'bindTo',
  'bindToAppSize',
  'autoLayoutChildren',
  'layout',
];

const defaultLayout = {
  flexGrow: 1,
  flexShrink: 1,
};

const defaultConfig = {
  bindTo: null,
  autoLayoutChildren: true,
};

export interface IFlexContainer {
  onLayoutComplete: Signal<() => void>;
  debug: boolean;
  config: FlexContainerConfig;
  layout: Layout | null;
}

export type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse' | undefined;
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;
export type AlignItems = 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline' | undefined;
export type JustifyContent =
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'flex-start'
  | 'flex-end'
  | undefined;

export type SizeNumber = NumberValue | 'auto' | 'intrinsic';
export class FlexContainer<T extends Application = Application> extends _FlexContainer {
  public onLayoutComplete: Signal<() => void> = new Signal<() => void>();
  public debug: boolean = false;
  public config: FlexContainerConfig;

  constructor(config: Partial<FlexContainerConfig> = {}) {
    super();

    // Bind all methods of this class to the current instance.
    bindAllMethods(this);
    this.config = Object.assign({ ...defaultConfig }, config);

    // pluck the LayoutOptions from the config
    const layout = { ...defaultLayout, ...config };

    if (config.layout && typeof config.layout === 'object') {
      this.layout = { ...layout, ...config.layout };
    } else if (config.layout === true) {
      this.layout = { ...layout };
    } else if (config.layout === false) {
      this.layout = null;
    }

    if (this.config.bindToAppSize) {
      this.layout = { width: this.app.size.width, height: this.app.size.height };
    } else if (this.config.bindTo) {
      this.layout = { width: this.config.bindTo.width, height: this.config.bindTo.height };
    }

    // Add an event listener for the 'added' event.
    this.on('added', this._added);
    this.on('childAdded', this.handleChildAdded);
    this.on('childRemoved', this.handleChildRemoved);

    this.addSignalConnection(this.app.onResize.connect(this.resize));

    this._updateLayout();
  }

  protected _flexChildren: PIXIContainer[] = [];

  get flexChildren() {
    return this._flexChildren;
  }

  get gap(): number {
    return this.layout?._styles?.yoga?.gap ?? 0;
  }

  set gap(value: number) {
    this.layout = { gap: value };
    this._updateLayout();
  }

  get flexWrap(): 'wrap' | 'nowrap' | 'wrap-reverse' | undefined {
    return this.layout?._styles?.yoga?.flexWrap;
  }

  set flexWrap(value: FlexWrap) {
    this.layout = { flexWrap: value };
    this._updateLayout();
  }

  get flexDirection(): FlexDirection {
    return this.layout?._styles?.yoga?.flexDirection;
  }

  set flexDirection(value: FlexDirection) {
    this.layout = { flexDirection: value };
    this._updateLayout();
  }

  get alignItems(): AlignItems {
    return this.layout?._styles?.yoga?.alignItems;
  }

  set alignItems(value: AlignItems) {
    this.layout = { alignItems: value };
    this._updateLayout();
  }

  get justifyContent(): JustifyContent {
    return this.layout?._styles?.yoga?.justifyContent;
  }

  set justifyContent(value: JustifyContent) {
    this.layout = { justifyContent: value };
    this._updateLayout();
  }

  get containerHeight(): SizeNumber {
    return this.layout?._styles?.yoga?.height as number;
  }

  set containerHeight(value: SizeNumber) {
    this.layout = { height: value };
    this._updateLayout();
  }

  get containerWidth(): SizeNumber {
    return this.layout?._styles?.yoga?.width as SizeNumber;
  }

  set containerWidth(value: SizeNumber) {
    this.layout = { width: value };
    this._updateLayout();
  }

  get size(): { width: SizeNumber; height: SizeNumber } {
    return { width: this.containerWidth, height: this.containerHeight };
  }

  set size(size: { width: SizeNumber; height: SizeNumber } | [SizeNumber, SizeNumber] | SizeNumber) {
    if (Array.isArray(size)) {
      size = { width: size[0], height: size[1] };
    }
    if (typeof size === 'number') {
      size = { width: size, height: size };
    } else if (typeof size === 'string') {
      size = { width: size, height: size };
    }
    this.layout = { width: size.width, height: size.height };
    this._updateLayout();
  }

  set layout(value: Omit<LayoutOptions, 'target'> | null | boolean) {
    super.layout = value;
    this._updateLayout();
  }

  get layout(): Layout | null {
    return super.layout;
  }

  set layoutWidth(value: SizeNumber) {
    this.layout = { width: value };
    this._updateLayout();
  }

  get layoutWidth(): SizeNumber {
    return this.layout?._styles?.yoga?.width as SizeNumber;
  }

  set layoutHeight(value: SizeNumber) {
    this.layout = { height: value };
    this._updateLayout();
  }

  get layoutHeight(): SizeNumber {
    return this.layout?._styles?.yoga?.height as SizeNumber;
  }

  /**
   * Get the application instance.
   */
  public get app(): T {
    return Application.getInstance() as T;
  }

  destroy(_options?: DestroyOptions | boolean) {
    this.off('added', this._added);
    this.off('childAdded', this.handleChildAdded);
    this.off('childRemoved', this.handleChildRemoved);

    super.destroy(_options);
  }

  added() {
    this._updateLayout();
  }

  resize() {
    if (this.config.bindToAppSize || this.config.bindTo) {
      if (this.config.bindToAppSize) {
        this.size = this.app.size;
      } else if (this.config.bindTo) {
        this.size = [this.config.bindTo.width, this.config.bindTo.height];
      }
    } else {
      this._updateLayout();
    }
  }

  updateLayout() {
    this._updateLayout();
  }

  protected handleChildAdded(_child: PIXIContainer) {
    if (this.config.autoLayoutChildren) {
      if (!_child.layout) {
        _child.layout = true;
      }
      if (!_child.layout?.style?.width) {
        _child.layout = { width: 'auto' };
      }
      if (!_child.layout?.style?.height) {
        _child.layout = { height: 'auto' };
      }
    }
    _child.on('layout', this._updateLayout);
    this._updateLayout();
  }

  protected handleChildRemoved(_child: PIXIContainer) {
    void _child;
    this._updateLayout();
  }

  private _updateLayout() {
    this.app.renderer.layout.update(this);
    this.onLayoutComplete.emit();
  }

  private _added() {
    this.added();
  }
}
