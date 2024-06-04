import type { WithRequiredProps } from '../utils';
import { IApplicationOptions } from './interfaces';

export type AppConfig = WithRequiredProps<IApplicationOptions, 'id'>;
