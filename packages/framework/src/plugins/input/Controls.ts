import { Application } from '../../Application';
import { IApplication } from '../../core';
import { bindAllMethods } from '../../utils';
import { Action } from '../actions';
import { IControls, UserControls } from './interfaces';
import { KeyboardControls } from './keyboard';
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

  isActionActive(action: Action): boolean {
    return this.keyboard?.isActionActive(action) || this.touch?.isActionActive(action) || false;
  }

  initialize(scheme: UserControls) {
    if (scheme.keyboard) {
      this.keyboard = new KeyboardControls();
      this.keyboard.initialize(scheme.keyboard);
    }

    if (scheme.touch) {
      this.touch = new TouchControls();
      this.touch.initialize(scheme.touch);
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
