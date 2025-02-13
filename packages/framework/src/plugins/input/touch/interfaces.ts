import { type ActionContext } from '../../actions';
import { type AbstractControlScheme } from '../types';
import { JoystickDirection } from './constants';

type JoystickCombination = `${JoystickDirection}+${JoystickDirection}`;
type JoystickHold = `${JoystickDirection}*`;
export type JoystickInput = (string & {}) | JoystickDirection | JoystickCombination | JoystickHold;

export interface TouchControlsAction {
  context: ActionContext[] | '*';
  input: JoystickInput | JoystickInput[];
  [key: string]: JoystickInput | JoystickInput[] | undefined;
}

export interface ITouchControlScheme extends AbstractControlScheme<'down' | 'up' | 'joystick'> {}
