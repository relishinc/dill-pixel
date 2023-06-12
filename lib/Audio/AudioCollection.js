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
exports.AudioCollection = void 0;
const typescript_collections_1 = require("typescript-collections");
const MathUtils = __importStar(require("../Utils/MathUtils"));
class AudioCollection {
    constructor() {
        this._tracks = new typescript_collections_1.Dictionary();
        this._volume = 1;
    }
    get volume() {
        return this._volume;
    }
    set volume(pValue) {
        this._volume = MathUtils.clamp(pValue, 0, 1);
    }
    get tracks() {
        return this._tracks;
    }
}
exports.AudioCollection = AudioCollection;
//# sourceMappingURL=AudioCollection.js.map