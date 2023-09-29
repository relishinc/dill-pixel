import { isMobile as PixiUtilsIsMobile } from '@pixi/utils';
/*
 * @todo Relish GM =>
 * - Create constants for all the renderers
 * - Move all constants to the bottom of the file
 * - Look at changing the constants into an enum that can then be used similarly to Unity's device generation
 * - Look at either caching the platform info in an init function or upon the first call of the function
 */
// Mobile
/**
 * iPhone XR
 * @description 3GB RAM
 */
export const IPHONE_XR = "iPhone XR";
/**
 * iPhone XS Max
 * @description 4GB RAM
 */
export const IPHONE_XS_MAX = "iPhone XS Max";
/**
 * iPhone X
 * @description 3GB RAM
 */
export const IPHONE_X = "iPhone X";
/**
 * iPhone XS
 * @description 4GB RAM
 */
export const IPHONE_XS = "iPhone XS";
/**
 * iPhone 6 Plus
 * @description 1GB RAM
 */
export const IPHONE_6_PLUS = "iPhone 6 Plus";
/**
 * iPhone 6s Plus
 * @description 1GB RAM
 */
export const IPHONE_6S_PLUS = "iPhone 6s Plus";
/**
 * iPhone 7 Plus
 * @description 3GB RAM
 */
export const IPHONE_7_PLUS = "iPhone 7 Plus";
/**
 * iPhone 8 Plus
 * @description 3GB RAM
 */
export const IPHONE_8_PLUS = "iPhone 8 Plus";
/**
 * iPhone SE
 * @description 2GM RAM
 */
export const IPHONE_SE = "iPhone SE";
/**
 * iPhone 6
 * @description 1GB RAM
 */
export const IPHONE_6 = "iPhone 6";
/**
 * iPhone 6s
 * @description 2GB RAM
 */
export const IPHONE_6S = "iPhone 6s";
/**
 * iPhone 7
 * @description 2GB RAM
 */
export const IPHONE_7 = "iPhone 7";
/**
 * iPhone 8
 * @description 2GB RAM
 */
export const IPHONE_8 = "iPhone 8";
/**
 * iPhone 5 or 5c
 * @description 1GB RAM
 */
export const IPHONE_5_OR_5C = "iPhone 5 or 5c";
/**
 * iPhone 5s
 * @description 1GB RAM
 */
export const IPHONE_5S = "iPhone 5s";
/**
 * iPhone 4
 * @description 512MB RAM
 */
export const IPHONE_4 = "iPhone 4";
/**
 * iPhone 4s
 * @description 1GB RAM
 */
export const IPHONE_4S = "iPhone 4s";
/**
 * iPhone 3GS
 * @description 256MB RAM
 */
export const IPHONE_3GS = "iPhone 3GS";
/**
 * iPhone 3G
 * @description 128MB RAM
 */
export const IPHONE_3G = "iPhone 3G";
/**
 * iPhone 1
 * @description 128MB RAM
 */
export const IPHONE_1 = "iPhone 1";
// Tablet
/**
 * iPad
 * @description 512MB RAM
 */
export const IPAD = "iPad";
/**
 * iPad 2
 * @description 512MB RAM
 */
export const IPAD_2 = "iPad 2";
/**
 * iPad Mini
 * @description 512MB RAM
 */
export const IPAD_MINI = "iPad Mini";
/**
 * iPad 3
 * @description 1GB RAM
 */
export const IPAD_3 = "iPad 3";
/**
 * iPad 4
 * @description 1GB RAM
 */
export const IPAD_4 = "iPad 4";
/**
 * iPad 5
 * @description 2GB RAM
 */
export const IPAD_5 = "iPad 5";
/**
 * iPad 6
 * @description 2GB RAM
 */
export const IPAD_6 = "iPad 6";
/**
 * iPad Mini 2
 * @description 1GB RAM
 */
export const IPAD_MINI_2 = "iPad Mini 2";
/**
 * iPad Mini 3
 * @description 1GB RAM
 */
export const IPAD_MINI_3 = "iPad Mini 3";
/**
 * iPad Mini 4
 * @description 1GB RAM
 */
