import { Plugin } from '../../plugins/Plugin';
/**
 * A class representing a storage adapter module.
 * @template T The type of the application that the module belongs to.
 */
export class StorageAdapter extends Plugin {
    id;
    /**
     * Creates a new StorageAdapter.
     * @param {string} id The ID of the adapter. Default is 'StorageAdapter'.
     */
    constructor(id = 'StorageAdapter') {
        super(id);
        this.id = id;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async load(_key) {
        return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async save(_key, _data) {
        return;
    }
}
