// returns a hex string from a uint color
export function toHex(color) {
    return `#${color.toString(16)}`;
}
// return a uint color from a hex string
export function toRgb(hex) {
    return parseInt(hex.replace(/^#/, ''), 16);
}
//# sourceMappingURL=ColorUtils.js.map