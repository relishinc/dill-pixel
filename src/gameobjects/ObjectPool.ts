export class ObjectPool<T extends { release: (...args: any[]) => void; destroy: (...args: any[]) => void }> {
  private pool: T[] = [];

  constructor(
    public classType: new (...args: any[]) => T,
    public initialSize: number = 0,
    public maxSize: number = 0,
  ) {
    if (initialSize > 0) {
      this.pool = new Array(initialSize).fill(0).map(() => new classType());
    }
  }

  get(): T {
    if (this.pool.length > 0) {
      return this.pool.pop() as T;
    } else {
      return new this.classType();
    }
  }

  release(item: T): void {
    item.release();

    if (this.pool.length < this.maxSize) {
      this.pool.push(item);
    }
  }

  conditionalRelease(item: T, condition: (item: T) => boolean): void {
    if (condition(item)) {
      this.release(item);
    }
  }

  // Optional: Clear the pool if needed
  clear(destroyItems: boolean = false): void {
    if (destroyItems) {
      this.pool.forEach((item) => item.destroy());
    }
    this.pool.length = 0;
  }
}
