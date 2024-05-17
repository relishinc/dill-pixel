/******************************************************************************
 * Spine Runtimes License Agreement
 * Last updated July 28, 2023. Replaces all prior versions.
 *
 * Copyright (c) 2013-2023, Esoteric Software LLC
 *
 * Integration of the Spine Runtimes into software or otherwise creating
 * derivative works of the Spine Runtimes is permitted under the terms and
 * conditions of Section 2 of the Spine Editor License Agreement:
 * http://esotericsoftware.com/spine-editor-license
 *
 * Otherwise, it is permitted to integrate the Spine Runtimes into software or
 * otherwise create derivative works of the Spine Runtimes (collectively,
 * "Products"), provided that each user of the Products must obtain their own
 * Spine Editor license and redistribution of the Products in any form must
 * include this license and copyright notice.
 *
 * THE SPINE RUNTIMES ARE PROVIDED BY ESOTERIC SOFTWARE LLC "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ESOTERIC SOFTWARE LLC BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES,
 * BUSINESS INTERRUPTION, OR LOSS OF USE, DATA, OR PROFITS) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE
 * SPINE RUNTIMES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *****************************************************************************/
export class IntSet {
    array = new Array();
    add(value) {
        const contains = this.contains(value);
        this.array[value | 0] = value | 0;
        return !contains;
    }
    contains(value) {
        return this.array[value | 0] != undefined;
    }
    remove(value) {
        this.array[value | 0] = undefined;
    }
    clear() {
        this.array.length = 0;
    }
}
export class StringSet {
    entries = {};
    size = 0;
    add(value) {
        const contains = this.entries[value];
        this.entries[value] = true;
        if (!contains) {
            this.size++;
            return true;
        }
        return false;
    }
    addAll(values) {
        const oldSize = this.size;
        for (let i = 0, n = values.length; i < n; i++)
            this.add(values[i]);
        return oldSize != this.size;
    }
    contains(value) {
        return this.entries[value];
    }
    clear() {
        this.entries = {};
        this.size = 0;
    }
}
export class Color {
    r;
    g;
    b;
    a;
    // public static WHITE = new Color(1, 1, 1, 1);
    // public static RED = new Color(1, 0, 0, 1);
    // public static GREEN = new Color(0, 1, 0, 1);
    // public static BLUE = new Color(0, 0, 1, 1);
    // public static MAGENTA = new Color(1, 0, 1, 1);
    static WHITE;
    static RED;
    static GREEN;
    static BLUE;
    static MAGENTA;
    static rgba8888ToColor(color, value) {
        color.r = ((value & 0xff000000) >>> 24) / 255;
        color.g = ((value & 0x00ff0000) >>> 16) / 255;
        color.b = ((value & 0x0000ff00) >>> 8) / 255;
        color.a = (value & 0x000000ff) / 255;
    }
    static rgb888ToColor(color, value) {
        color.r = ((value & 0x00ff0000) >>> 16) / 255;
        color.g = ((value & 0x0000ff00) >>> 8) / 255;
        color.b = (value & 0x000000ff) / 255;
    }
    static fromString(hex) {
        return new Color().setFromString(hex);
    }
    constructor(r = 0, g = 0, b = 0, a = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    set(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        return this.clamp();
    }
    setFromColor(c) {
        this.r = c.r;
        this.g = c.g;
        this.b = c.b;
        this.a = c.a;
        return this;
    }
    setFromString(hex) {
        hex = hex.charAt(0) == '#' ? hex.substr(1) : hex;
        this.r = parseInt(hex.substr(0, 2), 16) / 255;
        this.g = parseInt(hex.substr(2, 2), 16) / 255;
        this.b = parseInt(hex.substr(4, 2), 16) / 255;
        this.a = hex.length != 8 ? 1 : parseInt(hex.substr(6, 2), 16) / 255;
        return this;
    }
    add(r, g, b, a) {
        this.r += r;
        this.g += g;
        this.b += b;
        this.a += a;
        return this.clamp();
    }
    clamp() {
        if (this.r < 0)
            this.r = 0;
        else if (this.r > 1)
            this.r = 1;
        if (this.g < 0)
            this.g = 0;
        else if (this.g > 1)
            this.g = 1;
        if (this.b < 0)
            this.b = 0;
        else if (this.b > 1)
            this.b = 1;
        if (this.a < 0)
            this.a = 0;
        else if (this.a > 1)
            this.a = 1;
        return this;
    }
}
Color.WHITE = new Color(1, 1, 1, 1);
Color.RED = new Color(1, 0, 0, 1);
Color.GREEN = new Color(0, 1, 0, 1);
Color.BLUE = new Color(0, 0, 1, 1);
Color.MAGENTA = new Color(1, 0, 1, 1);
export class MathUtils {
    static PI;
    static PI2;
    static radiansToDegrees;
    static radDeg;
    static degreesToRadians;
    static degRad;
    static clamp(value, min, max) {
        if (value < min)
            return min;
        if (value > max)
            return max;
        return value;
    }
    static cosDeg(degrees) {
        return Math.cos(degrees * MathUtils.degRad);
    }
    static sinDeg(degrees) {
        return Math.sin(degrees * MathUtils.degRad);
    }
    static signum(value) {
        return value > 0 ? 1 : value < 0 ? -1 : 0;
    }
    static toInt(x) {
        return x > 0 ? Math.floor(x) : Math.ceil(x);
    }
    static cbrt(x) {
        const y = Math.pow(Math.abs(x), 1 / 3);
        return x < 0 ? -y : y;
    }
    static randomTriangular(min, max) {
        return MathUtils.randomTriangularWith(min, max, (min + max) * 0.5);
    }
    static randomTriangularWith(min, max, mode) {
        const u = Math.random();
        const d = max - min;
        if (u <= (mode - min) / d)
            return min + Math.sqrt(u * d * (mode - min));
        return max - Math.sqrt((1 - u) * d * (max - mode));
    }
    static isPowerOfTwo(value) {
        return value && (value & (value - 1)) === 0;
    }
}
MathUtils.PI = Math.PI;
MathUtils.PI2 = Math.PI * 2;
MathUtils.radiansToDegrees = 180 / MathUtils.PI;
MathUtils.radDeg = MathUtils.radiansToDegrees;
MathUtils.degreesToRadians = MathUtils.PI / 180;
MathUtils.degRad = MathUtils.degreesToRadians;
export class Interpolation {
    apply(start, end, a) {
        return start + (end - start) * this.applyInternal(a);
    }
}
export class Pow extends Interpolation {
    power = 2;
    constructor(power) {
        super();
        this.power = power;
    }
    applyInternal(a) {
        if (a <= 0.5)
            return Math.pow(a * 2, this.power) / 2;
        return Math.pow((a - 1) * 2, this.power) / (this.power % 2 == 0 ? -2 : 2) + 1;
    }
}
export class PowOut extends Pow {
    constructor(power) {
        super(power);
    }
    applyInternal(a) {
        return Math.pow(a - 1, this.power) * (this.power % 2 == 0 ? -1 : 1) + 1;
    }
}
export class Utils {
    static SUPPORTS_TYPED_ARRAYS = typeof Float32Array !== 'undefined';
    static arrayCopy(source, sourceStart, dest, destStart, numElements) {
        for (let i = sourceStart, j = destStart; i < sourceStart + numElements; i++, j++) {
            dest[j] = source[i];
        }
    }
    static arrayFill(array, fromIndex, toIndex, value) {
        for (let i = fromIndex; i < toIndex; i++)
            array[i] = value;
    }
    static setArraySize(array, size, value = 0) {
        const oldSize = array.length;
        if (oldSize == size)
            return array;
        array.length = size;
        if (oldSize < size) {
            for (let i = oldSize; i < size; i++)
                array[i] = value;
        }
        return array;
    }
    static ensureArrayCapacity(array, size, value = 0) {
        if (array.length >= size)
            return array;
        return Utils.setArraySize(array, size, value);
    }
    static newArray(size, defaultValue) {
        const array = new Array(size);
        for (let i = 0; i < size; i++)
            array[i] = defaultValue;
        return array;
    }
    static newFloatArray(size) {
        if (Utils.SUPPORTS_TYPED_ARRAYS)
            return new Float32Array(size);
        else {
            const array = new Array(size);
            for (let i = 0; i < array.length; i++)
                array[i] = 0;
            return array;
        }
    }
    static newShortArray(size) {
        if (Utils.SUPPORTS_TYPED_ARRAYS)
            return new Int16Array(size);
        else {
            const array = new Array(size);
            for (let i = 0; i < array.length; i++)
                array[i] = 0;
            return array;
        }
    }
    static toFloatArray(array) {
        return Utils.SUPPORTS_TYPED_ARRAYS ? new Float32Array(array) : array;
    }
    static toSinglePrecision(value) {
        return Utils.SUPPORTS_TYPED_ARRAYS ? Math.fround(value) : value;
    }
    // This function is used to fix WebKit 602 specific issue described at http://esotericsoftware.com/forum/iOS-10-disappearing-graphics-10109
    static webkit602BugfixHelper(alpha, blend) { }
    static contains(array, element, identity = true) {
        for (let i = 0; i < array.length; i++)
            if (array[i] == element)
                return true;
        return false;
    }
    static enumValue(type, name) {
        return type[name[0].toUpperCase() + name.slice(1)];
    }
}
export class DebugUtils {
    static logBones(skeleton) {
        for (let i = 0; i < skeleton.bones.length; i++) {
            const bone = skeleton.bones[i];
            console.log(bone.data.name +
                ', ' +
                bone.a +
                ', ' +
                bone.b +
                ', ' +
                bone.c +
                ', ' +
                bone.d +
                ', ' +
                bone.worldX +
                ', ' +
                bone.worldY);
        }
    }
}
export class Pool {
    items = new Array();
    instantiator;
    constructor(instantiator) {
        this.instantiator = instantiator;
    }
    obtain() {
        return this.items.length > 0 ? this.items.pop() : this.instantiator();
    }
    free(item) {
        if (item.reset)
            item.reset();
        this.items.push(item);
    }
    freeAll(items) {
        for (let i = 0; i < items.length; i++)
            this.free(items[i]);
    }
    clear() {
        this.items.length = 0;
    }
}
export class Vector2 {
    x;
    y;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    length() {
        const x = this.x;
        const y = this.y;
        return Math.sqrt(x * x + y * y);
    }
    normalize() {
        const len = this.length();
        if (len != 0) {
            this.x /= len;
            this.y /= len;
        }
        return this;
    }
}
export class TimeKeeper {
    maxDelta = 0.064;
    framesPerSecond = 0;
    delta = 0;
    totalTime = 0;
    lastTime = Date.now() / 1000;
    frameCount = 0;
    frameTime = 0;
    update() {
        const now = Date.now() / 1000;
        this.delta = now - this.lastTime;
        this.frameTime += this.delta;
        this.totalTime += this.delta;
        if (this.delta > this.maxDelta)
            this.delta = this.maxDelta;
        this.lastTime = now;
        this.frameCount++;
        if (this.frameTime > 1) {
            this.framesPerSecond = this.frameCount / this.frameTime;
            this.frameTime = 0;
            this.frameCount = 0;
        }
    }
}
export class WindowedMean {
    values;
    addedValues = 0;
    lastValue = 0;
    mean = 0;
    dirty = true;
    constructor(windowSize = 32) {
        this.values = new Array(windowSize);
    }
    hasEnoughData() {
        return this.addedValues >= this.values.length;
    }
    addValue(value) {
        if (this.addedValues < this.values.length)
            this.addedValues++;
        this.values[this.lastValue++] = value;
        if (this.lastValue > this.values.length - 1)
            this.lastValue = 0;
        this.dirty = true;
    }
    getMean() {
        if (this.hasEnoughData()) {
            if (this.dirty) {
                let mean = 0;
                for (let i = 0; i < this.values.length; i++)
                    mean += this.values[i];
                this.mean = mean / this.values.length;
                this.dirty = false;
            }
            return this.mean;
        }
        return 0;
    }
}