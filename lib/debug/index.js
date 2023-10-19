// import { delay } from '../utils';
export class Debugger {
    constructor(app) {
        this.app = app;
        this._initted = false;
    }
    async init() {
        console.log('starting debugger');
        if (!this._initted) {
            // @ts-ignore
            /* leave this out for now
                  await import("relish-hlf-debugger");
                  await delay(0.25);
                  (window as any).setDebugApplication(this.app);
                   */
            this._initted = true;
        }
    }
}
//# sourceMappingURL=index.js.map