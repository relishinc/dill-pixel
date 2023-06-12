"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetFactory = void 0;
function AssetFactory(pattern, factory, resolutionSuffix) {
    if (pattern && factory) {
        if (typeof pattern === "string" || typeof pattern === "number") {
            const asset = factory(pattern, resolutionSuffix);
            asset.resolutionSuffix = resolutionSuffix || "";
            return [asset];
        }
        const assets = [];
        if (Array.isArray(pattern)) {
            if (pattern.length === 2 && typeof pattern[0] === "number" && typeof pattern[1] === "number") {
                for (let i = pattern[0], n = pattern[1]; i <= n; i++) {
                    const asset = factory(i, resolutionSuffix);
                    asset.resolutionSuffix = resolutionSuffix || "";
                    assets.push(asset);
                }
            }
            else {
                for (const p of pattern) {
                    const asset = factory(p, resolutionSuffix);
                    asset.resolutionSuffix = resolutionSuffix || "";
                    assets.push(asset);
                }
            }
        }
        else {
            for (const r in pattern) {
                if (pattern.hasOwnProperty(r)) {
                    assets.push(...AssetFactory(pattern[r], factory, r));
                }
            }
        }
        return assets;
    }
    return [];
}
exports.AssetFactory = AssetFactory;
//# sourceMappingURL=AssetFactory.js.map