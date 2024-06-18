import { Action, ActionContext } from '../actions';
import { AbstractControlScheme, KeyboardSchemaKey } from '../interfaces';

export interface KeyboardControlsAction {
  context: ActionContext[] | '*';
  input: KeyboardSchemaKey | KeyboardSchemaKey[] | `${KeyboardSchemaKey}+` | `${KeyboardSchemaKey}*`;
}

export type KeyboardControlsActionMap = {
  [actionName: Action]: KeyboardControlsAction;
};

export interface IKeyboardControlScheme extends AbstractControlScheme<'down' | 'up'> {
  down?: KeyboardControlsActionMap;
  up?: KeyboardControlsActionMap;
}
