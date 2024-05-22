import { AssetManagerBase } from './AssetManagerBase';
import { Texture, TextureFilter, TextureRegion, TextureWrap } from './Texture';
import { Disposable } from './Utils';

export declare class TextureAtlas implements Disposable {
    pages: TextureAtlasPage[];
    regions: TextureAtlasRegion[];
    constructor(atlasText: string);
    dispose(): void;
    findRegion(name: string): TextureAtlasRegion | null;
    setTextures(assetManager: AssetManagerBase, pathPrefix?: string): void;
}
export declare class TextureAtlasPage {
    name: string;
    minFilter: TextureFilter;
    magFilter: TextureFilter;
    uWrap: TextureWrap;
    vWrap: TextureWrap;
    texture: Texture | null;
    width: number;
    height: number;
    pma: boolean;
    regions: TextureAtlasRegion[];
    constructor(name: string);
    setTexture(texture: Texture): void;
}
export declare class TextureAtlasRegion extends TextureRegion {
    offsetX: number;
    offsetY: number;
    originalWidth: number;
    originalHeight: number;
    degrees: number;
    page: TextureAtlasPage;
    name: string;
    x: number;
    y: number;
    index: number;
    names: string[] | null;
    values: number[][] | null;
    constructor(page: TextureAtlasPage, name: string);
}
//# sourceMappingURL=TextureAtlas.d.ts.map