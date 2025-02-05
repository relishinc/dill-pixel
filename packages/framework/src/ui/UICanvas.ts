import { Bounds, ContainerChild, Graphics, IRenderLayer, Container as PIXIContainer, Rectangle } from 'pixi.js';
import { Application } from '../core/Application';
import { Container } from '../display/Container';
import { Factory, WithSignals } from '../mixins';
import type { Padding, PointLike, Size, SizeLike } from '../utils';
import { bindAllMethods, ensurePadding, Logger, resolvePadding, resolveSizeLike } from '../utils';
import type { IFlexContainer } from './FlexContainer';

export type UICanvasEdge =
  | 'top right'
  | 'top left'
  | 'top center'
  | 'top'
  | 'bottom right'
  | 'bottom left'
  | 'bottom center'
  | 'bottom'
  | 'left top'
  | 'left bottom'
  | 'left center'
  | 'left'
  | 'right top'
  | 'right bottom'
  | 'right center'
  | 'right'
  | 'center';

export interface UICanvasChildSettings {
  align: UICanvasEdge;
  padding: Padding;
}

export interface UICanvasChildProps {
  align: UICanvasEdge;
  padding: Partial<Padding> | PointLike;
}

export type UICanvasConfig = {
  debug: boolean;
  padding: Padding;
  size: Size;
  useAppSize: boolean;
};

export const UICanvasConfigKeys: (keyof UICanvasConfig)[] = ['debug', 'padding', 'size', 'useAppSize'];

export type UICanvasProps = {
  debug: boolean;
  padding: Partial<Padding> | PointLike;
  size?: SizeLike;
  useAppSize?: boolean;
};

const _UICanvas = WithSignals(Factory());

export class UICanvas<T extends Application = Application> extends _UICanvas {
  public config: UICanvasConfig;
  protected _outerBounds: Rectangle;
  protected _displayBounds: Rectangle;
  protected settingsMap = new Map<PIXIContainer, UICanvasChildSettings>();
  protected _childMap = new Map<PIXIContainer, PIXIContainer>();
  protected _debugGraphics: Graphics;
  protected _inner: Container;
  private _reparentAddedChild: boolean = true;
  private _disableAddChildError: boolean = false;

  constructor(config: Partial<UICanvasProps>) {
    super();
    // Bind all methods of this class to the current instance.
    bindAllMethods(this);
    this.config = {
      debug: config.debug === true,
      padding: ensurePadding(config?.padding ?? 0),
      size: config.size !== undefined ? resolveSizeLike(config.size) : { width: 0, height: 0 },
      useAppSize: config.useAppSize === true,
    };
    this._disableAddChildError = true;
    this._inner = this.add.container({ x: this.config.padding.left, y: this.config.padding.top });
    this._disableAddChildError = false;

    this.addSignalConnection(this.app.onResize.connect(this.resize));

    this.on('childRemoved', this._childRemoved);
    this.once('added', this._added);
  }

  protected _bounds: Bounds;

  get bounds(): Bounds {
    if (!this._bounds) {
      this._bounds = this.getBounds();
    }
    return this._bounds;
  }

  protected _canvasChildren: PIXIContainer[] = [];

  public get canvasChildren(): PIXIContainer[] {
    return this._canvasChildren;
  }

  /**
   * Get the application instance.
   */
  public get app(): T {
    return Application.getInstance() as T;
  }

  set size(value: SizeLike) {
    this.config.useAppSize = false;
    this.config.size = value === undefined ? { width: 0, height: 0 } : resolveSizeLike(value);
    this.resize();
  }

  set padding(value: Partial<Padding> | PointLike) {
    this.config.padding = ensurePadding(value);
    this._inner.position.set(this.config.padding.left, this.config.padding.top);
    this.resize();
  }

  private static isFlexContainer(child: PIXIContainer): boolean {
    return (child as any)?.flexChildren !== undefined;
  }

  /**
   * Removes all the children from the container
   * Override because we need to ensure it returns the proper re-parented children
   */
  public removeChildren = (beginIndex?: number, endIndex?: number) => {
    return this._inner.removeChildren(beginIndex, endIndex);
  };

  /**
   * Removes a child from the container at the specified index
   * Override because we need to remove from the inner container
   */
  public removeChildAt = <U extends PIXIContainer | IRenderLayer>(index: number): U => {
    return this._inner.removeChildAt(index) as U;
  };

