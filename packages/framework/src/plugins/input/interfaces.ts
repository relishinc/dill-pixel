import { KeyboardKey } from '../../utils';
import { Action, ActionContext, ActionMap, UserActions } from '../actions';
import { IKeyboardControlScheme, KeyboardControls } from './keyboard';
import { ITouchControlScheme, JoystickInput, TouchControls } from './touch';

export type KeyboardSchemaKey = KeyboardKey;

export interface ControlsAction {
  context: ActionContext[] | '*' | (string & {});
  input: string | string[];
}

export type ControlsActionMap = {
  [actionName: Action | string]: ControlsAction;
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

  initialize(scheme: ControlScheme, actions: ActionMap): void;

  destroy(): void;
}

// Helper type for key combinations
type KeyCombination = `${KeyboardSchemaKey}+${KeyboardSchemaKey}`;

export type KeyboardControlsMap<U extends UserActions = UserActions> = {
  down?: Partial<{
    [K in KeyboardSchemaKey | KeyCombination]: keyof U;
  }>;
  up?: Partial<{
    [K in KeyboardSchemaKey | KeyCombination]: keyof U;
  }>;
};

export type TouchControlsMap<U extends UserActions = UserActions> = {
  [K in JoystickInput]: keyof U;
};

export interface UserControls<U extends UserActions = UserActions> {
  keyboard: Partial<KeyboardControlsMap<U>>;
  touch: Partial<TouchControlsMap<U>>;
}

export function defineControls<U extends UserActions = UserActions>(
  actions: U,
  controls: UserControls<U>,
): UserControls<U> {
  return controls;
}
