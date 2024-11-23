import { defineActions, defineContexts, defineControls } from 'dill-pixel';

const contexts = defineContexts(['default', 'game', 'menu']);

const actions = defineActions(contexts, {
  action: { context: '*' },
  move_left: { context: '*' },
  foo: { context: ['menu'] },
});

const controls = defineControls(actions, {
  keyboard: {
    down: {
      '0': 'action',
      '2': 'move_left',
    },
  },
  touch: {
    'bottom_right+top_left': 'foo',
  },
});

export { actions, contexts, controls };
