import { Application } from '../../Application';
import { ControlScheme, IControls } from './interfaces';
import { IApplication } from '../../core';
import { KeyboardControls } from './keyboard';
import { bindAllMethods } from '../../utils';
import { TouchControls } from './touch';

export class Controls implements IControls {
  keyboard: KeyboardControls;
  touch: TouchControls;

  constructor() {
    bindAllMethods(this);
  }

  get app(): IApplication {
    return Application.getInstance();
  }

  destroy() {
    if (this.keyboard) {
      this.keyboard.destroy();
    }
    if (this.touch) {
      this.touch.destroy();
    }
  }

  isActionActive(action: string): boolean {
    return this.keyboard?.isActionActive(action) || this.touch?.isActionActive(action);
  }

  initialize(scheme: ControlScheme) {
    for (const type in scheme) {
      if (type === 'keyboard') {
        this.keyboard = new KeyboardControls();
        this.keyboard.initialize(scheme[type]!);
      }
      if (type === 'touch') {
        this.touch = new TouchControls();
        this.touch.initialize(scheme[type]!);
      }
    }
  }

  public connect() {
    if (this.keyboard) {
      this.keyboard.connect();
    }
    if (this.touch) {
      this.touch.connect();
    }
  }
}
