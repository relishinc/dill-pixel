import { IDestroyOptions } from 'pixi.js';
import { Signal } from 'typed-signals';
import { Signals } from '../signals';
import { Container } from './Container';

export type ContainerLike = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export interface FlexContainerSettings {
  width?: number;
  height?: number;
  bindTo?: ContainerLike;
  bindToAppSize?: boolean;
  gap?: number;
  flexWrap?: 'wrap' | 'nowrap';
  flexDirection?: 'row' | 'column';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  justifyContent?: 'center' | 'space-between' | 'space-around' | 'flex-start' | 'flex-end';
}

export class FlexContainer extends Container {
  public onLayoutComplete: Signal<() => void> = new Signal<() => void>();
  public debug: boolean = false;
  protected _settings: FlexContainerSettings;

  constructor(settings: Partial<FlexContainerSettings> = {}) {
    super();
    this.handleChildAdded = this.handleChildAdded.bind(this);
    this.handleChildRemoved = this.handleChildRemoved.bind(this);
    this.layoutChildren = this.layoutChildren.bind(this);

    this._settings = Object.assign(
      { gap: 0, flexWrap: 'nowrap', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' },
      settings,
    );

    Signals.onResize.connect(this.layoutChildren);

    this.on('childAdded', this.handleChildAdded);
    this.on('childRemoved', this.handleChildRemoved);

    this.layoutChildren();
  }

  handleChildAdded(child: any) {
    if (child instanceof FlexContainer) {
      child.onLayoutComplete.connect(this.layoutChildren);
    }
    this.layoutChildren();
  }

  handleChildRemoved(child: any) {
    if (child instanceof FlexContainer) {
      child.onLayoutComplete.disconnect(this.layoutChildren);
    }
    this.layoutChildren();
  }

  destroy(_options?: IDestroyOptions | boolean) {
    Signals.onResize.disconnect(this.layoutChildren);
    this.children.forEach((child) => {
      if (child instanceof FlexContainer) {
        child.onLayoutComplete.disconnect(this.layoutChildren);
      }
    });
    this.off('childAdded', this.handleChildAdded);
    super.destroy(_options);
  }

  protected layoutChildren() {
    if (this._settings.bindTo) {
      this._settings.width = this._settings.bindTo?.width ?? 0;
      this._settings.height = this._settings.bindTo?.height ?? 0;
    }
    if (this._settings.bindToAppSize) {
      this._settings.width = this.app.size.x;
      this._settings.height = this.app.size.y;
    }
    if (this.debug) {
      console.log(this.name, this._settings.width);
    }

    let currentOffset = 0;
    let crossAxisOffset = 0;
    let maxCrossAxisSize = 0;
    let rowOrColumnItems = [];

    for (const c of this.children) {
      const child = c as unknown as ContainerLike;
      // Check if the item fits or if flexWrap is enabled
      const isOverflowing =
        this._settings.flexDirection === 'row'
          ? currentOffset + child.width > this._settings.width!
          : currentOffset + child.height > this._settings.height!;

      if (this._settings.flexWrap === 'wrap' && isOverflowing && rowOrColumnItems.length > 0) {
        // Lay out the current row/column
        this.layoutRowOrColumn(rowOrColumnItems, crossAxisOffset, maxCrossAxisSize);

        // Reset for the next row/column
        currentOffset = 0;
        crossAxisOffset += maxCrossAxisSize + this._settings.gap!;
        maxCrossAxisSize = 0;
        rowOrColumnItems = [];
      }

      // Update maxCrossAxisSize and currentOffset
      if (this._settings.flexDirection === 'row') {
        maxCrossAxisSize = Math.max(maxCrossAxisSize, child.height);
        currentOffset += child.width + this._settings.gap!;
      } else {
        maxCrossAxisSize = Math.max(maxCrossAxisSize, child.width);
        currentOffset += child.height + this._settings.gap!;
      }

      // Add the child to the current row/column items
      rowOrColumnItems.push(child);
    }
    this.layoutRowOrColumn(rowOrColumnItems, crossAxisOffset, maxCrossAxisSize);

    this.onLayoutComplete.emit();
  }

  private layoutRowOrColumn(items: ContainerLike[], crossAxisOffset: number, maxCrossAxisSize: number): void {
    let totalItemSize = 0;
    for (const child of items) {
      totalItemSize += this._settings.flexDirection === 'row' ? child.width : child.height;
    }
    const totalGapSize = this._settings.gap! * (items.length - 1);
    const remainingSpace =
      (this._settings.flexDirection === 'row' ? this._settings.width! : this._settings.height!) -
      totalItemSize -
      totalGapSize;

    if (this.debug) {
      console.log({ totalItemSize, totalGapSize, remainingSpace });
    }

    let spaceBetween = 0;
    if (this._settings.justifyContent === 'space-between' && items.length > 1) {
      spaceBetween = remainingSpace / (items.length - 1);
    } else if (this._settings.justifyContent === 'space-around' && items.length > 0) {
      spaceBetween =
        remainingSpace / (items.length * 2) +
        (this._settings.flexDirection === 'column' ? items[items.length - 1].height : items[items.length - 1].width);
    }

    let currentOffset = this._settings.justifyContent === 'flex-end' ? remainingSpace : 0;
    currentOffset +=
      this._settings.justifyContent === 'center' || this._settings.justifyContent === 'space-around' ? spaceBetween : 0;

    for (const child of items) {
      if (this._settings.flexDirection === 'row') {
        child.x = currentOffset;
        child.y = crossAxisOffset;

        if (this._settings.alignItems === 'center') {
          child.y += (maxCrossAxisSize - child.height) / 2;
        } else if (this._settings.alignItems === 'flex-end') {
          child.y += maxCrossAxisSize - child.height;
        }

        currentOffset +=
          child.width +
          this._settings.gap! +
          (this._settings.justifyContent === 'space-around' || this._settings.justifyContent === 'space-between'
            ? spaceBetween
            : 0);
      } else {
        // Handling 'column' direction
        child.y = currentOffset;
        child.x = crossAxisOffset;

        if (this._settings.alignItems === 'center') {
          child.x += (maxCrossAxisSize - child.width) / 2;
        } else if (this._settings.alignItems === 'flex-end') {
          child.x += maxCrossAxisSize - child.width;
        }

        currentOffset +=
          child.height +
          this._settings.gap! +
          (this._settings.justifyContent === 'space-around' || this._settings.justifyContent === 'space-between'
            ? spaceBetween
            : 0);
      }
    }
  }
}
