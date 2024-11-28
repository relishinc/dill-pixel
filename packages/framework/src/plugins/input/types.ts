import { JoystickInput } from '../..';
import { KeyboardKey } from '../../utils';
import { Action, ExtractButtonId, UserActions, UserButtons } from '../actions';
import { ControlsAction } from './interfaces';

export type KeyboardSchemaKey = KeyboardKey;
export type ControlsActionMap = {
  [actionName: Action | string]: ControlsAction;
};

export type AbstractControlScheme<T extends string = string> = {
  [name in T]?: ControlsActionMap;
};

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
