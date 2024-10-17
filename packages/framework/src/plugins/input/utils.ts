import { ControlScheme } from './interfaces';
export interface ControlsStructure {
  keyboard: {
    down: Record<string, { context: string[] | '*'; input: string | string[] }>;
    up: Record<string, { context: string[] | '*'; input: string | string[] }>;
  };
  touch: {
    down: Record<string, { context: string[] | '*'; input: string }>;
    joystick: Record<string, { context: string[] | '*'; input: string[] }>;
  };
}

// Function to create types from the controls object
export function createControlTypes<T extends ControlScheme>(controls: T) {
  type ControlType = T;
  type InputType = keyof ControlType;
  type ActionType<U extends InputType> = keyof ControlType[U];
  type SubActionType<U extends InputType, V extends ActionType<U>> = keyof ControlType[U][V];

  type ActionName = {
    [U in InputType]: {
      [V in ActionType<U>]: {
        [W in SubActionType<U, V>]: W;
      }[SubActionType<U, V>];
    }[ActionType<U>];
  }[InputType];

  return {
    controls,
    ActionName: {} as ActionName, // This is a type-only "value" to export the type
  };
}
