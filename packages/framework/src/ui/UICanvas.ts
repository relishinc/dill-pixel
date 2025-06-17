import type { LayoutOptions } from '@pixi/layout';
import { ContainerChild, Graphics, IRenderLayer, Container as PIXIContainer, Rectangle } from 'pixi.js';
import { Application } from '../core/Application';
import { Container } from '../display';
import { Factory, WithSignals } from '../mixins';
import type { Padding, PointLike, Size, SizeLike } from '../utils';
import { bindAllMethods, ensurePadding, Logger, resolveSizeLike } from '../utils';
import { FlexContainer } from './FlexContainer';

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
  layout?: Omit<LayoutOptions, 'target'> | null | boolean;
  autoLayoutChildren?: boolean;
};

export const UICanvasConfigKeys: (keyof UICanvasConfig)[] = ['debug', 'padding', 'size', 'useAppSize', 'layout'];

export type UICanvasProps = {
  debug: boolean;
  padding: Partial<Padding> | PointLike;
  size?: SizeLike;
  useAppSize?: boolean;
  layout?: Omit<LayoutOptions, 'target'> | null | boolean;
  autoLayoutChildren?: boolean;
};

const defaultLayout = {
  flexGrow: 0,
  flexShrink: 0,
  autoLayoutChildren: true,
};

const _UICanvas = WithSignals(Factory());

export class UICanvas<T extends Application = Application> extends _UICanvas {
  public config: UICanvasConfig;
  protected _outerBounds: Rectangle;
  protected _displayBounds: Rectangle;
  protected settingsMap = new Map<PIXIContainer, UICanvasChildSettings>();
  protected _childMap = new Map<PIXIContainer, PIXIContainer>();
  protected _debugGraphics: Graphics;
  private _reparentAddedChild: boolean = true;
  private _disableAddChildError: boolean = false;
  private _positionContainers: Map<UICanvasEdge, Container>;

  public topRow: FlexContainer;
  public middleRow: FlexContainer;
  public bottomRow: FlexContainer;

  constructor(config: Partial<UICanvasProps>) {
    super();

    bindAllMethods(this);
    this._positionContainers = new Map();
    this.config = {
      debug: config.debug === true,
      padding: ensurePadding(config?.padding ?? 0),
      size: config.size !== undefined ? resolveSizeLike(config.size) : { width: 0, height: 0 },
      useAppSize: config.useAppSize === true,
      autoLayoutChildren: config.autoLayoutChildren ?? true,
    };

    if (config.layout) {
      if (typeof config.layout === 'boolean') {
        this.config.layout = config.layout;
      } else {
        this.config.layout = { ...defaultLayout, ...config.layout };
      }
    } else {
      this.config.layout = { ...defaultLayout };
    }

    if (this.config.useAppSize) {
      this.config.size = this.app.size;
    }
    this.layout = {
      width: this.config.size.width,
      height: this.config.size.height,
      flexDirection: 'column',
      justifyContent: 'space-between',
      ...(typeof this.config.layout === 'object' ? this.config.layout : {}),
    };

    // Position the container to account for padding
    this.on('childRemoved', this._childRemoved);
    this.on('childAdded', this._childAdded);
    this.once('added', this._added);

    this.addSignalConnection(this.app.onResize.connect(this.resize));

    this._initializeLayout();
    this.updateLayout();
  }

  private _initializeLayout() {
    this._disableAddChildError = true;
    // Create top row
    this.topRow = this.add.flexContainer({
      label: 'Top',
      layout: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
    });

    // Create middle row
    this.middleRow = this.add.flexContainer({
      label: 'Middle',
      layout: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    });

    // Create bottom row
    this.bottomRow = this.add.flexContainer({
      label: 'Bottom',
      layout: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      },
    });

    this._disableAddChildError = false;

    // Create the 9 actual position containers
    const topLeft = this._createPositionContainer(
      this.topRow,
      {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexGrow: 0,
        flexShrink: 0,
      },
      'Left',
    );
    const topCenter = this._createPositionContainer(
      this.topRow,
      {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexGrow: 1,
        flexShrink: 0,
      },
      'Center',
    );
    const topRight = this._createPositionContainer(
      this.topRow,
      {
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexGrow: 0,
        flexShrink: 0,
      },
      'Right',
    );

    const middleLeft = this._createPositionContainer(
      this.middleRow,
      {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        flexGrow: 0,
        flexShrink: 0,
      },
      'Left',
    );
    const center = this._createPositionContainer(
      this.middleRow,
      {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexGrow: 1,
        flexShrink: 0,
      },
      'Center',
    );
    const middleRight = this._createPositionContainer(
      this.middleRow,
      {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        flexGrow: 0,
        flexShrink: 0,
      },
      'Right',
    );

