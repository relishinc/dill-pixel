import { Application } from '../../Application';
import { IApplication } from '../../core';
import { ControlsActionMap } from './interfaces';

export class AbstractControls {
  protected scheme: any;

  get app(): IApplication {
    return Application.getInstance();
  }

  initialize(scheme: Partial<ControlsActionMap>) {
    this.scheme = scheme;
  }
}
