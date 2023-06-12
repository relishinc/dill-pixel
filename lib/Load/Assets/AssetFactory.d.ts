import { IAsset } from "./IAsset";
export type AssetFactoryPattern = [number, number] | string[] | string | number;
export type AssetFactoryFunction<T> = (id: string | number, resolutionSuffix?: string) => IAsset<T>;
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param assetIndex - index of asset: AssetFactory(1, i => new TextureAsset("my-texture-" + i))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 */
export declare function AssetFactory<T>(assetIndex: number, factory: AssetFactoryFunction<T>): Array<IAsset<T>>;
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param assetIndex - index of asset: AssetFactory(1, i => new TextureAsset("my-texture-" + i))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 * @param resolutionSuffix - resolution suffix of assets
 */
export declare function AssetFactory<T>(assetIndex: number, factory: AssetFactoryFunction<T>, resolutionSuffix: string): Array<IAsset<T>>;
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param assetName - name of asset: AssetFactory("my-texture", i => new TextureAsset(i))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 */
export declare function AssetFactory<T>(assetName: string, factory: AssetFactoryFunction<T>): Array<IAsset<T>>;
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param assetName - name of asset: AssetFactory("my-texture", i => new TextureAsset(i))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 * @param resolutionSuffix - resolution suffix of assets
 */
export declare function AssetFactory<T>(assetName: string, factory: AssetFactoryFunction<T>, resolutionSuffix: string): Array<IAsset<T>>;
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param minMax - min and max index of asset: AssetFactory([1,3], i => new TextureAsset("my-texture-" + i))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 */
export declare function AssetFactory<T>(minMax: [number, number], factory: AssetFactoryFunction<T>): Array<IAsset<T>>;
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param minMax - min and max index of asset: AssetFactory([1,3], i => new TextureAsset("my-texture-" + i))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 * @param resolutionSuffix - resolution suffix of assets
 */
export declare function AssetFactory<T>(minMax: [number, number], factory: AssetFactoryFunction<T>, resolutionSuffix: string): Array<IAsset<T>>;
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param assetNames - list of asset names: AssetFactory(["a","b","c"], i => new TextureAsset("my-texture-" + i))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 */
export declare function AssetFactory<T>(assetNames: string[], factory: AssetFactoryFunction<T>): Array<IAsset<T>>;
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param assetNames - list of asset names: AssetFactory(["a","b","c"], i => new TextureAsset("my-texture-" + i))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 * @param resolutionSuffix - resolution suffix of assets
 */
export declare function AssetFactory<T>(assetNames: string[], factory: AssetFactoryFunction<T>, resolutionSuffix: string): Array<IAsset<T>>;
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param patternsByResolution - asset name patterns grouped by resolution:
 *      AssetFactory({"@1x": 1, "@2x": [1,2]}, (i,r) => new TextureAsset("my-texture-" + i, `path/to/my-texture-${i}-${r}.png`))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 */
export declare function AssetFactory<T>(patternsByResolution: {
    [resolutionSuffix: string]: AssetFactoryPattern;
}, factory: AssetFactoryFunction<T>): Array<IAsset<T>>;
/**
 * Asset factory is used to generate list of assets based on pattern
 *
 * @param patternsByResolution - asset name patterns grouped by resolution:
 *      AssetFactory({"@1x": 1, "@2x": [1,2]}, (i,r) => new TextureAsset("my-texture-" + i, `path/to/my-texture-${i}-${r}.png`))
 * @param factory - function that returns an asset by it's id from the pattern and resolution suffix
 * @param resolutionSuffix - resolution suffix of assets
 */
export declare function AssetFactory<T>(patternsByResolution: {
    [resolutionSuffix: string]: AssetFactoryPattern;
}, factory: AssetFactoryFunction<T>, resolutionSuffix: string): Array<IAsset<T>>;
//# sourceMappingURL=AssetFactory.d.ts.map