import { Signal } from '../signals';
import { randomUUID } from '../utils';
import { Logger } from '../utils/console/Logger';
import { IPlugin, Plugin } from './Plugin';

/**
 * Configuration options for creating a timer.
 */
export interface TimerOptions {
  /** Duration in milliseconds. If not provided, timer counts up indefinitely */
  duration?: number;
  /** Whether to start the timer immediately upon creation */
  autoStart?: boolean;
  /** Whether to restart the timer when it completes */
  loop?: boolean;
  /** Run timer in a web worker for better performance and independence from main thread */
  useWorker?: boolean;
  /** Update interval in milliseconds for worker-based timers. Default is 16ms (roughly 60fps) */
  workerInterval?: number;
  /** Callback fired when the timer completes. Not called in count-up mode */
  onComplete?: () => void;
  /** Callback fired on each timer tick with the remaining time (or elapsed time in count-up mode) */
  onTick?: (remaining: number) => void;
}

// Web Worker message types
interface WorkerMessage {
  type: 'tick' | 'complete' | 'reset';
  timerId: string;
  time: number;
}

export type TimeFormat = 'mm:ss' | 'hh:mm:ss' | 'ms';
export type TimerObject = { h: number; m: number; s: number; ms: number };

function createTimerWorker() {
  try {
    const workerCode = `
    const timers = new Map();

    self.onmessage = (e) => {
      const { type, timerId, options } = e.data;
      
      switch (type) {
        case 'start': {
          let timer = timers.get(timerId);
          
          if (timer) {
            // Resume existing timer
            timer.startTime = performance.now() - (timer.pausedTime || 0);
            timer.interval = createInterval(timer, options, timerId);
          } else {
            // Create new timer
            timer = {
              startTime: performance.now(),
              duration: options.duration,
              loopCount: 0,
              pausedTime: 0,
              options // Store options with the timer
            };
            timer.interval = createInterval(timer, options, timerId);
            timers.set(timerId, timer);
          }
          break;
        }
        
        case 'stop': {
          const timer = timers.get(timerId);
          if (timer) {
            clearInterval(timer.interval);
            timer.interval = null;
            timer.pausedTime = performance.now() - timer.startTime;
          }
          break;
        }

        case 'reset': {
          const timer = timers.get(timerId);
          if (timer) {
            timer.startTime = performance.now();
            timer.loopCount = 0;
            timer.pausedTime = 0;
          }
          break;
        }
      }
    };

    function createInterval(timer, options, timerId) {
      return setInterval(() => {
        const currentTime = performance.now();
        const totalElapsed = currentTime - timer.startTime;
        
        if (timer.duration !== undefined) {
          // Calculate elapsed time within the current loop
          const loopElapsed = totalElapsed - (timer.loopCount * timer.duration);
          const remaining = Math.max(0, timer.duration - loopElapsed);
          
          self.postMessage({ type: 'tick', timerId, time: remaining });
          
          if (remaining <= 0) {
            self.postMessage({ type: 'complete', timerId, time: 0 });
            
            if (options.loop) {
              timer.loopCount++;
            } else {
              clearInterval(timer.interval);
              timers.delete(timerId);
            }
          }
        } else {
          self.postMessage({ type: 'tick', timerId, time: totalElapsed });
        }
      }, options.workerInterval || 16);
    }
  `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob));
  } catch (e) {
    return null;
  }
}

