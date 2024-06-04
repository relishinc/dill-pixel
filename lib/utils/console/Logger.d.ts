export type LoggerMode = 'development' | 'default' | 'disabled';
export declare class Logger {
    private static _instance;
    private constructor();
    private static _mode;
    static get mode(): LoggerMode;
    static set mode(mode: LoggerMode);
    static initialize(mode?: LoggerMode): void;
    static log(...args: any): void;
    static warn(...args: any): void;
    static error(...args: any): void;
    static trace(type?: 'log' | 'warn' | 'error', ...args: any[]): void;
}
//# sourceMappingURL=Logger.d.ts.map