import { Signal } from '../signals';
export function Interactive(Base) {
    return class extends Base {
        _signals = new Map();
        constructor(...args) {
            super(...args);
            this._emitSignal = this._emitSignal.bind(this);
            this.eventMode = 'static';
        }
        onInteraction(eventName) {
            if (!this._signals.has(eventName)) {
                const signal = new Signal();
                this._signals.set(eventName, signal);
                this.on(eventName, this._emitSignal);
            }
            return this._signals.get(eventName);
        }
        destroy(options) {
            for (const eventName of this._signals.keys()) {
                this.off(eventName, this._emitSignal);
            }
            this._signals.clear();
            super.destroy(options);
        }
        _emitSignal(event) {
            const signalName = event.type;
            const signal = this._signals.get(signalName);
            if (signal) {
                signal.emit(event);
            }
        }
    };
}
