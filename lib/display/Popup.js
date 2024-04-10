import { Graphics, Sprite } from 'pixi.js';
import { Application } from '../core/Application';
import { Container } from './Container';
const defaultBackingConfig = {
    color: 0x0,
    alpha: 0.75,
};
const defaultPopupConfig = { backing: true, closeOnEscape: true, closeOnPointerDownOutside: true };
/**
 * Class representing a Popup
 */
export class Popup extends Container {
    /**
     * Create a backing for the popup
     * @param config - The configuration for the backing
     * @param size - The size of the backing
     * @returns The backing container
     */
    static makeBacking(config, size) {
        let finalConfig = {};
        if (typeof config === 'object') {
            finalConfig = config;
        }
        const backingConfig = Object.assign({ ...defaultBackingConfig }, finalConfig);
        if (Popup.BACKING_TEXTURE === undefined) {
            const gfx = new Graphics();
            gfx.rect(0, 0, 100, 100).fill('white');
            Popup.BACKING_TEXTURE = Application.getInstance().renderer.generateTexture(gfx);
        }
        const backingWrapper = new Container();
        backingWrapper.sortableChildren = false;
        const backing = backingWrapper.addChild(new Sprite(Popup.BACKING_TEXTURE));
        backing.anchor.set(0.5);
        backing.alpha = backingConfig.alpha;
        backing.tint = backingConfig.color;
        backing.setSize(size.width, size.height);
        return backingWrapper;
    }
    /**
     * Create a new Popup
     * @param id - The unique identifier for the popup
     * @param config - The configuration for the popup
     */
    constructor(id, config = {}) {
        super();
        this.id = id;
        this.isShowing = false;
        this.config = Object.assign({ ...defaultPopupConfig }, config);
        this._initialize();
    }
    initialize() { }
    beforeHide() {
        this.app.focus.removeFocusLayer(this.id);
    }
    async hide() {
        this.visible = false;
        return Promise.resolve();
    }
    async show() {
        this.visible = true;
        return Promise.resolve();
    }
    async start() { }
    afterShow() {
        if (this.firstFocusableEntity) {
            this.app.focus.add(this.firstFocusableEntity, this.id, true);
            this.app.focus.setFocus(this.firstFocusableEntity);
        }
    }
    /**
     * End the popup
     */
    end() { }
    /**
     * Initialize the popup
     * @private
     */
    _initialize() {
        this.app.focus.addFocusLayer(this.id);
        if (this.config.backing) {
            this.backing = this.add.existing(Popup.makeBacking(this.config.backing, this.app.size));
            this.backing.eventMode = 'static';
            if (this.config.closeOnPointerDownOutside) {
                this.backing.once('pointerup', this._handlePointerUp);
                this.backing.once('tap', this._handlePointerUp);
            }
        }
        this.view = this.add.container();
        this.view.eventMode = 'static';
    }
    /**
     * Handle pointer up event
     * @private
     */
    _handlePointerUp() {
        void this.app.popups.hide(this.id);
    }
}
//# sourceMappingURL=Popup.js.map