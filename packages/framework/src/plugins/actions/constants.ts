import { Action } from '../..';

export const DefaultActionContexts = {
  default: 'default',
  game: 'game',
  menu: 'menu',
  pause: 'pause',
  popup: 'popup',
  default: 'default',
};

export const DefaultActionContextsArray = ['default', 'menu', 'pause', 'popup', 'game'];

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
  back: { context: ['menu', 'default', 'popup'] },
  next: { context: ['menu', 'default', 'popup'] },
  select: { context: ['menu', 'default', 'popup'] },
  menu: { context: ['default'] },
  down: { context: ['menu', 'default', 'popup'] },
  up: { context: ['menu', 'default', 'popup'] },
  left: { context: ['menu', 'default', 'popup'] },
  right: { context: '*' },
  pause: { context: '*' },
  unpause: { context: '*' },
  start: { context: '*' },
};

export const DefaultButtonIds = {
  __default_do_not_use__: '__default_do_not_use__',
};
