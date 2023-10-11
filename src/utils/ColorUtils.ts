// returns a hex string from a uint color
export function toHex(color: number): string {
  return `#${color.toString(16)}`;
}

// return a uint color from a hex string
export function toRgb(hex: string): number {
  return parseInt(hex.replace(/^#/, ''), 16);
}
