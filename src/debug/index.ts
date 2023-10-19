import {Application} from '../core';

// import { delay } from '../utils';
export class Debugger {
  private _initted: boolean = false;

  constructor(private app: Application) {}

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
