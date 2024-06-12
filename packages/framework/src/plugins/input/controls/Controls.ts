import { Application } from '../../../Application';
import { ControlScheme } from './interfaces';
import { IApplication } from '../../../core';
import { KeyboardControls } from './KeyboardContols';
import { bindAllMethods } from '../../../utils';

export class Controls {
  keyboard: KeyboardControls;

  constructor() {
    bindAllMethods(this);
  }

  get app(): IApplication {
    return Application.getInstance();
  }

  initialize(scheme: ControlScheme) {
    for (const type in scheme) {
      if (type === 'keyboard') {
        this.keyboard = new KeyboardControls();
        this.keyboard.initialize(scheme[type]!);
      }
    }
  }

  public connect() {
    if (this.keyboard) {
      this.keyboard.connect();
    }
  }
}
