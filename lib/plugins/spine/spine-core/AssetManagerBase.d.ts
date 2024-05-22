import { Texture } from './Texture';
import { TextureAtlas } from './TextureAtlas';
import { Disposable, StringMap } from './Utils';

export declare class AssetManagerBase implements Disposable {
    private pathPrefix;
    private textureLoader;
    private downloader;
    private assets;
    private errors;
    private toLoad;
    private loaded;
    constructor(textureLoader: (image: HTMLImageElement | ImageBitmap) => Texture, pathPrefix?: string, downloader?: Downloader);
    dispose(): void;
    loadAll(): Promise<AssetManagerBase>;
    setRawDataURI(path: string, data: string): void;
    loadBinary(path: string, success?: (path: string, binary: Uint8Array) => void, error?: (path: string, message: string) => void): void;
    loadText(path: string, success?: (path: string, text: string) => void, error?: (path: string, message: string) => void): void;
    loadJson(path: string, success?: (path: string, object: object) => void, error?: (path: string, message: string) => void): void;
    loadTexture(path: string, success?: (path: string, texture: Texture) => void, error?: (path: string, message: string) => void): void;
    loadTextureAtlas(path: string, success?: (path: string, atlas: TextureAtlas) => void, error?: (path: string, message: string) => void, fileAlias?: {
        [keyword: string]: string;
    }): void;
    get(path: string): any;
    require(path: string): any;
    remove(path: string): any;
    removeAll(): void;
    isLoadingComplete(): boolean;
    getToLoad(): number;
    getLoaded(): number;
    hasErrors(): boolean;
    getErrors(): StringMap<string>;
    private start;
    private success;
    private error;
}
export declare class Downloader {
    rawDataUris: StringMap<string>;
    private callbacks;
    dataUriToString(dataUri: string): string;
    base64ToUint8Array(base64: string): Uint8Array;
    dataUriToUint8Array(dataUri: string): Uint8Array;
    downloadText(url: string, success: (data: string) => void, error: (status: number, responseText: string) => void): void;
    downloadJson(url: string, success: (data: object) => void, error: (status: number, responseText: string) => void): void;
    downloadBinary(url: string, success: (data: Uint8Array) => void, error: (status: number, responseText: string) => void): void;
    private start;
    private finish;
}
//# sourceMappingURL=AssetManagerBase.d.ts.map