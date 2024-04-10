import { Signal } from '../signals';
import type { IModule } from './Module';
import { Module } from './Module';
export type KeyboardEventDetail = {
    event: KeyboardEvent;
    key: string;
};
type KeySignal = Signal<(detail: KeyboardEventDetail) => void>;
export interface IKeyboardManager extends IModule {
    enabled: boolean;
    onKeyDown(key?: string): KeySignal;
    onKeyUp(key?: string): KeySignal;
}
export declare class KeyboardManager extends Module implements IKeyboardManager {
    readonly id: string;
    private _keyDownSignals;
    private _keyUpSignals;
    private _enabled;
    get enabled(): boolean;
    set enabled(value: boolean);
    initialize(): void;
    destroy(): void;
    onKeyDown(key?: string): KeySignal;
    onKeyUp(key?: string): KeySignal;
    /**
     * Check if the signal exists and add it if it doesn't
     * Also, if this is the first signal, start listening for the event
     * @param {string} key
     * @param {KeyboardEventType} eventType
     * @returns {KeySignal}
     * @private
     */
    private _checkAndAddSignal;
    private _listen;
    private _handleEvent;
}
export {};
//# sourceMappingURL=KeyboardManager.d.ts.map