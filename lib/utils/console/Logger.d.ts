export declare class Logger {
    private _namespace;
    private static _instance;
    static initialize(namespace?: string): void;
    static log(...args: any): void;
    static error(...args: any): void;
    static warn(...args: any): void;
    static trace(): void;
    private constructor();
}
