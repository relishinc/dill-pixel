import { DestroyOptions } from 'pixi.js';
import { Application } from '../core/Application';
import { Factory } from '../mixins/factory';
import { SignalContainer } from '../mixins/signalContainer';
import { PIXIContainer } from '../pixi';
import { Signal } from '../signals';
import { resolvePointLike } from '../utils/functions';
import { bindAllMethods } from '../utils/methodBinding';
import { ContainerLike, PointLike } from '../utils/types';

const _FlexContainer = SignalContainer(Factory());

export interface FlexContainerConfig {
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

export const FlexContainerConfigKeys: (keyof FlexContainerConfig)[] = [
  'width',
  'height',
  'bindTo',
  'bindToAppSize',
  'gap',
  'flexWrap',
  'flexDirection',
  'alignItems',
  'justifyContent',
];

const defaultConfig = {
  bindTo: null,
  width: 0,
  height: 0,
  gap: 0,
  flexWrap: 'nowrap',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  padding: 0,
};

export interface IFlexContainer {
  onLayoutComplete: Signal<() => void>;
  debug: boolean;
  config: FlexContainerConfig;

  removeChildren<U extends PIXIContainer>(): U[];

  removeChildAt<U extends PIXIContainer>(index: number): U;

  addChildAt<U extends PIXIContainer>(child: U, index: number): U;

  setChildIndex<U extends PIXIContainer>(child: U, index: number): void;

  getChildIndex<U extends PIXIContainer>(child: U): number;

  getChildAt<U extends PIXIContainer>(index: number): U;

  setFlexChildren(): void;

  cleanup(): void;

  handleChildAdded(child: any): void;

  deleteChild(child: PIXIContainer): boolean;

  layout(): void;

  resize(): void;

  update(): void;

  added(): void;
}

export type FlexWrap = 'wrap' | 'nowrap';
export type FlexDirection = 'row' | 'column';
export type AlignItems = 'center' | 'flex-start' | 'flex-end';
export type JustifyContent = 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end';

export class FlexContainer<T extends Application = Application> extends _FlexContainer {
  public onLayoutComplete: Signal<() => void> = new Signal<() => void>();
  public debug: boolean = false;
  public config: FlexContainerConfig;
  /**
   * Removes all the children from the container
   * Override because we need to ensure it returns the proper re-parented children
   */
  public removeChildren = <U extends PIXIContainer>() => {
    const children = this.flexChildren;
    this.removeChild(...children);
    return children as U[];
  };
  /**
   * Removes a child from the container at the specified index
   * Override because we need to remove from the inner container
   */
  public removeChildAt = <U extends PIXIContainer>(index: number): U => {
    return this.removeChild(this.flexChildren[index]) as U;
  };
  /**
   * Adds a child to the container at the specified index
   * Override because we need to ensure it sets the child index properly
   */
  public addChildAt = <U extends PIXIContainer>(child: U, index: number) => {
    const newChild = this.add.existing(child);
    this.setChildIndex(newChild, index);
    return newChild;
  };
  /**
   * Sets the index of the child in the container
   * Override because we need to ensure it targets the parent container that we added
   */
  public setChildIndex = <U extends PIXIContainer>(child: U, index: number) => {
    const actualChild = this._childMap.get(child as PIXIContainer);
    if (actualChild) {
      super.setChildIndex(actualChild, index);
      this.setFlexChildren();
      this.layout();
    }
  };
  /**
   * Gets the index of a child in the container
   * Override because we need to ensure it targets the parent container that we added
   * @param {DisplayObject} child
   * @param {number} index
   * @returns {U}
   */
  public getChildIndex = <U extends PIXIContainer>(child: U) => {
    if (this._childMap.has(child as PIXIContainer)) {
      return super.getChildIndex(child.parent);
    }
    return super.getChildIndex(child);
  };
  /**
   * Gets the child at the specified index
   * Override due to re-parenting
   */
  public getChildAt = <U extends PIXIContainer>(index: number) => {
    return super.getChildAt(index)?.getChildAt(0) as U;
  };
  protected paddingLeft: number = 0;
  protected paddingRight: number = 0;
  protected paddingTop: number = 0;
  protected paddingBottom: number = 0;
  protected _childMap = new Map<PIXIContainer, PIXIContainer>();
  protected _flexChildren: PIXIContainer[] = [];
  private _reparentAddedChild: boolean = true;

  constructor(config: Partial<FlexContainerConfig> = {}) {
    super();

    // Bind all methods of this class to the current instance.
    bindAllMethods(this);
    this.config = Object.assign({ ...defaultConfig }, config);

    // Add an event listener for the 'added' event.
    this.on('added', this._added);
    this.on('childAdded', this.handleChildAdded);
    this.on('childRemoved', this.handleChildRemoved);

    this.layout();
  }

  get gap(): number {
    return this.config.gap!;
  }

  set gap(value: number) {
    this.config.gap = value;
    this.layout();
  }

  get flexWrap(): FlexWrap {
    return this.config.flexWrap!;
  }

  set flexWrap(value: FlexWrap) {
    this.config.flexWrap = value;
    this.layout();
  }

  get flexDirection(): FlexDirection {
    return this.config.flexDirection!;
  }

  set flexDirection(value: FlexDirection) {
    this.config.flexDirection = value;
    this.layout();
  }

