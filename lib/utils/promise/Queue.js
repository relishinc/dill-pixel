import { Logger } from '../console/Logger';
/**
 * Creates a new Queue with the given promises.
 * @param {...(Promise<any> | (() => Promise<any | void>))[]} promises The promises to add to the queue.
 * @returns {Queue} The created Queue.
 */
export function createQueue(...promises) {
    return new Queue(promises);
}
/**
 * A class representing a queue of promises.
 * @template T The type of the values that the promises in the queue resolve to.
 */
export class Queue {
    /**
     * Creates a new Queue.
     * @param {(Promise<any> | (() => Promise<T>))[]} promises The promises to add to the queue.
     */
    constructor(promises) {
        this._currentIndex = 0;
        this._isPaused = false;
        this._isCanceled = false;
        this._promises = promises;
    }
    /**
     * Gets the results of the promises that have been resolved so far.
     * @returns {T[]} The results.
     */
    get results() {
        return this._results;
    }
    /**
     * Adds promises to the queue.
     * @param {...(Promise<any> | (() => Promise<T>))[]} args The promises to add.
     */
    add(...args) {
        this._promises.push(...args);
    }
    /**
     * Starts the execution of the promises in the queue.
     */
    start() {
        if (this._currentIndex === 0) {
            // don't start if already started
            this._results = [];
            void this._next();
        }
    }
    /**
     * Pauses the execution of the promises in the queue.
     */
    pause() {
        this._isPaused = true;
    }
    /**
     * Resumes the execution of the promises in the queue.
     */
    resume() {
        if (this._isPaused) {
            this._isPaused = false;
            void this._next();
        }
    }
    /**
     * Cancels the execution of the promises in the queue.
     */
    cancel() {
        this._isCanceled = true;
        this._promises = [];
    }
    /**
     * Executes the next promise in the queue.
     * @private
     * @returns {Promise<void>} A promise that resolves when the next promise in the queue has been executed.
     */
    async _next() {
        if (this._isPaused || this._isCanceled || this._currentIndex >= this._promises.length) {
            return;
        }
        const currentFunction = this._promises[this._currentIndex];
        try {
            const result = typeof currentFunction === 'function' ? await currentFunction() : await currentFunction;
            this._results.push(result);
            this._currentIndex++;
            void this._next();
        }
        catch (error) {
            Logger.error("Queue didn't complete due to an error:", error, 'Cancelling Queue');
            this._isCanceled = true;
        }
    }
}
//# sourceMappingURL=Queue.js.map