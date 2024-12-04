import { defineActions, defineButtons, defineContexts, defineControls } from 'dill-pixel';

/* Default Template*/
export const contexts = defineContexts();
export const actions = defineActions(contexts, {});
export const buttons = defineButtons([]);
export const controls = defineControls(actions, buttons, {
  keyboard: {
    down: {},
    up: {},
  },
  touch: {},
});

/** Don't touch */
export type Contexts = (typeof contexts)[number];
export type ActionTypes = keyof typeof actions;
/** Don't touch */

/* End of Default Template */

/* User definitions */
export type Data = {
  dill: string;
};
/* End of user definitions */
