"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHTTPS = exports.isMobile = exports.isAmazonOS = exports.isSafari = exports.isSupportedDevice = exports.isRetina = exports.getRenderer = exports.getiPhoneModel = exports.getiPadModel = exports.DISPLAY_ZOOM = exports.IPAD_PRO_3RD_GEN = exports.IPAD_PRO_2ND_GEN = exports.IPAD_PRO_9_7 = exports.IPAD_PRO = exports.IPAD_AIR_2 = exports.IPAD_AIR = exports.IPAD_MINI_4 = exports.IPAD_MINI_3 = exports.IPAD_MINI_2 = exports.IPAD_6 = exports.IPAD_5 = exports.IPAD_4 = exports.IPAD_3 = exports.IPAD_MINI = exports.IPAD_2 = exports.IPAD = exports.IPHONE_1 = exports.IPHONE_3G = exports.IPHONE_3GS = exports.IPHONE_4S = exports.IPHONE_4 = exports.IPHONE_5S = exports.IPHONE_5_OR_5C = exports.IPHONE_8 = exports.IPHONE_7 = exports.IPHONE_6S = exports.IPHONE_6 = exports.IPHONE_SE = exports.IPHONE_8_PLUS = exports.IPHONE_7_PLUS = exports.IPHONE_6S_PLUS = exports.IPHONE_6_PLUS = exports.IPHONE_XS = exports.IPHONE_X = exports.IPHONE_XS_MAX = exports.IPHONE_XR = void 0;
const utils_1 = require("@pixi/utils");
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
exports.IPHONE_XR = "iPhone XR";
/**
 * iPhone XS Max
 * @description 4GB RAM
 */
exports.IPHONE_XS_MAX = "iPhone XS Max";
/**
 * iPhone X
 * @description 3GB RAM
 */
exports.IPHONE_X = "iPhone X";
/**
 * iPhone XS
 * @description 4GB RAM
 */
exports.IPHONE_XS = "iPhone XS";
/**
 * iPhone 6 Plus
 * @description 1GB RAM
 */
exports.IPHONE_6_PLUS = "iPhone 6 Plus";
/**
 * iPhone 6s Plus
 * @description 1GB RAM
 */
exports.IPHONE_6S_PLUS = "iPhone 6s Plus";
/**
 * iPhone 7 Plus
 * @description 3GB RAM
 */
exports.IPHONE_7_PLUS = "iPhone 7 Plus";
/**
 * iPhone 8 Plus
 * @description 3GB RAM
 */
exports.IPHONE_8_PLUS = "iPhone 8 Plus";
/**
 * iPhone SE
 * @description 2GM RAM
 */
exports.IPHONE_SE = "iPhone SE";
/**
 * iPhone 6
 * @description 1GB RAM
 */
exports.IPHONE_6 = "iPhone 6";
/**
 * iPhone 6s
 * @description 2GB RAM
 */
exports.IPHONE_6S = "iPhone 6s";
/**
 * iPhone 7
 * @description 2GB RAM
 */
exports.IPHONE_7 = "iPhone 7";
/**
 * iPhone 8
 * @description 2GB RAM
 */
exports.IPHONE_8 = "iPhone 8";
/**
 * iPhone 5 or 5c
 * @description 1GB RAM
 */
exports.IPHONE_5_OR_5C = "iPhone 5 or 5c";
/**
 * iPhone 5s
 * @description 1GB RAM
 */
exports.IPHONE_5S = "iPhone 5s";
/**
 * iPhone 4
 * @description 512MB RAM
 */
exports.IPHONE_4 = "iPhone 4";
/**
 * iPhone 4s
 * @description 1GB RAM
 */
exports.IPHONE_4S = "iPhone 4s";
/**
 * iPhone 3GS
 * @description 256MB RAM
 */
exports.IPHONE_3GS = "iPhone 3GS";
/**
 * iPhone 3G
 * @description 128MB RAM
 */
exports.IPHONE_3G = "iPhone 3G";
/**
 * iPhone 1
 * @description 128MB RAM
 */
exports.IPHONE_1 = "iPhone 1";
// Tablet
/**
 * iPad
 * @description 512MB RAM
 */
exports.IPAD = "iPad";
/**
 * iPad 2
 * @description 512MB RAM
 */
exports.IPAD_2 = "iPad 2";
/**
 * iPad Mini
 * @description 512MB RAM
 */
exports.IPAD_MINI = "iPad Mini";
/**
 * iPad 3
 * @description 1GB RAM
 */
