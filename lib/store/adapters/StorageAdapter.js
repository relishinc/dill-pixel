import { Module } from '../../modules/Module';
/**
 * A class representing a storage adapter module.
 * @template T The type of the application that the module belongs to.
 */
export class StorageAdapter extends Module {
    /**
     * Creates a new StorageAdapter.
     * @param {string} id The ID of the adapter. Default is 'StorageAdapter'.
     */
    constructor(id = 'StorageAdapter') {
        super(id);
        this.id = id;
    }
    async load(key) {
        return null;
    }
    async save(key, data) {
        return;
    }
}
//# sourceMappingURL=StorageAdapter.js.map