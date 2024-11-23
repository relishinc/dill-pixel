import { KeyboardKey } from '../../../utils';
import { Action, ActionContext } from '../../actions';
import { AbstractControlScheme, ControlsActionMap } from '../interfaces';

// Define a type for single keyboard input
type KeyboardInput = (string & {}) | KeyboardKey | `${KeyboardKey}+${KeyboardKey}` | `${KeyboardKey}*`;

export interface KeyboardControlsAction {
  context: ActionContext[] | '*';
  input: KeyboardInput | KeyboardInput[];
}

export type KeyboardControlsActionMap = {
  [actionName: Action | string]: KeyboardControlsAction;
};

export interface IKeyboardControlScheme extends AbstractControlScheme<'down' | 'up'> {
  down?: KeyboardControlsActionMap;
  up?: KeyboardControlsActionMap;
  [key: string]: ControlsActionMap | undefined;
}
