import { MixBlend } from './Animation';
import { Skeleton } from './Skeleton';

export interface StringMap<T> {
    [key: string]: T;
}
export declare class IntSet {
    array: (number | undefined)[];
    add(value: number): boolean;
    contains(value: number): boolean;
    remove(value: number): void;
    clear(): void;
}
export declare class StringSet {
    entries: StringMap<boolean>;
    size: number;
    add(value: string): boolean;
    addAll(values: string[]): boolean;
    contains(value: string): boolean;
    clear(): void;
}
export interface NumberArrayLike {
    readonly length: number;
    [n: number]: number;
}
export interface Disposable {
    dispose(): void;
}
export interface Restorable {
    restore(): void;
}
export declare class Color {
    r: number;
    g: number;
    b: number;
    a: number;
    static WHITE: Color;
    static RED: Color;
    static GREEN: Color;
    static BLUE: Color;
    static MAGENTA: Color;
    static rgba8888ToColor(color: Color, value: number): void;
    static rgb888ToColor(color: Color, value: number): void;
    static fromString(hex: string): Color;
    constructor(r?: number, g?: number, b?: number, a?: number);
    set(r: number, g: number, b: number, a: number): this;
    setFromColor(c: Color): this;
    setFromString(hex: string): this;
    add(r: number, g: number, b: number, a: number): this;
    clamp(): this;
}
export declare class MathUtils {
    static PI: number;
    static PI2: number;
    static radiansToDegrees: number;
    static radDeg: number;
    static degreesToRadians: number;
    static degRad: number;
    static clamp(value: number, min: number, max: number): number;
    static cosDeg(degrees: number): number;
    static sinDeg(degrees: number): number;
    static signum(value: number): number;
    static toInt(x: number): number;
    static cbrt(x: number): number;
    static randomTriangular(min: number, max: number): number;
    static randomTriangularWith(min: number, max: number, mode: number): number;
    static isPowerOfTwo(value: number): boolean | 0;
}
export declare abstract class Interpolation {
    apply(start: number, end: number, a: number): number;
    protected abstract applyInternal(a: number): number;
}
export declare class Pow extends Interpolation {
    protected power: number;
    constructor(power: number);
    applyInternal(a: number): number;
}
export declare class PowOut extends Pow {
    constructor(power: number);
    applyInternal(a: number): number;
}
export declare class Utils {
    static SUPPORTS_TYPED_ARRAYS: boolean;
    static arrayCopy<T>(source: ArrayLike<T>, sourceStart: number, dest: ArrayLike<T>, destStart: number, numElements: number): void;
    static arrayFill<T>(array: ArrayLike<T>, fromIndex: number, toIndex: number, value: T): void;
    static setArraySize<T>(array: Array<T>, size: number, value?: any): Array<T>;
    static ensureArrayCapacity<T>(array: Array<T>, size: number, value?: any): Array<T>;
    static newArray<T>(size: number, defaultValue: T): Array<T>;
    static newFloatArray(size: number): NumberArrayLike;
    static newShortArray(size: number): NumberArrayLike;
    static toFloatArray(array: Array<number>): number[] | Float32Array;
    static toSinglePrecision(value: number): number;
    static webkit602BugfixHelper(alpha: number, blend: MixBlend): void;
    static contains<T>(array: Array<T>, element: T, identity?: boolean): boolean;
    static enumValue(type: any, name: string): any;
}
export declare class DebugUtils {
    static logBones(skeleton: Skeleton): void;
}
export declare class Pool<T> {
    private items;
    private instantiator;
    constructor(instantiator: () => T);
    obtain(): T;
    free(item: T): void;
    freeAll(items: ArrayLike<T>): void;
    clear(): void;
}
export declare class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    set(x: number, y: number): Vector2;
    length(): number;
    normalize(): this;
}
export declare class TimeKeeper {
    maxDelta: number;
    framesPerSecond: number;
    delta: number;
    totalTime: number;
    private lastTime;
    private frameCount;
    private frameTime;
    update(): void;
}
export interface ArrayLike<T> {
    length: number;
    [n: number]: T;
}
export declare class WindowedMean {
    values: Array<number>;
    addedValues: number;
    lastValue: number;
    mean: number;
    dirty: boolean;
    constructor(windowSize?: number);
    hasEnoughData(): boolean;
    addValue(value: number): void;
    getMean(): number;
}
//# sourceMappingURL=Utils.d.ts.map