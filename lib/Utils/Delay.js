"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delay = void 0;
function Delay(delayInSeconds = 0) {
    return new Promise((resolve) => setTimeout(resolve, delayInSeconds * 1000));
}
exports.Delay = Delay;
//# sourceMappingURL=Delay.js.map