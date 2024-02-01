import { Rectangle } from 'pixi.js';
import { Container } from '../gameobjects';
import { resolvePointLike } from '../utils';
import { FlexContainer } from './FlexContainer';
function ensurePadding(padding) {
    if (typeof padding === 'number') {
        return { top: padding, right: padding, bottom: padding, left: padding };
    }
    else if (typeof padding === 'object') {
        if (padding.x !== undefined && padding.y !== undefined) {
            return { top: padding.y, right: padding.x, bottom: padding.y, left: padding.x };
        }
        else {
            if (padding.top === undefined)
                padding.top = 0;
            if (padding.right === undefined)
                padding.right = 0;
            if (padding.bottom === undefined)
                padding.bottom = 0;
            if (padding.left === undefined)
                padding.left = 0;
        }
        return padding;
    }
    else {
        return { top: 0, right: 0, bottom: 0, left: 0 };
    }
}
export class UICanvas extends Container {
    constructor(settings = { padding: 0 }) {
        super(true, settings.debug === true);
        this.settingsMap = new Map();
        this._childMap = new Map();
        this._canvasChildren = [];
        this._reparentAddedChild = true;
        this._disableAddChildError = false;
        this._settings = {
            debug: settings.debug === true,
            padding: ensurePadding(settings.padding),
            size: settings.size ?? 0,
            isBoundToStage: !settings.size,
        };
        this.on('childRemoved', this.handleChildRemoved);
    }
    get canvasChildren() {
        return this._canvasChildren;
    }
    get bounds() {
        return this._bounds;
    }
    set size(value) {
        this._settings.size = value;
        this._settings.isBoundToStage = this._settings.size === undefined || !this._settings.size;
        this.onResize();
    }
    set padding(value) {
        this._settings.padding = ensurePadding(value);
        this.onResize();
    }
    onResize() {
        const _size = this._settings.isBoundToStage ? this.app.size : resolvePointLike(this._settings.size);
        this._displayBounds = this.__calculateBounds(_size);
        this._outerBounds = this.__calculateOuterBounds(_size);
        this.setPosition();
        this.layout();
    }
    update() {
        if (this._settings.debug) {
            this.drawDebug();
        }
    }
    addChild(...children) {
        if (this._disableAddChildError) {
            return super.addChild(...children);
        }
        throw new Error('UICanvas.addChild is not supported. Use UICanvas.addElement instead');
    }
    /**
     * Removes a child from the container at the specified index
     * Override because we need to remove from the inner container
     * @param {number} index
     * @returns {DisplayObject}
     */
    removeChildAt(index) {
        return this.removeChild(this.canvasChildren[index]);
    }
    /**
     * Removes all the children from the container
     * Override because we need to ensure it returns the proper re-parented children
     * @returns {DisplayObject[]}
     */
    removeChildren() {
        const children = this.canvasChildren;
        this.removeChild(...children);
        return children;
    }
    /**
     * Removes one or more children from the container
     * Override because we need to ensure it returns the proper re-parented children
     * @param {DisplayObject} children
     * @returns {DisplayObject}
     */
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
    /**
     * Adds a child to the container at the specified index
     * Override because we need to ensure it sets the child index properly
     * @param {DisplayObject} child
     * @param {number} index
     * @returns {U}
     */
    addChildAt(child, index) {
        if (this._disableAddChildError) {
            const newChild = this.add.existing(child);
            this.setChildIndex(newChild, index);
            return newChild;
        }
        throw new Error('UICanvas.addChildAt is not supported. Use UICanvas.addElement instead');
    }
    /**
     * Sets the index of the child in the container
     * Override because we need to ensure it targets the parent container that we added
     * @param {DisplayObject} child
     * @param {number} index
     * @returns {U}
     */
    setChildIndex(child, index) {
        const actualChild = this._childMap.get(child);
        if (actualChild) {
            super.setChildIndex(actualChild, index);
            this.setCanvasChildren();
            this.layout();
        }
    }
    /**
     * Gets the index of a child in the container
     * Override because we need to ensure it targets the parent container that we added
     * @param {DisplayObject} child
     * @param {number} index
     * @returns {U}
     */
    getChildIndex(child) {
        if (this._childMap.has(child)) {
            return super.getChildIndex(child.parent);
        }
        return super.getChildIndex(child);
    }
    /**
     * Gets the child at the specified index
     * Override due to re-parenting
     * @param {number} index
     * @returns {DisplayObject}
     */
    getChildAt(index) {
        return super.getChildAt(index)?.getChildAt(0);
    }
    layout() {
        this.children.forEach((child) => {
            const childObj = child;
            const settings = this.settingsMap.get(childObj);
            if (settings) {
                this.applySettings(childObj, settings);
            }
        });
    }
    addElement(child, settings) {
        this._disableAddChildError = true;
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
        if (child instanceof FlexContainer) {
            this.addSignalConnection(child.onLayoutComplete.connect(this.layout));
        }
        this.settingsMap.set(container, {
            align: settings?.align ?? 'top left',
            padding: settings?.padding ?? 0,
        });
        this._childMap.set(child, container);
        this._canvasChildren = Array.from(this._childMap.keys());
        this.onResize();
        this._disableAddChildError = false;
        return child;
    }
    reAlign(child, settings) {
        let currentSettings = this.settingsMap.get(child?.parent);
        if (currentSettings) {
            const _settings = typeof settings === 'string' ? { align: settings } : settings;
            this.settingsMap.set(child?.parent, { ...currentSettings, ..._settings });
            currentSettings = this.settingsMap.get(child?.parent);
            this.applySettings(child?.parent, currentSettings);
        }
        else {
            console.warn('Cannot re-align child because it is not a child of this UICanvas', child);
        }
    }
    setPosition() {
        const appSize = this.app.size;
        this.position.set(this._displayBounds.x, this._displayBounds.y);
        this.position.x -= appSize.x / 2;
        this.position.y -= appSize.y / 2;
    }
    __calculateBounds(_size) {
        const pt = resolvePointLike(_size);
        return new Rectangle(this._settings.padding.left, this._settings.padding.top, pt.x - this._settings.padding.left - this._settings.padding.right, pt.y - this._settings.padding.top - this._settings.padding.bottom);
    }
    __calculateOuterBounds(_size) {
        const pt = resolvePointLike(_size);
        return new Rectangle(0, 0, pt.x, pt.y);
    }
    handleChildRemoved(child) {
        this.settingsMap.delete(child);
        this._childMap.delete(child);
        this._canvasChildren = Array.from(this._childMap.keys());
    }
    /**
     * Sorts the children in the container
     * Needed because we need to ensure re-parented children are sorted by their actual index in the container
     * @protected
     */
    setCanvasChildren() {
        this._canvasChildren = Array.from(this._childMap.keys());
        // order by the actual index in the container
        this._canvasChildren.sort((a, b) => this.getChildIndex(a) - this.getChildIndex(b));
        this.cleanup();
    }
    /**
     * Ensure we don't leave empty containers after setting child indices or adding / removing children
     * @protected
     */
    cleanup() {
        if (this.canvasChildren.length === this.children.length)
            return;
        // remove any children that are not in the flex children list
        this.children.forEach((child) => {
            if (this._settings.debug && child === this._debugGraphics)
                return;
            if (!child?.children?.length) {
                super.removeChild(child);
            }
        });
    }
    applySettings(child, settings) {
        if (!settings)
            return;
        const screenWidth = this._displayBounds.width;
        const screenHeight = this._displayBounds.height;
        const firstChild = child.getChildAt(0);
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
                child.x = (screenWidth - childWidth) / 2;
                child.y = (screenHeight - childHeight) / 2;
                break;
        }
    }
    drawDebug() {
        if (!this._debugGraphics) {
            this._disableAddChildError = true;
            this._debugGraphics = this.add.graphics();
            this._disableAddChildError = false;
        }
        this._debugGraphics.clear();
        this._debugGraphics.lineStyle(1, 0xff0000, 0.5, 0, true);
        this._debugGraphics.drawRect(0, 0, this._displayBounds.width, this._displayBounds.height);
        this._debugGraphics.drawRect(-this._settings.padding.left, -this._settings.padding.top, this._outerBounds.width, this._outerBounds.height);
        // draw a cross in the middle
        this._debugGraphics.moveTo(this._displayBounds.width / 2, this._displayBounds.height / 2 - 10);
        this._debugGraphics.lineTo(this._displayBounds.width / 2, this._displayBounds.height / 2 + 10);
        this._debugGraphics.moveTo(this._displayBounds.width / 2 - 10, this._displayBounds.height / 2);
        this._debugGraphics.lineTo(this._displayBounds.width / 2 + 10, this._displayBounds.height / 2);
    }
}
//# sourceMappingURL=UICanvas.js.map