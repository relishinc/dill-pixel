"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveXYFromObjectOrArray = void 0;
function resolveXYFromObjectOrArray(position) {
    let x = 0;
    let y = 0;
    if (Array.isArray(position)) {
        x = position[0];
        y = position[1] || position[0];
    }
    else if (typeof position === 'object') {
        // cast as an object
        const obj = position;
        x = obj.x || 0;
        y = obj.y || 0;
    }
    else if (typeof position === 'number') {
        x = position;
        y = position;
    }
    return { x, y };
}
exports.resolveXYFromObjectOrArray = resolveXYFromObjectOrArray;
//# sourceMappingURL=utils.js.map