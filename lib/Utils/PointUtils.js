"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.magnitude = exports.distanceSq = exports.distance = exports.lerp = exports.multiply = exports.subtractFromPoint = exports.subtract = exports.addToPoint = exports.add = void 0;
const pixi_js_1 = require("pixi.js");
const MathUtils = __importStar(require("../Utils/MathUtils"));
/**
 * Add the x and the y values of two Points together and return a new point.
 * @param pA
 * @param pB
 * @returns Point
 */
function add(pA, pB) {
    return new pixi_js_1.Point(pA.x + pB.x, pA.y + pB.y);
}
exports.add = add;
/**
 * Increase the x,y of point A by the x,y of point B.
 * @param pA
 * @param pB
 */
function addToPoint(pA, pB) {
    pA.x += pB.x;
    pA.y += pB.y;
}
exports.addToPoint = addToPoint;
/**
 * Subtract the x and the y values of point B from Point A and return a new point.
 * @param pA
 * @param pB
 */
function subtract(pA, pB) {
    return new pixi_js_1.Point(pA.x - pB.x, pA.y - pB.y);
}
exports.subtract = subtract;
/**
 * Decrease the x,y of point A by the x,y of point B.
 * @param pA
 * @param pB
 */
function subtractFromPoint(pA, pB) {
    pA.x -= pB.x;
    pA.y -= pB.y;
}
exports.subtractFromPoint = subtractFromPoint;
/**
 * Multply the x,y values of a point by the provided value.
 * @param pA
 * @param pMult
 */
function multiply(pA, pMult) {
    const point = new pixi_js_1.Point(pA.x, pA.y);
    point.x *= pMult;
    point.y *= pMult;
    return point;
}
exports.multiply = multiply;
/**
 *
 * @param pPoint
 * @param pPerc
 */
function lerp(pPoint, pPerc) {
    return MathUtils.lerp(pPoint.x, pPoint.y, pPerc);
}
exports.lerp = lerp;
/**
 * Get the distance between two points.
 * @param pA
 * @param pB
 */
function distance(pA, pB) {
    return Math.sqrt(distanceSq(pA, pB));
}
exports.distance = distance;
/**
 * Get the squared distance between two points.
 * @param pA
 * @param pB
 */
function distanceSq(pA, pB) {
    return (pB.x - pA.x) * (pB.x - pA.x) + (pB.y - pA.y) * (pB.y - pA.y);
}
exports.distanceSq = distanceSq;
/**
 * Gets the magnitude of a point.
 * @param pPoint
 */
function magnitude(pPoint) {
    return Math.sqrt((pPoint.x * pPoint.x) + (pPoint.y * pPoint.y));
}
exports.magnitude = magnitude;
//# sourceMappingURL=PointUtils.js.map