export const IPAD_MINI_4 = "iPad Mini 4";
/**
 * iPad Air
 * @description 1GB RAM
 */
export const IPAD_AIR = "iPad Air";
/**
 * iPad Air 2
 * @description 2GB RAM
 */
export const IPAD_AIR_2 = "iPad Air 2";
/**
 * iPad Pro 12.9
 * @description 4GB RAM
 */
export const IPAD_PRO = "iPad Pro 12.9";
/**
 * iPad Pro 9.7
 * @description 2GB RAM
 */
export const IPAD_PRO_9_7 = "iPad Pro 9.7";
/**
 * Pro 12.9 (2nd Gen)
 * @description 4GB RAM
 */
export const IPAD_PRO_2ND_GEN = "Pro 12.9 (2nd Gen)";
/**
 * Pro 12.9 (3rd Gen)
 * @description 4/6GB RAM
 */
export const IPAD_PRO_3RD_GEN = "Pro 12.9 (3rd Gen)";
export const DISPLAY_ZOOM = "(display zoom)";
/**
 * Checks what iPad model the current device is on.
 * @returns A string or comma seperated string that contains the device type const.
 */
export function getiPadModel() {
    // Create a canvas element which can be used to retreive information about the GPU.
    const renderer = getRenderer();
    if (window.screen.height / window.screen.width === 1024 / 768) {
        // iPad, iPad 2, iPad Mini
        if (window.devicePixelRatio === 1) {
            switch (renderer) {
                case "PowerVR SGX 535":
                    return IPAD;
                case "PowerVR SGX 543":
                    return IPAD_2 + "," + IPAD_MINI;
                default:
                    return IPAD + "," + IPAD_2 + "," + IPAD_MINI;
            }
        }
        else {
            switch (renderer) {
                case "PowerVR SGX 543":
                    return IPAD_3;
                case "PowerVR SGX 554":
                    return IPAD_4;
                case "Apple A7 GPU":
                    return IPAD_AIR + "," + IPAD_MINI_2 + "," + IPAD_MINI_3;
                case "Apple A8X GPU":
                    return IPAD_AIR_2;
                case "Apple A8 GPU":
                    return IPAD_MINI_4;
                case "Apple A9 GPU":
                    return IPAD_5 + "," + IPAD_PRO_9_7;
                case "Apple A10 GPU":
                    return IPAD_6;
                default:
                    return IPAD_3 + "," + IPAD_4 + "," + IPAD_5 + "," + IPAD_6 + "," + IPAD_MINI_2 +
                        "," + IPAD_MINI_3 + "," + IPAD_MINI_4 + "," + IPAD_AIR + "," + IPAD_AIR_2;
            }
        }
    }
    else if (window.screen.height / window.screen.width === 1112 / 834) {
        return "iPad Pro 10.5";
    }
    else if (window.screen.height / window.screen.width === 2388 / 1668) {
        return "iPad Pro 11";
    }
    else if (window.screen.height / window.screen.width === 1366 / 1024) {
        switch (renderer) {
            case "Apple A12X GPU":
                return IPAD_PRO_3RD_GEN;
            case "Apple A10X GPU":
                return IPAD_PRO_2ND_GEN;
            case "Apple A9 GPU":
            case "Apple A9X GPU":
                return IPAD_PRO;
            default:
                return IPAD_PRO + "," + IPAD_PRO_2ND_GEN + "," + IPAD_PRO_3RD_GEN;
        }
    }
    else {
        return "false " + renderer;
    }
}
/**
 * Checks what iPhone model the current device is on.
 * @returns A string that contains the device type const.
 */
