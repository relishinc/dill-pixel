import { isMobile as PIXIUtilsIsMobile } from 'pixi.js';

/**
 * Checks if the device has a retina display.
 * A device is considered to have a retina display if its device pixel ratio is greater than 1,
 * or if it matches the media query for high resolution displays.
 * @type {boolean}
 */
export const isRetina =
  window.devicePixelRatio > 1 ||
  (window.matchMedia &&
    window.matchMedia(
      '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)',
    ).matches);

/**
 * Check if we're on a touch device
 */
export const isTouch: boolean =
  'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator?.maxTouchPoints > 0;

/**
 * Checks if the device is a mobile device.
 * This uses the `isMobile` function from the `@pixi/utils` package.
 * @type {boolean}
 */
export const isMobile = PIXIUtilsIsMobile.any;
export const isAndroid = PIXIUtilsIsMobile.android.device;
export const isIos = PIXIUtilsIsMobile.apple.device;
