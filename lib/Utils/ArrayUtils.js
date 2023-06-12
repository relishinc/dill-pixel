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
exports.random = exports.shuffle = void 0;
const Random = __importStar(require("../Utils/Random"));
/**
 * Shuffle an array.
 * @param pArray
 */
function shuffle(pArray) {
    let temp;
    let index;
    for (let i = 0; i < pArray.length; ++i) {
        index = Random.intBetween(0, pArray.length);
        temp = pArray[i];
        pArray[i] = pArray[index];
        pArray[index] = temp;
    }
}
exports.shuffle = shuffle;
/**
 * Get a random array element.
 * @param pArray
 */
function random(pArray) {
    return pArray[Random.intBetween(0, pArray.length)];
}
exports.random = random;
//# sourceMappingURL=ArrayUtils.js.map