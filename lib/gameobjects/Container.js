import { Container as PIXIContainer, Point, Ticker } from 'pixi.js';
import { SignalConnections } from 'typed-signals';
import { playVO } from '../audio';
import { Application } from '../core';
import { stopCaption } from '../functions';
import { Editor } from '../misc';
import { Signals } from '../signals';
import { Add, bindAllMethods, bindMethods, Make } from '../utils';
/**
 * Enhanced PIXI Container that has:
 * a factory for adding children,
 * a reference to the Application instance,
 * a signal connection manager,
 * and auto update / resize capabilities
 * @class Container
 * @extends PIXIContainer
 */
export class Container extends PIXIContainer {
    static { this.__dill_pixel_top_level_class = true; }
    constructor(autoResize = true, autoUpdate = false, autoBindMethods = true) {
        super();
        this.editable = true;
        this.childrenEditable = true;
        // optionally add signals to a SignalConnections instance for easy removal
        this._signalConnections = new SignalConnections();
        this._editMode = false;
        this._focusSize = new Point();
        this._focusPosition = new Point();
        this._useAsCaptionTarget = true;
        this._addFactory = new Add(this);
        if (autoBindMethods) {
            this.bindAllMethods();
        }
        else {
            this.bindMethods('onResize', 'update', 'updateFocusValues');
        }
        if (autoResize) {
            this.addSignalConnection(Signals.onResize.connect(this.onResize));
        }
        if (autoUpdate) {
            Ticker.shared.add(this.update, this);
        }
        this.on('added', this.updateFocusValues);
        this.on('childAdded', this.updateFocusValues);
        this.on('childRemoved', this.updateFocusValues);
        this.updateFocusValues();
    }
    get useAsCaptionTarget() {
        return this._useAsCaptionTarget;
    }
    set useAsCaptionTarget(value) {
        this._useAsCaptionTarget = value;
    }
    get voiceover() {
        return this._voiceover;
    }
    set voiceover(value) {
        this._voiceover = value;
        this.off('pointerover', this._onHoverForVO);
        this.off('pointerout', this._onOutForVO);
        if (this._voiceover) {
            this.on('pointerover', this._onHoverForVO);
            this.on('pointerout', this._onOutForVO);
        }
    }
    get focusPosition() {
        return this._focusPosition;
    }
    set focusPosition(value) {
        this._focusPosition = value;
    }
    get focusSize() {
        return this._focusSize;
    }
    set focusSize(value) {
        this._focusSize = value;
    }
    get focusable() {
        return this._focusable;
    }
    set focusable(value) {
        this._focusable = value;
    }
    get editMode() {
        return this._editMode;
    }
    set editMode(value) {
        this._editMode = value;
        if (this._editMode) {
            this.enableEditMode();
        }
        else {
            this.disableEditMode();
        }
    }
    get add() {
        return this._addFactory;
    }
    get make() {
        return Make;
    }
    get app() {
        return Application.instance;
    }
    destroy(_options) {
        this.disconnectAllSignals();
        this.off('added', this.updateFocusValues);
        this.off('childAdded', this.updateFocusValues);
        this.off('childRemoved', this.updateFocusValues);
        this.off('pointerover', this._onHoverForVO);
        this.off('pointerout', this._onOutForVO);
        super.destroy(_options);
    }
    // focus stuff
    onFocusBegin() {
        if (this._voiceover) {
            playVO(this._voiceover, { data: { target: this._useAsCaptionTarget ? this : null } });
        }
    }
    onFocusEnd() {
        if (this._voiceover) {
            stopCaption({ id: this._voiceover });
        }
    }
    onFocusActivated() { }
    getFocusPosition() {
        return this._focusPosition;
    }
    getFocusSize() {
        return this._focusSize;
    }
    isFocusable() {
        return this._focusable;
    }
    enableEditMode() {
        this.editor = new Editor(this);
    }
    disableEditMode() {
        if (this.editor) {
            this.editor.destroy();
        }
    }
    onResize(_size) {
        // noop
    }
    update(_deltaTime) {
        // noop
    }
    _onHoverForVO() {
        playVO(this._voiceover, { data: { target: this._useAsCaptionTarget ? this : null } });
    }
    _onOutForVO() {
        if (this._voiceover) {
            stopCaption({ id: this._voiceover });
        }
    }
    updateFocusValues() {
        const bounds = this.getBounds();
        this._focusPosition = new Point(-this.width * 0.5, -this.height * 0.5);
        this._focusSize = new Point(bounds.width, bounds.height);
    }
    /**
     * @protected
     * adds a signal connection
     */
    addSignalConnection(pConnection) {
        this._signalConnections.add(pConnection);
    }
    /**
     * @protected
     * removes all signal connections
     */
    disconnectAllSignals() {
        this._signalConnections.disconnectAll();
    }
    /**
     * @param methodNames
     * @protected
     */
    bindMethods(...methodNames) {
        return bindMethods(this, ...methodNames);
    }
    bindAllMethods() {
        return bindAllMethods(this);
    }
}
//# sourceMappingURL=Container.js.map