import { Container } from 'pixi.js';
import { keyboardFocusBegin, keyboardFocusEnd } from '../functions';
import { LogUtils } from '../utils';
export var Direction;
(function (Direction) {
    Direction["UP"] = "Up";
    Direction["RIGHT"] = "Right";
    Direction["DOWN"] = "Down";
    Direction["LEFT"] = "Left";
    Direction["FORWARDS"] = "Forwards";
    Direction["BACKWARDS"] = "Backwards";
})(Direction || (Direction = {}));
/**
 * Keyboard map
 */
export class KeyboardMap {
    constructor() {
        this._isActive = false;
        this._focusables = [];
        this._neighbours = [];
    }
    /**
     * Sets whether is active
     * @param pValue
     */
    set isActive(pValue) {
        this._isActive = pValue;
        if (!this._isActive && this._currentFocusable !== undefined) {
            this.clearFocus();
        }
        else if (this._isActive && this._currentFocusable === undefined) {
            this.focusFirstNode();
        }
    }
    get currentFocusable() {
        return this._currentFocusable;
    }
    /**
     * Clears keyboard map
     */
    clear() {
        this._focusables.length = 0;
        this._neighbours.length = 0;
        this.clearFocus();
    }
    /**
     * Registers focusable
     * @param pFocusable
     */
    registerFocusable(pFocusable) {
        if (!Array.isArray(pFocusable)) {
            pFocusable = [pFocusable];
        }
        for (const focusable of pFocusable) {
            if (focusable && this._focusables.indexOf(focusable) < 0) {
                this._focusables.push(focusable);
            }
        }
        if (this._isActive && this._currentFocusable === undefined) {
            this.focusFirstNode();
        }
    }
    /**
     * Unregisters focusable
     * @param pFocusable
     */
    unregisterFocusable(pFocusable) {
        if (!Array.isArray(pFocusable)) {
            pFocusable = [pFocusable];
        }
        for (const focusable of pFocusable) {
            if (typeof focusable === 'function') {
                this._focusables = this._focusables.filter((it) => !focusable(it));
            }
            else {
                const index = this._focusables.indexOf(focusable);
                if (index >= 0) {
                    this._focusables.splice(index, 1);
                }
            }
        }
        if (this._currentFocusable && pFocusable.indexOf(this._currentFocusable) > -1) {
            this.clearFocus();
            this.focusFirstNode();
        }
    }
    /**
     * Steps keyboard map
     * @param pDirection
     */
    step(pDirection) {
        if (this._currentFocusable === undefined) {
            this.focusFirstNode();
        }
        else {
            if (!this.stepToNeighbour(pDirection)) {
                const focusables = this._focusables.filter(this.isFocusable);
                if (focusables.length > 1) {
                    this.stepToNearest(pDirection, focusables);
                }
                else if (focusables.length > 0) {
                    this.setFocus(focusables[0]);
                }
                else {
                    this.clearFocus();
                }
            }
        }
    }
    /**
     * Clears focus
     */
    clearFocus() {
        if (this._currentFocusable !== undefined) {
            this._currentFocusable.onFocusEnd();
            keyboardFocusEnd(this._currentFocusable);
            this._lastFocusable = this._currentFocusable;
            this._currentFocusable = undefined;
        }
    }
    /**
     * Sets focus on a node if that node is interactive AND visible.
     * @param focusable
     */
    setFocus(focusable) {
        if (this._currentFocusable !== focusable) {
            if (this._currentFocusable !== undefined) {
                this._currentFocusable.onFocusEnd();
                keyboardFocusEnd(this._currentFocusable);
                this._lastFocusable = this._currentFocusable;
            }
            this._currentFocusable = focusable;
            this._currentFocusable.onFocusBegin();
            keyboardFocusBegin(this._currentFocusable);
        }
    }
    /**
     * Focuses the first node that is both interactive and visible
     */
    focusFirstNode() {
        if (this._lastFocusable && this._lastFocusable?.parent && this.isFocusable(this._lastFocusable)) {
            this.setFocus(this._lastFocusable);
            return;
        }
        for (const focusable of this._focusables) {
            if (this.isFocusable(focusable)) {
                this.setFocus(focusable);
                return;
            }
        }
        LogUtils.logWarning('No registered focusables are currently focusable.', {
            className: 'KeyboardMap',
            color: 'brown',
        });
    }
    /**
     * Activates focussed node
     */
    activateFocussedNode() {
        if (this._currentFocusable !== undefined) {
            this._currentFocusable.onFocusActivated();
        }
    }
    /**
     * Sets a neighbour for a node
     * @param pFocusable
     * @param pNeighbour
     * @param pDirection
     */
    forceNeighbour(pFocusable, pNeighbour, pDirection) {
        this._neighbours.push({ from: pFocusable, to: pNeighbour, direction: pDirection });
    }
    clearNeighbours() {
        this._neighbours.length = 0;
    }
    stepToNeighbour(pDirection) {
        if (pDirection === Direction.FORWARDS || pDirection === Direction.BACKWARDS) {
            if (this._currentFocusable) {
                const focusables = this._focusables.filter(this.isFocusable);
                const index = focusables.indexOf(this._currentFocusable);
                if (pDirection === Direction.FORWARDS) {
                    if (focusables.length > index + 1) {
                        this.setFocus(focusables[index + 1]);
                        return true;
                    }
                    else {
                        this.setFocus(focusables[0]);
                        return true;
                    }
                }
                else {
                    // backwards
                    if (index > 0) {
                        this.setFocus(focusables[index - 1]);
                        return true;
                    }
                    else if (index === 0) {
                        this.setFocus(focusables[focusables.length - 1]);
                        return true;
                    }
                }
            }
            return false;
        }
        for (const neighbour of this._neighbours) {
            if (neighbour.from === this._currentFocusable &&
                neighbour.direction === pDirection &&
                this.isFocusable(neighbour.to)) {
                this.setFocus(neighbour.to);
                return true;
            }
        }
        return false;
    }
    stepToNearest(pDirection, focusables) {
        if (this._currentFocusable) {
            const position = this._currentFocusable.getFocusPosition();
            let weight = Number.MAX_VALUE;
            let nearest;
            for (const focusable of focusables) {
                if (focusable !== this._currentFocusable) {
                    const w = this.calculateWeight(position, focusable.getFocusPosition(), pDirection);
                    if (w < weight) {
                        weight = w;
                        nearest = focusable;
                    }
                }
            }
            if (nearest) {
                this.setFocus(nearest);
            }
        }
    }
    // TODO:SH: Optimize
    /**
     * Calculates weight
     * @todo SH: Optimize
     * @param posA
     * @param posB
     * @param pDirection
     * @returns weight
     */
    calculateWeight(posA, posB, pDirection) {
        const xDiff = posB.x - posA.x;
        const yDiff = posB.y - posA.y;
        switch (pDirection) {
            case Direction.UP:
                return yDiff >= 0 ? Number.MAX_VALUE : this.temp(Math.abs(yDiff), Math.abs(xDiff));
            case Direction.RIGHT:
                return xDiff <= 0 ? Number.MAX_VALUE : this.temp(Math.abs(xDiff), Math.abs(yDiff));
            case Direction.DOWN:
                return yDiff <= 0 ? Number.MAX_VALUE : this.temp(Math.abs(yDiff), Math.abs(xDiff));
            case Direction.LEFT:
            default:
                return xDiff >= 0 ? Number.MAX_VALUE : this.temp(Math.abs(xDiff), Math.abs(yDiff));
        }
    }
    /**
     * Temps keyboard map
     * @param pParallel
     * @param pPerpendicular
     * @returns temp
     */
    temp(pParallel, pPerpendicular) {
        return pParallel + pPerpendicular * (pPerpendicular / pParallel);
    }
    isFocusable(focusable) {
        return focusable.isFocusable
            ? focusable.isFocusable()
            : focusable instanceof Container
                ? (focusable.interactive || focusable.eventMode !== 'none') && focusable.worldVisible
                : false;
    }
}
//# sourceMappingURL=KeyboardMap.js.map