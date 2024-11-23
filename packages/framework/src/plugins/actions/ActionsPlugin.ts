import { Action, ActionContext, ActionDetail, ActionSignal } from '.';
import { IApplication } from '../../core';
import { Signal } from '../../signals';
import { IPlugin, Plugin } from '../Plugin';

export interface IActionsPlugin extends IPlugin {
  context: string | ActionContext;
  onActionContextChanged: Signal<(context: string | ActionContext) => void>;
  initialize(app: IApplication): void;
  getAction<TActionData = any>(action: Action | string): ActionSignal<TActionData>;
  sendAction<TActionData = any>(actionId: Action | string, data?: TActionData): void;
}

export class ActionsPlugin extends Plugin implements IActionsPlugin {
  public readonly id = 'actions';
  // signals
  public onActionContextChanged: Signal<(context: string | ActionContext) => void> = new Signal<
    (context: string | ActionContext) => void
  >();

  // private properties
  private _context: string | ActionContext = 'general';
  private _signals: Map<string | number, ActionSignal> = new Map();

  // getter / setter
  get context(): string | ActionContext {
    return this._context;
  }

  set context(context: string | ActionContext) {
    if (this._context === context) {
      return;
    }
    this._context = context;
    this.onActionContextChanged.emit(context);
  }

  initialize(app: IApplication): void {
    console.log('ActionsPlugin initialized');
  }

  getAction<TActionData = any>(action: Action | string): ActionSignal<TActionData> {
    if (!this._signals.has(action)) {
      this._signals.set(action, new Signal<(actionDetail: ActionDetail<TActionData>) => void>());
    }
    return this._signals.get(action)!;
  }

  sendAction<TActionData = any>(actionId: Action | string, data?: TActionData): void {
    return this.getAction<TActionData>(actionId).emit({ id: actionId, context: this.context, data });
  }

  protected getCoreFunctions(): string[] {
    return ['getAction', 'sendAction'];
  }

  protected getCoreSignals(): string[] {
    return ['onActionContextChanged'];
  }
}