  /**
   * Adds a child to the container at the specified index
   * Override because we need to ensure it sets the child index properly
   */
  public addChildAt = <U extends PIXIContainer | IRenderLayer>(child: U, index: number) => {
    const newChild = this._inner.add.existing(child);
    this._inner.setChildIndex(newChild, index);
    return newChild;
  };

  /**
   * Sets the index of the child in the container
   * Override because we need to ensure it targets the parent container that we added
   */
  public setChildIndex = <U extends PIXIContainer>(child: U, index: number) => {
    this._inner.setChildIndex(child, index);
    this.layout();
  };

  /**
   * Gets the index of a child in the container
   * Override because we need to ensure it targets the parent container that we added
   */
  public getChildIndex = <U extends PIXIContainer>(child: U) => {
    return this._inner.getChildIndex(child);
  };

  /**
   * Gets the child at the specified index
   * Override due to re-parenting
   */
  public getChildAt = <U extends PIXIContainer | IRenderLayer>(index: number) => {
    return (this._inner.getChildAt(index) as PIXIContainer)?.getChildAt(0) as U;
  };

  public addChild<U extends (ContainerChild | IRenderLayer)[]>(...children: U): U[0] {
    if (this._disableAddChildError) {
      return super.addChild(...children);
    }
    Logger.warn(
      `UICanvas:: You probably shouldn't add children directly to UICanvas. Use .addElement(child, settings) instead, so you can pass alignment settings.`,
      children,
      `will be added using the default 'top left' alignment'.`,
    );
    return this._inner.addChild(...children);
  }

  /**
   * Removes one or more children from the container
   * Override because we need to ensure it returns the proper re-parented children
   */
  public removeChild(...children: (PIXIContainer | IRenderLayer)[]): PIXIContainer {
    if (this._reparentAddedChild) {
      children.forEach((child) => {
        const actualChild = this._childMap.get(child as PIXIContainer) as PIXIContainer;
        if (actualChild) {
          return this._inner.removeChild(actualChild);
        }
        return undefined;
      });
    } else {
      return this._inner.removeChild(...(children as PIXIContainer[]));
    }
    return children[0] as PIXIContainer;
  }

  public resize() {
    const _size = this.config.useAppSize ? this.app.size : this.config.size;

    this._displayBounds = this.__calculateBounds(_size);
    this._outerBounds = this.__calculateOuterBounds(_size);

    this.layout();

    if (this.config.useAppSize) {
      this.position.set(-_size.width * 0.5, -_size.height * 0.5);
    }

    if (this.config.debug) {
      this.app.ticker.addOnce(this.drawDebug);
    }
  }

  public layout() {
    this._inner.children.forEach((child) => {
      const childObj = child as PIXIContainer;
      const settings = this.settingsMap.get(childObj);
      if (settings) {
        this.applySettings(childObj, settings);
      }
    });
  }

  public addElement<U extends PIXIContainer = PIXIContainer>(
    child: PIXIContainer,
    settings?: Partial<UICanvasChildProps>,
  ): U {
    const container = this._inner.add.container();
    container.addChild(child);
    const bounds = container.getLocalBounds();
    if (bounds.x < 0) {
      container.pivot.x = bounds.x;
    }
    if (bounds.y < 0) {
      container.pivot.y = bounds.y;
    }
    if ((child as any)?.flexChildren) {
      this.addSignalConnection((child as unknown as IFlexContainer).onLayoutComplete.connect(this.layout));
    }

    this.settingsMap.set(container, {
      align: settings?.align ?? 'top left',
      padding: settings?.padding ? ensurePadding(settings.padding) : { top: 0, left: 0, bottom: 0, right: 0 },
    });

    this._childMap.set(child, container);
    this._canvasChildren = Array.from(this._childMap.keys());

    this.resize();
    return child as U;
  }

  /**
   * Ensure we don't leave empty containers after setting child indices or adding / removing children
   * @protected
   */
  protected cleanup() {
    if (this.canvasChildren.length === this.children.length) return;
    // remove any children that are not in the flex children list
    this.children.forEach((child) => {
      if (this.config.debug && child === this._debugGraphics) return;
      if (!(child as PIXIContainer)?.children?.length) {
        super.removeChild(child);
      }
    });
  }

