type AdapterSaveConfig = {
  adapterKey: string;
  awaitSave: boolean;
};

export interface IStore {
  registerAdapter(key: string, adapter: IStorageAdapter): void;

  getAdapter<T extends IStorageAdapter>(key: string): T;
}

export class Store implements IStore {
  protected adapters: Map<string, IStorageAdapter>;

  constructor() {
    this.adapters = new Map<string, IStorageAdapter>();
  }

  // Use a generic type parameter with a constraint to IStorageAdapter

  registerAdapter(key: string, adapter: IStorageAdapter): void {
    this.adapters.set(key, adapter);
  }

  // This allows TypeScript to infer the correct adapter type when retrieved
  getAdapter<T extends IStorageAdapter>(key: string): T {
    const adapter = this.adapters.get(key);
    if (!adapter) {
      throw new Error(`Adapter ${key} not found`);
    }
    return adapter as T;
  }

  public destroy(): void {
    this.adapters.forEach((adapter) => {
      adapter.destroy();
    });
    this.adapters.clear();
  }

  public async save(
    adapterKey: string | string[] | Partial<AdapterSaveConfig>[],
    key: string,
    data: any,
    awaitSave: boolean = false,
  ): Promise<any> {
    if (!Array.isArray(adapterKey)) {
      adapterKey = [adapterKey];
    }
    for (let i = 0; i < adapterKey.length; i++) {
      let aKey: string;
      let shouldAwait: boolean = false;
      if (typeof adapterKey[i] === 'object') {
        const obj = adapterKey[i] as Partial<AdapterSaveConfig>;
        aKey = obj.adapterKey as string;
        shouldAwait = obj.awaitSave ?? false;
      } else {
        aKey = adapterKey as unknown as string;
        shouldAwait = awaitSave;
      }
      const adapter = this.adapters.get(aKey);
      if (!adapter) {
        throw new Error(`Adapter ${adapterKey} not found`);
      }
      if (shouldAwait) {
        await adapter.save(key, data);
      } else {
        void adapter.save(key, data);
      }
    }
  }

  public async load(adapterKey: string, key: string): Promise<any> {
    const adapter = this.adapters.get(adapterKey);
    if (!adapter) {
      throw new Error(`Adapter ${adapterKey} not found`);
    }
    return await adapter.load(key);
  }
}
