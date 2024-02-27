export function createQueue(...promises: (Promise<any> | (() => Promise<any | void>))[]): Queue {
  return new Queue(promises);
}

export class Queue<T = any | void> {
  private promiseFunctions: (Promise<any> | (() => Promise<T>))[];
  private currentIndex: number = 0;
  private isPaused: boolean = false;
  private isCanceled: boolean = false;
  private results: T[] = [];

  constructor(promiseFunctions: (Promise<any> | (() => Promise<T>))[]) {
    this.promiseFunctions = promiseFunctions;
  }

  public add(...args: (Promise<any> | (() => Promise<T>))[]) {
    this.promiseFunctions.push(...args);
  }

  public start(): void {
    if (this.currentIndex === 0) {
      // Prevent restart if already started
      void this.executeNext();
    }
  }

  public pause(): void {
    this.isPaused = true;
  }

  public resume(): void {
    if (this.isPaused) {
      this.isPaused = false;
      void this.executeNext();
    }
  }

  public cancel(): void {
    this.isCanceled = true;
    this.promiseFunctions = [];
  }

  public getResults(): T[] {
    return this.results;
  }

  private async executeNext(): Promise<void> {
    if (this.isPaused || this.isCanceled || this.currentIndex >= this.promiseFunctions.length) {
      return;
    }

    const currentFunction = this.promiseFunctions[this.currentIndex];
    try {
      const result = typeof currentFunction === 'function' ? await currentFunction() : await currentFunction;
      this.results.push(result);
      this.currentIndex++;
      void this.executeNext();
    } catch (error) {
      // Handle error or reject
      console.error('Promise execution failed:', error);
      // Optionally, stop execution on error or handle it differently
    }
  }
}
