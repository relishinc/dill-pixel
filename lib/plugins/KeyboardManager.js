var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CoreFunction, CorePlugin } from '../core/decorators';
import { Signal } from '../signals';
import { Plugin } from './Plugin';
let KeyboardManager = class KeyboardManager extends Plugin {
    id = 'KeyboardManager';
    // global signals
    onGlobalKeyDown = new Signal();
    onGlobalKeyUp = new Signal();
    _keysDown = new Set();
    _keyDownSignals = new Map();
    _keyUpSignals = new Map();
    _enabled = true;
    get enabled() {
        return this._enabled;
    }
    set enabled(value) {
        this._enabled = value;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    initialize(_app) {
        // track which keys are down
        document.addEventListener('keydown', this._handleKeyDown);
        document.addEventListener('keyup', this._handleKeyUp);
    }
    destroy() {
        document.removeEventListener('keydown', this._handleEvent);
        document.removeEventListener('keyup', this._handleEvent);
        document.addEventListener('keydown', this._handleKeyDown);
        document.addEventListener('keyup', this._handleKeyUp);
    }
    onKeyDown(key) {
        return this._checkAndAddSignal(key?.toLowerCase() || undefined, 'keydown');
    }
    onKeyUp(key) {
        return this._checkAndAddSignal(key?.toLowerCase() || undefined, 'keyup');
    }
    isKeyDown(key) {
        return this._keysDown.has(key);
    }
    _update() {
        //
    }
    _handleKeyDown(e) {
        this._keysDown.add(e.key);
        this.onGlobalKeyDown.emit({ event: e, key: e.key });
    }
    _handleKeyUp(e) {
        this._keysDown.delete(e.key);
        this.onGlobalKeyUp.emit({ event: e, key: e.key });
    }
    /**
     * Check if the signal exists and add it if it doesn't
     * Also, if this is the first signal, start listening for the event
     * @param {string} key
     * @param {KeyboardEventType} eventType
     * @returns {KeySignal}
     * @private
     */
    _checkAndAddSignal(key, eventType) {
        const signalMap = eventType === 'keydown' ? this._keyDownSignals : this._keyUpSignals;
        if (!signalMap.size) {
            this._listen(eventType);
        }
        if (key === undefined) {
            key = '*undefined*';
        }
        if (!signalMap.has(key)) {
            signalMap.set(key, new Signal());
        }
        return signalMap.get(key);
    }
    _listen(eventType) {
        document.addEventListener(eventType, this._handleEvent);
    }
    _handleEvent(event) {
        if (!this._enabled) {
            return;
        }
        const signalMap = event.type === 'keydown' ? this._keyDownSignals : this._keyUpSignals;
        signalMap.get('*undefined*')?.emit({ event, key: event.key.toLowerCase() });
        signalMap.get(event.key.toLowerCase())?.emit({ event, key: event.key });
    }
};
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], KeyboardManager.prototype, "onKeyDown", null);
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], KeyboardManager.prototype, "onKeyUp", null);
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Boolean)
], KeyboardManager.prototype, "isKeyDown", null);
KeyboardManager = __decorate([
    CorePlugin
], KeyboardManager);
export { KeyboardManager };
