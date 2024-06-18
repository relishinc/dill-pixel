import { Action, ActionContext } from '../actions';
import { AbstractControlScheme } from '../interfaces';
import { JoystickDirection } from './constants';

export interface TouchControlsAction {
  context: ActionContext[] | '*';
  input: string | string[] | `${string | JoystickDirection}+` | `${string | JoystickDirection}*`;
}

export type TouchControlsActionMap = {
  [actionName: Action]: TouchControlsAction;
};

export interface ITouchControlScheme extends AbstractControlScheme<'down' | 'up' | 'joystick'> {
  down?: TouchControlsActionMap;
  up?: TouchControlsActionMap;
}
