import { Signal } from 'typed-signals';
import { Container } from '../gameobjects';
import { resolvePointLike } from '../utils';
export class FlexContainer extends Container {
    constructor(settings = {}) {
        super(true);
        this.onLayoutComplete = new Signal();
        this.debug = false;
        this.paddingLeft = 0;
        this.paddingRight = 0;
        this.paddingTop = 0;
        this.paddingBottom = 0;
        this._childMap = new Map();
        this._flexChildren = [];
        this._reparentAddedChild = true;
        this._settings = Object.assign({
            bindTo: null,
            width: 0,
            height: 0,
            gap: 0,
            flexWrap: 'nowrap',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: 0,
        }, settings);
        this.on('childAdded', this.handleChildAdded);
        this.on('childRemoved', this.handleChildRemoved);
        this.layout();
    }
    get gap() {
        return this._settings.gap;
    }
    set gap(value) {
        this._settings.gap = value;
        this.layout();
    }
    get flexWrap() {
        return this._settings.flexWrap;
    }
    set flexWrap(value) {
        this._settings.flexWrap = value;
        this.layout();
    }
    get flexDirection() {
        return this._settings.flexDirection;
    }
    set flexDirection(value) {
        this._settings.flexDirection = value;
        this.layout();
    }
    get alignItems() {
        return this._settings.alignItems;
    }
    set alignItems(value) {
        this._settings.alignItems = value;
        this.layout();
    }
    get justifyContent() {
        return this._settings.justifyContent;
    }
    set justifyContent(value) {
        this._settings.justifyContent = value;
        this.layout();
    }
    get containerHeight() {
        return this._settings.height;
    }
    set containerHeight(value) {
        this._settings.height = value;
        this.layout();
    }
    get containerWidth() {
        return this._settings.width;
    }
    set containerWidth(value) {
        this._settings.width = value;
        this.layout();
    }
    get size() {
        return { width: this._settings.width, height: this._settings.height };
    }
    set size(size) {
        const { x, y } = resolvePointLike(size);
        this._settings.width = x;
        this._settings.height = y;
        this.layout();
    }
    get flexChildren() {
        return this._flexChildren;
    }
    destroy(_options) {
        this.off('childAdded', this.handleChildAdded);
        this.off('childRemoved', this.handleChildRemoved);
        super.destroy(_options);
    }
    onResize(_size) {
        this.layout();
    }
    removeChildAt(index) {
        return this.removeChild(this.flexChildren[index]);
    }
    removeChild(...children) {
        if (this._reparentAddedChild) {
            children.forEach((child) => {
                const actualChild = this._childMap.get(child);
                if (actualChild) {
                    return super.removeChild(actualChild);
                }
            });
        }
        else {
            return super.removeChild(...children);
        }
        return children[0];
    }
    addChildAt(child, index) {
        const newChild = this.add.existing(child);
        this.setChildIndex(newChild, index);
        return newChild;
    }
    setChildIndex(child, index) {
        const actualChild = this._childMap.get(child);
        if (actualChild) {
            super.setChildIndex(actualChild, index);
            this.setFlexChildren();
            this.layout();
        }
    }
    getChildIndex(child) {
        if (this._childMap.has(child)) {
            return super.getChildIndex(child.parent);
        }
        return super.getChildIndex(child);
    }
    getChildAt(index) {
        return super.getChildAt(index)?.getChildAt(0);
    }
    layout() {
        this._layout();
    }
    handleChildRemoved(child) {
        if (this._reparentAddedChild) {
            if (!this.deleteChild(child)) {
                child = child.getChildAt(0);
                this.deleteChild(child);
            }
        }
    }
    deleteChild(child) {
        const isInMap = this._childMap.has(child);
        if (isInMap) {
            this._childMap.delete(child);
            this.setFlexChildren();
            this.layout();
            return true;
        }
        return false;
    }
    setFlexChildren() {
        this._flexChildren = Array.from(this._childMap.keys());
        // order by the actual index in the container
        this._flexChildren.sort((a, b) => this.getChildIndex(a) - this.getChildIndex(b));
    }
    handleChildAdded(child) {
        // avoid maximum call stack error b/c we're about to add a container
        if (!this._reparentAddedChild)
            return;
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
    _layout() {
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
        if (this._settings.flexDirection === 'row' &&
            this._settings.flexWrap === 'nowrap' &&
            canHaveEndlessWidthOrHeight.includes(this._settings.justifyContent)) {
            width = Infinity;
        }
        else if (this._settings.flexDirection === 'column' &&
            this._settings.flexWrap === 'nowrap' &&
            canHaveEndlessWidthOrHeight.includes(this._settings.justifyContent)) {
            height = Infinity;
        }
        let layoutProps = [];
        let x = 0;
        let y = 0;
        let rowHeight = 0;
        let columnWidth = 0;
        let nextRowY = 0; // y-coordinate of the next row
        let nextColumnX = 0; // x-coordinate of the next column
        const newLayoutProps = [];
        const items = this.children.filter(Boolean);
        let lineItems = [];
        let lineStart = 0;
        const shouldWrap = (childRef, x, y) => (flexDirection === 'row' && x + childRef.width + gap > width) ||
            (flexDirection === 'column' && y + childRef.height + gap > height);
        const handleWrap = () => {
            if (flexDirection === 'row') {
                nextRowY += rowHeight + gap;
            }
            else {
                nextColumnX += columnWidth + gap;
            }
            x = 0;
            y = 0;
            rowHeight = 0;
            columnWidth = 0;
        };
        const updateLayoutVariables = (childRef) => {
            if (flexDirection === 'row') {
                x += childRef.width + gap;
                rowHeight = Math.max(rowHeight, childRef.height);
            }
            else {
                y += childRef.height + gap;
                columnWidth = Math.max(columnWidth, childRef.width);
            }
        };
        const getNextX = (currentX) => (flexDirection === 'row' ? currentX : nextColumnX);
        const getNextY = (currentY) => (flexDirection === 'column' ? currentY : nextRowY);
        const handleJustification = (lineItems, lineStart, lineEnd, direction) => {
            const extraSpace = (direction === 'row' ? width : height) - (lineEnd - lineStart);
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
                }
                else {
                    newLayoutProps[index].y += offset;
                }
            });
        };
        const handleAlignment = (newLayoutProps, items) => {
            newLayoutProps.forEach((props, index) => {
                const childRef = items[index];
                if (!childRef)
                    return;
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
                }
                else {
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
            if (!childRef)
                return;
            const item = childRef;
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
            const item = childRef;
            const { x, y } = layoutProps[index] || { x: 0, y: 0 };
            item.position.set(x, y);
        });
        // handle alignment within container bounds
        const totalHeight = this.children.reduce((acc, child) => Math.max(acc, child.y + child.height), 0);
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
//# sourceMappingURL=FlexContainer.js.map