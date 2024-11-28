import { KeyboardKey } from '../../utils';
import { Action, ActionContext, ActionMap, ExtractButtonId, UserActions, UserButtons } from '../actions';
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

  initialize(scheme: UserControls, actions: ActionMap): void;

  destroy(): void;
}

// Helper type for key combinations
type KeyCombination = `${KeyboardSchemaKey}+${KeyboardSchemaKey}`;

export type KeyboardControlsScheme<U extends UserActions = UserActions> = {
  [key in keyof U]: KeyboardSchemaKey | KeyCombination | (KeyboardSchemaKey | KeyCombination)[];
};

export type KeyboardControlsMap<U extends UserActions = UserActions> = {
  down?: Partial<KeyboardControlsScheme<U>>;
  up?: Partial<KeyboardControlsScheme<U>>;
};

export type TouchControlsScheme<U extends UserActions = UserActions, B extends UserButtons = UserButtons> = {
  [key in keyof U]:
    | ExtractButtonId<B>
    | `${ExtractButtonId<B>}+${ExtractButtonId<B>}`
    | (ExtractButtonId<B> | `${ExtractButtonId<B>}+${ExtractButtonId<B>}`)[];
};

export type JoystickControlsScheme<U extends UserActions = UserActions> = {
  [key in keyof U]: JoystickInput | JoystickInput[];
};

export type TouchControlsMap<U extends UserActions = UserActions, B extends UserButtons = UserButtons> = {
  joystick?: Partial<JoystickControlsScheme<U>>;
  up?: Partial<TouchControlsScheme<U, B>>;
  down?: Partial<TouchControlsScheme<U, B>>;
};

export interface UserControls<U extends UserActions = UserActions, B extends UserButtons = UserButtons> {
  keyboard: Partial<KeyboardControlsMap<U>>;
  touch: Partial<TouchControlsMap<U, B>>;
}

export function defineControls<U extends UserActions = UserActions, B extends UserButtons = UserButtons>(
  actions: U,
  buttons: B,
  controls: UserControls<U, B>,
): UserControls<U, B> {
  return controls;
}
