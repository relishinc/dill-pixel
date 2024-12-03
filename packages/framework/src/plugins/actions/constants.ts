import { Action } from '../..';

export const DefaultActionContexts = {
  default: 'default',
  game: 'game',
  menu: 'menu',
  pause: 'pause',
  popup: 'popup',
  general: 'general',
};

export const DefaultActionContextsArray = ['default', 'game', 'menu', 'pause', 'popup', 'general'];

export const DefaultActions: Action[] = [
  'up',
  'down',
  'left',
  'right',
  'action',
  'pause',
  'unpause',
  'start',
  'select',
  'menu',
  'back',
  'next',
];

export const defaultActionsList = {
  action: { context: '*' },
  back: { context: ['menu', 'general', 'popup'] },
  next: { context: ['menu', 'general', 'popup'] },
  select: { context: ['menu', 'general', 'popup'] },
  menu: { context: ['general'] },
  down: { context: ['menu', 'general', 'popup'] },
  up: { context: ['menu', 'general', 'popup'] },
  left: { context: ['menu', 'general', 'popup'] },
  right: { context: '*' },
  pause: { context: '*' },
  unpause: { context: '*' },
  start: { context: '*' },
};

export const DefaultButtonIds = {
  __default_do_not_use__: '__default_do_not_use__',
};