/**
 * Formats a time duration in milliseconds into a human-readable string or object.
 * Supports multiple time formats and return types for flexible time representation.
 *
 * @param ms - Time duration in milliseconds to format
 * @param format - Output format for string representation
 *   - 'mm:ss' (default): Minutes and seconds (e.g., "02:30")
 *   - 'hh:mm:ss': Hours, minutes, and seconds (e.g., "01:30:45")
 *   - 'ms': Total seconds with milliseconds (e.g., "90.50")
 * @param returnFormat - Determines the return type
 *   - 'string' (default): Returns formatted time string
 *   - 'object': Returns object with h, m, s, ms properties
 *
 * @returns Formatted time string or object containing time components
 *
 * @example
 * ```typescript
 * // Format as mm:ss string (default)
 * formatTime(150000) // "02:30"
 *
 * // Format as hh:mm:ss string
 * formatTime(5430000, 'hh:mm:ss') // "01:30:30"
 *
 * // Format as seconds with milliseconds
 * formatTime(90500, 'ms') // "90.50"
 *
 * // Get time components as object
 * formatTime(5430000, 'hh:mm:ss', 'object')
 * // Returns: { h: 1, m: 30, s: 30, ms: 0 }
 *
 * // Use in a game timer display
 * timer.onTick = (remaining) => {
 *   display.text = formatTime(remaining, 'mm:ss');
 * };
 * ```
 */