  get alignItems(): AlignItems {
    return this.config.alignItems!;
  }

  set alignItems(value: AlignItems) {
    this.config.alignItems = value;
    this.layout();
  }

  get justifyContent(): JustifyContent {
    return this.config.justifyContent!;
  }

  set justifyContent(value: JustifyContent) {
    this.config.justifyContent = value;
    this.layout();
  }

  get containerHeight(): number {
    return this.config.height;
  }

  set containerHeight(value: number) {
    this.config.height = value;
    this.layout();
  }

  get containerWidth(): number {
    return this.config.width;
  }

  set containerWidth(value: number) {
    this.config.width = value;
    this.layout();
  }

  get size(): { width: number; height: number } {
    return { width: this.config.width, height: this.config.height };
  }

  set size(size: PointLike) {
    const { x, y } = resolvePointLike(size);
    this.config.width = x;
    this.config.height = y;
    this.layout();
  }

  get flexChildren() {
    return this._flexChildren;
  }

  /**
   * Get the application instance.
   */
  public get app(): T {
    return Application.getInstance() as T;
  }

  destroy(_options?: DestroyOptions | boolean) {
    this.off('childAdded', this.handleChildAdded);
    this.off('childRemoved', this.handleChildRemoved);

    super.destroy(_options);
  }

  /**
   * Removes one or more children from the container
   * Override because we need to ensure it returns the proper re-parented children
   * @param children
   */
  public removeChild(...children: PIXIContainer[]): PIXIContainer {
    if (this._reparentAddedChild) {
      children.forEach((child) => {
        const actualChild = this._childMap.get(child);
        if (actualChild) {
          return super.removeChild(actualChild);
        }
      });
    } else {
      return super.removeChild(...children);
    }
    return children[0];
  }

  /**
   * Public method to manually trigger a layout
   */
  public layout() {
    this.app.ticker.addOnce(this._layout, this);
  }

  resize() {
    this.layout();
  }

  update() {}

  added() {}

  /**
   * Ensures we delete the child from the map when it's removed
   * @protected
   */
  protected handleChildRemoved(child: PIXIContainer) {
    if (this._reparentAddedChild) {
      if (!this.deleteChild(child)) {
        child = (child as PIXIContainer).getChildAt(0);
        this.deleteChild(child);
      }
    }
  }

  /**
   * Deletes a child from the map
   * @param {PIXIContainer} child
   * @returns {boolean}
   * @protected
   */
  protected deleteChild(child: PIXIContainer): boolean {
    const isInMap = this._childMap.has(child as PIXIContainer);
    if (isInMap) {
      // disconnect signal
      if (child instanceof FlexContainer) {
        try {
          child.onLayoutComplete.disconnect(this.layout);
        } catch (e) {
          console.warn(`FlexContainer:: Error disconnecting signal from removed child`);
          console.warn(e);
        }
      }
      this._childMap.delete(child as PIXIContainer);
      this.setFlexChildren();
      this.layout();
      return true;
    }
    return false;
  }

  /**
   * Sorts the children in the container
   * Needed because we need to ensure re-parented children are sorted by their actual index in the container
   * @protected
   */
  protected setFlexChildren() {
    this._flexChildren = Array.from(this._childMap.keys());
    // order by the actual index in the container
    this._flexChildren.sort((a, b) => this.getChildIndex(a) - this.getChildIndex(b));
    this.cleanup();
  }

  /**
   * Ensure we don't leave empty containers after setting child indices or adding / removing children
   * @protected
   */
  protected cleanup() {
    if (this.flexChildren.length === this.children.length) return;
    // remove any children that are not in the flex children list
    this.children.forEach((child) => {
      if (!(child as PIXIContainer)?.children?.length) {
        super.removeChild(child);
      }
    });
  }

  /**
   * Re-parent a child to account for e.g. sprite that are added with anchors
   * @param child
   * @protected
   */
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

  /**
   * Lay out the children according to the settings
   * Tries to follow the CSS Flexbox model as closely as possible
   * @private
   */
  private _layout() {
    if (this.config.bindTo) {
      this.config.width = this.config.bindTo?.width ?? 0;
      this.config.height = this.config.bindTo?.height ?? 0;
    }

    if (this.config.bindToAppSize) {
      this.config.width = this.app.size.width;
      this.config.height = this.app.size.height;
    }

    const canHaveEndlessWidthOrHeight = ['flex-start'];

    let { width, height } = this.config;
    const { gap, flexDirection, flexWrap, alignItems, justifyContent } = this.config;

    if (
      this.config.flexDirection === 'row' &&
      this.config.flexWrap === 'nowrap' &&
      canHaveEndlessWidthOrHeight.includes(this.config.justifyContent)
    ) {
      width = Infinity;
    } else if (
      this.config.flexDirection === 'column' &&
      this.config.flexWrap === 'nowrap' &&
      canHaveEndlessWidthOrHeight.includes(this.config.justifyContent)
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

    const handleAlignment = (newLayoutProps: { x: number; y: number }[], items: (PIXIContainer | null)[]) => {
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
      if (this.config.flexDirection === 'row') {
        switch (this.config.alignItems) {
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

  private _added() {
    this.addSignalConnection(this.app.onResize.connect(this.resize, 0));
    this.added();
  }
}
