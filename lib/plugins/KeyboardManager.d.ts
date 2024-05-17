import { IApplication } from '../core/Application';
import { Signal } from '../signals';
import type { IPlugin } from './Plugin';
import { Plugin } from './Plugin';
export type KeyboardEventDetail = {
    event: KeyboardEvent;
    key: string;
};
type KeySignal = Signal<(detail: KeyboardEventDetail) => void>;
export interface IKeyboardManager extends IPlugin {
    enabled: boolean;
    onKeyDown(key?: string): KeySignal;
    onKeyUp(key?: string): KeySignal;
    isKeyDown(key: string): boolean;
}
export declare class KeyboardManager extends Plugin implements IKeyboardManager {
    readonly id: string;
    onGlobalKeyDown: Signal<(detail: KeyboardEventDetail) => void>;
    onGlobalKeyUp: Signal<(detail: KeyboardEventDetail) => void>;
    private _keysDown;
    private _keyDownSignals;
    private _keyUpSignals;
    private _enabled;
    get enabled(): boolean;
    set enabled(value: boolean);
    initialize(_app: IApplication): void;
    destroy(): void;
    onKeyDown(key?: string): KeySignal;
    onKeyUp(key?: string): KeySignal;
    isKeyDown(key: string): boolean;
    _update(): void;
    private _handleKeyDown;
    private _handleKeyUp;
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