export function getiPhoneModel() {
    const renderer = getRenderer();
    const ratio = window.devicePixelRatio;
    // iPhone XR, iPhone XS Max
    if (window.screen.height / window.screen.width === 896 / 414) {
        switch (ratio) {
            case 2:
                return IPHONE_XR;
            case 3:
                return IPHONE_XS_MAX;
            default:
                return IPHONE_XR + "," + IPHONE_XS_MAX;
        }
    }
    // iPhone X, iPhone XS
    else if (window.screen.height / window.screen.width === 812 / 375) {
        switch (renderer) {
            case "Apple A11 GPU":
                return IPHONE_X;
            case "Apple A12 GPU":
                return IPHONE_XS;
            default:
                return IPHONE_X + "," + IPHONE_XS;
        }
    }
    // iPhone 6+, iPhone 6s+, iPhone 7+, iPhone 8+
    else if (window.screen.height / window.screen.width === 736 / 414) {
        switch (renderer) {
            case "Apple A8 GPU":
                return IPHONE_6_PLUS;
            case "Apple A9 GPU":
                return IPHONE_6S_PLUS;
            case "Apple A10 GPU":
                return IPHONE_7_PLUS;
            case "Apple A11 GPU":
                return IPHONE_8_PLUS;
            default:
                return IPHONE_6_PLUS + "," + IPHONE_6S_PLUS + "," + IPHONE_7_PLUS + "," + IPHONE_8_PLUS;
        }
    }
    // iPhone 6, iPhone 6s, iPhone 7, iPhone 8
    else if (window.screen.height / window.screen.width === 667 / 375) {
        if (ratio === 2) {
            switch (renderer) {
                case "Apple A8 GPU":
                    return IPHONE_6;
                case "Apple A9 GPU":
                    return IPHONE_6S;
                case "Apple A10 GPU":
                    return IPHONE_7;
                case "Apple A11 GPU":
                    return IPHONE_8;
                default:
                    return IPHONE_6 + "," + IPHONE_6S + "," + IPHONE_7 + "," + IPHONE_8;
            }
        }
        else {
            // or in zoom mode: iPhone 6+, iPhone 6S+, iPhone 7+, iPhone 8+
            switch (renderer) {
                case "Apple A8 GPU":
                    return IPHONE_6_PLUS + " " + DISPLAY_ZOOM;
                case "Apple A9 GPU":
                    return IPHONE_6S_PLUS + " " + DISPLAY_ZOOM;
                case "Apple A10 GPU":
                    return IPHONE_7_PLUS + " " + DISPLAY_ZOOM;
                case "Apple A11 GPU":
                    return IPHONE_8_PLUS + " " + DISPLAY_ZOOM;
                default:
                    return IPHONE_6_PLUS + " " + DISPLAY_ZOOM + "," + IPHONE_6S_PLUS + " " + DISPLAY_ZOOM + "," +
                        IPHONE_7_PLUS + " " + DISPLAY_ZOOM + "," + IPHONE_8_PLUS + " " + DISPLAY_ZOOM;
            }
        }
    }
    // iPhone 5, iPhone 5C, iPhone 5S, iPhone SE
    // or in zoom mode: iPhone 5, iPhone 5C, iPhone 5S, iPhone SE, iPhone 6, iPhone 6S, iPhone 7 or iPhone 8
    else if (window.screen.height / window.screen.width === 1.775) {
        switch (renderer) {
            case "PowerVR SGX 543":
                return IPHONE_5_OR_5C;
            case "Apple A7 GPU":
                return IPHONE_5S;
            case "Apple A8 GPU":
                return IPHONE_6 + " " + DISPLAY_ZOOM;
            case "Apple A9 GPU":
                return IPHONE_SE + "," + IPHONE_6S + " " + DISPLAY_ZOOM;
            case "Apple A10 GPU":
                return IPHONE_7 + " " + DISPLAY_ZOOM;
            case "Apple A11 GPU":
                return IPHONE_8 + " " + DISPLAY_ZOOM;
            default:
                return IPHONE_5_OR_5C + "," + IPHONE_5S + "," + IPHONE_SE + "," + IPHONE_6 + " " + DISPLAY_ZOOM +
                    IPHONE_6S + " " + DISPLAY_ZOOM + "," + IPHONE_7 + " " + DISPLAY_ZOOM + "," +
                    IPHONE_8 + " " + DISPLAY_ZOOM;
        }
    }
    // iPhone 4 or 4s
    else if ((window.screen.height / window.screen.width === 1.5) && (ratio === 2)) {
        switch (renderer) {
            case "PowerVR SGX 535":
                return IPHONE_4;
            case "PowerVR SGX 543":
                return IPHONE_4S;
            default:
                return IPHONE_4 + "," + IPHONE_4S;
        }
    }
    // iPhone 1, 3G or 3GS
    else if ((window.screen.height / window.screen.width === 1.5) && (ratio === 1)) {
        switch (renderer) {
            case "ALP0298C05":
                return IPHONE_3GS;
            case "S5L8900":
                return IPHONE_1 + "," + IPHONE_3G;
            default:
                return IPHONE_1 + "," + IPHONE_3G + "," + IPHONE_3GS;
        }
        // Not an iPhone.
    }
    else {
        return "false " + renderer;
    }
}
/**
 * Gets what the current renderer is using a the WEBGL_debug_renderer_info extension.
 * @returns The name of the renderer if available and a blank string otherwise.
 */
