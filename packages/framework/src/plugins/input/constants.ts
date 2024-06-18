export enum InputControllerTypes {
  Keyboard = 'keyboard',
  GamePad = 'gamepad',
  Mouse = 'mouse',
  Touch = 'touch',
}

export type InputController =
  | InputControllerTypes.Keyboard
  | InputControllerTypes.GamePad
  | InputControllerTypes.Mouse
  | InputControllerTypes.Touch;
