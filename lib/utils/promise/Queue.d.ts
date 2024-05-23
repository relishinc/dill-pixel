/**
 * Creates a new Queue with the given promises.
 * @param {...(Promise<any> | (() => Promise<any | void>))[]} promises The promises to add to the queue.
 * @returns {Queue} The created Queue.
 */
export declare function createQueue(...promises: (Promise<any> | (() => Promise<any | void>))[]): Queue;
/**
 * A class representing a queue of promises.
 * @template T The type of the values that the promises in the queue resolve to.
 */
export declare class Queue<T = any | void> {
    private _promises;
    private _currentIndex;
    private _isPaused;
    private _isCanceled;
    /**
     * Creates a new Queue.
     * @param {(Promise<any> | (() => Promise<T>))[]} promises The promises to add to the queue.
     */
    constructor(promises?: (Promise<any> | (() => Promise<T>))[]);
    private _results;
    /**
     * Gets the results of the promises that have been resolved so far.
     * @returns {T[]} The results.
     */
    get results(): T[];
    /**
     * Adds promises to the queue.
     * @param {...(Promise<any> | (() => Promise<T>))[]} args The promises to add.
     */
    add(...args: (Promise<any> | (() => Promise<T>))[]): void;
    /**
     * Starts the execution of the promises in the queue.
     */
    start(): void;
    /**
     * Pauses the execution of the promises in the queue.
     */
    pause(): void;
    /**
     * Resumes the execution of the promises in the queue.
     */
    resume(): void;
    /**
     * Cancels the execution of the promises in the queue.
     */
    cancel(): void;
    /**
     * Executes the next promise in the queue.
     * @private
     * @returns {Promise<void>} A promise that resolves when the next promise in the queue has been executed.
     */
    private _next;
}
//# sourceMappingURL=Queue.d.ts.map