import { Signal } from 'typed-signals';
import { Signals } from '../signals';
import { Container } from './Container';
export class FlexContainer extends Container {
    constructor(settings = {}) {
        super();
        this.onLayoutComplete = new Signal();
        this.debug = false;
        this.paddingLeft = 0;
        this.paddingRight = 0;
        this.paddingTop = 0;
        this.paddingBottom = 0;
        this.handleChildAdded = this.handleChildAdded.bind(this);
        this.handleChildRemoved = this.handleChildRemoved.bind(this);
        this.layoutChildren = this.layoutChildren.bind(this);
        this._settings = Object.assign({
            gap: 0,
            flexWrap: 'nowrap',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: 0,
        }, settings);
        if (this._settings?.padding) {
            if (Array.isArray(this._settings.padding)) {
                if (this._settings.padding.length === 4) {
                    this.paddingLeft = this._settings.padding[0];
                    this.paddingTop = this._settings.padding[1];
                    this.paddingRight = this._settings.padding[2];
                    this.paddingBottom = this._settings.padding[3];
                }
                else if (this._settings.padding.length === 2) {
                    this.paddingLeft = this._settings.padding[0];
                    this.paddingTop = this._settings.padding[1];
                    this.paddingRight = this._settings.padding[0];
                    this.paddingBottom = this._settings.padding[1];
                }
                else {
                    throw new Error('padding must be an array of 2 or 4 numbers');
                }
            }
            else {
                this.paddingLeft = this.paddingTop = this.paddingRight = this.paddingBottom = this._settings.padding;
            }
        }
        Signals.onResize.connect(this.layoutChildren);
        this.on('childAdded', this.handleChildAdded);
        this.on('childRemoved', this.handleChildRemoved);
        this.layoutChildren();
    }
    handleChildAdded(child) {
        if (child instanceof FlexContainer) {
            child.onLayoutComplete.connect(this.layoutChildren);
        }
        this.layoutChildren();
    }
    handleChildRemoved(child) {
        if (child instanceof FlexContainer) {
            child.onLayoutComplete.disconnect(this.layoutChildren);
        }
        this.layoutChildren();
    }
    destroy(_options) {
        Signals.onResize.disconnect(this.layoutChildren);
        this.children.forEach((child) => {
            if (child instanceof FlexContainer) {
                child.onLayoutComplete.disconnect(this.layoutChildren);
            }
        });
        this.off('childAdded', this.handleChildAdded);
        super.destroy(_options);
    }
    layoutChildren() {
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
        let currentOffset = this._settings.flexDirection === 'row' ? this.paddingLeft : this.paddingTop;
        let crossAxisOffset = this._settings.flexDirection === 'row' ? this.paddingLeft : this.paddingTop;
        let maxCrossAxisSize = 0;
        let rowOrColumnItems = [];
        for (const c of this.children) {
            const child = c;
            // Check if the item fits or if flexWrap is enabled
            const isOverflowing = this._settings.flexDirection === 'row'
                ? currentOffset + child.width > this._settings.width - this.paddingLeft - this.paddingRight
                : currentOffset + child.height > this._settings.height - this.paddingTop - this.paddingBottom;
            if (this._settings.flexWrap === 'wrap' && isOverflowing && rowOrColumnItems.length > 0) {
                // Lay out the current row/column
                this.layoutRowOrColumn(rowOrColumnItems, crossAxisOffset, maxCrossAxisSize);
                // Reset for the next row/column
                currentOffset = this._settings.flexDirection === 'row' ? this.paddingLeft : this.paddingTop;
                crossAxisOffset += maxCrossAxisSize + this._settings.gap;
                maxCrossAxisSize = this._settings.flexDirection === 'row' ? this.paddingLeft : this.paddingTop;
                rowOrColumnItems = [];
            }
            // Update maxCrossAxisSize and currentOffset
            if (this._settings.flexDirection === 'row') {
                maxCrossAxisSize = Math.max(maxCrossAxisSize, child.height);
                currentOffset += child.width + this._settings.gap;
            }
            else {
                maxCrossAxisSize = Math.max(maxCrossAxisSize, child.width);
                currentOffset += child.height + this._settings.gap;
            }
            // Add the child to the current row/column items
            rowOrColumnItems.push(child);
        }
        this.layoutRowOrColumn(rowOrColumnItems, crossAxisOffset, maxCrossAxisSize);
        this.onLayoutComplete.emit();
    }
    layoutRowOrColumn(items, crossAxisOffset, maxCrossAxisSize) {
        let totalItemSize = 0;
        for (const child of items) {
            totalItemSize += this._settings.flexDirection === 'row' ? child.width : child.height;
        }
        const totalGapSize = this._settings.gap * (items.length - 1);
        const remainingSpace = (this._settings.flexDirection === 'row' ? this._settings.width : this._settings.height) -
            totalItemSize -
            totalGapSize;
        if (this.debug) {
            console.log({ totalItemSize, totalGapSize, remainingSpace });
        }
        let spaceBetween = 0;
        if (this._settings.justifyContent === 'space-between' && items.length > 1) {
            spaceBetween = remainingSpace / (items.length - 1);
        }
        else if (this._settings.justifyContent === 'space-around' && items.length > 0) {
            spaceBetween =
                remainingSpace / (items.length * 2) +
                    (this._settings.flexDirection === 'column' ? items[items.length - 1].height : items[items.length - 1].width);
        }
        spaceBetween -= this.paddingLeft + this.paddingRight;
        let currentOffset = this._settings.justifyContent === 'flex-end' ? remainingSpace - this.paddingRight : this.paddingLeft;
        currentOffset +=
            this._settings.justifyContent === 'center' || this._settings.justifyContent === 'space-around' ? spaceBetween : 0;
        for (const child of items) {
            if (this._settings.flexDirection === 'row') {
                child.x = currentOffset;
                child.y = crossAxisOffset;
                if (this._settings.alignItems === 'center') {
                    child.y += (maxCrossAxisSize - child.height) / 2;
                }
                else if (this._settings.alignItems === 'flex-end') {
                    child.y += maxCrossAxisSize - child.height;
                }
                currentOffset +=
                    child.width +
                        this._settings.gap +
                        (this._settings.justifyContent === 'space-around' || this._settings.justifyContent === 'space-between'
                            ? spaceBetween
                            : 0);
            }
            else {
                // Handling 'column' direction
                child.y = currentOffset;
                child.x = crossAxisOffset;
                if (this._settings.alignItems === 'center') {
                    child.x += (maxCrossAxisSize - child.width) / 2;
                }
                else if (this._settings.alignItems === 'flex-end') {
                    child.x += maxCrossAxisSize - child.width;
                }
                currentOffset +=
                    child.height +
                        this._settings.gap +
                        (this._settings.justifyContent === 'space-around' || this._settings.justifyContent === 'space-between'
                            ? spaceBetween
                            : 0);
            }
        }
    }
}
//# sourceMappingURL=FlexContainer.js.map