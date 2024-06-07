import { ActionContext } from './actions';
import { Signal } from '../../signals';

export type ActionDetail<T = any> = {
  id: string | number;
  context: string | ActionContext;
  data?: T;
};

export type ActionSignal<TActionData = any> = Signal<(detail: ActionDetail<TActionData>) => void>;
export type ActionsList = string[];
