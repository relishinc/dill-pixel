import { Action, ActionContext, ActionDetail, ActionMap, ActionSignal } from '.';
import { IApplication } from '../../core';
import { Application } from '../../core/Application';
import { Signal } from '../../signals';
import { Logger } from '../../utils';
import { IPlugin, Plugin } from '../Plugin';

export interface IActionsPlugin<C extends ActionContext = ActionContext> extends IPlugin {
  context: C;
  onActionContextChanged: Signal<(context: C) => void>;
  initialize(options: Partial<IActionsPluginOptions>, app: IApplication): void;
  getAction<TActionData = any>(action: Action | string): ActionSignal<TActionData>;
  getActions(): ActionMap;
  sendAction<TActionData = any>(actionId: Action | string, data?: TActionData): void;
  setActionContext(context: C): string;
  debug: boolean;
}

export interface IActionsPluginOptions {
  actions: Partial<ActionMap>;
}

export class ActionsPlugin extends Plugin<Application, IActionsPluginOptions> implements IActionsPlugin {
  public readonly id = 'actions';
  // signals
  public onActionContextChanged: Signal<(context: string | ActionContext) => void> = new Signal<
    (context: string | ActionContext) => void
  >();

  // private properties
  private _context: ActionContext = 'default';
  private _signals: Map<string | number, ActionSignal> = new Map();
  private _actions: Partial<ActionMap> = {};
  private _debug: boolean = false;
  set debug(debug: boolean) {
    this._debug = debug;
  }
  get debug(): boolean {
    return this._debug;
  }

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

  initialize(_options: Partial<IActionsPluginOptions>, app: IApplication): void {
    this._actions = app?.config?.actions ? app.config.actions || {} : {};
  }

  getAction<TActionData = any>(action: Action | string): ActionSignal<TActionData> {
    if (!this._signals.has(action)) {
      this._signals.set(action, new Signal<(actionDetail: ActionDetail<TActionData>) => void>());
    }
    return this._signals.get(action)!;
  }

  getActions(): ActionMap {
    return this._actions as ActionMap;
  }

  sendAction<TActionData = any>(actionId: Action | string, data?: TActionData): void {
    // check if action is defined
    if (!this._actions[actionId]) {
      if (this._debug) {
        Logger.warn(`Action ${actionId} is not defined`);
      }
      return;
    }

    // check if action is allowed for current context
    // send action if allowed
    if (
      this._actions[actionId]?.context === '*' ||
      this._actions[actionId]?.context === this.context ||
      this._actions[actionId]?.context?.includes(this.context)
    ) {
      return this.getAction<TActionData>(actionId).emit({ id: actionId, context: this.context, data });
    }

    // the action wasn't allowed
    if (this._debug) {
      Logger.warn(`Action ${actionId} is not allowed for context ${this.context}`);
    }
  }

  setActionContext(context: string | ActionContext): string {
    this.context = context;
    return this.context;
  }

  protected getCoreFunctions(): string[] {
    return ['getAction', 'sendAction', 'setActionContext', 'getActions'];
  }

  protected getCoreSignals(): string[] {
    return ['onActionContextChanged'];
  }
}