exports.IPAD_3 = "iPad 3";
/**
 * iPad 4
 * @description 1GB RAM
 */
exports.IPAD_4 = "iPad 4";
/**
 * iPad 5
 * @description 2GB RAM
 */
exports.IPAD_5 = "iPad 5";
/**
 * iPad 6
 * @description 2GB RAM
 */
exports.IPAD_6 = "iPad 6";
/**
 * iPad Mini 2
 * @description 1GB RAM
 */
exports.IPAD_MINI_2 = "iPad Mini 2";
/**
 * iPad Mini 3
 * @description 1GB RAM
 */
exports.IPAD_MINI_3 = "iPad Mini 3";
/**
 * iPad Mini 4
 * @description 1GB RAM
 */
exports.IPAD_MINI_4 = "iPad Mini 4";
/**
 * iPad Air
 * @description 1GB RAM
 */
exports.IPAD_AIR = "iPad Air";
/**
 * iPad Air 2
 * @description 2GB RAM
 */
exports.IPAD_AIR_2 = "iPad Air 2";
/**
 * iPad Pro 12.9
 * @description 4GB RAM
 */
exports.IPAD_PRO = "iPad Pro 12.9";
/**
 * iPad Pro 9.7
 * @description 2GB RAM
 */
exports.IPAD_PRO_9_7 = "iPad Pro 9.7";
/**
 * Pro 12.9 (2nd Gen)
 * @description 4GB RAM
 */
exports.IPAD_PRO_2ND_GEN = "Pro 12.9 (2nd Gen)";
/**
 * Pro 12.9 (3rd Gen)
 * @description 4/6GB RAM
 */
exports.IPAD_PRO_3RD_GEN = "Pro 12.9 (3rd Gen)";
exports.DISPLAY_ZOOM = "(display zoom)";
/**
 * Checks what iPad model the current device is on.
 * @returns A string or comma seperated string that contains the device type const.
 */
