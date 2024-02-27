import { isDev } from '../env';

export class Logger {
  private static _instance: Logger | null = null;

  public static initialize(namespace: string = '') {
    if (Logger._instance) {
      throw new Error('Logger has already been instantiated.');
    }
    Logger._instance = new Logger(namespace);
  }

  public static log(...args: any) {
    if (!Logger._instance || !Logger._instance._namespace) {
      console.log(...args);
    } else {
      console.log(`%c[${Logger._instance._namespace}]`, 'background: lightblue; color: black;', ...args);
      if (isDev) Logger.trace();
    }
  }

  public static error(...args: any) {
    if (!Logger._instance || !Logger._instance._namespace) {
      console.error(...args);
    } else {
      console.error(`%c[${Logger._instance._namespace}]`, 'background: red; color: black;', ...args);
      if (isDev) Logger.trace();
    }
  }

  public static warn(...args: any) {
    if (!Logger._instance || !Logger._instance._namespace) {
      console.warn(...args);
    } else {
      console.error(`%c[${Logger._instance._namespace}]`, 'background: orange; color: black;', ...args);
      if (isDev) Logger.trace();
    }
  }

  public static trace() {
    console.groupCollapsed('%cLogger trace', 'background: #ccc; color: black;');
    console.trace();
    console.groupEnd();
  }

  private constructor(private _namespace: string = '') {
    Logger._instance = this;
  }
}
