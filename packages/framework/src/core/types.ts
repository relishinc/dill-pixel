import { DataSchema } from '../store';
import type { WithRequiredProps } from '../utils';
import { IApplicationOptions } from './interfaces';

export type AppConfig<D extends DataSchema = DataSchema> = WithRequiredProps<IApplicationOptions<D>, 'id'>;

export type PauseConfig = {
  pauseAudio?: boolean;
  pauseAnimations?: boolean;
  pauseTimers?: boolean;
  pauseTicker?: boolean;
  pauseOther?: any[];
  clearOnResume?: boolean;
};
