import { Partial } from 'react-spring';
import { Logger } from '../utils';
import { IStorageAdapter } from './adapters';

type AdapterSaveConfig = {
  adapterId: string;
  awaitSave: boolean;
};

export interface IStore {
  destroy(): void;

  registerAdapter(adapter: IStorageAdapter, adapterOptions: any): void;

  getAdapter<T extends IStorageAdapter>(adapterId: string): T;

  hasAdapter(adapterId: string): boolean;

  save(
    adapterId: string | string[] | Partial<AdapterSaveConfig>[],
    key: string,
    data: any,
    awaitSave?: boolean,
  ): Promise<any>;

  load(adapterId: string, key: string): Promise<any>;
}

export class Store implements IStore {
  private _adapters: Map<string, IStorageAdapter> = new Map<string, IStorageAdapter>();

  // Use a generic type parameter with a constraint to IStorageAdapter

  async registerAdapter(adapter: IStorageAdapter, adapterOptions: any): Promise<void> {
    if (this._adapters.has(adapter.id)) {
      Logger.error(`Storage Adapter with id "${adapter.id}" already registered. Not registering.`);
      return Promise.resolve();
    }
    this._adapters.set(adapter.id, adapter);
    await adapter.initialize(adapterOptions);
  }

  // This allows TypeScript to infer the correct adapter type when retrieved
  getAdapter<T extends IStorageAdapter>(adapterId: string): T {
    const adapter = this._adapters.get(adapterId);
    if (!adapter) {
      throw new Error(`Adapter ${adapterId} not found`);
    }
    return adapter as T;
  }

  public hasAdapter(adapterId: string): boolean {
    return this._adapters.has(adapterId);
  }

  public destroy(): void {
    this._adapters.forEach((adapter) => {
      adapter.destroy();
    });
    this._adapters.clear();
  }

  public async save(
    adapterId: string | string[] | Partial<AdapterSaveConfig> | Partial<AdapterSaveConfig>[],
    key: string,
    data: any,
    awaitSave = true,
  ): Promise<any> {
    let keys: string[] | Partial<AdapterSaveConfig>[] = [];
    const result = [];

    if (!Array.isArray(adapterId)) {
      if (typeof adapterId === 'object') {
        keys = [adapterId];
      } else {
        keys = [adapterId as string];
      }
    }

    if ((keys[0] as string) === '*' || (keys[0] as Partial<AdapterSaveConfig>)?.adapterId === '*') {
      // use all adapter
      keys = Array.from(this._adapters.keys());
    }
    for (let i = 0; i < keys.length; i++) {
      let aKey: string;
      let shouldAwait: boolean = false;
      if (typeof keys[i] === 'object') {
        const obj = keys[i] as Partial<AdapterSaveConfig>;
        aKey = obj.adapterId as string;
        shouldAwait = obj.awaitSave ?? false;
      } else {
        aKey = keys[i] as unknown as string;
        shouldAwait = awaitSave;
      }
      const adapter = this._adapters.get(aKey);
      if (!adapter) {
        throw new Error(`Adapter ${keys[i]} not found`);
      }

      if (shouldAwait) {
        result.push(await adapter.save(key, data));
      } else {
        result.push(void adapter.save(key, data));
      }
    }
    return result;
  }

  public async load(adapterId: string, key: string): Promise<any> {
    const adapter = this._adapters.get(adapterId);
    if (!adapter) {
      throw new Error(`Adapter ${adapterId} not found`);
    }
    return await adapter.load(key);
  }
}
