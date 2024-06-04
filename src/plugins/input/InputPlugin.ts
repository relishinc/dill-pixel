import { IApplication } from '../../core';
import { Signal } from '../../signals';
import type { IPlugin } from '../Plugin';
import { Plugin } from '../Plugin';
import { Action, ActionContext } from './actions';
import type { ActionDetail, ActionSignal, ActionsList } from './types';
import { InputController } from './constants';

export type InputManagerOptions = {
  actions?: ActionsList;
};

export interface IInputPlugin extends IPlugin {
  activeGamepads: Map<string, Gamepad>;
  activeControllers: Set<string>;
  options: InputManagerOptions;
  onGamepadConnected: Signal<(gamepad: Gamepad) => void>;
  onGamepadDisconnected: Signal<(gamepad: Gamepad) => void>;
  onControllerActivated: Signal<(controller: string) => void>;
  onControllerDeactivated: Signal<(controller: string) => void>;
  onContextChanged: Signal<(context: string | ActionContext) => void>;
  context: string | ActionContext;

  actions(action: string): ActionSignal;

  sendAction(action: string, data?: any): void;

  isControllerActive(controller: InputController): boolean;

  isGamepadActive(gamepad: Gamepad): boolean;
}

const defaultActions = [
  Action.Up,
  Action.Down,
  Action.Left,
  Action.Right,
  Action.Action,
  Action.Pause,
  Action.Unpause,
  Action.Start,
  Action.Menu,
  Action.Back,
  Action.Next,
];

const defaultOptions = {
  actions: defaultActions,
};

export class InputPlugin extends Plugin implements IInputPlugin {
  public readonly id = 'input';
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
  private _context: string | ActionContext = ActionContext.General;

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

  async initialize(app: IApplication, options: InputManagerOptions = defaultOptions): Promise<void> {
    this.options = { ...defaultOptions, ...options };
    app.stage.eventMode = 'static';
    app.stage.on('touchstart', this._onTouchStart);
    app.stage.on('globalmousemove', this._onMouseMove);
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('gamepadconnected', this._onGamepadConnected);
    window.addEventListener('gamepaddisconnected', this._onGamepadDisconnected);
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

  actions<T = any>(action: string | number): ActionSignal<T> {
    if (!this._actionSignals.has(action)) {
      this._actionSignals.set(action, new Signal<(actionDetail: ActionDetail<T>) => void>());
    }
    return this._actionSignals.get(action)!;
  }

  sendAction<T = any>(actionId: string | number, data?: T): void {
    return this.actions<T>(actionId).emit({ id: actionId, context: this.context, data });
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
    this._activateController(InputController.Touch);
  }

  private _onMouseMove(): void {
    this._activateController(InputController.Mouse);
  }

  private _onKeyDown(): void {
    this._activateController(InputController.Keyboard);
  }

  private _onGamepadConnected(event: GamepadEvent): void {
    this._activateController(InputController.Gamepad);
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
    this.sendAction(Action.Pause);

    // emit the gamepad disconnected signal
    this.onGamepadDisconnected.emit(event.gamepad);

    // check if all gamepads are disconnected
    if (this.activeGamepads.size === 0) {
      this._deactivateController(InputController.Gamepad);
    }
  }
}
