import type { ControlsActionMap } from '../..';
import { Application } from '../../Application';
import { IApplication } from '../../core';

export class AbstractControls {
  protected scheme: any;

  get app(): IApplication {
    return Application.getInstance();
  }

  initialize(scheme: Partial<ControlsActionMap>) {
    this.scheme = scheme;
  }
}
