import { UserActions, UserButtons } from '../actions';
import { UserControls } from './interfaces';
export function defineControls<U extends UserActions = UserActions, B extends UserButtons = UserButtons>(
  actions: U,
  buttons: B,
  controls: UserControls<U, B>,
): UserControls<U, B> {
  return controls;
}
