import { ControlScheme } from 'dill-pixel';

export const controls: ControlScheme = {
  keyboard: {
    down: {
      move_left: { context: ['game'], input: ['ArrowLeft', 'a'] },
      move_right: { context: ['game'], input: ['ArrowRight', 'd'] },
      jump: { context: ['game'], input: ['ArrowUp', ' '] },
      test: { context: ['game'], input: 'Shift+l' },
    },
    up: {
      toggle_pause: { context: '*', input: 'p' },
      close: { context: ['menu'], input: 'Escape' },
      back: { context: ['menu'], input: 'ArrowLeft' },
      next: { context: ['menu'], input: 'ArrowRight' },
      select: { context: ['menu', 'general'], input: ['Enter', ' '] },
    },
  },
};