export function getRenderer() {
    // Get renderer info from cavas.
    const canvas = document.createElement("canvas");
    let renderer = "";
    if (canvas) {
        const context = canvas.getContext("webgl2") ||
            canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl");
        if (context) {
            const info = context.getExtension("WEBGL_debug_renderer_info");
            if (info) {
                renderer = context.getParameter(info.UNMASKED_RENDERER_WEBGL);
            }
        }
    }
    return renderer;
}
/**
 * Checks if the current platform is retina.
 * @returns True if the platform is retina.
 */
export function isRetina() {
    const mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
            (min--moz-device-pixel-ratio: 1.5),\
            (-o-min-device-pixel-ratio: 3/2),\
            (min-resolution: 1.5dppx)";
    if (window.devicePixelRatio > 1) {
        return true;
    }
    return (window.matchMedia && window.matchMedia(mediaQuery).matches) === null;
}
/**
 * Returns whether the current device is not within the supplied exclude list.
 * @param pToExclude The devices that are not supported.
 * @returns If the current device is supported.
 * @example
 * isSupportedIOSDevice([PlatformUtils.IPHONE_4, PlatformUtils.IPHONE_3GS, PlatformUtils.IPHONE_1,
 * PlatformUtils.IPHONE_3G, PlatformUtils.IPAD_AIR_2]);
 */
export function isSupportedDevice(pToExclude) {
    const iOS = ["iPad", "iPhone", "iPod"].indexOf(navigator.platform) >= 0;
    const deviceList = Array.from({ length: 0 }).concat(getiPhoneModel().split(",")).concat(getiPadModel().split(","));
    let found = false;
    for (let i = deviceList.length - 1; i >= 0; --i) {
        if (pToExclude.includes(deviceList[i])) {
            found = true;
            break;
        }
    }
    const isSupported = found === false;
    if (iOS) {
        return isSupported;
    }
    // Current catch all for supported vs unsupported Android devices.
    else {
        return isRetina();
    }
}
/**
 * Checks is the current platform is running on Safari.
 * @todo SH: userAgent sniffing is usually not the best idea, look into alternatives
 * @see https://stackoverflow.com/questions/7944460/detect-safari-browser/23522755 The comment by qingu
 * @returns True if the current platform is Safari.
 */
export function isSafari() {
    const result = navigator.vendor && navigator.vendor.indexOf("Apple") > -1 &&
        navigator.userAgent &&
        navigator.userAgent.indexOf("CriOS") === -1 &&
        navigator.userAgent.indexOf("FxiOS") === -1;
    if (result === "") {
        return false;
    }
    return result;
}
/**
 * Checks whether the app is running on the Amazon OS
 * @see https://docs.aws.amazon.com/silk/latest/developerguide/detecting-silk-ua.html
 * @returns True is the current platform is Amazon OS
 */
export function isAmazonOS() {
    const match = /(?:; ([^;)]+) Build\/.*)?\bSilk\/([0-9._-]+)\b(.*\bMobile Safari\b)?/.exec(navigator.userAgent);
    if (match) {
        return true;
    }
    return false;
}
/**
 * Checks whether the app is running on a mobile device.
 * @see http://pixijs.download/dev/docs/PIXI.utils.html
 * @returns True is the app is running on a mobile device.
 */
export function isMobile() {
    return PixiUtilsIsMobile.any;
}
/**
 * Checks whether the app is running on an `https` url
 */
export function isHTTPS() {
    return window.location.protocol === "https";
}
//# sourceMappingURL=PlatformUtils.js.map