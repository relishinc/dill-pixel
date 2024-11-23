import { Application } from '../../Application';
import { IApplication } from '../../core';
import { ActionMap } from '../actions';
import { AbstractControlScheme } from './interfaces';

export class AbstractControls {
  protected scheme: AbstractControlScheme;
  protected actions: ActionMap;

  get app(): IApplication {
    return Application.getInstance();
  }

  initialize(scheme: AbstractControlScheme, actions: ActionMap) {
    this.scheme = scheme;
    this.actions = actions;
  }

  protected isActionValidForContext(actionName: string, context: string): boolean {
    const actionDef = this.actions[actionName];
    if (!actionDef) return false;

    return actionDef.context === '*' || (Array.isArray(actionDef.context) && actionDef.context.includes(context));
  }
}
