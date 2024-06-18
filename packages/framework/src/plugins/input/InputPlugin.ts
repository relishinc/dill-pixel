import { Action, ActionContext } from './actions';
import type { ActionDetail, ActionSignal, ActionsList } from './types';
import { Controls } from './Controls';
import type { ControlScheme } from './interfaces';

import { IApplication } from '../../core';
import type { IPlugin } from '../Plugin';
import { Plugin } from '../Plugin';
import { InputController, InputControllerTypes } from './constants';
import { Signal } from '../../signals';

export type InputManagerOptions = {
  actions?: ActionsList;
  controls?: ControlScheme;
};

export interface IInputPlugin extends IPlugin {
  readonly controls: Controls;
  activeGamepads: Map<string, Gamepad>;
  activeControllers: Set<string>;
  options: InputManagerOptions;
  onGamepadConnected: Signal<(gamepad: Gamepad) => void>;
  onGamepadDisconnected: Signal<(gamepad: Gamepad) => void>;
  onControllerActivated: Signal<(controller: string) => void>;
  onControllerDeactivated: Signal<(controller: string) => void>;
  onContextChanged: Signal<(context: string | ActionContext) => void>;
  context: string | ActionContext;

  actions<TActionData = any>(action: string): ActionSignal<TActionData>;

  sendAction<TActionData = any>(action: string, data?: TActionData): void;

  setActionContext(context: string | ActionContext): string;

  isControllerActive(controller: InputController): boolean;

  isGamepadActive(gamepad: Gamepad): boolean;

  isActionActive(action: Action): boolean;
}

const defaultActions: Action[] = [
  'up',
  'down',
  'left',
  'right',
  'action',
  'pause',
  'unpause',
  'start',
  'select',
  'menu',
  'back',
  'next',
];

const defaultOptions = {
  actions: defaultActions,
};

export class InputPlugin extends Plugin implements IInputPlugin {
  public readonly id = 'input';

  // controls
  public readonly controls = new Controls();

  // properties
  public activeGamepads = new Map<string, Gamepad>();
  public activeControllers = new Set<string>([]);
  public options: InputManagerOptions;
  // signals
  public onGamepadConnected: Signal<(gamepad: Gamepad) => void> = new Signal<(gamepad: Gamepad) => void>();
  public onGamepadDisconnected: Signal<(gamepad: Gamepad) => void> = new Signal<(gamepad: Gamepad) => void>();
  public onControllerActivated: Signal<(controller: string) => void> = new Signal<(controller: string) => void>();
  public onControllerDeactivated: Signal<(controller: string) => void> = new Signal<(controller: string) => void>();
  public onContextChanged: Signal<(context: string | ActionContext) => void> = new Signal<
    (context: string | ActionContext) => void
  >();
  private _actionSignals: Map<string | number, ActionSignal> = new Map();

  // private properties
  private _context: string | ActionContext = 'general';

  get context(): string | ActionContext {
    return this._context;
  }

  set context(context: string | ActionContext) {
    if (this._context === context) {
      return;
    }
    this._context = context;
    this.onContextChanged.emit(context);
  }

  isActionActive(action: Action): boolean {
    return this.controls.isActionActive(action);
  }

  async initialize(app: IApplication, options: InputManagerOptions = defaultOptions): Promise<void> {
    this.options = { ...defaultOptions, ...options };

    app.stage.eventMode = 'static';
    app.stage.on('touchstart', this._onTouchStart);
    app.stage.on('globalmousemove', this._onMouseMove);
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('gamepadconnected', this._onGamepadConnected);
    window.addEventListener('gamepaddisconnected', this._onGamepadDisconnected);

    if (this.options.controls) {
      this.controls.initialize(this.options.controls);
    }
  }

  public postInitialize(): void {
    if (this.controls) {
      this.controls.connect();
    }
  }

  destroy(): void {
    // unregister all event listeners
    this.app.stage.off('touchstart', this._onTouchStart);
    this.app.stage.off('globalmousemove', this._onMouseMove);
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('gamepadconnected', this._onGamepadConnected);
    window.removeEventListener('gamepaddisconnected', this._onGamepadDisconnected);

    super.destroy();
  }

  isControllerActive(controller: InputController): boolean {
    return this.activeControllers.has(controller);
  }

  isGamepadActive(gamepad: Gamepad): boolean {
    return this.activeGamepads.has(gamepad.id);
  }

  actions<TActionData = any>(action: Action | number): ActionSignal<TActionData> {
    if (!this._actionSignals.has(action)) {
      this._actionSignals.set(action, new Signal<(actionDetail: ActionDetail<TActionData>) => void>());
    }
    return this._actionSignals.get(action)!;
  }

  sendAction<TActionData = any>(actionId: Action | number, data?: TActionData): void {
    return this.actions<TActionData>(actionId).emit({ id: actionId, context: this.context, data });
  }

  setActionContext(context: string | ActionContext): string {
    this.context = context;
    return context;
  }

  protected getCoreFunctions(): string[] {
    return ['setActionContext', 'sendAction', 'actions'];
  }

  protected getCoreSignals(): string[] {
    return [
      'onGamepadConnected',
      'onGamepadDisconnected',
      'onControllerActivated',
      'onControllerDeactivated',
      'onContextChanged',
    ];
  }

  private _activateController(inputController: string): void {
    if (this.activeControllers.has(inputController)) {
      return;
    }
    this.activeControllers.add(inputController);
    // emit the controller activated signal
    this.onControllerActivated.emit(inputController);
  }

  private _deactivateController(inputController: InputController): void {
    const wasControllerActive = this.activeControllers.has(inputController);
    if (!wasControllerActive) {
      return;
    }
    this.activeControllers.delete(inputController);
    // emit the controller deactivated signal
    this.onControllerDeactivated.emit(inputController);
  }

  private _activateGamepad(gamepad: Gamepad): void {
    this.activeGamepads.set(gamepad.id, gamepad);
  }

  private _deactivateGamepad(gamepadId: string): void {
    this.activeGamepads.delete(gamepadId);
  }

  private _onTouchStart(): void {
    this._activateController(InputControllerTypes.Touch);
  }

  private _onMouseMove(): void {
    this._activateController(InputControllerTypes.Mouse);
  }

  private _onKeyDown(): void {
    this._activateController(InputControllerTypes.Keyboard);
  }

  private _onGamepadConnected(event: GamepadEvent): void {
    this._activateController(InputControllerTypes.GamePad);
    // add the gamepad id just in case we need it (?)
    this._activateController(event.gamepad.id);
    this._activateGamepad(event.gamepad);
    // emit the gamepad connected signal
    this.onGamepadConnected.emit(event.gamepad);
  }

  private _onGamepadDisconnected(event: GamepadEvent): void {
    // remove the gamepad
    this._deactivateGamepad(event.gamepad.id);

    // pause the game any time there is a controller disconnect
    this.sendAction('pause');

    // emit the gamepad disconnected signal
    this.onGamepadDisconnected.emit(event.gamepad);

    // check if all gamepads are disconnected
    if (this.activeGamepads.size === 0) {
      this._deactivateController(InputControllerTypes.GamePad);
    }
  }
}