    const bottomLeft = this._createPositionContainer(
      this.bottomRow,
      {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        flexDirection: 'row',
        flexGrow: 0,
        flexShrink: 0,
      },
      'Left',
    );
    const bottomCenter = this._createPositionContainer(
      this.bottomRow,
      {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexGrow: 1,
        flexShrink: 0,
        flexDirection: 'row',
      },
      'Center',
    );
    const bottomRight = this._createPositionContainer(
      this.bottomRow,
      {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row',
        flexGrow: 0,
        flexShrink: 0,
      },
      'Right',
    );

    // Map all edge variants to the appropriate containers
    this._positionContainers.set('top left', topLeft);
    this._positionContainers.set('left top', topLeft);

    this._positionContainers.set('top center', topCenter);
    this._positionContainers.set('top', topCenter);

    this._positionContainers.set('top right', topRight);
    this._positionContainers.set('right top', topRight);

    this._positionContainers.set('left center', middleLeft);
    this._positionContainers.set('left', middleLeft);
    this._positionContainers.set('left bottom', bottomLeft);

    this._positionContainers.set('center', center);

    this._positionContainers.set('right center', middleRight);
    this._positionContainers.set('right', middleRight);
    this._positionContainers.set('right bottom', bottomRight);

    this._positionContainers.set('bottom left', bottomLeft);

    this._positionContainers.set('bottom center', bottomCenter);
    this._positionContainers.set('bottom', bottomCenter);

