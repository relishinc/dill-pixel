import { defineActions, defineButtons, defineContexts, defineControls } from 'dill-pixel';

/* Default template*/
export const contexts = defineContexts(['default', 'game', 'menu', 'popup']);

export const actions = defineActions(contexts, {
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
  select: { context: ['menu', 'default'] },
  show_popup: { context: '*' },
  // firebase
  save_to_firebase: { context: '*' },
  load_from_firebase: { context: '*' },
  clear_firebase: { context: '*' },
  delete_from_firebase: { context: '*' },
  // physics
  drop: { context: ['game'] },
  // voiceover
  vo: { context: ['game'] },
  pause_vo: { context: ['game'] },
  stop_vo: { context: ['game'] },
  caption_theme: { context: ['game'] },
});

export const buttons = defineButtons(['A', 'B']);

export const controls = defineControls(actions, buttons, {
  keyboard: {
    down: {
      move_left: ['ArrowLeft', 'A'],
      move_right: ['ArrowRight', 'D'],
      move_down: ['ArrowDown', 'S'],
      jump: ['ArrowUp', 'Space'],
      warp: 'Q',
      combo: 'Shift+L',
    },
    up: {
      toggle_pause: 'P',
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
      move_right: ['right', 'bottom_right', 'top_right'],
    },
  },
});

/** Don't touch */
export type Contexts = (typeof contexts)[number];
export type ActionTypes = keyof typeof actions;
/** Don't touch */

/* End of Default Template */

/* User definitions */
export type Data = {
  foo: string;
  bar: number;
  saved: string;
  baz: {
    qux: boolean;
    quux: string[];
  };
};

export type AnalyticsEvents = {
  foo: { bar: string; baz: number; qux: boolean };
};
/* End of user definitions */
