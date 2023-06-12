/**
 * iPhone XR
 * @description 3GB RAM
 */
export declare const IPHONE_XR: string;
/**
 * iPhone XS Max
 * @description 4GB RAM
 */
export declare const IPHONE_XS_MAX: string;
/**
 * iPhone X
 * @description 3GB RAM
 */
export declare const IPHONE_X: string;
/**
 * iPhone XS
 * @description 4GB RAM
 */
export declare const IPHONE_XS: string;
/**
 * iPhone 6 Plus
 * @description 1GB RAM
 */
export declare const IPHONE_6_PLUS: string;
/**
 * iPhone 6s Plus
 * @description 1GB RAM
 */
export declare const IPHONE_6S_PLUS: string;
/**
 * iPhone 7 Plus
 * @description 3GB RAM
 */
export declare const IPHONE_7_PLUS: string;
/**
 * iPhone 8 Plus
 * @description 3GB RAM
 */
export declare const IPHONE_8_PLUS: string;
/**
 * iPhone SE
 * @description 2GM RAM
 */
export declare const IPHONE_SE: string;
/**
 * iPhone 6
 * @description 1GB RAM
 */
export declare const IPHONE_6: string;
/**
 * iPhone 6s
 * @description 2GB RAM
 */
export declare const IPHONE_6S: string;
/**
 * iPhone 7
 * @description 2GB RAM
 */
export declare const IPHONE_7: string;
/**
 * iPhone 8
 * @description 2GB RAM
 */
export declare const IPHONE_8: string;
/**
 * iPhone 5 or 5c
 * @description 1GB RAM
 */
export declare const IPHONE_5_OR_5C: string;
/**
 * iPhone 5s
 * @description 1GB RAM
 */
export declare const IPHONE_5S: string;
/**
 * iPhone 4
 * @description 512MB RAM
 */
export declare const IPHONE_4: string;
/**
 * iPhone 4s
 * @description 1GB RAM
 */
export declare const IPHONE_4S: string;
/**
 * iPhone 3GS
 * @description 256MB RAM
 */
export declare const IPHONE_3GS: string;
/**
 * iPhone 3G
 * @description 128MB RAM
 */
export declare const IPHONE_3G: string;
/**
 * iPhone 1
 * @description 128MB RAM
 */
export declare const IPHONE_1: string;
/**
 * iPad
 * @description 512MB RAM
 */
export declare const IPAD: string;
/**
 * iPad 2
 * @description 512MB RAM
 */
export declare const IPAD_2: string;
/**
 * iPad Mini
 * @description 512MB RAM
 */
export declare const IPAD_MINI: string;
/**
 * iPad 3
 * @description 1GB RAM
 */
export declare const IPAD_3: string;
/**
 * iPad 4
 * @description 1GB RAM
 */
export declare const IPAD_4: string;
/**
 * iPad 5
 * @description 2GB RAM
 */
export declare const IPAD_5: string;
/**
 * iPad 6
 * @description 2GB RAM
 */
export declare const IPAD_6: string;
/**
 * iPad Mini 2
 * @description 1GB RAM
 */
export declare const IPAD_MINI_2: string;
/**
 * iPad Mini 3
 * @description 1GB RAM
 */
export declare const IPAD_MINI_3: string;
/**
 * iPad Mini 4
 * @description 1GB RAM
 */
export declare const IPAD_MINI_4: string;
/**
 * iPad Air
 * @description 1GB RAM
 */
export declare const IPAD_AIR: string;
/**
 * iPad Air 2
 * @description 2GB RAM
 */
export declare const IPAD_AIR_2: string;
/**
 * iPad Pro 12.9
 * @description 4GB RAM
 */
export declare const IPAD_PRO: string;
/**
 * iPad Pro 9.7
 * @description 2GB RAM
 */
export declare const IPAD_PRO_9_7: string;
/**
 * Pro 12.9 (2nd Gen)
 * @description 4GB RAM
 */
export declare const IPAD_PRO_2ND_GEN: string;
/**
 * Pro 12.9 (3rd Gen)
 * @description 4/6GB RAM
 */
export declare const IPAD_PRO_3RD_GEN: string;
export declare const DISPLAY_ZOOM: string;
/**
 * Checks what iPad model the current device is on.
 * @returns A string or comma seperated string that contains the device type const.
 */
export declare function getiPadModel(): string;
/**
 * Checks what iPhone model the current device is on.
 * @returns A string that contains the device type const.
 */
export declare function getiPhoneModel(): string;
/**
 * Gets what the current renderer is using a the WEBGL_debug_renderer_info extension.
 * @returns The name of the renderer if available and a blank string otherwise.
 */
export declare function getRenderer(): string;
/**
 * Checks if the current platform is retina.
 * @returns True if the platform is retina.
 */
export declare function isRetina(): boolean;
/**
 * Returns whether the current device is not within the supplied exclude list.
 * @param pToExclude The devices that are not supported.
 * @returns If the current device is supported.
 * @example
 * isSupportedIOSDevice([PlatformUtils.IPHONE_4, PlatformUtils.IPHONE_3GS, PlatformUtils.IPHONE_1,
 * PlatformUtils.IPHONE_3G, PlatformUtils.IPAD_AIR_2]);
 */
export declare function isSupportedDevice(pToExclude: any): boolean;
/**
 * Checks is the current platform is running on Safari.
 * @todo SH: userAgent sniffing is usually not the best idea, look into alternatives
 * @see https://stackoverflow.com/questions/7944460/detect-safari-browser/23522755 The comment by qingu
 * @returns True if the current platform is Safari.
 */
export declare function isSafari(): boolean;
/**
 * Checks whether the app is running on the Amazon OS
 * @see https://docs.aws.amazon.com/silk/latest/developerguide/detecting-silk-ua.html
 * @returns True is the current platform is Amazon OS
 */
export declare function isAmazonOS(): boolean;
/**
 * Checks whether the app is running on a mobile device.
 * @see http://pixijs.download/dev/docs/PIXI.utils.html
 * @returns True is the app is running on a mobile device.
 */
export declare function isMobile(): boolean;
/**
 * Checks whether the app is running on an `https` url
 */
export declare function isHTTPS(): boolean;
//# sourceMappingURL=PlatformUtils.d.ts.map