export function formatTime(ms: number, format?: TimeFormat, returnFormat?: 'object'): TimerObject;
export function formatTime(ms: number, format?: TimeFormat, returnFormat?: 'string'): string;
// Implementation signature
export function formatTime(
  ms: number,
  format: TimeFormat = 'mm:ss',
  returnFormat: 'string' | 'object' = 'string',
): string | TimerObject {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);

  if (returnFormat === 'string') {
    switch (format) {
      case 'hh:mm:ss':
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      case 'mm:ss':
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      case 'ms':
        return `${totalSeconds}.${milliseconds.toString().padStart(2, '0')}`;
      default:
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  return { h: hours, m: minutes, s: seconds, ms: milliseconds };
}

/**
 * A Timer instance that can count down or up, optionally running in a web worker.
 *
 * Features:
 * - Count down from a duration or count up indefinitely
 * - Run in main thread (synced with Pixi ticker) or web worker
 * - Pause, resume, and reset functionality
 * - Loop option for repeating timers
 * - Tick and completion callbacks
 *
 * @example
 * ```typescript
 * // Create a 10-second countdown timer
 * const timer = new Timer({
 *   duration: 10000,
 *   autoStart: true,
 *   loop: true,
 *   onTick: (remaining) => {
 *     console.log(`${remaining / 1000} seconds remaining`);
 *   },
 *   onComplete: () => {
 *     console.log('Timer completed!');
 *   }
 * }, timerPlugin);
 *
 * // Pause the timer
 * timer.pause();
 *
 * // Resume the timer
 * timer.start();
 *
 * // Reset the timer
 * timer.reset();
 * ```
 */
export class Timer {
  private startTime: number = 0;
  private pausedTime: number = 0;
  private isPaused: boolean = true;
  private isDestroyed: boolean = false;
  private timerId: string;
  private isWorkerTimer: boolean;

  constructor(
    private options: TimerOptions = {},
    private plugin: TimerPlugin,
  ) {
    this.timerId = randomUUID();
    // Check if worker is requested but not available
    if (options.useWorker && !plugin.hasWorkerSupport) {
      Logger.warn('Web Worker support not available, falling back to main thread timer');
      options.useWorker = false;
    }
    this.isWorkerTimer = !!options.useWorker;
    if (options.autoStart) {
      this.start();
    }
  }

  /**
   * Starts or resumes the timer.
   * If the timer was paused, it will continue from where it left off.
   */
  public start(): void {
    if (!this.isPaused) return;
    this.isPaused = false;

    if (this.isWorkerTimer) {
      this.plugin.startWorkerTimer(this.timerId, this.options);
    } else {
      this.startTime = performance.now() - this.pausedTime;
    }
  }

  /**
   * Pauses the timer, maintaining its current state.
   * The timer can be resumed later from the same point.
   */
  public pause(): void {
    if (this.isPaused) return;
    this.isPaused = true;

    if (this.isWorkerTimer) {
      this.plugin.stopWorkerTimer(this.timerId);
    } else {
      this.pausedTime = performance.now() - this.startTime;
    }
  }

  /**
   * Resets the timer to its initial state.
   * If the timer is not paused, it will start running immediately after reset.
   */
  public reset(): void {
    if (this.isWorkerTimer) {
      this.plugin.resetWorkerTimer(this.timerId);
    } else {
      this.startTime = performance.now();
      this.pausedTime = 0;
      if (!this.isPaused) {
        this.start();
      }
    }
  }

  /**
   * Destroys the timer, cleaning up all resources.
   * A destroyed timer cannot be restarted.
   */
  public destroy(): void {
    if (this.isDestroyed) return;
    this._destroy();
    this.plugin.destroyTimer(this);
  }

  private _destroy(): void {
    this.isDestroyed = true;
    this.pause();
  }

  public update(): void {
    // Skip update for destroyed, paused, or worker timers
    if (this.isDestroyed || this.isPaused || this.isWorkerTimer) return;

    const currentTime = performance.now();
    const elapsed = currentTime - this.startTime;

    if (this.options.duration !== undefined) {
      const remaining = Math.max(0, this.options.duration - elapsed);

      this.options.onTick?.(remaining);

      if (remaining <= 0) {
        this.options.onComplete?.();

        if (this.options.loop) {
          this.reset();
        } else {
          this.destroy();
        }
      }
    } else {
      // Count up mode
      this.options.onTick?.(elapsed);
    }
  }

  /**
   * Gets the current time value (elapsed time for count-up, remaining time for countdown).
   * @returns Time in milliseconds
   */
  public getTime(): number {
    if (this.isPaused) {
      return this.pausedTime;
    }
    return performance.now() - this.startTime;
  }

  /**
   * Gets the remaining time for countdown timers.
   * @returns Remaining time in milliseconds, or 0 for count-up timers
   */
  public getRemainingTime(): number {
    if (!this.options.duration) return 0;
    return Math.max(0, this.options.duration - this.getTime());
  }

  /**
   * Gets the unique ID of this timer.
   * @returns The timer's UUID
   */
  public getId(): string {
    return this.timerId;
  }

  /**
   * Gets the timer's configuration options.
   * @returns The TimerOptions object used to create this timer
   */
  public getOptions(): TimerOptions {
    return this.options;
  }

  /**
   * Checks if this timer is running in a web worker.
   * @returns true if the timer is worker-based, false if running on main thread
   */
  public isWorker(): boolean {
    return this.isWorkerTimer;
  }
}

/**
 * Interface for the Timer Plugin which manages both main-thread and web worker timers.
 *
 * The Timer Plugin provides functionality for:
 * - Creating and managing countdown and count-up timers
 * - Running timers in a web worker for better performance
 * - Pausing and resuming all timers
 * - Handling timer lifecycle events
 *
 * @example
 * ```typescript
 * // Create a 5-second countdown timer
 * const countdown = this.app.timers.createTimer({
 *   duration: 5000,
 *   autoStart: true,
 *   onTick: (remaining) => {
 *     console.log(`Time remaining: ${formatTime(remaining, 'mm:ss')}`);
 *   },
 *   onComplete: () => {
 *     console.log('Timer completed!');
 *   }
 * });
 *
 * // Create a count-up timer in a web worker
 * const stopwatch = this.app.timers.createTimer({
 *   useWorker: true,
 *   workerInterval: 100, // Update every 100ms
 *   onTick: (elapsed) => {
 *     console.log(`Time elapsed: ${formatTime(elapsed, 'mm:ss')}`);
 *   }
 * });
 *
 * // Pause all timers
 * this.app.timers.pauseAllTimers();
 *
 * // Resume all timers
 * this.app.timers.resumeAllTimers();
 * ```
 */
export interface ITimerPlugin extends IPlugin {
  /**
   * Signal emitted when a new timer is created.
   * @example
   * ```typescript
   * this.app.timers.onTimerCreated.connect((timer) => {
   *   console.log(`New timer created with ID: ${timer.getId()}`);
   * });
   * ```
   */
  onTimerCreated: Signal<(timer: Timer) => void>;

  /**
   * Signal emitted when a timer is destroyed.
   * @example
   * ```typescript
   * this.app.timers.onTimerDestroyed.connect((timer) => {
   *   console.log(`Timer destroyed: ${timer.getId()}`);
   * });
   * ```
   */
  onTimerDestroyed: Signal<(timer: Timer) => void>;

  /**
   * Signal emitted when all timers are paused.
   * @example
   * ```typescript
   * this.app.timers.onAllTimersPaused.connect(() => {
   *   console.log('All timers paused');
   * });
   * ```
   */
  onAllTimersPaused: Signal<() => void>;

  /**
   * Signal emitted when all timers are resumed.
   * @example
   * ```typescript
   * this.app.timers.onAllTimersResumed.connect(() => {
   *   console.log('All timers resumed');
   * });
   * ```
   */
  onAllTimersResumed: Signal<() => void>;

  /**
   * Creates a new timer with the specified options.
   *
   * @param options - Configuration options for the timer
   * @returns A new Timer instance
   *
   * @example
   * ```typescript
   * // Create a looping timer that runs in a web worker
   * const timer = this.app.timers.createTimer({
   *   duration: 1000,
   *   loop: true,
   *   useWorker: true,
   *   onTick: (remaining) => {
   *     console.log(`${remaining}ms remaining`);
   *   }
   * });
   * ```
   */
  createTimer(options?: TimerOptions): Timer;

  /**
   * Destroys a timer, cleaning up all resources and removing it from the plugin.
   *
   * @param timer - The timer instance to destroy
   *
   * @example
   * ```typescript
   * const timer = this.app.timers.createTimer({ duration: 5000 });
   * // ... later ...
   * this.app.timers.destroyTimer(timer);
   * ```
   */
  destroyTimer(timer: Timer): void;

  /**
   * Pauses all active timers, both main thread and worker timers.
   * Timers will maintain their current state and can be resumed later.
   *
   * @example
   * ```typescript
   * // Pause all timers when the game loses focus
   * window.onblur = () => {
   *   this.app.timers.pauseAllTimers();
   * };
   * ```
   */
  pauseAllTimers(): void;

  /**
   * Resumes all paused timers, both main thread and worker timers.
   * Timers will continue from their paused state.
   *
   * @example
   * ```typescript
   * // Resume all timers when the game regains focus
   * window.onfocus = () => {
   *   this.app.timers.resumeAllTimers();
   * };
   * ```
   */
  resumeAllTimers(): void;

  /**
   * Resets a worker timer to its initial state.
   * This is primarily used internally by the Timer class.
   *
   * @param timerId - The ID of the worker timer to reset
   *
   * @example
   * ```typescript
   * // This is typically called internally by the Timer class
   * this.app.timers.resetWorkerTimer(timer.getId());
   * ```
   */
  resetWorkerTimer(timerId: string): void;
}

export class TimerPlugin extends Plugin implements ITimerPlugin {
  private mainThreadTimers: Set<Timer> = new Set();
  private workerTimers: Set<Timer> = new Set();
  private isPageVisible: boolean = true;
  private worker: Worker | null = null;
  private timerCallbacks: Map<string, TimerOptions> = new Map();
  private _hasWorkerSupport: boolean = false;

  public get hasWorkerSupport(): boolean {
    return this._hasWorkerSupport;
  }

  public readonly onTimerCreated = new Signal<(timer: Timer) => void>();
  public readonly onTimerDestroyed = new Signal<(timer: Timer) => void>();
  public readonly onAllTimersPaused = new Signal<() => void>();
  public readonly onAllTimersResumed = new Signal<() => void>();

  constructor() {
    super('timers');
  }

  protected getCoreFunctions(): string[] {
    return ['createTimer', 'destroyTimer', 'pauseAllTimers', 'resumeAllTimers', 'resetWorkerTimer'];
  }

  protected getCoreSignals(): string[] {
    return ['onTimerCreated', 'onTimerDestroyed', 'onAllTimersPaused', 'onAllTimersResumed'];
  }

  public postInitialize() {
    // Set up update loop for main thread timers only
    this.app.ticker.add(this.update);

    // Initialize worker if needed
    this.initWorker();
  }

  private initWorker(): void {
    if (typeof Worker !== 'undefined') {
      this.worker = createTimerWorker();
      if (this.worker) {
        this._hasWorkerSupport = true;
        this.worker.onmessage = this.handleWorkerMessage;
      } else {
        Logger.warn('Failed to create Web Worker for TimerPlugin, all timers will run on main thread');
        this._hasWorkerSupport = false;
      }
    } else {
      Logger.warn('Web Workers not supported in this environment, all timers will run on main thread');
      this._hasWorkerSupport = false;
    }
  }

  private handleWorkerMessage = (e: MessageEvent<WorkerMessage>): void => {
    const { type, timerId, time } = e.data;
    const options = this.timerCallbacks.get(timerId);

    if (!options) return;

    switch (type) {
      case 'tick':
        // Directly call onTick from the worker's interval
        options.onTick?.(time);
        break;
      case 'complete':
        options.onComplete?.();
        // Only remove callbacks if not looping
        if (!options.loop) {
          this.timerCallbacks.delete(timerId);
        }
        break;
    }
  };

  public startWorkerTimer(timerId: string, options: TimerOptions): void {
    if (!this.worker) return;

    this.timerCallbacks.set(timerId, options);
    this.worker.postMessage({
      type: 'start',
      timerId,
      options: {
        duration: options.duration,
        loop: options.loop,
        workerInterval: options.workerInterval,
      },
    });
  }

  public stopWorkerTimer(timerId: string): void {
    if (!this.worker) return;

    this.worker.postMessage({
      type: 'stop',
      timerId,
    });
    this.timerCallbacks.delete(timerId);
  }

  public resetWorkerTimer(timerId: string): void {
    if (!this.worker) return;

    this.worker.postMessage({
      type: 'reset',
      timerId,
    });
  }

  public destroy(): void {
    this.app.ticker.remove(this.update);
    this.worker?.terminate();
    this.worker = null;
    this.timerCallbacks.clear();
    this.mainThreadTimers.clear();
    this.workerTimers.clear();
    super.destroy();
  }

  private update() {
    // Only update main thread timers
    for (const timer of this.mainThreadTimers) {
      timer.update();
    }
  }

  public createTimer(options?: TimerOptions): Timer {
    const timer = new Timer(options, this);

    // Separate management of worker and main thread timers
    if (timer.isWorker()) {
      this.workerTimers.add(timer);
    } else {
      this.mainThreadTimers.add(timer);
    }

    this.onTimerCreated.emit(timer);
    return timer;
  }

  public destroyTimer(timer: Timer): void {
    const timerSet = timer.isWorker() ? this.workerTimers : this.mainThreadTimers;

    if (timerSet.has(timer)) {
      timer.destroy();
      timerSet.delete(timer);
      this.onTimerDestroyed.emit(timer);

      if (timer.isWorker()) {
        this.stopWorkerTimer(timer.getId());
      }
    }
  }

  public pauseAllTimers(): void {
    // Pause both worker and main thread timers
    for (const timer of [...this.mainThreadTimers, ...this.workerTimers]) {
      timer.pause();
    }
    this.onAllTimersPaused.emit();
  }

  public resumeAllTimers(): void {
    // Resume both worker and main thread timers
    for (const timer of [...this.mainThreadTimers, ...this.workerTimers]) {
      timer.start();
    }
    this.onAllTimersResumed.emit();
  }
}
