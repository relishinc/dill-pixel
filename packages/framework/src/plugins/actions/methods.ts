import { DefaultActionContexts, defaultActionsList } from './constants';
import { type UserActions, type UserButtons, type UserContexts } from './types';

export function defineContexts<C extends UserContexts = UserContexts>(contexts?: C): C {
  return contexts || (Object.values(DefaultActionContexts) as unknown as C);
}

export function defineActions<C extends UserContexts = UserContexts, U extends UserActions = UserActions<C>>(
  contexts: C,
  actions: U,
  useDefaultActions: boolean = true,
): U {
  if (useDefaultActions) {
    actions = { ...defaultActionsList, ...actions };
  }
  return actions;
}

export function defineButtons<B extends UserButtons = UserButtons>(buttons?: B): B {
  return buttons || ([] as unknown as B);
}
