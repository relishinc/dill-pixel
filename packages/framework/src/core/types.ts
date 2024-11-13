import { DataSchema } from '../store';
import type { WithRequiredProps } from '../utils';
import { IApplicationOptions } from './interfaces';

export type AppConfig<D extends DataSchema = DataSchema> = WithRequiredProps<IApplicationOptions<D>, 'id'>;
