import { Signal } from '../../signals';
import { ActionContext } from './actions';

export type ActionDetail<T = any> = {
  id: string;
  context: string | ActionContext;
  data?: T;
};

export type ActionSignal<T = any> = Signal<(detail: ActionDetail<T>) => void>;
export type ActionsList = string[];
