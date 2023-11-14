import { Container as PIXIContainer, DisplayObject, IDestroyOptions, IPoint } from 'pixi.js';
import { Signal } from 'typed-signals';
import { PointLike, resolvePointLike } from '../utils';
import { Container } from './Container';

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
  private _layoutTimeout: any;

  set gap(value: number) {
    this._settings.gap = value;
    this.layout();
  }

  get gap(): number {
    return this._settings.gap!;
  }

  set flexWrap(value: 'wrap' | 'nowrap') {
    this._settings.flexWrap = value;
    this.layout();
  }

  get flexWrap(): 'wrap' | 'nowrap' {
    return this._settings.flexWrap!;
  }

  set flexDirection(value: 'row' | 'column') {
    this._settings.flexDirection = value;
    this.layout();
  }

  get flexDirection(): 'row' | 'column' {
    return this._settings.flexDirection!;
  }

  set alignItems(value: 'center' | 'flex-start' | 'flex-end') {
    this._settings.alignItems = value;
    this.layout();
  }

  get alignItems(): 'center' | 'flex-start' | 'flex-end' {
    return this._settings.alignItems!;
  }

  set justifyContent(value: 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end') {
    this._settings.justifyContent = value;
    this.layout();
  }

  get justifyContent(): 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end' {
    return this._settings.justifyContent!;
  }

  set containerHeight(value: number) {
    this._settings.height = value;
    this.layout();
  }

  get containerHeight(): number {
    return this._settings.height;
  }

  set containerWidth(value: number) {
    this._settings.width = value;
    this.layout();
  }

  get containerWidth(): number {
    return this._settings.width;
  }

  set size(size: PointLike) {
    const { x, y } = resolvePointLike(size);
    this._settings.width = x;
    this._settings.height = y;
    this.layout();
  }

  get size(): { width: number; height: number } {
    return { width: this._settings.width, height: this._settings.height };
  }

  constructor(settings: Partial<FlexContainerSettings> = {}) {
    super(true);
    this.handleChildAdded = this.handleChildAdded.bind(this);
    this.handleChildRemoved = this.handleChildRemoved.bind(this);
    this.layout = this.layout.bind(this);
    this._layout = this._layout.bind(this);

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

  handleChildAdded(child: any) {
    if (child instanceof FlexContainer) {
      child.onLayoutComplete.connect(this.layout);
    }
    this.layout();
  }

  handleChildRemoved(child: any) {
    if (child instanceof FlexContainer) {
      child.onLayoutComplete.disconnect(this.layout);
    }
    this.layout();
  }

  destroy(_options?: IDestroyOptions | boolean) {
    this.children.forEach((child) => {
      if (child instanceof FlexContainer) {
        child.onLayoutComplete.disconnect(this.layout);
      }
    });
    this.off('childAdded', this.handleChildAdded);
    super.destroy(_options);
  }

  public onResize(_size: IPoint) {
    this.layout();
  }

  public layout(immediate: boolean = false) {
    this._layout();
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
            offset = i * (extraSpace / (lineItems.length - 1));
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
              props.x = width ? width - childRef.width : childRef.width;
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

    this.onLayoutComplete.emit();
  }
}
