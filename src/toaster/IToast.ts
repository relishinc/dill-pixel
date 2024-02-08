import { Container } from '../gameobjects';
import { ToastConfig } from './types';

export interface IToast extends Container {
  config: ToastConfig;
}
