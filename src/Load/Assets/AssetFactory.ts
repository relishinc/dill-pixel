import {IAsset} from "./IAsset";

export type AssetFactoryPattern = [number, number] | string[] | string | number;
export type AssetFactoryFunction<T> = (id: string | number, resolutionSuffix?: string) => IAsset<T>;

// tslint:disable:unified-signatures
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param assetIndex - index of asset: AssetFactory(1, i => new TextureAsset("my-texture-" + i))
 * @param factory - function that returns an asset by its id from the pattern and resolution suffix
 */
export function AssetFactory<T>(assetIndex: number, factory: AssetFactoryFunction<T>): IAsset<T>[];
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param assetIndex - index of asset: AssetFactory(1, i => new TextureAsset("my-texture-" + i))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 * @param resolutionSuffix - resolution suffix of assets
 */
export function AssetFactory<T>(assetIndex: number, factory: AssetFactoryFunction<T>, resolutionSuffix: string): IAsset<T>[];
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param assetName - name of asset: AssetFactory("my-texture", i => new TextureAsset(i))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 */
export function AssetFactory<T>(assetName: string, factory: AssetFactoryFunction<T>): IAsset<T>[];
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param assetName - name of asset: AssetFactory("my-texture", i => new TextureAsset(i))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 * @param resolutionSuffix - resolution suffix of assets
 */
export function AssetFactory<T>(assetName: string, factory: AssetFactoryFunction<T>, resolutionSuffix: string): IAsset<T>[];
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param minMax - min and max index of asset: AssetFactory([1,3], i => new TextureAsset("my-texture-" + i))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 */
export function AssetFactory<T>(minMax: [number, number], factory: AssetFactoryFunction<T>): IAsset<T>[];
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param minMax - min and max index of asset: AssetFactory([1,3], i => new TextureAsset("my-texture-" + i))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 * @param resolutionSuffix - resolution suffix of assets
 */
export function AssetFactory<T>(minMax: [number, number], factory: AssetFactoryFunction<T>, resolutionSuffix: string): IAsset<T>[];
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param assetNames - list of asset names: AssetFactory(["a","b","c"], i => new TextureAsset("my-texture-" + i))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 */
export function AssetFactory<T>(assetNames: string[], factory: AssetFactoryFunction<T>): IAsset<T>[];
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param assetNames - list of asset names: AssetFactory(["a","b","c"], i => new TextureAsset("my-texture-" + i))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 * @param resolutionSuffix - resolution suffix of assets
 */
export function AssetFactory<T>(assetNames: string[], factory: AssetFactoryFunction<T>, resolutionSuffix: string): IAsset<T>[];
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param patternsByResolution - asset name patterns grouped by resolution:
 *      AssetFactory({"@1x": 1, "@2x": [1,2]}, (i,r) => new TextureAsset("my-texture-" + i, `path/to/my-texture-${i}-${r}.png`))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 */
export function AssetFactory<T>(patternsByResolution: { [resolutionSuffix: string]: AssetFactoryPattern },
                                factory: AssetFactoryFunction<T>): IAsset<T>[];
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param patternsByResolution - asset name patterns grouped by resolution:
 *      AssetFactory({"@1x": 1, "@2x": [1,2]}, (i,r) => new TextureAsset("my-texture-" + i, `path/to/my-texture-${i}-${r}.png`))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 * @param resolutionSuffix - resolution suffix of assets
 */
export function AssetFactory<T>(patternsByResolution: { [resolutionSuffix: string]: AssetFactoryPattern },
                                factory: AssetFactoryFunction<T>, resolutionSuffix: string): IAsset<T>[];
export function AssetFactory<T>(
	pattern: AssetFactoryPattern | { [resolutionSuffix: string]: AssetFactoryPattern },
	factory: AssetFactoryFunction<T>,
	resolutionSuffix?: string): IAsset<T>[] {

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
			} else {
				for (const p of pattern) {
					const asset = factory(p, resolutionSuffix);
					asset.resolutionSuffix = resolutionSuffix || "";
					assets.push(asset);
				}
			}
		} else {
			for (const r in pattern) {
				if (pattern.hasOwnProperty(r)) {
					assets.push(...AssetFactory(pattern[r] as any, factory, r));
				}
			}
		}
		return assets;
	}
	return [];
}
