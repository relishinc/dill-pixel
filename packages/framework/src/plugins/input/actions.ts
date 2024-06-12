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
