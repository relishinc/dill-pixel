import { Rectangle } from 'pixi.js';
import { Application } from '../core/Application';
import { FactoryContainer } from '../mixins/factory';
import { WithSignals } from '../mixins/signals';
import { Logger } from '../utils/console/Logger';
import { resolveSizeLike } from '../utils/functions';
import { bindAllMethods } from '../utils/methodBinding';
import { FlexContainer } from './FlexContainer';
export const UICanvasConfigKeys = ['debug', 'padding', 'size', 'useAppSize'];
function resolvePadding(paddingNum, size) {
    // check of the paddingNum is a decimal between 0 and 1
    // if it is, return a number that is the percentage of the size
    if (paddingNum >= 0 && paddingNum <= 1) {
        return paddingNum * size;
    }
    return paddingNum;
}
function ensurePadding(padding) {
    if (Array.isArray(padding)) {
        return {
            top: padding[0],
            right: padding?.[1] ?? padding[0],
            bottom: padding?.[2] ?? padding[0],
            left: padding?.[3] ?? padding?.[1] ?? padding[0] ?? 0,
        };
    }
    if (typeof padding === 'number') {
        return { top: padding, right: padding, bottom: padding, left: padding };
    }
    else if (typeof padding === 'object') {
        const paddingAsPointLike = padding;
        if (paddingAsPointLike.x !== undefined && paddingAsPointLike.y !== undefined) {
            return {
                top: paddingAsPointLike.y,
                right: paddingAsPointLike.x,
                bottom: paddingAsPointLike.y,
                left: paddingAsPointLike.x,
            };
        }
        else {
            return {
                top: padding.top ?? 0,
                right: padding.right ?? 0,
                bottom: padding.bottom ?? 0,
                left: padding.left ?? 0,
            };
        }
    }
    else {
        return { top: 0, right: 0, bottom: 0, left: 0 };
    }
}
const _UICanvas = WithSignals(FactoryContainer());
export class UICanvas extends _UICanvas {
    constructor(config) {
        super();
        /**
         * Removes all the children from the container
         * Override because we need to ensure it returns the proper re-parented children
         */
        this.removeChildren = (beginIndex, endIndex) => {
            return this._inner.removeChildren(beginIndex, endIndex);
        };
        /**
         * Removes a child from the container at the specified index
         * Override because we need to remove from the inner container
         */
        this.removeChildAt = (index) => {
            return this._inner.removeChildAt(index);
        };
        /**
         * Adds a child to the container at the specified index
         * Override because we need to ensure it sets the child index properly
         */
        this.addChildAt = (child, index) => {
            const newChild = this._inner.add.existing(child);
            this._inner.setChildIndex(newChild, index);
            return newChild;
        };
        /**
         * Sets the index of the child in the container
         * Override because we need to ensure it targets the parent container that we added
         */
        this.setChildIndex = (child, index) => {
            this._inner.setChildIndex(child, index);
            this.layout();
        };
        /**
         * Gets the index of a child in the container
         * Override because we need to ensure it targets the parent container that we added
         */
        this.getChildIndex = (child) => {
            return this._inner.getChildIndex(child);
        };
        /**
         * Gets the child at the specified index
         * Override due to re-parenting
         */
        this.getChildAt = (index) => {
            return this._inner.getChildAt(index)?.getChildAt(0);
        };
        this.settingsMap = new Map();
        this._childMap = new Map();
        this._canvasChildren = [];
        this._reparentAddedChild = true;
        this._disableAddChildError = false;
        // Bind all methods of this class to the current instance.
        bindAllMethods(this);
        this.config = {
            debug: config.debug === true,
            padding: ensurePadding(config?.padding ?? 0),
            size: config.size !== undefined ? resolveSizeLike(config.size) : { width: 0, height: 0 },
            useAppSize: config.useAppSize === true,
        };
        this._disableAddChildError = true;
        this._inner = this.add.container({ x: this.config.padding.left, y: this.config.padding.top });
        this._disableAddChildError = false;
        this.addSignalConnection(this.app.onResize.connect(this.resize));
        this.on('childRemoved', this._childRemoved);
        this.once('added', this._added);
    }
    /**
     * Get the application instance.
     */
    get app() {
        return Application.getInstance();
    }
    get canvasChildren() {
        return this._canvasChildren;
    }
    get bounds() {
        if (!this._bounds) {
            this._bounds = this.getBounds();
        }
        return this._bounds;
    }
    set size(value) {
        this.config.useAppSize = false;
        this.config.size = value === undefined ? { width: 0, height: 0 } : resolveSizeLike(value);
        this.resize();
    }
    set padding(value) {
        this.config.padding = ensurePadding(value);
        this._inner.position.set(this.config.padding.left, this.config.padding.top);
        this.resize();
    }
    addChild(...children) {
        if (this._disableAddChildError) {
            return super.addChild(...children);
        }
        Logger.warn(`UICanvas:: You probably shouldn't add children directly to UICanvas. Use .addElement(child, settings) instead, so you can pass alignment settings.`, children, `will be added using the default 'top left' alignment'.`);
        return this._inner.addChild(...children);
    }
    /**
     * Removes one or more children from the container
     * Override because we need to ensure it returns the proper re-parented children
     */
    removeChild(...children) {
        if (this._reparentAddedChild) {
            children.forEach((child) => {
                const actualChild = this._childMap.get(child);
                if (actualChild) {
                    return this._inner.removeChild(actualChild);
                }
            });
        }
        else {
            return this._inner.removeChild(...children);
        }
        return children[0];
    }
    resize() {
        const _size = this.config.useAppSize ? this.app.size : this.config.size;
        this._displayBounds = this.__calculateBounds(_size);
        this._outerBounds = this.__calculateOuterBounds(_size);
        this.layout();
        if (this.config.useAppSize) {
            this.position.set(-_size.width * 0.5, -_size.height * 0.5);
        }
        if (this.config.debug) {
            this.app.ticker.addOnce(this.drawDebug);
        }
    }
    layout() {
        this._inner.children.forEach((child) => {
            const childObj = child;
            const settings = this.settingsMap.get(childObj);
            if (settings) {
                this.applySettings(childObj, settings);
            }
        });
    }
    addElement(child, settings) {
        const container = this._inner.add.container();
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
            padding: settings?.padding ? ensurePadding(settings.padding) : { top: 0, left: 0, bottom: 0, right: 0 },
        });
        this._childMap.set(child, container);
        this._canvasChildren = Array.from(this._childMap.keys());
        this.resize();
        return child;
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
            if (this.config.debug && child === this._debugGraphics)
                return;
            if (!child?.children?.length) {
                super.removeChild(child);
            }
        });
    }
    __calculateBounds(_size) {
        return new Rectangle(0, 0, _size.width - this.config.padding.left - this.config.padding.right, _size.height - this.config.padding.top - this.config.padding.bottom);
    }
    __calculateOuterBounds(_size) {
        return new Rectangle(0, 0, _size.width, _size.height);
    }
    _childRemoved(child) {
        this.settingsMap.delete(child);
        this._childMap.delete(child);
        this._canvasChildren = Array.from(this._childMap.keys());
    }
    _added() {
        this.layout();
    }
    applySettings(child, settings) {
        if (!settings)
            return;
        const displayWidth = this._displayBounds.width;
        const displayHeight = this._displayBounds.height;
        const firstChild = child.getChildAt(0);
        const childWidth = firstChild instanceof FlexContainer ? firstChild.containerWidth || child.width : child.width;
        const childHeight = firstChild instanceof FlexContainer ? firstChild.containerHeight || child.height : child.height;
        switch (settings.align) {
            case 'top right':
                child.x = displayWidth - childWidth;
                child.y = 0;
                break;
            case 'top left':
                child.x = 0;
                child.y = 0;
                break;
            case 'top center':
            case 'top':
                child.x = (displayWidth - childWidth) / 2;
                child.y = 0;
                break;
            case 'bottom right':
                child.x = displayWidth - childWidth;
                child.y = displayHeight - childHeight;
                break;
            case 'bottom left':
                child.x = 0;
                child.y = displayHeight - childHeight;
                break;
            case 'bottom center':
            case 'bottom':
                child.x = (displayWidth - child.width) / 2;
                child.y = displayHeight - childHeight;
                break;
            case 'left top':
                child.x = 0;
                child.y = 0;
                break;
            case 'left bottom':
                child.x = 0;
                child.y = displayHeight - childHeight;
                break;
            case 'left center':
            case 'left':
                child.x = 0;
                child.y = (displayHeight - childHeight) / 2;
                break;
            case 'right top':
                child.x = displayWidth - childWidth;
                child.y = 0;
                break;
            case 'right bottom':
                child.x = displayWidth;
                child.y = displayHeight;
                break;
            case 'right center':
            case 'right':
                child.x = displayWidth - childWidth;
                child.y = (displayHeight - childHeight) / 2;
                break;
            case 'center':
                child.x = (displayWidth - childWidth) / 2;
                child.y = (displayHeight - childHeight) / 2;
                break;
        }
        child.x +=
            resolvePadding(settings.padding.left, displayWidth) - resolvePadding(settings.padding.right, displayWidth);
        child.y +=
            resolvePadding(settings.padding.top, displayHeight) - resolvePadding(settings.padding.bottom, displayHeight);
    }
    drawDebug() {
        if (!this._debugGraphics) {
            this._disableAddChildError = true;
            this._debugGraphics = this._inner.add.graphics();
            this._disableAddChildError = false;
        }
        this._debugGraphics
            .clear()
            .rect(0, 0, this._displayBounds.width, this._displayBounds.height)
            .stroke({
            width: 1,
            color: 0xff0000,
            alpha: 0.5,
        })
            .rect(-this.config.padding.left, -this.config.padding.top, this._outerBounds.width, this._outerBounds.height)
            .stroke({
            width: 1,
            color: 0xff0000,
            alpha: 0.5,
        })
            .moveTo(this._displayBounds.width / 2, this._displayBounds.height / 2 - 10)
            .lineTo(this._displayBounds.width / 2, this._displayBounds.height / 2 + 10)
            .stroke({
            width: 1,
            color: 0xff0000,
            alpha: 0.5,
        })
            .moveTo(this._displayBounds.width / 2 - 10, this._displayBounds.height / 2)
            .lineTo(this._displayBounds.width / 2 + 10, this._displayBounds.height / 2)
            .stroke({
            width: 1,
            color: 0xff0000,
            alpha: 0.5,
        });
    }
}
//# sourceMappingURL=UICanvas.js.map