import { defineActions, defineButtons, defineContexts, defineControls } from 'dill-pixel';

const contexts = defineContexts(['default', 'game', 'menu', 'popup']);

const actions = defineActions(contexts, {
  // keyboard down actions
  move_left: { context: ['game'] },
  move_right: { context: ['game'] },
  move_down: { context: ['game'] },
  warp: { context: ['game'] },
  jump: { context: ['game'] },
  combo: { context: '*' },
  // keyboard up actions
  toggle_pause: { context: '*' },
  close: { context: ['menu', 'popup'] },
  back: { context: ['menu'] },
  next: { context: ['menu'] },
  select: { context: ['menu', 'general'] },
  show_popup: { context: '*' },
});

type ActionTypes = keyof typeof actions;

const buttons = defineButtons(['A', 'B']);

const controls = defineControls(actions, buttons, {
  keyboard: {
    down: {
      move_left: ['ArrowLeft', 'a'],
      move_right: ['ArrowRight', 'd'],
      move_down: ['ArrowDown', 's'],
      warp: 'q',
      jump: ['ArrowUp', 'Space'],
      combo: 'Shift+l',
    },
    up: {
      toggle_pause: 'p',
      close: 'Escape',
      back: 'ArrowLeft',
      next: 'ArrowRight',
      select: ['Enter', 'Space'],
    },
  },
  touch: {
    down: {
      jump: 'A',
      warp: 'B',
    },
    joystick: {
      move_left: ['left', 'bottom_left', 'top_left'],
      move_right: ['right', 'bottom_right'],
    },
  },
});

export { actions, contexts, controls };
export type { ActionTypes };
