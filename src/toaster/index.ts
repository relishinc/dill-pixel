import { Signals } from '../signals';
import { Toaster } from './Toaster';
import { ToastConfig } from './types';

export { Toaster };
export * from './Toast';
export { IToast } from './IToast';
export { ToastConfig, ToastType } from './types';

export function showToast(config: ToastConfig) {
  Signals.onShowToast.emit(config);
}

export function hideAllToasts() {
  Signals.onHideAllToasts.emit();
}
