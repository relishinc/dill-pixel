import { Container } from '../gameobjects';
import { IToast } from './IToast';
import { ToastConfig } from './types';

export class Toast extends Container implements IToast {
  constructor(public config: ToastConfig) {
    super(false, false);
  }
}
