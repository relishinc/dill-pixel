var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CoreFunction, CoreModule } from '../core/decorators';
import { Signal } from '../signals';
import { Module } from './Module';
let KeyboardManager = class KeyboardManager extends Module {
    constructor() {
        super(...arguments);
        this.id = 'KeyboardManager';
        this._keyDownSignals = new Map();
        this._keyUpSignals = new Map();
        this._enabled = true;
    }
    get enabled() {
        return this._enabled;
    }
    set enabled(value) {
        this._enabled = value;
    }
    initialize() {
        this._handleEvent = this._handleEvent.bind(this);
    }
    destroy() {
        document.removeEventListener('keydown', this._handleEvent);
        document.removeEventListener('keyup', this._handleEvent);
    }
    onKeyDown(key) {
        return this._checkAndAddSignal(key?.toLowerCase() || undefined, 'keydown');
    }
    onKeyUp(key) {
        return this._checkAndAddSignal(key?.toLowerCase() || undefined, 'keyup');
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
KeyboardManager = __decorate([
    CoreModule
], KeyboardManager);
export { KeyboardManager };
//# sourceMappingURL=KeyboardManager.js.map