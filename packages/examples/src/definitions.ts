import { defineActions, defineButtons, defineContexts, defineControls } from 'dill-pixel';

const contexts = defineContexts(['general', 'game', 'menu', 'popup']);
export type Contexts = (typeof contexts)[number];

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
  // firebase
  save_to_firebase: { context: '*' },
  load_from_firebase: { context: '*' },
  clear_firebase: { context: '*' },
  delete_from_firebase: { context: '*' },
  // physics
  drop: { context: ['game'] },
});

type ActionTypes = keyof typeof actions;

const buttons = defineButtons(['A', 'B']);

const controls = defineControls(actions, buttons, {
  keyboard: {
    down: {
      move_left: ['ArrowLeft', 'A'],
      move_right: ['ArrowRight', 'D'],
      move_down: ['ArrowDown', 'S'],
      warp: 'Q',
      jump: ['ArrowUp', 'Space', 'W'],
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

export type DataSchema = {
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

export { actions, contexts, controls };
export type { ActionTypes };
