import { isMobile as PIXIUtilsIsMobile } from '@pixi/utils';

export function isRetina(): boolean {
  const mediaQuery =
    '(-webkit-min-device-pixel-ratio: 1.5),\
						(min--moz-device-pixel-ratio: 1.5),\
						(-o-min-device-pixel-ratio: 3/2),\
						(min-resolution: 1.5dppx)';
  if (window.devicePixelRatio > 1) {
    return true;
  }

  return (window.matchMedia && window.matchMedia(mediaQuery).matches) === null;
}

export function isMobile(): boolean {
  return PIXIUtilsIsMobile.any;
}
