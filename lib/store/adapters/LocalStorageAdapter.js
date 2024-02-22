import { Logger } from '../../utils';
export class LocalStorageAdapter {
    constructor(namespace = '', id = 'local') {
        this.namespace = namespace;
        this.id = id;
    }
    get prefix() {
        return this.namespace ? `${this.namespace}_` : '';
    }
    save(key, data) {
        localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(data));
    }
    load(key) {
        const data = localStorage.getItem(`${this.prefix}${key}`);
        return (data ? JSON.parse(data) : null);
    }
    destroy() { }
    initialize() {
        Logger.log('LocalStorageAdapter initialized');
        return true;
    }
    clear(key) {
        localStorage.deleteItem(`${this.prefix}${key}`);
    }
}
//# sourceMappingURL=LocalStorageAdapter.js.map