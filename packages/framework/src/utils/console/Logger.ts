import { isDev } from '../env';
import { capitalize } from '../string';

const colors = {
  log: 'background: #74b64c; color: black;',
  warn: 'background: yellow; color: black;',
  error: 'background: red; color: white;',
};

export type LoggerMode = 'development' | 'default' | 'disabled';

export class Logger {
  private static _instance: Logger | null = null;

  private constructor(mode?: LoggerMode) {
    Logger._instance = this;
    Logger.mode = mode !== undefined ? mode : isDev ? 'development' : 'default';
    // check if mode is one of the valid modes
    if (!['development', 'default', 'disabled'].includes(Logger.mode)) {
      Logger.mode = 'default';
    }
  }

  private static _mode: LoggerMode = 'disabled';

  static get mode(): LoggerMode {
    return Logger._mode;
  }

  static set mode(mode: LoggerMode) {
    Logger._mode = mode;
  }

  public static initialize(mode?: LoggerMode) {
    if (Logger._instance) {
      throw new Error('Logger has already been instantiated.');
    }
    Logger._instance = new Logger(mode);
  }

  public static log(...args: any) {
    Logger.trace('log', ...args);
  }

  public static warn(...args: any) {
    Logger.trace('warn', ...args);
  }

  public static error(...args: any) {
    Logger.trace('error', ...args);
  }

  public static trace(type: 'log' | 'warn' | 'error' = 'log', ...args: any[]) {
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
}
