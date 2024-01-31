import { Container as PIXIContainer, DisplayObject, IDestroyOptions, IPoint } from 'pixi.js';
import { Signal } from 'typed-signals';
import { Container } from '../gameobjects';
import { PointLike, resolvePointLike } from '../utils';

export type ContainerLike = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export interface FlexContainerSettings {
  width: number;
  height: number;
  bindTo: ContainerLike;
  bindToAppSize: boolean;
  gap: number;
  flexWrap: 'wrap' | 'nowrap';
  flexDirection: 'row' | 'column';
  alignItems: 'center' | 'flex-start' | 'flex-end';
  justifyContent: 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end';
}

export class FlexContainer extends Container {
  public onLayoutComplete: Signal<() => void> = new Signal<() => void>();
  public debug: boolean = false;

  protected paddingLeft: number = 0;
  protected paddingRight: number = 0;
  protected paddingTop: number = 0;
  protected paddingBottom: number = 0;
  protected _settings: FlexContainerSettings;
  protected _childMap = new Map<PIXIContainer<DisplayObject>, PIXIContainer<DisplayObject>>();
  protected _flexChildren: DisplayObject[] = [];

  private _reparentAddedChild: boolean = true;

  constructor(settings: Partial<FlexContainerSettings> = {}) {
    super(true);

    this._settings = Object.assign(
      {
        bindTo: null,
        width: 0,
        height: 0,
        gap: 0,
        flexWrap: 'nowrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 0,
      },
      settings,
    );

    this.on('childAdded', this.handleChildAdded);
    this.on('childRemoved', this.handleChildRemoved);

    this.layout();
  }

  get gap(): number {
    return this._settings.gap!;
  }

  set gap(value: number) {
    this._settings.gap = value;
    this.layout();
  }

  get flexWrap(): 'wrap' | 'nowrap' {
    return this._settings.flexWrap!;
  }

  set flexWrap(value: 'wrap' | 'nowrap') {
    this._settings.flexWrap = value;
    this.layout();
  }

  get flexDirection(): 'row' | 'column' {
    return this._settings.flexDirection!;
  }

  set flexDirection(value: 'row' | 'column') {
    this._settings.flexDirection = value;
    this.layout();
  }

  get alignItems(): 'center' | 'flex-start' | 'flex-end' {
    return this._settings.alignItems!;
  }

  set alignItems(value: 'center' | 'flex-start' | 'flex-end') {
    this._settings.alignItems = value;
    this.layout();
  }

