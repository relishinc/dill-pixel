import { Container as PIXIContainer, DisplayObject, Graphics, Rectangle } from 'pixi.js';
import { Container } from '../gameobjects';
import { PointLike, resolvePointLike } from '../utils';
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
  padding: number;
}

export type UICanvasSettings = {
  debug: boolean;
  padding: UICanvasPadding;
  size: PointLike;
  isBoundToStage: boolean;
};

export type UICanvasProps = {
  debug: boolean;
  padding: Partial<UICanvasPadding> | { x: number; y: number } | number;
  size?: PointLike;
};

export type UICanvasPadding = { top: number; right: number; bottom: number; left: number };

function ensurePadding(padding: any): UICanvasPadding {
  if (typeof padding === 'number') {
    return { top: padding, right: padding, bottom: padding, left: padding };
  } else if (typeof padding === 'object') {
    if (padding.x !== undefined && padding.y !== undefined) {
      return { top: padding.y, right: padding.x, bottom: padding.y, left: padding.x };
    } else {
      if (padding.top === undefined) padding.top = 0;
      if (padding.right === undefined) padding.right = 0;
      if (padding.bottom === undefined) padding.bottom = 0;
      if (padding.left === undefined) padding.left = 0;
    }
    return padding;
  } else {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }
}

export class UICanvas extends Container {
  protected _outerBounds: Rectangle;
  protected _displayBounds: Rectangle;
  protected settingsMap = new Map<PIXIContainer<DisplayObject>, UICanvasChildSettings>();
  protected _settings: UICanvasSettings;
  protected _childMap = new Map<PIXIContainer<DisplayObject>, PIXIContainer<DisplayObject>>();
  protected _canvasChildren: DisplayObject[] = [];

  protected _debugGraphics: Graphics;

  constructor(settings: Partial<UICanvasProps> = { padding: 0 }) {
    super(true, settings.debug === true);
    this._settings = {
      debug: settings.debug === true,
      padding: ensurePadding(settings.padding),
      size: settings.size ?? 0,
      isBoundToStage: !settings.size,
    };
    this.on('childRemoved', this.handleChildRemoved);
  }

  public get canvasChildren(): DisplayObject[] {
    return this._canvasChildren;
  }

  get bounds() {
    return this._bounds;
  }

  set size(value: PointLike) {
    this._settings.size = value;
    this._settings.isBoundToStage = this._settings.size === undefined || !this._settings.size;
    this.onResize();
  }

  set padding(value: Partial<UICanvasPadding> | { x: number; y: number } | number) {
    this._settings.padding = ensurePadding(value);
    this.onResize();
  }

  public onResize() {
    const _size = this._settings.isBoundToStage ? this.app.size : resolvePointLike(this._settings.size);
    this._displayBounds = this.__calculateBounds(_size);
    this._outerBounds = this.__calculateOuterBounds(_size);
    this.setPosition();
    this.layout();
  }

  public update() {
    if (this._settings.debug) {
      this.drawDebug();
    }
  }

  public removeChildAt(index: number): DisplayObject {
    return this.removeChild(this.canvasChildren[index]);
  }

  public removeChild(...children: DisplayObject[]): DisplayObject {
    children.forEach((child) => {
      const actualChild = this._childMap.get(child as PIXIContainer<DisplayObject>) as DisplayObject;
      if (actualChild) {
        return super.removeChild(actualChild);
      }
    });
    return children[0];
  }

  public getChildAt(index: number): DisplayObject {
    return this._canvasChildren[index];
  }

  public layout() {
    this.children.forEach((child) => {
      const childObj = child as PIXIContainer<DisplayObject>;
      const settings = this.settingsMap.get(childObj);
      if (settings) {
        this.applySettings(childObj, settings);
      }
    });
  }

  public addElement(child: PIXIContainer, settings?: Partial<UICanvasChildSettings>): PIXIContainer {
    // avoid maximum call stack error b/c we're about to add a container
    const container = this.add.container();
    container.addChild(child);
    const bounds = container.getLocalBounds();
    if (bounds.x < 0) {
      container.pivot.x = bounds.x;
    }
    if (bounds.y < 0) {
      container.pivot.y = bounds.y;
    }
    if ((child as any) instanceof FlexContainer) {
      this.addSignalConnection((child as FlexContainer).onLayoutComplete.connect(this.layout));
    }
    this.settingsMap.set(container, {
      align: settings?.align ?? 'top left',
      padding: settings?.padding ?? 0,
    });
    this._childMap.set(child, container);
    this._canvasChildren = Array.from(this._childMap.keys());

    this.onResize();
    return child;
  }

