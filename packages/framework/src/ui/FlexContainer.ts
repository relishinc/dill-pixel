import type { Layout, LayoutOptions, NumberValue } from '@pixi/layout';
import { BitmapText, Container as PIXIContainer, Text } from 'pixi.js';
import { Application } from '../core/Application';
import { Container } from '../display';
import { Factory, WithSignals } from '../mixins';
import { Signal } from '../signals';
import { AppTypeOverrides, bindAllMethods, Logger, type ContainerLike } from '../utils';

const _FlexContainer = WithSignals(Factory());

export function isText(child: PIXIContainer): child is Text | BitmapText {
  return child instanceof Text || child instanceof BitmapText;
}

export interface FlexContainerConfig {
  bindTo?: ContainerLike;
  bindToAppSize?: boolean;
  autoLayoutChildren?: boolean;
  layout?: Omit<LayoutOptions, 'target'> | null | boolean;
}

export const FlexContainerConfigKeys: (keyof FlexContainerConfig)[] = ['bindTo', 'bindToAppSize', 'autoLayoutChildren'];

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

export class FlexContainer extends _FlexContainer {
  public onLayoutComplete = new Signal<() => void>();
  public config: Partial<FlexContainerConfig>;

  constructor(config: Partial<FlexContainerConfig> = {}) {
    super();

    if (!this.app.config.useLayout) {
      Logger.error('You must set useLayout to true in your app config to use FlexContainer');
    }

    bindAllMethods(this);

    this.config = {
      autoLayoutChildren: true,
      ...config,
    };

    // Set up layout
    this.layout = this.createLayout(config);

    // Set up event listeners
    this.on('added', this.handleAdded);
    this.on('childAdded', this.handleChildAdded);
    this.on('childRemoved', this.handleChildRemoved);

    if (this.config.bindToAppSize) {
      this.app.onResize.connect(this.handleResize);
    }
  }

  private createLayout(config: Partial<FlexContainerConfig>): Omit<LayoutOptions, 'target'> | null | boolean {
    if (config?.layout === true) {
      config.layout = {};
    }
    const layout: Omit<LayoutOptions, 'target'> | null | boolean = { ...(config?.layout ?? {}) };

    if (this.config.bindToAppSize) {
      layout.width = this.app.size.width;
      layout.height = this.app.size.height;
    } else if (this.config.bindTo) {
      layout.width = this.config.bindTo.width;
      layout.height = this.config.bindTo.height;
    }

    return layout;
  }

  private handleAdded() {
    this.updateLayout();
  }
  private handleChildAdded(child: PIXIContainer) {
    if (this.config.autoLayoutChildren && !(child.layout as Layout | boolean)) {
      child.layout = { isLeaf: true };
    }
    Container.childAdded(child);
    this.updateLayout();
  }

  private handleChildRemoved(child: PIXIContainer) {
    Container.childRemoved(child);
    this.updateLayout();
  }

  private handleResize = () => {
    if (this.config.bindToAppSize) {
      this.layout = {
        width: this.app.size.width,
        height: this.app.size.height,
      };
    }
    this.updateLayout();
  };

  public updateLayout() {
    if (!this.app?.renderer.layout) return;
    this.app.renderer.layout.update(this);
    this.onLayoutComplete.emit();
  }

  public get app(): AppTypeOverrides['App'] {
    return Application.getInstance();
  }

  // Convenience getters/setters for common layout properties
  get gap(): number {
    return this.layout?._styles?.yoga?.gap ?? 0;
  }

  set gap(value: number) {
    this.layout = { gap: value };
    this.updateLayout();
  }

  get flexWrap(): FlexWrap {
    return this.layout?._styles?.yoga?.flexWrap;
  }

  set flexWrap(value: FlexWrap) {
    this.layout = { flexWrap: value };
    this.updateLayout();
  }

  get flexDirection(): FlexDirection {
    return this.layout?._styles?.yoga?.flexDirection;
  }

  set flexDirection(value: FlexDirection) {
    this.layout = { flexDirection: value };
    this.updateLayout();
  }

  get alignItems(): AlignItems {
    return this.layout?._styles?.yoga?.alignItems;
  }

  set alignItems(value: AlignItems) {
    this.layout = { alignItems: value };
    this.updateLayout();
  }

  get justifyContent(): JustifyContent {
    return this.layout?._styles?.yoga?.justifyContent;
  }

  set justifyContent(value: JustifyContent) {
    this.layout = { justifyContent: value };
    this.updateLayout();
  }

  get size(): { width: SizeNumber; height: SizeNumber } {
    return {
      width: this.layout?._styles?.yoga?.width as SizeNumber,
      height: this.layout?._styles?.yoga?.height as SizeNumber,
    };
  }

  set size(size: { width: SizeNumber; height: SizeNumber } | [SizeNumber, SizeNumber] | SizeNumber) {
    if (Array.isArray(size)) {
      size = { width: size[0], height: size[1] };
    }
    if (typeof size === 'number' || typeof size === 'string') {
      size = { width: size, height: size };
    }
    this.layout = { ...size };
    this.updateLayout();
  }

  get layoutWidth(): SizeNumber {
    return this.layout?._styles?.yoga?.width as SizeNumber;
  }

  set layoutWidth(width: SizeNumber) {
    this.layout = { width };
    this.updateLayout();
  }

  get layoutHeight(): SizeNumber {
    return this.layout?._styles?.yoga?.height as SizeNumber;
  }

  set layoutHeight(height: SizeNumber) {
    this.layout = { height };
    this.updateLayout();
  }

  destroy() {
    this.off('added', this.handleAdded);
    this.off('childAdded', this.handleChildAdded);
    this.off('childRemoved', this.handleChildRemoved);

    if (this.config.bindToAppSize) {
      this.app.onResize.disconnect(this.handleResize);
    }

    super.destroy();
  }
}
