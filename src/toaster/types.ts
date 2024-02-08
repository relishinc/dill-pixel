export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastConfig = {
  message: string;
  type: ToastType;
  duration: number;
  manualClose: boolean;
  closeButton: typeof import('pixi.js').Container<import('pixi.js').DisplayObject>;
};
