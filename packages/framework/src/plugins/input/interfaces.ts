import { Action, ActionContext } from './actions';
import { KeyboardKey } from '../../utils';
import { IKeyboardControlScheme, KeyboardControls } from './keyboard';
import { ITouchControlScheme, TouchControls } from './touch';

export type KeyboardSchemaKey = KeyboardKey | string;

export interface ControlsAction {
  context: ActionContext[] | '*';
  input: string | string[];
}

export type ControlsActionMap = {
  [actionName: Action]: ControlsAction;
};

export type AbstractControlScheme<T extends string = string> = {
  [name in T]?: ControlsActionMap;
};

export interface IGamepadControlScheme extends AbstractControlScheme<'buttonDown' | 'buttonUp' | 'axis'> {
  buttonDown?: ControlsActionMap;
  buttonUp?: ControlsActionMap;
  axis?: ControlsActionMap;
}

export interface ControlScheme {
  keyboard?: IKeyboardControlScheme;
  touch?: ITouchControlScheme;
  gamepad?: IGamepadControlScheme;
}

export interface IControls {
  readonly keyboard: KeyboardControls;
  readonly touch: TouchControls;

  isActionActive(action: string): boolean;

  initialize(scheme: ControlScheme): void;

  destroy(): void;
}
