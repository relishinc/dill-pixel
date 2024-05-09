import { Application } from '../core/Application';
import { FactoryContainer } from '../mixins/factory';
import { WithSignals } from '../mixins/signals';
import { Signal } from '../signals';
import { resolvePointLike } from '../utils/functions';
import { bindAllMethods } from '../utils/methodBinding';
const _FlexContainer = WithSignals(FactoryContainer());
export const FlexContainerConfigKeys = [
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
export class FlexContainer extends _FlexContainer {
    onLayoutComplete = new Signal();
    debug = false;
    config;
    /**
     * Removes all the children from the container
     * Override because we need to ensure it returns the proper re-parented children
     */
    removeChildren = () => {
        const children = this.flexChildren;
        this.removeChild(...children);
        return children;
    };
    /**
     * Removes a child from the container at the specified index
     * Override because we need to remove from the inner container
     */
    removeChildAt = (index) => {
        return this.removeChild(this.flexChildren[index]);
    };
    /**
     * Adds a child to the container at the specified index
     * Override because we need to ensure it sets the child index properly
     */
    addChildAt = (child, index) => {
        const newChild = this.add.existing(child);
        this.setChildIndex(newChild, index);
        return newChild;
    };
    /**
     * Sets the index of the child in the container
     * Override because we need to ensure it targets the parent container that we added
     */
    setChildIndex = (child, index) => {
        const actualChild = this._childMap.get(child);
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
    getChildIndex = (child) => {
        if (this._childMap.has(child)) {
            return super.getChildIndex(child.parent);
        }
        return super.getChildIndex(child);
    };
    /**
     * Gets the child at the specified index
     * Override due to re-parenting
     */
    getChildAt = (index) => {
        return super.getChildAt(index)?.getChildAt(0);
    };
    paddingLeft = 0;
    paddingRight = 0;
    paddingTop = 0;
    paddingBottom = 0;
    _childMap = new Map();
    _flexChildren = [];
    _reparentAddedChild = true;
    constructor(config = {}) {
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
    get gap() {
        return this.config.gap;
    }
    set gap(value) {
        this.config.gap = value;
        this.layout();
    }
    get flexWrap() {
        return this.config.flexWrap;
    }
    set flexWrap(value) {
        this.config.flexWrap = value;
        this.layout();
    }
    get flexDirection() {
        return this.config.flexDirection;
    }
    set flexDirection(value) {
        this.config.flexDirection = value;
        this.layout();
    }
    get alignItems() {
        return this.config.alignItems;
    }
    set alignItems(value) {
        this.config.alignItems = value;
        this.layout();
    }
    get justifyContent() {
        return this.config.justifyContent;
    }
    set justifyContent(value) {
        this.config.justifyContent = value;
        this.layout();
    }
    get containerHeight() {
        return this.config.height;
    }
    set containerHeight(value) {
        this.config.height = value;
        this.layout();
    }
    get containerWidth() {
        return this.config.width;
    }
    set containerWidth(value) {
        this.config.width = value;
        this.layout();
    }
    get size() {
        return { width: this.config.width, height: this.config.height };
    }
    set size(size) {
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
    get app() {
        return Application.getInstance();
    }
    destroy(_options) {
        this.off('childAdded', this.handleChildAdded);
        this.off('childRemoved', this.handleChildRemoved);
        super.destroy(_options);
    }
    /**
     * Removes one or more children from the container
     * Override because we need to ensure it returns the proper re-parented children
     * @param children
     */
    removeChild(...children) {
        if (this._reparentAddedChild) {
            children.forEach((child) => {
                const actualChild = this._childMap.get(child);
                if (actualChild) {
                    return super.removeChild(actualChild);
                }
                return;
            });
        }
        else {
            return super.removeChild(...children);
        }
        return children[0];
    }
    /**
     * Public method to manually trigger a layout
     */
    layout() {
        this.app.ticker.addOnce(this._layout, this);
    }
    resize() {
        this.layout();
    }
    update() { }
    added() { }
    /**
     * Ensures we delete the child from the map when it's removed
     * @protected
     */
    handleChildRemoved(child) {
        if (this._reparentAddedChild) {
            if (!this.deleteChild(child)) {
                child = child.getChildAt(0);
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
    deleteChild(child) {
        const isInMap = this._childMap.has(child);
        if (isInMap) {
            // disconnect signal
            if (child instanceof FlexContainer) {
                try {
                    child.onLayoutComplete.disconnect(this.layout);
                }
                catch (e) {
                    console.warn(`FlexContainer:: Error disconnecting signal from removed child`);
                    console.warn(e);
                }
            }
            this._childMap.delete(child);
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
    setFlexChildren() {
        this._flexChildren = Array.from(this._childMap.keys());
        // order by the actual index in the container
        this._flexChildren.sort((a, b) => this.getChildIndex(a) - this.getChildIndex(b));
        this.cleanup();
    }
    /**
     * Ensure we don't leave empty containers after setting child indices or adding / removing children
     * @protected
     */
    cleanup() {
        if (this.flexChildren.length === this.children.length)
            return;
        // remove any children that are not in the flex children list
        this.children.forEach((child) => {
            if (!child?.children?.length) {
                super.removeChild(child);
            }
        });
    }
    /**
     * Re-parent a child to account for e.g. sprite that are added with anchors
     * @param child
     * @protected
     */
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
    /**
     * Lay out the children according to the settings
     * Tries to follow the CSS Flexbox model as closely as possible
     * @private
     */
    _layout() {
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
        if (this.config.flexDirection === 'row' &&
            this.config.flexWrap === 'nowrap' &&
            canHaveEndlessWidthOrHeight.includes(this.config.justifyContent)) {
            width = Infinity;
        }
        else if (this.config.flexDirection === 'column' &&
            this.config.flexWrap === 'nowrap' &&
            canHaveEndlessWidthOrHeight.includes(this.config.justifyContent)) {
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
            lineItems.forEach(({ index, width, height }, i) => {
                const extraSpace = (direction === 'row' ? width : height) - (lineEnd - lineStart);
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
    _added() {
        this.addSignalConnection(this.app.onResize.connect(this.layout, 0));
        this.added();
    }
}
