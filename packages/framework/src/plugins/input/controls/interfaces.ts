import { Action, ActionContext } from '../actions';

import { IApplication } from '../../../core';
import { KeyboardKey } from '../../../utils';

export type KeyboardSchemaKey = KeyboardKey | string;

export interface ControlsAction {
  context: ActionContext[] | '*';
  input: string | string[];
}

export interface KeyboardControlsAction {
  context: ActionContext[] | '*';
  input: KeyboardSchemaKey | KeyboardSchemaKey[] | `${KeyboardSchemaKey}+` | `${KeyboardSchemaKey}*`;
}

export type ControlsActionMap = {
  [actionName: Action]: ControlsAction;
};

export type KeyboardControlsActionMap = {
  [actionName: Action]: KeyboardControlsAction;
};

export type AbstractControlScheme<T extends string = string> = {
  [name in T]?: ControlsActionMap;
};

export interface IKeyboardControlScheme extends AbstractControlScheme<'down' | 'up'> {
  down?: KeyboardControlsActionMap;
  up?: KeyboardControlsActionMap;
}

export interface IGamepadControlScheme extends AbstractControlScheme<'buttonDown' | 'buttonUp' | 'axis'> {
  buttonDown?: ControlsActionMap;
  buttonUp?: ControlsActionMap;
  axis?: ControlsActionMap;
}

export interface ControlScheme {
  keyboard?: IKeyboardControlScheme;
  gamepad?: IGamepadControlScheme;
}

export interface IControls {
  initialize(app: IApplication, scheme: ControlScheme): void;

  destroy(): void;
}
