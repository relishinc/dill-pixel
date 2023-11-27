export class ObjectPool {
    constructor(classType, initialSize = 0, maxSize = 0) {
        this.classType = classType;
        this.initialSize = initialSize;
        this.maxSize = maxSize;
        this.pool = [];
        if (initialSize > 0) {
            this.pool = new Array(initialSize).fill(0).map(() => new classType());
        }
    }
    get() {
        if (this.pool.length > 0) {
            return this.pool.pop();
        }
        else {
            return new this.classType();
        }
    }
    release(item) {
        item.release();
        if (this.pool.length < this.maxSize) {
            this.pool.push(item);
        }
    }
    conditionalRelease(item, condition) {
        if (condition(item)) {
            this.release(item);
        }
    }
    // Optional: Clear the pool if needed
    clear(destroyItems = false) {
        if (destroyItems) {
            this.pool.forEach((item) => item.destroy());
        }
        this.pool.length = 0;
    }
}
//# sourceMappingURL=ObjectPool.js.map