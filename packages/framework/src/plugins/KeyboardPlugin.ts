import { IApplication } from '../core';
import { Signal } from '../signals';
import { KeyboardKey } from '../utils';
import type { IPlugin } from './Plugin';
import { Plugin } from './Plugin';

export type KeyboardEventType = 'keydown' | 'keyup';
export type KeyboardEventDetail = { event: KeyboardEvent; key: string };
export type KeySignal = Signal<(detail: KeyboardEventDetail) => void>;

export interface IKeyboardPlugin extends IPlugin {
  enabled: boolean;
  readonly keysDown: Set<string>;

  onKeyDown(key?: KeyboardKey): KeySignal;

  onKeyUp(key?: KeyboardKey): KeySignal;

  isKeyDown(key: string): boolean;
}

export function normalizeKey(key: string | undefined): string {
  if (key === undefined) {
    key = '*undefined*';
  } else if (key === ' ') {
    key = 'Space';
  } else if (key.length === 1) {
    key = key.toUpperCase();
  }
  return key;
}

export class KeyboardPlugin extends Plugin implements IKeyboardPlugin {
  public readonly id: string = 'keyboard';
  // global signals
  public onGlobalKeyDown: Signal<(detail: KeyboardEventDetail) => void> = new Signal();
  public onGlobalKeyUp: Signal<(detail: KeyboardEventDetail) => void> = new Signal();

  private _keyDownSignals: Map<string | undefined, KeySignal> = new Map();
  private _keyUpSignals: Map<string | undefined, KeySignal> = new Map();

  private _keysDown: Set<string> = new Set();

  get keysDown() {
    return this._keysDown;
  }

  private _enabled: boolean = true;

  public get enabled(): boolean {
    return this._enabled;
  }

  public set enabled(value: boolean) {
    this._enabled = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public initialize(_options: any, _app: IApplication): void {
    // track which keys are down
    document.addEventListener('keydown', this._handleKeyDown);
    document.addEventListener('keyup', this._handleKeyUp);
  }

  public destroy() {
    document.removeEventListener('keydown', this._handleEvent);
    document.removeEventListener('keyup', this._handleEvent);

    document.addEventListener('keydown', this._handleKeyDown);
    document.addEventListener('keyup', this._handleKeyUp);
  }

  public onKeyDown(key?: KeyboardKey): KeySignal {
    return this._checkAndAddSignal(key || undefined, 'keydown');
  }

  public onKeyUp(key?: KeyboardKey): KeySignal {
    return this._checkAndAddSignal(key || undefined, 'keyup');
  }

  public isKeyDown(key: KeyboardKey): boolean {
    return this._keysDown.has(key);
  }

  _update() {
    //
  }

  protected getCoreSignals(): string[] {
    return ['onGlobalKeyDown', 'onGlobalKeyUp'];
  }

  protected getCoreFunctions(): string[] {
    return ['onKeyDown', 'onKeyUp', 'isKeyDown'];
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    const key = normalizeKey(e.key);
    this._keysDown.add(key);
    this.onGlobalKeyDown.emit({ event: e, key: e.key });
  }

  private _handleKeyUp(e: KeyboardEvent): void {
    const key = normalizeKey(e.key);
    this._keysDown.delete(key);
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
  private _checkAndAddSignal(key: string | undefined, eventType: KeyboardEventType): KeySignal {
    const signalMap = eventType === 'keydown' ? this._keyDownSignals : this._keyUpSignals;

    if (!signalMap.size) {
      this._listen(eventType);
    }

    key = normalizeKey(key);

    if (!signalMap.has(key)) {
      signalMap.set(key, new Signal<(detail: KeyboardEventDetail) => void>());
    }

    return signalMap.get(key) as KeySignal;
  }

  private _listen(eventType: KeyboardEventType): void {
    document.addEventListener(eventType, this._handleEvent);
  }

  private _handleEvent(event: KeyboardEvent): void {
    if (!this._enabled) {
      return;
    }
    const signalMap = event.type === 'keydown' ? this._keyDownSignals : this._keyUpSignals;
    const key = normalizeKey(event.key);
    signalMap.get('*undefined*')?.emit({ event, key });
    signalMap.get(key)?.emit({ event, key });
  }
}