  get justifyContent(): 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end' {
    return this._settings.justifyContent!;
  }

  set justifyContent(value: 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end') {
    this._settings.justifyContent = value;
    this.layout();
  }

  get containerHeight(): number {
    return this._settings.height;
  }

  set containerHeight(value: number) {
    this._settings.height = value;
    this.layout();
  }

  get containerWidth(): number {
    return this._settings.width;
  }

  set containerWidth(value: number) {
    this._settings.width = value;
    this.layout();
  }

  get size(): { width: number; height: number } {
    return { width: this._settings.width, height: this._settings.height };
  }

  set size(size: PointLike) {
    const { x, y } = resolvePointLike(size);
    this._settings.width = x;
    this._settings.height = y;
    this.layout();
  }

  get flexChildren() {
    return this._flexChildren;
  }

  destroy(_options?: IDestroyOptions | boolean) {
    this.off('childAdded', this.handleChildAdded);
    this.off('childRemoved', this.handleChildRemoved);

    super.destroy(_options);
  }

  public onResize(_size: IPoint) {
    this.layout();
  }

  public removeChildAt(index: number): DisplayObject {
    return this.removeChild(this.flexChildren[index]);
  }

  public removeChild(...children: DisplayObject[]): DisplayObject {
    if (this._reparentAddedChild) {
      children.forEach((child) => {
        const actualChild = this._childMap.get(child as PIXIContainer<DisplayObject>) as DisplayObject;
        if (actualChild) {
          return super.removeChild(actualChild);
        }
      });
    } else {
      return super.removeChild(...children);
    }
    return children[0];
  }

  public addChildAt<U extends DisplayObject = DisplayObject>(child: DisplayObject, index: number): U {
    const newChild = this.add.existing(child);
    this.setChildIndex(newChild, index);
    return newChild as U;
  }

  public setChildIndex(child: DisplayObject, index: number): void {
    const actualChild = this._childMap.get(child as PIXIContainer<DisplayObject>) as DisplayObject;
    if (actualChild) {
      super.setChildIndex(actualChild, index);
      this.setFlexChildren();
      this.layout();
    }
  }

  public getChildIndex(child: DisplayObject): number {
    if (this._childMap.has(child as PIXIContainer<DisplayObject>)) {
      return super.getChildIndex(child.parent);
    }
    return super.getChildIndex(child);
  }

  public getChildAt(index: number): DisplayObject {
    return (super.getChildAt(index) as PIXIContainer)?.getChildAt(0);
  }

  public layout() {
    this._layout();
  }

  protected handleChildRemoved(child: DisplayObject) {
    if (this._reparentAddedChild) {
      if (!this.deleteChild(child)) {
        child = (child as Container).getChildAt(0);
        this.deleteChild(child);
      }
    }
  }

  protected deleteChild(child: DisplayObject) {
    const isInMap = this._childMap.has(child as PIXIContainer<DisplayObject>);
    if (isInMap) {
      this._childMap.delete(child as PIXIContainer<DisplayObject>);
      this.setFlexChildren();
      this.layout();
      return true;
    }
    return false;
  }

  protected setFlexChildren() {
    this._flexChildren = Array.from(this._childMap.keys());
    // order by the actual index in the container
    this._flexChildren.sort((a, b) => this.getChildIndex(a) - this.getChildIndex(b));
  }

  protected handleChildAdded(child: any) {
    // avoid maximum call stack error b/c we're about to add a container
    if (!this._reparentAddedChild) return;
    this._reparentAddedChild = false;
    // add an inner container so we can account for e.g. sprite that are added with anchors
    // re-parent the added child to the inner container
    const container = this.add.container();
    container.add.existing(child);
    // figure out the bounds of the inner container
    // then, offset its pivot so that it's top-left corner is always at 0,0
    const bounds = container.getLocalBounds();
    if (bounds.x < 0) {
      container.pivot.x = bounds.x;
    }
    if (bounds.y < 0) {
      container.pivot.y = bounds.y;
    }

    if (child instanceof FlexContainer) {
      this.addSignalConnection(child.onLayoutComplete.connect(this.layout));
    }

    this._childMap.set(child, container);
    this.setFlexChildren();

    this.layout();
    this._reparentAddedChild = true;
  }

  private _layout() {
    if (this._settings.bindTo) {
      this._settings.width = this._settings.bindTo?.width ?? 0;
      this._settings.height = this._settings.bindTo?.height ?? 0;
    }

    if (this._settings.bindToAppSize) {
      this._settings.width = this.app.size.x;
      this._settings.height = this.app.size.y;
    }

    const canHaveEndlessWidthOrHeight = ['flex-start'];

    let { width, height } = this._settings;
    const { gap, flexDirection, flexWrap, alignItems, justifyContent } = this._settings;

    if (
      this._settings.flexDirection === 'row' &&
      this._settings.flexWrap === 'nowrap' &&
      canHaveEndlessWidthOrHeight.includes(this._settings.justifyContent)
    ) {
      width = Infinity;
    } else if (
      this._settings.flexDirection === 'column' &&
      this._settings.flexWrap === 'nowrap' &&
      canHaveEndlessWidthOrHeight.includes(this._settings.justifyContent)
    ) {
      height = Infinity;
    }

    let layoutProps: { x: number; y: number }[] = [];

    let x = 0;
    let y = 0;
    let rowHeight = 0;
    let columnWidth = 0;
    let nextRowY = 0; // y-coordinate of the next row
    let nextColumnX = 0; // x-coordinate of the next column
    const newLayoutProps: { x: number; y: number }[] = [];
    const items = this.children.filter(Boolean);
    let lineItems: { index: number; width: number; height: number }[] = [];
    let lineStart = 0;

    const shouldWrap = (childRef: PIXIContainer, x: number, y: number) =>
      (flexDirection === 'row' && x + childRef.width + gap! > width!) ||
      (flexDirection === 'column' && y + childRef.height + gap! > height!);

    const handleWrap = () => {
      if (flexDirection === 'row') {
        nextRowY += rowHeight + gap!;
      } else {
        nextColumnX += columnWidth + gap!;
      }
      x = 0;
      y = 0;
      rowHeight = 0;
      columnWidth = 0;
    };

    const updateLayoutVariables = (childRef: PIXIContainer) => {
      if (flexDirection === 'row') {
        x += childRef.width + gap!;
        rowHeight = Math.max(rowHeight, childRef.height);
      } else {
        y += childRef.height + gap!;
        columnWidth = Math.max(columnWidth, childRef.width);
      }
    };

    const getNextX = (currentX: number) => (flexDirection === 'row' ? currentX : nextColumnX);
    const getNextY = (currentY: number) => (flexDirection === 'column' ? currentY : nextRowY);

    const handleJustification = (
      lineItems: { index: number; width: number; height: number }[],
      lineStart: number,
      lineEnd: number,
      direction: 'row' | 'column',
    ) => {
      const extraSpace = (direction === 'row' ? width! : height!) - (lineEnd - lineStart);
      lineItems.forEach(({ index, width, height }, i) => {
        let offset = 0;
        switch (justifyContent) {
          case 'flex-start':
            break; // Do nothing
          case 'flex-end':
            offset = extraSpace;
            break;
          case 'center':
            offset = extraSpace / 2;
            break;
          case 'space-between':
            offset = lineItems.length > 1 ? i * (extraSpace / (lineItems.length - 1)) : 0;
            break;
          case 'space-around':
            offset = (extraSpace / lineItems.length) * i + extraSpace / (2 * lineItems.length);
            break;
          case 'space-evenly':
            offset = (extraSpace / (lineItems.length + 1)) * (i + 1);
            break;
        }
        if (direction === 'row') {
          newLayoutProps[index].x += offset;
        } else {
          newLayoutProps[index].y += offset;
        }
      });
    };

    const handleAlignment = (newLayoutProps: { x: number; y: number }[], items: (DisplayObject | null)[]) => {
      newLayoutProps.forEach((props, index) => {
        const childRef = items[index] as PIXIContainer;
        if (!childRef) return;

        if (flexDirection === 'row') {
          switch (alignItems) {
            case 'flex-start':
              break;
            case 'flex-end':
              props.y += rowHeight - childRef.height;
              break;
            case 'center':
              props.y += (rowHeight - childRef.height) / 2;
              break;
          }
        } else {
          switch (alignItems) {
            case 'flex-start':
              break;
            case 'flex-end':
              props.x = width ? width - childRef.width : -childRef.width;
              break;
            case 'center':
              props.x += (width - childRef.width) / 2;
              break;
          }
        }
      });
    };

    items.forEach((childRef, index) => {
      if (!childRef) return;

      const item = childRef as PIXIContainer;

      // Check for wrapping
      if (flexWrap === 'wrap' && shouldWrap(item, x, y)) {
        handleJustification(lineItems, lineStart, flexDirection === 'column' ? y - gap : x - gap, flexDirection);
        handleWrap();
        lineItems = [];
        lineStart = x;
      }

      lineItems.push({ index, width: item.width, height: item.height });

      // Position child
      newLayoutProps[index] = { x: getNextX(x), y: getNextY(y) };

      // Update layout variables
      updateLayoutVariables(item);
    });

    // Justify the last line
    handleJustification(lineItems, lineStart, flexDirection === 'column' ? y - gap : x - gap, flexDirection);
    handleAlignment(newLayoutProps, items);

    layoutProps = newLayoutProps;

    items.forEach((childRef, index) => {
      const item = childRef as PIXIContainer;
      const { x, y } = layoutProps[index] || { x: 0, y: 0 };
      item.position.set(x, y);
    });

    // handle alignment within container bounds
    const totalHeight = this.children.reduce(
      (acc, child) => Math.max(acc, child.y + (child as PIXIContainer).height),
      0,
    );
    this.children.forEach((child) => {
      if (this._settings.flexDirection === 'row') {
        switch (this._settings.alignItems) {
          case 'center':
            child.y -= (totalHeight - height) * 0.5;
            break;
          case 'flex-end':
            child.y += height - totalHeight;
            break;
        }
      }
    });
    this.onLayoutComplete.emit();
  }
}
