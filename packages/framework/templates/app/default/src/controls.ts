import { ControlScheme } from 'dill-pixel';

export const controls: ControlScheme = {
  keyboard: {
    down: {
      move_left: { context: ['game'], input: ['ArrowLeft', 'a'] },
      move_right: { context: ['game'], input: ['ArrowRight', 'd'] },
      move_down: { context: ['game'], input: ['ArrowDown', 'd'] },
      warp: { context: ['game'], input: ['q'] },
      jump: { context: ['game'], input: ['ArrowUp', ' '] },
      combo: { context: '*', input: 'Shift+l' },
    },
    up: {
      toggle_pause: { context: '*', input: 'p' },
      close: { context: ['menu'], input: 'Escape' },
      back: { context: ['menu'], input: 'ArrowLeft' },
      next: { context: ['menu'], input: 'ArrowRight' },
      select: { context: ['menu', 'general'], input: ['Enter', ' '] },
    },
  },
  touch: {
    down: {
      jump: { context: ['game'], input: 'A' },
      warp: { context: ['game'], input: 'B' },
    },
    joystick: {
      move_left: { context: ['game'], input: ['left', 'bottom_left', 'top_left'] },
      move_right: { context: ['game'], input: ['right', 'bottom_right', 'top_right'] },
    },
  },
};

type ControlType = typeof controls;
type InputType = keyof ControlType;
type ActionType<T extends InputType> = keyof ControlType[T];
type SubActionType<T extends InputType, U extends ActionType<T>> = keyof ControlType[T][U];

// New type to get all action names
export type ActionName = {
  [T in InputType]: {
    [U in ActionType<T>]: {
      [V in SubActionType<T, U>]: V;
    }[SubActionType<T, U>];
  }[ActionType<T>];
}[InputType];
