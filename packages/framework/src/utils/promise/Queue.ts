import { Logger } from '../console';

/**
 * Creates a new Queue with the given promises.
 * @param {...(Promise<any> | (() => Promise<any | void>))[]} promises The promises to add to the queue.
 * @returns {Queue} The created Queue.
 */
export function createQueue(...promises: (Promise<any> | (() => Promise<any | void>))[]): Queue {
  return new Queue(promises);
}

/**
 * A class representing a queue of promises.
 * @template T The type of the values that the promises in the queue resolve to.
 */
export class Queue<T = any | void> {
  private _promises: (Promise<any> | (() => Promise<T>))[];
  private _currentIndex: number = 0;
  private _isPaused: boolean = false;
  private _isCanceled: boolean = false;

  /**
   * Creates a new Queue.
   * @param {(Promise<any> | (() => Promise<T>))[]} promises The promises to add to the queue.
   */
  constructor(promises: (Promise<any> | (() => Promise<T>))[] = []) {
    this._promises = promises;
  }

  private _results: T[];

  /**
   * Gets the results of the promises that have been resolved so far.
   * @returns {T[]} The results.
   */
  public get results(): T[] {
    return this._results;
  }

  /**
   * Gets the progress of the queue.
   * @returns {number} The progress (0-1)
   */
  public get progress(): number {
    return this._currentIndex / this._promises.length;
  }

  /**
   * Adds promises to the queue.
   * @param {...(Promise<any> | (() => Promise<T>))[]} args The promises to add.
   */
  public add(...args: (Promise<any> | (() => Promise<T>))[]) {
    this._promises.push(...args);
  }

  /**
   * Starts the execution of the promises in the queue.
   */
  public start(): void {
    if (this._currentIndex === 0) {
      // don't start if already started
      this._results = [];
      void this._next();
    }
  }

  /**
   * Pauses the execution of the promises in the queue.
   */
  public pause(): void {
    this._isPaused = true;
  }

  /**
   * Resumes the execution of the promises in the queue.
   */
  public resume(): void {
    if (this._isPaused) {
      this._isPaused = false;
      void this._next();
    }
  }

  /**
   * Cancels the execution of the promises in the queue.
   */
  public cancel(): void {
    this._isCanceled = true;
    this._promises = [];
  }

  /**
   * Executes the next promise in the queue.
   * @private
   * @returns {Promise<void>} A promise that resolves when the next promise in the queue has been executed.
   */
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
      // this._isCanceled = true;
      // remove the current promise from the queue
      this._promises.splice(this._currentIndex, 1);
      void this._next();
    }
  }
}
