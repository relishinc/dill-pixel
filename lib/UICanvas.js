import { Rectangle } from 'pixi.js';
import { Container } from './gameobjects';
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
        super(true, settings.debug === true, false);
        this.settingsMap = new Map();
        this._settings = {
            debug: settings.debug === true,
            edge: settings.edge ?? 'center',
            padding: ensurePadding(settings.padding),
        };
        this.bindMethods('onResize', 'handleChildRemoved', 'handleChildAdded');
        this.on('childRemoved', this.handleChildRemoved);
    }
    get bounds() {
        return this._bounds;
    }
    onResize(_size) {
        this._screenBounds = this.__calculateBounds(_size);
        this.setPosition();
        this.layout();
    }
    update() {
        if (this._settings.debug) {
            this.drawDebug();
        }
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
        this.settingsMap.set(child, {
            edge: settings?.edge ?? 'top left',
            padding: settings?.padding ?? 0,
        });
        this.addChild(child);
        this.onResize(this.app.size);
    }
    setPosition() {
        const appSize = this.app.size;
        this.position.set(this._screenBounds.x, this._screenBounds.y);
        this.position.x -= appSize.x / 2;
        this.position.y -= appSize.y / 2;
    }
    __calculateBounds(_size) {
        return new Rectangle(this._settings.padding.left, this._settings.padding.top, _size.x - this._settings.padding.left - this._settings.padding.right, _size.y - this._settings.padding.top - this._settings.padding.bottom);
    }
    handleChildRemoved(child) {
        this.settingsMap.delete(child);
    }
    applySettings(child, settings) {
        if (!settings)
            return;
        const screenWidth = this._screenBounds.width;
        const screenHeight = this._screenBounds.height;
        const anchorX = child.anchor?.x || 0;
        const anchorY = child.anchor?.y || 0;
        const baseX = child.width * anchorX;
        const baseY = child.height * anchorY;
        switch (settings.edge) {
            case 'top right':
                child.x = screenWidth - baseX - settings.padding;
                child.y = settings.padding + baseY;
                break;
            case 'top left':
                child.x = settings.padding + baseX;
                child.y = settings.padding + baseY;
                break;
            case 'top center':
                child.x = (screenWidth - child.width) / 2 + baseX;
                child.y = settings.padding + baseY;
                break;
            case 'bottom right':
                child.x = screenWidth - baseX - settings.padding;
                child.y = screenHeight - baseY - settings.padding;
                break;
            case 'bottom left':
                child.x = settings.padding + baseX;
                child.y = screenHeight - baseY - settings.padding;
                break;
            case 'bottom center':
                child.x = (screenWidth - child.width) / 2 + baseX;
                child.y = screenHeight - baseY - settings.padding;
                break;
            case 'left top':
                child.x = settings.padding + baseX;
                child.y = settings.padding + baseY;
                break;
            case 'left bottom':
                child.x = settings.padding + baseX;
                child.y = screenHeight - baseY - settings.padding;
                break;
            case 'left center':
                child.x = settings.padding + baseX;
                child.y = (screenHeight - child.height) / 2 + baseY;
                break;
            case 'right top':
                child.x = screenWidth - baseX - settings.padding;
                child.y = settings.padding + baseY;
                break;
            case 'right bottom':
                child.x = screenWidth - baseX - settings.padding;
                child.y = screenHeight - baseY - settings.padding;
                break;
            case 'right center':
                child.x = screenWidth - baseX - settings.padding;
                child.y = (screenHeight - child.height) / 2 + baseY;
                break;
            case 'center':
                child.x = (screenWidth - child.width) / 2 + baseX;
                child.y = (screenHeight - child.height) / 2 + baseY;
                break;
        }
    }
    drawDebug() {
        if (!this._debugGraphics) {
            this._debugGraphics = this.add.graphics();
        }
        this._debugGraphics.clear();
        this._debugGraphics.lineStyle(1, 0xff0000, 0.5, 0.5, true);
        this._debugGraphics.drawRect(0, 0, this._screenBounds.width, this._screenBounds.height);
        // draw a cross in the middle
        this._debugGraphics.moveTo(this._screenBounds.width / 2, this._screenBounds.height / 2 - 10);
        this._debugGraphics.lineTo(this._screenBounds.width / 2, this._screenBounds.height / 2 + 10);
        this._debugGraphics.moveTo(this._screenBounds.width / 2 - 10, this._screenBounds.height / 2);
        this._debugGraphics.lineTo(this._screenBounds.width / 2 + 10, this._screenBounds.height / 2);
    }
}
//# sourceMappingURL=UICanvas.js.map