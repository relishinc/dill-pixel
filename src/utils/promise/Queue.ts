import { Logger } from '../console/Logger';

export function createQueue(...promises: (Promise<any> | (() => Promise<any | void>))[]): Queue {
  return new Queue(promises);
}

export class Queue<T = any | void> {
  private _promises: (Promise<any> | (() => Promise<T>))[];
  private _currentIndex: number = 0;
  private _isPaused: boolean = false;
  private _isCanceled: boolean = false;
  private _results: T[];

  constructor(promises: (Promise<any> | (() => Promise<T>))[]) {
    this._promises = promises;
  }

  public get results(): T[] {
    return this._results;
  }

  public add(...args: (Promise<any> | (() => Promise<T>))[]) {
    this._promises.push(...args);
  }

  public start(): void {
    if (this._currentIndex === 0) {
      // don't start if already started
      this._results = [];
      void this._next();
    }
  }

  public pause(): void {
    this._isPaused = true;
  }

  public resume(): void {
    if (this._isPaused) {
      this._isPaused = false;
      void this._next();
    }
  }

  public cancel(): void {
    this._isCanceled = true;
    this._promises = [];
  }

  private async _next(): Promise<void> {
    if (this._isPaused || this._isCanceled || this._currentIndex >= this._promises.length) {
      return;
    }

    const currentFunction = this._promises[this._currentIndex];

    try {
      const result = typeof currentFunction === 'function' ? await currentFunction() : await currentFunction;
      this._results.push(result);
      this._currentIndex++;
      void this._next();
    } catch (error) {
      Logger.error("Queue didn't complete due to an error:", error, 'Cancelling Queue');
      this._isCanceled = true;
    }
  }
}
