import { ActionContext, ActionMap, UserActions, UserButtons } from '../actions';
import { IKeyboardControlScheme, KeyboardControls } from './keyboard';
import { ITouchControlScheme, TouchControls } from './touch';
import { AbstractControlScheme, ControlsActionMap, KeyboardControlsMap, TouchControlsMap } from './types';

export interface ControlsAction {
  context: ActionContext[] | '*' | (string & {});
  input: string | string[];
}

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

  initialize(scheme: UserControls, actions: ActionMap): void;

  destroy(): void;
}

export interface UserControls<U extends UserActions = UserActions, B extends UserButtons = UserButtons> {
  keyboard: Partial<KeyboardControlsMap<U>>;
  touch: Partial<TouchControlsMap<U, B>>;
}
