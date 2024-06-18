export function getZeroPaddedNumber(num: number, zeroPad: number = 0): string {
  return num.toString().padStart(zeroPad, '0');
}
