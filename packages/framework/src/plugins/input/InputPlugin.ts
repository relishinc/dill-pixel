import type { ActionsList, IActionsPlugin } from '../actions';
import { Action } from '../actions';
import { Controls } from './Controls';

import { IApplication } from '../../core';
import { Signal } from '../../signals';
import type { IPlugin } from '../Plugin';
import { Plugin } from '../Plugin';
import { InputController, InputControllerTypes } from './constants';
import { UserControls } from './interfaces';

export type InputManagerOptions = {
  actions?: ActionsList;
  controls?: UserControls;
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

  isControllerActive(controller: InputController): boolean;

  isGamepadActive(gamepad: Gamepad): boolean;

  isActionActive(action: Action): boolean;
}

const defaultInputActions: Action[] = [
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
  actions: defaultInputActions,
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

  protected getCoreSignals(): string[] {
    return ['onGamepadConnected', 'onGamepadDisconnected', 'onControllerActivated', 'onControllerDeactivated'];
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
    this.actionsPlugin.sendAction('pause');

    // emit the gamepad disconnected signal
    this.onGamepadDisconnected.emit(event.gamepad);

    // check if all gamepads are disconnected
    if (this.activeGamepads.size === 0) {
      this._deactivateController(InputControllerTypes.GamePad);
    }
  }

  get actionsPlugin(): IActionsPlugin {
    return this.app.getPlugin('actions') as IActionsPlugin;
  }
}
