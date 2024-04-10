import { isDev } from '../env';
export class Logger {
    static { this._instance = null; }
    static initialize(namespace = '') {
        if (Logger._instance) {
            throw new Error('Logger has already been instantiated.');
        }
        Logger._instance = new Logger(namespace);
    }
    static log(...args) {
        if (!Logger._instance || !Logger._instance._namespace) {
            console.log(...args);
        }
        else {
            console.log(`%c[${Logger._instance._namespace}]`, 'background: lightblue; color: black;', ...args);
            if (isDev)
                Logger.trace();
        }
    }
    static error(...args) {
        if (!Logger._instance || !Logger._instance._namespace) {
            console.error(...args);
        }
        else {
            console.error(`%c[${Logger._instance._namespace}]`, 'background: red; color: black;', ...args);
            if (isDev)
                Logger.trace();
        }
    }
    static warn(...args) {
        if (!Logger._instance || !Logger._instance._namespace) {
            console.warn(...args);
        }
        else {
            console.warn(`%c[${Logger._instance._namespace}]`, 'background: orange; color: black;', ...args);
            if (isDev)
                Logger.trace();
        }
    }
    static trace() {
        console.groupCollapsed('%cLogger trace', 'background: #ccc; color: black;');
        console.trace();
        console.groupEnd();
    }
    constructor(_namespace = '') {
        this._namespace = _namespace;
        Logger._instance = this;
    }
}
//# sourceMappingURL=Logger.js.map