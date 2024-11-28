import { Signal } from '../../signals';
import { DefaultActionContexts, DefaultButtonIds } from './constants';

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
  | 'menu'
  | (string & {});

export type ActionDetail<T = any> = {
  id: string | number;
  context: string | ActionContext;
  data?: T;
};
export type ActionSignal<TActionData = any> = Signal<(detail: ActionDetail<TActionData>) => void>;
export type ActionsList = (Action | (string & {}))[];
export type ActionKey = Action | (string & {});

export type ActionMap<C extends UserContexts = UserContexts> = {
  [K in ActionKey]: ActionDefinition<C>;
};

export type UserActions<C extends UserContexts = UserContexts> = Partial<ActionMap<C>>;

type ExtractContext<C extends readonly ActionContext[]> = C[number];
export type UserContexts = ActionContext[];

export interface ActionDefinition<C extends UserContexts = UserContexts> {
  context: ExtractContext<C> | ExtractContext<C>[] | '*' | (string & {});
}

export type UserButton = keyof typeof DefaultButtonIds | (string & {});

export type UserButtons = UserButton[];

export type ExtractButtonId<B extends UserButtons> = B[number];