  public reAlign(child: PIXIContainer<DisplayObject>, settings: Partial<UICanvasChildSettings> | UICanvasEdge) {
    let currentSettings = this.settingsMap.get(child?.parent);
    if (currentSettings) {
      const _settings = typeof settings === 'string' ? { align: settings } : settings;
      this.settingsMap.set(child?.parent, { ...currentSettings, ..._settings });
      currentSettings = this.settingsMap.get(child?.parent);
      this.applySettings(child?.parent, currentSettings!);
    } else {
      console.warn('Cannot re-align child because it is not a child of this UICanvas', child);
    }
  }

  protected setPosition() {
    const appSize = this.app.size;
    this.position.set(this._displayBounds.x, this._displayBounds.y);
    this.position.x -= appSize.x / 2;
    this.position.y -= appSize.y / 2;
  }

  protected __calculateBounds(_size: PointLike): Rectangle {
    const pt = resolvePointLike(_size);
    return new Rectangle(
      this._settings.padding.left,
      this._settings.padding.top,
      pt.x - this._settings.padding.left - this._settings.padding.right,
      pt.y - this._settings.padding.top - this._settings.padding.bottom,
    );
  }

  protected __calculateOuterBounds(_size: PointLike): Rectangle {
    const pt = resolvePointLike(_size);
    return new Rectangle(0, 0, pt.x, pt.y);
  }

  protected handleChildRemoved(child: any) {
    this.settingsMap.delete(child);
    this._childMap.delete(child as PIXIContainer<DisplayObject>);
    this._canvasChildren = Array.from(this._childMap.keys());
  }

  private applySettings(child: PIXIContainer<DisplayObject>, settings: UICanvasChildSettings) {
    if (!settings) return;
    const screenWidth = this._displayBounds.width;
    const screenHeight = this._displayBounds.height;

    const firstChild = (child as PIXIContainer).getChildAt(0);

    const childWidth = firstChild instanceof FlexContainer ? firstChild.containerWidth || child.width : child.width;
    const childHeight = firstChild instanceof FlexContainer ? firstChild.containerHeight || child.height : child.height;

    switch (settings.align) {
      case 'top right':
        child.x = screenWidth - settings.padding - childWidth;
        child.y = settings.padding;
        break;
      case 'top left':
        child.x = settings.padding;
        child.y = settings.padding;
        break;
      case 'top center':
      case 'top':
        child.x = (screenWidth - childWidth) / 2;
        child.y = settings.padding;
        break;
      case 'bottom right':
        child.x = screenWidth - settings.padding - childWidth;
        child.y = screenHeight - settings.padding - childHeight;
        break;
      case 'bottom left':
        console.log('bl', settings.padding, childHeight);
        child.x = settings.padding;
        child.y = screenHeight - settings.padding - childHeight;
        break;
      case 'bottom center':
      case 'bottom':
        child.x = (screenWidth - child.width) / 2;
        child.y = screenHeight - settings.padding - childHeight;
        break;
      case 'left top':
        child.x = settings.padding;
        child.y = settings.padding;
        break;
      case 'left bottom':
        child.x = settings.padding;
        child.y = screenHeight - settings.padding - childHeight;
        break;
      case 'left center':
      case 'left':
        child.x = settings.padding;
        child.y = (screenHeight - childHeight) / 2;
        break;
      case 'right top':
        child.x = screenWidth - settings.padding - childWidth;
        child.y = settings.padding;
        break;
      case 'right bottom':
        child.x = screenWidth - settings.padding;
        child.y = screenHeight - settings.padding;
        break;
      case 'right center':
      case 'right':
        child.x = screenWidth - settings.padding - childWidth;
        child.y = (screenHeight - childHeight) / 2;
        break;
      case 'center':
        console.log({ childWidth });
        child.x = (screenWidth - childWidth) / 2;
        child.y = (screenHeight - childHeight) / 2;
        break;
    }
  }

  private drawDebug() {
    if (!this._debugGraphics) {
      this._debugGraphics = this.add.graphics();
    }
    this._debugGraphics.clear();
    this._debugGraphics.lineStyle(1, 0xff0000, 0.5, 0, true);
    this._debugGraphics.drawRect(0, 0, this._displayBounds.width, this._displayBounds.height);
    this._debugGraphics.drawRect(
      -this._settings.padding.left,
      -this._settings.padding.top,
      this._outerBounds.width,
      this._outerBounds.height,
    );

    // draw a cross in the middle
    this._debugGraphics.moveTo(this._displayBounds.width / 2, this._displayBounds.height / 2 - 10);
    this._debugGraphics.lineTo(this._displayBounds.width / 2, this._displayBounds.height / 2 + 10);
    this._debugGraphics.moveTo(this._displayBounds.width / 2 - 10, this._displayBounds.height / 2);
    this._debugGraphics.lineTo(this._displayBounds.width / 2 + 10, this._displayBounds.height / 2);
  }
}
