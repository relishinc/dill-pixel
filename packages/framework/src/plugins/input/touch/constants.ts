export enum JoystickDirection {
  None = 'none',
  Left = 'left',
  Top = 'top',
  Bottom = 'bottom',
  Right = 'right',
  TopLeft = 'top_left',
  TopRight = 'top_right',
  BottomLeft = 'bottom_left',
  BottomRight = 'bottom_right',
}
export type JoystickDirectionType =
  | JoystickDirection.None
  | JoystickDirection.Left
  | JoystickDirection.Top
  | JoystickDirection.Bottom
  | JoystickDirection.Right
  | JoystickDirection.TopLeft
  | JoystickDirection.TopRight
  | JoystickDirection.BottomLeft
  | JoystickDirection.BottomRight;

// export a type of all the JoystickDirections
export const JOYSTICK_DIRECTIONS: JoystickDirectionType[] = [
  JoystickDirection.None,
  JoystickDirection.Left,
  JoystickDirection.Top,
  JoystickDirection.Bottom,
  JoystickDirection.Right,
  JoystickDirection.TopLeft,
  JoystickDirection.TopRight,
  JoystickDirection.BottomLeft,
  JoystickDirection.BottomRight,
];
