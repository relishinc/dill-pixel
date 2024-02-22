export class Store {
    constructor() {
        this.adapters = new Map();
    }
    // Use a generic type parameter with a constraint to IStorageAdapter
    async registerAdapter(adapter) {
        this.adapters.set(adapter.id, adapter);
        await adapter.initialize();
    }
    // This allows TypeScript to infer the correct adapter type when retrieved
    getAdapter(adapterId) {
        const adapter = this.adapters.get(adapterId);
        if (!adapter) {
            throw new Error(`Adapter ${adapterId} not found`);
        }
        return adapter;
    }
    destroy() {
        this.adapters.forEach((adapter) => {
            adapter.destroy();
        });
        this.adapters.clear();
    }
    async save(adapterKey, key, data, awaitSave = false) {
        if (!Array.isArray(adapterKey)) {
            adapterKey = [adapterKey];
        }
        for (let i = 0; i < adapterKey.length; i++) {
            let aKey;
            let shouldAwait = false;
            if (typeof adapterKey[i] === 'object') {
                const obj = adapterKey[i];
                aKey = obj.adapterKey;
                shouldAwait = obj.awaitSave ?? false;
            }
            else {
                aKey = adapterKey;
                shouldAwait = awaitSave;
            }
            const adapter = this.adapters.get(aKey);
            if (!adapter) {
                throw new Error(`Adapter ${adapterKey} not found`);
            }
            if (shouldAwait) {
                await adapter.save(key, data);
            }
            else {
                void adapter.save(key, data);
            }
        }
    }
    async load(adapterKey, key) {
        const adapter = this.adapters.get(adapterKey);
        if (!adapter) {
            throw new Error(`Adapter ${adapterKey} not found`);
        }
        return await adapter.load(key);
    }
}
//# sourceMappingURL=Store.js.map