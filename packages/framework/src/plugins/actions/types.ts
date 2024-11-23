import { Signal } from '../../signals';

export const DefaultActionContexts = {
  default: 'default',
  game: 'game',
  menu: 'menu',
  pause: 'pause',
  popup: 'popup',
  general: 'general',
};

export type ActionContext = keyof typeof DefaultActionContexts | (string & {});

export type Action =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'action'
  | 'next'
  | 'back'
  | 'pause'
  | 'unpause'
  | 'start'
  | 'select'
  | 'menu';

export type ActionNames<T> = {
  [K in keyof T]: {
    [A in keyof T[K]]: keyof T[K][A];
  }[keyof T[K]];
}[keyof T];

export type GenericActionNames<T> = keyof T;

export type ActionDetail<T = any> = {
  id: string | number;
  context: string | ActionContext;
  data?: T;
};

export type ActionSignal<TActionData = any> = Signal<(detail: ActionDetail<TActionData>) => void>;
export type ActionsList = string[];

type ExtractContext<C extends readonly ActionContext[]> = C[number];

export interface ActionDefinition<C extends UserContexts = UserContexts> {
  context: ExtractContext<C> | ExtractContext<C>[] | '*' | (string & {});
}

export type ActionKey = Action | (string & {});

export type ActionMap<C extends UserContexts = UserContexts> = {
  [K in ActionKey]: ActionDefinition<C>;
};

export type UserContexts = ActionContext[];

export function defineContexts<C extends UserContexts = UserContexts>(contexts?: C): C {
  return contexts || (Object.values(DefaultActionContexts) as unknown as C);
}

export type UserActions<C extends UserContexts = UserContexts> = Partial<ActionMap<C>>;

export function defineActions<C extends UserContexts = UserContexts, U extends UserActions = UserActions<C>>(
  contexts: C,
  actions: U,
): U {
  return actions;
}
