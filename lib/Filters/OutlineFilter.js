"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutlineFilter = void 0;
// From: https://github.com/pixijs/pixi-filters/tree/master/filters/outline
// NOTE: Was having difficulties including this package through npm, so included it directly in the project
var OutlineFilter = /** @class */ (function (_super) {
    __extends(OutlineFilter, _super);
    function OutlineFilter() {
        return _super.call(this, undefined, OutlineFilter.FRAG) || this;
    }
    OutlineFilter.FRAG = "\n        varying vec2 vTextureCoord;\n        uniform sampler2D uSampler;\n\n        uniform vec2 thickness;\n        uniform vec4 outlineColor;\n        uniform vec4 filterClamp;\n\n        const float DOUBLE_PI = 3.14159265358979323846264 * 2.;\n\n        void main(void) {\n            vec4 ownColor = texture2D(uSampler, vTextureCoord);\n            vec4 curColor;\n            float maxAlpha = 0.;\n            vec2 displaced;\n            for (float angle = 0.; angle <= DOUBLE_PI; angle += 0.5) {\n                displaced.x = vTextureCoord.x + thickness.x * cos(angle);\n                displaced.y = vTextureCoord.y + thickness.y * sin(angle);\n                curColor = texture2D(uSampler, clamp(displaced, filterClamp.xy, filterClamp.zw));\n                maxAlpha = max(maxAlpha, curColor.a);\n            }\n            float resultAlpha = max(maxAlpha, ownColor.a);\n            resultAlpha = resultAlpha * ceil(vTextureCoord.x) * (1. - floor(vTextureCoord.x));\n            resultAlpha = resultAlpha * ceil(vTextureCoord.y) * (1. - floor(vTextureCoord.y));\n            gl_FragColor = vec4((ownColor.rgb + outlineColor.rgb * (1. - ownColor.a)) * resultAlpha, resultAlpha);\n        }\n    ";
    return OutlineFilter;
}(PIXI.Filter));
exports.OutlineFilter = OutlineFilter;
//# sourceMappingURL=OutlineFilter.js.map