function getiPadModel() {
    // Create a canvas element which can be used to retreive information about the GPU.
    const renderer = getRenderer();
    if (window.screen.height / window.screen.width === 1024 / 768) {
        // iPad, iPad 2, iPad Mini
        if (window.devicePixelRatio === 1) {
            switch (renderer) {
                case "PowerVR SGX 535":
                    return exports.IPAD;
                case "PowerVR SGX 543":
                    return exports.IPAD_2 + "," + exports.IPAD_MINI;
                default:
                    return exports.IPAD + "," + exports.IPAD_2 + "," + exports.IPAD_MINI;
            }
        }
        else {
            switch (renderer) {
                case "PowerVR SGX 543":
                    return exports.IPAD_3;
                case "PowerVR SGX 554":
                    return exports.IPAD_4;
                case "Apple A7 GPU":
                    return exports.IPAD_AIR + "," + exports.IPAD_MINI_2 + "," + exports.IPAD_MINI_3;
                case "Apple A8X GPU":
                    return exports.IPAD_AIR_2;
                case "Apple A8 GPU":
                    return exports.IPAD_MINI_4;
                case "Apple A9 GPU":
                    return exports.IPAD_5 + "," + exports.IPAD_PRO_9_7;
                case "Apple A10 GPU":
                    return exports.IPAD_6;
                default:
                    return exports.IPAD_3 + "," + exports.IPAD_4 + "," + exports.IPAD_5 + "," + exports.IPAD_6 + "," + exports.IPAD_MINI_2 +
                        "," + exports.IPAD_MINI_3 + "," + exports.IPAD_MINI_4 + "," + exports.IPAD_AIR + "," + exports.IPAD_AIR_2;
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
                return exports.IPAD_PRO_3RD_GEN;
            case "Apple A10X GPU":
                return exports.IPAD_PRO_2ND_GEN;
            case "Apple A9 GPU":
            case "Apple A9X GPU":
                return exports.IPAD_PRO;
            default:
                return exports.IPAD_PRO + "," + exports.IPAD_PRO_2ND_GEN + "," + exports.IPAD_PRO_3RD_GEN;
        }
    }
    else {
        return "false " + renderer;
    }
}
exports.getiPadModel = getiPadModel;
/**
 * Checks what iPhone model the current device is on.
 * @returns A string that contains the device type const.
 */
function getiPhoneModel() {
    const renderer = getRenderer();
    const ratio = window.devicePixelRatio;
    // iPhone XR, iPhone XS Max
    if (window.screen.height / window.screen.width === 896 / 414) {
        switch (ratio) {
            case 2:
                return exports.IPHONE_XR;
            case 3:
                return exports.IPHONE_XS_MAX;
            default:
                return exports.IPHONE_XR + "," + exports.IPHONE_XS_MAX;
        }
    }
    // iPhone X, iPhone XS
    else if (window.screen.height / window.screen.width === 812 / 375) {
        switch (renderer) {
            case "Apple A11 GPU":
                return exports.IPHONE_X;
            case "Apple A12 GPU":
                return exports.IPHONE_XS;
            default:
                return exports.IPHONE_X + "," + exports.IPHONE_XS;
        }
    }
    // iPhone 6+, iPhone 6s+, iPhone 7+, iPhone 8+
    else if (window.screen.height / window.screen.width === 736 / 414) {
        switch (renderer) {
            case "Apple A8 GPU":
                return exports.IPHONE_6_PLUS;
            case "Apple A9 GPU":
                return exports.IPHONE_6S_PLUS;
            case "Apple A10 GPU":
                return exports.IPHONE_7_PLUS;
            case "Apple A11 GPU":
                return exports.IPHONE_8_PLUS;
            default:
                return exports.IPHONE_6_PLUS + "," + exports.IPHONE_6S_PLUS + "," + exports.IPHONE_7_PLUS + "," + exports.IPHONE_8_PLUS;
        }
    }
    // iPhone 6, iPhone 6s, iPhone 7, iPhone 8
    else if (window.screen.height / window.screen.width === 667 / 375) {
        if (ratio === 2) {
            switch (renderer) {
                case "Apple A8 GPU":
                    return exports.IPHONE_6;
                case "Apple A9 GPU":
                    return exports.IPHONE_6S;
                case "Apple A10 GPU":
                    return exports.IPHONE_7;
                case "Apple A11 GPU":
                    return exports.IPHONE_8;
                default:
                    return exports.IPHONE_6 + "," + exports.IPHONE_6S + "," + exports.IPHONE_7 + "," + exports.IPHONE_8;
            }
        }
        else {
            // or in zoom mode: iPhone 6+, iPhone 6S+, iPhone 7+, iPhone 8+
            switch (renderer) {
                case "Apple A8 GPU":
                    return exports.IPHONE_6_PLUS + " " + exports.DISPLAY_ZOOM;
                case "Apple A9 GPU":
                    return exports.IPHONE_6S_PLUS + " " + exports.DISPLAY_ZOOM;
                case "Apple A10 GPU":
                    return exports.IPHONE_7_PLUS + " " + exports.DISPLAY_ZOOM;
                case "Apple A11 GPU":
                    return exports.IPHONE_8_PLUS + " " + exports.DISPLAY_ZOOM;
                default:
                    return exports.IPHONE_6_PLUS + " " + exports.DISPLAY_ZOOM + "," + exports.IPHONE_6S_PLUS + " " + exports.DISPLAY_ZOOM + "," +
                        exports.IPHONE_7_PLUS + " " + exports.DISPLAY_ZOOM + "," + exports.IPHONE_8_PLUS + " " + exports.DISPLAY_ZOOM;
            }
        }
    }
    // iPhone 5, iPhone 5C, iPhone 5S, iPhone SE
    // or in zoom mode: iPhone 5, iPhone 5C, iPhone 5S, iPhone SE, iPhone 6, iPhone 6S, iPhone 7 or iPhone 8
    else if (window.screen.height / window.screen.width === 1.775) {
        switch (renderer) {
            case "PowerVR SGX 543":
                return exports.IPHONE_5_OR_5C;
            case "Apple A7 GPU":
                return exports.IPHONE_5S;
            case "Apple A8 GPU":
                return exports.IPHONE_6 + " " + exports.DISPLAY_ZOOM;
            case "Apple A9 GPU":
                return exports.IPHONE_SE + "," + exports.IPHONE_6S + " " + exports.DISPLAY_ZOOM;
            case "Apple A10 GPU":
                return exports.IPHONE_7 + " " + exports.DISPLAY_ZOOM;
            case "Apple A11 GPU":
                return exports.IPHONE_8 + " " + exports.DISPLAY_ZOOM;
            default:
                return exports.IPHONE_5_OR_5C + "," + exports.IPHONE_5S + "," + exports.IPHONE_SE + "," + exports.IPHONE_6 + " " + exports.DISPLAY_ZOOM +
                    exports.IPHONE_6S + " " + exports.DISPLAY_ZOOM + "," + exports.IPHONE_7 + " " + exports.DISPLAY_ZOOM + "," +
                    exports.IPHONE_8 + " " + exports.DISPLAY_ZOOM;
        }
    }
    // iPhone 4 or 4s
    else if ((window.screen.height / window.screen.width === 1.5) && (ratio === 2)) {
        switch (renderer) {
            case "PowerVR SGX 535":
                return exports.IPHONE_4;
            case "PowerVR SGX 543":
                return exports.IPHONE_4S;
            default:
                return exports.IPHONE_4 + "," + exports.IPHONE_4S;
        }
    }
    // iPhone 1, 3G or 3GS
    else if ((window.screen.height / window.screen.width === 1.5) && (ratio === 1)) {
        switch (renderer) {
            case "ALP0298C05":
                return exports.IPHONE_3GS;
            case "S5L8900":
                return exports.IPHONE_1 + "," + exports.IPHONE_3G;
            default:
                return exports.IPHONE_1 + "," + exports.IPHONE_3G + "," + exports.IPHONE_3GS;
        }
        // Not an iPhone.
    }
    else {
        return "false " + renderer;
    }
}
exports.getiPhoneModel = getiPhoneModel;
/**
 * Gets what the current renderer is using a the WEBGL_debug_renderer_info extension.
 * @returns The name of the renderer if available and a blank string otherwise.
 */
function getRenderer() {
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
exports.getRenderer = getRenderer;
/**
 * Checks if the current platform is retina.
 * @returns True if the platform is retina.
 */
function isRetina() {
    const mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
            (min--moz-device-pixel-ratio: 1.5),\
            (-o-min-device-pixel-ratio: 3/2),\
            (min-resolution: 1.5dppx)";
    if (window.devicePixelRatio > 1) {
        return true;
    }
    return (window.matchMedia && window.matchMedia(mediaQuery).matches) === null;
}
exports.isRetina = isRetina;
/**
 * Returns whether the current device is not within the supplied exclude list.
 * @param pToExclude The devices that are not supported.
 * @returns If the current device is supported.
 * @example
 * isSupportedIOSDevice([PlatformUtils.IPHONE_4, PlatformUtils.IPHONE_3GS, PlatformUtils.IPHONE_1,
 * PlatformUtils.IPHONE_3G, PlatformUtils.IPAD_AIR_2]);
 */
function isSupportedDevice(pToExclude) {
    const iOS = ["iPad", "iPhone", "iPod"].indexOf(navigator.platform) >= 0;
    const deviceList = new Array()
        .concat(getiPhoneModel().split(","))
        .concat(getiPadModel().split(","));
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
exports.isSupportedDevice = isSupportedDevice;
/**
 * Checks is the current platform is running on Safari.
 * @todo SH: userAgent sniffing is usually not the best idea, look into alternatives
 * @see https://stackoverflow.com/questions/7944460/detect-safari-browser/23522755 The comment by qingu
 * @returns True if the current platform is Safari.
 */
function isSafari() {
    const result = navigator.vendor && navigator.vendor.indexOf("Apple") > -1 &&
        navigator.userAgent &&
        navigator.userAgent.indexOf("CriOS") === -1 &&
        navigator.userAgent.indexOf("FxiOS") === -1;
    if (result === "") {
        return false;
    }
    return result;
}
exports.isSafari = isSafari;
/**
 * Checks whether the app is running on the Amazon OS
 * @see https://docs.aws.amazon.com/silk/latest/developerguide/detecting-silk-ua.html
 * @returns True is the current platform is Amazon OS
 */
function isAmazonOS() {
    const match = /(?:; ([^;)]+) Build\/.*)?\bSilk\/([0-9._-]+)\b(.*\bMobile Safari\b)?/.exec(navigator.userAgent);
    if (match) {
        return true;
    }
    return false;
}
exports.isAmazonOS = isAmazonOS;
/**
 * Checks whether the app is running on a mobile device.
 * @see http://pixijs.download/dev/docs/PIXI.utils.html
 * @returns True is the app is running on a mobile device.
 */
function isMobile() {
    return utils_1.isMobile.any;
}
exports.isMobile = isMobile;
/**
 * Checks whether the app is running on an `https` url
 */
function isHTTPS() {
    return window.location.protocol === "https";
}
exports.isHTTPS = isHTTPS;
//# sourceMappingURL=PlatformUtils.js.map