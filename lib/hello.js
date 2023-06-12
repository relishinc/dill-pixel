"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sayHello = void 0;
const Utils_1 = require("./Utils");
const BuildInfo = __importStar(require("./version"));
function sayHello() {
    let hello = `%c${BuildInfo.PACKAGE_NAME} v${BuildInfo.PACKAGE_VERSION}`;
    if (BuildInfo.GIT_BRANCH !== undefined && BuildInfo.GIT_BRANCH !== "undefined") {
        hello += ` - ${BuildInfo.GIT_BRANCH}`;
        if (BuildInfo.GIT_COMMIT !== undefined && BuildInfo.GIT_COMMIT !== "undefined") {
            hello += `#${BuildInfo.GIT_COMMIT.substr(0, 7)}`;
        }
    }
    hello += " - %chttps://reli.sh";
    console.log(hello, Utils_1.LogUtils.STYLE_BLACK, Utils_1.LogUtils.STYLE_RELISH_BOLD);
}
exports.sayHello = sayHello;
//# sourceMappingURL=hello.js.map