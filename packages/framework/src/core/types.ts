import type { WithRequiredProps } from '../utils';
import { IApplicationOptions } from './interfaces';

export type AppConfig = WithRequiredProps<IApplicationOptions, 'id'>;

export type PauseConfig = {
  pauseAudio?: boolean;
  pauseAnimations?: boolean;
  pauseTimers?: boolean;
  pauseTicker?: boolean;
  pauseOther?: any[];
  clearOnResume?: boolean;
};