    this._positionContainers.set('bottom right', bottomRight);
  }

  private _createPositionContainer(parent: FlexContainer, layout: Partial<LayoutOptions>, label: string): Container {
    const container = parent.add.container({
      layout: {
        width: 'auto',
        height: 'auto',
        ...layout,
      },
    });
    container.label = label;
    container.on('childAdded', this.updateLayout);
    container.on('childRemoved', this.updateLayout);
    container.on('layout', this.updateLayout);
    return container;
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

  destroy() {
    this.canvasChildren?.forEach((child) => {
      child.off('layout', this.updateLayout);
    });

    this.children.forEach((child) => {
      child.off('layout', this.updateLayout);
    });

    this.off('childAdded', this.updateLayout);
    this.off('childRemoved', this.updateLayout);

    this._positionContainers.forEach((container) => {
      container.off('childAdded', this.updateLayout);
      container.off('childRemoved', this.updateLayout);
    });

    super.destroy();
  }

  set size(value: SizeLike) {
    this.config.size = value === undefined ? { width: 0, height: 0 } : resolveSizeLike(value);

    this.layout = { width: this.config.size.width, height: this.config.size.height };

    this.updateLayout();
  }

  set padding(value: Partial<Padding> | PointLike) {
    this.config.padding = ensurePadding(value);
    // Update position to account for padding
    this.layout = {
      paddingLeft: this.config.padding.left,
      paddingTop: this.config.padding.top,
      paddingRight: this.config.padding.right,
      paddingBottom: this.config.padding.bottom,
    };
    this.updateLayout();
  }

  private static isFlexContainer(child: PIXIContainer): boolean {
    return child instanceof FlexContainer;
  }

  /**
   * Removes all the children from the container
   */
  public removeChildren = (beginIndex?: number, endIndex?: number): PIXIContainer[] => {
    return super.removeChildren(beginIndex, endIndex) as PIXIContainer[];
  };

  /**
   * Removes a child from the container at the specified index
   */
  public removeChildAt = <U extends PIXIContainer | IRenderLayer>(index: number): U => {
    return super.removeChildAt(index) as U;
  };

  /**
   * Adds a child to the container at the specified index
   */
  public addChildAt = <U extends PIXIContainer | IRenderLayer>(child: U, index: number): U => {
    const newChild = this.add.existing(child);
    if (newChild instanceof PIXIContainer) {
      super.setChildIndex(newChild, index);
    }
    return newChild as U;
  };

  /**
   * Sets the index of the child in the container
   */
  public setChildIndex = <U extends PIXIContainer>(child: U, index: number): void => {
    super.setChildIndex(child, index);
    this.updateLayout();
  };

  /**
   * Gets the index of a child in the container
   */
  public getChildIndex = <U extends PIXIContainer>(child: U): number => {
    return super.getChildIndex(child);
  };

  /**
   * Gets the child at the specified index
   */
  public getChildAt = <U extends PIXIContainer | IRenderLayer>(index: number): U => {
    return super.getChildAt(index) as U;
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
    return super.addChild(...children);
  }

  /**
   * Removes one or more children from the container
   */
  public removeChild(...children: (PIXIContainer | IRenderLayer)[]): PIXIContainer {
    if (this._reparentAddedChild) {
      children.forEach((child) => {
        const actualChild = this._childMap.get(child as PIXIContainer) as PIXIContainer;
        if (actualChild) {
          return super.removeChild(actualChild);
        }
        return undefined;
      });
    } else {
      return super.removeChild(...(children as PIXIContainer[]));
    }
    return children[0] as PIXIContainer;
  }

  public resize() {
    console.log('UICanvas:: Resizing', this.config.useAppSize);
    if (this.config.useAppSize) {
      Logger.log('UICanvas:: Resizing to app size', this.app.size);
      this.size = { width: this.app.size.width, height: this.app.size.height };
      this.position.set(-this.app.size.width * 0.5, -this.app.size.height * 0.5);
    } else {
      this.updateLayout();
    }
  }

  public updateLayout() {
    this.app.renderer.layout.update(this);

    this._positionContainers.forEach((container) => {
      this.app.renderer.layout.update(container);
    });

    if (this.config.useAppSize) {
      this.position.set(-this.config.size.width * 0.5, -this.config.size.height * 0.5);
    }

    if (this.config.debug) {
      this.app.ticker.addOnce(this.drawDebug);
    }
  }

  public addElement<U extends PIXIContainer = PIXIContainer>(
    child: PIXIContainer,
    settings?: Partial<UICanvasChildProps>,
  ): U {
    const position = settings?.align ?? 'top left';
    const container = this._positionContainers.get(position);

    if (!container) {
      Logger.error(`UICanvas:: Invalid position "${position}" for element`);
      return child as U;
    }

    if (UICanvas.isFlexContainer(child as PIXIContainer)) {
      this.addSignalConnection((child as unknown as FlexContainer).onLayoutComplete.connect(this.updateLayout));
    }

    this.settingsMap.set(child, {
      align: position,
      padding: settings?.padding ? ensurePadding(settings.padding) : { top: 0, left: 0, bottom: 0, right: 0 },
    });

    this._childMap.set(child, container);
    this._canvasChildren = Array.from(this._childMap.keys());

    container.add.existing(child);
    this._childAdded(child);

    return child as U;
  }

  private _childAdded(child: PIXIContainer) {
    if (this.config.autoLayoutChildren) {
      if (!child.layout) {
        child.layout = true;
      }
      if (!child.layout?.style?.width) {
        child.layout = { width: 'auto' };
      }
      if (!child.layout?.style?.height) {
        child.layout = { height: 'auto' };
      }
    }
    child.on('layout', this.updateLayout);
    Container.childAdded(child);
    this.updateLayout();
  }

  private _childRemoved(child: any) {
    this.settingsMap.delete(child);
    this._childMap.delete(child as PIXIContainer);
    this._canvasChildren = Array.from(this._childMap.keys());
    Container.childRemoved(child);
  }

  private _added() {
    this.updateLayout();
  }

  private drawDebug() {
    if (!this._debugGraphics && this.parent) {
      this._debugGraphics = this.make.graphics({
        layout: false,
        eventMode: 'none',
      });
      this.parent.addChild(this._debugGraphics);
      this._debugGraphics.layout = false;
    }
    this._outerBounds = new Rectangle(0, 0, this.config.size.width, this.config.size.height);

    if (this._debugGraphics) {
      this._debugGraphics.position.set(this.position.x, this.position.y);
    }

    this._displayBounds = new Rectangle(
      this.config.padding.left,
      this.config.padding.top,
      this.config.size.width - this.config.padding.right - this.config.padding.left,
      this.config.size.height - this.config.padding.bottom - this.config.padding.top,
    );

    const centerX = this._outerBounds.x + this._outerBounds.width / 2;
    const centerY = this._outerBounds.y + this._outerBounds.height / 2;

    this._debugGraphics
      .clear()
      // Outer area
      .rect(this._outerBounds.x, this._outerBounds.y, this._outerBounds.width, this._outerBounds.height)
      .stroke({
        width: 1,
        color: 0xff0000,
        alpha: 0.5,
        pixelLine: true,
      })
      // Inner area
      .rect(this._displayBounds.x, this._displayBounds.y, this._displayBounds.width, this._displayBounds.height)
      .stroke({
        width: 1,
        color: 0x00ff00,
        alpha: 0.5,
        pixelLine: true,
      })
      // Center crosshairs
      .moveTo(centerX, centerY - 10)
      .lineTo(centerX, centerY + 10)
      .stroke({
        width: 1,
        color: 0xff0000,
        alpha: 0.5,
        pixelLine: true,
      })
      .moveTo(centerX - 10, centerY)
      .lineTo(centerX + 10, centerY)
      .stroke({
        width: 1,
        color: 0xff0000,
        alpha: 0.5,
      });
  }
}
