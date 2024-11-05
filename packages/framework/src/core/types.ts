import { IDataSchema } from '../store';
import type { WithRequiredProps } from '../utils';
import { IApplication, IApplicationOptions } from './interfaces';

export type AppConfig<T extends IApplication = IApplication, D extends IDataSchema = IDataSchema> = WithRequiredProps<
  IApplicationOptions<D>,
  'id'
>;
