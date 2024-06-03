import { isDev } from '../functions';
import { capitalize } from './StringUtils';
const isDevEnv = isDev();
const colors = {
    log: 'background: #74b64c; color: black;',
    warn: 'background: yellow; color: black;',
    error: 'background: orange; color: black;',
};
export class Logger {
    static { this._instance = null; }
    static { this._mode = 'disabled'; }
    static initialize(mode) {
        if (Logger._instance) {
            throw new Error('Logger has already been instantiated.');
        }
        Logger._instance = new Logger(mode);
    }
    static log(...args) {
        Logger.trace('log', ...args);
    }
    static warn(...args) {
        Logger.trace('warn', ...args);
    }
    static error(...args) {
        Logger.trace('error', ...args);
    }
    static trace(type = 'log', ...args) {
        if (Logger.mode === 'disabled') {
            return;
        }
        if (Logger.mode === 'default') {
            return console.log(`%c ${capitalize(type)} `, colors[type], ...args);
        }
        console.groupCollapsed(`%c ${capitalize(type)} `, colors[type], ...args);
        console.trace(`%c Stack `, colors[type]);
        console.groupEnd();
    }
    constructor(mode) {
        Logger._instance = this;
        Logger.mode = mode !== undefined ? mode : isDevEnv ? 'development' : 'default';
        // check if mode is one of the valid modes
        if (!['development', 'default', 'disabled'].includes(Logger.mode)) {
            Logger.mode = 'default';
        }
    }
    static get mode() {
        return Logger._mode;
    }
    static set mode(mode) {
        Logger._mode = mode;
    }
}
//# sourceMappingURL=Logger.js.map