  private __calculateBounds(_size: Size): Rectangle {
    return new Rectangle(
      0,
      0,
      _size.width - this.config.padding.left - this.config.padding.right,
      _size.height - this.config.padding.top - this.config.padding.bottom,
    );
  }

  private __calculateOuterBounds(_size: Size): Rectangle {
    return new Rectangle(0, 0, _size.width, _size.height);
  }

  private _childRemoved(child: any) {
    this.settingsMap.delete(child);
    this._childMap.delete(child as PIXIContainer);
    this._canvasChildren = Array.from(this._childMap.keys());
  }

  private _added() {
    this.layout();
  }

  private applySettings(child: PIXIContainer, settings: UICanvasChildSettings) {
    if (!settings) return;
    const displayWidth = this._displayBounds.width;
    const displayHeight = this._displayBounds.height;

    const firstChild = (child as PIXIContainer).getChildAt(0);

    const childWidth = UICanvas.isFlexContainer(firstChild as PIXIContainer)
      ? (firstChild as unknown as IFlexContainer).containerWidth || child.width
      : child.width;
    const childHeight = UICanvas.isFlexContainer(firstChild as PIXIContainer)
      ? (firstChild as unknown as IFlexContainer).containerHeight || child.height
      : child.height;

    switch (settings.align) {
      case 'top right':
        child.x = displayWidth - childWidth;
        child.y = 0;
        break;
      case 'top left':
        child.x = 0;
        child.y = 0;
        break;
      case 'top center':
      case 'top':
        child.x = (displayWidth - childWidth) / 2;
        child.y = 0;
        break;
      case 'bottom right':
        child.x = displayWidth - childWidth;
        child.y = displayHeight - childHeight;
        break;
      case 'bottom left':
        child.x = 0;
        child.y = displayHeight - childHeight;
        break;
      case 'bottom center':
      case 'bottom':
        child.x = (displayWidth - child.width) / 2;
        child.y = displayHeight - childHeight;
        break;
      case 'left top':
        child.x = 0;
        child.y = 0;
        break;
      case 'left bottom':
        child.x = 0;
        child.y = displayHeight - childHeight;
        break;
      case 'left center':
      case 'left':
        child.x = 0;
        child.y = (displayHeight - childHeight) / 2;
        break;
      case 'right top':
        child.x = displayWidth - childWidth;
        child.y = 0;
        break;
      case 'right bottom':
        child.x = displayWidth;
        child.y = displayHeight;
        break;
      case 'right center':
      case 'right':
        child.x = displayWidth - childWidth;
        child.y = (displayHeight - childHeight) / 2;
        break;
      case 'center':
        child.x = (displayWidth - childWidth) / 2;
        child.y = (displayHeight - childHeight) / 2;
        break;
    }
    child.x +=
      resolvePadding(settings.padding.left, displayWidth) - resolvePadding(settings.padding.right, displayWidth);

    child.y +=
      resolvePadding(settings.padding.top, displayHeight) - resolvePadding(settings.padding.bottom, displayHeight);
  }

  private drawDebug() {
    if (!this._debugGraphics) {
      this._disableAddChildError = true;
      this._debugGraphics = this._inner.add.graphics();
      this._disableAddChildError = false;
    }
    this._debugGraphics
      .clear()
      .rect(0, 0, this._displayBounds.width, this._displayBounds.height)
      .stroke({
        width: 1,
        color: 0xff0000,
        alpha: 0.5,
        pixelLine: true,
      })
      .rect(-this.config.padding.left, -this.config.padding.top, this._outerBounds.width, this._outerBounds.height)
      .stroke({
        width: 1,
        color: 0xff0000,
        alpha: 0.5,
        pixelLine: true,
      })
      .moveTo(this._displayBounds.width / 2, this._displayBounds.height / 2 - 10)
      .lineTo(this._displayBounds.width / 2, this._displayBounds.height / 2 + 10)
      .stroke({
        width: 1,
        color: 0xff0000,
        alpha: 0.5,
        pixelLine: true,
      })
      .moveTo(this._displayBounds.width / 2 - 10, this._displayBounds.height / 2)
      .lineTo(this._displayBounds.width / 2 + 10, this._displayBounds.height / 2)
      .stroke({
        width: 1,
        color: 0xff0000,
        alpha: 0.5,
        pixelLine: true,
      });
  }
}
