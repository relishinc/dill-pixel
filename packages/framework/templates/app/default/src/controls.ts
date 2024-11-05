import { ActionNames, ControlScheme } from 'dill-pixel';

export const controls = {
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
} as const satisfies ControlScheme;

// New type to get all action names - don't touch this - it allows for strongly typed actions
export type ActionName = ActionNames<typeof controls>;