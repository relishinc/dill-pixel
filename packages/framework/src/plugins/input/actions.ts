export enum DefaultContexts {
  Default = 'default',
  General = 'general',
  Menu = 'menu',
  Game = 'game',
}

export type ActionContext = DefaultContexts | string;

export enum DefaultActions {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
  Action = 'action',
  Next = 'next',
  Back = 'back',
  Pause = 'pause',
  Unpause = 'unpause',
  Start = 'start',
  Select = 'select',
  Menu = 'menu',
}

export type Action = DefaultActions | string;

export type ActionNames<T> = {
  [K in keyof T]: {
    [A in keyof T[K]]: keyof T[K][A];
  }[keyof T[K]];
}[keyof T];

export type GenericActionNames<T> = keyof T;
