import { Point } from 'pixi.js';
export function resolvePointLike(position, asPoint = false, x = 0, y = 0) {
    if (position instanceof Point) {
        x = position.x;
        y = position.y;
    }
    else if (Array.isArray(position)) {
        x = position[0];
        y = position[1] === undefined ? position[0] : position[1];
    }
    else if (typeof position === 'object') {
        // cast as an object
        const obj = position;
        x = obj.x || 0;
        y = obj.y || 0;
    }
    else {
        x = position ?? x;
        y = position ?? y;
    }
    return asPoint ? new Point(x, y) : { x, y };
}
export function getSheetLikeString(sheet) {
    if (Array.isArray(sheet)) {
        return sheet.join('/');
    }
    else {
        return sheet;
    }
}
export function setObjectName(object, texture, sheet) {
    if (sheet && texture) {
        object.name = `${getSheetLikeString(sheet)}/${texture}`;
    }
    else if (typeof texture === 'string') {
        object.name = `${texture}`;
    }
    if (typeof texture === 'string') {
        object.__textureString = texture;
    }
    if (Array.isArray(sheet)) {
        object.__textureSheetArray = sheet;
    }
    else if (sheet) {
        object.__textureSheet = sheet;
    }
}
//# sourceMappingURL=functions.js.map